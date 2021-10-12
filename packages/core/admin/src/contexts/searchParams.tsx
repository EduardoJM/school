import React, { createContext, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

export interface SearchParamsContextData {
    searchParams: Record<string, string>;
    updateParam: (name: string, value: string) => void;
}

export const SearchParamsContext = createContext<SearchParamsContextData>({} as SearchParamsContextData);

export const SearchParamsProvider: React.FC = ({ children }) => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useState<Record<string, string>>(() => {
        const searchParams = new URLSearchParams(location.search);
        const returnValue: Record<string, string> = {};
        const keys = Array.from(searchParams.keys());
        keys.forEach((k) => {
            const val = searchParams.get(k);
            if (!val) {
                return;
            }
            (returnValue as any)[k] = val;
        });
        return returnValue;
    });

    function updateParam(name: string, value: string) {
        const url = new URL(window.location.href);
        url.searchParams.set(name, value);
        window.history.pushState({}, '', url.toString());
        setSearchParams((state) => {
            return {
                ...state,
                [name]: value,
            };
        });
    }

    return (
        <SearchParamsContext.Provider value={{ searchParams, updateParam }}>
            { children }
        </SearchParamsContext.Provider>
    )
};

export function useSearchParams(): SearchParamsContextData {
    const context = useContext(SearchParamsContext);
    return context;
}

export function useSearchParamsDictionary<T>(defaultValues: T): T {
    const { searchParams } = useContext(SearchParamsContext);
    const keys = Object.keys(defaultValues);
    const returnValue: T = { ...defaultValues };
    keys.forEach((k) => {
        if (Object.prototype.hasOwnProperty.call(searchParams, k)) {
            (returnValue as any)[k] = searchParams[k];
        }
    });
    return returnValue;
}

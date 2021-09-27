import { useLocation } from 'react-router-dom';

export function useSearchQuery<T>(defaultValues: T): T {
    const searchParams = new URLSearchParams(useLocation().search);
    const keys = Object.keys(defaultValues);
    const returnValue: T = { ...defaultValues };
    keys.forEach((k) => {
        const val = searchParams.get(k);
        if (!val) {
            return;
        }
        (returnValue as any)[k] = val;
    });
    return returnValue;
}

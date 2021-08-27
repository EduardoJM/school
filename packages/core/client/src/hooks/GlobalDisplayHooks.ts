import { useContext } from 'react';
import { GlobalDisplayContext, GlobalDisplayContextData } from '../contexts';

export default function useGlobalDisplay() : GlobalDisplayContextData {
    const data = useContext(GlobalDisplayContext);
    return data;
}

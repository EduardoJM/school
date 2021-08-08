import { Action } from 'redux';

export interface GlobalActionTypePayloadMap {
    'GlobalPushLoading': null;
    'GlobalPopLoading': null;
    'GlobalPushMessage': string;
    'GlobalPopMessage': {
        key: number;
    };
}

export interface GlobalAction<K extends keyof GlobalActionTypePayloadMap> extends Action<K> {
    payload: GlobalActionTypePayloadMap[K];
}

export type GlobalActionType = keyof GlobalActionTypePayloadMap;

export type GlobalActionCollection =
    GlobalAction<'GlobalPopLoading'> |
    GlobalAction<'GlobalPopMessage'> |
    GlobalAction<'GlobalPushLoading'> |
    GlobalAction<'GlobalPushMessage'>;

const globalActions = {
    pushLoading: function(): GlobalAction<'GlobalPushLoading'> {
        return { type: 'GlobalPushLoading', payload: null };
    },
    popLoading: function(): GlobalAction<'GlobalPopLoading'> {
        return { type: 'GlobalPopLoading', payload: null };
    },
    pushMessage: function(message: string): GlobalAction<'GlobalPushMessage'> {
        return { type: 'GlobalPushMessage', payload: message };
    },
    popMessage: function(key: number): GlobalAction<'GlobalPopMessage'> {
        return { type: 'GlobalPopMessage', payload: { key } };
    },
};
export default globalActions;

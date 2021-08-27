import React, { createContext, useState } from 'react';

export interface MessageItem {
    message: string;
    key: number;
}

export interface GlobalDisplayContextData {
    messages: MessageItem[];
    loadingCount: number;
    isLoading: boolean;
    pushLoading: () => void;
    popLoading: () => void;
    pushMessage: (message: string) => void;
    popMessage: (key: number) => void;
}

export const GlobalDisplayContext = createContext<GlobalDisplayContextData>(
    {} as GlobalDisplayContextData,
);

let nextKey = 1;

export const GlobalDisplayProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<MessageItem[]>([]);
    const [loadingCount, setLoadingCount] = useState<number>(0);

    function pushLoading() {
        setLoadingCount((count) => count + 1);
    }

    function popLoading() {
        setLoadingCount((count) => count - 1);
    }

    function pushMessage(message: string) {
        setMessages((msgs) => [...msgs, { message, key: nextKey }]);
        nextKey += 1;
    }

    function popMessage(key: number) {
        setMessages((msgs) => msgs.filter((item) => item.key !== key));
    }

    return (
        <GlobalDisplayContext.Provider
            value={{
                pushLoading,
                popLoading,
                pushMessage,
                popMessage,
                messages,
                loadingCount,
                isLoading: loadingCount > 0,
            }}
        >
            {children}

            <div style={{ position: 'fixed', left: 0, top: 0 }}>
                {messages.map((item) => <div>{item.message}</div>)}
            </div>
            {loadingCount > 0 && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: '#000',
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    Carregando...
                </div>
            )}
        </GlobalDisplayContext.Provider>
    );
};

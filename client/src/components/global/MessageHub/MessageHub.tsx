import React, { useMemo } from 'react';
import { useTransition } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { actions, Store } from '../../../redux';
import { MessageHubSpring, MessageHubTimout } from '../../../config';
import { Hub, Message, MessageContent, MessageLifeBar, MessageCloseButton } from './styles';

const MessageHub: React.FC = () => {
    const { messages } = useSelector((store: Store) => store.globals);
    const dispatch = useDispatch();
    const refMap = useMemo(() => new WeakMap(), []);
    const cancelMap = useMemo(() => new WeakMap(), []);

    const transitions = useTransition(messages, {
        from: { opacity: 0, height: 0, life: '100%' },
        keys: (item) => item.key,
        enter: item => async (next, cancel) => {
            cancelMap.set(item, cancel)
            await next({ opacity: 1, height: refMap.get(item).offsetHeight })
            await next({ life: '0%' })
        },
        leave: [{ opacity: 0 }, { height: 0 }],
        onRest: (result, ctrl, item) => {
            dispatch(actions.globals.popMessage(item.key));
        },
        config: (item, index, phase) => key => (phase === 'enter' && key === 'life' ? { duration: MessageHubTimout } : MessageHubSpring),
    });

    return (
        <Hub>
            {transitions(({ life, ...style }, item) => (
                <Message style={style}>
                    <MessageContent ref={(ref: HTMLDivElement) => ref && refMap.set(item, ref)}>
                        <MessageLifeBar style={{ right: life }} />
                        <p>{item.message}</p>
                        <MessageCloseButton
                            onClick={(e) => {
                                e.stopPropagation()
                                if (cancelMap.has(item)) cancelMap.get(item)()
                            }}
                        >
                            <MdClose size={18} />
                        </MessageCloseButton>
                    </MessageContent>
                </Message>
            ))}
        </Hub>
    );
};

export default MessageHub;

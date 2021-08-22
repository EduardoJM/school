import { useState } from 'react';

export default function useModal(initialOpened: boolean = false) {
    const [opened, setOpened] = useState(initialOpened);

    return {
        opened,
        open: () => setOpened(true),
        close: () => setOpened(false),
        toggle: () => setOpened((state) => !state),
    };
}

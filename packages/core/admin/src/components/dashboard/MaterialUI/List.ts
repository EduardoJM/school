import {
    styled,
    Theme,
    CSSObject,
    List as MuiList,
    ListProps as MuiListProps,
} from '@mui/material';

const openedMixin = (theme: Theme): CSSObject => ({
    background: 'rgba(0, 0, 0, 0.1)',
    transition: theme.transitions.create('background', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
});

const closedMixin = (theme: Theme): CSSObject => ({
    background: 'transparent',
    transition: theme.transitions.create('background', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
});

export interface ListProps extends MuiListProps {
    open?: boolean;
}

export const List = styled(MuiList, { shouldForwardProp: (prop) => prop !== 'open' })<ListProps>(
    ({ theme, open }) => ({
        ...(open && {
            ...openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
        }),
    }),
);

import {
    Box,
    styled,
} from '@mui/material';

export const FlexFill = styled(Box)(
    ({ theme }) => ({
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
    }),
);

import {
    InputBase,
    styled,
} from '@mui/material';

export const SearchTextField = styled(InputBase)(
    ({ theme }) => ({
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
        '& .MuiInputBase-input': {
            borderRadius: 4,
            padding: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#FFF',
        },
    }),
);

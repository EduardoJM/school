import {
    InputBase,
    styled,
} from '@mui/material';

export const SearchTextField = styled(InputBase)(
    ({ theme }) => ({
        '& .MuiInputBase-input': {
            borderRadius: 4,
            padding: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#FFF',
        },
    }),
);

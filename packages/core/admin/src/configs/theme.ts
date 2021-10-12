import {
    createTheme,
} from '@mui/material';

export const primaryColor = {
    dark: '#EA4A00',
    main: '#FE5000',
    light: '#FF5D13',
};

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: primaryColor,
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: primaryColor.main,
                    color: '#FFF',
                    borderRight: 'none',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: primaryColor.main,
                    boxShadow: 'none',
                },
            },
        },
    },
});

import React, { useState } from 'react';
import {
    useTheme,

    AppBar,
    Box,
    Toolbar,
    Drawer,
    CssBaseline,
} from '@mui/material';
import {
    Menu,
} from '@mui/icons-material';
import { IconButton } from '../MaterialUI';
import { DRAWER_WIDTH } from '../../../configs';
import { Sidebar } from '../Sidebar';

const Dashboard: React.FC = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const container = document.body;
    const theme = useTheme();

    function handleDrawerToggle(){
        setMobileOpen((state) => !state);
    };

    return (
        <Box sx={{
            display: 'flex',
            height: '100vh',
        }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{
                width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                ml: { sm: `${DRAWER_WIDTH}px` },
            }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            display: { sm: 'none' },
                        }}
                    >
                        <Menu />
                    </IconButton>
                </Toolbar>
                <Box
                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: '100%',
                        background: theme.palette.primary.main,
                        width: 30,
                        height: 30,
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            left: '100%',
                            top: '100%',
                            transform: 'translate(-50%, -50%)',
                            background: '#FFF',
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                        }}
                    />
                </Box>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                    }}
                >
                    <Sidebar />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                    }}
                >
                    <Sidebar />
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    p: 3
                }}
            >
                <Toolbar sx={{ marginBottom: 1 }} />
                {children}
            </Box>
        </Box>
    );
};

export default Dashboard;

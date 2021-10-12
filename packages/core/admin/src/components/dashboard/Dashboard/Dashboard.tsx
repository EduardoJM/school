import React, { useState, ChangeEvent } from 'react';
import {
    useTheme,

    AppBar,
    Box,
    Toolbar,
    Drawer,
    CssBaseline,

    Avatar,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
} from '@mui/material';
import {
    Menu as IconMenu,
    Settings as IconSettings,
    Logout as IconLogout,
} from '@mui/icons-material';
import { IconButton, SearchTextField, FlexFill } from '../MaterialUI';
import { DRAWER_WIDTH } from '../../../configs';
import { Sidebar } from '../Sidebar';
import { useSearchParams, useAuth } from '../../../contexts';

const Dashboard: React.FC = ({ children }) => {
    const { updateParam } = useSearchParams();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const theme = useTheme();
    const { user } = useAuth();
    const [accountAnchorEl, setAccountAnchorEl] = React.useState<null | HTMLElement>(null);

    function handleDrawerToggle(){
        setMobileOpen((state) => !state);
    }

    function handleChangeSearchText(e: ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
        updateParam('search', e.target.value);
    }

    function handleOpenAccountMenu(e: React.MouseEvent<HTMLElement>) {
        setAccountAnchorEl(e.currentTarget);
    }

    function handleCloseAccountMenu() {
        setAccountAnchorEl(null);
    }

    const UserAvatar = () => {
        return user ? (
            <>
                {user.avatar ? (
                    <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
                ) : (
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: '#FFF', color: '#333' }}>
                        {(user.displayName || user.fullName || 'A')[0]}
                    </Avatar>
                )}
            </>
        ) : (
            <></>
        )
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
                <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
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
                        <IconMenu />
                    </IconButton>
                    <SearchTextField
                        placeholder="Pesquisar..."
                        onChange={handleChangeSearchText}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        value={search}
                        sx={{ flex: searchFocused ? 1 : 'unset' }}
                    />
                    <FlexFill sx={{ flex: searchFocused ? 'unset' : 1, }} />
                    {user && (
                        <>
                            <IconButton onClick={handleOpenAccountMenu} size="small" sx={{ ml: 2 }}>
                                <UserAvatar />
                            </IconButton>
                            <Menu
                                anchorEl={accountAnchorEl}
                                open={!!accountAnchorEl}
                                onClose={handleCloseAccountMenu}
                                onClick={handleCloseAccountMenu}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                        },
                                        '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem>
                                    <UserAvatar /> Meu Perfil
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <IconSettings />
                                    </ListItemIcon>
                                    Configurações
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                    <ListItemIcon>
                                        <IconLogout />
                                    </ListItemIcon>
                                    Sair
                                </MenuItem>
                            </Menu>
                        </>
                    )}
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

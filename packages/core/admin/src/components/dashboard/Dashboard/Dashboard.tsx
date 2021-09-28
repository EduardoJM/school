import React, { useState } from 'react';
import {
    useTheme,

    Box,
    Toolbar,
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    ListSubheader,
    ListItemButton,
} from '@mui/material';
import {
    Menu,
    ChevronLeft,
    ChevronRight,
    Inbox,
    Mail,
    ExpandLess,
    ExpandMore,

    Dashboard as DashboardIcon,
    School as SchoolIcon,
    Label as LabelIcon,
    LibraryBooks as LibraryBooksIcon,
} from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import AppBar from '../AppBar';
import Drawer from '../Drawer';
import DrawerHeader from '../DrawerHeader';

const Dashboard: React.FC = ({ children }) => {
    const theme = useTheme();
    const history = useHistory();
    const [open, setOpen] = useState(true);
    const [schoolIsOpen, setSchoolIsOpen] = useState(false);
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    
    function handleToggleSchool() {
        setSchoolIsOpen((state) => !state);
    };

    function handlePushLink(link: string) {
        history.push(link);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Mini variant drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem button onClick={() => handlePushLink('/')}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItemButton onClick={handleToggleSchool}>
                        <ListItemIcon>
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary="Escola" />
                        {schoolIsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={schoolIsOpen} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            <ListItem button onClick={() => handlePushLink('/subjects')}>
                                <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon>
                                <ListItemText primary="Disciplinas" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <LabelIcon />
                                </ListItemIcon>
                                <ListItemText primary="Marcadores" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />

                {children}
            </Box>
        </Box>
    );
};

export default Dashboard;

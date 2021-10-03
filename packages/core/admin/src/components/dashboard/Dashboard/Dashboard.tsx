import React, { useState } from 'react';
import {
    useTheme,

    Box,
    Toolbar,
    Collapse,
    ListItem,
    ListItemText,
    CssBaseline,
    Typography,
    Divider,
    ListItemButton,
} from '@mui/material';
import {
    Menu,
    ChevronLeft,
    ChevronRight,
    ExpandLess,
    ExpandMore,

    Dashboard as DashboardIcon,
    School as SchoolIcon,
    Label as LabelIcon,
    LibraryBooks as LibraryBooksIcon,
    Group as GroupIcon,
    SupervisedUserCircle as SupervisedUserCircleIcon,
    AssignmentInd as AssignmentIndIcon,
    PersonPinCircle as PersonPinCircleIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { List, ListItemIcon, Drawer, DrawerHeader, IconButton } from '../MaterialUI';
import AppBar from '../AppBar';

const Dashboard: React.FC = ({ children }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [peoplesIsOpen, setPeopleIsOpen] = useState(false);
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

    function handleTogglePeoples() {
        setPeopleIsOpen((state) => !state);
    }

    return (
        <Box sx={{
            display: 'flex',
            height: '100vh',
        }}>
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
                        Instituto Inventare
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
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </List>
                <List>
                    <ListItemButton onClick={handleTogglePeoples}>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Pessoas" />
                        {peoplesIsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={peoplesIsOpen} timeout="auto" unmountOnExit>
                        <List open={peoplesIsOpen} disablePadding>
                            <ListItem button>
                                <ListItemIcon>
                                    <SupervisedUserCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Administradores" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <AssignmentIndIcon />
                                </ListItemIcon>
                                <ListItemText primary="Professores" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <PersonPinCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Alunos" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
                <List>
                    <ListItemButton onClick={handleToggleSchool}>
                        <ListItemIcon>
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary="Escola" />
                        {schoolIsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={schoolIsOpen} timeout="auto" unmountOnExit>
                        <List open={schoolIsOpen} disablePadding>
                            <ListItem button component={Link} to="/subjects">
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
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    p: 3
                }}
            >
                <DrawerHeader />

                {children}
            </Box>
        </Box>
    );
};

export default Dashboard;

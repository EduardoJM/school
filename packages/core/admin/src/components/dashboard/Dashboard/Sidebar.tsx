import React, { useState } from 'react';
import {
    Collapse,
    ListItem,
    ListItemText,
    Divider,
    ListItemButton,
} from '@mui/material';
import {
    ExpandLess,
    ExpandMore,

    Dashboard as DashboardIcon,
    School as SchoolIcon,
    LibraryBooks as LibraryBooksIcon,
    Group as GroupIcon,
    SupervisedUserCircle as SupervisedUserCircleIcon,
    AssignmentInd as AssignmentIndIcon,
    PersonPinCircle as PersonPinCircleIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { List, ListItemIcon } from './MaterialUI';
import { Logo } from './Logo';

export const Sidebar: React.FC = () => {
    const [peoplesIsOpen, setPeopleIsOpen] = useState(false);
    const [schoolIsOpen, setSchoolIsOpen] = useState(false);

    function handleToggleSchool() {
        setSchoolIsOpen((state) => !state);
    };

    function handleTogglePeoples() {
        setPeopleIsOpen((state) => !state);
    }

    return (
        <>
            <Logo />
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
            </List>
            <Divider />
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
                    <List open={schoolIsOpen} disablePadding>
                        <ListItem button component={Link} to="/subjects">
                            <ListItemIcon>
                                <LibraryBooksIcon />
                            </ListItemIcon>
                            <ListItemText primary="Disciplinas" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            <Divider />
        </>
    );
};

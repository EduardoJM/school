import React, { ChangeEvent, useState } from 'react';
import {
    Avatar,

    Table,
    Box,
    Button,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    ButtonGroup,
    IconButton,
    Pagination,
    PaginationItem,
    TextField,

    Switch,

    Alert,
    CircularProgress,

    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import {
    Delete,
    Edit
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory, Link } from 'react-router-dom';
import { useSearchQuery } from '../../../hooks';
import { getSubjects, deleteSubject, partialUpdateSubject } from '../../../services/school';
import { Subject } from '../../../entities';
import { getDisplayErrorMessage } from '../../../utils/error';

export const SubjectsList: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const searchOptions = useSearchQuery({
        page: undefined,
        search: undefined,
    });
    const [search, setSearch] = useState(searchOptions.search || '');
    const queryClient = useQueryClient();
    const query = useQuery(['subjects', [searchOptions, search]], async () => getSubjects({ ...searchOptions, search }) );
    const history = useHistory();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState<Subject | null>(null);
    const deleteSubjectMutation = useMutation(deleteSubject, {
        onSuccess: () => {
            queryClient.invalidateQueries('subjects');
        },
        onError: (err) => {
            enqueueSnackbar(getDisplayErrorMessage(err), { variant: 'error' });
        },
    });
    const updateSubjectMutation = useMutation(partialUpdateSubject, {
        onSuccess: () => {
            queryClient.invalidateQueries('subjects');
        },
        onError: (err) => {
            enqueueSnackbar(getDisplayErrorMessage(err), { variant: 'error' });
        },
    });

    function handleOpenDeleteDialog(item: Subject) {
        setDeletingItem(item);
        setDeleteDialogOpen(true);
    }

    function handleCloseDeleteDialog() {
        setDeleteDialogOpen(false);
        setDeletingItem(null);
    }

    function handleConfirmDeleteDialog() {
        setDeleteDialogOpen(false);
        if (deletingItem) {
            deleteSubjectMutation.mutate(deletingItem.id);
            setDeletingItem(null);
        }
    }

    function handleAdd() {
        history.push('/subjects/add/');
    }

    function handleChangeSearchText(e: ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
        const url = new URL(window.location.href);
        url.searchParams.set('search', e.target.value);
        window.history.pushState({}, '', url.toString());
    }

    function handleSwitchToggle(item: Subject) {
        const data = new FormData();
        data.append('active', String(!item.active));
        updateSubjectMutation.mutate({ id: item.id, data });
    }

    return (
        <>
            <Box mt={3} sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
            }}>
                <Button variant="contained" onClick={handleAdd}>Adicionar</Button>
            </Box>
            <Box mt={3} mb={3}>
                <TextField
                    label="Pesquisar..."
                    variant="standard"
                    onChange={handleChangeSearchText}
                    value={search}
                    fullWidth
                />
            </Box>
            
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell width="80px">&nbsp;</TableCell>
                        <TableCell width="30px">ID</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell width="70px">Ativo</TableCell>
                        <TableCell width="300px">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {query.isLoading ? (
                        <TableRow>
                            <TableCell colSpan={5}>
                                <Box mt={3} mb={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <CircularProgress color="primary" />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : query.isError ? (
                        <TableRow>
                            <TableCell colSpan={5}>
                                <Box mt={3} mb={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                    <Alert severity="error">{getDisplayErrorMessage(query.error)}</Alert>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {query.data?.results.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Avatar src={item.icon} alt={item.name} sx={{ width: 80, height: 80 }} />
                                    </TableCell>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell sx={{ padding: 0 }}>
                                        <Switch defaultChecked={item.active} onChange={() => handleSwitchToggle(item)} />
                                    </TableCell>
                                    <TableCell>
                                        <ButtonGroup>
                                            <IconButton component={Link} to={`/subjects/${item.id}`}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleOpenDeleteDialog(item)}>
                                                <Delete />
                                            </IconButton>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </>
                    )}
                </TableBody>
            </Table>
            <Box mt={3} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Pagination
                    count={query.data?.pages}
                    page={parseInt(searchOptions.page || '1', 10)}
                    color="primary"
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`/subjects?${searchOptions.search ? `search=${searchOptions.search}&`: ''}${`page=${item.page}`}`}
                            {...item}
                        />
                    )}
                />
            </Box>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Deseja realmente deletar?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {deletingItem && (
                            <>Deseja deletar a disciplina: {deletingItem.name}?</>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
                    <Button onClick={handleConfirmDeleteDialog} autoFocus>Sim, Deletar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};


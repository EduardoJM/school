import React, { useState } from 'react';
import {
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

    Backdrop,
    Alert,
    CircularProgress,

    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,

    Typography,
} from '@mui/material';
import {
    Delete,
    Edit
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { getDisplayErrorMessage } from '../../../utils/error';

export interface ResourcesFetchItem<FetchOptions = any, FetchResult = { results: any[]; pages: number; }> {
    fields: {
        displayName: string;
        fieldName: string;
        width?: string | number;
        render?: (item: any) => React.ReactNode;
    }[];
    fetchOptions: FetchOptions;
    fetchFunction: (data: FetchOptions) => Promise<FetchResult>;
}

export interface ResourcesTableListProps {
    resourceIdentifier: string;
    resourceName?: string;
    fetch: ResourcesFetchItem;
    hasActions?: boolean;
    addLink?: string;
    canDelete?: boolean;
    displayNameProp?: string;
    identifierProp?: string;
    deleteFunction?: (id: string | number) => Promise<any>;
    canEdit?: boolean;
    editLinkPrefix?: string;
    searchLinkPrefix?: string;
    renderCustomActions?: (item: any) => React.ReactNode;
}

export const ResourcesTableList: React.FC<ResourcesTableListProps> = (props) => {
    const {
        resourceIdentifier,
        resourceName = '',
        fetch,
        addLink,
        hasActions = false,
        canDelete = false,
        deleteFunction,
        displayNameProp = 'name',
        identifierProp = 'id',
        canEdit = false,
        editLinkPrefix,
        searchLinkPrefix,
        renderCustomActions,
    } = props;
    const {
        fetchOptions,
        fetchFunction,
        fields,
    } = fetch;
    
    const { enqueueSnackbar } = useSnackbar();
    const query = useQuery([resourceIdentifier, fetchOptions], async () => fetchFunction(fetchOptions));

    const queryClient = useQueryClient();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState<any>(null);
    const deleteMutationFunction = deleteFunction !== undefined ? deleteFunction : (id: string | number) => {
        return new Promise((resolve) => resolve({}));
    };
    const deleteMutation = useMutation(deleteMutationFunction, {
        onSuccess: () => {
            setTimeout(() => queryClient.invalidateQueries(resourceIdentifier), 1000);
        },
        onError: (err) => {
            enqueueSnackbar(getDisplayErrorMessage(err), { variant: 'error' });
        },
    });

    function handleOpenDeleteDialog(item: Object) {
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
            deleteMutation.mutate(deletingItem[identifierProp]);
            setDeletingItem(null);
        }
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={deleteMutation.isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={fields.length - (hasActions ? 0 : 1)}>
                            <Typography component="h1" variant="h5">{resourceName}</Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                            {addLink && (
                                <Button variant="text" component={Link} to={addLink}>Adicionar</Button>
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {fields.map((item, index) => (
                            <TableCell width={item.width} key={index}>
                                {item.displayName}
                            </TableCell>
                        ))}
                        {hasActions && (
                            <TableCell width="300px">Ações</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(query.isLoading) ? (
                        <TableRow>
                            <TableCell colSpan={fields.length + (hasActions ? 1 : 0)}>
                                <Box mt={3} mb={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <CircularProgress color="primary" />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : query.isError ? (
                        <TableRow>
                            <TableCell colSpan={fields.length + (hasActions ? 1 : 0)}>
                                <Box mt={3} mb={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                    <Alert severity="error">{getDisplayErrorMessage(query.error)}</Alert>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {query.data?.results.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={fields.length + (hasActions ? 1 : 0)}>
                                        <Box mt={3} mb={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                            <Alert severity="info">Não foram encontrados registros.</Alert>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}
                            {query.data?.results.map((item) => (
                                <TableRow key={item.id}>
                                    {fields.map((field, index) => (
                                        <TableCell key={index}>
                                            {field.render ? (
                                                <>
                                                    {field.render(item)}
                                                </>
                                            ) : (
                                                <>
                                                    {String(item[field.fieldName])}
                                                </>
                                            )}
                                        </TableCell>
                                    ))}
                                    {hasActions && (
                                        <TableCell>
                                            <ButtonGroup>
                                                {canEdit && editLinkPrefix && (
                                                    <IconButton component={Link} to={`${editLinkPrefix}${item[identifierProp]}`}>
                                                        <Edit />
                                                    </IconButton>
                                                )}
                                                {canDelete && deleteFunction && (
                                                    <IconButton onClick={() => handleOpenDeleteDialog(item)}>
                                                        <Delete />
                                                    </IconButton>
                                                )}
                                                {renderCustomActions && (
                                                    <>{renderCustomActions(item)}</>
                                                )}
                                            </ButtonGroup>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </>
                    )}
                </TableBody>
            </Table>
            {searchLinkPrefix && (
                <Box mt={3} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Pagination
                        count={query.data?.pages}
                        page={parseInt(fetchOptions.page || '1', 10)}
                        color="primary"
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`${searchLinkPrefix}?${fetchOptions.search ? `search=${fetchOptions.search}&`: ''}${`page=${item.page}`}`}
                                {...item}
                            />
                        )}
                    />
                </Box>
            )}

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
                            <>Deseja deletar a disciplina: {deletingItem[displayNameProp]}?</>
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

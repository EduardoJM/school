import React, { useState, useMemo } from 'react';
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
    SelectChangeEvent,
    FormControl,
    Select,
    MenuItem,
    Typography,
} from '@mui/material';
import {
    Delete,
    Edit
} from '@mui/icons-material';
import { useQuery } from 'react-query';
import { useHistory, Link } from 'react-router-dom';
import { useSearchQuery } from '../../../hooks';
import { getSubjects } from '../../../services/school';

export const SubjectsList: React.FC = () => {
    const searchOptions = useSearchQuery({
        size: undefined,
        after: undefined,
        before: undefined,
        search: undefined,
        orderby: undefined,
        order: undefined,
    });
    const query = useQuery(['subjects', searchOptions], async () => getSubjects(searchOptions) );
    const history = useHistory();
    const [nextLink, prevLink] = useMemo(() => {
        let next : string | null = null;
        let prev : string | null = null;
        if (!query.data) {
            return [next, prev];
        }
        const after = query.data.cursor.afterCursor;
        const before = query.data.cursor.beforeCursor;
        if (after) {
            let queries = '';
            Object.keys(searchOptions).forEach((k) => {
                let value = (searchOptions as any)[k];
                if (k === 'after') {
                    value = after;
                } else if (k === 'before' || !value) {
                    return;
                }
                queries = `${queries}${queries === '' ? `?${k}=${value}` : `&${k}=${value}`}`;
            });
            next = `/subjects${queries}`;
        }
        if (before) {
            let queries = '';
            Object.keys(searchOptions).forEach((k) => {
                let value = (searchOptions as any)[k];
                if (k === 'before') {
                    value = before;
                } else if (k === 'after' || !value) {
                    return;
                }
                queries = `${queries}${queries === '' ? `?${k}=${value}` : `&${k}=${value}`}`;
            });
            prev = `/subjects${queries}`;
        }
        return [next, prev];
    }, [searchOptions, query]);
    const [itensPerPage, setItensPerPage] = useState('10');

    function handleChangeItensPerPage(e: SelectChangeEvent) {
        setItensPerPage(e.target.value);
        history.push(`/subjects?size=${e.target.value}`);
    }

    function handleAdd() {
        history.push('/subjects/add/');
    }

    if (query.isLoading) {
        return <p>Carregando...</p>;
    }

    if (query.isError) {
        return <p>Erro: {String(query.error)}</p>
    }

    return (
        <>
            <Box mt={3} sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
            }}>
                <Button variant="contained" onClick={handleAdd}>Adicionar</Button>
            </Box>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Ativo</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {query.data?.results.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.active ? 'Sim' : 'Não'}</TableCell>
                            <TableCell>
                                <ButtonGroup>
                                    <IconButton><Edit /></IconButton>
                                    <IconButton><Delete /></IconButton>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box mt={3}>
                <Typography mr={2} variant="body1" component="span">Qtde: </Typography>
                <FormControl variant="standard" sx={{ marginRight: 2 }}>
                    <Select
                        value={itensPerPage}
                        onChange={handleChangeItensPerPage}
                        autoWidth
                    >
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="15">15</MenuItem>
                        <MenuItem value="20">20</MenuItem>
                        <MenuItem value="50">50</MenuItem>
                        <MenuItem value="100">100</MenuItem>
                    </Select>
                </FormControl>
                <ButtonGroup>
                    {prevLink ? (
                        <Button component={Link} to={prevLink}>
                            Página Anterior
                        </Button>
                    ) : (
                        <Button disabled>Página Anterior</Button>
                    )}
                    {nextLink ? (
                        <Button component={Link} to={nextLink}>
                            Próxima Página
                        </Button>
                    ) : (
                        <Button disabled>Próxima Página</Button>
                    )}
                </ButtonGroup>
            </Box>
        </>
    );
};


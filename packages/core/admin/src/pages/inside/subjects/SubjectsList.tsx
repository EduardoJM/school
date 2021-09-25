import React from 'react';
import {
    Table,
    Box,
    Button,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { getSubjects } from '../../../services/school';

export const SubjectsList: React.FC = () => {
    const query = useQuery('subjects', getSubjects);
    const history = useHistory();

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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {query.data?.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};


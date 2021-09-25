import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    TextField,
    Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { createSubject } from '../../../services/school';
import { getDisplayErrorMessage } from '../../../utils/error';

export const SubjectsAdd: React.FC = () => {
    const [name, setName] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const queryClient = useQueryClient();
    const createSubjectMutation = useMutation(createSubject, {
        onSuccess: () => {
            queryClient.invalidateQueries('subjects');
            history.push('/subjects/');
        },
        onError: (err) => {
            enqueueSnackbar(getDisplayErrorMessage(err), { variant: 'error' });
        },
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        createSubjectMutation.mutate(name, {});
    }

    return (
        <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Typography variant="h3" component="h1" mb={3}>Adicionar Nova Disciplina</Typography>
            
            <FormControl fullWidth>
                <TextField
                    id="subject-name"
                    label="Nome da Disciplina"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    helperText="Adicione o nome da nova disciplina"
                    variant="standard"
                />
            </FormControl>

            <Box mt={3} sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
            }}>
                <Button variant="contained" type="submit">Salvar</Button>
            </Box>
        </Box>
    );
};


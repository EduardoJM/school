import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    Box,
    Button,
    FormLabel,
    FormControl,
    FormControlLabel,
    Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { Form } from '@unform/web';
import { TextField, ImageDropzone, Checkbox } from '../../../components/forms';
import { createSubject } from '../../../services/school';
import { getDisplayErrorMessage } from '../../../utils/error';

export const SubjectsAdd: React.FC = () => {
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

    function handleSubmit(data: any) {
        const keys = Object.keys(data);
        const form = new FormData();
        keys.forEach((k) => form.append(k, data[k]));
        createSubjectMutation.mutate(form, {});
    }

    return (
        <Box>
            <Form onSubmit={handleSubmit}>
                <Typography variant="h3" component="h1" mb={3}>Adicionar Nova Disciplina</Typography>
                
                <Box mb={3}>
                    <FormControl fullWidth>
                        <TextField
                            id="subject-name"
                            name="name"
                            label="Nome da Disciplina"
                            helperText="Adicione o nome da nova disciplina"
                            variant="standard"
                        />
                    </FormControl>
                </Box>

                <Box mb={3}>
                    <FormControl fullWidth>
                        <FormLabel>Ícone</FormLabel>
                    </FormControl>
                    <ImageDropzone name="icon" />
                </Box>

                <FormControlLabel
                    control={<Checkbox name="active" defaultChecked />}
                    label="Disciplina está ativa?"
                />

                <Box mb={3} sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                }}>
                    <Button variant="contained" type="submit">Salvar</Button>
                </Box>
            </Form>
        </Box>
    );
};

import React, { useState, useEffect, useRef } from 'react';
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
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useParams } from 'react-router-dom';
import { TextField, ImageDropzone, Checkbox } from '../../../components/forms';
import { createSubject, partialUpdateSubject, getSubjectById } from '../../../services/school';
import { getDisplayErrorMessage } from '../../../utils/error';
import { Subject } from '../../../entities';

export const SubjectsAdd: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const queryClient = useQueryClient();
    const createSubjectMutation = useMutation(createSubject, {
        onSuccess: () => {
            setTimeout(() => queryClient.invalidateQueries('subjects'), 1000);
            history.push('/subjects/');
        },
        onError: (err) => {
            enqueueSnackbar(getDisplayErrorMessage(err), { variant: 'error' });
        },
    });
    const updateSubjectMutation = useMutation(partialUpdateSubject, {
        onSuccess: () => {
            setTimeout(() => queryClient.invalidateQueries('subjects'), 1000);
            history.push('/subjects/');
        },
        onError: (err) => {
            enqueueSnackbar(getDisplayErrorMessage(err), { variant: 'error' });
        },
    });
    const { id } = useParams<{ id?: string }>();
    const [subject, setSubject] = useState<Subject | null>(null);
    const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        async function loadSubject() {
            if (!id) {
                return;
            }
            try {
                const item = await getSubjectById(id);
                formRef.current?.setData(item);
                setSubject(item);
            } catch (err) {
                enqueueSnackbar(getDisplayErrorMessage(err), { variant: 'error' });
                history.push('/subjects/');
            }
        }

        loadSubject();
    }, [id, history, enqueueSnackbar]);

    function handleSubmit(data: any) {
        if (subject) {
            const keys = Object.keys(data);
            const form = new FormData();
            keys.forEach((k) => {
                if (k === 'icon' && !data[k]) {
                    return;
                }
                if (data[k] !== (subject as any)[k]) {
                    form.append(k, data[k]);
                }
            });
            updateSubjectMutation.mutate({
                id: subject.id,
                data: form,
            });
        } else {
            const keys = Object.keys(data);
            const form = new FormData();
            keys.forEach((k) => form.append(k, data[k]));
            createSubjectMutation.mutate(form, {});
        }
    }

    return (
        <Box>
            <Form onSubmit={handleSubmit} ref={formRef}>
                <Typography variant="h3" component="h1" mb={3}>
                    {subject ? 'Modificar Disciplina' : 'Adicionar Nova Disciplina'}
                </Typography>
                
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

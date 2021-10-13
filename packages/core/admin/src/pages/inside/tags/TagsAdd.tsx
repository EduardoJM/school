import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Typography,
    Backdrop,
    CircularProgress,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { TextField, Checkbox } from '../../../components/forms';
import { getDisplayErrorMessage } from '../../../utils/error';
import { createTag, getTagById, partialUpdateTag } from '../../../services/school'
import { Tag } from '../../../entities';

export const TagsAdd: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const { subject, id } = useParams<{ subject?: string; id?: string; }>();
    const queryClient = useQueryClient();
    const createTagMutation = useMutation(createTag, {
        onSuccess: () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    queryClient.invalidateQueries('tags');
                    history.push(`/tags/${subject}`);
                    resolve(null);
                }, 500);
            });
        },
        onError: (err) => {
            enqueueSnackbar(getDisplayErrorMessage(err), { variant: 'error' });
        },
    });
    const updateTagMutation = useMutation(partialUpdateTag, {
        onSuccess: () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    queryClient.invalidateQueries('tags');
                    history.push(`/tags/${subject}`);
                    resolve(null);
                }, 500);
            });
        },
        onError: (err) => {
            enqueueSnackbar(getDisplayErrorMessage(err), { variant: 'error' });
        },
    });
    const [tag, setTag] = useState<Tag | null>(null);
    const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        async function loadTag() {
            if (!id) {
                return;
            }
            try {
                const item = await getTagById(id);
                // TODO: check if item subject id and param subject id are equals
                formRef.current?.setData(item);
                setTag(item);
            } catch (err) {
                enqueueSnackbar(getDisplayErrorMessage(err), { variant: 'error' });
                history.push(`/tags/${subject}`);
            }
        }

        loadTag();
    }, [id, subject, history, enqueueSnackbar]);

    function handleSubmit(data: any) {
        if (tag) {
            const keys = Object.keys(data);
            const form = new FormData();
            keys.forEach((k) => {
                if (data[k] !== (subject as any)[k]) {
                    form.append(k, data[k]);
                }
            });
            updateTagMutation.mutate({
                id: tag.id,
                data: form,
            });
        } else {
            if (!subject) {
                enqueueSnackbar('Houve um erro ao salvar pois a disciplina não estava presente.', { variant: 'error' });
                history.push('/subjects');
                return;
            }
            const keys = Object.keys(data);
            const form = new FormData();
            keys.forEach((k) => form.append(k, data[k]));
            form.append('subject', subject);
            createTagMutation.mutate(form, {});
        }
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={updateTagMutation.isLoading || createTagMutation.isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box>
                <Form onSubmit={handleSubmit} ref={formRef}>
                    <Typography variant="h3" component="h1" mb={3}>
                        {tag ? 'Modificar Conteúdo' : 'Adicionar Novo Conteúdo'}
                    </Typography>
                    
                    <Box mb={3}>
                        <FormControl fullWidth>
                            <TextField
                                id="subject-name"
                                name="name"
                                label="Nome do Conteúdo"
                                helperText="Adicione o nome do novo conteúdo"
                                variant="standard"
                            />
                        </FormControl>
                    </Box>

                    <FormControlLabel
                        control={<Checkbox name="active" defaultChecked />}
                        label="Conteúdo está ativo?"
                    />

                    <Box mb={3} sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                    }}>
                        <Button variant="contained" type="submit">Salvar</Button>
                    </Box>
                </Form>
            </Box>
        </>
    );
};

import React from 'react';
import { Switch, CircularProgress, Backdrop } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { useSearchParamsDictionary } from '../../../contexts';
import { getTags, deleteTag, partialUpdateTag } from '../../../services/school';
import { ResourcesTableList } from '../../../components/dashboard/ResourcesTableList/ResourcesTableList';
import { getDisplayErrorMessage } from '../../../utils/error';

export const TagsList: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { subject } = useParams<{ subject?: string }>();
    const searchOptions = useSearchParamsDictionary({
        page: undefined,
        search: undefined,
    });
    const queryClient = useQueryClient();
    const updateTagMutation = useMutation(partialUpdateTag, {
        onSuccess: () => {
            setTimeout(() => queryClient.invalidateQueries('tags'), 1000);
        },
        onError: (err) => {
            enqueueSnackbar(getDisplayErrorMessage(err), { variant: 'error' });
        },
    });

    function handleSwitchToggle(item: any) {
        const data = new FormData();
        data.append('active', String(!item.active));
        updateTagMutation.mutate({ id: item.id, data });
    }

    function renderActiveSwitch(item: any) {
        return (
            <Switch defaultChecked={item.active} onChange={() => handleSwitchToggle(item)} />
        );
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={updateTagMutation.isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <ResourcesTableList
                resourceIdentifier="tags"
                fetch={{
                    fields: [
                        { displayName: 'ID', fieldName: 'id', width: '30px' },
                        { displayName: 'Nome', fieldName: 'name' },
                        {
                            displayName: 'Ativo',
                            fieldName: 'active',
                            width: '70px',
                            render: renderActiveSwitch,
                        },
                    ],
                    fetchOptions: { ...searchOptions, subject },
                    fetchFunction: getTags,
                }}
                hasActions={true}
                addLink={`/tags/${subject}/add`}
                canDelete={true}
                deleteFunction={deleteTag}
                canEdit={true}
                editLinkPrefix={`/tags/${subject}/`}
                searchLinkPrefix={`/tags/${subject}`}
                resourceName="Conteúdos"
            />
        </>
    );
};

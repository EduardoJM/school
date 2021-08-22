import React, { useState, FormEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';

export interface TabUploadProps {
    uploadSuccess?: () => void;
}

const TabUpload: React.FC<TabUploadProps> = (props) => {
    const { uploadSuccess } = props;

    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const [currentFile, setCurrentFile] = useState<File | null>(null);

    const [addTitle, setAddTitle] = useState('');

    const addImageMutation = useMutation((frmData: FormData) => fetch(`${process.env.API_URL}/api/v1/image_list/`, {
        method: 'post',
        body: frmData,
    }), {
        onSuccess: () => {
            if (uploadSuccess) {
                uploadSuccess();
            }
        },
    });

    const { getRootProps, getInputProps } = useDropzone({
        onDrop(acceptedFiles: File[]) {
            const file = acceptedFiles[0];
            if (file.size >= 1048576) {
                // eslint-disable-next-line no-alert
                alert('Tamanho do arquivo deve ser de, no máximo, 1 MB.');
                return;
            }
            const fileUrl = URL.createObjectURL(file);
            setCurrentFile(file);
            setSelectedFileUrl(fileUrl);
        },
        accept: 'image/*',
    });

    function handleUploadPhoto(e: FormEvent) {
        e.preventDefault();
        const frm = new FormData();
        frm.append('title', addTitle);
        frm.append('image', currentFile);
        addImageMutation.mutate(frm);
    }

    return (
        <>
            {addImageMutation.isLoading && (
                <div className="error-container">
                    Enviando...
                </div>
            )}
            {addImageMutation.error && (
                <div className="error-container">
                    Aconteceu um erro ao enviar...
                </div>
            )}
            {!addImageMutation.isLoading && !addImageMutation.error && (
                <form method="post" onSubmit={handleUploadPhoto}>
                    <div className="form-row">
                        <div className="dropzone" {...getRootProps()}>
                            <input accept="image/*" {...getInputProps()} />
                            {selectedFileUrl ? (
                                <img
                                    src={selectedFileUrl}
                                    alt="Imagem para ser enviada"
                                />
                            ) : (
                                <p>
                                    <i className="material-icons">file_upload</i>
                                    Imagem para ser enviada
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="form-row">
                        <label htmlFor="image-description">
                            Descrição
                            <strong>*</strong>
                            :
                            <input
                                id="image-description"
                                type="text"
                                value={addTitle}
                                onChange={(e) => setAddTitle(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="submit-row">
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            )}
        </>
    );
};

export default TabUpload;

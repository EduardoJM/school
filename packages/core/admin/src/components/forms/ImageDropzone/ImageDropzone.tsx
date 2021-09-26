import React, { useEffect, useRef, useState } from 'react';
import {
    styled,
    Box,
    Typography,
} from '@mui/material';
import { Landscape } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useField } from '@unform/core';

interface ImageDropzoneProps {
    name: string;
}

interface InputRefProps extends HTMLInputElement {
    acceptedFile: File | null;
}

const ImageDropzoneContainer = styled(Box)(({ theme }) => ({
    height: 200,
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
    borderStyle: 'dashed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
}));

interface ImagePreviewProps {
    src: string;
}

const ImagePreview = styled(Box)<ImagePreviewProps>(({ theme, src }) => ({
    width: 150,
    height: 150,
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPOsition: 'center',
}));

export const ImageDropzone: React.FC<ImageDropzoneProps> = (props) => {
    const { name } = props;
    const inputRef = useRef<InputRefProps>(null);
    const { fieldName, registerField } = useField(name);
    
    const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: (files) => {
            if (files.length > 0 && inputRef.current) {
                inputRef.current.acceptedFile = files[0];
                setCurrentFileUrl(URL.createObjectURL(files[0]));
            }
        },
    });

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            getValue: (ref: InputRefProps) => {
                return ref.acceptedFile || null;
            },
            clearValue: (ref: InputRefProps) => {
                ref.acceptedFile = null;
                setCurrentFileUrl(null);
            },
            setValue: (ref: InputRefProps, value) => {
                ref.acceptedFile = value;
                setCurrentFileUrl(URL.createObjectURL(value));
            },
        });
    }, [fieldName, registerField]);

    return (
        <ImageDropzoneContainer
            {...getRootProps()}
            onClick={() => inputRef.current?.click()}
        >
            <input {...getInputProps()} accept="image/*" ref={inputRef} />

            {currentFileUrl ? (
                <ImagePreview src={currentFileUrl} />
            ) : (
                <>
                    {isDragActive ? (
                        <Typography variant="body1" component="span">Solte o arquivo aqui...</Typography>
                    ) : (
                        <>
                            <Landscape sx={{ width: 64, height: 'auto' }} />
                            <Typography variant="body1" component="span">Solte seu arquivo aqui ou clique para <b>procurar</b></Typography>
                        </>
                    )}
                </>
            )}
        </ImageDropzoneContainer>
    );
};
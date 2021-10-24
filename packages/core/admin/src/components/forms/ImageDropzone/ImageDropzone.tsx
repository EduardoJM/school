import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { Landscape } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useField } from '@unform/core';
import { ImageDropzoneContainer, ImagePreview } from './styles';

interface ImageDropzoneProps {
    name: string;
}

interface InputRefProps extends HTMLInputElement {
    acceptedFile: File | null;
}

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
                if (typeof value === 'string') {
                    setCurrentFileUrl(value);
                } else {
                    ref.acceptedFile = value;
                    setCurrentFileUrl(URL.createObjectURL(value));
                }
            },
        });
    }, [fieldName, registerField]);

    return (
        <ImageDropzoneContainer
            {...getRootProps()}
            onClick={() => inputRef.current?.click()}
        >
            <input data-testid="input" {...getInputProps()} accept="image/*" ref={inputRef} />

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

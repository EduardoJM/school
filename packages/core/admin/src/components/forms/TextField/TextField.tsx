import React, { useRef, useEffect, useState, RefObject } from 'react';
import { useField } from '@unform/core';
import {
    TextField as MaterialTextField,
    TextFieldProps as MaterialTextFieldProps,
} from '@mui/material';

export const TextField: React.FC<MaterialTextFieldProps> = (props) => {
    const { name, ...rest } = props;
    const inputRef = useRef<HTMLDivElement>(null);
    const { fieldName, registerField, defaultValue } = useField(name || 'text-field-input');
    const [value, setValue] = useState<string>(defaultValue);

    useEffect(() => {
        function getInput(base: HTMLDivElement | null) {
            if (!base) {
                return null;
            }
            const input = base.querySelector('input[type=text]');
            if (!input) {
                return null;
            }
            return input as HTMLInputElement;
        }

        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: (ref: RefObject<HTMLDivElement>) => {
                const input = getInput(ref.current);
                return input ? input.value : '';
            },
            setValue: (ref, value) => {
                const input = getInput(ref.current);
                if (input) {
                    input.value = value;
                    setValue(value);
                }
            },
            clearValue: (ref) => {
                const input = getInput(ref.current);
                if (input) {
                    input.value = defaultValue;
                    setValue(defaultValue);
                }
            },
        })
    }, [fieldName, registerField]);
    
    return (
        <MaterialTextField
            name={name}
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...rest}
        />
    );
}

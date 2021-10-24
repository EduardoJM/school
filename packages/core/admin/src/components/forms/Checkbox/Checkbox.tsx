import React, { useRef, useState, useEffect, RefObject } from 'react';
import { useField } from '@unform/core';
import {
    Checkbox as MaterialCheckbox,
    CheckboxProps as MaterialCheckboxProps,
} from '@mui/material';

export const Checkbox: React.FC<MaterialCheckboxProps> = (props) => {
    const { name, ...rest } = props;
    const inputRef = useRef<HTMLButtonElement>(null);
    const { fieldName, registerField, defaultValue } = useField(name || 'checkbox-input');
    const [checked, setChecked] = useState<boolean>(defaultValue);

    useEffect(() => {
        function getInput(base: HTMLSpanElement | null) {
            if (!base) {
                return null;
            }
            const input = base.querySelector('input[type=checkbox]');
            if (!input) {
                return null;
            }
            return input as HTMLInputElement;
        }

        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: (ref: RefObject<HTMLSpanElement>) => {
                const input = getInput(ref.current);
                if (!input) {
                    return false;
                }
                return input.checked;
            },
            setValue: (ref, value) => {
                const input = getInput(ref.current);
                if (input) {
                    input.checked = value;
                    setChecked(value);
                }
            },
            clearValue: (ref) => {
                const input = getInput(ref.current);
                if (input) {
                    input.checked = defaultValue;
                    setChecked(defaultValue);
                }
            },
        })
    }, [fieldName, registerField]);

    return (
        <MaterialCheckbox
            name={name}
            ref={inputRef}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            {...rest}
        />
    )
};

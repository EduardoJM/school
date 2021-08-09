import React, { useEffect, useRef, InputHTMLAttributes, ReactNode } from 'react'
import { useField } from '@unform/core'
import { InputContainer, InputControl } from './styles';

export interface InputProps extends InputHTMLAttributes<any> {
    name: string;
    label?: string;
    icon?: ReactNode;
}

const Input: React.FC<InputProps> = (props) => {
    const {
        name,
        id,
        icon,
        label,
        ...rest
    } = props;
    const inputRef = useRef(null)
    const {
        fieldName,
        defaultValue,
        registerField,
        error
    } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => {
                return ref.current.value
            },
            setValue: (ref, value) => {
                ref.current.value = value
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        });
    }, [fieldName, registerField])
    return (
        <>
            {label && id && (
                <label htmlFor={id}>{label}</label>
            )}
            <InputContainer>
                {icon && <>{icon}</>}
                <InputControl
                    ref={inputRef}
                    defaultValue={defaultValue}
                    id={id}
                    {...rest}
                />
            </InputContainer>
        </>
    );
}

export default Input;

import React from 'react';
import classes from './Input.module.css'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    isError?: boolean;
    helperText?: string;
}

export const Input: React.FC <InputProps> = ( { isError = false, helperText, ...props}) => {

    return (
        <>
            <input className={`${classes.input} ${isError ? classes.error : ''}`} {...props}/>
        </>
    )
}
import React from 'react';
import classes from './Input.module.css'

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
    isError?: boolean;
    helperText?: string;
}

export const Input: React.FC <InputProps> = ( { isError = false, helperText, ...props}) => {

    return (
        <>
            <input className={`${classes.input} ${isError ? classes.error : ''}`} {...props}/>
            { isError && helperText && <div className={classes.helper_text}>{helperText}</div>}
        </>
    )
}
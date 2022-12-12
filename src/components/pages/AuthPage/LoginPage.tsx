import React from 'react';
import { Input } from '../../../UI/Input/Input'
import { Button } from '../../../UI/Buttons/Button';
import {useState} from "react";

import styles from './LoginPage.module.css'

interface FormErrors {
    username: string | null;
    password: string | null
}

const validateIsEmpty = (value: string) => {
    if (!value) return 'field required';
    return null;
}

const validateUsername = (value:string) => {
    return validateIsEmpty(value)
}

const validatePassword = (value:string) => {
    return validateIsEmpty(value)
}

const loginFormValidateSchema = {
    username : validateUsername,
    password : validatePassword
}

const validateLoginForm  = (name: keyof typeof loginFormValidateSchema, value: string) =>{
    return loginFormValidateSchema[name](value)
}

export const LoginPage = () => {

    const [formValues, setFormValue] = useState({ username : '', password: ''})
    const [formErrors, setFormErrors] = useState<FormErrors> ({
        username: null, password: null
    })

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header_container}>Hitcher</div>
                <div className={styles.form_container}>
                    <div className={styles.input_container}>
                        <Input
                            value={formValues.username}
                            placeholder="username"
                            onChange={(event :React.ChangeEvent<HTMLInputElement>) => {
                                const username = event.target.value;
                                setFormValue({...formValues, username})
                                const error = validateLoginForm('username', username)
                                return setFormErrors({...formErrors, username: error})
                            }
                            }
                            {...(!!formErrors.username && {
                                isError: !!formErrors.username,
                                helperText: formErrors.username
                            })}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <Input
                            type="password"
                            value={formValues.password}
                            placeholder="password"
                            onChange={(event :React.ChangeEvent<HTMLInputElement>) => {
                                const password = event.target.value;
                                setFormValue({...formValues, password})
                                const error = validateLoginForm('password', password)
                                return setFormErrors({...formErrors, password: error})
                            }
                            }
                            {...(!!formErrors.password && {
                                    isError: !!formErrors.password,
                                    helperText: formErrors.password
                                }
                            )}
                        />
                    </div>
                    <div>
                        <Button>Sign in</Button>
                    </div>
                </div>
                <div className={styles.sign_up_container}>
                    Create new account
                </div>
            </div>
        </div>
    );
};
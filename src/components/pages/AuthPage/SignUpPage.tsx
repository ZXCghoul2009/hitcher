import React from 'react';
import { Input } from '../../../UI/Input/Input'
import {PasswordInput} from '../../../UI/Input/PasswordInput/PasswordInput'
import { Button } from '../../../UI/Buttons/Button';
import {useState} from "react";

import styles from './LoginPage.module.css'
import {useNavigate} from "react-router-dom";


interface FormErrors {
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

const validateIsEmpty = (value: string) => {
  if (!value) return 'Поле должно быть заполненно';
  return null;
}

const validateIsEMail = (value: string) => {
  if (!value.includes('@')) return 'Поле должно содержать @';
  return null;
}

const validateLength = (value: string) => {
  if (value.length < 6) return 'Минимум 6 символов';
  return null;
}

const validateIsEqual = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) return 'Пароли не совпадают';
  return null;
}


const validateEmail = (value: string) => {
  return validateIsEmpty(value) || validateIsEMail(value)
}

const validatePassword = (value: string) => {
  return validateIsEmpty(value) || validateLength(value)
}

const validateConfirmPassword = (value: string) => {
  return validateIsEmpty(value) || validateLength(value)
}

const signUpFormValidateSchema = {
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
}

const validateSignUpForm = (name: keyof typeof signUpFormValidateSchema, value: string) => {
  return signUpFormValidateSchema[name](value)
}

export const SignUpPage = () => {
  const navigate = useNavigate()

  const [formValues, setFormValue] = useState({email: '', password: '', confirmPassword: ''})
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: null, password: null, confirmPassword: null
  })

  return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header_container}>Hitcher</div>
          <form>
            <div className={styles.form_container}>
              <label htmlFor="password">Почта</label>
              <div className={styles.input_container}>
                <Input
                    value={formValues.email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const email = event.target.value;
                      setFormValue({...formValues, email})
                      const error = validateSignUpForm('email', email)
                      return setFormErrors({...formErrors, email: error})
                    }
                    }
                    {...(!!formErrors.email && {
                      isError: !!formErrors.email,
                      helperText: formErrors.email
                    })}
                />
              </div>
              <label htmlFor="password">Пароль</label>
              <div className={styles.input_container}>
                <PasswordInput
                    type="password"
                    value={formValues.password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const password = event.target.value;
                      setFormValue({...formValues, password})
                      const error = validateSignUpForm('password', password)
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
              <div className={styles.input_container}>
                <label htmlFor="password">Повторите пароль</label>
                <PasswordInput
                    type="password"
                    value={formValues.confirmPassword}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const confirmPassword = event.target.value;
                      setFormValue({...formValues, confirmPassword})
                      const error = validateSignUpForm('confirmPassword', confirmPassword)
                      return setFormErrors({...formErrors, confirmPassword: error})
                    }
                    }
                    {...(!!formErrors.confirmPassword &&  {
                          isError: !!formErrors.confirmPassword,
                          helperText: formErrors.confirmPassword
                        }
                    ) || (formValues.password !== formValues.confirmPassword && {
                      isError: !!formErrors.confirmPassword,
                      helperText: 'Пароли не совпадают'
                    })}
                />
              </div>
              <div>
                <Button onClick={() => navigate('/signup/confirm')} >Создать</Button>
              </div>
            </div>
          </form>

          <div onClick={() => navigate('/auth')} className={styles.sign_up_container}>
            Войти в аккаунт
          </div>
        </div>
      </div>
  );
};
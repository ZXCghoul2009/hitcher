import React from 'react';
import { Input } from '../../../UI/Input/Input'
import { Button } from '../../../UI/Buttons/Button';
import {PasswordInput} from '../../../UI/Input/PasswordInput/PasswordInput'
import {useState} from "react";

import styles from './LoginPage.module.css'
import {useNavigate} from "react-router-dom";

interface FormErrors {
  email: string | null;
  password: string | null
}

const validateIsEmpty = (value: string) => {
  if (!value) return 'Поле должно быть заполнено';
  return null;
}

const validateIsEMail = (value: string) => {
  if (!value.includes('@')) return 'Поле должно содержать @';
  return null;
}

const validateEmail = (value: string) => {
  return validateIsEmpty(value) || validateIsEMail(value)
}

const validatePassword = (value: string) => {
  return validateIsEmpty(value)
}

const loginFormValidateSchema = {
  email: validateEmail,
  password: validatePassword
}

const validateLoginForm = (name: keyof typeof loginFormValidateSchema, value: string) => {
  return loginFormValidateSchema[name](value)
}

export const LoginPage = () => {
  const navigate = useNavigate()

  const [formValues, setFormValue] = useState({email: '', password: ''})
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: null, password: null
  })

  return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header_container}>Hitcher</div>
          <div className={styles.form_container}>
            <div className={styles.input_container}>
              <Input
                  value={formValues.email}
                  placeholder="Почта"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const email = event.target.value;
                    setFormValue({...formValues, email})
                    const error = validateLoginForm('email', email)
                    return setFormErrors({...formErrors, email: error})
                   }
                  }
                  {...(!!formErrors.email && {
                    isError: !!formErrors.email,
                    helperText: formErrors.email
                  })}
              />
            </div>
            <div className={styles.input_container}>
              <PasswordInput
                  type="password"
                  value={formValues.password}
                  placeholder="Пароль"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
              <Button>Войти</Button>
            </div>
          </div>
          <div onClick={() => navigate('/signUp')} className={styles.sign_up_container}>
            Создать аккаунт
          </div>
        </div>
      </div>
  );
};
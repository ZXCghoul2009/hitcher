import React from 'react';
import { Input } from '../../../UI/Input/Input'
import {PasswordInput} from '../../../UI/Input/PasswordInput/PasswordInput'
import { Button } from '../../../UI/Buttons/Button';
import {useState} from "react";

import styles from './LoginPage.module.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";


interface FormErrors {
  username: string | null;
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

const validateIsEqual = (value: string, password: string ) => {
  if (password !== value) return 'Пароли не совпадают';
  return null;
}

const validateUsername = (value : string) => {
  return validateIsEmpty(value);
}

const validateEmail = (value: string) => {
  return validateIsEmpty(value) || validateIsEMail(value)
}

const validatePassword = (value: string) => {
  return validateIsEmpty(value) || validateLength(value)
}

const validateConfirmPassword = (value: string, password: string) => {
  return validateIsEmpty(value) || validateLength(value) || validateIsEqual(value, password)
}

const signUpFormValidateSchema = {
  username: validateUsername,
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
}

const validateSignUpForm = (name: keyof typeof signUpFormValidateSchema, value: string, password: string) => {
  return signUpFormValidateSchema[name](value,password)
}

export const SignUpPage = () => {
  const navigate = useNavigate()

  const [formValues, setFormValue] = useState({username:'', email: '', password: '', confirmPassword: ''})
  const [formErrors, setFormErrors] = useState<FormErrors>({
    username:null, email: null, password: null, confirmPassword: null
  })


  async function signup () {
    try {
      await axios.post('http://localhost:8081/signup', {
        username: formValues.username.trim(),
        email: formValues.email.trim(),
        password: formValues.password
      }, {
        headers :  {
          'Access-Control-Allow-Origin' : '*',
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      })
    }catch (e) {
      console.log(e)
    }
  }

  const SignUpHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formErrors) {
      signup()
    }
  }

  return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header_container}>Hitcher</div>
          <form onSubmit={SignUpHandler}>
            <div className={styles.form_container}>
              <label htmlFor="email">Имя пользователя</label>
              <div className={styles.input_container}>
                <Input
                    value={formValues.username}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const username = event.target.value;
                      setFormValue({...formValues, username})
                      const error = validateSignUpForm('username', username, formValues.password)
                      return setFormErrors({...formErrors, username: error})
                    }
                    }
                    {...(!!formErrors.username && {
                      isError: !!formErrors.username,
                      helperText: formErrors.username
                    })}
                />
              </div>
              <label htmlFor="password">Почта</label>
              <div className={styles.input_container}>
                <Input
                    value={formValues.email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const email = event.target.value;
                      setFormValue({...formValues, email})
                      const error = validateSignUpForm('email', email, formValues.password)
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
                      const error = validateSignUpForm('password', password, formValues.password)
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
                      const error = validateSignUpForm('confirmPassword', confirmPassword, formValues.password)
                      return setFormErrors({...formErrors, confirmPassword: error})
                    }
                    }
                    {... !!formErrors.confirmPassword &&  {
                          isError: !!formErrors.confirmPassword,
                          helperText: formErrors.confirmPassword
                        }
                    }
                />
              </div>
              <div>
                <Button>Создать</Button>
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
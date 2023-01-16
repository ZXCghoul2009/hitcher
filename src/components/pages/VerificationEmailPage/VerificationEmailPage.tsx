import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import OtpInput from 'react18-input-otp';

import styles from './VerificationEmailPage.module.css'


export const VerificationEmailPage: React.FC = () => {

  const notifySuccess = () => toast.success(`Аккаунт активирован`, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notifyError = ( ) => toast.error(`Неверный код`, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const navigate = useNavigate()

  const [code, setCode] = useState({otp: ''});

  const handleChangeOTP = (otp: string) => {
    setCode({ otp })
  };

  async function checkCode () {
    try {
      await axios.get('http://localhost:8081/verify', {
        headers : {
          'code' : `${code.otp}`
        }
      })
      notifySuccess()
      navigate('/')
    }catch (e) {
      notifyError()
    }
  }

  useEffect(()=> {
      if (code.otp.length === 6) {
        checkCode()
      }
  })

  return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className="row">
            <div >
              <h2>Проверьте вашу почту</h2>
              <p>Мы выслали на, указанную при регистрации, почту код-потверждения</p>
              <OtpInput
                value={code.otp}
                onChange={handleChangeOTP}
                numInputs={6}
                isInputNum={true}
                inputStyle = {styles.otp_field}
              />
            </div>
          </div>
        </div>
      </div>
  );
};


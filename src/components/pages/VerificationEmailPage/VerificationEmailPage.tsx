import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

import OtpInput from 'react-otp-input';

import styles from './VerificationEmailPage.module.css'

export const VerificationEmailPage: React.FC = () => {

  const navigate = useNavigate()

  const [code, setCode] = useState({otp: ''});
  const [error, setError] = useState<boolean>(true)

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
      setError(true)
      navigate('/')
    }catch (e) {
      console.log(e)
      setError(false)
    }

  }

  useEffect(()=> {
      if (code.otp.length === 6) {
        checkCode()
      }
  }, [code])

  return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className="row">
            <div >
              <h2>Проверьте вашу почту</h2>
              <p>Мы выслали на какая-то почту код-потверждения</p>
              <OtpInput
                value={code.otp}
                onChange={handleChangeOTP}
                numInputs={6}
                isInputNum={true}
                inputStyle = {styles.otp_field}
              />
              {!error && <p>Неверный код</p>}
            </div>
          </div>
        </div>
      </div>
  );
};


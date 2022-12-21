import React, {useEffect, useState} from 'react';

import styles from './VerificationEmailPage.module.css'

export const VerificationEmailPage: React.FC = () => {
  const [code, setCode] = useState(new Array(6).fill(""));

  const handleChange = (element: any, index:number) => {
    if (isNaN(element.value)) return false;

    setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };



  useEffect(()=> {
      if (code.join('').length === 6) {
        console.log(code.join(''))
      }
  }, [code])

  return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className="row">
            <div >
              <h2>Проверьте вашу почту</h2>
              <p>Мы выслали на какая-то почту код-потверждения</p>
              {code.map((data, index) => {
                return (
                    <input
                        className={styles.otp_field}
                        type="text"
                        maxLength={1}
                        key={index}
                        value={data}
                        onChange={e => handleChange(e.target, index)}
                        onFocus={e => e.target.select()}
                    />
                );
              })}
            </div>
          </div>
        </div>
      </div>

  );
};


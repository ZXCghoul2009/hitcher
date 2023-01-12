import React, {useEffect, useState} from 'react';

import styles from './PublicProfilePage.module.css'

import 'moment/locale/ru'
import {ProfileImg} from "../../../UI/ProfileImg/ProfileImg";



export const PublicProfilePage:React.FC = () => {


  return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.user_info}>
            <div>
              Николай
              <p>50 лет</p>
            </div>
          <ProfileImg/>
          </div>
          <div className={styles.verified}>
            <div className={styles.verified_image}/>
            Профиль потержден
          </div>
          <div className={styles.about}>
            <div >
              <h3>Николай о себе</h3>
            </div >
            <div className={styles.pric}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur, atque consequatur cum debitis dolor eius esse eveniet, expedita fugiat in laboriosam magni omnis quo quos ratione recusandae tempora, voluptates?
            </div>

          </div>
          <div className={styles.account_info}>
            <div className={styles.info} >
              Колчество поездок
            </div>
            <div className={styles.info}>
              Дата регистрации:
            </div>
          </div>
        </div>
      </div>
  );
};
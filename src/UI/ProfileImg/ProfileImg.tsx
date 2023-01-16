import React from 'react';

import styles from './ProfileImg.module.css'

export const ProfileImg = () => {
  const url = 'https://krot.info/uploads/posts/2022-03/1646806131_9-krot-info-p-zabavnie-obezyanki-smeshnie-foto-11.jpg'
  const path = ''
  return (
      <div className={styles.img_wrapper}>
        <img className={styles.img} src={url} alt="avatar"/>
      </div>
  );
};


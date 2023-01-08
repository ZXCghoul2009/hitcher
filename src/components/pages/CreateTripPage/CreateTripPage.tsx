import React from 'react';
import {CreateTripForm} from "../../CreateTripForm/CreateTripForm";

import styles from './CreateTripPage.module.css'

export const CreateTripPage: React.FC = () => {
  return (
      <div className={styles.page}>

        <div className={styles.trip_form}>
          <CreateTripForm/>
        </div>
      </div>
  );
};

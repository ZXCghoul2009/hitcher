import React, {useEffect} from 'react';
import {CreateTripForm} from "../../CreateTripForms/CreateTripForm";

import styles from './CreateTripPage.module.css'
import UserService from "../../../utils/service/UserService";
import {useNavigate} from "react-router-dom";

export const CreateTripPage: React.FC = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!UserService.isLoggedIn()){
      navigate('/auth')
    }
  },[])

  return (
      <div className={styles.page}>
        <h2>Станьте водителем - берите попутчиков и экономте деньги</h2>
        <div className={styles.trip_form}>
          <CreateTripForm/>
        </div>
      </div>
  );
};

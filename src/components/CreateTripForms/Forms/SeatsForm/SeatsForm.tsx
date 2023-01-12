import React from 'react';

import styles from './SeatsForm.module.css'

interface SeatsFormData {
  seats: number
}

type SeatsFormProps = SeatsFormData & {
  updateFields: (fields: Partial<SeatsFormData>) => void
}

const SeatsForm: React.FC<SeatsFormProps> = ({seats, updateFields}) => {
  const disableMinus = (seats:number) =>{
    if(seats <= 1){
      return 1
    }
    return seats
  }

  return (
      <div className={styles.seats_form}>
        <div>
          Пассажиров
        </div>
        <div className={styles.seats}>
          <div className={styles.minus} onClick={()=>updateFields({seats: disableMinus(seats -1)})}>
          </div>
          <span className={styles.seats_info}>
            {seats}
          </span>
          <div className={styles.plus} onClick={()=>updateFields({seats: seats+1})}>
          </div>
        </div>
      </div>
  );
};

export default SeatsForm;
import React from 'react';

import styles from './OptionsForm.module.css'
import {SwitchToggle} from "../../../../UI/SwtichToggle/SwitchToggle";

type OptionsFormData = {
  withAnimals: boolean
  threeBack: boolean,
  canSmoke: boolean
}

type OptionsFormProps = OptionsFormData & {
  updateFields: (fields: Partial<OptionsFormData>) => void
}



export const OptionsForm = ({withAnimals, canSmoke, threeBack, updateFields}:OptionsFormProps) => {
  return (
      <div className={styles.container}>
          Можно в машину с животными?
        <div className={styles.switch} >
          <SwitchToggle isOn={withAnimals} handleToggle={()=>updateFields({withAnimals: !withAnimals})} onColor={'#7588ff'} name={'withAnimals'}/>
        </div>
        Можно курить в машине?
        <div className={styles.switch} >
          <SwitchToggle isOn={canSmoke} handleToggle={()=>updateFields({canSmoke: !canSmoke})} onColor={'#7588ff'} name={'canSmoke'}/>
        </div>
        Три места сзади
        <div className={styles.switch} >
          <SwitchToggle isOn={threeBack} handleToggle={()=>updateFields({threeBack: !threeBack})} onColor={'#7588ff'} name={'threeBack'}/>
        </div>
      </div>
  );
};


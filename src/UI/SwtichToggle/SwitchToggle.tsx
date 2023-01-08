import React from 'react';
import styles from './SwitchToggle.module.css'

interface SwitchToggleProps {
  isOn: any;
  handleToggle: any,
  onColor:string
}

export const SwitchToggle: React.FC<SwitchToggleProps> = ({isOn, handleToggle, onColor}) => {
  return (
      <>
        <input
            checked={isOn}
            onChange={handleToggle}
            className={styles.switch_checkbox}
            id={`react-switch-new`}
            type="checkbox"
        />
        <label
            style={{ background: isOn && onColor }}
            className={styles.switch_label}
            htmlFor={`react-switch-new`}
        >
          {isOn && <span className={styles.switch_button}>Да</span>}
          {!isOn && <span className={styles.switch_button}/>}
        </label>
      </>
  );
};

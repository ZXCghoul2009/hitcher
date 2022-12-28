import React from 'react';
import classes from './DropDown.module.css'
import {Cities} from "../../Data/Cities";


interface DropDownProps {
  value:string
  cityClickHandler: any
}

export const DropDown: React.FC<DropDownProps> = ({ value, cityClickHandler }) => {
  const filteredCities = Cities.filter(city => {
    if (value.length > 1) {
      return city.name.toLowerCase().includes(value.toLowerCase());
    } else return null;
  })


      return (
          <ul className={classes.auto_complete}>
            { value && filteredCities.map((item: any, index) =>
            <li key={index}
            onClick={cityClickHandler}
            >{item.name} </li>
          )}
          </ul>

      )
};


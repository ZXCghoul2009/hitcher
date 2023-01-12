import React, {useState} from 'react';
import {CheckBox} from "../../UI/fields";


interface FilterTrips {
  checked: any
  updateFields: (checked:any)=> void
}

export const FilterTrips:React.FC<FilterTrips> = ({checked, updateFields}) => {

  return (
      <ul>
        <li>
          <CheckBox
              onClick={() => updateFields({
                ...checked,
                li1: !checked.li1,
                li2: false,
                li3: false,
                li4: false
              })}
              checked={checked.li1}
              label={'До 6:00'}
          />
        </li>
        <li><CheckBox
            onClick={() => updateFields({...checked, li2: !checked.li2, li1: false, li3: false, li4: false})}
            checked={checked.li2} label={'6:00-12:00'}/></li>
        <li><CheckBox
            onClick={() => updateFields({...checked, li3: !checked.li3, li1: false, li2: false, li4: false})}
            checked={checked.li3} label={'12:00-18:00'}/></li>
        <li><CheckBox
            onClick={() => updateFields({...checked, li4: !checked.li4, li1: false, li2: false, li3: false})}
            checked={checked.li4} label={'После 18:00'}/></li>
      </ul>
  );
};


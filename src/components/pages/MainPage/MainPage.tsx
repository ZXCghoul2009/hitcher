import React, {useState} from "react";
import classes from './MainPage.module.css'
import {Input} from "../../../UI/Input/Input";
import {Button} from "../../../UI/Buttons/Button";


export const MainPage: React.FC = () => {

    const confirmHandler = (value: string) => {
        console.log(formValues);
    }
    let currentDate:any = new Date();
    const [formValues, setFormValue] = useState({ departure : '', arrival: '', date : currentDate, seats: '1'})
    return (
        <div className={classes.page}>
            <div className={classes.container}>

                    <div className={classes.input_container}>
                        <Input type="text" placeholder="Откуда"
                               onChange={(event :React.ChangeEvent<HTMLInputElement>)=>{
                                   const departure = event.target.value;
                                   setFormValue({...formValues, departure })
                               }}
                        />
                    </div>
                    <div className={classes.input_container} >
                        <Input type="text" placeholder="Куда"
                               onChange={(event :React.ChangeEvent<HTMLInputElement>)=>{
                                   const arrival = event.target.value;
                                   setFormValue({...formValues, arrival })
                               }}
                        />
                    </div>
                    <div className={classes.input_container}>
                        <Input type="date"
                               onChange={(event :React.ChangeEvent<HTMLInputElement>)=>{
                                   const date = event.target.value;
                                   setFormValue({...formValues, date })
                               }}
                        />
                    </div>
                    <div className={classes.input_container}>
                        <Input type="number" placeholder="Мест" min="1"
                               onChange={(event :React.ChangeEvent<HTMLInputElement>)=>{
                                   const seats = event.target.value;
                                   setFormValue({...formValues, seats })
                               }}/>
                    </div>
                    <Button type="submit"
                    >Поиск</Button>
            </div>
        </div>
    )
}
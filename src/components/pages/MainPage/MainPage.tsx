import React, {useState} from "react";
import classes from './MainPage.module.css'
import {Input} from "../../../UI/Input/Input";
import {Button} from "../../../UI/Buttons/Button";
import {Cities} from "../../../Data/Cities";


export const MainPage: React.FC = () => {
    let currentDate:any = new Date();

    const [formValues, setFormValue] = useState({ departure : '', arrival: '', date : currentDate, seats: '1'})
    const [departureValue, setDepartureValue] = useState('');
    const [arrivalValue, setArrivalValue] = useState('');


    const filteredDepartureCities = Cities.filter(city => {
        if (departureValue.length > 1) {
            return city.name.toLowerCase().includes(departureValue.toLowerCase());
        }
    })

    const filteredArrivalCities = Cities.filter(city => {
        if (arrivalValue.length > 1) {
            return city.name.toLowerCase().includes(arrivalValue.toLowerCase());
        }
    })

    const cityDepartureClickHandler = (event: any) => {
        setDepartureValue(event.target.textContent)

    }

    const cityArrivalClickHandler = (event: any) => {
        setArrivalValue(event.target.textContent)
    }


    return (
        <div className={classes.page}>
            <div className={classes.container}>

                    <div className={classes.input_container}>
                        <Input type="text" placeholder="Откуда"
                               value={departureValue}
                               onChange={(event :React.ChangeEvent<HTMLInputElement>)=>{
                                   setDepartureValue(event.target.value)
                               }}
                        />
                        <ul className={classes.auto_complete}>
                            {
                                departureValue ? filteredDepartureCities.map((item:any) => {
                                    return (
                                        <li
                                            onClick={cityDepartureClickHandler}
                                        >{item.name} </li>
                                )
                            }) : null
                            }
                        </ul>
                    </div>
                    <div className={classes.input_container} >
                        <Input type="text" placeholder="Куда"
                               value={arrivalValue}
                               onChange={(event :React.ChangeEvent<HTMLInputElement>)=>{
                                   setArrivalValue(event.target.value)
                               }}
                        />
                        <ul className={classes.auto_complete}>
                            {
                                arrivalValue ? filteredArrivalCities.map((item:any) => {
                                    return (
                                        <li
                                            onClick={cityArrivalClickHandler}
                                        >{item.name} </li>
                                    )
                                }) : null
                            }
                        </ul>
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
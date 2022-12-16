import React from 'react';
import {Cards} from "../../utils/types/types";
import CardItem from "./CardItem";
import styles from './Card.module.css';
import {useNavigate} from "react-router-dom";

interface CardListProps {
    trips: Cards[]
}

export const Card: React.FC<CardListProps> =({ trips}) => {
    const history = useNavigate()
    return (
        <div className={styles.cards} >
            {trips.map(trip =>
                    <CardItem onClick={(card)=> history('/'+trip.id)} key={trip.id} trip={trip}/>
            )}
        </div>
    )
}
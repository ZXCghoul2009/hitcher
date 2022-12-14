import React from 'react';
import {Cards} from "../../utils/types/types";
import CardItem from "./CardItem";
import styles from './Card.module.css';
import {useNavigate} from "react-router-dom";

interface CardListProps {
    cards: Cards[]
}

export const Card: React.FC<CardListProps> =({ cards}) => {
    const history = useNavigate()
    return (
        <div className={styles.cards} >
            {cards.map(card =>
                    <CardItem onClick={(card)=> history('/'+card.id)} key={card.id} card={card}/>
            )}
        </div>
    )
}
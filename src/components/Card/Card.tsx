import React from 'react';
import {Cards} from "../../utils/types/types";
import CardItem from "./CardItem";
import styles from './Card.module.css';
interface CardListProps {
    cards: Cards[]
}

export const Card: React.FC<CardListProps> =({ cards}) => {
    return (
        <div className={styles.cards} >
            {cards.map(card =>
                    <CardItem key={card.id} card={card}/>
            )}
        </div>
    )
}
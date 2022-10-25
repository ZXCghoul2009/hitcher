import React from 'react';
import {Cards} from "../../utils/types/types";
import styles from './Card.module.css';

interface CardItemProps {
    card: Cards;
}

const CardItem: React.FC<CardItemProps> = ({card}) => {
    return (
        <div className={styles.card}>
            <div className={styles.card_time}>
                {card.time}
            </div>
            <div className={styles.card_header}>
                {card.arrival}
                <div className={styles.vertborder}>
                </div>
                {card.departure}
            </div>
                {card.price}  {card.seats}
        </div>
    );
};

export default CardItem;
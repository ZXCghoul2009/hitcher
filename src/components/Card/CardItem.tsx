import React from 'react';
import {Cards} from "../../utils/types/types";
import styles from './Card.module.css';

interface CardItemProps {
    card: Cards;
    onClick: (card:Cards)=>void;
}

const CardItem: React.FC<CardItemProps> = ({card, onClick}) => {
    return (
        <div onClick={()=>onClick(card)} className={styles.card}>
            <div className={styles.card_trip}>
                <div className={styles.card_time}>
                    {card.time.slice(0, -3)}
                </div>
                <div className={styles.assets}>
                    <div className={styles.icon_checkpoint}/>
                    <div className={styles.vertborder}/>
                    <div className={styles.icon_checkpoint}/>
                </div>

                <div className={styles.card_header}>
                    <div>
                        {card.departure}
                    </div>
                    <div>
                        {card.arrival}
                    </div>
                </div>
            </div>
            <div className={styles.card_info}>
                <div>
                    мест: {card.seats}
                </div>
                <div>
                    {card.price} BYN
                </div>
            </div>
        </div>
    );
};

export default CardItem;
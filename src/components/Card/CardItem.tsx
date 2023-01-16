import React from 'react';
import {Cards} from "../../utils/types/types";
import styles from './Card.module.css';

interface CardItemProps {
    trip: Cards;
    onClick: (trip:Cards)=>void;
}


const CardItem: React.FC<CardItemProps> = ({trip, onClick}) => {
    return (
        <div onClick={()=>onClick(trip)} className={styles.card}>
            <div className={styles.card_trip}>
                <div className={styles.card_time}>
                    {trip.time.slice(0, -3)}
                </div>
                <div className={styles.assets}>
                    <div className={styles.icon_checkpoint}/>
                    <div className={styles.vertborder}/>
                    <div className={styles.icon_checkpoint}/>
                </div>

                <div className={styles.card_header}>
                    <div>
                        {trip.departure}
                    </div>
                    <div>
                        {trip.arrival}
                    </div>
                </div>
            </div>
            <div className={styles.card_info}>
                <div>
                    мест: {trip.seats}
                </div>
                <div>
                    {trip.price} BYN
                </div>
            </div>
        </div>
    );
};

export default CardItem;
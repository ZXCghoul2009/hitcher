import React from 'react';
import {Cards} from "../../utils/types/types";

interface CardItemProps {
    card: Cards;
}

const CardItem: React.FC<CardItemProps> = ({card}) => {
    return (
        <div>
                {card.price} {card.arrival} {card.departure} {card.day} {card.seats} {card.time}
        </div>
    );
};

export default CardItem;
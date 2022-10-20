import React from 'react';
import {Cards} from "../../utils/types/types";
import CardItem from "./CardItem";

interface CardListProps {
    cards: Cards[]
}

export const Card: React.FC<CardListProps> =({ cards}) => {
    return (
        <div>
            {cards.map(card =>
                    <CardItem key={card.id} card={card}/>
            )}
        </div>
    )
}
import React from 'react';
import { EntityCardList } from '@appLayout/entityList';
import { TicketsListViewProps } from '../types';
import TicketCard from './TicketCard';

const CardView: React.FC<TicketsListViewProps> = ({ entities }) => {
	return <EntityCardList EntityCard={TicketCard} entities={entities} />;
};

export default CardView;

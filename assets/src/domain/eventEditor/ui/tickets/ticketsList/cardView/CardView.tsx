import React from 'react';
import { EntityCardList } from '@appLayout/entityList';
import TicketCard from './TicketCard';
import { useTicketsListContext } from '@edtrServices/context/EntityListContext';

const CardView: React.FC = () => {
	const { filteredEntities } = useTicketsListContext();

	return <EntityCardList EntityCard={TicketCard} entities={filteredEntities} />;
};

export default CardView;

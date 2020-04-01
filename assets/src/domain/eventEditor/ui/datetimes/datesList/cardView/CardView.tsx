import React, { useEffect } from 'react';
import { EntityCardList } from '@appLayout/entityList';
import DateCard from './DateCard';
import { useDatesListContext } from '@edtrServices/context/EntityListContext';

const CardView: React.FC = React.memo(() => {
	const { filteredEntities } = useDatesListContext();

	return <EntityCardList EntityCard={DateCard} entities={filteredEntities} />;
});

export default CardView;

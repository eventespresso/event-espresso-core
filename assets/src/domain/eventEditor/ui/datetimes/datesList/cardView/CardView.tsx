import React, { useContext } from 'react';
import { EntityCardList } from '@appLayout/entityList';
import DateCard from './DateCard';
import { DatetimesListContext } from '../../../../services/context/EntityListContext';

const CardView = () => {
	const { entities } = useContext(DatetimesListContext);
	return <EntityCardList EntityCard={DateCard} entities={entities} />;
};

export default CardView;

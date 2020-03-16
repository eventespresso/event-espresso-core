import React from 'react';
import { EntityCardList } from '@appLayout/entityList';
import { DatesListViewProps } from '../types';
import DateCard from './DateCard';

const CardView: React.FC<DatesListViewProps> = ({ entities }) => {
	return <EntityCardList EntityCard={DateCard} entities={entities} />;
};

export default CardView;

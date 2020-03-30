import React, { useContext } from 'react';
import { EntityCardList } from '@appLayout/entityList';
import DateCard from './DateCard';
import { DatetimesListContext } from '../../../../services/context/EntityListContext';
import { LoadingNotice } from '@appDisplay/loadingNotice';

const CardView = () => {
	const { entities, loading } = useContext(DatetimesListContext);
	console.log('');
	console.log('%c CardView ', 'color: DeepSkyBlue;');
	console.log('%c 	loading:', 'color: DeepSkyBlue;', loading);
	console.log('%c 	entities:', 'color: DeepSkyBlue;', entities);
	return (
		<>
			<LoadingNotice loading={loading} />
			<EntityCardList EntityCard={DateCard} entities={entities} loading={loading} />
		</>
	);
};

export default CardView;

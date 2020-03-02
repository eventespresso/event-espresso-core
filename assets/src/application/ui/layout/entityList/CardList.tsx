import React from 'react';
import { CardListProps } from './types';

import { Entity } from '@appServices/apollo/types';

const CardList: React.FC<CardListProps<Entity>> = ({ CardView, entities }) => {
	return (
		<div className='ee-entity-list__card-view'>
			{entities.map((entity) => (
				<CardView id={entity.id} key={entity.id} />
			))}
		</div>
	);
};

export default CardList;

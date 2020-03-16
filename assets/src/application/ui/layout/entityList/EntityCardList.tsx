import React from 'react';

import { EntityCardListProps } from './types';
import { Entity } from '@appServices/apollo/types';

const EntityCardList = <E extends Entity>({ EntityCard, entities }: EntityCardListProps<E>) => {
	return (
		<div className='ee-entity-list__card-view'>
			{entities.map(({ id }) => (
				<EntityCard id={id} key={id} />
			))}
		</div>
	);
};

export default EntityCardList;

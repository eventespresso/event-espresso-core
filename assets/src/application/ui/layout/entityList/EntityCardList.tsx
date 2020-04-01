import React from 'react';

import { EntityCardListProps } from './types';
import { Entity } from '@appServices/apollo/types';
import { getCacheIds } from '@appServices/predicates';

const EntityCardList = <E extends Entity>({ EntityCard, entities }: EntityCardListProps<E>) => {
	return (
		<div className='ee-entity-list__card-view'>
			{entities.map((entity) => (
				<EntityCard entity={entity} key={entity.id} />
			))}
		</div>
	);
};

export default React.memo(EntityCardList, (prevProps, nextProps) => {
	const prevValue = JSON.stringify(getCacheIds(prevProps.entities));
	const nextValue = JSON.stringify(getCacheIds(nextProps.entities));

	return prevValue === nextValue;
});

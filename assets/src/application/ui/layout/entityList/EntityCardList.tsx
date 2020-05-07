import React from 'react';

import { EntityCardListProps } from './types';
import { Entity } from '@dataServices/types';
import entitiesUnchanged from '@appServices/utilities/memo/entitiesUnchanged';

const EntityCardList = <E extends Entity>({ EntityCard, entities }: EntityCardListProps<E>) => {
	return (
		<div className='ee-entity-list__card-view'>
			{entities.map((entity) => (
				<EntityCard entity={entity} key={entity.id} />
			))}
		</div>
	);
};

export default React.memo(EntityCardList, entitiesUnchanged);

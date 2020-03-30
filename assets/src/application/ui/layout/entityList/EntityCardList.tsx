import React from 'react';
import classNames from 'classnames';

import { EntityCardListProps } from './types';
import { Entity } from '@appServices/apollo/types';

const EntityCardList = <E extends Entity>({ EntityCard, entities, loading }: EntityCardListProps<E>) => {
	const className = classNames({
		'ee-entity-list__card-view': true,
		'ee-entity-list__card-view--loading': loading,
	});
	return (
		<div className={className}>
			{entities.map((entity) => (
				<EntityCard entity={entity} key={entity.id} />
			))}
		</div>
	);
};

export default EntityCardList;

import React from 'react';

import { EntityTableProps } from './types';
import { Entity } from '@appServices/apollo/types';
import { EntityListFilterStateManager } from './filterBar';
import { ResponsiveTable } from '@appLayout/espressoTable';
import { getCacheIds } from '@appServices/predicates';

type ELFSM = EntityListFilterStateManager<any>;

const EntityTable = <E extends Entity, FS extends ELFSM>({
	bodyRowGenerator,
	className,
	entities,
	filterState,
	headerRowGenerator,
	tableCaption,
	tableId,
}: EntityTableProps<E, FS>) => {
	const bodyRows = entities.map((entity) => bodyRowGenerator({ entity, filterState }));
	const headerRow = headerRowGenerator(filterState);

	return (
		<ResponsiveTable
			bodyRows={bodyRows}
			className={{ tableClassName: className }}
			headerRows={[headerRow]}
			metaData={{
				tableId,
				tableCaption,
			}}
		/>
	);
};

export default React.memo(EntityTable, (prevProps, nextProps) => {
	const prevValue = JSON.stringify(getCacheIds(prevProps.entities));
	const nextValue = JSON.stringify(getCacheIds(nextProps.entities));

	return prevValue === nextValue;
});

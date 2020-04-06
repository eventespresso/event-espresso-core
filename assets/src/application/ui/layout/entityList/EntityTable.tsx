import React from 'react';

import { EntityTableProps } from './types';
import { Entity } from '@appServices/apollo/types';
import { EntityListFilterStateManager } from './filterBar';
import { entitiesUnchanged } from '@appServices/utilities/memo';
import { ResponsiveTable } from '@appLayout/espressoTable';

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

export default React.memo(EntityTable, entitiesUnchanged);

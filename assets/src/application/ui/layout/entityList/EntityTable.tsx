import React from 'react';
import classNames from 'classnames';

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
	onSort,
	tableCaption,
	tableId,
}: EntityTableProps<E, FS>) => {
	const bodyRows = entities.map((entity) => bodyRowGenerator({ entity, filterState }));
	const headerRow = headerRowGenerator(filterState);

	const newclassName = classNames(className, 'ee-entity-table');

	return (
		<ResponsiveTable
			bodyRows={bodyRows}
			className={{ tableClassName: newclassName }}
			headerRows={[headerRow]}
			metaData={{
				tableId,
				tableCaption,
			}}
			onDragEnd={onSort}
		/>
	);
};

export default React.memo(EntityTable, entitiesUnchanged);

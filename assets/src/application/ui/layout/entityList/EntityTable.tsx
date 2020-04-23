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
	entities,
	filterState,
	headerRowGenerator,
	onSort,
	tableCaption,
	tableId,
	...rest
}: EntityTableProps<E, FS>) => {
	const bodyRows = entities.map((entity) => bodyRowGenerator({ entity, filterState }));
	const headerRow = headerRowGenerator(filterState);

	const className = { tableClassName: classNames(rest.className, 'ee-entity-table') };
	const headerRows = [headerRow];
	const metaData = {
		tableId,
		tableCaption,
	};

	return (
		<ResponsiveTable
			bodyRows={bodyRows}
			className={className}
			headerRows={headerRows}
			metaData={metaData}
			onDragEnd={onSort}
		/>
	);
};

export default React.memo(EntityTable, entitiesUnchanged);

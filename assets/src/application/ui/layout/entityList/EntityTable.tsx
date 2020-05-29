import React, { useMemo } from 'react';
import classNames from 'classnames';

import { EntityTableProps } from './types';
import { Entity } from '@dataServices/types';
import { EntityListFilterStateManager } from './filterBar';
import { ResponsiveTable } from '@appLayout/espressoTable';
import { useMemoStringify } from '@application/services/hooks';

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
	const bodyRows = useMemo(() => entities.map((entity) => bodyRowGenerator({ entity, filterState })), [
		bodyRowGenerator,
		entities,
		filterState,
	]);
	const headerRows = useMemo(() => {
		const headerRow = headerRowGenerator(filterState);
		return [headerRow];
	}, [filterState]);

	const className = useMemoStringify({ tableClassName: classNames(rest.className, 'ee-entity-table') }, [
		rest.className,
	]);

	const metaData = useMemoStringify({
		tableId,
		tableCaption,
	});
	const onDragEnd = filterState.sortingEnabled ? onSort : null;

	return (
		<ResponsiveTable
			bodyRows={bodyRows}
			className={className}
			headerRows={headerRows}
			metaData={metaData}
			onDragEnd={onDragEnd}
		/>
	);
};

export default EntityTable;

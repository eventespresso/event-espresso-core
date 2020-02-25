import React from 'react';
import { __ } from '@wordpress/i18n';
import { without } from 'ramda';
import classNames from 'classnames';
import { PaginationProps } from 'antd/lib/pagination';

import { Entity } from '@appServices/apollo/types';
import EmptyState from '@appDisplay/EmptyState';
import { EntityPagination } from '../pagination';
import './style.scss';

interface EntityListProps {
	entities: Entity[];
	EntityGridView: React.ElementType;
	EntityListView: React.ElementType;
	filterState?: any;
	htmlClass?: string;
	noResultsText?: string;
	paginationProps: PaginationProps;
	view?: 'grid' | 'list';
}

const EntityList = ({
	entities = [],
	EntityGridView,
	EntityListView,
	filterState,
	htmlClass = '',
	noResultsText = '',
	paginationProps,
	view = 'grid',
	...otherProps
}: EntityListProps) => {
	// verify array and remove undefined
	const filteredEntities = Array.isArray(entities) ? without([undefined], entities) : [];

	if (filteredEntities.length === 0) {
		const description = noResultsText !== '' ? noResultsText : __('no results found');
		return <EmptyState className='ee-entity-list-no-results' description={description} />;
	}

	const classes = classNames('ee-editor-entity-list', htmlClass);
	const renderView =
		view === 'grid' ? (
			<EntityGridView entities={filteredEntities} className={classes} {...otherProps} />
		) : (
			<EntityListView entities={filteredEntities} className={classes} {...otherProps} />
		);

	return (
		<>
			{renderView}
			<EntityPagination {...paginationProps} showSizeChanger />
		</>
	);
};

export default EntityList;

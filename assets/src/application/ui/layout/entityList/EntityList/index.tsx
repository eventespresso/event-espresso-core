import React from 'react';
import { __ } from '@wordpress/i18n';
import { without } from 'ramda';
import classNames from 'classnames';

import { Entity } from '@appServices/apollo/types';
import EmptyState from '@appDisplay/EmptyState';
import EntityListFilterBar from '@appLayout/entityList/filterBar/EntityListFilterBar';
import useEntityListFilterState from '@appLayout/entityList/filterBar/useEntityListFilterState';
import { EntityPagination } from '../pagination';
import { useEntityPagination } from '@appLayout/entityList/pagination';
import './style.scss';

interface EntityListProps {
	className?: string;
	entities: Entity[];
	EntityGridView: React.ElementType;
	EntityListView: React.ElementType;
	entityFilters: React.ReactNode;
	listId?: string;
	noResultsText?: string;
}

const EntityList = ({
	entities = [],
	EntityGridView,
	EntityListView,
	entityFilters,
	listId = '',
	noResultsText = '',
	...props
}: EntityListProps) => {
	// verify array and remove undefined
	const filteredEntities = Array.isArray(entities) ? without([undefined], entities) : [];
	const filterState = useEntityListFilterState();
	const { view } = filterState;
	const { paginatedEntities, ...paginationProps } = useEntityPagination({
		entities: filteredEntities,
	});

	if (filteredEntities.length === 0) {
		const description = noResultsText !== '' ? noResultsText : __('no results found');
		return <EmptyState className='ee-entity-list-no-results' description={description} />;
	}

	const className = classNames('ee-editor-entity-list', props.className);
	const EntityView = view === 'grid' ? EntityGridView : EntityListView;

	return (
		<>
			<EntityListFilterBar entityFilters={entityFilters} filterState={filterState} listId={listId} />;
			<EntityView entities={paginatedEntities} className={className} {...props} />
			<EntityPagination {...paginationProps} />
		</>
	);
};

export default EntityList;

import React from 'react';
import { __ } from '@wordpress/i18n';
import { without } from 'ramda';
import classNames from 'classnames';

import EmptyState from '@appDisplay/EmptyState';
import EntityListFilterBar from '@appLayout/entityList/filterBar/EntityListFilterBar';
import useEntityListFilterState from '@appLayout/entityList/filterBar/useEntityListFilterState';
import { useEntityPagination } from '@appLayout/entityList/pagination';
import { Entity } from '@appServices/apollo/types';

import { EntityListProps } from './types';
import { EntityPagination } from '../pagination';
import './style.scss';

const EntityList: React.FC<EntityListProps<Entity>> = ({
	entities = [],
	EntityGridView,
	EntityListView,
	entityFilters,
	listId = '',
	noResultsText = '',
	...props
}) => {
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
			<EntityListFilterBar entityFilters={entityFilters} filterState={filterState} listId={listId} />
			<EntityView entities={paginatedEntities} className={className} {...props} />
			<EntityPagination {...paginationProps} />
		</>
	);
};

export default EntityList;

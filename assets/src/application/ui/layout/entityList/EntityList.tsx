import React from 'react';
import { __ } from '@wordpress/i18n';
import { Divider, Typography } from 'antd';

import { EmptyState, ErrorIndicator, LoadingIndicator } from '@appDisplay/index';
import { EntityListFilterStateManager, useFilteredEntities } from './filterBar';
import EntityListFilterBar from './withValidFilterState';
import { Entity } from '@appServices/apollo/types';
import { useStatus } from '@appServices/apollo/status';

import { EntityListProps } from './types';
import { EntityPagination } from './pagination';
import './style.scss';

const { Title } = Typography;

const EntityList = <E extends Entity, ELFS extends EntityListFilterStateManager<any>>({
	CardView,
	className,
	domain,
	entities = [],
	entityType,
	filterState,
	footer,
	headerText,
	legendConfig,
	listId,
	noResultsDesc,
	noResultsTitle,
	TableView,
}: EntityListProps<E, ELFS>) => {
	const { isError, isLoading } = useStatus();
	const error = isError(entityType);
	const loading = isLoading(entityType);

	const filteredEntities = useFilteredEntities(domain, listId, entities, filterState);

	if (loading) return <LoadingIndicator tip={__('loading...')} />;

	if (error) return <ErrorIndicator />;

	let entityList: JSX.Element;
	const { view } = filterState;

	if (filteredEntities.length === 0) {
		const title = noResultsTitle ? noResultsTitle : __('no results found');
		const description = noResultsDesc ? noResultsDesc : __('try changing filter settings');
		entityList = <EmptyState className='ee-entity-list--no-results' title={title} description={description} />;
	} else {
		const Component = view === 'grid' ? CardView : TableView;

		entityList = <Component entities={filteredEntities} className={className} filterState={filterState} />;
	}

	return (
		<div className={'ee-entity-list'}>
			<Title className='ee-entity-list__header' level={3}>
				{headerText}
			</Title>
			<EntityListFilterBar
				domain={domain}
				filterState={filterState}
				legendConfig={legendConfig}
				listId={listId}
			/>
			{entityList}
			<EntityPagination filterState={filterState} />
			<div className={'ee-entity-list__footer'}>{footer}</div>
			<Divider dashed />
		</div>
	);
};

export default EntityList;

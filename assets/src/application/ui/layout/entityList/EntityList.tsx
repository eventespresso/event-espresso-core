import React from 'react';
import { __ } from '@wordpress/i18n';
import { Divider, Typography } from 'antd';

import { EmptyState, ErrorIndicator, LoadingIndicator } from '@appDisplay/index';
import { EntityListFilterState } from './filterBar';
import EntityListFilterBar from '@appLayout/entityList/filterBar/EntityListFilterBar';
import { Entity } from '@appServices/apollo/types';
import { useStatus } from '@appServices/apollo/status';

import CardList from './CardList';
import { EntityListProps } from './types';
import { EntityPagination } from './pagination';
import './style.scss';

const { Title } = Typography;

const EntityList: React.FC<any> = <ELFS extends EntityListFilterState>({
	CardView,
	className,
	entities = [],
	filterState,
	entityFilters,
	entityType,
	footer,
	headerText,
	listId,
	noResultsTitle,
	noResultsDesc,
	TableView,
	...props
}: EntityListProps<Entity, ELFS>) => {
	const { isError, isLoading } = useStatus();
	const error = isError(entityType);
	const loading = isLoading(entityType);

	if (loading) return <LoadingIndicator message={__('loading...')} />;

	if (error) return <ErrorIndicator />;

	let entityList: JSX.Element;
	const { view } = filterState;

	if (entities.length === 0) {
		const title = noResultsTitle ? noResultsTitle : __('no results found');
		const description = noResultsDesc ? noResultsDesc : __('try changing filter settings');
		entityList = <EmptyState className='ee-entity-list--no-results' title={title} description={description} />;
	} else {
		entityList =
			view === 'grid' ? (
				<CardList CardView={CardView} entities={entities} className={className} {...props} />
			) : (
				<TableView entities={entities} className={className} {...props} />
			);
	}

	return (
		<div className={'ee-entity-list'}>
			<Title className='ee-entity-list__header' level={3}>
				{headerText}
			</Title>
			<EntityListFilterBar entityFilters={entityFilters} filterState={filterState} listId={listId} />
			{entityList}
			<EntityPagination filterState={filterState} />
			<div className={'ee-entity-list__footer'}>{footer}</div>
			<Divider dashed />
		</div>
	);
};

export default EntityList;

import React from 'react';
import { __ } from '@wordpress/i18n';
import { Divider, Typography } from 'antd';

import { EmptyState, ErrorIndicator, LoadingNotice } from '@infraUI/display';
import { EntityListFilterStateManager } from './filterBar';
import EntityListFilterBar from './withValidFilterState';
import { Entity } from '@appServices/apollo/types';
import { useStatus } from '@appServices/apollo/status';

import { EntityListProps } from './types';
import { EntityPagination } from './pagination';
import './style.scss';

const { Title } = Typography;

const EntityList = <E extends Entity, ELFS extends EntityListFilterStateManager<any>>({
	domain,
	entityType,
	filterState,
	footer,
	headerText,
	legendConfig,
	listId,
	noResultsDesc,
	noResultsTitle,
	renderList,
}: EntityListProps<E, ELFS>) => {
	const { isError, isLoading } = useStatus();
	const error = isError(entityType);
	const loading = isLoading(entityType);

	if (loading) return <LoadingNotice />;

	if (error) return <ErrorIndicator />;

	let entityList: React.ReactNode;

	if (filterState.total === 0) {
		const title = noResultsTitle ? noResultsTitle : __('no results found');
		const description = noResultsDesc ? noResultsDesc : __('try changing filter settings');
		entityList = (
			<EmptyState className='ee-entity-list--no-results ee-fade-in' title={title} description={description} />
		);
	} else {
		entityList = renderList();
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

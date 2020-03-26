import React from 'react';
import { __ } from '@wordpress/i18n';
import { Divider, Typography } from 'antd';

import { ErrorIndicator, LoadingIndicator } from '@appDisplay/index';
import { EntityListFilterStateManager, useFilteredEntities } from './filterBar';
import EntityListFilterBar from './withValidFilterState';
import { Entity } from '@appServices/apollo/types';
import { useStatus } from '@appServices/apollo/status';

import { EntityListProps } from './types';
import { EntityPagination } from './pagination';
import EntityListEntities from './EntityListEntities';
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
	...props
}: EntityListProps<E, ELFS>) => {
	const { isError, isLoading } = useStatus();
	const error = isError(entityType);
	const loading = isLoading(entityType);

	if (loading) return <LoadingIndicator tip={__('loading...')} />;

	if (error) return <ErrorIndicator />;

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
			<EntityListEntities domain={domain} filterState={filterState} listId={listId} {...props} />
			<EntityPagination filterState={filterState} />
			<div className={'ee-entity-list__footer'}>{footer}</div>
			<Divider dashed />
		</div>
	);
};

export default EntityList;

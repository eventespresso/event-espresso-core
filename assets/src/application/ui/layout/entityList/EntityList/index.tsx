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
	className?: string;
	entities: Entity[];
	EntityGridView: React.ElementType;
	EntityListView: React.ElementType;
	noResultsText?: string;
	paginationProps: PaginationProps;
	view?: 'grid' | 'list';
}

const EntityList = ({
	entities = [],
	EntityGridView,
	EntityListView,
	noResultsText = '',
	paginationProps,
	view = 'grid',
	...props
}: EntityListProps) => {
	// verify array and remove undefined
	const filteredEntities = Array.isArray(entities) ? without([undefined], entities) : [];

	if (filteredEntities.length === 0) {
		const description = noResultsText !== '' ? noResultsText : __('no results found');
		return <EmptyState className='ee-entity-list-no-results' description={description} />;
	}

	const className = classNames('ee-editor-entity-list', props.c);
	const EntityView = view === 'grid' ? EntityGridView : EntityListView;

	return (
		<>
			<EntityView entities={filteredEntities} className={className} {...props} />
			<EntityPagination {...paginationProps} showSizeChanger />
		</>
	);
};

export default EntityList;

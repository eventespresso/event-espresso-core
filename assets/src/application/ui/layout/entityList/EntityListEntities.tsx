import React, { useContext, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { EmptyState } from '@appDisplay/index';
import { useFilteredEntities } from './filterBar';
import { getCacheIds } from '@sharedServices/predicates';
import { Cacheable } from '@appServices/apollo/types';

const entityListsMatch = (firstList: Cacheable[], secondList: Cacheable[]): boolean => {
	const firstListCacheID = getCacheIds(firstList).join('-');
	const secondListCacheID = getCacheIds(secondList).join('-');
	return firstListCacheID === secondListCacheID;
};

const EntityListEntities = ({
	CardView,
	className,
	context,
	domain,
	filterState,
	listId,
	noResultsDesc,
	noResultsTitle,
	TableView,
}): JSX.Element => {
	const { allEntities, entities, setEntities, setLoading } = useContext(context);
	const filteredEntities = useFilteredEntities(domain, listId, allEntities, filterState);
	useEffect(() => {
		console.log('');
		console.log('%c EntityListEntities ', 'color: LightSeaGreen;');
		console.log('%c 	entities:', 'color: LightSeaGreen;', entities);
		console.log('%c 	filteredEntities:', 'color: LightSeaGreen;', filteredEntities);
		if (typeof setEntities === 'function' && !entityListsMatch(entities, filteredEntities)) {
			setEntities(filteredEntities);
			setLoading(false);
		}
	}, [JSON.stringify(filteredEntities), JSON.stringify(entities)]);
	if (filteredEntities.length === 0) {
		const title = noResultsTitle ? noResultsTitle : __('no results found');
		const description = noResultsDesc ? noResultsDesc : __('try changing filter settings');
		return <EmptyState className='ee-entity-list--no-results' title={title} description={description} />;
	}

	const { view } = filterState;
	return view === 'card' ? <CardView /> : <TableView />;
	// const Component = view === 'card' ? CardView : TableView;
	// return <Component className={className} filterState={filterState} />;
};

export default EntityListEntities;

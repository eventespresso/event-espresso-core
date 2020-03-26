import React, { useContext } from 'react';
import { __ } from '@wordpress/i18n';
import { EmptyState } from '@appDisplay/index';
import { useFilteredEntities } from './filterBar';

const EntityListEntities = ({
	CardView,
	className,
	context,
	domain,
	// entities = [],
	filterState,
	listId,
	noResultsDesc,
	noResultsTitle,
	TableView,
}): JSX.Element => {
	const value = useContext(context);
	const filteredEntities = useFilteredEntities(domain, listId, value.entities, filterState);
	if (filteredEntities.length === 0) {
		const title = noResultsTitle ? noResultsTitle : __('no results found');
		const description = noResultsDesc ? noResultsDesc : __('try changing filter settings');
		return <EmptyState className='ee-entity-list--no-results' title={title} description={description} />;
	}
	const { view } = filterState;
	const Component = view === 'card' ? CardView : TableView;
	return <Component entities={filteredEntities} className={className} filterState={filterState} />;
};

export default EntityListEntities;

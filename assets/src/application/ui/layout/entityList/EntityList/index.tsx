import React from 'react';
import { __ } from '@wordpress/i18n';
import { without } from 'ramda';
import classNames from 'classnames';

import { Entity } from '@appServices/apollo/types';
import EmptyState from '@appDisplay/EmptyState';
import './style.scss';

interface EntityListProps {
	entities: Entity[];
	EntityGridView: React.ElementType;
	EntityListView: React.ElementType;
	htmlClass: string;
	view: 'grid' | 'list';
	noResultsText: string;
}

/**
 * EntityList
 * base component for displaying a list of entities (dates, tickets, etc)
 * as either a list table or grid of entity blocks
 *
 * @function
 * @param {Array} entities
 * @param {Component} EntityGridView
 * @param {Component} EntityListView
 * @param {string} htmlClass
 * @param {string} view
 * @param {string} noResultsText
 * @param {mixed} otherProps
 * @return {Component} list of rendered entities
 */
const EntityList = ({
	entities = [],
	EntityGridView,
	EntityListView,
	htmlClass = '',
	view = 'grid',
	noResultsText = '',
	...otherProps
}: EntityListProps) => {
	// verify array and remove undefined
	const filteredEntities = Array.isArray(entities) ? without([undefined], entities) : [];

	if (filteredEntities.length === 0) {
		const description = noResultsText !== '' ? noResultsText : __('no results found');
		return <EmptyState className='ee-entity-list-no-results' description={description} />;
	}

	const classes = classNames('ee-editor-entity-list', htmlClass);
	return view === 'grid' ? (
		<EntityGridView entities={filteredEntities} className={classes} {...otherProps} />
	) : (
		<EntityListView entities={filteredEntities} className={classes} {...otherProps} />
	);
};

export default EntityList;

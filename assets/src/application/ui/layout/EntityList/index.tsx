import React from 'react';
import { without } from 'ramda';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

import { Entity } from '@edtrServices/apollo/types';
import './style.scss';

interface EntityListProps {
	entities: Entity[];
	EntityGridView: React.ReactNode;
	EntityListView: React.ReactNode;
	htmlClass: string;
	view: string;
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
}) => {
	// verify array and remove undefined
	const filteredEntities = Array.isArray(entities) ? without([undefined], entities) : [];

	if (filteredEntities.length === 0) {
		noResultsText = noResultsText !== '' ? noResultsText : __('no results found', 'event_espresso');
		return <div className='ee-entity-list-no-results'>{noResultsText}</div>;
	}
	const classes = classNames('ee-editor-entity-list', htmlClass);
	return view === 'grid' ? (
		<EntityGridView entities={filteredEntities} htmlClass={classes} {...otherProps} />
	) : (
		<EntityListView entities={filteredEntities} htmlClass={classes} {...otherProps} />
	);
};

export default EntityList;

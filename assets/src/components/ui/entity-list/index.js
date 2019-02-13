/**
 * External imports
 */
import { filter, without } from 'lodash';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import './style.css';

/**
 * EntityList
 * base component for displaying a list of entities (dates, tickets, etc)
 * as either a list table or grid of entity blocks
 *
 * @function
 * @param {Array} entities
 * @param {mixed} otherProps
 * @param {Component} EntityGridView
 * @param {Component} EntityListView
 * @param {string} htmlClass
 * @param {string} view
 * @param {string} noResultsText
 * @return {Component} list of rendered entities
 */
const EntityList = ( {
	entities,
	EntityGridView,
	EntityListView,
	htmlClass,
	view = 'grid',
	noResultsText = '',
	...otherProps
} ) => {
	entities = Array.isArray( entities ) ? entities : [];
	// Remove undefined from the array
	entities = without( entities, undefined );
	if ( entities.length === 0 ) {
		noResultsText = noResultsText !== '' ?
			noResultsText :
			__( 'no results found', 'event_espresso' );
		return (
			<div className="ee-entity-list-no-results">
				{ noResultsText }
			</div>
		);
	}
	htmlClass = htmlClass ?
		`${ htmlClass } ee-editor-entity-list` :
		'ee-editor-entity-list';
	return view === 'grid' ? (
		<EntityGridView
			entities={ entities }
			htmlClass={ htmlClass }
			{ ...otherProps }
		/>
	) : (
		<EntityListView
			entities={ entities }
			htmlClass={ htmlClass }
			{ ...otherProps }
		/>
	);
};

export default EntityList;

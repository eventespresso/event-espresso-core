/**
 * External imports
 */
import { isArray } from 'lodash';
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
 * @param {string} view
 * @param {string} htmlClass
 * @return {Component} list of rendered entities
 */
const EntityList = ( {
	entities,
	EntityGridView,
	EntityListView,
	view = 'grid',
	htmlClass,
	...otherProps
} ) => {
	if ( ! isArray( entities ) ) {
		return null;
	}
	if ( entities.length === 0 ) {
		return (
			<div className="ee-entity-list-no-results">
				{ __( 'no results were found', 'event_espresso' ) }
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

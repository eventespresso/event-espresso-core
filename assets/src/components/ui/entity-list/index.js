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
 * @return {Component} list of rendered entities
 */
const EntityList = ( {
	entities,
	EntityGridView,
	EntityListView,
	view = 'grid',
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
	return view === 'grid' ? (
		<EntityGridView
			entities={ entities }
			{ ...otherProps }
		/>
	) : (
		<EntityListView
			entities={ entities }
			{ ...otherProps }
		/>
	);
};

export default EntityList;

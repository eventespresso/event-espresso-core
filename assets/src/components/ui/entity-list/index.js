/**
 * External imports
 */
import { without } from 'lodash';
import { __ } from '@eventespresso/i18n';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.css';
import withFormContainerAndPlaceholder
	from '../../form/base/with-form-container-and-placeholder';

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
const EntityList = ( {
	entities,
	EntityGridView,
	EntityListView,
	htmlClass,
	view = 'grid',
	noResultsText = '',
	...otherProps
} ) => {
	// verify array and remove undefined
	entities = Array.isArray( entities ) ?
		without( entities, undefined ) :
		[];
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
	htmlClass = classNames( 'ee-editor-entity-list', htmlClass );
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

export default withFormContainerAndPlaceholder( EntityList );

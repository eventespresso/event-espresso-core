/**
 * External imports
 */
import { filter, without } from 'lodash';
import { Fragment } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { FormContainer, FormPlaceholder } from '../../form';
import './style.css';

/**
 * EntityList
 * base component for displaying a list of entities (dates, tickets, etc)
 * as either a list table or grid of entity blocks
 *
 * @function
 * @param {boolean} loading
 * @param {string} loadingNotice
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
	loading,
	loadingNotice,
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
	htmlClass = classNames( 'ee-editor-entity-list', {
		[ htmlClass ]: htmlClass
	} );
	let entityList = view === 'grid' ? (
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
	if ( entities.length === 0 ) {
		noResultsText = noResultsText !== '' ?
			noResultsText :
			__( 'no results found', 'event_espresso' );
		entityList = (
			<div className="ee-entity-list-no-results">
				{ noResultsText }
			</div>
		);
	}
	return (
		<Fragment>
			<FormPlaceholder
				loading={ loading }
				notice={ loadingNotice }
			/>
			<FormContainer loading={ loading } htmlClass={ htmlClass }>
				{ entityList }
			</FormContainer>
		</Fragment>
	);

};

export default EntityList;

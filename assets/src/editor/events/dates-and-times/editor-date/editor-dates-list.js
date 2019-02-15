/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { EntityList } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { EditorDatesGridView, EditorDatesListView } from './index';
import { default as PaginatedDatesListWithFilterBar } from './filter-bar';

/**
 * EditorDatesList
 * EntityList component for displaying event dates in the editor
 *
 * @function
 * @param {Array} entities 	array of JSON objects defining the Event Dates
 * @param {string} view
 * @param {Function} retrieveDates
 * @param {mixed} otherProps
 * @return {Component}          list of rendered Event Dates
 */
class EditorDatesList extends Component {
	render() {
		const { view, ...otherProps } = this.props;
		return (
			<EntityList
				EntityGridView={ EditorDatesGridView }
				EntityListView={ EditorDatesListView }
				view={ view }
				noResultsText={
					__(
						'no results found (try changing filters)',
						'event_espresso'
					)
				}
				{ ...otherProps }
			/>
		);
	}
}

export default PaginatedDatesListWithFilterBar( EditorDatesList );

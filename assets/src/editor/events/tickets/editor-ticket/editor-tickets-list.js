/**
 * External dependencies
 */
import { Component } from '@wordpress/element';
import { EntityList } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { EditorTicketsGridView } from './grid-view/';
import { EditorTicketsListView } from './list-view/';
import { default as PaginatedTicketsListWithFilterBar } from './filter-bar';

/**
 * EditorTicketsList
 * EntityList component for displaying event tickets in the editor
 *
 * @function
 * @param {Array} entities    array of JSON objects defining the tickets
 * @param {string} view
 * @param {mixed} otherProps
 * @return {Component}          list of rendered tickets
 */
class EditorTicketsList extends Component {
	render() {
		const {
			entities,
			view = 'grid',
			...otherProps
		} = this.props;
		return (
			<EntityList
				entities={ entities }
				EntityGridView={ EditorTicketsGridView }
				EntityListView={ EditorTicketsListView }
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

export default PaginatedTicketsListWithFilterBar( EditorTicketsList );

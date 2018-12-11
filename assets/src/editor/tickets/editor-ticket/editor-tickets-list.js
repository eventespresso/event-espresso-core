/**
 * External dependencies
 */
import { Component } from 'react';
import { EntityList } from '@eventespresso/components';

/**
 * Internal dependencies
 */
import { EditorTicketsGridView } from './grid-view/editor-tickets-grid-view';
import { EditorTicketsListView } from './list-view/editor-tickets-list-view';
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
			view = 'grid',
			...otherProps
		} = this.props;
		// console.log( '' );
		// console.log( 'EditorTicketsList view:', view );
		// console.log( 'EditorTicketsList otherProps:', otherProps );
		return (
			<EntityList
				EntityGridView={ EditorTicketsGridView }
				EntityListView={ EditorTicketsListView }
				view={ view }
				{ ...otherProps }
			/>
		);
	}
}

export default PaginatedTicketsListWithFilterBar( EditorTicketsList );

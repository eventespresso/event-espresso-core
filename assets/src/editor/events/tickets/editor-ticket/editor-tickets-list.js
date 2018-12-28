/**
 * External dependencies
 */
import { Component } from 'react';
import { EntityList } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { EditorTicketsGridView } from './grid-view/editor-tickets-grid-view';
import { EditorTicketsListView } from './list-view/editor-tickets-list-view';
import { default as PaginatedTicketsListWithFilterBar } from './filter-bar';
import { find } from 'lodash';
// import { TicketEditorModal } from '../ticket-editor';

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
	constructor( props ) {
		super( props );
		// console.log( '' );
		// console.log( 'EditorTicketList props: ', props );
		this.state = {
			editorOpen: false,
			changesSaved: true,
			for: props.for ? props.for : 0,
			tickets: props.tickets,
			ticketToEdit: null,
		};
	}

	/**
	 * @function
	 * @param {Object} event
	 */
	toggleEditor = ( event ) => {
		if ( event.target ) {
			// console.log( ' **** ' );
			// console.log(
			// 	'EditorTicketList.toggleEditor() event.target ',
			// 	event.target
			// );
			if ( event.target.textContent && event.target.textContent !== this.buttonLabel ) {
				// console.log( 'EditorTicketList.toggleEditor() DO NOT CLOSE' );
				return;
			}
		}
		this.setState( prevState => {
			// if ( prevState.editorOpen && ! prevState.changesSaved ) {
			// 	return ( {
			// 		editorOpen: ! window.confirm(
			// 			__(
			// 				'Are you sure you want to close the ' +
			// 				'\nEvent Date Ticket Editor? ' +
			// 				'\n\nAll unsaved changes will be lost!',
			// 				'event_espresso'
			// 			)
			// 		),
			// 	} );
			// }
			// console.log( '*** toggleEditor ***', prevState.ticketToEdit );
			return ( {
				editorOpen: ! prevState.editorOpen,
				ticketToEdit: ! prevState.editorOpen ?
					prevState.ticketToEdit :
					null,
			} );
		} );
	};

	/**
	 * @function
	 * @param {boolean} changesSaved
	 */
	changesSaved = ( changesSaved = false ) => {
		// console.log( '*** changesSaved ***', changesSaved );
		this.setState( { changesSaved: changesSaved } );
	};

	/**
	 * @function
	 * @param {Object} event
	 */
	editTicket = ( event ) => {
		// console.log(
		// 	'>>> CLICK <<< EventDateTicketDetails.editTicket()',
		// 	event.target.value
		// );
		const ticketId = event.target && event.target.value ?
			parseInt( event.target.value ) :
			0;
		// console.log( 'ticketId', ticketId );
		// console.log( 'this.state.ticketToEdit', this.state.ticketToEdit );
		const ticket = find( this.state.tickets, { id: ticketId } );
		// console.log( 'ticket', ticket );
		// this.setState( { ticketToEdit: ticket } );
		this.setState( ( prevState ) => ( {
			editorOpen: ! prevState.editorOpen,
			ticketToEdit: prevState.ticketToEdit === null || (
				prevState.ticketToEdit && prevState.ticketToEdit.id !== ticket.id
			) ?
				ticket :
				null,
		} ) );
	};

	render() {
		const {
			view = 'grid',
			...otherProps
		} = this.props;
		// console.log( '' );
		// console.log( 'EditorTicketsList view:', view );
		// console.log( 'EditorTicketsList otherProps:', otherProps );
		/*
		const modalId = this.state.ticketToEdit ?
			`event-date-ticket-modal-${ this.state.ticketToEdit.id }` :
			null;
		const buttonLabel = this.state.ticketToEdit ?
			__( 'Close Event Date Ticket ', 'event_espresso' ) +
			this.state.ticketToEdit.id :
			'';
		this.buttonLabel = buttonLabel;
		const modal = modalId ? (
			<TicketEditorModal
				id={ modalId }
				ticket={ this.state.ticketToEdit }
				editorOpen={ this.state.editorOpen }
				closeModal={ this.toggleEditor }
				changesSaved={ this.changesSaved }
				buttonLabel={ buttonLabel }
			/>
		) : null;
		*/

		return (
			<EntityList
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

/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { withEditorModal } from '@eventespresso/higher-order-components';

/**
 * Internal dependencies
 */
import {
	EditTicketForm,
	ticketEntityFormSchema,
	ticketEntityFormSubmitHandler,
} from '../';

/**
 * @function
 * @param {Object} ticket    JSON object defining the Ticket
 */
class EditTicketFormModal extends Component {
	constructor( props ) {
		super( props );
		// console.log( '' );
		// console.log( 'EditTicketFormModal props: ', props );
		this.toggleEditor = props.closeModal;
		this.state = {
			ticket: props.ticket ? props.ticket : {},
			originalTicket: props.ticket ? props.ticket : {},
		};
	}

	/**
	 * @function
	 * @return {Object} data
	 */
	loadHandler = async () => {
		const data = ticketEntityFormSchema( this.state.ticket );
		console.log( 'EditTicketFormModal.loadHandler() data', data );
		return data;
	};

	/**
	 * @function
	 * @param {Object} data
	 */
	submitHandler = async ( data ) => {
		console.log( 'EditTicketFormModal.submitHandler()' );
		console.log( ' >>> SUBMITTING DATA <<<', data );
		const ticket = ticketEntityFormSubmitHandler(
			this.state.ticket,
			data
		);
		console.log( ' >>> UPDATED TICKET <<<', ticket );
		this.setState( { ticket: ticket } );
		this.toggleEditor();
	};

	/**
	 * @function
	 * @param {Object} event
	 */
	resetHandler = ( event ) => {
		console.log( 'EditTicketFormModal.resetHandler()' );
		console.log( ' >>> FORM RESET <<<', event );
		this.setState( { ticket: this.state.originalTicket } );
	};

	render() {
		console.log( 'EditTicket.render()', this.props );
		return (
			<EditTicketForm
				loadHandler={ this.loadHandler }
				submitHandler={ this.submitHandler }
				resetHandler={ this.resetHandler }
				{ ...this.props }
			/>
		);
	}
}

/**
 * Enhanced TicketEditor with Modal
 */
export default withEditorModal( {
	title: __( 'Ticket Editor', 'event_espresso' ),
	customClass: 'ee-ticket-editor-modal',
	closeButtonLabel: __( 'close ticket editor', 'event_espresso' ),
} )( EditTicketFormModal );

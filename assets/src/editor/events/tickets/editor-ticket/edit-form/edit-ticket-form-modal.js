/**
 * External imports
 */
import { isFunction } from 'lodash';
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
		this.onUpdate = props.onUpdate;
		this.toggleEditor = props.toggleEditor;
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
		return await ticketEntityFormSchema( this.state.ticket );
	};

	/**
	 * @function
	 * @param {Object} data
	 */
	submitHandler = async ( data ) => {
		const ticket = await ticketEntityFormSubmitHandler( {
			ticket: this.state.ticket,
			formData: data,
		} );
		this.setState( { ticket } );
		if ( isFunction( this.onUpdate ) ) {
			this.onUpdate( ticket );
		}
		this.toggleEditor();
	};

	/**
	 * @function
	 */
	resetHandler = () => {
		this.setState( { ticket: this.state.originalTicket } );
	};

	render() {
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

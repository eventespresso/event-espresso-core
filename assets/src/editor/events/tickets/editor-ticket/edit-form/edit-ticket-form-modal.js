/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { withEditorModal } from '@eventespresso/editor-hocs';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	EditTicketForm,
	ticketEntityFormSchema,
} from '../';

const EditTicketFormModal = ( { ticket, ...otherProps } ) => {
	/**
	 * @function
	 * @return {Object} data
	 */
	const loadHandler = useCallback(
		() => {
			return ticketEntityFormSchema( ticket );
		},
		[ ticket ]
	);
	return (
		<EditTicketForm
			loadHandler={ loadHandler }
			submitHandler={ null }
			resetHandler={ null }
			ticket={ ticket }
			{ ...otherProps }
		/>
	);
}

/**
 * Enhanced TicketEditor with Modal
 */
export default withEditorModal( {
	title: __( 'Ticket Editor', 'event_espresso' ),
	customClass: 'ee-ticket-editor-modal',
	closeButtonLabel: __( 'close ticket editor', 'event_espresso' ),
} )( EditTicketFormModal );

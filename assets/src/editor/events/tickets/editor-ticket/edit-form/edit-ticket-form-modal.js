/**
 * External imports
 */
import { useMemo } from '@wordpress/element';

import { FormHandler } from '@eventespresso/components';
import { EditorModal, ifValidTicketEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import EditTicketForm from './edit-ticket-form';
import useTicketEditorId from './use-ticket-editor-id';
import useTicketFormSchema from './use-ticket-form-schema';

/**
 * @function
 * @param {Object} ticketEntity model object defining the Ticket
 * @param {Object} otherProps
 * @return {Object} rendered form with editor modal and form handler
 */
const EditTicketFormModal = ( {
	ticketEntity,
	...otherProps
} ) => {
	const editorId = useTicketEditorId( ticketEntity );
	const formData = useTicketFormSchema( ticketEntity );
	return useMemo( () => (
		<EditorModal
			editorId={ editorId }
			editorTitle={ __( 'Ticket Editor', 'event_espresso' ) }
			editorHtmlClass={ 'ee-ticket-editor-modal' }
			editorCloseButtonLabel={ __(
				'close ticket editor',
				'event_espresso'
			) }
		>
			<FormHandler
				FormComponent={ EditTicketForm }
				ticketEntity={ ticketEntity }
				formData={ formData }
				{ ...otherProps }
			/>
		</EditorModal>
	), [
		editorId,
		ticketEntity,
		formData,
		otherProps,
	] );
};

export default ifValidTicketEntity( EditTicketFormModal );

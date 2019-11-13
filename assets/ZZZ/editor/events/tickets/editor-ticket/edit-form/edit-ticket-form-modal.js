/**
 * External imports
 */
import { useMemo } from '@wordpress/element';

import { FormHandler } from '@eventespresso/components';
import { EditorModal, ifValidTicketEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import EditTicketForm from './edit-ticket-form';
import useTicketFormSchema from './use-ticket-form-schema';

/**
 * @function
 * @param {string} editorId
 * @param {Object} ticketEntity model object defining the Ticket
 * @param {Function} onEditorOpen
 * @param {Function} onEditorClose
 * @param {Object} otherProps
 * @return {Object} rendered form with editor modal and form handler
 */
const EditTicketFormModal = ( {
	editorId,
	ticketEntity,
	onEditorOpen,
	onEditorClose,
	...otherProps
} ) => {
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
			onEditorOpen={ onEditorOpen }
			onEditorClose={ onEditorClose }
		>
			<FormHandler
				FormComponent={ EditTicketForm }
				ticketEntity={ ticketEntity }
				formData={ formData }
				loading={ false }
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

EditTicketFormModal.propTypes = {
	editorId: PropTypes.string.isRequired,
	ticketEntity: PropTypes.object.isRequired,
	onEditorOpen: PropTypes.func,
	onEditorClose: PropTypes.func,
};

export default ifValidTicketEntity( EditTicketFormModal );

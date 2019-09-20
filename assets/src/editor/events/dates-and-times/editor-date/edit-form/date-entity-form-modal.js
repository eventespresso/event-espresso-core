/**
 * External imports
 */
import { FormHandler } from '@eventespresso/components';
import { EditorModal, ifValidDateEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import DateEntityForm from './date-entity-form';
import useDateEntityFormSchema from './use-date-entity-form-schema';

/**
 * @function
 * @param {Object} dateEntity model object defining the Event Date
 * @param {string} editorId
 * @param {Function} onEditorOpen
 * @param {Function} onEditorClose
 * @param {Object} otherProps
 * @return {Object} rendered form with editor modal and form handler
 */
const DateEntityFormModal = ( {
	dateEntity,
	editorId,
	onEditorOpen,
	onEditorClose,
	...otherProps
} ) => {
	return (
		<EditorModal
			editorId={ editorId }
			editorTitle={ __( 'Event Date Editor', 'event_espresso' ) }
			editorHtmlClass={ 'ee-event-date-editor-modal' }
			editorCloseButtonLabel={ __(
				'close event date editor',
				'event_espresso'
			) }
			onEditorOpen={ onEditorOpen }
			onEditorClose={ onEditorClose }
		>
			<FormHandler
				FormComponent={ DateEntityForm }
				formData={ useDateEntityFormSchema( dateEntity ) }
				dateEntity={ dateEntity }
				loading={ false }
				{ ...otherProps }
			/>
		</EditorModal>
	);
};

DateEntityFormModal.propTypes = {
	dateEntity: PropTypes.object.isRequired,
	onEditorOpen: PropTypes.func.isRequired,
	onEditorClose: PropTypes.func.isRequired,
};

export default ifValidDateEntity( DateEntityFormModal );

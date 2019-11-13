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
 * @param {Object} props
 * @member {string} editorId
 * @member {Object} dateEntity model object defining the Event Date
 * @member {Function} onEditorOpen
 * @member {Function} onEditorClose
 * @member {Object} otherProps
 * @return {Object} rendered form with editor modal and form handler
 */
const DateEntityFormModal = ( {
	editorId,
	dateEntity,
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
	editorId: PropTypes.string.isRequired,
	dateEntity: PropTypes.object.isRequired,
	onEditorOpen: PropTypes.func,
	onEditorClose: PropTypes.func,
};

export default ifValidDateEntity( DateEntityFormModal );

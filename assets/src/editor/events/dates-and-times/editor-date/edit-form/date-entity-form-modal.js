/**
 * External imports
 */
import { FormHandler } from '@eventespresso/components';
import { EditorModal, ifValidDateEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import DateEntityForm from './date-entity-form';
import useEventDateEditorId from './use-event-date-editor-id';
import useDateEntityFormSchema from './use-date-entity-form-schema';

/**
 * @function
 * @param {Object} dateEntity model object defining the Event Date
 * @param {Object} otherProps
 * @return {Object} rendered form with editor modal and form handler
 */
const DateEntityFormModal = ( {
	dateEntity,
	...otherProps
} ) => {
	return (
		<EditorModal
			editorId={ useEventDateEditorId( dateEntity ) }
			editorTitle={ __( 'Event Date Editor', 'event_espresso' ) }
			editorHtmlClass={ 'ee-event-date-editor-modal' }
			editorCloseButtonLabel={ __(
				'close event date editor',
				'event_espresso'
			) }
		>
			<FormHandler
				FormComponent={ DateEntityForm }
				formData={ useDateEntityFormSchema( dateEntity ) }
				dateEntity={ dateEntity }
				{ ...otherProps }
			/>
		</EditorModal>
	);
};

export default ifValidDateEntity( DateEntityFormModal );

/**
 * External imports
 */
import { useState } from '@wordpress/element';
import { EspressoButton } from '@eventespresso/components';
import { useOpenEditor } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import DateEntityFormModal from './edit-form/date-entity-form-modal';
import useEventDateEditorId from './edit-form/use-event-date-editor-id';
import useCreateDateEntity from '../../hooks/use-create-date-entity';
import useEventEditorEvent from '../../hooks/use-event-editor-event';
import cancelClickEvent from '../../../helpers/cancel-click-event';

const AddNewDateEntityButton = () => {
	const [ newDateEntity, setNewDateEntity ] = useState( null );
	const { eventEntity, eventEntityLoaded } = useEventEditorEvent();
	const createDateEntity = useCreateDateEntity( eventEntity, setNewDateEntity );
	const editorId = useEventDateEditorId( newDateEntity );
	const openEditor = useOpenEditor( editorId );
	if ( newDateEntity !== null ) {
		openEditor();
	}
	return (
		<>
			<EspressoButton
				icon={ 'calendar' }
				buttonText={ __( 'Add New Date', 'event_espresso' ) }
				onClick={ ( click ) => {
					cancelClickEvent( click, 'AddNewDateEntityButton' );
					createDateEntity();
				} }
				disabled={ ! eventEntityLoaded }
			/>
			<DateEntityFormModal dateEntity={ newDateEntity } />
		</>
	);
};

export default AddNewDateEntityButton;

/**
 * External dependencies
 */
import { IconMenuItem } from '@eventespresso/components';
import { ifValidDateEntity, useOpenEditor } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import useEventDateEditorId from '../../edit-form/use-event-date-editor-id';

const EditDateDetailsMenuItem = ( { dateEntity } ) => {
	const editorId = useEventDateEditorId( dateEntity );
	return (
		<IconMenuItem
			index={ 1 }
			tooltip={ __( 'edit date', 'event_espresso' ) }
			id={ `edit-date-${ dateEntity.id }` }
			htmlClass="edit-date"
			dashicon="edit"
			onClick={ useOpenEditor( editorId ) }
		/>
	);
};

EditDateDetailsMenuItem.propTypes = {
	dateEntity: PropTypes.object.isRequired,
};

export default ifValidDateEntity( EditDateDetailsMenuItem );

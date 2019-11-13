/**
 * External imports
 */
import { DropDownMenu } from '@eventespresso/components';
import { ifValidDateEntity, useOpenEditor } from '@eventespresso/editor-hocs';
import {
	useCopyDateEntity,
	useTrashDateEntity,
} from '@eventespresso/hooks';
import { __ } from '@eventespresso/i18n';
import PropTypes from 'prop-types';

import useEventDateEditorId from '../../edit-form/use-event-date-editor-id';

const DateEntityMainMenuItem = ( { dateEntity } ) => {
	return (
		<DropDownMenu
			tooltip={ __( 'event date main menu', 'event_espresso' ) }
			htmlClass={ `ee-editor-date-${ dateEntity.id }` }
			menuItems={ [
				{
					title: __( 'edit date', 'event_espresso' ),
					icon: 'edit',
					onClick: useOpenEditor( useEventDateEditorId( dateEntity ) ),
				},
				{
					title: __( 'copy date', 'event_espresso' ),
					icon: 'admin-page',
					onClick: useCopyDateEntity( dateEntity ),
				},
				{
					title: __( 'trash date', 'event_espresso' ),
					icon: 'trash',
					onClick: useTrashDateEntity( dateEntity ),
				},
			] }
		/>
	);
};

DateEntityMainMenuItem.propTypes = {
	dateEntity: PropTypes.object.isRequired,
};

export default ifValidDateEntity( DateEntityMainMenuItem );

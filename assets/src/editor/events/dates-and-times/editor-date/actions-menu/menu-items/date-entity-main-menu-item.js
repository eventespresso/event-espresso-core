/**
 * External imports
 */
import { compose } from '@wordpress/compose';
import { useCallback } from '@wordpress/element';
import { DropDownMenu } from '@eventespresso/components';
import { ifValidDateEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import withEditorEventEntity from '../../../../hocs/with-editor-event-entity';
import { withCopyDateEntity, withTrashDateEntity } from '../../action-handlers';

const DateEntityMainMenuItem = ( {
	dateEntity,
	toggleDateEditor,
	copyDateEntity,
	trashDateEntity,
} ) => {
	const copyDate = useCallback(
		() => copyDateEntity(),
		[ copyDateEntity ]
	);
	const trashDate = useCallback(
		() => trashDateEntity(),
		[ trashDateEntity ]
	);
	return (
		<DropDownMenu
			tooltip={ __( 'event date main menu', 'event_espresso' ) }
			htmlClass={ `ee-editor-date-${ dateEntity.id }` }
			menuItems={ [
				{
					title: __( 'edit date', 'event_espresso' ),
					icon: 'edit',
					onClick: toggleDateEditor,
				},
				{
					title: __( 'copy date', 'event_espresso' ),
					icon: 'admin-page',
					onClick: copyDate,
				},
				{
					title: __( 'trash date', 'event_espresso' ),
					icon: 'trash',
					onClick: trashDate,
				},
			] }
		/>
	);
};

export default compose( [
	ifValidDateEntity,
	withEditorEventEntity,
	withCopyDateEntity,
	withTrashDateEntity,
] )( DateEntityMainMenuItem );

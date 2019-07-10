/**
 * External imports
 */
import { compose } from '@wordpress/compose';
import { IconMenuItem } from '@eventespresso/components';
import { ifValidDateEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';

const EditDateDetailsMenuItem = ( {
	dateEntity,
	toggleDateEditor,
} ) => {
	return (
		<IconMenuItem
			index={ 1 }
			tooltip={ __( 'edit date', 'event_espresso' ) }
			id={ `edit-date-${ dateEntity.id }` }
			htmlClass="edit-date"
			dashicon="edit"
			onClick={ toggleDateEditor }
		/>
	);
};

export default compose( [
	ifValidDateEntity,
] )( EditDateDetailsMenuItem );

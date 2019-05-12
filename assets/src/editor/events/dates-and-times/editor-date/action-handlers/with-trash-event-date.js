/**
 * External imports
 */
import { withDispatch } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@eventespresso/i18n';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

const withTrashEventDate = createHigherOrderComponent(
	withDispatch( ( dispatch, { eventDate } ) => {
		const { MODEL_NAME: DATETIME } = dateTimeModel;
		if ( ! isModelEntityOfModel( eventDate, DATETIME ) ) {
			return { trashEventDate: () => null };
		}
		const { trashEntityById } = dispatch( 'eventespresso/core' );
		const trashEventDate = () => {
			// eslint-disable-next-line no-alert
			if ( ! window.confirm(
				__(
					'Are you sure you want to delete this Event Date?',
					'event_espresso'
				)
			) ) {
				return;
			}
			trashEntityById( DATETIME, eventDate.id );
		};
		return { trashEventDate };
	} ),
	'withTrashEventDate'
);

export default withTrashEventDate;

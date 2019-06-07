/**
 * External imports
 */
import { withDispatch } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@eventespresso/i18n';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

const withTrashDateEntity = createHigherOrderComponent(
	withDispatch( ( dispatch, { dateEntity } ) => {
		const { MODEL_NAME: DATETIME } = dateTimeModel;
		if ( ! isModelEntityOfModel( dateEntity, DATETIME ) ) {
			return { trashDateEntity: () => null };
		}
		const { trashEntityById } = dispatch( 'eventespresso/core' );
		const trashDateEntity = () => {
			// eslint-disable-next-line no-alert
			if ( ! window.confirm(
				__(
					'Are you sure you want to delete this date?',
					'event_espresso'
				)
			) ) {
				return;
			}
			trashEntityById( DATETIME, dateEntity.id );
		};
		return { trashDateEntity };
	} ),
	'withTrashDateEntity'
);

export default withTrashDateEntity;

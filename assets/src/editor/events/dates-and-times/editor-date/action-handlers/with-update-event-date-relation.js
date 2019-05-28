/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { dateTimeModel, eventModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { withDispatch } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';

const { MODEL_NAME: DATETIME } = dateTimeModel;
const { MODEL_NAME: EVENT } = eventModel;

const withUpdateEventDateRelation = createHigherOrderComponent(
	withDispatch(
		( dispatch ) => {
			const updateEventDateRelation = ( eventEntity, dateEntity ) => {
				if ( ! isModelEntityOfModel( eventEntity, EVENT ) ) {
					throw new Error(
						__( 'Unable to process the Event Date Entity form because an' +
							' invalid Event Entity was supplied. ', 'event_espresso' )
					);
				}
				if ( ! isModelEntityOfModel( dateEntity, DATETIME ) ) {
					throw new Error(
						__( 'Unable to process the Event Date Entity form because an' +
							' invalid Date Entity was supplied. ', 'event_espresso' )
					);
				}
				const { createRelation } = dispatch( 'eventespresso/core' );
				createRelation(
					EVENT,
					eventEntity.id,
					DATETIME,
					dateEntity
				);
			};
			return { updateEventDateRelation };
		}
	),
	'withUpdateEventDateRelation'
);

export default withUpdateEventDateRelation;

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { dateTimeModel, eventModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { withDispatch } from '@wordpress/data';
import { createHigherOrderComponent, compose } from '@wordpress/compose';

import { withEditorEventEntity } from '../../../hocs';

const { MODEL_NAME: DATETIME } = dateTimeModel;
const { MODEL_NAME: EVENT } = eventModel;

const withUpdateEventDateRelation = createHigherOrderComponent(
	compose( [
		withEditorEventEntity,
		withDispatch(
			( dispatch, { eventEntity } ) => {
				const updateEventDateRelation = ( dateEntity ) => {
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
	] ),
	'withUpdateEventDateRelation'
);

export default withUpdateEventDateRelation;

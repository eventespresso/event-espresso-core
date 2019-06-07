/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { withDispatch } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { createHigherOrderComponent } from '@wordpress/compose';

const withCopyDateEntity = createHigherOrderComponent(
	withDispatch( (
		dispatch,
		{
			eventEntity,
			dateEntity,
			dateTicketEntities,
			dateTicketEntitiesLoaded
		}
	) => {
		if ( ! isModelEntityOfModel( dateEntity, 'datetime' ) ) {
			return { copyDateEntity: () => null };
		}
		const {
			createEntity,
			createRelations,
		} = dispatch( 'eventespresso/core' );
		const copyDateEntity = async () => {
			const newDateEntity = await createEntity(
				'datetime',
				dateEntity.forClone
			);
			if ( dateTicketEntitiesLoaded && ! isEmpty( dateTicketEntities ) ) {
				createRelations(
					'datetime',
					newDateEntity.id,
					'tickets',
					dateTicketEntities
				);
			}
			createRelations(
				'event',
				eventEntity.id,
				'datetimes',
				[ newDateEntity ]
			);
			return newDateEntity;
		};
		return { copyDateEntity };
	} ),
	'withCopyDateEntity'
);

export default withCopyDateEntity;

/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { dispatch, select } from '@wordpress/data';
import { dateTimeModel, eventModel, ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

const { MODEL_NAME: DATETIME } = dateTimeModel;
const { MODEL_NAME: EVENT } = eventModel;
const { MODEL_NAME: TICKET } = ticketModel;

/**
 * @function
 * @param {Object} datetimeEntity  EE Date object
 * @return {Object} bool true if copy was successful
 */
export const copyEventDate = async ( datetimeEntity ) => {
	if ( ! isModelEntityOfModel( datetimeEntity, DATETIME ) ) {
		return false;
	}
	const store = select( 'eventespresso/core' );
	const server = dispatch( 'eventespresso/core' );
	let newDatetimeEntity = await server.createEntity(
		DATETIME,
		{
			EVT_ID: datetimeEntity.EVT_ID,
			DTT_name: datetimeEntity.name,
			DTT_description: datetimeEntity.description,
			DTT_EVT_start: datetimeEntity.start,
			DTT_EVT_end: datetimeEntity.end,
			DTT_reg_limit: datetimeEntity.regLimit,
			DTT_sold: 0,
			DTT_reserved: 0,
			DTT_is_primary: datetimeEntity.isPrimary,
			DTT_order: datetimeEntity.order,
			DTT_parent: datetimeEntity.parent,
			DTT_deleted: datetimeEntity.deleted,
		}
	);
	server.createRelation(
		EVENT,
		datetimeEntity.EVT_ID,
		DATETIME,
		newDatetimeEntity
	);
	const ticketEntities = store.getRelatedEntities( datetimeEntity, TICKET );
	if ( Array.isArray( ticketEntities ) && ! isEmpty( ticketEntities ) ) {
		return await dispatch( 'eventespresso/core' ).createRelations(
			DATETIME,
			newDatetimeEntity.id,
			TICKET,
			ticketEntities
		);
	}
	newDatetimeEntity = await server.persistEntityRecord(
		DATETIME,
		newDatetimeEntity
	);
	server.persistRelationsForEntityId( DATETIME, newDatetimeEntity.id );
	return true;
};

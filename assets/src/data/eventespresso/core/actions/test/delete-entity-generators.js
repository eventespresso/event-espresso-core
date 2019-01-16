/**
 * Internal imports
 */
import {
	deleteEntityById,
	trashEntityById,
} from '../delete-entity-generators';
import {
	receiveTrashEntityId,
	receiveDeleteEntityId,
} from '../receive-entities';
import { removeEntityById } from '../remove-entities';
import { removeAllRelatedEntitiesForModelEntity } from '../remove-relations';

describe( 'deleteEntityById()', () => {
	const fulfillment = deleteEntityById( 'event', 10 );
	[
		removeEntityById,
		removeAllRelatedEntitiesForModelEntity,
		receiveDeleteEntityId,
	].forEach( ( actionMethod ) => {
		it( 'yields expected action for ' + actionMethod.name, () => {
			const { value } = fulfillment.next();
			expect( value ).toEqual( actionMethod( 'event', 10 ) );
		} );
	} );
} );
describe( 'trashEntityById()', () => {
	const fulfillment = trashEntityById( 'event', 10 );
	[
		removeEntityById,
		removeAllRelatedEntitiesForModelEntity,
		receiveTrashEntityId,
	].forEach( ( actionMethod ) => {
		it( 'yields expected action for ' + actionMethod.name, () => {
			const { value } = fulfillment.next();
			expect( value ).toEqual( actionMethod( 'event', 10 ) );
		} );
	} );
} );

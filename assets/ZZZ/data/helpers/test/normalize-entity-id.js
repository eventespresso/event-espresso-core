/**
 * Internal imports
 */
import { normalizeEntityId } from '../normalize-entity-id';

/**
 * External imports
 */
import cuid from 'cuid';

describe( normalizeEntityId.name + '()', () => {
	const CUID = cuid();
	[
		[
			'handles cuid',
			CUID,
			CUID,
		],
		[
			'handles string number',
			'12',
			12,
		],
		[
			'handles number',
			12,
			12,
		],
	].forEach( ( [ description, id, expected ] ) => {
		it( description, () => {
			expect( normalizeEntityId( id ) ).toBe( expected );
		} );
	} );
} );

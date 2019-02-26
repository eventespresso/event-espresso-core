/**
 * Internal dependencies
 */
import {
	EventEntities,
	DateTimeEntities,
} from '../../../test/fixtures/base';

/**
 * External Imports
 */
import { Map, fromJS, Set } from 'immutable';

export const mockStateForTests = {
	entities: Map()
		.set(
			'event',
			Map()
				.set( 10, EventEntities.a )
				.set( 20, EventEntities.b )
				.set( 30, EventEntities.c )
				.set( EventEntities.d.id, EventEntities.d )
		)
		.set(
			'datetime',
			Map()
				.set( 52, DateTimeEntities.a )
				.set( 53, DateTimeEntities.b )
				.set( 54, DateTimeEntities.c )
				.set( DateTimeEntities.d.id, DateTimeEntities.d )
		),
	relations: Map()
		.set(
			'index',
			Map().set(
				'datetimes',
				Map()
					.set( 52, Map().set( 'event', Set.of( 10 ) ) )
					.set( 53, Map().set( 'event', Set.of( 20 ) ) )
					.set( 54, Map().set( 'event', Set.of( 30 ) ) )
					.set(
						DateTimeEntities.d.id,
						Map().set(
							'event',
							Set.of( EventEntities.d.id )
						)
					)
			)
		)
		.set(
			'entityMap',
			Map().set(
				'event',
				Map()
					.set( 10, Map().set( 'datetimes', Set.of( 52 ) ) )
					.set( 20, Map().set( 'datetimes', Set.of( 53 ) ) )
					.set( 30, Map().set( 'datetimes', Set.of( 54 ) ) )
					.set(
						EventEntities.d.id,
						Map().set(
							'datetimes',
							Set.of( DateTimeEntities.d.id )
						)
					)
			)
		),
	dirty: {
		delete: Map(),
		trash: Map(),
		relations: fromJS( {
			index: {},
			delete: {},
			add: {},
		} ),
	},
	modelSpecific: Set(),
};

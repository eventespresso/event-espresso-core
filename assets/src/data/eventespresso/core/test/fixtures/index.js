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
import { Map, fromJS, List } from 'immutable';

export const mockStateForTests = Map()
	.set(
		'entities',
		Map().set(
			'event',
			Map()
				.set( 10, EventEntities.a )
				.set( 20, EventEntities.b )
				.set( 30, EventEntities.c )
		).set(
			'datetime',
			Map()
				.set( 52, DateTimeEntities.a )
				.set( 53, DateTimeEntities.b )
				.set( 54, DateTimeEntities.c )
		)
	)
	.set(
		'relations',
		Map()
			.set(
				'index',
				Map().set(
					'datetimes',
					Map()
						.set( 52, Map().set( 'event', List.of( 10 ) ) )
						.set( 53, Map().set( 'event', List.of( 20 ) ) )
						.set( 54, Map().set( 'event', List.of( 30 ) ) )
				)
			)
			.set(
				'entityMap',
				Map().set(
					'event',
					Map()
						.set( 10, Map().set( 'datetimes', List.of( 52 ) ) )
						.set( 20, Map().set( 'datetimes', List.of( 53 ) ) )
						.set( 30, Map().set( 'datetimes', List.of( 54 ) ) )
				)
			)
	).set(
		'dirty',
		fromJS(
			{
				relations: {
					index: {},
					delete: {},
					add: {},
				},
				trash: {},
				delete: {},
			}
		)
	);

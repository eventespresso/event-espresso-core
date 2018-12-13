/**
 * Extenral imports
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import {
	replaceOldRelationIdWithNewRelationId,
	removeRelatedEntitiesForEntity,
	dirtyRelations,
} from '../dirty-relations';
import { mockStateForTests } from '../../test/fixtures';
import { ACTION_TYPES } from '../../actions/action-types';

const { relations: types } = ACTION_TYPES;

let originalState, frozenState;

describe( 'dirty relations tests', () => {
	beforeEach( () => {
		const getState = ( incomingState = {} ) => {
			const newState = { ...incomingState };
			newState.index = {
				datetimes: {
					20: {
						event: new Map( [ [ 'delete', [ 10 ] ] ] ),
						ticket: new Map( [
							[ 'delete', [ 50 ] ],
							[ 'add', [ 60 ] ],
						] ),
					},
				},
			};
			newState.delete = {
				event: {
					10: {
						datetimes: [ 20 ],
					},
				},
				ticket: {
					50: {
						datetimes: [ 20 ],
					},
				},
			};
			newState.add = {
				ticket: {
					60: {
						datetimes: [ 20 ],
					},
				},
			};
			return newState;
		};
		originalState = getState(
			{ ...mockStateForTests.dirty.relations }
		);
		frozenState = getState(
			{ ...mockStateForTests.dirty.relations }
		);
		frozenState = deepFreeze( frozenState );
	} );
	describe( 'replaceOldRelationIdWithNewRelationId()', () => {
		const testAction = ( modelName, oldEntityId, newEntityId ) => {
			return {
				modelName,
				oldEntityId,
				newEntityId,
			};
		};
		it( 'returns original state if the model does not exist ' +
			'in the state', () => {
			expect(
				replaceOldRelationIdWithNewRelationId(
					frozenState,
					testAction( 'cheeseburgers', 20, 30 )
				)
			).toBe( frozenState );
		} );
		it( 'returns the original state if the old id does not exist ' +
			'in the state', () => {
			expect(
				replaceOldRelationIdWithNewRelationId(
					frozenState,
					testAction( 'event', 30, 20 )
				)
			).toBe( frozenState );
		} );
		it( 'returns expected change in state for model and id that exists',
			() => {
				const result = replaceOldRelationIdWithNewRelationId(
					originalState,
					testAction( 'datetime', 20, 44 )
				);
				expect( result ).not.toBe( originalState );
				expect( result ).toEqual( {
					...originalState,
					index: {
						datetimes: {
							44: {
								event: new Map( [ [ 'delete', [ 10 ] ] ] ),
								ticket: new Map( [
									[ 'delete', [ 50 ] ],
									[ 'add', [ 60 ] ]
								] ),
							},
						},
					},
					delete: {
						event: {
							10: {
								datetimes: [ 44 ],
							},
						},
						ticket: {
							50: {
								datetimes: [ 44 ],
							},
						},
					},
					add: {
						ticket: {
							60: {
								datetimes: [ 44 ],
							},
						},
					},
				} );
			}
		);
	} );

	describe( 'removeRelatedEntitiesForEntity()', () => {
		const testAction = ( modelName, entityId ) => ( {
			modelName,
			entityId,
		} );
		it( 'returns original state if the model does not exist in the ' +
			'state', () => {
			expect( removeRelatedEntitiesForEntity(
				frozenState,
				testAction( 'cheeseburgers', 20 )
			) ).toBe( frozenState );
		} );
		it( 'returns original state if the model entity id does not exist in the ' +
			'state', () => {
			expect(
				removeRelatedEntitiesForEntity(
					frozenState,
					testAction( 'event', 50 )
				)
			).toBe( frozenState );
		} );
		it( 'returns expected state if the entity id for the model exists in ' +
			'the state', () => {
			const result = removeRelatedEntitiesForEntity(
				originalState,
				testAction( 'event', 10 ),
			);
			expect( result ).not.toBe( originalState );
			expect( result ).toEqual( {
				...originalState,
				index: {
					datetimes: {
						20: {
							ticket: new Map(
								[
									[ 'delete', [ 50 ] ],
									[ 'add', [ 60 ] ],
								]
							),
						},
					},
				},
				delete: {
					ticket: {
						50: {
							datetimes: [ 20 ],
						},
					},
				},
				add: {
					ticket: {
						60: {
							datetimes: [ 20 ],
						},
					},
				},
			} );
		} );
		it( 'returns expected state if the entity id for the model exists in ' +
			'the state and removing it means all its related properties are ' +
			'empty', () => {
			const result = removeRelatedEntitiesForEntity(
				originalState,
				testAction( 'datetime', 20 )
			);
			expect( result ).not.toBe( originalState );
			expect( result ).toEqual( {
				index: {},
				delete: {},
				add: {},
			} );
		} );
	} );
	describe( 'dirtyRelations()', () => {
		const testAction = ( actionType ) => (
			relationName = 'datetimes',
			relationEntityId = 20,
			modelName = 'event',
			entityId = 10,
			queueType = 'delete',
		) => ( {
			type: actionType,
			relationName,
			relationEntityId,
			modelName,
			entityId,
			queueType,
		} );
		describe( 'testing the normalizeAction behaviour', () => {
			it( 'does not duplicate relations in state', () => {
				expect( dirtyRelations(
					frozenState,
					testAction( types.RECEIVE_DIRTY_RELATION_INDEX )(
						'events',
						10,
						'datetime',
						20
					)
				) ).toBe( frozenState );
			} );
		} );
		describe( 'index state updates', () => {
			describe( types.RECEIVE_DIRTY_RELATION_INDEX + ' action type',
				() => {
					const action = testAction( types.RECEIVE_DIRTY_RELATION_INDEX );
					it( 'returns original state if given model entity id already exists',
						() => {
							expect( dirtyRelations(
								frozenState,
								action()
							) ).toBe( frozenState );
						}
					);
					it( 'returns expected state for new index added', () => {
						const result = dirtyRelations(
							originalState,
							action(
								'tickets',
								200,
								'datetime',
								20
							)
						);
						expect( result ).not.toBe( originalState );
						expect( result ).toEqual(
							{
								...originalState,
								index: {
									...originalState.index,
									datetimes: {
										20: {
											...originalState.index.datetimes[ 20 ],
											ticket: new Map(
												[
													[ 'delete', [ 50, 200 ] ],
													[ 'add', [ 60 ] ],
												]
											),
										},
									},
								},
							}
						);
					} );
				}
			);
			describe( types.REMOVE_DIRTY_RELATION_INDEX + ' action type',
				() => {
					const action = testAction( types.REMOVE_DIRTY_RELATION_INDEX );
					it( 'returns original state if given model entity id does not ' +
						'already exist', () => {
						expect( dirtyRelations(
							frozenState,
							action(
								'events',
								20,
								'datetime',
								50
							)
						) ).toBe( frozenState );
					} );
					it( 'returns expected state for index removed', () => {
						const result = dirtyRelations(
							originalState,
							action()
						);
						expect( result ).not.toBe( originalState );
						expect( result ).toEqual(
							{
								...originalState,
								index: {
									...originalState.index,
									datetimes: {
										20: {
											ticket: new Map(
												[
													[ 'delete', [ 50 ] ],
													[ 'add', [ 60 ] ],
												]
											),
										},
									},
								},
							}
						);
					} );
				}
			);
		} );
		describe( 'add and delete state updates', () => {
			[
				[
					types.RECEIVE_DIRTY_RELATION_ADDITION,
					[ 'tickets', 60, 'datetime', 20, 'add' ],
					[ 'tickets', 400, 'datetime', 20, 'add' ],
					() => ( {
						...originalState,
						add: {
							...originalState.add,
							ticket: {
								60: {
									datetimes: [ 20 ],
								},
								400: {
									datetimes: [ 20 ],
								},
							},
						},
					} ),
				],
				[
					types.RECEIVE_DIRTY_RELATION_DELETION,
					[ 'tickets', 50, 'datetime', 20, 'delete' ],
					[ 'tickets', 400, 'datetime', 20, 'delete' ],
					() => ( {
						...originalState,
						delete: {
							...originalState.delete,
							ticket: {
								50: {
									datetimes: [ 20 ],
								},
								400: {
									datetimes: [ 20 ],
								},
							},
						},
					} ),
				],
			].forEach( ( [
				actionType,
				noChangeArgs,
				changeArgs,
				expectedChange,
			] ) => {
				describe( actionType + ' action type', () => {
					const action = testAction( actionType );
					it( 'returns original state if given model entity id already ' +
						'exists in the state', () => {
						expect( dirtyRelations(
							frozenState,
							action( ...noChangeArgs )
						) ).toBe( frozenState );
					} );
					it( 'returns expected state when given model entity id does not' +
						'exist in state', () => {
						const result = dirtyRelations(
							originalState,
							action( ...changeArgs )
						);
						expect( result ).not.toBe( originalState );
						expect( result ).toEqual( expectedChange() );
					} );
				} );
			} );
			[
				[
					types.REMOVE_DIRTY_RELATION_ADDITION,
					[ 'tickets', 400, 'datetime', 20, 'add' ],
					[ 'tickets', 60, 'datetime', 20, 'add' ],
					() => ( {
						...originalState,
						add: {},
					} ),
				],
				[
					types.REMOVE_DIRTY_RELATION_DELETION,
					[ 'tickets', 400, 'datetime', 20, 'delete' ],
					[ 'tickets', 50, 'datetime', 20, 'delete' ],
					() => ( {
						...originalState,
						delete: {
							event: {
								...originalState.delete.event,
							},
						},
					} ),
				],
			].forEach( ( [
				actionType,
				noChangeArgs,
				changeArgs,
				expectedChange,
			] ) => {
				describe( actionType + ' action type', () => {
					const action = testAction( actionType );
					it( 'returns original state if given model entity id does ' +
						'not exist in the state', () => {
						expect( dirtyRelations(
							frozenState,
							action( ...noChangeArgs )
						) ).toBe( frozenState );
					} );
					it( 'returns expected state when given model entity id does ' +
						'exist in state', () => {
						const result = dirtyRelations(
							originalState,
							action( ...changeArgs )
						);
						expect( result ).not.toBe( originalState );
						expect( result ).toEqual( expectedChange() );
					} );
				} );
			} );
		} );
	} );
} );

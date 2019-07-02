import TestRenderer, { act } from 'react-test-renderer';
import {
	createRegistry,
	RegistryProvider,
} from '@wordpress/data';
import { AuthedEventEntity, AuthedDateTimeEntity } from '@test/fixtures';

import useEditorUpdateEventDateRelation from '../use-editor-update-event-date-relation';

describe( 'useEditorUpdateEventDateRelation', () => {
	let registry;
	beforeEach( () => {
		registry = createRegistry();
	} );

	const getTestComponent = ( updaterSpy ) =>
		( ( WrappedComponent ) => ( props ) => {
			return <RegistryProvider value={ registry }>
				<WrappedComponent { ...props } />
			</RegistryProvider>;
		} )(
			( props ) => {
				const eventEntity = props.eventEntity || null;
				const updater = useEditorUpdateEventDateRelation( eventEntity );
				const enhancedUpdater = ( dateEntity ) => {
					updaterSpy();
					updater( dateEntity );
				};
				return <div updater={ enhancedUpdater } />;
			}
		);

	it( 'throws an error if there was no Event entity passed in to the ' +
		'hook and there is no eventEntity in state', () => {
		const updaterSpy = jest.fn();
		const createRelationSpy = jest.fn();
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			actions: {
				createRelation: createRelationSpy.mockImplementation(
					() => ( { type: 'DUMMY_DISPATCH' } )
				),
			},
			selectors: {
				getEvents: () => [],
			},
		} );
		const TestComponent = getTestComponent( updaterSpy );
		let renderer;
		act( () => {
			renderer = TestRenderer.create( <TestComponent /> );
		} );
		const props = renderer.root.findByType( 'div' ).props;
		expect( () => props.updater() ).toThrowError( 'invalid Event' );
		expect( updaterSpy ).toHaveBeenCalledTimes( 1 );
		expect( createRelationSpy ).not.toHaveBeenCalled();
	} );
	it( 'throws an error if there was no valid Date entity passed in to the ' +
		'dispatcher', () => {
		const updaterSpy = jest.fn();
		const createRelationSpy = jest.fn();
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			actions: {
				createRelation: createRelationSpy.mockImplementation(
					() => ( { type: 'DUMMY_DISPATCH' } )
				),
			},
		} );
		const TestComponent = getTestComponent( updaterSpy );
		let renderer;
		act( () => {
			renderer = TestRenderer
				.create( <TestComponent eventEntity={ AuthedEventEntity } /> );
		} );
		const props = renderer.root.findByType( 'div' ).props;
		expect( () => props.updater() ).toThrowError( 'invalid Date' );
		expect( updaterSpy ).toHaveBeenCalledTimes( 1 );
		expect( createRelationSpy ).not.toHaveBeenCalled();
	} );
	it( 'dispatches the create relation action creator with valid ' +
		'event entity and date entity', () => {
		const updaterSpy = jest.fn();
		const createRelationSpy = jest.fn();
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			actions: {
				createRelation: createRelationSpy.mockImplementation(
					() => ( { type: 'DUMMY_DISPATCH' } )
				),
			},
		} );
		const TestComponent = getTestComponent( updaterSpy );
		let renderer;
		act( () => {
			renderer = TestRenderer
				.create( <TestComponent eventEntity={ AuthedEventEntity } /> );
		} );
		const props = renderer.root.findByType( 'div' ).props;
		props.updater( AuthedDateTimeEntity );
		expect( updaterSpy ).toHaveBeenCalledTimes( 1 );
		expect( createRelationSpy ).toHaveBeenCalledTimes( 1 );
		expect( createRelationSpy ).toHaveBeenCalledWith(
			'event',
			AuthedEventEntity.id,
			'datetime',
			AuthedDateTimeEntity
		);
	} );
} );

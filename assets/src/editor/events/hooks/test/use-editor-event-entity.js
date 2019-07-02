import TestRenderer, { act } from 'react-test-renderer';
import {
	createRegistry,
	RegistryProvider,
} from '@wordpress/data';
import { AuthedEventEntity } from '@test/fixtures';

import useEditorEventEntity from '../use-editor-event-entity';

describe( 'useEditorEventEntity', () => {
	let registry;
	beforeEach( () => {
		registry = createRegistry();
	} );

	const getTestComponent = () =>
		( ( WrappedComponent ) => ( props ) => {
			return <RegistryProvider value={ registry }>
				<WrappedComponent { ...props } />
			</RegistryProvider>;
		} )(
			( props ) => {
				const eventEntity = useEditorEventEntity( props.eventEntity );
				const id = eventEntity === null ? null : eventEntity.id;
				return <div id={ id } />;
			}
		);

	it( 'returns null if there is no event entity in the state', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getEvents: () => [],
			},
		} );
		const TestComponent = getTestComponent();
		let renderer;
		act( () => {
			renderer = TestRenderer.create( <TestComponent /> );
		} );
		const testInstance = renderer.root;
		expect( testInstance.findByType( 'div' ).props.id ).toBeNull();
	} );
	it( 'returns the passed in value if its a valid event entity', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getEvents: () => [ AuthedEventEntity ],
			},
		} );
		const EventClone = AuthedEventEntity.clone();
		const TestComponent = getTestComponent();
		let renderer;
		act( () => {
			renderer = TestRenderer.create(
				<TestComponent eventEntity={ EventClone } />
			);
		} );
		const testInstance = renderer.root;
		const props = testInstance.findByType( 'div' ).props;
		expect( props.id ).toEqual( EventClone.id );
		expect( props.id ).not.toEqual( AuthedEventEntity.id );
	} );
	it( 'returns the event entity in the state if the passed in value is ' +
		'not a valid event entity', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getEvents: () => [ AuthedEventEntity ],
			},
		} );
		const TestComponent = getTestComponent();
		let renderer;
		act( () => {
			renderer = TestRenderer.create(
				<TestComponent eventEntity={ 'event' } />
			);
		} );
		const testInstance = renderer.root;
		const props = testInstance.findByType( 'div' ).props;
		expect( props.id ).toEqual( AuthedEventEntity.id );
	} );
} );

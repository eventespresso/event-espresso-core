import TestRenderer from 'react-test-renderer';
import { createRegistry, RegistryProvider } from '@wordpress/data';
import { AuthedEventEntity } from '@test/fixtures';

import useEventEditorEvent from '../use-event-editor-event';

describe( 'useEventEditorEvent', () => {
	let registry;
	beforeEach( () => {
		registry = createRegistry();
	} );

	const EventClone = AuthedEventEntity.clone();

	const getTestComponent = () =>
		( ( WrappedComponent ) => ( props ) => (
			<RegistryProvider value={ registry }>
				<WrappedComponent { ...props } />
			</RegistryProvider>
		) )(
			( { eventId = 0 } ) => {
				const result = useEventEditorEvent( eventId );
				const id = result && result.eventEntity ?
					result.eventEntity.id :
					null;
				return <div id={ id } />;
			}
		);

	it( 'returns null if there is no event entity in the state', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getEntityById: () => null,
				getEntitiesForModel: () => ( { eventEntity: null } ),
			},
		} );
		const TestComponent = getTestComponent();
		const component = TestRenderer.create( <TestComponent /> ).toJSON();
		const event = component.children;
		expect( event ).toBeNull();
	} );

	it( 'returns event entity if supplied a valid event entity ID', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getEntityById: () => EventClone,
				getEntitiesForModel: () => (
					{ eventEntity: AuthedEventEntity }
				),
			},
		} );
		const TestComponent = getTestComponent();
		const component = TestRenderer.create(
			<TestComponent eventId={ EventClone.id } />
		).toJSON();
		expect( component.props.id ).toEqual( EventClone.id );
		expect( component.props.id ).not.toEqual( AuthedEventEntity.id );
	} );

	it( 'returns the event entity in the state if no ID is supplied', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getEntityById: () => EventClone,
				getEntitiesForModel: () => (
					{ eventEntity: AuthedEventEntity }
				),
			},
		} );
		const TestComponent = getTestComponent();
		const component = TestRenderer.create( <TestComponent /> ).toJSON();
		expect( component.props.id ).toEqual( AuthedEventEntity.id );
	} );
} );

import TestRenderer, { act } from 'react-test-renderer';
import {
	createRegistry,
	RegistryProvider,
} from '@wordpress/data';
import {
	AuthedVenueEntity,
	AuthedEventEntity,
} from '@test/fixtures';

import useEventVenueEntity from '../use-event-venue-entity';

describe( 'useEventVenueEntity', () => {
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
				const { venueEntity, venueEntityLoaded } = useEventVenueEntity( props.eventEntity );
				const id = venueEntity === null ? null : venueEntity.id;
				return <div id={ id } loaded={ venueEntityLoaded } />;
			}
		);
	it( 'returns default object if event entity not provided', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getRelatedEntities: () => [],
				hasFinishedResolution: () => true,
			},
		} );
		const TestComponent = getTestComponent();
		let renderer;
		act( () => {
			renderer = TestRenderer.create( <TestComponent eventEntity={ null } /> );
		} );
		const testInstance = renderer.root;
		const props = testInstance.findByType( 'div' ).props;
		expect( console ).toHaveErrored();
		expect( props.id ).toBeNull();
		expect( props.loaded ).toBe( false );
	} );
	it( 'returns null if there is no venue entity related to the event in the' +
		' state', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getRelatedEntities: () => [],
				hasFinishedResolution: () => true,
			},
		} );
		const TestComponent = getTestComponent();
		let renderer;
		act( () => {
			renderer = TestRenderer
				.create( <TestComponent eventEntity={ AuthedEventEntity } /> );
		} );
		const testInstance = renderer.root;
		const props = testInstance.findByType( 'div' ).props;
		expect( props.id ).toBeNull();
		expect( props.loaded ).toBe( true );
	} );
	it( 'returns null if venue isn\'t loaded', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getRelatedEntities: () => [ AuthedVenueEntity ],
				hasFinishedResolution: () => false,
			},
		} );
		const TestComponent = getTestComponent();
		let renderer;
		act( () => {
			renderer = TestRenderer
				.create( <TestComponent eventEntity={ AuthedEventEntity } /> );
		} );
		const testInstance = renderer.root;
		const props = testInstance.findByType( 'div' ).props;
		expect( console ).toHaveErrored();
		expect( props.id ).toBeNull();
		expect( props.loaded ).toBe( false );
	} );
	it( 'returns the venue entity in the state when venue is loaded and there ' +
		'is a related venue to the passed in event', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getRelatedEntities: () => [ AuthedVenueEntity ],
				hasFinishedResolution: () => true,
			},
		} );
		const TestComponent = getTestComponent();
		let renderer;
		act( () => {
			renderer = TestRenderer
				.create( <TestComponent eventEntity={ AuthedEventEntity } /> );
		} );
		const testInstance = renderer.root;
		const props = testInstance.findByType( 'div' ).props;
		expect( props.id ).toBe( AuthedVenueEntity.id );
		expect( props.loaded ).toBe( true );
	} );
} );

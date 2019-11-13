import TestRenderer from 'react-test-renderer';
import { createRegistry, RegistryProvider } from '@wordpress/data';
import { AuthedVenueEntity, AuthedEventEntity } from '@test/fixtures';

import useEventVenue from '../use-event-venue';

describe( 'useEventVenue', () => {
	let registry;
	beforeEach( () => {
		registry = createRegistry();
	} );

	const getTestComponent = () =>
		( ( WrappedComponent ) => ( props ) => {
			return (
				<RegistryProvider value={ registry }>
					<WrappedComponent { ...props } />
				</RegistryProvider>
			);
		} )(
			( props ) => {
				const { venueEntity, venueEntityLoaded } = useEventVenue(
					props.eventEntity
				);
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
		const component = TestRenderer.create(
			<TestComponent eventEntity={ null } />
		).toJSON();
		expect( component.props.id ).toBeNull();
		expect( component.props.loaded ).toBe( false );
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
		const component = TestRenderer.create(
			<TestComponent eventEntity={ AuthedEventEntity } />
		).toJSON();
		expect( component.props.id ).toBeNull();
		expect( component.props.loaded ).toBe( true );
	} );
	it( 'returns venue entity but venueEntityLoaded = false ' +
		'if venue isn\'t fully loaded', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getRelatedEntities: () => [ AuthedVenueEntity ],
				hasFinishedResolution: () => false,
			},
		} );
		const TestComponent = getTestComponent();
		const component = TestRenderer.create(
			<TestComponent eventEntity={ AuthedEventEntity } />
		).toJSON();
		expect( component.props.id ).toBe( AuthedVenueEntity.id );
		expect( component.props.loaded ).toBe( false );
	} );
	it( 'returns the venue entity in the state when venue is loaded ' +
		'and there is a related venue to the passed in event', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getRelatedEntities: () => [ AuthedVenueEntity ],
				hasFinishedResolution: () => true,
			},
		} );
		const TestComponent = getTestComponent();
		const component = TestRenderer.create(
			<TestComponent eventEntity={ AuthedEventEntity } />
		).toJSON();
		expect( component.props.id ).toBe( AuthedVenueEntity.id );
		expect( component.props.loaded ).toBe( true );
	} );
} );

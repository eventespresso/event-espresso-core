import TestRenderer, { act } from 'react-test-renderer';
import {
	createRegistry,
	RegistryProvider,
} from '@wordpress/data';
import { AuthedTicketEntity, AuthedDateTimeEntity } from '@test/fixtures';

import useEditorDateTicketEntities from '../use-editor-date-ticket-entities';

describe( 'useEditorDateTicketEntities', () => {
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
				const ticketEntities = useEditorDateTicketEntities( props.dateEntity );
				return <div ticketEntities={ ticketEntities } />;
			}
		);

	it( 'returns empty array if there is no date entity in the state and ' +
		'throws a console error (warning)', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getRelatedEntities: () => [ AuthedTicketEntity ],
			},
		} );
		const TestComponent = getTestComponent();
		let renderer;
		act( () => {
			renderer = TestRenderer.create( <TestComponent /> );
		} );
		const testInstance = renderer.root;
		expect( testInstance.findByType( 'div' ).props.ticketEntities )
			.toEqual( [] );
		expect( console ).toHaveErroredWith(
			'Warning: The provided value is not a valid datetime entity.'
		);
	} );
	it( 'returns the expected array of ticket entities for the given date ' +
		'entity', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getRelatedEntities: () => [ AuthedTicketEntity ],
			},
		} );
		const TestComponent = getTestComponent();
		let renderer;
		act( () => {
			renderer = TestRenderer.create(
				<TestComponent dateEntity={ AuthedDateTimeEntity } />
			);
		} );
		const testInstance = renderer.root;
		const props = testInstance.findByType( 'div' ).props;
		expect( props.ticketEntities ).toEqual( [ AuthedTicketEntity ] );
	} );
} );

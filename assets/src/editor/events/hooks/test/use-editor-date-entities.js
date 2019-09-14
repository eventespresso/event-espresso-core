import TestRenderer, { act } from 'react-test-renderer';
import {
	createRegistry,
	RegistryProvider,
} from '@wordpress/data';
import { AuthedDateTimeEntity } from '@test/fixtures';

import useEventEditorEventDates from '../use-event-editor-event-dates';

describe( 'useEventEditorEventDates', () => {
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
			() => {
				const { eventDates } = useEventEditorEventDates();
				return <div dateEntities={ eventDates } />;
			}
		);

	it( 'returns empty array if there are no date entities in the state', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getDatetimes: () => [],
			},
		} );
		const TestComponent = getTestComponent();
		let renderer;
		act( () => {
			renderer = TestRenderer.create( <TestComponent /> );
		} );
		const testInstance = renderer.root;
		expect( testInstance.findByType( 'div' ).props.dateEntities )
			.toEqual( {
				eventDates: [],
				eventDatesLoaded: false,
			} );
	} );
	it( 'returns date entities available in the state', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getDatetimes: () => [ AuthedDateTimeEntity ],
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
		expect( props.dateEntities ).toEqual(
			[ AuthedDateTimeEntity ]
		);
	} );
} );

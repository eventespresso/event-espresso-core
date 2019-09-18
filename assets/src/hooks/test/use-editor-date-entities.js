import TestRenderer from 'react-test-renderer';
import { AuthedDateTimeEntity } from '@test/fixtures';
import { createRegistry, RegistryProvider } from '@wordpress/data';

import useEventEditorEventDates from '../use-event-editor-event-dates';

describe( 'useEventEditorEventDates', () => {
	let registry;
	beforeEach( () => {
		registry = createRegistry();
	} );

	const getTestComponent = () =>
		( ( WrappedComponent ) => ( props ) => (
			<RegistryProvider value={ registry }>
				<WrappedComponent { ...props } />
			</RegistryProvider>
		) )(
			() => {
				const { eventDates } = useEventEditorEventDates();
				return (
					<div>
						{ eventDates.map( ( date ) => date.id ).join() }
					</div>
				);
			}
		);

	it( 'returns empty array if there are no date entities in the state', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getEntitiesForModel: () => [],
			},
		} );
		const TestComponent = getTestComponent();
		const component = TestRenderer.create( <TestComponent /> );
		const dates = component.toJSON().children;
		expect( dates ).toEqual( [ '' ] );
	} );
	it( 'returns date entities available in the state', () => {
		registry.registerStore( 'eventespresso/core', {
			reducer: () => null,
			selectors: {
				getEntitiesForModel: () => [ AuthedDateTimeEntity ],
			},
		} );
		const TestComponent = getTestComponent();
		const component = TestRenderer.create( <TestComponent /> );
		const dates = component.toJSON().children;
		expect( dates ).toEqual( [ `${ AuthedDateTimeEntity.id }` ] );
	} );
} );

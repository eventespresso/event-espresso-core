import { shallow, render } from 'enzyme';
import { EventSelect } from '../index';

const simulatedEventOptions = [
	{ EVT_ID: 1, EVT_name: 'Event A' },
	{ EVT_ID: 2, EVT_name: 'Event B' },
];

describe( 'EventSelect with default options', () => {
	it( 'should render and match snapshot', () => {
		const selector = shallow( <EventSelect /> );
		expect( selector ).toMatchSnapshot();
	} );
} );

describe( 'EventSelect with no events and finished loading', () => {
	it( 'should render and match snapshot', () => {
		const selector = shallow( <EventSelect isLoading={ false } /> );
		expect( selector ).toMatchSnapshot();
	} );
} );

describe( 'EventSelect with 2 events', () => {
	const element = <EventSelect
		isLoading={ false }
		events={ simulatedEventOptions }
		onEventSelect={ jest.fn() }
	/>;
	it( 'should render and match snapshot', () => {
		const selector = shallow( element );
		expect( selector ).toMatchSnapshot();
	} );
	it( 'should render and have 2 options', () => {
		const selector = render( element );
		expect( selector.find( 'option' ) ).toHaveLength( 2 );
	} );

	it( 'should render and the first option has label and value matching the first siumlated event',
		() => {
			const selector = render( element );
			const firstOption = selector.find( 'option' ).first();
			expect( firstOption.text() )
				.toEqual( simulatedEventOptions[ 0 ].EVT_name );
			expect( firstOption.val() )
				.toEqual( simulatedEventOptions[ 0 ].EVT_ID.toString() );
		}
	);
} );

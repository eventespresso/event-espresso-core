import buildOptions, { OPTION_SELECT_ALL } from '../build-options';

describe( 'buildOptions()', () => {
	const testResponse = [
		{
			EVT_ID: 2,
			EVT_name: 'Test A',
			custom_prop: 'Custom Property A',
		},
		{
			EVT_ID: 3,
			EVT_name: 'Test B',
			custom_prop: 'Custom Property B',
		},
	];
	const customMap = {
		event: {
			label: 'custom_prop',
			value: 'EVT_name',
		},
	};
	it( 'returns an empty array for defaults', () => {
		expect( buildOptions() ).toEqual( [] );
	} );
	it( 'returns expected values for options when entities for existing model' +
		' in map provided using default map.', () => {
		expect( buildOptions( testResponse, 'event' ) ).toEqual(
			[
				{ label: 'Test A', value: 2 },
				{ label: 'Test B', value: 3 },
			]
		);
	} );
	it( 'returns expected values for options with a custom map.', () => {
		expect( buildOptions( testResponse, 'event', '', customMap ) ).toEqual(
			[
				{ label: 'Custom Property A', value: 'Test A' },
				{ label: 'Custom Property B', value: 'Test B' },
			]
		);
	} );
	it( 'returns expected values for options when an "all options" label' +
		' is included"', () => {
		expect( buildOptions( testResponse,
			'event',
			'All Options',
			customMap )
		).toEqual(
			[
				{ label: 'All Options', value: OPTION_SELECT_ALL },
				{ label: 'Custom Property A', value: 'Test A' },
				{ label: 'Custom Property B', value: 'Test B' },
			]
		);
	} );
} );

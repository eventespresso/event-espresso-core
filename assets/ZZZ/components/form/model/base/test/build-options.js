/**
 * Internal imports
 */
import buildOptions from '../build-options';
import { prettyDateFromDateTime } from '../../../../../data/model/datetime/formatter';

/**
 * External imports
 */
import {
	DATE_TIME_FORMAT_SITE,
	TIME_FORMAT_SITE,
} from '@eventespresso/helpers';
import { ServerDateTime as DateTime, Duration } from '@eventespresso/value-objects';
import { DateTimeFactory } from '@test/fixtures';

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
	const eventOptionsEntityMap = {
		default: {
			value: 'EVT_ID',
			label: 'EVT_name',
		},
		custom: {
			value: 'EVT_ID',
			label: 'custom_prop',
		},
	};
	const customMap = {
		default: {
			label: 'custom_prop',
			value: 'EVT_name',
		},
	};
	const datetimeOptionsEntityMap = {
		default: {
			value: 'DTT_ID',
			label: ( entity ) => {
				return prettyDateFromDateTime( entity );
			},
		},
	};
	it( 'returns an empty array when no entities are provided', () => {
		expect( buildOptions() ).toEqual( [] );
	} );
	it( 'displays a console error when an empty optionsEntityMap is provided', () => {
		buildOptions( testResponse );
		expect( console ).toHaveErroredWith(
			'Warning: A valid optionsEntityMap must be supplied in order to build options for a ModelSelect component'
		);
	} );
	it( 'displays a console error when an invalid mapSelection is provided', () => {
		buildOptions( testResponse, eventOptionsEntityMap, 'invalid' );
		expect( console ).toHaveErroredWith(
			'Warning: A valid optionsEntityMap[ mapSelection ] must be supplied in order to build options for a ModelSelect component'
		);
	} );
	it( 'returns expected values for options using default optionsEntityMap for EventSelect.', () => {
		expect( buildOptions( testResponse, eventOptionsEntityMap ) ).toEqual(
			[
				{ label: 'Test A', value: 2 },
				{ label: 'Test B', value: 3 },
			]
		);
	} );
	it( 'returns expected values for options with a custom mapSelection.', () => {
		expect( buildOptions( testResponse, customMap ) ).toEqual(
			[
				{ label: 'Custom Property A', value: 'Test A' },
				{ label: 'Custom Property B', value: 'Test B' },
			]
		);
	} );
	it( 'returns expected values for options with a custom optionsEntityMap.', () => {
		expect( buildOptions( testResponse, eventOptionsEntityMap, 'custom' ) ).toEqual(
			[
				{ label: 'Custom Property A', value: 2 },
				{ label: 'Custom Property B', value: 3 },
			]
		);
	} );
	it( 'returns expected values for options using default optionsEntityMap for DatetimeSelect', () => {
		const testDate = DateTime.fromISO( '2019-01-23T19:20:03.531Z' );
		const testEndDate = testDate.plus( Duration.fromObject(
			{ [ Duration.UNIT_HOURS ]: 1 } )
		);
		const testDateTime = DateTimeFactory.createNew(
			{
				DTT_name: 'DateTime 1',
				DTT_EVT_start: testDate,
				DTT_EVT_end: testEndDate,
			}
		);
		const response = [ testDateTime ];
		const expectedLabel = 'DateTime 1' + ' (' +
			testDate.toFormat( DATE_TIME_FORMAT_SITE ) +
			' - ' +
			testEndDate.toFormat( TIME_FORMAT_SITE ) +
			')';
		expect( buildOptions( response, datetimeOptionsEntityMap ) ).toEqual(
			[
				{
					value: testDateTime.DTT_ID,
					label: expectedLabel,
				},
			]
		);
	} );
} );

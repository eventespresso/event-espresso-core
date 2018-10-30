import buildOptions from '../build-options';
import moment from 'moment-timezone';
import {
	DATE_TIME_FORMAT_SITE,
	TIME_FORMAT_SITE,
} from '@eventespresso/helpers';
import { prettyDateFromDateTime } from '../../../../../data/model/datetime/formatter';

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
		const testLocalMoment = moment( '2018-12-24 05:00:00' ).local();
		const dateTimeResponse = [
			{
				DTT_ID: 30,
				DTT_name: 'DateTime 1',
				DTT_EVT_start: moment( testLocalMoment ).format(),
				DTT_EVT_end: moment( testLocalMoment ).add( 1, 'h' ).format(),
			},
		];
		const expectedLabel = 'DateTime 1' + ' (' +
			moment( testLocalMoment ).format( DATE_TIME_FORMAT_SITE ) +
			' - ' +
			moment( testLocalMoment ).add( 1, 'h' ).format( TIME_FORMAT_SITE ) +
			')';
		expect( buildOptions( dateTimeResponse, datetimeOptionsEntityMap ) ).toEqual(
			[
				{
					value: 30,
					label: expectedLabel,
				},
			]
		);
	} );
} );

// location: assets/src/components/form/select/test/build-options.js

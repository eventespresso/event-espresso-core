/**
 * Internal imports
 */
import formatters, { prettyDateFromDateTime } from '../formatter';

/**
 * External imports
 */
import moment from 'moment-timezone';
import {
	DATE_TIME_FORMAT_MYSQL,
	DATE_TIME_FORMAT_ISO8601,
	DATE_TIME_FORMAT_SITE,
	TIME_FORMAT_SITE,
} from '@eventespresso/helpers';
import {
	ServerDateTime as DateTime,
	Duration,
} from '@eventespresso/value-objects';
import { DateTimeFactory } from '@test/fixtures';

const {
	formatDatesOnEntities,
	formatEntitiesDatesToMysql,
	formatEntitiesDatesToSite,
	convertEntitiesDatesToMoment,
} = formatters;

const testMoment = moment()
	.year( 2017 )
	.month( 6 )
	.day( 25 )
	.hour( 10 )
	.minute( 24 )
	.second( 34 )
	.millisecond( 0 );
const testLocalMoment = moment( testMoment ).local();

const testEntities = [
	{
		DTT_name: 'Test Date A',
		DTT_EVT_start: moment( testMoment ).format(),
		DTT_EVT_end: moment( testMoment ).add( 1, 'd' ).format(),
	},
	{
		DTT_name: 'Test Date B',
		DTT_EVT_start: moment( testMoment ).add( 2, 'd' ).format(),
		DTT_EVT_end: moment( testMoment ).add( 3, 'd' ).format(),
	},
	{
		DTT_name: '',
		DTT_EVT_start: moment( testMoment ).format(),
		DTT_EVT_end: moment( testMoment ).add( 1, 'h' ).format(),
	},
	{
		DTT_name: 'Test Date D',
		DTT_EVT_start: moment( testMoment ).format(),
		DTT_EVT_end: moment( testMoment ).add( 1, 'd' ).format(),
	},
	{
		DTT_name: 'Test Date E',
		DTT_EVT_start: moment( testMoment ).format(),
		DTT_EVT_end: '',
	},
	{
		DTT_name: 'Test Date F',
		DTT_EVT_start: '',
		DTT_EVT_end: moment( testMoment ).format(),
	},
];

describe( 'formatDatesOnEntities', () => {
	it( 'returns empty array with default arguments', () => {
		expect( formatDatesOnEntities() ).toEqual( [] );
	} );
	it( 'returns expected entities with formatted date fields for defaults',
		() => {
			expect( formatDatesOnEntities( testEntities ) ).toEqual(
				[
					{
						DTT_name: 'Test Date A',
						DTT_EVT_start: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_ISO8601 ),
						DTT_EVT_end: moment( testLocalMoment )
							.add( 1, 'd' ).format( DATE_TIME_FORMAT_ISO8601 ),
					},
					{
						DTT_name: 'Test Date B',
						DTT_EVT_start: moment( testLocalMoment )
							.add( 2, 'd' ).format( DATE_TIME_FORMAT_ISO8601 ),
						DTT_EVT_end: moment( testLocalMoment )
							.add( 3, 'd' ).format( DATE_TIME_FORMAT_ISO8601 ),
					},
					{
						DTT_name: '',
						DTT_EVT_start: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_ISO8601 ),
						DTT_EVT_end: moment( testLocalMoment ).add( 1, 'h' )
							.format( DATE_TIME_FORMAT_ISO8601 ),
					},
					{
						DTT_name: 'Test Date D',
						DTT_EVT_start: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_ISO8601 ),
						DTT_EVT_end: moment( testLocalMoment ).add( 1, 'd' )
							.format( DATE_TIME_FORMAT_ISO8601 ),
					},
					{
						DTT_name: 'Test Date E',
						DTT_EVT_start: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_ISO8601 ),
						DTT_EVT_end: '',
					},
					{
						DTT_name: 'Test Date F',
						DTT_EVT_start: '',
						DTT_EVT_end: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_ISO8601 ),
					},
				],
			);
		},
	);
	it( 'returns expected entities with formatted date fields for local set' +
		' false', () => {
		expect( formatDatesOnEntities(
			testEntities,
			DATE_TIME_FORMAT_ISO8601,
			false,
		) ).toEqual(
			[
				{
					DTT_name: 'Test Date A',
					DTT_EVT_start: moment( testMoment )
						.format( DATE_TIME_FORMAT_ISO8601 ),
					DTT_EVT_end: moment( testMoment )
						.add( 1, 'd' ).format( DATE_TIME_FORMAT_ISO8601 ),
				},
				{
					DTT_name: 'Test Date B',
					DTT_EVT_start: moment( testMoment )
						.add( 2, 'd' ).format( DATE_TIME_FORMAT_ISO8601 ),
					DTT_EVT_end: moment( testMoment )
						.add( 3, 'd' ).format( DATE_TIME_FORMAT_ISO8601 ),
				},
				{
					DTT_name: '',
					DTT_EVT_start: moment( testMoment )
						.format( DATE_TIME_FORMAT_ISO8601 ),
					DTT_EVT_end: moment( testMoment ).add( 1, 'h' )
						.format( DATE_TIME_FORMAT_ISO8601 ),
				},
				{
					DTT_name: 'Test Date D',
					DTT_EVT_start: moment( testMoment )
						.format( DATE_TIME_FORMAT_ISO8601 ),
					DTT_EVT_end: moment( testMoment ).add( 1, 'd' )
						.format( DATE_TIME_FORMAT_ISO8601 ),
				},
				{
					DTT_name: 'Test Date E',
					DTT_EVT_start: moment( testMoment )
						.format( DATE_TIME_FORMAT_ISO8601 ),
					DTT_EVT_end: '',
				},
				{
					DTT_name: 'Test Date F',
					DTT_EVT_start: '',
					DTT_EVT_end: moment( testMoment )
						.format( DATE_TIME_FORMAT_ISO8601 ),
				},
			],
		);
	} );
} );

describe( 'formatEntitiesDatesToMysql()', () => {
	it( 'returns expected entity with formatted date fields for default',
		() => {
			expect( formatEntitiesDatesToMysql() ).toEqual( [] );
		},
	);
	it( 'returns expected entities with formatted date fields for defaults',
		() => {
			expect( formatEntitiesDatesToMysql( testEntities ) ).toEqual(
				[
					{
						DTT_name: 'Test Date A',
						DTT_EVT_start: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_MYSQL ),
						DTT_EVT_end: moment( testLocalMoment )
							.add( 1, 'd' ).format( DATE_TIME_FORMAT_MYSQL ),
					},
					{
						DTT_name: 'Test Date B',
						DTT_EVT_start: moment( testLocalMoment )
							.add( 2, 'd' ).format( DATE_TIME_FORMAT_MYSQL ),
						DTT_EVT_end: moment( testLocalMoment )
							.add( 3, 'd' ).format( DATE_TIME_FORMAT_MYSQL ),
					},
					{
						DTT_name: '',
						DTT_EVT_start: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_MYSQL ),
						DTT_EVT_end: moment( testLocalMoment ).add( 1, 'h' )
							.format( DATE_TIME_FORMAT_MYSQL ),
					},
					{
						DTT_name: 'Test Date D',
						DTT_EVT_start: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_MYSQL ),
						DTT_EVT_end: moment( testLocalMoment ).add( 1, 'd' )
							.format( DATE_TIME_FORMAT_MYSQL ),
					},
					{
						DTT_name: 'Test Date E',
						DTT_EVT_start: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_MYSQL ),
						DTT_EVT_end: '',
					},
					{
						DTT_name: 'Test Date F',
						DTT_EVT_start: '',
						DTT_EVT_end: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_MYSQL ),
					},
				],
			);
		},
	);
	it( 'returns expected entities with formatted date fields for local set' +
		' false', () => {
		expect( formatEntitiesDatesToMysql( testEntities, false ) ).toEqual(
			[
				{
					DTT_name: 'Test Date A',
					DTT_EVT_start: moment( testMoment )
						.format( DATE_TIME_FORMAT_MYSQL ),
					DTT_EVT_end: moment( testMoment )
						.add( 1, 'd' ).format( DATE_TIME_FORMAT_MYSQL ),
				},
				{
					DTT_name: 'Test Date B',
					DTT_EVT_start: moment( testMoment )
						.add( 2, 'd' ).format( DATE_TIME_FORMAT_MYSQL ),
					DTT_EVT_end: moment( testMoment )
						.add( 3, 'd' ).format( DATE_TIME_FORMAT_MYSQL ),
				},
				{
					DTT_name: '',
					DTT_EVT_start: moment( testMoment )
						.format( DATE_TIME_FORMAT_MYSQL ),
					DTT_EVT_end: moment( testMoment ).add( 1, 'h' )
						.format( DATE_TIME_FORMAT_MYSQL ),
				},
				{
					DTT_name: 'Test Date D',
					DTT_EVT_start: moment( testMoment )
						.format( DATE_TIME_FORMAT_MYSQL ),
					DTT_EVT_end: moment( testMoment ).add( 1, 'd' )
						.format( DATE_TIME_FORMAT_MYSQL ),
				},
				{
					DTT_name: 'Test Date E',
					DTT_EVT_start: moment( testMoment )
						.format( DATE_TIME_FORMAT_MYSQL ),
					DTT_EVT_end: '',
				},
				{
					DTT_name: 'Test Date F',
					DTT_EVT_start: '',
					DTT_EVT_end: moment( testMoment )
						.format( DATE_TIME_FORMAT_MYSQL ),
				},
			],
		);
	} );
} );

describe( 'formatEntitiesDatesToSite()', () => {
	it( 'returns expected entity with formatted date fields for default',
		() => {
			expect( formatEntitiesDatesToSite() ).toEqual( [] );
		},
	);
	it( 'returns expected entities with formatted date fields for defaults',
		() => {
			expect( formatEntitiesDatesToSite( testEntities ) ).toEqual(
				[
					{
						DTT_name: 'Test Date A',
						DTT_EVT_start: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_SITE ),
						DTT_EVT_end: moment( testLocalMoment )
							.add( 1, 'd' ).format( DATE_TIME_FORMAT_SITE ),
					},
					{
						DTT_name: 'Test Date B',
						DTT_EVT_start: moment( testLocalMoment )
							.add( 2, 'd' ).format( DATE_TIME_FORMAT_SITE ),
						DTT_EVT_end: moment( testLocalMoment )
							.add( 3, 'd' ).format( DATE_TIME_FORMAT_SITE ),
					},
					{
						DTT_name: '',
						DTT_EVT_start: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_SITE ),
						DTT_EVT_end: moment( testLocalMoment ).add( 1, 'h' )
							.format( DATE_TIME_FORMAT_SITE ),
					},
					{
						DTT_name: 'Test Date D',
						DTT_EVT_start: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_SITE ),
						DTT_EVT_end: moment( testLocalMoment ).add( 1, 'd' )
							.format( DATE_TIME_FORMAT_SITE ),
					},
					{
						DTT_name: 'Test Date E',
						DTT_EVT_start: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_SITE ),
						DTT_EVT_end: '',
					},
					{
						DTT_name: 'Test Date F',
						DTT_EVT_start: '',
						DTT_EVT_end: moment( testLocalMoment )
							.format( DATE_TIME_FORMAT_SITE ),
					},
				],
			);
		},
	);
	it( 'returns expected entities with formatted date fields for local set' +
		' false', () => {
		expect( formatEntitiesDatesToSite( testEntities, false ) ).toEqual(
			[
				{
					DTT_name: 'Test Date A',
					DTT_EVT_start: moment( testMoment )
						.format( DATE_TIME_FORMAT_SITE ),
					DTT_EVT_end: moment( testMoment )
						.add( 1, 'd' ).format( DATE_TIME_FORMAT_SITE ),
				},
				{
					DTT_name: 'Test Date B',
					DTT_EVT_start: moment( testMoment )
						.add( 2, 'd' ).format( DATE_TIME_FORMAT_SITE ),
					DTT_EVT_end: moment( testMoment )
						.add( 3, 'd' ).format( DATE_TIME_FORMAT_SITE ),
				},
				{
					DTT_name: '',
					DTT_EVT_start: moment( testMoment )
						.format( DATE_TIME_FORMAT_SITE ),
					DTT_EVT_end: moment( testMoment ).add( 1, 'h' )
						.format( DATE_TIME_FORMAT_SITE ),
				},
				{
					DTT_name: 'Test Date D',
					DTT_EVT_start: moment( testMoment )
						.format( DATE_TIME_FORMAT_SITE ),
					DTT_EVT_end: moment( testMoment ).add( 1, 'd' )
						.format( DATE_TIME_FORMAT_SITE ),
				},
				{
					DTT_name: 'Test Date E',
					DTT_EVT_start: moment( testMoment )
						.format( DATE_TIME_FORMAT_SITE ),
					DTT_EVT_end: '',
				},
				{
					DTT_name: 'Test Date F',
					DTT_EVT_start: '',
					DTT_EVT_end: moment( testMoment )
						.format( DATE_TIME_FORMAT_SITE ),
				},
			],
		);
	} );
} );

describe( 'convertEntitiesDatesToMoment()', () => {
	it( 'returns expected entity with formatted date fields for default',
		() => {
			expect( convertEntitiesDatesToMoment() ).toEqual( [] );
		},
	);
	it( 'returns expected entities with formatted date fields for defaults',
		() => {
			const actual = convertEntitiesDatesToMoment( testEntities );
			const valuesToTest = [
				actual[ 0 ].DTT_EVT_start,
				actual[ 0 ].DTT_EVT_end,
				actual[ 1 ].DTT_EVT_start,
				actual[ 1 ].DTT_EVT_end,
			];
			valuesToTest.forEach( ( actualValue ) => {
				expect( actualValue ).toBeInstanceOf( moment );
			} );
		},
	);
} );

describe( 'prettyDateFromDateTime', () => {
	const testDate = DateTime.fromISO( '2019-01-23T19:20:03.531Z' );
	const getDateTimeEntity = (
		name,
		start,
		end
	) => name ? DateTimeFactory.createNew(
		{
			DTT_name: name,
			DTT_EVT_start: start,
			DTT_EVT_end: end,
		}
	) :
		DateTimeFactory.createNew( { DTT_EVT_start: start, DTT_EVT_end: end } );
	it( 'returns expected value for no arguments passed in', () => {
		expect( prettyDateFromDateTime() ).toEqual( '' );
	} );
	it( 'returns expected value when DTT_name is present and start date and' +
		' end date are on different days',
	() => {
		const endDate = testDate.plus(
			Duration.fromObject( { [ Duration.UNIT_DAYS ]: 2 } )
		);
		expect( prettyDateFromDateTime(
			getDateTimeEntity(
				'Test Date D',
				testDate,
				endDate,
			)
		) ).toEqual(
			'Test Date D' + ' (' + testDate.toFormat( DATE_TIME_FORMAT_SITE ) +
			' - ' + endDate.toFormat( DATE_TIME_FORMAT_SITE ) + ')',
		);
	},
	);
	it( 'returns expected value when DTT_name is not present and start date' +
		' and end date are on the same day',
	() => {
		const endDate = testDate.plus(
			Duration.fromObject( { [ Duration.UNIT_HOURS ]: 1 } )
		);
		expect( prettyDateFromDateTime( getDateTimeEntity(
			'',
			testDate,
			endDate,
		) ) ).toEqual(
			testDate.toFormat( DATE_TIME_FORMAT_SITE ) +
			' - ' + endDate.toFormat( TIME_FORMAT_SITE ),
		);
	} );
} );


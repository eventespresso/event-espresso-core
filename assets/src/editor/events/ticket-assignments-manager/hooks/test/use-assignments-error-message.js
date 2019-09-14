/**
 * External imports
 */
import TestRenderer from 'react-test-renderer';

/**
 * Internal imports
 */
import {
	assignmentsErrorMessages,
	default as useAssignmentsErrorMessage,
} from '../use-assignments-error-message';

/**
 * @param {Object} json
 * @return {Object} object with keys for values and values for keys
 */
const reverse = ( json ) => {
	const flipped = {};
	for ( const key in json ) {
		flipped[ json[ key ] ] = key;
	}
	return flipped;
};

/**
 * flips the imported assignmentsErrorMessages object so that we are testing
 * the keys instead of the messages because that makes troubleshooting easier
 */
const errors = reverse( assignmentsErrorMessages );

/**
 * @param {Object} counts data passed to useAssignmentsErrorMessage
 * @return {Element} rendered div with error message as content
 */
const TestComponent = ( { counts } ) => {
	const noAssignmentsMessage = useAssignmentsErrorMessage( counts );
	return <div>{ noAssignmentsMessage }</div>;
};

/**
 * @param {Object} testData array of test cases
 */
const dataTester = ( testData ) => {
	let x = 0;
	testData.forEach( ( test ) => {
		x++;
		it( 'test ' + x + ') ' + test.description, () => {
			const component = TestRenderer.create(
				<TestComponent counts={ test.counts } />
			);
			const error = component.toJSON().children[ 0 ];
			expect( errors[ error ] ).toEqual( test.result );
		} );
	} );
};

/**
 * to only run the tests in this file, use:
 * npm run test-unit use-assignments-error-message.js
 */
describe( 'useAssignmentsErrorMessage', () => {
	dataTester( [
		{
			description: 'returns empty string when multiple dates ' +
				'and tickets all have an assignment',
			counts: {
				dateCount: 10,
				ticketCount: 10,
				missingAssignmentCounts: { dates: 0, tickets: 0 },
			},
			result: undefined,
		},
		{
			description: 'returns empty string when one date ' +
				'and multiple tickets all have an assignment',
			counts: {
				dateCount: 1,
				ticketCount: 10,
				missingAssignmentCounts: { dates: 0, tickets: 0 },
			},
			result: undefined,
		},
		{
			description: 'returns empty string when multiple dates ' +
				'and one ticket all have an assignment',
			counts: {
				dateCount: 10,
				ticketCount: 1,
				missingAssignmentCounts: { dates: 0, tickets: 0 },
			},
			result: undefined,
		},
		{
			description: 'returns empty string when no dates ' +
				'or tickets are supplied',
			counts: {
				dateCount: 0,
				ticketCount: 0,
				missingAssignmentCounts: { dates: 0, tickets: 0 },
			},
			result: undefined,
		},
		{
			description: 'returns "singleDate" error when there is only' +
				' one date and it has missing an assignment',
			counts: {
				dateCount: 1,
				ticketCount: 10,
				missingAssignmentCounts: { dates: 1, tickets: 0 },
			},
			result: 'singleDate',
		},
		{
			description: 'returns "singleDate" error when there is only' +
				' one ticket but one of it\'s dates is missing an assignment',
			counts: {
				dateCount: 10,
				ticketCount: 1,
				missingAssignmentCounts: { dates: 1, tickets: 0 },
			},
			result: 'singleDate',
		},
		{
			description: 'returns "singleTicket" error when there is only' +
				' one date but one of it\'s tickets is missing an assignment',
			counts: {
				dateCount: 1,
				ticketCount: 10,
				missingAssignmentCounts: { dates: 0, tickets: 1 },
			},
			result: 'singleTicket',
		},
		{
			description: 'returns "singleTicket" error when there is only' +
				' one ticket and it has zero assignments',
			counts: {
				dateCount: 10,
				ticketCount: 1,
				missingAssignmentCounts: { dates: 1, tickets: 1 },
			},
			result: 'singleTicket',
		},
		{
			description: 'returns "singleTicket" error when there is only' +
				' one date and it is missing multiple assignments',
			counts: {
				dateCount: 1,
				ticketCount: 10,
				missingAssignmentCounts: { dates: 1, tickets: 1 },
			},
			result: 'singleTicket',
		},
		{
			description: 'returns "multiTickets" error when there are' +
				' multiple dates and tickets and multiple missing assignments',
			counts: {
				dateCount: 10,
				ticketCount: 10,
				missingAssignmentCounts: { dates: 1, tickets: 1 },
			},
			result: 'multiTickets',
		},
		{
			description: 'returns "multiTickets" error when there are' +
				' multiple dates and tickets but missing ticket assignments',
			counts: {
				dateCount: 10,
				ticketCount: 10,
				missingAssignmentCounts: { dates: 0, tickets: 1 },
			},
			result: 'multiTickets',
		},
		{
			description: 'returns "multiDates" error when there are' +
				' multiple dates and tickets but missing date assignments',
			counts: {
				dateCount: 10,
				ticketCount: 10,
				missingAssignmentCounts: { dates: 1, tickets: 0 },
			},
			result: 'multiDates',
		},
	] );
} );

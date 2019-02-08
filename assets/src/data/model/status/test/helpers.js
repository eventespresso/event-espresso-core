import { prettyStatus, prettyStatuses } from '../helpers';
import Label from '../../../../vo/label';
import * as status from '../constants';

describe( 'prettyStatus()', () => {
	it( 'returns the expected value for the given code and format', () => {
		const testCases = [
			{
				args: [
					status.REGISTRATION_STATUS_ID.PENDING_PAYMENT,
					false,
					Label.FORMAT_SENTENCE_CASE,
				],
				expected: 'Pending Payments',
			},
			{
				args: [
					status.TRANSACTION_STATUS_ID.COMPLETE,
					true,
					Label.FORMAT_UPPERCASE,
				],
				expected: 'COMPLETE',
			},
			{
				args: [
					status.PAYMENT_STATUS_ID.DECLINED,
					true,
					Label.FORMAT_LOWERCASE,
				],
				expected: 'declined',
			},
		];
		testCases.forEach( ( testCase ) => {
			expect( prettyStatus( ...testCase.args ) )
				.toBe( testCase.expected );
		} );
	} );
	it( 'returns an "unknown" label for a invalid status', () => {
		expect( prettyStatus( 'not valid' ) ).toBe( 'Unknown' );
	} );
} );

describe( 'prettyStatuses()', () => {
	it( 'throws a TypeError when provided first argument is not' +
		' an array.', () => {
		expect( () => prettyStatuses( 'someStatus' ) ).toThrow( TypeError );
	} );
	it( 'returns the expected values for the given codes.', () => {
		expect( prettyStatuses(
			[
				status.REGISTRATION_STATUS_ID.PENDING_PAYMENT,
				status.TRANSACTION_STATUS_ID.OVERPAID,
				status.PAYMENT_STATUS_ID.CANCELLED,
			]
		) ).toEqual(
			{
				[ status.REGISTRATION_STATUS_ID.PENDING_PAYMENT ]: 'Pending Payment',
				[ status.TRANSACTION_STATUS_ID.OVERPAID ]: 'Overpaid',
				[ status.PAYMENT_STATUS_ID.CANCELLED ]: 'Cancelled',
			}
		);
	} );
} );

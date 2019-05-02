/**
 * External imports
 */
import { shallow } from 'enzyme';
import { CheckinFactory, AuthedCheckinResponse } from '@test/fixtures';
import { checkInModel } from '@eventespresso/model';

/**
 * Internal imports
 */
import CheckInButton from '../button';

const {
	STATUS_CHECKED_NEVER: neverChecked,
	STATUS_CHECKED_IN: checkIn,
	STATUS_CHECKED_OUT: checkOut,
} = checkInModel.CHECKIN_STATUS_ID;

describe( 'CheckInButton', () => {
	const getCheckin = ( status ) => {
		if ( status === neverChecked ) {
			return null;
		}
		const entity = CheckinFactory.fromExisting( AuthedCheckinResponse );
		entity.in = status;
		return entity;
	};
	const rendered = ( props ) => shallow( <CheckInButton { ...props } /> );
	it( 'renders as expected for default props', () => {
		const wrapper = rendered();
		expect( wrapper ).toMatchSnapshot();
	} );
	describe( 'renders expected classname for various checkin actions', () => {
		const description = 'should return the css class "$expectedClass" and the ' +
			'"$expectedText" for the given status of "$status" and with the ' +
			'force argument value of "$force"';
		it.each`
			status | expectedClass | expectedText | force
			${ neverChecked } | ${ 'ee-green' } | ${ 'Check In' } | ${ false }
			${ neverChecked } | ${ 'ee-yellow' } | ${ 'Check In Anyways' } | ${ true }
			${ checkIn } | ${ 'ee-red' } | ${ 'Check Out' } | ${ false }
			${ checkOut } | ${ 'ee-green' } | ${ 'Check In' } | ${ false }
		`( description,
	( { status, expectedClass, expectedText, force } ) => {
		const wrapper = rendered( {
			checkinEntity: getCheckin( status ),
			force,
		} );
		const button = wrapper.find( '.ee-button' );
		expect( button.hasClass( 'ee-roundish', expectedClass ) ).toBe( true );
		expect( button.text() )
			.toEqual( expect.stringContaining( expectedText ) );
	} );
	} );
} );

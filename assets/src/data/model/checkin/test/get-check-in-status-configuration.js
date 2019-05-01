/**
 * External imports
 */
import { CheckinFactory, AuthedCheckinResponse } from '@test/fixtures';

/**
 * Internal imports
 */
import {
	getCheckInStatusText,
	getCheckInActionText,
	getCheckInActionClassName,
	getCheckInStatusClassName,
	getCheckInStatusIcon,
} from '../get-check-in-status-configuration';
import { CHECKIN_STATUS_ID } from '../index';

const {
	STATUS_CHECKED_NEVER: neverChecked,
	STATUS_CHECKED_IN: checkIn,
	STATUS_CHECKED_OUT: checkOut,
} = CHECKIN_STATUS_ID;

describe( 'checkin status helpers', () => {
	const getCheckin = ( status ) => {
		const chkEntity = CheckinFactory.fromExisting( AuthedCheckinResponse );
		chkEntity.in = status;
		return chkEntity;
	};
	describe( 'getCheckinStatusText', () => {
		it.each`
			status            | force       | expected
			${ neverChecked } | ${ false }  | ${ 'Has not been checked in yet' }
			${ neverChecked } | ${ true }   | ${ 'Has access to datetime, but not approved' }
			${ checkIn }      | ${ false }  | ${ 'Last checked in on' }
			${ checkOut }     | ${ false }  | ${ 'Last checked out on' }
			${ checkOut }     | ${ true }   | ${ 'Has access to datetime, but not approved.' }
		`(
	'should return "$expected" for $status status and when force is $force',
	( { status, force, expected } ) => {
		const chkEntity = status !== neverChecked ?
			getCheckin( status ) :
			null;
		expect( getCheckInStatusText( chkEntity, force ) )
			.toEqual( expect.stringContaining( expected ) );
	} );
	} );
	describe( 'getCheckInActionText', () => {
		it.each`
			status            | force       | expected
			${ neverChecked } | ${ false }  | ${ 'Check In' }
			${ neverChecked } | ${ true }   | ${ 'Check In Anyways' }
			${ checkIn }      | ${ false }  | ${ 'Check Out' }
			${ checkOut }     | ${ false }  | ${ 'Check In' }
			${ checkOut }     | ${ true }   | ${ 'Check In Anyways' }
		`(
	'should return "$expected" for $status status and when force is $force',
	( { status, force, expected } ) => {
		const chkEntity = status !== neverChecked ?
			getCheckin( status ) :
			null;
		expect( getCheckInActionText( chkEntity, force ) )
			.toEqual( expect.stringContaining( expected ) );
	} );
	} );
	describe( 'getCheckInActionClassName', () => {
		it.each`
			status            | force       | expected
			${ neverChecked } | ${ false }  | ${ 'ee-green' }
			${ neverChecked } | ${ true }   | ${ 'ee-yellow' }
			${ checkIn }      | ${ false }  | ${ 'ee-red' }
			${ checkOut }     | ${ false }  | ${ 'ee-green' }
			${ checkOut }     | ${ true }   | ${ 'ee-yellow' }
		`(
	'should return "$expected" for $status status and when force is $force',
	( { status, force, expected } ) => {
		const chkEntity = status !== neverChecked ?
			getCheckin( status ) :
			null;
		expect( getCheckInActionClassName( chkEntity, force ) )
			.toEqual( expect.stringContaining( expected ) );
	} );
	} );
	describe( 'getCheckInStatusIcon', () => {
		it.each`
			status            | force       | expected
			${ neverChecked } | ${ false }  | ${ 'no-alt' }
			${ neverChecked } | ${ true }   | ${ 'no-alt' }
			${ checkIn }      | ${ false }  | ${ 'yes' }
			${ checkOut }     | ${ false }  | ${ 'no-alt' }
			${ checkOut }     | ${ true }   | ${ 'no-alt' }
		`(
	'should return "$expected" for $status status and when force is $force',
	( { status, force, expected } ) => {
		const chkEntity = status !== neverChecked ?
			getCheckin( status ) :
			null;
		expect( getCheckInStatusIcon( chkEntity, force ) )
			.toEqual( expect.stringContaining( expected ) );
	} );
	} );
	describe( 'getCheckInStatusClassName', () => {
		it.each`
			status            | force       | expected
			${ neverChecked } | ${ false }  | ${ 'ee-red' }
			${ neverChecked } | ${ true }   | ${ 'ee-red' }
			${ checkIn }      | ${ false }  | ${ 'ee-green' }
			${ checkOut }     | ${ false }  | ${ 'ee-red' }
			${ checkOut }     | ${ true }   | ${ 'ee-red' }
		`(
	'should return "$expected" for $status status and when force is $force',
	( { status, force, expected } ) => {
		const chkEntity = status !== neverChecked ?
			getCheckin( status ) :
			null;
		expect( getCheckInStatusClassName( chkEntity, force ) )
			.toEqual( expect.stringContaining( expected ) );
	} );
	} );
} );

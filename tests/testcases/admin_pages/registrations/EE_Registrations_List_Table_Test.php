<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Registrations_List_Table_Test
 *
 * @package		Event Espresso
 * @subpackage	tests
 * @author		Darren Ethier
 *
 */
class EE_Registrations_List_Table_Test extends EE_UnitTestCase {


	/**
	 * Holds the mock class for the EE_Registrations_List_Table class.
	 *
	 * @var EE_Registrations_List_Table_Mock
	 */
	protected $_mock;


	public function setUp() {
		parent::setUp();
		$this->loadAdminMocks();
	}




	public function _load_mock() {
		$this->_mock = new EE_Registrations_List_Table_Mock('');
	}





	/**
	 * @since 4.6.0
	 */
	public function test_total_registrations_this_month() {
		$this->_load_mock();
		//baseline dates
		$now = new DateTime( 'now' );
		$nowEST = new DateTime( 'now', new DateTimeZone( 'America/Toronto' ) );

		//let's setup some registrations to test.
		$registrations = $this->factory->registration->create_many( 4 );

		$this->assertEquals( 4, count( $registrations ) );

		//let's modify the first registration so it happened last month.
		$first_registration = reset( $registrations );
		$first_registration->set( 'REG_date', $now->sub( new DateInterval('P1M') )->format('U') );
		$first_registration->save();

		//modify the last registration so it happens next month.
		$last_registration = end( $registrations );
		$last_registration->set( 'REG_date', $now->add( new DateInterval('P2M') )-> format( 'U' ) );
		$last_registration->save();

		//now let's test the method.
		$this->assertEquals(2, $this->_mock->total_registrations_this_month() );


	}

} //end class EE_Registrations_List_Table_Test

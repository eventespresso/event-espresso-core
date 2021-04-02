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
        $this->loadFactories();
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

		//let's setup some registrations to test.  Setting status as not approved to avoid the incomplete exclusion on the method tested.
		$registrations = $this->factory->registration->create_many( 4, array( 'STS_ID' => EEM_Registration::status_id_not_approved ) );

		$this->assertEquals( 4, count( $registrations ) );

		//let's modify the first registration so it happened two months ago.  Note, the reason why I am doing this
		//instead of one month is because if today's date is March 31st, March 30th, or March 29th.  There is
		//wierd PHP behaviour where subtracting one month will result in a date remaining in March.
		//@see http://php.net/manual/en/datetime.sub.php#example-2469
		$first_registration = reset( $registrations );
		$first_registration->set( 'REG_date', $now->sub( new DateInterval('P2M') )->format('U') );
		$first_registration->save();

		//modify the last registration so it happens next month.
		$last_registration = end( $registrations );
		$last_registration->set( 'REG_date', $now->add( new DateInterval('P3M') )-> format( 'U' ) );

		$last_registration->save();

		//now let's test the method.
		$this->assertEquals(2, $this->_mock->total_registrations_this_month() );


	}



	/**
	 * @since 4.6.x
	 */
	public function test_total_registrations_today() {
		$this->_load_mock();
		//baseline dates
		$now = new DateTime( 'now' );
		$nowEST = new DateTime( 'now', new DateTimeZone( 'America/Toronto' ) );

		//let's setup some registrations to test. Setting status as not approved to avoid the incomplete exclusion on the method tested.
		$registrations = $this->factory->registration->create_many( 4, array( 'STS_ID' => EEM_Registration::status_id_not_approved ) );

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
		$this->assertEquals(2, $this->_mock->total_registrations_today() );
	}

} //end class EE_Registrations_List_Table_Test

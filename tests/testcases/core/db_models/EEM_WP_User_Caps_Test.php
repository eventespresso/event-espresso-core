<?php

if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEM_WP_User_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group models
 * @group core/db_models
 * @group capabilities
 * @group EEM_WP_User_Caps_Test
 *
 */
class EEM_WP_User_Caps_Test extends EE_UnitTestCase{

	/**
	 *
	 * @var EE_WP_User
	 */
	public $me;
	/**
	 *
	 * @var EE_WP_User
	 */
	public $somebody_else;

	public function set_up(){
		parent::set_up();
		//clean out hte WP User table for these tests
		EEM_WP_User::instance()->delete( array(), false );
		$this->me = $this->factory->user->create_and_get();
		$this->somebody_else = $this->factory->user->create_and_get();
	}

	function test_get_all__caps__not_logged_in() {
		$this->assertEquals( 0, EEM_WP_User::instance()->count( array( 'caps' => EEM_Base::caps_read ) ) );
	}

	function test_get_all__caps__logged_in(){
		global $current_user;
		$current_user = $this->me;
		$results = EEM_WP_User::instance()->get_all( array( 'caps' => EEM_Base::caps_read ) );
		$this->assertEEModelObjectsEquals(  EEM_WP_User::instance()->get_one_by_ID( $this->me->ID ), reset( $results ) );
		$this->assertEquals( 1, count( $results ) );
	}

	function test_get_all__caps__list_users(){
		global $current_user;
		$current_user = $this->me;
		$current_user->add_cap( 'list_users' );
		$results = EEM_WP_User::instance()->get_all( array( 'caps' => EEM_Base::caps_read ) );
		$this->assertEEModelObjectsEquals( EEM_WP_User::instance()->get_one_by_ID( $this->me->ID ), reset( $results ) );
		$this->assertEEModelObjectsEquals( EEM_WP_User::instance()->get_one_by_ID( $this->somebody_else->ID ), next( $results ) );
		$this->assertEquals( 2, count( $results ) );
	}
}

// End of file EEM_WP_User_Test.php
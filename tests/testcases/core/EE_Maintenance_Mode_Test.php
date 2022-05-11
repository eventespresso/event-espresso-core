<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Maintenance_Mode_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group activation
 */
class EE_Maintenance_Mode_Test extends EE_UnitTestCase{

	public function test_set_mm_if_db_old__no_need(){
		//we should start off out of maintenance mode
		$this->assertEquals( EE_Maintenance_Mode::level_0_not_in_maintenance,  EE_Maintenance_Mode::instance()->level() );

		//the DB is up-to-date, so we shouldn't be put into mm
		EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
		$this->assertEquals( EE_Maintenance_Mode::level_0_not_in_maintenance,  EE_Maintenance_Mode::instance()->level() );
	}

	public function test_set_mm_if_bd_old__remove_mm(){
		//now pretend the DB got borked somehow and we're in mm2 when we shouldn't be. this should fix it
		EE_Maintenance_Mode::instance()->set_maintenance_level( EE_Maintenance_Mode::level_2_complete_maintenance );
		$this->assertEquals( EE_Maintenance_Mode::level_2_complete_maintenance,  EE_Maintenance_Mode::instance()->level() );
		EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
		$this->assertEquals( EE_Maintenance_Mode::level_0_not_in_maintenance,  EE_Maintenance_Mode::instance()->level() );
	}
	public function test_set_mm_if_db_old__success(){
		$this->assertEquals( EE_Maintenance_Mode::level_0_not_in_maintenance,  EE_Maintenance_Mode::instance()->level() );
		//we pretend teh DB state is out-of-date, so we should be put into mm
		$this->_pretend_current_db_state_is_at('3.1.37.7');
		EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
		$this->assertEquals( EE_Maintenance_Mode::level_2_complete_maintenance, EE_Maintenance_Mode::instance()->level() );
	}
	public function test_set_mm_if_db_old__in_mm1(){
		//put the site into mm1 and verify it doesn't get swapped to mm0 when we call set_mm_if_db_old
		$this->assertEquals( EE_Maintenance_Mode::level_0_not_in_maintenance,  EE_Maintenance_Mode::instance()->real_level() );
		EE_Maintenance_Mode::instance()->set_maintenance_level( EE_Maintenance_Mode::level_1_frontend_only_maintenance );
		$this->assertEquals( EE_Maintenance_Mode::level_1_frontend_only_maintenance,  EE_Maintenance_Mode::instance()->real_level() );
		EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
		$this->assertEquals( EE_Maintenance_Mode::level_1_frontend_only_maintenance,  EE_Maintenance_Mode::instance()->real_level() );
	}

	public function test_set_maintenance_level(){
		$this->assertEquals( EE_Maintenance_Mode::level_0_not_in_maintenance,  EE_Maintenance_Mode::instance()->real_level() );
		EE_Maintenance_Mode::instance()->set_maintenance_level( EE_Maintenance_Mode::level_1_frontend_only_maintenance );
		$this->assertEquals( EE_Maintenance_Mode::level_1_frontend_only_maintenance,  EE_Maintenance_Mode::instance()->real_level() );
		EE_Maintenance_Mode::instance()->set_maintenance_level( EE_Maintenance_Mode::level_2_complete_maintenance );
		$this->assertEquals( EE_Maintenance_Mode::level_2_complete_maintenance,  EE_Maintenance_Mode::instance()->real_level() );
	}
	/**
	 * tests that EE_Maintenance_Mode::level() correctly pretend a site is
	 * NOT in maintenance mode for admin users only on frontend and ajax requests
	 * @global type $current_user
	 */
	public function test_maintenance_level(){
		global $current_user;
		$this->assertFalse( is_admin() );
		$this->assertFalse( current_user_can( 'administrator' ) );
		EE_Maintenance_Mode::instance()->set_maintenance_level( EE_Maintenance_Mode::level_1_frontend_only_maintenance );
		$this->assertEquals( EE_Maintenance_Mode::level_1_frontend_only_maintenance, EE_Maintenance_Mode::instance()->level() );
		//now make the current user an admin, and maintenance mode shoudl be detected as 0

		$current_user = $this->factory->user->create_and_get( array( 'role' => 'administrator' ) );
		$this->assertEquals( EE_Maintenance_Mode::level_0_not_in_maintenance, EE_Maintenance_Mode::instance()->level() );

	}
	public function test_zz(){
		$this->assertFalse( current_user_can( 'administrator' ) );
	}
	/**
	 * @see EE_Migration_Manager_Test::_pretend_current_db_state_is_at which this was
	 * copied from. If it's used again, we should put this function into EE_UnitTestCase
	 * @param type $core_version
	 */
	private function _pretend_current_db_state_is_at($core_version = NULL){
		if( $core_version ){
			$current_db_state = array('Core'=>$core_version);
			update_option(EE_Data_Migration_Manager::current_database_state,$current_db_state);
		}else{
			delete_option(EE_Data_Migration_Manager::current_database_state);
		}
	}

	/**
	 * the DMS manager maintains a bit of state in order to be more efficient, which we want to lose between tests
	 */
	public function set_up(){
        parent::set_up();
	    EE_Data_Migration_Manager::reset();
	}
}

// End of file EE_Maintenance_Mode_Test.php
<?php
/**
 * Contains test class for /core/helpers/EEH_Activation.helper.php
 *
 * @since  		4.5.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EEH_Activation class.
 *
 * @since 		4.5.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EEH_Activation_Test extends EE_UnitTestCase {



	/**
	 * The purpose of this test is to ensure that generation of default templates works as expected.
	 *
	 * @since 4.5.0
	 */
	public function test_generate_default_message_templates() {
		/**
		 * Testing default messengers setup on activation (or introduction on migration)
		 */
		//first let's make sure all message templates got setup on new install as they should be.
		EE_Registry::instance()->load_helper( 'MSG_Template' );
		EE_Registry::instance()->load_helper( 'Activation' );
		$installed_messengers = EEH_MSG_Template::get_installed_message_objects();
		$should_be_installed = array();
		foreach( $installed_messengers['messengers'] as $msgr ) {
			$this->assertInstanceOf( 'EE_messenger', $msgr );
			if ( $msgr->activate_on_install ) {
				$should_be_installed[] = $msgr->name;
			}
		}

		$active_messengers = EEH_MSG_Template::get_active_messengers_in_db();
		//loop through $should_be_installed and verify that those that should be active ARE active.
		foreach ( $should_be_installed as $msgr_name ) {
			$this->assertTrue( isset( $active_messengers[$msgr_name] ), sprintf( 'The messenger %s should be active on fresh install, but it is not.', $msgr_name ) );
		}

		//now verify that the code doesn't run new message template generation etc.
		$this->assertFalse( EEH_Activation::generate_default_message_templates() );


		//now we simulate someone who's deactivated a messenger and we simulate a migration that triggers generating default message templates again.  The html messenger should STICK and NOT be activated.
		unset( $active_messengers['html'] );
		EEH_MSG_Template::update_active_messengers_in_db( $active_messengers );

		$activated_response = EEH_Activation::generate_default_message_templates();

		//verify we got a response (html should generate templates)
		$this->assertFalse( $activated_response );

		//doublecheck we still don't html in the active messengers array
		$active_messengers = EEH_MSG_Template::get_active_messengers_in_db();
		$this->assertFalse( isset( $active_messengers['html'] ) );
	}




	/**
	 * Ensure getting default creator works as expected
	 * @since 4.6.0
	 */
	public function test_get_default_creator_id() {
		//clear out any previous users that may be lurking in teh system
		foreach( get_users() as $wp_user ){
			wp_delete_user( $wp_user->ID );
		}
		//set some users; and just make it interesting by having the first user NOT be an admin
		$non_admin_users = $this->factory->user->create_many( 2 );
		$users = $this->factory->user->create_many( 2 );
		//make users administrators.
		foreach ( $users as $user_id ) {
			$user = $this->factory->user->get_object_by_id( $user_id );
			//verify
			$this->assertInstanceOf( 'WP_User', $user );
			//add role
			$user->add_role( 'administrator' );
		}

		//get all users so we know who is the first one that we should be expecting.
		$expected_id = reset( $users );
		$this->assertEquals( EEH_Activation::get_default_creator_id(), $expected_id );

		/**
		 * ok now let's verify EEH_Activation::reset() properly clears the cache
		 * on EEH_Activation. This is important for subsequent unit tests (because
		 * EEH_Activation::reset() is called beween unit tests), but also when an admin
		 * resets their EE database, or when anyone wants to reset that cache)
		 * clear out any previous users that may be lurking in teh system
		 */
		EEH_Activation::reset();
		foreach( get_users() as $wp_user ){
			wp_delete_user( $wp_user->ID );
		}
		//set some users; and just make it interesting by having the first user NOT be an admin
		$this->factory->user->create_many( 2 );
		$users_created_after_reset = $this->factory->user->create_many( 2 );
		//make users administrators.
		foreach ( $users_created_after_reset as $user_id ) {
			$user = $this->factory->user->get_object_by_id( $user_id );
			//verify
			$this->assertInstanceOf( 'WP_User', $user );
			//add role
			$user->add_role( 'administrator' );
		}

		//get all users so we know who is the first one that we should be expecting.
		$new_expected_id = reset( $users_created_after_reset );
		$this->assertEquals( EEH_Activation::get_default_creator_id(), $new_expected_id );

	}
} //end class EEH_Activation_Test

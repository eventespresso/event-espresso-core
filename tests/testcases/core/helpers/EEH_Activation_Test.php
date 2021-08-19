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
	const current_cron_task_name = 'current_one';
	const expired_cron_task_name = 'expired_one';


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
		/** @type EE_Message_Resource_Manager $message_resource_manager */
		$message_resource_manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		// messengers that have been activated and verified installed
		$active_messengers = $message_resource_manager->active_messengers();
		// ALL installed messengers regardless of whether they are active or not
		$installed_messengers = $message_resource_manager->installed_messengers();
		$should_be_installed = array();
		foreach( $active_messengers as $msgr ) {
			$this->assertInstanceOf( 'EE_messenger', $msgr );
			if ( $msgr->activate_on_install ) {
				$should_be_installed[] = $msgr->name;
			}
		}
		//loop through $should_be_installed and verify that those that should be active ARE active.
		foreach ( $should_be_installed as $msgr_name ) {
			$this->assertTrue(
				isset( $installed_messengers[ $msgr_name ] ),
				sprintf( 'The messenger %s should be active on fresh install, but it is not.', $msgr_name )
			);
		}

		//now verify that the code doesn't run new message template generation etc.
		$this->assertFalse( EEH_Activation::generate_default_message_templates() );


		// now we simulate someone who's deactivated a messenger
		// and we simulate a migration that triggers generating default message templates again.
		//  The html messenger should STICK and NOT be activated.
		$message_resource_manager->deactivate_messenger( 'html' );

		//do the same for message type
		$message_resource_manager->deactivate_message_type_for_messenger( 'not_approved', 'email' );

		//Reset messages to test stickiness
		EE_Registry::reset();

		$activated_response = EEH_Activation::generate_default_message_templates();

		//verify we got a response (html should not have templates generated)
		$this->assertFalse( $activated_response );

		// double check we still don't have html in the active messengers array
		$active_messengers = $message_resource_manager->get_active_messengers_option( true );
		$this->assertFalse( isset( $active_messengers['html'] ) );
		$this->assertFalse( $message_resource_manager->is_message_type_active_for_messenger( 'email', 'not_approved' ) );
	}





	/**
	 * This tests the generate_default_message_templates method with using the
	 * FHEE__EE_messenger__get_default_message_types__default_types filter to add a
	 * bogus message_type string.  No errors should be triggered, and the invalid default mt
	 * should NOT be added to the active array for the messenger.
	 *
	 * @since 4.6
	 * @group 7595
	 */
	public function test_filtered_default_message_types_on_activation() {
		/** @type EE_Message_Resource_Manager $message_resource_manager */
		$message_resource_manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		//let's clear out all active messengers to get an accurate test of initial generation of message templates.
		global $wpdb;
		// delete message_template_group templates
		$message_template_group_table = $wpdb->prefix . 'esp_message_template_group';
		$query = "DELETE FROM $message_template_group_table WHERE 'GRP_ID' > 0";
		$wpdb->query( $query );
		// delete message_template templates
		$message_template_table = $wpdb->prefix . 'esp_message_template';
		$query = "DELETE FROM $message_template_table WHERE 'MTP_ID' > 0";
		$wpdb->query($query);
		// delete event_message_template templates
		$event_message_template_table = $wpdb->prefix . 'esp_event_message_template';
		$query = "DELETE FROM $event_message_template_table WHERE 'EMT_ID' > 0";
		$wpdb->query( $query );

		$message_resource_manager->update_active_messengers_option( array() );
		//set a filter for the invalid message type
		add_filter(
			'FHEE__EE_messenger__get_default_message_types__default_types',
			function( $default_types ) {
				$default_types[] = 'bogus_message_type';
				return $default_types;
			}, 10, 2
		);

		try {
			//activate messages... if there's any problems then errors will trigger a fail.
			EEH_Activation::generate_default_message_templates();
		} catch( EE_Error $e ){
			$this->assertInstanceOf( 'EE_Error', $e );
		}

		//all went well so let's make sure the activated system does NOT have our invalid message type string.
		$active_messengers = $message_resource_manager->get_active_messengers_option( true );
		foreach( $active_messengers as $messenger => $settings ) {
			$this->assertFalse(
				isset( $settings[ 'settings' ][ $messenger . '-message_types' ][ 'bogus_message_type' ] ),
				sprintf( 'The %s messenger should not have "bogus_message_type" active on it but it does.', $messenger )
			);
		}
	}




	/**
	 * Ensure getting default creator works as expected
	 * @since 4.6.0
	 */
	public function test_get_default_creator_id() {
        $this->loadFactories();
		//clear out any previous users that may be lurking in teh system
		foreach( get_users() as $wp_user ){
			wp_delete_user( $wp_user->ID );
		}
		//set some users; and just make it interesting by having the first user NOT be an admin
		$this->factory->user->create_many( 2 );
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
		 * EEH_Activation::reset() is called between unit tests), but also when an admin
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

	function test_get_cron_tasks__old() {
		add_filter( 'FHEE__EEH_Activation__get_cron_tasks', array( $this, 'change_cron_tasks' ) );
		$old_cron_tasks = EEH_Activation::get_cron_tasks( 'old' );
		$this->assertArrayHasKey( self::expired_cron_task_name, $old_cron_tasks );
		$this->assertArrayNotHasKey( self::current_cron_task_name, $old_cron_tasks );
	}
	function test_get_cron_tasks__all() {
		add_filter( 'FHEE__EEH_Activation__get_cron_tasks', array( $this, 'change_cron_tasks' ) );
		$old_cron_tasks = EEH_Activation::get_cron_tasks( 'all' );
		$this->assertArrayHasKey( self::expired_cron_task_name, $old_cron_tasks );
		$this->assertArrayHasKey( self::current_cron_task_name, $old_cron_tasks );
	}


	/**
	 * @see   https://events.codebasehq.com/projects/event-espresso/tickets/9501
	 * @since 4.8.36
	 */
	function test_remove_cron_tasks_with_empty_timestamp_values() {
		//first cache existing cron array
		$old_cron_option = _get_cron_array();
		//merge in a bunch of empty timestamps
		$empty_timestamps = array(
			time() + 30 => array(),
			time() + 600 => array(),
			time() - 400 => array()
		);
		_set_cron_array(
			array_merge( $empty_timestamps, $old_cron_option )
		);

		//now let's run the EEH_Activation::remove_cron_tasks
		EEH_Activation::remove_cron_tasks();

		//and verify that there are no empty timestamps
		$updated_cron_option = _get_cron_array();
		$this->assertEquals( count( $old_cron_option ), count( $updated_cron_option ) );

		//now restore
		_set_cron_array( $old_cron_option );
	}


	/**
	 * Makes it so this function can be independent on what the current cron tasks actually are
	 * (because they'll likely change, whereas some of these functions just want to check that
	 * we are retrieving cron tasks correctly)
	 *
	 * @param array $old_cron_tasks
	 * @return array
	 */
	function change_cron_tasks( $old_cron_tasks ) {
		return array(
			self::current_cron_task_name => 'hourly',
			self::expired_cron_task_name => EEH_Activation::cron_task_no_longer_in_use
		);
	}
	
	function test_table_exists__success() {
		$this->assertTrue( EEH_Activation::table_exists( 'posts' ) );
		$this->assertTrue( EEH_Activation::table_exists( 'esp_attendee_meta' ) );
	}
	
	function test_table_exists__false() {
		$this->assertFalse( EEH_Activation::table_exists( 'monkeys' ) );
	}



} //end class EEH_Activation_Test
// location: tests/testcases/core/helpers/EEH_Activation_Test.php

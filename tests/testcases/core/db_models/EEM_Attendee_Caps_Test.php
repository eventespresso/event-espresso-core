<?php

if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEM_Attendee_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group models
 * @group core/db_models
 * @group capabilities
 * @group EEM_Attendee_Caps_Test
 *
 */
class EEM_Attendee_Caps_Test extends EE_UnitTestCase{
	/**
	 * verifies that non-logged-in users can't view attendees,
	 * but users with contact-reading permissions can read all attendees
	 */
	function test_get_all__caps(){
		global $current_user;
		$user = $this->factory->user->create_and_get();
		$att = $this->new_model_obj_with_dependencies( 'Attendee' );
		$this->assertEquals( 0, EEM_Attendee::instance()->count( array( 'caps' => EEM_Base::caps_read ) ) );

		//ok now log the user in
		$current_user = $user;

		//and they still shouldn't be able to view the attendee
		$this->assertEquals( 0, EEM_Attendee::instance()->count( array( 'caps' => EEM_Base::caps_read ) ) );

		//ok now give them access to contacts
		$current_user->add_cap( 'ee_read_contacts' );
		//ensure user_level updated
		$current_user->get_role_caps();
		$current_user->update_user_level_from_caps();
		//temporary debug for travis builds
		var_dump( user_can( $current_user->ID, 'ee_read_contacts' ) );
		var_dump( current_user_can( 'ee_read_contacts' ) );
		EEM_Attendee::instance()->show_next_x_db_queries();
		//and now they should be able to see it
		$this->assertEquals( 1, EEM_Attendee::instance()->count( array( 'caps' => EEM_Base::caps_read ) ) );
	}
}

// End of file EEM_Attendee_Test.php
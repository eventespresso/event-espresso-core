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
 *
 */
class EEM_Attendee_Test extends EE_UnitTestCase{
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
		//and they still hsouldn't be able to ivew the attendee
		$this->assertEquals( 0, EEM_Attendee::instance()->count( array( 'caps' => EEM_Base::caps_read ) ) );

		//ok now give them access to contacts
		$current_user->add_cap( 'ee_read_contacts' );
		//and now they should be able to see it
		$this->assertEquals( 1, EEM_Attendee::instance()->count( array( 'caps' => EEM_Base::caps_read ) ) );
	}
}

// End of file EEM_Attendee_Test.php
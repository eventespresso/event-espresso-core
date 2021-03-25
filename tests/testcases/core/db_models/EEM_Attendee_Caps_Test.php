<?php

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 * EEM_Attendee_Test
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @group                 models
 * @group                 core/db_models
 * @group                 capabilities
 * @group                 EEM_Attendee_Caps_Test
 */
class EEM_Attendee_Caps_Test extends EE_UnitTestCase
{

    /**
     * verifies that non-logged-in users can't view attendees,
     * but users with contact-reading permissions can read all attendees
     *
     * @throws EE_Error
     */
    function test_get_all__caps()
    {
        $query_params_with_read_caps = ['caps' => EEM_Base::caps_read];

        global $current_user;
        $this->assertFalse($current_user->has_cap('ee_read_contacts'));

        $this->new_model_obj_with_dependencies('Attendee');
        $this->assertEquals(
            0,
            EEM_Attendee::instance()->count($query_params_with_read_caps)
        );

        // now create a new logged in user
        $user = $this->factory->user->create_and_get();
        // but verify that they too do not have caps
        $this->assertFalse($user->has_cap('ee_read_contacts'));
        // swap global current user for logged in user
        $current_user = $user;
        $this->assertFalse($current_user->has_cap('ee_read_contacts'));
        // and they still shouldn't be able to view the attendee
        $this->assertEquals(
            0,
            EEM_Attendee::instance()->count($query_params_with_read_caps)
        );

        // ok now give them access to contacts
        $current_user->add_cap('ee_read_contacts');
        // and now they should be able to see it
        $this->assertEquals(
            1,
            EEM_Attendee::instance()->count($query_params_with_read_caps)
        );
    }
}
// End of file EEM_Attendee_Test.php

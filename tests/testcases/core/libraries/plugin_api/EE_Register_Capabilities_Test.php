<?php
/**
 * Contains test class for /core/libraries/plugin_api/EE_Register_Capabilities.lib.php
 *
 * @since          4.5.0
 * @package        Event Espresso
 * @subpackage     tests
 */


/**
 * All tests for the EE_Register_Capabilities class.
 *
 * @since          4.5.0
 * @package        Event Espresso
 * @subpackage     tests
 * @group capabilities
 */
class EE_Register_Capabilities_Test extends EE_UnitTestCase
{

    private $_valid_capabilities = array();
    private $_valid_capabilities_numeric_caps_map = array();
    private $_user;
    /**
     * The results of EE_Capabilities::_init_caps_map() before any filters applied to it
     *
     * @var array
     */
    protected $_caps_before_registering_new_ones = array();


    /**
     * The results of EE_Capabilities::_set_meta_caps() before any filters applied to it.
     *
     * @var array
     */
    protected $_meta_caps_before_registering_new_ones = array();

    public function setUp()
    {
        parent::setUp();
        $capabilities_array                         = array(
            'administrator' => array(
                'test_reads',
                'test_writes',
                'test_others_read',
                'test_others_write',
                'test_private_read',
                'test_private_write',
            ),
        );
        $non_numeric_cap_maps_array                 = array(
            'EE_Meta_Capability_Map_Read' => array(
                'test_read',
                array('Event', 'test_published_read', 'test_others_read', 'test_private_read'),
            ),
            'EE_Meta_Capability_Map_Edit' => array(
                'test_write',
                array('Event', 'test_published_write', 'test_others_write', 'test_private_write'),
            ),
        );
        $numeric_cap_maps_array                     = array(
            0 => array(
                'EE_Meta_Capability_Map_Read' => array(
                    'test_read',
                    array('Event', 'test_published_read', 'test_others_read', 'test_private_read'),
                ),
            ),
            1 => array(
                'EE_Meta_Capability_Map_Edit' => array(
                    'test_write',
                    array('Event', 'test_published_write', 'test_others_write', 'test_private_write'),
                ),
            ),
        );
        $this->_valid_capabilities                  = array(
            'capabilities'    => $capabilities_array,
            'capability_maps' => $non_numeric_cap_maps_array,
        );
        $this->_valid_capabilities_numeric_caps_map = array(
            'capabilities'    => $capabilities_array,
            'capability_maps' => $numeric_cap_maps_array,
        );
    }


    /**
     * Utility function to just ensure and admin user is setup for tests in this suite
     *
     * @since 4.5.0
     * @return void
     */
    private function setupUser()
    {
        //create a user for checking caps on.
        $user_id     = $this->factory->user->create();
        $this->_user = $this->factory->user->get_object_by_id($user_id);
        //give user administrator role for test!
        $this->_user->add_role('administrator');

        //verify administrator role set
        $this->assertTrue(user_can($this->_user, 'administrator'));
    }


    /**
     * Utility function to just setup valid capabilities for tests in this suite.
     *
     * @since 1.0.0
     * @return void
     */
    private function _pretend_capabilities_registered($non_numeric = true)
    {
        //pretend correct hookpoint set.
        global $wp_actions;
        unset($wp_actions['AHEE__EE_System___detect_if_activation_or_upgrade__begin']);
        //register capabilities
        $capabilities_to_register = $non_numeric ? $this->_valid_capabilities : $this->_valid_capabilities_numeric_caps_map;
        EE_Register_Capabilities::register('Test_Capabilities', $capabilities_to_register);

        $this->_add_test_helper_filters();

        EE_Registry::instance()->load_core('Capabilities');
        EE_Capabilities::instance()->init_caps(true);

        //remove filters that were added to prevent pollution in other tests
        $this->_remove_test_helper_filters();
        //validate caps were registered and init saved.
        $admin_caps_init = EE_Capabilities::instance()->get_ee_capabilities('administrator');
        $this->assertArrayContains('test_reads', $admin_caps_init);

        //verify new caps are in the role
        $role = get_role('administrator');
        $this->assertContains($this->_valid_capabilities['capabilities']['administrator'], $role->capabilities);

        //make sure we didn't erase the existing capabilities (@see https://events.codebasehq.com/projects/event-espresso/tickets/6700)
        $this->assertContains(array('ee_read_ee', 'ee_read_events'), $role->capabilities,
            'Looks like registering capabilities is overwriting default capabilites, that will cause problems');

        //setup user
        $this->setupUser();
    }


    /**
     * Adds filter to help with tests that in turn verify things that should be setup are.
     */
    private function _add_test_helper_filters()
    {
        //use filters to access some of the data normally private to EE_Capabilities because we want to verify it
        add_filter('FHEE__EE_Capabilities__init_caps_map__caps', array($this, '_remember_what_caps_were_beforehand'),
            1);
        add_filter('FHEE__EE_Capabilities__init_caps_map__caps', array($this, '_verify_new_cap_map_ok'), 100);

        //verify the cap_map_maps
        add_filter('FHEE__EE_Capabilities___set_meta_caps__meta_caps', array($this, '_verify_new_meta_caps_ok'), 200);
    }


    /**
     * Removes the helper filters that were added initially for helping verify setup.
     */
    private function _remove_test_helper_filters()
    {
        remove_filter('FHEE__EE_Capabilities__init_caps_map__caps', array($this, '_remember_what_caps_were_beforehand'),
            1);
        remove_filter('FHEE__EE_Capabilities__init_caps_map__caps', array($this, '_verify_new_cap_map_ok'), 100);
        remove_filter('FHEE__EE_Capabilities___set_meta_caps__meta_caps', array($this, '_verify_new_meta_caps_ok'),
            200);
    }


    /**
     * Verify that the $incoming_cap_map looks normal after EE_Register_Capabilities has played with it
     *
     * @param array $incoming_cap_map
     * @return array
     */
    public function _verify_new_cap_map_ok($incoming_cap_map)
    {
        foreach ($this->_caps_before_registering_new_ones as $role => $caps) {
            $this->assertArrayHasKey($role, $incoming_cap_map);
            foreach ($caps as $cap) {
                $this->assertArrayContains($cap, $incoming_cap_map[$role]);
            }
        }
        return $incoming_cap_map;
    }


    /**
     * Verify that the $incoming_meta_caps (via _set_meta_caps ) looks normal after EE_Register_Capabilities has played
     * with it
     *
     * @param array $incoming_meta_caps
     * @return array
     */
    public function _verify_new_meta_caps_ok($incoming_meta_caps)
    {
        foreach ($this->_valid_capabilities['capability_maps'] as $meta_ref => $meta_cap_info) {
            $has_meta_cap      = false;
            $meta_cap_to_check = $meta_cap_info[0];
            //loop through and make sure that this meta cap is set on an instantiated map
            foreach ($incoming_meta_caps as $meta_cap_class) {
                if ($meta_cap_class->meta_cap == $meta_cap_to_check) {
                    $has_meta_cap = true;
                    break;
                }
            }

            if (! $has_meta_cap) {
                $this->fail(sprintf('Expecting the %s meta cap to be registered but it is not.', $meta_cap_to_check));
            }
        }
        return $incoming_meta_caps;
    }


    /**
     * Verify that the $incoming_cap_map looks normal after EE_Register_Capabilities has deregistered existing
     * registered caps
     *
     * @param array $incoming_cap_map
     * @return array
     */
    public function _verify_new_cap_map_ok_after_deregister($incoming_cap_map)
    {
        $this->assertNotContains($this->_valid_capabilities['capabilities']['administrator'],
            $incoming_cap_map['administrator']);
        return $incoming_cap_map;
    }


    /**
     * Verify that the $incoming_meta_caps looks normal after EE_Register_Capabilities has deregistered existing
     * registered caps.
     *
     * @param array $incoming_meta_caps
     * @return array
     */
    public function _verify_new_meta_cap_ok_after_deregister($incoming_meta_caps)
    {
        foreach ($this->_valid_capabilities['capability_maps'] as $meta_ref => $meta_cap_info) {
            $has_meta_cap      = false;
            $meta_cap_to_check = $meta_cap_info[0];
            //loop through and make sure that this meta cap is set on an instantiated map
            foreach ($incoming_meta_caps as $meta_cap_class) {
                if ($meta_cap_class->meta_cap == $meta_cap_to_check) {
                    $has_meta_cap = true;
                    break;
                }
            }

            if ($has_meta_cap) {
                $this->fail(sprintf('Expecting the %s meta cap to not be registered but it is.', $meta_cap_to_check));
            }
        }
        return $incoming_meta_caps;
    }


    /**
     * Gets all the caps BEFORE the registered caps get added to make sure none get
     * removed.
     *
     * @param type $incoming_cap_map
     * @return array
     */
    public function _remember_what_caps_were_beforehand($incoming_cap_map)
    {
        $this->_caps_before_registering_new_ones = $incoming_cap_map;
        return $incoming_cap_map;
    }


    /**
     * Gets all the cap maps BEFORE the registered caps get added to make sure none get
     * removed.
     *
     * @param type $incoming_cap_map
     * @return array
     */
    public function _remember_what_meta_caps_were_beforehand($incoming_cap_map)
    {
        $this->_meta_caps_before_registering_new_ones = $incoming_cap_map;
        return $incoming_cap_map;
    }


    public function test_registering_capabilities_too_early()
    {

        //test activating in the wrong spot.
        try {
            $registered = EE_Register_Capabilities::register('Test_Capabilities', $this->_valid_capabilities);
            $this->fail('We should have had a warning saying that we are registering capabilities at the wrong time');
        } catch (PHPUnit_Framework_Error_Notice $e) {
        }
        $this->assertTrue($registered);
    }


    public function test_registering_capabilities_and_they_are_assigned()
    {
        $this->_pretend_capabilities_registered();

        //now capabilities *SHOULD* be set on the user.  Let's verify.
        $this->assertTrue(user_can($this->_user, 'test_reads'));
        $this->assertTrue(user_can($this->_user, 'test_writes'));
        $this->assertTrue(user_can($this->_user, 'test_others_read'));
        $this->assertTrue(user_can($this->_user, 'test_others_write'));
        $this->assertTrue(user_can($this->_user, 'test_private_read'));
        $this->assertTrue(user_can($this->_user, 'test_private_write'));
    }


    public function test_capability_maps_registered_non_numeric()
    {
        $this->_pretend_capabilities_registered();
        //the best way to test this is to ensure the registered maps work.  So let's author an event by the user.

        //main users event.
        $event = $this->factory->event->create(array('EVT_wp_user' => $this->_user->ID));

        //other users event (checking others event caps).
        $user_id     = $this->factory->user->create();
        $other_user  = $this->factory->user->get_object_by_id($user_id);
        $other_event = $this->factory->event->create(array('EVT_wp_user' => $other_user->ID));

        //make sure we have an event
        $this->assertInstanceOf('EE_Event', $event);
        $this->assertInstanceOf('EE_Event', $other_event);

        //check map items for event.
        $this->assertTrue(EE_Capabilities::instance()->user_can($this->_user, 'test_read', 'testing_read',
            $event->ID()));
        $this->assertTrue(EE_Capabilities::instance()->user_can($this->_user, 'test_write', 'testing_edit',
            $event->ID()));
        $this->assertTrue(EE_Capabilities::instance()->user_can($this->_user, 'test_read', 'testing_read',
            $other_event->ID()));
        $this->assertTrue(EE_Capabilities::instance()->user_can($this->_user, 'test_write', 'testing_edit',
            $other_event->ID()));
    }


    public function test_capability_maps_registered_numeric()
    {
        $this->_pretend_capabilities_registered(false);
        //the best way to test this is to ensure the registered maps work.  So let's author an event by the user.

        //main users event.
        $event = $this->factory->event->create(array('EVT_wp_user' => $this->_user->ID));

        //other users event (checking others event caps).
        $user_id     = $this->factory->user->create();
        $other_user  = $this->factory->user->get_object_by_id($user_id);
        $other_event = $this->factory->event->create(array('EVT_wp_user' => $other_user->ID));

        //make sure we have an event
        $this->assertInstanceOf('EE_Event', $event);
        $this->assertInstanceOf('EE_Event', $other_event);

        //check map items for event.
        $this->assertTrue(EE_Capabilities::instance()->user_can($this->_user, 'test_read', 'testing_read',
            $event->ID()));
        $this->assertTrue(EE_Capabilities::instance()->user_can($this->_user, 'test_write', 'testing_edit',
            $event->ID()));
        $this->assertTrue(EE_Capabilities::instance()->user_can($this->_user, 'test_read', 'testing_read',
            $other_event->ID()));
        $this->assertTrue(EE_Capabilities::instance()->user_can($this->_user, 'test_write', 'testing_edit',
            $other_event->ID()));
    }


    public function test_capability_maps_deregistered()
    {//setup registered caps first
        $this->_pretend_capabilities_registered();

        //now let's add filter verify that new cap map doesn't have the mapped items after de-registering. The callback
        //on these filters should get called when EE_Register_Capabilities::deregister calls the EE_Capability::init_caps() method
        //so at that point they'll verify that the items that should be removed were actually removed.
        add_filter('FHEE__EE_Capabilities__init_caps_map__caps',
            array($this, '_verify_new_cap_map_ok_after_deregister'), 100);
        add_filter('FHEE__EE_Capabilities___set_meta_caps__meta_caps',
            array($this, '_verify_new_meta_cap_ok_after_deregister'), 200);

        //now deregister
        EE_Register_Capabilities::deregister('Test_Capabilities');

        //remove filters
        remove_filter('FHEE__EE_Capabilities__init_caps_map__caps',
            array($this, '_verify_new_cap_map_ok_after_deregister'), 100);
        remove_filter('FHEE__EE_Capabilities___set_meta_caps__meta_caps',
            array($this, '_verify_new_meta_cap_ok_after_deregister'), 200);
    }

    public function tearDown()
    {
        EE_Register_Capabilities::deregister('Test_Capabilities');
        parent::tearDown();
    }
}

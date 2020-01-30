<?php
/**
 * Contains test class for /core/EE_Capabilities.core.php
 *
 * @since          4.5.0
 * @package        Event Espresso
 * @subpackage     tests
 */

/**
 * All tests for the EE_Admin_Hooks class.
 *
 * @since          4.5.0
 * @package        Event Espresso
 * @subpackage     tests
 *
 * @group          caps
 */
class EE_Capabilities_Test extends EE_UnitTestCase
{

    const ADMINISTRATOR_ROLE = 'administrator';
    const SUBSCRIBER_ROLE = 'subscriber';

    /**
     * @var EE_Capabilities $CAPS
     */
    private $CAPS;



    public function setUp()
    {
        parent::setUp();
        $this->CAPS = EE_Registry::instance()->CAP;
    }



    /**
     * test the get_ee_capabilities method on EE_Capabilities class.
     *
     * @since 4.5.0
     */
    public function test_get_ee_capabilities()
    {
        //test getting admin capabilities (default)
        $admin_capabilities = $this->CAPS->get_ee_capabilities();
        $this->assertFalse(isset($admin_capabilities[self::ADMINISTRATOR_ROLE]));
        $this->assertTrue(is_array($admin_capabilities) && isset($admin_capabilities[0]));
        $first_cap = $admin_capabilities[0];
        $this->assertEquals('ee_read_ee', $first_cap);

        //test getting all capabilities
        $all_caps = $this->CAPS->get_ee_capabilities('');
        $this->assertArrayHasKey(self::ADMINISTRATOR_ROLE, $all_caps);

        //test getting invalid capability
        $caps = $this->CAPS->get_ee_capabilities('no_exist');
        $this->assertEmpty($caps);
    }



    public function test_add_new_capabilities_via_filtering_init_caps()
    {
        global $wp_roles;
        //check the current user is an admin
        $user = $this->factory->user->create_and_get();
        $this->assertInstanceOf('WP_User', $user);
        $this->assertFalse($this->CAPS->user_can($user, 'ee_new_cap', 'test'));

        //ok now add another cap, and re-init stuff and verify it got added correctly
        //add a new cap
        add_filter('FHEE__EE_Capabilities__init_caps_map__caps', array($this, 'add_new_caps'));
        // but we'll need to set the reset flag to true if we want to do things this way
        $this->CAPS->init_caps(true);
        //check it got added
        $this->assertArrayContains('ee_new_cap', $this->CAPS->get_ee_capabilities(self::ADMINISTRATOR_ROLE));
        $user->add_role(self::ADMINISTRATOR_ROLE);
        $this->assertTrue($this->CAPS->user_can($user, 'ee_new_cap', 'test'));
        //then check newly-created users get that new role
        //refresh the roles' caps and the user object
        $wp_roles       = new WP_Roles();
        $user_refreshed = get_user_by('id', $user->ID);
        $this->assertTrue($this->CAPS->user_can($user_refreshed, 'ee_new_cap', 'test'));
    }

    public function add_new_caps($existing_caps)
    {
        $existing_caps[self::ADMINISTRATOR_ROLE][] = 'ee_new_cap';
        return $existing_caps;
    }



    public function testAddCaps()
    {
        $this->CAPS->init_caps(true);
        global $wp_roles;
        //check the current user is an admin
        $user = $this->factory->user->create_and_get();
        $this->assertInstanceOf('WP_User', $user);
        $this->assertFalse($this->CAPS->user_can($user, 'ee_new_cap', 'test'));
        // ok now add a new cap, but this time using addCaps
         $this->CAPS->addCaps(array(self::ADMINISTRATOR_ROLE => array('ee_new_cap')));
        //check it got added
        $this->assertArrayContains('ee_new_cap', $this->CAPS->get_ee_capabilities(self::ADMINISTRATOR_ROLE));
        $user->add_role(self::ADMINISTRATOR_ROLE);
        $this->assertTrue($this->CAPS->user_can($user, 'ee_new_cap', 'test'));
        //then check newly-created users get that new role
        //refresh the roles' caps and the user object
        $wp_roles = new WP_Roles();
        $user_refreshed = get_user_by('id', $user->ID);
        $this->assertTrue($this->CAPS->user_can($user_refreshed, 'ee_new_cap', 'test'));
    }



    public function test_add_cap_to_role()
    {
        $this->CAPS->init_caps(true);
        global $wp_roles;
        //check the current user is an admin
        $user = $this->factory->user->create_and_get();
        $this->assertInstanceOf('WP_User', $user);
        $this->assertFalse($this->CAPS->user_can($user, 'ee_new_cap', 'test'));
        // ok now add a new cap, but this time using addCaps
         $this->CAPS->add_cap_to_role(self::ADMINISTRATOR_ROLE, 'ee_new_cap');
        //check it got added
        $this->assertArrayContains('ee_new_cap', $this->CAPS->get_ee_capabilities(self::ADMINISTRATOR_ROLE));
        $user->add_role(self::ADMINISTRATOR_ROLE);
        $this->assertTrue($this->CAPS->user_can($user, 'ee_new_cap', 'test'));
        //then check newly-created users get that new role
        //refresh the roles' caps and the user object
        $wp_roles = new WP_Roles();
        $user_refreshed = get_user_by('id', $user->ID);
        $this->assertTrue($this->CAPS->user_can($user_refreshed, 'ee_new_cap', 'test'));
    }



    /**
     * @since 4.5.0
     */
    public function test_current_user_can_and_user_can()
    {
        global $current_user;
        //setup our user and set as current user.
        $user = $this->factory->user->create_and_get();
        $this->assertInstanceOf('WP_User', $user);
        $user->add_role(self::ADMINISTRATOR_ROLE);
        $current_user = $user;

        //check what should be a valid  cap
        $this->assertTrue($this->CAPS->current_user_can('ee_read_ee', 'tests'));
        $this->assertTrue($this->CAPS->user_can($user, 'ee_read_ee', 'tests'));

        //check what should be an invalid cap
        $this->assertFalse($this->CAPS->current_user_can('invalid_cap', 'tests'));
        $this->assertFalse($this->CAPS->user_can($user, 'invalid_cap', 'tests'));

        //test context filter
        function test_custom_filter($cap, $id)
        {
            if ($cap == 'ee_read_ee') {
                return 'need_this_instead';
            }

            return $cap;
        }

        add_filter('FHEE__EE_Capabilities__current_user_can__cap__tests', 'test_custom_filter', 10, 2);
        add_filter('FHEE__EE_Capabilities__user_can__cap__tests', 'test_custom_filter', 10, 2);

        $this->assertFalse($this->CAPS->current_user_can('ee_read_ee', 'tests'));
        $this->assertFalse($this->CAPS->user_can($user, 'ee_read_ee', 'tests'));

        //test global filter
        function test_global_filter($filtered_cap, $context, $cap, $id)
        {
            if ($cap == 'ee_read_ee' && $context == 'tests') {
                return 'ee_read_ee'; //override what was set by custom filter
            }

            return $cap;
        }

        add_filter('FHEE__EE_Capabilities__current_user_can__cap', 'test_global_filter', 10, 4);
        add_filter('FHEE__EE_Capabilities__user_can__cap', 'test_global_filter', 10, 4);

        $this->assertTrue($this->CAPS->current_user_can('ee_read_ee', 'tests'));
        $this->assertTrue($this->CAPS->user_can($user, 'ee_read_ee', 'tests'));
    }



    public function testRemoveCaps()
    {
        $this->CAPS->init_caps(true);
        /** @var WP_Role $administrator_role */
        $administrator_role = get_role(self::ADMINISTRATOR_ROLE);
        $this->assertInstanceOf('WP_Role', $administrator_role);
        // verify two ways that cap exists
        $this->assertTrue(isset($administrator_role->capabilities['ee_manage_gateways']));
        $this->assertTrue($administrator_role->has_cap('ee_manage_gateways'));
        // for whatever reason, this site wants to have all gateways
        // under control of someone other than the standard administrator
        // so they want to remove the 'ee_manage_gateways' cap from the above administrator role
        $this->CAPS->removeCaps(array(self::ADMINISTRATOR_ROLE => array('ee_manage_gateways')));
        $user = $this->setupAdminUserAndTestCapDoesNOtExist('ee_manage_gateways');
        $this->assertFalse(
            $this->CAPS->user_can($user, 'ee_manage_gateways', 'test'),
            'The admin user should NOT have the "ee_manage_gateways" capability because it was removed!'
        );
    }



    public function test_remove_cap_from_role()
    {
        $this->CAPS->init_caps(true);
        /** @var WP_Role $administrator_role */
        $administrator_role = get_role(self::ADMINISTRATOR_ROLE);
        $this->assertInstanceOf('WP_Role', $administrator_role);
        // verify that cap exists
        $this->assertTrue($administrator_role->has_cap('ee_manage_gateways'));
        // for whatever reason, this site wants to have all gateways
        // under control of someone other than the standard administrator
        // so they want to remove the 'ee_manage_gateways' cap from the above administrator role
        $this->CAPS->remove_cap_from_role(self::ADMINISTRATOR_ROLE, 'ee_manage_gateways');
        $user = $this->setupAdminUserAndTestCapDoesNOtExist('ee_manage_gateways');
        $this->assertFalse(
            $this->CAPS->user_can($user, 'ee_manage_gateways', 'test'),
            'The admin user should NOT have the "ee_manage_gateways" capability because it was removed!'
        );
    }



    private function setupAdminUserAndTestCapDoesNOtExist($cap_to_test = '')
    {
        /** @var WP_User $user */
        $user = $this->factory->user->create_and_get();
        $this->assertInstanceOf('WP_User', $user);
        // verify they don't have the $cap_to_test YET...
        $this->assertFalse(
            $this->CAPS->user_can($user, $cap_to_test, 'test'),
            'The admin user should NOT have the "'. $cap_to_test .'" capability YET!'
        );
        // first remove the existing default role
        $user->remove_role(self::SUBSCRIBER_ROLE);
        // verify that no other roles exist that could be granting caps
        $this->assertEmpty($user->roles);
        // now make this user an administrator
        $user->add_role(self::ADMINISTRATOR_ROLE);
        $this->assertEquals(self::ADMINISTRATOR_ROLE, reset($user->roles));
        return $user;
    }


    public function testPaymentMethodCaps()
    {
        // we're going to fake the activation of the Mock_Onsite payment method
        // which should bestow the following capability to administrators
        $mock_onsite_capability = 'ee_payment_method_mock_onsite';
        // but first we need to fake being in the admin
        $this->go_to(admin_url());
        // first let's verify that admins do not currently have this cap
        /** @var WP_Role $administrator_role */
        $administrator_role = get_role(self::ADMINISTRATOR_ROLE);
        $this->assertInstanceOf('WP_Role', $administrator_role);
        // verify two ways that cap does not exist YET...
        $this->assertFalse(isset($administrator_role->capabilities[$mock_onsite_capability]));
        $this->assertFalse($administrator_role->has_cap($mock_onsite_capability));
        // now create an admin user
        $user = $this->setupAdminUserAndTestCapDoesNOtExist($mock_onsite_capability);
        // and fake activation of the Mock Onsite Payment Method
        $this->_pretend_addon_hook_time();
        EE_Register_Payment_Method::register(
            'onsite',
            array(
                'payment_method_paths' => array(
                    EE_TESTS_DIR . 'mocks/payment_methods/Mock_Onsite',
                ),
            )
        );
        // to complete the fake PM registration, we need to reset the EE_Payment_Method_Manager
        // which will take care of injecting all Payment Method caps into the default cap map
        // normally we wouldn't do this because the PM would get registered before the caps get initialized
        EE_Payment_Method_Manager::reset();
        // and confirm that the admin role now has that cap
        $this->assertTrue(
            $administrator_role->has_cap($mock_onsite_capability),
            'The admin user should have the "' . $mock_onsite_capability . '" capability!'
        );
        // but it appears caps are only added when the role is assigned
        // (that's really clever WordPress </sarcasm> what's the point of having roles then?)
        // turns out we can call the protected _init_caps() method, to reset the caps
        $this->refreshRolesForUser($user);
        // then verify the user also has the cap
        $this->assertTrue(
            $this->CAPS->user_can($user, $mock_onsite_capability, 'test'),
            'The admin user should have the "' . $mock_onsite_capability . '" capability!'
        );
        // now deactivate the Mock Onsite PM
        EE_Register_Payment_Method::deregister('onsite');
        //deregister will just set the hook to run on `AHEE__EE_System__core_loaded_and_ready` so we need to call that
        //hook
        do_action('AHEE__EE_System__core_loaded_and_ready');
        // and confirm that the admin role now has lost that cap
        $this->assertFalse(
            $administrator_role->has_cap($mock_onsite_capability),
            'The admin user should NOT have the "' . $mock_onsite_capability . '" capability!'
        );
        $this->refreshRolesForUser($user);
        // then verify the user also has also lost the cap
        $this->assertFalse(
            $this->CAPS->user_can($user, $mock_onsite_capability, 'test'),
            'The admin user should have the "' . $mock_onsite_capability . '" capability!'
        );
    }



    public function testAddNewRoleWhenAddingCap()
    {
        $this->CAPS->init_caps(true);
        $jedi_master = 'ee_jedi_master';
        /** @var WP_Role $jedi_master_role */
        $jedi_master_role = get_role($jedi_master);
        $this->assertNull($jedi_master_role);
        $this->CAPS->add_cap_to_role($jedi_master, 'ee_use_the_force');
        /** @var WP_Role $jedi_master_role */
        $jedi_master_role = get_role($jedi_master);
        $this->assertInstanceOf('WP_Role', $jedi_master_role);
    }
}
// end EE_Capabilities_Test class
// Location: testcases/core/EE_Capabilities_Test.php

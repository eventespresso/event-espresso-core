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



    public function testRemoveCapabilities()
    {
        /** @var WP_Role $administrator_role */
        $administrator_role = get_role(self::ADMINISTRATOR_ROLE);
        $this->assertInstanceOf('WP_Role', $administrator_role);
        // verify two ways that cap exists
        $this->assertTrue(isset($administrator_role->capabilities['ee_manage_gateways']));
        $this->assertTrue($administrator_role->has_cap('ee_manage_gateways'));
        // for whatever reason, this site wants to have all gateways
        // under control of someone other than the standard administrator
        // so they want to remove the 'ee_manage_gateways' cap from the above administrator role
        add_filter(
            'FHEE__EE_Capabilities__init_caps_map__caps',
            array($this, 'removeManageGatewaysCapFromAdministrator')
        );
        // PLZ NOTE, that the above callback asserts that the cap has been filtered from the caps array
        // let's re-initialize the caps to ensure our changes take effect
        $this->CAPS->init_caps();
        $user = $this->setupAdminUserAndTestCapDoesNOtExist('ee_manage_gateways');
        $this->assertFalse(
            $this->CAPS->user_can($user, 'ee_manage_gateways', 'test'),
            'The admin user should NOT have the "ee_manage_gateways" capability because it was removed!'
        );
        // WHAT?!?!?
        // we filtered the cap map array !!! why can't we remove that cap ?!?!!?
        // what about directly?
        $this->CAPS->remove_cap_from_role(self::ADMINISTRATOR_ROLE, 'ee_manage_gateways');
        $this->assertFalse(
            $this->CAPS->user_can($user, 'ee_manage_gateways', 'test'),
            'The admin user should NOT have the "ee_manage_gateways" capability because it was removed!'
        );
        // what if we try directly ?
        $administrator_role->remove_cap('ee_manage_gateways');
        $this->assertFalse(
            user_can($user, 'ee_manage_gateways'),
            'The admin user should NOT have the "ee_manage_gateways" capability because it was removed!'
        );
        // WOWZERS !!! what if we remove the cap directly from the role
        $administrator_role->remove_cap('ee_manage_gateways');
        $this->assertFalse(
            $administrator_role->has_cap('ee_manage_gateways'),
            'The admin user should NOT have the "ee_manage_gateways" capability because it was removed!'
        );
    }


    public function removeManageGatewaysCapFromAdministrator($existing_caps)
    {
        // first verify that the cap exists
        $this->assertTrue(
            in_array('ee_manage_gateways', $existing_caps[self::ADMINISTRATOR_ROLE], true)
        );
        foreach ($existing_caps[self::ADMINISTRATOR_ROLE] as $key => $existing_cap) {
            if ($existing_cap === 'ee_manage_gateways') {
                unset($existing_caps[self::ADMINISTRATOR_ROLE][$key]);
            }
        }
        // now verify that it doesn't
        $this->assertFalse(
            in_array('ee_manage_gateways', $existing_caps[self::ADMINISTRATOR_ROLE], true)
        );
        return $existing_caps;
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
                    EE_TESTS_DIR . 'mocks' . DS . 'payment_methods' . DS . 'Mock_Onsite',
                ),
            )
        );
        // to complete the fake PM registration, we need to hook into EE_Capabilities::init_caps_map()
        // using EE_Payment_Method_Manager::add_payment_method_caps() as a callback
        // which will take care of injecting all Payment Method caps into the default cap map
        add_filter(
            'FHEE__EE_Capabilities__init_caps_map__caps',
            array(EE_Payment_Method_Manager::instance(), 'add_payment_method_caps')
        );
        // now let's re-initialize the caps to ensure our changes take effect
        EE_Registry::instance()->CAP->init_caps();
        // and confirm that the admin role now has that cap
        $this->assertTrue(
            $administrator_role->has_cap($mock_onsite_capability),
            'The admin user should have the "' . $mock_onsite_capability . '" capability!'
        );
        // then verify the user also has the cap
        $this->assertTrue(
            $this->CAPS->user_can($user, $mock_onsite_capability, 'test'),
            'The admin user should have the "' . $mock_onsite_capability . '" capability!'
        );
    }


}
// end EE_Capabilities_Test class
// Location: testcases/core/EE_Capabilities_Test.php

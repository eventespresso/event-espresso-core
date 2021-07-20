<?php
namespace EventEspresso\tests\includes;

use EE_UnitTestCase;
use EE_Addon;
use EE_Data_Migration_Manager;
use EE_Register_Addon;
use Exception;
use PHPUnit_Framework_Error_notice;
use EE_Registry;
use EE_Maintenance_Mode;
use EE_NewAddonMock;

/**
 * EeAddonTestCase
 * This test case is used for any classes that need to test things in core related to an EE addon.
 *
 * @package EventEspresso
 * @subpackage tests
 * @author  Darren Ethier
 * @since   1.0.0
 */
class EeAddonTestCase extends EE_UnitTestCase
{

    /**
     * The mock addon registered
     *
     * @var EE_Addon
     */
    protected $addon;

    /**
     * the original activation history for the addon (gets restored after each test)
     *
     * @var array
     */
    protected $addon_activation_history;

    /**
     * The current db state wp option; it gets stored before each test and restored after each test
     *
     * @var array
     */
    protected $current_db_state = array();

    /**
     * For when we are detecting an upgrade in an addon, we pretend its old database
     * version was this
     *
     * @var string
     */
    protected $pretend_addon_previous_version = '0.0.1.rc.000';

    /**
     * Names of the temporary tables added by the add-on
     *
     * @var array
     */
    protected $temp_tables_added_by_addon = array('esp_new_addon_thing', 'esp_new_addon_attendee_meta');



    public function setUp()
    {
        parent::setUp();
        require_once EE_TESTS_DIR . 'mocks/addons/EE_NewAddonMock.class.php';
        $this->pretendAddonHookTime();
        $this->registerAddon();
        $this->current_db_state = get_option(EE_Data_Migration_Manager::current_database_state);
        delete_option(EE_Data_Migration_Manager::current_database_state);
        update_option(EE_Data_Migration_Manager::current_database_state, array('Core' => espresso_version()));
    }



    public function tearDown()
    {
        //only need to reset if $this->_addon isn't set
        if ($this->addon instanceof EE_Addon) {
            update_option($this->addon->get_activation_history_option_name(), $this->addon_activation_history);
            update_option(EE_Data_Migration_Manager::current_database_state, $this->current_db_state);
            $addon_name = EE_NewAddonMock::getCurrentName();
            EE_Register_Addon::deregister($addon_name);
            try {
                EE_Registry::instance()->addons->{$addon_name};
                $this->fail('The addon is still registered. Deregistering the addon failed.');
            } catch (Exception $e) {
                $this->assertInstanceOf('OutOfBoundsException', $e);
            }
            $this->stopPretendingAddonHookTime();
        }
        parent::tearDown();
    }


    protected function registerAddon($addon_name = 'EE_NewAddonMock', $options = array())
    {
        $addon_count = EE_Registry::instance()->addons->count();
        //register addon with default options.
        EE_NewAddonMock::registerWithGivenOptions($addon_name, $options);
        //ensure the addon has been registered
        $this->assertCount(absint($addon_count + 1), EE_Registry::instance()->addons);
        $this->assertTrue(EE_Registry::instance()->addons->has($addon_name));
        $this->addon = EE_Registry::instance()->addons->get($addon_name);
        $this->assertInstanceOf($addon_name, $this->addon);
        $this->addon_activation_history = $this->addon->get_activation_history();
    }


    protected function deRegisterAddon($addon_name = 'EE_NewAddonMock')
    {
        $addon_count = EE_Registry::instance()->addons->count();
        EE_Register_Addon::deregister($addon_name);
        $this->assertCount(absint($addon_count - 1), EE_Registry::instance()->addons);
    }



    protected function pretendAddonHookTime()
    {
        /** @todo move logic from this method into here from EE_UnitTestCase */
        $this->_pretend_addon_hook_time();
    }


    protected function stopPretendingAddonHookTime()
    {
        /** @todo move logic from this method into here from EE_UnitTestCase */
        $this->_stop_pretending_addon_hook_time();
    }


    protected function pretendReactivation()
    {
        $this->assertEquals(EE_Maintenance_Mode::level_0_not_in_maintenance, EE_Maintenance_Mode::instance()->level());
        //it should have an entry in its activation history and db state
        $activation_history_option_name = $this->addon->get_activation_history_option_name();
        update_option($activation_history_option_name, array($this->addon->version() => array(current_time('mysql'))));
        $db_state              = get_option(EE_Data_Migration_Manager::current_database_state);
        $db_state['New_Addon'] = $this->addon->version();
        update_option(EE_Data_Migration_Manager::current_database_state, $db_state);
        $this->deRegisterAddon();
        //trigger activate_plugin hook
        do_action('activate_plugin');
        $this->registerAddon();
    }
}

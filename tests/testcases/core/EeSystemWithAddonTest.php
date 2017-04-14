<?php
defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed.');

use EventEspresso\tests\includes\EeAddonTestCase;

/**
 * EeSystemWithAddonTest
 * Tests various aspect of addon interactions with EE_System.
 *
 * @package EventEspresso
 * @subpackage \testcases
 * @author  Darren Ethier
 * @since   4.9.38.rc
 * @group addonsNew
 */
class EeSystemWithAddonTest extends EeAddonTestCase
{
    public function testDetectActivationsOrUpgradesOnReactivation()
    {
        global $wp_actions;
        $this->pretendReactivation();
        // $times_its_new_install_hook_fired_before = isset($wp_actions["AHEE__NewAddonMock__reactivation"])
        //     ? $wp_actions["AHEE__NewAddonMock__reactivation"]
        //     : 0;

        //do our assertions
        $this->assertWPOptionExists($this->addon->get_activation_indicator_option_name());
        $this->assertEquals(EE_System::req_type_reactivation, $this->addon->detect_req_type());
    }
}
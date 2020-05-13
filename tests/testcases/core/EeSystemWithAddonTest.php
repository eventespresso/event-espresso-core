<?php

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
        $times_its_new_install_hook_fired_before = isset($wp_actions["AHEE__EE_NewAddonMock__reactivation"])
            ? $wp_actions["AHEE__EE_NewAddonMock__reactivation"]
            : 0;
        $this->pretendReactivation();
        //do our assertions
        $this->assertWPOptionExists($this->addon->get_activation_indicator_option_name());
        $this->assertEquals(EE_System::req_type_reactivation, $this->addon->detect_req_type());

        //test EE_System reset which simulates activation/upgrades
        //simulate activation process
        EE_System::reset();
        $this->assertEquals(
            $times_its_new_install_hook_fired_before + 1,
            $wp_actions["AHEE__EE_NewAddonMock__reactivation"]
        );
        $this->assertWPOptionDoesNotExist($this->addon->get_activation_indicator_option_name());
    }
}
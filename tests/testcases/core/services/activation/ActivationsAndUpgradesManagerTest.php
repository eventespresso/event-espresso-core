<?php
use EventEspresso\core\services\activation\ActivationHandler;
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\ActivationsAndUpgradesManager;
use EventEspresso\core\services\activation\RequestTypeDetector;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\tests\includes\AddonActivationTestsHelper;
use EventEspresso\tests\mocks\core\EE_System_Mock;
use EventEspresso\tests\mocks\core\MaintenanceModeMock;
use EventEspresso\tests\mocks\core\services\activation\ActivationHistoryExtendedMock;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * ActivationsAndUpgradesManagerTest
 * Tests \EventEspresso\core\services\activation\ActivationsAndUpgradesManager
 *
 * @package    EventEspresso\tests
 * @subpackage \testcases
 * @author     Brent Christenson
 * @since      4.9.44
 * @group      Activation
 */
class ActivationsAndUpgradesManagerTest extends EE_UnitTestCase
{



    public function setUp()
    {
        parent::setUp();
        delete_option(ActivationHistory::EE_ACTIVATION_HISTORY_OPTION_NAME);
        delete_option(ActivationHistory::EE_ACTIVATION_INDICATOR_OPTION_NAME);
        remove_all_filters('AHEE__EE_System__perform_activations_upgrades_and_migrations');
        $this->_pretend_addon_hook_time();
    }



    /**
     * tests what happens when a class that does NOT implement ActivatableInterface is passed to constructor
     */
    public function testDetectActivationsAndVersionChangesWithBadArguments()
    {
        $ActivationsAndUpgradesManager = new ActivationsAndUpgradesManager(
            new ActivationHandler(MaintenanceModeMock::instance()),
            new RequestTypeDetector()
        );
        $this->expectException('EventEspresso\core\exceptions\InvalidEntityException');
        $ActivationsAndUpgradesManager->detectActivationsAndVersionChanges(
            array(new stdClass()/* NOT ActivatableInterface */)
        );
    }

    /**
     * tests what happens when both core and an addon are activated for the first time
     */
    public function testDetectActivationsAndVersionChangesForTwoNewActivations()
    {
        $ActivationsAndUpgradesManager = new ActivationsAndUpgradesManager(
            new ActivationHandler(MaintenanceModeMock::instance()),
            new RequestTypeDetector()
        );
        $system_mock = new EE_System_Mock();
        $activations = array(
            $system_mock,
            AddonActivationTestsHelper::registerAddon(),
        );
        $new_activation_count = 0;
        add_action(
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleNewActivation',
            function ($system_activated) use ($activations, &$new_activation_count) {
                PHPUnit_Framework_TestCase::assertTrue(
                    in_array($system_activated, $activations, true)
                );
                $new_activation_count++;
            },
            10
        );
        PHPUnit_Framework_TestCase::assertTrue(
            $ActivationsAndUpgradesManager->detectActivationsAndVersionChanges($activations)
        );
        PHPUnit_Framework_TestCase::assertEquals(2, $new_activation_count);
        PHPUnit_Framework_TestCase::assertNotFalse(
            has_action(
                'AHEE__EE_System__perform_activations_upgrades_and_migrations',
                array($ActivationsAndUpgradesManager, 'performActivationsAndUpgrades')
            )
        );
        PHPUnit_Framework_TestCase::assertNotFalse(
            did_action(
                'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleNewActivation'
            )
        );
        $activation_count = 0;
        add_action(
            'AHEE__EventEspresso_core_services_activation_ActivationsAndUpgradesManager__performActivationsAndUpgrades',
            function($activation, $initializer) use ($activations, &$activation_count) {
                PHPUnit_Framework_TestCase::assertTrue(
                    in_array($activation, $activations, true)
                );
                PHPUnit_Framework_TestCase::assertInstanceOf(
                    'EventEspresso\core\services\activation\InitializeInterface',
                    $initializer
                );
                $activation_count++;
            },
            10, 2
        );
        $system_mock->perform_activations_upgrades_and_migrations();
        PHPUnit_Framework_TestCase::assertEquals(2, $activation_count);
    }



}
// Location: testcases/core/services/activation/ActivationsAndUpgradesManagerTest.php

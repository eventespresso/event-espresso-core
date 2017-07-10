<?php

use EventEspresso\core\services\activation\ActivationHandler;
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\RequestType;
use EventEspresso\tests\includes\AddonActivationTestsHelper;
use EventEspresso\tests\mocks\core\MaintenanceModeMock;
use EventEspresso\tests\mocks\core\services\activation\ActivationHistoryExtendedMock;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * ActivationHandlerTest
 * Tests \EventEspresso\core\services\activation\ActivationHandler
 *
 * @package    EventEspresso\tests
 * @subpackage \testcases
 * @author     Brent Christenson
 * @since      4.9.44
 * @group      Activation
 */
class ActivationHandlerTest extends EE_UnitTestCase
{

    /**
     * @var EE_NewAddonMock $addon
     */
    protected $addon;

    /**
     * @var string $addon_name
     */
    protected $addon_name = 'EE_NewAddonMock';



    public function setUp()
    {
        parent::setUp();
        $this->_pretend_addon_hook_time();
        remove_all_filters('AHEE__EE_System__perform_activations_upgrades_and_migrations');
    }



    public function tearDown()
    {
        if ($this->addon instanceof EE_Addon) {
            EE_Register_Addon::deregister($this->addon_name);
            $this->_stop_pretending_addon_hook_time();
        }
        parent::tearDown();
    }



    /**
     * @return ActivationHandler
     * @throws EE_Error
     */
    protected function getActivationHandler()
    {
        $this->addon = AddonActivationTestsHelper::registerAddon($this->addon_name);
        return new ActivationHandler(MaintenanceModeMock::instance());
    }



    public function testConstructor()
    {
        PHPUnit_Framework_TestCase::assertInstanceOf(
            'EventEspresso\core\services\activation\ActivationHandler',
            $this->getActivationHandler()
        );
    }



    public function testDetectActivationsForNormalRequest()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForNormalRequest(),
            RequestType::NORMAL,
            false,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleNormalRequest'
        );
    }



    public function testDetectActivationsForNewActivation()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForNewActivation(),
            RequestType::NEW_ACTIVATION,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleNewActivation'
        );
    }



    public function testDetectActivationsForReactivation()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForReActivation(),
            RequestType::REACTIVATION,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleReactivation'
        );
    }



    public function testDetectActivationsForUpgradeActivation()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForUpgradeActivation(),
            RequestType::UPGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleUpgrade'
        );
    }



    public function testDetectActivationsForUpgradeRequest()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForUpgradeRequest(),
            RequestType::UPGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleUpgrade'
        );
    }



    public function testDetectActivationsForNewVersionUpgrade()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForNewVersionUpgrade(),
            RequestType::UPGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleUpgrade'
        );
    }



    public function testDetectActivationsForDowngradeActivation()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForDowngradeActivation(),
            RequestType::DOWNGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleDowngrade'
        );
    }



    public function testDetectActivationsForDowngradeRequest()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForDowngradeRequest(),
            RequestType::DOWNGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleDowngrade'
        );
    }



    public function testDetectActivationsForNewVersionDowngrade()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForNewVersionDowngrade(),
            RequestType::DOWNGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleDowngrade'
        );
    }



    /**
     * @param ActivationHistory $activation_history
     * @param int               $expected_request_type
     * @param bool              $expected_activation_detected
     * @param string            $action
     * @throws InvalidArgumentException
     * @throws PHPUnit_Framework_AssertionFailedError
     */
    public function assertActivationDetection(
        ActivationHistory $activation_history,
        $expected_request_type,
        $expected_activation_detected,
        $action
    ) {
        $request_type = AddonActivationTestsHelper::getAndDetectRequestType($activation_history);
        PHPUnit_Framework_TestCase::assertEquals(
            $expected_request_type,
            $request_type->getRequestType()
        );
        $activation_handler = $this->getActivationHandler();
        $activation_detected =  $activation_handler->detectActivationOrVersionChange(
            $this->addon,
            $request_type,
            $activation_history
        );

        if($expected_activation_detected) {
            PHPUnit_Framework_TestCase::assertTrue(
                $activation_detected,
                'An activation was not detected when it should have been'
            );
        } else {
            PHPUnit_Framework_TestCase::assertFalse(
                $activation_detected,
                'An activation was detected when it should not have been'
            );
        }
        PHPUnit_Framework_TestCase::assertTrue(
            (bool)did_action($action),
            "The '{$action}' action hook was not triggered"
        );
    }

}
// Location: testcases/core/services/activation/ActivationHandlerTest.php

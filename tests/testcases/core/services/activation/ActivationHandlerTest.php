<?php

use EventEspresso\core\services\activation\ActivationHandler;
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\RequestType;
use EventEspresso\tests\includes\ActivationTestsHelper;
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



    public function tearDown()
    {
        if ($this->addon instanceof EE_Addon) {
            EE_Register_Addon::deregister($this->addon_name);
            $this->_stop_pretending_addon_hook_time();
        }
        parent::tearDown();
    }



    public function registerAddon()
    {
        require_once EE_TESTS_DIR . 'mocks/addons/EE_NewAddonMock.class.php';
        $this->_pretend_addon_hook_time();
        EE_NewAddonMock::registerWithGivenOptions($this->addon_name);
        $this->addon = EE_Registry::instance()->addons->{$this->addon_name};
        $this->addon->setActivationIndicatorOptionName(
            ActivationHistoryExtendedMock::EE_ACTIVATION_INDICATOR_OPTION_NAME
        );
        $this->addon->setActivationHistoryOptionName(
            ActivationHistoryExtendedMock::EE_ACTIVATION_HISTORY_OPTION_NAME
        );
    }



    /**
     * @param ActivationHistory $activation_history
     * @param RequestType       $request_type
     * @return ActivationHandler
     * @throws InvalidArgumentException
     */
    protected function getActivationHandler(ActivationHistory $activation_history, RequestType $request_type)
    {
        $this->registerAddon();
        return new ActivationHandler(
            $this->addon,
            $request_type,
            $activation_history,
            MaintenanceModeMock::instance()
        );
    }



    public function testConstructor()
    {
        $activation_history = ActivationTestsHelper::getActivationHistoryForNormalRequest();
        $request_type = ActivationTestsHelper::getAndDetectRequestType($activation_history);
        PHPUnit_Framework_TestCase::assertInstanceOf(
            'EventEspresso\core\services\activation\ActivationHandler',
            $this->getActivationHandler($activation_history, $request_type)
        );
    }



    public function testBadConstructor()
    {
        $activation_history = ActivationTestsHelper::getActivationHistoryForNormalRequest();
        $request_type = ActivationTestsHelper::getAndDetectRequestType($activation_history);
        $this->expectException('TypeError');
        new ActivationHandler(
            new stdClass(),
            $request_type,
            $activation_history,
            MaintenanceModeMock::instance()
        );
    }



    public function testGetSystemName()
    {
        $activation_history = ActivationTestsHelper::getActivationHistoryForNormalRequest();
        $request_type = ActivationTestsHelper::getAndDetectRequestType($activation_history);
        $activation_handler = $this->getActivationHandler($activation_history, $request_type);
        PHPUnit_Framework_TestCase::assertEquals(
            $this->addon_name,
            $activation_handler->getSystemName()
        );
    }



    public function testDetectActivationsForNormalRequest()
    {
        $this->assertActivationDetection(
            ActivationTestsHelper::getActivationHistoryForNormalRequest(),
            RequestType::NORMAL,
            false,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleNormalRequest'
        );
    }



    public function testDetectActivationsForNewActivation()
    {
        $this->assertActivationDetection(
            ActivationTestsHelper::getActivationHistoryForNewActivation(),
            RequestType::NEW_ACTIVATION,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleNewActivation'
        );
    }



    public function testDetectActivationsForReactivation()
    {
        $this->assertActivationDetection(
            ActivationTestsHelper::getActivationHistoryForReActivation(),
            RequestType::REACTIVATION,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleReactivation'
        );
    }



    public function testDetectActivationsForUpgradeActivation()
    {
        $this->assertActivationDetection(
            ActivationTestsHelper::getActivationHistoryForUpgradeActivation(),
            RequestType::UPGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleUpgrade'
        );
    }



    public function testDetectActivationsForUpgradeRequest()
    {
        $this->assertActivationDetection(
            ActivationTestsHelper::getActivationHistoryForUpgradeRequest(),
            RequestType::UPGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleUpgrade'
        );
    }



    public function testDetectActivationsForNewVersionUpgrade()
    {
        $this->assertActivationDetection(
            ActivationTestsHelper::getActivationHistoryForNewVersionUpgrade(),
            RequestType::UPGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleUpgrade'
        );
    }



    public function testDetectActivationsForDowngradeActivation()
    {
        $this->assertActivationDetection(
            ActivationTestsHelper::getActivationHistoryForDowngradeActivation(),
            RequestType::DOWNGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleDowngrade'
        );
    }



    public function testDetectActivationsForDowngradeRequest()
    {
        $this->assertActivationDetection(
            ActivationTestsHelper::getActivationHistoryForDowngradeRequest(),
            RequestType::DOWNGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleDowngrade'
        );
    }



    public function testDetectActivationsForNewVersionDowngrade()
    {
        $this->assertActivationDetection(
            ActivationTestsHelper::getActivationHistoryForNewVersionDowngrade(),
            RequestType::DOWNGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleDowngrade'
        );
    }



    /**
     * @param ActivationHistory $activation_history
     * @param int               $expected_request_type
     * @param bool              $activation_detected
     * @param string            $action
     * @throws InvalidArgumentException
     * @throws PHPUnit_Framework_AssertionFailedError
     */
    public function assertActivationDetection(
        ActivationHistory $activation_history,
        $expected_request_type,
        $activation_detected,
        $action
    ) {
        $request_type = ActivationTestsHelper::getAndDetectRequestType($activation_history);
        PHPUnit_Framework_TestCase::assertEquals(
            $expected_request_type,
            $request_type->getRequestType()
        );
        $activation_handler = $this->getActivationHandler($activation_history, $request_type);
        if($activation_detected) {
            PHPUnit_Framework_TestCase::assertTrue(
                $activation_handler->detectActivations(),
                'An activation was not detected when it should have been'
            );
        } else {
            PHPUnit_Framework_TestCase::assertFalse(
                $activation_handler->detectActivations(),
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

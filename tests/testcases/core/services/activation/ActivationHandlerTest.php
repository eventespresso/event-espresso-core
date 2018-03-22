<?php

use EventEspresso\core\services\activation\ActivationHandler;
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\ActivationType;
use EventEspresso\tests\includes\AddonActivationTestsHelper;
use EventEspresso\tests\mocks\core\MaintenanceModeMock;

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


    /**
     * @throws EE_Error
     */
    public function setUp()
    {
        parent::setUp();
        $this->_pretend_addon_hook_time();
        remove_all_filters('AHEE__EE_System__perform_activations_upgrades_and_migrations');
    }


    /**
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
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
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    protected function getActivationHandler()
    {
        $this->addon = AddonActivationTestsHelper::registerAddon();
        return new ActivationHandler(MaintenanceModeMock::instance());
    }


    /**
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \PHPUnit\Framework\Exception
     */
    public function testConstructor()
    {
        PHPUnit_Framework_TestCase::assertInstanceOf(
            'EventEspresso\core\services\activation\ActivationHandler',
            $this->getActivationHandler()
        );
    }


    /**
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testDetectActivationsForNormalRequest()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForNormalRequest(),
            ActivationType::NOT_ACTIVATION,
            false,
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__handleNormalRequest'
        );
    }


    /**
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testDetectActivationsForNewActivation()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForNewActivation(),
            ActivationType::NEW_ACTIVATION,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__handleNewActivation'
        );
    }


    /**
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testDetectActivationsForReactivation()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForReActivation(),
            ActivationType::REACTIVATION,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__handleReactivation'
        );
    }


    /**
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testDetectActivationsForUpgradeActivation()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForUpgradeActivation(),
            ActivationType::UPGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__handleUpgrade'
        );
    }


    /**
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testDetectActivationsForUpgradeRequest()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForUpgradeRequest(),
            ActivationType::UPGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__handleUpgrade'
        );
    }


    /**
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testDetectActivationsForNewVersionUpgrade()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForNewVersionUpgrade(),
            ActivationType::UPGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__handleUpgrade'
        );
    }


    /**
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testDetectActivationsForDowngradeActivation()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForDowngradeActivation(),
            ActivationType::DOWNGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__handleDowngrade'
        );
    }


    /**
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testDetectActivationsForDowngradeRequest()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForDowngradeRequest(),
            ActivationType::DOWNGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__handleDowngrade'
        );
    }


    /**
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testDetectActivationsForNewVersionDowngrade()
    {
        $this->assertActivationDetection(
            AddonActivationTestsHelper::getActivationHistoryForNewVersionDowngrade(),
            ActivationType::DOWNGRADE,
            true,
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__handleDowngrade'
        );
    }


    /**
     * @param ActivationHistory $activation_history
     * @param                   $expected_activation_type
     * @param                   $expected_activation_detected
     * @param                   $action
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \PHPUnit\Framework\AssertionFailedError
     */
    public function assertActivationDetection(
        ActivationHistory $activation_history,
        $expected_activation_type,
        $expected_activation_detected,
        $action
    ) {
        $activation_type = AddonActivationTestsHelper::getAndDetectActivationType($activation_history);
        PHPUnit_Framework_TestCase::assertEquals(
            $expected_activation_type,
            $activation_type->getActivationType()
        );
        $activation_handler = $this->getActivationHandler();
        $activation_detected =  $activation_handler->detectActivationOrVersionChange(
            $this->addon,
            $activation_type,
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

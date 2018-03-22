<?php
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\ActivationType;
use EventEspresso\tests\includes\AddonActivationTestsHelper;
use EventEspresso\tests\mocks\core\services\activation\ActivationHistoryExtendedMock;
use EventEspresso\tests\mocks\core\services\activation\ActivationTypeDetectorExtendedMock;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * ActivationTypeDetectorTest
 * Tests \EventEspresso\core\services\activation\ActivationTypeDetector
 *
 * @package    EventEspresso\tests
 * @subpackage \testcases
 * @author     Brent Christenson
 * @since      4.9.44
 * @group      Activation
 */
class ActivationTypeDetectorTest extends EE_UnitTestCase
{

    /**
     * @throws EE_Error
     */
    public function setUp()
    {
        parent::setUp();
        delete_option(ActivationHistory::EE_ACTIVATION_HISTORY_OPTION_NAME);
        delete_option(ActivationHistory::EE_ACTIVATION_INDICATOR_OPTION_NAME);
    }


    /**
     * check ActivationType instance after calling resolveFromActivationHistory()
     *
     * @throws \PHPUnit\Framework\Exception
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     */
    public function testGetActivationTypeAfterResolveFromActivationHistoryCalled()
    {
        /** @var ActivationHistoryExtendedMock $activation_history */
        $activation_history = AddonActivationTestsHelper::getActivationHistory();
        $detector = new ActivationTypeDetectorExtendedMock();
        $request_type = $detector->resolveActivationTypeFromActivationHistory($activation_history);
        PHPUnit_Framework_TestCase::assertInstanceOf(
            'EventEspresso\core\services\activation\ActivationType',
            $request_type
        );
    }


    /**
     * check ActivationType === NEW_ACTIVATION
     *
     * @throws \PHPUnit\Framework\Exception
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws InvalidArgumentException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     */
    public function testResolveFromActivationHistoryNewActivation()
    {
        /** @var ActivationHistoryExtendedMock $activation_history */
        $activation_history = AddonActivationTestsHelper::getActivationHistory();
        $version_history = get_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME, false);
        PHPUnit_Framework_TestCase::assertFalse($version_history);
        ActivationTypeDetectorTest::assertActivationTypeDetails(
            AddonActivationTestsHelper::getAndDetectActivationType($activation_history),
            ActivationType::NEW_ACTIVATION,
            false
        );
        $activation_history->updateActivationHistory();
        $version_history = get_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME, false);
        PHPUnit_Framework_TestCase::assertNotFalse($version_history);
        PHPUnit_Framework_TestCase::assertCount(1, $version_history);
    }


    /**
     * check ActivationType === NORMAL
     *
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws InvalidArgumentException
     * @throws \PHPUnit\Framework\Exception
     */
    public function testResolveFromActivationHistoryNormalRequest()
    {
        ActivationTypeDetectorTest::assertActivationTypeDetails(
            AddonActivationTestsHelper::getAndDetectActivationType(
                AddonActivationTestsHelper::getActivationHistoryForNormalRequest()
            ),
            ActivationType::NOT_ACTIVATION,
            false
        );
    }


    /**
     * check ActivationType === UPGRADE during non-activation request
     *
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws InvalidArgumentException
     * @throws \PHPUnit\Framework\Exception
     */
    public function testResolveFromActivationHistoryUpgradeRequest()
    {
        ActivationTypeDetectorTest::assertActivationTypeDetails(
            AddonActivationTestsHelper::getAndDetectActivationType(
                AddonActivationTestsHelper::getActivationHistoryForUpgradeRequest()
            ),
            ActivationType::UPGRADE,
            true
        );
    }


    /**
     * check ActivationType === DOWNGRADE during non-activation request
     *
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws InvalidArgumentException
     * @throws \PHPUnit\Framework\Exception
     */
    public function testResolveFromActivationHistoryDowngradeRequest()
    {
        ActivationTypeDetectorTest::assertActivationTypeDetails(
            AddonActivationTestsHelper::getAndDetectActivationType(
                AddonActivationTestsHelper::getActivationHistoryForDowngradeRequest()
            ),
            ActivationType::DOWNGRADE,
            true
        );
    }


    /**
     * check ActivationType === REACTIVATION
     *
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws InvalidArgumentException
     * @throws \PHPUnit\Framework\Exception
     */
    public function testResolveFromActivationHistoryReActivation()
    {
        ActivationTypeDetectorTest::assertActivationTypeDetails(
            AddonActivationTestsHelper::getAndDetectActivationType(
                AddonActivationTestsHelper::getActivationHistoryForReActivation()
            ),
            ActivationType::REACTIVATION,
            false
        );
    }


    /**
     * check ActivationType === UPGRADE during activation request
     *
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws InvalidArgumentException
     * @throws \PHPUnit\Framework\Exception
     */
    public function testResolveFromActivationHistoryUpgradeActivation()
    {
        ActivationTypeDetectorTest::assertActivationTypeDetails(
            AddonActivationTestsHelper::getAndDetectActivationType(
                AddonActivationTestsHelper::getActivationHistoryForUpgradeActivation()
            ),
            ActivationType::UPGRADE,
            true
        );
    }


    /**
     * check ActivationType === DOWNGRADE during activation request
     *
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws InvalidArgumentException
     * @throws \PHPUnit\Framework\Exception
     */
    public function testResolveFromActivationHistoryDowngradeActivation()
    {
        ActivationTypeDetectorTest::assertActivationTypeDetails(
            AddonActivationTestsHelper::getAndDetectActivationType(
                AddonActivationTestsHelper::getActivationHistoryForDowngradeActivation()
            ),
            ActivationType::DOWNGRADE,
            true
        );
    }


    /**
     * check ActivationType === UPGRADE during non-activation request for new version
     *
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws InvalidArgumentException
     * @throws \PHPUnit\Framework\Exception
     */
    public function testResolveFromActivationHistoryNewVersionUpgrade()
    {
        ActivationTypeDetectorTest::assertActivationTypeDetails(
            AddonActivationTestsHelper::getAndDetectActivationType(
                AddonActivationTestsHelper::getActivationHistoryForNewVersionUpgrade()
            ),
            ActivationType::UPGRADE,
            true
        );
    }


    /**
     * check ActivationType === DOWNGRADE during non-activation request for new version
     *
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws InvalidArgumentException
     * @throws \PHPUnit\Framework\Exception
     */
    public function testResolveFromActivationHistoryNewVersionDowngrade()
    {
        ActivationTypeDetectorTest::assertActivationTypeDetails(
            AddonActivationTestsHelper::getAndDetectActivationType(
                AddonActivationTestsHelper::getActivationHistoryForNewVersionDowngrade()
            ),
            ActivationType::DOWNGRADE,
            true
        );
    }


    /**
     * Asserts ActivationType instance, plus return values of isMajorVersionChange() and getActivationType()
     *
     * @param ActivationType $request_type
     * @param int            $expected_request_type
     * @param bool           $isMajorVersionChange
     * @throws \PHPUnit\Framework\Exception
     */
    public static function assertActivationTypeDetails($request_type, $expected_request_type, $isMajorVersionChange)
    {
        PHPUnit_Framework_TestCase::assertInstanceOf(
            'EventEspresso\core\services\activation\ActivationType',
            $request_type
        );
        PHPUnit_Framework_TestCase::assertEquals(
            $isMajorVersionChange,
            $request_type->isMajorVersionChange()
        );
        PHPUnit_Framework_TestCase::assertEquals(
            $expected_request_type,
            $request_type->getActivationType()
        );
    }


}
// Location: testcases/core/services/activation/ActivationTypeDetectorTest.php

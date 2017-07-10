<?php
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\RequestType;
use EventEspresso\tests\includes\AddonActivationTestsHelper;
use EventEspresso\tests\mocks\core\services\activation\ActivationHistoryExtendedMock;
use EventEspresso\tests\mocks\core\services\request\RequestTypeDetectorExtendedMock;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * RequestTypeDetectorTest
 * Tests \EventEspresso\core\services\activation\RequestTypeDetector
 *
 * @package    EventEspresso\tests
 * @subpackage \testcases
 * @author     Brent Christenson
 * @since      4.9.44
 * @group      Activation
 */
class RequestTypeDetectorTest extends EE_UnitTestCase
{



    public function setUp()
    {
        parent::setUp();
        delete_option(ActivationHistory::EE_ACTIVATION_HISTORY_OPTION_NAME);
        delete_option(ActivationHistory::EE_ACTIVATION_INDICATOR_OPTION_NAME);
    }




    /**
     * check RequestType instance after calling resolveFromActivationHistory()
     */
    public function testGetRequestTypeAfterResolveFromActivationHistoryCalled()
    {
        /** @var ActivationHistoryExtendedMock $activation_history */
        $activation_history = AddonActivationTestsHelper::getActivationHistory();
        $detector = new RequestTypeDetectorExtendedMock();
        $request_type = $detector->resolveRequestTypeFromActivationHistory($activation_history);
        PHPUnit_Framework_TestCase::assertInstanceOf(
            'EventEspresso\core\services\activation\RequestType',
            $request_type
        );
    }



    /**
     * check RequestType === NEW_ACTIVATION
     */
    public function testResolveFromActivationHistoryNewActivation()
    {
        /** @var ActivationHistoryExtendedMock $activation_history */
        $activation_history = AddonActivationTestsHelper::getActivationHistory();
        $version_history = get_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME, false);
        PHPUnit_Framework_TestCase::assertFalse($version_history);
        RequestTypeDetectorTest::assertRequestTypeDetails(
            AddonActivationTestsHelper::getAndDetectRequestType($activation_history),
            RequestType::NEW_ACTIVATION,
            false
        );
        $activation_history->updateActivationHistory();
        $version_history = get_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME, false);
        PHPUnit_Framework_TestCase::assertNotFalse($version_history);
        PHPUnit_Framework_TestCase::assertCount(1, $version_history);
    }



    /**
     * check RequestType === NORMAL
     */
    public function testResolveFromActivationHistoryNormalRequest()
    {
        RequestTypeDetectorTest::assertRequestTypeDetails(
            AddonActivationTestsHelper::getAndDetectRequestType(
                AddonActivationTestsHelper::getActivationHistoryForNormalRequest()
            ),
            RequestType::NORMAL,
            false
        );
    }



    /**
     * check RequestType === UPGRADE during non-activation request
     */
    public function testResolveFromActivationHistoryUpgradeRequest()
    {
        RequestTypeDetectorTest::assertRequestTypeDetails(
            AddonActivationTestsHelper::getAndDetectRequestType(
                AddonActivationTestsHelper::getActivationHistoryForUpgradeRequest()
            ),
            RequestType::UPGRADE,
            true
        );
    }



    /**
     * check RequestType === DOWNGRADE during non-activation request
     */
    public function testResolveFromActivationHistoryDowngradeRequest()
    {
        RequestTypeDetectorTest::assertRequestTypeDetails(
            AddonActivationTestsHelper::getAndDetectRequestType(
                AddonActivationTestsHelper::getActivationHistoryForDowngradeRequest()
            ),
            RequestType::DOWNGRADE,
            true
        );
    }



    /**
     * check RequestType === REACTIVATION
     */
    public function testResolveFromActivationHistoryReActivation()
    {
        RequestTypeDetectorTest::assertRequestTypeDetails(
            AddonActivationTestsHelper::getAndDetectRequestType(
                AddonActivationTestsHelper::getActivationHistoryForReActivation()
            ),
            RequestType::REACTIVATION,
            false
        );
    }



    /**
     * check RequestType === UPGRADE during activation request
     */
    public function testResolveFromActivationHistoryUpgradeActivation()
    {
        RequestTypeDetectorTest::assertRequestTypeDetails(
            AddonActivationTestsHelper::getAndDetectRequestType(
                AddonActivationTestsHelper::getActivationHistoryForUpgradeActivation()
            ),
            RequestType::UPGRADE,
            true
        );
    }



    /**
     * check RequestType === DOWNGRADE during activation request
     */
    public function testResolveFromActivationHistoryDowngradeActivation()
    {
        RequestTypeDetectorTest::assertRequestTypeDetails(
            AddonActivationTestsHelper::getAndDetectRequestType(
                AddonActivationTestsHelper::getActivationHistoryForDowngradeActivation()
            ),
            RequestType::DOWNGRADE,
            true
        );
    }



    /**
     * check RequestType === UPGRADE during non-activation request for new version
     */
    public function testResolveFromActivationHistoryNewVersionUpgrade()
    {
        RequestTypeDetectorTest::assertRequestTypeDetails(
            AddonActivationTestsHelper::getAndDetectRequestType(
                AddonActivationTestsHelper::getActivationHistoryForNewVersionUpgrade()
            ),
            RequestType::UPGRADE,
            true
        );
    }



    /**
     * check RequestType === DOWNGRADE during non-activation request for new version
     */
    public function testResolveFromActivationHistoryNewVersionDowngrade()
    {
        RequestTypeDetectorTest::assertRequestTypeDetails(
            AddonActivationTestsHelper::getAndDetectRequestType(
                AddonActivationTestsHelper::getActivationHistoryForNewVersionDowngrade()
            ),
            RequestType::DOWNGRADE,
            true
        );
    }



    /**
     * Asserts RequestType instance, plus return values of isMajorVersionChange() and getRequestType()
     *
     * @param RequestType $request_type
     * @param int         $expected_request_type
     * @param bool        $isMajorVersionChange
     * @throws PHPUnit_Framework_Exception
     */
    public static function assertRequestTypeDetails($request_type, $expected_request_type, $isMajorVersionChange)
    {
        PHPUnit_Framework_TestCase::assertInstanceOf(
            'EventEspresso\core\services\activation\RequestType',
            $request_type
        );
        PHPUnit_Framework_TestCase::assertEquals(
            $isMajorVersionChange,
            $request_type->isMajorVersionChange()
        );
        PHPUnit_Framework_TestCase::assertEquals(
            $expected_request_type,
            $request_type->getRequestType()
        );
    }


}
// Location: testcases/core/services/activation/RequestTypeDetectorTest.php

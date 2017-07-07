<?php
use EventEspresso\core\services\activation\RequestType;
use EventEspresso\tests\includes\ActivationTestsHelper;
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
        delete_option(ActivationHistoryExtendedMock::EE_ACTIVATION_HISTORY_OPTION_NAME);
        delete_option(ActivationHistoryExtendedMock::EE_ACTIVATION_INDICATOR_OPTION_NAME);
    }



    /**
     * RequestType isn't set until ActivationHistory::resolveFromActivationHistory() is called
     * so confirm that no RequestType is set prior to that
     */
    public function testGetRequestTypeNotSet()
    {
        /** @var ActivationHistoryExtendedMock $activation_history */
        $activation_history = ActivationTestsHelper::getActivationHistory();
        $detector = new RequestTypeDetectorExtendedMock($activation_history);
        PHPUnit_Framework_TestCase::assertNull($detector->getRequestType());
    }



    /**
     * set RequestType manually then check getter
     */
    public function testGetRequestTypeGetter()
    {
        /** @var ActivationHistoryExtendedMock $activation_history */
        $activation_history = ActivationTestsHelper::getActivationHistory();
        $detector = new RequestTypeDetectorExtendedMock($activation_history);
        $detector->setRequestType(new RequestType());
        PHPUnit_Framework_TestCase::assertInstanceOf(
            'EventEspresso\core\services\activation\RequestType',
            $detector->getRequestType()
        );
    }



    /**
     * check RequestType instance after calling resolveFromActivationHistory()
     */
    public function testGetRequestTypeAfterResolveFromActivationHistoryCalled()
    {
        /** @var ActivationHistoryExtendedMock $activation_history */
        $activation_history = ActivationTestsHelper::getActivationHistory();
        $detector = new RequestTypeDetectorExtendedMock($activation_history);
        $detector->resolveFromActivationHistory();
        PHPUnit_Framework_TestCase::assertInstanceOf(
            'EventEspresso\core\services\activation\RequestType',
            $detector->getRequestType()
        );
    }



    /**
     * check RequestType === NEW_ACTIVATION
     */
    public function testResolveFromActivationHistoryNewActivation()
    {
        /** @var ActivationHistoryExtendedMock $activation_history */
        $activation_history = ActivationTestsHelper::getActivationHistory();
        $version_history = get_option(ActivationHistoryExtendedMock::EE_ACTIVATION_HISTORY_OPTION_NAME, false);
        PHPUnit_Framework_TestCase::assertFalse($version_history);
        $this->assertActivationDetails(
            ActivationTestsHelper::getAndDetectRequestType($activation_history),
            RequestType::NEW_ACTIVATION,
            false
        );
        $activation_history->updateActivationHistory();
        $version_history = get_option(ActivationHistoryExtendedMock::EE_ACTIVATION_HISTORY_OPTION_NAME, false);
        PHPUnit_Framework_TestCase::assertNotFalse($version_history);
        PHPUnit_Framework_TestCase::assertCount(1, $version_history);
    }



    /**
     * check RequestType === NORMAL
     */
    public function testResolveFromActivationHistoryNormalRequest()
    {
        $this->assertActivationDetails(
            ActivationTestsHelper::getAndDetectRequestType(
                ActivationTestsHelper::getActivationHistoryForNormalRequest()
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
        $this->assertActivationDetails(
            ActivationTestsHelper::getAndDetectRequestType(
                ActivationTestsHelper::getActivationHistoryForUpgradeRequest()
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
        $this->assertActivationDetails(
            ActivationTestsHelper::getAndDetectRequestType(
                ActivationTestsHelper::getActivationHistoryForDowngradeRequest()
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
        $this->assertActivationDetails(
            ActivationTestsHelper::getAndDetectRequestType(
                ActivationTestsHelper::getActivationHistoryForReActivation()
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
        $this->assertActivationDetails(
            ActivationTestsHelper::getAndDetectRequestType(
                ActivationTestsHelper::getActivationHistoryForUpgradeActivation()
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
        $this->assertActivationDetails(
            ActivationTestsHelper::getAndDetectRequestType(
                ActivationTestsHelper::getActivationHistoryForDowngradeActivation()
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
        $this->assertActivationDetails(
            ActivationTestsHelper::getAndDetectRequestType(
                ActivationTestsHelper::getActivationHistoryForNewVersionUpgrade()
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
        $this->assertActivationDetails(
            ActivationTestsHelper::getAndDetectRequestType(
                ActivationTestsHelper::getActivationHistoryForNewVersionDowngrade()
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
    private function assertActivationDetails($request_type, $expected_request_type, $isMajorVersionChange)
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

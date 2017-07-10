<?php
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\tests\includes\AddonActivationTestsHelper;
use EventEspresso\tests\mocks\core\services\activation\ActivationHistoryExtendedMock;

/**
 * ActivationHistoryTest
 * Tests \EventEspresso\core\services\activation\ActivationHistory
 *
 * @package    EventEspresso\tests
 * @subpackage \testcases
 * @author     Brent Christenson
 * @since      4.9.44
 * @group      Activation
 */
class ActivationHistoryTest extends EE_UnitTestCase
{



    public function setUp()
    {
        parent::setUp();
        delete_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME);
        delete_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME);
    }



    public function testDefaultConstructor()
    {
        $activation_history = new ActivationHistoryExtendedMock();
        PHPUnit_Framework_TestCase::assertInstanceOf(
            'EventEspresso\core\services\activation\ActivationHistory',
            $activation_history
        );
        PHPUnit_Framework_TestCase::assertEquals(
            ActivationHistory::EE_ACTIVATION_HISTORY_OPTION_NAME,
            $activation_history->getActivationHistoryOptionName()
        );
        PHPUnit_Framework_TestCase::assertEquals(
            ActivationHistory::EE_ACTIVATION_INDICATOR_OPTION_NAME,
            $activation_history->getActivationIndicatorOptionName()
        );
        PHPUnit_Framework_TestCase::assertEquals(
            espresso_version(),
            $activation_history->getCurrentVersion()
        );
    }



    public function testConstructor()
    {
        $test_version = '1.2.3.p';
        $activation_history = new ActivationHistoryExtendedMock(
            ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME,
            ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME,
            $test_version
        );
        PHPUnit_Framework_TestCase::assertInstanceOf(
            'EventEspresso\core\services\activation\ActivationHistory',
            $activation_history
        );
        PHPUnit_Framework_TestCase::assertEquals(
            ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME,
            $activation_history->getActivationHistoryOptionName()
        );
        PHPUnit_Framework_TestCase::assertEquals(
            ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME,
            $activation_history->getActivationIndicatorOptionName()
        );
        PHPUnit_Framework_TestCase::assertEquals(
            $test_version,
            $activation_history->getCurrentVersion()
        );
    }



    public function testConstructorInvalidHistoryOptionNameDataType()
    {
        $this->expectException('EventEspresso\core\exceptions\InvalidDataTypeException');
        new ActivationHistoryExtendedMock(
            1234657890,
            ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME,
            '1.2.3.p'
        );
    }



    public function testConstructorInvalidIndicatorOptionNameDataType()
    {
        $this->expectException('EventEspresso\core\exceptions\InvalidDataTypeException');
        new ActivationHistoryExtendedMock(
            ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME,
            1234657890,
            '1.2.3.p'
        );
    }



    public function testConstructorInvalidVersionDataType()
    {
        $this->expectException('EventEspresso\core\exceptions\InvalidDataTypeException');
        new ActivationHistoryExtendedMock(
            ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME,
            ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME,
            1.2
        );
    }



    public function testGetCurrentVersion()
    {
        $current_version  = '2.3.4.p';
        /** @var ActivationHistoryExtendedMock $activation_history */
        $activation_history = AddonActivationTestsHelper::getActivationHistory($current_version);
        PHPUnit_Framework_TestCase::assertEquals(
            $current_version,
            $activation_history->getCurrentVersion()
        );
    }



    public function testGetMostRecentActiveVersion()
    {
        /** @var ActivationHistoryExtendedMock $activation_history */
        list($activation_history, $version_history) = AddonActivationTestsHelper::getActivationAndVersionHistory(
            '2.3.4.p'
        );
        PHPUnit_Framework_TestCase::assertEquals(
            '0.0.0.dev.000',
            $activation_history->getMostRecentActiveVersion()
        );
        $activation_history->setMockVersionHistory($version_history);
        PHPUnit_Framework_TestCase::assertEquals(
            $activation_history->getLastVersionFromHistoryArray($version_history),
            $activation_history->getMostRecentActiveVersion(),
            sprintf(
                'Version mismatch! The last entry in the version history array is: %1$s',
                var_export(end($version_history), true)
            )
        );
    }



    public function testUpdateActivationHistory()
    {
        $current_version = '2.3.4.p';
        /** @var ActivationHistoryExtendedMock $activation_history */
        list($activation_history, $version_history) = AddonActivationTestsHelper::getActivationAndVersionHistory(
            $current_version,
            1,
            2,
            3
        );
        $activation_history->updateActivationHistory($version_history, $current_version);
        PHPUnit_Framework_TestCase::assertEquals(
            $current_version,
            $activation_history->getLastVersionFromHistoryArray(
                $activation_history->getVersionHistory()
            )
        );
        PHPUnit_Framework_TestCase::assertEquals(
            $current_version,
            $activation_history->getMostRecentActiveVersion(),
            sprintf(
                'Version mismatch! The last entry in the version history array is: %1$s',
                var_export(end($version_history), true)
            )
        );
    }



    public function testAddActivationHistory()
    {
        PHPUnit_Framework_TestCase::assertFalse(
            get_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME, false)
        );
        $current_version = '1.4.8.p';
        /** @var ActivationHistoryExtendedMock $activation_history */
        list($activation_history, $version_history) = AddonActivationTestsHelper::getActivationAndVersionHistory(
            $current_version
        );
        $activation_history->addActivationHistory($version_history, $current_version);
        PHPUnit_Framework_TestCase::assertEquals(
            $version_history,
            get_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME, false)
        );
    }



    public function testGetActivationIndicator()
    {
        PHPUnit_Framework_TestCase::assertFalse(
            get_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME, false)
        );
        /** @var ActivationHistoryExtendedMock $activation_history */
        $activation_history = AddonActivationTestsHelper::getActivationHistory();
        PHPUnit_Framework_TestCase::assertFalse($activation_history->getActivationIndicator());
        update_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME, true);
        PHPUnit_Framework_TestCase::assertTrue($activation_history->getActivationIndicator());
    }



    public function testSetActivationIndicator()
    {
        PHPUnit_Framework_TestCase::assertFalse(
            get_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME, false)
        );
        /** @var ActivationHistoryExtendedMock $activation_history */
        $activation_history = AddonActivationTestsHelper::getActivationHistory();
        PHPUnit_Framework_TestCase::assertFalse($activation_history->getActivationIndicator());
        $activation_history->setActivationIndicator();
        PHPUnit_Framework_TestCase::assertTrue($activation_history->getActivationIndicator());
    }



    public function testDeleteActivationIndicator()
    {
        PHPUnit_Framework_TestCase::assertFalse(
            get_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME, false)
        );
        /** @var ActivationHistoryExtendedMock $activation_history */
        $activation_history = AddonActivationTestsHelper::getActivationHistory();
        PHPUnit_Framework_TestCase::assertFalse($activation_history->getActivationIndicator());
        $activation_history->deleteActivationIndicator();
        PHPUnit_Framework_TestCase::assertNull(
            get_option(ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME, null)
        );
    }



}
// Location: testcases/core/services/activation/ActivationHistoryTest.php

<?php

use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\RequestType;
use EventEspresso\tests\includes\AddonActivationTestsHelper;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class ActivationIntegrationTests
 * Old Unit Tests from EE_System_Test converted over to use new system, but test same assertions
 *
 * @package EventEspresso\tests\testcases\core\services\activation
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ActivationIntegrationTests extends EE_UnitTestCase
{

    /**
     * Sets the WordPress option 'espresso_db_update'
     *
     * @param array $espresso_db_upgrade top-level-keys should be version numbers,
     *                                   and their values should be an array of mysql datetimes
     *                                   when that version was activated
     */
    private function setEspressoDbUpdateTo($espresso_db_upgrade)
    {
        if ($espresso_db_upgrade === null) {
            delete_option(ActivationHistory::EE_ACTIVATION_HISTORY_OPTION_NAME);
        } else {
            update_option(ActivationHistory::EE_ACTIVATION_HISTORY_OPTION_NAME, $espresso_db_upgrade);
        }
    }



    /**
     *
     * @param string $version_string        eg "4.3.2.alpha.003
     * @param string $version_amount_to_add eg "0.0.0.0.1"
     * @return string eg if given the mentioned inputs, would be "4.3.2.alpha.4";
     */
    private function modifyVersion($version_string, $version_amount_to_add = '0.1.0.0.0')
    {
        $version_parts = explode('.', $version_string);
        $version_amount_to_add_parts = explode('.', $version_amount_to_add);
        foreach ($version_parts as $key => $version_part) {
            if (is_numeric($version_part)) {
                $characters_in_version_part = strlen($version_part);
                $version_parts[$key] = str_pad(
                    $version_parts[$key] + $version_amount_to_add_parts[$key],
                    $characters_in_version_part,
                    '0',
                    STR_PAD_LEFT
                );
            }
        }
        return implode('.', $version_parts);
    }



    /**
     * tests RequestTypeDetectorTest::modifyVersion()) to make sure it's working
     * (because other tests depend on it)
     */
    public function testModifyVersion()
    {
        PHPUnit_Framework_TestCase::assertEquals(
            '5.3.1.alpha.002',
            $this->modifyVersion('4.3.2.alpha.001', '1.0.-1.1.1')
        );
    }



    /**
     * Asserts that there is at most $precision time difference between $expected_time and
     * $actual_time, in either direction
     *
     * @param string|int $expected_time mysql or unix timestamp
     * @param string|int $actual_time   mysql or unix timestamp
     * @param int        $precision     allowed number of seconds of time difference without failing
     */
    protected function assertTimeIsAbout($expected_time, $actual_time, $precision = 5)
    {
        if (! is_int($expected_time)) {
            $expected_time = strtotime($expected_time);
        }
        if (! is_int($actual_time)) {
            $actual_time = strtotime($actual_time);
        }
        PHPUnit_Framework_TestCase::assertLessThanOrEqual(
            $precision,
            abs($actual_time - $expected_time)
        );
    }



    /**
     * tests assertTimeIsAbout
     */
    public function testAssertTimeIsAbout()
    {
        //these tests should fail
        $this->expectException('PHPUnit_Framework_ExpectationFailedException');
        $this->assertTimeIsAbout(
            current_time('timestamp'),
            current_time('timestamp') + 6,
            5
        );
        $this->expectException('PHPUnit_Framework_ExpectationFailedException');
        $this->assertTimeIsAbout(
            current_time('timestamp'),
            current_time('timestamp') - 6,
            5
        );
        $this->assertTimeIsAbout(
            current_time('timestamp'),
            current_time('timestamp') + 4,
            5
        );
        $this->assertTimeIsAbout(
            current_time('timestamp'),
            current_time('timestamp') - 3,
            5
        );
    }



    /**
     * Old Unit Tests from EE_System_Test::test_detect_request_type()
     * converted over to use new system, but test same assertions
     *
     * @throws InvalidArgumentException
     * @throws PHPUnit_Framework_Exception
     */
    public function testDetectRequestType()
    {
        $this->setEspressoDbUpdateTo(
            array(
                espresso_version() => array(current_time('mysql'))
            )
        );
        RequestTypeDetectorTest::assertRequestTypeDetails(
            AddonActivationTestsHelper::getAndDetectRequestType(
                new ActivationHistory()
            ),
            RequestType::NORMAL,
            false
        );
        //check that it detects an upgrade
        $this->setEspressoDbUpdateTo(
            array(
                $this->modifyVersion(
                    espresso_version(),
                    '0.-1.0.0.0'
                ) => array(current_time('mysql'))
            )
        );
        RequestTypeDetectorTest::assertRequestTypeDetails(
            AddonActivationTestsHelper::getAndDetectRequestType(
                new ActivationHistory()
            ),
            RequestType::UPGRADE,
            true
        );
        //check that it detects activation
        $this->setEspressoDbUpdateTo(null);
        RequestTypeDetectorTest::assertRequestTypeDetails(
            AddonActivationTestsHelper::getAndDetectRequestType(
                new ActivationHistory()
            ),
            RequestType::NEW_ACTIVATION,
            true
        );
        //check that it detects downgrade, even though we don't really care atm
        $this->setEspressoDbUpdateTo(
            array(
                $this->modifyVersion(
                    espresso_version(),
                    '0.1.0.0.0'
                ) => array(current_time('mysql'))
            )
        );
        RequestTypeDetectorTest::assertRequestTypeDetails(
            AddonActivationTestsHelper::getAndDetectRequestType(
                new ActivationHistory()
            ),
            RequestType::DOWNGRADE,
            true
        );
        //lastly, check that we detect reactivations
        update_option(ActivationHistory::EE_ACTIVATION_INDICATOR_OPTION_NAME, true);
        $this->setEspressoDbUpdateTo(
            array(
                espresso_version() => array(current_time('mysql'))
            )
        );
        RequestTypeDetectorTest::assertRequestTypeDetails(
            AddonActivationTestsHelper::getAndDetectRequestType(
                new ActivationHistory()
            ),
            RequestType::REACTIVATION,
            false
        );
    }



    /**
     * check things turn out as expected for NORMAL REQUEST
     *
     * @throws \InvalidArgumentException
     */
    public function testDetectActivationOrUpgradeNormal()
    {
        delete_option(ActivationHistory::EE_ACTIVATION_INDICATOR_OPTION_NAME);
        $this->setEspressoDbUpdateTo(
            array(
                espresso_version() => array(current_time('mysql'))
            )
        );
        $current_activation_history_before = get_option(ActivationHistory::EE_ACTIVATION_HISTORY_OPTION_NAME);
        PHPUnit_Framework_TestCase::assertCount(
            1,
            $current_activation_history_before[espresso_version()]
        );
        $request_type = AddonActivationTestsHelper::getAndDetectRequestType(
            new ActivationHistory()
        );
        $current_activation_history_after = get_option(ActivationHistory::EE_ACTIVATION_HISTORY_OPTION_NAME);
        //this should have just added to the number of times this same version was activated
        PHPUnit_Framework_TestCase::assertEquals(RequestType::NORMAL, $request_type->getRequestType());
        PHPUnit_Framework_TestCase::assertArrayHasKey(espresso_version(), $current_activation_history_after);
        $this->assertTimeIsAbout(
            current_time('timestamp'),
            $current_activation_history_after[espresso_version()][0]
        );
    }



    /**
     * new activation
     *
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \InvalidArgumentException
     */
    public function test_detect_activation_or_upgrade__new_install()
    {
        // remove_action(
        //     'AHEE__EE_System__perform_activations_upgrades_and_migrations',
        //     array(ActivationsAndUpgradesManager, 'initialize_db_if_no_migrations_required')
        // );
        $this->setEspressoDbUpdateTo(null);
        //pretend the activation indicator option was set (because it's really unusual
        //for a plugin to be activated without having WP call its activation hook)
        update_option(ActivationHistory::EE_ACTIVATION_INDICATOR_OPTION_NAME, true);
        $this->assertWPOptionDoesNotExist(ActivationHistory::EE_ACTIVATION_HISTORY_OPTION_NAME);
        $activation_history = new ActivationHistory();
        $request_type = AddonActivationTestsHelper::getAndDetectRequestType($activation_history);
        $activation_history->updateActivationHistory();
        PHPUnit_Framework_TestCase::assertEquals(
            RequestType::NEW_ACTIVATION,
            $request_type->getRequestType()
        );
        $current_activation_history = get_option(ActivationHistory::EE_ACTIVATION_HISTORY_OPTION_NAME);
        //check we've added this to the version history
        //and that the hook for adding tables n stuff was added
        PHPUnit_Framework_TestCase::assertArrayHasKey(espresso_version(), $current_activation_history);
        $this->assertTimeIsAbout(
            current_time('timestamp'),
            $current_activation_history[espresso_version()][0]
        );
        // has_action(
        //     'AHEE__EE_System__perform_activations_upgrades_and_migrations',
        //     array(ActivationsAndUpgradesManager, 'initialize_db_if_no_migrations_required')
        // );
        //and the activation indicator option should have been removed
        $this->assertWPOptionDoesNotExist(ActivationHistory::EE_ACTIVATION_INDICATOR_OPTION_NAME);
    }

}
// Location: ActivationIntegrationTests.php

<?php

use EventEspresso\core\services\activation\RequestType;
use EventEspresso\tests\mocks\core\services\activation\ActivationHistoryExtendedMock;
use EventEspresso\tests\mocks\core\services\activation\RequestTypeDetectorMock;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}
/**
 * EE_System_Test
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */



/**
 * @group core
 * @group activation
 */
class EE_System_Test extends EE_UnitTestCase
{

    protected $_mock_addon_name = 'New_Addon';

    /**
     * @var ActivationHistoryExtendedMock $activation_history_mock
     */
    protected $activation_history_mock;

    /**
     * @var RequestTypeDetectorMock $request_type_detector_mock
     */
    protected $request_type_detector_mock;

    /**
     * @var RequestType $request_type
     */
    protected $request_type;

    /**
     * remember the espresso_db_update's option before these tests
     */
    public function setUp()
    {
        parent::setUp();
        $this->activation_history_mock    = new ActivationHistoryExtendedMock(
            ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_HISTORY_OPTION_NAME,
            ActivationHistoryExtendedMock::EE_ADDON_ACTIVATION_INDICATOR_OPTION_NAME,
            espresso_version()
        );
        $this->request_type_detector_mock = new RequestTypeDetectorMock();
        EE_System::reset();
    }


    public function test_detect_request_type()
    {
        $this->_pretend_espresso_db_update_is(
            array(espresso_version() => array(current_time('mysql')))
        );
        $this->assertEquals(EE_System::req_type_normal, $this->getRequestTypeValue());
        //check that it detects an upgrade
        $this->_pretend_espresso_db_update_is(
            array(
                $this->_add_to_version(espresso_version(), '0.-1.0.0.0') => array(
                    current_time('mysql')
                ),
            )
        );
        $this->assertEquals(EE_System::req_type_upgrade, $this->getRequestTypeValue());
        //check that it detects activation
        $this->_pretend_espresso_db_update_is(null);
        $this->assertEquals(EE_System::req_type_new_activation, $this->getRequestTypeValue());

        //check that it detects downgrade, even though we don't really care atm
        EE_System::reset();
        $this->_pretend_espresso_db_update_is(
            array(
            $this->_add_to_version(espresso_version(), '0.1.0.0.0') => array(
                    current_time('mysql')
                )
            )
        );
        $this->assertEquals(EE_System::req_type_downgrade, $this->getRequestTypeValue());
        //lastly, check that we detect reactivations
        $this->activation_history_mock->setActivationIndicator();
        $this->_pretend_espresso_db_update_is(
            array(espresso_version() => array(current_time('mysql')))
        );
        $this->assertEquals(EE_System::req_type_reactivation, $this->getRequestTypeValue());
    }


    /**
     * just tests the EE_System_Test::_add_to_version private method to make sure it's working
     * (because other tests depend on it)
     */
    public function test_add_to_version()
    {
        $version        = '4.3.2.alpha.001';
        $version_to_add = '1.0.-1.1.1';
        $new_version    = $this->_add_to_version($version, $version_to_add);
        $this->assertEquals('5.3.1.alpha.002', $new_version);
    }


    /**
     * check things turn out as expected for NORMAL REQUEST
     */
    public function test_detect_activation_or_upgrade__normal()
    {
        $this->activation_history_mock->deleteActivationIndicator();
        $this->_pretend_espresso_db_update_is(
            array(espresso_version() => array(current_time('mysql')))
        );
        $version_history_before = $this->activation_history_mock->getMockVersionHistoryOption();
        $this->activation_history_mock->setMockVersionHistory($version_history_before);
        $this->request_type_detector_mock->resolveRequestTypeFromActivationHistory(
            $this->activation_history_mock
        );
        $this->assertCount(1, $version_history_before[espresso_version()]);
        $version_history_after = $this->activation_history_mock->getMockVersionHistoryOption();
        //this should have just added to the number of times this same version was activated
        $this->assertEquals(EE_System::req_type_normal, $this->getRequestTypeValue());
        $this->assertArrayHasKey(espresso_version(), $version_history_after);
        $this->assertTimeIsAbout(
            current_time('timestamp'),
            $version_history_after[espresso_version()][0]
        );
    }


    /**
     * new activation
     */
    public function test_detect_activation_or_upgrade__new_install()
    {
        $this->_pretend_espresso_db_update_is(null);
        //pretend the activation indicator option was set (because it's really unusual
        //for a plugin to be activated without having WP call its activation hook)
        $this->activation_history_mock->setActivationIndicator();
        remove_action(
            'AHEE__EE_System__perform_activations_upgrades_and_migrations',
            array(EE_System::instance(), 'initialize_db_if_no_migrations_required')
        );
        $this->assertWPOptionDoesNotExist('espresso_db_update');
        EE_System::reset()->detect_if_activation_or_upgrade();
        $current_activation_history = get_option('espresso_db_update');
        //check we've added this to the version history
        //and that the hook for adding tables n stuff was added
        $this->assertArrayHasKey(espresso_version(), $current_activation_history);
        $this->assertTimeIsAbout(current_time('timestamp'), $current_activation_history[espresso_version()][0]);
        has_action(
            'AHEE__EE_System__perform_activations_upgrades_and_migrations',
            array(EE_System::instance(), 'initialize_db_if_no_migrations_required')
        );
        //and the activation indicator option should have been removed
        $this->assertWPOptionDoesNotExist('ee_espresso_activation');
    }


    /**
     * tests EE_System_Test::assertTimeIsAbout
     */
    public function test_assertTimeIsAbout()
    {
        //these tests should fail
        try {
            $this->assertTimeIsAbout(current_time('timestamp'), current_time('timestamp') + 6, 5);
        } catch (PHPUnit_Framework_ExpectationFailedException $e) {
            $this->assertTrue(true);
        }
        try {
            $this->assertTimeIsAbout(current_time('timestamp'), current_time('timestamp') - 6, 5);
        } catch (PHPUnit_Framework_ExpectationFailedException $e) {
            $this->assertTrue(true);
        }
        $this->assertTimeIsAbout(current_time('timestamp'), current_time('timestamp') + 4, 5);
        $this->assertTimeIsAbout(current_time('timestamp'), current_time('timestamp') - 3, 5);
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
            $expected_time = (int) strtotime($expected_time);
        }
        if (! is_int($actual_time)) {
            $actual_time = (int) strtotime($actual_time);
        }
        $this->assertLessThanOrEqual($precision, abs($actual_time - $expected_time));
    }


    /**
     * tests we can detect an upgrade when the plugin is deactivated, then a new version of the plugin
     * is uploaded, and then activated (ie, the plugin's activation hook was fired)
     */
    public function test_detect_activation_or_upgrade__upgrade_upon_activation()
    {
        $pretend_previous_version = $this->_add_to_version(espresso_version(), '0.-1.0.0.0');
        $this->_pretend_espresso_db_update_is(
            array(
                $pretend_previous_version => array(current_time('mysql')),
            )
        );
        //pretend the activation indicator option was set (because it's really unusual
        //for a plugin to be activated without having WP call its activation hook)
        $this->activation_history_mock->setActivationIndicator();
        EE_System::reset()->detect_if_activation_or_upgrade();
        $current_activation_history = get_option('espresso_db_update');
        $this->assertEquals(EE_System::req_type_upgrade, $this->getRequestTypeValue());
        $this->assertArrayHasKey($pretend_previous_version, $current_activation_history);
        $this->assertTimeIsAbout(current_time('timestamp'), $current_activation_history[$pretend_previous_version][0]);
        $this->assertArrayHasKey(espresso_version(), $current_activation_history);
        $this->assertTimeIsAbout(current_time('timestamp'), $current_activation_history[espresso_version()][0]);
        $this->assertWPOptionDoesNotExist('ee_espresso_activation');
    }


    /**
     * tests we can detect an upgrade when the plugin files were automatically
     * updated (ie, the plugins' activation hook wasn't called)
     */
    public function test_detect_activation_or_upgrade__upgrade_upon_normal_request()
    {
        $pretend_previous_version = $this->_add_to_version(espresso_version(), '0.-1.0.0.0');
        $this->_pretend_espresso_db_update_is(
            array(
                $pretend_previous_version => array(current_time('mysql')),
            )
        );
        $this->assertEquals(EE_System::req_type_upgrade, EE_System::reset()->detect_req_type());
        $current_activation_history = get_option('espresso_db_update');
        $this->assertArrayHasKey($pretend_previous_version, $current_activation_history);
        $this->assertTimeIsAbout(current_time('timestamp'), $current_activation_history[$pretend_previous_version][0]);
        $this->assertArrayHasKey(espresso_version(), $current_activation_history);
        $this->assertTimeIsAbout(current_time('timestamp'), $current_activation_history[espresso_version()][0]);
        $this->assertWPOptionDoesNotExist('ee_espresso_activation');
    }


    public function test_detect_activation_or_upgrade__reactivation()
    {
        $this->_pretend_espresso_db_update_is(
            array(
                espresso_version() => array(current_time('mysql')),
            )
        );
        $this->activation_history_mock->setActivationIndicator();
        $this->assertEquals(EE_System::req_type_reactivation, EE_System::reset()->detect_req_type());
        $current_activation_history = get_option('espresso_db_update');
        //		$this->assertEquals(array(espresso_version() =>array(current_time('mysql'),current_time('mysql'))),$current_activation_history);
        $this->assertArrayHasKey(espresso_version(), $current_activation_history);
        $this->assertTimeIsAbout(current_time('timestamp'), $current_activation_history[espresso_version()][0]);
        $this->assertTimeIsAbout(current_time('timestamp'), $current_activation_history[espresso_version()][1]);
        $this->assertWPOptionDoesNotExist('ee_espresso_activation');
    }


    public function test_detect_activation_or_upgrade__downgrade_upon_normal_request()
    {
        $pretend_previous_version = $this->_add_to_version(espresso_version(), '0.1.0.0.0');
        $this->_pretend_espresso_db_update_is(
            array(
                $pretend_previous_version => array(current_time('mysql')),
            )
        );
        $this->assertEquals(EE_System::req_type_downgrade, EE_System::reset()->detect_req_type());
        $current_activation_history = get_option('espresso_db_update');
        $this->assertArrayHasKey($pretend_previous_version, $current_activation_history);
        $this->assertTimeIsAbout(current_time('timestamp'), $current_activation_history[$pretend_previous_version][0]);
        $this->assertArrayHasKey(espresso_version(), $current_activation_history);
        $this->assertTimeIsAbout(current_time('timestamp'), $current_activation_history[espresso_version()][0]);
        $this->assertWPOptionDoesNotExist('ee_espresso_activation');
    }


    /**
     * tests that we're detecting request types correctly on normal requests (ie, NOT an activation request)
     * A new install would only occur on a non-activation request because the site was previously in maintenance mode
     */
    public function test_detect_req_type_given_activation_history__on_normal_requests()
    {
        $activation_history = array();
        //detect brand new activation BUT we're in maintenance mode, so it will be basically ignored
        EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_2_complete_maintenance);
        $this->assertEquals(
            EE_System::req_type_new_activation,
            EE_System::detect_req_type_given_activation_history(
                $activation_history,
                '',
                '1.0.0.dev.000'
            )
        );
        EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
        //detect brand new activation
        $this->assertEquals(
            EE_System::req_type_new_activation,
            EE_System::detect_req_type_given_activation_history(
                $activation_history,
                '',
                '1.0.0.dev.000'
            )
        );
        $activation_history['1.0.0.dev.000'] = array(date('Y-m-d H:i:s'));
        //detect upgrade to NEW version
        $this->assertEquals(
            EE_System::req_type_upgrade,
            EE_System::detect_req_type_given_activation_history(
                $activation_history,
                '',
                '1.2.0.dev.000'
            )
        );
        $activation_history['1.2.0.dev.000'] = array(date('Y-m-d H:i:s', time() + 1));
        //detect normal request
        $this->assertEquals(
            EE_System::req_type_normal,
            EE_System::detect_req_type_given_activation_history(
                $activation_history,
                '',
                '1.2.0.dev.000'
            )
        );
        //detect downgrade to NEW version
        $this->assertEquals(
            EE_System::req_type_downgrade,
            EE_System::detect_req_type_given_activation_history(
                $activation_history,
                '',
                '1.1.0.dev.000'
            )
        );
        $activation_history['1.1.0.dev.000'] = array(date('Y-m-d H:i:s', time() + 2));
        //detect downgrade to KNOWN version
        $this->assertEquals(
            EE_System::req_type_downgrade,
            EE_System::detect_req_type_given_activation_history(
                $activation_history,
                '',
                '1.0.0.dev.000'
            )
        );
        $activation_history['1.0.0.dev.000'][] = date('Y-m-d H:i:s', time() + 3);
        //detect upgrade to KNOWN version
        $this->assertEquals(
            EE_System::req_type_upgrade,
            EE_System::detect_req_type_given_activation_history(
                $activation_history,
                '',
                '1.1.0.dev.000'
            )
        );
        $activation_history['1.1.0.dev.000'][] = date('Y-m-d H:i:s', time() + 4);
    }


    /**
     * tests that we are detecting activations correctly even when the same version has
     * been activated multiple times
     */
    public function test_detect_req_type_given_activation_history__multiple_activations()
    {
        $activation_history = array(
            '3.1.36.5.P'      => array('unknown-date'),
            '4.3.0.alpha.019' => array('2014-06-09 18:10:35',),
            '4.6.0.dev.016'   => array(
                '2014-10-15 15:43:08',
                '2014-10-15 18:16:41',
                '2014-10-15 20:09:07',
            ),
            '4.5.0.beta.020'  => array(
                '2014-10-15 16:52:35',
            ),
        );
        $this->assertEquals(
            EE_System::req_type_downgrade,
            EE_System::detect_req_type_given_activation_history(
                $activation_history,
                '',
                '4.5.0.beta.020'
            )
        );
    }


    /**
     *
     */
    public function test_detect_req_type_given_activation_history__on_activation()
    {
        $activation_history = array();
        update_option('test_activation_indicator_option', true);
        //detect brand new activation
        $this->assertEquals(
            EE_System::req_type_new_activation,
            EE_System::detect_req_type_given_activation_history(
                $activation_history,
                'test_activation_indicator_option',
                '1.0.0.dev.000'
            )
        );
        $activation_history['1.0.0.dev.000'] = array(date('Y-m-d H:i:s'));
        update_option('test_activation_indicator_option', true);
        //detect upgrade to NEW version
        $this->assertEquals(
            EE_System::req_type_upgrade,
            EE_System::detect_req_type_given_activation_history(
                $activation_history,
                'test_activation_indicator_option',
                '1.2.0.dev.000'
            )
        );
        $activation_history['1.2.0.dev.000'] = array(date('Y-m-d H:i:s', time() + 1));
        update_option('test_activation_indicator_option', true);
        //detect reactivation request; WOULD be a normal request if the activation indicator weren't set
        $this->assertEquals(
            EE_System::req_type_reactivation,
            EE_System::detect_req_type_given_activation_history(
                $activation_history,
                'test_activation_indicator_option',
                '1.2.0.dev.000'
            )
        );
        //detect downgrade to NEW version
        $this->assertEquals(
            EE_System::req_type_downgrade,
            EE_System::detect_req_type_given_activation_history(
                $activation_history,
                'test_activation_indicator_option',
                '1.1.0.dev.000'
            )
        );
        $activation_history['1.1.0.dev.000'] = array(date('Y-m-d H:i:s', time() + 2));
        update_option('test_activation_indicator_option', true);
        //detect downgrade to KNOWN version
        $this->assertEquals(
            EE_System::req_type_downgrade,
            EE_System::detect_req_type_given_activation_history(
                $activation_history,
                'test_activation_indicator_option',
                '1.0.0.dev.000'
            )
        );
        $activation_history['1.0.0.dev.000'][] = date('Y-m-d H:i:s', time() + 3);
        update_option('test_activation_indicator_option', true);
        //detect upgrade to KNOWN version
        $this->assertEquals(
            EE_System::req_type_upgrade,
            EE_System::detect_req_type_given_activation_history(
                $activation_history,
                'test_activation_indicator_option',
                '1.1.0.dev.000'
            )
        );
        $activation_history['1.1.0.dev.000'][] = date('Y-m-d H:i:s', time() + 4);
        update_option('test_activation_indicator_option', true);
    }


    /**
     * @group 8154
     */
    public function test__new_version_is_higher()
    {
        $this->activation_history_mock->setMockVersionHistory(
            array(
                '4.7.0.rc.000' => array(
                    '2015-03-12 04:53:12',
                ),
                '3.1.37.1.P'   =>
                    array(
                        0 => 'unknown-date',
                    ),
            )
        );
        // current version
        $this->activation_history_mock->setCurrentVersion('4.7.0.rc.000');
        $this->assertEquals(
            0,
            $this->request_type_detector_mock->versionChange($this->activation_history_mock)
        );
        //newer version
        $this->activation_history_mock->setCurrentVersion('4.8.0.rc.000');
        $this->assertEquals(
            1,
            $this->request_type_detector_mock->versionChange($this->activation_history_mock)
        );
        //older version
        $this->activation_history_mock->setCurrentVersion('4.4.0.rc.000');
        $this->assertEquals(
            -1,
            $this->request_type_detector_mock->versionChange($this->activation_history_mock)
        );
        //newer version again
        $this->activation_history_mock->setCurrentVersion('4.8.0.rc.000');
        $this->assertEquals(
            1,
            $this->request_type_detector_mock->versionChange($this->activation_history_mock)
        );
    }


    /**
     * @return int
     * @throws InvalidArgumentException
     */
    private function getRequestTypeValue() {
        $this->request_type = $this->request_type_detector_mock->resolveRequestTypeFromActivationHistory(
        $this->activation_history_mock
        );
        return $this->request_type->getRequestType();
    }


    /**
     * Sets the WordPress option 'espresso_db_update'
     *
     * @param array $version_history top-level-keys should be version numbers,
     *                                   and their values should be an array of mysql datetimes when that version was
     *                                   activated
     */
    private function _pretend_espresso_db_update_is($version_history)
    {
        if ($version_history === null) {
            $this->activation_history_mock->deleteActivationHistory();
        } else {
            $this->activation_history_mock->setMockVersionHistory($version_history);
        }
    }


    /**
     * @param string $version_string        eg "4.3.2.alpha.003
     * @param string $version_amount_to_add eg "0.0.0.0.1"
     * @return string eg if given the mentioned inputs, would be "4.3.2.alpha.4";
     */
    private function _add_to_version($version_string, $version_amount_to_add = '0.1.0.0.0')
    {
        $version_parts               = explode(".", $version_string);
        $version_amount_to_add_parts = explode(".", $version_amount_to_add);
        foreach ($version_parts as $key => $version_part) {
            if (is_numeric($version_part)) {
                $characters_in_version_part = strlen($version_part);
                $version_parts[$key]        = str_pad(
                    $version_parts[$key] + $version_amount_to_add_parts[$key],
                    $characters_in_version_part,
                    '0',
                    STR_PAD_LEFT
                );
            }
        }
        return implode(".", $version_parts);
    }


    /**
     * restore the epsresso_db_update option
     */
    public function tearDown()
    {
        // update_option('espresso_db_update', $this->_original_espresso_db_update);
        EE_System::reset()->detect_req_type();
        EE_Data_Migration_Manager::reset();
        // update_option(EE_Data_Migration_Manager::current_database_state, $this->_original_db_state);
        parent::tearDown();
    }
}

// End of file EE_System_Test.php

<?php
/**
 * EE's extension of WP_UnitTestCase for writing all EE_Tests
 *
 * @since        4.3.0
 * @package        Event Espresso
 * @subpackage    tests
 */

use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * This is used to override any existing WP_UnitTestCase methods that need specific handling in EE.  We
 * can also add additional methods in here for EE tests (that are used frequently)
 *
 * @since        4.3.0
 * @package        Event Espresso
 * @subpackage    tests
 */
class EE_UnitTestCase extends WP_UnitTestCase
{

    /**
     * @var EE_UnitTest_Factory
     */
    public $factory;

    /**
     * Should be used to store the global $wp_actions during a test
     * so that it can be restored afterwards to keep tests from interfere with each other
     * @var array
     */
    protected $wp_filters_saved = NULL;
    const error_code_undefined_property = 8;
    protected $_cached_SERVER_NAME = NULL;
    /**
     *
     * @var WP_User
     */
    protected $_orig_current_user;

    /**
     * Boolean indicating we've already noted an accidental txn commit and we don't need to
     * keep checking or warning the test runner about it
     * @var boolean
     */
    public static $accidental_txn_commit_noted = FALSE;


    /**
     * Holds an array of default DateTime objects for testing with.
     * This is set via the _set_default_dates() method.  Child test classes that wish to use this much set it first
     * using the method.
     *
     * @var array.
     */
    protected $_default_dates;


    /**
     * @var EE_Test_Scenario_Factory
     */
    public $scenarios;


    /**
     * basically used for displaying the test case class while tests are running.
     * this can be helpful if you are getting weird errors happening,
     * but the test name is not being reported anywhere.
     * Just uncomment this method as well as the first line of setUp() below.
     *
     * @throws \EE_Error
     */
    // public static function setUpBeforeClass() {
    //     echo "\n\n\n" . get_called_class() . "\n\n";
    //     parent::setUpBeforeClass();
    //     \EventEspresso\core\services\Benchmark::startTimer(get_called_class());
    // }

    // public static function tearDownAfterClass() {
    //     // echo "\n\n\n" . get_called_class() . "\n\n";
    //     \EventEspresso\core\services\Benchmark::stopTimer(get_called_class());
    //     parent::tearDownAfterClass();
    // }


    public function setUp()
    {
        // echo "\n\n" . strtoupper($this->getName()) . '()';
        //save the hooks state before WP_UnitTestCase actually gets its hands on it...
        //as it immediately adds a few hooks we might not want to backup
        global $auto_made_thing_seed, $wp_filter, $wp_actions, $merged_filters, $wp_current_filter, $wpdb, $current_user;
        $this->wp_filters_saved = array(
            'wp_filter' => $wp_filter,
            'wp_actions' => $wp_actions,
            'merged_filters' => $merged_filters,
            'wp_current_filter' => $wp_current_filter
        );
        $this->_orig_current_user = $current_user instanceof WP_User ? clone $current_user : new WP_User(1);
        parent::setUp();
        $auto_made_thing_seed = 1;
        //reset wpdb's list of queries executed so it only stores those from the current test
        $wpdb->queries = array();
        //the accidental txn commit indicator option shouldn't be set from the previous test
        update_option('accidental_txn_commit_indicator', TRUE);

        // Fake WP mail globals, to avoid errors
        add_filter('wp_mail', array($this, 'setUp_wp_mail'));
        add_filter('wp_mail_from', array($this, 'tearDown_wp_mail'));
        add_filter('FHEE__EEH_Activation__create_table__short_circuit', '__return_true');
        add_filter('FHEE__EEH_Activation__add_column_if_it_doesnt_exist__short_circuit', '__return_true');
        add_filter('FHEE__EEH_Activation__drop_index__short_circuit', '__return_true');

        // load factories
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_TESTS_DIR . 'includes/factories');
        $this->factory = new EE_UnitTest_Factory();

        //IF we detect we're running tests on WP4.1, then we need to make sure current_user_can tests pass by implementing
        //updating all_caps when `WP_User::add_cap` is run (which is fixed in later wp versions).  So we hook into the
        // 'user_has_cap' filter to do this
        $_wp_test_version = getenv('WP_VERSION');
        if ($_wp_test_version && $_wp_test_version === '4.1') {
            add_filter('user_has_cap', function ($all_caps, $caps, $args, WP_User $WP_User) {
                $WP_User->get_role_caps();

                return $WP_User->allcaps;
            }, 10, 4);
        }
        //tell EE_Registry to do a hard reset
        add_filter( 'FHEE__EE_Registry__reset__hard', '__return_true');
        do_action('AHEE__EventEspresso_core_services_loaders_CachingLoader__resetCache');
        // turn off caching for any loaders in use during tests
        add_filter('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache', '__return_true');
    }


    /**
     * @param bool $short_circuit
     * @param string $table_name
     * @param string $sql
     * @return bool
     */
    public function _short_circuit_db_implicit_commits($short_circuit = FALSE, $table_name, $sql)
    {
        $whitelisted_tables = apply_filters('FHEE__EE_UnitTestCase__short_circuit_db_implicit_commits__whitelisted_tables', array());
        if (in_array($table_name, $whitelisted_tables, true)) {
            //it's not altering. it's ok
            return FALSE;
        } else {
            return TRUE;
        }
    }

    public function tearDown()
    {
        parent::tearDown();
        global $wp_filter, $wp_actions, $merged_filters, $wp_current_filter, $current_user;
        $wp_filter = $this->wp_filters_saved['wp_filter'];
        $wp_actions = $this->wp_filters_saved['wp_actions'];
        $merged_filters = $this->wp_filters_saved['merged_filters'];
        $wp_current_filter = $this->wp_filters_saved['wp_current_filter'];
        $current_user = $this->_orig_current_user;
        $this->_detect_accidental_txn_commit();
        $notices = EE_Error::get_notices(false, false, true);
        EE_Error::reset_notices();
        if (!empty($notices['errors'])) {
            $error_message = sprintf(
                'The following error(s) occurred during test "%1$s" : %2$s',
                get_called_class() . '::' . $this->getName() . '()',
                "\n" . $notices['errors']
            );
            $this->fail($error_message);
            // if you need a stack trace for the above, then uncomment the following
            // it won't be entirely accurate, but might help
            // throw new Exception( $error_message );
        }
        // turn caching back on for any loaders in use
        remove_all_filters('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache');
    }

    protected function loadTestScenarios()
    {
        // load scenarios
        require_once EE_TESTS_DIR . 'includes/scenarios/EE_Test_Scenario_Classes.php';
        $this->scenarios = new EE_Test_Scenario_Factory($this);
    }

    /**
     * Detects whether or not a MYSQL query was issued which caused an implicit commit
     * (or an explicit one). Basically, we can't do a commit mid-test because it messes
     * up the test's state (which means the database state at the time of the commit will
     * become the new starting state for all future tests, which will likely cause hard-to-find
     * bugs, and makes test results dependent on order of execution)
     * @global WPDB $wpdb
     * @throws EE_Error
     */
    protected function _detect_accidental_txn_commit()
    {
        //for some reason WP waits until the start of the next test to do this. but
        //we prefer to do it now so that we can check for implicit commits
        $this->clean_up_global_scope();
        //now we can check if there was an accidental implicit commit
        if (!self::$accidental_txn_commit_noted && get_option('accidental_txn_commit_indicator', FALSE)) {
            global $wpdb;
            self::$accidental_txn_commit_noted = TRUE;
            throw new EE_Error(sprintf(__("Accidental MySQL Commit was issued sometime during the previous test. This means we couldn't properly restore database to its pre-test state. If this doesnt create problems now it probably will later! Read up on MySQL commits, especially Implicit Commits. Queries executed were: \r\n%s. \r\nThis accidental commit happened during %s", 'event_espresso'), print_r($wpdb->queries, TRUE), $this->getName()));
        }
    }


    /**
     *  Use this to clean up any global scope singletons etc that we may have being used by EE so
     *  that they are fresh between tests.
     *
     * @todo this of course means we need an easy way to reset our singletons...
     * @see parent::cleanup_global_scope();
     */
    public function clean_up_global_scope()
    {
        parent::clean_up_global_scope();
    }


    /**
     * Set up globals necessary to avoid errors when using wp_mail()
     */
    public function setUp_wp_mail($args)
    {
        if (isset($_SERVER['SERVER_NAME'])) {
            $this->_cached_SERVER_NAME = $_SERVER['SERVER_NAME'];
        }

        $_SERVER['SERVER_NAME'] = 'example.com';

        // passthrough
        return $args;
    }


    /**
     * Tear down globals set up in setUp_wp_mail()
     */
    public function tearDown_wp_mail($args)
    {
        if (!empty($this->_cached_SERVER_NAME)) {
            $_SERVER['SERVER_NAME'] = $this->_cached_SERVER_NAME;
            unset($this->_cached_SERVER_NAME);
        } else {
            unset($_SERVER['SERVER_NAME']);
        }

        // passthrough
        return $args;
    }


    /**
     * Helper method for setting the maintenance mode of EE to given maintenance mode
     *
     * @param int $level use to indicate which maintenance mode to set.
     * @since 4.3.0
     */
    public function setMaintenanceMode($level = 0)
    {
        EE_Registry::instance()->load_core('Maintenance_Mode');
        switch ($level) {
            case EE_Maintenance_Mode::level_0_not_in_maintenance :
                $level = EE_Maintenance_Mode::level_0_not_in_maintenance;
                break;
            case EE_Maintenance_Mode::level_1_frontend_only_maintenance :
                $level = EE_Maintenance_Mode::level_1_frontend_only_maintenance;
                break;
            case EE_Maintenance_Mode::level_2_complete_maintenance :
                $level = EE_Maintenance_Mode::level_2_complete_maintenance;
                break;
            default :
                $level = EE_Maintenance_Mode::level_0_not_in_maintenance;
                break;
        }
        update_option(EE_Maintenance_Mode::option_name_maintenance_mode, $level);
    }


    /**
     * Helper method for just setting the core config and net config on EE_Registry, so
     * configuration tests can be run.
     *
     * @since 4.3.0
     */
    public function setCoreConfig()
    {
        EE_Registry::instance()->load_core('Config');
        EE_Registry::instance()->load_core('Network_Config');
    }


    /**
     * Helper method for resetting EE_Registry->CFG and EE_Registry->NET_CFG
     *
     * @since 4.3.0
     */
    public function resetCoreConfig()
    {
        EE_Registry::instance()->CFG = NULL;
        EE_Registry::instance()->NET_CFG = NULL;
    }


    /**
     * Method that accepts an array of filter refs to clear all filters from.
     *
     * @since 4.3.0
     * @param  array $filters array of filter refs to clear. (be careful about core wp filters).
     */
    public function clearAllFilters($filters = array())
    {
        foreach ($filters as $filter) {
            remove_all_filters($filter);
        }
    }


    /**
     * Method that accepts an array of action refs to clear all actions from.
     *
     * @since 4.3.0
     * @param  array $actions array of action refs to clear. (be careful about core wp actions).
     */
    public function clearAllActions($actions = array())
    {
        foreach ($actions as $action) {
            remove_all_actions($action);
        }
    }


    /**
     * This defines EE_Admin_Constants to point to the admin mocks * folder instead of the default admin folder.  Note, you will need
     * to be careful of using this.
     *
     * @since 4.3.0
     */
    public function defineAdminConstants()
    {
        if (!defined('EE_ADMIN_PAGES')){
            define('EE_ADMIN_PAGES', EE_TESTS_DIR . 'mocks/admin');
        }
    }


    /**
     * This loads the various admin mock files required for tests.
     *
     * @since  4.3.0
     */
    public function loadAdminMocks()
    {
        require_once EE_TESTS_DIR . 'mocks/admin/EE_Admin_Mocks.php';
        require_once EE_TESTS_DIR . 'mocks/admin/admin_mock_valid/Admin_Mock_Valid_Admin_Page.core.php';
        require_once EE_TESTS_DIR . 'mocks/admin/pricing/espresso_events_Pricing_Hooks_Mock.php';
        require_once EE_TESTS_DIR . 'mocks/admin/registrations/EE_Registrations_List_Table_Mock.php';
    }


    /**
     * This loads the various admin page mock files required for tests.
     * Note these pages should be loaded on demand, because constants will be defined that will interfere with other Admin Page loading tests.
     * @since 4.6.0
     * @param string $page
     */
    public function delayedAdminPageMocks($page = '')
    {

        switch ($page) {
            case 'decaf_events' :
            case 'events' :
                require_once EE_TESTS_DIR . 'mocks/admin/events/Events_Admin_Page_Mock.php';
                break;
            case 'registrations' :
                require_once EE_TESTS_DIR . 'mocks/admin/registrations/Registrations_Admin_Page_Mock.php';
                break;
            case 'transactions' :
                require_once EE_TESTS_DIR . 'mocks/admin/transactions/Transactions_Admin_Page_Mock.php';
                break;
            case 'messages' :
                require_once EE_TESTS_DIR . 'mocks/admin/messages/Messages_Admin_Page_Mock.php';
                break;

        }
    }


    public function loadMessagesMocks()
    {
        require_once EE_TESTS_DIR . 'mocks/core/libraries/messages/validators/EE_Messages_Validator_Mock.php';
    }


    /**
     * @param array $ModelsMocks array of Model class names like "EEM_Event"
     */
    public function loadModelsMocks($ModelsMocks = array())
    {
        foreach ($ModelsMocks as $ModelsMock) {
            require_once EE_TESTS_DIR . 'mocks/core/db_models/' . $ModelsMock . '_Mock.php';
        }
    }


    /**
     * @param array $ModelFieldMocks array of Model Field class names like "EE_Datetime_Field"
     */
    public function loadModelFieldMocks($ModelFieldMocks = array())
    {
        foreach ($ModelFieldMocks as $ModelFieldMock) {
            require_once EE_TESTS_DIR . 'mocks/core/db_models/fields/' . $ModelFieldMock . '_Mock.php';
        }
    }


    /**
     * @param array $ModuleMocks array of Module class names like "EED_Single_Page_Checkout"
     */
    public function loadModuleMocks($ModuleMocks = array())
    {
        foreach ($ModuleMocks as $ModuleMock) {
            require_once EE_TESTS_DIR . 'mocks/modules/' . $ModuleMock . '_Mock.php';
        }
    }


    /**
     * This returns an array of date and time formats that are commonly used in testing.
     *
     * @return array
     */
    public function date_formats_to_test()
    {
        return array(
            'date' => array(
                'F j, Y',
                'Y-m-d',
                'm/d/Y',
                'd/m/Y',
                'j F, Y',
                'd-m-Y',
                'm-d-Y',
                'd-m Y',
                '\D\a\t\e\: Y-m-d'
            ),
            'time' => array(
                'g:i a',
                'g:i A',
                'H: i',
                'h:i:s a',
                '\T\i\m\e\: g:i a'
            )
        );
    }


    /**
     * This sets a bunch of default dates for common data properties using dates for testing.
     *
     * @param string $timezone Timezone string to initialize the times in.
     */
    protected function _set_default_dates($timezone = 'America/Vancouver')
    {
        $tz = new DateTimeZone($timezone);
        $this->_default_dates = array(
            'DTT_start' => new DateTime('2015-02-20 11:30 am', $tz),
            'DTT_end' => new DateTime('2015-02-20 2:00 pm', $tz),
            'TKT_start' => new DateTime('2015-01-30 8:00 am', $tz),
            'TKT_end' => new DateTime('2015-02-20 8:00 am', $tz)
        );
    }


    /**
     * _get_one_month_period_offset_in_days
     *
     * returns a period offset of one month
     * for example : P31D, P30D, etc
     * this can be used to calculate a date that is guaranteed to occur LAST month
     *
     * Note, the reason for using this instead of P1M is because
     * the PHP Interval for a month is calculated based on either
     * the previous or next month depending on if you are
     * subtracting or adding a date interval.
     * So subtracting a month, would subtract the number of days for the previous month,
     * and adding a month will add the number of days for the next month.
     * Example:
     * if today's date is March 31st, and you want to subtract P1M,
     * PHP would subtract the number of days in February (the previous month),
     * so 31 - 28 = 3, leaving you with a date of March 03.
     *
     * Similarly, if you were to add P1M to Feb 1st,
     * PHP would add 31 days, because the next month, March, has 31 days
     * so, Feb 1 + 31 days = March 4th or 5th depending on the leap year
     *
     * There is a weird PHP behaviour where subtracting one month
     * will result in a date remaining in March.
     * see http://php.net/manual/en/datetime.sub.php#example-2469
     *
     * @param \DateTime $now
     * @param bool $adding_interval
     * @return string
     */
    protected function _get_one_month_period_offset_in_days(DateTime $now, $adding_interval = true)
    {
        $year = (int)$now->format('Y');
        $month = (int)$now->format('n');
        $day = (int)$now->format('j');
        // determine how to increment or decrement the year and month
        if ($adding_interval && $month === 12) {
            // adding a month to december?
            $year++;
            $month = 1;
        } else if ($adding_interval) {
            $month++;
        } else if ($month === 1) {
            $year--;
            $month = 12;
        } else {
            $month--;
        }
        // create a date for the first day in the offset month (actual day doesn't really matter)
        $offset_month = new DateTime("{$year}-{$month}-01");
        // get the number of days in the offset month
        $days_in_offset_month = (int)$offset_month->format('t');
        // get the number of days in the original passed month
        $days_in_month = (int)$now->format('t');
        // now figure out what period to actually return
        // by looking at whether we are adding or subtract a time period
        // and also comparing the days in each month,
        // as well as the day of the month we are currently on
        if ($adding_interval && $day > $days_in_offset_month) {
            // add 1 month to Jan 31, but wait....
            // adding 31 days would take us into March !!!
            // so just add the number of days in February
            //echo "\n add days_in_offset_month : " . $days_in_offset_month;
            return "P{$days_in_offset_month}D";
        } else if ($adding_interval) {
            // all other additions can safely just use the number of days in the current month
            // ie: Jan 27 can add 31 days
            //echo "\n add days_in_month : " . $days_in_month;
            return "P{$days_in_month}D";
        } else if ($day > $days_in_offset_month) {
            // subtract 1 month from March 28, but wait...
            // subtracting 31 days could take us to Feb 25 !!!
            // so just subtract the day of the month we are on
            // Mar 31 - 31 = Mar 30 - 30 = Mar 29 - 29 = Feb 28 (or 29th if a leap year)
            //echo "\n subtract day : " . $day;
            return "P{$day}D";
        } else {
            // all other subtractions can safely just use the number of days in the current month
            //echo "\n subtract days_in_month : " . $days_in_month;
            return "P{$days_in_offset_month}D";
        }
    }


    /**
     * _get_date_one_month_ago
     *
     * correctly calculates a date that is slightly more than one month in the past from passed date
     *
     * @param \DateTime $now
     * @return \DateTime
     */
    protected function _get_date_one_month_ago(DateTime $now)
    {
        // clone passed date so as not to modify it
        $last_month = clone $now;
        // one month period in days
        $one_month_period = $this->_get_one_month_period_offset_in_days($last_month, false);
        // now set $last_month back by our one month period
        return $last_month->sub(new DateInterval($one_month_period));
    }


    /**
     * _get_date_one_month_from_now
     *
     * correctly calculates a date that is slightly more than one month in the future from passed date
     *
     * @param \DateTime $now
     * @return \DateTime
     */
    protected function _get_date_one_month_from_now(DateTime $now)
    {
        // clone passed date so as not to modify it
        $next_month = clone $now;
        // one month period in days
        $one_month_period = $this->_get_one_month_period_offset_in_days($next_month);
        // set $next_month ahead by our one month period
        return $next_month->add(new DateInterval($one_month_period));
    }


    /**
     * @param string $expected_date The expected date string in the given full_format date string format.
     * @param string $actual_date The actual date string in the given full_format date string format.
     * @param        $full_format
     * @param string $custom_error_message
     * @throws \EE_Error
     */
    public function assertDateWithinOneMinute($expected_date, $actual_date, $full_format, $custom_error_message = '')
    {
        //take the incoming date strings convert to datetime objects and verify they are within one minute of each other
        $expected_date_obj = date_create_from_format($full_format, $expected_date);
        $actual_date_obj = date_create_from_format($full_format, $actual_date);
        $date_parsing_error = '';
        if (!$expected_date_obj instanceof DateTime) {
            $date_parsing_error = sprintf(
                __('Expected date %1$s could not be parsed into format %2$s', 'event_espresso'),
                print_r($expected_date, true),
                $full_format
            );
        }
        if (!$actual_date_obj instanceof DateTime) {
            $date_parsing_error = sprintf(
                __('Actual date %1$s could not be parsed into format %2$s', 'event_espresso'),
                print_r($actual_date, true),
                $full_format
            );
        }
        if ($date_parsing_error) {
            throw new EE_Error($date_parsing_error);
        }
        $difference = $actual_date_obj->format('U') - $expected_date_obj->format('U');
        $custom_error_message = !empty($custom_error_message)
            ? $custom_error_message
            : sprintf(
                __(
                    'The expected date "%1$s" differs from the actual date "%2$s" by more than one minute',
                    'event_espresso'
                ),
                print_r($expected_date, true),
                print_r($actual_date, true)
            );
        $this->assertTrue($difference < 60, $custom_error_message);
    }


    /**
     * This sets up some save data for use in testing updates and saves via the event editor.
     *
     * @todo Add extra event data for testing event creation/save.
     * @param string $format The format used for incoming date strings.
     * @param string $prefix A string to prefix the fields being assembled.  Used as a way of
     *                                differentiating between multiple calls.
     * @param string $row Equals the value we want to give for row.
     * @param string $timezone Timezone string to add to the timezone data point.  Remember that
     *                                $this->_default_date() datetime objects are used for the default dates, so if
     *                                you include a string here make sure it matches what you set used for setting
     *                                _default_dates unless you are intentionally testing timezone mismatches.
     *
     * @return array of data in post format from the save action.
     */
    protected function _get_save_data($format = 'Y-m-d h:i a', $prefix = '', $row = '1', $timezone = 'America/Vancouver')
    {
        $data = array(
            'starting_ticket_datetime_rows' => array(
                $row => ''
            ),
            'ticket_datetime_rows' => array(
                $row => '1'
            ),
            'datetime_IDs' => '',
            'edit_event_datetimes' => array(
                $row => array(
                    'DTT_EVT_end' => $this->_default_dates['DTT_end']->format($format),
                    'DTT_EVT_start' => $this->_default_dates['DTT_start']->format($format),
                    'DTT_ID' => '0',
                    'DTT_name' => $prefix . ' Datetime A',
                    'DTT_description' => $prefix . ' Lorem Ipsum Emitetad',
                    'DTT_reg_limit' => '',
                    'DTT_order' => $row
                )
            ),
            'edit_tickets' => array(
                $row => array(
                    'TKT_ID' => '0',
                    'TKT_base_price' => '0',
                    'TKT_base_price_ID' => '1',
                    'TTM_ID' => '0',
                    'TKT_name' => $prefix . ' Ticket A',
                    'TKT_description' => $prefix . ' Lorem Ipsum Tekcit',
                    'TKT_start_date' => $this->_default_dates['TKT_start']->format($format),
                    'TKT_end_date' => $this->_default_dates['TKT_end']->format($format),
                    'TKT_qty' => '',
                    'TKT_uses' => '',
                    'TKT_min' => '',
                    'TKT_max' => '',
                    'TKT_row' => '',
                    'TKT_order' => $row,
                    'TKT_taxable' => '0',
                    'TKT_required' => '0',
                    'TKT_price' => '0',
                    'TKT_is_default' => '0'
                )
            ),
            'edit_prices' => array(
                $row => array(
                    'PRT_ID' => '1',
                    'PRC_ID' => '0',
                    'PRC_amount' => '0',
                    'PRC_name' => $prefix . ' Price A',
                    'PRC_desc' => $prefix . ' Lorem Ipsum Ecirp',
                    'PRC_is_default' => '1',
                    'PRC_order' => $row
                )
            ),
            'timezone_string' => $timezone
        );
        return $data;
    }


    /**
     * IT would be better to add a constraint and do this properly at some point
     * @param mixed $item
     * @param       $haystack
     */
    public function assertArrayContains($item, $haystack)
    {
        $in_there = in_array($item, $haystack, true);
        if ($in_there) {
            $this->assertTrue(true);
        } else {
            $this->assertTrue($in_there, sprintf(__('Array %1$s does not contain %2$s', 'event_espresso'), print_r($haystack, true), print_r($item, true)));
        }
    }


    /**
     * @param $item
     * @param $haystack
     */
    public function assertArrayDoesNotContain($item, $haystack)
    {
        $not_in_there = !in_array($item, $haystack, true);
        if ($not_in_there) {
            $this->assertTrue($not_in_there);
        } else {
            $this->assertTrue($not_in_there, sprintf(__('Array %1$s DOES contain %2$s when it shouldn\'t', 'event_espresso'), print_r($haystack, true), print_r($item, true)));
        }
    }

    /**
     *
     * @param string $option_name
     */
    public function assertWPOptionExists($option_name)
    {
        $option = get_option($option_name, NULL);
        if ($option) {
            $this->assertTrue(true);
        } else {
            $this->assertNotNull($option, sprintf(__('The WP Option "%s" does not exist but should', 'event_espresso'), $option_name));
        }
    }


    /**
     * @param $option_name
     */
    public function assertWPOptionDoesNotExist($option_name)
    {
        $option = get_option($option_name, NULL);
        if ($option) {
            $this->assertNull($option, sprintf(__('The WP Option "%s" exists but shouldn\'t', 'event_espresso'), $option_name));
        } else {
            $this->assertTrue(true);
        }
    }



    /**
     * Compares two EE model objects by just looking at their field's values. If you want strict comparison just use ordinary '==='.
     * If you pass it two arrays of EE objects, that works too
     *
     * @param EE_Base_Class|EE_Base_Class[] $expected_object
     * @param EE_Base_Class|EE_Base_Class[] $actual_object
     * @throws \EE_Error
     */
    public function assertEEModelObjectsEquals($expected_object, $actual_object)
    {
        if (is_array($expected_object)) {
            $this->assertTrue(is_array($actual_object));
            foreach ($expected_object as $single_expected_object) {
                $this->assertEEModelObjectsEquals($single_expected_object, array_shift($actual_object));
            }
        } else {
            $this->assertInstanceOf('EE_Base_Class', $expected_object);
            $this->assertInstanceOf('EE_Base_Class', $actual_object);
            $this->assertEquals(get_class($expected_object), get_class($actual_object));
            foreach ($expected_object->model_field_array() as $field_name => $expected_value) {
                $actual_value = $actual_object->get($field_name);
                if ($expected_value !== $actual_value) {
                    $this->fail(
                        sprintf(
                            __('EE objects for the field %4$s of class "%1$s" did not match. They were: %2$s and %3$s.  The values for the field were %5$s and %6$s', 'event_espresso'),
                            get_class($expected_object),
                            print_r($expected_object->model_field_array(), true),
                            print_r($actual_object->model_field_array(), true),
                            $field_name,
                            print_r($expected_value, true),
                            print_r($actual_value, true)
                        )
                    );
                }
            }
        }
    }

    /**
     * Compares HTML, ignoring whitespace differences; also tries to make differences
     * more obvious for comparison in PHPUnit results.
     * Ideally this would actually parse the HTML, and just verify its functionality equivalent.
     * Eg, ignore case differences,unnecessary whitespace differences (eg '< br >' vs '<br>'),
     * attribute order differences, so this would only fail when there would be a noticeable
     * difference. The true ideal would be system testing using something codeception or something
     * @param string $expected
     * @param string $actual
     * @param string $error_message
     * @return void
     */
    public function assertHTMLEquals($expected, $actual, $error_message = '')
    {
        $expected_standardized_whitespace = preg_replace('~(\\s)+~', PHP_EOL, $expected);
        $actual_standardized_whitespace = preg_replace('~(\\s)+~', PHP_EOL, $actual);
        $this->assertEquals($expected_standardized_whitespace, $actual_standardized_whitespace, $error_message);
    }


    /**
     *Creates a model object and its required dependencies
     * @param string $model_name
     * @param array $args array of arguments to supply when constructing the model object
     * @param boolean $save
     * @throws EE_Error
     * @global int $auto_made_thing_seed
     * @return EE_Base_Class
     */
    public function new_model_obj_with_dependencies($model_name, $args = array(), $save = true)
    {
        global $auto_made_thing_seed;
        if ($auto_made_thing_seed === NULL) {
            $auto_made_thing_seed = 1;
        }
        $model = EE_Registry::instance()->load_model($model_name);

        //set the related model foreign keys
        foreach ($model->relation_settings() as $related_model_name => $relation) {
            if ($relation instanceof EE_Belongs_To_Any_Relation) {
                continue;
            } elseif ($related_model_name === 'WP_User' && get_current_user_id()) {
                $fk = $model->get_foreign_key_to($related_model_name);
                if (! isset($args[$fk->get_name()])) {
                    $obj = \EEM_WP_User::instance()->get_one_by_ID(get_current_user_id());
                    $args[$fk->get_name()] = $obj->ID();
                }
            } elseif ($related_model_name === 'Country' && ! isset($args['CNT_ISO'])) {
                //we already have lots of countries. lets not make any more
                //what's more making them is tricky: the primary key needs to be a unique
                //2-character string but not an integer (else it confuses the country
                //form input validation)
                $args['CNT_ISO'] = 'US';
            } elseif ($related_model_name === 'Status') {
                $fk = $model->get_foreign_key_to($related_model_name);
                if (!isset($args[$fk->get_name()])) {
                    //only set the default if they haven't specified anything
                    $args[$fk->get_name()] = $fk->get_default_value();
                }
            } elseif ($relation instanceof EE_Belongs_To_Relation) {
                $fk = $model->get_foreign_key_to($related_model_name);
                if (!isset($args[$fk->get_name()])) {
                    $obj = $this->new_model_obj_with_dependencies($related_model_name);
                    $args[$fk->get_name()] = $obj->ID();
                }
            }
        }
        //set any other fields which haven't yet been set
        foreach ($model->field_settings() as $field_name => $field) {
            $value = NULL;
            if (
                in_array(
                    $field_name,
                    array(
                        'EVT_timezone_string',
                        'PAY_redirect_url',
                        'PAY_redirect_args',
                        'TKT_reserved',
                        'DTT_reserved',
                        'parent',
                        //don't make system questions etc
                        'QST_system',
                        'QSG_system',
                        'QSO_system',
                        'password'
                    ),
                    true
                )
            ) {
                $value = NULL;
            } elseif (
                $field_name === 'TKT_start_date' ||
                $field_name === 'DTT_EVT_start'
            ) {
                $value = time() + MONTH_IN_SECONDS;
            } elseif (
                $field_name === 'TKT_end_date' ||
                $field_name === 'DTT_EVT_end'
            ) {
                $value = time() + MONTH_IN_SECONDS + DAY_IN_SECONDS;
            } elseif (
                $field instanceof EE_Enum_Integer_Field ||
                $field instanceof EE_Enum_Text_Field ||
                $field instanceof EE_Boolean_Field ||
                $field_name === 'PMD_type' ||
                $field_name === 'CNT_cur_dec_mrk' ||
                $field_name === 'CNT_cur_thsnds' ||
                $field_name === 'CNT_tel_code'
            ) {
                $value = $field->get_default_value();
            } elseif (
                $field instanceof EE_Integer_Field ||
                $field instanceof EE_Float_Field ||
                $field instanceof EE_Foreign_Key_Field_Base ||
                $field_name === 'STA_abbrev' ||
                $field_name === 'CNT_ISO3' ||
                $field_name === 'CNT_cur_code'
            ) {
                $value = $auto_made_thing_seed;
            } elseif ($field instanceof EE_Primary_Key_String_Field) {
                $value = "$auto_made_thing_seed";
            } elseif ($field instanceof EE_Email_Field) {
                $value = $auto_made_thing_seed . 'ee@ee' . $auto_made_thing_seed . '.dev';
            } elseif ($field instanceof EE_Text_Field_Base) {
                $value = $auto_made_thing_seed . "_" . $field_name;
            }
            if (!array_key_exists($field_name, $args) && $value !== NULL) {
                $args[$field_name] = $value;
            }
        }
        //and finally make the model obj
        $classname = 'EE_' . $model_name;
        $model_obj = $classname::new_instance($args);
        if ($save) {
            $success = $model_obj->save();
            if (!$success) {
                global $wpdb;
                throw new EE_Error(
                    sprintf(
                        __('Could not save %1$s using %2$s. Error was %3$s', 'event_espresso'),
                        $model_name,
                        wp_json_encode($args),
                        $wpdb->last_error
                    )
                );
            }
        }
        $auto_made_thing_seed++;
        return $model_obj;

    }


    /**
     * asserts that a table (even temporary one) exists
     * We really should implement this function in the proper PHPunit style
     * @see http://php-and-symfony.matthiasnoback.nl/2012/02/phpunit-writing-a-custom-assertion/
     * @global WPDB $wpdb
     * @param string $table_name with or without $wpdb->prefix
     * @param string $model_name the model's name (only used for error reporting)
     */
    public function assertTableExists($table_name, $model_name = 'Unknown')
    {
        $table_analysis = EE_Registry::instance()->create('TableAnalysis', array(), true);
        if (!$table_analysis->tableExists($table_name)) {
            global $wpdb;
            $this->fail($wpdb->last_error);
        }
    }

    /**
     * Asserts the table (even temporary one) does not exist
     * We really should implement this function in the proper PHPunit style
     * @see http://php-and-symfony.matthiasnoback.nl/2012/02/phpunit-writing-a-custom-assertion/
     * @global WPDB $wpdb
     * @param string $table_name with or without $wpdb->prefix
     * @param string $model_name the model's name (only used for error reporting)
     */
    public function assertTableDoesNotExist($table_name, $model_name = 'Unknown')
    {
        $table_analysis = EE_Registry::instance()->create('TableAnalysis', array(), true);
        if ($table_analysis->tableExists($table_name)) {
            $this->fail(
                sprintf(
                    __('Table like %1$s SHOULD NOT exist. It was apparently defined on the model "%2$s"', 'event_espresso'),
                    $table_name,
                    $model_name
                )
            );
        }
    }

    /**
     * Modifies the $wp_actions global to make it look like certain actions were and weren't
     * performed, so that EE_Register_Addon is deceived into thinking it's the right
     * time to register an addon etc
     * @global array $wp_actions
     */
    protected function _pretend_addon_hook_time()
    {
        global $wp_actions;
        unset(
            $wp_actions['AHEE__EE_System___detect_if_activation_or_upgrade__begin'],
            $wp_actions['FHEE__EE_System__parse_model_names'],
            $wp_actions['FHEE__EE_System__parse_implemented_model_names'],
            $wp_actions['AHEE__EE_System__register_shortcodes_modules_and_widgets']
        );
        $wp_actions['AHEE__EE_System__load_espresso_addons'] = 1;
    }

    /**
     * Restores the $wp_actions global to how ti should have been before we
     * started pretending we hooked in at the right time etc
     * @global array $wp_actions
     */
    protected function _stop_pretending_addon_hook_time()
    {
        global $wp_actions;
        $wp_actions['AHEE__EE_System___detect_if_activation_or_upgrade__begin'] = 1;
        $wp_actions['FHEE__EE_System__parse_model_names'] = 1;
        $wp_actions['FHEE__EE_System__parse_implemented_model_names'] = 1;
        unset($wp_actions['AHEE__EE_System__load_espresso_addons']);
    }



    /**
     * Makes a complete transaction record with all associated data (ie, its line items,
     * registrations, tickets, datetimes, events, attendees, questions, answers, etc).
     *
     * @param array $options         {
     * 	@type int    $ticket_types/$tickets    the number of different ticket types in this transaction. Default 1
     * 	@type int    $taxable_tickets how many of those ticket types should be taxable. Default EE_INF
     * @type int fixed_ticket_price_modifiers the number of fixed ticket price modifiers to use on the tickets. Defaults to 1.
     * @type string $reg_status the status of the transaction's registration. Defaults to "RAP"
     * @type boolean $setup_reg whether to add a registration or not onto the transaction. Defaults to true
     * @type int $tkt_qty the number of tickest available for purchase that the transaction is for
     * @type string/int/Datetime $timestamp to use on the transaction and registration and payments etc
     * }
     * @return EE_Transaction
     * @throws \EE_Error
     */
    protected function new_typical_transaction($options = array())
    {
        $ticket_types = isset($options['ticket_types'])
            ? $options['ticket_types']
            : $ticket_types = 1;
        $taxable_tickets = isset($options['taxable_tickets'])
            ? $options['taxable_tickets']
            : $taxable_tickets = EE_INF;
        $fixed_ticket_price_modifiers = isset($options['fixed_ticket_price_modifiers'])
            ? $options['fixed_ticket_price_modifiers']
            : $fixed_ticket_price_modifiers = 1;
        $reg_status = isset($options['reg_status'])
            ? $options['reg_status']
            : EEM_Registration::status_id_approved;
        $setup_reg = isset($options['setup_reg'])
            ? $options['setup_reg']
            : true;
        $tkt_qty = isset($options['tkt_qty'])
            ? $options['tkt_qty']
            : 1;
        $ticket_types = isset($options['tickets'])
            ? count($options['tickets'])
            : $ticket_types;
        $timestamp = isset($options['timestamp'])
            ? $options['timestamp']
            : current_time('timestamp');
        /** @var EE_Transaction $txn */
        $txn = $this->new_model_obj_with_dependencies(
            'Transaction',
            array(
                'TXN_paid' => 0,
                'TXN_timestamp' => $timestamp
            )
        );
        $total_line_item = EEH_Line_Item::create_total_line_item($txn->ID());
        $total_line_item->save_this_and_descendants_to_txn($txn->ID());
        $taxes = EEM_Price::instance()->get_all_prices_that_are_taxes();
        for ($i = 1; $i <= $ticket_types; $i++) {
            /** @var EE_Ticket $ticket */
            if(isset($options['tickets'], $options['tickets'][$i])){
                $ticket = $options['tickets'][$i];
                $reg_final_price = $ticket->price();
                $datetime = $ticket->first_datetime();
            } else {

                $ticket = $this->new_model_obj_with_dependencies(
                    'Ticket',
                    array(
                        'TKT_price' => $i * 10,
                        'TKT_taxable' => $taxable_tickets-- > 0 ? true : false,
                        'TKT_reserved' => $setup_reg && $reg_status === EEM_Registration::status_id_pending_payment ? 1 : 0
                    )
                );
                $sum_of_sub_prices = 0;
                for ($j = 1; $j <= $fixed_ticket_price_modifiers; $j++) {
                    if ($j === $fixed_ticket_price_modifiers) {
                        $price_amount = $ticket->price() - $sum_of_sub_prices;
                    } else {
                        $price_amount = $i * 10 / $fixed_ticket_price_modifiers;
                    }
                    /** @var EE_Price $price */
                    $price = $this->new_model_obj_with_dependencies(
                        'Price',
                        array('PRC_amount' => $price_amount, 'PRC_order' => $j)
                    );
                    $sum_of_sub_prices += $price->amount();
                    $ticket->_add_relation_to($price, 'Price');
                }
                /** @var EE_Datetime $datetime */
                $datetime = $this->new_model_obj_with_dependencies('Datetime');
                $ticket->_add_relation_to($datetime, 'Datetime');
                $reg_final_price = $ticket->price();
                foreach ($taxes as $taxes_at_priority) {
                    foreach ($taxes_at_priority as $tax) {
                        /** @var EE_Price $tax */
                        $reg_final_price += $reg_final_price * $tax->amount() / 100;
                    }
                }
            }
            $line_item = EEH_Line_Item::add_ticket_purchase($total_line_item, $ticket, $tkt_qty);
            $this->assertInstanceOf(
                'EE_Line_Item',
                $line_item
            );
            if ($setup_reg) {
                $this->new_model_obj_with_dependencies(
                    'Registration',
                    array(
                        'TXN_ID'          => $txn->ID(),
                        'TKT_ID'          => $ticket->ID(),
                        'STS_ID'          => $reg_status,
                        'EVT_ID'          => $datetime->get('EVT_ID'),
                        'REG_count'       => 1,
                        'REG_group_size'  => 1,
                        'REG_final_price' => $reg_final_price,
                        'REG_date' => $timestamp
                    )
                );
            }
        }
        $txn->set_total($total_line_item->total());
        $txn->save();

        return $txn;
    }



    /**
     * Creates an interesting ticket, with a base price, dollar surcharge, and a percent surcharge,
     * which is for 2 different datetimes.
     *
     * @param array $options           {
     * @type int    $dollar_surcharge  the dollar surcharge to add to this ticket
     * @type int    $percent_surcharge teh percent surcharge to add to this ticket (value in percent, not in decimal. Eg if it's a 10% surcharge, enter 10.00, not 0.10
     * @type int    $datetimes         the number of datetimes for this ticket,
     * @type int    $TKT_price         set the TKT_price to this value.
     * @type int    $TKT_taxable       set the TKT_taxable to this value.
     *                                 }
     * @return EE_Ticket
     * @throws \EE_Error
     */
    public function new_ticket($options = array())
    {
        // copy incoming options to use for ticket args
        $ticket_args = $options;
        // make sure ticket price is set or use default of 16.50
        $ticket_args['TKT_price'] = isset($options['TKT_price']) && is_numeric($options['TKT_price'])
            ? $options['TKT_price']
            : 16.5;
        // apply taxes? default = true
        $ticket_args['TKT_taxable'] = isset($options['TKT_taxable'])
            ? filter_var($options['TKT_taxable'], FILTER_VALIDATE_BOOLEAN)
            : true;
        //  make sure ticket start and end dates are set else they will default to NOW !!!
        $ticket_args['TKT_start_date'] = isset($options['TKT_start_date'])
            ? $options['TKT_start_date']
            : time() + MONTH_IN_SECONDS;
        $ticket_args['TKT_end_date'] = isset($options['TKT_end_date'])
            ? $options['TKT_end_date']
            : time() + MONTH_IN_SECONDS + DAY_IN_SECONDS;
        // now dump any other elements that came from the incoming options that are not ticket properties
        $ticket_args = array_intersect_key(
            $ticket_args,
            array(
                'TTM_ID' => 1,
                'TKT_name' => 1,
                'TKT_description' => 1,
                'TKT_start_date' => 1,
                'TKT_end_date' => 1,
                'TKT_min' => 1,
                'TKT_max' => 1,
                'TKT_price' => 1,
                'TKT_sold' => 1,
                'TKT_qty' => 1,
                'TKT_reserved' => 1,
                'TKT_uses' => 1,
                'TKT_required' => 1,
                'TKT_taxable' => 1,
                'TKT_is_default' => 1,
                'TKT_order' => 1,
                'TKT_row' => 1,
                'TKT_deleted' => 1,
                'TKT_wp_user' => 1,
                'TKT_parent' => 1,
            )
        );
        /** @type EE_Ticket $ticket */
        $ticket = $this->new_model_obj_with_dependencies('Ticket',$ticket_args);
        $base_price_type = EEM_Price_Type::instance()->get_one(array(array('PRT_name' => 'Base Price')));
        $this->assertInstanceOf('EE_Price_Type', $base_price_type);

        //only associate on the tickets if TKT_price is not included
        if (!isset($options['TKT_price'])) {
            $base_price = $this->new_model_obj_with_dependencies('Price', array('PRC_amount' => 10, 'PRT_ID' => $base_price_type->ID()));
            $ticket->_add_relation_to($base_price, 'Price');
            $this->assertArrayContains($base_price, $ticket->prices());
            if (isset($options['dollar_surcharge'])) {
                $dollar_surcharge_price_type = EEM_Price_Type::instance()->get_one(array(array('PRT_name' => 'Dollar Surcharge')));
                $this->assertInstanceOf('EE_Price_Type', $dollar_surcharge_price_type);
                $dollar_surcharge = $this->new_model_obj_with_dependencies('Price', array('PRC_amount' => $options['dollar_surcharge'], 'PRT_ID' => $dollar_surcharge_price_type->ID()));
                $ticket->_add_relation_to($dollar_surcharge, 'Price');
                $this->assertArrayContains($dollar_surcharge, $ticket->prices());
            }
            if (isset($options['percent_surcharge'])) {
                $percent_surcharge_price_type = EEM_Price_Type::instance()->get_one(array(array('PRT_name' => 'Percent Surcharge')));
                $this->assertInstanceOf('EE_Price_Type', $percent_surcharge_price_type);
                $percent_surcharge = $this->new_model_obj_with_dependencies('Price', array('PRC_amount' => $options['percent_surcharge'], 'PRT_ID' => $percent_surcharge_price_type->ID()));
                $ticket->_add_relation_to($percent_surcharge, 'Price');
                $this->assertArrayContains($percent_surcharge, $ticket->prices());
            }
        } else {
            $ticket->set('TKT_price', $options['TKT_price']);
            //set the base price
            $base_price = $this->new_model_obj_with_dependencies('Price', array('PRC_amount' => $options['TKT_price'], 'PRT_ID' => $base_price_type->ID()));
            $ticket->_add_relation_to($base_price, 'Price');
            $this->assertArrayContains($base_price, $ticket->prices());
        }

        if (isset($options['TKT_taxable'])) {
            $ticket->set('TKT_taxable', $options['TKT_taxable']);
        }

        // were datetimes (and their related events) already setup?
        if(!empty($options['datetime_objects']) && is_array($options['datetime_objects'])) {
            foreach ($options['datetime_objects'] as $datetime_object) {
                $ticket->_add_relation_to($datetime_object, 'Datetime');
            }
        } else {
            /**
             * Set the author to the current user. This is done in case a running test switched the current user global
             * after models were instantiated.
             */
            global $current_user;
            // create new datetimes, default = 1
            $datetimes = isset($options['datetimes']) ? $options['datetimes'] : 1;
            $event = $this->new_model_obj_with_dependencies('Event', array('EVT_wp_user' => $current_user->ID));
            for ($i = 0; $i <= $datetimes; $i++) {
                $ddt = $this->new_model_obj_with_dependencies(
                    'Datetime',
                    array(
                        'EVT_ID' => $event->ID(),
                        'DTT_EVT_start' => time() + MONTH_IN_SECONDS,
                        'DTT_EVT_end'   => time() + MONTH_IN_SECONDS + DAY_IN_SECONDS,
                    )
                );
                $ticket->_add_relation_to($ddt, 'Datetime');
                $this->assertArrayContains($ddt, $ticket->datetimes());
            }
        }

        //resave ticket to account for possible field value changes
        $ticket->save();
        return $ticket;
    }


    /**
     * Creates a WP user with standard admin caps PLUS all EE CAPS (default)
     *
     * @param array $ee_capabilities array of EE CAPS if you don't want the user to have ALL EE CAPS
     * @return WP_User
     * @throws EE_Error
     */
    public function wp_admin_with_ee_caps($ee_capabilities = array())
    {
        //if caps were provided then just add the caps to a default user role (non admin user).
        if ($ee_capabilities) {
            /** @type WP_User $user */
            $user = $this->factory->user->create_and_get();
            foreach ($ee_capabilities as $cap) {
                $user->add_cap($cap);
            }
            return $user;
        }
        /** @type WP_User $user */
        $user = $this->factory->user->create_and_get(array('role' => 'administrator'));
        return $user;
    }


    /**
     * increments the ticket and datetime sold values
     * @param \EE_ticket $ticket
     * @param int $qty
     * @throws \EE_Error
     */
    public function simulate_x_number_ticket_sales(EE_ticket $ticket, $qty = 1)
    {
        $ticket->increaseSold($qty);
    }


    /**
     * decrements the ticket and datetime sold values
     * @param \EE_ticket $ticket
     * @param int $qty
     * @throws \EE_Error
     */
    public function reverse_x_number_ticket_sales(EE_ticket $ticket, $qty = 1)
    {
        $ticket->decreaseSold($qty);
    }



    /**
     * Calls the WordPress version specific method for refreshing user roles during tests
     * @param WP_User $user
     */
    protected function refreshRolesForUser(WP_User $user)
    {
        if (method_exists($user, 'for_site')) {
            $user->for_site();
        } else {
            $user->_init_caps();
        }
    }


    /**
     * \PHPUnit\Framework\TestCase::expectException() only exists in PHPUnit version 5.7+
     * but on Travis-CI we test using PHPUnit 4.8 because it supports PHP versions < 5.6
     * This should call the appropriate method regardless of version
     *
     * @param string $exception
     * @throws \PHPUnit\Framework\Exception
     */
    public function setExceptionExpected($exception, $code = null)
    {
        if (method_exists($this, 'expectException')) {
            parent::expectException($exception);
        } elseif (method_exists($this, 'setExpectedException')) {
            $this->setExpectedException($exception);
        }
        if ($code !== null && method_exists($this, 'expectExceptionCode')) {
            parent::expectExceptionCode($code);
        }
    }


    protected function loadShortcodesManagerAndShortcodes()
    {
        // load, register, and add shortcodes the new way
        LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\shortcodes\ShortcodesManager',
            array(
                // and the old way, but we'll put it under control of the new system
                EE_Config::getLegacyShortcodesManager()
            )
        );
        do_action('AHEE__EE_System__register_shortcodes_modules_and_widgets');
        do_action('AHEE__EE_System__core_loaded_and_ready');
        global $wp_query;
        do_action('parse_query', $wp_query);
        require_once EE_PUBLIC . 'template_tags.php';
    }


    /**
     * @param string   $hook_name
     * @param callable $callback
     * @param bool|int $equals
     * @param bool     $is_action
     * @since $VID:$
     */
    protected function assertHookIsSet($hook_name, callable $callback, $equals, $is_action = true) {
        $has_hook = $is_action ? 'has_action' : 'has_filter';
        $actual = $has_hook($hook_name, $callback);
        if ($actual === false) {
            // produces error message like:
            // The `EE_Admin::filter_plugin_actions()` callback is NOT registered to the "plugin_action_links" action when it should be.
            $message = sprintf(
                'The `%1$s` callback is NOT registered to the "%2$s" %3$s when it should be.',
                is_array($callback) ? get_class($callback[0]) . "::{$callback[1]}()" : $callback,
                $hook_name,
                $is_action ? 'action' : 'filter'
            );
        } else {
            // produces error message like:
            // The `EE_Admin::admin_init()` callback is registered to the "admin_init" action
            // at priority 100 when it should be registered at priority 10.
            $message = sprintf(
                'The `%1$s` callback is registered to the "%2$s" %3$s at priority %4$s when it should be registered at priority %5$s.',
                is_array($callback) ? get_class($callback[0]) . "::{$callback[1]}()" : $callback,
                $hook_name,
                $is_action ? 'action' : 'filter',
                $actual,
                $equals
            );
        }
        $this->assertEquals( $equals, $actual, $message );
    }


    /**
     * @param string   $action
     * @param callable $callback
     * @param bool|int $priority
     * @since $VID:$
     */
    protected function assertActionSet($action, Callable $callback, $priority = true)
    {
        $this->assertHookIsSet($action, $callback, $priority);
    }


    /**
     * @param string   $action
     * @param callable $callback
     * @since $VID:$
     */
    protected function assertActionNotSet($action, callable $callback)
    {
        $this->assertHookIsSet($action, $callback, false);
    }


    /**
     * @param string   $filter
     * @param callable $callback
     * @param bool|int $priority
     * @since $VID:$
     */
    protected function assertFilterSet($filter, Callable $callback, $priority = true)
    {
        $this->assertHookIsSet($filter, $callback, $priority, false);
    }


    /**
     * @param string   $filter
     * @param callable $callback
     * @since $VID:$
     */
    protected function assertFilterNotSet($filter, callable $callback)
    {
        $this->assertHookIsSet($filter, $callback, false, false);
    }
}

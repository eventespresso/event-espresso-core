<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * EEH_Activation Helper
 *
 * @package        Event Espresso
 * @subpackage     /helpers/
 * @author         Brent Christensen
 */
class EEH_Activation
{

    /**
     * constant used to indicate a cron task is no longer in use
     */
    const cron_task_no_longer_in_use = 'no_longer_in_use';

    /**
     * option name that will indicate whether or not we still
     * need to create EE's folders in the uploads directory
     * (because if EE was installed without file system access,
     * we need to request credentials before we can create them)
     */
    const upload_directories_incomplete_option_name = 'ee_upload_directories_incomplete';

    /**
     * WP_User->ID
     *
     * @var int
     */
    private static $_default_creator_id;

    /**
     * indicates whether or not we've already verified core's default data during this request,
     * because after migrations are done, any addons activated while in maintenance mode
     * will want to setup their own default data, and they might hook into core's default data
     * and trigger core to setup its default data. In which case they might all ask for core to init its default data.
     * This prevents doing that for EVERY single addon.
     *
     * @var boolean
     */
    protected static $_initialized_db_content_already_in_this_request = false;

    /**
     * @var \EventEspresso\core\services\database\TableAnalysis $table_analysis
     */
    private static $table_analysis;

    /**
     * @var \EventEspresso\core\services\database\TableManager $table_manager
     */
    private static $table_manager;


    /**
     * @return \EventEspresso\core\services\database\TableAnalysis
     */
    public static function getTableAnalysis()
    {
        if (! self::$table_analysis instanceof \EventEspresso\core\services\database\TableAnalysis) {
            self::$table_analysis = EE_Registry::instance()->create('TableAnalysis', array(), true);
        }
        return self::$table_analysis;
    }


    /**
     * @return \EventEspresso\core\services\database\TableManager
     */
    public static function getTableManager()
    {
        if (! self::$table_manager instanceof \EventEspresso\core\services\database\TableManager) {
            self::$table_manager = EE_Registry::instance()->create('TableManager', array(), true);
        }
        return self::$table_manager;
    }


    /**
     *    _ensure_table_name_has_prefix
     *
     * @deprecated instead use TableAnalysis::ensureTableNameHasPrefix()
     * @access     public
     * @static
     * @param $table_name
     * @return string
     */
    public static function ensure_table_name_has_prefix($table_name)
    {
        return \EEH_Activation::getTableAnalysis()->ensureTableNameHasPrefix($table_name);
    }


    /**
     *    system_initialization
     *    ensures the EE configuration settings are loaded with at least default options set
     *    and that all critical EE pages have been generated with the appropriate shortcodes in place
     *
     * @access public
     * @static
     * @return void
     */
    public static function system_initialization()
    {
        EEH_Activation::reset_and_update_config();
        //which is fired BEFORE activation of plugin anyways
        EEH_Activation::verify_default_pages_exist();
    }


    /**
     * Sets the database schema and creates folders. This should
     * be called on plugin activation and reactivation
     *
     * @return boolean success, whether the database and folders are setup properly
     * @throws \EE_Error
     */
    public static function initialize_db_and_folders()
    {
        $good_filesystem = EEH_Activation::create_upload_directories();
        $good_db         = EEH_Activation::create_database_tables();
        return $good_filesystem && $good_db;
    }


    /**
     * assuming we have an up-to-date database schema, this will populate it
     * with default and initial data. This should be called
     * upon activation of a new plugin, reactivation, and at the end
     * of running migration scripts
     *
     * @throws \EE_Error
     */
    public static function initialize_db_content()
    {
        //let's avoid doing all this logic repeatedly, especially when addons are requesting it
        if (EEH_Activation::$_initialized_db_content_already_in_this_request) {
            return;
        }
        EEH_Activation::$_initialized_db_content_already_in_this_request = true;

        EEH_Activation::initialize_system_questions();
        EEH_Activation::insert_default_status_codes();
        EEH_Activation::generate_default_message_templates();
        EEH_Activation::create_no_ticket_prices_array();
        EE_Registry::instance()->CAP->init_caps();

        EEH_Activation::validate_messages_system();
        EEH_Activation::insert_default_payment_methods();
        //in case we've
        EEH_Activation::remove_cron_tasks();
        EEH_Activation::create_cron_tasks();
        // remove all TXN locks since that is being done via extra meta now
        delete_option('ee_locked_transactions');
        //also, check for CAF default db content
        do_action('AHEE__EEH_Activation__initialize_db_content');
        //also: EEM_Gateways::load_all_gateways() outputs a lot of success messages
        //which users really won't care about on initial activation
        EE_Error::overwrite_success();
    }


    /**
     * Returns an array of cron tasks. Array values are the actions fired by the cron tasks (the "hooks"),
     * values are the frequency (the "recurrence"). See http://codex.wordpress.org/Function_Reference/wp_schedule_event
     * If the cron task should NO longer be used, it should have a value of EEH_Activation::cron_task_no_longer_in_use
     * (null)
     *
     * @param string $which_to_include can be 'current' (ones that are currently in use),
     *                                 'old' (only returns ones that should no longer be used),or 'all',
     * @return array
     * @throws \EE_Error
     */
    public static function get_cron_tasks($which_to_include)
    {
        $cron_tasks = apply_filters(
            'FHEE__EEH_Activation__get_cron_tasks',
            array(
                'AHEE__EE_Cron_Tasks__clean_up_junk_transactions'      => 'hourly',
//				'AHEE__EE_Cron_Tasks__finalize_abandoned_transactions' => EEH_Activation::cron_task_no_longer_in_use, actually this is still in use
                'AHEE__EE_Cron_Tasks__update_transaction_with_payment' => EEH_Activation::cron_task_no_longer_in_use,
                //there may have been a bug which prevented from these cron tasks from getting unscheduled, so we might want to remove these for a few updates
                'AHEE_EE_Cron_Tasks__clean_out_old_gateway_logs'       => 'daily',
            )
        );
        if ($which_to_include === 'old') {
            $cron_tasks = array_filter(
                $cron_tasks,
                function ($value) {
                    return $value === EEH_Activation::cron_task_no_longer_in_use;
                }
            );
        } elseif ($which_to_include === 'current') {
            $cron_tasks = array_filter($cron_tasks);
        } elseif (WP_DEBUG && $which_to_include !== 'all') {
            throw new EE_Error(
                sprintf(
                    __(
                        'Invalid argument of "%1$s" passed to EEH_Activation::get_cron_tasks. Valid values are "all", "old" and "current".',
                        'event_espresso'
                    ),
                    $which_to_include
                )
            );
        }
        return $cron_tasks;
    }


    /**
     * Ensure cron tasks are setup (the removal of crons should be done by remove_crons())
     *
     * @throws \EE_Error
     */
    public static function create_cron_tasks()
    {

        foreach (EEH_Activation::get_cron_tasks('current') as $hook_name => $frequency) {
            if (! wp_next_scheduled($hook_name)) {
                /**
                 * This allows client code to define the initial start timestamp for this schedule.
                 */
                if (is_array($frequency)
                    && count($frequency) === 2
                    && isset($frequency[0], $frequency[1])
                ) {
                    $start_timestamp = $frequency[0];
                    $frequency = $frequency[1];
                } else {
                    $start_timestamp = time();
                }
                wp_schedule_event($start_timestamp, $frequency, $hook_name);
            }
        }

    }


    /**
     * Remove the currently-existing and now-removed cron tasks.
     *
     * @param boolean $remove_all whether to only remove the old ones, or remove absolutely ALL the EE ones
     * @throws \EE_Error
     */
    public static function remove_cron_tasks($remove_all = true)
    {
        $cron_tasks_to_remove = $remove_all ? 'all' : 'old';
        $crons                = _get_cron_array();
        $crons                = is_array($crons) ? $crons : array();
        /* reminder of what $crons look like:
         * Top-level keys are timestamps, and their values are arrays.
         * The 2nd level arrays have keys with each of the cron task hook names to run at that time
         * and their values are arrays.
         * The 3rd level level arrays are keys which are hashes of the cron task's arguments,
         *  and their values are the UN-hashed arguments
         * eg
         * array (size=13)
         *		1429903276 =>
         *		  array (size=1)
         *			'AHEE__EE_Cron_Tasks__update_transaction_with_payment' =>
         *			  array (size=1)
         *				'561299d6e42c8e079285870ade0e47e6' =>
         *				  array (size=2)
         *					...
         *      ...
         */
        $ee_cron_tasks_to_remove = EEH_Activation::get_cron_tasks($cron_tasks_to_remove);
        foreach ($crons as $timestamp => $hooks_to_fire_at_time) {
            if (is_array($hooks_to_fire_at_time)) {
                foreach ($hooks_to_fire_at_time as $hook_name => $hook_actions) {
                    if (isset($ee_cron_tasks_to_remove[$hook_name])
                        && is_array($ee_cron_tasks_to_remove[$hook_name])
                    ) {
                        unset($crons[$timestamp][$hook_name]);
                    }
                }
                //also take care of any empty cron timestamps.
                if (empty($hooks_to_fire_at_time)) {
                    unset($crons[$timestamp]);
                }
            }
        }
        _set_cron_array($crons);
    }


    /**
     *    CPT_initialization
     *    registers all EE CPTs ( Custom Post Types ) then flushes rewrite rules so that all endpoints exist
     *
     * @access public
     * @static
     * @return void
     */
    public static function CPT_initialization()
    {
        // register Custom Post Types
        EE_Registry::instance()->load_core('Register_CPTs');
        flush_rewrite_rules();
    }



    /**
     *    reset_and_update_config
     * The following code was moved over from EE_Config so that it will no longer run on every request.
     * If there is old calendar config data saved, then it will get converted on activation.
     * This was basically a DMS before we had DMS's, and will get removed after a few more versions.
     *
     * @access public
     * @static
     * @return void
     */
    public static function reset_and_update_config()
    {
        do_action('AHEE__EE_Config___load_core_config__start', array('EEH_Activation', 'load_calendar_config'));
        add_filter(
            'FHEE__EE_Config___load_core_config__config_settings',
            array('EEH_Activation', 'migrate_old_config_data'),
            10,
            3
        );
        //EE_Config::reset();
        if (! EE_Config::logging_enabled()) {
            delete_option(EE_Config::LOG_NAME);
        }
    }


    /**
     *    load_calendar_config
     *
     * @access    public
     * @return    void
     */
    public static function load_calendar_config()
    {
        // grab array of all plugin folders and loop thru it
        $plugins = glob(WP_PLUGIN_DIR . DS . '*', GLOB_ONLYDIR);
        if (empty($plugins)) {
            return;
        }
        foreach ($plugins as $plugin_path) {
            // grab plugin folder name from path
            $plugin = basename($plugin_path);
            // drill down to Espresso plugins
            // then to calendar related plugins
            if (
                strpos($plugin, 'espresso') !== false
                || strpos($plugin, 'Espresso') !== false
                || strpos($plugin, 'ee4') !== false
                || strpos($plugin, 'EE4') !== false
                || strpos($plugin, 'calendar') !== false
            ) {
                // this is what we are looking for
                $calendar_config = $plugin_path . DS . 'EE_Calendar_Config.php';
                // does it exist in this folder ?
                if (is_readable($calendar_config)) {
                    // YEAH! let's load it
                    require_once($calendar_config);
                }
            }
        }
    }



    /**
     *    _migrate_old_config_data
     *
     * @access    public
     * @param array|stdClass $settings
     * @param string         $config
     * @param \EE_Config     $EE_Config
     * @return \stdClass
     */
    public static function migrate_old_config_data($settings = array(), $config = '', EE_Config $EE_Config)
    {
        $convert_from_array = array('addons');
        // in case old settings were saved as an array
        if (is_array($settings) && in_array($config, $convert_from_array)) {
            // convert existing settings to an object
            $config_array = $settings;
            $settings = new stdClass();
            foreach ($config_array as $key => $value) {
                if ($key === 'calendar' && class_exists('EE_Calendar_Config')) {
                    $EE_Config->set_config('addons', 'EE_Calendar', 'EE_Calendar_Config', $value);
                } else {
                    $settings->{$key} = $value;
                }
            }
            add_filter('FHEE__EE_Config___load_core_config__update_espresso_config', '__return_true');
        }
        return $settings;
    }


    /**
     * deactivate_event_espresso
     *
     * @access public
     * @static
     * @return void
     */
    public static function deactivate_event_espresso()
    {
        // check permissions
        if (current_user_can('activate_plugins')) {
            deactivate_plugins(EE_PLUGIN_BASENAME, true);
        }
    }





    /**
     * verify_default_pages_exist
     *
     * @access public
     * @static
     * @return void
     */
    public static function verify_default_pages_exist()
    {
        $critical_page_problem = false;
        $critical_pages = array(
            array(
                'id'   => 'reg_page_id',
                'name' => __('Registration Checkout', 'event_espresso'),
                'post' => null,
                'code' => 'ESPRESSO_CHECKOUT',
            ),
            array(
                'id'   => 'txn_page_id',
                'name' => __('Transactions', 'event_espresso'),
                'post' => null,
                'code' => 'ESPRESSO_TXN_PAGE',
            ),
            array(
                'id'   => 'thank_you_page_id',
                'name' => __('Thank You', 'event_espresso'),
                'post' => null,
                'code' => 'ESPRESSO_THANK_YOU',
            ),
            array(
                'id'   => 'cancel_page_id',
                'name' => __('Registration Cancelled', 'event_espresso'),
                'post' => null,
                'code' => 'ESPRESSO_CANCELLED',
            ),
        );
        $EE_Core_Config = EE_Registry::instance()->CFG->core;
        foreach ($critical_pages as $critical_page) {
            // is critical page ID set in config ?
            if ($EE_Core_Config->{$critical_page['id']} !== false) {
                // attempt to find post by ID
                $critical_page['post'] = get_post($EE_Core_Config->{$critical_page['id']});
            }
            // no dice?
            if ($critical_page['post'] === null) {
                // attempt to find post by title
                $critical_page['post'] = self::get_page_by_ee_shortcode($critical_page['code']);
                // still nothing?
                if ($critical_page['post'] === null) {
                    $critical_page = EEH_Activation::create_critical_page($critical_page);
                    // REALLY? Still nothing ??!?!?
                    if ($critical_page['post'] === null) {
                        $msg = __(
                            'The Event Espresso critical page configuration settings could not be updated.',
                            'event_espresso'
                        );
                        EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
                        break;
                    }
                }
            }
            // track post_shortcodes
            if ($critical_page['post']) {
                EEH_Activation::_track_critical_page_post_shortcodes($critical_page);
            }
            // check that Post ID matches critical page ID in config
            if (
                isset($critical_page['post']->ID)
                && $critical_page['post']->ID !== $EE_Core_Config->{$critical_page['id']}
            ) {
                //update Config with post ID
                $EE_Core_Config->{$critical_page['id']} = $critical_page['post']->ID;
                if (! EE_Config::instance()->update_espresso_config(false, false)) {
                    $msg = __(
                        'The Event Espresso critical page configuration settings could not be updated.',
                        'event_espresso'
                    );
                    EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
                }
            }
            $critical_page_problem =
                ! isset($critical_page['post']->post_status)
                || $critical_page['post']->post_status !== 'publish'
                || strpos($critical_page['post']->post_content, $critical_page['code']) === false
                    ? true
                    : $critical_page_problem;
        }
        if ($critical_page_problem) {
            $msg = sprintf(
                __(
                    'A potential issue has been detected with one or more of your Event Espresso pages. Go to %s to view your Event Espresso pages.',
                    'event_espresso'
                ),
                '<a href="'
                . admin_url('admin.php?page=espresso_general_settings&action=critical_pages')
                . '">'
                . __('Event Espresso Critical Pages Settings', 'event_espresso')
                . '</a>'
            );
            EE_Error::add_persistent_admin_notice('critical_page_problem', $msg);
        }
        if (EE_Error::has_notices()) {
            EE_Error::get_notices(false, true, true);
        }
    }



    /**
     * Returns the first post which uses the specified shortcode
     *
     * @param string $ee_shortcode usually one of the critical pages shortcodes, eg
     *                             ESPRESSO_THANK_YOU. So we will search fora post with the content
     *                             "[ESPRESSO_THANK_YOU"
     *                             (we don't search for the closing shortcode bracket because they might have added
     *                             parameter to the shortcode
     * @return WP_Post or NULl
     */
    public static function get_page_by_ee_shortcode($ee_shortcode)
    {
        global $wpdb;
        $shortcode_and_opening_bracket = '[' . $ee_shortcode;
        $post_id = $wpdb->get_var("SELECT ID FROM {$wpdb->posts} WHERE post_content LIKE '%$shortcode_and_opening_bracket%' LIMIT 1");
        if ($post_id) {
            return get_post($post_id);
        } else {
            return null;
        }
    }


    /**
     *    This function generates a post for critical espresso pages
     *
     * @access public
     * @static
     * @param array $critical_page
     * @return array
     */
    public static function create_critical_page($critical_page)
    {

        $post_args = array(
            'post_title'     => $critical_page['name'],
            'post_status'    => 'publish',
            'post_type'      => 'page',
            'comment_status' => 'closed',
            'post_content'   => '[' . $critical_page['code'] . ']',
        );

        $post_id = wp_insert_post($post_args);
        if (! $post_id) {
            $msg = sprintf(
                __('The Event Espresso  critical page entitled "%s" could not be created.', 'event_espresso'),
                $critical_page['name']
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return $critical_page;
        }
        // get newly created post's details
        if (! $critical_page['post'] = get_post($post_id)) {
            $msg = sprintf(
                __('The Event Espresso critical page entitled "%s" could not be retrieved.', 'event_espresso'),
                $critical_page['name']
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        }

        return $critical_page;

    }





    /**
     *    This function adds a critical page's shortcode to the post_shortcodes array
     *
     * @access private
     * @static
     * @param array $critical_page
     * @return void
     */
    private static function _track_critical_page_post_shortcodes($critical_page = array())
    {
        // check the goods
        if ( ! $critical_page['post'] instanceof WP_Post) {
            $msg = sprintf(
                __(
                    'The Event Espresso critical page shortcode for the page %s can not be tracked because it is not a WP_Post object.',
                    'event_espresso'
                ),
                $critical_page['name']
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return;
        }
        $EE_Core_Config = EE_Registry::instance()->CFG->core;
        // map shortcode to post
        $EE_Core_Config->post_shortcodes[$critical_page['post']->post_name][$critical_page['code']] = $critical_page['post']->ID;
        // and make sure it's NOT added to the WP "Posts Page"
        // name of the WP Posts Page
        $posts_page = EE_Config::get_page_for_posts();
        if (isset($EE_Core_Config->post_shortcodes[$posts_page])) {
            unset($EE_Core_Config->post_shortcodes[$posts_page][$critical_page['code']]);
        }
        if ($posts_page !== 'posts' && isset($EE_Core_Config->post_shortcodes['posts'])) {
            unset($EE_Core_Config->post_shortcodes['posts'][$critical_page['code']]);
        }
        // update post_shortcode CFG
        EE_Config::instance()->update_espresso_config(false, false);
        // verify that saved ID in the config matches the ID for the post the shortcode is on
        if (
            EE_Registry::instance()->CFG->core->post_shortcodes[$critical_page['post']->post_name][$critical_page['code']]
            !== $critical_page['post']->ID
        ) {
            $msg = sprintf(
                __(
                    'The Event Espresso critical page shortcode for the %s page could not be configured properly.',
                    'event_espresso'
                ),
                $critical_page['name']
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        }
    }



    /**
     * Tries to find the oldest admin for this site.  If there are no admins for this site then return NULL.
     * The role being used to check is filterable.
     *
     * @since  4.6.0
     * @global WPDB $wpdb
     * @return mixed null|int WP_user ID or NULL
     */
    public static function get_default_creator_id()
    {
        global $wpdb;
        if ( ! empty(self::$_default_creator_id)) {
            return self::$_default_creator_id;
        }/**/
        $role_to_check = apply_filters('FHEE__EEH_Activation__get_default_creator_id__role_to_check', 'administrator');
        //let's allow pre_filtering for early exits by alternative methods for getting id.  We check for truthy result and if so then exit early.
        $pre_filtered_id = apply_filters(
            'FHEE__EEH_Activation__get_default_creator_id__pre_filtered_id',
            false,
            $role_to_check
        );
        if ($pre_filtered_id !== false) {
            return (int)$pre_filtered_id;
        }
        $capabilities_key = \EEH_Activation::getTableAnalysis()->ensureTableNameHasPrefix('capabilities');
        $query = $wpdb->prepare(
            "SELECT user_id FROM $wpdb->usermeta WHERE meta_key = '$capabilities_key' AND meta_value LIKE %s ORDER BY user_id ASC LIMIT 0,1",
            '%' . $role_to_check . '%'
        );
        $user_id = $wpdb->get_var($query);
        $user_id = apply_filters('FHEE__EEH_Activation_Helper__get_default_creator_id__user_id', $user_id);
        if ($user_id && (int)$user_id) {
            self::$_default_creator_id = (int)$user_id;
            return self::$_default_creator_id;
        } else {
            return null;
        }
    }



    /**
     * used by EE and EE addons during plugin activation to create tables.
     * Its a wrapper for EventEspresso\core\services\database\TableManager::createTable,
     * but includes extra logic regarding activations.
     *
     * @access public
     * @static
     * @param string  $table_name              without the $wpdb->prefix
     * @param string  $sql                     SQL for creating the table (contents between brackets in an SQL create
     *                                         table query)
     * @param string  $engine                  like 'ENGINE=MyISAM' or 'ENGINE=InnoDB'
     * @param boolean $drop_pre_existing_table set to TRUE when you want to make SURE the table is completely empty
     *                                         and new once this function is done (ie, you really do want to CREATE a
     *                                         table, and expect it to be empty once you're done) leave as FALSE when
     *                                         you just want to verify the table exists and matches this definition
     *                                         (and if it HAS data in it you want to leave it be)
     * @return void
     * @throws EE_Error if there are database errors
     */
    public static function create_table($table_name, $sql, $engine = 'ENGINE=MyISAM ', $drop_pre_existing_table = false)
    {
        if (apply_filters('FHEE__EEH_Activation__create_table__short_circuit', false, $table_name, $sql)) {
            return;
        }
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        if ( ! function_exists('dbDelta')) {
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        }
        $tableAnalysis = \EEH_Activation::getTableAnalysis();
        $wp_table_name = $tableAnalysis->ensureTableNameHasPrefix($table_name);
        // do we need to first delete an existing version of this table ?
        if ($drop_pre_existing_table && $tableAnalysis->tableExists($wp_table_name)) {
            // ok, delete the table... but ONLY if it's empty
            $deleted_safely = EEH_Activation::delete_db_table_if_empty($wp_table_name);
            // table is NOT empty, are you SURE you want to delete this table ???
            if ( ! $deleted_safely && defined('EE_DROP_BAD_TABLES') && EE_DROP_BAD_TABLES) {
                \EEH_Activation::getTableManager()->dropTable($wp_table_name);
            } else if ( ! $deleted_safely) {
                // so we should be more cautious rather than just dropping tables so easily
                error_log(
                    sprintf(
                        __(
                            'It appears that database table "%1$s" exists when it shouldn\'t, and therefore may contain erroneous data. If you have previously restored your database from a backup that didn\'t remove the old tables, then we recommend: %2$s 1. create a new COMPLETE backup of your database, %2$s 2. delete ALL tables from your database, %2$s 3. restore to your previous backup. %2$s If, however, you have not restored to a backup, then somehow your "%3$s" WordPress option could not be read. You can probably ignore this message, but should investigate why that option is being removed.',
                            'event_espresso'
                        ),
                        $wp_table_name,
                        '<br/>',
                        'espresso_db_update'
                    )
                );
            }
        }
        $engine = str_replace('ENGINE=', '', $engine);
        \EEH_Activation::getTableManager()->createTable($table_name, $sql, $engine);
    }



    /**
     *    add_column_if_it_doesn't_exist
     *    Checks if this column already exists on the specified table. Handy for addons which want to add a column
     *
     * @access     public
     * @static
     * @deprecated instead use TableManager::addColumn()
     * @param string $table_name  (without "wp_", eg "esp_attendee"
     * @param string $column_name
     * @param string $column_info if your SQL were 'ALTER TABLE table_name ADD price VARCHAR(10)', this would be
     *                            'VARCHAR(10)'
     * @return bool|int
     */
    public static function add_column_if_it_doesnt_exist(
        $table_name,
        $column_name,
        $column_info = 'INT UNSIGNED NOT NULL'
    ) {
        return \EEH_Activation::getTableManager()->addColumn($table_name, $column_name, $column_info);
    }


    /**
     * get_fields_on_table
     * Gets all the fields on the database table.
     *
     * @access     public
     * @deprecated instead use TableManager::getTableColumns()
     * @static
     * @param string $table_name , without prefixed $wpdb->prefix
     * @return array of database column names
     */
    public static function get_fields_on_table($table_name = null)
    {
        return \EEH_Activation::getTableManager()->getTableColumns($table_name);
    }


    /**
     * db_table_is_empty
     *
     * @access     public\
     * @deprecated instead use TableAnalysis::tableIsEmpty()
     * @static
     * @param string $table_name
     * @return bool
     */
    public static function db_table_is_empty($table_name)
    {
        return \EEH_Activation::getTableAnalysis()->tableIsEmpty($table_name);
    }


    /**
     * delete_db_table_if_empty
     *
     * @access public
     * @static
     * @param string $table_name
     * @return bool | int
     */
    public static function delete_db_table_if_empty($table_name)
    {
        if (\EEH_Activation::getTableAnalysis()->tableIsEmpty($table_name)) {
            return \EEH_Activation::getTableManager()->dropTable($table_name);
        }
        return false;
    }


    /**
     * delete_unused_db_table
     *
     * @access     public
     * @static
     * @deprecated instead use TableManager::dropTable()
     * @param string $table_name
     * @return bool | int
     */
    public static function delete_unused_db_table($table_name)
    {
        return \EEH_Activation::getTableManager()->dropTable($table_name);
    }


    /**
     * drop_index
     *
     * @access     public
     * @static
     * @deprecated instead use TableManager::dropIndex()
     * @param string $table_name
     * @param string $index_name
     * @return bool | int
     */
    public static function drop_index($table_name, $index_name)
    {
        return \EEH_Activation::getTableManager()->dropIndex($table_name, $index_name);
    }



    /**
     * create_database_tables
     *
     * @access public
     * @static
     * @throws EE_Error
     * @return boolean success (whether database is setup properly or not)
     */
    public static function create_database_tables()
    {
        EE_Registry::instance()->load_core('Data_Migration_Manager');
        //find the migration script that sets the database to be compatible with the code
        $dms_name = EE_Data_Migration_Manager::instance()->get_most_up_to_date_dms();
        if ($dms_name) {
            $current_data_migration_script = EE_Registry::instance()->load_dms($dms_name);
            $current_data_migration_script->set_migrating(false);
            $current_data_migration_script->schema_changes_before_migration();
            $current_data_migration_script->schema_changes_after_migration();
            if ($current_data_migration_script->get_errors()) {
                if (WP_DEBUG) {
                    foreach ($current_data_migration_script->get_errors() as $error) {
                        EE_Error::add_error($error, __FILE__, __FUNCTION__, __LINE__);
                    }
                } else {
                    EE_Error::add_error(
                        __(
                            'There were errors creating the Event Espresso database tables and Event Espresso has been 
                            deactivated. To view the errors, please enable WP_DEBUG in your wp-config.php file.',
                            'event_espresso'
                        )
                    );
                }
                return false;
            }
            EE_Data_Migration_Manager::instance()->update_current_database_state_to();
        } else {
            EE_Error::add_error(
                __(
                    'Could not determine most up-to-date data migration script from which to pull database schema
                     structure. So database is probably not setup properly',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        return true;
    }



    /**
     * initialize_system_questions
     *
     * @access public
     * @static
     * @return void
     */
    public static function initialize_system_questions()
    {
        // QUESTION GROUPS
        global $wpdb;
        $table_name = \EEH_Activation::getTableAnalysis()->ensureTableNameHasPrefix('esp_question_group');
        $SQL = "SELECT QSG_system FROM $table_name WHERE QSG_system != 0";
        // what we have
        $question_groups = $wpdb->get_col($SQL);
        // check the response
        $question_groups = is_array($question_groups) ? $question_groups : array();
        // what we should have
        $QSG_systems = array(1, 2);
        // loop thru what we should have and compare to what we have
        foreach ($QSG_systems as $QSG_system) {
            // reset values array
            $QSG_values = array();
            // if we don't have what we should have (but use $QST_system as as string because that's what we got from the db)
            if (! in_array("$QSG_system", $question_groups)) {
                // add it
                switch ($QSG_system) {
                    case 1:
                        $QSG_values = array(
                            'QSG_name'            => __('Personal Information', 'event_espresso'),
                            'QSG_identifier'      => 'personal-information-' . time(),
                            'QSG_desc'            => '',
                            'QSG_order'           => 1,
                            'QSG_show_group_name' => 1,
                            'QSG_show_group_desc' => 1,
                            'QSG_system'          => EEM_Question_Group::system_personal,
                            'QSG_deleted'         => 0,
                        );
                        break;
                    case 2:
                        $QSG_values = array(
                            'QSG_name'            => __('Address Information', 'event_espresso'),
                            'QSG_identifier'      => 'address-information-' . time(),
                            'QSG_desc'            => '',
                            'QSG_order'           => 2,
                            'QSG_show_group_name' => 1,
                            'QSG_show_group_desc' => 1,
                            'QSG_system'          => EEM_Question_Group::system_address,
                            'QSG_deleted'         => 0,
                        );
                        break;
                }
                // make sure we have some values before inserting them
                if (! empty($QSG_values)) {
                    // insert system question
                    $wpdb->insert(
                        $table_name,
                        $QSG_values,
                        array('%s', '%s', '%s', '%d', '%d', '%d', '%d', '%d')
                    );
                    $QSG_IDs[$QSG_system] = $wpdb->insert_id;
                }
            }
        }
        // QUESTIONS
        global $wpdb;
        $table_name = \EEH_Activation::getTableAnalysis()->ensureTableNameHasPrefix('esp_question');
        $SQL = "SELECT QST_system FROM $table_name WHERE QST_system != ''";
        // what we have
        $questions = $wpdb->get_col($SQL);
        // what we should have
        $QST_systems = array(
            'fname',
            'lname',
            'email',
            'address',
            'address2',
            'city',
            'country',
            'state',
            'zip',
            'phone',
        );
        $order_for_group_1 = 1;
        $order_for_group_2 = 1;
        // loop thru what we should have and compare to what we have
        foreach ($QST_systems as $QST_system) {
            // reset values array
            $QST_values = array();
            // if we don't have what we should have
            if (! in_array($QST_system, $questions)) {
                // add it
                switch ($QST_system) {
                    case 'fname':
                        $QST_values = array(
                            'QST_display_text'  => __('First Name', 'event_espresso'),
                            'QST_admin_label'   => __('First Name - System Question', 'event_espresso'),
                            'QST_system'        => 'fname',
                            'QST_type'          => 'TEXT',
                            'QST_required'      => 1,
                            'QST_required_text' => __('This field is required', 'event_espresso'),
                            'QST_order'         => 1,
                            'QST_admin_only'    => 0,
                            'QST_max'           => EEM_Question::instance()->absolute_max_for_system_question($QST_system),
                            'QST_wp_user'       => self::get_default_creator_id(),
                            'QST_deleted'       => 0,
                        );
                        break;
                    case 'lname':
                        $QST_values = array(
                            'QST_display_text'  => __('Last Name', 'event_espresso'),
                            'QST_admin_label'   => __('Last Name - System Question', 'event_espresso'),
                            'QST_system'        => 'lname',
                            'QST_type'          => 'TEXT',
                            'QST_required'      => 1,
                            'QST_required_text' => __('This field is required', 'event_espresso'),
                            'QST_order'         => 2,
                            'QST_admin_only'    => 0,
                            'QST_max'           => EEM_Question::instance()->absolute_max_for_system_question($QST_system),
                            'QST_wp_user'       => self::get_default_creator_id(),
                            'QST_deleted'       => 0,
                        );
                        break;
                    case 'email':
                        $QST_values = array(
                            'QST_display_text'  => __('Email Address', 'event_espresso'),
                            'QST_admin_label'   => __('Email Address - System Question', 'event_espresso'),
                            'QST_system'        => 'email',
                            'QST_type'          => 'EMAIL',
                            'QST_required'      => 1,
                            'QST_required_text' => __('This field is required', 'event_espresso'),
                            'QST_order'         => 3,
                            'QST_admin_only'    => 0,
                            'QST_max'           => EEM_Question::instance()->absolute_max_for_system_question($QST_system),
                            'QST_wp_user'       => self::get_default_creator_id(),
                            'QST_deleted'       => 0,
                        );
                        break;
                    case 'address':
                        $QST_values = array(
                            'QST_display_text'  => __('Address', 'event_espresso'),
                            'QST_admin_label'   => __('Address - System Question', 'event_espresso'),
                            'QST_system'        => 'address',
                            'QST_type'          => 'TEXT',
                            'QST_required'      => 0,
                            'QST_required_text' => __('This field is required', 'event_espresso'),
                            'QST_order'         => 4,
                            'QST_admin_only'    => 0,
                            'QST_max'           => EEM_Question::instance()->absolute_max_for_system_question($QST_system),
                            'QST_wp_user'       => self::get_default_creator_id(),
                            'QST_deleted'       => 0,
                        );
                        break;
                    case 'address2':
                        $QST_values = array(
                            'QST_display_text'  => __('Address2', 'event_espresso'),
                            'QST_admin_label'   => __('Address2 - System Question', 'event_espresso'),
                            'QST_system'        => 'address2',
                            'QST_type'          => 'TEXT',
                            'QST_required'      => 0,
                            'QST_required_text' => __('This field is required', 'event_espresso'),
                            'QST_order'         => 5,
                            'QST_admin_only'    => 0,
                            'QST_max'           => EEM_Question::instance()->absolute_max_for_system_question($QST_system),
                            'QST_wp_user'       => self::get_default_creator_id(),
                            'QST_deleted'       => 0,
                        );
                        break;
                    case 'city':
                        $QST_values = array(
                            'QST_display_text'  => __('City', 'event_espresso'),
                            'QST_admin_label'   => __('City - System Question', 'event_espresso'),
                            'QST_system'        => 'city',
                            'QST_type'          => 'TEXT',
                            'QST_required'      => 0,
                            'QST_required_text' => __('This field is required', 'event_espresso'),
                            'QST_order'         => 6,
                            'QST_admin_only'    => 0,
                            'QST_max'           => EEM_Question::instance()->absolute_max_for_system_question($QST_system),
                            'QST_wp_user'       => self::get_default_creator_id(),
                            'QST_deleted'       => 0,
                        );
                        break;
                    case 'country':
                        $QST_values = array(
                            'QST_display_text'  => __('Country', 'event_espresso'),
                            'QST_admin_label'   => __('Country - System Question', 'event_espresso'),
                            'QST_system'        => 'country',
                            'QST_type'          => 'COUNTRY',
                            'QST_required'      => 0,
                            'QST_required_text' => __('This field is required', 'event_espresso'),
                            'QST_order'         => 7,
                            'QST_admin_only'    => 0,
                            'QST_wp_user'       => self::get_default_creator_id(),
                            'QST_deleted'       => 0,
                        );
                        break;
                    case 'state':
                        $QST_values = array(
                            'QST_display_text'  => __('State/Province', 'event_espresso'),
                            'QST_admin_label'   => __('State/Province - System Question', 'event_espresso'),
                            'QST_system'        => 'state',
                            'QST_type'          => 'STATE',
                            'QST_required'      => 0,
                            'QST_required_text' => __('This field is required', 'event_espresso'),
                            'QST_order'         => 8,
                            'QST_admin_only'    => 0,
                            'QST_wp_user'       => self::get_default_creator_id(),
                            'QST_deleted'       => 0,
                        );
                        break;
                    case 'zip':
                        $QST_values = array(
                            'QST_display_text'  => __('Zip/Postal Code', 'event_espresso'),
                            'QST_admin_label'   => __('Zip/Postal Code - System Question', 'event_espresso'),
                            'QST_system'        => 'zip',
                            'QST_type'          => 'TEXT',
                            'QST_required'      => 0,
                            'QST_required_text' => __('This field is required', 'event_espresso'),
                            'QST_order'         => 9,
                            'QST_admin_only'    => 0,
                            'QST_max'           => EEM_Question::instance()->absolute_max_for_system_question($QST_system),
                            'QST_wp_user'       => self::get_default_creator_id(),
                            'QST_deleted'       => 0,
                        );
                        break;
                    case 'phone':
                        $QST_values = array(
                            'QST_display_text'  => __('Phone Number', 'event_espresso'),
                            'QST_admin_label'   => __('Phone Number - System Question', 'event_espresso'),
                            'QST_system'        => 'phone',
                            'QST_type'          => 'TEXT',
                            'QST_required'      => 0,
                            'QST_required_text' => __('This field is required', 'event_espresso'),
                            'QST_order'         => 10,
                            'QST_admin_only'    => 0,
                            'QST_max'           => EEM_Question::instance()->absolute_max_for_system_question($QST_system),
                            'QST_wp_user'       => self::get_default_creator_id(),
                            'QST_deleted'       => 0,
                        );
                        break;
                }
                if (! empty($QST_values)) {
                    // insert system question
                    $wpdb->insert(
                        $table_name,
                        $QST_values,
                        array('%s', '%s', '%s', '%s', '%d', '%s', '%d', '%d', '%d', '%d')
                    );
                    $QST_ID = $wpdb->insert_id;
                    // QUESTION GROUP QUESTIONS
                    if (in_array($QST_system, array('fname', 'lname', 'email'))) {
                        $system_question_we_want = EEM_Question_Group::system_personal;
                    } else {
                        $system_question_we_want = EEM_Question_Group::system_address;
                    }
                    if (isset($QSG_IDs[$system_question_we_want])) {
                        $QSG_ID = $QSG_IDs[$system_question_we_want];
                    } else {
                        $id_col = EEM_Question_Group::instance()
                                                    ->get_col(array(array('QSG_system' => $system_question_we_want)));
                        if (is_array($id_col)) {
                            $QSG_ID = reset($id_col);
                        } else {
                            //ok so we didn't find it in the db either?? that's weird because we should have inserted it at the start of this method
                            EE_Log::instance()->log(
                                __FILE__,
                                __FUNCTION__,
                                sprintf(
                                    __(
                                        'Could not associate question %1$s to a question group because no system question
                                         group existed',
                                        'event_espresso'
                                    ),
                                    $QST_ID),
                                'error');
                            continue;
                        }
                    }
                    // add system questions to groups
                    $wpdb->insert(
                        \EEH_Activation::getTableAnalysis()->ensureTableNameHasPrefix('esp_question_group_question'),
                        array(
                            'QSG_ID'    => $QSG_ID,
                            'QST_ID'    => $QST_ID,
                            'QGQ_order' => ($QSG_ID === 1) ? $order_for_group_1++ : $order_for_group_2++,
                        ),
                        array('%d', '%d', '%d')
                    );
                }
            }
        }
    }


    /**
     * Makes sure the default payment method (Invoice) is active.
     * This used to be done automatically as part of constructing the old gateways config
     *
     * @throws \EE_Error
     */
    public static function insert_default_payment_methods()
    {
        if (! EEM_Payment_Method::instance()->count_active(EEM_Payment_Method::scope_cart)) {
            EE_Registry::instance()->load_lib('Payment_Method_Manager');
            EE_Payment_Method_Manager::instance()->activate_a_payment_method_of_type('Invoice');
        } else {
            EEM_Payment_Method::instance()->verify_button_urls();
        }
    }

    /**
     * insert_default_status_codes
     *
     * @access public
     * @static
     * @return void
     */
    public static function insert_default_status_codes()
    {

        global $wpdb;

        if (\EEH_Activation::getTableAnalysis()->tableExists(EEM_Status::instance()->table())) {

            $table_name = EEM_Status::instance()->table();

            $SQL = "DELETE FROM $table_name WHERE STS_ID IN ( 'ACT', 'NAC', 'NOP', 'OPN', 'CLS', 'PND', 'ONG', 'SEC', 'DRF', 'DEL', 'DEN', 'EXP', 'RPP', 'RCN', 'RDC', 'RAP', 'RNA', 'RWL', 'TAB', 'TIN', 'TFL', 'TCM', 'TOP', 'PAP', 'PCN', 'PFL', 'PDC', 'EDR', 'ESN', 'PPN', 'RIC', 'MSN', 'MFL', 'MID', 'MRS', 'MIC', 'MDO', 'MEX' );";
            $wpdb->query($SQL);

            $SQL = "INSERT INTO $table_name
					(STS_ID, STS_code, STS_type, STS_can_edit, STS_desc, STS_open) VALUES
					('ACT', 'ACTIVE', 'event', 0, NULL, 1),
					('NAC', 'NOT_ACTIVE', 'event', 0, NULL, 0),
					('NOP', 'REGISTRATION_NOT_OPEN', 'event', 0, NULL, 1),
					('OPN', 'REGISTRATION_OPEN', 'event', 0, NULL, 1),
					('CLS', 'REGISTRATION_CLOSED', 'event', 0, NULL, 0),
					('PND', 'PENDING', 'event', 0, NULL, 1),
					('ONG', 'ONGOING', 'event', 0, NULL, 1),
					('SEC', 'SECONDARY', 'event', 0, NULL, 1),
					('DRF', 'DRAFT', 'event', 0, NULL, 0),
					('DEL', 'DELETED', 'event', 0, NULL, 0),
					('DEN', 'DENIED', 'event', 0, NULL, 0),
					('EXP', 'EXPIRED', 'event', 0, NULL, 0),
					('RPP', 'PENDING_PAYMENT', 'registration', 0, NULL, 1),
					('RAP', 'APPROVED', 'registration', 0, NULL, 1),
					('RCN', 'CANCELLED', 'registration', 0, NULL, 0),
					('RDC', 'DECLINED', 'registration', 0, NULL, 0),
					('RNA', 'NOT_APPROVED', 'registration', 0, NULL, 1),
					('RIC', 'INCOMPLETE', 'registration', 0, NULL, 1),
					('RWL', 'WAIT_LIST', 'registration', 0, NULL, 1),
					('TFL', 'FAILED', 'transaction', 0, NULL, 0),
					('TAB', 'ABANDONED', 'transaction', 0, NULL, 0),
					('TIN', 'INCOMPLETE', 'transaction', 0, NULL, 1),
					('TCM', 'COMPLETE', 'transaction', 0, NULL, 1),
					('TOP',	'OVERPAID', 'transaction', 0, NULL, 1),
					('PAP', 'APPROVED', 'payment', 0, NULL, 1),
					('PPN', 'PENDING', 'payment', 0, NULL, 1),
					('PCN', 'CANCELLED', 'payment', 0, NULL, 0),
					('PFL', 'FAILED', 'payment', 0, NULL, 0),
					('PDC', 'DECLINED', 'payment', 0, NULL, 0),
					('EDR', 'DRAFT', 'email', 0, NULL, 0),
					('ESN', 'SENT', 'email', 0, NULL, 1),
					('MSN', 'SENT', 'message', 0, NULL, 0),
					('MFL', 'FAIL', 'message', 0, NULL, 0),
					('MDO', 'DEBUG_ONLY', 'message', 0, NULL, 0),
					('MEX', 'MESSENGER_EXECUTING', 'message', 0, NULL, 0),
					('MID', 'IDLE', 'message', 0, NULL, 1),
					('MRS', 'RESEND', 'message', 0, NULL, 1),
					('MIC', 'INCOMPLETE', 'message', 0, NULL, 0);";
            $wpdb->query($SQL);

        }

    }


    /**
     * create_upload_directories
     * Creates folders in the uploads directory to facilitate addons and templates
     *
     * @access public
     * @static
     * @return boolean success of verifying upload directories exist
     */
    public static function create_upload_directories()
    {
        // Create the required folders
        $folders = array(
            EVENT_ESPRESSO_TEMPLATE_DIR,
            EVENT_ESPRESSO_GATEWAY_DIR,
            EVENT_ESPRESSO_UPLOAD_DIR . 'logs/',
            EVENT_ESPRESSO_UPLOAD_DIR . 'css/',
            EVENT_ESPRESSO_UPLOAD_DIR . 'tickets/',
        );
        foreach ($folders as $folder) {
            try {
                EEH_File::ensure_folder_exists_and_is_writable($folder);
                @ chmod($folder, 0755);
            } catch (EE_Error $e) {
                EE_Error::add_error(
                    sprintf(
                        __('Could not create the folder at "%1$s" because: %2$s', 'event_espresso'),
                        $folder,
                        '<br />' . $e->getMessage()
                    ),
                    __FILE__, __FUNCTION__, __LINE__
                );
                //indicate we'll need to fix this later
                update_option(EEH_Activation::upload_directories_incomplete_option_name, true);
                return false;
            }
        }
        //just add the .htaccess file to the logs directory to begin with. Even if logging
        //is disabled, there might be activation errors recorded in there
        EEH_File::add_htaccess_deny_from_all(EVENT_ESPRESSO_UPLOAD_DIR . 'logs/');
        //remember EE's folders are all good
        delete_option(EEH_Activation::upload_directories_incomplete_option_name);
        return true;
    }

    /**
     * Whether the upload directories need to be fixed or not.
     * If EE is installed but filesystem access isn't initially available,
     * we need to get the user's filesystem credentials and THEN create them,
     * so there might be period of time when EE is installed but its
     * upload directories aren't available. This indicates such a state
     *
     * @return boolean
     */
    public static function upload_directories_incomplete()
    {
        return get_option(EEH_Activation::upload_directories_incomplete_option_name, false);
    }


    /**
     * generate_default_message_templates
     *
     * @static
     * @throws EE_Error
     * @return bool     true means new templates were created.
     *                  false means no templates were created.
     *                  This is NOT an error flag. To check for errors you will want
     *                  to use either EE_Error or a try catch for an EE_Error exception.
     */
    public static function generate_default_message_templates()
    {
        /** @type EE_Message_Resource_Manager $message_resource_manager */
        $message_resource_manager = EE_Registry::instance()->load_lib('Message_Resource_Manager');
        /*
         * This first method is taking care of ensuring any default messengers
         * that should be made active and have templates generated are done.
         */
        $new_templates_created_for_messenger = self::_activate_and_generate_default_messengers_and_message_templates(
            $message_resource_manager
        );
        /**
         * This method is verifying there are no NEW default message types
         * for ACTIVE messengers that need activated (and corresponding templates setup).
         */
        $new_templates_created_for_message_type = self::_activate_new_message_types_for_active_messengers_and_generate_default_templates(
            $message_resource_manager
        );
        //after all is done, let's persist these changes to the db.
        $message_resource_manager->update_has_activated_messengers_option();
        $message_resource_manager->update_active_messengers_option();
        // will return true if either of these are true.  Otherwise will return false.
        return $new_templates_created_for_message_type || $new_templates_created_for_messenger;
    }



    /**
     * @param \EE_Message_Resource_Manager $message_resource_manager
     * @return array|bool
     * @throws \EE_Error
     */
    protected static function _activate_new_message_types_for_active_messengers_and_generate_default_templates(
        EE_Message_Resource_Manager $message_resource_manager
    ) {
        /** @type EE_messenger[] $active_messengers */
        $active_messengers = $message_resource_manager->active_messengers();
        $installed_message_types = $message_resource_manager->installed_message_types();
        $templates_created = false;
        foreach ($active_messengers as $active_messenger) {
            $default_message_type_names_for_messenger = $active_messenger->get_default_message_types();
            $default_message_type_names_to_activate = array();
            // looping through each default message type reported by the messenger
            // and setup the actual message types to activate.
            foreach ($default_message_type_names_for_messenger as $default_message_type_name_for_messenger) {
                // if already active or has already been activated before we skip
                // (otherwise we might reactivate something user's intentionally deactivated.)
                // we also skip if the message type is not installed.
                if (
                    $message_resource_manager->has_message_type_been_activated_for_messenger(
                        $default_message_type_name_for_messenger,
                        $active_messenger->name
                    )
                    || $message_resource_manager->is_message_type_active_for_messenger(
                        $active_messenger->name,
                        $default_message_type_name_for_messenger
                    )
                    || ! isset($installed_message_types[$default_message_type_name_for_messenger])
                ) {
                    continue;
                }
                $default_message_type_names_to_activate[] = $default_message_type_name_for_messenger;
            }
            //let's activate!
            $message_resource_manager->ensure_message_types_are_active(
                $default_message_type_names_to_activate,
                $active_messenger->name,
                false
            );
            //activate the templates for these message types
            if ( ! empty($default_message_type_names_to_activate)) {
                $templates_created = EEH_MSG_Template::generate_new_templates(
                    $active_messenger->name,
                    $default_message_type_names_for_messenger,
                    '',
                    true
                );
            }
        }
        return $templates_created;
    }



    /**
     * This will activate and generate default messengers and default message types for those messengers.
     *
     * @param EE_message_Resource_Manager $message_resource_manager
     * @return array|bool  True means there were default messengers and message type templates generated.
     *                     False means that there were no templates generated
     *                     (which could simply mean there are no default message types for a messenger).
     * @throws EE_Error
     */
    protected static function _activate_and_generate_default_messengers_and_message_templates(
        EE_Message_Resource_Manager $message_resource_manager
    ) {
        /** @type EE_messenger[] $messengers_to_generate */
        $messengers_to_generate = self::_get_default_messengers_to_generate_on_activation($message_resource_manager);
        $installed_message_types = $message_resource_manager->installed_message_types();
        $templates_generated = false;
        foreach ($messengers_to_generate as $messenger_to_generate) {
            $default_message_type_names_for_messenger = $messenger_to_generate->get_default_message_types();
            //verify the default message types match an installed message type.
            foreach ($default_message_type_names_for_messenger as $key => $name) {
                if (
                    ! isset($installed_message_types[$name])
                    || $message_resource_manager->has_message_type_been_activated_for_messenger(
                        $name,
                        $messenger_to_generate->name
                    )
                ) {
                    unset($default_message_type_names_for_messenger[$key]);
                }
            }
            // in previous iterations, the active_messengers option in the db
            // needed updated before calling create templates. however with the changes this may not be necessary.
            // This comment is left here just in case we discover that we _do_ need to update before
            // passing off to create templates (after the refactor is done).
            // @todo remove this comment when determined not necessary.
            $message_resource_manager->activate_messenger(
                $messenger_to_generate->name,
                $default_message_type_names_for_messenger,
                false
            );
            //create any templates needing created (or will reactivate templates already generated as necessary).
            if ( ! empty($default_message_type_names_for_messenger)) {
                $templates_generated = EEH_MSG_Template::generate_new_templates(
                    $messenger_to_generate->name,
                    $default_message_type_names_for_messenger,
                    '',
                    true
                );
            }
        }
        return $templates_generated;
    }


    /**
     * This returns the default messengers to generate templates for on activation of EE.
     * It considers:
     * - whether a messenger is already active in the db.
     * - whether a messenger has been made active at any time in the past.
     *
     * @static
     * @param  EE_Message_Resource_Manager $message_resource_manager
     * @return EE_messenger[]
     */
    protected static function _get_default_messengers_to_generate_on_activation(
        EE_Message_Resource_Manager $message_resource_manager
    ) {
        $active_messengers    = $message_resource_manager->active_messengers();
        $installed_messengers = $message_resource_manager->installed_messengers();
        $has_activated        = $message_resource_manager->get_has_activated_messengers_option();

        $messengers_to_generate = array();
        foreach ($installed_messengers as $installed_messenger) {
            //if installed messenger is a messenger that should be activated on install
            //and is not already active
            //and has never been activated
            if (
                ! $installed_messenger->activate_on_install
                || isset($active_messengers[$installed_messenger->name])
                || isset($has_activated[$installed_messenger->name])
            ) {
                continue;
            }
            $messengers_to_generate[$installed_messenger->name] = $installed_messenger;
        }
        return $messengers_to_generate;
    }


    /**
     * This simply validates active message types to ensure they actually match installed
     * message types.  If there's a mismatch then we deactivate the message type and ensure all related db
     * rows are set inactive.
     * Note: Messengers are no longer validated here as of 4.9.0 because they get validated automatically whenever
     * EE_Messenger_Resource_Manager is constructed.  Message Types are a bit more resource heavy for validation so they
     * are still handled in here.
     *
     * @since 4.3.1
     * @return void
     */
    public static function validate_messages_system()
    {
        /** @type EE_Message_Resource_Manager $message_resource_manager */
        $message_resource_manager = EE_Registry::instance()->load_lib('Message_Resource_Manager');
        $message_resource_manager->validate_active_message_types_are_installed();
        do_action('AHEE__EEH_Activation__validate_messages_system');
    }


    /**
     * create_no_ticket_prices_array
     *
     * @access public
     * @static
     * @return void
     */
    public static function create_no_ticket_prices_array()
    {
        // this creates an array for tracking events that have no active ticket prices created
        // this allows us to warn admins of the situation so that it can be corrected
        $espresso_no_ticket_prices = get_option('ee_no_ticket_prices', false);
        if (! $espresso_no_ticket_prices) {
            add_option('ee_no_ticket_prices', array(), '', false);
        }
    }


    /**
     * plugin_deactivation
     *
     * @access public
     * @static
     * @return void
     */
    public static function plugin_deactivation()
    {
    }


    /**
     * Finds all our EE4 custom post types, and deletes them and their associated data
     * (like post meta or term relations)
     *
     * @global wpdb $wpdb
     * @throws \EE_Error
     */
    public static function delete_all_espresso_cpt_data()
    {
        global $wpdb;
        //get all the CPT post_types
        $ee_post_types = array();
        foreach (EE_Registry::instance()->non_abstract_db_models as $model_name) {
            if (method_exists($model_name, 'instance')) {
                $model_obj = call_user_func(array($model_name, 'instance'));
                if ($model_obj instanceof EEM_CPT_Base) {
                    $ee_post_types[] = $wpdb->prepare("%s", $model_obj->post_type());
                }
            }
        }
        //get all our CPTs
        $query   = "SELECT ID FROM {$wpdb->posts} WHERE post_type IN (" . implode(",", $ee_post_types) . ")";
        $cpt_ids = $wpdb->get_col($query);
        //delete each post meta and term relations too
        foreach ($cpt_ids as $post_id) {
            wp_delete_post($post_id, true);
        }
    }

    /**
     * Deletes all EE custom tables
     *
     * @return array
     */
    public static function drop_espresso_tables()
    {
        $tables = array();
        // load registry
        foreach (EE_Registry::instance()->non_abstract_db_models as $model_name) {
            if (method_exists($model_name, 'instance')) {
                $model_obj = call_user_func(array($model_name, 'instance'));
                if ($model_obj instanceof EEM_Base) {
                    foreach ($model_obj->get_tables() as $table) {
                        if (strpos($table->get_table_name(), 'esp_')
                            &&
                            (
                                is_main_site()//main site? nuke them all
                                || ! $table->is_global()//not main site,but not global either. nuke it
                            )
                        ) {
                            $tables[] = $table->get_table_name();
                        }
                    }
                }
            }
        }

        //there are some tables whose models were removed.
        //they should be removed when removing all EE core's data
        $tables_without_models = array(
            'esp_promotion',
            'esp_promotion_applied',
            'esp_promotion_object',
            'esp_promotion_rule',
            'esp_rule',
        );
        foreach ($tables_without_models as $table) {
            $tables[] = $table;
        }
        return \EEH_Activation::getTableManager()->dropTables($tables);
    }



    /**
     * Drops all the tables mentioned in a single MYSQL query. Double-checks
     * each table name provided has a wpdb prefix attached, and that it exists.
     * Returns the list actually deleted
     *
     * @deprecated in 4.9.13. Instead use TableManager::dropTables()
     * @global WPDB $wpdb
     * @param array $table_names
     * @return array of table names which we deleted
     */
    public static function drop_tables($table_names)
    {
        return \EEH_Activation::getTableManager()->dropTables($table_names);
    }



    /**
     * plugin_uninstall
     *
     * @access public
     * @static
     * @param bool $remove_all
     * @return void
     */
    public static function delete_all_espresso_tables_and_data($remove_all = true)
    {
        global $wpdb;
        self::drop_espresso_tables();
        $wp_options_to_delete = array(
            'ee_no_ticket_prices'                => true,
            'ee_active_messengers'               => true,
            'ee_has_activated_messenger'         => true,
            'ee_flush_rewrite_rules'             => true,
            'ee_config'                          => false,
            'ee_data_migration_current_db_state' => true,
            'ee_data_migration_mapping_'         => false,
            'ee_data_migration_script_'          => false,
            'ee_data_migrations'                 => true,
            'ee_dms_map'                         => false,
            'ee_notices'                         => true,
            'lang_file_check_'                   => false,
            'ee_maintenance_mode'                => true,
            'ee_ueip_optin'                      => true,
            'ee_ueip_has_notified'               => true,
            'ee_plugin_activation_errors'        => true,
            'ee_id_mapping_from'                 => false,
            'espresso_persistent_admin_notices'  => true,
            'ee_encryption_key'                  => true,
            'pue_force_upgrade_'                 => false,
            'pue_json_error_'                    => false,
            'pue_install_key_'                   => false,
            'pue_verification_error_'            => false,
            'pu_dismissed_upgrade_'              => false,
            'external_updates-'                  => false,
            'ee_extra_data'                      => true,
            'ee_ssn_'                            => false,
            'ee_rss_'                            => false,
            'ee_rte_n_tx_'                       => false,
            'ee_pers_admin_notices'              => true,
            'ee_job_parameters_'                 => false,
            'ee_upload_directories_incomplete'   => true,
            'ee_verified_db_collations'          => true,
        );
        if (is_main_site()) {
            $wp_options_to_delete['ee_network_config'] = true;
        }
        $undeleted_options = array();
        foreach ($wp_options_to_delete as $option_name => $no_wildcard) {
            if ($no_wildcard) {
                if ( ! delete_option($option_name)) {
                    $undeleted_options[] = $option_name;
                }
            } else {
                $option_names_to_delete_from_wildcard = $wpdb->get_col("SELECT option_name FROM $wpdb->options WHERE option_name LIKE '%$option_name%'");
                foreach ($option_names_to_delete_from_wildcard as $option_name_from_wildcard) {
                    if ( ! delete_option($option_name_from_wildcard)) {
                        $undeleted_options[] = $option_name_from_wildcard;
                    }
                }
            }
        }
        //also, let's make sure the "ee_config_option_names" wp option stays out by removing the action that adds it
        remove_action('shutdown', array(EE_Config::instance(), 'shutdown'), 10);
        if ($remove_all && $espresso_db_update = get_option('espresso_db_update')) {
            $db_update_sans_ee4 = array();
            foreach ($espresso_db_update as $version => $times_activated) {
                if ((string)$version[0] === '3') {//if its NON EE4
                    $db_update_sans_ee4[$version] = $times_activated;
                }
            }
            update_option('espresso_db_update', $db_update_sans_ee4);
        }
        $errors = '';
        if ( ! empty($undeleted_options)) {
            $errors .= sprintf(
                __('The following wp-options could not be deleted: %s%s', 'event_espresso'),
                '<br/>',
                implode(',<br/>', $undeleted_options)
            );
        }
        if ( ! empty($errors)) {
            EE_Error::add_attention($errors, __FILE__, __FUNCTION__, __LINE__);
        }
    }

    /**
     * Gets the mysql error code from the last used query by wpdb
     *
     * @return int mysql error code, see https://dev.mysql.com/doc/refman/5.5/en/error-messages-server.html
     */
    public static function last_wpdb_error_code()
    {
        global $wpdb;
        if ($wpdb->use_mysqli) {
            return mysqli_errno($wpdb->dbh);
        } else {
            return mysql_errno($wpdb->dbh);
        }
    }

    /**
     * Checks that the database table exists. Also works on temporary tables (for unit tests mostly).
     *
     * @global wpdb  $wpdb
     * @deprecated instead use TableAnalysis::tableExists()
     * @param string $table_name with or without $wpdb->prefix
     * @return boolean
     */
    public static function table_exists($table_name)
    {
        return \EEH_Activation::getTableAnalysis()->tableExists($table_name);
    }

    /**
     * Resets the cache on EEH_Activation
     */
    public static function reset()
    {
        self::$_default_creator_id                             = null;
        self::$_initialized_db_content_already_in_this_request = false;
    }
}
// End of file EEH_Activation.helper.php
// Location: /helpers/EEH_Activation.core.php

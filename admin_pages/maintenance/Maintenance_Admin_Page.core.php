<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}



/**
 * Event Espresso
 * Event Registration and Management Plugin for Wordpress
 *
 * @package         Event Espresso
 * @author          Seth Shoultes
 * @copyright    (c)2009-2012 Event Espresso All Rights Reserved.
 * @license         http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link            http://www.eventespresso.com
 * @version         4.0
 *                  ------------------------------------------------------------------------
 *                  Maintenance_Admin_Page
 *                  This contains the logic for setting up the Event Maintenance related admin pages.  Any methods
 *                  without phpdoc comments have inline docs with parent class.
 * @package         Maintenance_Admin_Page
 * @subpackage      includes/core/admin/Maintenance_Admin_Page.core.php
 * @author          Darren Ethier
 *                  ------------------------------------------------------------------------
 */
class Maintenance_Admin_Page extends EE_Admin_Page
{


    public function __construct($routing = true)
    {
        parent::__construct($routing);
    }



    protected function _init_page_props()
    {
        $this->page_slug = EE_MAINTENANCE_PG_SLUG;
        $this->page_label = EE_MAINTENANCE_LABEL;
        $this->_admin_base_url = EE_MAINTENANCE_ADMIN_URL;
        $this->_admin_base_path = EE_MAINTENANCE_ADMIN;
    }



    protected function _ajax_hooks()
    {
        add_action('wp_ajax_migration_step', array($this, 'migration_step'));
        add_action('wp_ajax_add_error_to_migrations_ran', array($this, 'add_error_to_migrations_ran'));
    }



    protected function _define_page_props()
    {
        $this->_admin_page_title = EE_MAINTENANCE_LABEL;
        $this->_labels = array(
            'buttons' => array(
                'reset_reservations' => esc_html__('Reset Ticket and Datetime Reserved Counts', 'event_espresso'),
                'reset_capabilities' => esc_html__('Reset Event Espresso Capabilities', 'event_espresso'),
            ),
        );
    }



    protected function _set_page_routes()
    {
        $this->_page_routes = array(
            'default'                             => array(
                'func'       => '_maintenance',
                'capability' => 'manage_options',
            ),
            'change_maintenance_level'            => array(
                'func'       => '_change_maintenance_level',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            'system_status'                       => array(
                'func'       => '_system_status',
                'capability' => 'manage_options',
            ),
            'download_system_status' => array(
                'func'       => '_download_system_status',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            'send_migration_crash_report'         => array(
                'func'       => '_send_migration_crash_report',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            'confirm_migration_crash_report_sent' => array(
                'func'       => '_confirm_migration_crash_report_sent',
                'capability' => 'manage_options',
            ),
            'data_reset'                          => array(
                'func'       => '_data_reset_and_delete',
                'capability' => 'manage_options',
            ),
            'reset_db'                            => array(
                'func'       => '_reset_db',
                'capability' => 'manage_options',
                'noheader'   => true,
                'args'       => array('nuke_old_ee4_data' => true),
            ),
            'start_with_fresh_ee4_db'             => array(
                'func'       => '_reset_db',
                'capability' => 'manage_options',
                'noheader'   => true,
                'args'       => array('nuke_old_ee4_data' => false),
            ),
            'delete_db'                           => array(
                'func'       => '_delete_db',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            'rerun_migration_from_ee3'            => array(
                'func'       => '_rerun_migration_from_ee3',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            'reset_reservations'                  => array(
                'func'       => '_reset_reservations',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            'reset_capabilities'                  => array(
                'func'       => '_reset_capabilities',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            'reattempt_migration'                 => array(
                'func'       => '_reattempt_migration',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
        );
    }



    protected function _set_page_config()
    {
        $this->_page_config = array(
            'default'       => array(
                'nav'           => array(
                    'label' => esc_html__('Maintenance', 'event_espresso'),
                    'order' => 10,
                ),
                'require_nonce' => false,
            ),
            'data_reset'    => array(
                'nav'           => array(
                    'label' => esc_html__('Reset/Delete Data', 'event_espresso'),
                    'order' => 20,
                ),
                'require_nonce' => false,
            ),
            'system_status' => array(
                'nav'           => array(
                    'label' => esc_html__("System Information", "event_espresso"),
                    'order' => 30,
                ),
                'require_nonce' => false,
            ),
        );
    }



    /**
     * default maintenance page. If we're in maintenance mode level 2, then we need to show
     * the migration scripts and all that UI.
     */
    public function _maintenance()
    {
        //it all depends if we're in maintenance model level 1 (frontend-only) or
        //level 2 (everything except maintenance page)
        try {
            //get the current maintenance level and check if
            //we are removed
            $mm = EE_Maintenance_Mode::instance()->level();
            $placed_in_mm = EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
            if ($mm == EE_Maintenance_Mode::level_2_complete_maintenance && ! $placed_in_mm) {
                //we just took the site out of maintenance mode, so notify the user.
                //unfortunately this message appears to be echoed on the NEXT page load...
                //oh well, we should really be checking for this on addon deactivation anyways
                EE_Error::add_attention(__('Site taken out of maintenance mode because no data migration scripts are required',
                    'event_espresso'));
                $this->_process_notices(array('page' => 'espresso_maintenance_settings'), false);
            }
            //in case an exception is thrown while trying to handle migrations
            switch (EE_Maintenance_Mode::instance()->level()) {
                case EE_Maintenance_Mode::level_0_not_in_maintenance:
                case EE_Maintenance_Mode::level_1_frontend_only_maintenance:
                    $show_maintenance_switch = true;
                    $show_backup_db_text = false;
                    $show_migration_progress = false;
                    $script_names = array();
                    $addons_should_be_upgraded_first = false;
                    break;
                case EE_Maintenance_Mode::level_2_complete_maintenance:
                    $show_maintenance_switch = false;
                    $show_migration_progress = true;
                    if (isset($this->_req_data['continue_migration'])) {
                        $show_backup_db_text = false;
                    } else {
                        $show_backup_db_text = true;
                    }
                    $scripts_needing_to_run = EE_Data_Migration_Manager::instance()
                                                                       ->check_for_applicable_data_migration_scripts();
                    $addons_should_be_upgraded_first = EE_Data_Migration_Manager::instance()->addons_need_updating();
                    $script_names = array();
                    $current_script = null;
                    foreach ($scripts_needing_to_run as $script) {
                        if ($script instanceof EE_Data_Migration_Script_Base) {
                            if ( ! $current_script) {
                                $current_script = $script;
                                $current_script->migration_page_hooks();
                            }
                            $script_names[] = $script->pretty_name();
                        }
                    }
                    break;
            }
            $most_recent_migration = EE_Data_Migration_Manager::instance()->get_last_ran_script(true);
            $exception_thrown = false;
        } catch (EE_Error $e) {
            EE_Data_Migration_Manager::instance()->add_error_to_migrations_ran($e->getMessage());
            //now, just so we can display the page correctly, make a error migration script stage object
            //and also put the error on it. It only persists for the duration of this request
            $most_recent_migration = new EE_DMS_Unknown_1_0_0();
            $most_recent_migration->add_error($e->getMessage());
            $exception_thrown = true;
        }
        $current_db_state = EE_Data_Migration_Manager::instance()->ensure_current_database_state_is_set();
        $current_db_state = str_replace('.decaf', '', $current_db_state);
        if ($exception_thrown
            || ($most_recent_migration
                && $most_recent_migration instanceof EE_Data_Migration_Script_Base
                && $most_recent_migration->is_broken()
            )
        ) {
            $this->_template_path = EE_MAINTENANCE_TEMPLATE_PATH . 'ee_migration_was_borked_page.template.php';
            $this->_template_args['support_url'] = 'http://eventespresso.com/support/forums/';
            $this->_template_args['next_url'] = EEH_URL::add_query_args_and_nonce(array('action'  => 'confirm_migration_crash_report_sent',
                                                                                        'success' => '0',
            ), EE_MAINTENANCE_ADMIN_URL);
        } elseif ($addons_should_be_upgraded_first) {
            $this->_template_path = EE_MAINTENANCE_TEMPLATE_PATH . 'ee_upgrade_addons_before_migrating.template.php';
        } else {
            if ($most_recent_migration
                && $most_recent_migration instanceof EE_Data_Migration_Script_Base
                && $most_recent_migration->can_continue()
            ) {
                $show_backup_db_text = false;
                $show_continue_current_migration_script = true;
                $show_most_recent_migration = true;
            } elseif (isset($this->_req_data['continue_migration'])) {
                $show_most_recent_migration = true;
                $show_continue_current_migration_script = false;
            } else {
                $show_most_recent_migration = false;
                $show_continue_current_migration_script = false;
            }
            if (isset($current_script)) {
                $migrates_to = $current_script->migrates_to_version();
                $plugin_slug = $migrates_to['slug'];
                $new_version = $migrates_to['version'];
                $this->_template_args = array_merge($this->_template_args, array(
                    'current_db_state' => sprintf(__("EE%s (%s)", "event_espresso"),
                        isset($current_db_state[$plugin_slug]) ? $current_db_state[$plugin_slug] : 3, $plugin_slug),
                    'next_db_state'    => isset($current_script) ? sprintf(__("EE%s (%s)", 'event_espresso'),
                        $new_version, $plugin_slug) : null,
                ));
            }
            $this->_template_path = EE_MAINTENANCE_TEMPLATE_PATH . 'ee_migration_page.template.php';
            $this->_template_args = array_merge(
                $this->_template_args,
                array(
                    'show_most_recent_migration'             => $show_most_recent_migration,
                    //flag for showing the most recent migration's status and/or errors
                    'show_migration_progress'                => $show_migration_progress,
                    //flag for showing the option to run migrations and see their progress
                    'show_backup_db_text'                    => $show_backup_db_text,
                    //flag for showing text telling the user to backup their DB
                    'show_maintenance_switch'                => $show_maintenance_switch,
                    //flag for showing the option to change maintenance mode between levels 0 and 1
                    'script_names'                           => $script_names,
                    //array of names of scripts that have run
                    'show_continue_current_migration_script' => $show_continue_current_migration_script,
                    //flag to change wording to indicating that we're only CONTINUING a migration script (somehow it got interrupted0
                    'reset_db_page_link'                     => EE_Admin_Page::add_query_args_and_nonce(array('action' => 'reset_db'),
                        EE_MAINTENANCE_ADMIN_URL),
                    'data_reset_page'                        => EE_Admin_Page::add_query_args_and_nonce(array('action' => 'data_reset'),
                        EE_MAINTENANCE_ADMIN_URL),
                    'update_migration_script_page_link'      => EE_Admin_Page::add_query_args_and_nonce(array('action' => 'change_maintenance_level'),
                        EE_MAINTENANCE_ADMIN_URL),
                    'ultimate_db_state'                      => sprintf(__("EE%s", 'event_espresso'),
                        espresso_version()),
                )
            );
            //make sure we have the form fields helper available. It usually is, but sometimes it isn't
            //localize script stuff
            wp_localize_script('ee-maintenance', 'ee_maintenance', array(
                'migrating'                        => esc_html__("Updating Database...", "event_espresso"),
                'next'                             => esc_html__("Next", "event_espresso"),
                'fatal_error'                      => esc_html__("A Fatal Error Has Occurred", "event_espresso"),
                'click_next_when_ready'            => esc_html__("The current Database Update has ended. Click 'next' when ready to proceed",
                    "event_espresso"),
                'status_no_more_migration_scripts' => EE_Data_Migration_Manager::status_no_more_migration_scripts,
                'status_fatal_error'               => EE_Data_Migration_Manager::status_fatal_error,
                'status_completed'                 => EE_Data_Migration_Manager::status_completed,
            ));
        }
        $this->_template_args['most_recent_migration'] = $most_recent_migration;//the actual most recently ran migration
        //now render the migration options part, and put it in a variable
        $migration_options_template_file = apply_filters(
            'FHEE__ee_migration_page__migration_options_template',
            EE_MAINTENANCE_TEMPLATE_PATH . 'migration_options_from_ee4.template.php'
        );
        $migration_options_html = EEH_Template::display_template($migration_options_template_file, $this->_template_args,true);
        $this->_template_args['migration_options_html'] = $migration_options_html;
        $this->_template_args['admin_page_content'] = EEH_Template::display_template($this->_template_path,
            $this->_template_args, true);
        $this->display_admin_page_with_sidebar();
    }



    /**
     * returns JSON and executes another step of the currently-executing data migration (called via ajax)
     */
    public function migration_step()
    {
        $this->_template_args['data'] = EE_Data_Migration_Manager::instance()->response_to_migration_ajax_request();
        $this->_return_json();
    }



    /**
     * Can be used by js when it notices a response with HTML in it in order
     * to log the malformed response
     */
    public function add_error_to_migrations_ran()
    {
        EE_Data_Migration_Manager::instance()->add_error_to_migrations_ran($this->_req_data['message']);
        $this->_template_args['data'] = array('ok' => true);
        $this->_return_json();
    }



    /**
     * changes the maintenance level, provided there are still no migration scripts that should run
     */
    public function _change_maintenance_level()
    {
        $new_level = absint($this->_req_data['maintenance_mode_level']);
        if ( ! EE_Data_Migration_Manager::instance()->check_for_applicable_data_migration_scripts()) {
            EE_Maintenance_Mode::instance()->set_maintenance_level($new_level);
            $success = true;
        } else {
            EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
            $success = false;
        }
        $this->_redirect_after_action($success, 'Maintenance Mode', esc_html__("Updated", "event_espresso"));
    }



    /**
     * a tab with options for resetting and/or deleting EE data
     *
     * @throws \EE_Error
     * @throws \DomainException
     */
    public function _data_reset_and_delete()
    {
        $this->_template_path = EE_MAINTENANCE_TEMPLATE_PATH . 'ee_data_reset_and_delete.template.php';
        $this->_template_args['reset_reservations_button'] = $this->get_action_link_or_button(
            'reset_reservations',
            'reset_reservations',
            array(),
            'button button-primary',
            '',
            false
        );
        $this->_template_args['reset_capabilities_button'] = $this->get_action_link_or_button(
            'reset_capabilities',
            'reset_capabilities',
            array(),
            'button button-primary',
            '',
            false
        );
        $this->_template_args['delete_db_url'] = EE_Admin_Page::add_query_args_and_nonce(
            array('action' => 'delete_db'),
            EE_MAINTENANCE_ADMIN_URL
        );
        $this->_template_args['reset_db_url'] = EE_Admin_Page::add_query_args_and_nonce(
            array('action' => 'reset_db'),
            EE_MAINTENANCE_ADMIN_URL
        );
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            $this->_template_path,
            $this->_template_args,
            true
        );
        $this->display_admin_page_with_sidebar();
    }



    protected function _reset_reservations()
    {
        if(\EED_Ticket_Sales_Monitor::reset_reservation_counts()) {
            EE_Error::add_success(
                __(
                    'Ticket and datetime reserved counts have been successfully reset.',
                    'event_espresso'
                )
            );
        } else {
            EE_Error::add_success(
                __(
                    'Ticket and datetime reserved counts were correct and did not need resetting.',
                    'event_espresso'
                )
            );
        }
        $this->_redirect_after_action(true, '', '', array('action' => 'data_reset'), true);
    }



    protected function _reset_capabilities()
    {
        EE_Registry::instance()->CAP->init_caps(true);
        EE_Error::add_success(__('Default Event Espresso capabilities have been restored for all current roles.',
            'event_espresso'));
        $this->_redirect_after_action(false, '', '', array('action' => 'data_reset'), true);
    }



    /**
     * resets the DMSs so we can attempt to continue migrating after a fatal error
     * (only a good idea when someone has somehow tried ot fix whatever caused
     * the fatal error in teh first place)
     */
    protected function _reattempt_migration()
    {
        EE_Data_Migration_Manager::instance()->reattempt();
        $this->_redirect_after_action(false, '', '', array('action' => 'default'), true);
    }



    /**
     * shows the big ol' System Information page
     */
    public function _system_status()
    {
        $this->_template_path = EE_MAINTENANCE_TEMPLATE_PATH . 'ee_system_stati_page.template.php';
        $this->_template_args['system_stati'] = EEM_System_Status::instance()->get_system_stati();
        $this->_template_args['download_system_status_url'] = EE_Admin_Page::add_query_args_and_nonce(
            array(
                'action' => 'download_system_status',
            ),
            EE_MAINTENANCE_ADMIN_URL
        );
        $this->_template_args['admin_page_content'] = EEH_Template::display_template($this->_template_path,
            $this->_template_args, true);
        $this->display_admin_page_with_sidebar();
    }

    /**
     * Downloads an HTML file of the system status that can be easily stored or emailed
     */
    public function _download_system_status()
    {
        $status_info = EEM_System_Status::instance()->get_system_stati();
        header( 'Content-Disposition: attachment' );
        header( "Content-Disposition: attachment; filename=system_status_" . sanitize_key( site_url() ) . ".html" );
        echo "<style>table{border:1px solid darkgrey;}td{vertical-align:top}</style>";
        echo "<h1>System Information for " . site_url() . "</h1>";
        echo EEH_Template::layout_array_as_table( $status_info );
        die;
    }



    public function _send_migration_crash_report()
    {
        $from = $this->_req_data['from'];
        $from_name = $this->_req_data['from_name'];
        $body = $this->_req_data['body'];
        try {
            $success = wp_mail(EE_SUPPORT_EMAIL,
                'Migration Crash Report',
                $body . "/r/n<br>" . print_r(EEM_System_Status::instance()->get_system_stati(), true),
                array(
                    "from:$from_name<$from>",
                    //					'content-type:text/html charset=UTF-8'
                ));
        } catch (Exception $e) {
            $success = false;
        }
        $this->_redirect_after_action($success, esc_html__("Migration Crash Report", "event_espresso"),
            esc_html__("sent", "event_espresso"),
            array('success' => $success, 'action' => 'confirm_migration_crash_report_sent'));
    }



    public function _confirm_migration_crash_report_sent()
    {
        try {
            $most_recent_migration = EE_Data_Migration_Manager::instance()->get_last_ran_script(true);
        } catch (EE_Error $e) {
            EE_Data_Migration_Manager::instance()->add_error_to_migrations_ran($e->getMessage());
            //now, just so we can display the page correctly, make a error migration script stage object
            //and also put the error on it. It only persists for the duration of this request
            $most_recent_migration = new EE_DMS_Unknown_1_0_0();
            $most_recent_migration->add_error($e->getMessage());
        }
        $success = $this->_req_data['success'] == '1' ? true : false;
        $this->_template_args['success'] = $success;
        $this->_template_args['most_recent_migration'] = $most_recent_migration;
        $this->_template_args['reset_db_action_url'] = EE_Admin_Page::add_query_args_and_nonce(array('action' => 'reset_db'),
            EE_MAINTENANCE_ADMIN_URL);
        $this->_template_args['reset_db_page_url'] = EE_Admin_Page::add_query_args_and_nonce(array('action' => 'data_reset'),
            EE_MAINTENANCE_ADMIN_URL);
        $this->_template_args['reattempt_action_url'] = EE_Admin_Page::add_query_args_and_nonce(array('action' => 'reattempt_migration'),
            EE_MAINTENANCE_ADMIN_URL);
        $this->_template_path = EE_MAINTENANCE_TEMPLATE_PATH . 'ee_confirm_migration_crash_report_sent.template.php';
        $this->_template_args['admin_page_content'] = EEH_Template::display_template($this->_template_path,
            $this->_template_args, true);
        $this->display_admin_page_with_sidebar();
    }



    /**
     * Resets the entire EE4 database.
     * Currently basically only sets up ee4 database for a fresh install- doesn't
     * actually clean out the old wp options, or cpts (although does erase old ee table data)
     *
     * @param boolean $nuke_old_ee4_data controls whether or not we
     *                                   destroy the old ee4 data, or just try initializing ee4 default data
     */
    public function _reset_db($nuke_old_ee4_data = true)
    {
        EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
        if ($nuke_old_ee4_data) {
            EEH_Activation::delete_all_espresso_cpt_data();
            EEH_Activation::delete_all_espresso_tables_and_data(false);
            EEH_Activation::remove_cron_tasks();
        }
        //make sure when we reset the registry's config that it
        //switches to using the new singleton
        EE_Registry::instance()->CFG = EE_Registry::instance()->CFG->reset(true);
        EE_System::instance()->initialize_db_if_no_migrations_required(true);
        EE_System::instance()->redirect_to_about_ee();
    }



    /**
     * Deletes ALL EE tables, Records, and Options from the database.
     */
    public function _delete_db()
    {
        EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
        EEH_Activation::delete_all_espresso_cpt_data();
        EEH_Activation::delete_all_espresso_tables_and_data();
        EEH_Activation::remove_cron_tasks();
        EEH_Activation::deactivate_event_espresso();
        wp_safe_redirect(admin_url('plugins.php'));
        exit;
    }



    /**
     * sets up EE4 to rerun the migrations from ee3 to ee4
     */
    public function _rerun_migration_from_ee3()
    {
        EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
        EEH_Activation::delete_all_espresso_cpt_data();
        EEH_Activation::delete_all_espresso_tables_and_data(false);
        //set the db state to something that will require migrations
        update_option(EE_Data_Migration_Manager::current_database_state, '3.1.36.0');
        EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_2_complete_maintenance);
        $this->_redirect_after_action(true, esc_html__("Database", 'event_espresso'), esc_html__("reset", 'event_espresso'));
    }



    //none of the below group are currently used for Gateway Settings
    protected function _add_screen_options()
    {
    }



    protected function _add_feature_pointers()
    {
    }



    public function admin_init()
    {
    }



    public function admin_notices()
    {
    }



    public function admin_footer_scripts()
    {
    }



    public function load_scripts_styles()
    {
        wp_enqueue_script('ee_admin_js');
//		wp_enqueue_media();
//		wp_enqueue_script('media-upload');
        wp_enqueue_script('ee-maintenance', EE_MAINTENANCE_ASSETS_URL . '/ee-maintenance.js', array('jquery'),
            EVENT_ESPRESSO_VERSION, true);
        wp_register_style('espresso_maintenance', EE_MAINTENANCE_ASSETS_URL . 'ee-maintenance.css', array(),
            EVENT_ESPRESSO_VERSION);
        wp_enqueue_style('espresso_maintenance');
    }



    public function load_scripts_styles_default()
    {
        //styles
//		wp_enqueue_style('ee-text-links');
//		//scripts
//		wp_enqueue_script('ee-text-links');
    }



} //end Maintenance_Admin_Page class

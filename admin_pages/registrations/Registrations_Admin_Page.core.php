<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}


/**
 * Event Espresso
 * Event Registration and Management Plugin for WordPress
 * @ package            Event Espresso
 * @ author                Seth Shoultes
 * @ copyright        (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license            {@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link                    {@link http://www.eventespresso.com}
 * @ since                4.0
 * ------------------------------------------------------------------------
 * Registrations_Admin_Page class
 *
 * @package               Event Espresso
 * @subpackage            includes/core/admin/transactions/Registrations_Admin_Page.core.php
 * @author                Brent Christensen
 *                        ------------------------------------------------------------------------
 */
class Registrations_Admin_Page extends EE_Admin_Page_CPT
{

    /**
     * @var EE_Registration
     */
    private $_registration;

    /**
     * @var EE_Event
     */
    private $_reg_event;

    /**
     * @var EE_Session
     */
    private $_session;

    private static $_reg_status;

    /**
     * Form for displaying the custom questions for this registration.
     * This gets used a few times throughout the request so its best to cache it
     *
     * @var EE_Registration_Custom_Questions_Form
     */
    protected $_reg_custom_questions_form = null;


    /**
     *        constructor
     *
     * @Constructor
     * @access public
     * @param bool $routing
     * @return Registrations_Admin_Page
     */
    public function __construct($routing = true)
    {
        parent::__construct($routing);
        add_action('wp_loaded', array($this, 'wp_loaded'));
    }


    public function wp_loaded()
    {
        // when adding a new registration...
        if (isset($this->_req_data['action']) && $this->_req_data['action'] === 'new_registration') {
            EE_System::do_not_cache();
            if ( ! isset($this->_req_data['processing_registration'])
                 || absint($this->_req_data['processing_registration']) !== 1
            ) {
                // and it's NOT the attendee information reg step
                // force cookie expiration by setting time to last week
                setcookie('ee_registration_added', 0, time() - WEEK_IN_SECONDS, '/');
                // and update the global
                $_COOKIE['ee_registration_added'] = 0;
            }
        }
    }


    protected function _init_page_props()
    {
        $this->page_slug        = REG_PG_SLUG;
        $this->_admin_base_url  = REG_ADMIN_URL;
        $this->_admin_base_path = REG_ADMIN;
        $this->page_label       = __('Registrations', 'event_espresso');
        $this->_cpt_routes      = array(
            'add_new_attendee' => 'espresso_attendees',
            'edit_attendee'    => 'espresso_attendees',
            'insert_attendee'  => 'espresso_attendees',
            'update_attendee'  => 'espresso_attendees',
        );
        $this->_cpt_model_names = array(
            'add_new_attendee' => 'EEM_Attendee',
            'edit_attendee'    => 'EEM_Attendee',
        );
        $this->_cpt_edit_routes = array(
            'espresso_attendees' => 'edit_attendee',
        );
        $this->_pagenow_map     = array(
            'add_new_attendee' => 'post-new.php',
            'edit_attendee'    => 'post.php',
            'trash'            => 'post.php',
        );
        add_action('edit_form_after_title', array($this, 'after_title_form_fields'), 10);
        //add filters so that the comment urls don't take users to a confusing 404 page
        add_filter('get_comment_link', array($this, 'clear_comment_link'), 10, 3);
    }


    public function clear_comment_link($link, $comment, $args)
    {
        //gotta make sure this only happens on this route
        $post_type = get_post_type($comment->comment_post_ID);
        if ($post_type === 'espresso_attendees') {
            return '#commentsdiv';
        }
        return $link;
    }


    protected function _ajax_hooks()
    {
        //todo: all hooks for registrations ajax goes in here
        add_action('wp_ajax_toggle_checkin_status', array($this, 'toggle_checkin_status'));
    }


    protected function _define_page_props()
    {
        $this->_admin_page_title = $this->page_label;
        $this->_labels           = array(
            'buttons'                      => array(
                'add-registrant'      => __('Add New Registration', 'event_espresso'),
                'add-attendee'        => __('Add Contact', 'event_espresso'),
                'edit'                => __('Edit Contact', 'event_espresso'),
                'report'              => __("Event Registrations CSV Report", "event_espresso"),
                'report_all'          => __('All Registrations CSV Report', 'event_espresso'),
                'report_filtered'     => __('Filtered CSV Report', 'event_espresso'),
                'contact_list_report' => __('Contact List Report', 'event_espresso'),
                'contact_list_export' => __("Export Data", "event_espresso"),
            ),
            'publishbox'                   => array(
                'add_new_attendee' => __("Add Contact Record", 'event_espresso'),
                'edit_attendee'    => __("Update Contact Record", 'event_espresso'),
            ),
            'hide_add_button_on_cpt_route' => array(
                'edit_attendee' => true,
            ),
        );
    }


    /**
     *        grab url requests and route them
     *
     * @access private
     * @return void
     */
    public function _set_page_routes()
    {
        $this->_get_registration_status_array();
        $reg_id             = ! empty($this->_req_data['_REG_ID']) && ! is_array($this->_req_data['_REG_ID'])
            ? $this->_req_data['_REG_ID'] : 0;
        $att_id             = ! empty($this->_req_data['ATT_ID']) && ! is_array($this->_req_data['ATT_ID'])
            ? $this->_req_data['ATT_ID'] : 0;
        $att_id             = ! empty($this->_req_data['post']) && ! is_array($this->_req_data['post']) ? $this->_req_data['post']
            : $att_id;
        $this->_page_routes = array(
            'default'                            => array(
                'func'       => '_registrations_overview_list_table',
                'capability' => 'ee_read_registrations',
            ),
            'view_registration'                  => array(
                'func'       => '_registration_details',
                'capability' => 'ee_read_registration',
                'obj_id'     => $reg_id,
            ),
            'edit_registration'                  => array(
                'func'               => '_update_attendee_registration_form',
                'noheader'           => true,
                'headers_sent_route' => 'view_registration',
                'capability'         => 'ee_edit_registration',
                'obj_id'             => $reg_id,
                '_REG_ID'            => $reg_id,
            ),
            'trash_registrations'                => array(
                'func'       => '_trash_or_restore_registrations',
                'args'       => array('trash' => true),
                'noheader'   => true,
                'capability' => 'ee_delete_registrations',
            ),
            'restore_registrations'              => array(
                'func'       => '_trash_or_restore_registrations',
                'args'       => array('trash' => false),
                'noheader'   => true,
                'capability' => 'ee_delete_registrations',
            ),
            'delete_registrations'               => array(
                'func'       => '_delete_registrations',
                'noheader'   => true,
                'capability' => 'ee_delete_registrations',
            ),
            'new_registration'                   => array(
                'func'       => 'new_registration',
                'capability' => 'ee_edit_registrations',
            ),
            'process_reg_step'                   => array(
                'func'       => 'process_reg_step',
                'noheader'   => true,
                'capability' => 'ee_edit_registrations',
            ),
            'redirect_to_txn'                    => array(
                'func'       => 'redirect_to_txn',
                'noheader'   => true,
                'capability' => 'ee_edit_registrations',
            ),
            'change_reg_status'                  => array(
                'func'       => '_change_reg_status',
                'noheader'   => true,
                'capability' => 'ee_edit_registration',
                'obj_id'     => $reg_id,
            ),
            'approve_registration'               => array(
                'func'       => 'approve_registration',
                'noheader'   => true,
                'capability' => 'ee_edit_registration',
                'obj_id'     => $reg_id,
            ),
            'approve_and_notify_registration'    => array(
                'func'       => 'approve_registration',
                'noheader'   => true,
                'args'       => array(true),
                'capability' => 'ee_edit_registration',
                'obj_id'     => $reg_id,
            ),
            'decline_registration'               => array(
                'func'       => 'decline_registration',
                'noheader'   => true,
                'capability' => 'ee_edit_registration',
                'obj_id'     => $reg_id,
            ),
            'decline_and_notify_registration'    => array(
                'func'       => 'decline_registration',
                'noheader'   => true,
                'args'       => array(true),
                'capability' => 'ee_edit_registration',
                'obj_id'     => $reg_id,
            ),
            'pending_registration'               => array(
                'func'       => 'pending_registration',
                'noheader'   => true,
                'capability' => 'ee_edit_registration',
                'obj_id'     => $reg_id,
            ),
            'pending_and_notify_registration'    => array(
                'func'       => 'pending_registration',
                'noheader'   => true,
                'args'       => array(true),
                'capability' => 'ee_edit_registration',
                'obj_id'     => $reg_id,
            ),
            'no_approve_registration'            => array(
                'func'       => 'not_approve_registration',
                'noheader'   => true,
                'capability' => 'ee_edit_registration',
                'obj_id'     => $reg_id,
            ),
            'no_approve_and_notify_registration' => array(
                'func'       => 'not_approve_registration',
                'noheader'   => true,
                'args'       => array(true),
                'capability' => 'ee_edit_registration',
                'obj_id'     => $reg_id,
            ),
            'cancel_registration'                => array(
                'func'       => 'cancel_registration',
                'noheader'   => true,
                'capability' => 'ee_edit_registration',
                'obj_id'     => $reg_id,
            ),
            'cancel_and_notify_registration'     => array(
                'func'       => 'cancel_registration',
                'noheader'   => true,
                'args'       => array(true),
                'capability' => 'ee_edit_registration',
                'obj_id'     => $reg_id,
            ),
            'contact_list'                       => array(
                'func'       => '_attendee_contact_list_table',
                'capability' => 'ee_read_contacts',
            ),
            'add_new_attendee'                   => array(
                'func' => '_create_new_cpt_item',
                'args' => array(
                    'new_attendee' => true,
                    'capability'   => 'ee_edit_contacts',
                ),
            ),
            'edit_attendee'                      => array(
                'func'       => '_edit_cpt_item',
                'capability' => 'ee_edit_contacts',
                'obj_id'     => $att_id,
            ),
            'duplicate_attendee'                 => array(
                'func'       => '_duplicate_attendee',
                'noheader'   => true,
                'capability' => 'ee_edit_contacts',
                'obj_id'     => $att_id,
            ),
            'insert_attendee'                    => array(
                'func'       => '_insert_or_update_attendee',
                'args'       => array(
                    'new_attendee' => true,
                ),
                'noheader'   => true,
                'capability' => 'ee_edit_contacts',
            ),
            'update_attendee'                    => array(
                'func'       => '_insert_or_update_attendee',
                'args'       => array(
                    'new_attendee' => false,
                ),
                'noheader'   => true,
                'capability' => 'ee_edit_contacts',
                'obj_id'     => $att_id,
            ),
            'trash_attendees'                    => array(
                'func'       => '_trash_or_restore_attendees',
                'args'       => array(
                    'trash' => true,
                ),
                'noheader'   => true,
                'capability' => 'ee_delete_contacts',
                'obj_id'     => $att_id,
            ),
            'restore_attendees'                  => array(
                'func'       => '_trash_or_restore_attendees',
                'args'       => array(
                    'trash' => false,
                ),
                'noheader'   => true,
                'capability' => 'ee_delete_contacts',
                'obj_id'     => $att_id,
            ),
            'resend_registration'                => array(
                'func'       => '_resend_registration',
                'noheader'   => true,
                'capability' => 'ee_send_message',
            ),
            'registrations_report'               => array(
                'func'       => '_registrations_report',
                'noheader'   => true,
                'capability' => 'ee_read_registrations',
            ),
            'contact_list_export'                => array(
                'func'       => '_contact_list_export',
                'noheader'   => true,
                'capability' => 'export',
            ),
            'contact_list_report'                => array(
                'func'       => '_contact_list_report',
                'noheader'   => true,
                'capability' => 'ee_read_contacts',
            ),
        );
    }


    protected function _set_page_config()
    {
        $this->_page_config = array(
            'default'           => array(
                'nav'           => array(
                    'label' => __('Overview', 'event_espresso'),
                    'order' => 5,
                ),
                'help_tabs'     => array(
                    'registrations_overview_help_tab'                       => array(
                        'title'    => __('Registrations Overview', 'event_espresso'),
                        'filename' => 'registrations_overview',
                    ),
                    'registrations_overview_table_column_headings_help_tab' => array(
                        'title'    => __('Registrations Table Column Headings', 'event_espresso'),
                        'filename' => 'registrations_overview_table_column_headings',
                    ),
                    'registrations_overview_filters_help_tab'               => array(
                        'title'    => __('Registration Filters', 'event_espresso'),
                        'filename' => 'registrations_overview_filters',
                    ),
                    'registrations_overview_views_help_tab'                 => array(
                        'title'    => __('Registration Views', 'event_espresso'),
                        'filename' => 'registrations_overview_views',
                    ),
                    'registrations_regoverview_other_help_tab'              => array(
                        'title'    => __('Registrations Other', 'event_espresso'),
                        'filename' => 'registrations_overview_other',
                    ),
                ),
                'help_tour'     => array('Registration_Overview_Help_Tour'),
                'qtips'         => array('Registration_List_Table_Tips'),
                'list_table'    => 'EE_Registrations_List_Table',
                'require_nonce' => false,
            ),
            'view_registration' => array(
                'nav'           => array(
                    'label'      => __('REG Details', 'event_espresso'),
                    'order'      => 15,
                    'url'        => isset($this->_req_data['_REG_ID'])
                        ? add_query_arg(array('_REG_ID' => $this->_req_data['_REG_ID']), $this->_current_page_view_url)
                        : $this->_admin_base_url,
                    'persistent' => false,
                ),
                'help_tabs'     => array(
                    'registrations_details_help_tab'                    => array(
                        'title'    => __('Registration Details', 'event_espresso'),
                        'filename' => 'registrations_details',
                    ),
                    'registrations_details_table_help_tab'              => array(
                        'title'    => __('Registration Details Table', 'event_espresso'),
                        'filename' => 'registrations_details_table',
                    ),
                    'registrations_details_form_answers_help_tab'       => array(
                        'title'    => __('Registration Form Answers', 'event_espresso'),
                        'filename' => 'registrations_details_form_answers',
                    ),
                    'registrations_details_registrant_details_help_tab' => array(
                        'title'    => __('Contact Details', 'event_espresso'),
                        'filename' => 'registrations_details_registrant_details',
                    ),
                ),
                'help_tour'     => array('Registration_Details_Help_Tour'),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes,
                    array('_registration_details_metaboxes')),
                'require_nonce' => false,
            ),
            'new_registration'  => array(
                'nav'           => array(
                    'label'      => __('Add New Registration', 'event_espresso'),
                    'url'        => '#',
                    'order'      => 15,
                    'persistent' => false,
                ),
                'metaboxes'     => $this->_default_espresso_metaboxes,
                'labels'        => array(
                    'publishbox' => __('Save Registration', 'event_espresso'),
                ),
                'require_nonce' => false,
            ),
            'add_new_attendee'  => array(
                'nav'           => array(
                    'label'      => __('Add Contact', 'event_espresso'),
                    'order'      => 15,
                    'persistent' => false,
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes,
                    array('_publish_post_box', 'attendee_editor_metaboxes')),
                'require_nonce' => false,
            ),
            'edit_attendee'     => array(
                'nav'           => array(
                    'label'      => __('Edit Contact', 'event_espresso'),
                    'order'      => 15,
                    'persistent' => false,
                    'url'        => isset($this->_req_data['ATT_ID'])
                        ? add_query_arg(array('ATT_ID' => $this->_req_data['ATT_ID']), $this->_current_page_view_url)
                        : $this->_admin_base_url,
                ),
                'metaboxes'     => array('attendee_editor_metaboxes'),
                'require_nonce' => false,
            ),
            'contact_list'      => array(
                'nav'           => array(
                    'label' => __('Contact List', 'event_espresso'),
                    'order' => 20,
                ),
                'list_table'    => 'EE_Attendee_Contact_List_Table',
                'help_tabs'     => array(
                    'registrations_contact_list_help_tab'                       => array(
                        'title'    => __('Registrations Contact List', 'event_espresso'),
                        'filename' => 'registrations_contact_list',
                    ),
                    'registrations_contact-list_table_column_headings_help_tab' => array(
                        'title'    => __('Contact List Table Column Headings', 'event_espresso'),
                        'filename' => 'registrations_contact_list_table_column_headings',
                    ),
                    'registrations_contact_list_views_help_tab'                 => array(
                        'title'    => __('Contact List Views', 'event_espresso'),
                        'filename' => 'registrations_contact_list_views',
                    ),
                    'registrations_contact_list_other_help_tab'                 => array(
                        'title'    => __('Contact List Other', 'event_espresso'),
                        'filename' => 'registrations_contact_list_other',
                    ),
                ),
                'help_tour'     => array('Contact_List_Help_Tour'),
                'metaboxes'     => array(),
                'require_nonce' => false,
            ),
            //override default cpt routes
            'create_new'        => '',
            'edit'              => '',
        );
    }


    /**
     * The below methods aren't used by this class currently
     */
    protected function _add_screen_options()
    {
    }


    protected function _add_feature_pointers()
    {
    }


    public function admin_init()
    {
        EE_Registry::$i18n_js_strings['update_att_qstns'] = __('click "Update Registration Questions" to save your changes',
            'event_espresso');
    }


    public function admin_notices()
    {
    }


    public function admin_footer_scripts()
    {
    }


    /**
     *        get list of registration statuses
     *
     * @access private
     * @return void
     */
    private function _get_registration_status_array()
    {
        self::$_reg_status = EEM_Registration::reg_status_array(array(), true);
    }


    protected function _add_screen_options_default()
    {
        $this->_per_page_screen_option();
    }


    protected function _add_screen_options_contact_list()
    {
        $page_title              = $this->_admin_page_title;
        $this->_admin_page_title = __("Contacts", 'event_espresso');
        $this->_per_page_screen_option();
        $this->_admin_page_title = $page_title;
    }


    public function load_scripts_styles()
    {
        //style
        //wp_register_style('espresso_attendees', ATT_ASSETS_URL . 'espresso_attendees_admin.css', array(), EVENT_ESPRESSO_VERSION );
        wp_register_style('espresso_reg', REG_ASSETS_URL . 'espresso_registrations_admin.css', array('ee-admin-css'),
            EVENT_ESPRESSO_VERSION);
        wp_enqueue_style('espresso_reg');
        //script
        wp_register_script('espresso_reg', REG_ASSETS_URL . 'espresso_registrations_admin.js',
            array('jquery-ui-datepicker', 'jquery-ui-draggable', 'ee_admin_js'), EVENT_ESPRESSO_VERSION, true);
        wp_enqueue_script('espresso_reg');
    }


    public function load_scripts_styles_edit_attendee()
    {
        //stuff to only show up on our attendee edit details page.
        $attendee_details_translations = array(
            'att_publish_text' => sprintf(__('Created on: <b>%1$s</b>', 'event_espresso'),
                $this->_cpt_model_obj->get_datetime('ATT_created')),
        );
        wp_localize_script('espresso_reg', 'ATTENDEE_DETAILS', $attendee_details_translations);
        wp_enqueue_script('jquery-validate');
    }


    public function load_scripts_styles_view_registration()
    {
        //styles
        wp_enqueue_style('espresso-ui-theme');
        //scripts
        $this->_get_reg_custom_questions_form($this->_registration->ID());
        $this->_reg_custom_questions_form->wp_enqueue_scripts(true);
    }


    public function load_scripts_styles_contact_list()
    {
        wp_deregister_style('espresso_reg');
        wp_register_style('espresso_att', REG_ASSETS_URL . 'espresso_attendees_admin.css', array('ee-admin-css'),
            EVENT_ESPRESSO_VERSION);
        wp_enqueue_style('espresso_att');
    }


    public function load_scripts_styles_new_registration()
    {
        wp_register_script('ee-spco-for-admin', REG_ASSETS_URL . 'spco_for_admin.js', array('underscore', 'jquery'),
            EVENT_ESPRESSO_VERSION, true);
        wp_enqueue_script('ee-spco-for-admin');
        add_filter('FHEE__EED_Ticket_Selector__load_tckt_slctr_assets', '__return_true');
        EE_Form_Section_Proper::wp_enqueue_scripts();
        EED_Ticket_Selector::load_tckt_slctr_assets();
        EE_Datepicker_Input::enqueue_styles_and_scripts();
    }


    public function AHEE__EE_Admin_Page__route_admin_request_resend_registration()
    {
        add_filter('FHEE_load_EE_messages', '__return_true');
    }


    public function AHEE__EE_Admin_Page__route_admin_request_approve_registration()
    {
        add_filter('FHEE_load_EE_messages', '__return_true');
    }


    protected function _set_list_table_views_default()
    {
        //for notification related bulk actions we need to make sure only active messengers have an option.
        EED_Messages::set_autoloaders();
        /** @type EE_Message_Resource_Manager $message_resource_manager */
        $message_resource_manager = EE_Registry::instance()->load_lib('Message_Resource_Manager');
        $active_mts               = $message_resource_manager->list_of_active_message_types();
        //key= bulk_action_slug, value= message type.
        $match_array = array(
            'approve_registration'    => 'registration',
            'decline_registration'    => 'declined_registration',
            'pending_registration'    => 'pending_approval',
            'no_approve_registration' => 'not_approved_registration',
            'cancel_registration'     => 'cancelled_registration',
        );
        /** setup reg status bulk actions **/
        $def_reg_status_actions['approve_registration'] = __('Approve Registrations', 'event_espresso');
        if (in_array($match_array['approve_registration'], $active_mts)
            && EE_Registry::instance()->CAP->current_user_can('ee_send_message', 'batch_send_messages')
        ) {
            $def_reg_status_actions['approve_and_notify_registration'] = __('Approve and Notify Registrations',
                'event_espresso');
        }
        $def_reg_status_actions['decline_registration'] = __('Decline Registrations', 'event_espresso');
        if (in_array($match_array['decline_registration'], $active_mts)
            && EE_Registry::instance()->CAP->current_user_can('ee_send_message', 'batch_send_messages')
        ) {
            $def_reg_status_actions['decline_and_notify_registration'] = __('Decline and Notify Registrations',
                'event_espresso');
        }
        $def_reg_status_actions['pending_registration'] = __('Set Registrations to Pending Payment', 'event_espresso');
        if (in_array($match_array['pending_registration'], $active_mts)
            && EE_Registry::instance()->CAP->current_user_can('ee_send_message', 'batch_send_messages')
        ) {
            $def_reg_status_actions['pending_and_notify_registration'] = __('Set Registrations to Pending Payment and Notify',
                'event_espresso');
        }
        $def_reg_status_actions['no_approve_registration'] = __('Set Registrations to Not Approved', 'event_espresso');
        if (in_array($match_array['no_approve_registration'], $active_mts)
            && EE_Registry::instance()->CAP->current_user_can('ee_send_message', 'batch_send_messages')
        ) {
            $def_reg_status_actions['no_approve_and_notify_registration'] = __('Set Registrations to Not Approved and Notify',
                'event_espresso');
        }
        $def_reg_status_actions['cancel_registration'] = __('Cancel Registrations', 'event_espresso');
        if (in_array($match_array['cancel_registration'], $active_mts)
            && EE_Registry::instance()->CAP->current_user_can('ee_send_message', 'batch_send_messages')
        ) {
            $def_reg_status_actions['cancel_and_notify_registration'] = __('Cancel Registrations and Notify',
                'event_espresso');
        }
        $this->_views = array(
            'all'   => array(
                'slug'        => 'all',
                'label'       => __('View All Registrations', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array_merge($def_reg_status_actions, array(
                    'trash_registrations' => __('Trash Registrations', 'event_espresso'),
                )),
            ),
            'month' => array(
                'slug'        => 'month',
                'label'       => __('This Month', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array_merge($def_reg_status_actions, array(
                    'trash_registrations' => __('Trash Registrations', 'event_espresso'),
                )),
            ),
            'today' => array(
                'slug'        => 'today',
                'label'       => sprintf(__('Today - %s', 'event_espresso'), date('M d, Y', current_time('timestamp'))),
                'count'       => 0,
                'bulk_action' => array_merge($def_reg_status_actions, array(
                    'trash_registrations' => __('Trash Registrations', 'event_espresso'),
                )),
            ),
        );
        if (EE_Registry::instance()->CAP->current_user_can('ee_delete_registrations',
            'espresso_registrations_delete_registration')
        ) {
            $this->_views['incomplete'] = array(
                'slug'        => 'incomplete',
                'label'       => __('Incomplete', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array(
                    'trash_registrations' => __('Trash Registrations', 'event_espresso'),
                ),
            );
            $this->_views['trash']      = array(
                'slug'        => 'trash',
                'label'       => __('Trash', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array(
                    'restore_registrations' => __('Restore Registrations', 'event_espresso'),
                    'delete_registrations'  => __('Delete Registrations Permanently', 'event_espresso'),
                ),
            );
        }
    }


    protected function _set_list_table_views_contact_list()
    {
        $this->_views = array(
            'in_use' => array(
                'slug'        => 'in_use',
                'label'       => __('In Use', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array(
                    'trash_attendees' => __('Move to Trash', 'event_espresso'),
                ),
            ),
        );
        if (EE_Registry::instance()->CAP->current_user_can('ee_delete_contacts',
            'espresso_registrations_trash_attendees')
        ) {
            $this->_views['trash'] = array(
                'slug'        => 'trash',
                'label'       => __('Trash', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array(
                    'restore_attendees' => __('Restore from Trash', 'event_espresso'),
                ),
            );
        }
    }


    protected function _registration_legend_items()
    {
        $fc_items = array(
            'star-icon'        => array(
                'class' => 'dashicons dashicons-star-filled lt-blue-icon ee-icon-size-8',
                'desc'  => __('This is the Primary Registrant', 'event_espresso'),
            ),
            'view_details'     => array(
                'class' => 'dashicons dashicons-clipboard',
                'desc'  => __('View Registration Details', 'event_espresso'),
            ),
            'edit_attendee'    => array(
                'class' => 'ee-icon ee-icon-user-edit ee-icon-size-16',
                'desc'  => __('Edit Contact Details', 'event_espresso'),
            ),
            'view_transaction' => array(
                'class' => 'dashicons dashicons-cart',
                'desc'  => __('View Transaction Details', 'event_espresso'),
            ),
            'view_invoice'     => array(
                'class' => 'dashicons dashicons-media-spreadsheet',
                'desc'  => __('View Transaction Invoice', 'event_espresso'),
            ),
        );
        if (EE_Registry::instance()->CAP->current_user_can('ee_send_message',
            'espresso_registrations_resend_registration')
        ) {
            $fc_items['resend_registration'] = array(
                'class' => 'dashicons dashicons-email-alt',
                'desc'  => __('Resend Registration Details', 'event_espresso'),
            );
        } else {
            $fc_items['blank'] = array('class' => 'blank', 'desc' => '');
        }
        if (EE_Registry::instance()->CAP->current_user_can('ee_read_global_messages', 'view_filtered_messages')) {
            $related_for_icon = EEH_MSG_Template::get_message_action_icon('see_notifications_for');
            if (isset($related_for_icon['css_class']) && isset($related_for_icon['label'])) {
                $fc_items['view_related_messages'] = array(
                    'class' => $related_for_icon['css_class'],
                    'desc'  => $related_for_icon['label'],
                );
            }
        }
        $sc_items = array(
            'approved_status'   => array(
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_approved,
                'desc'  => EEH_Template::pretty_status(EEM_Registration::status_id_approved, false, 'sentence'),
            ),
            'pending_status'    => array(
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_pending_payment,
                'desc'  => EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, false, 'sentence'),
            ),
            'wait_list'         => array(
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_wait_list,
                'desc'  => EEH_Template::pretty_status(EEM_Registration::status_id_wait_list, false, 'sentence'),
            ),
            'incomplete_status' => array(
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_incomplete,
                'desc'  => EEH_Template::pretty_status(EEM_Registration::status_id_incomplete, false, 'sentence'),
            ),
            'not_approved'      => array(
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_not_approved,
                'desc'  => EEH_Template::pretty_status(EEM_Registration::status_id_not_approved, false, 'sentence'),
            ),
            'declined_status'   => array(
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_declined,
                'desc'  => EEH_Template::pretty_status(EEM_Registration::status_id_declined, false, 'sentence'),
            ),
            'cancelled_status'  => array(
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_cancelled,
                'desc'  => EEH_Template::pretty_status(EEM_Registration::status_id_cancelled, false, 'sentence'),
            ),
        );
        return array_merge($fc_items, $sc_items);
    }



    /***************************************        REGISTRATION OVERVIEW        **************************************/
    /**
     * @throws \EE_Error
     */
    protected function _registrations_overview_list_table()
    {
        $this->_template_args['admin_page_header'] = '';
        $EVT_ID                                    = ! empty($this->_req_data['event_id']) ? absint($this->_req_data['event_id']) : 0;
        if ($EVT_ID) {
            if (EE_Registry::instance()->CAP->current_user_can('ee_edit_registrations',
                'espresso_registrations_new_registration', $EVT_ID)
            ) {
                $this->_admin_page_title .= ' ' . $this->get_action_link_or_button('new_registration', 'add-registrant',
                        array('event_id' => $EVT_ID), 'add-new-h2');
            }
            $event = EEM_Event::instance()->get_one_by_ID($EVT_ID);
            if ($event instanceof EE_Event) {
                $this->_template_args['admin_page_header'] = sprintf(__('%s Viewing registrations for the event: %s%s',
                    'event_espresso'), '<h3 style="line-height:1.5em;">',
                    '<br /><a href="' . EE_Admin_Page::add_query_args_and_nonce(array(
                        'action' => 'edit',
                        'post'   => $event->ID(),
                    ), EVENTS_ADMIN_URL) . '">&nbsp;' . $event->get('EVT_name') . '&nbsp;</a>&nbsp;', '</h3>');
            }
            $DTT_ID   = ! empty($this->_req_data['datetime_id']) ? absint($this->_req_data['datetime_id']) : 0;
            $datetime = EEM_Datetime::instance()->get_one_by_ID($DTT_ID);
            if ($datetime instanceof EE_Datetime && $this->_template_args['admin_page_header'] !== '') {
                $this->_template_args['admin_page_header'] = substr($this->_template_args['admin_page_header'], 0, -5);
                $this->_template_args['admin_page_header'] .= ' &nbsp;<span class="drk-grey-text">';
                $this->_template_args['admin_page_header'] .= '<span class="dashicons dashicons-calendar"></span>';
                $this->_template_args['admin_page_header'] .= $datetime->name();
                $this->_template_args['admin_page_header'] .= ' ( ' . $datetime->start_date() . ' )';
                $this->_template_args['admin_page_header'] .= '</span></h3>';
            }
        }
        $this->_template_args['after_list_table'] = $this->_display_legend($this->_registration_legend_items());
        $this->display_admin_list_table_page_with_no_sidebar();
    }


    /**
     * This sets the _registration property for the registration details screen
     *
     * @access private
     * @return bool
     */
    private function _set_registration_object()
    {
        //get out if we've already set the object
        if (is_object($this->_registration)) {
            return true;
        }
        $REG    = EEM_Registration::instance();
        $REG_ID = ( ! empty($this->_req_data['_REG_ID'])) ? absint($this->_req_data['_REG_ID']) : false;
        if ($this->_registration = $REG->get_one_by_ID($REG_ID)) {
            return true;
        } else {
            $error_msg = sprintf(__('An error occurred and the details for Registration ID #%s could not be retrieved.',
                'event_espresso'), $REG_ID);
            EE_Error::add_error($error_msg, __FILE__, __FUNCTION__, __LINE__);
            $this->_registration = null;
            return false;
        }
    }


    /**
     * Used to retrieve registrations for the list table.
     *
     * @param int    $per_page
     * @param bool   $count
     * @param bool   $this_month
     * @param bool   $today
     * @return \EE_Registration[]|int
     */
    public function get_registrations(
        $per_page = 10,
        $count = false,
        $this_month = false,
        $today = false
    ) {
        if( $this_month ) {
            $this->_req_data['status'] = 'month';
        }
        if( $today ) {
            $this->_req_data['status'] = 'today';
        }
        $query_params = $this->_get_registration_query_parameters($this->_req_data, $per_page, $count);
        /**
         * Override the default groupby added by EEM_Base so that sorts with multiple order bys work as expected
         * @link https://events.codebasehq.com/projects/event-espresso/tickets/10093
         * @see EEM_Base::get_all()
         */
        $query_params['group_by'] = '';

        return $count
            ? EEM_Registration::instance()->count($query_params)
            /** @type EE_Registration[] */
            : EEM_Registration::instance()->get_all($query_params);
    }



    /**
     * Retrieves the query parameters to be used by the Registration model for getting registrations.
     * Note: this listens to values on the request for some of the query parameters.
     *
     * @param array $request
     * @param int    $per_page
     * @param bool   $count
     * @return array
     */
    protected function _get_registration_query_parameters(
        $request = array(),
        $per_page = 10,
        $count = false
    ) {

        $query_params = array(
            0                          => $this->_get_where_conditions_for_registrations_query(
                $request
            ),
            'caps'                     => EEM_Registration::caps_read_admin,
            'default_where_conditions' => 'this_model_only',
        );
        if ( ! $count) {
            $query_params = array_merge(
                $query_params,
                $this->_get_orderby_for_registrations_query(),
                $this->_get_limit($per_page)
            );
        }

        return $query_params;
    }


    /**
     * This will add EVT_ID to the provided $where array for EE model query parameters.
     *
     * @param array $request usually the same as $this->_req_data but not necessarily
     * @return array
     */
    protected function _add_event_id_to_where_conditions(array $request)
    {
        $where = array();
        if ( ! empty($request['event_id'])) {
            $where['EVT_ID'] = absint($request['event_id']);
        }
        return $where;
    }


    /**
     * Adds category ID if it exists in the request to the where conditions for the registrations query.
     *
     * @param array $request usually the same as $this->_req_data but not necessarily
     * @return array
     */
    protected function _add_category_id_to_where_conditions(array $request)
    {
        $where = array();
        if ( ! empty($request['EVT_CAT']) && (int)$request['EVT_CAT'] !== -1) {
            $where['Event.Term_Taxonomy.term_id'] = absint($request['EVT_CAT']);
        }
        return $where;
    }


    /**
     * Adds the datetime ID if it exists in the request to the where conditions for the registrations query.
     *
     * @param array $request usually the same as $this->_req_data but not necessarily
     * @return array
     */
    protected function _add_datetime_id_to_where_conditions(array $request)
    {
        $where = array();
        if ( ! empty($request['datetime_id'])) {
            $where['Ticket.Datetime.DTT_ID'] = absint($request['datetime_id']);
        }
        if( ! empty($request['DTT_ID'])){
            $where['Ticket.Datetime.DTT_ID'] = absint($request['DTT_ID']);
        }
        return $where;
    }


    /**
     * Adds the correct registration status to the where conditions for the registrations query.
     *
     * @param array $request usually the same as $this->_req_data but not necessarily
     * @return array
     */
    protected function _add_registration_status_to_where_conditions(array $request)
    {
        $where = array();
        $view  = EEH_Array::is_set( $request, 'status', '' );
        $registration_status = ! empty($request['_reg_status'])
            ? sanitize_text_field($request['_reg_status'])
            : '';

        /*
         * If filtering by registration status, then we show registrations matching that status.
         * If not filtering by specified status, then we show all registrations excluding incomplete registrations UNLESS
         * viewing trashed registrations.
         */
        if ( ! empty($registration_status)) {
            $where['STS_ID'] = $registration_status;
        } else {
            //make sure we exclude incomplete registrations, but only if not trashed.
            if ($view === 'trash') {
                $where['REG_deleted'] = true;
            } else if ($view === 'incomplete') {
                $where['STS_ID'] = EEM_Registration::status_id_incomplete;
            } else {
                $where['STS_ID'] = array('!=', EEM_Registration::status_id_incomplete);
            }
        }
        return $where;
    }


    /**
     * Adds any provided date restraints to the where conditions for the registrations query.
     *
     * @param array $request usually the same as $this->_req_data but not necessarily
     * @return array
     */
    protected function _add_date_to_where_conditions(array $request)
    {
        $where = array();
        $view  = EEH_Array::is_set( $request, 'status', '' );
        $month_range             = ! empty($request['month_range'])
            ? sanitize_text_field($request['month_range'])
            : '';
        $retrieve_for_today      = $view === 'today';
        $retrieve_for_this_month = $view === 'month';

        if ($retrieve_for_today) {
            $now               = date('Y-m-d', current_time('timestamp'));
            $where['REG_date'] = array(
                'BETWEEN',
                array(
                    EEM_Registration::instance()->convert_datetime_for_query(
                        'REG_date',
                        $now . ' 00:00:00',
                        'Y-m-d H:i:s'
                    ),
                    EEM_Registration::instance()->convert_datetime_for_query(
                        'REG_date',
                        $now . ' 23:59:59',
                        'Y-m-d H:i:s'
                    ),
                ),
            );
        } elseif ($retrieve_for_this_month) {
            $current_year_and_month = date('Y-m', current_time('timestamp'));
            $days_this_month        = date('t', current_time('timestamp'));
            $where['REG_date']      = array(
                'BETWEEN',
                array(
                    EEM_Registration::instance()->convert_datetime_for_query(
                        'REG_date',
                        $current_year_and_month . '-01 00:00:00',
                        'Y-m-d H:i:s'
                    ),
                    EEM_Registration::instance()->convert_datetime_for_query(
                        'REG_date',
                        $current_year_and_month . '-' . $days_this_month . ' 23:59:59',
                        'Y-m-d H:i:s'
                    ),
                ),
            );
        } elseif ($month_range) {
            $pieces          = explode(' ', $month_range, 3);
            $month_requested = ! empty($pieces[0])
                ? date('m', \EEH_DTT_Helper::first_of_month_timestamp($pieces[0]))
                : '';
            $year_requested  = ! empty($pieces[1])
                ? $pieces[1]
                : '';
            //if there is not a month or year then we can't go further
            if ($month_requested && $year_requested) {
                $days_in_month     = date('t', strtotime($year_requested . '-' . $month_requested . '-' . '01'));
                $where['REG_date'] = array(
                    'BETWEEN',
                    array(
                        EEM_Registration::instance()->convert_datetime_for_query(
                            'REG_date',
                            $year_requested . '-' . $month_requested . '-01 00:00:00',
                            'Y-m-d H:i:s'
                        ),
                        EEM_Registration::instance()->convert_datetime_for_query(
                            'REG_date',
                            $year_requested . '-' . $month_requested . '-' . $days_in_month . ' 23:59:59',
                            'Y-m-d H:i:s'
                        ),
                    ),
                );
            }
        }
        return $where;
    }


    /**
     * Adds any provided search restraints to the where conditions for the registrations query
     *
     * @param array $request usually the same as $this->_req_data but not necessarily
     * @return array
     */
    protected function _add_search_to_where_conditions(array $request)
    {
        $where = array();
        if ( ! empty($request['s'])) {
            $search_string = '%' . sanitize_text_field($request['s']) . '%';
            $where['OR'] = array(
                'Event.EVT_name'                          => array('LIKE', $search_string),
                'Event.EVT_desc'                          => array('LIKE', $search_string),
                'Event.EVT_short_desc'                    => array('LIKE', $search_string),
                'Attendee.ATT_full_name'                  => array('LIKE', $search_string),
                'Attendee.ATT_fname'                      => array('LIKE', $search_string),
                'Attendee.ATT_lname'                      => array('LIKE', $search_string),
                'Attendee.ATT_short_bio'                  => array('LIKE', $search_string),
                'Attendee.ATT_email'                      => array('LIKE', $search_string),
                'Attendee.ATT_address'                    => array('LIKE', $search_string),
                'Attendee.ATT_address2'                   => array('LIKE', $search_string),
                'Attendee.ATT_city'                       => array('LIKE', $search_string),
                'REG_final_price'                         => array('LIKE', $search_string),
                'REG_code'                                => array('LIKE', $search_string),
                'REG_count'                               => array('LIKE', $search_string),
                'REG_group_size'                          => array('LIKE', $search_string),
                'Ticket.TKT_name'                         => array('LIKE', $search_string),
                'Ticket.TKT_description'                  => array('LIKE', $search_string),
                'Transaction.Payment.PAY_txn_id_chq_nmbr' => array('LIKE', $search_string),
            );
        }
        return $where;
    }


    /**
     * Sets up the where conditions for the registrations query.
     *
     * @param array $request
     * @return array
     */
    protected function _get_where_conditions_for_registrations_query($request)
    {
        return array_merge(
            $this->_add_event_id_to_where_conditions($request),
            $this->_add_category_id_to_where_conditions($request),
            $this->_add_datetime_id_to_where_conditions($request),
            $this->_add_registration_status_to_where_conditions($request),
            $this->_add_date_to_where_conditions($request),
            $this->_add_search_to_where_conditions($request)
        );
    }


    /**
     * Sets up the orderby for the registrations query.
     *
     * @return array
     */
    protected function _get_orderby_for_registrations_query()
    {
        $orderby_field = ! empty($this->_req_data['orderby'])
            ? sanitize_text_field($this->_req_data['orderby'])
            : '';
        switch ($orderby_field) {
            case '_REG_ID':
                $orderby_field = 'REG_ID';
                break;
            case '_Reg_status':
                $orderby_field = 'STS_ID';
                break;
            case 'ATT_fname':
                $orderby_field = array('Attendee.ATT_fname', 'Attendee.ATT_lname');
                break;
            case 'ATT_lname' :
                $orderby_field = array('Attendee.ATT_lname', 'Attendee.ATT_fname');
                break;
            case 'event_name':
                $orderby_field = 'Event.EVT_name';
                break;
            case 'DTT_EVT_start':
                $orderby_field = 'Event.Datetime.DTT_EVT_start';
                break;
            default: //'REG_date'
                $orderby_field = 'REG_date';
        }

        //order
        $order = ! empty($this->_req_data['order'])
            ? sanitize_text_field($this->_req_data['order'])
            : 'DESC';

        //mutate orderby_field
        $orderby_field = array_combine(
                (array) $orderby_field,
                array_fill(0, count($orderby_field), $order)
            );
        return array('order_by' => $orderby_field);
    }


    /**
     * Sets up the limit for the registrations query.
     *
     * @param $per_page
     * @return array
     */
    protected function _get_limit($per_page)
    {
        $current_page = ! empty($this->_req_data['paged'])
            ? absint($this->_req_data['paged'])
            : 1;
        $per_page     = ! empty($this->_req_data['perpage'])
            ? $this->_req_data['perpage']
            : $per_page;

        //-1 means return all results so get out if that's set.
        if ((int)$per_page === -1) {
            return array();
        }
        $per_page = absint($per_page);
        $offset   = ($current_page - 1) * $per_page;
        return array('limit' => array($offset, $per_page));
    }


    public function get_registration_status_array()
    {
        return self::$_reg_status;
    }




    /***************************************        REGISTRATION DETAILS        ***************************************/
    /**
     *        generates HTML for the View Registration Details Admin page
     *
     * @access protected
     * @return void
     */
    protected function _registration_details()
    {
        $this->_template_args = array();
        $this->_set_registration_object();
        if (is_object($this->_registration)) {
            $transaction                                   = $this->_registration->transaction() ? $this->_registration->transaction()
                : EE_Transaction::new_instance();
            $this->_session                                = $transaction->session_data();
            $event_id                                      = $this->_registration->event_ID();
            $this->_template_args['reg_nmbr']['value']     = $this->_registration->ID();
            $this->_template_args['reg_nmbr']['label']     = __('Registration Number', 'event_espresso');
            $this->_template_args['reg_datetime']['value'] = $this->_registration->get_i18n_datetime('REG_date');
            $this->_template_args['reg_datetime']['label'] = __('Date', 'event_espresso');
            $this->_template_args['grand_total']           = $transaction->total();
            $this->_template_args['currency_sign']         = EE_Registry::instance()->CFG->currency->sign;
            // link back to overview
            $this->_template_args['reg_overview_url']            = REG_ADMIN_URL;
            $this->_template_args['registration']                = $this->_registration;
            $this->_template_args['filtered_registrations_link'] = EE_Admin_Page::add_query_args_and_nonce(array(
                'action'   => 'default',
                'event_id' => $event_id,
            ), REG_ADMIN_URL);
            $this->_template_args['filtered_transactions_link']  = EE_Admin_Page::add_query_args_and_nonce(array(
                'action' => 'default',
                'EVT_ID' => $event_id,
                'page'   => 'espresso_transactions',
            ), admin_url('admin.php'));
            $this->_template_args['event_link']                  = EE_Admin_Page::add_query_args_and_nonce(array(
                'page'   => 'espresso_events',
                'action' => 'edit',
                'post'   => $event_id,
            ), admin_url('admin.php'));
            //next and previous links
            $next_reg                                      = $this->_registration->next(null, array(), 'REG_ID');
            $this->_template_args['next_registration']     = $next_reg
                ? $this->_next_link(EE_Admin_Page::add_query_args_and_nonce(array(
                    'action'  => 'view_registration',
                    '_REG_ID' => $next_reg['REG_ID'],
                ), REG_ADMIN_URL), 'dashicons dashicons-arrow-right ee-icon-size-22') : '';
            $previous_reg                                  = $this->_registration->previous(null, array(), 'REG_ID');
            $this->_template_args['previous_registration'] = $previous_reg
                ? $this->_previous_link(EE_Admin_Page::add_query_args_and_nonce(array(
                    'action'  => 'view_registration',
                    '_REG_ID' => $previous_reg['REG_ID'],
                ), REG_ADMIN_URL), 'dashicons dashicons-arrow-left ee-icon-size-22') : '';
            // grab header
            $template_path                             = REG_TEMPLATE_PATH . 'reg_admin_details_header.template.php';
            $this->_template_args['REG_ID']            = $this->_registration->ID();
            $this->_template_args['admin_page_header'] = EEH_Template::display_template($template_path,
                $this->_template_args, true);
        } else {
            $this->_template_args['admin_page_header'] = $this->display_espresso_notices();
        }
        // the details template wrapper
        $this->display_admin_page_with_sidebar();
    }


    protected function _registration_details_metaboxes()
    {
        do_action('AHEE__Registrations_Admin_Page___registration_details_metabox__start', $this);
        $this->_set_registration_object();
        $attendee = $this->_registration instanceof EE_Registration ? $this->_registration->attendee() : null;
        add_meta_box('edit-reg-status-mbox', __('Registration Status', 'event_espresso'),
            array($this, 'set_reg_status_buttons_metabox'), $this->wp_page_slug, 'normal', 'high');
        add_meta_box('edit-reg-details-mbox', __('Registration Details', 'event_espresso'),
            array($this, '_reg_details_meta_box'), $this->wp_page_slug, 'normal', 'high');
        if ($attendee instanceof EE_Attendee
            && EE_Registry::instance()->CAP->current_user_can('ee_edit_registration', 'edit-reg-questions-mbox')
        ) {
            add_meta_box('edit-reg-questions-mbox', __('Registration Form Answers', 'event_espresso'),
                array($this, '_reg_questions_meta_box'), $this->wp_page_slug, 'normal', 'high');
        }
        add_meta_box('edit-reg-registrant-mbox', __('Contact Details', 'event_espresso'),
            array($this, '_reg_registrant_side_meta_box'), $this->wp_page_slug, 'side', 'high');
        if ($this->_registration->group_size() > 1) {
            add_meta_box('edit-reg-attendees-mbox', __('Other Registrations in this Transaction', 'event_espresso'),
                array($this, '_reg_attendees_meta_box'), $this->wp_page_slug, 'normal', 'high');
        }
    }


    /**
     * set_reg_status_buttons_metabox
     *
     * @access protected
     * @return string
     * @throws \EE_Error
     */
    public function set_reg_status_buttons_metabox()
    {
        $this->_set_registration_object();
        $change_reg_status_form = $this->_generate_reg_status_change_form();
        echo $change_reg_status_form->form_open(self::add_query_args_and_nonce(array(
            'action' => 'change_reg_status',
        ), REG_ADMIN_URL));
        echo $change_reg_status_form->get_html();
        echo $change_reg_status_form->form_close();
    }


    /**
     * @return EE_Form_Section_Proper
     */
    protected function _generate_reg_status_change_form()
    {
        return new EE_Form_Section_Proper(array(
            'name'            => 'reg_status_change_form',
            'html_id'         => 'reg-status-change-form',
            'layout_strategy' => new EE_Admin_Two_Column_Layout(),
            'subsections'     => array(
                'return'             => new EE_Hidden_Input(array(
                    'name'    => 'return',
                    'default' => 'view_registration',
                )),
                'REG_ID'             => new EE_Hidden_Input(array(
                    'name'    => 'REG_ID',
                    'default' => $this->_registration->ID(),
                )),
                'current_status'     => new EE_Form_Section_HTML(EEH_HTML::tr(EEH_HTML::th(EEH_HTML::label(EEH_HTML::strong(__('Current Registration Status',
                        'event_espresso')))) . EEH_HTML::td(EEH_HTML::strong($this->_registration->pretty_status(),
                        '', 'status-' . $this->_registration->status_ID(),
                        'line-height: 1em; font-size: 1.5em; font-weight: bold;')))),
                'reg_status'         => new EE_Select_Input($this->_get_reg_statuses(), array(
                    'html_label_text' => __('Change Registration Status to', 'event_espresso'),
                    'default'         => $this->_registration->status_ID(),
                )),
                'send_notifications' => new EE_Yes_No_Input(array(
                    'html_label_text' => __('Send Related Messages', 'event_espresso'),
                    'default'         => false,
                    'html_help_text'  => __('If set to "Yes", then the related messages will be sent to the registrant.',
                        'event_espresso'),
                )),
                'submit'             => new EE_Submit_Input(array(
                    'html_class'      => 'button-primary',
                    'html_label_text' => '&nbsp;',
                    'default'         => __('Update Registration Status', 'event_espresso'),
                )),
            ),
        ));
    }



    /**
     * Returns an array of all the buttons for the various statuses and switch status actions
     *
     * @return array
     */
    protected function _get_reg_statuses()
    {
        $reg_status_array = EEM_Registration::instance()->reg_status_array();
        unset ($reg_status_array[EEM_Registration::status_id_incomplete]);
        // get current reg status
        $current_status = $this->_registration->status_ID();
        // is registration for free event? This will determine whether to display the pending payment option
        if ($current_status != EEM_Registration::status_id_pending_payment
            && $this->_registration->transaction()
                                   ->is_free()
        ) {
            unset($reg_status_array[EEM_Registration::status_id_pending_payment]);
        }
        return EEM_Status::instance()->localized_status($reg_status_array, false, 'sentence');
    }


    /**
     * This method is used when using _REG_ID from request which may or may not be an array of reg_ids.
     *
     * @param bool $status REG status given for changing registrations to.
     * @param bool $notify Whether to send messages notifications or not.
     * @return array  (array with reg_id(s) updated and whether update was successful.
     */
    protected function _set_registration_status_from_request($status = false, $notify = false)
    {
        if (isset($this->_req_data['reg_status_change_form'])) {
            $REG_IDs = isset($this->_req_data['reg_status_change_form']['REG_ID'])
                ? (array)$this->_req_data['reg_status_change_form']['REG_ID'] : array();
        } else {
            $REG_IDs = isset($this->_req_data['_REG_ID']) ? (array)$this->_req_data['_REG_ID'] : array();
        }
        $success = $this->_set_registration_status($REG_IDs, $status);
        //notify?
        if ($success
            && $notify
            && EE_Registry::instance()->CAP->current_user_can('ee_send_message',
                'espresso_registrations_resend_registration')
        ) {
            $this->_process_resend_registration();
        }
        return $success;
    }


    /**
     * Set the registration status for the given reg_id (which may or may not be an array, it gets typecast to an
     * array). Note, this method does NOT take care of possible notifications.  That is required by calling code.
     *
     * @param array $REG_IDs
     * @param bool  $status
     * @return array (an array with 'success' key representing whether status change was successful, and 'REG_ID' as
     *               the array of updated registrations).
     */
    protected function _set_registration_status($REG_IDs = array(), $status = false)
    {
        $success = false;
        // typecast $REG_IDs
        $REG_IDs = (array)$REG_IDs;
        if ( ! empty($REG_IDs)) {
            $success = true;
            // set default status if none is passed
            $status = $status ? $status : EEM_Registration::status_id_pending_payment;
            // sanitize $REG_IDs
            $REG_IDs = array_filter($REG_IDs, 'absint');
            //loop through REG_ID's and change status
            foreach ($REG_IDs as $REG_ID) {
                $registration = EEM_Registration::instance()->get_one_by_ID($REG_ID);
                if ($registration instanceof EE_Registration) {
                    $registration->set_status($status);
                    $result = $registration->save();
                    // verifying explicit fails because update *may* just return 0 for 0 rows affected
                    $success = $result !== false ? $success : false;
                }
            }
        }
        //reset _req_data['_REG_ID'] for any potential future messages notifications
        $this->_req_data['_REG_ID'] = $REG_IDs;
        //return $success and processed registrations
        return array('REG_ID' => $REG_IDs, 'success' => $success);
    }


    /**
     * Common logic for setting up success message and redirecting to appropriate route
     *
     * @param  string $STS_ID status id for the registration changed to
     * @param   bool  $notify indicates whether the _set_registration_status_from_request does notifications or not.
     * @return void
     */
    protected function _reg_status_change_return($STS_ID, $notify = false)
    {
        $result  = ! empty($STS_ID) ? $this->_set_registration_status_from_request($STS_ID, $notify)
            : array('success' => false);
        $success = isset($result['success']) && $result['success'];
        //setup success message
        if ($success) {
            if (is_array($result['REG_ID']) && count($result['REG_ID']) === 1) {
                $msg = sprintf(__('Registration status has been set to %s', 'event_espresso'),
                    EEH_Template::pretty_status($STS_ID, false, 'lower'));
            } else {
                $msg = sprintf(__('Registrations have been set to %s.', 'event_espresso'),
                    EEH_Template::pretty_status($STS_ID, false, 'lower'));
            }
            EE_Error::add_success($msg);
        } else {
            EE_Error::add_error(__('Something went wrong, and the status was not changed', 'event_espresso'), __FILE__,
                __LINE__, __FUNCTION__);
        }
        if (isset($this->_req_data['return']) && $this->_req_data['return'] == 'view_registration') {
            $route = array('action' => 'view_registration', '_REG_ID' => reset($result['REG_ID']));
        } else {
            $route = array('action' => 'default');
        }
        //unset nonces
        foreach ($this->_req_data as $ref => $value) {
            if (strpos($ref, 'nonce') !== false) {
                unset($this->_req_data[$ref]);
                continue;
            }
            $value                 = is_array($value) ? array_map('urlencode', $value) : urlencode($value);
            $this->_req_data[$ref] = $value;
        }
        //merge request vars so that the reloaded list table contains any existing filter query params
        $route = array_merge($this->_req_data, $route);
        $this->_redirect_after_action($success, '', '', $route, true);
    }


    /**
     * incoming reg status change from reg details page.
     *
     * @return void
     */
    protected function _change_reg_status()
    {
        $this->_req_data['return'] = 'view_registration';
        //set notify based on whether the send notifications toggle is set or not
        $notify = ! empty($this->_req_data['reg_status_change_form']['send_notifications']);
        //$notify = ! empty( $this->_req_data['txn_reg_status_change']['send_notifications'] );
        $this->_req_data['reg_status_change_form']['reg_status'] = isset($this->_req_data['reg_status_change_form']['reg_status'])
            ? $this->_req_data['reg_status_change_form']['reg_status'] : '';
        switch ($this->_req_data['reg_status_change_form']['reg_status']) {
            case EEM_Registration::status_id_approved :
            case EEH_Template::pretty_status(EEM_Registration::status_id_approved, false, 'sentence') :
                $this->approve_registration($notify);
                break;
            case EEM_Registration::status_id_pending_payment :
            case EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, false, 'sentence') :
                $this->pending_registration($notify);
                break;
            case EEM_Registration::status_id_not_approved :
            case EEH_Template::pretty_status(EEM_Registration::status_id_not_approved, false, 'sentence') :
                $this->not_approve_registration($notify);
                break;
            case EEM_Registration::status_id_declined :
            case EEH_Template::pretty_status(EEM_Registration::status_id_declined, false, 'sentence') :
                $this->decline_registration($notify);
                break;
            case EEM_Registration::status_id_cancelled :
            case EEH_Template::pretty_status(EEM_Registration::status_id_cancelled, false, 'sentence') :
                $this->cancel_registration($notify);
                break;
            case EEM_Registration::status_id_wait_list :
            case EEH_Template::pretty_status(EEM_Registration::status_id_wait_list, false, 'sentence') :
                $this->waitlist_registration($notify);
                break;
            case EEM_Registration::status_id_incomplete :
            default :
                $result['success'] = false;
                unset($this->_req_data['return']);
                $this->_reg_status_change_return('', false);
                break;
        }
    }


    /**
     * approve_registration
     *
     * @access protected
     * @param bool $notify whether or not to notify the registrant about their approval.
     * @return void
     */
    protected function approve_registration($notify = false)
    {
        $this->_reg_status_change_return(EEM_Registration::status_id_approved, $notify);
    }


    /**
     *        decline_registration
     *
     * @access protected
     * @param bool $notify whether or not to notify the registrant about their status change.
     * @return void
     */
    protected function decline_registration($notify = false)
    {
        $this->_reg_status_change_return(EEM_Registration::status_id_declined, $notify);
    }


    /**
     *        cancel_registration
     *
     * @access protected
     * @param bool $notify whether or not to notify the registrant about their status change.
     * @return void
     */
    protected function cancel_registration($notify = false)
    {
        $this->_reg_status_change_return(EEM_Registration::status_id_cancelled, $notify);
    }


    /**
     *        not_approve_registration
     *
     * @access protected
     * @param bool $notify whether or not to notify the registrant about their status change.
     * @return void
     */
    protected function not_approve_registration($notify = false)
    {
        $this->_reg_status_change_return(EEM_Registration::status_id_not_approved, $notify);
    }


    /**
     *        decline_registration
     *
     * @access protected
     * @param bool $notify whether or not to notify the registrant about their status change.
     * @return void
     */
    protected function pending_registration($notify = false)
    {
        $this->_reg_status_change_return(EEM_Registration::status_id_pending_payment, $notify);
    }


    /**
     * waitlist_registration
     *
     * @access protected
     * @param bool $notify whether or not to notify the registrant about their status change.
     * @return void
     */
    protected function waitlist_registration($notify = false)
    {
        $this->_reg_status_change_return(EEM_Registration::status_id_wait_list, $notify);
    }


    /**
     *        generates HTML for the Registration main meta box
     *
     * @access public
     * @return void
     */
    public function _reg_details_meta_box()
    {
        EEH_Autoloader::register_line_item_display_autoloaders();
        EEH_Autoloader::register_line_item_filter_autoloaders();
        EE_Registry::instance()->load_helper('Line_Item');
        $transaction    = $this->_registration->transaction() ? $this->_registration->transaction()
            : EE_Transaction::new_instance();
        $this->_session = $transaction->session_data();
        $filters        = new EE_Line_Item_Filter_Collection();
        //$filters->add( new EE_Non_Zero_Line_Item_Filter() );
        $filters->add(new EE_Single_Registration_Line_Item_Filter($this->_registration));
        $line_item_filter_processor              = new EE_Line_Item_Filter_Processor($filters,
            $transaction->total_line_item());
        $filtered_line_item_tree                 = $line_item_filter_processor->process();
        $line_item_display                       = new EE_Line_Item_Display('reg_admin_table',
            'EE_Admin_Table_Registration_Line_Item_Display_Strategy');
        $this->_template_args['line_item_table'] = $line_item_display->display_line_item($filtered_line_item_tree,
            array('EE_Registration' => $this->_registration));
        $attendee                                = $this->_registration->attendee();
        if (EE_Registry::instance()->CAP->current_user_can('ee_read_transaction',
            'espresso_transactions_view_transaction')
        ) {
            $this->_template_args['view_transaction_button'] = EEH_Template::get_button_or_link(EE_Admin_Page::add_query_args_and_nonce(array(
                'action' => 'view_transaction',
                'TXN_ID' => $transaction->ID(),
            ), TXN_ADMIN_URL), esc_html__(' View Transaction'), 'button secondary-button right',
                'dashicons dashicons-cart');
        } else {
            $this->_template_args['view_transaction_button'] = '';
        }
        if ($attendee instanceof EE_Attendee
            && EE_Registry::instance()->CAP->current_user_can('ee_send_message',
                'espresso_registrations_resend_registration')
        ) {
            $this->_template_args['resend_registration_button'] = EEH_Template::get_button_or_link(EE_Admin_Page::add_query_args_and_nonce(array(
                'action'      => 'resend_registration',
                '_REG_ID'     => $this->_registration->ID(),
                'redirect_to' => 'view_registration',
            ), REG_ADMIN_URL), esc_html__(' Resend Registration'), 'button secondary-button right',
                'dashicons dashicons-email-alt');
        } else {
            $this->_template_args['resend_registration_button'] = '';
        }
        $this->_template_args['currency_sign'] = EE_Registry::instance()->CFG->currency->sign;
        $payment                               = $transaction->get_first_related('Payment');
        $payment                               = ! $payment instanceof EE_Payment ? EE_Payment::new_instance() : $payment;
        $payment_method                        = $payment->get_first_related('Payment_Method');
        $payment_method                        = ! $payment_method instanceof EE_Payment_Method ? EE_Payment_Method::new_instance()
            : $payment_method;
        $reg_details                           = array(
            'payment_method'       => $payment_method->name(),
            'response_msg'         => $payment->gateway_response(),
            'registration_id'      => $this->_registration->get('REG_code'),
            'registration_session' => $this->_registration->session_ID(),
            'ip_address'           => isset($this->_session['ip_address']) ? $this->_session['ip_address'] : '',
            'user_agent'           => isset($this->_session['user_agent']) ? $this->_session['user_agent'] : '',
        );
        if (isset($reg_details['registration_id'])) {
            $this->_template_args['reg_details']['registration_id']['value'] = $reg_details['registration_id'];
            $this->_template_args['reg_details']['registration_id']['label'] = __('Registration ID', 'event_espresso');
            $this->_template_args['reg_details']['registration_id']['class'] = 'regular-text';
        }
        if (isset($reg_details['payment_method'])) {
            $this->_template_args['reg_details']['payment_method']['value'] = $reg_details['payment_method'];
            $this->_template_args['reg_details']['payment_method']['label'] = __('Most Recent Payment Method',
                'event_espresso');
            $this->_template_args['reg_details']['payment_method']['class'] = 'regular-text';
            $this->_template_args['reg_details']['response_msg']['value']   = $reg_details['response_msg'];
            $this->_template_args['reg_details']['response_msg']['label']   = __('Payment method response',
                'event_espresso');
            $this->_template_args['reg_details']['response_msg']['class']   = 'regular-text';
        }
        $this->_template_args['reg_details']['registration_session']['value'] = $reg_details['registration_session'];
        $this->_template_args['reg_details']['registration_session']['label'] = __('Registration Session',
            'event_espresso');
        $this->_template_args['reg_details']['registration_session']['class'] = 'regular-text';
        $this->_template_args['reg_details']['ip_address']['value']           = $reg_details['ip_address'];
        $this->_template_args['reg_details']['ip_address']['label']           = __('Registration placed from IP',
            'event_espresso');
        $this->_template_args['reg_details']['ip_address']['class']           = 'regular-text';
        $this->_template_args['reg_details']['user_agent']['value']           = $reg_details['user_agent'];
        $this->_template_args['reg_details']['user_agent']['label']           = __('Registrant User Agent',
            'event_espresso');
        $this->_template_args['reg_details']['user_agent']['class']           = 'large-text';
        $this->_template_args['event_link']                                   = EE_Admin_Page::add_query_args_and_nonce(array(
            'action'   => 'default',
            'event_id' => $this->_registration->event_ID(),
        ), REG_ADMIN_URL);
        $this->_template_args['REG_ID']                                       = $this->_registration->ID();
        $this->_template_args['event_id']                                     = $this->_registration->event_ID();
        $template_path                                                        = REG_TEMPLATE_PATH . 'reg_admin_details_main_meta_box_reg_details.template.php';
        echo EEH_Template::display_template($template_path, $this->_template_args, true);
    }


    /**
     * generates HTML for the Registration Questions meta box.
     * If pre-4.8.32.rc.000 hooks are used, uses old methods (with its filters),
     * otherwise uses new forms system
     *
     * @access public
     * @return void
     */
    public function _reg_questions_meta_box()
    {
        //allow someone to override this method entirely
        if (apply_filters('FHEE__Registrations_Admin_Page___reg_questions_meta_box__do_default', true, $this,
            $this->_registration)) {
            $form                                              = $this->_get_reg_custom_questions_form($this->_registration->ID());
            $this->_template_args['att_questions']             = count($form->subforms()) > 0 ? $form->get_html_and_js() : '';
            $this->_template_args['reg_questions_form_action'] = 'edit_registration';
            $this->_template_args['REG_ID']                    = $this->_registration->ID();
            $template_path                                     = REG_TEMPLATE_PATH . 'reg_admin_details_main_meta_box_reg_questions.template.php';
            echo EEH_Template::display_template($template_path, $this->_template_args, true);
        }
    }


    /**
     * form_before_question_group
     *
     * @deprecated    as of 4.8.32.rc.000
     * @access        public
     * @param        string $output
     * @return        string
     */
    public function form_before_question_group($output)
    {
        EE_Error::doing_it_wrong(__CLASS__ . '::' . __FUNCTION__,
            __('This method would have been protected but was used on a filter callback'
               . 'so needed to be public. Please discontinue usage as it will be removed soon.', 'event_espresso'),
            '4.8.32.rc.000');
        return '
	<table class="form-table ee-width-100">
		<tbody>
			';
    }


    /**
     * form_after_question_group
     *
     * @deprecated    as of 4.8.32.rc.000
     * @access        public
     * @param        string $output
     * @return        string
     */
    public function form_after_question_group($output)
    {
        EE_Error::doing_it_wrong(__CLASS__ . '::' . __FUNCTION__,
            __('This method would have been protected but was used on a filter callback'
               . 'so needed to be public. Please discontinue usage as it will be removed soon.', 'event_espresso'),
            '4.8.32.rc.000');
        return '
			<tr class="hide-if-no-js">
				<th> </th>
				<td class="reg-admin-edit-attendee-question-td">
					<a class="reg-admin-edit-attendee-question-lnk" href="#" title="'
               . esc_attr__('click to edit question', 'event_espresso')
               . '">
						<span class="reg-admin-edit-question-group-spn lt-grey-txt">'
               . __('edit the above question group', 'event_espresso')
               . '</span>
						<div class="dashicons dashicons-edit"></div>
					</a>
				</td>
			</tr>
		</tbody>
	</table>
';
    }


    /**
     * form_form_field_label_wrap
     *
     * @deprecated    as of 4.8.32.rc.000
     * @access        public
     * @param        string $label
     * @return        string
     */
    public function form_form_field_label_wrap($label)
    {
        EE_Error::doing_it_wrong(__CLASS__ . '::' . __FUNCTION__,
            __('This method would have been protected but was used on a filter callback'
               . 'so needed to be public. Please discontinue usage as it will be removed soon.', 'event_espresso'),
            '4.8.32.rc.000');
        return '
			<tr>
				<th>
					' . $label . '
				</th>';
    }


    /**
     * form_form_field_input__wrap
     *
     * @deprecated    as of 4.8.32.rc.000
     * @access        public
     * @param        string $input
     * @return        string
     */
    public function form_form_field_input__wrap($input)
    {
        EE_Error::doing_it_wrong(__CLASS__ . '::' . __FUNCTION__,
            __('This method would have been protected but was used on a filter callback'
               . 'so needed to be public. Please discontinue usage as it will be removed soon.', 'event_espresso'),
            '4.8.32.rc.000');
        return '
				<td class="reg-admin-attendee-questions-input-td disabled-input">
					' . $input . '
				</td>
			</tr>';
    }


    /**
     * Updates the registration's custom questions according to the form info, if the form is submitted.
     * If it's not a post, the "view_registrations" route will be called next on the SAME request
     * to display the page
     *
     * @access protected
     * @return void
     */
    protected function _update_attendee_registration_form()
    {
        do_action('AHEE__Registrations_Admin_Page___update_attendee_registration_form__start', $this);
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $REG_ID  = isset($this->_req_data['_REG_ID']) ? absint($this->_req_data['_REG_ID']) : false;
            $success = $this->_save_reg_custom_questions_form($REG_ID);
            if ($success) {
                $what  = __('Registration Form', 'event_espresso');
                $route = $REG_ID ? array('action' => 'view_registration', '_REG_ID' => $REG_ID)
                    : array('action' => 'default');
                $this->_redirect_after_action($success, $what, __('updated', 'event_espresso'), $route);
            }
        }
    }


    /**
     * Gets the form for saving registrations custom questions (if done
     * previously retrieves the cached form object, which may have validation errors in it)
     *
     * @param int $REG_ID
     * @return EE_Registration_Custom_Questions_Form
     */
    protected function _get_reg_custom_questions_form($REG_ID)
    {
        if ( ! $this->_reg_custom_questions_form) {
            require_once(REG_ADMIN . 'form_sections' . DS . 'EE_Registration_Custom_Questions_Form.form.php');
            $this->_reg_custom_questions_form = new EE_Registration_Custom_Questions_Form(
                EEM_Registration::instance()->get_one_by_ID($REG_ID)
            );
            $this->_reg_custom_questions_form->_construct_finalize(null, null);
        }
        return $this->_reg_custom_questions_form;
    }


    /**
     * Saves
     *
     * @access private
     * @param bool $REG_ID
     * @return bool
     */
    private function _save_reg_custom_questions_form($REG_ID = false)
    {
        if ( ! $REG_ID) {
            EE_Error::add_error(__('An error occurred. No registration ID was received.', 'event_espresso'), __FILE__,
                __FUNCTION__, __LINE__);
        }
        $form = $this->_get_reg_custom_questions_form($REG_ID);
        $form->receive_form_submission($this->_req_data);
        $success = false;
        if ($form->is_valid()) {
            foreach ($form->subforms() as $question_group_id => $question_group_form) {
                foreach ($question_group_form->inputs() as $question_id => $input) {
                    $where_conditions    = array(
                        'QST_ID' => $question_id,
                        'REG_ID' => $REG_ID,
                    );
                    $possibly_new_values = array(
                        'ANS_value' => $input->normalized_value(),
                    );
                    $answer              = EEM_Answer::instance()->get_one(array($where_conditions));
                    if ($answer instanceof EE_Answer) {
                        $success = $answer->save($possibly_new_values);
                    } else {
                        //insert it then
                        $cols_n_vals = array_merge($where_conditions, $possibly_new_values);
                        $answer      = EE_Answer::new_instance($cols_n_vals);
                        $success     = $answer->save();
                    }
                }
            }
        } else {
            EE_Error::add_error($form->get_validation_error_string(), __FILE__, __FUNCTION__, __LINE__);
        }
        return $success;
    }


    /**
     *        generates HTML for the Registration main meta box
     *
     * @access public
     * @return void
     */
    public function _reg_attendees_meta_box()
    {
        $REG = EEM_Registration::instance();
        //get all other registrations on this transaction, and cache
        //the attendees for them so we don't have to run another query using force_join
        $registrations                           = $REG->get_all(array(
            array(
                'TXN_ID' => $this->_registration->transaction_ID(),
                'REG_ID' => array('!=', $this->_registration->ID()),
            ),
            'force_join' => array('Attendee'),
        ));
        $this->_template_args['attendees']       = array();
        $this->_template_args['attendee_notice'] = '';
        if (empty($registrations)
            || (is_array($registrations)
                && ! EEH_Array::get_one_item_from_array($registrations))
        ) {
            EE_Error::add_error(__('There are no records attached to this registration. Something may have gone wrong with the registration',
                'event_espresso'), __FILE__, __FUNCTION__, __LINE__);
            $this->_template_args['attendee_notice'] = EE_Error::get_notices();
        } else {
            $att_nmbr = 1;
            foreach ($registrations as $registration) {
                /* @var $registration EE_Registration */
                $attendee                                                    = $registration->attendee()
                    ? $registration->attendee()
                    : EEM_Attendee::instance()
                                  ->create_default_object();
                $this->_template_args['attendees'][$att_nmbr]['STS_ID']      = $registration->status_ID();
                $this->_template_args['attendees'][$att_nmbr]['fname']       = $attendee->fname();//( isset( $registration->ATT_fname ) & ! empty( $registration->ATT_fname ) ) ? $registration->ATT_fname : '';
                $this->_template_args['attendees'][$att_nmbr]['lname']       = $attendee->lname();//( isset( $registration->ATT_lname ) & ! empty( $registration->ATT_lname ) ) ? $registration->ATT_lname : '';
                $this->_template_args['attendees'][$att_nmbr]['email']       = $attendee->email();//( isset( $registration->ATT_email ) & ! empty( $registration->ATT_email ) ) ? $registration->ATT_email : '';
                $this->_template_args['attendees'][$att_nmbr]['final_price'] = $registration->final_price();//( isset( $registration->REG_final_price ) & ! empty( $registration->REG_final_price ) ) ? $registration->REG_final_price : '';
                $this->_template_args['attendees'][$att_nmbr]['address']     = implode(', ',
                    $attendee->full_address_as_array());
                $this->_template_args['attendees'][$att_nmbr]['att_link']    = self::add_query_args_and_nonce(array(
                    'action' => 'edit_attendee',
                    'post'   => $attendee->ID(),
                ), REG_ADMIN_URL);
                $this->_template_args['attendees'][$att_nmbr]['event_name']  = $registration->event_obj()->name();
                $att_nmbr++;
            }
            //EEH_Debug_Tools::printr( $attendees, '$attendees  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );
            $this->_template_args['currency_sign'] = EE_Registry::instance()->CFG->currency->sign;
            //			$this->_template_args['registration_form_url'] = add_query_arg( array( 'action' => 'edit_registration', 'process' => 'attendees'  ), REG_ADMIN_URL );
        }
        $template_path = REG_TEMPLATE_PATH . 'reg_admin_details_main_meta_box_attendees.template.php';
        echo EEH_Template::display_template($template_path, $this->_template_args, true);
    }


    /**
     *        generates HTML for the Edit Registration side meta box
     *
     * @access public
     * @return void
     */
    public function _reg_registrant_side_meta_box()
    {
        /*@var $attendee EE_Attendee */
        $att_check = $this->_registration->attendee();
        $attendee  = $att_check instanceof EE_Attendee ? $att_check : EEM_Attendee::instance()->create_default_object();
        //now let's determine if this is not the primary registration.  If it isn't then we set the primary_registration object for reference BUT ONLY if the Attendee object loaded is not the same as the primary registration object (that way we know if we need to show create button or not)
        if ( ! $this->_registration->is_primary_registrant()) {
            $primary_registration = $this->_registration->get_primary_registration();
            $primary_attendee     = $primary_registration instanceof EE_Registration ? $primary_registration->attendee()
                : null;
            if ( ! $primary_attendee instanceof EE_Attendee || $attendee->ID() !== $primary_attendee->ID()) {
                //in here?  This means the displayed registration is not the primary registrant but ALREADY HAS its own custom attendee object so let's not worry about the primary reg.
                $primary_registration = null;
            }
        } else {
            $primary_registration = null;
        }
        $this->_template_args['ATT_ID']            = $attendee->ID();
        $this->_template_args['fname']             = $attendee->fname();//$this->_registration->ATT_fname;
        $this->_template_args['lname']             = $attendee->lname();//$this->_registration->ATT_lname;
        $this->_template_args['email']             = $attendee->email();//$this->_registration->ATT_email;
        $this->_template_args['phone']             = $attendee->phone();
        $this->_template_args['formatted_address'] = EEH_Address::format($attendee);
        //edit link
        $this->_template_args['att_edit_link']  = EE_Admin_Page::add_query_args_and_nonce(array(
            'action' => 'edit_attendee',
            'post'   => $attendee->ID(),
        ), REG_ADMIN_URL);
        $this->_template_args['att_edit_label'] = __('View/Edit Contact', 'event_espresso');
        //create link
        $this->_template_args['create_link']  = $primary_registration instanceof EE_Registration
            ? EE_Admin_Page::add_query_args_and_nonce(array(
                'action'  => 'duplicate_attendee',
                '_REG_ID' => $this->_registration->ID(),
            ), REG_ADMIN_URL) : '';
        $this->_template_args['create_label'] = __('Create Contact', 'event_espresso');
        $this->_template_args['att_check']    = $att_check;
        $template_path                        = REG_TEMPLATE_PATH . 'reg_admin_details_side_meta_box_registrant.template.php';
        echo EEH_Template::display_template($template_path, $this->_template_args, true);
    }



    /**
     * trash or restore registrations
     *
     * @param  boolean $trash whether to archive or restore
     * @access protected
     * @return void
     * @throws \EE_Error
     */
    protected function _trash_or_restore_registrations($trash = true)
    {
        //if empty _REG_ID then get out because there's nothing to do
        if (empty($this->_req_data['_REG_ID'])) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'In order to %1$s registrations you must select which ones you wish to %1$s by clicking the checkboxes.',
                        'event_espresso'
                    ),
                    $trash ? 'trash' : 'restore'
                ),
                __FILE__, __LINE__, __FUNCTION__
            );
            $this->_redirect_after_action(false, '', '', array(), true);
        }
        $success = 0;
        $overwrite_msgs = false;
        //Checkboxes
        if ( ! is_array($this->_req_data['_REG_ID'])) {
            $this->_req_data['_REG_ID'] = array($this->_req_data['_REG_ID']);
        }
        $reg_count = count($this->_req_data['_REG_ID']);
        // cycle thru checkboxes
        foreach ($this->_req_data['_REG_ID'] as $REG_ID) {
            /** @var EE_Registration $REG */
            $REG = EEM_Registration::instance()->get_one_by_ID($REG_ID);
            $payments = $REG->registration_payments();
            if (! empty($payments)) {
                $name = $REG->attendee() instanceof EE_Attendee
                    ? $REG->attendee()->full_name()
                    : __('Unknown Attendee', 'event_espresso');
                $overwrite_msgs = true;
                EE_Error::add_error(
                    sprintf(
                        __(
                            'The registration for %s could not be trashed because it has payments attached to the related transaction.  If you wish to trash this registration you must first delete the payments on the related transaction.',
                            'event_espresso'
                        ),
                        $name
                    ),
                    __FILE__, __FUNCTION__, __LINE__
                );
                //can't trash this registration because it has payments.
                continue;
            }
            $updated = $trash ? $REG->delete() : $REG->restore();
            if ($updated) {
                $success++;
            }
        }
        $this->_redirect_after_action(
            $success === $reg_count, // were ALL registrations affected?
            $success > 1 ? __('Registrations', 'event_espresso') : __('Registration', 'event_espresso'),
            $trash ? __('moved to the trash', 'event_espresso') : __('restored', 'event_espresso'),
            array('action' => 'default'),
            $overwrite_msgs
        );
    }


    /**
     * This is used to permanently delete registrations.  Note, this will handle not only deleting permanently the
     * registration but also.
     * 1. Removing relations to EE_Attendee
     * 2. Deleting permanently the related transaction, but ONLY if all related registrations to the transaction are
     * ALSO trashed.
     * 3. Deleting permanently any related Line items but only if the above conditions are met.
     * 4. Removing relationships between all tickets and the related registrations
     * 5. Deleting permanently any related Answers (and the answers for other related registrations that were deleted.)
     * 6. Deleting permanently any related Checkins.
     *
     * @return void
     */
    protected function _delete_registrations()
    {
        $REG_MDL = EEM_Registration::instance();
        $success = 1;
        //Checkboxes
        if ( ! empty($this->_req_data['_REG_ID']) && is_array($this->_req_data['_REG_ID'])) {
            // if array has more than one element than success message should be plural
            $success = count($this->_req_data['_REG_ID']) > 1 ? 2 : 1;
            // cycle thru checkboxes
            while (list($ind, $REG_ID) = each($this->_req_data['_REG_ID'])) {
                $REG = $REG_MDL->get_one_by_ID($REG_ID);
                if ( ! $REG instanceof EE_Registration) {
                    continue;
                }
                $deleted = $this->_delete_registration($REG);
                if ( ! $deleted) {
                    $success = 0;
                }
            }
        } else {
            // grab single id and delete
            $REG_ID  = $this->_req_data['_REG_ID'];
            $REG     = $REG_MDL->get_one_by_ID($REG_ID);
            $deleted = $this->_delete_registration($REG);
            if ( ! $deleted) {
                $success = 0;
            }
        }
        $what        = $success > 1 ? __('Registrations', 'event_espresso') : __('Registration', 'event_espresso');
        $action_desc = __('permanently deleted.', 'event_espresso');
        $this->_redirect_after_action($success, $what, $action_desc, array('action' => 'default'), true);
    }


    /**
     * handles the permanent deletion of a registration.  See comments with _delete_registrations() for details on what
     * models get affected.
     *
     * @param  EE_Registration $REG registration to be deleted permenantly
     * @return boolean              true = successful deletion, false = fail.
     */
    protected function _delete_registration(EE_Registration $REG)
    {
        //first we start with the transaction... ultimately, we WILL not delete permanently if there are any related registrations on the transaction that are NOT trashed.
        $TXN         = $REG->get_first_related('Transaction');
        $REGS        = $TXN->get_many_related('Registration');
        $all_trashed = true;
        foreach ($REGS as $registration) {
            if ( ! $registration->get('REG_deleted')) {
                $all_trashed = false;
            }
        }
        if ( ! $all_trashed) {
            EE_Error::add_error(__('Unable to permanently delete this registration. Before this registration can be permanently deleted, all registrations made in the same transaction must be trashed as well.  These registrations will be permanently deleted in the same action.',
                'event_espresso'), __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        //k made it here so that means we can delete all the related transactions and their answers (but let's do them separately from THIS one).
        foreach ($REGS as $registration) {
            //delete related answers
            $registration->delete_related_permanently('Answer');
            //remove relationship to EE_Attendee (but we ALWAYS leave the contact record intact)
            $attendee = $registration->get_first_related('Attendee');
            if ($attendee instanceof EE_Attendee) {
                $registration->_remove_relation_to($attendee, 'Attendee');
            }
            //now remove relationships to tickets on this registration.
            $registration->_remove_relations('Ticket');
            //now delete permanently the checkins related to this registration.
            $registration->delete_related_permanently('Checkin');
            if ($registration->ID() === $REG->ID()) {
                continue;
            } //we don't want to delete permanently the existing registration just yet.
            //remove relation to transaction for these registrations if NOT the existing registrations
            $registration->_remove_relations('Transaction');
            //delete permanently any related messages.
            $registration->delete_related_permanently('Message');
            //now delete this registration permanently
            $registration->delete_permanently();
        }
        //now all related registrations on the transaction are handled.  So let's just handle this registration itself (the transaction and line items should be all that's left).
        //delete the line items related to the transaction for this registration.
        $TXN->delete_related_permanently('Line_Item');
        //we need to remove all the relationships on the transaction
        $TXN->delete_related_permanently('Payment');
        $TXN->delete_related_permanently('Extra_Meta');
        $TXN->delete_related_permanently('Message');
        //now we can delete this REG permanently (and the transaction of course)
        $REG->delete_related_permanently('Transaction');
        return $REG->delete_permanently();
    }


    /**
     *    generates HTML for the Register New Attendee Admin page
     *
     * @access private
     * @throws \EE_Error
     * @return void
     */
    public function new_registration()
    {
        if ( ! $this->_set_reg_event()) {
            throw new EE_Error(__('Unable to continue with registering because there is no Event ID in the request',
                'event_espresso'));
        }
        EE_Registry::instance()->REQ->set_espresso_page(true);
        // gotta start with a clean slate if we're not coming here via ajax
        if ( ! defined('DOING_AJAX')
             && ( ! isset($this->_req_data['processing_registration']) || isset($this->_req_data['step_error']))
        ) {
            EE_Registry::instance()->SSN->clear_session(__CLASS__, __FUNCTION__);
        }
        $this->_template_args['event_name'] = '';
        // event name
        if ($this->_reg_event) {
            $this->_template_args['event_name'] = $this->_reg_event->name();
            $edit_event_url                     = self::add_query_args_and_nonce(array(
                'action' => 'edit',
                'post'   => $this->_reg_event->ID(),
            ), EVENTS_ADMIN_URL);
            $edit_event_lnk                     = '<a href="'
                                                  . $edit_event_url
                                                  . '" title="'
                                                  . esc_attr__('Edit ', 'event_espresso')
                                                  . $this->_reg_event->name()
                                                  . '">'
                                                  . __('Edit Event', 'event_espresso')
                                                  . '</a>';
            $this->_template_args['event_name'] .= ' <span class="admin-page-header-edit-lnk not-bold">'
                                                   . $edit_event_lnk
                                                   . '</span>';
        }
        $this->_template_args['step_content'] = $this->_get_registration_step_content();
        if (defined('DOING_AJAX')) {
            $this->_return_json();
        }
        // grab header
        $template_path                              = REG_TEMPLATE_PATH . 'reg_admin_register_new_attendee.template.php';
        $this->_template_args['admin_page_content'] = EEH_Template::display_template($template_path,
            $this->_template_args, true);
        //$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
        // the details template wrapper
        $this->display_admin_page_with_sidebar();
    }


    /**
     * This returns the content for a registration step
     *
     * @access protected
     * @return string html
     */
    protected function _get_registration_step_content()
    {
        if (isset($_COOKIE['ee_registration_added']) && $_COOKIE['ee_registration_added']) {
            $warning_msg = sprintf(__('%2$sWARNING!!!%3$s%1$sPlease do not use the back button to return to this page for the purpose of adding another registration.%1$sThis can result in lost and/or corrupted data.%1$sIf you wish to add another registration, then please click the%1$s%7$s"Add Another New Registration to Event"%8$s button%1$son the Transaction details page, after you are redirected.%1$s%1$s%4$s redirecting in %5$s seconds %6$s',
                'event_espresso'), '<br />', '<h3 class="important-notice">', '</h3>', '<div class="float-right">',
                '<span id="redirect_timer" class="important-notice">30</span>', '</div>', '<b>', '</b>');
            return '
	<div id="ee-add-reg-back-button-dv"><p>' . $warning_msg . '</p></div>
	<script >
		// WHOAH !!! it appears that someone is using the back button from the Transaction admin page
		// after just adding a new registration... we gotta try to put a stop to that !!!
		var timer = 30;
		setInterval( function () {
			jQuery("#redirect_timer").html( parseInt( timer ) );
	        if ( --timer < 0 ) {
	            window.history.forward()
	        }
	    }, 800 );
	</script >';
        }
        $template_args = array(
            'title'                    => '',
            'content'                  => '',
            'step_button_text'         => '',
            'show_notification_toggle' => false,
        );
        //to indicate we're processing a new registration
        $hidden_fields = array(
            'processing_registration' => array(
                'type'  => 'hidden',
                'value' => 0,
            ),
            'event_id'                => array(
                'type'  => 'hidden',
                'value' => $this->_reg_event->ID(),
            ),
        );
        //if the cart is empty then we know we're at step one so we'll display ticket selector
        $cart = EE_Registry::instance()->SSN->cart();
        $step = ! $cart instanceof EE_Cart ? 'ticket' : 'questions';
        switch ($step) {
            case 'ticket' :
                $hidden_fields['processing_registration']['value'] = 1;
                $template_args['title']                            = __('Step One: Select the Ticket for this registration',
                    'event_espresso');
                $template_args['content']                          = EED_Ticket_Selector::instance()->display_ticket_selector($this->_reg_event);
                $template_args['step_button_text']                 = __('Add Tickets and Continue to Registrant Details',
                    'event_espresso');
                $template_args['show_notification_toggle']         = false;
                break;
            case 'questions' :
                $hidden_fields['processing_registration']['value'] = 2;
                $template_args['title']                            = __('Step Two: Add Registrant Details for this Registration',
                    'event_espresso');
                //in theory we should be able to run EED_SPCO at this point because the cart should have been setup properly by the first process_reg_step run.
                $template_args['content']                  = EED_Single_Page_Checkout::registration_checkout_for_admin();
                $template_args['step_button_text']         = __('Save Registration and Continue to Details',
                    'event_espresso');
                $template_args['show_notification_toggle'] = true;
                break;
        }
        $this->_set_add_edit_form_tags('process_reg_step',
            $hidden_fields); //we come back to the process_registration_step route.
        return EEH_Template::display_template(REG_TEMPLATE_PATH
                                              . 'reg_admin_register_new_attendee_step_content.template.php',
            $template_args, true);
    }


    /**
     *        set_reg_event
     *
     * @access private
     * @return boolean
     */
    private function _set_reg_event()
    {
        if (is_object($this->_reg_event)) {
            return true;
        }
        $EVT_ID = ( ! empty($this->_req_data['event_id'])) ? absint($this->_req_data['event_id']) : false;
        if ( ! $EVT_ID) {
            return false;
        }
        $this->_reg_event = EEM_Event::instance()->get_one_by_ID($EVT_ID);
        return true;
    }


    /**
     * process_reg_step
     *
     * @access        public
     * @return        string
     * @throws \RuntimeException
     * @throws \EE_Error
     */
    public function process_reg_step()
    {
        EE_System::do_not_cache();
        $this->_set_reg_event();
        EE_Registry::instance()->REQ->set_espresso_page(true);
        EE_Registry::instance()->REQ->set('uts', time());
        //what step are we on?
        $cart = EE_Registry::instance()->SSN->cart();
        $step = ! $cart instanceof EE_Cart ? 'ticket' : 'questions';
        //if doing ajax then we need to verify the nonce
        if (defined('DOING_AJAX')) {
            $nonce = isset($this->_req_data[$this->_req_nonce])
                ? sanitize_text_field($this->_req_data[$this->_req_nonce]) : '';
            $this->_verify_nonce($nonce, $this->_req_nonce);
        }
        switch ($step) {
            case 'ticket' :
                //process ticket selection
                $success = EED_Ticket_Selector::instance()->process_ticket_selections();
                if ($success) {
                    EE_Error::add_success(esc_html__('Tickets Selected. Now complete the registration.',
                        'event_espresso'));
                } else {
                    $query_args['step_error'] = $this->_req_data['step_error'] = true;
                }
                if (defined('DOING_AJAX')) {
                    $this->new_registration(); //display next step
                } else {
                    $query_args = array(
                        'action'                  => 'new_registration',
                        'processing_registration' => 1,
                        'event_id'                => $this->_reg_event->ID(),
                        'uts'                     => time(),
                    );
                    $this->_redirect_after_action(false, '', '', $query_args, true);
                }
                break;
            case 'questions' :
                if ( ! isset($this->_req_data['txn_reg_status_change'], $this->_req_data['txn_reg_status_change']['send_notifications'])) {
                    add_filter('FHEE__EED_Messages___maybe_registration__deliver_notifications', '__return_false', 15);
                }
                //process registration
                $transaction = EED_Single_Page_Checkout::instance()->process_registration_from_admin();
                if ($cart instanceof EE_Cart) {
                    $grand_total = $cart->get_cart_grand_total();
                    if ($grand_total instanceof EE_Line_Item) {
                        $grand_total->save_this_and_descendants_to_txn();
                    }
                }
                if ( ! $transaction instanceof EE_Transaction) {
                    $query_args = array(
                        'action'                  => 'new_registration',
                        'processing_registration' => 2,
                        'event_id'                => $this->_reg_event->ID(),
                        'uts'                     => time(),
                    );
                    if (defined('DOING_AJAX')) {
                        //display registration form again because there are errors (maybe validation?)
                        $this->new_registration();
                        return;
                    } else {
                        $this->_redirect_after_action(false, '', '', $query_args, true);
                        return;
                    }
                }
                // maybe update status, and make sure to save transaction if not done already
                if ( ! $transaction->update_status_based_on_total_paid()) {
                    $transaction->save();
                }
                EE_Registry::instance()->SSN->clear_session(__CLASS__, __FUNCTION__);
                $this->_req_data = array();
                $query_args      = array(
                    'action'        => 'redirect_to_txn',
                    'TXN_ID'        => $transaction->ID(),
                    'EVT_ID'        => $this->_reg_event->ID(),
                    'event_name'    => urlencode($this->_reg_event->name()),
                    'redirect_from' => 'new_registration',
                );
                $this->_redirect_after_action(false, '', '', $query_args, true);
                break;
        }
        //what are you looking here for?  Should be nothing to do at this point.
    }


    /**
     * redirect_to_txn
     *
     * @access public
     * @return void
     */
    public function redirect_to_txn()
    {
        EE_System::do_not_cache();
        EE_Registry::instance()->SSN->clear_session(__CLASS__, __FUNCTION__);
        $query_args = array(
            'action' => 'view_transaction',
            'TXN_ID' => isset($this->_req_data['TXN_ID']) ? absint($this->_req_data['TXN_ID']) : 0,
            'page'   => 'espresso_transactions',
        );
        if (isset($this->_req_data['EVT_ID'], $this->_req_data['redirect_from'])) {
            $query_args['EVT_ID']        = $this->_req_data['EVT_ID'];
            $query_args['event_name']    = urlencode($this->_req_data['event_name']);
            $query_args['redirect_from'] = $this->_req_data['redirect_from'];
        }
        EE_Error::add_success(__('Registration Created.  Please review the transaction and add any payments as necessary',
            'event_espresso'));
        $this->_redirect_after_action(false, '', '', $query_args, true);
    }


    /**
     *        generates HTML for the Attendee Contact List
     *
     * @access protected
     * @return void
     */
    protected function _attendee_contact_list_table()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $this->_search_btn_label = __('Contacts', 'event_espresso');
        $this->display_admin_list_table_page_with_no_sidebar();
    }


    /**
     *        get_attendees
     *
     * @param bool $count whether to return count or data.
     * @access public
     * @return array
     */
    public function get_attendees($per_page, $count = false, $trash = false)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        require_once(REG_ADMIN . 'EE_Attendee_Contact_List_Table.class.php');
        $ATT_MDL                    = EEM_Attendee::instance();
        $this->_req_data['orderby'] = ! empty($this->_req_data['orderby']) ? $this->_req_data['orderby'] : '';
        switch ($this->_req_data['orderby']) {
            case 'ATT_ID':
                $orderby = 'ATT_ID';
                break;
            case 'ATT_fname':
                $orderby = 'ATT_fname';
                break;
            case 'ATT_email':
                $orderby = 'ATT_email';
                break;
            case 'ATT_city':
                $orderby = 'ATT_city';
                break;
            case 'STA_ID':
                $orderby = 'STA_ID';
                break;
            case 'CNT_ID':
                $orderby = 'CNT_ID';
                break;
            default:
                $orderby = 'ATT_lname';
        }
        $sort         = (isset($this->_req_data['order']) && ! empty($this->_req_data['order'])) ? $this->_req_data['order']
            : 'ASC';
        $current_page = isset($this->_req_data['paged']) && ! empty($this->_req_data['paged'])
            ? $this->_req_data['paged'] : 1;
        $per_page     = isset($per_page) && ! empty($per_page) ? $per_page : 10;
        $per_page     = isset($this->_req_data['perpage']) && ! empty($this->_req_data['perpage'])
            ? $this->_req_data['perpage'] : $per_page;
        $_where       = array();
        if ( ! empty($this->_req_data['s'])) {
            $sstr         = '%' . $this->_req_data['s'] . '%';
            $_where['OR'] = array(
                'Registration.Event.EVT_name'       => array('LIKE', $sstr),
                'Registration.Event.EVT_desc'       => array('LIKE', $sstr),
                'Registration.Event.EVT_short_desc' => array('LIKE', $sstr),
                'ATT_fname'                         => array('LIKE', $sstr),
                'ATT_lname'                         => array('LIKE', $sstr),
                'ATT_short_bio'                     => array('LIKE', $sstr),
                'ATT_email'                         => array('LIKE', $sstr),
                'ATT_address'                       => array('LIKE', $sstr),
                'ATT_address2'                      => array('LIKE', $sstr),
                'ATT_city'                          => array('LIKE', $sstr),
                'Country.CNT_name'                  => array('LIKE', $sstr),
                'State.STA_name'                    => array('LIKE', $sstr),
                'ATT_phone'                         => array('LIKE', $sstr),
                'Registration.REG_final_price'      => array('LIKE', $sstr),
                'Registration.REG_code'             => array('LIKE', $sstr),
                'Registration.REG_count'            => array('LIKE', $sstr),
                'Registration.REG_group_size'       => array('LIKE', $sstr),
            );
        }
        $offset = ($current_page - 1) * $per_page;
        $limit  = $count ? null : array($offset, $per_page);
        if ($trash) {
            $_where['status'] = array('!=', 'publish');
            $all_attendees    = $count
                ? $ATT_MDL->count(array(
                    $_where,
                    'order_by' => array($orderby => $sort),
                    'limit'    => $limit,
                ), 'ATT_ID', true)
                : $ATT_MDL->get_all(array(
                    $_where,
                    'order_by' => array($orderby => $sort),
                    'limit'    => $limit,
                ));
        } else {
            $_where['status'] = array('IN', array('publish'));
            $all_attendees    = $count
                ? $ATT_MDL->count(array(
                    $_where,
                    'order_by' => array($orderby => $sort),
                    'limit'    => $limit,
                ), 'ATT_ID', true)
                : $ATT_MDL->get_all(array(
                    $_where,
                    'order_by' => array($orderby => $sort),
                    'limit'    => $limit,
                ));
        }
        return $all_attendees;
    }


    /**
     * This is just taking care of resending the registration confirmation
     *
     * @access protected
     * @return void
     */
    protected function _resend_registration()
    {
        $this->_process_resend_registration();
        $query_args = isset($this->_req_data['redirect_to'])
            ? array('action' => $this->_req_data['redirect_to'], '_REG_ID' => $this->_req_data['_REG_ID'])
            : array(
                'action' => 'default',
            );
        $this->_redirect_after_action(false, '', '', $query_args, true);
    }

    /**
     * Creates a registration report, but accepts the name of a method to use for preparing the query parameters
     * to use when selecting registrations
     * @param string $method_name_for_getting_query_params the name of the method (on this class) to use for preparing
     *                                                     the query parameters from the request
     * @return void ends the request with a redirect or download
     */
    public function _registrations_report_base( $method_name_for_getting_query_params )
    {
        if ( ! defined('EE_USE_OLD_CSV_REPORT_CLASS')) {
            wp_redirect(EE_Admin_Page::add_query_args_and_nonce(array(
                'page'        => 'espresso_batch',
                'batch'       => 'file',
                'EVT_ID'      => isset($this->_req_data['EVT_ID']) ? $this->_req_data['EVT_ID'] : null,
                'filters'     => urlencode(
                    serialize(
                        call_user_func(
                            array( $this, $method_name_for_getting_query_params ),
                            EEH_Array::is_set(
                                $this->_req_data,
                                'filters',
                                array()
                            )
                        )
                    )
                ),
                'use_filters' => EEH_Array::is_set($this->_req_data, 'use_filters', false),
                'job_handler' => urlencode('EventEspressoBatchRequest\JobHandlers\RegistrationsReport'),
                'return_url'  => urlencode($this->_req_data['return_url']),
            )));
        } else {
            $new_request_args = array(
                'export' => 'report',
                'action' => 'registrations_report_for_event',
                'EVT_ID' => isset($this->_req_data['EVT_ID']) ? $this->_req_data['EVT_ID'] : null,
            );
            $this->_req_data = array_merge($this->_req_data, $new_request_args);
            if (is_readable(EE_CLASSES . 'EE_Export.class.php')) {
                require_once(EE_CLASSES . 'EE_Export.class.php');
                $EE_Export = EE_Export::instance($this->_req_data);
                $EE_Export->export();
            }
        }
    }



    /**
     * Creates a registration report using only query parameters in the request
     * @return void
     */
    public function _registrations_report()
    {
        $this->_registrations_report_base( '_get_registration_query_parameters' );
    }


    public function _contact_list_export()
    {
        if (is_readable(EE_CLASSES . 'EE_Export.class.php')) {
            require_once(EE_CLASSES . 'EE_Export.class.php');
            $EE_Export = EE_Export::instance($this->_req_data);
            $EE_Export->export_attendees();
        }
    }


    public function _contact_list_report()
    {
        if ( ! defined('EE_USE_OLD_CSV_REPORT_CLASS')) {
            wp_redirect(EE_Admin_Page::add_query_args_and_nonce(array(
                'page'        => 'espresso_batch',
                'batch'       => 'file',
                'job_handler' => urlencode('EventEspressoBatchRequest\JobHandlers\AttendeesReport'),
                'return_url'  => urlencode($this->_req_data['return_url']),
            )));
        } else {
            if (is_readable(EE_CLASSES . 'EE_Export.class.php')) {
                require_once(EE_CLASSES . 'EE_Export.class.php');
                $EE_Export = EE_Export::instance($this->_req_data);
                $EE_Export->report_attendees();
            }
        }
    }





    /***************************************        ATTENDEE DETAILS        ***************************************/
    /**
     * This duplicates the attendee object for the given incoming registration id and attendee_id.
     *
     * @return void
     */
    protected function _duplicate_attendee()
    {
        $action = ! empty($this->_req_data['return']) ? $this->_req_data['return'] : 'default';
        //verify we have necessary info
        if (empty($this->_req_data['_REG_ID'])) {
            EE_Error::add_error(__('Unable to create the contact for the registration because the required parameters are not present (_REG_ID )',
                'event_espresso'), __FILE__, __LINE__, __FUNCTION__);
            $query_args = array('action' => $action);
            $this->_redirect_after_action('', '', '', $query_args, true);
        }
        //okay necessary deets present... let's dupe the incoming attendee and attach to incoming registration.
        $registration = EEM_Registration::instance()->get_one_by_ID($this->_req_data['_REG_ID']);
        $attendee     = $registration->attendee();
        //remove relation of existing attendee on registration
        $registration->_remove_relation_to($attendee, 'Attendee');
        //new attendee
        $new_attendee = clone $attendee;
        $new_attendee->set('ATT_ID', 0);
        $new_attendee->save();
        //add new attendee to reg
        $registration->_add_relation_to($new_attendee, 'Attendee');
        EE_Error::add_success(__('New Contact record created.  Now make any edits you wish to make for this contact.',
            'event_espresso'));
        //redirect to edit page for attendee
        $query_args = array('post' => $new_attendee->ID(), 'action' => 'edit_attendee');
        $this->_redirect_after_action('', '', '', $query_args, true);
    }


    //related to cpt routes
    protected function _insert_update_cpt_item($post_id, $post)
    {
        $success  = true;
        $attendee = EEM_Attendee::instance()->get_one_by_ID($post_id);
        //for attendee updates
        if ($post->post_type = 'espresso_attendees' && ! empty($attendee)) {
            //note we should only be UPDATING attendees at this point.
            $updated_fields = array(
                'ATT_fname'     => $this->_req_data['ATT_fname'],
                'ATT_lname'     => $this->_req_data['ATT_lname'],
                'ATT_full_name' => $this->_req_data['ATT_fname'] . ' ' . $this->_req_data['ATT_lname'],
                'ATT_address'   => isset($this->_req_data['ATT_address']) ? $this->_req_data['ATT_address'] : '',
                'ATT_address2'  => isset($this->_req_data['ATT_address2']) ? $this->_req_data['ATT_address2'] : '',
                'ATT_city'      => isset($this->_req_data['ATT_city']) ? $this->_req_data['ATT_city'] : '',
                'STA_ID'        => isset($this->_req_data['STA_ID']) ? $this->_req_data['STA_ID'] : '',
                'CNT_ISO'       => isset($this->_req_data['CNT_ISO']) ? $this->_req_data['CNT_ISO'] : '',
                'ATT_zip'       => isset($this->_req_data['ATT_zip']) ? $this->_req_data['ATT_zip'] : '',
                'ATT_email'     => isset($this->_req_data['ATT_email']) ? $this->_req_data['ATT_email'] : '',
                'ATT_phone'     => isset($this->_req_data['ATT_phone']) ? $this->_req_data['ATT_phone'] : '',
            );
            foreach ($updated_fields as $field => $value) {
                $attendee->set($field, $value);
            }
            $success                   = $attendee->save();
            $attendee_update_callbacks = apply_filters('FHEE__Registrations_Admin_Page__insert_update_cpt_item__attendee_update',
                array());
            foreach ($attendee_update_callbacks as $a_callback) {
                if (false === call_user_func_array($a_callback, array($attendee, $this->_req_data))) {
                    throw new EE_Error(sprintf(__('The %s callback given for the "FHEE__Registrations_Admin_Page__insert_update_cpt_item__attendee_update" filter is not a valid callback.  Please check the spelling.',
                        'event_espresso'), $a_callback));
                }
            }
        }
        if ($success === false) {
            EE_Error::add_error(__('Something went wrong with updating the meta table data for the registration.',
                'event_espresso'), __FILE__, __FUNCTION__, __LINE__);
        }
    }


    public function trash_cpt_item($post_id)
    {
    }


    public function delete_cpt_item($post_id)
    {
    }


    public function restore_cpt_item($post_id)
    {
    }


    protected function _restore_cpt_item($post_id, $revision_id)
    {
    }


    public function attendee_editor_metaboxes()
    {
        $this->verify_cpt_object();
        remove_meta_box('postexcerpt', __('Excerpt'), 'post_excerpt_meta_box', $this->_cpt_routes[$this->_req_action],
            'normal', 'core');
        remove_meta_box('commentstatusdiv', $this->_cpt_routes[$this->_req_action], 'normal', 'core');
        if (post_type_supports('espresso_attendees', 'excerpt')) {
            add_meta_box('postexcerpt', __('Short Biography', 'event_espresso'), 'post_excerpt_meta_box',
                $this->_cpt_routes[$this->_req_action], 'normal');
        }
        if (post_type_supports('espresso_attendees', 'comments')) {
            add_meta_box('commentsdiv', __('Notes on the Contact', 'event_espresso'), 'post_comment_meta_box',
                $this->_cpt_routes[$this->_req_action], 'normal', 'core');
        }
        add_meta_box('attendee_contact_info', __('Contact Info', 'event_espresso'),
            array($this, 'attendee_contact_info'), $this->_cpt_routes[$this->_req_action], 'side', 'core');
        add_meta_box('attendee_details_address', __('Address Details', 'event_espresso'),
            array($this, 'attendee_address_details'), $this->_cpt_routes[$this->_req_action], 'normal', 'core');
        add_meta_box('attendee_registrations', __('Registrations for this Contact', 'event_espresso'),
            array($this, 'attendee_registrations_meta_box'), $this->_cpt_routes[$this->_req_action], 'normal', 'high');
    }


    /**
     * Metabox for attendee contact info
     *
     * @param  WP_Post $post wp post object
     * @return string        attendee contact info ( and form )
     */
    public function attendee_contact_info($post)
    {
        //get attendee object ( should already have it )
        $this->_template_args['attendee'] = $this->_cpt_model_obj;
        $template                         = REG_TEMPLATE_PATH . 'attendee_contact_info_metabox_content.template.php';
        EEH_Template::display_template($template, $this->_template_args);
    }


    /**
     * Metabox for attendee details
     *
     * @param  WP_Post $post wp post object
     * @return string        attendee address details (and form)
     */
    public function attendee_address_details($post)
    {
        //get attendee object (should already have it)
        $this->_template_args['attendee']     = $this->_cpt_model_obj;
        $this->_template_args['state_html']   = EEH_Form_Fields::generate_form_input(new EE_Question_Form_Input(EE_Question::new_instance(array(
            'QST_ID'           => 0,
            'QST_display_text' => __('State/Province', 'event_espresso'),
            'QST_system'       => 'admin-state',
        )), EE_Answer::new_instance(array(
            'ANS_ID'    => 0,
            'ANS_value' => $this->_cpt_model_obj->state_ID(),
        )), array(
            'input_id'       => 'STA_ID',
            'input_name'     => 'STA_ID',
            'input_prefix'   => '',
            'append_qstn_id' => false,
        )));
        $this->_template_args['country_html'] = EEH_Form_Fields::generate_form_input(new EE_Question_Form_Input(EE_Question::new_instance(array(
            'QST_ID'           => 0,
            'QST_display_text' => __('Country', 'event_espresso'),
            'QST_system'       => 'admin-country',
        )), EE_Answer::new_instance(array(
            'ANS_ID'    => 0,
            'ANS_value' => $this->_cpt_model_obj->country_ID(),
        )), array(
            'input_id'       => 'CNT_ISO',
            'input_name'     => 'CNT_ISO',
            'input_prefix'   => '',
            'append_qstn_id' => false,
        )));
        $template                             = REG_TEMPLATE_PATH . 'attendee_address_details_metabox_content.template.php';
        EEH_Template::display_template($template, $this->_template_args);
    }


    /**
     *        _attendee_details
     *
     * @access protected
     * @return void
     */
    public function attendee_registrations_meta_box($post)
    {
        $this->_template_args['attendee']      = $this->_cpt_model_obj;
        $this->_template_args['registrations'] = $this->_cpt_model_obj->get_many_related('Registration');
        $template                              = REG_TEMPLATE_PATH . 'attendee_registrations_main_meta_box.template.php';
        EEH_Template::display_template($template, $this->_template_args);
    }


    /**
     * add in the form fields for the attendee edit
     *
     * @param  WP_Post $post wp post object
     * @return string        html for new form.
     */
    public function after_title_form_fields($post)
    {
        if ($post->post_type == 'espresso_attendees') {
            $template                  = REG_TEMPLATE_PATH . 'attendee_details_after_title_form_fields.template.php';
            $template_args['attendee'] = $this->_cpt_model_obj;
            EEH_Template::display_template($template, $template_args);
        }
    }


    /**
     *        _trash_or_restore_attendee
     *
     * @param boolean $trash - whether to move item to trash (TRUE) or restore it (FALSE)
     * @access protected
     * @return void
     */
    protected function _trash_or_restore_attendees($trash = true)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $ATT_MDL = EEM_Attendee::instance();
        $success = 1;
        //Checkboxes
        if ( ! empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {
            // if array has more than one element than success message should be plural
            $success = count($this->_req_data['checkbox']) > 1 ? 2 : 1;
            // cycle thru checkboxes
            while (list($ATT_ID, $value) = each($this->_req_data['checkbox'])) {
                $updated = $trash ? $ATT_MDL->update_by_ID(array('status' => 'trash'), $ATT_ID)
                    : $ATT_MDL->update_by_ID(array('status' => 'publish'), $ATT_ID);
                if ( ! $updated) {
                    $success = 0;
                }
            }
        } else {
            // grab single id and delete
            $ATT_ID = absint($this->_req_data['ATT_ID']);
            //get attendee
            $att     = $ATT_MDL->get_one_by_ID($ATT_ID);
            $updated = $trash ? $att->set_status('trash') : $att->set_status('publish');
            $updated = $att->save();
            if ( ! $updated) {
                $success = 0;
            }
        }
        $what        = $success > 1 ? __('Contacts', 'event_espresso') : __('Contact', 'event_espresso');
        $action_desc = $trash ? __('moved to the trash', 'event_espresso') : __('restored', 'event_espresso');
        $this->_redirect_after_action($success, $what, $action_desc, array('action' => 'contact_list'));
    }

}



// end of file:  includes/core/admin/transactions/Registrations_Admin_Page.core.php

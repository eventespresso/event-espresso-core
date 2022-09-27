<?php

use EventEspresso\core\domain\Domain;
use EventEspresso\core\domain\entities\contexts\Context;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFormSubmissionException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\domain\services\attendee\forms\AttendeeContactDetailsMetaboxFormHandler;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\request\CurrentPage;
use EventEspresso\core\services\request\DataType;
use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * Registrations_Admin_Page class
 *
 * @package     Event Espresso
 * @subpackage  includes/core/admin/transactions/Registrations_Admin_Page.core.php
 * @author      Brent Christensen
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

    /**
     * @var array
     */
    private static $_reg_status;

    /**
     * Form for displaying the custom questions for this registration.
     * This gets used a few times throughout the request so its best to cache it
     *
     * @var EE_Registration_Custom_Questions_Form
     */
    protected $_reg_custom_questions_form = null;

    /**
     * @var EEM_Registration $registration_model
     */
    private $registration_model;

    /**
     * @var EEM_Attendee $attendee_model
     */
    private $attendee_model;

    /**
     * @var EEM_Event $event_model
     */
    private $event_model;

    /**
     * @var EEM_Status $status_model
     */
    private $status_model;


    /**
     * @param bool $routing
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function __construct($routing = true)
    {
        parent::__construct($routing);
        add_action('wp_loaded', [$this, 'wp_loaded']);
    }


    /**
     * @return EEM_Registration
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.10.2.p
     */
    protected function getRegistrationModel()
    {
        if (! $this->registration_model instanceof EEM_Registration) {
            $this->registration_model = $this->getLoader()->getShared('EEM_Registration');
        }
        return $this->registration_model;
    }


    /**
     * @return EEM_Attendee
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.10.2.p
     */
    protected function getAttendeeModel()
    {
        if (! $this->attendee_model instanceof EEM_Attendee) {
            $this->attendee_model = $this->getLoader()->getShared('EEM_Attendee');
        }
        return $this->attendee_model;
    }


    /**
     * @return EEM_Event
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.10.2.p
     */
    protected function getEventModel()
    {
        if (! $this->event_model instanceof EEM_Event) {
            $this->event_model = $this->getLoader()->getShared('EEM_Event');
        }
        return $this->event_model;
    }


    /**
     * @return EEM_Status
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.10.2.p
     */
    protected function getStatusModel()
    {
        if (! $this->status_model instanceof EEM_Status) {
            $this->status_model = $this->getLoader()->getShared('EEM_Status');
        }
        return $this->status_model;
    }


    public function wp_loaded()
    {
        // when adding a new registration...
        $action = $this->request->getRequestParam('action');
        if ($action === 'new_registration') {
            EE_System::do_not_cache();
            if ($this->request->getRequestParam('processing_registration', 0, 'int') !== 1) {
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
        $this->page_label       = esc_html__('Registrations', 'event_espresso');
        $this->_cpt_routes      = [
            'add_new_attendee' => 'espresso_attendees',
            'edit_attendee'    => 'espresso_attendees',
            'insert_attendee'  => 'espresso_attendees',
            'update_attendee'  => 'espresso_attendees',
        ];
        $this->_cpt_model_names = [
            'add_new_attendee' => 'EEM_Attendee',
            'edit_attendee'    => 'EEM_Attendee',
        ];
        $this->_cpt_edit_routes = [
            'espresso_attendees' => 'edit_attendee',
        ];
        $this->_pagenow_map     = [
            'add_new_attendee' => 'post-new.php',
            'edit_attendee'    => 'post.php',
            'trash'            => 'post.php',
        ];
        add_action('edit_form_after_title', [$this, 'after_title_form_fields'], 10);
        // add filters so that the comment urls don't take users to a confusing 404 page
        add_filter('get_comment_link', [$this, 'clear_comment_link'], 10, 2);
    }


    /**
     * @param string     $link    The comment permalink with '#comment-$id' appended.
     * @param WP_Comment $comment The current comment object.
     * @return string
     */
    public function clear_comment_link($link, WP_Comment $comment)
    {
        // gotta make sure this only happens on this route
        $post_type = get_post_type($comment->comment_post_ID);
        if ($post_type === 'espresso_attendees') {
            return '#commentsdiv';
        }
        return $link;
    }


    protected function _ajax_hooks()
    {
        // todo: all hooks for registrations ajax goes in here
        add_action('wp_ajax_toggle_checkin_status', [$this, 'toggle_checkin_status']);
    }


    protected function _define_page_props()
    {
        $this->_admin_page_title = $this->page_label;
        $this->_labels           = [
            'buttons'                      => [
                'add-registrant'      => esc_html__('Add New Registration', 'event_espresso'),
                'add-attendee'        => esc_html__('Add Contact', 'event_espresso'),
                'edit'                => esc_html__('Edit Contact', 'event_espresso'),
                'csv_reg_report'      => esc_html__('Registrations CSV Report', 'event_espresso'),
                'contact_list_report' => esc_html__('Contact List Report', 'event_espresso'),
                'contact_list_export' => esc_html__('Export Data', 'event_espresso'),
            ],
            'publishbox'                   => [
                'add_new_attendee' => esc_html__('Add Contact Record', 'event_espresso'),
                'edit_attendee'    => esc_html__('Update Contact Record', 'event_espresso'),
            ],
            'hide_add_button_on_cpt_route' => [
                'edit_attendee' => true,
            ],
        ];
    }


    /**
     * grab url requests and route them
     *
     * @return void
     * @throws EE_Error
     */
    public function _set_page_routes()
    {
        $this->_get_registration_status_array();
        $REG_ID             = $this->request->getRequestParam('_REG_ID', 0, 'int');
        $REG_ID             = $this->request->getRequestParam('reg_status_change_form[REG_ID]', $REG_ID, 'int');
        $ATT_ID             = $this->request->getRequestParam('ATT_ID', 0, 'int');
        $ATT_ID             = $this->request->getRequestParam('post', $ATT_ID, 'int');
        $this->_page_routes = [
            'default'                             => [
                'func'       => [$this, '_registrations_overview_list_table'],
                'capability' => 'ee_read_registrations',
            ],
            'view_registration'                   => [
                'func'       => '_registration_details',
                'capability' => 'ee_read_registration',
                'obj_id'     => $REG_ID,
            ],
            'edit_registration'                   => [
                'func'               => '_update_attendee_registration_form',
                'noheader'           => true,
                'headers_sent_route' => 'view_registration',
                'capability'         => 'ee_edit_registration',
                'obj_id'             => $REG_ID,
                '_REG_ID'            => $REG_ID,
            ],
            'trash_registrations'                 => [
                'func'       => '_trash_or_restore_registrations',
                'args'       => ['trash' => true],
                'noheader'   => true,
                'capability' => 'ee_delete_registrations',
            ],
            'restore_registrations'               => [
                'func'       => '_trash_or_restore_registrations',
                'args'       => ['trash' => false],
                'noheader'   => true,
                'capability' => 'ee_delete_registrations',
            ],
            'delete_registrations'                => [
                'func'       => '_delete_registrations',
                'noheader'   => true,
                'capability' => 'ee_delete_registrations',
            ],
            'new_registration'                    => [
                'func'       => 'new_registration',
                'capability' => 'ee_edit_registrations',
            ],
            'process_reg_step'                    => [
                'func'       => 'process_reg_step',
                'noheader'   => true,
                'capability' => 'ee_edit_registrations',
            ],
            'redirect_to_txn'                     => [
                'func'       => 'redirect_to_txn',
                'noheader'   => true,
                'capability' => 'ee_edit_registrations',
            ],
            'change_reg_status'                   => [
                'func'       => '_change_reg_status',
                'noheader'   => true,
                'capability' => 'ee_edit_registration',
                'obj_id'     => $REG_ID,
            ],
            'approve_registration'                => [
                'func'       => 'approve_registration',
                'noheader'   => true,
                'capability' => 'ee_edit_registration',
                'obj_id'     => $REG_ID,
            ],
            'approve_and_notify_registration'     => [
                'func'       => 'approve_registration',
                'noheader'   => true,
                'args'       => [true],
                'capability' => 'ee_edit_registration',
                'obj_id'     => $REG_ID,
            ],
            'approve_registrations'               => [
                'func'       => 'bulk_action_on_registrations',
                'noheader'   => true,
                'capability' => 'ee_edit_registrations',
                'args'       => ['approve'],
            ],
            'approve_and_notify_registrations'    => [
                'func'       => 'bulk_action_on_registrations',
                'noheader'   => true,
                'capability' => 'ee_edit_registrations',
                'args'       => ['approve', true],
            ],
            'decline_registration'                => [
                'func'       => 'decline_registration',
                'noheader'   => true,
                'capability' => 'ee_edit_registration',
                'obj_id'     => $REG_ID,
            ],
            'decline_and_notify_registration'     => [
                'func'       => 'decline_registration',
                'noheader'   => true,
                'args'       => [true],
                'capability' => 'ee_edit_registration',
                'obj_id'     => $REG_ID,
            ],
            'decline_registrations'               => [
                'func'       => 'bulk_action_on_registrations',
                'noheader'   => true,
                'capability' => 'ee_edit_registrations',
                'args'       => ['decline'],
            ],
            'decline_and_notify_registrations'    => [
                'func'       => 'bulk_action_on_registrations',
                'noheader'   => true,
                'capability' => 'ee_edit_registrations',
                'args'       => ['decline', true],
            ],
            'pending_registration'                => [
                'func'       => 'pending_registration',
                'noheader'   => true,
                'capability' => 'ee_edit_registration',
                'obj_id'     => $REG_ID,
            ],
            'pending_and_notify_registration'     => [
                'func'       => 'pending_registration',
                'noheader'   => true,
                'args'       => [true],
                'capability' => 'ee_edit_registration',
                'obj_id'     => $REG_ID,
            ],
            'pending_registrations'               => [
                'func'       => 'bulk_action_on_registrations',
                'noheader'   => true,
                'capability' => 'ee_edit_registrations',
                'args'       => ['pending'],
            ],
            'pending_and_notify_registrations'    => [
                'func'       => 'bulk_action_on_registrations',
                'noheader'   => true,
                'capability' => 'ee_edit_registrations',
                'args'       => ['pending', true],
            ],
            'no_approve_registration'             => [
                'func'       => 'not_approve_registration',
                'noheader'   => true,
                'capability' => 'ee_edit_registration',
                'obj_id'     => $REG_ID,
            ],
            'no_approve_and_notify_registration'  => [
                'func'       => 'not_approve_registration',
                'noheader'   => true,
                'args'       => [true],
                'capability' => 'ee_edit_registration',
                'obj_id'     => $REG_ID,
            ],
            'no_approve_registrations'            => [
                'func'       => 'bulk_action_on_registrations',
                'noheader'   => true,
                'capability' => 'ee_edit_registrations',
                'args'       => ['not_approve'],
            ],
            'no_approve_and_notify_registrations' => [
                'func'       => 'bulk_action_on_registrations',
                'noheader'   => true,
                'capability' => 'ee_edit_registrations',
                'args'       => ['not_approve', true],
            ],
            'cancel_registration'                 => [
                'func'       => 'cancel_registration',
                'noheader'   => true,
                'capability' => 'ee_edit_registration',
                'obj_id'     => $REG_ID,
            ],
            'cancel_and_notify_registration'      => [
                'func'       => 'cancel_registration',
                'noheader'   => true,
                'args'       => [true],
                'capability' => 'ee_edit_registration',
                'obj_id'     => $REG_ID,
            ],
            'cancel_registrations'                => [
                'func'       => 'bulk_action_on_registrations',
                'noheader'   => true,
                'capability' => 'ee_edit_registrations',
                'args'       => ['cancel'],
            ],
            'cancel_and_notify_registrations'     => [
                'func'       => 'bulk_action_on_registrations',
                'noheader'   => true,
                'capability' => 'ee_edit_registrations',
                'args'       => ['cancel', true],
            ],
            'wait_list_registration'              => [
                'func'       => 'wait_list_registration',
                'noheader'   => true,
                'capability' => 'ee_edit_registration',
                'obj_id'     => $REG_ID,
            ],
            'wait_list_and_notify_registration'   => [
                'func'       => 'wait_list_registration',
                'noheader'   => true,
                'args'       => [true],
                'capability' => 'ee_edit_registration',
                'obj_id'     => $REG_ID,
            ],
            'contact_list'                        => [
                'func'       => '_attendee_contact_list_table',
                'capability' => 'ee_read_contacts',
            ],
            'add_new_attendee'                    => [
                'func' => '_create_new_cpt_item',
                'args' => [
                    'new_attendee' => true,
                    'capability'   => 'ee_edit_contacts',
                ],
            ],
            'edit_attendee'                       => [
                'func'       => '_edit_cpt_item',
                'capability' => 'ee_edit_contacts',
                'obj_id'     => $ATT_ID,
            ],
            'duplicate_attendee'                  => [
                'func'       => '_duplicate_attendee',
                'noheader'   => true,
                'capability' => 'ee_edit_contacts',
                'obj_id'     => $ATT_ID,
            ],
            'insert_attendee'                     => [
                'func'       => '_insert_or_update_attendee',
                'args'       => [
                    'new_attendee' => true,
                ],
                'noheader'   => true,
                'capability' => 'ee_edit_contacts',
            ],
            'update_attendee'                     => [
                'func'       => '_insert_or_update_attendee',
                'args'       => [
                    'new_attendee' => false,
                ],
                'noheader'   => true,
                'capability' => 'ee_edit_contacts',
                'obj_id'     => $ATT_ID,
            ],
            'trash_attendees'                     => [
                'func'       => '_trash_or_restore_attendees',
                'args'       => [
                    'trash' => 'true',
                ],
                'noheader'   => true,
                'capability' => 'ee_delete_contacts',
            ],
            'trash_attendee'                      => [
                'func'       => '_trash_or_restore_attendees',
                'args'       => [
                    'trash' => true,
                ],
                'noheader'   => true,
                'capability' => 'ee_delete_contacts',
                'obj_id'     => $ATT_ID,
            ],
            'restore_attendees'                   => [
                'func'       => '_trash_or_restore_attendees',
                'args'       => [
                    'trash' => false,
                ],
                'noheader'   => true,
                'capability' => 'ee_delete_contacts',
                'obj_id'     => $ATT_ID,
            ],
            'resend_registration'                 => [
                'func'       => '_resend_registration',
                'noheader'   => true,
                'capability' => 'ee_send_message',
            ],
            'registrations_report'                => [
                'func'       => [$this, '_registrations_report'],
                'noheader'   => true,
                'capability' => 'ee_read_registrations',
            ],
            'contact_list_export'                 => [
                'func'       => '_contact_list_export',
                'noheader'   => true,
                'capability' => 'export',
            ],
            'contact_list_report'                 => [
                'func'       => '_contact_list_report',
                'noheader'   => true,
                'capability' => 'ee_read_contacts',
            ],
        ];
    }


    protected function _set_page_config()
    {
        $REG_ID             = $this->request->getRequestParam('_REG_ID', 0, 'int');
        $ATT_ID             = $this->request->getRequestParam('ATT_ID', 0, 'int');
        $this->_page_config = [
            'default'           => [
                'nav'           => [
                    'label' => esc_html__('Overview', 'event_espresso'),
                    'order' => 5,
                ],
                'help_tabs'     => [
                    'registrations_overview_help_tab'                       => [
                        'title'    => esc_html__('Registrations Overview', 'event_espresso'),
                        'filename' => 'registrations_overview',
                    ],
                    'registrations_overview_table_column_headings_help_tab' => [
                        'title'    => esc_html__('Registrations Table Column Headings', 'event_espresso'),
                        'filename' => 'registrations_overview_table_column_headings',
                    ],
                    'registrations_overview_filters_help_tab'               => [
                        'title'    => esc_html__('Registration Filters', 'event_espresso'),
                        'filename' => 'registrations_overview_filters',
                    ],
                    'registrations_overview_views_help_tab'                 => [
                        'title'    => esc_html__('Registration Views', 'event_espresso'),
                        'filename' => 'registrations_overview_views',
                    ],
                    'registrations_regoverview_other_help_tab'              => [
                        'title'    => esc_html__('Registrations Other', 'event_espresso'),
                        'filename' => 'registrations_overview_other',
                    ],
                ],
                'qtips'         => ['Registration_List_Table_Tips'],
                'list_table'    => 'EE_Registrations_List_Table',
                'require_nonce' => false,
            ],
            'view_registration' => [
                'nav'           => [
                    'label'      => esc_html__('REG Details', 'event_espresso'),
                    'order'      => 15,
                    'url'        => $REG_ID
                        ? add_query_arg(['_REG_ID' => $REG_ID], $this->_current_page_view_url)
                        : $this->_admin_base_url,
                    'persistent' => false,
                ],
                'help_tabs'     => [
                    'registrations_details_help_tab'                    => [
                        'title'    => esc_html__('Registration Details', 'event_espresso'),
                        'filename' => 'registrations_details',
                    ],
                    'registrations_details_table_help_tab'              => [
                        'title'    => esc_html__('Registration Details Table', 'event_espresso'),
                        'filename' => 'registrations_details_table',
                    ],
                    'registrations_details_form_answers_help_tab'       => [
                        'title'    => esc_html__('Registration Form Answers', 'event_espresso'),
                        'filename' => 'registrations_details_form_answers',
                    ],
                    'registrations_details_registrant_details_help_tab' => [
                        'title'    => esc_html__('Contact Details', 'event_espresso'),
                        'filename' => 'registrations_details_registrant_details',
                    ],
                ],
                'metaboxes'     => array_merge(
                    $this->_default_espresso_metaboxes,
                    ['_registration_details_metaboxes']
                ),
                'require_nonce' => false,
            ],
            'new_registration'  => [
                'nav'           => [
                    'label'      => esc_html__('Add New Registration', 'event_espresso'),
                    'url'        => '#',
                    'order'      => 15,
                    'persistent' => false,
                ],
                'metaboxes'     => $this->_default_espresso_metaboxes,
                'labels'        => [
                    'publishbox' => esc_html__('Save Registration', 'event_espresso'),
                ],
                'require_nonce' => false,
            ],
            'add_new_attendee'  => [
                'nav'           => [
                    'label'      => esc_html__('Add Contact', 'event_espresso'),
                    'order'      => 15,
                    'persistent' => false,
                ],
                'metaboxes'     => array_merge(
                    $this->_default_espresso_metaboxes,
                    ['_publish_post_box', 'attendee_editor_metaboxes']
                ),
                'require_nonce' => false,
            ],
            'edit_attendee'     => [
                'nav'           => [
                    'label'      => esc_html__('Edit Contact', 'event_espresso'),
                    'order'      => 15,
                    'persistent' => false,
                    'url'        => $ATT_ID
                        ? add_query_arg(['ATT_ID' => $ATT_ID], $this->_current_page_view_url)
                        : $this->_admin_base_url,
                ],
                'metaboxes'     => ['attendee_editor_metaboxes'],
                'require_nonce' => false,
            ],
            'contact_list'      => [
                'nav'           => [
                    'label' => esc_html__('Contact List', 'event_espresso'),
                    'order' => 20,
                ],
                'list_table'    => 'EE_Attendee_Contact_List_Table',
                'help_tabs'     => [
                    'registrations_contact_list_help_tab'                       => [
                        'title'    => esc_html__('Registrations Contact List', 'event_espresso'),
                        'filename' => 'registrations_contact_list',
                    ],
                    'registrations_contact-list_table_column_headings_help_tab' => [
                        'title'    => esc_html__('Contact List Table Column Headings', 'event_espresso'),
                        'filename' => 'registrations_contact_list_table_column_headings',
                    ],
                    'registrations_contact_list_views_help_tab'                 => [
                        'title'    => esc_html__('Contact List Views', 'event_espresso'),
                        'filename' => 'registrations_contact_list_views',
                    ],
                    'registrations_contact_list_other_help_tab'                 => [
                        'title'    => esc_html__('Contact List Other', 'event_espresso'),
                        'filename' => 'registrations_contact_list_other',
                    ],
                ],
                'metaboxes'     => [],
                'require_nonce' => false,
            ],
            // override default cpt routes
            'create_new'        => '',
            'edit'              => '',
        ];
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
        EE_Registry::$i18n_js_strings['update_att_qstns'] = esc_html__(
            'click "Update Registration Questions" to save your changes',
            'event_espresso'
        );
    }


    public function admin_notices()
    {
    }


    public function admin_footer_scripts()
    {
    }


    /**
     * get list of registration statuses
     *
     * @return void
     * @throws EE_Error
     */
    private function _get_registration_status_array()
    {
        self::$_reg_status = EEM_Registration::reg_status_array([], true);
    }


    /**
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.10.2.p
     */
    protected function _add_screen_options_default()
    {
        $this->_per_page_screen_option();
    }


    /**
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.10.2.p
     */
    protected function _add_screen_options_contact_list()
    {
        $page_title              = $this->_admin_page_title;
        $this->_admin_page_title = esc_html__('Contacts', 'event_espresso');
        $this->_per_page_screen_option();
        $this->_admin_page_title = $page_title;
    }


    public function load_scripts_styles()
    {
        // style
        wp_register_style(
            'espresso_reg',
            REG_ASSETS_URL . 'espresso_registrations_admin.css',
            ['ee-admin-css'],
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_style('espresso_reg');
        // script
        wp_register_script(
            'espresso_reg',
            REG_ASSETS_URL . 'espresso_registrations_admin.js',
            ['jquery-ui-datepicker', 'jquery-ui-draggable', 'ee_admin_js'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_enqueue_script('espresso_reg');
    }


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since 4.10.2.p
     */
    public function load_scripts_styles_edit_attendee()
    {
        // stuff to only show up on our attendee edit details page.
        $attendee_details_translations = [
            'att_publish_text' => sprintf(
            /* translators: The date and time */
                wp_strip_all_tags(__('Created on: %s', 'event_espresso')),
                '<b>' . $this->_cpt_model_obj->get_datetime('ATT_created') . '</b>'
            ),
        ];
        wp_localize_script('espresso_reg', 'ATTENDEE_DETAILS', $attendee_details_translations);
        wp_enqueue_script('jquery-validate');
    }


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since 4.10.2.p
     */
    public function load_scripts_styles_view_registration()
    {
        // styles
        wp_enqueue_style('espresso-ui-theme');
        // scripts
        $this->_get_reg_custom_questions_form($this->_registration->ID());
        $this->_reg_custom_questions_form->wp_enqueue_scripts();
    }


    public function load_scripts_styles_contact_list()
    {
        wp_dequeue_style('espresso_reg');
        wp_register_style(
            'espresso_att',
            REG_ASSETS_URL . 'espresso_attendees_admin.css',
            ['ee-admin-css'],
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_style('espresso_att');
    }


    public function load_scripts_styles_new_registration()
    {
        wp_register_script(
            'ee-spco-for-admin',
            REG_ASSETS_URL . 'spco_for_admin.js',
            ['underscore', 'jquery'],
            EVENT_ESPRESSO_VERSION,
            true
        );
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


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since 4.10.2.p
     */
    protected function _set_list_table_views_default()
    {
        // for notification related bulk actions we need to make sure only active messengers have an option.
        EED_Messages::set_autoloaders();
        /** @type EE_Message_Resource_Manager $message_resource_manager */
        $message_resource_manager = EE_Registry::instance()->load_lib('Message_Resource_Manager');
        $active_mts               = $message_resource_manager->list_of_active_message_types();
        // key= bulk_action_slug, value= message type.
        $match_array = [
            'approve_registrations'    => 'registration',
            'decline_registrations'    => 'declined_registration',
            'pending_registrations'    => 'pending_approval',
            'no_approve_registrations' => 'not_approved_registration',
            'cancel_registrations'     => 'cancelled_registration',
        ];
        $can_send    = EE_Registry::instance()->CAP->current_user_can(
            'ee_send_message',
            'batch_send_messages'
        );
        /** setup reg status bulk actions **/
        $def_reg_status_actions['approve_registrations'] = esc_html__('Approve Registrations', 'event_espresso');
        if ($can_send && in_array($match_array['approve_registrations'], $active_mts, true)) {
            $def_reg_status_actions['approve_and_notify_registrations'] = esc_html__(
                'Approve and Notify Registrations',
                'event_espresso'
            );
        }
        $def_reg_status_actions['decline_registrations'] = esc_html__('Decline Registrations', 'event_espresso');
        if ($can_send && in_array($match_array['decline_registrations'], $active_mts, true)) {
            $def_reg_status_actions['decline_and_notify_registrations'] = esc_html__(
                'Decline and Notify Registrations',
                'event_espresso'
            );
        }
        $def_reg_status_actions['pending_registrations'] = esc_html__(
            'Set Registrations to Pending Payment',
            'event_espresso'
        );
        if ($can_send && in_array($match_array['pending_registrations'], $active_mts, true)) {
            $def_reg_status_actions['pending_and_notify_registrations'] = esc_html__(
                'Set Registrations to Pending Payment and Notify',
                'event_espresso'
            );
        }
        $def_reg_status_actions['no_approve_registrations'] = esc_html__(
            'Set Registrations to Not Approved',
            'event_espresso'
        );
        if ($can_send && in_array($match_array['no_approve_registrations'], $active_mts, true)) {
            $def_reg_status_actions['no_approve_and_notify_registrations'] = esc_html__(
                'Set Registrations to Not Approved and Notify',
                'event_espresso'
            );
        }
        $def_reg_status_actions['cancel_registrations'] = esc_html__('Cancel Registrations', 'event_espresso');
        if ($can_send && in_array($match_array['cancel_registrations'], $active_mts, true)) {
            $def_reg_status_actions['cancel_and_notify_registrations'] = esc_html__(
                'Cancel Registrations and Notify',
                'event_espresso'
            );
        }
        $def_reg_status_actions = apply_filters(
            'FHEE__Registrations_Admin_Page___set_list_table_views_default__def_reg_status_actions_array',
            $def_reg_status_actions,
            $active_mts,
            $can_send
        );

        $this->_views = [
            'all'   => [
                'slug'        => 'all',
                'label'       => esc_html__('View All Registrations', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array_merge(
                    $def_reg_status_actions,
                    [
                        'trash_registrations' => esc_html__('Trash Registrations', 'event_espresso'),
                    ]
                ),
            ],
            'month' => [
                'slug'        => 'month',
                'label'       => esc_html__('This Month', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array_merge(
                    $def_reg_status_actions,
                    [
                        'trash_registrations' => esc_html__('Trash Registrations', 'event_espresso'),
                    ]
                ),
            ],
            'today' => [
                'slug'        => 'today',
                'label'       => sprintf(
                    esc_html__('Today - %s', 'event_espresso'),
                    date('M d, Y', current_time('timestamp'))
                ),
                'count'       => 0,
                'bulk_action' => array_merge(
                    $def_reg_status_actions,
                    [
                        'trash_registrations' => esc_html__('Trash Registrations', 'event_espresso'),
                    ]
                ),
            ],
        ];
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_registrations',
                'espresso_registrations_delete_registration'
            )
        ) {
            $this->_views['incomplete'] = [
                'slug'        => 'incomplete',
                'label'       => esc_html__('Incomplete', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'trash_registrations' => esc_html__('Trash Registrations', 'event_espresso'),
                ],
            ];
            $this->_views['trash']      = [
                'slug'        => 'trash',
                'label'       => esc_html__('Trash', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'restore_registrations' => esc_html__('Restore Registrations', 'event_espresso'),
                    'delete_registrations'  => esc_html__('Delete Registrations Permanently', 'event_espresso'),
                ],
            ];
        }
    }


    protected function _set_list_table_views_contact_list()
    {
        $this->_views = [
            'in_use' => [
                'slug'        => 'in_use',
                'label'       => esc_html__('In Use', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'trash_attendees' => esc_html__('Move to Trash', 'event_espresso'),
                ],
            ],
        ];
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_contacts',
                'espresso_registrations_trash_attendees'
            )
        ) {
            $this->_views['trash'] = [
                'slug'        => 'trash',
                'label'       => esc_html__('Trash', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'restore_attendees' => esc_html__('Restore from Trash', 'event_espresso'),
                ],
            ];
        }
    }


    /**
     * @return array
     * @throws EE_Error
     */
    protected function _registration_legend_items()
    {
        $fc_items = [
            'star-icon'        => [
                'class' => 'dashicons dashicons-star-filled lt-blue-icon ee-icon-size-8',
                'desc'  => esc_html__('This is the Primary Registrant', 'event_espresso'),
            ],
            'view_details'     => [
                'class' => 'dashicons dashicons-clipboard',
                'desc'  => esc_html__('View Registration Details', 'event_espresso'),
            ],
            'edit_attendee'    => [
                'class' => 'ee-icon ee-icon-user-edit ee-icon-size-16',
                'desc'  => esc_html__('Edit Contact Details', 'event_espresso'),
            ],
            'view_transaction' => [
                'class' => 'dashicons dashicons-cart',
                'desc'  => esc_html__('View Transaction Details', 'event_espresso'),
            ],
            'view_invoice'     => [
                'class' => 'dashicons dashicons-media-spreadsheet',
                'desc'  => esc_html__('View Transaction Invoice', 'event_espresso'),
            ],
        ];
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_send_message',
                'espresso_registrations_resend_registration'
            )
        ) {
            $fc_items['resend_registration'] = [
                'class' => 'dashicons dashicons-email-alt',
                'desc'  => esc_html__('Resend Registration Details', 'event_espresso'),
            ];
        } else {
            $fc_items['blank'] = ['class' => 'blank', 'desc' => ''];
        }
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_read_global_messages',
                'view_filtered_messages'
            )
        ) {
            $related_for_icon = EEH_MSG_Template::get_message_action_icon('see_notifications_for');
            if (is_array($related_for_icon) && isset($related_for_icon['css_class'], $related_for_icon['label'])) {
                $fc_items['view_related_messages'] = [
                    'class' => $related_for_icon['css_class'],
                    'desc'  => $related_for_icon['label'],
                ];
            }
        }
        $sc_items = [
            'approved_status'   => [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_approved,
                'desc'  => EEH_Template::pretty_status(
                    EEM_Registration::status_id_approved,
                    false,
                    'sentence'
                ),
            ],
            'pending_status'    => [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_pending_payment,
                'desc'  => EEH_Template::pretty_status(
                    EEM_Registration::status_id_pending_payment,
                    false,
                    'sentence'
                ),
            ],
            'wait_list'         => [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_wait_list,
                'desc'  => EEH_Template::pretty_status(
                    EEM_Registration::status_id_wait_list,
                    false,
                    'sentence'
                ),
            ],
            'incomplete_status' => [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_incomplete,
                'desc'  => EEH_Template::pretty_status(
                    EEM_Registration::status_id_incomplete,
                    false,
                    'sentence'
                ),
            ],
            'not_approved'      => [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_not_approved,
                'desc'  => EEH_Template::pretty_status(
                    EEM_Registration::status_id_not_approved,
                    false,
                    'sentence'
                ),
            ],
            'declined_status'   => [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_declined,
                'desc'  => EEH_Template::pretty_status(
                    EEM_Registration::status_id_declined,
                    false,
                    'sentence'
                ),
            ],
            'cancelled_status'  => [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_cancelled,
                'desc'  => EEH_Template::pretty_status(
                    EEM_Registration::status_id_cancelled,
                    false,
                    'sentence'
                ),
            ],
        ];
        return array_merge($fc_items, $sc_items);
    }



    /***************************************        REGISTRATION OVERVIEW        **************************************/


    /**
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _registrations_overview_list_table()
    {
        $this->appendAddNewRegistrationButtonToPageTitle();
        $header_text                  = '';
        $admin_page_header_decorators = [
            'EventEspresso\core\domain\services\admin\registrations\list_table\page_header\AttendeeFilterHeader',
            'EventEspresso\core\domain\services\admin\registrations\list_table\page_header\EventFilterHeader',
            'EventEspresso\core\domain\services\admin\registrations\list_table\page_header\DateFilterHeader',
            'EventEspresso\core\domain\services\admin\registrations\list_table\page_header\TicketFilterHeader',
        ];
        foreach ($admin_page_header_decorators as $admin_page_header_decorator) {
            $filter_header_decorator = $this->getLoader()->getNew($admin_page_header_decorator);
            $header_text             = $filter_header_decorator->getHeaderText($header_text);
        }
        $this->_template_args['admin_page_header'] = $header_text;
        $this->_template_args['after_list_table']  = $this->_display_legend($this->_registration_legend_items());
        $this->display_admin_list_table_page_with_no_sidebar();
    }


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function appendAddNewRegistrationButtonToPageTitle()
    {
        $EVT_ID = $this->request->getRequestParam('event_id', 0, 'int');
        if (
            $EVT_ID
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_registrations',
                'espresso_registrations_new_registration',
                $EVT_ID
            )
        ) {
            $this->_admin_page_title .= ' ' . $this->get_action_link_or_button(
                'new_registration',
                'add-registrant',
                ['event_id' => $EVT_ID],
                'add-new-h2'
            );
        }
    }


    /**
     * This sets the _registration property for the registration details screen
     *
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function _set_registration_object()
    {
        // get out if we've already set the object
        if ($this->_registration instanceof EE_Registration) {
            return;
        }
        $REG_ID = $this->request->getRequestParam('_REG_ID', 0, 'int');
        if ($this->_registration = $this->getRegistrationModel()->get_one_by_ID($REG_ID)) {
            return;
        }
        $error_msg = sprintf(
            esc_html__(
                'An error occurred and the details for Registration ID #%s could not be retrieved.',
                'event_espresso'
            ),
            $REG_ID
        );
        EE_Error::add_error($error_msg, __FILE__, __FUNCTION__, __LINE__);
        $this->_registration = null;
    }


    /**
     * Used to retrieve registrations for the list table.
     *
     * @param int  $per_page
     * @param bool $count
     * @param bool $this_month
     * @param bool $today
     * @return EE_Registration[]|int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get_registrations(
        $per_page = 10,
        $count = false,
        $this_month = false,
        $today = false
    ) {
        if ($this_month) {
            $this->request->setRequestParam('status', 'month');
        }
        if ($today) {
            $this->request->setRequestParam('status', 'today');
        }
        $query_params = $this->_get_registration_query_parameters([], $per_page, $count);
        /**
         * Override the default groupby added by EEM_Base so that sorts with multiple order bys work as expected
         *
         * @link https://events.codebasehq.com/projects/event-espresso/tickets/10093
         * @see  https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
         *                      or if you have the development copy of EE you can view this at the path:
         *                      /docs/G--Model-System/model-query-params.md
         */
        $query_params['group_by'] = '';

        return $count
            ? $this->getRegistrationModel()->count($query_params)
            /** @type EE_Registration[] */
            : $this->getRegistrationModel()->get_all($query_params);
    }


    /**
     * Retrieves the query parameters to be used by the Registration model for getting registrations.
     * Note: this listens to values on the request for some of the query parameters.
     *
     * @param array $request
     * @param int   $per_page
     * @param bool  $count
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _get_registration_query_parameters(
        $request = [],
        $per_page = 10,
        $count = false
    ) {
        /** @var EventEspresso\core\domain\services\admin\registrations\list_table\QueryBuilder $list_table_query_builder */
        $list_table_query_builder = $this->getLoader()->getNew(
            'EventEspresso\core\domain\services\admin\registrations\list_table\QueryBuilder',
            [null, null, $request]
        );
        return $list_table_query_builder->getQueryParams($per_page, $count);
    }


    public function get_registration_status_array()
    {
        return self::$_reg_status;
    }




    /***************************************        REGISTRATION DETAILS        ***************************************/
    /**
     * generates HTML for the View Registration Details Admin page
     *
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EntityNotFoundException
     * @throws ReflectionException
     */
    protected function _registration_details()
    {
        $this->_template_args = [];
        $this->_set_registration_object();
        if (is_object($this->_registration)) {
            $transaction                                   = $this->_registration->transaction()
                ? $this->_registration->transaction()
                : EE_Transaction::new_instance();
            $this->_session                                = $transaction->session_data();
            $event_id                                      = $this->_registration->event_ID();
            $this->_template_args['reg_nmbr']['value']     = $this->_registration->ID();
            $this->_template_args['reg_nmbr']['label']     = esc_html__('Registration Number', 'event_espresso');
            $this->_template_args['reg_datetime']['value'] = $this->_registration->get_i18n_datetime('REG_date');
            $this->_template_args['reg_datetime']['label'] = esc_html__('Date', 'event_espresso');
            $this->_template_args['grand_total']           = $transaction->total();
            $this->_template_args['currency_sign']         = EE_Registry::instance()->CFG->currency->sign;
            // link back to overview
            $this->_template_args['reg_overview_url']            = REG_ADMIN_URL;
            $this->_template_args['registration']                = $this->_registration;
            $this->_template_args['filtered_registrations_link'] = EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action'   => 'default',
                    'event_id' => $event_id,
                ],
                REG_ADMIN_URL
            );
            $this->_template_args['filtered_transactions_link']  = EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action' => 'default',
                    'EVT_ID' => $event_id,
                    'page'   => 'espresso_transactions',
                ],
                admin_url('admin.php')
            );
            $this->_template_args['event_link']                  = EE_Admin_Page::add_query_args_and_nonce(
                [
                    'page'   => 'espresso_events',
                    'action' => 'edit',
                    'post'   => $event_id,
                ],
                admin_url('admin.php')
            );
            // next and previous links
            $next_reg                                      = $this->_registration->next(
                null,
                [],
                'REG_ID'
            );
            $this->_template_args['next_registration']     = $next_reg
                ? $this->_next_link(
                    EE_Admin_Page::add_query_args_and_nonce(
                        [
                            'action'  => 'view_registration',
                            '_REG_ID' => $next_reg['REG_ID'],
                        ],
                        REG_ADMIN_URL
                    ),
                    'dashicons dashicons-arrow-right ee-icon-size-22'
                )
                : '';
            $previous_reg                                  = $this->_registration->previous(
                null,
                [],
                'REG_ID'
            );
            $this->_template_args['previous_registration'] = $previous_reg
                ? $this->_previous_link(
                    EE_Admin_Page::add_query_args_and_nonce(
                        [
                            'action'  => 'view_registration',
                            '_REG_ID' => $previous_reg['REG_ID'],
                        ],
                        REG_ADMIN_URL
                    ),
                    'dashicons dashicons-arrow-left ee-icon-size-22'
                )
                : '';
            // grab header
            $template_path                             = REG_TEMPLATE_PATH . 'reg_admin_details_header.template.php';
            $this->_template_args['REG_ID']            = $this->_registration->ID();
            $this->_template_args['admin_page_header'] = EEH_Template::display_template(
                $template_path,
                $this->_template_args,
                true
            );
        } else {
            $this->_template_args['admin_page_header'] = '';
            $this->_display_espresso_notices();
        }
        // the details template wrapper
        $this->display_admin_page_with_sidebar();
    }


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since 4.10.2.p
     */
    protected function _registration_details_metaboxes()
    {
        do_action('AHEE__Registrations_Admin_Page___registration_details_metabox__start', $this);
        $this->_set_registration_object();
        $attendee = $this->_registration instanceof EE_Registration ? $this->_registration->attendee() : null;
        add_meta_box(
            'edit-reg-status-mbox',
            esc_html__('Registration Status', 'event_espresso'),
            [$this, 'set_reg_status_buttons_metabox'],
            $this->_wp_page_slug,
            'normal',
            'high'
        );
        add_meta_box(
            'edit-reg-details-mbox',
            esc_html__('Registration Details', 'event_espresso'),
            [$this, '_reg_details_meta_box'],
            $this->_wp_page_slug,
            'normal',
            'high'
        );
        if (
            $attendee instanceof EE_Attendee
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_read_registration',
                'edit-reg-questions-mbox',
                $this->_registration->ID()
            )
        ) {
            add_meta_box(
                'edit-reg-questions-mbox',
                esc_html__('Registration Form Answers', 'event_espresso'),
                [$this, '_reg_questions_meta_box'],
                $this->_wp_page_slug,
                'normal',
                'high'
            );
        }
        add_meta_box(
            'edit-reg-registrant-mbox',
            esc_html__('Contact Details', 'event_espresso'),
            [$this, '_reg_registrant_side_meta_box'],
            $this->_wp_page_slug,
            'side',
            'high'
        );
        if ($this->_registration->group_size() > 1) {
            add_meta_box(
                'edit-reg-attendees-mbox',
                esc_html__('Other Registrations in this Transaction', 'event_espresso'),
                [$this, '_reg_attendees_meta_box'],
                $this->_wp_page_slug,
                'normal',
                'high'
            );
        }
    }


    /**
     * set_reg_status_buttons_metabox
     *
     * @return void
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_reg_status_buttons_metabox()
    {
        $this->_set_registration_object();
        $change_reg_status_form = $this->_generate_reg_status_change_form();
        $output                 = $change_reg_status_form->form_open(
            self::add_query_args_and_nonce(
                [
                    'action' => 'change_reg_status',
                ],
                REG_ADMIN_URL
            )
        );
        $output                 .= $change_reg_status_form->get_html();
        $output                 .= $change_reg_status_form->form_close();
        echo wp_kses($output, AllowedTags::getWithFormTags());
    }


    /**
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EntityNotFoundException
     * @throws ReflectionException
     */
    protected function _generate_reg_status_change_form()
    {
        $reg_status_change_form_array = [
            'name'            => 'reg_status_change_form',
            'html_id'         => 'reg-status-change-form',
            'layout_strategy' => new EE_Admin_Two_Column_Layout(),
            'subsections'     => [
                'return'         => new EE_Hidden_Input(
                    [
                        'name'    => 'return',
                        'default' => 'view_registration',
                    ]
                ),
                'REG_ID'         => new EE_Hidden_Input(
                    [
                        'name'    => 'REG_ID',
                        'default' => $this->_registration->ID(),
                    ]
                ),
                'current_status' => new EE_Form_Section_HTML(
                    EEH_HTML::table(
                        EEH_HTML::tr(
                            EEH_HTML::th(
                                EEH_HTML::label(
                                    EEH_HTML::strong(
                                        esc_html__('Current Registration Status', 'event_espresso')
                                    )
                                )
                            )
                            . EEH_HTML::td(
                                EEH_HTML::strong(
                                    $this->_registration->pretty_status(),
                                    '',
                                    'status-' . $this->_registration->status_ID(),
                                    'line-height: 1em; font-size: 1.5em; font-weight: bold;'
                                )
                            )
                        )
                    )
                ),
            ],
        ];
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_registration',
                'toggle_registration_status',
                $this->_registration->ID()
            )
        ) {
            $reg_status_change_form_array['subsections']['reg_status']         = new EE_Select_Input(
                $this->_get_reg_statuses(),
                [
                    'html_label_text' => esc_html__('Change Registration Status to', 'event_espresso'),
                    'default'         => $this->_registration->status_ID(),
                ]
            );
            $reg_status_change_form_array['subsections']['send_notifications'] = new EE_Yes_No_Input(
                [
                    'html_label_text' => esc_html__('Send Related Messages', 'event_espresso'),
                    'default'         => false,
                    'html_help_text'  => esc_html__(
                        'If set to "Yes", then the related messages will be sent to the registrant.',
                        'event_espresso'
                    ),
                ]
            );
            $reg_status_change_form_array['subsections']['submit']             = new EE_Submit_Input(
                [
                    'html_class'      => 'button-primary',
                    'html_label_text' => '&nbsp;',
                    'default'         => esc_html__('Update Registration Status', 'event_espresso'),
                ]
            );
        }
        return new EE_Form_Section_Proper($reg_status_change_form_array);
    }


    /**
     * Returns an array of all the buttons for the various statuses and switch status actions
     *
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EntityNotFoundException
     */
    protected function _get_reg_statuses()
    {
        $reg_status_array = $this->getRegistrationModel()->reg_status_array();
        unset($reg_status_array[ EEM_Registration::status_id_incomplete ]);
        // get current reg status
        $current_status = $this->_registration->status_ID();
        // is registration for free event? This will determine whether to display the pending payment option
        if (
            $current_status !== EEM_Registration::status_id_pending_payment
            && EEH_Money::compare_floats($this->_registration->ticket()->price(), 0.00)
        ) {
            unset($reg_status_array[ EEM_Registration::status_id_pending_payment ]);
        }
        return $this->getStatusModel()->localized_status($reg_status_array, false, 'sentence');
    }


    /**
     * This method is used when using _REG_ID from request which may or may not be an array of reg_ids.
     *
     * @param bool $status REG status given for changing registrations to.
     * @param bool $notify Whether to send messages notifications or not.
     * @return array (array with reg_id(s) updated and whether update was successful.
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    protected function _set_registration_status_from_request($status = false, $notify = false)
    {
        $REG_IDs = $this->request->requestParamIsSet('reg_status_change_form')
            ? $this->request->getRequestParam('reg_status_change_form[REG_ID]', [], 'int', true)
            : $this->request->getRequestParam('_REG_ID', [], 'int', true);

        // sanitize $REG_IDs
        $REG_IDs = array_map('absint', $REG_IDs);
        // and remove empty entries
        $REG_IDs = array_filter($REG_IDs);

        $result = $this->_set_registration_status($REG_IDs, $status, $notify);

        /**
         * Set and filter $_req_data['_REG_ID'] for any potential future messages notifications.
         * Currently this value is used downstream by the _process_resend_registration method.
         *
         * @param int|array                $registration_ids The registration ids that have had their status changed successfully.
         * @param bool                     $status           The status registrations were changed to.
         * @param bool                     $success          If the status was changed successfully for all registrations.
         * @param Registrations_Admin_Page $admin_page
         */
        $REG_ID = apply_filters(
            'FHEE__Registrations_Admin_Page___set_registration_status_from_request__REG_IDs',
            $result['REG_ID'],
            $status,
            $result['success'],
            $this
        );
        $this->request->setRequestParam('_REG_ID', $REG_ID);

        // notify?
        if (
            $notify
            && $result['success']
            && ! empty($REG_ID)
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_send_message',
                'espresso_registrations_resend_registration'
            )
        ) {
            $this->_process_resend_registration();
        }
        return $result;
    }


    /**
     * Set the registration status for the given reg_id (which may or may not be an array, it gets typecast to an
     * array). Note, this method does NOT take care of possible notifications.  That is required by calling code.
     *
     * @param array  $REG_IDs
     * @param string $status
     * @param bool   $notify Used to indicate whether notification was requested or not.  This determines the context
     *                       slug sent with setting the registration status.
     * @return array (an array with 'success' key representing whether status change was successful, and 'REG_ID' as
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws EntityNotFoundException
     * @throws DomainException
     */
    protected function _set_registration_status($REG_IDs = [], $status = '', $notify = false)
    {
        $success = false;
        // typecast $REG_IDs
        $REG_IDs = (array) $REG_IDs;
        if (! empty($REG_IDs)) {
            $success = true;
            // set default status if none is passed
            $status         = $status ?: EEM_Registration::status_id_pending_payment;
            $status_context = $notify
                ? Domain::CONTEXT_REGISTRATION_STATUS_CHANGE_REGISTRATION_ADMIN_NOTIFY
                : Domain::CONTEXT_REGISTRATION_STATUS_CHANGE_REGISTRATION_ADMIN;
            // loop through REG_ID's and change status
            foreach ($REG_IDs as $REG_ID) {
                $registration = $this->getRegistrationModel()->get_one_by_ID($REG_ID);
                if ($registration instanceof EE_Registration) {
                    $registration->set_status(
                        $status,
                        false,
                        new Context(
                            $status_context,
                            esc_html__(
                                'Manually triggered status change on a Registration Admin Page route.',
                                'event_espresso'
                            )
                        )
                    );
                    $result = $registration->save();
                    // verifying explicit fails because update *may* just return 0 for 0 rows affected
                    $success = $result !== false ? $success : false;
                }
            }
        }

        // return $success and processed registrations
        return ['REG_ID' => $REG_IDs, 'success' => $success];
    }


    /**
     * Common logic for setting up success message and redirecting to appropriate route
     *
     * @param string $STS_ID status id for the registration changed to
     * @param bool   $notify indicates whether the _set_registration_status_from_request does notifications or not.
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    protected function _reg_status_change_return($STS_ID, $notify = false)
    {
        $result  = ! empty($STS_ID) ? $this->_set_registration_status_from_request($STS_ID, $notify)
            : ['success' => false];
        $success = isset($result['success']) && $result['success'];
        // setup success message
        if ($success) {
            if (is_array($result['REG_ID']) && count($result['REG_ID']) === 1) {
                $msg = sprintf(
                    esc_html__('Registration status has been set to %s', 'event_espresso'),
                    EEH_Template::pretty_status($STS_ID, false, 'lower')
                );
            } else {
                $msg = sprintf(
                    esc_html__('Registrations have been set to %s.', 'event_espresso'),
                    EEH_Template::pretty_status($STS_ID, false, 'lower')
                );
            }
            EE_Error::add_success($msg);
        } else {
            EE_Error::add_error(
                esc_html__(
                    'Something went wrong, and the status was not changed',
                    'event_espresso'
                ),
                __FILE__,
                __LINE__,
                __FUNCTION__
            );
        }
        $return = $this->request->getRequestParam('return');
        $route  = $return === 'view_registration'
            ? ['action' => 'view_registration', '_REG_ID' => reset($result['REG_ID'])]
            : ['action' => 'default'];
        $route  = $this->mergeExistingRequestParamsWithRedirectArgs($route);
        $this->_redirect_after_action($success, '', '', $route, true);
    }


    /**
     * incoming reg status change from reg details page.
     *
     * @return void
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws DomainException
     */
    protected function _change_reg_status()
    {
        $this->request->setRequestParam('return', 'view_registration');
        // set notify based on whether the send notifications toggle is set or not
        $notify     = $this->request->getRequestParam('reg_status_change_form[send_notifications]', false, 'bool');
        $reg_status = $this->request->getRequestParam('reg_status_change_form[reg_status]', '');
        $this->request->setRequestParam('reg_status_change_form[reg_status]', $reg_status);
        switch ($reg_status) {
            case EEM_Registration::status_id_approved:
            case EEH_Template::pretty_status(EEM_Registration::status_id_approved, false, 'sentence'):
                $this->approve_registration($notify);
                break;
            case EEM_Registration::status_id_pending_payment:
            case EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, false, 'sentence'):
                $this->pending_registration($notify);
                break;
            case EEM_Registration::status_id_not_approved:
            case EEH_Template::pretty_status(EEM_Registration::status_id_not_approved, false, 'sentence'):
                $this->not_approve_registration($notify);
                break;
            case EEM_Registration::status_id_declined:
            case EEH_Template::pretty_status(EEM_Registration::status_id_declined, false, 'sentence'):
                $this->decline_registration($notify);
                break;
            case EEM_Registration::status_id_cancelled:
            case EEH_Template::pretty_status(EEM_Registration::status_id_cancelled, false, 'sentence'):
                $this->cancel_registration($notify);
                break;
            case EEM_Registration::status_id_wait_list:
            case EEH_Template::pretty_status(EEM_Registration::status_id_wait_list, false, 'sentence'):
                $this->wait_list_registration($notify);
                break;
            case EEM_Registration::status_id_incomplete:
            default:
                $this->request->unSetRequestParam('return');
                $this->_reg_status_change_return('');
                break;
        }
    }


    /**
     * Callback for bulk action routes.
     * Note: although we could just register the singular route callbacks for each bulk action route as well, this
     * method was chosen so there is one central place all the registration status bulk actions are going through.
     * Potentially, this provides an easier place to locate logic that is specific to these bulk actions (as opposed to
     * when an action is happening on just a single registration).
     *
     * @param      $action
     * @param bool $notify
     */
    protected function bulk_action_on_registrations($action, $notify = false)
    {
        do_action(
            'AHEE__Registrations_Admin_Page__bulk_action_on_registrations__before_execution',
            $this,
            $action,
            $notify
        );
        $method = $action . '_registration';
        if (method_exists($this, $method)) {
            $this->$method($notify);
        }
    }


    /**
     * approve_registration
     *
     * @param bool $notify whether or not to notify the registrant about their approval.
     * @return void
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws DomainException
     */
    protected function approve_registration($notify = false)
    {
        $this->_reg_status_change_return(EEM_Registration::status_id_approved, $notify);
    }


    /**
     * decline_registration
     *
     * @param bool $notify whether or not to notify the registrant about their status change.
     * @return void
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws DomainException
     */
    protected function decline_registration($notify = false)
    {
        $this->_reg_status_change_return(EEM_Registration::status_id_declined, $notify);
    }


    /**
     * cancel_registration
     *
     * @param bool $notify whether or not to notify the registrant about their status change.
     * @return void
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws DomainException
     */
    protected function cancel_registration($notify = false)
    {
        $this->_reg_status_change_return(EEM_Registration::status_id_cancelled, $notify);
    }


    /**
     * not_approve_registration
     *
     * @param bool $notify whether or not to notify the registrant about their status change.
     * @return void
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws DomainException
     */
    protected function not_approve_registration($notify = false)
    {
        $this->_reg_status_change_return(EEM_Registration::status_id_not_approved, $notify);
    }


    /**
     * decline_registration
     *
     * @param bool $notify whether or not to notify the registrant about their status change.
     * @return void
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws DomainException
     */
    protected function pending_registration($notify = false)
    {
        $this->_reg_status_change_return(EEM_Registration::status_id_pending_payment, $notify);
    }


    /**
     * waitlist_registration
     *
     * @param bool $notify whether or not to notify the registrant about their status change.
     * @return void
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws DomainException
     */
    protected function wait_list_registration($notify = false)
    {
        $this->_reg_status_change_return(EEM_Registration::status_id_wait_list, $notify);
    }


    /**
     * generates HTML for the Registration main meta box
     *
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws EntityNotFoundException
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
        $filters->add(new EE_Single_Registration_Line_Item_Filter($this->_registration));
        $filters->add(new EE_Non_Zero_Line_Item_Filter());
        $line_item_filter_processor              = new EE_Line_Item_Filter_Processor(
            $filters,
            $transaction->total_line_item()
        );
        $filtered_line_item_tree                 = $line_item_filter_processor->process();
        $line_item_display                       = new EE_Line_Item_Display(
            'reg_admin_table',
            'EE_Admin_Table_Registration_Line_Item_Display_Strategy'
        );
        $this->_template_args['line_item_table'] = $line_item_display->display_line_item(
            $filtered_line_item_tree,
            ['EE_Registration' => $this->_registration]
        );
        $attendee                                = $this->_registration->attendee();
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_read_transaction',
                'espresso_transactions_view_transaction'
            )
        ) {
            $this->_template_args['view_transaction_button'] = EEH_Template::get_button_or_link(
                EE_Admin_Page::add_query_args_and_nonce(
                    [
                        'action' => 'view_transaction',
                        'TXN_ID' => $transaction->ID(),
                    ],
                    TXN_ADMIN_URL
                ),
                esc_html__(' View Transaction', 'event_espresso'),
                'button secondary-button right',
                'dashicons dashicons-cart'
            );
        } else {
            $this->_template_args['view_transaction_button'] = '';
        }
        if (
            $attendee instanceof EE_Attendee
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_send_message',
                'espresso_registrations_resend_registration'
            )
        ) {
            $this->_template_args['resend_registration_button'] = EEH_Template::get_button_or_link(
                EE_Admin_Page::add_query_args_and_nonce(
                    [
                        'action'      => 'resend_registration',
                        '_REG_ID'     => $this->_registration->ID(),
                        'redirect_to' => 'view_registration',
                    ],
                    REG_ADMIN_URL
                ),
                esc_html__(' Resend Registration', 'event_espresso'),
                'button secondary-button right',
                'dashicons dashicons-email-alt'
            );
        } else {
            $this->_template_args['resend_registration_button'] = '';
        }
        $this->_template_args['currency_sign'] = EE_Registry::instance()->CFG->currency->sign;
        $payment                               = $transaction->get_first_related('Payment');
        $payment                               = ! $payment instanceof EE_Payment
            ? EE_Payment::new_instance()
            : $payment;
        $payment_method                        = $payment->get_first_related('Payment_Method');
        $payment_method                        = ! $payment_method instanceof EE_Payment_Method
            ? EE_Payment_Method::new_instance()
            : $payment_method;
        $reg_details                           = [
            'payment_method'       => $payment_method->name(),
            'response_msg'         => $payment->gateway_response(),
            'registration_id'      => $this->_registration->get('REG_code'),
            'registration_session' => $this->_registration->session_ID(),
            'ip_address'           => isset($this->_session['ip_address']) ? $this->_session['ip_address'] : '',
            'user_agent'           => isset($this->_session['user_agent']) ? $this->_session['user_agent'] : '',
        ];
        if (isset($reg_details['registration_id'])) {
            $this->_template_args['reg_details']['registration_id']['value'] = $reg_details['registration_id'];
            $this->_template_args['reg_details']['registration_id']['label'] = esc_html__(
                'Registration ID',
                'event_espresso'
            );
            $this->_template_args['reg_details']['registration_id']['class'] = 'regular-text';
        }
        if (isset($reg_details['payment_method'])) {
            $this->_template_args['reg_details']['payment_method']['value'] = $reg_details['payment_method'];
            $this->_template_args['reg_details']['payment_method']['label'] = esc_html__(
                'Most Recent Payment Method',
                'event_espresso'
            );
            $this->_template_args['reg_details']['payment_method']['class'] = 'regular-text';
            $this->_template_args['reg_details']['response_msg']['value']   = $reg_details['response_msg'];
            $this->_template_args['reg_details']['response_msg']['label']   = esc_html__(
                'Payment method response',
                'event_espresso'
            );
            $this->_template_args['reg_details']['response_msg']['class']   = 'regular-text';
        }
        $this->_template_args['reg_details']['registration_session']['value'] = $reg_details['registration_session'];
        $this->_template_args['reg_details']['registration_session']['label'] = esc_html__(
            'Registration Session',
            'event_espresso'
        );
        $this->_template_args['reg_details']['registration_session']['class'] = 'regular-text';
        $this->_template_args['reg_details']['ip_address']['value']           = $reg_details['ip_address'];
        $this->_template_args['reg_details']['ip_address']['label']           = esc_html__(
            'Registration placed from IP',
            'event_espresso'
        );
        $this->_template_args['reg_details']['ip_address']['class']           = 'regular-text';
        $this->_template_args['reg_details']['user_agent']['value']           = $reg_details['user_agent'];
        $this->_template_args['reg_details']['user_agent']['label']           = esc_html__(
            'Registrant User Agent',
            'event_espresso'
        );
        $this->_template_args['reg_details']['user_agent']['class']           = 'large-text';
        $this->_template_args['event_link']                                   = EE_Admin_Page::add_query_args_and_nonce(
            [
                'action'   => 'default',
                'event_id' => $this->_registration->event_ID(),
            ],
            REG_ADMIN_URL
        );
        $this->_template_args['REG_ID']                                       = $this->_registration->ID();
        $this->_template_args['event_id']                                     = $this->_registration->event_ID();
        $template_path                                                        =
            REG_TEMPLATE_PATH . 'reg_admin_details_main_meta_box_reg_details.template.php';
        EEH_Template::display_template($template_path, $this->_template_args); // already escaped
    }


    /**
     * generates HTML for the Registration Questions meta box.
     * If pre-4.8.32.rc.000 hooks are used, uses old methods (with its filters),
     * otherwise uses new forms system
     *
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function _reg_questions_meta_box()
    {
        // allow someone to override this method entirely
        if (
            apply_filters(
                'FHEE__Registrations_Admin_Page___reg_questions_meta_box__do_default',
                true,
                $this,
                $this->_registration
            )
        ) {
            $form                                              = $this->_get_reg_custom_questions_form(
                $this->_registration->ID()
            );
            $this->_template_args['att_questions']             = count($form->subforms()) > 0
                ? $form->get_html_and_js()
                : '';
            $this->_template_args['reg_questions_form_action'] = 'edit_registration';
            $this->_template_args['REG_ID']                    = $this->_registration->ID();
            $template_path                                     =
                REG_TEMPLATE_PATH . 'reg_admin_details_main_meta_box_reg_questions.template.php';
            EEH_Template::display_template($template_path, $this->_template_args);
        }
    }


    /**
     * form_before_question_group
     *
     * @param string $output
     * @return        string
     * @deprecated    as of 4.8.32.rc.000
     */
    public function form_before_question_group($output)
    {
        EE_Error::doing_it_wrong(
            __CLASS__ . '::' . __FUNCTION__,
            esc_html__(
                'This method would have been protected but was used on a filter callback so needed to be public. Please discontinue usage as it will be removed soon.',
                'event_espresso'
            ),
            '4.8.32.rc.000'
        );
        return '
	<table class="form-table ee-width-100">
		<tbody>
			';
    }


    /**
     * form_after_question_group
     *
     * @param string $output
     * @return        string
     * @deprecated    as of 4.8.32.rc.000
     */
    public function form_after_question_group($output)
    {
        EE_Error::doing_it_wrong(
            __CLASS__ . '::' . __FUNCTION__,
            esc_html__(
                'This method would have been protected but was used on a filter callback so needed to be public. Please discontinue usage as it will be removed soon.',
                'event_espresso'
            ),
            '4.8.32.rc.000'
        );
        return '
			<tr class="hide-if-no-js">
				<th> </th>
				<td class="reg-admin-edit-attendee-question-td">
					<a class="reg-admin-edit-attendee-question-lnk" href="#" aria-label="'
               . esc_attr__('click to edit question', 'event_espresso')
               . '">
						<span class="reg-admin-edit-question-group-spn lt-grey-txt">'
               . esc_html__('edit the above question group', 'event_espresso')
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
     * @param string $label
     * @return        string
     * @deprecated    as of 4.8.32.rc.000
     */
    public function form_form_field_label_wrap($label)
    {
        EE_Error::doing_it_wrong(
            __CLASS__ . '::' . __FUNCTION__,
            esc_html__(
                'This method would have been protected but was used on a filter callback so needed to be public. Please discontinue usage as it will be removed soon.',
                'event_espresso'
            ),
            '4.8.32.rc.000'
        );
        return '
			<tr>
				<th>
					' . $label . '
				</th>';
    }


    /**
     * form_form_field_input__wrap
     *
     * @param string $input
     * @return        string
     * @deprecated    as of 4.8.32.rc.000
     */
    public function form_form_field_input__wrap($input)
    {
        EE_Error::doing_it_wrong(
            __CLASS__ . '::' . __FUNCTION__,
            esc_html__(
                'This method would have been protected but was used on a filter callback so needed to be public. Please discontinue usage as it will be removed soon.',
                'event_espresso'
            ),
            '4.8.32.rc.000'
        );
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
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _update_attendee_registration_form()
    {
        do_action('AHEE__Registrations_Admin_Page___update_attendee_registration_form__start', $this);
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $REG_ID  = $this->request->getRequestParam('_REG_ID', 0, 'int');
            $success = $this->_save_reg_custom_questions_form($REG_ID);
            if ($success) {
                $what  = esc_html__('Registration Form', 'event_espresso');
                $route = $REG_ID
                    ? ['action' => 'view_registration', '_REG_ID' => $REG_ID]
                    : ['action' => 'default'];
                $this->_redirect_after_action(true, $what, esc_html__('updated', 'event_espresso'), $route);
            }
        }
    }


    /**
     * Gets the form for saving registrations custom questions (if done
     * previously retrieves the cached form object, which may have validation errors in it)
     *
     * @param int $REG_ID
     * @return EE_Registration_Custom_Questions_Form
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _get_reg_custom_questions_form($REG_ID)
    {
        if (! $this->_reg_custom_questions_form) {
            require_once(REG_ADMIN . 'form_sections/EE_Registration_Custom_Questions_Form.form.php');
            $this->_reg_custom_questions_form = new EE_Registration_Custom_Questions_Form(
                $this->getRegistrationModel()->get_one_by_ID($REG_ID)
            );
            $this->_reg_custom_questions_form->_construct_finalize(null, null);
        }
        return $this->_reg_custom_questions_form;
    }


    /**
     * Saves
     *
     * @param bool $REG_ID
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    private function _save_reg_custom_questions_form($REG_ID = 0)
    {
        if (! $REG_ID) {
            EE_Error::add_error(
                esc_html__(
                    'An error occurred. No registration ID was received.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        $form = $this->_get_reg_custom_questions_form($REG_ID);
        $form->receive_form_submission($this->request->requestParams());
        $success = false;
        if ($form->is_valid()) {
            foreach ($form->subforms() as $question_group_form) {
                foreach ($question_group_form->inputs() as $question_id => $input) {
                    $where_conditions    = [
                        'QST_ID' => $question_id,
                        'REG_ID' => $REG_ID,
                    ];
                    $possibly_new_values = [
                        'ANS_value' => $input->normalized_value(),
                    ];
                    $answer              = EEM_Answer::instance()->get_one([$where_conditions]);
                    if ($answer instanceof EE_Answer) {
                        $success = $answer->save($possibly_new_values);
                    } else {
                        // insert it then
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
     * generates HTML for the Registration main meta box
     *
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function _reg_attendees_meta_box()
    {
        $REG = $this->getRegistrationModel();
        // get all other registrations on this transaction, and cache
        // the attendees for them so we don't have to run another query using force_join
        $registrations                           = $REG->get_all(
            [
                [
                    'TXN_ID' => $this->_registration->transaction_ID(),
                    'REG_ID' => ['!=', $this->_registration->ID()],
                ],
                'force_join'               => ['Attendee'],
                'default_where_conditions' => 'other_models_only',
            ]
        );
        $this->_template_args['attendees']       = [];
        $this->_template_args['attendee_notice'] = '';
        if (
            empty($registrations)
            || (is_array($registrations)
                && ! EEH_Array::get_one_item_from_array($registrations))
        ) {
            EE_Error::add_error(
                esc_html__(
                    'There are no records attached to this registration. Something may have gone wrong with the registration',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $this->_template_args['attendee_notice'] = EE_Error::get_notices();
        } else {
            $att_nmbr = 1;
            foreach ($registrations as $registration) {
                /* @var $registration EE_Registration */
                $attendee                                                      = $registration->attendee()
                    ? $registration->attendee()
                    : $this->getAttendeeModel()->create_default_object();
                $this->_template_args['attendees'][ $att_nmbr ]['STS_ID']      = $registration->status_ID();
                $this->_template_args['attendees'][ $att_nmbr ]['fname']       = $attendee->fname();
                $this->_template_args['attendees'][ $att_nmbr ]['lname']       = $attendee->lname();
                $this->_template_args['attendees'][ $att_nmbr ]['email']       = $attendee->email();
                $this->_template_args['attendees'][ $att_nmbr ]['final_price'] = $registration->final_price();
                $this->_template_args['attendees'][ $att_nmbr ]['address']     = implode(
                    ', ',
                    $attendee->full_address_as_array()
                );
                $this->_template_args['attendees'][ $att_nmbr ]['att_link']    = self::add_query_args_and_nonce(
                    [
                        'action' => 'edit_attendee',
                        'post'   => $attendee->ID(),
                    ],
                    REG_ADMIN_URL
                );
                $this->_template_args['attendees'][ $att_nmbr ]['event_name']  =
                    $registration->event_obj() instanceof EE_Event
                        ? $registration->event_obj()->name()
                        : '';
                $att_nmbr++;
            }
            $this->_template_args['currency_sign'] = EE_Registry::instance()->CFG->currency->sign;
        }
        $template_path = REG_TEMPLATE_PATH . 'reg_admin_details_main_meta_box_attendees.template.php';
        EEH_Template::display_template($template_path, $this->_template_args);
    }


    /**
     * generates HTML for the Edit Registration side meta box
     *
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function _reg_registrant_side_meta_box()
    {
        /*@var $attendee EE_Attendee */
        $att_check = $this->_registration->attendee();
        $attendee  = $att_check instanceof EE_Attendee
            ? $att_check
            : $this->getAttendeeModel()->create_default_object();
        // now let's determine if this is not the primary registration.  If it isn't then we set the
        // primary_registration object for reference BUT ONLY if the Attendee object loaded is not the same as the
        // primary registration object (that way we know if we need to show create button or not)
        if (! $this->_registration->is_primary_registrant()) {
            $primary_registration = $this->_registration->get_primary_registration();
            $primary_attendee     = $primary_registration instanceof EE_Registration ? $primary_registration->attendee()
                : null;
            if (! $primary_attendee instanceof EE_Attendee || $attendee->ID() !== $primary_attendee->ID()) {
                // in here?  This means the displayed registration is not the primary registrant but ALREADY HAS its own
                // custom attendee object so let's not worry about the primary reg.
                $primary_registration = null;
            }
        } else {
            $primary_registration = null;
        }
        $this->_template_args['ATT_ID']            = $attendee->ID();
        $this->_template_args['fname']             = $attendee->fname();
        $this->_template_args['lname']             = $attendee->lname();
        $this->_template_args['email']             = $attendee->email();
        $this->_template_args['phone']             = $attendee->phone();
        $this->_template_args['formatted_address'] = EEH_Address::format($attendee);
        // edit link
        $this->_template_args['att_edit_link']  = EE_Admin_Page::add_query_args_and_nonce(
            [
                'action' => 'edit_attendee',
                'post'   => $attendee->ID(),
            ],
            REG_ADMIN_URL
        );
        $this->_template_args['att_edit_label'] = esc_html__('View/Edit Contact', 'event_espresso');
        // create link
        $this->_template_args['create_link']  = $primary_registration instanceof EE_Registration
            ? EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action'  => 'duplicate_attendee',
                    '_REG_ID' => $this->_registration->ID(),
                ],
                REG_ADMIN_URL
            ) : '';
        $this->_template_args['create_label'] = esc_html__('Create Contact', 'event_espresso');
        $this->_template_args['att_check']    = $att_check;
        $template_path                        =
            REG_TEMPLATE_PATH . 'reg_admin_details_side_meta_box_registrant.template.php';
        EEH_Template::display_template($template_path, $this->_template_args);
    }


    /**
     * trash or restore registrations
     *
     * @param boolean $trash whether to archive or restore
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws UnexpectedEntityException
     */
    protected function _trash_or_restore_registrations($trash = true)
    {
        // if empty _REG_ID then get out because there's nothing to do
        $REG_IDs = $this->request->getRequestParam('_REG_ID', [], 'int', true);
        if (empty($REG_IDs)) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'In order to %1$s registrations you must select which ones you wish to %1$s by clicking the checkboxes.',
                        'event_espresso'
                    ),
                    $trash ? 'trash' : 'restore'
                ),
                __FILE__,
                __LINE__,
                __FUNCTION__
            );
            $this->_redirect_after_action(false, '', '', [], true);
        }
        $success        = 0;
        $overwrite_msgs = false;
        // Checkboxes
        $reg_count = count($REG_IDs);
        // cycle thru checkboxes
        foreach ($REG_IDs as $REG_ID) {
            /** @var EE_Registration $REG */
            $REG      = $this->getRegistrationModel()->get_one_by_ID($REG_ID);
            $payments = $REG->registration_payments();
            if (! empty($payments)) {
                $name           = $REG->attendee() instanceof EE_Attendee
                    ? $REG->attendee()->full_name()
                    : esc_html__('Unknown Attendee', 'event_espresso');
                $overwrite_msgs = true;
                EE_Error::add_error(
                    sprintf(
                        esc_html__(
                            'The registration for %s could not be trashed because it has payments attached to the related transaction.  If you wish to trash this registration you must first delete the payments on the related transaction.',
                            'event_espresso'
                        ),
                        $name
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                // can't trash this registration because it has payments.
                continue;
            }
            $updated = $trash ? $REG->delete() : $REG->restore();
            if ($updated) {
                $success++;
            }
        }
        $this->_redirect_after_action(
            $success === $reg_count, // were ALL registrations affected?
            $success > 1
                ? esc_html__('Registrations', 'event_espresso')
                : esc_html__('Registration', 'event_espresso'),
            $trash
                ? esc_html__('moved to the trash', 'event_espresso')
                : esc_html__('restored', 'event_espresso'),
            $this->mergeExistingRequestParamsWithRedirectArgs(['action' => 'default']),
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
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _delete_registrations()
    {
        $REG_MDL = $this->getRegistrationModel();
        $success = 0;
        // Checkboxes
        $REG_IDs = $this->request->getRequestParam('_REG_ID', [], 'int', true);

        if (! empty($REG_IDs)) {
            // if array has more than one element than success message should be plural
            $success = count($REG_IDs) > 1 ? 2 : 1;
            // cycle thru checkboxes
            foreach ($REG_IDs as $REG_ID) {
                $REG = $REG_MDL->get_one_by_ID($REG_ID);
                if (! $REG instanceof EE_Registration) {
                    continue;
                }
                $deleted = $this->_delete_registration($REG);
                if (! $deleted) {
                    $success = 0;
                }
            }
        }

        $what        = $success > 1
            ? esc_html__('Registrations', 'event_espresso')
            : esc_html__('Registration', 'event_espresso');
        $action_desc = esc_html__('permanently deleted.', 'event_espresso');
        $this->_redirect_after_action(
            $success,
            $what,
            $action_desc,
            $this->mergeExistingRequestParamsWithRedirectArgs(['action' => 'default']),
            true
        );
    }


    /**
     * handles the permanent deletion of a registration.  See comments with _delete_registrations() for details on what
     * models get affected.
     *
     * @param EE_Registration $REG registration to be deleted permanently
     * @return bool true = successful deletion, false = fail.
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _delete_registration(EE_Registration $REG)
    {
        // first we start with the transaction... ultimately, we WILL not delete permanently if there are any related
        // registrations on the transaction that are NOT trashed.
        $TXN = $REG->get_first_related('Transaction');
        if (! $TXN instanceof EE_Transaction) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'Unable to permanently delete registration %d because its related transaction has already been deleted. If you can restore the related transaction to the database then this registration can be deleted.',
                        'event_espresso'
                    ),
                    $REG->id()
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        $REGS        = $TXN->get_many_related('Registration');
        $all_trashed = true;
        foreach ($REGS as $registration) {
            if (! $registration->get('REG_deleted')) {
                $all_trashed = false;
            }
        }
        if (! $all_trashed) {
            EE_Error::add_error(
                esc_html__(
                    'Unable to permanently delete this registration. Before this registration can be permanently deleted, all registrations made in the same transaction must be trashed as well.  These registrations will be permanently deleted in the same action.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        // k made it here so that means we can delete all the related transactions and their answers (but let's do them
        // separately from THIS one).
        foreach ($REGS as $registration) {
            // delete related answers
            $registration->delete_related_permanently('Answer');
            // remove relationship to EE_Attendee (but we ALWAYS leave the contact record intact)
            $attendee = $registration->get_first_related('Attendee');
            if ($attendee instanceof EE_Attendee) {
                $registration->_remove_relation_to($attendee, 'Attendee');
            }
            // now remove relationships to tickets on this registration.
            $registration->_remove_relations('Ticket');
            // now delete permanently the checkins related to this registration.
            $registration->delete_related_permanently('Checkin');
            if ($registration->ID() === $REG->ID()) {
                continue;
            } //we don't want to delete permanently the existing registration just yet.
            // remove relation to transaction for these registrations if NOT the existing registrations
            $registration->_remove_relations('Transaction');
            // delete permanently any related messages.
            $registration->delete_related_permanently('Message');
            // now delete this registration permanently
            $registration->delete_permanently();
        }
        // now all related registrations on the transaction are handled.  So let's just handle this registration itself
        // (the transaction and line items should be all that's left).
        // delete the line items related to the transaction for this registration.
        $TXN->delete_related_permanently('Line_Item');
        // we need to remove all the relationships on the transaction
        $TXN->delete_related_permanently('Payment');
        $TXN->delete_related_permanently('Extra_Meta');
        $TXN->delete_related_permanently('Message');
        // now we can delete this REG permanently (and the transaction of course)
        $REG->delete_related_permanently('Transaction');
        return $REG->delete_permanently();
    }


    /**
     *    generates HTML for the Register New Attendee Admin page
     *
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function new_registration()
    {
        if (! $this->_set_reg_event()) {
            throw new EE_Error(
                esc_html__(
                    'Unable to continue with registering because there is no Event ID in the request',
                    'event_espresso'
                )
            );
        }
        /** @var CurrentPage $current_page */
        $current_page = $this->loader->getShared(CurrentPage::class);
        $current_page->setEspressoPage(true);
        // gotta start with a clean slate if we're not coming here via ajax
        if (
            ! $this->request->isAjax()
            && (
                ! $this->request->requestParamIsSet('processing_registration')
                || $this->request->requestParamIsSet('step_error')
            )
        ) {
            EE_Registry::instance()->SSN->clear_session(__CLASS__, __FUNCTION__);
        }
        $this->_template_args['event_name'] = '';
        // event name
        if ($this->_reg_event) {
            $this->_template_args['event_name'] = $this->_reg_event->name();
            $edit_event_url                     = self::add_query_args_and_nonce(
                [
                    'action' => 'edit',
                    'post'   => $this->_reg_event->ID(),
                ],
                EVENTS_ADMIN_URL
            );
            $edit_event_lnk                     = '<a href="'
                                                  . $edit_event_url
                                                  . '" aria-label="'
                                                  . esc_attr__('Edit ', 'event_espresso')
                                                  . $this->_reg_event->name()
                                                  . '">'
                                                  . esc_html__('Edit Event', 'event_espresso')
                                                  . '</a>';
            $this->_template_args['event_name'] .= ' <span class="admin-page-header-edit-lnk not-bold">'
                                                   . $edit_event_lnk
                                                   . '</span>';
        }
        $this->_template_args['step_content'] = $this->_get_registration_step_content();
        if ($this->request->isAjax()) {
            $this->_return_json();
        }
        // grab header
        $template_path                              =
            REG_TEMPLATE_PATH . 'reg_admin_register_new_attendee.template.php';
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            $template_path,
            $this->_template_args,
            true
        );
        // $this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
        // the details template wrapper
        $this->display_admin_page_with_sidebar();
    }


    /**
     * This returns the content for a registration step
     *
     * @return string html
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _get_registration_step_content()
    {
        if (isset($_COOKIE['ee_registration_added']) && $_COOKIE['ee_registration_added']) {
            $warning_msg = sprintf(
                esc_html__(
                    '%2$sWARNING!!!%3$s%1$sPlease do not use the back button to return to this page for the purpose of adding another registration.%1$sThis can result in lost and/or corrupted data.%1$sIf you wish to add another registration, then please click the%1$s%7$s"Add Another New Registration to Event"%8$s button%1$son the Transaction details page, after you are redirected.%1$s%1$s%4$s redirecting in %5$s seconds %6$s',
                    'event_espresso'
                ),
                '<br />',
                '<h3 class="important-notice">',
                '</h3>',
                '<div class="float-right">',
                '<span id="redirect_timer" class="important-notice">30</span>',
                '</div>',
                '<b>',
                '</b>'
            );
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
        $template_args = [
            'title'                    => '',
            'content'                  => '',
            'step_button_text'         => '',
            'show_notification_toggle' => false,
        ];
        // to indicate we're processing a new registration
        $hidden_fields = [
            'processing_registration' => [
                'type'  => 'hidden',
                'value' => 0,
            ],
            'event_id'                => [
                'type'  => 'hidden',
                'value' => $this->_reg_event->ID(),
            ],
        ];
        // if the cart is empty then we know we're at step one, so we'll display the ticket selector
        $cart = EE_Registry::instance()->SSN->cart();
        $step = ! $cart instanceof EE_Cart ? 'ticket' : 'questions';
        switch ($step) {
            case 'ticket':
                $hidden_fields['processing_registration']['value'] = 1;
                $template_args['title']                            = esc_html__(
                    'Step One: Select the Ticket for this registration',
                    'event_espresso'
                );
                $template_args['content']                          =
                    EED_Ticket_Selector::instance()->display_ticket_selector($this->_reg_event);
                $template_args['content']                          .= '</div>';
                $template_args['step_button_text']                 = esc_html__(
                    'Add Tickets and Continue to Registrant Details',
                    'event_espresso'
                );
                $template_args['show_notification_toggle']         = false;
                break;
            case 'questions':
                $hidden_fields['processing_registration']['value'] = 2;
                $template_args['title']                            = esc_html__(
                    'Step Two: Add Registrant Details for this Registration',
                    'event_espresso'
                );
                // in theory, we should be able to run EED_SPCO at this point
                // because the cart should have been set up properly by the first process_reg_step run.
                $template_args['content']                  =
                    EED_Single_Page_Checkout::registration_checkout_for_admin();
                $template_args['step_button_text']         = esc_html__(
                    'Save Registration and Continue to Details',
                    'event_espresso'
                );
                $template_args['show_notification_toggle'] = true;
                break;
        }
        // we come back to the process_registration_step route.
        $this->_set_add_edit_form_tags('process_reg_step', $hidden_fields);
        return EEH_Template::display_template(
            REG_TEMPLATE_PATH . 'reg_admin_register_new_attendee_step_content.template.php',
            $template_args,
            true
        );
    }


    /**
     * set_reg_event
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function _set_reg_event()
    {
        if (is_object($this->_reg_event)) {
            return true;
        }

        $EVT_ID = $this->request->getRequestParam('event_id', 0, 'int');
        if (! $EVT_ID) {
            return false;
        }
        $this->_reg_event = $this->getEventModel()->get_one_by_ID($EVT_ID);
        return true;
    }


    /**
     * process_reg_step
     *
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    public function process_reg_step()
    {
        EE_System::do_not_cache();
        $this->_set_reg_event();
        /** @var CurrentPage $current_page */
        $current_page = $this->loader->getShared(CurrentPage::class);
        $current_page->setEspressoPage(true);
        $this->request->setRequestParam('uts', time());
        // what step are we on?
        $cart = EE_Registry::instance()->SSN->cart();
        $step = ! $cart instanceof EE_Cart ? 'ticket' : 'questions';
        // if doing ajax then we need to verify the nonce
        if ($this->request->isAjax()) {
            $nonce = $this->request->getRequestParam($this->_req_nonce, '');
            $this->_verify_nonce($nonce, $this->_req_nonce);
        }
        switch ($step) {
            case 'ticket':
                // process ticket selection
                $success = EED_Ticket_Selector::instance()->process_ticket_selections();
                if ($success) {
                    EE_Error::add_success(
                        esc_html__(
                            'Tickets Selected. Now complete the registration.',
                            'event_espresso'
                        )
                    );
                } else {
                    $this->request->setRequestParam('step_error', true);
                    $query_args['step_error'] = $this->request->getRequestParam('step_error', true, 'bool');
                }
                if ($this->request->isAjax()) {
                    $this->new_registration(); // display next step
                } else {
                    $query_args = [
                        'action'                  => 'new_registration',
                        'processing_registration' => 1,
                        'event_id'                => $this->_reg_event->ID(),
                        'uts'                     => time(),
                    ];
                    $this->_redirect_after_action(
                        false,
                        '',
                        '',
                        $query_args,
                        true
                    );
                }
                break;
            case 'questions':
                if (! $this->request->requestParamIsSet('txn_reg_status_change[send_notifications]')) {
                    add_filter('FHEE__EED_Messages___maybe_registration__deliver_notifications', '__return_false', 15);
                }
                // process registration
                $transaction = EED_Single_Page_Checkout::instance()->process_registration_from_admin();
                if ($cart instanceof EE_Cart) {
                    $grand_total = $cart->get_grand_total();
                    if ($grand_total instanceof EE_Line_Item) {
                        $grand_total->save_this_and_descendants_to_txn();
                    }
                }
                if (! $transaction instanceof EE_Transaction) {
                    $query_args = [
                        'action'                  => 'new_registration',
                        'processing_registration' => 2,
                        'event_id'                => $this->_reg_event->ID(),
                        'uts'                     => time(),
                    ];
                    if ($this->request->isAjax()) {
                        // display registration form again because there are errors (maybe validation?)
                        $this->new_registration();
                        return;
                    }
                    $this->_redirect_after_action(
                        false,
                        '',
                        '',
                        $query_args,
                        true
                    );
                    return;
                }
                // maybe update status, and make sure to save transaction if not done already
                if (! $transaction->update_status_based_on_total_paid()) {
                    $transaction->save();
                }
                EE_Registry::instance()->SSN->clear_session(__CLASS__, __FUNCTION__);
                $query_args = [
                    'action'        => 'redirect_to_txn',
                    'TXN_ID'        => $transaction->ID(),
                    'EVT_ID'        => $this->_reg_event->ID(),
                    'event_name'    => urlencode($this->_reg_event->name()),
                    'redirect_from' => 'new_registration',
                ];
                $this->_redirect_after_action(false, '', '', $query_args, true);
                break;
        }
        // what are you looking here for?  Should be nothing to do at this point.
    }


    /**
     * redirect_to_txn
     *
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function redirect_to_txn()
    {
        EE_System::do_not_cache();
        EE_Registry::instance()->SSN->clear_session(__CLASS__, __FUNCTION__);
        $query_args = [
            'action' => 'view_transaction',
            'TXN_ID' => $this->request->getRequestParam('TXN_ID', 0, 'int'),
            'page'   => 'espresso_transactions',
        ];
        if ($this->request->requestParamIsSet('EVT_ID') && $this->request->requestParamIsSet('redirect_from')) {
            $query_args['EVT_ID']        = $this->request->getRequestParam('EVT_ID', 0, 'int');
            $query_args['event_name']    = urlencode($this->request->getRequestParam('event_name'));
            $query_args['redirect_from'] = $this->request->getRequestParam('redirect_from');
        }
        EE_Error::add_success(
            esc_html__(
                'Registration Created.  Please review the transaction and add any payments as necessary',
                'event_espresso'
            )
        );
        $this->_redirect_after_action(false, '', '', $query_args, true);
    }


    /**
     * generates HTML for the Attendee Contact List
     *
     * @return void
     * @throws DomainException
     * @throws EE_Error
     */
    protected function _attendee_contact_list_table()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $this->_search_btn_label = esc_html__('Contacts', 'event_espresso');
        $this->display_admin_list_table_page_with_no_sidebar();
    }


    /**
     * get_attendees
     *
     * @param      $per_page
     * @param bool $count whether to return count or data.
     * @param bool $trash
     * @return array|int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get_attendees($per_page, $count = false, $trash = false)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        require_once(REG_ADMIN . 'EE_Attendee_Contact_List_Table.class.php');
        $orderby = $this->request->getRequestParam('orderby');
        switch ($orderby) {
            case 'ATT_ID':
            case 'ATT_fname':
            case 'ATT_email':
            case 'ATT_city':
            case 'STA_ID':
            case 'CNT_ID':
                break;
            case 'Registration_Count':
                $orderby = 'Registration_Count';
                break;
            default:
                $orderby = 'ATT_lname';
        }
        $sort         = $this->request->getRequestParam('order', 'ASC');
        $current_page = $this->request->getRequestParam('paged', 1, 'int');
        $per_page     = absint($per_page) ? $per_page : 10;
        $per_page     = $this->request->getRequestParam('perpage', $per_page, 'int');
        $_where       = [];
        $search_term  = $this->request->getRequestParam('s');
        if ($search_term) {
            $search_term  = '%' . $search_term . '%';
            $_where['OR'] = [
                'Registration.Event.EVT_name'       => ['LIKE', $search_term],
                'Registration.Event.EVT_desc'       => ['LIKE', $search_term],
                'Registration.Event.EVT_short_desc' => ['LIKE', $search_term],
                'ATT_fname'                         => ['LIKE', $search_term],
                'ATT_lname'                         => ['LIKE', $search_term],
                'ATT_short_bio'                     => ['LIKE', $search_term],
                'ATT_email'                         => ['LIKE', $search_term],
                'ATT_address'                       => ['LIKE', $search_term],
                'ATT_address2'                      => ['LIKE', $search_term],
                'ATT_city'                          => ['LIKE', $search_term],
                'Country.CNT_name'                  => ['LIKE', $search_term],
                'State.STA_name'                    => ['LIKE', $search_term],
                'ATT_phone'                         => ['LIKE', $search_term],
                'Registration.REG_final_price'      => ['LIKE', $search_term],
                'Registration.REG_code'             => ['LIKE', $search_term],
                'Registration.REG_group_size'       => ['LIKE', $search_term],
            ];
        }
        $offset     = ($current_page - 1) * $per_page;
        $limit      = $count ? null : [$offset, $per_page];
        $query_args = [
            $_where,
            'extra_selects' => ['Registration_Count' => ['Registration.REG_ID', 'count', '%d']],
            'limit'         => $limit,
        ];
        if (! $count) {
            $query_args['order_by'] = [$orderby => $sort];
        }
        $query_args[0]['status'] = $trash ? ['!=', 'publish'] : ['IN', ['publish']];
        return $count
            ? $this->getAttendeeModel()->count($query_args, 'ATT_ID', true)
            : $this->getAttendeeModel()->get_all($query_args);
    }


    /**
     * This is just taking care of resending the registration confirmation
     *
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _resend_registration()
    {
        $this->_process_resend_registration();
        $REG_ID      = $this->request->getRequestParam('_REG_ID', 0, 'int');
        $redirect_to = $this->request->getRequestParam('redirect_to');
        $query_args  = $redirect_to
            ? ['action' => $redirect_to, '_REG_ID' => $REG_ID]
            : ['action' => 'default'];
        $this->_redirect_after_action(false, '', '', $query_args, true);
    }


    /**
     * Creates a registration report, but accepts the name of a method to use for preparing the query parameters
     * to use when selecting registrations
     *
     * @param string $method_name_for_getting_query_params the name of the method (on this class) to use for preparing
     *                                                     the query parameters from the request
     * @return void ends the request with a redirect or download
     */
    public function _registrations_report_base($method_name_for_getting_query_params)
    {
        $EVT_ID = $this->request->requestParamIsSet('EVT_ID')
            ? $this->request->getRequestParam('EVT_ID', 0, 'int')
            : null;
        if (! defined('EE_USE_OLD_CSV_REPORT_CLASS')) {
            $filters = $this->request->getRequestParam('filters', [], DataType::STRING, true);
            $report_params  = $this->$method_name_for_getting_query_params($filters);
            wp_redirect(
                EE_Admin_Page::add_query_args_and_nonce(
                    [
                        'page'        => 'espresso_batch',
                        'batch'       => 'file',
                        'EVT_ID'      => $EVT_ID,
                        'job_handler' => urlencode('EventEspressoBatchRequest\JobHandlers\RegistrationsReport'),
                        'return_url'  => urlencode($this->request->getRequestParam('return_url', '', DataType::URL)),
                        'filters'     => urlencode(serialize($report_params)),
                        'use_filters' => $this->request->getRequestParam('use_filters', false, DataType::BOOL)
                    ]
                )
            );
        } else {
            // Pull the current request params
            $request_args = $this->request->requestParams();
            // Set the required request_args to be passed to the export
            $required_request_args = [
                'export' => 'report',
                'action' => 'registrations_report_for_event',
                'EVT_ID' => $EVT_ID,
            ];
            // Merge required request args, overriding any currently set
            $request_args = array_merge($request_args, $required_request_args);
            if (is_readable(EE_CLASSES . 'EE_Export.class.php')) {
                require_once(EE_CLASSES . 'EE_Export.class.php');
                $EE_Export = EE_Export::instance($request_args);
                $EE_Export->export();
            }
        }
    }


    /**
     * Creates a registration report using only query parameters in the request
     *
     * @return void
     */
    public function _registrations_report()
    {
        $this->_registrations_report_base('_get_registration_query_parameters');
    }


    public function _contact_list_export()
    {
        if (is_readable(EE_CLASSES . 'EE_Export.class.php')) {
            require_once(EE_CLASSES . 'EE_Export.class.php');
            $EE_Export = EE_Export::instance($this->request->requestParams());
            $EE_Export->export_attendees();
        }
    }


    public function _contact_list_report()
    {
        if (! defined('EE_USE_OLD_CSV_REPORT_CLASS')) {
            wp_redirect(
                EE_Admin_Page::add_query_args_and_nonce(
                    [
                        'page'        => 'espresso_batch',
                        'batch'       => 'file',
                        'job_handler' => urlencode('EventEspressoBatchRequest\JobHandlers\AttendeesReport'),
                        'return_url'  => urlencode($this->request->getRequestParam('return_url', '', 'url')),
                    ]
                )
            );
        } else {
            if (is_readable(EE_CLASSES . 'EE_Export.class.php')) {
                require_once(EE_CLASSES . 'EE_Export.class.php');
                $EE_Export = EE_Export::instance($this->request->requestParams());
                $EE_Export->report_attendees();
            }
        }
    }





    /***************************************        ATTENDEE DETAILS        ***************************************/
    /**
     * This duplicates the attendee object for the given incoming registration id and attendee_id.
     *
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _duplicate_attendee()
    {
        $REG_ID = $this->request->getRequestParam('_REG_ID', 0, 'int');
        $action = $this->request->getRequestParam('return', 'default');
        // verify we have necessary info
        if (! $REG_ID) {
            EE_Error::add_error(
                esc_html__(
                    'Unable to create the contact for the registration because the required parameters are not present (_REG_ID )',
                    'event_espresso'
                ),
                __FILE__,
                __LINE__,
                __FUNCTION__
            );
            $query_args = ['action' => $action];
            $this->_redirect_after_action('', '', '', $query_args, true);
        }
        // okay necessary deets present... let's dupe the incoming attendee and attach to incoming registration.
        $registration = $this->getRegistrationModel()->get_one_by_ID($REG_ID);
        if (! $registration instanceof EE_Registration) {
            throw new RuntimeException(
                sprintf(
                    esc_html__(
                        'Unable to create the contact because a valid registration could not be retrieved for REG ID: %1$d',
                        'event_espresso'
                    ),
                    $REG_ID
                )
            );
        }
        $attendee = $registration->attendee();
        // remove relation of existing attendee on registration
        $registration->_remove_relation_to($attendee, 'Attendee');
        // new attendee
        $new_attendee = clone $attendee;
        $new_attendee->set('ATT_ID', 0);
        $new_attendee->save();
        // add new attendee to reg
        $registration->_add_relation_to($new_attendee, 'Attendee');
        EE_Error::add_success(
            esc_html__(
                'New Contact record created.  Now make any edits you wish to make for this contact.',
                'event_espresso'
            )
        );
        // redirect to edit page for attendee
        $query_args = ['post' => $new_attendee->ID(), 'action' => 'edit_attendee'];
        $this->_redirect_after_action('', '', '', $query_args, true);
    }


    /**
     * Callback invoked by parent EE_Admin_CPT class hooked in on `save_post` wp hook.
     *
     * @param int     $post_id
     * @param WP_Post $post
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws LogicException
     * @throws InvalidFormSubmissionException
     * @throws ReflectionException
     */
    protected function _insert_update_cpt_item($post_id, $post)
    {
        $success  = true;
        $attendee = $post instanceof WP_Post && $post->post_type === 'espresso_attendees'
            ? $this->getAttendeeModel()->get_one_by_ID($post_id)
            : null;
        // for attendee updates
        if ($attendee instanceof EE_Attendee) {
            // note we should only be UPDATING attendees at this point.
            $fname          = $this->request->getRequestParam('ATT_fname', '');
            $lname          = $this->request->getRequestParam('ATT_lname', '');
            $updated_fields = [
                'ATT_fname'     => $fname,
                'ATT_lname'     => $lname,
                'ATT_full_name' => "{$fname} {$lname}",
                'ATT_address'   => $this->request->getRequestParam('ATT_address', ''),
                'ATT_address2'  => $this->request->getRequestParam('ATT_address2', ''),
                'ATT_city'      => $this->request->getRequestParam('ATT_city', ''),
                'STA_ID'        => $this->request->getRequestParam('STA_ID', ''),
                'CNT_ISO'       => $this->request->getRequestParam('CNT_ISO', ''),
                'ATT_zip'       => $this->request->getRequestParam('ATT_zip', ''),
            ];
            foreach ($updated_fields as $field => $value) {
                $attendee->set($field, $value);
            }

            // process contact details metabox form handler (which will also save the attendee)
            $contact_details_form = $this->getAttendeeContactDetailsMetaboxFormHandler($attendee);
            $success              = $contact_details_form->process($this->request->requestParams());

            $attendee_update_callbacks = apply_filters(
                'FHEE__Registrations_Admin_Page__insert_update_cpt_item__attendee_update',
                []
            );
            foreach ($attendee_update_callbacks as $a_callback) {
                if (false === call_user_func_array($a_callback, [$attendee, $this->request->requestParams()])) {
                    throw new EE_Error(
                        sprintf(
                            esc_html__(
                                'The %s callback given for the "FHEE__Registrations_Admin_Page__insert_update_cpt_item__attendee_update" filter is not a valid callback.  Please check the spelling.',
                                'event_espresso'
                            ),
                            $a_callback
                        )
                    );
                }
            }
        }

        if ($success === false) {
            EE_Error::add_error(
                esc_html__(
                    'Something went wrong with updating the meta table data for the registration.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
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


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @since 4.10.2.p
     */
    public function attendee_editor_metaboxes()
    {
        $this->verify_cpt_object();
        remove_meta_box(
            'postexcerpt',
            $this->_cpt_routes[ $this->_req_action ],
            'normal'
        );
        remove_meta_box('commentstatusdiv', $this->_cpt_routes[ $this->_req_action ], 'normal');
        if (post_type_supports('espresso_attendees', 'excerpt')) {
            add_meta_box(
                'postexcerpt',
                esc_html__('Short Biography', 'event_espresso'),
                'post_excerpt_meta_box',
                $this->_cpt_routes[ $this->_req_action ],
                'normal'
            );
        }
        if (post_type_supports('espresso_attendees', 'comments')) {
            add_meta_box(
                'commentsdiv',
                esc_html__('Notes on the Contact', 'event_espresso'),
                'post_comment_meta_box',
                $this->_cpt_routes[ $this->_req_action ],
                'normal',
                'core'
            );
        }
        add_meta_box(
            'attendee_contact_info',
            esc_html__('Contact Info', 'event_espresso'),
            [$this, 'attendee_contact_info'],
            $this->_cpt_routes[ $this->_req_action ],
            'side',
            'core'
        );
        add_meta_box(
            'attendee_details_address',
            esc_html__('Address Details', 'event_espresso'),
            [$this, 'attendee_address_details'],
            $this->_cpt_routes[ $this->_req_action ],
            'normal',
            'core'
        );
        add_meta_box(
            'attendee_registrations',
            esc_html__('Registrations for this Contact', 'event_espresso'),
            [$this, 'attendee_registrations_meta_box'],
            $this->_cpt_routes[ $this->_req_action ],
            'normal',
            'high'
        );
    }


    /**
     * Metabox for attendee contact info
     *
     * @param WP_Post $post wp post object
     * @return void attendee contact info ( and form )
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws LogicException
     * @throws DomainException
     */
    public function attendee_contact_info($post)
    {
        // get attendee object ( should already have it )
        $form = $this->getAttendeeContactDetailsMetaboxFormHandler($this->_cpt_model_obj);
        $form->enqueueStylesAndScripts();
        echo wp_kses($form->display(), AllowedTags::getWithFormTags());
    }


    /**
     * Return form handler for the contact details metabox
     *
     * @param EE_Attendee $attendee
     * @return AttendeeContactDetailsMetaboxFormHandler
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function getAttendeeContactDetailsMetaboxFormHandler(EE_Attendee $attendee)
    {
        return new AttendeeContactDetailsMetaboxFormHandler($attendee, EE_Registry::instance());
    }


    /**
     * Metabox for attendee details
     *
     * @param WP_Post $post wp post object
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function attendee_address_details($post)
    {
        // get attendee object (should already have it)
        $this->_template_args['attendee']     = $this->_cpt_model_obj;
        $this->_template_args['state_html']   = EEH_Form_Fields::generate_form_input(
            new EE_Question_Form_Input(
                EE_Question::new_instance(
                    [
                        'QST_ID'           => 0,
                        'QST_display_text' => esc_html__('State/Province', 'event_espresso'),
                        'QST_system'       => 'admin-state',
                    ]
                ),
                EE_Answer::new_instance(
                    [
                        'ANS_ID'    => 0,
                        'ANS_value' => $this->_cpt_model_obj->state_ID(),
                    ]
                ),
                [
                    'input_id'       => 'STA_ID',
                    'input_name'     => 'STA_ID',
                    'input_prefix'   => '',
                    'append_qstn_id' => false,
                ]
            )
        );
        $this->_template_args['country_html'] = EEH_Form_Fields::generate_form_input(
            new EE_Question_Form_Input(
                EE_Question::new_instance(
                    [
                        'QST_ID'           => 0,
                        'QST_display_text' => esc_html__('Country', 'event_espresso'),
                        'QST_system'       => 'admin-country',
                    ]
                ),
                EE_Answer::new_instance(
                    [
                        'ANS_ID'    => 0,
                        'ANS_value' => $this->_cpt_model_obj->country_ID(),
                    ]
                ),
                [
                    'input_id'       => 'CNT_ISO',
                    'input_name'     => 'CNT_ISO',
                    'input_prefix'   => '',
                    'append_qstn_id' => false,
                ]
            )
        );
        $template                             =
            REG_TEMPLATE_PATH . 'attendee_address_details_metabox_content.template.php';
        EEH_Template::display_template($template, $this->_template_args);
    }


    /**
     * _attendee_details
     *
     * @param $post
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function attendee_registrations_meta_box($post)
    {
        $this->_template_args['attendee']      = $this->_cpt_model_obj;
        $this->_template_args['registrations'] = $this->_cpt_model_obj->get_many_related('Registration');
        $template                              =
            REG_TEMPLATE_PATH . 'attendee_registrations_main_meta_box.template.php';
        EEH_Template::display_template($template, $this->_template_args);
    }


    /**
     * add in the form fields for the attendee edit
     *
     * @param WP_Post $post wp post object
     * @return void echos html for new form.
     * @throws DomainException
     */
    public function after_title_form_fields($post)
    {
        if ($post->post_type === 'espresso_attendees') {
            $template                  = REG_TEMPLATE_PATH . 'attendee_details_after_title_form_fields.template.php';
            $template_args['attendee'] = $this->_cpt_model_obj;
            EEH_Template::display_template($template, $template_args);
        }
    }


    /**
     * _trash_or_restore_attendee
     *
     * @param boolean $trash - whether to move item to trash (TRUE) or restore it (FALSE)
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _trash_or_restore_attendees($trash = true)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $status = $trash ? 'trash' : 'publish';
        // Checkboxes
        if ($this->request->requestParamIsSet('checkbox')) {
            $ATT_IDs = $this->request->getRequestParam('checkbox', [], 'int', true);
            // if array has more than one element than success message should be plural
            $success = count($ATT_IDs) > 1 ? 2 : 1;
            // cycle thru checkboxes
            foreach ($ATT_IDs as $ATT_ID) {
                $updated = $this->getAttendeeModel()->update_by_ID(['status' => $status], $ATT_ID);
                if (! $updated) {
                    $success = 0;
                }
            }
        } else {
            // grab single id and delete
            $ATT_ID = $this->request->getRequestParam('ATT_ID', 0, 'int');
            // update attendee
            $success = $this->getAttendeeModel()->update_by_ID(['status' => $status], $ATT_ID) ? 1 : 0;
        }
        $what        = $success > 1
            ? esc_html__('Contacts', 'event_espresso')
            : esc_html__('Contact', 'event_espresso');
        $action_desc = $trash
            ? esc_html__('moved to the trash', 'event_espresso')
            : esc_html__('restored', 'event_espresso');
        $this->_redirect_after_action($success, $what, $action_desc, ['action' => 'contact_list']);
    }
}

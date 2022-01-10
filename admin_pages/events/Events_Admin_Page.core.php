<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\orm\tree_traversal\NodeGroupDao;

/**
 * Events_Admin_Page
 * This contains the logic for setting up the Events related pages.
 * Any methods without phpdoc comments have inline docs with parent class.
 *
 * @package         Events_Admin_Page
 * @subpackage      includes/core/admin/Events_Admin_Page.core.php
 * @author          Darren Ethier
 */
class Events_Admin_Page extends EE_Admin_Page_CPT
{

    /**
     * This will hold the event object for event_details screen.
     *
     * @var EE_Event $_event
     */
    protected $_event;


    /**
     * This will hold the category object for category_details screen.
     *
     * @var stdClass $_category
     */
    protected $_category;


    /**
     * This will hold the event model instance
     *
     * @var EEM_Event $_event_model
     */
    protected $_event_model;


    /**
     * @var EE_Event
     */
    protected $_cpt_model_obj = false;


    /**
     * @var NodeGroupDao
     */
    protected $model_obj_node_group_persister;


    /**
     * Initialize page props for this admin page group.
     */
    protected function _init_page_props()
    {
        $this->page_slug        = EVENTS_PG_SLUG;
        $this->page_label       = EVENTS_LABEL;
        $this->_admin_base_url  = EVENTS_ADMIN_URL;
        $this->_admin_base_path = EVENTS_ADMIN;
        $this->_cpt_model_names = [
            'create_new' => 'EEM_Event',
            'edit'       => 'EEM_Event',
        ];
        $this->_cpt_edit_routes = [
            'espresso_events' => 'edit',
        ];
        add_action(
            'AHEE__EE_Admin_Page_CPT__set_model_object__after_set_object',
            [$this, 'verify_event_edit'],
            10,
            2
        );
    }


    /**
     * Sets the ajax hooks used for this admin page group.
     */
    protected function _ajax_hooks()
    {
        add_action('wp_ajax_ee_save_timezone_setting', [$this, 'saveTimezoneString']);
    }


    /**
     * Sets the page properties for this admin page group.
     */
    protected function _define_page_props()
    {
        $this->_admin_page_title = EVENTS_LABEL;
        $this->_labels           = [
            'buttons'      => [
                'add'             => esc_html__('Add New Event', 'event_espresso'),
                'edit'            => esc_html__('Edit Event', 'event_espresso'),
                'delete'          => esc_html__('Delete Event', 'event_espresso'),
                'add_category'    => esc_html__('Add New Category', 'event_espresso'),
                'edit_category'   => esc_html__('Edit Category', 'event_espresso'),
                'delete_category' => esc_html__('Delete Category', 'event_espresso'),
            ],
            'editor_title' => [
                'espresso_events' => esc_html__('Enter event title here', 'event_espresso'),
            ],
            'publishbox'   => [
                'create_new'        => esc_html__('Save New Event', 'event_espresso'),
                'edit'              => esc_html__('Update Event', 'event_espresso'),
                'add_category'      => esc_html__('Save New Category', 'event_espresso'),
                'edit_category'     => esc_html__('Update Category', 'event_espresso'),
                'template_settings' => esc_html__('Update Settings', 'event_espresso'),
            ],
        ];
    }


    /**
     * Sets the page routes property for this admin page group.
     */
    protected function _set_page_routes()
    {
        // load formatter helper
        // load field generator helper
        // is there a evt_id in the request?
        $EVT_ID = $this->request->getRequestParam('EVT_ID', 0, 'int');
        $EVT_ID = $this->request->getRequestParam('post', $EVT_ID, 'int');

        $this->_page_routes = [
            'default'                       => [
                'func'       => '_events_overview_list_table',
                'capability' => 'ee_read_events',
            ],
            'create_new'                    => [
                'func'       => '_create_new_cpt_item',
                'capability' => 'ee_edit_events',
            ],
            'edit'                          => [
                'func'       => '_edit_cpt_item',
                'capability' => 'ee_edit_event',
                'obj_id'     => $EVT_ID,
            ],
            'copy_event'                    => [
                'func'       => '_copy_events',
                'capability' => 'ee_edit_event',
                'obj_id'     => $EVT_ID,
                'noheader'   => true,
            ],
            'trash_event'                   => [
                'func'       => '_trash_or_restore_event',
                'args'       => ['event_status' => 'trash'],
                'capability' => 'ee_delete_event',
                'obj_id'     => $EVT_ID,
                'noheader'   => true,
            ],
            'trash_events'                  => [
                'func'       => '_trash_or_restore_events',
                'args'       => ['event_status' => 'trash'],
                'capability' => 'ee_delete_events',
                'noheader'   => true,
            ],
            'restore_event'                 => [
                'func'       => '_trash_or_restore_event',
                'args'       => ['event_status' => 'draft'],
                'capability' => 'ee_delete_event',
                'obj_id'     => $EVT_ID,
                'noheader'   => true,
            ],
            'restore_events'                => [
                'func'       => '_trash_or_restore_events',
                'args'       => ['event_status' => 'draft'],
                'capability' => 'ee_delete_events',
                'noheader'   => true,
            ],
            'delete_event'                  => [
                'func'       => '_delete_event',
                'capability' => 'ee_delete_event',
                'obj_id'     => $EVT_ID,
                'noheader'   => true,
            ],
            'delete_events'                 => [
                'func'       => '_delete_events',
                'capability' => 'ee_delete_events',
                'noheader'   => true,
            ],
            'view_report'                   => [
                'func'       => '_view_report',
                'capability' => 'ee_edit_events',
            ],
            'default_event_settings'        => [
                'func'       => '_default_event_settings',
                'capability' => 'manage_options',
            ],
            'update_default_event_settings' => [
                'func'       => '_update_default_event_settings',
                'capability' => 'manage_options',
                'noheader'   => true,
            ],
            'template_settings'             => [
                'func'       => '_template_settings',
                'capability' => 'manage_options',
            ],
            // event category tab related
            'add_category'                  => [
                'func'       => '_category_details',
                'capability' => 'ee_edit_event_category',
                'args'       => ['add'],
            ],
            'edit_category'                 => [
                'func'       => '_category_details',
                'capability' => 'ee_edit_event_category',
                'args'       => ['edit'],
            ],
            'delete_categories'             => [
                'func'       => '_delete_categories',
                'capability' => 'ee_delete_event_category',
                'noheader'   => true,
            ],
            'delete_category'               => [
                'func'       => '_delete_categories',
                'capability' => 'ee_delete_event_category',
                'noheader'   => true,
            ],
            'insert_category'               => [
                'func'       => '_insert_or_update_category',
                'args'       => ['new_category' => true],
                'capability' => 'ee_edit_event_category',
                'noheader'   => true,
            ],
            'update_category'               => [
                'func'       => '_insert_or_update_category',
                'args'       => ['new_category' => false],
                'capability' => 'ee_edit_event_category',
                'noheader'   => true,
            ],
            'category_list'                 => [
                'func'       => '_category_list_table',
                'capability' => 'ee_manage_event_categories',
            ],
            'preview_deletion'              => [
                'func'       => 'previewDeletion',
                'capability' => 'ee_delete_events',
            ],
            'confirm_deletion'              => [
                'func'       => 'confirmDeletion',
                'capability' => 'ee_delete_events',
                'noheader'   => true,
            ],
        ];
    }


    /**
     * Set the _page_config property for this admin page group.
     */
    protected function _set_page_config()
    {
        $post_id            = $this->request->getRequestParam('post', 0, 'int');
        $EVT_CAT_ID         = $this->request->getRequestParam('EVT_CAT_ID', 0, 'int');
        $this->_page_config = [
            'default'                => [
                'nav'           => [
                    'label' => esc_html__('Overview', 'event_espresso'),
                    'order' => 10,
                ],
                'list_table'    => 'Events_Admin_List_Table',
                'help_tabs'     => [
                    'events_overview_help_tab'                       => [
                        'title'    => esc_html__('Events Overview', 'event_espresso'),
                        'filename' => 'events_overview',
                    ],
                    'events_overview_table_column_headings_help_tab' => [
                        'title'    => esc_html__('Events Overview Table Column Headings', 'event_espresso'),
                        'filename' => 'events_overview_table_column_headings',
                    ],
                    'events_overview_filters_help_tab'               => [
                        'title'    => esc_html__('Events Overview Filters', 'event_espresso'),
                        'filename' => 'events_overview_filters',
                    ],
                    'events_overview_view_help_tab'                  => [
                        'title'    => esc_html__('Events Overview Views', 'event_espresso'),
                        'filename' => 'events_overview_views',
                    ],
                    'events_overview_other_help_tab'                 => [
                        'title'    => esc_html__('Events Overview Other', 'event_espresso'),
                        'filename' => 'events_overview_other',
                    ],
                ],
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array(
                //     'Event_Overview_Help_Tour',
                //     // 'New_Features_Test_Help_Tour' for testing multiple help tour
                // ),
                'qtips'         => [
                    'EE_Event_List_Table_Tips',
                ],
                'require_nonce' => false,
            ],
            'create_new'             => [
                'nav'           => [
                    'label'      => esc_html__('Add Event', 'event_espresso'),
                    'order'      => 5,
                    'persistent' => false,
                ],
                'metaboxes'     => ['_register_event_editor_meta_boxes'],
                'help_tabs'     => [
                    'event_editor_help_tab'                            => [
                        'title'    => esc_html__('Event Editor', 'event_espresso'),
                        'filename' => 'event_editor',
                    ],
                    'event_editor_title_richtexteditor_help_tab'       => [
                        'title'    => esc_html__('Event Title & Rich Text Editor', 'event_espresso'),
                        'filename' => 'event_editor_title_richtexteditor',
                    ],
                    'event_editor_venue_details_help_tab'              => [
                        'title'    => esc_html__('Event Venue Details', 'event_espresso'),
                        'filename' => 'event_editor_venue_details',
                    ],
                    'event_editor_event_datetimes_help_tab'            => [
                        'title'    => esc_html__('Event Datetimes', 'event_espresso'),
                        'filename' => 'event_editor_event_datetimes',
                    ],
                    'event_editor_event_tickets_help_tab'              => [
                        'title'    => esc_html__('Event Tickets', 'event_espresso'),
                        'filename' => 'event_editor_event_tickets',
                    ],
                    'event_editor_event_registration_options_help_tab' => [
                        'title'    => esc_html__('Event Registration Options', 'event_espresso'),
                        'filename' => 'event_editor_event_registration_options',
                    ],
                    'event_editor_tags_categories_help_tab'            => [
                        'title'    => esc_html__('Event Tags & Categories', 'event_espresso'),
                        'filename' => 'event_editor_tags_categories',
                    ],
                    'event_editor_questions_registrants_help_tab'      => [
                        'title'    => esc_html__('Questions for Registrants', 'event_espresso'),
                        'filename' => 'event_editor_questions_registrants',
                    ],
                    'event_editor_save_new_event_help_tab'             => [
                        'title'    => esc_html__('Save New Event', 'event_espresso'),
                        'filename' => 'event_editor_save_new_event',
                    ],
                    'event_editor_other_help_tab'                      => [
                        'title'    => esc_html__('Event Other', 'event_espresso'),
                        'filename' => 'event_editor_other',
                    ],
                ],
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array(
                //     'Event_Editor_Help_Tour',
                // ),
                'qtips'         => ['EE_Event_Editor_Decaf_Tips'],
                'require_nonce' => false,
            ],
            'edit'                   => [
                'nav'           => [
                    'label'      => esc_html__('Edit Event', 'event_espresso'),
                    'order'      => 5,
                    'persistent' => false,
                    'url'        => $post_id
                        ? EE_Admin_Page::add_query_args_and_nonce(
                            ['post' => $post_id, 'action' => 'edit'],
                            $this->_current_page_view_url
                        )
                        : $this->_admin_base_url,
                ],
                'metaboxes'     => ['_register_event_editor_meta_boxes'],
                'help_tabs'     => [
                    'event_editor_help_tab'                            => [
                        'title'    => esc_html__('Event Editor', 'event_espresso'),
                        'filename' => 'event_editor',
                    ],
                    'event_editor_title_richtexteditor_help_tab'       => [
                        'title'    => esc_html__('Event Title & Rich Text Editor', 'event_espresso'),
                        'filename' => 'event_editor_title_richtexteditor',
                    ],
                    'event_editor_venue_details_help_tab'              => [
                        'title'    => esc_html__('Event Venue Details', 'event_espresso'),
                        'filename' => 'event_editor_venue_details',
                    ],
                    'event_editor_event_datetimes_help_tab'            => [
                        'title'    => esc_html__('Event Datetimes', 'event_espresso'),
                        'filename' => 'event_editor_event_datetimes',
                    ],
                    'event_editor_event_tickets_help_tab'              => [
                        'title'    => esc_html__('Event Tickets', 'event_espresso'),
                        'filename' => 'event_editor_event_tickets',
                    ],
                    'event_editor_event_registration_options_help_tab' => [
                        'title'    => esc_html__('Event Registration Options', 'event_espresso'),
                        'filename' => 'event_editor_event_registration_options',
                    ],
                    'event_editor_tags_categories_help_tab'            => [
                        'title'    => esc_html__('Event Tags & Categories', 'event_espresso'),
                        'filename' => 'event_editor_tags_categories',
                    ],
                    'event_editor_questions_registrants_help_tab'      => [
                        'title'    => esc_html__('Questions for Registrants', 'event_espresso'),
                        'filename' => 'event_editor_questions_registrants',
                    ],
                    'event_editor_save_new_event_help_tab'             => [
                        'title'    => esc_html__('Save New Event', 'event_espresso'),
                        'filename' => 'event_editor_save_new_event',
                    ],
                    'event_editor_other_help_tab'                      => [
                        'title'    => esc_html__('Event Other', 'event_espresso'),
                        'filename' => 'event_editor_other',
                    ],
                ],
                'qtips'         => ['EE_Event_Editor_Decaf_Tips'],
                'require_nonce' => false,
            ],
            'default_event_settings' => [
                'nav'           => [
                    'label' => esc_html__('Default Settings', 'event_espresso'),
                    'order' => 40,
                ],
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, ['_publish_post_box']),
                'labels'        => [
                    'publishbox' => esc_html__('Update Settings', 'event_espresso'),
                ],
                'help_tabs'     => [
                    'default_settings_help_tab'        => [
                        'title'    => esc_html__('Default Event Settings', 'event_espresso'),
                        'filename' => 'events_default_settings',
                    ],
                    'default_settings_status_help_tab' => [
                        'title'    => esc_html__('Default Registration Status', 'event_espresso'),
                        'filename' => 'events_default_settings_status',
                    ],
                    'default_maximum_tickets_help_tab' => [
                        'title'    => esc_html__('Default Maximum Tickets Per Order', 'event_espresso'),
                        'filename' => 'events_default_settings_max_tickets',
                    ],
                ],
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array('Event_Default_Settings_Help_Tour'),
                'require_nonce' => false,
            ],
            // template settings
            'template_settings'      => [
                'nav'           => [
                    'label' => esc_html__('Templates', 'event_espresso'),
                    'order' => 30,
                ],
                'metaboxes'     => $this->_default_espresso_metaboxes,
                'help_tabs'     => [
                    'general_settings_templates_help_tab' => [
                        'title'    => esc_html__('Templates', 'event_espresso'),
                        'filename' => 'general_settings_templates',
                    ],
                ],
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array('Templates_Help_Tour'),
                'require_nonce' => false,
            ],
            // event category stuff
            'add_category'           => [
                'nav'           => [
                    'label'      => esc_html__('Add Category', 'event_espresso'),
                    'order'      => 15,
                    'persistent' => false,
                ],
                'help_tabs'     => [
                    'add_category_help_tab' => [
                        'title'    => esc_html__('Add New Event Category', 'event_espresso'),
                        'filename' => 'events_add_category',
                    ],
                ],
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array('Event_Add_Category_Help_Tour'),
                'metaboxes'     => ['_publish_post_box'],
                'require_nonce' => false,
            ],
            'edit_category'          => [
                'nav'           => [
                    'label'      => esc_html__('Edit Category', 'event_espresso'),
                    'order'      => 15,
                    'persistent' => false,
                    'url'        => $EVT_CAT_ID
                        ? add_query_arg(
                            ['EVT_CAT_ID' => $EVT_CAT_ID],
                            $this->_current_page_view_url
                        )
                        : $this->_admin_base_url,
                ],
                'help_tabs'     => [
                    'edit_category_help_tab' => [
                        'title'    => esc_html__('Edit Event Category', 'event_espresso'),
                        'filename' => 'events_edit_category',
                    ],
                ],
                /*'help_tour' => array('Event_Edit_Category_Help_Tour'),*/
                'metaboxes'     => ['_publish_post_box'],
                'require_nonce' => false,
            ],
            'category_list'          => [
                'nav'           => [
                    'label' => esc_html__('Categories', 'event_espresso'),
                    'order' => 20,
                ],
                'list_table'    => 'Event_Categories_Admin_List_Table',
                'help_tabs'     => [
                    'events_categories_help_tab'                       => [
                        'title'    => esc_html__('Event Categories', 'event_espresso'),
                        'filename' => 'events_categories',
                    ],
                    'events_categories_table_column_headings_help_tab' => [
                        'title'    => esc_html__('Event Categories Table Column Headings', 'event_espresso'),
                        'filename' => 'events_categories_table_column_headings',
                    ],
                    'events_categories_view_help_tab'                  => [
                        'title'    => esc_html__('Event Categories Views', 'event_espresso'),
                        'filename' => 'events_categories_views',
                    ],
                    'events_categories_other_help_tab'                 => [
                        'title'    => esc_html__('Event Categories Other', 'event_espresso'),
                        'filename' => 'events_categories_other',
                    ],
                ],
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array(
                //     'Event_Categories_Help_Tour',
                // ),
                'metaboxes'     => $this->_default_espresso_metaboxes,
                'require_nonce' => false,
            ],
            'preview_deletion'       => [
                'nav'           => [
                    'label'      => esc_html__('Preview Deletion', 'event_espresso'),
                    'order'      => 15,
                    'persistent' => false,
                    'url'        => '',
                ],
                'require_nonce' => false,
            ],
        ];
    }


    /**
     * Used to register any global screen options if necessary for every route in this admin page group.
     */
    protected function _add_screen_options()
    {
    }


    /**
     * Implementing the screen options for the 'default' route.
     */
    protected function _add_screen_options_default()
    {
        $this->_per_page_screen_option();
    }


    /**
     * Implementing screen options for the category list route.
     */
    protected function _add_screen_options_category_list()
    {
        $page_title              = $this->_admin_page_title;
        $this->_admin_page_title = esc_html__('Categories', 'event_espresso');
        $this->_per_page_screen_option();
        $this->_admin_page_title = $page_title;
    }


    /**
     * Used to register any global feature pointers for the admin page group.
     */
    protected function _add_feature_pointers()
    {
    }


    /**
     * Registers and enqueues any global scripts and styles for the entire admin page group.
     */
    public function load_scripts_styles()
    {
        wp_register_style(
            'events-admin-css',
            EVENTS_ASSETS_URL . 'events-admin-page.css',
            [],
            EVENT_ESPRESSO_VERSION
        );
        wp_register_style('ee-cat-admin', EVENTS_ASSETS_URL . 'ee-cat-admin.css', [], EVENT_ESPRESSO_VERSION);
        wp_enqueue_style('events-admin-css');
        wp_enqueue_style('ee-cat-admin');
        // todo note: we also need to load_scripts_styles per view (i.e. default/view_report/event_details
        // registers for all views
        // scripts
        wp_register_script(
            'event_editor_js',
            EVENTS_ASSETS_URL . 'event_editor.js',
            ['ee_admin_js', 'jquery-ui-slider', 'jquery-ui-timepicker-addon'],
            EVENT_ESPRESSO_VERSION,
            true
        );
    }


    /**
     * Enqueuing scripts and styles specific to this view
     */
    public function load_scripts_styles_create_new()
    {
        $this->load_scripts_styles_edit();
    }


    /**
     * Enqueuing scripts and styles specific to this view
     */
    public function load_scripts_styles_edit()
    {
        // styles
        wp_enqueue_style('espresso-ui-theme');
        wp_register_style(
            'event-editor-css',
            EVENTS_ASSETS_URL . 'event-editor.css',
            ['ee-admin-css'],
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_style('event-editor-css');
        // scripts
        wp_register_script(
            'event-datetime-metabox',
            EVENTS_ASSETS_URL . 'event-datetime-metabox.js',
            ['event_editor_js', 'ee-datepicker'],
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_script('event-datetime-metabox');
    }


    /**
     * Populating the _views property for the category list table view.
     */
    protected function _set_list_table_views_category_list()
    {
        $this->_views = [
            'all' => [
                'slug'        => 'all',
                'label'       => esc_html__('All', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'delete_categories' => esc_html__('Delete Permanently', 'event_espresso'),
                ],
            ],
        ];
    }


    /**
     * For adding anything that fires on the admin_init hook for any route within this admin page group.
     */
    public function admin_init()
    {
        EE_Registry::$i18n_js_strings['image_confirm'] = esc_html__(
            'Do you really want to delete this image? Please remember to update your event to complete the removal.',
            'event_espresso'
        );
    }


    /**
     * For adding anything that should be triggered on the admin_notices hook for any route within this admin page
     * group.
     */
    public function admin_notices()
    {
    }


    /**
     * For adding anything that should be triggered on the `admin_print_footer_scripts` hook for any route within
     * this admin page group.
     */
    public function admin_footer_scripts()
    {
    }


    /**
     * Call this function to verify if an event is public and has tickets for sale.  If it does, then we need to show a
     * warning (via EE_Error::add_error());
     *
     * @param EE_Event $event Event object
     * @param string   $req_type
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function verify_event_edit($event = null, $req_type = '')
    {
        // don't need to do this when processing
        if (! empty($req_type)) {
            return;
        }
        // no event?
        if (empty($event)) {
            // set event
            $event = $this->_cpt_model_obj;
        }
        // STILL no event?
        if (! $event instanceof EE_Event) {
            return;
        }
        $orig_status = $event->status();
        // first check if event is active.
        if (
            $orig_status === EEM_Event::cancelled
            || $orig_status === EEM_Event::postponed
            || $event->is_expired()
            || $event->is_inactive()
        ) {
            return;
        }
        // made it here so it IS active... next check that any of the tickets are sold.
        if ($event->is_sold_out(true)) {
            if ($orig_status !== EEM_Event::sold_out && $event->status() !== $orig_status) {
                EE_Error::add_attention(
                    sprintf(
                        esc_html__(
                            'Please note that the Event Status has automatically been changed to %s because there are no more spaces available for this event.  However, this change is not permanent until you update the event.  You can change the status back to something else before updating if you wish.',
                            'event_espresso'
                        ),
                        EEH_Template::pretty_status(EEM_Event::sold_out, false, 'sentence')
                    )
                );
            }
            return;
        } elseif ($orig_status === EEM_Event::sold_out) {
            EE_Error::add_attention(
                sprintf(
                    esc_html__(
                        'Please note that the Event Status has automatically been changed to %s because more spaces have become available for this event, most likely due to abandoned transactions freeing up reserved tickets.  However, this change is not permanent until you update the event. If you wish, you can change the status back to something else before updating.',
                        'event_espresso'
                    ),
                    EEH_Template::pretty_status($event->status(), false, 'sentence')
                )
            );
        }
        // now we need to determine if the event has any tickets on sale.  If not then we dont' show the error
        if (! $event->tickets_on_sale()) {
            return;
        }
        // made it here so show warning
        $this->_edit_event_warning();
    }


    /**
     * This is the text used for when an event is being edited that is public and has tickets for sale.
     * When needed, hook this into a EE_Error::add_error() notice.
     *
     * @access protected
     * @return void
     */
    protected function _edit_event_warning()
    {
        // we don't want to add warnings during these requests
        if ($this->request->getRequestParam('action') === 'editpost') {
            return;
        }
        EE_Error::add_attention(
            sprintf(
                esc_html__(
                    'Your event is open for registration. Making changes may disrupt any transactions in progress. %sLearn more%s',
                    'event_espresso'
                ),
                '<a class="espresso-help-tab-lnk">',
                '</a>'
            )
        );
    }


    /**
     * When a user is creating a new event, notify them if they haven't set their timezone.
     * Otherwise, do the normal logic
     *
     * @return void
     * @throws EE_Error
     */
    protected function _create_new_cpt_item()
    {
        $has_timezone_string = get_option('timezone_string');
        // only nag them about setting their timezone if it's their first event, and they haven't already done it
        if (! $has_timezone_string && ! EEM_Event::instance()->exists([])) {
            EE_Error::add_attention(
                sprintf(
                    esc_html__(
                        'Your website\'s timezone is currently set to a UTC offset. We recommend updating your timezone to a city or region near you before you create an event. Change your timezone now:%1$s%2$s%3$sChange Timezone%4$s',
                        'event_espresso'
                    ),
                    '<br>',
                    '<select id="timezone_string" name="timezone_string" aria-describedby="timezone-description">'
                    . EEH_DTT_Helper::wp_timezone_choice('', EEH_DTT_Helper::get_user_locale())
                    . '</select>',
                    '<button class="button button-secondary timezone-submit">',
                    '</button><span class="spinner"></span>'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        parent::_create_new_cpt_item();
    }


    /**
     * Sets the _views property for the default route in this admin page group.
     */
    protected function _set_list_table_views_default()
    {
        $this->_views = [
            'all'   => [
                'slug'        => 'all',
                'label'       => esc_html__('View All Events', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'trash_events' => esc_html__('Move to Trash', 'event_espresso'),
                ],
            ],
            'draft' => [
                'slug'        => 'draft',
                'label'       => esc_html__('Draft', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'trash_events' => esc_html__('Move to Trash', 'event_espresso'),
                ],
            ],
        ];
        if (EE_Registry::instance()->CAP->current_user_can('ee_delete_events', 'espresso_events_trash_events')) {
            $this->_views['trash'] = [
                'slug'        => 'trash',
                'label'       => esc_html__('Trash', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'restore_events' => esc_html__('Restore From Trash', 'event_espresso'),
                    'delete_events'  => esc_html__('Delete Permanently', 'event_espresso'),
                ],
            ];
        }
    }


    /**
     * Provides the legend item array for the default list table view.
     *
     * @return array
     * @throws EE_Error
     * @throws EE_Error
     */
    protected function _event_legend_items()
    {
        $items    = [
            'view_details'   => [
                'class' => 'dashicons dashicons-search',
                'desc'  => esc_html__('View Event', 'event_espresso'),
            ],
            'edit_event'     => [
                'class' => 'ee-icon ee-icon-calendar-edit',
                'desc'  => esc_html__('Edit Event Details', 'event_espresso'),
            ],
            'view_attendees' => [
                'class' => 'dashicons dashicons-groups',
                'desc'  => esc_html__('View Registrations for Event', 'event_espresso'),
            ],
        ];
        $items    = apply_filters('FHEE__Events_Admin_Page___event_legend_items__items', $items);
        $statuses = [
            'sold_out_status'  => [
                'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::sold_out,
                'desc'  => EEH_Template::pretty_status(EE_Datetime::sold_out, false, 'sentence'),
            ],
            'active_status'    => [
                'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::active,
                'desc'  => EEH_Template::pretty_status(EE_Datetime::active, false, 'sentence'),
            ],
            'upcoming_status'  => [
                'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::upcoming,
                'desc'  => EEH_Template::pretty_status(EE_Datetime::upcoming, false, 'sentence'),
            ],
            'postponed_status' => [
                'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::postponed,
                'desc'  => EEH_Template::pretty_status(EE_Datetime::postponed, false, 'sentence'),
            ],
            'cancelled_status' => [
                'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::cancelled,
                'desc'  => EEH_Template::pretty_status(EE_Datetime::cancelled, false, 'sentence'),
            ],
            'expired_status'   => [
                'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::expired,
                'desc'  => EEH_Template::pretty_status(EE_Datetime::expired, false, 'sentence'),
            ],
            'inactive_status'  => [
                'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::inactive,
                'desc'  => EEH_Template::pretty_status(EE_Datetime::inactive, false, 'sentence'),
            ],
        ];
        $statuses = apply_filters('FHEE__Events_Admin_Page__event_legend_items__statuses', $statuses);
        return array_merge($items, $statuses);
    }


    /**
     * @return EEM_Event
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _event_model()
    {
        if (! $this->_event_model instanceof EEM_Event) {
            $this->_event_model = EE_Registry::instance()->load_model('Event');
        }
        return $this->_event_model;
    }


    /**
     * Adds extra buttons to the WP CPT permalink field row.
     * Method is called from parent and is hooked into the wp 'get_sample_permalink_html' filter.
     *
     * @param string $return    the current html
     * @param int    $id        the post id for the page
     * @param string $new_title What the title is
     * @param string $new_slug  what the slug is
     * @return string            The new html string for the permalink area
     */
    public function extra_permalink_field_buttons($return, $id, $new_title, $new_slug)
    {
        // make sure this is only when editing
        if (! empty($id)) {
            $post   = get_post($id);
            $return .= '<a class="button button-small" onclick="prompt(\'Shortcode:\', jQuery(\'#shortcode\').val()); return false;" href="#"  tabindex="-1">'
                       . esc_html__('Shortcode', 'event_espresso')
                       . '</a> ';
            $return .= '<input id="shortcode" type="hidden" value="[ESPRESSO_TICKET_SELECTOR event_id='
                       . $post->ID
                       . ']">';
        }
        return $return;
    }


    /**
     * _events_overview_list_table
     * This contains the logic for showing the events_overview list
     *
     * @access protected
     * @return void
     * @throws EE_Error
     */
    protected function _events_overview_list_table()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $this->_template_args['after_list_table']                           =
            ! empty($this->_template_args['after_list_table'])
                ? (array) $this->_template_args['after_list_table']
                : [];
        $this->_template_args['after_list_table']['view_event_list_button'] = EEH_HTML::br()
            . EEH_Template::get_button_or_link(
                get_post_type_archive_link('espresso_events'),
                esc_html__("View Event Archive Page", "event_espresso"),
                'button'
            );
        $this->_template_args['after_list_table']['legend']                 = $this->_display_legend(
            $this->_event_legend_items()
        );
        $this->_admin_page_title                                            .= ' ' . $this->get_action_link_or_button(
            'create_new',
            'add',
            [],
            'add-new-h2'
        );
        $this->display_admin_list_table_page_with_no_sidebar();
    }


    /**
     * this allows for extra misc actions in the default WP publish box
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function extra_misc_actions_publish_box()
    {
        $this->_generate_publish_box_extra_content();
    }


    /**
     * This is hooked into the WordPress do_action('save_post') hook and runs after the custom post type has been
     * saved.
     * Typically you would use this to save any additional data.
     * Keep in mind also that "save_post" runs on EVERY post update to the database.
     * ALSO very important.  When a post transitions from scheduled to published,
     * the save_post action is fired but you will NOT have any _POST data containing any extra info you may have from
     * other meta saves. So MAKE sure that you handle this accordingly.
     *
     * @access protected
     * @abstract
     * @param string $post_id The ID of the cpt that was saved (so you can link relationally)
     * @param object $post    The post object of the cpt that was saved.
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _insert_update_cpt_item($post_id, $post)
    {
        if ($post instanceof WP_Post && $post->post_type !== 'espresso_events') {
            // get out we're not processing an event save.
            return;
        }

        $event_values = [
            'EVT_display_desc'                => $this->request->getRequestParam('display_desc', false, 'bool'),
            'EVT_display_ticket_selector'     => $this->request->getRequestParam(
                'display_ticket_selector',
                false,
                'bool'
            ),
            'EVT_additional_limit'            => min(
                apply_filters('FHEE__EE_Events_Admin__insert_update_cpt_item__EVT_additional_limit_max', 255),
                $this->request->getRequestParam('additional_limit', null, 'int')
            ),
            'EVT_default_registration_status' => $this->request->getRequestParam(
                'EVT_default_registration_status',
                EE_Registry::instance()->CFG->registration->default_STS_ID
            ),

            'EVT_member_only'     => $this->request->getRequestParam('member_only', false, 'bool'),
            'EVT_allow_overflow'  => $this->request->getRequestParam('EVT_allow_overflow', false, 'bool'),
            'EVT_timezone_string' => $this->request->getRequestParam('timezone_string'),
            'EVT_external_URL'    => $this->request->getRequestParam('externalURL'),
            'EVT_phone'           => $this->request->getRequestParam('event_phone'),
        ];
        // update event
        $success = $this->_event_model()->update_by_ID($event_values, $post_id);
        // get event_object for other metaboxes...
        // though it would seem to make sense to just use $this->_event_model()->get_one_by_ID( $post_id )..
        // i have to setup where conditions to override the filters in the model
        // that filter out autodraft and inherit statuses so we GET the inherit id!
        $event = $this->_event_model()->get_one(
            [
                [
                    $this->_event_model()->primary_key_name() => $post_id,
                    'OR'                                      => [
                        'status'   => $post->post_status,
                        // if trying to "Publish" a sold out event, it's status will get switched back to "sold_out" in the db,
                        // but the returned object here has a status of "publish", so use the original post status as well
                        'status*1' => $this->request->getRequestParam('original_post_status'),
                    ],
                ],
            ]
        );
        // the following are default callbacks for event attachment updates that can be overridden by caffeinated functionality and/or addons.
        $event_update_callbacks = apply_filters(
            'FHEE__Events_Admin_Page___insert_update_cpt_item__event_update_callbacks',
            [
                [$this, '_default_venue_update'],
                [$this, '_default_tickets_update'],
            ]
        );
        $att_success            = true;
        foreach ($event_update_callbacks as $e_callback) {
            $_success = is_callable($e_callback)
                ? call_user_func($e_callback, $event, $this->request->requestParams())
                : false;
            // if ANY of these updates fail then we want the appropriate global error message
            $att_success = ! $att_success ? $att_success : $_success;
        }
        // any errors?
        if ($success && false === $att_success) {
            EE_Error::add_error(
                esc_html__(
                    'Event Details saved successfully but something went wrong with saving attachments.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        } elseif ($success === false) {
            EE_Error::add_error(
                esc_html__('Event Details did not save successfully.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
    }


    /**
     * @param int $post_id
     * @param int $revision_id
     * @throws EE_Error
     * @throws EE_Error
     * @throws ReflectionException
     * @see parent::restore_item()
     */
    protected function _restore_cpt_item($post_id, $revision_id)
    {
        // copy existing event meta to new post
        $post_evt = $this->_event_model()->get_one_by_ID($post_id);
        if ($post_evt instanceof EE_Event) {
            // meta revision restore
            $post_evt->restore_revision($revision_id);
            // related objs restore
            $post_evt->restore_revision($revision_id, ['Venue', 'Datetime', 'Price']);
        }
    }


    /**
     * Attach the venue to the Event
     *
     * @param EE_Event $event Event Object to add the venue to
     * @param array    $data  The request data from the form
     * @return bool           Success or fail.
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _default_venue_update(EE_Event $event, $data)
    {
        require_once(EE_MODELS . 'EEM_Venue.model.php');
        $venue_model = EE_Registry::instance()->load_model('Venue');
        $venue_id    = ! empty($data['venue_id']) ? $data['venue_id'] : null;
        // very important.  If we don't have a venue name...
        // then we'll get out because not necessary to create empty venue
        if (empty($data['venue_title'])) {
            return false;
        }
        $venue_array = [
            'VNU_wp_user'         => $event->get('EVT_wp_user'),
            'VNU_name'            => $data['venue_title'],
            'VNU_desc'            => ! empty($data['venue_description']) ? $data['venue_description'] : null,
            'VNU_identifier'      => ! empty($data['venue_identifier']) ? $data['venue_identifier'] : null,
            'VNU_short_desc'      => ! empty($data['venue_short_description'])
                ? $data['venue_short_description']
                : null,
            'VNU_address'         => ! empty($data['address']) ? $data['address'] : null,
            'VNU_address2'        => ! empty($data['address2']) ? $data['address2'] : null,
            'VNU_city'            => ! empty($data['city']) ? $data['city'] : null,
            'STA_ID'              => ! empty($data['state']) ? $data['state'] : null,
            'CNT_ISO'             => ! empty($data['countries']) ? $data['countries'] : null,
            'VNU_zip'             => ! empty($data['zip']) ? $data['zip'] : null,
            'VNU_phone'           => ! empty($data['venue_phone']) ? $data['venue_phone'] : null,
            'VNU_capacity'        => ! empty($data['venue_capacity']) ? $data['venue_capacity'] : null,
            'VNU_url'             => ! empty($data['venue_url']) ? $data['venue_url'] : null,
            'VNU_virtual_phone'   => ! empty($data['virtual_phone']) ? $data['virtual_phone'] : null,
            'VNU_virtual_url'     => ! empty($data['virtual_url']) ? $data['virtual_url'] : null,
            'VNU_enable_for_gmap' => isset($data['enable_for_gmap']) ? 1 : 0,
            'status'              => 'publish',
        ];
        // if we've got the venue_id then we're just updating the existing venue so let's do that and then get out.
        if (! empty($venue_id)) {
            $update_where  = [$venue_model->primary_key_name() => $venue_id];
            $rows_affected = $venue_model->update($venue_array, [$update_where]);
            // we've gotta make sure that the venue is always attached to a revision.. add_relation_to should take care of making sure that the relation is already present.
            $event->_add_relation_to($venue_id, 'Venue');
            return $rows_affected > 0;
        }
        // we insert the venue
        $venue_id = $venue_model->insert($venue_array);
        $event->_add_relation_to($venue_id, 'Venue');
        return ! empty($venue_id);
        // when we have the ancestor come in it's already been handled by the revision save.
    }


    /**
     * Handles saving everything related to Tickets (datetimes, tickets, prices)
     *
     * @param EE_Event $event The Event object we're attaching data to
     * @param array    $data  The request data from the form
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     */
    protected function _default_tickets_update(EE_Event $event, $data)
    {
        $datetime       = null;
        $saved_tickets  = [];
        $event_timezone = $event->get_timezone();
        $date_formats   = ['Y-m-d', 'h:i a'];
        foreach ($data['edit_event_datetimes'] as $row => $datetime_data) {
            // trim all values to ensure any excess whitespace is removed.
            $datetime_data                = array_map('trim', $datetime_data);
            $datetime_data['DTT_EVT_end'] =
                isset($datetime_data['DTT_EVT_end']) && ! empty($datetime_data['DTT_EVT_end'])
                    ? $datetime_data['DTT_EVT_end']
                    : $datetime_data['DTT_EVT_start'];
            $datetime_values              = [
                'DTT_ID'        => ! empty($datetime_data['DTT_ID']) ? $datetime_data['DTT_ID'] : null,
                'DTT_EVT_start' => $datetime_data['DTT_EVT_start'],
                'DTT_EVT_end'   => $datetime_data['DTT_EVT_end'],
                'DTT_reg_limit' => empty($datetime_data['DTT_reg_limit']) ? EE_INF : $datetime_data['DTT_reg_limit'],
                'DTT_order'     => $row,
            ];
            // if we have an id then let's get existing object first and then set the new values.
            //  Otherwise we instantiate a new object for save.
            if (! empty($datetime_data['DTT_ID'])) {
                $datetime = EEM_Datetime::instance($event_timezone)->get_one_by_ID($datetime_data['DTT_ID']);
                if (! $datetime instanceof EE_Ticket) {
                    throw new RuntimeException(
                        sprintf(
                            esc_html__(
                                'Something went wrong! A valid Datetime could not be retrieved from the database using the supplied ID: %1$d',
                                'event_espresso'
                            ),
                            $datetime_data['DTT_ID']
                        )
                    );
                }
                $datetime->set_date_format($date_formats[0]);
                $datetime->set_time_format($date_formats[1]);
                foreach ($datetime_values as $field => $value) {
                    $datetime->set($field, $value);
                }
            } else {
                $datetime = EE_Datetime::new_instance($datetime_values, $event_timezone, $date_formats);
            }
            if (! $datetime instanceof EE_Datetime) {
                throw new RuntimeException(
                    sprintf(
                        esc_html__(
                            'Something went wrong! A valid Datetime could not be generated or retrieved using the supplied data: %1$s',
                            'event_espresso'
                        ),
                        print_r($datetime_values, true)
                    )
                );
            }
            // before going any further make sure our dates are setup correctly
            // so that the end date is always equal or greater than the start date.
            if ($datetime->get_raw('DTT_EVT_start') > $datetime->get_raw('DTT_EVT_end')) {
                $datetime->set('DTT_EVT_end', $datetime->get('DTT_EVT_start'));
                $datetime = EEH_DTT_Helper::date_time_add($datetime, 'DTT_EVT_end', 'days');
            }
            $datetime->save();
            $event->_add_relation_to($datetime, 'Datetime');
        }
        // no datetimes get deleted so we don't do any of that logic here.
        // update tickets next
        $old_tickets = isset($data['ticket_IDs']) ? explode(',', $data['ticket_IDs']) : [];

        // set up some default start and end dates in case those are not present in the incoming data
        $default_start_date = new DateTime('now', new DateTimeZone($event->get_timezone()));
        $default_start_date = $default_start_date->format($date_formats[0] . ' ' . $date_formats[1]);
        // use the start date of the first datetime for the end date
        $first_datetime   = $event->first_datetime();
        $default_end_date = $first_datetime->start_date_and_time($date_formats[0], $date_formats[1]);

        // now process the incoming data
        foreach ($data['edit_tickets'] as $row => $ticket_data) {
            $update_prices = false;
            $ticket_price  = isset($data['edit_prices'][ $row ][1]['PRC_amount'])
                ? $data['edit_prices'][ $row ][1]['PRC_amount']
                : 0;
            // trim inputs to ensure any excess whitespace is removed.
            $ticket_data   = array_map('trim', $ticket_data);
            $ticket_values = [
                'TKT_ID'          => ! empty($ticket_data['TKT_ID']) ? $ticket_data['TKT_ID'] : null,
                'TTM_ID'          => ! empty($ticket_data['TTM_ID']) ? $ticket_data['TTM_ID'] : 0,
                'TKT_name'        => ! empty($ticket_data['TKT_name']) ? $ticket_data['TKT_name'] : '',
                'TKT_description' => ! empty($ticket_data['TKT_description']) ? $ticket_data['TKT_description'] : '',
                'TKT_start_date'  => ! empty($ticket_data['TKT_start_date'])
                    ? $ticket_data['TKT_start_date']
                    : $default_start_date,
                'TKT_end_date'    => ! empty($ticket_data['TKT_end_date'])
                    ? $ticket_data['TKT_end_date']
                    : $default_end_date,
                'TKT_qty'         => ! empty($ticket_data['TKT_qty']) || (int) $ticket_data['TKT_qty'] === 0
                    ? $ticket_data['TKT_qty']
                    : EE_INF,
                'TKT_uses'        => ! empty($ticket_data['TKT_uses']) || (int) $ticket_data['TKT_uses'] === 0
                    ? $ticket_data['TKT_uses']
                    : EE_INF,
                'TKT_min'         => ! empty($ticket_data['TKT_min']) ? $ticket_data['TKT_min'] : 0,
                'TKT_max'         => ! empty($ticket_data['TKT_max']) ? $ticket_data['TKT_max'] : EE_INF,
                'TKT_order'       => isset($ticket_data['TKT_order']) ? $ticket_data['TKT_order'] : $row,
                'TKT_price'       => $ticket_price,
                'TKT_row'         => $row,
            ];
            // if this is a default ticket, then we need to set the TKT_ID to 0 and update accordingly,
            // which means in turn that the prices will become new prices as well.
            if (isset($ticket_data['TKT_is_default']) && $ticket_data['TKT_is_default']) {
                $ticket_values['TKT_ID']         = 0;
                $ticket_values['TKT_is_default'] = 0;
                $update_prices                   = true;
            }
            // if we have a TKT_ID then we need to get that existing TKT_obj and update it
            // we actually do our saves ahead of adding any relations because its entirely possible that this
            // ticket didn't get removed or added to any datetime in the session but DID have it's items modified.
            // keep in mind that if the ticket has been sold (and we have changed pricing information),
            // then we won't be updating the tkt but instead a new tkt will be created and the old one archived.
            if (! empty($ticket_data['TKT_ID'])) {
                $existing_ticket = EEM_Ticket::instance($event_timezone)->get_one_by_ID($ticket_data['TKT_ID']);
                if (! $existing_ticket instanceof EE_Ticket) {
                    throw new RuntimeException(
                        sprintf(
                            esc_html__(
                                'Something went wrong! A valid Ticket could not be retrieved from the database using the supplied ID: %1$d',
                                'event_espresso'
                            ),
                            $ticket_data['TKT_ID']
                        )
                    );
                }
                $ticket_sold = $existing_ticket->count_related(
                    'Registration',
                    [
                        [
                            'STS_ID' => [
                                'NOT IN',
                                [EEM_Registration::status_id_incomplete],
                            ],
                        ],
                    ]
                ) > 0;
                // let's just check the total price for the existing ticket and determine if it matches the new total price.
                // if they are different then we create a new ticket (if $ticket_sold)
                // if they aren't different then we go ahead and modify existing ticket.
                $create_new_ticket = $ticket_sold
                                     && $ticket_price !== $existing_ticket->price()
                                     && ! $existing_ticket->deleted();
                $existing_ticket->set_date_format($date_formats[0]);
                $existing_ticket->set_time_format($date_formats[1]);
                // set new values
                foreach ($ticket_values as $field => $value) {
                    if ($field == 'TKT_qty') {
                        $existing_ticket->set_qty($value);
                    } elseif ($field == 'TKT_price') {
                        $existing_ticket->set('TKT_price', $ticket_price);
                    } else {
                        $existing_ticket->set($field, $value);
                    }
                }
                $ticket = $existing_ticket;
                // if $create_new_ticket is false then we can safely update the existing ticket.
                //  Otherwise we have to create a new ticket.
                if ($create_new_ticket) {
                    // archive the old ticket first
                    $existing_ticket->set('TKT_deleted', 1);
                    $existing_ticket->save();
                    // make sure this ticket is still recorded in our $saved_tickets
                    // so we don't run it through the regular trash routine.
                    $saved_tickets[ $existing_ticket->ID() ] = $existing_ticket;
                    // create new ticket that's a copy of the existing except,
                    // (a new id of course and not archived) AND has the new TKT_price associated with it.
                    $new_ticket = clone $existing_ticket;
                    $new_ticket->set('TKT_ID', 0);
                    $new_ticket->set('TKT_deleted', 0);
                    $new_ticket->set('TKT_sold', 0);
                    // now we need to make sure that $new prices are created as well and attached to new ticket.
                    $update_prices = true;
                    $ticket        = $new_ticket;
                }
            } else {
                // no TKT_id so a new ticket
                $ticket_values['TKT_price'] = $ticket_price;
                $ticket                     = EE_Ticket::new_instance($ticket_values, $event_timezone, $date_formats);
                $update_prices              = true;
            }
            if (! $ticket instanceof EE_Ticket) {
                throw new RuntimeException(
                    sprintf(
                        esc_html__(
                            'Something went wrong! A valid Ticket could not be generated or retrieved using the supplied data: %1$s',
                            'event_espresso'
                        ),
                        print_r($ticket_values, true)
                    )
                );
            }
            // cap ticket qty by datetime reg limits
            $ticket->set_qty(min($ticket->qty(), $ticket->qty('reg_limit')));
            // update ticket.
            $ticket->save();
            // before going any further make sure our dates are setup correctly
            // so that the end date is always equal or greater than the start date.
            if ($ticket->get_raw('TKT_start_date') > $ticket->get_raw('TKT_end_date')) {
                $ticket->set('TKT_end_date', $ticket->get('TKT_start_date'));
                $ticket = EEH_DTT_Helper::date_time_add($ticket, 'TKT_end_date', 'days');
                $ticket->save();
            }
            // initially let's add the ticket to the datetime
            $datetime->_add_relation_to($ticket, 'Ticket');
            $saved_tickets[ $ticket->ID() ] = $ticket;
            // add prices to ticket
            $this->_add_prices_to_ticket($data['edit_prices'][ $row ], $ticket, $update_prices);
        }
        // however now we need to handle permanently deleting tickets via the ui.
        //  Keep in mind that the ui does not allow deleting/archiving tickets that have ticket sold.
        //  However, it does allow for deleting tickets that have no tickets sold,
        // in which case we want to get rid of permanently because there is no need to save in db.
        $old_tickets     = isset($old_tickets[0]) && $old_tickets[0] == '' ? [] : $old_tickets;
        $tickets_removed = array_diff($old_tickets, array_keys($saved_tickets));
        foreach ($tickets_removed as $id) {
            $id = absint($id);
            // get the ticket for this id
            $ticket_to_remove = EEM_Ticket::instance()->get_one_by_ID($id);
            if (! $ticket_to_remove instanceof EE_Ticket) {
                continue;
            }
            // need to get all the related datetimes on this ticket and remove from every single one of them
            // (remember this process can ONLY kick off if there are NO tickets sold)
            $related_datetimes = $ticket_to_remove->get_many_related('Datetime');
            foreach ($related_datetimes as $related_datetime) {
                $ticket_to_remove->_remove_relation_to($related_datetime, 'Datetime');
            }
            // need to do the same for prices (except these prices can also be deleted because again,
            // tickets can only be trashed if they don't have any TKTs sold (otherwise they are just archived))
            $ticket_to_remove->delete_related_permanently('Price');
            // finally let's delete this ticket
            // (which should not be blocked at this point b/c we've removed all our relationships)
            $ticket_to_remove->delete_permanently();
        }
        return [$datetime, $saved_tickets];
    }


    /**
     * This attaches a list of given prices to a ticket.
     * Note we dont' have to worry about ever removing relationships (or archiving prices) because if there is a change
     * in price information on a ticket, a new ticket is created anyways so the archived ticket will retain the old
     * price info and prices are automatically "archived" via the ticket.
     *
     * @access  private
     * @param array     $prices_data Array of prices from the form.
     * @param EE_Ticket $ticket      EE_Ticket object that prices are being attached to.
     * @param bool      $new_prices  Whether attach existing incoming prices or create new ones.
     * @return  void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _add_prices_to_ticket($prices_data, EE_Ticket $ticket, $new_prices = false)
    {
        $timezone = $ticket->get_timezone();
        foreach ($prices_data as $row => $price_data) {
            $price_values = [
                'PRC_ID'         => ! empty($price_data['PRC_ID']) ? $price_data['PRC_ID'] : null,
                'PRT_ID'         => ! empty($price_data['PRT_ID']) ? $price_data['PRT_ID'] : null,
                'PRC_amount'     => ! empty($price_data['PRC_amount']) ? $price_data['PRC_amount'] : 0,
                'PRC_name'       => ! empty($price_data['PRC_name']) ? $price_data['PRC_name'] : '',
                'PRC_desc'       => ! empty($price_data['PRC_desc']) ? $price_data['PRC_desc'] : '',
                'PRC_is_default' => 0, // make sure prices are NOT set as default from this context
                'PRC_order'      => $row,
            ];
            if ($new_prices || empty($price_values['PRC_ID'])) {
                $price_values['PRC_ID'] = 0;
                $price                  = EE_Price::new_instance($price_values, $timezone);
            } else {
                $price = EEM_Price::instance($timezone)->get_one_by_ID($price_data['PRC_ID']);
                // update this price with new values
                foreach ($price_values as $field => $new_price) {
                    $price->set($field, $new_price);
                }
            }
            if (! $price instanceof EE_Price) {
                throw new RuntimeException(
                    sprintf(
                        esc_html__(
                            'Something went wrong! A valid Price could not be generated or retrieved using the supplied data: %1$s',
                            'event_espresso'
                        ),
                        print_r($price_values, true)
                    )
                );
            }
            $price->save();
            $ticket->_add_relation_to($price, 'Price');
        }
    }


    /**
     * Add in our autosave ajax handlers
     *
     */
    protected function _ee_autosave_create_new()
    {
    }


    /**
     * More autosave handlers.
     */
    protected function _ee_autosave_edit()
    {
        // TEMPORARILY EXITING CAUSE THIS IS A TODO
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _generate_publish_box_extra_content()
    {
        // load formatter helper
        // args for getting related registrations
        $approved_query_args        = [
            [
                'REG_deleted' => 0,
                'STS_ID'      => EEM_Registration::status_id_approved,
            ],
        ];
        $not_approved_query_args    = [
            [
                'REG_deleted' => 0,
                'STS_ID'      => EEM_Registration::status_id_not_approved,
            ],
        ];
        $pending_payment_query_args = [
            [
                'REG_deleted' => 0,
                'STS_ID'      => EEM_Registration::status_id_pending_payment,
            ],
        ];
        // publish box
        $publish_box_extra_args = [
            'view_approved_reg_url'        => add_query_arg(
                [
                    'action'      => 'default',
                    'event_id'    => $this->_cpt_model_obj->ID(),
                    '_reg_status' => EEM_Registration::status_id_approved,
                ],
                REG_ADMIN_URL
            ),
            'view_not_approved_reg_url'    => add_query_arg(
                [
                    'action'      => 'default',
                    'event_id'    => $this->_cpt_model_obj->ID(),
                    '_reg_status' => EEM_Registration::status_id_not_approved,
                ],
                REG_ADMIN_URL
            ),
            'view_pending_payment_reg_url' => add_query_arg(
                [
                    'action'      => 'default',
                    'event_id'    => $this->_cpt_model_obj->ID(),
                    '_reg_status' => EEM_Registration::status_id_pending_payment,
                ],
                REG_ADMIN_URL
            ),
            'approved_regs'                => $this->_cpt_model_obj->count_related(
                'Registration',
                $approved_query_args
            ),
            'not_approved_regs'            => $this->_cpt_model_obj->count_related(
                'Registration',
                $not_approved_query_args
            ),
            'pending_payment_regs'         => $this->_cpt_model_obj->count_related(
                'Registration',
                $pending_payment_query_args
            ),
            'misc_pub_section_class'       => apply_filters(
                'FHEE_Events_Admin_Page___generate_publish_box_extra_content__misc_pub_section_class',
                'misc-pub-section'
            ),
        ];
        ob_start();
        do_action(
            'AHEE__Events_Admin_Page___generate_publish_box_extra_content__event_editor_overview_add',
            $this->_cpt_model_obj
        );
        $publish_box_extra_args['event_editor_overview_add'] = ob_get_clean();
        // load template
        EEH_Template::display_template(
            EVENTS_TEMPLATE_PATH . 'event_publish_box_extras.template.php',
            $publish_box_extra_args
        );
    }


    /**
     * @return EE_Event
     */
    public function get_event_object()
    {
        return $this->_cpt_model_obj;
    }




    /** METABOXES * */
    /**
     * _register_event_editor_meta_boxes
     * add all metaboxes related to the event_editor
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _register_event_editor_meta_boxes()
    {
        $this->verify_cpt_object();
        add_meta_box(
            'espresso_event_editor_tickets',
            esc_html__('Event Datetime & Ticket', 'event_espresso'),
            [$this, 'ticket_metabox'],
            $this->page_slug,
            'normal',
            'high'
        );
        add_meta_box(
            'espresso_event_editor_event_options',
            esc_html__('Event Registration Options', 'event_espresso'),
            [$this, 'registration_options_meta_box'],
            $this->page_slug,
            'side'
        );
        // NOTE: if you're looking for other metaboxes in here,
        // where a metabox has a related management page in the admin
        // you will find it setup in the related management page's "_Hooks" file.
        // i.e. messages metabox is found in "espresso_events_Messages_Hooks.class.php".
    }


    /**
     * @throws DomainException
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function ticket_metabox()
    {
        $existing_datetime_ids = $existing_ticket_ids = [];
        // defaults for template args
        $template_args = [
            'existing_datetime_ids'    => '',
            'event_datetime_help_link' => '',
            'ticket_options_help_link' => '',
            'time'                     => null,
            'ticket_rows'              => '',
            'existing_ticket_ids'      => '',
            'total_ticket_rows'        => 1,
            'ticket_js_structure'      => '',
            'trash_icon'               => 'ee-lock-icon',
            'disabled'                 => '',
        ];
        $event_id      = is_object($this->_cpt_model_obj) ? $this->_cpt_model_obj->ID() : null;
        /**
         * 1. Start with retrieving Datetimes
         * 2. Fore each datetime get related tickets
         * 3. For each ticket get related prices
         */
        $times          = EEM_Datetime::instance()->get_all_event_dates($event_id);
        $first_datetime = reset($times);
        // do we get related tickets?
        if (
            $first_datetime instanceof EE_Datetime
            && $first_datetime->ID() !== 0
        ) {
            $existing_datetime_ids[] = $first_datetime->get('DTT_ID');
            $template_args['time']   = $first_datetime;
            $related_tickets         = $first_datetime->tickets(
                [
                    ['OR' => ['TKT_deleted' => 1, 'TKT_deleted*' => 0]],
                    'default_where_conditions' => 'none',
                ]
            );
            if (! empty($related_tickets)) {
                $template_args['total_ticket_rows'] = count($related_tickets);
                $row                                = 0;
                foreach ($related_tickets as $ticket) {
                    $existing_ticket_ids[]        = $ticket->get('TKT_ID');
                    $template_args['ticket_rows'] .= $this->_get_ticket_row($ticket, false, $row);
                    $row++;
                }
            } else {
                $template_args['total_ticket_rows'] = 1;
                /** @type EE_Ticket $ticket */
                $ticket                       = EEM_Ticket::instance()->create_default_object();
                $template_args['ticket_rows'] .= $this->_get_ticket_row($ticket);
            }
        } else {
            $template_args['time']        = $times[0];
            $tickets                      = EEM_Ticket::instance()->get_all_default_tickets();
            $template_args['ticket_rows'] .= $this->_get_ticket_row($tickets[1]);
            // NOTE: we're just sending the first default row
            // (decaf can't manage default tickets so this should be sufficient);
        }
        $template_args['event_datetime_help_link'] = $this->_get_help_tab_link(
            'event_editor_event_datetimes_help_tab'
        );
        $template_args['ticket_options_help_link'] = $this->_get_help_tab_link('ticket_options_info');
        $template_args['existing_datetime_ids']    = implode(',', $existing_datetime_ids);
        $template_args['existing_ticket_ids']      = implode(',', $existing_ticket_ids);
        $template_args['ticket_js_structure']      = $this->_get_ticket_row(
            EEM_Ticket::instance()->create_default_object(),
            true
        );
        $template                                  = apply_filters(
            'FHEE__Events_Admin_Page__ticket_metabox__template',
            EVENTS_TEMPLATE_PATH . 'event_tickets_metabox_main.template.php'
        );
        EEH_Template::display_template($template, $template_args);
    }


    /**
     * Setup an individual ticket form for the decaf event editor page
     *
     * @access private
     * @param EE_Ticket $ticket   the ticket object
     * @param boolean   $skeleton whether we're generating a skeleton for js manipulation
     * @param int       $row
     * @return string generated html for the ticket row.
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_ticket_row($ticket, $skeleton = false, $row = 0)
    {
        $template_args = [
            'tkt_status_class'    => ' tkt-status-' . $ticket->ticket_status(),
            'tkt_archive_class'   => $ticket->ticket_status() === EE_Ticket::archived && ! $skeleton ? ' tkt-archived'
                : '',
            'ticketrow'           => $skeleton ? 'TICKETNUM' : $row,
            'TKT_ID'              => $ticket->get('TKT_ID'),
            'TKT_name'            => $ticket->get('TKT_name'),
            'TKT_start_date'      => $skeleton ? '' : $ticket->get_date('TKT_start_date', 'Y-m-d h:i a'),
            'TKT_end_date'        => $skeleton ? '' : $ticket->get_date('TKT_end_date', 'Y-m-d h:i a'),
            'TKT_is_default'      => $ticket->get('TKT_is_default'),
            'TKT_qty'             => $ticket->get_pretty('TKT_qty', 'input'),
            'edit_ticketrow_name' => $skeleton ? 'TICKETNAMEATTR' : 'edit_tickets',
            'TKT_sold'            => $skeleton ? 0 : $ticket->get('TKT_sold'),
            'trash_icon'          => ($skeleton || (! empty($ticket) && ! $ticket->get('TKT_deleted')))
                                     && (! empty($ticket) && $ticket->get('TKT_sold') === 0)
                ? 'trash-icon dashicons dashicons-post-trash clickable' : 'ee-lock-icon',
            'disabled'            => $skeleton || (! empty($ticket) && ! $ticket->get('TKT_deleted')) ? ''
                : ' disabled=disabled',
        ];
        $price         = $ticket->ID() !== 0
            ? $ticket->get_first_related('Price', ['default_where_conditions' => 'none'])
            : null;
        $price         = $price instanceof EE_Price
            ? $price
            : EEM_Price::instance()->create_default_object();
        $price_args    = [
            'price_currency_symbol' => EE_Registry::instance()->CFG->currency->sign,
            'PRC_amount'            => $price->get('PRC_amount'),
            'PRT_ID'                => $price->get('PRT_ID'),
            'PRC_ID'                => $price->get('PRC_ID'),
            'PRC_is_default'        => $price->get('PRC_is_default'),
        ];
        // make sure we have default start and end dates if skeleton
        // handle rows that should NOT be empty
        if (empty($template_args['TKT_start_date'])) {
            // if empty then the start date will be now.
            $template_args['TKT_start_date'] = date('Y-m-d h:i a', current_time('timestamp'));
        }
        if (empty($template_args['TKT_end_date'])) {
            // get the earliest datetime (if present);
            $earliest_datetime             = $this->_cpt_model_obj->ID() > 0
                ? $this->_cpt_model_obj->get_first_related(
                    'Datetime',
                    ['order_by' => ['DTT_EVT_start' => 'ASC']]
                )
                : null;
            $template_args['TKT_end_date'] = $earliest_datetime instanceof EE_Datetime
                ? $earliest_datetime->get_datetime('DTT_EVT_start', 'Y-m-d', 'h:i a')
                : date('Y-m-d h:i a', mktime(0, 0, 0, date('m'), date('d') + 7, date('Y')));
        }
        $template_args = array_merge($template_args, $price_args);
        $template      = apply_filters(
            'FHEE__Events_Admin_Page__get_ticket_row__template',
            EVENTS_TEMPLATE_PATH . 'event_tickets_metabox_ticket_row.template.php',
            $ticket
        );
        return EEH_Template::display_template($template, $template_args, true);
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function registration_options_meta_box()
    {
        $yes_no_values             = [
            ['id' => true, 'text' => esc_html__('Yes', 'event_espresso')],
            ['id' => false, 'text' => esc_html__('No', 'event_espresso')],
        ];
        $default_reg_status_values = EEM_Registration::reg_status_array(
            [
                EEM_Registration::status_id_cancelled,
                EEM_Registration::status_id_declined,
                EEM_Registration::status_id_incomplete,
            ],
            true
        );
        // $template_args['is_active_select'] = EEH_Form_Fields::select_input('is_active', $yes_no_values, $this->_cpt_model_obj->is_active());
        $template_args['_event']                          = $this->_cpt_model_obj;
        $template_args['event']                           = $this->_cpt_model_obj;
        $template_args['active_status']                   = $this->_cpt_model_obj->pretty_active_status(false);
        $template_args['additional_limit']                = $this->_cpt_model_obj->additional_limit();
        $template_args['default_registration_status']     = EEH_Form_Fields::select_input(
            'default_reg_status',
            $default_reg_status_values,
            $this->_cpt_model_obj->default_registration_status()
        );
        $template_args['display_description']             = EEH_Form_Fields::select_input(
            'display_desc',
            $yes_no_values,
            $this->_cpt_model_obj->display_description()
        );
        $template_args['display_ticket_selector']         = EEH_Form_Fields::select_input(
            'display_ticket_selector',
            $yes_no_values,
            $this->_cpt_model_obj->display_ticket_selector(),
            '',
            '',
            false
        );
        $template_args['additional_registration_options'] = apply_filters(
            'FHEE__Events_Admin_Page__registration_options_meta_box__additional_registration_options',
            '',
            $template_args,
            $yes_no_values,
            $default_reg_status_values
        );
        EEH_Template::display_template(
            EVENTS_TEMPLATE_PATH . 'event_registration_options.template.php',
            $template_args
        );
    }


    /**
     * _get_events()
     * This method simply returns all the events (for the given _view and paging)
     *
     * @access public
     * @param int  $per_page     count of items per page (20 default);
     * @param int  $current_page what is the current page being viewed.
     * @param bool $count        if TRUE then we just return a count of ALL events matching the given _view.
     *                           If FALSE then we return an array of event objects
     *                           that match the given _view and paging parameters.
     * @return array|int         an array of event objects or a count of them.
     * @throws Exception
     */
    public function get_events($per_page = 10, $current_page = 1, $count = false)
    {
        $EEM_Event   = $this->_event_model();
        $offset      = ($current_page - 1) * $per_page;
        $limit       = $count ? null : $offset . ',' . $per_page;
        $orderby     = $this->request->getRequestParam('orderby', 'EVT_ID');
        $order       = $this->request->getRequestParam('order', 'DESC');
        $month_range = $this->request->getRequestParam('month_range');
        if ($month_range) {
            $pieces = explode(' ', $month_range, 3);
            // simulate the FIRST day of the month, that fixes issues for months like February
            // where PHP doesn't know what to assume for date.
            // @see https://events.codebasehq.com/projects/event-espresso/tickets/10437
            $month_r = ! empty($pieces[0]) ? date('m', EEH_DTT_Helper::first_of_month_timestamp($pieces[0])) : '';
            $year_r  = ! empty($pieces[1]) ? $pieces[1] : '';
        }
        $where  = [];
        $status = $this->request->getRequestParam('status');
        // determine what post_status our condition will have for the query.
        switch ($status) {
            case 'month':
            case 'today':
            case null:
            case 'all':
                break;
            case 'draft':
                $where['status'] = ['IN', ['draft', 'auto-draft']];
                break;
            default:
                $where['status'] = $status;
        }
        // categories?
        $category = $this->request->getRequestParam('EVT_CAT', 0, 'int');
        if ($category) {
            $where['Term_Taxonomy.taxonomy'] = EEM_CPT_Base::EVENT_CATEGORY_TAXONOMY;
            $where['Term_Taxonomy.term_id']  = $category;
        }
        // date where conditions
        $start_formats = EEM_Datetime::instance()->get_formats_for('DTT_EVT_start');
        if ($month_range) {
            $DateTime = new DateTime(
                $year_r . '-' . $month_r . '-01 00:00:00',
                new DateTimeZone('UTC')
            );
            $start    = $DateTime->getTimestamp();
            // set the datetime to be the end of the month
            $DateTime->setDate(
                $year_r,
                $month_r,
                $DateTime->format('t')
            )->setTime(23, 59, 59);
            $end                             = $DateTime->getTimestamp();
            $where['Datetime.DTT_EVT_start'] = ['BETWEEN', [$start, $end]];
        } elseif ($status === 'today') {
            $DateTime                        =
                new DateTime('now', new DateTimeZone(EEM_Event::instance()->get_timezone()));
            $start                           = $DateTime->setTime(0, 0)->format(implode(' ', $start_formats));
            $end                             = $DateTime->setTime(23, 59, 59)->format(implode(' ', $start_formats));
            $where['Datetime.DTT_EVT_start'] = ['BETWEEN', [$start, $end]];
        } elseif ($status === 'month') {
            $now                             = date('Y-m-01');
            $DateTime                        =
                new DateTime($now, new DateTimeZone(EEM_Event::instance()->get_timezone()));
            $start                           = $DateTime->setTime(0, 0)->format(implode(' ', $start_formats));
            $end                             = $DateTime->setDate(date('Y'), date('m'), $DateTime->format('t'))
                                                        ->setTime(23, 59, 59)
                                                        ->format(implode(' ', $start_formats));
            $where['Datetime.DTT_EVT_start'] = ['BETWEEN', [$start, $end]];
        }
        if (! EE_Registry::instance()->CAP->current_user_can('ee_read_others_events', 'get_events')) {
            $where['EVT_wp_user'] = get_current_user_id();
        } else {
            if (! isset($where['status'])) {
                if (! EE_Registry::instance()->CAP->current_user_can('ee_read_private_events', 'get_events')) {
                    $where['OR'] = [
                        'status*restrict_private' => ['!=', 'private'],
                        'AND'                     => [
                            'status*inclusive' => ['=', 'private'],
                            'EVT_wp_user'      => get_current_user_id(),
                        ],
                    ];
                }
            }
        }
        $wp_user = $this->request->getRequestParam('EVT_wp_user', 0, 'int');
        if (
            $wp_user
            && $wp_user !== get_current_user_id()
            && EE_Registry::instance()->CAP->current_user_can('ee_read_others_events', 'get_events')
        ) {
            $where['EVT_wp_user'] = $wp_user;
        }
        // search query handling
        $search_term = $this->request->getRequestParam('s');
        if ($search_term) {
            $search_term = '%' . $search_term . '%';
            $where['OR'] = [
                'EVT_name'       => ['LIKE', $search_term],
                'EVT_desc'       => ['LIKE', $search_term],
                'EVT_short_desc' => ['LIKE', $search_term],
            ];
        }
        // filter events by venue.
        $venue = $this->request->getRequestParam('venue', 0, 'int');
        if ($venue) {
            $where['Venue.VNU_ID'] = $venue;
        }
        $request_params = $this->request->requestParams();
        $where          = apply_filters('FHEE__Events_Admin_Page__get_events__where', $where, $request_params);
        $query_params   = apply_filters(
            'FHEE__Events_Admin_Page__get_events__query_params',
            [
                $where,
                'limit'    => $limit,
                'order_by' => $orderby,
                'order'    => $order,
                'group_by' => 'EVT_ID',
            ],
            $request_params
        );

        // let's first check if we have special requests coming in.
        $active_status = $this->request->getRequestParam('active_status');
        if ($active_status) {
            switch ($active_status) {
                case 'upcoming':
                    return $EEM_Event->get_upcoming_events($query_params, $count);
                case 'expired':
                    return $EEM_Event->get_expired_events($query_params, $count);
                case 'active':
                    return $EEM_Event->get_active_events($query_params, $count);
                case 'inactive':
                    return $EEM_Event->get_inactive_events($query_params, $count);
            }
        }

        return $count ? $EEM_Event->count([$where], 'EVT_ID', true) : $EEM_Event->get_all($query_params);
    }


    /**
     * handling for WordPress CPT actions (trash, restore, delete)
     *
     * @param string $post_id
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function trash_cpt_item($post_id)
    {
        $this->request->setRequestParam('EVT_ID', $post_id);
        $this->_trash_or_restore_event('trash', false);
    }


    /**
     * @param string $post_id
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function restore_cpt_item($post_id)
    {
        $this->request->setRequestParam('EVT_ID', $post_id);
        $this->_trash_or_restore_event('draft', false);
    }


    /**
     * @param string $post_id
     * @throws EE_Error
     * @throws EE_Error
     */
    public function delete_cpt_item($post_id)
    {
        throw new EE_Error(
            esc_html__(
                'Please contact Event Espresso support with the details of the steps taken to produce this error.',
                'event_espresso'
            )
        );
        // $this->request->setRequestParam('EVT_ID', $post_id);
        // $this->_delete_event();
    }


    /**
     * _trash_or_restore_event
     *
     * @access protected
     * @param string $event_status
     * @param bool   $redirect_after
     * @throws EE_Error
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _trash_or_restore_event($event_status = 'trash', $redirect_after = true)
    {
        // determine the event id and set to array.
        $EVT_ID = $this->request->getRequestParam('EVT_ID', 0, 'int');
        // loop thru events
        if ($EVT_ID) {
            // clean status
            $event_status = sanitize_key($event_status);
            // grab status
            if (! empty($event_status)) {
                $success = $this->_change_event_status($EVT_ID, $event_status);
            } else {
                $success = false;
                $msg     = esc_html__(
                    'An error occurred. The event could not be moved to the trash because a valid event status was not not supplied.',
                    'event_espresso'
                );
                EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            }
        } else {
            $success = false;
            $msg     = esc_html__(
                'An error occurred. The event could not be moved to the trash because a valid event ID was not not supplied.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        }
        $action = $event_status == 'trash' ? 'moved to the trash' : 'restored from the trash';
        if ($redirect_after) {
            $this->_redirect_after_action($success, 'Event', $action, ['action' => 'default']);
        }
    }


    /**
     * _trash_or_restore_events
     *
     * @access protected
     * @param string $event_status
     * @return void
     * @throws EE_Error
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _trash_or_restore_events($event_status = 'trash')
    {
        // clean status
        $event_status = sanitize_key($event_status);
        // grab status
        if (! empty($event_status)) {
            $success = true;
            // determine the event id and set to array.
            $EVT_IDs = $this->request->getRequestParam('EVT_IDs', [], 'int', true);
            // loop thru events
            foreach ($EVT_IDs as $EVT_ID) {
                if ($EVT_ID = absint($EVT_ID)) {
                    $results = $this->_change_event_status($EVT_ID, $event_status);
                    $success = $results !== false ? $success : false;
                } else {
                    $msg = sprintf(
                        esc_html__(
                            'An error occurred. Event #%d could not be moved to the trash because a valid event ID was not not supplied.',
                            'event_espresso'
                        ),
                        $EVT_ID
                    );
                    EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
                    $success = false;
                }
            }
        } else {
            $success = false;
            $msg     = esc_html__(
                'An error occurred. The event could not be moved to the trash because a valid event status was not not supplied.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        }
        // in order to force a pluralized result message we need to send back a success status greater than 1
        $success = $success ? 2 : false;
        $action  = $event_status == 'trash' ? 'moved to the trash' : 'restored from the trash';
        $this->_redirect_after_action($success, 'Events', $action, ['action' => 'default']);
    }


    /**
     * @param int    $EVT_ID
     * @param string $event_status
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _change_event_status($EVT_ID = 0, $event_status = '')
    {
        // grab event id
        if (! $EVT_ID) {
            $msg = esc_html__(
                'An error occurred. No Event ID or an invalid Event ID was received.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        $this->_cpt_model_obj = EEM_Event::instance()->get_one_by_ID($EVT_ID);
        // clean status
        $event_status = sanitize_key($event_status);
        // grab status
        if (empty($event_status)) {
            $msg = esc_html__(
                'An error occurred. No Event Status or an invalid Event Status was received.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        // was event trashed or restored ?
        switch ($event_status) {
            case 'draft':
                $action = 'restored from the trash';
                $hook   = 'AHEE_event_restored_from_trash';
                break;
            case 'trash':
                $action = 'moved to the trash';
                $hook   = 'AHEE_event_moved_to_trash';
                break;
            default:
                $action = 'updated';
                $hook   = false;
        }
        // use class to change status
        $this->_cpt_model_obj->set_status($event_status);
        $success = $this->_cpt_model_obj->save();
        if (! $success) {
            $msg = sprintf(esc_html__('An error occurred. The event could not be %s.', 'event_espresso'), $action);
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        if ($hook) {
            do_action($hook);
        }
        return true;
    }


    /**
     * @param array $event_ids
     * @return array
     * @since   4.10.23.p
     */
    private function cleanEventIds(array $event_ids)
    {
        return array_map('absint', $event_ids);
    }


    /**
     * @return array
     * @since   4.10.23.p
     */
    private function getEventIdsFromRequest()
    {
        return $this->request->getRequestParam('EVT_IDs', [], 'int', true, ',');
    }


    /**
     * @param bool $preview_delete
     * @throws EE_Error
     */
    protected function _delete_event($preview_delete = true)
    {
        $this->_delete_events($preview_delete);
    }


    /**
     * Gets the tree traversal batch persister.
     *
     * @return NodeGroupDao
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.10.12.p
     */
    protected function getModelObjNodeGroupPersister()
    {
        if (! $this->model_obj_node_group_persister instanceof NodeGroupDao) {
            $this->model_obj_node_group_persister =
                $this->getLoader()->load('\EventEspresso\core\services\orm\tree_traversal\NodeGroupDao');
        }
        return $this->model_obj_node_group_persister;
    }


    /**
     * @param bool $preview_delete
     * @return void
     * @throws EE_Error
     */
    protected function _delete_events($preview_delete = true)
    {
        $event_ids = $this->getEventIdsFromRequest();
        if ($preview_delete) {
            $this->generateDeletionPreview($event_ids);
        } else {
            EEM_Event::instance()->delete_permanently([['EVT_ID' => ['IN', $event_ids]]]);
        }
    }


    /**
     * @param array $event_ids
     */
    protected function generateDeletionPreview(array $event_ids)
    {
        $event_ids = $this->cleanEventIds($event_ids);
        // Set a code we can use to reference this deletion task in the batch jobs and preview page.
        $deletion_job_code = $this->getModelObjNodeGroupPersister()->generateGroupCode();
        $return_url        = EE_Admin_Page::add_query_args_and_nonce(
            [
                'action'            => 'preview_deletion',
                'deletion_job_code' => $deletion_job_code,
            ],
            $this->_admin_base_url
        );
        EEH_URL::safeRedirectAndExit(
            EE_Admin_Page::add_query_args_and_nonce(
                [
                    'page'              => 'espresso_batch',
                    'batch'             => EED_Batch::batch_job,
                    'EVT_IDs'           => $event_ids,
                    'deletion_job_code' => $deletion_job_code,
                    'job_handler'       => urlencode('EventEspressoBatchRequest\JobHandlers\PreviewEventDeletion'),
                    'return_url'        => urlencode($return_url),
                ],
                admin_url()
            )
        );
    }


    /**
     * Checks for a POST submission
     *
     * @since 4.10.12.p
     */
    protected function confirmDeletion()
    {
        $deletion_redirect_logic =
            $this->getLoader()->getShared('\EventEspresso\core\domain\services\admin\events\data\ConfirmDeletion');
        $deletion_redirect_logic->handle($this->get_request_data(), $this->admin_base_url());
    }


    /**
     * A page for users to preview what exactly will be deleted, and confirm they want to delete it.
     *
     * @throws EE_Error
     * @since 4.10.12.p
     */
    protected function previewDeletion()
    {
        $preview_deletion_logic =
            $this->getLoader()->getShared('\EventEspresso\core\domain\services\admin\events\data\PreviewDeletion');
        $this->set_template_args($preview_deletion_logic->handle($this->get_request_data(), $this->admin_base_url()));
        $this->display_admin_page_with_no_sidebar();
    }


    /**
     * get total number of events
     *
     * @access public
     * @return int
     * @throws EE_Error
     * @throws EE_Error
     */
    public function total_events()
    {
        return EEM_Event::instance()->count(
            ['caps' => 'read_admin'],
            'EVT_ID',
            true
        );
    }


    /**
     * get total number of draft events
     *
     * @access public
     * @return int
     * @throws EE_Error
     * @throws EE_Error
     */
    public function total_events_draft()
    {
        return EEM_Event::instance()->count(
            [
                ['status' => ['IN', ['draft', 'auto-draft']]],
                'caps' => 'read_admin',
            ],
            'EVT_ID',
            true
        );
    }


    /**
     * get total number of trashed events
     *
     * @access public
     * @return int
     * @throws EE_Error
     * @throws EE_Error
     */
    public function total_trashed_events()
    {
        return EEM_Event::instance()->count(
            [
                ['status' => 'trash'],
                'caps' => 'read_admin',
            ],
            'EVT_ID',
            true
        );
    }


    /**
     *    _default_event_settings
     *    This generates the Default Settings Tab
     *
     * @return void
     * @throws EE_Error
     */
    protected function _default_event_settings()
    {
        $this->_set_add_edit_form_tags('update_default_event_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $this->_template_args['admin_page_content'] = $this->_default_event_settings_form()->get_html();
        $this->display_admin_page_with_sidebar();
    }


    /**
     * Return the form for event settings.
     *
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     */
    protected function _default_event_settings_form()
    {
        $registration_config              = EE_Registry::instance()->CFG->registration;
        $registration_stati_for_selection = EEM_Registration::reg_status_array(
        // exclude
            [
                EEM_Registration::status_id_cancelled,
                EEM_Registration::status_id_declined,
                EEM_Registration::status_id_incomplete,
                EEM_Registration::status_id_wait_list,
            ],
            true
        );
        return new EE_Form_Section_Proper(
            [
                'name'            => 'update_default_event_settings',
                'html_id'         => 'update_default_event_settings',
                'html_class'      => 'form-table',
                'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                'subsections'     => apply_filters(
                    'FHEE__Events_Admin_Page___default_event_settings_form__form_subsections',
                    [
                        'default_reg_status'  => new EE_Select_Input(
                            $registration_stati_for_selection,
                            [
                                'default'         => isset($registration_config->default_STS_ID)
                                                     && array_key_exists(
                                                         $registration_config->default_STS_ID,
                                                         $registration_stati_for_selection
                                                     )
                                    ? sanitize_text_field($registration_config->default_STS_ID)
                                    : EEM_Registration::status_id_pending_payment,
                                'html_label_text' => esc_html__('Default Registration Status', 'event_espresso')
                                                     . EEH_Template::get_help_tab_link(
                                                         'default_settings_status_help_tab'
                                                     ),
                                'html_help_text'  => esc_html__(
                                    'This setting allows you to preselect what the default registration status setting is when creating an event.  Note that changing this setting does NOT retroactively apply it to existing events.',
                                    'event_espresso'
                                ),
                            ]
                        ),
                        'default_max_tickets' => new EE_Integer_Input(
                            [
                                'default'         => isset($registration_config->default_maximum_number_of_tickets)
                                    ? $registration_config->default_maximum_number_of_tickets
                                    : EEM_Event::get_default_additional_limit(),
                                'html_label_text' => esc_html__(
                                    'Default Maximum Tickets Allowed Per Order:',
                                    'event_espresso'
                                )
                                . EEH_Template::get_help_tab_link(
                                    'default_maximum_tickets_help_tab"'
                                ),
                                'html_help_text'  => esc_html__(
                                    'This setting allows you to indicate what will be the default for the maximum number of tickets per order when creating new events.',
                                    'event_espresso'
                                ),
                            ]
                        ),
                    ]
                ),
            ]
        );
    }


    /**
     * _update_default_event_settings
     *
     * @access protected
     * @return void
     * @throws EE_Error
     */
    protected function _update_default_event_settings()
    {
        $registration_config = EE_Registry::instance()->CFG->registration;
        $form                = $this->_default_event_settings_form();
        if ($form->was_submitted()) {
            $form->receive_form_submission();
            if ($form->is_valid()) {
                $valid_data = $form->valid_data();
                if (isset($valid_data['default_reg_status'])) {
                    $registration_config->default_STS_ID = $valid_data['default_reg_status'];
                }
                if (isset($valid_data['default_max_tickets'])) {
                    $registration_config->default_maximum_number_of_tickets = $valid_data['default_max_tickets'];
                }
                // update because data was valid!
                EE_Registry::instance()->CFG->update_espresso_config();
                EE_Error::overwrite_success();
                EE_Error::add_success(
                    esc_html__('Default Event Settings were updated', 'event_espresso')
                );
            }
        }
        $this->_redirect_after_action(0, '', '', ['action' => 'default_event_settings'], true);
    }


    /*************        Templates        *************
     *
     * @throws EE_Error
     */
    protected function _template_settings()
    {
        $this->_admin_page_title              = esc_html__('Template Settings (Preview)', 'event_espresso');
        $this->_template_args['preview_img']  = '<img src="'
                                                . EVENTS_ASSETS_URL
                                                . '/images/'
                                                . 'caffeinated_template_features.jpg" alt="'
                                                . esc_attr__('Template Settings Preview screenshot', 'event_espresso')
                                                . '" />';
        $this->_template_args['preview_text'] = '<strong>'
                                                . esc_html__(
                                                    'Template Settings is a feature that is only available in the premium version of Event Espresso 4 which is available with a support license purchase on EventEspresso.com. Template Settings allow you to configure some of the appearance options for both the Event List and Event Details pages.',
                                                    'event_espresso'
                                                ) . '</strong>';
        $this->display_admin_caf_preview_page('template_settings_tab');
    }


    /** Event Category Stuff **/
    /**
     * set the _category property with the category object for the loaded page.
     *
     * @access private
     * @return void
     */
    private function _set_category_object()
    {
        if (isset($this->_category->id) && ! empty($this->_category->id)) {
            return;
        } //already have the category object so get out.
        // set default category object
        $this->_set_empty_category_object();
        // only set if we've got an id
        $category_ID = $this->request->getRequestParam('EVT_CAT_ID', 0, 'int');
        if (! $category_ID) {
            return;
        }
        $term = get_term($category_ID, EEM_CPT_Base::EVENT_CATEGORY_TAXONOMY);
        if (! empty($term)) {
            $this->_category->category_name       = $term->name;
            $this->_category->category_identifier = $term->slug;
            $this->_category->category_desc       = $term->description;
            $this->_category->id                  = $term->term_id;
            $this->_category->parent              = $term->parent;
        }
    }


    /**
     * Clears out category properties.
     */
    private function _set_empty_category_object()
    {
        $this->_category                = new stdClass();
        $this->_category->category_name = $this->_category->category_identifier = $this->_category->category_desc = '';
        $this->_category->id            = $this->_category->parent = 0;
    }


    /**
     * @throws EE_Error
     */
    protected function _category_list_table()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $this->_search_btn_label = esc_html__('Categories', 'event_espresso');
        $this->_admin_page_title .= ' ' . $this->get_action_link_or_button(
            'add_category',
            'add_category',
            [],
            'add-new-h2'
        );
        $this->display_admin_list_table_page_with_sidebar();
    }


    /**
     * Output category details view.
     *
     * @throws EE_Error
     * @throws EE_Error
     */
    protected function _category_details($view)
    {
        // load formatter helper
        // load field generator helper
        $route = $view == 'edit' ? 'update_category' : 'insert_category';
        $this->_set_add_edit_form_tags($route);
        $this->_set_category_object();
        $id            = ! empty($this->_category->id) ? $this->_category->id : '';
        $delete_action = 'delete_category';
        // custom redirect
        $redirect = EE_Admin_Page::add_query_args_and_nonce(
            ['action' => 'category_list'],
            $this->_admin_base_url
        );
        $this->_set_publish_post_box_vars('EVT_CAT_ID', $id, $delete_action, $redirect);
        // take care of contents
        $this->_template_args['admin_page_content'] = $this->_category_details_content();
        $this->display_admin_page_with_sidebar();
    }


    /**
     * Output category details content.
     */
    protected function _category_details_content()
    {
        $editor_args['category_desc'] = [
            'type'          => 'wp_editor',
            'value'         => EEH_Formatter::admin_format_content($this->_category->category_desc),
            'class'         => 'my_editor_custom',
            'wpeditor_args' => ['media_buttons' => false],
        ];
        $_wp_editor                   = $this->_generate_admin_form_fields($editor_args, 'array');
        $all_terms                    = get_terms(
            [EEM_CPT_Base::EVENT_CATEGORY_TAXONOMY],
            ['hide_empty' => 0, 'exclude' => [$this->_category->id]]
        );
        // setup category select for term parents.
        $category_select_values[] = [
            'text' => esc_html__('No Parent', 'event_espresso'),
            'id'   => 0,
        ];
        foreach ($all_terms as $term) {
            $category_select_values[] = [
                'text' => $term->name,
                'id'   => $term->term_id,
            ];
        }
        $category_select = EEH_Form_Fields::select_input(
            'category_parent',
            $category_select_values,
            $this->_category->parent
        );
        $template_args   = [
            'category'                 => $this->_category,
            'category_select'          => $category_select,
            'unique_id_info_help_link' => $this->_get_help_tab_link('unique_id_info'),
            'category_desc_editor'     => $_wp_editor['category_desc']['field'],
            'disable'                  => '',
            'disabled_message'         => false,
        ];
        $template        = EVENTS_TEMPLATE_PATH . 'event_category_details.template.php';
        return EEH_Template::display_template($template, $template_args, true);
    }


    /**
     * Handles deleting categories.
     *
     * @throws EE_Error
     */
    protected function _delete_categories()
    {
        $category_IDs = $this->request->getRequestParam('EVT_CAT_ID', 0, 'int', true);
        foreach ($category_IDs as $category_ID) {
            $this->_delete_category($category_ID);
        }
        // doesn't matter what page we're coming from... we're going to the same place after delete.
        $query_args = [
            'action' => 'category_list',
        ];
        $this->_redirect_after_action(0, '', '', $query_args);
    }


    /**
     * Handles deleting specific category.
     *
     * @param int $cat_id
     */
    protected function _delete_category($cat_id)
    {
        $cat_id = absint($cat_id);
        wp_delete_term($cat_id, EEM_CPT_Base::EVENT_CATEGORY_TAXONOMY);
    }


    /**
     * Handles triggering the update or insertion of a new category.
     *
     * @param bool $new_category true means we're triggering the insert of a new category.
     * @throws EE_Error
     * @throws EE_Error
     */
    protected function _insert_or_update_category($new_category)
    {
        $cat_id  = $new_category ? $this->_insert_category() : $this->_insert_category(true);
        $success = 0; // we already have a success message so lets not send another.
        if ($cat_id) {
            $query_args = [
                'action'     => 'edit_category',
                'EVT_CAT_ID' => $cat_id,
            ];
        } else {
            $query_args = ['action' => 'add_category'];
        }
        $this->_redirect_after_action($success, '', '', $query_args, true);
    }


    /**
     * Inserts or updates category
     *
     * @param bool $update (true indicates we're updating a category).
     * @return bool|mixed|string
     */
    private function _insert_category($update = false)
    {
        $category_ID         = $update ? $this->request->getRequestParam('EVT_CAT_ID', 0, 'int') : 0;
        $category_name       = $this->request->getRequestParam('category_name', '');
        $category_desc       = $this->request->getRequestParam('category_desc', '');
        $category_parent     = $this->request->getRequestParam('category_parent', 0, 'int');
        $category_identifier = $this->request->getRequestParam('category_identifier', '');

        if (empty($category_name)) {
            $msg = esc_html__('You must add a name for the category.', 'event_espresso');
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        $term_args = [
            'name'        => $category_name,
            'description' => $category_desc,
            'parent'      => $category_parent,
        ];
        // was the category_identifier input disabled?
        if ($category_identifier) {
            $term_args['slug'] = $category_identifier;
        }
        $insert_ids = $update
            ? wp_update_term($category_ID, EEM_CPT_Base::EVENT_CATEGORY_TAXONOMY, $term_args)
            : wp_insert_term($category_name, EEM_CPT_Base::EVENT_CATEGORY_TAXONOMY, $term_args);
        if (! is_array($insert_ids)) {
            $msg = esc_html__(
                'An error occurred and the category has not been saved to the database.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        } else {
            $category_ID = $insert_ids['term_id'];
            $msg         =
                sprintf(esc_html__('The category %s was successfully saved', 'event_espresso'), $category_name);
            EE_Error::add_success($msg);
        }
        return $category_ID;
    }


    /**
     * Gets categories or count of categories matching the arguments in the request.
     *
     * @param int  $per_page
     * @param int  $current_page
     * @param bool $count
     * @return EE_Term_Taxonomy[]|int
     * @throws EE_Error
     * @throws EE_Error
     */
    public function get_categories($per_page = 10, $current_page = 1, $count = false)
    {
        // testing term stuff
        $orderby     = $this->request->getRequestParam('orderby', 'Term.term_id');
        $order       = $this->request->getRequestParam('order', 'DESC');
        $limit       = ($current_page - 1) * $per_page;
        $where       = ['taxonomy' => EEM_CPT_Base::EVENT_CATEGORY_TAXONOMY];
        $search_term = $this->request->getRequestParam('s');
        if ($search_term) {
            $search_term = '%' . $search_term . '%';
            $where['OR'] = [
                'Term.name'   => ['LIKE', $search_term],
                'description' => ['LIKE', $search_term],
            ];
        }
        $query_params = [
            $where,
            'order_by'   => [$orderby => $order],
            'limit'      => $limit . ',' . $per_page,
            'force_join' => ['Term'],
        ];
        return $count
            ? EEM_Term_Taxonomy::instance()->count($query_params, 'term_id')
            : EEM_Term_Taxonomy::instance()->get_all($query_params);
    }

    /* end category stuff */
    /**************/


    /**
     * Callback for the `ee_save_timezone_setting` ajax action.
     *
     * @throws EE_Error
     */
    public function saveTimezoneString()
    {
        $timezone_string = $this->request->getRequestParam('timezone_selected');
        if (empty($timezone_string) || ! EEH_DTT_Helper::validate_timezone($timezone_string, false)) {
            EE_Error::add_error(
                esc_html__('An invalid timezone string submitted.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $this->_template_args['error'] = true;
            $this->_return_json();
        }

        update_option('timezone_string', $timezone_string);
        EE_Error::add_success(
            esc_html__('Your timezone string was updated.', 'event_espresso')
        );
        $this->_template_args['success'] = true;
        $this->_return_json(true, ['action' => 'create_new']);
    }


    /**
     * @throws EE_Error
     * @deprecated $VID:$
     */
    public function save_timezonestring_setting()
    {
        $this->saveTimezoneString();
    }
}

<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}



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
     * @access protected
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



    protected function _init_page_props()
    {
        $this->page_slug = EVENTS_PG_SLUG;
        $this->page_label = EVENTS_LABEL;
        $this->_admin_base_url = EVENTS_ADMIN_URL;
        $this->_admin_base_path = EVENTS_ADMIN;
        $this->_cpt_model_names = array(
            'create_new' => 'EEM_Event',
            'edit'       => 'EEM_Event',
        );
        $this->_cpt_edit_routes = array(
            'espresso_events' => 'edit',
        );
        add_action(
            'AHEE__EE_Admin_Page_CPT__set_model_object__after_set_object',
            array($this, 'verify_event_edit')
        );
    }



    protected function _ajax_hooks()
    {
        //todo: all hooks for events ajax goes in here.
    }



    protected function _define_page_props()
    {
        $this->_admin_page_title = EVENTS_LABEL;
        $this->_labels = array(
            'buttons'      => array(
                'add'             => esc_html__('Add New Event', 'event_espresso'),
                'edit'            => esc_html__('Edit Event', 'event_espresso'),
                'delete'          => esc_html__('Delete Event', 'event_espresso'),
                'add_category'    => esc_html__('Add New Category', 'event_espresso'),
                'edit_category'   => esc_html__('Edit Category', 'event_espresso'),
                'delete_category' => esc_html__('Delete Category', 'event_espresso'),
            ),
            'editor_title' => array(
                'espresso_events' => esc_html__('Enter event title here', 'event_espresso'),
            ),
            'publishbox'   => array(
                'create_new'        => esc_html__('Save New Event', 'event_espresso'),
                'edit'              => esc_html__('Update Event', 'event_espresso'),
                'add_category'      => esc_html__('Save New Category', 'event_espresso'),
                'edit_category'     => esc_html__('Update Category', 'event_espresso'),
                'template_settings' => esc_html__('Update Settings', 'event_espresso'),
            ),
        );
    }



    protected function _set_page_routes()
    {
        //load formatter helper
        //load field generator helper
        //is there a evt_id in the request?
        $evt_id = ! empty($this->_req_data['EVT_ID']) && ! is_array($this->_req_data['EVT_ID'])
            ? $this->_req_data['EVT_ID'] : 0;
        $evt_id = ! empty($this->_req_data['post']) ? $this->_req_data['post'] : $evt_id;
        $this->_page_routes = array(
            'default'                       => array(
                'func'       => '_events_overview_list_table',
                'capability' => 'ee_read_events',
            ),
            'create_new'                    => array(
                'func'       => '_create_new_cpt_item',
                'capability' => 'ee_edit_events',
            ),
            'edit'                          => array(
                'func'       => '_edit_cpt_item',
                'capability' => 'ee_edit_event',
                'obj_id'     => $evt_id,
            ),
            'copy_event'                    => array(
                'func'       => '_copy_events',
                'capability' => 'ee_edit_event',
                'obj_id'     => $evt_id,
                'noheader'   => true,
            ),
            'trash_event'                   => array(
                'func'       => '_trash_or_restore_event',
                'args'       => array('event_status' => 'trash'),
                'capability' => 'ee_delete_event',
                'obj_id'     => $evt_id,
                'noheader'   => true,
            ),
            'trash_events'                  => array(
                'func'       => '_trash_or_restore_events',
                'args'       => array('event_status' => 'trash'),
                'capability' => 'ee_delete_events',
                'noheader'   => true,
            ),
            'restore_event'                 => array(
                'func'       => '_trash_or_restore_event',
                'args'       => array('event_status' => 'draft'),
                'capability' => 'ee_delete_event',
                'obj_id'     => $evt_id,
                'noheader'   => true,
            ),
            'restore_events'                => array(
                'func'       => '_trash_or_restore_events',
                'args'       => array('event_status' => 'draft'),
                'capability' => 'ee_delete_events',
                'noheader'   => true,
            ),
            'delete_event'                  => array(
                'func'       => '_delete_event',
                'capability' => 'ee_delete_event',
                'obj_id'     => $evt_id,
                'noheader'   => true,
            ),
            'delete_events'                 => array(
                'func'       => '_delete_events',
                'capability' => 'ee_delete_events',
                'noheader'   => true,
            ),
            'view_report'                   => array(
                'func'      => '_view_report',
                'capablity' => 'ee_edit_events',
            ),
            'default_event_settings'        => array(
                'func'       => '_default_event_settings',
                'capability' => 'manage_options',
            ),
            'update_default_event_settings' => array(
                'func'       => '_update_default_event_settings',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            'template_settings'             => array(
                'func'       => '_template_settings',
                'capability' => 'manage_options',
            ),
            //event category tab related
            'add_category'                  => array(
                'func'       => '_category_details',
                'capability' => 'ee_edit_event_category',
                'args'       => array('add'),
            ),
            'edit_category'                 => array(
                'func'       => '_category_details',
                'capability' => 'ee_edit_event_category',
                'args'       => array('edit'),
            ),
            'delete_categories'             => array(
                'func'       => '_delete_categories',
                'capability' => 'ee_delete_event_category',
                'noheader'   => true,
            ),
            'delete_category'               => array(
                'func'       => '_delete_categories',
                'capability' => 'ee_delete_event_category',
                'noheader'   => true,
            ),
            'insert_category'               => array(
                'func'       => '_insert_or_update_category',
                'args'       => array('new_category' => true),
                'capability' => 'ee_edit_event_category',
                'noheader'   => true,
            ),
            'update_category'               => array(
                'func'       => '_insert_or_update_category',
                'args'       => array('new_category' => false),
                'capability' => 'ee_edit_event_category',
                'noheader'   => true,
            ),
            'category_list'                 => array(
                'func'       => '_category_list_table',
                'capability' => 'ee_manage_event_categories',
            ),
        );
    }



    protected function _set_page_config()
    {
        $this->_page_config = array(
            'default'                => array(
                'nav'           => array(
                    'label' => esc_html__('Overview', 'event_espresso'),
                    'order' => 10,
                ),
                'list_table'    => 'Events_Admin_List_Table',
                'help_tabs'     => array(
                    'events_overview_help_tab'                       => array(
                        'title'    => esc_html__('Events Overview', 'event_espresso'),
                        'filename' => 'events_overview',
                    ),
                    'events_overview_table_column_headings_help_tab' => array(
                        'title'    => esc_html__('Events Overview Table Column Headings', 'event_espresso'),
                        'filename' => 'events_overview_table_column_headings',
                    ),
                    'events_overview_filters_help_tab'               => array(
                        'title'    => esc_html__('Events Overview Filters', 'event_espresso'),
                        'filename' => 'events_overview_filters',
                    ),
                    'events_overview_view_help_tab'                  => array(
                        'title'    => esc_html__('Events Overview Views', 'event_espresso'),
                        'filename' => 'events_overview_views',
                    ),
                    'events_overview_other_help_tab'                 => array(
                        'title'    => esc_html__('Events Overview Other', 'event_espresso'),
                        'filename' => 'events_overview_other',
                    ),
                ),
                'help_tour'     => array(
                    'Event_Overview_Help_Tour',
                    //'New_Features_Test_Help_Tour' for testing multiple help tour
                ),
                'qtips'         => array(
                    'EE_Event_List_Table_Tips',
                ),
                'require_nonce' => false,
            ),
            'create_new'             => array(
                'nav'           => array(
                    'label'      => esc_html__('Add Event', 'event_espresso'),
                    'order'      => 5,
                    'persistent' => false,
                ),
                'metaboxes'     => array('_register_event_editor_meta_boxes'),
                'help_tabs'     => array(
                    'event_editor_help_tab'                            => array(
                        'title'    => esc_html__('Event Editor', 'event_espresso'),
                        'filename' => 'event_editor',
                    ),
                    'event_editor_title_richtexteditor_help_tab'       => array(
                        'title'    => esc_html__('Event Title & Rich Text Editor', 'event_espresso'),
                        'filename' => 'event_editor_title_richtexteditor',
                    ),
                    'event_editor_venue_details_help_tab'              => array(
                        'title'    => esc_html__('Event Venue Details', 'event_espresso'),
                        'filename' => 'event_editor_venue_details',
                    ),
                    'event_editor_event_datetimes_help_tab'            => array(
                        'title'    => esc_html__('Event Datetimes', 'event_espresso'),
                        'filename' => 'event_editor_event_datetimes',
                    ),
                    'event_editor_event_tickets_help_tab'              => array(
                        'title'    => esc_html__('Event Tickets', 'event_espresso'),
                        'filename' => 'event_editor_event_tickets',
                    ),
                    'event_editor_event_registration_options_help_tab' => array(
                        'title'    => esc_html__('Event Registration Options', 'event_espresso'),
                        'filename' => 'event_editor_event_registration_options',
                    ),
                    'event_editor_tags_categories_help_tab'            => array(
                        'title'    => esc_html__('Event Tags & Categories', 'event_espresso'),
                        'filename' => 'event_editor_tags_categories',
                    ),
                    'event_editor_questions_registrants_help_tab'      => array(
                        'title'    => esc_html__('Questions for Registrants', 'event_espresso'),
                        'filename' => 'event_editor_questions_registrants',
                    ),
                    'event_editor_save_new_event_help_tab'             => array(
                        'title'    => esc_html__('Save New Event', 'event_espresso'),
                        'filename' => 'event_editor_save_new_event',
                    ),
                    'event_editor_other_help_tab'                      => array(
                        'title'    => esc_html__('Event Other', 'event_espresso'),
                        'filename' => 'event_editor_other',
                    ),
                ),
                'help_tour'     => array(
                    'Event_Editor_Help_Tour',
                ),
                'qtips'         => array('EE_Event_Editor_Decaf_Tips'),
                'require_nonce' => false,
            ),
            'edit'                   => array(
                'nav'           => array(
                    'label'      => esc_html__('Edit Event', 'event_espresso'),
                    'order'      => 5,
                    'persistent' => false,
                    'url'        => isset($this->_req_data['post'])
                        ? EE_Admin_Page::add_query_args_and_nonce(
                            array('post' => $this->_req_data['post'], 'action' => 'edit'),
                            $this->_current_page_view_url
                        )
                        : $this->_admin_base_url,
                ),
                'metaboxes'     => array('_register_event_editor_meta_boxes'),
                'help_tabs'     => array(
                    'event_editor_help_tab'                            => array(
                        'title'    => esc_html__('Event Editor', 'event_espresso'),
                        'filename' => 'event_editor',
                    ),
                    'event_editor_title_richtexteditor_help_tab'       => array(
                        'title'    => esc_html__('Event Title & Rich Text Editor', 'event_espresso'),
                        'filename' => 'event_editor_title_richtexteditor',
                    ),
                    'event_editor_venue_details_help_tab'              => array(
                        'title'    => esc_html__('Event Venue Details', 'event_espresso'),
                        'filename' => 'event_editor_venue_details',
                    ),
                    'event_editor_event_datetimes_help_tab'            => array(
                        'title'    => esc_html__('Event Datetimes', 'event_espresso'),
                        'filename' => 'event_editor_event_datetimes',
                    ),
                    'event_editor_event_tickets_help_tab'              => array(
                        'title'    => esc_html__('Event Tickets', 'event_espresso'),
                        'filename' => 'event_editor_event_tickets',
                    ),
                    'event_editor_event_registration_options_help_tab' => array(
                        'title'    => esc_html__('Event Registration Options', 'event_espresso'),
                        'filename' => 'event_editor_event_registration_options',
                    ),
                    'event_editor_tags_categories_help_tab'            => array(
                        'title'    => esc_html__('Event Tags & Categories', 'event_espresso'),
                        'filename' => 'event_editor_tags_categories',
                    ),
                    'event_editor_questions_registrants_help_tab'      => array(
                        'title'    => esc_html__('Questions for Registrants', 'event_espresso'),
                        'filename' => 'event_editor_questions_registrants',
                    ),
                    'event_editor_save_new_event_help_tab'             => array(
                        'title'    => esc_html__('Save New Event', 'event_espresso'),
                        'filename' => 'event_editor_save_new_event',
                    ),
                    'event_editor_other_help_tab'                      => array(
                        'title'    => esc_html__('Event Other', 'event_espresso'),
                        'filename' => 'event_editor_other',
                    ),
                ),
                /*'help_tour' => array(
					'Event_Edit_Help_Tour'
				),*/
                'qtips'         => array('EE_Event_Editor_Decaf_Tips'),
                'require_nonce' => false,
            ),
            'default_event_settings' => array(
                'nav'           => array(
                    'label' => esc_html__('Default Settings', 'event_espresso'),
                    'order' => 40,
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                'labels'        => array(
                    'publishbox' => esc_html__('Update Settings', 'event_espresso'),
                ),
                'help_tabs'     => array(
                    'default_settings_help_tab'        => array(
                        'title'    => esc_html__('Default Event Settings', 'event_espresso'),
                        'filename' => 'events_default_settings',
                    ),
                    'default_settings_status_help_tab' => array(
                        'title'    => esc_html__('Default Registration Status', 'event_espresso'),
                        'filename' => 'events_default_settings_status',
                    ),
                ),
                'help_tour'     => array('Event_Default_Settings_Help_Tour'),
                'require_nonce' => false,
            ),
            //template settings
            'template_settings'      => array(
                'nav'           => array(
                    'label' => esc_html__('Templates', 'event_espresso'),
                    'order' => 30,
                ),
                'metaboxes'     => $this->_default_espresso_metaboxes,
                'help_tabs'     => array(
                    'general_settings_templates_help_tab' => array(
                        'title'    => esc_html__('Templates', 'event_espresso'),
                        'filename' => 'general_settings_templates',
                    ),
                ),
                'help_tour'     => array('Templates_Help_Tour'),
                'require_nonce' => false,
            ),
            //event category stuff
            'add_category'           => array(
                'nav'           => array(
                    'label'      => esc_html__('Add Category', 'event_espresso'),
                    'order'      => 15,
                    'persistent' => false,
                ),
                'help_tabs'     => array(
                    'add_category_help_tab' => array(
                        'title'    => esc_html__('Add New Event Category', 'event_espresso'),
                        'filename' => 'events_add_category',
                    ),
                ),
                'help_tour'     => array('Event_Add_Category_Help_Tour'),
                'metaboxes'     => array('_publish_post_box'),
                'require_nonce' => false,
            ),
            'edit_category'          => array(
                'nav'           => array(
                    'label'      => esc_html__('Edit Category', 'event_espresso'),
                    'order'      => 15,
                    'persistent' => false,
                    'url'        => isset($this->_req_data['EVT_CAT_ID'])
                        ? add_query_arg(
                            array('EVT_CAT_ID' => $this->_req_data['EVT_CAT_ID']),
                            $this->_current_page_view_url
                        )
                        : $this->_admin_base_url,
                ),
                'help_tabs'     => array(
                    'edit_category_help_tab' => array(
                        'title'    => esc_html__('Edit Event Category', 'event_espresso'),
                        'filename' => 'events_edit_category',
                    ),
                ),
                /*'help_tour' => array('Event_Edit_Category_Help_Tour'),*/
                'metaboxes'     => array('_publish_post_box'),
                'require_nonce' => false,
            ),
            'category_list'          => array(
                'nav'           => array(
                    'label' => esc_html__('Categories', 'event_espresso'),
                    'order' => 20,
                ),
                'list_table'    => 'Event_Categories_Admin_List_Table',
                'help_tabs'     => array(
                    'events_categories_help_tab'                       => array(
                        'title'    => esc_html__('Event Categories', 'event_espresso'),
                        'filename' => 'events_categories',
                    ),
                    'events_categories_table_column_headings_help_tab' => array(
                        'title'    => esc_html__('Event Categories Table Column Headings', 'event_espresso'),
                        'filename' => 'events_categories_table_column_headings',
                    ),
                    'events_categories_view_help_tab'                  => array(
                        'title'    => esc_html__('Event Categories Views', 'event_espresso'),
                        'filename' => 'events_categories_views',
                    ),
                    'events_categories_other_help_tab'                 => array(
                        'title'    => esc_html__('Event Categories Other', 'event_espresso'),
                        'filename' => 'events_categories_other',
                    ),
                ),
                'help_tour'     => array(
                    'Event_Categories_Help_Tour',
                ),
                'metaboxes'     => $this->_default_espresso_metaboxes,
                'require_nonce' => false,
            ),
        );
    }



    protected function _add_screen_options()
    {
        //todo
    }



    protected function _add_screen_options_default()
    {
        $this->_per_page_screen_option();
    }



    protected function _add_screen_options_category_list()
    {
        $page_title = $this->_admin_page_title;
        $this->_admin_page_title = esc_html__('Categories', 'event_espresso');
        $this->_per_page_screen_option();
        $this->_admin_page_title = $page_title;
    }



    protected function _add_feature_pointers()
    {
        //todo
    }



    public function load_scripts_styles()
    {
        wp_register_style(
            'events-admin-css',
            EVENTS_ASSETS_URL . 'events-admin-page.css',
            array(),
            EVENT_ESPRESSO_VERSION
        );
        wp_register_style('ee-cat-admin', EVENTS_ASSETS_URL . 'ee-cat-admin.css', array(), EVENT_ESPRESSO_VERSION);
        wp_enqueue_style('events-admin-css');
        wp_enqueue_style('ee-cat-admin');
        //todo note: we also need to load_scripts_styles per view (i.e. default/view_report/event_details
        //registers for all views
        //scripts
        wp_register_script(
            'event_editor_js',
            EVENTS_ASSETS_URL . 'event_editor.js',
            array('ee_admin_js', 'jquery-ui-slider', 'jquery-ui-timepicker-addon'),
            EVENT_ESPRESSO_VERSION,
            true
        );
    }



    /**
     * enqueuing scripts and styles specific to this view
     *
     * @return void
     */
    public function load_scripts_styles_create_new()
    {
        $this->load_scripts_styles_edit();
    }



    /**
     * enqueuing scripts and styles specific to this view
     *
     * @return void
     */
    public function load_scripts_styles_edit()
    {
        //styles
        wp_enqueue_style('espresso-ui-theme');
        wp_register_style(
            'event-editor-css',
            EVENTS_ASSETS_URL . 'event-editor.css',
            array('ee-admin-css'),
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_style('event-editor-css');
        //scripts
        wp_register_script(
            'event-datetime-metabox',
            EVENTS_ASSETS_URL . 'event-datetime-metabox.js',
            array('event_editor_js', 'ee-datepicker'),
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_script('event-datetime-metabox');
    }



    public function load_scripts_styles_add_category()
    {
        $this->load_scripts_styles_edit_category();
    }



    public function load_scripts_styles_edit_category()
    {
    }



    protected function _set_list_table_views_category_list()
    {
        $this->_views = array(
            'all' => array(
                'slug'        => 'all',
                'label'       => esc_html__('All', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array(
                    'delete_categories' => esc_html__('Delete Permanently', 'event_espresso'),
                ),
            ),
        );
    }



    public function admin_init()
    {
        EE_Registry::$i18n_js_strings['image_confirm'] = esc_html__(
            'Do you really want to delete this image? Please remember to update your event to complete the removal.',
            'event_espresso'
        );
    }



    //nothing needed for events with these methods.
    public function admin_notices()
    {
    }



    public function admin_footer_scripts()
    {
    }



    /**
     * Call this function to verify if an event is public and has tickets for sale.  If it does, then we need to show a
     * warning (via EE_Error::add_error());
     *
     * @param  EE_Event $event Event object
     * @access public
     * @return void
     */
    public function verify_event_edit($event = null)
    {
        // no event?
        if (empty($event)) {
            // set event
            $event = $this->_cpt_model_obj;
        }
        // STILL no event?
        if (empty ($event)) {
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
        //made it here so it IS active... next check that any of the tickets are sold.
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
        } else if ($orig_status === EEM_Event::sold_out) {
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
        //now we need to determine if the event has any tickets on sale.  If not then we dont' show the error
        if ( ! $event->tickets_on_sale()) {
            return;
        }
        //made it here so show warning
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
        if (isset($this->_req_data['action']) && $this->_req_data['action'] === 'editpost') {
            return;
        }
        EE_Error::add_attention(
            esc_html__(
                'Please be advised that this event has been published and is open for registrations on your website. If you update any registration-related details (i.e. custom questions, messages, tickets, datetimes, etc.) while a registration is in process, the registration process could be interrupted and result in errors for the person registering and potentially incorrect registration or transaction data inside Event Espresso. We recommend editing events during a period of slow traffic, or even temporarily changing the status of an event to "Draft" until your edits are complete.',
                'event_espresso'
            )
        );
    }



    /**
     * When a user is creating a new event, notify them if they haven't set their timezone.
     * Otherwise, do the normal logic
     *
     * @return string
     * @throws \EE_Error
     */
    protected function _create_new_cpt_item()
    {
        $gmt_offset = get_option('gmt_offset');
        //only nag them about setting their timezone if it's their first event, and they haven't already done it
        if ($gmt_offset === '0' && ! EEM_Event::instance()->exists(array())) {
            EE_Error::add_attention(
                sprintf(
                    __(
                        'Your website\'s timezone is currently set to UTC + 0. We recommend updating your timezone to a city or region near you before you create an event. Your timezone can be updated through the %1$sGeneral Settings%2$s page.',
                        'event_espresso'
                    ),
                    '<a href="' . admin_url('options-general.php') . '">',
                    '</a>'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        return parent::_create_new_cpt_item();
    }



    protected function _set_list_table_views_default()
    {
        $this->_views = array(
            'all'   => array(
                'slug'        => 'all',
                'label'       => esc_html__('View All Events', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array(
                    'trash_events' => esc_html__('Move to Trash', 'event_espresso'),
                ),
            ),
            'draft' => array(
                'slug'        => 'draft',
                'label'       => esc_html__('Draft', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array(
                    'trash_events' => esc_html__('Move to Trash', 'event_espresso'),
                ),
            ),
        );
        if (EE_Registry::instance()->CAP->current_user_can('ee_delete_events', 'espresso_events_trash_events')) {
            $this->_views['trash'] = array(
                'slug'        => 'trash',
                'label'       => esc_html__('Trash', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array(
                    'restore_events' => esc_html__('Restore From Trash', 'event_espresso'),
                    'delete_events'  => esc_html__('Delete Permanently', 'event_espresso'),
                ),
            );
        }
    }



    /**
     * @return array
     */
    protected function _event_legend_items()
    {
        $items = array(
            'view_details'   => array(
                'class' => 'dashicons dashicons-search',
                'desc'  => esc_html__('View Event', 'event_espresso'),
            ),
            'edit_event'     => array(
                'class' => 'ee-icon ee-icon-calendar-edit',
                'desc'  => esc_html__('Edit Event Details', 'event_espresso'),
            ),
            'view_attendees' => array(
                'class' => 'dashicons dashicons-groups',
                'desc'  => esc_html__('View Registrations for Event', 'event_espresso'),
            ),
        );
        $items = apply_filters('FHEE__Events_Admin_Page___event_legend_items__items', $items);
        $statuses = array(
            'sold_out_status'  => array(
                'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::sold_out,
                'desc'  => EEH_Template::pretty_status(EE_Datetime::sold_out, false, 'sentence'),
            ),
            'active_status'    => array(
                'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::active,
                'desc'  => EEH_Template::pretty_status(EE_Datetime::active, false, 'sentence'),
            ),
            'upcoming_status'  => array(
                'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::upcoming,
                'desc'  => EEH_Template::pretty_status(EE_Datetime::upcoming, false, 'sentence'),
            ),
            'postponed_status' => array(
                'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::postponed,
                'desc'  => EEH_Template::pretty_status(EE_Datetime::postponed, false, 'sentence'),
            ),
            'cancelled_status' => array(
                'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::cancelled,
                'desc'  => EEH_Template::pretty_status(EE_Datetime::cancelled, false, 'sentence'),
            ),
            'expired_status'   => array(
                'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::expired,
                'desc'  => EEH_Template::pretty_status(EE_Datetime::expired, false, 'sentence'),
            ),
            'inactive_status'  => array(
                'class' => 'ee-status-legend ee-status-legend-' . EE_Datetime::inactive,
                'desc'  => EEH_Template::pretty_status(EE_Datetime::inactive, false, 'sentence'),
            ),
        );
        $statuses = apply_filters('FHEE__Events_Admin_Page__event_legend_items__statuses', $statuses);
        return array_merge($items, $statuses);
    }



    /**
     * _event_model
     *
     * @return EEM_Event
     */
    private function _event_model()
    {
        if ( ! $this->_event_model instanceof EEM_Event) {
            $this->_event_model = EE_Registry::instance()->load_model('Event');
        }
        return $this->_event_model;
    }



    /**
     * Adds extra buttons to the WP CPT permalink field row.
     * Method is called from parent and is hooked into the wp 'get_sample_permalink_html' filter.
     *
     * @param  string $return    the current html
     * @param  int    $id        the post id for the page
     * @param  string $new_title What the title is
     * @param  string $new_slug  what the slug is
     * @return string            The new html string for the permalink area
     */
    public function extra_permalink_field_buttons($return, $id, $new_title, $new_slug)
    {
        //make sure this is only when editing
        if ( ! empty($id)) {
            $post = get_post($id);
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
     * @throws \EE_Error
     */
    protected function _events_overview_list_table()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $this->_template_args['after_list_table'] = ! empty($this->_template_args['after_list_table'])
            ? (array)$this->_template_args['after_list_table']
            : array();
        $this->_template_args['after_list_table']['view_event_list_button'] = EEH_HTML::br()
                                                                              . EEH_Template::get_button_or_link(
                get_post_type_archive_link('espresso_events'),
                esc_html__("View Event Archive Page", "event_espresso"),
                'button'
            );
        $this->_template_args['after_list_table']['legend'] = $this->_display_legend($this->_event_legend_items());
        $this->_admin_page_title .= ' ' . $this->get_action_link_or_button(
                'create_new',
                'add',
                array(),
                'add-new-h2'
            );
        $this->display_admin_list_table_page_with_no_sidebar();
    }



    /**
     * this allows for extra misc actions in the default WP publish box
     *
     * @return void
     */
    public function extra_misc_actions_publish_box()
    {
        $this->_generate_publish_box_extra_content();
    }



    /**
     * This is hooked into the WordPress do_action('save_post') hook and runs after the custom post type has been
     * saved.  Child classes are required to declare this method.  Typically you would use this to save any additional
     * data.
     * Keep in mind also that "save_post" runs on EVERY post update to the database.
     * ALSO very important.  When a post transitions from scheduled to published, the save_post action is fired but you
     * will NOT have any _POST data containing any extra info you may have from other meta saves.  So MAKE sure that
     * you handle this accordingly.
     *
     * @access protected
     * @abstract
     * @param  string $post_id The ID of the cpt that was saved (so you can link relationally)
     * @param  object $post    The post object of the cpt that was saved.
     * @return void
     */
    protected function _insert_update_cpt_item($post_id, $post)
    {
        if ($post instanceof WP_Post && $post->post_type !== 'espresso_events') {
            //get out we're not processing an event save.
            return;
        }
        $event_values = array(
            'EVT_display_desc'                => ! empty($this->_req_data['display_desc']) ? 1 : 0,
            'EVT_display_ticket_selector'     => ! empty($this->_req_data['display_ticket_selector']) ? 1 : 0,
            'EVT_additional_limit'            => min(
                apply_filters('FHEE__EE_Events_Admin__insert_update_cpt_item__EVT_additional_limit_max', 255),
                ! empty($this->_req_data['additional_limit']) ? $this->_req_data['additional_limit'] : null
            ),
            'EVT_default_registration_status' => ! empty($this->_req_data['EVT_default_registration_status'])
                ? $this->_req_data['EVT_default_registration_status']
                : EE_Registry::instance()->CFG->registration->default_STS_ID,
            'EVT_member_only'                 => ! empty($this->_req_data['member_only']) ? 1 : 0,
            'EVT_allow_overflow'              => ! empty($this->_req_data['EVT_allow_overflow']) ? 1 : 0,
            'EVT_timezone_string'             => ! empty($this->_req_data['timezone_string'])
                ? $this->_req_data['timezone_string'] : null,
            'EVT_external_URL'                => ! empty($this->_req_data['externalURL'])
                ? $this->_req_data['externalURL'] : null,
            'EVT_phone'                       => ! empty($this->_req_data['event_phone'])
                ? $this->_req_data['event_phone'] : null,
        );
        //update event
        $success = $this->_event_model()->update_by_ID($event_values, $post_id);
        //get event_object for other metaboxes... though it would seem to make sense to just use $this->_event_model()->get_one_by_ID( $post_id ).. i have to setup where conditions to override the filters in the model that filter out autodraft and inherit statuses so we GET the inherit id!
        $get_one_where = array($this->_event_model()->primary_key_name() => $post_id, 'status' => $post->post_status);
        $event = $this->_event_model()->get_one(array($get_one_where));
        //the following are default callbacks for event attachment updates that can be overridden by caffeinated functionality and/or addons.
        $event_update_callbacks = apply_filters(
            'FHEE__Events_Admin_Page___insert_update_cpt_item__event_update_callbacks',
            array(array($this, '_default_venue_update'), array($this, '_default_tickets_update'))
        );
        $att_success = true;
        foreach ($event_update_callbacks as $e_callback) {
            $_succ = call_user_func_array($e_callback, array($event, $this->_req_data));
            $att_success = ! $att_success ? $att_success
                : $_succ; //if ANY of these updates fail then we want the appropriate global error message
        }
        //any errors?
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
        } else if ($success === false) {
            EE_Error::add_error(
                esc_html__('Event Details did not save successfully.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
    }



    /**
     * @see parent::restore_item()
     * @param int $post_id
     * @param int $revision_id
     */
    protected function _restore_cpt_item($post_id, $revision_id)
    {
        //copy existing event meta to new post
        $post_evt = $this->_event_model()->get_one_by_ID($post_id);
        if ($post_evt instanceof EE_Event) {
            //meta revision restore
            $post_evt->restore_revision($revision_id);
            //related objs restore
            $post_evt->restore_revision($revision_id, array('Venue', 'Datetime', 'Price'));
        }
    }



    /**
     * Attach the venue to the Event
     *
     * @param  \EE_Event $evtobj Event Object to add the venue to
     * @param  array     $data   The request data from the form
     * @return bool           Success or fail.
     */
    protected function _default_venue_update(\EE_Event $evtobj, $data)
    {
        require_once(EE_MODELS . 'EEM_Venue.model.php');
        $venue_model = EE_Registry::instance()->load_model('Venue');
        $rows_affected = null;
        $venue_id = ! empty($data['venue_id']) ? $data['venue_id'] : null;
        // very important.  If we don't have a venue name...
        // then we'll get out because not necessary to create empty venue
        if (empty($data['venue_title'])) {
            return false;
        }
        $venue_array = array(
            'VNU_wp_user'         => $evtobj->get('EVT_wp_user'),
            'VNU_name'            => ! empty($data['venue_title']) ? $data['venue_title'] : null,
            'VNU_desc'            => ! empty($data['venue_description']) ? $data['venue_description'] : null,
            'VNU_identifier'      => ! empty($data['venue_identifier']) ? $data['venue_identifier'] : null,
            'VNU_short_desc'      => ! empty($data['venue_short_description']) ? $data['venue_short_description']
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
        );
        //if we've got the venue_id then we're just updating the existing venue so let's do that and then get out.
        if ( ! empty($venue_id)) {
            $update_where = array($venue_model->primary_key_name() => $venue_id);
            $rows_affected = $venue_model->update($venue_array, array($update_where));
            //we've gotta make sure that the venue is always attached to a revision.. add_relation_to should take care of making sure that the relation is already present.
            $evtobj->_add_relation_to($venue_id, 'Venue');
            return $rows_affected > 0 ? true : false;
        } else {
            //we insert the venue
            $venue_id = $venue_model->insert($venue_array);
            $evtobj->_add_relation_to($venue_id, 'Venue');
            return ! empty($venue_id) ? true : false;
        }
        //when we have the ancestor come in it's already been handled by the revision save.
    }



    /**
     * Handles saving everything related to Tickets (datetimes, tickets, prices)
     *
     * @param  EE_Event $evtobj The Event object we're attaching data to
     * @param  array    $data   The request data from the form
     * @return array
     */
    protected function _default_tickets_update(EE_Event $evtobj, $data)
    {
        $success = true;
        $saved_dtt = null;
        $saved_tickets = array();
        $incoming_date_formats = array('Y-m-d', 'h:i a');
        foreach ($data['edit_event_datetimes'] as $row => $dtt) {
            //trim all values to ensure any excess whitespace is removed.
            $dtt = array_map('trim', $dtt);
            $dtt['DTT_EVT_end'] = isset($dtt['DTT_EVT_end']) && ! empty($dtt['DTT_EVT_end']) ? $dtt['DTT_EVT_end']
                : $dtt['DTT_EVT_start'];
            $datetime_values = array(
                'DTT_ID'        => ! empty($dtt['DTT_ID']) ? $dtt['DTT_ID'] : null,
                'DTT_EVT_start' => $dtt['DTT_EVT_start'],
                'DTT_EVT_end'   => $dtt['DTT_EVT_end'],
                'DTT_reg_limit' => empty($dtt['DTT_reg_limit']) ? EE_INF : $dtt['DTT_reg_limit'],
                'DTT_order'     => $row,
            );
            //if we have an id then let's get existing object first and then set the new values.  Otherwise we instantiate a new object for save.
            if ( ! empty($dtt['DTT_ID'])) {
                $DTM = EE_Registry::instance()
                                  ->load_model('Datetime', array($evtobj->get_timezone()))
                                  ->get_one_by_ID($dtt['DTT_ID']);
                $DTM->set_date_format($incoming_date_formats[0]);
                $DTM->set_time_format($incoming_date_formats[1]);
                foreach ($datetime_values as $field => $value) {
                    $DTM->set($field, $value);
                }
                //make sure the $dtt_id here is saved just in case after the add_relation_to() the autosave replaces it.  We need to do this so we dont' TRASH the parent DTT.
                $saved_dtts[$DTM->ID()] = $DTM;
            } else {
                $DTM = EE_Registry::instance()->load_class(
                    'Datetime',
                    array($datetime_values, $evtobj->get_timezone(), $incoming_date_formats),
                    false,
                    false
                );
                foreach ($datetime_values as $field => $value) {
                    $DTM->set($field, $value);
                }
            }
            $DTM->save();
            $DTT = $evtobj->_add_relation_to($DTM, 'Datetime');
            //load DTT helper
            //before going any further make sure our dates are setup correctly so that the end date is always equal or greater than the start date.
            if ($DTT->get_raw('DTT_EVT_start') > $DTT->get_raw('DTT_EVT_end')) {
                $DTT->set('DTT_EVT_end', $DTT->get('DTT_EVT_start'));
                $DTT = EEH_DTT_Helper::date_time_add($DTT, 'DTT_EVT_end', 'days');
                $DTT->save();
            }
            //now we got to make sure we add the new DTT_ID to the $saved_dtts array  because it is possible there was a new one created for the autosave.
            $saved_dtt = $DTT;
            $success = ! $success ? $success : $DTT;
            //if ANY of these updates fail then we want the appropriate global error message.
            // //todo this is actually sucky we need a better error message but this is what it is for now.
        }
        //no dtts get deleted so we don't do any of that logic here.
        //update tickets next
        $old_tickets = isset($data['ticket_IDs']) ? explode(',', $data['ticket_IDs']) : array();
        foreach ($data['edit_tickets'] as $row => $tkt) {
            $incoming_date_formats = array('Y-m-d', 'h:i a');
            $update_prices = false;
            $ticket_price = isset($data['edit_prices'][$row][1]['PRC_amount'])
                ? $data['edit_prices'][$row][1]['PRC_amount'] : 0;
            // trim inputs to ensure any excess whitespace is removed.
            $tkt = array_map('trim', $tkt);
            if (empty($tkt['TKT_start_date'])) {
                //let's use now in the set timezone.
                $now = new DateTime('now', new DateTimeZone($evtobj->get_timezone()));
                $tkt['TKT_start_date'] = $now->format($incoming_date_formats[0] . ' ' . $incoming_date_formats[1]);
            }
            if (empty($tkt['TKT_end_date'])) {
                //use the start date of the first datetime
                $dtt = $evtobj->first_datetime();
                $tkt['TKT_end_date'] = $dtt->start_date_and_time(
                    $incoming_date_formats[0],
                    $incoming_date_formats[1]
                );
            }
            $TKT_values = array(
                'TKT_ID'          => ! empty($tkt['TKT_ID']) ? $tkt['TKT_ID'] : null,
                'TTM_ID'          => ! empty($tkt['TTM_ID']) ? $tkt['TTM_ID'] : 0,
                'TKT_name'        => ! empty($tkt['TKT_name']) ? $tkt['TKT_name'] : '',
                'TKT_description' => ! empty($tkt['TKT_description']) ? $tkt['TKT_description'] : '',
                'TKT_start_date'  => $tkt['TKT_start_date'],
                'TKT_end_date'    => $tkt['TKT_end_date'],
                'TKT_qty'         => ! isset($tkt['TKT_qty']) || $tkt['TKT_qty'] === '' ? EE_INF : $tkt['TKT_qty'],
                'TKT_uses'        => ! isset($tkt['TKT_uses']) || $tkt['TKT_uses'] === '' ? EE_INF : $tkt['TKT_uses'],
                'TKT_min'         => empty($tkt['TKT_min']) ? 0 : $tkt['TKT_min'],
                'TKT_max'         => empty($tkt['TKT_max']) ? EE_INF : $tkt['TKT_max'],
                'TKT_row'         => $row,
                'TKT_order'       => isset($tkt['TKT_order']) ? $tkt['TKT_order'] : $row,
                'TKT_price'       => $ticket_price,
            );
            //if this is a default TKT, then we need to set the TKT_ID to 0 and update accordingly, which means in turn that the prices will become new prices as well.
            if (isset($tkt['TKT_is_default']) && $tkt['TKT_is_default']) {
                $TKT_values['TKT_ID'] = 0;
                $TKT_values['TKT_is_default'] = 0;
                $TKT_values['TKT_price'] = $ticket_price;
                $update_prices = true;
            }
            //if we have a TKT_ID then we need to get that existing TKT_obj and update it
            //we actually do our saves a head of doing any add_relations to because its entirely possible that this ticket didn't removed or added to any datetime in the session but DID have it's items modified.
            //keep in mind that if the TKT has been sold (and we have changed pricing information), then we won't be updating the tkt but instead a new tkt will be created and the old one archived.
            if ( ! empty($tkt['TKT_ID'])) {
                $TKT = EE_Registry::instance()
                                  ->load_model('Ticket', array($evtobj->get_timezone()))
                                  ->get_one_by_ID($tkt['TKT_ID']);
                if ($TKT instanceof EE_Ticket) {
                    $ticket_sold = $TKT->count_related(
                        'Registration',
                        array(
                            array(
                                'STS_ID' => array(
                                    'NOT IN',
                                    array(EEM_Registration::status_id_incomplete),
                                ),
                            ),
                        )
                    ) > 0 ? true : false;
                    //let's just check the total price for the existing ticket and determine if it matches the new total price.  if they are different then we create a new ticket (if tkts sold) if they aren't different then we go ahead and modify existing ticket.
                    $create_new_TKT = $ticket_sold && $ticket_price != $TKT->get('TKT_price')
                                      && ! $TKT->get(
                        'TKT_deleted'
                    ) ? true : false;
                    $TKT->set_date_format($incoming_date_formats[0]);
                    $TKT->set_time_format($incoming_date_formats[1]);
                    //set new values
                    foreach ($TKT_values as $field => $value) {
                        if ($field == 'TKT_qty') {
                            $TKT->set_qty($value);
                        } else {
                            $TKT->set($field, $value);
                        }
                    }
                    //if $create_new_TKT is false then we can safely update the existing ticket.  Otherwise we have to create a new ticket.
                    if ($create_new_TKT) {
                        //archive the old ticket first
                        $TKT->set('TKT_deleted', 1);
                        $TKT->save();
                        //make sure this ticket is still recorded in our saved_tkts so we don't run it through the regular trash routine.
                        $saved_tickets[$TKT->ID()] = $TKT;
                        //create new ticket that's a copy of the existing except a new id of course (and not archived) AND has the new TKT_price associated with it.
                        $TKT = clone $TKT;
                        $TKT->set('TKT_ID', 0);
                        $TKT->set('TKT_deleted', 0);
                        $TKT->set('TKT_price', $ticket_price);
                        $TKT->set('TKT_sold', 0);
                        //now we need to make sure that $new prices are created as well and attached to new ticket.
                        $update_prices = true;
                    }
                    //make sure price is set if it hasn't been already
                    $TKT->set('TKT_price', $ticket_price);
                }
            } else {
                //no TKT_id so a new TKT
                $TKT_values['TKT_price'] = $ticket_price;
                $TKT = EE_Registry::instance()->load_class('Ticket', array($TKT_values), false, false);
                if ($TKT instanceof EE_Ticket) {
                    //need to reset values to properly account for the date formats
                    $TKT->set_date_format($incoming_date_formats[0]);
                    $TKT->set_time_format($incoming_date_formats[1]);
                    $TKT->set_timezone($evtobj->get_timezone());
                    //set new values
                    foreach ($TKT_values as $field => $value) {
                        if ($field == 'TKT_qty') {
                            $TKT->set_qty($value);
                        } else {
                            $TKT->set($field, $value);
                        }
                    }
                    $update_prices = true;
                }
            }
            // cap ticket qty by datetime reg limits
            $TKT->set_qty(min($TKT->qty(), $TKT->qty('reg_limit')));
            //update ticket.
            $TKT->save();
            //before going any further make sure our dates are setup correctly so that the end date is always equal or greater than the start date.
            if ($TKT->get_raw('TKT_start_date') > $TKT->get_raw('TKT_end_date')) {
                $TKT->set('TKT_end_date', $TKT->get('TKT_start_date'));
                $TKT = EEH_DTT_Helper::date_time_add($TKT, 'TKT_end_date', 'days');
                $TKT->save();
            }
            //initially let's add the ticket to the dtt
            $saved_dtt->_add_relation_to($TKT, 'Ticket');
            $saved_tickets[$TKT->ID()] = $TKT;
            //add prices to ticket
            $this->_add_prices_to_ticket($data['edit_prices'][$row], $TKT, $update_prices);
        }
        //however now we need to handle permanently deleting tickets via the ui.  Keep in mind that the ui does not allow deleting/archiving tickets that have ticket sold.  However, it does allow for deleting tickets that have no tickets sold, in which case we want to get rid of permanently because there is no need to save in db.
        $old_tickets = isset($old_tickets[0]) && $old_tickets[0] == '' ? array() : $old_tickets;
        $tickets_removed = array_diff($old_tickets, array_keys($saved_tickets));
        foreach ($tickets_removed as $id) {
            $id = absint($id);
            //get the ticket for this id
            $tkt_to_remove = EE_Registry::instance()->load_model('Ticket')->get_one_by_ID($id);
            //need to get all the related datetimes on this ticket and remove from every single one of them (remember this process can ONLY kick off if there are NO tkts_sold)
            $dtts = $tkt_to_remove->get_many_related('Datetime');
            foreach ($dtts as $dtt) {
                $tkt_to_remove->_remove_relation_to($dtt, 'Datetime');
            }
            //need to do the same for prices (except these prices can also be deleted because again, tickets can only be trashed if they don't have any TKTs sold (otherwise they are just archived))
            $tkt_to_remove->delete_related_permanently('Price');
            //finally let's delete this ticket (which should not be blocked at this point b/c we've removed all our relationships)
            $tkt_to_remove->delete_permanently();
        }
        return array($saved_dtt, $saved_tickets);
    }



    /**
     * This attaches a list of given prices to a ticket.
     * Note we dont' have to worry about ever removing relationships (or archiving prices) because if there is a change
     * in price information on a ticket, a new ticket is created anyways so the archived ticket will retain the old
     * price info and prices are automatically "archived" via the ticket.
     *
     * @access  private
     * @param array     $prices     Array of prices from the form.
     * @param EE_Ticket $ticket     EE_Ticket object that prices are being attached to.
     * @param bool      $new_prices Whether attach existing incoming prices or create new ones.
     * @return  void
     */
    private function _add_prices_to_ticket($prices, EE_Ticket $ticket, $new_prices = false)
    {
        foreach ($prices as $row => $prc) {
            $PRC_values = array(
                'PRC_ID'         => ! empty($prc['PRC_ID']) ? $prc['PRC_ID'] : null,
                'PRT_ID'         => ! empty($prc['PRT_ID']) ? $prc['PRT_ID'] : null,
                'PRC_amount'     => ! empty($prc['PRC_amount']) ? $prc['PRC_amount'] : 0,
                'PRC_name'       => ! empty($prc['PRC_name']) ? $prc['PRC_name'] : '',
                'PRC_desc'       => ! empty($prc['PRC_desc']) ? $prc['PRC_desc'] : '',
                'PRC_is_default' => 0, //make sure prices are NOT set as default from this context
                'PRC_order'      => $row,
            );
            if ($new_prices || empty($PRC_values['PRC_ID'])) {
                $PRC_values['PRC_ID'] = 0;
                $PRC = EE_Registry::instance()->load_class('Price', array($PRC_values), false, false);
            } else {
                $PRC = EE_Registry::instance()->load_model('Price')->get_one_by_ID($prc['PRC_ID']);
                //update this price with new values
                foreach ($PRC_values as $field => $newprc) {
                    $PRC->set($field, $newprc);
                }
                $PRC->save();
            }
            $ticket->_add_relation_to($PRC, 'Price');
        }
    }



    /**
     * Add in our autosave ajax handlers
     *
     * @return void
     */
    protected function _ee_autosave_create_new()
    {
        // $this->_ee_autosave_edit();
    }



    protected function _ee_autosave_edit()
    {
        return; //TEMPORARILY EXITING CAUSE THIS IS A TODO
    }



    /**
     *    _generate_publish_box_extra_content
     *
     * @access private
     * @return void
     */
    private function _generate_publish_box_extra_content()
    {
        //load formatter helper
        //args for getting related registrations
        $approved_query_args = array(
            array(
                'REG_deleted' => 0,
                'STS_ID'      => EEM_Registration::status_id_approved,
            ),
        );
        $not_approved_query_args = array(
            array(
                'REG_deleted' => 0,
                'STS_ID'      => EEM_Registration::status_id_not_approved,
            ),
        );
        $pending_payment_query_args = array(
            array(
                'REG_deleted' => 0,
                'STS_ID'      => EEM_Registration::status_id_pending_payment,
            ),
        );
        // publish box
        $publish_box_extra_args = array(
            'view_approved_reg_url'        => add_query_arg(
                array(
                    'action'      => 'default',
                    'event_id'    => $this->_cpt_model_obj->ID(),
                    '_reg_status' => EEM_Registration::status_id_approved,
                ),
                REG_ADMIN_URL
            ),
            'view_not_approved_reg_url'    => add_query_arg(
                array(
                    'action'      => 'default',
                    'event_id'    => $this->_cpt_model_obj->ID(),
                    '_reg_status' => EEM_Registration::status_id_not_approved,
                ),
                REG_ADMIN_URL
            ),
            'view_pending_payment_reg_url' => add_query_arg(
                array(
                    'action'      => 'default',
                    'event_id'    => $this->_cpt_model_obj->ID(),
                    '_reg_status' => EEM_Registration::status_id_pending_payment,
                ),
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
            //'email_attendees_url' => add_query_arg(
            //	array(
            //		'event_admin_reports' => 'event_newsletter',
            //		'event_id' => $this->_cpt_model_obj->id
            //	),
            //	'admin.php?page=espresso_registrations'
            //),
        );
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
     * This just returns whatever is set as the _event object property
     * //todo this will become obsolete once the models are in place
     *
     * @return object
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
     */
    protected function _register_event_editor_meta_boxes()
    {
        $this->verify_cpt_object();
        add_meta_box(
            'espresso_event_editor_tickets',
            esc_html__('Event Datetime & Ticket', 'event_espresso'),
            array($this, 'ticket_metabox'),
            $this->page_slug,
            'normal',
            'high'
        );
        add_meta_box(
            'espresso_event_editor_event_options',
            esc_html__('Event Registration Options', 'event_espresso'),
            array($this, 'registration_options_meta_box'),
            $this->page_slug,
            'side',
            'default'
        );
        // NOTE: if you're looking for other metaboxes in here,
        // where a metabox has a related management page in the admin
        // you will find it setup in the related management page's "_Hooks" file.
        // i.e. messages metabox is found in "espresso_events_Messages_Hooks.class.php".
    }



    public function ticket_metabox()
    {
        $existing_datetime_ids = $existing_ticket_ids = array();
        //defaults for template args
        $template_args = array(
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
        );
        $event_id = is_object($this->_cpt_model_obj) ? $this->_cpt_model_obj->ID() : null;
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        /**
         * 1. Start with retrieving Datetimes
         * 2. Fore each datetime get related tickets
         * 3. For each ticket get related prices
         */
        $times = EE_Registry::instance()->load_model('Datetime')->get_all_event_dates($event_id);
        /** @type EE_Datetime $first_datetime */
        $first_datetime = reset($times);
        //do we get related tickets?
        if ($first_datetime instanceof EE_Datetime
            && $first_datetime->ID() !== 0
        ) {
            $existing_datetime_ids[] = $first_datetime->get('DTT_ID');
            $template_args['time'] = $first_datetime;
            $related_tickets = $first_datetime->tickets(
                array(
                    array('OR' => array('TKT_deleted' => 1, 'TKT_deleted*' => 0)),
                    'default_where_conditions' => 'none',
                )
            );
            if ( ! empty($related_tickets)) {
                $template_args['total_ticket_rows'] = count($related_tickets);
                $row = 0;
                foreach ($related_tickets as $ticket) {
                    $existing_ticket_ids[] = $ticket->get('TKT_ID');
                    $template_args['ticket_rows'] .= $this->_get_ticket_row($ticket, false, $row);
                    $row++;
                }
            } else {
                $template_args['total_ticket_rows'] = 1;
                /** @type EE_Ticket $ticket */
                $ticket = EE_Registry::instance()->load_model('Ticket')->create_default_object();
                $template_args['ticket_rows'] .= $this->_get_ticket_row($ticket);
            }
        } else {
            $template_args['time'] = $times[0];
            /** @type EE_Ticket $ticket */
            $ticket = EE_Registry::instance()->load_model('Ticket')->get_all_default_tickets();
            $template_args['ticket_rows'] .= $this->_get_ticket_row($ticket[1]);
            // NOTE: we're just sending the first default row
            // (decaf can't manage default tickets so this should be sufficient);
        }
        $template_args['event_datetime_help_link'] = $this->_get_help_tab_link(
            'event_editor_event_datetimes_help_tab'
        );
        $template_args['ticket_options_help_link'] = $this->_get_help_tab_link('ticket_options_info');
        $template_args['existing_datetime_ids'] = implode(',', $existing_datetime_ids);
        $template_args['existing_ticket_ids'] = implode(',', $existing_ticket_ids);
        $template_args['ticket_js_structure'] = $this->_get_ticket_row(
            EE_Registry::instance()->load_model('Ticket')->create_default_object(),
            true
        );
        $template = apply_filters(
            'FHEE__Events_Admin_Page__ticket_metabox__template',
            EVENTS_TEMPLATE_PATH . 'event_tickets_metabox_main.template.php'
        );
        EEH_Template::display_template($template, $template_args);
    }



    /**
     * Setup an individual ticket form for the decaf event editor page
     *
     * @access private
     * @param  EE_Ticket $ticket   the ticket object
     * @param  boolean   $skeleton whether we're generating a skeleton for js manipulation
     * @param int        $row
     * @return string generated html for the ticket row.
     */
    private function _get_ticket_row($ticket, $skeleton = false, $row = 0)
    {
        $template_args = array(
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
            'trash_icon'          => ($skeleton || ( ! empty($ticket) && ! $ticket->get('TKT_deleted')))
                                     && ( ! empty($ticket) && $ticket->get('TKT_sold') === 0)
                ? 'trash-icon dashicons dashicons-post-trash clickable' : 'ee-lock-icon',
            'disabled'            => $skeleton || ( ! empty($ticket) && ! $ticket->get('TKT_deleted')) ? ''
                : ' disabled=disabled',
        );
        $price = $ticket->ID() !== 0
            ? $ticket->get_first_related('Price', array('default_where_conditions' => 'none'))
            : EE_Registry::instance()->load_model('Price')->create_default_object();
        $price_args = array(
            'price_currency_symbol' => EE_Registry::instance()->CFG->currency->sign,
            'PRC_amount'            => $price->get('PRC_amount'),
            'PRT_ID'                => $price->get('PRT_ID'),
            'PRC_ID'                => $price->get('PRC_ID'),
            'PRC_is_default'        => $price->get('PRC_is_default'),
        );
        //make sure we have default start and end dates if skeleton
        //handle rows that should NOT be empty
        if (empty($template_args['TKT_start_date'])) {
            //if empty then the start date will be now.
            $template_args['TKT_start_date'] = date('Y-m-d h:i a', current_time('timestamp'));
        }
        if (empty($template_args['TKT_end_date'])) {
            //get the earliest datetime (if present);
            $earliest_dtt = $this->_cpt_model_obj->ID() > 0
                ? $this->_cpt_model_obj->get_first_related(
                    'Datetime',
                    array('order_by' => array('DTT_EVT_start' => 'ASC'))
                )
                : null;
            if ( ! empty($earliest_dtt)) {
                $template_args['TKT_end_date'] = $earliest_dtt->get_datetime('DTT_EVT_start', 'Y-m-d', 'h:i a');
            } else {
                $template_args['TKT_end_date'] = date(
                    'Y-m-d h:i a',
                    mktime(0, 0, 0, date("m"), date("d") + 7, date("Y"))
                );
            }
        }
        $template_args = array_merge($template_args, $price_args);
        $template = apply_filters(
            'FHEE__Events_Admin_Page__get_ticket_row__template',
            EVENTS_TEMPLATE_PATH . 'event_tickets_metabox_ticket_row.template.php',
            $ticket
        );
        return EEH_Template::display_template($template, $template_args, true);
    }



    public function registration_options_meta_box()
    {
        $yes_no_values = array(
            array('id' => true, 'text' => esc_html__('Yes', 'event_espresso')),
            array('id' => false, 'text' => esc_html__('No', 'event_espresso')),
        );
        $default_reg_status_values = EEM_Registration::reg_status_array(
            array(
                EEM_Registration::status_id_cancelled,
                EEM_Registration::status_id_declined,
                EEM_Registration::status_id_incomplete,
            ),
            true
        );
        //$template_args['is_active_select'] = EEH_Form_Fields::select_input('is_active', $yes_no_values, $this->_cpt_model_obj->is_active());
        $template_args['_event'] = $this->_cpt_model_obj;
        $template_args['active_status'] = $this->_cpt_model_obj->pretty_active_status(false);
        $template_args['additional_limit'] = $this->_cpt_model_obj->additional_limit();
        $template_args['default_registration_status'] = EEH_Form_Fields::select_input(
            'default_reg_status',
            $default_reg_status_values,
            $this->_cpt_model_obj->default_registration_status()
        );
        $template_args['display_description'] = EEH_Form_Fields::select_input(
            'display_desc',
            $yes_no_values,
            $this->_cpt_model_obj->display_description()
        );
        $template_args['display_ticket_selector'] = EEH_Form_Fields::select_input(
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
     * @return array an array of event objects.
     */
    public function get_events($per_page = 10, $current_page = 1, $count = false)
    {
        $EEME = $this->_event_model();
        $offset = ($current_page - 1) * $per_page;
        $limit = $count ? null : $offset . ',' . $per_page;
        $orderby = isset($this->_req_data['orderby']) ? $this->_req_data['orderby'] : 'EVT_ID';
        $order = isset($this->_req_data['order']) ? $this->_req_data['order'] : "DESC";
        if (isset($this->_req_data['month_range'])) {
            $pieces = explode(' ', $this->_req_data['month_range'], 3);
            //simulate the FIRST day of the month, that fixes issues for months like February
            //where PHP doesn't know what to assume for date.
            //@see https://events.codebasehq.com/projects/event-espresso/tickets/10437
            $month_r = ! empty($pieces[0]) ? date('m', \EEH_DTT_Helper::first_of_month_timestamp($pieces[0])) : '';
            $year_r = ! empty($pieces[1]) ? $pieces[1] : '';
        }
        $where = array();
        $status = isset($this->_req_data['status']) ? $this->_req_data['status'] : null;
        //determine what post_status our condition will have for the query.
        switch ($status) {
            case 'month' :
            case 'today' :
            case null :
            case 'all' :
                break;
            case 'draft' :
                $where['status'] = array('IN', array('draft', 'auto-draft'));
                break;
            default :
                $where['status'] = $status;
        }
        //categories?
        $category = isset($this->_req_data['EVT_CAT']) && $this->_req_data['EVT_CAT'] > 0
            ? $this->_req_data['EVT_CAT'] : null;
        if ( ! empty ($category)) {
            $where['Term_Taxonomy.taxonomy'] = 'espresso_event_categories';
            $where['Term_Taxonomy.term_id'] = $category;
        }
        //date where conditions
        $start_formats = EEM_Datetime::instance()->get_formats_for('DTT_EVT_start');
        if (isset($this->_req_data['month_range']) && $this->_req_data['month_range'] != '') {
            $DateTime = new DateTime(
                $year_r . '-' . $month_r . '-01 00:00:00',
                new DateTimeZone(EEM_Datetime::instance()->get_timezone())
            );
            $start = $DateTime->format(implode(' ', $start_formats));
            $end = $DateTime->setDate($year_r, $month_r, $DateTime
                ->format('t'))->setTime(23, 59, 59)
                            ->format(implode(' ', $start_formats));
            $where['Datetime.DTT_EVT_start'] = array('BETWEEN', array($start, $end));
        } else if (isset($this->_req_data['status']) && $this->_req_data['status'] == 'today') {
            $DateTime = new DateTime('now', new DateTimeZone(EEM_Event::instance()->get_timezone()));
            $start = $DateTime->setTime(0, 0, 0)->format(implode(' ', $start_formats));
            $end = $DateTime->setTime(23, 59, 59)->format(implode(' ', $start_formats));
            $where['Datetime.DTT_EVT_start'] = array('BETWEEN', array($start, $end));
        } else if (isset($this->_req_data['status']) && $this->_req_data['status'] == 'month') {
            $now = date('Y-m-01');
            $DateTime = new DateTime($now, new DateTimeZone(EEM_Event::instance()->get_timezone()));
            $start = $DateTime->setTime(0, 0, 0)->format(implode(' ', $start_formats));
            $end = $DateTime->setDate(date('Y'), date('m'), $DateTime->format('t'))
                            ->setTime(23, 59, 59)
                            ->format(implode(' ', $start_formats));
            $where['Datetime.DTT_EVT_start'] = array('BETWEEN', array($start, $end));
        }
        if ( ! EE_Registry::instance()->CAP->current_user_can('ee_read_others_events', 'get_events')) {
            $where['EVT_wp_user'] = get_current_user_id();
        } else {
            if ( ! isset($where['status'])) {
                if ( ! EE_Registry::instance()->CAP->current_user_can('ee_read_private_events', 'get_events')) {
                    $where['OR'] = array(
                        'status*restrict_private' => array('!=', 'private'),
                        'AND'                     => array(
                            'status*inclusive' => array('=', 'private'),
                            'EVT_wp_user'      => get_current_user_id(),
                        ),
                    );
                }
            }
        }
        if (isset($this->_req_data['EVT_wp_user'])) {
            if ($this->_req_data['EVT_wp_user'] != get_current_user_id()
                && EE_Registry::instance()->CAP->current_user_can('ee_read_others_events', 'get_events')
            ) {
                $where['EVT_wp_user'] = $this->_req_data['EVT_wp_user'];
            }
        }
        //search query handling
        if (isset($this->_req_data['s'])) {
            $search_string = '%' . $this->_req_data['s'] . '%';
            $where['OR'] = array(
                'EVT_name'       => array('LIKE', $search_string),
                'EVT_desc'       => array('LIKE', $search_string),
                'EVT_short_desc' => array('LIKE', $search_string),
            );
        }
        $where = apply_filters('FHEE__Events_Admin_Page__get_events__where', $where, $this->_req_data);
        $query_params = apply_filters(
            'FHEE__Events_Admin_Page__get_events__query_params',
            array(
                $where,
                'limit'    => $limit,
                'order_by' => $orderby,
                'order'    => $order,
                'group_by' => 'EVT_ID',
            ),
            $this->_req_data
        );
        //let's first check if we have special requests coming in.
        if (isset($this->_req_data['active_status'])) {
            switch ($this->_req_data['active_status']) {
                case 'upcoming' :
                    return $EEME->get_upcoming_events($query_params, $count);
                    break;
                case 'expired' :
                    return $EEME->get_expired_events($query_params, $count);
                    break;
                case 'active' :
                    return $EEME->get_active_events($query_params, $count);
                    break;
                case 'inactive' :
                    return $EEME->get_inactive_events($query_params, $count);
                    break;
            }
        }
        $events = $count ? $EEME->count(array($where), 'EVT_ID', true) : $EEME->get_all($query_params);
        return $events;
    }



    /**
     * handling for WordPress CPT actions (trash, restore, delete)
     *
     * @param string $post_id
     */
    public function trash_cpt_item($post_id)
    {
        $this->_req_data['EVT_ID'] = $post_id;
        $this->_trash_or_restore_event('trash', false);
    }



    /**
     * @param string $post_id
     */
    public function restore_cpt_item($post_id)
    {
        $this->_req_data['EVT_ID'] = $post_id;
        $this->_trash_or_restore_event('draft', false);
    }



    /**
     * @param string $post_id
     */
    public function delete_cpt_item($post_id)
    {
        $this->_req_data['EVT_ID'] = $post_id;
        $this->_delete_event(false);
    }



    /**
     * _trash_or_restore_event
     *
     * @access protected
     * @param  string $event_status
     * @param bool    $redirect_after
     */
    protected function _trash_or_restore_event($event_status = 'trash', $redirect_after = true)
    {
        //determine the event id and set to array.
        $EVT_ID = isset($this->_req_data['EVT_ID']) ? absint($this->_req_data['EVT_ID']) : false;
        // loop thru events
        if ($EVT_ID) {
            // clean status
            $event_status = sanitize_key($event_status);
            // grab status
            if ( ! empty($event_status)) {
                $success = $this->_change_event_status($EVT_ID, $event_status);
            } else {
                $success = false;
                $msg = esc_html__(
                    'An error occurred. The event could not be moved to the trash because a valid event status was not not supplied.',
                    'event_espresso'
                );
                EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            }
        } else {
            $success = false;
            $msg = esc_html__(
                'An error occurred. The event could not be moved to the trash because a valid event ID was not not supplied.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        }
        $action = $event_status == 'trash' ? 'moved to the trash' : 'restored from the trash';
        if ($redirect_after) {
            $this->_redirect_after_action($success, 'Event', $action, array('action' => 'default'));
        }
    }



    /**
     * _trash_or_restore_events
     *
     * @access protected
     * @param  string $event_status
     * @return void
     */
    protected function _trash_or_restore_events($event_status = 'trash')
    {
        // clean status
        $event_status = sanitize_key($event_status);
        // grab status
        if ( ! empty($event_status)) {
            $success = true;
            //determine the event id and set to array.
            $EVT_IDs = isset($this->_req_data['EVT_IDs']) ? (array)$this->_req_data['EVT_IDs'] : array();
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
            $msg = esc_html__(
                'An error occurred. The event could not be moved to the trash because a valid event status was not not supplied.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        }
        // in order to force a pluralized result message we need to send back a success status greater than 1
        $success = $success ? 2 : false;
        $action = $event_status == 'trash' ? 'moved to the trash' : 'restored from the trash';
        $this->_redirect_after_action($success, 'Events', $action, array('action' => 'default'));
    }



    /**
     * _trash_or_restore_events
     *
     * @access  private
     * @param  int    $EVT_ID
     * @param  string $event_status
     * @return bool
     */
    private function _change_event_status($EVT_ID = 0, $event_status = '')
    {
        // grab event id
        if ( ! $EVT_ID) {
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
            case 'draft' :
                $action = 'restored from the trash';
                $hook = 'AHEE_event_restored_from_trash';
                break;
            case 'trash' :
                $action = 'moved to the trash';
                $hook = 'AHEE_event_moved_to_trash';
                break;
            default :
                $action = 'updated';
                $hook = false;
        }
        //use class to change status
        $this->_cpt_model_obj->set_status($event_status);
        $success = $this->_cpt_model_obj->save();
        if ($success === false) {
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
     * _delete_event
     *
     * @access protected
     * @param bool $redirect_after
     */
    protected function _delete_event($redirect_after = true)
    {
        //determine the event id and set to array.
        $EVT_ID = isset($this->_req_data['EVT_ID']) ? absint($this->_req_data['EVT_ID']) : null;
        $EVT_ID = isset($this->_req_data['post']) ? absint($this->_req_data['post']) : $EVT_ID;
        // loop thru events
        if ($EVT_ID) {
            $success = $this->_permanently_delete_event($EVT_ID);
            // get list of events with no prices
            $espresso_no_ticket_prices = get_option('ee_no_ticket_prices', array());
            // remove this event from the list of events with no prices
            if (isset($espresso_no_ticket_prices[$EVT_ID])) {
                unset($espresso_no_ticket_prices[$EVT_ID]);
            }
            update_option('ee_no_ticket_prices', $espresso_no_ticket_prices);
        } else {
            $success = false;
            $msg = esc_html__(
                'An error occurred. An event could not be deleted because a valid event ID was not not supplied.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        }
        if ($redirect_after) {
            $this->_redirect_after_action(
                $success,
                'Event',
                'deleted',
                array('action' => 'default', 'status' => 'trash')
            );
        }
    }



    /**
     * _delete_events
     *
     * @access protected
     * @return void
     */
    protected function _delete_events()
    {
        $success = true;
        // get list of events with no prices
        $espresso_no_ticket_prices = get_option('ee_no_ticket_prices', array());
        //determine the event id and set to array.
        $EVT_IDs = isset($this->_req_data['EVT_IDs']) ? (array)$this->_req_data['EVT_IDs'] : array();
        // loop thru events
        foreach ($EVT_IDs as $EVT_ID) {
            $EVT_ID = absint($EVT_ID);
            if ($EVT_ID) {
                $results = $this->_permanently_delete_event($EVT_ID);
                $success = $results !== false ? $success : false;
                // remove this event from the list of events with no prices
                unset($espresso_no_ticket_prices[$EVT_ID]);
            } else {
                $success = false;
                $msg = esc_html__(
                    'An error occurred. An event could not be deleted because a valid event ID was not not supplied.',
                    'event_espresso'
                );
                EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            }
        }
        update_option('ee_no_ticket_prices', $espresso_no_ticket_prices);
        // in order to force a pluralized result message we need to send back a success status greater than 1
        $success = $success ? 2 : false;
        $this->_redirect_after_action($success, 'Events', 'deleted', array('action' => 'default'));
    }



    /**
     * _permanently_delete_event
     *
     * @access  private
     * @param  int $EVT_ID
     * @return bool
     */
    private function _permanently_delete_event($EVT_ID = 0)
    {
        // grab event id
        if ( ! $EVT_ID) {
            $msg = esc_html__(
                'An error occurred. No Event ID or an invalid Event ID was received.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        if (
            ! $this->_cpt_model_obj instanceof EE_Event
            || $this->_cpt_model_obj->ID() !== $EVT_ID
        ) {
            $this->_cpt_model_obj = EEM_Event::instance()->get_one_by_ID($EVT_ID);
        }
        if ( ! $this->_cpt_model_obj instanceof EE_Event) {
            return false;
        }
        //need to delete related tickets and prices first.
        $datetimes = $this->_cpt_model_obj->get_many_related('Datetime');
        foreach ($datetimes as $datetime) {
            $this->_cpt_model_obj->_remove_relation_to($datetime, 'Datetime');
            $tickets = $datetime->get_many_related('Ticket');
            foreach ($tickets as $ticket) {
                $ticket->_remove_relation_to($datetime, 'Datetime');
                $ticket->delete_related_permanently('Price');
                $ticket->delete_permanently();
            }
            $datetime->delete();
        }
        //what about related venues or terms?
        $venues = $this->_cpt_model_obj->get_many_related('Venue');
        foreach ($venues as $venue) {
            $this->_cpt_model_obj->_remove_relation_to($venue, 'Venue');
        }
        //any attached question groups?
        $question_groups = $this->_cpt_model_obj->get_many_related('Question_Group');
        if ( ! empty($question_groups)) {
            foreach ($question_groups as $question_group) {
                $this->_cpt_model_obj->_remove_relation_to($question_group, 'Question_Group');
            }
        }
        //Message Template Groups
        $this->_cpt_model_obj->_remove_relations('Message_Template_Group');
        /** @type EE_Term_Taxonomy[] $term_taxonomies */
        $term_taxonomies = $this->_cpt_model_obj->term_taxonomies();
        foreach ($term_taxonomies as $term_taxonomy) {
            $this->_cpt_model_obj->remove_relation_to_term_taxonomy($term_taxonomy);
        }
        $success = $this->_cpt_model_obj->delete_permanently();
        // did it all go as planned ?
        if ($success) {
            $msg = sprintf(esc_html__('Event ID # %d has been deleted.', 'event_espresso'), $EVT_ID);
            EE_Error::add_success($msg);
        } else {
            $msg = sprintf(
                esc_html__('An error occurred. Event ID # %d could not be deleted.', 'event_espresso'),
                $EVT_ID
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        do_action('AHEE__Events_Admin_Page___permanently_delete_event__after_event_deleted', $EVT_ID);
        return true;
    }



    /**
     * get total number of events
     *
     * @access public
     * @return int
     */
    public function total_events()
    {
        $count = EEM_Event::instance()->count(array('caps' => 'read_admin'), 'EVT_ID', true);
        return $count;
    }



    /**
     * get total number of draft events
     *
     * @access public
     * @return int
     */
    public function total_events_draft()
    {
        $where = array(
            'status' => array('IN', array('draft', 'auto-draft')),
        );
        $count = EEM_Event::instance()->count(array($where, 'caps' => 'read_admin'), 'EVT_ID', true);
        return $count;
    }



    /**
     * get total number of trashed events
     *
     * @access public
     * @return int
     */
    public function total_trashed_events()
    {
        $where = array(
            'status' => 'trash',
        );
        $count = EEM_Event::instance()->count(array($where, 'caps' => 'read_admin'), 'EVT_ID', true);
        return $count;
    }



    /**
     *    _default_event_settings
     *    This generates the Default Settings Tab
     *
     * @return void
     */
    protected function _default_event_settings()
    {
        $this->_template_args['values'] = $this->_yes_no_values;
        $this->_template_args['reg_status_array'] = EEM_Registration::reg_status_array(
        // exclude array
            array(
                EEM_Registration::status_id_cancelled,
                EEM_Registration::status_id_declined,
                EEM_Registration::status_id_incomplete,
                EEM_Registration::status_id_wait_list,
            ),
            // translated
            true
        );
        $this->_template_args['default_reg_status'] = isset(
                                                          EE_Registry::instance()->CFG->registration->default_STS_ID
                                                      )
                                                      && array_key_exists(
                                                          EE_Registry::instance()->CFG->registration->default_STS_ID,
                                                          $this->_template_args['reg_status_array']
                                                      )
            ? sanitize_text_field(EE_Registry::instance()->CFG->registration->default_STS_ID)
            : EEM_Registration::status_id_pending_payment;
        $this->_set_add_edit_form_tags('update_default_event_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            EVENTS_TEMPLATE_PATH . 'event_settings.template.php',
            $this->_template_args,
            true
        );
        $this->display_admin_page_with_sidebar();
    }



    /**
     * _update_default_event_settings
     *
     * @access protected
     * @return void
     */
    protected function _update_default_event_settings()
    {
        EE_Config::instance()->registration->default_STS_ID = isset($this->_req_data['default_reg_status'])
            ? sanitize_text_field($this->_req_data['default_reg_status'])
            : EEM_Registration::status_id_pending_payment;
        $what = 'Default Event Settings';
        $success = $this->_update_espresso_configuration(
            $what,
            EE_Config::instance(),
            __FILE__,
            __FUNCTION__,
            __LINE__
        );
        $this->_redirect_after_action($success, $what, 'updated', array('action' => 'default_event_settings'));
    }



    /*************        Templates        *************/
    protected function _template_settings()
    {
        $this->_admin_page_title = esc_html__('Template Settings (Preview)', 'event_espresso');
        $this->_template_args['preview_img'] = '<img src="'
                                               . EVENTS_ASSETS_URL
                                               . DS
                                               . 'images'
                                               . DS
                                               . 'caffeinated_template_features.jpg" alt="'
                                               . esc_attr__('Template Settings Preview screenshot', 'event_espresso')
                                               . '" />';
        $this->_template_args['preview_text'] = '<strong>' . esc_html__(
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
        //set default category object
        $this->_set_empty_category_object();
        //only set if we've got an id
        if ( ! isset($this->_req_data['EVT_CAT_ID'])) {
            return;
        }
        $category_id = absint($this->_req_data['EVT_CAT_ID']);
        $term = get_term($category_id, 'espresso_event_categories');
        if ( ! empty($term)) {
            $this->_category->category_name = $term->name;
            $this->_category->category_identifier = $term->slug;
            $this->_category->category_desc = $term->description;
            $this->_category->id = $term->term_id;
            $this->_category->parent = $term->parent;
        }
    }



    private function _set_empty_category_object()
    {
        $this->_category = new stdClass();
        $this->_category->category_name = $this->_category->category_identifier = $this->_category->category_desc = '';
        $this->_category->id = $this->_category->parent = 0;
    }



    protected function _category_list_table()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $this->_search_btn_label = esc_html__('Categories', 'event_espresso');
        $this->_admin_page_title .= ' ' . $this->get_action_link_or_button(
                'add_category',
                'add_category',
                array(),
                'add-new-h2'
            );
        $this->display_admin_list_table_page_with_sidebar();
    }



    /**
     * @param $view
     */
    protected function _category_details($view)
    {
        //load formatter helper
        //load field generator helper
        $route = $view == 'edit' ? 'update_category' : 'insert_category';
        $this->_set_add_edit_form_tags($route);
        $this->_set_category_object();
        $id = ! empty($this->_category->id) ? $this->_category->id : '';
        $delete_action = 'delete_category';
        //custom redirect
        $redirect = EE_Admin_Page::add_query_args_and_nonce(
            array('action' => 'category_list'),
            $this->_admin_base_url
        );
        $this->_set_publish_post_box_vars('EVT_CAT_ID', $id, $delete_action, $redirect);
        //take care of contents
        $this->_template_args['admin_page_content'] = $this->_category_details_content();
        $this->display_admin_page_with_sidebar();
    }



    /**
     * @return mixed
     */
    protected function _category_details_content()
    {
        $editor_args['category_desc'] = array(
            'type'          => 'wp_editor',
            'value'         => EEH_Formatter::admin_format_content($this->_category->category_desc),
            'class'         => 'my_editor_custom',
            'wpeditor_args' => array('media_buttons' => false),
        );
        $_wp_editor = $this->_generate_admin_form_fields($editor_args, 'array');
        $all_terms = get_terms(
            array('espresso_event_categories'),
            array('hide_empty' => 0, 'exclude' => array($this->_category->id))
        );
        //setup category select for term parents.
        $category_select_values[] = array(
            'text' => esc_html__('No Parent', 'event_espresso'),
            'id'   => 0,
        );
        foreach ($all_terms as $term) {
            $category_select_values[] = array(
                'text' => $term->name,
                'id'   => $term->term_id,
            );
        }
        $category_select = EEH_Form_Fields::select_input(
            'category_parent',
            $category_select_values,
            $this->_category->parent
        );
        $template_args = array(
            'category'                 => $this->_category,
            'category_select'          => $category_select,
            'unique_id_info_help_link' => $this->_get_help_tab_link('unique_id_info'),
            'category_desc_editor'     => $_wp_editor['category_desc']['field'],
            'disable'                  => '',
            'disabled_message'         => false,
        );
        $template = EVENTS_TEMPLATE_PATH . 'event_category_details.template.php';
        return EEH_Template::display_template($template, $template_args, true);
    }



    protected function _delete_categories()
    {
        $cat_ids = isset($this->_req_data['EVT_CAT_ID']) ? (array)$this->_req_data['EVT_CAT_ID']
            : (array)$this->_req_data['category_id'];
        foreach ($cat_ids as $cat_id) {
            $this->_delete_category($cat_id);
        }
        //doesn't matter what page we're coming from... we're going to the same place after delete.
        $query_args = array(
            'action' => 'category_list',
        );
        $this->_redirect_after_action(0, '', '', $query_args);
    }



    /**
     * @param $cat_id
     */
    protected function _delete_category($cat_id)
    {
        $cat_id = absint($cat_id);
        wp_delete_term($cat_id, 'espresso_event_categories');
    }



    /**
     * @param $new_category
     */
    protected function _insert_or_update_category($new_category)
    {
        $cat_id = $new_category ? $this->_insert_category() : $this->_insert_category(true);
        $success = 0; //we already have a success message so lets not send another.
        if ($cat_id) {
            $query_args = array(
                'action'     => 'edit_category',
                'EVT_CAT_ID' => $cat_id,
            );
        } else {
            $query_args = array('action' => 'add_category');
        }
        $this->_redirect_after_action($success, '', '', $query_args, true);
    }



    /**
     * @param bool $update
     * @return bool|mixed|string
     */
    private function _insert_category($update = false)
    {
        $cat_id = $update ? $this->_req_data['EVT_CAT_ID'] : '';
        $category_name = isset($this->_req_data['category_name']) ? $this->_req_data['category_name'] : '';
        $category_desc = isset($this->_req_data['category_desc']) ? $this->_req_data['category_desc'] : '';
        $category_parent = isset($this->_req_data['category_parent']) ? $this->_req_data['category_parent'] : 0;
        if (empty($category_name)) {
            $msg = esc_html__('You must add a name for the category.', 'event_espresso');
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        $term_args = array(
            'name'        => $category_name,
            'description' => $category_desc,
            'parent'      => $category_parent,
        );
        //was the category_identifier input disabled?
        if (isset($this->_req_data['category_identifier'])) {
            $term_args['slug'] = $this->_req_data['category_identifier'];
        }
        $insert_ids = $update
            ? wp_update_term($cat_id, 'espresso_event_categories', $term_args)
            : wp_insert_term($category_name, 'espresso_event_categories', $term_args);
        if ( ! is_array($insert_ids)) {
            $msg = esc_html__(
                'An error occurred and the category has not been saved to the database.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        } else {
            $cat_id = $insert_ids['term_id'];
            $msg = sprintf(esc_html__('The category %s was successfully saved', 'event_espresso'), $category_name);
            EE_Error::add_success($msg);
        }
        return $cat_id;
    }



    /**
     * @param int  $per_page
     * @param int  $current_page
     * @param bool $count
     * @return \EE_Base_Class[]|int
     */
    public function get_categories($per_page = 10, $current_page = 1, $count = false)
    {
        //testing term stuff
        $orderby = isset($this->_req_data['orderby']) ? $this->_req_data['orderby'] : 'Term.term_id';
        $order = isset($this->_req_data['order']) ? $this->_req_data['order'] : 'DESC';
        $limit = ($current_page - 1) * $per_page;
        $where = array('taxonomy' => 'espresso_event_categories');
        if (isset($this->_req_data['s'])) {
            $sstr = '%' . $this->_req_data['s'] . '%';
            $where['OR'] = array(
                'Term.name'   => array('LIKE', $sstr),
                'description' => array('LIKE', $sstr),
            );
        }
        $query_params = array(
            $where,
            'order_by'   => array($orderby => $order),
            'limit'      => $limit . ',' . $per_page,
            'force_join' => array('Term'),
        );
        $categories = $count
            ? EEM_Term_Taxonomy::instance()->count($query_params, 'term_id')
            : EEM_Term_Taxonomy::instance()->get_all($query_params);
        return $categories;
    }



    /* end category stuff */
    /**************/
}
//end class Events_Admin_Page

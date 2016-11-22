<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}


/**
 * Extend_Events_Admin_Page
 * This is the Events Caffeinated admin page.
 *
 * @package         Extend_Events_Admin_Page
 * @subpackage      includes/core/admin/Extend_Events_Admin_Page.core.php
 * @author          Darren Ethier
 */
class Extend_Events_Admin_Page extends Events_Admin_Page
{


    /**
     * Extend_Events_Admin_Page constructor.
     *
     * @param bool $routing
     */
    public function __construct($routing = true)
    {
        parent::__construct($routing);
        if ( ! defined('EVENTS_CAF_TEMPLATE_PATH')) {
            define('EVENTS_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'events/templates/');
            define('EVENTS_CAF_ASSETS', EE_CORE_CAF_ADMIN_EXTEND . 'events/assets/');
            define('EVENTS_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'events/assets/');
        }
    }



    protected function _extend_page_config()
    {
        $this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'events';
        //is there a evt_id in the request?
        $evt_id = ! empty($this->_req_data['EVT_ID']) && ! is_array($this->_req_data['EVT_ID'])
            ? $this->_req_data['EVT_ID']
            : 0;
        $evt_id = ! empty($this->_req_data['post']) ? $this->_req_data['post'] : $evt_id;
        //tkt_id?
        $tkt_id = ! empty($this->_req_data['TKT_ID']) && ! is_array($this->_req_data['TKT_ID'])
            ? $this->_req_data['TKT_ID']
            : 0;
        $new_page_routes = array(
            'duplicate_event'          => array(
                'func'       => '_duplicate_event',
                'capability' => 'ee_edit_event',
                'obj_id'     => $evt_id,
                'noheader'   => true,
            ),
            'ticket_list_table'        => array(
                'func'       => '_tickets_overview_list_table',
                'capability' => 'ee_read_default_tickets',
            ),
            'trash_ticket'             => array(
                'func'       => '_trash_or_restore_ticket',
                'capability' => 'ee_delete_default_ticket',
                'obj_id'     => $tkt_id,
                'noheader'   => true,
                'args'       => array('trash' => true),
            ),
            'trash_tickets'            => array(
                'func'       => '_trash_or_restore_ticket',
                'capability' => 'ee_delete_default_tickets',
                'noheader'   => true,
                'args'       => array('trash' => true),
            ),
            'restore_ticket'           => array(
                'func'       => '_trash_or_restore_ticket',
                'capability' => 'ee_delete_default_ticket',
                'obj_id'     => $tkt_id,
                'noheader'   => true,
            ),
            'restore_tickets'          => array(
                'func'       => '_trash_or_restore_ticket',
                'capability' => 'ee_delete_default_tickets',
                'noheader'   => true,
            ),
            'delete_ticket'            => array(
                'func'       => '_delete_ticket',
                'capability' => 'ee_delete_default_ticket',
                'obj_id'     => $tkt_id,
                'noheader'   => true,
            ),
            'delete_tickets'           => array(
                'func'       => '_delete_ticket',
                'capability' => 'ee_delete_default_tickets',
                'noheader'   => true,
            ),
            'import_page'              => array(
                'func'       => '_import_page',
                'capability' => 'import',
            ),
            'import'                   => array(
                'func'       => '_import_events',
                'capability' => 'import',
                'noheader'   => true,
            ),
            'import_events'            => array(
                'func'       => '_import_events',
                'capability' => 'import',
                'noheader'   => true,
            ),
            'export_events'            => array(
                'func'       => '_events_export',
                'capability' => 'export',
                'noheader'   => true,
            ),
            'export_categories'        => array(
                'func'       => '_categories_export',
                'capability' => 'export',
                'noheader'   => true,
            ),
            'sample_export_file'       => array(
                'func'       => '_sample_export_file',
                'capability' => 'export',
                'noheader'   => true,
            ),
            'update_template_settings' => array(
                'func'       => '_update_template_settings',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
        );
        $this->_page_routes = array_merge($this->_page_routes, $new_page_routes);
        //partial route/config override
        $this->_page_config['import_events']['metaboxes'] = $this->_default_espresso_metaboxes;
        $this->_page_config['create_new']['metaboxes'][]  = '_premium_event_editor_meta_boxes';
        $this->_page_config['create_new']['qtips'][]      = 'EE_Event_Editor_Tips';
        $this->_page_config['edit']['qtips'][]            = 'EE_Event_Editor_Tips';
        $this->_page_config['edit']['metaboxes'][]        = '_premium_event_editor_meta_boxes';
        $this->_page_config['default']['list_table']      = 'Extend_Events_Admin_List_Table';
        //add tickets tab but only if there are more than one default ticket!
        $tkt_count = EEM_Ticket::instance()->count_deleted_and_undeleted(
            array(array('TKT_is_default' => 1)),
            'TKT_ID',
            true
        );
        if ($tkt_count > 1) {
            $new_page_config = array(
                'ticket_list_table' => array(
                    'nav'           => array(
                        'label' => esc_html__('Default Tickets', 'event_espresso'),
                        'order' => 60,
                    ),
                    'list_table'    => 'Tickets_List_Table',
                    'require_nonce' => false,
                ),
            );
        }
        //template settings
        $new_page_config['template_settings'] = array(
            'nav'           => array(
                'label' => esc_html__('Templates', 'event_espresso'),
                'order' => 30,
            ),
            'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
            'help_tabs'     => array(
                'general_settings_templates_help_tab' => array(
                    'title'    => esc_html__('Templates', 'event_espresso'),
                    'filename' => 'general_settings_templates',
                ),
            ),
            'help_tour'     => array('Templates_Help_Tour'),
            'require_nonce' => false,
        );
        $this->_page_config = array_merge($this->_page_config, $new_page_config);
        //add filters and actions
        //modifying _views
        add_filter(
            'FHEE_event_datetime_metabox_add_additional_date_time_template',
            array($this, 'add_additional_datetime_button'),
            10,
            2
        );
        add_filter(
            'FHEE_event_datetime_metabox_clone_button_template',
            array($this, 'add_datetime_clone_button'),
            10,
            2
        );
        add_filter(
            'FHEE_event_datetime_metabox_timezones_template',
            array($this, 'datetime_timezones_template'),
            10,
            2
        );
        //filters for event list table
        add_filter('FHEE__Extend_Events_Admin_List_Table__filters', array($this, 'list_table_filters'), 10, 2);
        add_filter(
            'FHEE__Events_Admin_List_Table__column_actions__action_links',
            array($this, 'extra_list_table_actions'),
            10,
            2
        );
        //legend item
        add_filter('FHEE__Events_Admin_Page___event_legend_items__items', array($this, 'additional_legend_items'));
        add_action('admin_init', array($this, 'admin_init'));
        //heartbeat stuff
        add_filter('heartbeat_received', array($this, 'heartbeat_response'), 10, 2);
    }



    /**
     * admin_init
     */
    public function admin_init()
    {
        EE_Registry::$i18n_js_strings = array_merge(
            EE_Registry::$i18n_js_strings,
            array(
                'image_confirm'          => esc_html__(
                    'Do you really want to delete this image? Please remember to update your event to complete the removal.',
                    'event_espresso'
                ),
                'event_starts_on'        => esc_html__('Event Starts on', 'event_espresso'),
                'event_ends_on'          => esc_html__('Event Ends on', 'event_espresso'),
                'event_datetime_actions' => esc_html__('Actions', 'event_espresso'),
                'event_clone_dt_msg'     => esc_html__('Clone this Event Date and Time', 'event_espresso'),
                'remove_event_dt_msg'    => esc_html__('Remove this Event Time', 'event_espresso'),
            )
        );
    }



    /**
     * This will be used to listen for any heartbeat data packages coming via the WordPress heartbeat API and handle
     * accordingly.
     *
     * @param array $response The existing heartbeat response array.
     * @param array $data     The incoming data package.
     * @return array  possibly appended response.
     */
    public function heartbeat_response($response, $data)
    {
        /**
         * check whether count of tickets is approaching the potential
         * limits for the server.
         */
        if ( ! empty($data['input_count'])) {
            $response['max_input_vars_check'] = EE_Registry::instance()->CFG->environment->max_input_vars_limit_check(
                $data['input_count']
            );
        }
        return $response;
    }



    protected function _add_screen_options_ticket_list_table()
    {
        $this->_per_page_screen_option();
    }



    /**
     * @param string $return
     * @param int    $id
     * @param string $new_title
     * @param string $new_slug
     * @return string
     */
    public function extra_permalink_field_buttons($return, $id, $new_title, $new_slug)
    {
        $return = parent::extra_permalink_field_buttons($return, $id, $new_title, $new_slug);
        //make sure this is only when editing
        if ( ! empty($id)) {
            $href  = EE_Admin_Page::add_query_args_and_nonce(
                array('action' => 'duplicate_event', 'EVT_ID' => $id),
                $this->_admin_base_url
            );
            $title = esc_attr__('Duplicate Event', 'event_espresso');
            $return .= '<a href="'
                       . $href
                       . '" title="'
                       . $title
                       . '" id="ee-duplicate-event-button" class="button button-small"  value="duplicate_event">'
                       . $title
                       . '</button>';
        }
        return $return;
    }



    public function _set_list_table_views_ticket_list_table()
    {
        $this->_views = array(
            'all'     => array(
                'slug'        => 'all',
                'label'       => esc_html__('All', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array(
                    'trash_tickets' => esc_html__('Move to Trash', 'event_espresso'),
                ),
            ),
            'trashed' => array(
                'slug'        => 'trashed',
                'label'       => esc_html__('Trash', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array(
                    'restore_tickets' => esc_html__('Restore from Trash', 'event_espresso'),
                    'delete_tickets'  => esc_html__('Delete Permanently', 'event_espresso'),
                ),
            ),
        );
    }



    public function load_scripts_styles_edit()
    {
        wp_register_script(
            'ee-event-editor-heartbeat',
            EVENTS_CAF_ASSETS_URL . 'event-editor-heartbeat.js',
            array('ee_admin_js', 'heartbeat'),
            EVENT_ESPRESSO_VERSION,
            true
        );
        /**
         * load accounting js.
         */
        add_filter('FHEE_load_accounting_js', '__return_true');
        //styles
        wp_enqueue_style('espresso-ui-theme');
        wp_enqueue_script('event_editor_js');
        wp_enqueue_script('ee-event-editor-heartbeat');
    }



    /**
     * @param $template
     * @param $template_args
     * @return mixed
     */
    public function add_additional_datetime_button($template, $template_args)
    {
        return EEH_Template::display_template(
            EVENTS_CAF_TEMPLATE_PATH . 'event_datetime_add_additional_time.template.php',
            $template_args,
            true
        );
    }



    /**
     * @param $template
     * @param $template_args
     * @return mixed
     */
    public function add_datetime_clone_button($template, $template_args)
    {
        return EEH_Template::display_template(
            EVENTS_CAF_TEMPLATE_PATH . 'event_datetime_metabox_clone_button.template.php',
            $template_args,
            true
        );
    }



    /**
     * @param $template
     * @param $template_args
     * @return mixed
     */
    public function datetime_timezones_template($template, $template_args)
    {
        return EEH_Template::display_template(
            EVENTS_CAF_TEMPLATE_PATH . 'event_datetime_timezones.template.php',
            $template_args,
            true
        );
    }



    protected function _set_list_table_views_default()
    {
        parent::_set_list_table_views_default();
        $new_views = array(
            'today' => array(
                'slug'        => 'today',
                'label'       => esc_html__('Today', 'event_espresso'),
                'count'       => $this->total_events_today(),
                'bulk_action' => array(
                    'trash_events' => esc_html__('Move to Trash', 'event_espresso'),
                ),
            ),
            'month' => array(
                'slug'        => 'month',
                'label'       => esc_html__('This Month', 'event_espresso'),
                'count'       => $this->total_events_this_month(),
                'bulk_action' => array(
                    'trash_events' => esc_html__('Move to Trash', 'event_espresso'),
                ),
            ),
        );
        $this->_views = array_merge($this->_views, $new_views);
    }



    /**
     * @param array     $action_links
     * @param \EE_Event $event
     * @return array
     */
    public function extra_list_table_actions(array $action_links, \EE_Event $event)
    {
        if (
        EE_Registry::instance()->CAP->current_user_can(
            'ee_read_registrations',
            'espresso_registrations_reports',
            $event->ID()
        )
        ) {
            $reports_query_args = array(
                'action' => 'reports',
                'EVT_ID' => $event->ID(),
            );
            $reports_link       = EE_Admin_Page::add_query_args_and_nonce($reports_query_args, REG_ADMIN_URL);
            $action_links[]     = '<a href="'
                                  . $reports_link
                                  . '" title="'
                                  . esc_attr__('View Report', 'event_espresso')
                                  . '"><div class="dashicons dashicons-chart-bar"></div></a>'
                                  . "\n\t";
        }
        if (EE_Registry::instance()->CAP->current_user_can('ee_read_global_messages', 'view_filtered_messages')) {
            EE_Registry::instance()->load_helper('MSG_Template');
            $action_links[] = EEH_MSG_Template::get_message_action_link(
                'see_notifications_for',
                null,
                array('EVT_ID' => $event->ID())
            );
        }
        return $action_links;
    }



    /**
     * @param $items
     * @return mixed
     */
    public function additional_legend_items($items)
    {
        if (
        EE_Registry::instance()->CAP->current_user_can(
            'ee_read_registrations',
            'espresso_registrations_reports'
        )
        ) {
            $items['reports'] = array(
                'class' => 'dashicons dashicons-chart-bar',
                'desc'  => esc_html__('Event Reports', 'event_espresso'),
            );
        }
        if (EE_Registry::instance()->CAP->current_user_can('ee_read_global_messages', 'view_filtered_messages')) {
            $related_for_icon = EEH_MSG_Template::get_message_action_icon('see_notifications_for');
            if (isset($related_for_icon['css_class']) && isset($related_for_icon['label'])) {
                $items['view_related_messages'] = array(
                    'class' => $related_for_icon['css_class'],
                    'desc'  => $related_for_icon['label'],
                );
            }
        }
        return $items;
    }



    /**
     * This is the callback method for the duplicate event route
     * Method looks for 'EVT_ID' in the request and retrieves that event and its details and duplicates them
     * into a new event.  We add a hook so that any plugins that add extra event details can hook into this
     * action.  Note that the dupe will have **DUPLICATE** as its title and slug.
     * After duplication the redirect is to the new event edit page.
     *
     * @return void
     * @access protected
     * @throws EE_Error If EE_Event is not available with given ID
     */
    protected function _duplicate_event()
    {
        // first make sure the ID for the event is in the request.
        //  If it isn't then we need to bail and redirect back to overview list table (cause how did we get here?)
        if ( ! isset($this->_req_data['EVT_ID'])) {
            EE_Error::add_error(
                esc_html__(
                    'In order to duplicate an event an Event ID is required.  None was given.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $this->_redirect_after_action(false, '', '', array(), true);
            return;
        }
        //k we've got EVT_ID so let's use that to get the event we'll duplicate
        $orig_event = EEM_Event::instance()->get_one_by_ID($this->_req_data['EVT_ID']);
        if ( ! $orig_event instanceof EE_Event) {
            throw new EE_Error(
                sprintf(
                    esc_html__('An EE_Event object could not be retrieved for the given ID (%s)', 'event_espresso'),
                    $this->_req_data['EVT_ID']
                )
            );
        }
        //k now let's clone the $orig_event before getting relations
        $new_event = clone $orig_event;
        //original datetimes
        $orig_datetimes = $orig_event->get_many_related('Datetime');
        //other original relations
        $orig_ven = $orig_event->get_many_related('Venue');
        //reset the ID and modify other details to make it clear this is a dupe
        $new_event->set('EVT_ID', 0);
        $new_name = $new_event->name() . ' ' . esc_html__('**DUPLICATE**', 'event_espresso');
        $new_event->set('EVT_name', $new_name);
        $new_event->set(
            'EVT_slug',
            wp_unique_post_slug(
                sanitize_title($orig_event->name()),
                0,
                'publish',
                'espresso_events',
                0
            )
        );
        $new_event->set('status', 'draft');
        //duplicate discussion settings
        $new_event->set('comment_status', $orig_event->get('comment_status'));
        $new_event->set('ping_status', $orig_event->get('ping_status'));
        //save the new event
        $new_event->save();
        //venues
        foreach ($orig_ven as $ven) {
            $new_event->_add_relation_to($ven, 'Venue');
        }
        $new_event->save();
        //now we need to get the question group relations and handle that
        //first primary question groups
        $orig_primary_qgs = $orig_event->get_many_related(
            'Question_Group',
            array(array('Event_Question_Group.EQG_primary' => 1))
        );
        if ( ! empty($orig_primary_qgs)) {
            foreach ($orig_primary_qgs as $id => $obj) {
                if ($obj instanceof EE_Question_Group) {
                    $new_event->_add_relation_to($obj, 'Question_Group', array('EQG_primary' => 1));
                }
            }
        }
        //next additional attendee question groups
        $orig_additional_qgs = $orig_event->get_many_related(
            'Question_Group',
            array(array('Event_Question_Group.EQG_primary' => 0))
        );
        if ( ! empty($orig_additional_qgs)) {
            foreach ($orig_additional_qgs as $id => $obj) {
                if ($obj instanceof EE_Question_Group) {
                    $new_event->_add_relation_to($obj, 'Question_Group', array('EQG_primary' => 0));
                }
            }
        }
        //now save
        $new_event->save();
        //k now that we have the new event saved we can loop through the datetimes and start adding relations.
        $cloned_tickets = array();
        foreach ($orig_datetimes as $orig_dtt) {
            if ( ! $orig_dtt instanceof EE_Datetime) {
                continue;
            }
            $new_dtt   = clone $orig_dtt;
            $orig_tkts = $orig_dtt->tickets();
            //save new dtt then add to event
            $new_dtt->set('DTT_ID', 0);
            $new_dtt->set('DTT_sold', 0);
            $new_dtt->save();
            $new_event->_add_relation_to($new_dtt, 'Datetime');
            $new_event->save();
            //now let's get the ticket relations setup.
            foreach ((array)$orig_tkts as $orig_tkt) {
                //it's possible a datetime will have no tickets so let's verify we HAVE a ticket first.
                if ( ! $orig_tkt instanceof EE_Ticket) {
                    continue;
                }
                //is this ticket archived?  If it is then let's skip
                if ($orig_tkt->get('TKT_deleted')) {
                    continue;
                }
                // does this original ticket already exist in the clone_tickets cache?
                //  If so we'll just use the new ticket from it.
                if (isset($cloned_tickets[$orig_tkt->ID()])) {
                    $new_tkt = $cloned_tickets[$orig_tkt->ID()];
                } else {
                    $new_tkt = clone $orig_tkt;
                    //get relations on the $orig_tkt that we need to setup.
                    $orig_prices = $orig_tkt->prices();
                    $new_tkt->set('TKT_ID', 0);
                    $new_tkt->set('TKT_sold', 0);
                    $new_tkt->set('TKT_reserved', 0);
                    $new_tkt->save(); //make sure new ticket has ID.
                    //price relations on new ticket need to be setup.
                    foreach ($orig_prices as $orig_price) {
                        $new_price = clone $orig_price;
                        $new_price->set('PRC_ID', 0);
                        $new_price->save();
                        $new_tkt->_add_relation_to($new_price, 'Price');
                        $new_tkt->save();
                    }
                }
                // k now we can add the new ticket as a relation to the new datetime
                // and make sure its added to our cached $cloned_tickets array
                // for use with later datetimes that have the same ticket.
                $new_dtt->_add_relation_to($new_tkt, 'Ticket');
                $new_dtt->save();
                $cloned_tickets[$orig_tkt->ID()] = $new_tkt;
            }
        }
        //clone taxonomy information
        $taxonomies_to_clone_with = apply_filters(
            'FHEE__Extend_Events_Admin_Page___duplicate_event__taxonomies_to_clone',
            array('espresso_event_categories', 'espresso_event_type', 'post_tag')
        );
        //get terms for original event (notice)
        $orig_terms = wp_get_object_terms($orig_event->ID(), $taxonomies_to_clone_with);
        //loop through terms and add them to new event.
        foreach ($orig_terms as $term) {
            wp_set_object_terms($new_event->ID(), $term->term_id, $term->taxonomy, true);
        }
        do_action('AHEE__Extend_Events_Admin_Page___duplicate_event__after', $new_event, $orig_event);
        //now let's redirect to the edit page for this duplicated event if we have a new event id.
        if ($new_event->ID()) {
            $redirect_args = array(
                'post'   => $new_event->ID(),
                'action' => 'edit',
            );
            EE_Error::add_success(
                esc_html__(
                    'Event successfully duplicated.  Please review the details below and make any necessary edits',
                    'event_espresso'
                )
            );
        } else {
            $redirect_args = array(
                'action' => 'default',
            );
            EE_Error::add_error(
                esc_html__('Not able to duplicate event.  Something went wrong.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        $this->_redirect_after_action(false, '', '', $redirect_args, true);
    }
    
    
    protected function _import_page()
    {
        $title                                      = esc_html__('Import', 'event_espresso');
        $intro                                      = esc_html__(
            'If you have a previously exported Event Espresso 4 information in a Comma Separated Value (CSV) file format, you can upload the file here: ',
            'event_espresso'
        );
        $form_url                                   = EVENTS_ADMIN_URL;
        $action                                     = 'import_events';
        $type                                       = 'csv';
        $this->_template_args['form']               = EE_Import::instance()->upload_form(
            $title, $intro, $form_url, $action, $type
        );
        $this->_template_args['sample_file_link']   = EE_Admin_Page::add_query_args_and_nonce(
            array('action' => 'sample_export_file'),
            $this->_admin_base_url
        );
        $content                                    = EEH_Template::display_template(
            EVENTS_CAF_TEMPLATE_PATH . 'import_page.template.php',
            $this->_template_args,
            true
        );
        $this->_template_args['admin_page_content'] = $content;
        $this->display_admin_page_with_sidebar();
    }



    /**
     * _import_events
     * This handles displaying the screen and running imports for importing events.
     *
     * @return void
     */
    protected function _import_events()
    {
        require_once(EE_CLASSES . 'EE_Import.class.php');
        $success = EE_Import::instance()->import();
        $this->_redirect_after_action($success, 'Import File', 'ran', array('action' => 'import_page'), true);
    }



    /**
     * _events_export
     * Will export all (or just the given event) to a Excel compatible file.
     *
     * @access protected
     * @return void
     */
    protected function _events_export()
    {
        if (isset($this->_req_data['EVT_ID'])) {
            $event_ids = $this->_req_data['EVT_ID'];
        } elseif (isset($this->_req_data['EVT_IDs'])) {
            $event_ids = $this->_req_data['EVT_IDs'];
        } else {
            $event_ids = null;
        }
        //todo: I don't like doing this but it'll do until we modify EE_Export Class.
        $new_request_args = array(
            'export' => 'report',
            'action' => 'all_event_data',
            'EVT_ID' => $event_ids,
        );
        $this->_req_data  = array_merge($this->_req_data, $new_request_args);
        if (is_readable(EE_CLASSES . 'EE_Export.class.php')) {
            require_once(EE_CLASSES . 'EE_Export.class.php');
            $EE_Export = EE_Export::instance($this->_req_data);
            $EE_Export->export();
        }
    }



    /**
     * handle category exports()
     *
     * @return void
     */
    protected function _categories_export()
    {
        //todo: I don't like doing this but it'll do until we modify EE_Export Class.
        $new_request_args = array(
            'export'       => 'report',
            'action'       => 'categories',
            'category_ids' => $this->_req_data['EVT_CAT_ID'],
        );
        $this->_req_data  = array_merge($this->_req_data, $new_request_args);
        if (is_readable(EE_CLASSES . 'EE_Export.class.php')) {
            require_once(EE_CLASSES . 'EE_Export.class.php');
            $EE_Export = EE_Export::instance($this->_req_data);
            $EE_Export->export();
        }
    }



    /**
     * Creates a sample CSV file for importing
     */
    protected function _sample_export_file()
    {
        //		require_once(EE_CLASSES . 'EE_Export.class.php');
        EE_Export::instance()->export_sample();
    }



    /*************        Template Settings        *************/
    protected function _template_settings()
    {
        $this->_template_args['values'] = $this->_yes_no_values;
        /**
         * Note leaving this filter in for backward compatibility this was moved in 4.6.x
         * from General_Settings_Admin_Page to here.
         */
        $this->_template_args = apply_filters(
            'FHEE__General_Settings_Admin_Page__template_settings__template_args',
            $this->_template_args
        );
        $this->_set_add_edit_form_tags('update_template_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            EVENTS_CAF_TEMPLATE_PATH . 'template_settings.template.php',
            $this->_template_args,
            true
        );
        $this->display_admin_page_with_sidebar();
    }



    protected function _update_template_settings()
    {
        /**
         * Note leaving this filter in for backward compatibility this was moved in 4.6.x
         * from General_Settings_Admin_Page to here.
         */
        EE_Registry::instance()->CFG->template_settings = apply_filters(
            'FHEE__General_Settings_Admin_Page__update_template_settings__data',
            EE_Registry::instance()->CFG->template_settings,
            $this->_req_data
        );
        //update custom post type slugs and detect if we need to flush rewrite rules
        $old_slug                                          = EE_Registry::instance()->CFG->core->event_cpt_slug;
        EE_Registry::instance()->CFG->core->event_cpt_slug = empty($this->_req_data['event_cpt_slug'])
            ? EE_Registry::instance()->CFG->core->event_cpt_slug
            : sanitize_title_with_dashes($this->_req_data['event_cpt_slug']);
        $what                                              = 'Template Settings';
        $success                                           = $this->_update_espresso_configuration(
            $what,
            EE_Registry::instance()->CFG->template_settings,
            __FILE__,
            __FUNCTION__,
            __LINE__
        );
        if (EE_Registry::instance()->CFG->core->event_cpt_slug != $old_slug) {
            update_option('ee_flush_rewrite_rules', true);
        }
        $this->_redirect_after_action($success, $what, 'updated', array('action' => 'template_settings'));
    }



    /**
     * _premium_event_editor_meta_boxes
     * add all metaboxes related to the event_editor
     *
     * @access protected
     * @return void
     */
    protected function _premium_event_editor_meta_boxes()
    {
        $this->verify_cpt_object();
        add_meta_box(
            'espresso_event_editor_event_options',
            esc_html__('Event Registration Options', 'event_espresso'),
            array($this, 'registration_options_meta_box'),
            $this->page_slug,
            'side',
            'core'
        );
    }



    /**
     * override caf metabox
     *
     * @return void
     */
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
                EEM_Registration::status_id_wait_list,
            ),
            true
        );
        $template_args['active_status']                   = $this->_cpt_model_obj->pretty_active_status(false);
        $template_args['_event']                          = $this->_cpt_model_obj;
        $template_args['additional_limit']                = $this->_cpt_model_obj->additional_limit();
        $template_args['default_registration_status']     = EEH_Form_Fields::select_input(
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
        $template_args['EVT_default_registration_status'] = EEH_Form_Fields::select_input(
            'EVT_default_registration_status',
            $default_reg_status_values,
            $this->_cpt_model_obj->default_registration_status()
        );
        $template_args['additional_registration_options'] = apply_filters(
            'FHEE__Events_Admin_Page__registration_options_meta_box__additional_registration_options',
            '',
            $template_args,
            $yes_no_values,
            $default_reg_status_values
        );
        EEH_Template::display_template(
            EVENTS_CAF_TEMPLATE_PATH . 'event_registration_options.template.php',
            $template_args
        );
    }



    /**
     * wp_list_table_mods for caf
     * ============================
     */
    /**
     * hook into list table filters and provide filters for caffeinated list table
     *
     * @param  array $old_filters    any existing filters present
     * @param  array $list_table_obj the list table object
     * @return array                  new filters
     */
    public function list_table_filters($old_filters, $list_table_obj)
    {
        $filters = array();
        //first month/year filters
        $filters[] = $this->espresso_event_months_dropdown();
        $status    = isset($this->_req_data['status']) ? $this->_req_data['status'] : null;
        //active status dropdown
        if ($status !== 'draft') {
            $filters[] = $this->active_status_dropdown(
                isset($this->_req_data['active_status']) ? $this->_req_data['active_status'] : ''
            );
        }
        //category filter
        $filters[] = $this->category_dropdown();
        return array_merge($old_filters, $filters);
    }



    /**
     * espresso_event_months_dropdown
     *
     * @access public
     * @return string                dropdown listing month/year selections for events.
     */
    public function espresso_event_months_dropdown()
    {
        // what we need to do is get all PRIMARY datetimes for all events to filter on.
        // Note we need to include any other filters that are set!
        $status = isset($this->_req_data['status']) ? $this->_req_data['status'] : null;
        //categories?
        $category = isset($this->_req_data['EVT_CAT']) && $this->_req_data['EVT_CAT'] > 0
            ? $this->_req_data['EVT_CAT']
            : null;
        //active status?
        $active_status = isset($this->_req_data['active_status']) ? $this->_req_data['active_status'] : null;
        $cur_date = isset($this->_req_data['month_range']) ? $this->_req_data['month_range'] : '';
        return EEH_Form_Fields::generate_event_months_dropdown($cur_date, $status, $category, $active_status);
    }



    /**
     * returns a list of "active" statuses on the event
     *
     * @param  string $current_value whatever the current active status is
     * @return string
     */
    public function active_status_dropdown($current_value = '')
    {
        $select_name = 'active_status';
        $values      = array(
            'none'     => esc_html__('Show Active/Inactive', 'event_espresso'),
            'active'   => esc_html__('Active', 'event_espresso'),
            'upcoming' => esc_html__('Upcoming', 'event_espresso'),
            'expired'  => esc_html__('Expired', 'event_espresso'),
            'inactive' => esc_html__('Inactive', 'event_espresso'),
        );
        $id          = 'id="espresso-active-status-dropdown-filter"';
        $class       = 'wide';
        return EEH_Form_Fields::select_input($select_name, $values, $current_value, $id, $class);
    }



    /**
     * output a dropdown of the categories for the category filter on the event admin list table
     *
     * @access  public
     * @return string html
     */
    public function category_dropdown()
    {
        $cur_cat = isset($this->_req_data['EVT_CAT']) ? $this->_req_data['EVT_CAT'] : -1;
        return EEH_Form_Fields::generate_event_category_dropdown($cur_cat);
    }



    /**
     * get total number of events today
     *
     * @access public
     * @return int
     */
    public function total_events_today()
    {
        $start = EEM_Datetime::instance()->convert_datetime_for_query(
            'DTT_EVT_start',
            date('Y-m-d') . ' 00:00:00',
            'Y-m-d H:i:s',
            'UTC'
        );
        $end   = EEM_Datetime::instance()->convert_datetime_for_query(
            'DTT_EVT_start',
            date('Y-m-d') . ' 23:59:59',
            'Y-m-d H:i:s',
            'UTC'
        );
        $where = array(
            'Datetime.DTT_EVT_start' => array('BETWEEN', array($start, $end)),
        );
        $count = EEM_Event::instance()->count(array($where, 'caps' => 'read_admin'), 'EVT_ID', true);
        return $count;
    }



    /**
     * get total number of events this month
     *
     * @access public
     * @return int
     */
    public function total_events_this_month()
    {
        //Dates
        $this_year_r     = date('Y');
        $this_month_r    = date('m');
        $days_this_month = date('t');
        $start           = EEM_Datetime::instance()->convert_datetime_for_query(
            'DTT_EVT_start',
            $this_year_r . '-' . $this_month_r . '-01 00:00:00',
            'Y-m-d H:i:s',
            'UTC'
        );
        $end = EEM_Datetime::instance()->convert_datetime_for_query(
            'DTT_EVT_start',
            $this_year_r . '-' . $this_month_r . '-' . $days_this_month . ' 23:59:59',
            'Y-m-d H:i:s',
            'UTC'
        );
        $where = array(
            'Datetime.DTT_EVT_start' => array('BETWEEN', array($start, $end)),
        );
        $count = EEM_Event::instance()->count(array($where, 'caps' => 'read_admin'), 'EVT_ID', true);
        return $count;
    }



    /** DEFAULT TICKETS STUFF **/
    public function _tickets_overview_list_table()
    {
        $this->_search_btn_label = esc_html__('Tickets', 'event_espresso');
        $this->display_admin_list_table_page_with_no_sidebar();
    }



    /**
     * @param int  $per_page
     * @param bool $count
     * @param bool $trashed
     * @return \EE_Soft_Delete_Base_Class[]|int
     */
    public function get_default_tickets($per_page = 10, $count = false, $trashed = false)
    {
        $orderby = empty($this->_req_data['orderby']) ? 'TKT_name' : $this->_req_data['orderby'];
        $order   = empty($this->_req_data['order']) ? 'ASC' : $this->_req_data['order'];
        switch ($orderby) {
            case 'TKT_name' :
                $orderby = array('TKT_name' => $order);
                break;
            case 'TKT_price' :
                $orderby = array('TKT_price' => $order);
                break;
            case 'TKT_uses' :
                $orderby = array('TKT_uses' => $order);
                break;
            case 'TKT_min' :
                $orderby = array('TKT_min' => $order);
                break;
            case 'TKT_max' :
                $orderby = array('TKT_max' => $order);
                break;
            case 'TKT_qty' :
                $orderby = array('TKT_qty' => $order);
                break;
        }
        $current_page = isset($this->_req_data['paged']) && ! empty($this->_req_data['paged'])
            ? $this->_req_data['paged']
            : 1;
        $per_page     = isset($this->_req_data['perpage']) && ! empty($this->_req_data['perpage'])
            ? $this->_req_data['perpage']
            : $per_page;
        $_where       = array(
            'TKT_is_default' => 1,
            'TKT_deleted'    => $trashed,
        );
        $offset       = ($current_page - 1) * $per_page;
        $limit        = array($offset, $per_page);
        if (isset($this->_req_data['s'])) {
            $sstr         = '%' . $this->_req_data['s'] . '%';
            $_where['OR'] = array(
                'TKT_name'        => array('LIKE', $sstr),
                'TKT_description' => array('LIKE', $sstr),
            );
        }
        $query_params = array(
            $_where,
            'order_by' => $orderby,
            'limit'    => $limit,
            'group_by' => 'TKT_ID',
        );
        if ($count) {
            return EEM_Ticket::instance()->count_deleted_and_undeleted(array($_where));
        } else {
            return EEM_Ticket::instance()->get_all_deleted_and_undeleted($query_params);
        }
    }



    /**
     * @param bool $trash
     */
    protected function _trash_or_restore_ticket($trash = false)
    {
        $success = 1;
        $TKT = EEM_Ticket::instance();
        //checkboxes?
        if ( ! empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {
            //if array has more than one element then success message should be plural
            $success = count($this->_req_data['checkbox']) > 1 ? 2 : 1;
            //cycle thru the boxes
            while (list($TKT_ID, $value) = each($this->_req_data['checkbox'])) {
                if ($trash) {
                    if ( ! $TKT->delete_by_ID($TKT_ID)) {
                        $success = 0;
                    }
                } else {
                    if ( ! $TKT->restore_by_ID($TKT_ID)) {
                        $success = 0;
                    }
                }
            }
        } else {
            //grab single id and trash
            $TKT_ID = absint($this->_req_data['TKT_ID']);
            if ($trash) {
                if ( ! $TKT->delete_by_ID($TKT_ID)) {
                    $success = 0;
                }
            } else {
                if ( ! $TKT->restore_by_ID($TKT_ID)) {
                    $success = 0;
                }
            }
        }
        $action_desc = $trash ? 'moved to the trash' : 'restored';
        $query_args  = array(
            'action' => 'ticket_list_table',
            'status' => $trash ? '' : 'trashed',
        );
        $this->_redirect_after_action($success, 'Tickets', $action_desc, $query_args);
    }



    protected function _delete_ticket()
    {
        $success = 1;
        //checkboxes?
        if ( ! empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {
            //if array has more than one element then success message should be plural
            $success = count($this->_req_data['checkbox']) > 1 ? 2 : 1;
            //cycle thru the boxes
            while (list($TKT_ID, $value) = each($this->_req_data['checkbox'])) {
                //delete
                if ( ! $this->_delete_the_ticket($TKT_ID)) {
                    $success = 0;
                }
            }
        } else {
            //grab single id and trash
            $TKT_ID = absint($this->_req_data['TKT_ID']);
            if ( ! $this->_delete_the_ticket($TKT_ID)) {
                $success = 0;
            }
        }
        $action_desc = 'deleted';
        $query_args  = array(
            'action' => 'ticket_list_table',
            'status' => 'trashed',
        );
        //fail safe.  If the default ticket count === 1 then we need to redirect to event overview.
        if (EEM_Ticket::instance()->count_deleted_and_undeleted(
            array(array('TKT_is_default' => 1)),
            'TKT_ID',
            true
        )
        ) {
            $query_args = array();
        }
        $this->_redirect_after_action($success, 'Tickets', $action_desc, $query_args);
    }



    /**
     * @param int $TKT_ID
     * @return bool|int
     */
    protected function _delete_the_ticket($TKT_ID)
    {
        $tkt = EEM_Ticket::instance()->get_one_by_ID($TKT_ID);
        $tkt->_remove_relations('Datetime');
        //delete all related prices first
        $tkt->delete_related_permanently('Price');
        return $tkt->delete_permanently();
    }



}



//end class Events_Admin_Page

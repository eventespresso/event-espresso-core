<?php

use EventEspresso\core\services\loaders\LoaderFactory;

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
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct($routing = true)
    {
        parent::__construct($routing);
        if (! defined('EVENTS_CAF_TEMPLATE_PATH')) {
            define('EVENTS_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'events/templates/');
            define('EVENTS_CAF_ASSETS', EE_CORE_CAF_ADMIN_EXTEND . 'events/assets/');
            define('EVENTS_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'events/assets/');
        }
    }


    /**
     * Sets routes.
     *
     * @throws EE_Error
     */
    protected function _extend_page_config()
    {
        $this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'events';
        // is there a evt_id in the request?
        $EVT_ID             = $this->request->getRequestParam('EVT_ID', 0, 'int');
        $EVT_ID             = $this->request->getRequestParam('post', $EVT_ID, 'int');
        $TKT_ID             = $this->request->getRequestParam('TKT_ID', 0, 'int');
        $new_page_routes    = [
            'duplicate_event'          => [
                'func'       => '_duplicate_event',
                'capability' => 'ee_edit_event',
                'obj_id'     => $EVT_ID,
                'noheader'   => true,
            ],
            'ticket_list_table'        => [
                'func'       => '_tickets_overview_list_table',
                'capability' => 'ee_read_default_tickets',
            ],
            'trash_ticket'             => [
                'func'       => '_trash_or_restore_ticket',
                'capability' => 'ee_delete_default_ticket',
                'obj_id'     => $TKT_ID,
                'noheader'   => true,
                'args'       => ['trash' => true],
            ],
            'trash_tickets'            => [
                'func'       => '_trash_or_restore_ticket',
                'capability' => 'ee_delete_default_tickets',
                'noheader'   => true,
                'args'       => ['trash' => true],
            ],
            'restore_ticket'           => [
                'func'       => '_trash_or_restore_ticket',
                'capability' => 'ee_delete_default_ticket',
                'obj_id'     => $TKT_ID,
                'noheader'   => true,
            ],
            'restore_tickets'          => [
                'func'       => '_trash_or_restore_ticket',
                'capability' => 'ee_delete_default_tickets',
                'noheader'   => true,
            ],
            'delete_ticket'            => [
                'func'       => '_delete_ticket',
                'capability' => 'ee_delete_default_ticket',
                'obj_id'     => $TKT_ID,
                'noheader'   => true,
            ],
            'delete_tickets'           => [
                'func'       => '_delete_ticket',
                'capability' => 'ee_delete_default_tickets',
                'noheader'   => true,
            ],
            'import_page'              => [
                'func'       => '_import_page',
                'capability' => 'import',
            ],
            'import'                   => [
                'func'       => '_import_events',
                'capability' => 'import',
                'noheader'   => true,
            ],
            'import_events'            => [
                'func'       => '_import_events',
                'capability' => 'import',
                'noheader'   => true,
            ],
            'export_events'            => [
                'func'       => '_events_export',
                'capability' => 'export',
                'noheader'   => true,
            ],
            'export_categories'        => [
                'func'       => '_categories_export',
                'capability' => 'export',
                'noheader'   => true,
            ],
            'sample_export_file'       => [
                'func'       => '_sample_export_file',
                'capability' => 'export',
                'noheader'   => true,
            ],
            'update_template_settings' => [
                'func'       => '_update_template_settings',
                'capability' => 'manage_options',
                'noheader'   => true,
            ],
        ];
        $this->_page_routes = array_merge($this->_page_routes, $new_page_routes);
        // partial route/config override
        $this->_page_config['import_events']['metaboxes'] = $this->_default_espresso_metaboxes;
        $this->_page_config['create_new']['metaboxes'][]  = '_premium_event_editor_meta_boxes';
        $this->_page_config['create_new']['qtips'][]      = 'EE_Event_Editor_Tips';
        $this->_page_config['edit']['qtips'][]            = 'EE_Event_Editor_Tips';
        $this->_page_config['edit']['metaboxes'][]        = '_premium_event_editor_meta_boxes';
        $this->_page_config['default']['list_table']      = 'Extend_Events_Admin_List_Table';
        // add tickets tab but only if there are more than one default ticket!
        $ticket_count = EEM_Ticket::instance()->count_deleted_and_undeleted(
            [['TKT_is_default' => 1]],
            'TKT_ID',
            true
        );
        if ($ticket_count > 1) {
            $new_page_config = [
                'ticket_list_table' => [
                    'nav'           => [
                        'label' => esc_html__('Default Tickets', 'event_espresso'),
                        'order' => 60,
                    ],
                    'list_table'    => 'Tickets_List_Table',
                    'require_nonce' => false,
                ],
            ];
        }
        // template settings
        $new_page_config['template_settings'] = [
            'nav'           => [
                'label' => esc_html__('Templates', 'event_espresso'),
                'order' => 30,
            ],
            'metaboxes'     => array_merge($this->_default_espresso_metaboxes, ['_publish_post_box']),
            'help_tabs'     => [
                'general_settings_templates_help_tab' => [
                    'title'    => esc_html__('Templates', 'event_espresso'),
                    'filename' => 'general_settings_templates',
                ],
            ],
            'require_nonce' => false,
        ];
        $this->_page_config                   = array_merge($this->_page_config, $new_page_config);
        // add filters and actions
        // modifying _views
        add_filter(
            'FHEE_event_datetime_metabox_add_additional_date_time_template',
            [$this, 'add_additional_datetime_button'],
            10,
            2
        );
        add_filter(
            'FHEE_event_datetime_metabox_clone_button_template',
            [$this, 'add_datetime_clone_button'],
            10,
            2
        );
        add_filter(
            'FHEE_event_datetime_metabox_timezones_template',
            [$this, 'datetime_timezones_template'],
            10,
            2
        );
        // filters for event list table
        add_filter('FHEE__Extend_Events_Admin_List_Table__filters', [$this, 'list_table_filters'], 10, 2);
        add_filter(
            'FHEE__Events_Admin_List_Table__column_actions__action_links',
            [$this, 'extra_list_table_actions'],
            10,
            2
        );
        // legend item
        add_filter('FHEE__Events_Admin_Page___event_legend_items__items', [$this, 'additional_legend_items']);
        add_action('admin_init', [$this, 'admin_init']);
    }


    /**
     * admin_init
     */
    public function admin_init()
    {
        EE_Registry::$i18n_js_strings = array_merge(
            EE_Registry::$i18n_js_strings,
            [
                'image_confirm'          => esc_html__(
                    'Do you really want to delete this image? Please remember to update your event to complete the removal.',
                    'event_espresso'
                ),
                'event_starts_on'        => esc_html__('Event Starts on', 'event_espresso'),
                'event_ends_on'          => esc_html__('Event Ends on', 'event_espresso'),
                'event_datetime_actions' => esc_html__('Actions', 'event_espresso'),
                'event_clone_dt_msg'     => esc_html__('Clone this Event Date and Time', 'event_espresso'),
                'remove_event_dt_msg'    => esc_html__('Remove this Event Time', 'event_espresso'),
            ]
        );
    }


    /**
     * Add per page screen options to the default ticket list table view.
     */
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
        // make sure this is only when editing
        if (! empty($id)) {
            $href   = EE_Admin_Page::add_query_args_and_nonce(
                ['action' => 'duplicate_event', 'EVT_ID' => $id],
                $this->_admin_base_url
            );
            $title  = esc_attr__('Duplicate Event', 'event_espresso');
            $return .= '<a href="'
                       . $href
                       . '" title="'
                       . $title
                       . '" id="ee-duplicate-event-button" class="button button-small"  value="duplicate_event">'
                       . $title
                       . '</a>';
        }
        return $return;
    }


    /**
     * Set the list table views for the default ticket list table view.
     */
    public function _set_list_table_views_ticket_list_table()
    {
        $this->_views = [
            'all'     => [
                'slug'        => 'all',
                'label'       => esc_html__('All', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'trash_tickets' => esc_html__('Move to Trash', 'event_espresso'),
                ],
            ],
            'trashed' => [
                'slug'        => 'trashed',
                'label'       => esc_html__('Trash', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'restore_tickets' => esc_html__('Restore from Trash', 'event_espresso'),
                    'delete_tickets'  => esc_html__('Delete Permanently', 'event_espresso'),
                ],
            ],
        ];
    }


    /**
     * Enqueue scripts and styles for the event editor.
     */
    public function load_scripts_styles_edit()
    {
        wp_register_script(
            'ee-event-editor-heartbeat',
            EVENTS_CAF_ASSETS_URL . 'event-editor-heartbeat.js',
            ['ee_admin_js', 'heartbeat'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_enqueue_script('ee-accounting');
        // styles
        wp_enqueue_style('espresso-ui-theme');
        wp_enqueue_script('event_editor_js');
        wp_enqueue_script('ee-event-editor-heartbeat');
    }


    /**
     * Returns template for the additional datetime.
     *
     * @param string $template
     * @param array  $template_args
     * @return string
     * @throws DomainException
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
     * Returns the template for cloning a datetime.
     *
     * @param $template
     * @param $template_args
     * @return string
     * @throws DomainException
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
     * Returns the template for datetime timezones.
     *
     * @param $template
     * @param $template_args
     * @return string
     * @throws DomainException
     */
    public function datetime_timezones_template($template, $template_args)
    {
        return EEH_Template::display_template(
            EVENTS_CAF_TEMPLATE_PATH . 'event_datetime_timezones.template.php',
            $template_args,
            true
        );
    }


    /**
     * Sets the views for the default list table view.
     *
     * @throws EE_Error
     */
    protected function _set_list_table_views_default()
    {
        parent::_set_list_table_views_default();
        $new_views    = [
            'today' => [
                'slug'        => 'today',
                'label'       => esc_html__('Today', 'event_espresso'),
                'count'       => $this->total_events_today(),
                'bulk_action' => [
                    'trash_events' => esc_html__('Move to Trash', 'event_espresso'),
                ],
            ],
            'month' => [
                'slug'        => 'month',
                'label'       => esc_html__('This Month', 'event_espresso'),
                'count'       => $this->total_events_this_month(),
                'bulk_action' => [
                    'trash_events' => esc_html__('Move to Trash', 'event_espresso'),
                ],
            ],
        ];
        $this->_views = array_merge($this->_views, $new_views);
    }


    /**
     * Returns the extra action links for the default list table view.
     *
     * @param array    $action_links
     * @param EE_Event $event
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function extra_list_table_actions(array $action_links, EE_Event $event)
    {
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_read_registrations',
                'espresso_registrations_reports',
                $event->ID()
            )
        ) {
            $reports_query_args = [
                'action' => 'reports',
                'EVT_ID' => $event->ID(),
            ];
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
                ['EVT_ID' => $event->ID()]
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
            $items['reports'] = [
                'class' => 'dashicons dashicons-chart-bar',
                'desc'  => esc_html__('Event Reports', 'event_espresso'),
            ];
        }
        if (EE_Registry::instance()->CAP->current_user_can('ee_read_global_messages', 'view_filtered_messages')) {
            $related_for_icon = EEH_MSG_Template::get_message_action_icon('see_notifications_for');
            if (isset($related_for_icon['css_class']) && isset($related_for_icon['label'])) {
                $items['view_related_messages'] = [
                    'class' => $related_for_icon['css_class'],
                    'desc'  => $related_for_icon['label'],
                ];
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
     * @throws EE_Error If EE_Event is not available with given ID
     * @throws ReflectionException
     * @access protected
     */
    protected function _duplicate_event()
    {
        // first make sure the ID for the event is in the request.
        //  If it isn't then we need to bail and redirect back to overview list table (cause how did we get here?)
        $EVT_ID = $this->request->getRequestParam('EVT_ID', 0, 'int');
        if (! $EVT_ID) {
            EE_Error::add_error(
                esc_html__(
                    'In order to duplicate an event an Event ID is required.  None was given.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $this->_redirect_after_action(false, '', '', [], true);
            return;
        }
        // k we've got EVT_ID so let's use that to get the event we'll duplicate
        $orig_event = EEM_Event::instance()->get_one_by_ID($EVT_ID);
        if (! $orig_event instanceof EE_Event) {
            throw new EE_Error(
                sprintf(
                    esc_html__('An EE_Event object could not be retrieved for the given ID (%s)', 'event_espresso'),
                    $EVT_ID
                )
            );
        }
        // k now let's clone the $orig_event before getting relations
        $new_event = clone $orig_event;
        // original datetimes
        $orig_datetimes = $orig_event->get_many_related('Datetime');
        // other original relations
        $orig_ven = $orig_event->get_many_related('Venue');
        // reset the ID and modify other details to make it clear this is a dupe
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
        // duplicate discussion settings
        $new_event->set('comment_status', $orig_event->get('comment_status'));
        $new_event->set('ping_status', $orig_event->get('ping_status'));
        // save the new event
        $new_event->save();
        // venues
        foreach ($orig_ven as $ven) {
            $new_event->_add_relation_to($ven, 'Venue');
        }
        $new_event->save();
        // now we need to get the question group relations and handle that
        // first primary question groups
        $orig_primary_qgs = $orig_event->get_many_related(
            'Question_Group',
            [['Event_Question_Group.EQG_primary' => true]]
        );
        if (! empty($orig_primary_qgs)) {
            foreach ($orig_primary_qgs as $obj) {
                if ($obj instanceof EE_Question_Group) {
                    $new_event->_add_relation_to($obj, 'Question_Group', ['EQG_primary' => true]);
                }
            }
        }
        // next additional attendee question groups
        $orig_additional_qgs = $orig_event->get_many_related(
            'Question_Group',
            [['Event_Question_Group.EQG_additional' => true]]
        );
        if (! empty($orig_additional_qgs)) {
            foreach ($orig_additional_qgs as $obj) {
                if ($obj instanceof EE_Question_Group) {
                    $new_event->_add_relation_to($obj, 'Question_Group', ['EQG_additional' => true]);
                }
            }
        }

        $new_event->save();

        // k now that we have the new event saved we can loop through the datetimes and start adding relations.
        $cloned_tickets = [];
        foreach ($orig_datetimes as $orig_dtt) {
            if (! $orig_dtt instanceof EE_Datetime) {
                continue;
            }
            $new_dtt      = clone $orig_dtt;
            $orig_tickets = $orig_dtt->tickets();
            // save new dtt then add to event
            $new_dtt->set('DTT_ID', 0);
            $new_dtt->set('DTT_sold', 0);
            $new_dtt->set_reserved(0);
            $new_dtt->save();
            $new_event->_add_relation_to($new_dtt, 'Datetime');
            $new_event->save();
            // now let's get the ticket relations setup.
            foreach ((array) $orig_tickets as $orig_ticket) {
                // it's possible a datetime will have no tickets so let's verify we HAVE a ticket first.
                if (! $orig_ticket instanceof EE_Ticket) {
                    continue;
                }
                // is this ticket archived?  If it is then let's skip
                if ($orig_ticket->get('TKT_deleted')) {
                    continue;
                }
                // does this original ticket already exist in the clone_tickets cache?
                //  If so we'll just use the new ticket from it.
                if (isset($cloned_tickets[ $orig_ticket->ID() ])) {
                    $new_ticket = $cloned_tickets[ $orig_ticket->ID() ];
                } else {
                    $new_ticket = clone $orig_ticket;
                    // get relations on the $orig_ticket that we need to setup.
                    $orig_prices = $orig_ticket->prices();
                    $new_ticket->set('TKT_ID', 0);
                    $new_ticket->set('TKT_sold', 0);
                    $new_ticket->set('TKT_reserved', 0);
                    $new_ticket->save(); // make sure new ticket has ID.
                    // price relations on new ticket need to be setup.
                    foreach ($orig_prices as $orig_price) {
                        $new_price = clone $orig_price;
                        $new_price->set('PRC_ID', 0);
                        $new_price->save();
                        $new_ticket->_add_relation_to($new_price, 'Price');
                        $new_ticket->save();
                    }

                    do_action(
                        'AHEE__Extend_Events_Admin_Page___duplicate_event__duplicate_ticket__after',
                        $orig_ticket,
                        $new_ticket,
                        $orig_prices,
                        $orig_event,
                        $orig_dtt,
                        $new_dtt
                    );
                }
                // k now we can add the new ticket as a relation to the new datetime
                // and make sure its added to our cached $cloned_tickets array
                // for use with later datetimes that have the same ticket.
                $new_dtt->_add_relation_to($new_ticket, 'Ticket');
                $new_dtt->save();
                $cloned_tickets[ $orig_ticket->ID() ] = $new_ticket;
            }
        }
        // clone taxonomy information
        $taxonomies_to_clone_with = apply_filters(
            'FHEE__Extend_Events_Admin_Page___duplicate_event__taxonomies_to_clone',
            ['espresso_event_categories', 'espresso_event_type', 'post_tag']
        );
        // get terms for original event (notice)
        $orig_terms = wp_get_object_terms($orig_event->ID(), $taxonomies_to_clone_with);
        // loop through terms and add them to new event.
        foreach ($orig_terms as $term) {
            wp_set_object_terms($new_event->ID(), $term->term_id, $term->taxonomy, true);
        }

        // duplicate other core WP_Post items for this event.
        // post thumbnail (feature image).
        $feature_image_id = get_post_thumbnail_id($orig_event->ID());
        if ($feature_image_id) {
            update_post_meta($new_event->ID(), '_thumbnail_id', $feature_image_id);
        }

        // duplicate page_template setting
        $page_template = get_post_meta($orig_event->ID(), '_wp_page_template', true);
        if ($page_template) {
            update_post_meta($new_event->ID(), '_wp_page_template', $page_template);
        }

        do_action('AHEE__Extend_Events_Admin_Page___duplicate_event__after', $new_event, $orig_event);
        // now let's redirect to the edit page for this duplicated event if we have a new event id.
        if ($new_event->ID()) {
            $redirect_args = [
                'post'   => $new_event->ID(),
                'action' => 'edit',
            ];
            EE_Error::add_success(
                esc_html__(
                    'Event successfully duplicated.  Please review the details below and make any necessary edits',
                    'event_espresso'
                )
            );
        } else {
            $redirect_args = [
                'action' => 'default',
            ];
            EE_Error::add_error(
                esc_html__('Not able to duplicate event.  Something went wrong.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        $this->_redirect_after_action(false, '', '', $redirect_args, true);
    }


    /**
     * Generates output for the import page.
     *
     * @throws EE_Error
     */
    protected function _import_page()
    {
        $title = esc_html__('Import', 'event_espresso');
        $intro = esc_html__(
            'If you have a previously exported Event Espresso 4 information in a Comma Separated Value (CSV) file format, you can upload the file here: ',
            'event_espresso'
        );

        $form_url = EVENTS_ADMIN_URL;
        $action   = 'import_events';
        $type     = 'csv';

        $this->_template_args['form'] = EE_Import::instance()->upload_form(
            $title,
            $intro,
            $form_url,
            $action,
            $type
        );

        $this->_template_args['sample_file_link']   = EE_Admin_Page::add_query_args_and_nonce(
            ['action' => 'sample_export_file'],
            $this->_admin_base_url
        );
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            EVENTS_CAF_TEMPLATE_PATH . 'import_page.template.php',
            $this->_template_args,
            true
        );
        $this->display_admin_page_with_sidebar();
    }


    /**
     * _import_events
     * This handles displaying the screen and running imports for importing events.
     *
     * @return void
     * @throws EE_Error
     */
    protected function _import_events()
    {
        require_once(EE_CLASSES . 'EE_Import.class.php');
        $success = EE_Import::instance()->import();
        $this->_redirect_after_action(
            $success,
            esc_html__('Import File', 'event_espresso'),
            'ran',
            ['action' => 'import_page'],
            true
        );
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
        $EVT_ID = $this->request->getRequestParam('EVT_ID', 0, 'int');
        $EVT_ID = $this->request->getRequestParam('EVT_IDs', $EVT_ID, 'int');
        $this->request->mergeRequestParams(
            [
                'export' => 'report',
                'action' => 'all_event_data',
                'EVT_ID' => $EVT_ID,
            ]
        );
        if (is_readable(EE_CLASSES . 'EE_Export.class.php')) {
            require_once(EE_CLASSES . 'EE_Export.class.php');
            $EE_Export = EE_Export::instance($this->request->requestParams());
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
        $EVT_ID = $this->request->getRequestParam('EVT_CAT_ID', 0, 'int');
        $this->request->mergeRequestParams(
            [
                'export' => 'report',
                'action' => 'categories',
                'EVT_ID' => $EVT_ID,
            ]
        );
        if (is_readable(EE_CLASSES . 'EE_Export.class.php')) {
            require_once(EE_CLASSES . 'EE_Export.class.php');
            $EE_Export = EE_Export::instance($this->request->requestParams());
            $EE_Export->export();
        }
    }


    /**
     * Creates a sample CSV file for importing
     */
    protected function _sample_export_file()
    {
        // require_once(EE_CLASSES . 'EE_Export.class.php');
        EE_Export::instance()->export_sample();
    }


    /*************        Template Settings        *************/
    /**
     * Generates template settings page output
     *
     * @throws DomainException
     * @throws EE_Error
     */
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


    /**
     * Handler for updating template settings.
     *
     * @throws EE_Error
     */
    protected function _update_template_settings()
    {
        /**
         * Note leaving this filter in for backward compatibility this was moved in 4.6.x
         * from General_Settings_Admin_Page to here.
         */
        EE_Registry::instance()->CFG->template_settings = apply_filters(
            'FHEE__General_Settings_Admin_Page__update_template_settings__data',
            EE_Registry::instance()->CFG->template_settings,
            $this->request->requestParams()
        );
        // update custom post type slugs and detect if we need to flush rewrite rules
        $old_slug = EE_Registry::instance()->CFG->core->event_cpt_slug;

        $event_cpt_slug = $this->request->getRequestParam('event_cpt_slug');

        EE_Registry::instance()->CFG->core->event_cpt_slug = $event_cpt_slug
            ? EEH_URL::slugify($event_cpt_slug, 'events')
            : EE_Registry::instance()->CFG->core->event_cpt_slug;

        $what    = esc_html__('Template Settings', 'event_espresso');
        $success = $this->_update_espresso_configuration(
            $what,
            EE_Registry::instance()->CFG->template_settings,
            __FILE__,
            __FUNCTION__,
            __LINE__
        );
        if (EE_Registry::instance()->CFG->core->event_cpt_slug != $old_slug) {
            /** @var EventEspresso\core\domain\services\custom_post_types\RewriteRules $rewrite_rules */
            $rewrite_rules = LoaderFactory::getLoader()->getShared(
                'EventEspresso\core\domain\services\custom_post_types\RewriteRules'
            );
            $rewrite_rules->flush();
        }
        $this->_redirect_after_action($success, $what, 'updated', ['action' => 'template_settings']);
    }


    /**
     * _premium_event_editor_meta_boxes
     * add all metaboxes related to the event_editor
     *
     * @access protected
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _premium_event_editor_meta_boxes()
    {
        $this->verify_cpt_object();
        add_meta_box(
            'espresso_event_editor_event_options',
            esc_html__('Event Registration Options', 'event_espresso'),
            [$this, 'registration_options_meta_box'],
            $this->page_slug,
            'side',
            'core'
        );
    }


    /**
     * override caf metabox
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function registration_options_meta_box()
    {
        $yes_no_values = [
            ['id' => true, 'text' => esc_html__('Yes', 'event_espresso')],
            ['id' => false, 'text' => esc_html__('No', 'event_espresso')],
        ];

        $default_reg_status_values = EEM_Registration::reg_status_array(
            [
                EEM_Registration::status_id_cancelled,
                EEM_Registration::status_id_declined,
                EEM_Registration::status_id_incomplete,
                EEM_Registration::status_id_wait_list,
            ],
            true
        );

        $template_args['active_status']    = $this->_cpt_model_obj->pretty_active_status(false);
        $template_args['_event']           = $this->_cpt_model_obj;
        $template_args['additional_limit'] = $this->_cpt_model_obj->additional_limit();

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
     * @param array $old_filters    any existing filters present
     * @param array $list_table_obj the list table object
     * @return array                  new filters
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function list_table_filters($old_filters, $list_table_obj)
    {
        $filters = [];
        // first month/year filters
        $filters[] = $this->espresso_event_months_dropdown();
        $status    = $this->request->getRequestParam('status');
        // active status dropdown
        if ($status !== 'draft') {
            $filters[] = $this->active_status_dropdown($this->request->getRequestParam('active_status'));
            $filters[] = $this->venuesDropdown($this->request->getRequestParam('venue'));
        }
        // category filter
        $filters[] = $this->category_dropdown();
        return array_merge($old_filters, $filters);
    }


    /**
     * espresso_event_months_dropdown
     *
     * @access public
     * @return string                dropdown listing month/year selections for events.
     * @throws EE_Error
     */
    public function espresso_event_months_dropdown()
    {
        // what we need to do is get all PRIMARY datetimes for all events to filter on.
        // Note we need to include any other filters that are set!
        return EEH_Form_Fields::generate_event_months_dropdown(
            $this->request->getRequestParam('month_range'),
            $this->request->getRequestParam('status'),
            $this->request->getRequestParam('EVT_CAT', 0, 'int'),
            $this->request->getRequestParam('active_status')
        );
    }


    /**
     * returns a list of "active" statuses on the event
     *
     * @param string $current_value whatever the current active status is
     * @return string
     */
    public function active_status_dropdown($current_value = '')
    {
        $select_name = 'active_status';
        $values      = [
            'none'     => esc_html__('Show Active/Inactive', 'event_espresso'),
            'active'   => esc_html__('Active', 'event_espresso'),
            'upcoming' => esc_html__('Upcoming', 'event_espresso'),
            'expired'  => esc_html__('Expired', 'event_espresso'),
            'inactive' => esc_html__('Inactive', 'event_espresso'),
        ];

        return EEH_Form_Fields::select_input($select_name, $values, $current_value, '', 'wide');
    }


    /**
     * returns a list of "venues"
     *
     * @param string $current_value whatever the current active status is
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function venuesDropdown($current_value = '')
    {
        $values = [
            '' => esc_html__('All Venues', 'event_espresso'),
        ];
        // populate the list of venues.
        $venues = EEM_Venue::instance()->get_all(['order_by' => ['VNU_name' => 'ASC']]);

        foreach ($venues as $venue) {
            $values[ $venue->ID() ] = $venue->name();
        }

        return EEH_Form_Fields::select_input('venue', $values, $current_value, '', 'wide');
    }


    /**
     * output a dropdown of the categories for the category filter on the event admin list table
     *
     * @access  public
     * @return string html
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function category_dropdown()
    {
        return EEH_Form_Fields::generate_event_category_dropdown(
            $this->request->getRequestParam('EVT_CAT', -1, 'int')
        );
    }


    /**
     * get total number of events today
     *
     * @access public
     * @return int
     * @throws EE_Error
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
        $where = [
            'Datetime.DTT_EVT_start' => ['BETWEEN', [$start, $end]],
        ];
        return EEM_Event::instance()->count([$where, 'caps' => 'read_admin'], 'EVT_ID', true);
    }


    /**
     * get total number of events this month
     *
     * @access public
     * @return int
     * @throws EE_Error
     */
    public function total_events_this_month()
    {
        // Dates
        $this_year_r     = date('Y');
        $this_month_r    = date('m');
        $days_this_month = date('t');
        $start           = EEM_Datetime::instance()->convert_datetime_for_query(
            'DTT_EVT_start',
            $this_year_r . '-' . $this_month_r . '-01 00:00:00',
            'Y-m-d H:i:s',
            'UTC'
        );
        $end             = EEM_Datetime::instance()->convert_datetime_for_query(
            'DTT_EVT_start',
            $this_year_r . '-' . $this_month_r . '-' . $days_this_month . ' 23:59:59',
            'Y-m-d H:i:s',
            'UTC'
        );
        $where           = [
            'Datetime.DTT_EVT_start' => ['BETWEEN', [$start, $end]],
        ];
        return EEM_Event::instance()->count([$where, 'caps' => 'read_admin'], 'EVT_ID', true);
    }


    /** DEFAULT TICKETS STUFF **/

    /**
     * Output default tickets list table view.
     *
     * @throws EE_Error
     */
    public function _tickets_overview_list_table()
    {
        $this->_search_btn_label = esc_html__('Tickets', 'event_espresso');
        $this->display_admin_list_table_page_with_no_sidebar();
    }


    /**
     * @param int  $per_page
     * @param bool $count
     * @param bool $trashed
     * @return EE_Soft_Delete_Base_Class[]|int
     * @throws EE_Error
     */
    public function get_default_tickets($per_page = 10, $count = false, $trashed = false)
    {
        $orderby = $this->request->getRequestParam('orderby', 'TKT_name');
        $order   = $this->request->getRequestParam('order', 'ASC');
        switch ($orderby) {
            case 'TKT_name':
                $orderby = ['TKT_name' => $order];
                break;
            case 'TKT_price':
                $orderby = ['TKT_price' => $order];
                break;
            case 'TKT_uses':
                $orderby = ['TKT_uses' => $order];
                break;
            case 'TKT_min':
                $orderby = ['TKT_min' => $order];
                break;
            case 'TKT_max':
                $orderby = ['TKT_max' => $order];
                break;
            case 'TKT_qty':
                $orderby = ['TKT_qty' => $order];
                break;
        }

        $current_page = $this->request->getRequestParam('paged', 1, 'int');
        $per_page     = $this->request->getRequestParam('perpage', $per_page, 'int');
        $offset       = ($current_page - 1) * $per_page;

        $where = [
            'TKT_is_default' => 1,
            'TKT_deleted'    => $trashed,
        ];

        $search_term = $this->request->getRequestParam('s');
        if ($search_term) {
            $search_term = '%' . $search_term . '%';
            $where['OR'] = [
                'TKT_name'        => ['LIKE', $search_term],
                'TKT_description' => ['LIKE', $search_term],
            ];
        }

        return $count
            ? EEM_Ticket::instance()->count_deleted_and_undeleted([$where])
            : EEM_Ticket::instance()->get_all_deleted_and_undeleted(
                [
                    $where,
                    'order_by' => $orderby,
                    'limit'    => [$offset, $per_page],
                    'group_by' => 'TKT_ID',
                ]
            );
    }


    /**
     * @param bool $trash
     * @throws EE_Error
     */
    protected function _trash_or_restore_ticket($trash = false)
    {
        $success = 1;
        $TKT     = EEM_Ticket::instance();
        // checkboxes?
        $checkboxes = $this->request->getRequestParam('checkbox', [], 'int', true);
        if (! empty($checkboxes)) {
            // if array has more than one element then success message should be plural
            $success = count($checkboxes) > 1 ? 2 : 1;
            // cycle thru the boxes
            while (list($TKT_ID, $value) = each($checkboxes)) {
                if ($trash) {
                    if (! $TKT->delete_by_ID($TKT_ID)) {
                        $success = 0;
                    }
                } else {
                    if (! $TKT->restore_by_ID($TKT_ID)) {
                        $success = 0;
                    }
                }
            }
        } else {
            // grab single id and trash
            $TKT_ID = $this->request->getRequestParam('TKT_ID', 0, 'int');
            if ($trash) {
                if (! $TKT->delete_by_ID($TKT_ID)) {
                    $success = 0;
                }
            } else {
                if (! $TKT->restore_by_ID($TKT_ID)) {
                    $success = 0;
                }
            }
        }
        $action_desc = $trash ? 'moved to the trash' : 'restored';
        $query_args  = [
            'action' => 'ticket_list_table',
            'status' => $trash ? '' : 'trashed',
        ];
        $this->_redirect_after_action($success, esc_html__('Tickets', 'event_espresso'), $action_desc, $query_args);
    }


    /**
     * Handles trashing default ticket.
     *
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _delete_ticket()
    {
        $success = 1;
        // checkboxes?
        $checkboxes = $this->request->getRequestParam('checkbox', [], 'int', true);
        if (! empty($checkboxes)) {
            // if array has more than one element then success message should be plural
            $success = count($checkboxes) > 1 ? 2 : 1;
            // cycle thru the boxes
            while (list($TKT_ID, $value) = each($checkboxes)) {
                // delete
                if (! $this->_delete_the_ticket($TKT_ID)) {
                    $success = 0;
                }
            }
        } else {
            // grab single id and trash
            $TKT_ID = $this->request->getRequestParam('TKT_ID', 0, 'int');
            if (! $this->_delete_the_ticket($TKT_ID)) {
                $success = 0;
            }
        }
        $action_desc = 'deleted';
        $query_args  = [
            'action' => 'ticket_list_table',
            'status' => 'trashed',
        ];
        // fail safe.  If the default ticket count === 1 then we need to redirect to event overview.
        if (
            EEM_Ticket::instance()->count_deleted_and_undeleted(
                [['TKT_is_default' => 1]],
                'TKT_ID',
                true
            )
        ) {
            $query_args = [];
        }
        $this->_redirect_after_action($success, esc_html__('Tickets', 'event_espresso'), $action_desc, $query_args);
    }


    /**
     * @param int $TKT_ID
     * @return bool|int
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _delete_the_ticket($TKT_ID)
    {
        $ticket = EEM_Ticket::instance()->get_one_by_ID($TKT_ID);
        $ticket->_remove_relations('Datetime');
        // delete all related prices first
        $ticket->delete_related_permanently('Price');
        return $ticket->delete_permanently();
    }
}

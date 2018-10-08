<?php

/**
 * espresso_events_Venues_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 *
 *
 * @package         espresso_events_Venues_Hooks
 * @subpackage      caffeinated/admin/new/venues/espresso_events_Venues_Hooks.class.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_Venues_Hooks extends EE_Admin_Hooks
{


    protected $_event;


    public function __construct(EE_Admin_Page $admin_page)
    {
        parent::__construct($admin_page);
    }


    protected function _set_hooks_properties()
    {
        $this->_name = 'venues';

        $this->_metaboxes = array(
            0 => array(
                'page_route' => array('edit', 'create_new'),
                'func'       => 'venue_metabox',
                'label'      => __('Venue Details', 'event_espresso'),
                'priority'   => 'high',
                'context'    => 'normal',
            ),
        );/**/

        $this->_scripts_styles = array(
            'registers' => array(
                'ee_event_venues'     => array(
                    'type'    => 'js',
                    'url'     => EE_VENUES_ASSETS_URL . 'ee-event-venues-admin.js',
                    'depends' => array('jquery'),
                ),
                'ee_event_venues_css' => array(
                    'type' => 'css',
                    'url'  => EE_VENUES_ASSETS_URL . 'ee-event-venues-admin.css',
                ),
            ),
            'enqueues'  => array(
                'ee_event_venues'     => array('edit', 'create_new'),
                'ee_event_venues_css' => array('edit', 'create_new'),
            ),
        );

        // hook into the handler for saving venue
        add_filter(
            'FHEE__Events_Admin_Page___insert_update_cpt_item__event_update_callbacks',
            array($this, 'modify_callbacks'),
            10
        );

        // remove default ee_autosave returns for DECAF venues (not needed for CAF venues cause we have a dropdown selector)
        add_filter('FHEE__Events_Admin_Page__ee_autosave_edit_do_decaf_venue_save', '__return_false');
    }


    public function modify_callbacks($callbacks)
    {
        // first remove default venue callback
        foreach ($callbacks as $key => $callback) {
            if ($callback[1] == '_default_venue_update') {
                unset($callbacks[ $key ]);
            }
        }

        // now let's add the caf version
        $callbacks[] = array($this, 'caf_venue_update');
        return $callbacks;
    }


    public function venue_metabox()
    {
        $evt_obj = $this->_adminpage_obj->get_event_object();
        $evt_id = $evt_obj->ID();

        // first let's see if we have a venue already
        $evt_venues = ! empty($evt_id) ? $evt_obj->venues() : array();
        $evt_venue = $evt_venues && is_array($evt_venues) ? reset($evt_venues) : null;
        $evt_venue_id = $evt_venue instanceof EE_Venue ? $evt_venue->ID() : null;

        // possibly private venues.
        if (EE_Registry::instance()->CAP->current_user_can('ee_read_private_venues', 'get_venues')) {
            $vnu_where['status'] = array('IN', array('publish', 'private'));
        } else {
            $vnu_where['status'] = 'publish';
        }

        // cap checks
        if (! EE_Registry::instance()->CAP->current_user_can('ee_read_others_venues', 'get_venues')) {
            $vnu_where['VNU_wp_user'] = get_current_user_id();
        }

        $vnumdl = EE_Registry::instance()->load_model('Venue');
        $venues = $vnumdl->get_all(array($vnu_where, 'order_by' => array('VNU_name' => 'ASC')));

        $ven_select = array();
        $ven_select[0] = __('Select a Venue', 'event_espresso');
        // setup venues for selector
        foreach ($venues as $venue) {
            $ven_select[ $venue->ID() ] = $venue->name();
        }

        // if $ven_select does not have the existing venue attached to event then let's add that because we'll always
        // show existing attached venues even if it's trashed (or some other restricted status).

        if ($evt_venue_id && ! isset($ven_select[ $evt_venue_id ])) {
            $ven_select[ $evt_venue_id ] = $evt_venue->name();
            $venues = array_merge($venues, array($evt_venue));
        }

        $template_args['venues'] = $venues;
        $template_args['evt_venue_id'] = $evt_venue_id;
        $venue_selector = new EE_Select_Input(
            $ven_select,
            array(
                'html_name'  => 'venue_id',
                'html_id'    => 'venue_id',
                'html_class' => 'wide',
                'default'    => $evt_venue_id ? $evt_venue_id : '0'
            )
        );
        $template_args['venue_selector'] = $venue_selector->get_html_for_input();
        $enable_for_gmap = new EE_Yes_No_Input(
            array(
                'html_name'  => 'enable_for_gmap',
                'html_id'    => 'enable_for_gmap',
                'default'    => $evt_venue instanceof EE_Venue ? $evt_venue->enable_for_gmap() : false
            )
        );
        $template_args['enable_for_gmap'] = $enable_for_gmap->get_html_for_input();
        $template_args['new_venue_link'] = EEH_HTML::link(
            EE_Admin_Page::add_query_args_and_nonce(
                array('action' => 'create_new'),
                EE_VENUES_ADMIN_URL
            ),
            esc_html_x('Add new Venue', 'a link to add a new venue', 'event_espresso'),
            esc_html_x('Add new Venue', 'a link to add a new venue', 'event_espresso'),
            'ev_new_venue_link',
            'button',
            'margin-left:10px;',
            'target="_blank"'
        );

        // Decide on an info text when there are no venues to display.
        $no_venues_info_txt = esc_html_x(
            'You have not created any venues yet.',
            'Information text displayed in the venues metabox when there are no venues to display',
            'event_espresso'
        );
        if (empty($venues)) {
            $unpublished_where = $vnu_where;
            $unpublished_where['status'] = 'draft';
            $unpublished_venues = $vnumdl->get_all(array($unpublished_where, 'order_by' => array('VNU_name' => 'ASC')));
            if (count($unpublished_venues) > 0) {
                $no_venues_info_txt = esc_html_x(
                // @codingStandardsIgnoreStart
                    'Use the link below to publish your venue through the venue editor so it appears here for selection.',
                    // @codingStandardsIgnoreEnd
                    'Information text displayed in the venues metabox when there are no venues to display',
                    'event_espresso'
                );
            }
        }
        $template_args['no_venues_info'] = EEH_HTML::p(
            EEH_HTML::strong($no_venues_info_txt),
            'no_venues_info',
            'info'
        );

        $template_path = empty($venues) ? EE_VENUES_TEMPLATE_PATH . 'event_venues_metabox_content.template.php'
            : EE_VENUES_TEMPLATE_PATH . 'event_venues_metabox_content_from_manager.template.php';

        // Allow events venue metabox template args filtering.
        $template_args = apply_filters(
            'FHEE__espresso_events_Venues_Hooks___venue_metabox__template_args',
            $template_args,
            $template_path
        );

        EEH_Template::display_template($template_path, $template_args);
    }


    public function caf_venue_update($evtobj, $data)
    {
        EE_Registry::instance()->load_model('Venue');
        $venue_id = ! empty($data['venue_id']) ? $data['venue_id'] : null;


        // first let's check if the selected venue matches any existing venue attached to the event
        $evt_venue = $evtobj->venues();
        $evt_venue = ! empty($evt_venue) ? array_shift($evt_venue) : null;

        if (! empty($evt_venue) && $evt_venue->ID() != $venue_id) {
            $evtobj->_remove_relation_to($evt_venue->ID(), 'Venue');
        }

        if (empty($venue_id)) {
            return true;
        } //no venue to attach

        // this should take care of adding to revisions as well as main post object
        $success = $evtobj->_add_relation_to($venue_id, 'Venue');
        return ! empty($success) ? true : false;
    }
}

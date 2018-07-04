<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * EED_Events_Archive_Caff
 *
 * @package        Event Espresso
 * @subpackage     /modules/events_archive_caff/
 * @author         Brent Christensen
 */
class EED_Events_Archive_Caff extends EED_Events_Archive
{

    /**
     * @return EED_Events_Archive_Caff|EED_Module
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }


    /**
     * set_hooks - for hooking into EE Core, other modules, etc
     *
     * @return    void
     */
    public static function set_hooks()
    {
    }

    /**
     *    set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @access    public
     * @return    void
     */
    public static function set_hooks_admin()
    {
        define(
            'EVENTS_ARCHIVE_CAFF_TEMPLATES_PATH',
            str_replace('\\', DS, plugin_dir_path(__FILE__)) . 'templates' . DS
        );
        define('EVENT_ARCHIVE_CAFF_ASSETS_URL', plugin_dir_url(__FILE__) . 'assets' . DS);
        add_action(
            'AHEE__template_settings__template__before_settings_form',
            array('EED_Events_Archive_Caff', 'template_settings_form'),
            10
        );
        add_filter(
            'FHEE__General_Settings_Admin_Page__update_template_settings__data',
            array('EED_Events_Archive_Caff', 'update_template_settings'),
            10,
            2
        );
        // AJAX
        add_action(
            'wp_ajax_espresso_update_event_archive_order',
            array('EED_Events_Archive_Caff', 'update_event_archive_order')
        );
        add_action(
            'wp_ajax_nopriv_espresso_update_event_archive_order',
            array('EED_Events_Archive_Caff', 'update_event_archive_order')
        );
    }


    /**
     * run - initial module setup
     *
     * @param    WP $WP
     * @return    void
     */
    public function run($WP)
    {
    }


    /**
     * @return void
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function template_settings_form()
    {
        // grab general settings admin page and remove the existing hook callback
        $gen_set_admin = EE_Registry::instance()->LIB->EE_Admin_Page_Loader->get_admin_page_object('general_settings');
        if ($gen_set_admin instanceof General_Settings_Admin_Page) {
            remove_action(
                'AHEE__template_settings__template__before_settings_form',
                array($gen_set_admin, 'template_settings_caff_features'),
                100
            );
        }
        // first just grab the template settings
        $config = EE_Registry::instance()->CFG->template_settings;
        // then if the Event Archive config is valid, use that, else create a new one
        $config = $config instanceof EE_Template_Config
                  && $config->EED_Events_Archive instanceof EE_Events_Archive_Config
            ? $config->EED_Events_Archive
            : new EE_Events_Archive_Config();
        $config = apply_filters(
            'FHEE__EED_Events_Archive__template_settings_form__event_list_config',
            $config
        );
        $config->display_status_banner = isset($config->display_status_banner)
            ? $config->display_status_banner
            : 0;
        $config->display_description = isset($config->display_description)
            ? $config->display_description
            : 1;
        $config->display_ticket_selector = isset($config->display_ticket_selector)
            ? $config->display_ticket_selector
            : 0;
        $config->display_datetimes = isset($config->display_datetimes)
            ? $config->display_datetimes
            : 1;
        $config->display_venue = isset($config->display_venue)
            ? $config->display_venue
            : 0;
        $config->display_expired_events = isset($config->display_expired_events)
            ? $config->display_expired_events
            : 0;
        // display order options
        $config->use_sortable_display_order = isset($config->use_sortable_display_order)
            ? $config->use_sortable_display_order
            : false;
        $config->display_order_tickets = isset($config->display_order_tickets)
            ? $config->display_order_tickets
            : 120;
        $config->display_order_datetimes = isset($config->display_order_datetimes)
            ? $config->display_order_datetimes
            : 110;
        $config->display_order_event = isset($config->display_order_event)
            ? $config->display_order_event
            : 100;
        $config->display_order_venue = isset($config->display_order_venue)
            ? $config->display_order_venue
            : 130;
        // get template parts
        $template_parts = EED_Events_Archive::instance()->initialize_template_parts($config);
        // convert to array so that we can add more properties
        $config = get_object_vars($config);
        $config['event_archive_display_order'] = $template_parts->generate_sortable_list_of_template_parts(
            'event-archive-sortable-js',
            '',
            'archive-sortable-li archive-sortable-js'
        );
        EEH_Template::display_template(
            EVENTS_ARCHIVE_CAFF_TEMPLATES_PATH . 'admin-event-list-settings.template.php',
            $config
        );
    }


    /**
     * @param EE_Template_Config $CFG
     * @param array              $REQ
     * @return EE_Template_Config
     */
    public static function update_template_settings($CFG, $REQ)
    {
        /** @var EE_Events_Archive_Config $config */
        $config = $CFG->EED_Events_Archive instanceof EE_Events_Archive_Config
            ? $CFG->EED_Events_Archive
            : new EE_Events_Archive_Config();
        // unless we are resetting the config...
        if (! isset($REQ['EED_Events_Archive_reset_event_list_settings'])
            || absint($REQ['EED_Events_Archive_reset_event_list_settings']) !== 1
        ) {
            $config->display_status_banner = isset($REQ['EED_Events_Archive_display_status_banner'])
                ? absint($REQ['EED_Events_Archive_display_status_banner'])
                : 0;
            $config->display_description = isset($REQ['EED_Events_Archive_display_description'])
                ? absint($REQ['EED_Events_Archive_display_description'])
                : 1;
            $config->display_ticket_selector = isset($REQ['EED_Events_Archive_display_ticket_selector'])
                ? absint($REQ['EED_Events_Archive_display_ticket_selector'])
                : 0;
            $config->display_datetimes = isset($REQ['EED_Events_Archive_display_datetimes'])
                ? absint($REQ['EED_Events_Archive_display_datetimes'])
                : 1;
            $config->display_venue = isset($REQ['EED_Events_Archive_display_venue'])
                ? absint($REQ['EED_Events_Archive_display_venue'])
                : 0;
            $config->display_expired_events = isset($REQ['EED_Events_Archive_display_expired_events'])
                ? absint($REQ['EED_Events_Archive_display_expired_events'])
                : 0;
            $config->use_sortable_display_order = isset($REQ['EED_Events_Archive_use_sortable_display_order'])
                ? absint($REQ['EED_Events_Archive_use_sortable_display_order'])
                : 0;
            $config->display_order_event = $config->display_order_event !== null
                                           && $config->use_sortable_display_order
                ? $config->display_order_event
                : EED_Events_Archive::EVENT_DETAILS_PRIORITY;
            $config->display_order_datetimes = $config->display_order_datetimes !== null
                                               && $config->use_sortable_display_order
                ? $config->display_order_datetimes
                : EED_Events_Archive::EVENT_DATETIMES_PRIORITY;
            $config->display_order_tickets = $config->display_order_tickets !== null
                                             && $config->use_sortable_display_order
                ? $config->display_order_tickets
                : EED_Events_Archive::EVENT_TICKETS_PRIORITY;
            $config->display_order_venue = $config->display_order_venue !== null
                                           && $config->use_sortable_display_order
                ? $config->display_order_venue
                : EED_Events_Archive::EVENT_VENUES_PRIORITY;
        }
        $CFG->EED_Events_Archive = $config;
        do_action('AHEE__EED_Events_Archive__update_template_settings__after_update', $CFG, $REQ);
        return $CFG;
    }


    /**
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function update_event_archive_order()
    {
        /** @var EE_Config $config */
        $config = EE_Registry::instance()->CFG;
        $config_saved = false;
        $template_parts = sanitize_text_field($_POST['elements']);
        if (! empty($template_parts)) {
            $template_parts = explode(',', trim($template_parts, ','));
            foreach ($template_parts as $key => $template_part) {
                $template_part = "display_order_$template_part";
                $priority = ($key * 10) + EED_Events_Archive::EVENT_DETAILS_PRIORITY;
                if ($config->template_settings->EED_Events_Archive instanceof EE_Events_Archive_Config
                    && property_exists(
                        $config->template_settings->EED_Events_Archive,
                        $template_part
                    )
                ) {
                    $config->template_settings->EED_Events_Archive->{$template_part} = $priority;
                }
                do_action("AHEE__EED_Events_Archive__update_event_archive_order__$template_part", $priority);
            }
            $config_saved = $config->update_espresso_config(false, false);
        }
        if ($config_saved) {
            EE_Error::add_success(__('Display Order has been successfully updated.', 'event_espresso'));
        } else {
            EE_Error::add_error(
                __('Display Order was not updated.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        echo wp_json_encode(EE_Error::get_notices(false));
        exit();
    }
}

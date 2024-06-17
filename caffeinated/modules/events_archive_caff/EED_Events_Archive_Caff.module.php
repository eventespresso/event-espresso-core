<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;

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
     * @throws EE_Error
     * @throws ReflectionException
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
        self::setDefinitions();
        add_action(
            'AHEE__template_settings__template__before_settings_form',
            ['EED_Events_Archive_Caff', 'template_settings_form']
        );
        add_filter(
            'FHEE__General_Settings_Admin_Page__update_template_settings__data',
            ['EED_Events_Archive_Caff', 'update_template_settings'],
            10,
            2
        );
        // AJAX
        add_action(
            'wp_ajax_espresso_update_event_archive_order',
            ['EED_Events_Archive_Caff', 'update_event_archive_order']
        );
        add_action(
            'wp_ajax_nopriv_espresso_update_event_archive_order',
            ['EED_Events_Archive_Caff', 'update_event_archive_order']
        );
    }


    /**
     * run - initial module setup
     *
     * @param WP $WP
     * @return    void
     */
    public function run($WP)
    {
    }


    /**
     * Conditionally set constants if they haven't been defined yet.
     */
    public static function setDefinitions()
    {
        if (! defined('EVENTS_ARCHIVE_CAFF_TEMPLATES_PATH')) {
            define('EVENTS_ARCHIVE_CAFF_TEMPLATES_PATH', plugin_dir_path(__FILE__) . 'templates/');
            define('EVENT_ARCHIVE_CAFF_ASSETS_URL', plugin_dir_url(__FILE__) . 'assets/');
        }
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function template_settings_form()
    {
        /** @var EE_Admin_Page_Loader $admin_page_loader */
        $admin_page_loader = LoaderFactory::getLoader()->getShared('EE_Admin_Page_Loader');
        // grab general settings admin page and remove the existing hook callback
        $gen_set_admin = $admin_page_loader->get_admin_page_object('general_settings');
        if ($gen_set_admin instanceof General_Settings_Admin_Page) {
            remove_action(
                'AHEE__template_settings__template__before_settings_form',
                [$gen_set_admin, 'template_settings_caff_features'],
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
        /** @var EE_Events_Archive_Config $config */
        $config = apply_filters(
            'FHEE__EED_Events_Archive__template_settings_form__event_list_config',
            $config
        );

        $config->display_status_banner               = $config->display_status_banner ?? false;
        $config->display_description                 = $config->display_description ?? true;
        $config->display_ticket_selector             = $config->display_ticket_selector ?? false;
        $config->display_datetimes                   = $config->display_datetimes ?? true;
        $config->display_venue                       = $config->display_venue ?? false;
        $config->display_expired_events              = $config->display_expired_events ?? false;
        $config->display_events_with_expired_tickets = $config->display_events_with_expired_tickets ?? false;
        // display order options
        $config->use_sortable_display_order = $config->use_sortable_display_order ?? false;
        $config->display_order_event        = $config->display_order_event ?? 100;
        $config->display_order_datetimes    = $config->display_order_datetimes ?? 110;
        $config->display_order_tickets      = $config->display_order_tickets ?? 120;
        $config->display_order_venue        = $config->display_order_venue ?? 130;

        // get template parts
        $template_parts = EED_Events_Archive::instance()->initialize_template_parts($config);
        // convert to array so that we can add more properties
        $config                                = get_object_vars($config);
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
    public static function update_template_settings(EE_Template_Config $CFG, array $REQ): EE_Template_Config
    {
        // unless we are resetting the config...
        if (
            ! isset($REQ['EED_Events_Archive_reset_event_list_settings'])
            || absint($REQ['EED_Events_Archive_reset_event_list_settings']) !== 1
        ) {
            /** @var EE_Events_Archive_Config $config */
            $config = $CFG->EED_Events_Archive instanceof EE_Events_Archive_Config
                ? $CFG->EED_Events_Archive
                : new EE_Events_Archive_Config();

            $config->display_status_banner      = isset($REQ['EED_Events_Archive_display_status_banner'])
                ? filter_var($REQ['EED_Events_Archive_display_status_banner'], FILTER_VALIDATE_BOOL)
                : false;
            $config->display_description        = isset($REQ['EED_Events_Archive_display_description'])
                ? filter_var($REQ['EED_Events_Archive_display_description'], FILTER_VALIDATE_BOOL)
                : true;
            $config->display_ticket_selector    = isset($REQ['EED_Events_Archive_display_ticket_selector'])
                ? filter_var($REQ['EED_Events_Archive_display_ticket_selector'], FILTER_VALIDATE_BOOL)
                : false;
            $config->display_datetimes          = isset($REQ['EED_Events_Archive_display_datetimes'])
                ? filter_var($REQ['EED_Events_Archive_display_datetimes'], FILTER_VALIDATE_BOOL)
                : true;
            $config->display_venue              = isset($REQ['EED_Events_Archive_display_venue'])
                ? filter_var($REQ['EED_Events_Archive_display_venue'], FILTER_VALIDATE_BOOL)
                : false;
            $config->display_expired_events     = isset($REQ['EED_Events_Archive_display_expired_events'])
                ? filter_var($REQ['EED_Events_Archive_display_expired_events'], FILTER_VALIDATE_BOOL)
                : false;
            $config->display_events_with_expired_tickets     = isset($REQ['EED_Events_Archive_display_events_with_expired_tickets'])
                ? filter_var($REQ['EED_Events_Archive_display_events_with_expired_tickets'], FILTER_VALIDATE_BOOL)
                : false;
            $config->use_sortable_display_order = isset($REQ['EED_Events_Archive_use_sortable_display_order'])
                ? filter_var($REQ['EED_Events_Archive_use_sortable_display_order'], FILTER_VALIDATE_BOOL)
                : false;
            $config->display_order_event        = $config->use_sortable_display_order
                ? $config->display_order_event
                : EED_Events_Archive::EVENT_DETAILS_PRIORITY;
            $config->display_order_datetimes    = $config->use_sortable_display_order
                ? $config->display_order_datetimes
                : EED_Events_Archive::EVENT_DATETIMES_PRIORITY;
            $config->display_order_tickets      = $config->use_sortable_display_order
                ? $config->display_order_tickets
                : EED_Events_Archive::EVENT_TICKETS_PRIORITY;
            $config->display_order_venue        = $config->use_sortable_display_order
                ? $config->display_order_venue
                : EED_Events_Archive::EVENT_VENUES_PRIORITY;
        } else {
            $config = new EE_Events_Archive_Config();
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
        $config         = EE_Registry::instance()->CFG;
        $config_saved   = false;
        $template_parts = EED_Events_Archive_Caff::getRequest()->getRequestParam('elements');
        if (! empty($template_parts)) {
            $template_parts = explode(',', trim($template_parts, ','));
            foreach ($template_parts as $key => $template_part) {
                $template_part = "display_order_$template_part";
                $priority      = ($key * 10) + EED_Events_Archive::EVENT_DETAILS_PRIORITY;
                if (
                    $config->template_settings->EED_Events_Archive instanceof EE_Events_Archive_Config
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
            EE_Error::add_success(esc_html__('Display Order has been successfully updated.', 'event_espresso'));
        } else {
            EE_Error::add_error(
                esc_html__('Display Order was not updated.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        wp_send_json(EE_Error::get_notices(false));
    }
}

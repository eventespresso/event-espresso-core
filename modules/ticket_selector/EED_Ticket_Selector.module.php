<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\modules\ticket_selector\DisplayTicketSelector;
use EventEspresso\modules\ticket_selector\TicketSelectorIframe;
use EventEspresso\modules\ticket_selector\TicketSelectorIframeEmbedButton;

/**
 * Ticket Selector  class
 *
 * @package        Event Espresso
 * @subpackage     includes/classes/EE_Ticket_Selector.class.php
 * @author         Brent Christensen
 * @method EED_Ticket_Selector get_instance($module_name)
 * @method EE_Ticket_Selector_Config config()
 */
class EED_Ticket_Selector extends EED_Module
{

    /**
     * @var DisplayTicketSelector $ticket_selector
     */
    private static $ticket_selector;

    /**
     * @var TicketSelectorIframeEmbedButton $iframe_embed_button
     */
    private static $iframe_embed_button;


    /**
     * @return EED_Module|EED_Ticket_Selector
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }


    /**
     * @return EE_Ticket_Selector_Config
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function ticketConfig()
    {
        EED_Ticket_Selector::instance()->set_config();
        return EED_Ticket_Selector::instance()->config();
    }


    /**
     * @return void
     */
    protected function set_config()
    {
        if ($this->_config instanceof EE_Ticket_Selector_Config) {
            return;
        }
        $this->set_config_section('template_settings');
        $this->set_config_class('EE_Ticket_Selector_Config');
        $this->set_config_name('EED_Ticket_Selector');
    }


    /**
     *    set_hooks - for hooking into EE Core, other modules, etc
     *
     * @return void
     */
    public static function set_hooks()
    {
        // routing
        EE_Config::register_route(
            'iframe',
            'EED_Ticket_Selector',
            'ticket_selector_iframe',
            'ticket_selector'
        );
        EE_Config::register_route(
            'process_ticket_selections',
            'EED_Ticket_Selector',
            'process_ticket_selections'
        );
        EE_Config::register_route(
            'cancel_ticket_selections',
            'EED_Ticket_Selector',
            'cancel_ticket_selections'
        );
        add_action('wp_loaded', ['EED_Ticket_Selector', 'set_definitions'], 2);
        add_action('AHEE_event_details_header_bottom', ['EED_Ticket_Selector', 'display_ticket_selector'], 10, 1);
        add_action('wp_enqueue_scripts', ['EED_Ticket_Selector', 'translate_js_strings'], 0);
        add_action('wp_enqueue_scripts', ['EED_Ticket_Selector', 'load_tckt_slctr_assets'], 10);
        EED_Ticket_Selector::loadIframeAssets();
    }


    /**
     *    set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @return void
     */
    public static function set_hooks_admin()
    {
        // hook into the end of the \EE_Admin_Page::_load_page_dependencies()
        // to load assets for "espresso_events" page on the "edit" route (action)
        add_action(
            'FHEE__EE_Admin_Page___load_page_dependencies__after_load__espresso_events__edit',
            ['EED_Ticket_Selector', 'ticket_selector_iframe_embed_button'],
            10
        );
        /**
         * Make sure assets for the ticket selector are loaded on the espresso registrations route so  admin side
         * registrations work.
         */
        add_action(
            'FHEE__EE_Admin_Page___load_page_dependencies__after_load__espresso_registrations__new_registration',
            ['EED_Ticket_Selector', 'set_definitions'],
            10
        );
    }


    /**
     *    set_definitions
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function set_definitions()
    {
        // don't do this twice
        if (defined('TICKET_SELECTOR_ASSETS_URL')) {
            return;
        }
        define('TICKET_SELECTOR_ASSETS_URL', plugin_dir_url(__FILE__) . 'assets/');
        define(
            'TICKET_SELECTOR_TEMPLATES_PATH',
            str_replace('\\', '/', plugin_dir_path(__FILE__)) . 'templates/'
        );
        // initialize config
        EED_Ticket_Selector::instance()->set_config();
        // if config is not set, initialize
        if (! EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector instanceof EE_Ticket_Selector_Config
        ) {
            EED_Ticket_Selector::instance()->set_config();
            EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector =
                EED_Ticket_Selector::instance()->config();
        }
    }


    /**
     * @return DisplayTicketSelector
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function ticketSelector()
    {
        if (! EED_Ticket_Selector::$ticket_selector instanceof DisplayTicketSelector) {
            EED_Ticket_Selector::$ticket_selector = new DisplayTicketSelector(
                EED_Ticket_Selector::getRequest(),
                EED_Ticket_Selector::ticketConfig(),
                EED_Events_Archive::is_iframe()
            );
        }
        return EED_Ticket_Selector::$ticket_selector;
    }


    /**
     * gets the ball rolling
     *
     * @param WP $WP
     * @return void
     */
    public function run($WP)
    {
    }


    /**
     * @return TicketSelectorIframeEmbedButton
     */
    public static function getIframeEmbedButton()
    {
        if (! self::$iframe_embed_button instanceof TicketSelectorIframeEmbedButton) {
            self::$iframe_embed_button = new TicketSelectorIframeEmbedButton();
        }
        return self::$iframe_embed_button;
    }


    /**
     * ticket_selector_iframe_embed_button
     *
     * @return void
     */
    public static function ticket_selector_iframe_embed_button()
    {
        $iframe_embed_button = EED_Ticket_Selector::getIframeEmbedButton();
        $iframe_embed_button->addEventEditorIframeEmbedButton();
    }


    /**
     * ticket_selector_iframe
     *
     * @return void
     * @throws DomainException
     */
    public function ticket_selector_iframe()
    {
        EE_Dependency_Map::register_dependencies(
            TicketSelectorIframe::class,
            [
                'EEM_Event'                                            => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\CurrentPage'      => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\RequestInterface' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $ticket_selector_iframe = LoaderFactory::getLoader()->getNew(TicketSelectorIframe::class);
        $ticket_selector_iframe->display();
    }


    /**
     * creates buttons for selecting number of attendees for an event
     *
     * @param WP_Post|int $event
     * @param bool        $view_details
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function display_ticket_selector($event = null, $view_details = false)
    {
        return EED_Ticket_Selector::ticketSelector()->display($event, $view_details);
    }


    /**
     * @return bool  or FALSE
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function process_ticket_selections()
    {
        /** @var EventEspresso\modules\ticket_selector\ProcessTicketSelector $form */
        $form = LoaderFactory::getLoader()->getShared('EventEspresso\modules\ticket_selector\ProcessTicketSelector');
        return $form->processTicketSelections();
    }


    /**
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function cancel_ticket_selections()
    {
        /** @var EventEspresso\modules\ticket_selector\ProcessTicketSelector $form */
        $form = LoaderFactory::getLoader()->getShared('EventEspresso\modules\ticket_selector\ProcessTicketSelector');
        return $form->cancelTicketSelections();
    }


    /**
     * @return void
     */
    public static function translate_js_strings()
    {
        EE_Registry::$i18n_js_strings['please_select_date_filter_notice'] = esc_html__(
            'please select a datetime',
            'event_espresso'
        );
    }


    /**
     * @return void
     */
    public static function load_tckt_slctr_assets()
    {
        if (apply_filters('FHEE__EED_Ticket_Selector__load_tckt_slctr_assets', false)) {
            // add some style
            wp_register_style(
                'ticket_selector',
                TICKET_SELECTOR_ASSETS_URL . 'ticket_selector.css',
                [],
                EVENT_ESPRESSO_VERSION
            );
            wp_enqueue_style('ticket_selector');
            // make it dance
            wp_register_script(
                'ticket_selector',
                TICKET_SELECTOR_ASSETS_URL . 'ticket_selector.js',
                ['espresso_core'],
                EVENT_ESPRESSO_VERSION,
                true
            );
            wp_enqueue_script('ticket_selector');
            require_once EE_LIBRARIES
                         . 'form_sections/strategies/display/EE_Checkbox_Dropdown_Selector_Display_Strategy.strategy.php';
            EE_Checkbox_Dropdown_Selector_Display_Strategy::enqueue_styles_and_scripts();
        }
    }


    /**
     * @return void
     */
    public static function loadIframeAssets()
    {
        // for event lists
        add_filter(
            'FHEE__EventEspresso_modules_events_archive_EventsArchiveIframe__display__css',
            ['EED_Ticket_Selector', 'iframeCss']
        );
        add_filter(
            'FHEE__EventEspresso_modules_events_archive_EventsArchiveIframe__display__js',
            ['EED_Ticket_Selector', 'iframeJs']
        );
        // for ticket selectors
        add_filter(
            'FHEE__EED_Ticket_Selector__ticket_selector_iframe__css',
            ['EED_Ticket_Selector', 'iframeCss']
        );
        add_filter(
            'FHEE__EED_Ticket_Selector__ticket_selector_iframe__js',
            ['EED_Ticket_Selector', 'iframeJs']
        );
    }


    /**
     * Informs the rest of the forms system what CSS and JS is needed to display the input
     *
     * @param array $iframe_css
     * @return array
     */
    public static function iframeCss(array $iframe_css)
    {
        $iframe_css['ticket_selector'] = TICKET_SELECTOR_ASSETS_URL . 'ticket_selector.css';
        return $iframe_css;
    }


    /**
     * Informs the rest of the forms system what CSS and JS is needed to display the input
     *
     * @param array $iframe_js
     * @return array
     */
    public static function iframeJs(array $iframe_js)
    {
        $iframe_js['ticket_selector'] = TICKET_SELECTOR_ASSETS_URL . 'ticket_selector.js';
        return $iframe_js;
    }


    /****************************** DEPRECATED ******************************/


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated
     */
    public static function display_view_details_btn()
    {
        // todo add doing_it_wrong() notice during next major version
        return EED_Ticket_Selector::ticketSelector()->displayViewDetailsButton();
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated
     */
    public static function display_ticket_selector_submit()
    {
        // todo add doing_it_wrong() notice during next major version
        return EED_Ticket_Selector::ticketSelector()->displaySubmitButton();
    }


    /**
     * @param string $permalink_string
     * @param int    $id
     * @param string $new_title
     * @param string $new_slug
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @deprecated
     */
    public static function iframe_code_button($permalink_string, $id, $new_title = '', $new_slug = '')
    {
        $request = self::getRequest();
        // todo add doing_it_wrong() notice during next major version
        if (
            $request->getRequestParam('page') === 'espresso_events'
            && $request->getRequestParam('action') === 'edit'
        ) {
            $iframe_embed_button = EED_Ticket_Selector::getIframeEmbedButton();
            $iframe_embed_button->addEventEditorIframeEmbedButton();
        }
        return '';
    }


    /**
     * @param int    $ID
     * @param string $external_url
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated
     */
    public static function ticket_selector_form_open($ID = 0, $external_url = '')
    {
        // todo add doing_it_wrong() notice during next major version
        return EED_Ticket_Selector::ticketSelector()->formOpen($ID, $external_url);
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated
     */
    public static function ticket_selector_form_close()
    {
        // todo add doing_it_wrong() notice during next major version
        return EED_Ticket_Selector::ticketSelector()->formClose();
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated
     */
    public static function no_tkt_slctr_end_dv()
    {
        // todo add doing_it_wrong() notice during next major version
        return EED_Ticket_Selector::ticketSelector()->ticketSelectorEndDiv();
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.9.13
     */
    public static function tkt_slctr_end_dv()
    {
        return EED_Ticket_Selector::ticketSelector()->clearTicketSelector();
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated
     */
    public static function clear_tkt_slctr()
    {
        return EED_Ticket_Selector::ticketSelector()->clearTicketSelector();
    }


    /**
     * @deprecated
     */
    public static function load_tckt_slctr_assets_admin()
    {
        $request = self::getRequest();
        // todo add doing_it_wrong() notice during next major version
        if (
            $request->getRequestParam('page') === 'espresso_events'
            && $request->getRequestParam('action') === 'edit'
        ) {
            $iframe_embed_button = EED_Ticket_Selector::getIframeEmbedButton();
            $iframe_embed_button->embedButtonAssets();
        }
    }
}

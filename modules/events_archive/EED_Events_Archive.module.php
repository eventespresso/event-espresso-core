<?php

use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;
use EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\libraries\iframe_display\EventListIframeEmbedButton;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\modules\events_archive\EventsArchiveIframe;

/**
 * Event List
 *
 * @package        Event Espresso
 * @subpackage     /modules/events_archive/
 * @author         Brent Christensen
 */
class EED_Events_Archive extends EED_Module
{
    const EVENT_DETAILS_PRIORITY   = 100;

    const EVENT_DATETIMES_PRIORITY = 110;

    const EVENT_TICKETS_PRIORITY   = 120;

    const EVENT_VENUES_PRIORITY    = 130;


    public static $espresso_event_list_ID    = 0;

    public static $espresso_grid_event_lists = [];

    /**
     * @type bool $using_get_the_excerpt
     */
    protected static $using_get_the_excerpt = false;

    /**
     * Used to flag when the event list is being called from an external iframe.
     *
     * @var bool $iframe
     */
    protected static $iframe = false;

    /**
     * @var EventListIframeEmbedButton $_iframe_embed_button
     */
    private static $_iframe_embed_button;

    /**
     * @type EE_Template_Part_Manager $template_parts
     */
    protected $template_parts;


    /**
     * @return EED_Events_Archive
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }


    /**
     * for hooking into EE Core, other modules, etc
     *
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function set_hooks()
    {
        /** @var CustomPostTypeDefinitions $custom_post_type_definitions */
        $custom_post_type_definitions = LoaderFactory::getLoader()->getShared(CustomPostTypeDefinitions::class);
        $custom_post_types            = $custom_post_type_definitions->getDefinitions();
        EED_Module::registerRoute(
            $custom_post_types[ EspressoPostType::EVENTS ]['plural_slug'],
            'Events_Archive',
            'run'
        );
        EED_Module::registerRoute(
            'event_list',
            'Events_Archive',
            'event_list'
        );
        EED_Module::registerRoute(
            'iframe',
            'Events_Archive',
            'event_list_iframe',
            'event_list'
        );
        add_action('wp_loaded', ['EED_Events_Archive', 'set_definitions'], 2);
    }


    /**
     * for hooking into EE Admin Core, other modules, etc
     *
     * @return void
     */
    public static function set_hooks_admin()
    {
        add_action('wp_loaded', ['EED_Events_Archive', 'set_definitions'], 2);
        // hook into the end of the \EE_Admin_Page::_load_page_dependencies()
        // to load assets for "espresso_events" page on the "default" route (action)
        add_action(
            'FHEE__EE_Admin_Page___load_page_dependencies__after_load__espresso_events__default',
            ['EED_Events_Archive', 'event_list_iframe_embed_button'],
            10
        );
    }


    /**
     * @return void
     */
    public static function set_definitions()
    {
        define('EVENTS_ARCHIVE_ASSETS_URL', plugin_dir_url(__FILE__) . 'assets/');
        define('EVENTS_ARCHIVE_TEMPLATES_PATH', str_replace('\\', '/', plugin_dir_path(__FILE__)) . 'templates/');
    }


    /**
     * set up EE_Events_Archive_Config
     */
    protected function set_config()
    {
        $this->set_config_section('template_settings');
        $this->set_config_class('EE_Events_Archive_Config');
        $this->set_config_name('EED_Events_Archive');
    }


    /**
     * @return EventListIframeEmbedButton
     */
    public static function get_iframe_embed_button()
    {
        if (! self::$_iframe_embed_button instanceof EventListIframeEmbedButton) {
            self::$_iframe_embed_button = new EventListIframeEmbedButton();
        }
        return self::$_iframe_embed_button;
    }


    /**
     * @return void
     */
    public static function event_list_iframe_embed_button()
    {
        $iframe_embed_button = EED_Events_Archive::get_iframe_embed_button();
        $iframe_embed_button->addEmbedButton();
    }


    /**
     * @param EE_Events_Archive_Config|null $config
     * @return EE_Template_Part_Manager
     * @throws EE_Error
     */
    public function initialize_template_parts(EE_Events_Archive_Config $config = null)
    {
        $config = $config instanceof EE_Events_Archive_Config ? $config : $this->config();
        EEH_Autoloader::register_template_part_autoloaders();
        $template_parts = new EE_Template_Part_Manager();
        $template_parts->add_template_part(
            'tickets',
            esc_html__('Ticket Selector', 'event_espresso'),
            'content-espresso_events-tickets.php',
            $config->display_order_tickets
        );
        $template_parts->add_template_part(
            'datetimes',
            esc_html__('Dates and Times', 'event_espresso'),
            'content-espresso_events-datetimes.php',
            $config->display_order_datetimes
        );
        $template_parts->add_template_part(
            'event',
            esc_html__('Event Description', 'event_espresso'),
            'content-espresso_events-details.php',
            $config->display_order_event
        );
        $template_parts->add_template_part(
            'venue',
            esc_html__('Venue Information', 'event_espresso'),
            'content-espresso_events-venues.php',
            $config->display_order_venue
        );
        do_action('AHEE__EED_Event_Archive__initialize_template_parts', $template_parts);
        return $template_parts;
    }


    /**
     * initial module setup
     * this gets called by the EE_Front_Controller if the module route is found in the incoming request
     *
     * @param WP $WP
     * @return void
     */
    public function run($WP)
    {
        do_action('AHEE__EED_Events_Archive__before_run');
        // ensure valid EE_Events_Archive_Config() object exists
        $this->set_config();
        /** @type EE_Events_Archive_Config $config */
        $config = $this->config();
        // load other required components
        $this->load_event_list_assets();
        // filter the WP posts_join, posts_where, and posts_orderby SQL clauses
        // add query filters
        EEH_Event_Query::add_query_filters();
        // set params that will get used by the filters
        EEH_Event_Query::set_query_params(
            '',                             // month
            '',                             // category
            $config->display_expired_events // show_expired
        );
        // check what template is loaded
        add_filter('template_include', [$this, 'template_include'], 999, 1);
    }


    /**
     * most likely called by the ESPRESSO_EVENTS shortcode which uses this module to do some of it's lifting
     *
     * @return void
     */
    public function event_list()
    {
        // ensure valid EE_Events_Archive_Config() object exists
        $this->set_config();
        // load other required components
        $this->load_event_list_assets();
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function event_list_iframe()
    {
        EED_Events_Archive::$iframe = true;
        $event_list_iframe          = new EventsArchiveIframe($this);
        $event_list_iframe->display();
    }


    /**
     * @return bool
     */
    public static function is_iframe()
    {
        return EED_Events_Archive::$iframe;
    }


    /**
     * @return string
     */
    public static function link_target()
    {
        return EED_Events_Archive::$iframe ? ' target="_blank"' : '';
    }


    /**
     * @param string $template
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function template_include($template = '')
    {
        // don't add content filter for dedicated EE child themes or private posts
        if (! EEH_Template::is_espresso_theme()) {
            /** @type EE_Events_Archive_Config $config */
            $config = $this->config();
            // add status banner ?
            if ($config->display_status_banner) {
                add_filter('the_title', ['EED_Events_Archive', 'the_title'], 100, 2);
            }
            // if NOT a custom template
            if (
                apply_filters('FHEE__EED_Event_Archive__template_include__allow_custom_selected_template', false)
                || EE_Registry::instance()
                              ->load_core('Front_Controller')
                              ->get_selected_template() !== 'archive-espresso_events.php'
            ) {
                add_filter('FHEE__EED_Events_Archive__template_include__events_list_active', '__return_true');
                // load functions.php file for the theme (loaded by WP if using child theme)
                EEH_Template::load_espresso_theme_functions();
                EED_Events_Archive::addEventDetailsFilters();
                // don't display entry meta because the existing theme will take care of that
                add_filter('FHEE__content_espresso_events_details_template__display_entry_meta', '__return_false');
            }
        }
        return $template;
    }


    /**
     * kinda hacky, but if a theme is using get_the_excerpt(),
     * then we need to remove our filters on the_content()
     *
     * @param string $excerpt
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function get_the_excerpt($excerpt = '')
    {
        if (post_password_required()) {
            return $excerpt;
        }
        if (apply_filters('FHEE__EED_Events_Archive__get_the_excerpt__theme_uses_get_the_excerpt', false)) {
            EED_Events_Archive::removeEventDetailsFilters(false);
            $excerpt = EED_Events_Archive::event_details($excerpt);
        } else {
            EED_Events_Archive::$using_get_the_excerpt = true;
            add_filter('wp_trim_excerpt', ['EED_Events_Archive', 'end_get_the_excerpt'], 999, 1);
        }
        return $excerpt;
    }


    /**
     * @param string $text
     * @return string
     */
    public static function end_get_the_excerpt($text = '')
    {
        EED_Events_Archive::$using_get_the_excerpt = false;
        return $text;
    }


    /**
     * @param string $title
     * @param string $id
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function the_title($title = '', $id = '')
    {
        global $post;
        if ($post instanceof WP_Post) {
            return (EED_Events_Archive::isBlockTheme() || in_the_loop()) && $post->ID == $id
                ? espresso_event_status_banner($post->ID) . $title
                : $title;
        }
        return $title;
    }


    /**
     * @param string $content
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function event_details($content)
    {
        global $post;
        static $current_post_ID = 0;
        if (
            $current_post_ID !== $post->ID
            && $post->post_type === EspressoPostType::EVENTS
            && ! EED_Events_Archive::$using_get_the_excerpt
            && ! post_password_required()
            && (
                apply_filters('FHEE__EES_Espresso_Events__process_shortcode__true', false)
                || ! apply_filters('FHEE__content_espresso_events__template_loaded', false)
            )
        ) {
            // Set current post ID to prevent showing content twice, but only if headers have definitely been sent.
            // Reason being is that some plugins, like Yoast, need to run through a copy of the loop early
            // BEFORE headers are sent in order to examine the post content and generate content for the HTML header.
            // We want to allow those plugins to still do their thing and have access to our content, but depending on
            // how your event content is being displayed (shortcode, CPT route, etc), this filter can get applied twice,
            // so the following allows this filter to be applied multiple times, but only once for real
            $current_post_ID = did_action('loop_start') ? $post->ID : 0;
            if (EE_Registry::instance()->CFG->template_settings->EED_Events_Archive->use_sortable_display_order) {
                $content = EED_Events_Archive::use_sortable_display_order();
            } else {
                $content = EED_Events_Archive::use_filterable_display_order();
            }
        }
        return $content;
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected static function use_sortable_display_order()
    {
        // no further password checks required atm
        add_filter('FHEE__EED_Events_Archive__event_details__no_post_password_required', '__return_true');
        // remove this callback from being applied to the_content()
        EED_Events_Archive::removeEventDetailsFilters();
        // now add additional content depending on whether event is using the_excerpt() or the_content()
        EED_Events_Archive::instance()->template_parts = EED_Events_Archive::instance()->initialize_template_parts();
        $content = EEH_Template::locate_template('content-espresso_events-details.php');
        $content = EED_Events_Archive::instance()->template_parts->apply_template_part_filters($content);
        // re-add our main filters (or else the next event won't have them)
        EED_Events_Archive::addEventDetailsFilters();
        remove_filter(
            'FHEE__EED_Events_Archive__event_details__no_post_password_required',
            '__return_true'
        );
        return $content;
    }


    /**
     * @return string
     */
    protected static function use_filterable_display_order()
    {
        // remove this callback from being applied to the_content()
        EED_Events_Archive::removeEventDetailsFilters();
        // now add additional content depending on whether event is using the_excerpt() or the_content()
        EED_Events_Archive::_add_additional_excerpt_filters();
        EED_Events_Archive::_add_additional_content_filters();
        do_action('AHEE__EED_Events_Archive__use_filterable_display_order__after_add_filters');
        // now load our template
        $content = EEH_Template::locate_template('content-espresso_events-details.php');
        // re-add our main filters (or else the next event won't have them)
        EED_Events_Archive::addEventDetailsFilters();
        // but remove the other filters so that they don't get applied to the next post
        EED_Events_Archive::_remove_additional_events_archive_filters();
        do_action('AHEE__EED_Events_Archive__use_filterable_display_order__after_remove_filters');
        // we're not returning the $content directly because the template we are loading uses the_content (or the_excerpt)
        // return ! empty( $template ) ? $template : $content;
        return $content;
    }


    /**
     * adds datetimes ABOVE content
     *
     * @param string $content
     * @return string
     */
    public static function event_datetimes($content)
    {
        if (post_password_required()) {
            return $content;
        }
        return EEH_Template::locate_template('content-espresso_events-datetimes.php') . $content;
    }


    /**
     * adds tickets ABOVE content (which includes datetimes)
     *
     * @param string $content
     * @return string
     */
    public static function event_tickets($content)
    {
        if (post_password_required()) {
            return $content;
        }
        return EEH_Template::locate_template('content-espresso_events-tickets.php') . $content;
    }


    /**
     * adds venues BELOW content
     *
     * @param string $content
     * @return string
     */
    public static function event_venue($content)
    {
        return EED_Events_Archive::event_venues($content);
    }


    /**
     * adds venues BELOW content
     *
     * @param string $content
     * @return string
     */
    public static function event_venues($content)
    {
        if (post_password_required()) {
            return $content;
        }
        return $content . EEH_Template::locate_template('content-espresso_events-venues.php');
    }


    /**
     * @return bool
     * @since 4.10.33.p
     */
    public static function isBlockTheme()
    {
        return function_exists('wp_is_block_theme') && wp_is_block_theme();
    }


    /**
     * @return string
     * @since 4.10.33.p
     */
    public static function getExcerptFilter()
    {
        static $excerpt_filter = null;
        if ($excerpt_filter === null) {
            $excerpt_filter = EED_Events_Archive::isBlockTheme() ? 'get_the_excerpt' : 'the_excerpt';
        }
        return $excerpt_filter;
    }


    /**
     * @since 4.10.33.p
     */
    protected static function addEventDetailsFilters()
    {
        add_filter(
            'the_content',
            ['EED_Events_Archive', 'event_details'],
            EED_Events_Archive::EVENT_DETAILS_PRIORITY
        );
        // but because we don't know if the theme is using the_excerpt()
        add_filter(
            EED_Events_Archive::getExcerptFilter(),
            ['EED_Events_Archive', 'event_details'],
            EED_Events_Archive::EVENT_DETAILS_PRIORITY
        );
        // and just in case they are running get_the_excerpt() which DESTROYS things
        add_filter('get_the_excerpt', ['EED_Events_Archive', 'get_the_excerpt'], 1, 1);
    }


    /**
     * @param bool $and_get_the_excerpt
     * @since 4.10.33.p
     */
    protected static function removeEventDetailsFilters($and_get_the_excerpt = true)
    {
        // we need to first remove all callbacks from being applied to the_content()
        // (otherwise it will recurse and blow up the interweb)
        remove_filter(
            'the_content',
            ['EED_Events_Archive', 'event_details'],
            EED_Events_Archive::EVENT_DETAILS_PRIORITY
        );
        remove_filter(
            EED_Events_Archive::getExcerptFilter(),
            ['EED_Events_Archive', 'event_details'],
            EED_Events_Archive::EVENT_DETAILS_PRIORITY
        );
        if ($and_get_the_excerpt) {
            remove_filter('get_the_excerpt', ['EED_Events_Archive', 'get_the_excerpt'], 1);
        }
    }


    /**
     * @return void
     */
    private static function _add_additional_excerpt_filters()
    {
        add_filter(
            EED_Events_Archive::getExcerptFilter(),
            ['EED_Events_Archive', 'event_datetimes'],
            EED_Events_Archive::EVENT_DATETIMES_PRIORITY
        );
        add_filter(
            EED_Events_Archive::getExcerptFilter(),
            ['EED_Events_Archive', 'event_tickets'],
            EED_Events_Archive::EVENT_TICKETS_PRIORITY
        );
        add_filter(
            EED_Events_Archive::getExcerptFilter(),
            ['EED_Events_Archive', 'event_venues'],
            EED_Events_Archive::EVENT_VENUES_PRIORITY
        );
    }


    /**
     * @return void
     */
    private static function _add_additional_content_filters()
    {
        add_filter(
            'the_content',
            ['EED_Events_Archive', 'event_datetimes'],
            EED_Events_Archive::EVENT_DATETIMES_PRIORITY
        );
        add_filter(
            'the_content',
            ['EED_Events_Archive', 'event_tickets'],
            EED_Events_Archive::EVENT_TICKETS_PRIORITY
        );
        add_filter(
            'the_content',
            ['EED_Events_Archive', 'event_venues'],
            EED_Events_Archive::EVENT_VENUES_PRIORITY
        );
    }


    /**
     * @return void
     */
    private static function _remove_additional_events_archive_filters()
    {
        remove_filter(
            EED_Events_Archive::getExcerptFilter(),
            ['EED_Events_Archive', 'event_datetimes'],
            EED_Events_Archive::EVENT_DATETIMES_PRIORITY
        );
        remove_filter(
            EED_Events_Archive::getExcerptFilter(),
            ['EED_Events_Archive', 'event_tickets'],
            EED_Events_Archive::EVENT_TICKETS_PRIORITY
        );
        remove_filter(
            EED_Events_Archive::getExcerptFilter(),
            ['EED_Events_Archive', 'event_venues'],
            EED_Events_Archive::EVENT_VENUES_PRIORITY
        );
        remove_filter(
            'the_content',
            ['EED_Events_Archive', 'event_datetimes'],
            EED_Events_Archive::EVENT_DATETIMES_PRIORITY
        );
        remove_filter(
            'the_content',
            ['EED_Events_Archive', 'event_tickets'],
            EED_Events_Archive::EVENT_TICKETS_PRIORITY
        );
        remove_filter(
            'the_content',
            ['EED_Events_Archive', 'event_venues'],
            EED_Events_Archive::EVENT_VENUES_PRIORITY
        );
    }


    /**
     * @return void
     */
    public static function remove_all_events_archive_filters()
    {
        // remove_filter( 'get_the_excerpt', array( 'EED_Events_Archive', 'get_the_excerpt' ), 1 );
        remove_filter('the_title', ['EED_Events_Archive', 'the_title'], 1);
        remove_filter(
            EED_Events_Archive::getExcerptFilter(),
            ['EED_Events_Archive', 'event_details'],
            EED_Events_Archive::EVENT_DETAILS_PRIORITY
        );
        remove_filter(
            EED_Events_Archive::getExcerptFilter(),
            ['EED_Events_Archive', 'event_datetimes'],
            EED_Events_Archive::EVENT_DATETIMES_PRIORITY
        );
        remove_filter(
            EED_Events_Archive::getExcerptFilter(),
            ['EED_Events_Archive', 'event_tickets'],
            EED_Events_Archive::EVENT_TICKETS_PRIORITY
        );
        remove_filter(
            EED_Events_Archive::getExcerptFilter(),
            ['EED_Events_Archive', 'event_venues'],
            EED_Events_Archive::EVENT_VENUES_PRIORITY
        );
        remove_filter(
            'the_content',
            ['EED_Events_Archive', 'event_details'],
            EED_Events_Archive::EVENT_DETAILS_PRIORITY
        );
        remove_filter(
            'the_content',
            ['EED_Events_Archive', 'event_datetimes'],
            EED_Events_Archive::EVENT_DATETIMES_PRIORITY
        );
        remove_filter(
            'the_content',
            ['EED_Events_Archive', 'event_tickets'],
            EED_Events_Archive::EVENT_TICKETS_PRIORITY
        );
        remove_filter(
            'the_content',
            ['EED_Events_Archive', 'event_venues'],
            EED_Events_Archive::EVENT_VENUES_PRIORITY
        );
        // don't display entry meta because the existing theme will take care of that
        remove_filter(
            'FHEE__content_espresso_events_details_template__display_entry_meta',
            '__return_false'
        );
    }


    /**
     * @return void
     */
    public function load_event_list_assets()
    {
        do_action('AHEE__EED_Events_Archive__before_load_assets');
        add_filter('FHEE_load_EE_Session', '__return_true');
        add_filter('FHEE__EED_Ticket_Selector__load_tckt_slctr_assets', '__return_true');
        add_action('wp_enqueue_scripts', [$this, 'wp_enqueue_scripts'], 10);
        if (EE_Registry::instance()->CFG->map_settings->use_google_maps) {
            add_action('wp_enqueue_scripts', ['EEH_Maps', 'espresso_google_map_js'], 11);
        }
    }


    /**
     * @return void
     * @throws EE_Error
     */
    public function wp_enqueue_scripts()
    {
        // get some style
        if (apply_filters('FHEE_enable_default_espresso_css', false)) {
            // first check uploads folder
            if (EEH_File::is_readable(get_stylesheet_directory() . $this->theme . '/style.css')) {
                wp_register_style(
                    $this->theme,
                    get_stylesheet_directory_uri() . $this->theme . '/style.css',
                    ['dashicons', 'espresso_default']
                );
            }
            wp_enqueue_style($this->theme);
        }
    }


    /**
     * @static
     * @return void
     */
    public static function template_settings_form()
    {
        $template_settings                     = EE_Registry::instance()->CFG->template_settings;
        $template_settings->EED_Events_Archive = isset($template_settings->EED_Events_Archive)
            ? $template_settings->EED_Events_Archive : new EE_Events_Archive_Config();
        $template_settings->EED_Events_Archive = apply_filters(
            'FHEE__EED_Events_Archive__template_settings_form__event_list_config',
            $template_settings->EED_Events_Archive
        );
        $events_archive_settings               = [
            'display_status_banner'   => 0,
            'display_description'     => 1,
            'display_ticket_selector' => 0,
            'display_datetimes'       => 1,
            'display_venue'           => 0,
            'display_expired_events'  => 0,
        ];
        $events_archive_settings               = array_merge(
            $events_archive_settings,
            (array) $template_settings->EED_Events_Archive
        );
        EEH_Template::display_template(
            EVENTS_ARCHIVE_TEMPLATES_PATH . 'admin-event-list-settings.template.php',
            $events_archive_settings
        );
    }


    /**
     * @param EE_Template_Config $CFG
     * @param array              $REQ
     * @return EE_Template_Config
     */
    public static function update_template_settings(EE_Template_Config $CFG, array $REQ): EE_Template_Config
    {
        $CFG->EED_Events_Archive = new EE_Events_Archive_Config();
        // unless we are resetting the config...
        if (
            ! isset($REQ['EED_Events_Archive_reset_event_list_settings'])
            || absint($REQ['EED_Events_Archive_reset_event_list_settings']) !== 1
        ) {
            $CFG->EED_Events_Archive->display_status_banner   = isset($REQ['EED_Events_Archive_display_status_banner'])
                ? absint($REQ['EED_Events_Archive_display_status_banner'])
                : 0;
            $CFG->EED_Events_Archive->display_description     = isset($REQ['EED_Events_Archive_display_description'])
                ? absint($REQ['EED_Events_Archive_display_description'])
                : 1;
            $CFG->EED_Events_Archive->display_ticket_selector = isset($REQ['EED_Events_Archive_display_ticket_selector'])
                ? absint($REQ['EED_Events_Archive_display_ticket_selector'])
                : 0;
            $CFG->EED_Events_Archive->display_datetimes       = isset($REQ['EED_Events_Archive_display_datetimes'])
                ? absint($REQ['EED_Events_Archive_display_datetimes'])
                : 1;
            $CFG->EED_Events_Archive->display_venue           = isset($REQ['EED_Events_Archive_display_venue'])
                ? absint($REQ['EED_Events_Archive_display_venue'])
                : 0;
            $CFG->EED_Events_Archive->display_expired_events  = isset($REQ['EED_Events_Archive_display_expired_events'])
                ? absint($REQ['EED_Events_Archive_display_expired_events'])
                : 0;
        }
        return $CFG;
    }


    /**
     * @param string $extra_class
     * @return string
     */
    public static function event_list_css($extra_class = '')
    {
        $event_list_css   = ! empty($extra_class) ? [$extra_class] : [];
        $event_list_css[] = 'espresso-event-list-event';
        return implode(' ', $event_list_css);
    }


    /**
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function event_categories()
    {
        return EE_Registry::instance()->load_model('Term')->get_all_ee_categories();
    }


    /**
     * @param $value
     * @return bool
     */
    public static function display_description($value)
    {
        $config              = EE_Registry::instance()->CFG->template_settings->EED_Events_Archive;
        $display_description = isset($config->display_description) ? $config->display_description : 1;
        return $display_description === $value;
    }


    /**
     * @return bool
     */
    public static function display_ticket_selector()
    {
        $config = EE_Registry::instance()->CFG->template_settings->EED_Events_Archive;
        return isset($config->display_ticket_selector) && $config->display_ticket_selector;
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function display_venue()
    {
        $config = EE_Registry::instance()->CFG->template_settings->EED_Events_Archive;
        return isset($config->display_venue) && $config->display_venue && EEH_Venue_View::venue_name();
    }


    /**
     * @return bool
     */
    public static function display_datetimes()
    {
        $config = EE_Registry::instance()->CFG->template_settings->EED_Events_Archive;
        return isset($config->display_datetimes) && $config->display_datetimes;
    }


    /**
     * @return string
     */
    public static function event_list_title()
    {
        return apply_filters(
            'FHEE__archive_espresso_events_template__upcoming_events_h1',
            esc_html__('Upcoming Events', 'event_espresso')
        );
    }


    // GRAVEYARD


    /**
     * @since 4.4.0
     */
    public static function _doing_it_wrong_notice($function = '')
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            sprintf(
                esc_html__(
                    'EED_Events_Archive::%1$s was moved to EEH_Event_Query::%1$s:%2$sPlease update your existing code because the method it calls will be removed in version %3$s',
                    'event_espresso'
                ),
                $function,
                '<br />',
                '4.6.0'
            ),
            '4.4.0'
        );
    }


    /**
     * @deprecated
     * @since 4.4.0
     */
    public function get_post_data()
    {
        EEH_Event_Query::set_query_params();
    }


    /**
     * @throws EE_Error
     * @since 4.4.0
     * @deprecated
     */
    public function posts_fields($SQL, WP_Query $wp_query)
    {
        EED_Events_Archive::_doing_it_wrong_notice(__FUNCTION__);
        return EEH_Event_Query::posts_fields($SQL, $wp_query);
    }


    /**
     * @throws EE_Error
     * @since 4.4.0
     * @deprecated
     */
    public static function posts_fields_sql_for_orderby($orderby_params = [])
    {
        EED_Events_Archive::_doing_it_wrong_notice(__FUNCTION__);
        return EEH_Event_Query::posts_fields_sql_for_orderby($orderby_params);
    }


    /**
     * @throws EE_Error
     * @since 4.4.0
     * @deprecated
     */
    public function posts_join($SQL, WP_Query $wp_query)
    {
        EED_Events_Archive::_doing_it_wrong_notice(__FUNCTION__);
        return EEH_Event_Query::posts_join($SQL, $wp_query);
    }


    /**
     * @deprecated
     * @since 4.4.0
     */
    public static function posts_join_sql_for_terms($join_terms = null)
    {
        EED_Events_Archive::_doing_it_wrong_notice(__FUNCTION__);
        return EEH_Event_Query::posts_join_sql_for_terms($join_terms);
    }


    /**
     * @throws EE_Error
     * @since 4.4.0
     * @deprecated
     */
    public static function posts_join_for_orderby($orderby_params = [])
    {
        EED_Events_Archive::_doing_it_wrong_notice(__FUNCTION__);
        return EEH_Event_Query::posts_join_for_orderby($orderby_params);
    }


    /**
     * @throws EE_Error
     * @since 4.4.0
     * @deprecated
     */
    public function posts_where($SQL, WP_Query $wp_query)
    {
        EED_Events_Archive::_doing_it_wrong_notice(__FUNCTION__);
        return EEH_Event_Query::posts_where($SQL, $wp_query);
    }


    /**
     * @throws EE_Error
     * @since 4.4.0
     * @deprecated
     */
    public static function posts_where_sql_for_show_expired($show_expired = false)
    {
        EED_Events_Archive::_doing_it_wrong_notice(__FUNCTION__);
        return EEH_Event_Query::posts_where_sql_for_show_expired($show_expired);
    }


    /**
     * @deprecated
     * @since 4.4.0
     */
    public static function posts_where_sql_for_event_category_slug($event_category_slug = null)
    {
        EED_Events_Archive::_doing_it_wrong_notice(__FUNCTION__);
        return EEH_Event_Query::posts_where_sql_for_event_category_slug($event_category_slug);
    }


    /**
     * @throws EE_Error
     * @since 4.4.0
     * @deprecated
     */
    public static function posts_where_sql_for_event_list_month($month = null)
    {
        EED_Events_Archive::_doing_it_wrong_notice(__FUNCTION__);
        return EEH_Event_Query::posts_where_sql_for_event_list_month($month);
    }


    /**
     * @throws EE_Error
     * @since 4.4.0
     * @deprecated
     */
    public function posts_orderby($SQL, WP_Query $wp_query)
    {
        EED_Events_Archive::_doing_it_wrong_notice(__FUNCTION__);
        return EEH_Event_Query::posts_orderby($SQL, $wp_query);
    }


    /**
     * @throws EE_Error
     * @since 4.4.0
     * @deprecated
     */
    public static function posts_orderby_sql($orderby_params = [], $sort = 'ASC')
    {
        EED_Events_Archive::_doing_it_wrong_notice(__FUNCTION__);
        return EEH_Event_Query::posts_orderby_sql($orderby_params, $sort);
    }
}


/**
 * @return int
 */
function espresso_get_event_list_ID()
{
    EED_Events_Archive::$espresso_event_list_ID++;
    EED_Events_Archive::$espresso_grid_event_lists[] = EED_Events_Archive::$espresso_event_list_ID;
    return EED_Events_Archive::$espresso_event_list_ID;
}


/**
 * @return string
 */
function espresso_event_list_title()
{
    return EED_Events_Archive::event_list_title();
}


/**
 * @param string $extra_class
 * @return string
 */
function espresso_event_list_css($extra_class = '')
{
    return EED_Events_Archive::event_list_css($extra_class);
}


/**
 * @return array
 * @throws EE_Error
 * @throws ReflectionException
 */
function espresso_get_event_categories()
{
    return EED_Events_Archive::event_categories();
}


/**
 * @return bool
 */
function espresso_display_full_description_in_event_list()
{
    return EED_Events_Archive::display_description(2);
}


/**
 * @return bool
 */
function espresso_display_excerpt_in_event_list()
{
    return EED_Events_Archive::display_description(1);
}


/**
 * @return bool
 */
function espresso_display_ticket_selector_in_event_list()
{
    return EED_Events_Archive::display_ticket_selector();
}


/**
 * @return bool
 * @throws EE_Error
 * @throws ReflectionException
 */
function espresso_display_venue_in_event_list()
{
    return EED_Events_Archive::display_venue();
}


/**
 * @return bool
 */
function espresso_display_datetimes_in_event_list()
{
    return EED_Events_Archive::display_datetimes();
}

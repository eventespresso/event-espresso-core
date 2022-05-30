<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Event Details
 *
 * @package        Event Espresso
 * @subpackage     /modules/event_details/
 * @author         Brent Christensen
 */
class EED_Event_Single extends EED_Module
{
    const EVENT_DETAILS_PRIORITY = 100;
    const EVENT_DATETIMES_PRIORITY = 110;
    const EVENT_TICKETS_PRIORITY = 120;
    const EVENT_VENUES_PRIORITY = 130;

    /**
     * @type bool $using_get_the_excerpt
     */
    protected static $using_get_the_excerpt = false;


    /**
     * @type EE_Template_Part_Manager $template_parts
     */
    protected $template_parts;


    /**
     * @return EED_Module|EED_Event_Single
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }


    /**
     * set_hooks - for hooking into EE Core, other modules, etc
     *
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function set_hooks()
    {
        add_filter('FHEE_run_EE_wp', '__return_true');
        add_action('wp_loaded', array('EED_Event_Single', 'set_definitions'), 2);
        /** @var EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions $custom_post_type_definitions */
        $custom_post_type_definitions = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions'
        );
        $custom_post_types = $custom_post_type_definitions->getDefinitions();
        EE_Config::register_route(
            $custom_post_types['espresso_events']['singular_slug'],
            'Event_Single',
            'run'
        );
    }

    /**
     * set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @return    void
     */
    public static function set_hooks_admin()
    {
        add_action('wp_loaded', array('EED_Event_Single', 'set_definitions'), 2);
    }


    /**
     * set_definitions
     *
     * @static
     * @return void
     */
    public static function set_definitions()
    {
        define('EVENT_SINGLE_ASSETS_URL', plugin_dir_url(__FILE__) . 'assets/');
        define('EVENT_SINGLE_TEMPLATES_PATH', plugin_dir_path(__FILE__) . 'templates/');
    }


    /**
     * set_config
     *
     * @void
     */
    protected function set_config()
    {
        $this->set_config_section('template_settings');
        $this->set_config_class('EE_Event_Single_Config');
        $this->set_config_name('EED_Event_Single');
    }


    /**
     * initialize_template_parts
     *
     * @param EE_Config_Base|EE_Event_Single_Config $config
     * @return EE_Template_Part_Manager
     */
    public function initialize_template_parts(EE_Event_Single_Config $config = null)
    {
        /** @type EE_Event_Single_Config $config */
        $config = $config instanceof EE_Event_Single_Config ? $config : $this->config();
        EEH_Autoloader::instance()->register_template_part_autoloaders();
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
        do_action('AHEE__EED_Event_Single__initialize_template_parts', $template_parts);
        return $template_parts;
    }


    /**
     * run - initial module setup
     *
     * @param WP $WP
     * @return    void
     */
    public function run($WP)
    {
        // ensure valid EE_Events_Single_Config() object exists
        $this->set_config();
        // check what template is loaded
        add_filter('template_include', array($this, 'template_include'), 999, 1);
        add_filter('FHEE__EED_Ticket_Selector__load_tckt_slctr_assets', '__return_true');
        // load css
        add_action('wp_enqueue_scripts', array($this, 'wp_enqueue_scripts'), 10);
    }


    /**
     * template_include
     *
     * @param    string $template
     * @return    string
     */
    public function template_include($template)
    {
        global $post;
        /** @type EE_Event_Single_Config $config */
        $config = $this->config();
        if ($config->display_status_banner_single) {
            add_filter('the_title', array('EED_Event_Single', 'the_title'), 100, 2);
        }
        // not a custom template?
        if (
            ! post_password_required($post)
            && (
                apply_filters('FHEE__EED_Event_Single__template_include__allow_custom_selected_template', false)
                || EE_Registry::instance()
                              ->load_core('Front_Controller')
                              ->get_selected_template() !== 'single-espresso_events.php'
            )
        ) {
            EEH_Template::load_espresso_theme_functions();
            // then add extra event data via hooks
            add_action('loop_start', array('EED_Event_Single', 'loop_start'));
            add_filter('get_the_excerpt', array('EED_Event_Single', 'get_the_excerpt'), 1, 1);
            add_filter(
                'the_content',
                array('EED_Event_Single', 'event_details'),
                EED_Event_Single::EVENT_DETAILS_PRIORITY
            );
            add_action('loop_end', array('EED_Event_Single', 'loop_end'));
            // don't display entry meta because the existing theme will take car of that
            add_filter('FHEE__content_espresso_events_details_template__display_entry_meta', '__return_false');
        }
        return $template;
    }


    /**
     * loop_start
     *
     * @param    array $wp_query_array an array containing the WP_Query object
     * @return    void
     */
    public static function loop_start($wp_query_array)
    {
        global $post;
        do_action('AHEE_event_details_before_post', $post, $wp_query_array);
    }


    /**
     * the_title
     *
     * @param    string $title
     * @param    int    $id
     * @return    string
     */
    public static function the_title($title = '', $id = 0)
    {
        global $post;
        return ((function_exists('wp_is_block_theme') && wp_is_block_theme()) || in_the_loop()) && $post->ID === (int) $id
            ? espresso_event_status_banner($post->ID) . $title
            : $title;
    }


    /**
     * get_the_excerpt
     * kinda hacky, but if a theme is using get_the_excerpt(),
     * then we need to remove our filters on the_content()
     *
     * @param        string $excerpt
     * @return        string
     */
    public static function get_the_excerpt($excerpt = '')
    {
        EED_Event_Single::$using_get_the_excerpt = true;
        add_filter('wp_trim_excerpt', array('EED_Event_Single', 'end_get_the_excerpt'), 999, 1);
        return $excerpt;
    }


    /**
     * end_get_the_excerpt
     *
     * @param  string $text
     * @return string
     */
    public static function end_get_the_excerpt($text = '')
    {
        EED_Event_Single::$using_get_the_excerpt = false;
        return $text;
    }


    /**
     * event_details
     *
     * @param    string $content
     * @return    string
     */
    public static function event_details($content)
    {
        global $post;
        static $current_post_ID = 0;
        if (
            $current_post_ID !== $post->ID
            && $post->post_type === 'espresso_events'
            && ! EED_Event_Single::$using_get_the_excerpt
            && ! post_password_required()
        ) {
            // Set current post ID to prevent showing content twice, but only if headers have definitely been sent.
            // Reason being is that some plugins, like Yoast, need to run through a copy of the loop early
            // BEFORE headers are sent in order to examine the post content and generate content for the HTML header.
            // We want to allow those plugins to still do their thing and have access to our content, but depending on
            // how your event content is being displayed (shortcode, CPT route, etc), this filter can get applied twice,
            // so the following allows this filter to be applied multiple times, but only once for real
            $current_post_ID = did_action('loop_start') ? $post->ID : 0;
            if (EE_Registry::instance()->CFG->template_settings->EED_Event_Single->use_sortable_display_order) {
                // we need to first remove this callback from being applied to the_content()
                // (otherwise it will recurse and blow up the interweb)
                remove_filter(
                    'the_content',
                    array('EED_Event_Single', 'event_details'),
                    EED_Event_Single::EVENT_DETAILS_PRIORITY
                );
                EED_Event_Single::instance()->template_parts = EED_Event_Single::instance()->initialize_template_parts(
                );
                $content = EEH_Template::locate_template('content-espresso_events-details.php');
                $content = EED_Event_Single::instance()->template_parts->apply_template_part_filters($content);
                add_filter(
                    'the_content',
                    array('EED_Event_Single', 'event_details'),
                    EED_Event_Single::EVENT_DETAILS_PRIORITY
                );
            } else {
                $content = EED_Event_Single::use_filterable_display_order();
            }
        }
        return $content;
    }


    /**
     * use_filterable_display_order
     *
     * @return string
     */
    protected static function use_filterable_display_order()
    {
        // since the 'content-espresso_events-details.php' template might be used directly from within a theme,
        // it uses the_content() for displaying the $post->post_content
        // so in order to load a template that uses the_content()
        // from within a callback being used to filter the_content(),
        // we need to first remove this callback from being applied to the_content()
        // (otherwise it will recurse and blow up the interweb)
        remove_filter(
            'the_content',
            array('EED_Event_Single', 'event_details'),
            EED_Event_Single::EVENT_DETAILS_PRIORITY
        );
        // now add additional content
        add_filter(
            'the_content',
            array('EED_Event_Single', 'event_datetimes'),
            EED_Event_Single::EVENT_DATETIMES_PRIORITY,
            1
        );
        add_filter(
            'the_content',
            array('EED_Event_Single', 'event_tickets'),
            EED_Event_Single::EVENT_TICKETS_PRIORITY,
            1
        );
        add_filter(
            'the_content',
            array('EED_Event_Single', 'event_venues'),
            EED_Event_Single::EVENT_VENUES_PRIORITY,
            1
        );
        do_action('AHEE__EED_Event_Single__use_filterable_display_order__after_add_filters');
        // now load our template
        $content = EEH_Template::locate_template('content-espresso_events-details.php');
        // now add our filter back in, plus some others
        add_filter(
            'the_content',
            array('EED_Event_Single', 'event_details'),
            EED_Event_Single::EVENT_DETAILS_PRIORITY
        );
        remove_filter(
            'the_content',
            array('EED_Event_Single', 'event_datetimes'),
            EED_Event_Single::EVENT_DATETIMES_PRIORITY
        );
        remove_filter(
            'the_content',
            array('EED_Event_Single', 'event_tickets'),
            EED_Event_Single::EVENT_TICKETS_PRIORITY
        );
        remove_filter(
            'the_content',
            array('EED_Event_Single', 'event_venues'),
            EED_Event_Single::EVENT_VENUES_PRIORITY
        );
        do_action('AHEE__EED_Event_Single__use_filterable_display_order__after_remove_filters');
        // we're not returning the $content directly because the template we are loading uses the_content (or the_excerpt)
        return $content;
    }


    /**
     * event_datetimes - adds datetimes ABOVE content
     *
     * @param        string $content
     * @return        string
     */
    public static function event_datetimes($content)
    {
        return EEH_Template::locate_template('content-espresso_events-datetimes.php') . $content;
    }


    /**
     * event_tickets - adds tickets ABOVE content (which includes datetimes)
     *
     * @param        string $content
     * @return        string
     */
    public static function event_tickets($content)
    {
        return EEH_Template::locate_template('content-espresso_events-tickets.php') . $content;
    }


    /**
     * event_venues
     *
     * @param    string $content
     * @return    string
     */
    public static function event_venue($content)
    {
        return EED_Event_Single::event_venues($content);
    }


    /**
     * event_venues - adds venues BELOW content
     *
     * @param        string $content
     * @return        string
     */
    public static function event_venues($content)
    {
        return $content . EEH_Template::locate_template('content-espresso_events-venues.php');
    }


    /**
     * loop_end
     *
     * @param        array $wp_query_array an array containing the WP_Query object
     * @return        void
     */
    public static function loop_end($wp_query_array)
    {
        global $post;
        do_action('AHEE_event_details_after_post', $post, $wp_query_array);
    }


    /**
     * wp_enqueue_scripts
     *
     * @return    void
     */
    public function wp_enqueue_scripts()
    {
        // get some style
        if (
            apply_filters('FHEE_enable_default_espresso_css', true)
            && apply_filters('FHEE__EED_Event_Single__wp_enqueue_scripts__enable_css', true)
        ) {
            // first check uploads folder
            if (is_readable(get_stylesheet_directory() . $this->theme . '/style.css')) {
                wp_register_style(
                    $this->theme,
                    get_stylesheet_directory_uri() . $this->theme . '/style.css',
                    array('dashicons', 'espresso_default')
                );
            } else {
                wp_register_style(
                    $this->theme,
                    EE_TEMPLATES_URL . $this->theme . '/style.css',
                    array('dashicons', 'espresso_default')
                );
            }
            wp_enqueue_script($this->theme);
            if (EE_Registry::instance()->CFG->map_settings->use_google_maps) {
                add_action('wp_enqueue_scripts', array('EEH_Maps', 'espresso_google_map_js'), 11);
            }
        }
    }


    /**
     * display_venue
     *
     * @return    bool
     */
    public static function display_venue()
    {
        /** @type EE_Event_Single_Config $config */
        $config = EED_Event_Single::instance()->config();
        $display_venue = $config->display_venue === null ? true : $config->display_venue;
        $venue_name = EEH_Venue_View::venue_name();
        return $display_venue && ! empty($venue_name);
    }
}


/**
 * espresso_display_venue_in_event_details
 *
 * @see EED_Event_Single::display_venue()
 * @return bool
 */
function espresso_display_venue_in_event_details()
{
    return EED_Event_Single::display_venue();
}

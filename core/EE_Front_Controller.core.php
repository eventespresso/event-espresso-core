<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 * Event Espresso
 * Event Registration and Management Plugin for WordPress
 * @ package            Event Espresso
 * @ author            Seth Shoultes
 * @ copyright        (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license            http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link                    http://www.eventespresso.com
 * @ version            4.0
 * ------------------------------------------------------------------------
 * EE_Front_Controller
 *
 * @package               Event Espresso
 * @subpackage            core/
 * @author                Brent Christensen
 *                        ------------------------------------------------------------------------
 */
final class EE_Front_Controller
{

    /**
     *    $_template_path
     * @var    string $_template_path
     * @access    public
     */
    private $_template_path;

    /**
     *    $_template
     * @var    string $_template
     * @access    public
     */
    private $_template;

    /**
     * @type  EE_Registry $Registry
     * @access    protected
     */
    protected $Registry;

    /**
     * @type  EE_Request_Handler $Request_Handler
     * @access    protected
     */
    protected $Request_Handler;

    /**
     * @type  EE_Module_Request_Router $Module_Request_Router
     * @access    protected
     */
    protected $Module_Request_Router;


    /**
     *    class constructor
     *    should fire after shortcode, module, addon, or other plugin's default priority init phases have run
     *
     * @access    public
     * @param \EE_Registry              $Registry
     * @param \EE_Request_Handler       $Request_Handler
     * @param \EE_Module_Request_Router $Module_Request_Router
     */
    public function __construct(
        EE_Registry $Registry,
        EE_Request_Handler $Request_Handler,
        EE_Module_Request_Router $Module_Request_Router
    ) {
        $this->Registry              = $Registry;
        $this->Request_Handler       = $Request_Handler;
        $this->Module_Request_Router = $Module_Request_Router;
        // make sure template tags are loaded immediately so that themes don't break
        add_action('AHEE__EE_System__core_loaded_and_ready', array($this, 'load_espresso_template_tags'), 10);
        // determine how to integrate WP_Query with the EE models
        add_action('AHEE__EE_System__initialize', array($this, 'employ_CPT_Strategy'));
        // load other resources and begin to actually run shortcodes and modules
        add_action('wp_loaded', array($this, 'wp_loaded'), 5);
        // analyse the incoming WP request
        add_action('parse_request', array($this, 'get_request'), 1, 1);
        // process request with module factory
        add_action('pre_get_posts', array($this, 'pre_get_posts'), 10, 1);
        // before headers sent
        add_action('wp', array($this, 'wp'), 5);
        // after headers sent but before any markup is output,
        // primarily used to process any content shortcodes
        add_action('get_header', array($this, 'get_header'));
        // load css and js
        add_action('wp_enqueue_scripts', array($this, 'wp_enqueue_scripts'), 1);
        // header
        add_action('wp_head', array($this, 'header_meta_tag'), 5);
        add_filter('template_include', array($this, 'template_include'), 1);
        // display errors
        add_action('loop_start', array($this, 'display_errors'), 2);
        // the content
        // add_filter( 'the_content', array( $this, 'the_content' ), 5, 1 );
        // add_filter('widget_text', array($this, 'widget_text'));
        // add_filter('dynamic_sidebar_params', array($this, 'dynamic_sidebar_params'));
        //exclude our private cpt comments
        add_filter('comments_clauses', array($this, 'filter_wp_comments'), 10, 1);
        //make sure any ajax requests will respect the url schema when requests are made against admin-ajax.php (http:// or https://)
        add_filter('admin_url', array($this, 'maybe_force_admin_ajax_ssl'), 200, 1);
        // action hook EE
        do_action('AHEE__EE_Front_Controller__construct__done', $this);
        // for checking that browser cookies are enabled
        if (apply_filters('FHEE__EE_Front_Controller____construct__set_test_cookie', true)) {
            setcookie('ee_cookie_test', uniqid(), time() + DAY_IN_SECONDS, '/');
        }
    }


    /**
     * @return EE_Request_Handler
     */
    public function Request_Handler()
    {
        return $this->Request_Handler;
    }


    /**
     * @return EE_Module_Request_Router
     */
    public function Module_Request_Router()
    {
        return $this->Module_Request_Router;
    }





    /***********************************************        INIT ACTION HOOK         ***********************************************/


    /**
     *    load_espresso_template_tags - if current theme is an espresso theme, or uses ee theme template parts, then
     *    load it's functions.php file ( if not already loaded )
     *
     * @return void
     */
    public function load_espresso_template_tags()
    {
        if (is_readable(EE_PUBLIC . 'template_tags.php')) {
            require_once(EE_PUBLIC . 'template_tags.php');
        }
    }


    /**
     * filter_wp_comments
     * This simply makes sure that any "private" EE CPTs do not have their comments show up in any wp comment
     * widgets/queries done on frontend
     *
     * @param  array $clauses array of comment clauses setup by WP_Comment_Query
     * @return array array of comment clauses with modifications.
     */
    public function filter_wp_comments($clauses)
    {
        global $wpdb;
        if (strpos($clauses['join'], $wpdb->posts) !== false) {
            $cpts = EE_Register_CPTs::get_private_CPTs();
            foreach ($cpts as $cpt => $details) {
                $clauses['where'] .= $wpdb->prepare(" AND $wpdb->posts.post_type != %s", $cpt);
            }
        }
        return $clauses;
    }


    /**
     *    employ_CPT_Strategy
     *
     * @access    public
     * @return    void
     */
    public function employ_CPT_Strategy()
    {
        if (apply_filters('FHEE__EE_Front_Controller__employ_CPT_Strategy', true)) {
            $this->Registry->load_core('CPT_Strategy');
        }
    }


    /**
     * this just makes sure that if the site is using ssl that we force that for any admin ajax calls from frontend
     *
     * @param  string $url incoming url
     * @return string         final assembled url
     */
    public function maybe_force_admin_ajax_ssl($url)
    {
        if (is_ssl() && preg_match('/admin-ajax.php/', $url)) {
            $url = str_replace('http://', 'https://', $url);
        }
        return $url;
    }






    /***********************************************        WP_LOADED ACTION HOOK         ***********************************************/


    /**
     *    wp_loaded - should fire after shortcode, module, addon, or other plugin's have been registered and their
     *    default priority init phases have run
     *
     * @access    public
     * @return    void
     */
    public function wp_loaded()
    {
    }





    /***********************************************        PARSE_REQUEST HOOK         ***********************************************/
    /**
     *    _get_request
     *
     * @access public
     * @param WP $WP
     * @return void
     */
    public function get_request(WP $WP)
    {
        do_action('AHEE__EE_Front_Controller__get_request__start');
        $this->Request_Handler->parse_request($WP);
        do_action('AHEE__EE_Front_Controller__get_request__complete');
    }



    /**
     *    pre_get_posts - basically a module factory for instantiating modules and selecting the final view template
     *
     * @access    public
     * @param   WP_Query $WP_Query
     * @return    void
     */
    public function pre_get_posts($WP_Query)
    {
        // only load Module_Request_Router if this is the main query
        if (
            $this->Module_Request_Router instanceof EE_Module_Request_Router
            && $WP_Query->is_main_query()
        ) {
            // cycle thru module routes
            while ($route = $this->Module_Request_Router->get_route($WP_Query)) {
                // determine module and method for route
                $module = $this->Module_Request_Router->resolve_route($route[0], $route[1]);
                if ($module instanceof EED_Module) {
                    // get registered view for route
                    $this->_template_path = $this->Module_Request_Router->get_view($route);
                    // grab module name
                    $module_name = $module->module_name();
                    // map the module to the module objects
                    $this->Registry->modules->{$module_name} = $module;
                }
            }
        }
    }





    /***********************************************        WP HOOK         ***********************************************/


    /**
     *    wp - basically last chance to do stuff before headers sent
     *
     * @access    public
     * @return    void
     */
    public function wp()
    {
    }



    /***********************     GET_HEADER, WP_ENQUEUE_SCRIPTS && WP_HEAD HOOK     ***********************/



    public function get_header()
    {
        global $wp, $wp_query;
        if (empty($wp_query->posts)){
            return;
        }
        // \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        $load_assets = $this->Request_Handler->is_espresso_page();
        $posts = is_array($wp_query->posts) ? $wp_query->posts : array($wp_query->posts);
        // \EEH_Debug_Tools::printr($wp_query->posts, '$wp_query->posts', __FILE__, __LINE__);
        foreach ($posts as $post) {
            foreach ($this->Registry->shortcodes as $shortcode_class => $shortcode) {
                if (
                    has_shortcode($post->post_content, $shortcode_class)
                    || has_shortcode($post->post_excerpt, $shortcode_class)
                ) {
                    // \EEH_Debug_Tools::printr($shortcode_class, '$shortcode_class', __FILE__, __LINE__);
                    $this->initialize_shortcode($shortcode_class, $wp);
                    $load_assets = true;
                }
            }
        }
        if (!$load_assets) {
            $espresso_widgets = array();
            foreach ($this->Registry->widgets as $widget_class => $widget) {
                $id_base = \EventEspresso\widgets\EspressoWidget::getIdBase($widget_class);
                // \EEH_Debug_Tools::printr($id_base, '$id_base', __FILE__, __LINE__, 6);
                if ($is_active_widget = is_active_widget(false, false, $id_base)) {
                    // \EEH_Debug_Tools::printr($is_active_widget, '$is_active_widget', __FILE__, __LINE__);
                    $espresso_widgets[] = $id_base;
                }
            }
            // \EEH_Debug_Tools::printr($post, '$post', __FILE__, __LINE__);
            $all_sidebar_widgets = wp_get_sidebars_widgets();
            // \EEH_Debug_Tools::printr($all_sidebar_widgets, '$all_sidebar_widgets', __FILE__, __LINE__);
            foreach ($all_sidebar_widgets as $sidebar_name => $sidebar_widgets) {
                // \EEH_Debug_Tools::printr($sidebar_name, '$sidebar_name', __FILE__, __LINE__);
                if (is_array($sidebar_widgets) && ! empty($sidebar_widgets)) {
                    foreach ($sidebar_widgets as $sidebar_widget) {
                        foreach ($espresso_widgets as $espresso_widget) {
                            if (strpos($sidebar_widget, $espresso_widget) !== false) {
                                // \EEH_Debug_Tools::printr($sidebar_widget, '$sidebar_widget', __FILE__, __LINE__, 6);
                                $load_assets = true;
                            }
                        }
                    }
                }
            }
        }
        if ( $load_assets){
            add_filter('FHEE_load_css', '__return_true');
            add_filter('FHEE_load_js', '__return_true');
        }
    }



    /**
     * @param string $shortcode_class
     * @param \WP    $WP
     */
    public function initialize_shortcode($shortcode_class = '', WP $WP)
    {
        // let's pause to reflect on this...
        $sc_reflector = new ReflectionClass('EES_' . $shortcode_class);
        // ensure that class is actually a shortcode
        if (
            defined('WP_DEBUG')
            && WP_DEBUG === true
            && ! $sc_reflector->isSubclassOf('EES_Shortcode')
        ) {
            EE_Error::add_error(
                sprintf(
                    __(
                        'The requested %s shortcode is not of the class "EES_Shortcode". Please check your files.',
                        'event_espresso'
                    ),
                    $shortcode_class
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            add_filter('FHEE_run_EE_the_content', '__return_true');
            return;
        }
        // and pass the request object to the run method
        $this->Registry->shortcodes->{$shortcode_class} = $sc_reflector->newInstance();
        // fire the shortcode class's run method, so that it can activate resources
        $this->Registry->shortcodes->{$shortcode_class}->run($WP);
    }



    /**
     *    wp_enqueue_scripts
     *
     * @access    public
     * @return    void
     */
    public function wp_enqueue_scripts()
    {

        // css is turned ON by default, but prior to the wp_enqueue_scripts hook, can be turned OFF  via:  add_filter( 'FHEE_load_css', '__return_false' );
        if (apply_filters('FHEE_load_css', false)) {

            $this->Registry->CFG->template_settings->enable_default_style = true;
            //Load the ThemeRoller styles if enabled
            if (isset($this->Registry->CFG->template_settings->enable_default_style) && $this->Registry->CFG->template_settings->enable_default_style) {

                //Load custom style sheet if available
                if (isset($this->Registry->CFG->template_settings->custom_style_sheet)) {
                    wp_register_style('espresso_custom_css',
                        EVENT_ESPRESSO_UPLOAD_URL . 'css/' . $this->Registry->CFG->template_settings->custom_style_sheet,
                        EVENT_ESPRESSO_VERSION);
                    wp_enqueue_style('espresso_custom_css');
                }

                if (is_readable(EVENT_ESPRESSO_UPLOAD_DIR . 'css/style.css')) {
                    wp_register_style('espresso_default', EVENT_ESPRESSO_UPLOAD_DIR . 'css/espresso_default.css',
                        array('dashicons'), EVENT_ESPRESSO_VERSION);
                } else {
                    wp_register_style('espresso_default', EE_GLOBAL_ASSETS_URL . 'css/espresso_default.css',
                        array('dashicons'), EVENT_ESPRESSO_VERSION);
                }
                wp_enqueue_style('espresso_default');

                if (is_readable(get_stylesheet_directory() . EE_Config::get_current_theme() . DS . 'style.css')) {
                    wp_register_style('espresso_style',
                        get_stylesheet_directory_uri() . EE_Config::get_current_theme() . DS . 'style.css',
                        array('dashicons', 'espresso_default'));
                } else {
                    wp_register_style('espresso_style',
                        EE_TEMPLATES_URL . EE_Config::get_current_theme() . DS . 'style.css',
                        array('dashicons', 'espresso_default'));
                }

            }

        }

        // js is turned ON by default, but prior to the wp_enqueue_scripts hook, can be turned OFF  via:  add_filter( 'FHEE_load_js', '__return_false' );
        if (apply_filters('FHEE_load_js', false)) {

            wp_enqueue_script('jquery');
            //let's make sure that all required scripts have been setup
            if (function_exists('wp_script_is') && ! wp_script_is('jquery')) {
                $msg = sprintf(
                    __('%sJquery is not loaded!%sEvent Espresso is unable to load Jquery due to a conflict with your theme or another plugin.',
                        'event_espresso'),
                    '<em><br />',
                    '</em>'
                );
                EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            }
            // load core js
            wp_register_script('espresso_core', EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js', array('jquery'),
                EVENT_ESPRESSO_VERSION, true);
            wp_enqueue_script('espresso_core');
            wp_localize_script('espresso_core', 'eei18n', EE_Registry::$i18n_js_strings);

        }

        //qtip is turned OFF by default, but prior to the wp_enqueue_scripts hook, can be turned back on again via: add_filter('FHEE_load_qtip', '__return_true' );
        if (apply_filters('FHEE_load_qtip', false)) {
            EEH_Qtip_Loader::instance()->register_and_enqueue();
        }


        //accounting.js library
        // @link http://josscrowcroft.github.io/accounting.js/
        if (apply_filters('FHEE_load_accounting_js', false)) {
            $acct_js = EE_THIRD_PARTY_URL . 'accounting/accounting.js';
            wp_register_script('ee-accounting', EE_GLOBAL_ASSETS_URL . 'scripts/ee-accounting-config.js',
                array('ee-accounting-core'), EVENT_ESPRESSO_VERSION, true);
            wp_register_script('ee-accounting-core', $acct_js, array('underscore'), '0.3.2', true);
            wp_enqueue_script('ee-accounting');

            $currency_config = array(
                'currency' => array(
                    'symbol'    => $this->Registry->CFG->currency->sign,
                    'format'    => array(
                        'pos'  => $this->Registry->CFG->currency->sign_b4 ? '%s%v' : '%v%s',
                        'neg'  => $this->Registry->CFG->currency->sign_b4 ? '- %s%v' : '- %v%s',
                        'zero' => $this->Registry->CFG->currency->sign_b4 ? '%s--' : '--%s',
                    ),
                    'decimal'   => $this->Registry->CFG->currency->dec_mrk,
                    'thousand'  => $this->Registry->CFG->currency->thsnds,
                    'precision' => $this->Registry->CFG->currency->dec_plc,
                ),
                'number'   => array(
                    'precision' => 0,
                    'thousand'  => $this->Registry->CFG->currency->thsnds,
                    'decimal'   => $this->Registry->CFG->currency->dec_mrk,
                ),
            );
            wp_localize_script('ee-accounting', 'EE_ACCOUNTING_CFG', $currency_config);
        }

        if ( ! function_exists('wp_head')) {
            $msg = sprintf(
                __('%sMissing wp_head() function.%sThe WordPress function wp_head() seems to be missing in your theme. Please contact the theme developer to make sure this is fixed before using Event Espresso.',
                    'event_espresso'),
                '<em><br />',
                '</em>'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        }
        if ( ! function_exists('wp_footer')) {
            $msg = sprintf(
                __('%sMissing wp_footer() function.%sThe WordPress function wp_footer() seems to be missing in your theme. Please contact the theme developer to make sure this is fixed before using Event Espresso.',
                    'event_espresso'),
                '<em><br />',
                '</em>'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        }

    }


    /**
     *    header_meta_tag
     *
     * @access    public
     * @return    void
     */
    public function header_meta_tag()
    {
        print(
            apply_filters(
                'FHEE__EE_Front_Controller__header_meta_tag',
                '<meta name="generator" content="Event Espresso Version ' . EVENT_ESPRESSO_VERSION . "\" />\n")
        );

        //let's exclude all event type taxonomy term archive pages from search engine indexing
        //@see https://events.codebasehq.com/projects/event-espresso/tickets/10249
        if (
            is_tax('espresso_event_type')
            && get_option( 'blog_public' ) !== '0'
        ) {
            print(
                apply_filters(
                    'FHEE__EE_Front_Controller__header_meta_tag__noindex_for_event_type',
                    '<meta name="robots" content="noindex,follow" />' . "\n"
                )
            );
        }
    }




    /***********************************************        THE_CONTENT FILTER HOOK         **********************************************



    // /**
    //  *    the_content
    //  *
    //  * @access    public
    //  * @param   $the_content
    //  * @return    string
    //  */
    // public function the_content( $the_content ) {
    // 	// nothing gets loaded at this point unless other systems turn this hookpoint on by using:  add_filter( 'FHEE_run_EE_the_content', '__return_true' );
    // 	if ( apply_filters( 'FHEE_run_EE_the_content', FALSE ) ) {
    // 	}
    // 	return $the_content;
    // }



    // /**
    //  * @param string $widget_text
    //  */
    // public function widget_text($widget_text = '')
    // {
    //     \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
    //     \EEH_Debug_Tools::printr($widget_text, '$widget_text', __FILE__, __LINE__);
    //
    // }



    /**
     * @param string $content
     * @return string
     */
    public function dynamic_sidebar_params($content)
    {
        // \EEH_Debug_Tools::printr($content, '$content', __FILE__, __LINE__);
        return $content;
    }


    /***********************************************        WP_FOOTER         ***********************************************/


    /**
     *    display_errors
     *
     * @access    public
     * @return    string
     */
    public function display_errors()
    {
        static $shown_already = false;
        do_action('AHEE__EE_Front_Controller__display_errors__begin');
        if (
            ! $shown_already
            && apply_filters('FHEE__EE_Front_Controller__display_errors', true)
            && is_main_query()
            && ! is_feed()
            && in_the_loop()
            && $this->Request_Handler->is_espresso_page()
        ) {
            echo EE_Error::get_notices();
            $shown_already = true;
            EEH_Template::display_template(EE_TEMPLATES . 'espresso-ajax-notices.template.php');
        }
        do_action('AHEE__EE_Front_Controller__display_errors__end');
    }





    /***********************************************        UTILITIES         ***********************************************/
    /**
     *    template_include
     *
     * @access    public
     * @param   string $template_include_path
     * @return    string
     */
    public function template_include($template_include_path = null)
    {
        if ($this->Request_Handler->is_espresso_page()) {
            $this->_template_path = ! empty($this->_template_path) ? basename($this->_template_path) : basename($template_include_path);
            $template_path        = EEH_Template::locate_template($this->_template_path, array(), false);
            $this->_template_path = ! empty($template_path) ? $template_path : $template_include_path;
            $this->_template      = basename($this->_template_path);
            return $this->_template_path;
        }
        return $template_include_path;
    }


    /**
     *    get_selected_template
     *
     * @access    public
     * @param bool $with_path
     * @return    string
     */
    public function get_selected_template($with_path = false)
    {
        return $with_path ? $this->_template_path : $this->_template;
    }


}
// End of file EE_Front_Controller.core.php
// Location: /core/EE_Front_Controller.core.php

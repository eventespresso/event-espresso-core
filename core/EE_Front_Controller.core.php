<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\CurrentPage;
use EventEspresso\core\services\request\sanitizers\AllowedTags;
use EventEspresso\core\services\shortcodes\LegacyShortcodesManager;
use EventEspresso\widgets\EspressoWidget;

/**
 * EE_Front_Controller
 *
 * @package     Event Espresso
 * @subpackage  core/
 * @author      Brent Christensen
 */
final class EE_Front_Controller
{
    /**
     * @var string
     */
    private $_template_path;

    /**
     * @var string
     */
    private $_template;

    /**
     * @type EE_Registry
     */
    protected $Registry;

    /**
     * @type EE_Request_Handler
     */
    protected $Request_Handler;

    /**
     * @type EE_Module_Request_Router
     */
    protected $Module_Request_Router;

    /**
     * @type CurrentPage
     */
    protected $current_page;


    /**
     *    class constructor
     *    should fire after shortcode, module, addon, or other plugin's default priority init phases have run
     *
     * @access    public
     * @param EE_Registry              $Registry
     * @param CurrentPage              $EspressoPage
     * @param EE_Module_Request_Router $Module_Request_Router
     */
    public function __construct(
        EE_Registry $Registry,
        CurrentPage $EspressoPage,
        EE_Module_Request_Router $Module_Request_Router
    ) {
        $this->Registry              = $Registry;
        $this->current_page          = $EspressoPage;
        $this->Module_Request_Router = $Module_Request_Router;
        // load other resources and begin to actually run shortcodes and modules
        // analyse the incoming WP request
        add_action('parse_request', array($this, 'get_request'), 1, 1);
        // process request with module factory
        add_action('pre_get_posts', array($this, 'pre_get_posts'), 10, 1);
        // before headers sent
        add_action('wp', array($this, 'wp'), 5);
        // primarily used to process any content shortcodes
        add_action('template_redirect', array($this, 'templateRedirect'), 999);
        // header
        add_action('wp_head', array($this, 'header_meta_tag'), 5);
        add_action('wp_print_scripts', array($this, 'wp_print_scripts'), 10);
        add_filter('template_include', array($this, 'template_include'), 1);
        // display errors
        add_action('loop_start', array($this, 'display_errors'), 2);
        // the content
        // add_filter( 'the_content', array( $this, 'the_content' ), 5, 1 );
        // exclude our private cpt comments
        add_filter('comments_clauses', array($this, 'filter_wp_comments'), 10, 1);
        // make sure any ajax requests will respect the url schema when requests are made against admin-ajax.php (http:// or https://)
        add_filter('admin_url', array($this, 'maybe_force_admin_ajax_ssl'), 200, 1);
        // action hook EE
        do_action('AHEE__EE_Front_Controller__construct__done', $this);
    }


    /**
     * @return EE_Request_Handler
     * @deprecated 4.10.14.p
     */
    public function Request_Handler()
    {
        if (! $this->Request_Handler instanceof EE_Request_Handler) {
            $this->Request_Handler = LoaderFactory::getLoader()->getShared('EE_Request_Handler');
        }
        return $this->Request_Handler;
    }


    /**
     * @return EE_Module_Request_Router
     */
    public function Module_Request_Router()
    {
        return $this->Module_Request_Router;
    }


    /**
     * @return LegacyShortcodesManager
     * @deprecated 4.10.14.p
     */
    public function getLegacyShortcodesManager()
    {
        return EE_Config::getLegacyShortcodesManager();
    }





    /***********************************************        INIT ACTION HOOK         ***********************************************/
    /**
     * filter_wp_comments
     * This simply makes sure that any "private" EE CPTs do not have their comments show up in any wp comment
     * widgets/queries done on frontend
     *
     * @param  array $clauses array of comment clauses setup by WP_Comment_Query
     * @return array array of comment clauses with modifications.
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function filter_wp_comments($clauses)
    {
        global $wpdb;
        if (strpos($clauses['join'], $wpdb->posts) !== false) {
            /** @var EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions $custom_post_types */
            $custom_post_types = LoaderFactory::getLoader()->getShared(
                'EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions'
            );
            $cpts = $custom_post_types->getPrivateCustomPostTypes();
            foreach ($cpts as $cpt => $details) {
                $clauses['where'] .= $wpdb->prepare(" AND $wpdb->posts.post_type != %s", $cpt);
            }
        }
        return $clauses;
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
        $this->current_page->parseQueryVars($WP);
        do_action('AHEE__EE_Front_Controller__get_request__complete');
        remove_action('parse_request', [$this, 'get_request'], 1);
    }


    /**
     *    pre_get_posts - basically a module factory for instantiating modules and selecting the final view template
     *
     * @access    public
     * @param WP_Query $WP_Query
     * @return    void
     * @throws EE_Error
     * @throws ReflectionException
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



    /***********************     GET_HEADER && WP_HEAD HOOK     ***********************/


    /**
     * callback for the "template_redirect" hook point
     * checks sidebars for EE widgets
     * loads resources and assets accordingly
     *
     * @return void
     */
    public function templateRedirect()
    {
        global $wp_query;
        if (empty($wp_query->posts)) {
            return;
        }
        // if we already know this is an espresso page, then load assets
        $load_assets = $this->current_page->isEspressoPage();
        // if we are already loading assets then just move along, otherwise check for widgets
        $load_assets = $load_assets || $this->espresso_widgets_in_active_sidebars();
        if ($load_assets) {
            add_action('wp_enqueue_scripts', array($this, 'enqueueStyle'), 10);
            add_action('wp_print_footer_scripts', array($this, 'enqueueScripts'), 10);
        }
    }


    /**
     * builds list of active widgets then scans active sidebars looking for them
     * returns true is an EE widget is found in an active sidebar
     * Please Note: this does NOT mean that the sidebar or widget
     * is actually in use in a given template, as that is unfortunately not known
     * until a sidebar and it's widgets are actually loaded
     *
     * @return boolean
     */
    private function espresso_widgets_in_active_sidebars()
    {
        $espresso_widgets = array();
        foreach ($this->Registry->widgets as $widget_class => $widget) {
            $id_base = EspressoWidget::getIdBase($widget_class);
            if (is_active_widget(false, false, $id_base)) {
                $espresso_widgets[] = $id_base;
            }
        }
        $all_sidebar_widgets = wp_get_sidebars_widgets();
        foreach ($all_sidebar_widgets as $sidebar_widgets) {
            if (is_array($sidebar_widgets) && ! empty($sidebar_widgets)) {
                foreach ($sidebar_widgets as $sidebar_widget) {
                    foreach ($espresso_widgets as $espresso_widget) {
                        if (strpos($sidebar_widget, $espresso_widget) !== false) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
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
            '<meta name="generator" content="Event Espresso Version ' . EVENT_ESPRESSO_VERSION . "\" />\n"
        )
        );

        // let's exclude all event type taxonomy term archive pages from search engine indexing
        // @see https://events.codebasehq.com/projects/event-espresso/tickets/10249
        // also exclude all critical pages from indexing
        if (
            (
                is_tax('espresso_event_type')
                && get_option('blog_public') !== '0'
            )
            || is_page(EE_Registry::instance()->CFG->core->get_critical_pages_array())
        ) {
            print(
            apply_filters(
                'FHEE__EE_Front_Controller__header_meta_tag__noindex_for_event_type',
                '<meta name="robots" content="noindex,follow" />' . "\n"
            )
            );
        }
    }


    /**
     * wp_print_scripts
     *
     * @return void
     * @throws EE_Error
     */
    public function wp_print_scripts()
    {
        global $post;
        if (
            isset($post->EE_Event)
            && $post->EE_Event instanceof EE_Event
            && get_post_type() === 'espresso_events'
            && is_singular()
        ) {
            EEH_Schema::add_json_linked_data_for_event($post->EE_Event);
        }
    }


    public function enqueueStyle()
    {
        wp_enqueue_style('espresso_default');
        wp_enqueue_style('espresso_custom_css');
    }



    /***********************************************        WP_FOOTER         ***********************************************/


    public function enqueueScripts()
    {
        wp_enqueue_script('espresso_core');
    }


    /**
     * display_errors
     *
     * @access public
     * @return void
     * @throws DomainException
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
            && $this->current_page->isEspressoPage()
        ) {
            $shown_already = true;
            if (did_action('wp_head')) {
                echo wp_kses($this->printNotices(), AllowedTags::getAllowedTags());
            } else {
                // block enabled themes run their query loop before headers are sent
                // so we need to add our notices onto the beginning of the content
                add_filter('the_content', [$this, 'prependNotices'], 1, 1);
            }
        }
        do_action('AHEE__EE_Front_Controller__display_errors__end');
    }


    /**
     * @param string $the_content
     * @return string
     * @since 4.10.30.p
     */
    public function prependNotices($the_content)
    {
        $notices = $this->printNotices();
        return $notices ? $notices . $the_content : $the_content;
    }


    /**
     * @return false|string
     * @since 4.10.30.p
     */
    public function printNotices()
    {
        ob_start();
        echo wp_kses(EE_Error::get_notices(), AllowedTags::getWithFormTags());
        EEH_Template::display_template(EE_TEMPLATES . 'espresso-ajax-notices.template.php');
        return ob_get_clean();
    }



    /***********************************************        UTILITIES         ***********************************************/


    /**
     * @param string $template_include_path
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function template_include($template_include_path = null)
    {
        if ($this->current_page->isEspressoPage()) {
            // despite all helpers having autoloaders set, we need to manually load the template loader
            // because there are some side effects in that class for triggering template tag functions
            $this->Registry->load_helper('EEH_Template');
            $this->_template_path = ! empty($this->_template_path)
                ? basename($this->_template_path)
                : basename(
                    $template_include_path
                );
            $template_path = EEH_Template::locate_template($this->_template_path, array(), false);
            $this->_template_path = ! empty($template_path) ? $template_path : $template_include_path;
            $this->_template = basename($this->_template_path);
            return $this->_template_path;
        }
        return $template_include_path;
    }


    /**
     * @param bool $with_path
     * @return    string
     */
    public function get_selected_template($with_path = false)
    {
        return $with_path ? $this->_template_path : $this->_template;
    }


    /**
     * @param string $shortcode_class
     * @param WP     $wp
     * @throws ReflectionException
     * @deprecated 4.9.26
     */
    public function initialize_shortcode($shortcode_class = '', WP $wp = null)
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Please use \EventEspresso\core\services\shortcodes\LegacyShortcodesManager::initializeShortcode() instead.',
                'event_espresso'
            ),
            '4.9.26'
        );
        $this->getLegacyShortcodesManager()->initializeShortcode($shortcode_class, $wp);
    }


    /**
     * @return void
     * @deprecated 4.9.57.p
     */
    public function loadPersistentAdminNoticeManager()
    {
    }


    /**
     * @return void
     * @deprecated 4.9.64.p
     */
    public function employ_CPT_Strategy()
    {
    }
}

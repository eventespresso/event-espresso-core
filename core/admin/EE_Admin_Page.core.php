<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\interfaces\InterminableInterface;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * EE_Admin_Page class
 *
 * @package           Event Espresso
 * @subpackage        includes/core/admin/EE_Admin_Page.core.php
 * @abstract
 * @author            Brent Christensen, Darren Ethier
 */
abstract class EE_Admin_Page extends EE_Base implements InterminableInterface
{
    /**
     * @var LoaderInterface
     */
    protected $loader;

    /**
     * @var RequestInterface
     */
    protected $request;

    // set in _init_page_props()
    public $page_slug;

    public $page_label;

    public $page_folder;

    // set in define_page_props()
    protected $_admin_base_url;

    protected $_admin_base_path;

    protected $_admin_page_title;

    protected $_labels;


    // set early within EE_Admin_Init
    protected $_wp_page_slug;

    // navtabs
    protected $_nav_tabs;

    protected $_default_nav_tab_name;


    // template variables (used by templates)
    protected $_template_path;

    protected $_column_template_path;

    /**
     * @var array $_template_args
     */
    protected $_template_args = [];

    /**
     * this will hold the list table object for a given view.
     *
     * @var EE_Admin_List_Table $_list_table_object
     */
    protected $_list_table_object;

    // bools
    protected $_is_UI_request = null; // this starts at null so we can have no header routes progress through two states.

    protected $_routing;

    // list table args
    protected $_view;

    protected $_views;


    // action => method pairs used for routing incoming requests
    protected $_page_routes;

    /**
     * @var array $_page_config
     */
    protected $_page_config;

    /**
     * the current page route and route config
     *
     * @var string $_route
     */
    protected $_route;

    /**
     * @var string $_cpt_route
     */
    protected $_cpt_route;

    /**
     * @var array $_route_config
     */
    protected $_route_config;

    /**
     * Used to hold default query args for list table routes to help preserve stickiness of filters for carried out
     * actions.
     *
     * @since 4.6.x
     * @var array.
     */
    protected $_default_route_query_args;

    // set via request page and action args.
    protected $_current_page;

    protected $_current_view;

    protected $_current_page_view_url;

    /**
     * unprocessed value for the 'action' request param (default '')
     *
     * @var string
     */
    protected $raw_req_action = '';

    /**
     * unprocessed value for the 'page' request param (default '')
     *
     * @var string
     */
    protected $raw_req_page = '';

    /**
     * sanitized request action (and nonce)
     *
     * @var string
     */
    protected $_req_action = '';

    /**
     * sanitized request action nonce
     *
     * @var string
     */
    protected $_req_nonce = '';

    /**
     * @var string
     */
    protected $_search_btn_label = '';

    /**
     * @var string
     */
    protected $_search_box_callback = '';

    /**
     * @var WP_Screen
     */
    protected $_current_screen;

    // for holding EE_Admin_Hooks object when needed (set via set_hook_object())
    protected $_hook_obj;

    // for holding incoming request data
    protected $_req_data = [];

    // yes / no array for admin form fields
    protected $_yes_no_values = [];

    // some default things shared by all child classes
    protected $_default_espresso_metaboxes;

    /**
     * @var EE_Registry
     */
    protected $EE = null;


    /**
     * This is just a property that flags whether the given route is a caffeinated route or not.
     *
     * @var boolean
     */
    protected $_is_caf = false;


    /**
     * @Constructor
     * @param bool $routing indicate whether we want to just load the object and handle routing or just load the object.
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function __construct($routing = true)
    {
        $this->loader  = LoaderFactory::getLoader();
        $this->request = $this->loader->getShared(RequestInterface::class);
        $this->_routing = $routing;

        if (strpos($this->_get_dir(), 'caffeinated') !== false) {
            $this->_is_caf = true;
        }
        $this->_yes_no_values = [
            ['id' => true, 'text' => esc_html__('Yes', 'event_espresso')],
            ['id' => false, 'text' => esc_html__('No', 'event_espresso')],
        ];
        // set the _req_data property.
        $this->_req_data = $this->request->requestParams();
        // set initial page props (child method)
        $this->_init_page_props();
        // set global defaults
        $this->_set_defaults();
        // set early because incoming requests could be ajax related and we need to register those hooks.
        $this->_global_ajax_hooks();
        $this->_ajax_hooks();
        // other_page_hooks have to be early too.
        $this->_do_other_page_hooks();
        // set up page dependencies
        $this->_before_page_setup();
        $this->_page_setup();
        // die();
    }


    /**
     * _init_page_props
     * Child classes use to set at least the following properties:
     * $page_slug.
     * $page_label.
     *
     * @abstract
     * @return void
     */
    abstract protected function _init_page_props();


    /**
     * _ajax_hooks
     * child classes put all their add_action('wp_ajax_{name_of_hook}') hooks in here.
     * Note: within the ajax callback methods.
     *
     * @abstract
     * @return void
     */
    abstract protected function _ajax_hooks();


    /**
     * _define_page_props
     * child classes define page properties in here.  Must include at least:
     * $_admin_base_url = base_url for all admin pages
     * $_admin_page_title = default admin_page_title for admin pages
     * $_labels = array of default labels for various automatically generated elements:
     *    array(
     *        'buttons' => array(
     *            'add' => esc_html__('label for add new button'),
     *            'edit' => esc_html__('label for edit button'),
     *            'delete' => esc_html__('label for delete button')
     *            )
     *        )
     *
     * @abstract
     * @return void
     */
    abstract protected function _define_page_props();


    /**
     * _set_page_routes
     * child classes use this to define the page routes for all subpages handled by the class.  Page routes are
     * assigned to a action => method pairs in an array and to the $_page_routes property.  Each page route must also
     * have a 'default' route. Here's the format
     * $this->_page_routes = array(
     *        'default' => array(
     *            'func' => '_default_method_handling_route',
     *            'args' => array('array','of','args'),
     *            'noheader' => true, //add this in if this page route is processed before any headers are loaded (i.e.
     *            ajax request, backend processing)
     *            'headers_sent_route'=>'headers_route_reference', //add this if noheader=>true, and you want to load a
     *            headers route after.  The string you enter here should match the defined route reference for a
     *            headers sent route.
     *            'capability' => 'route_capability', //indicate a string for minimum capability required to access
     *            this route.
     *            'obj_id' => 10 // if this route has an object id, then this can include it (used for capability
     *            checks).
     *        ),
     *        'insert_item' => '_method_for_handling_insert_item' //this can be used if all we need to have is a
     *        handling method.
     *        )
     * )
     *
     * @abstract
     * @return void
     */
    abstract protected function _set_page_routes();


    /**
     * _set_page_config
     * child classes use this to define the _page_config array for all subpages handled by the class. Each key in the
     * array corresponds to the page_route for the loaded page. Format:
     * $this->_page_config = array(
     *        'default' => array(
     *            'labels' => array(
     *                'buttons' => array(
     *                    'add' => esc_html__('label for adding item'),
     *                    'edit' => esc_html__('label for editing item'),
     *                    'delete' => esc_html__('label for deleting item')
     *                ),
     *                'publishbox' => esc_html__('Localized Title for Publish metabox', 'event_espresso')
     *            ), //optional an array of custom labels for various automatically generated elements to use on the
     *            page. If this isn't present then the defaults will be used as set for the $this->_labels in
     *            _define_page_props() method
     *            'nav' => array(
     *                'label' => esc_html__('Label for Tab', 'event_espresso').
     *                'url' => 'http://someurl', //automatically generated UNLESS you define
     *                'css_class' => 'css-class', //automatically generated UNLESS you define
     *                'order' => 10, //required to indicate tab position.
     *                'persistent' => false //if you want the nav tab to ONLY display when the specific route is
     *                displayed then add this parameter.
     *            'list_table' => 'name_of_list_table' //string for list table class to be loaded for this admin_page.
     *            'metaboxes' => array('metabox1', 'metabox2'), //if present this key indicates we want to load
     *            metaboxes set for eventespresso admin pages.
     *            'has_metaboxes' => true, //this boolean flag can simply be used to indicate if the route will have
     *            metaboxes.  Typically this is used if the 'metaboxes' index is not used because metaboxes are added
     *            later.  We just use this flag to make sure the necessary js gets enqueued on page load.
     *            'has_help_popups' => false //defaults(true) //this boolean flag can simply be used to indicate if the
     *            given route has help popups setup and if it does then we need to make sure thickbox is enqueued.
     *            'columns' => array(4, 2), //this key triggers the setup of a page that uses columns (metaboxes).  The
     *            array indicates the max number of columns (4) and the default number of columns on page load (2).
     *            There is an option in the "screen_options" dropdown that is setup so users can pick what columns they
     *            want to display.
     *            'help_tabs' => array( //this is used for adding help tabs to a page
     *                'tab_id' => array(
     *                    'title' => 'tab_title',
     *                    'filename' => 'name_of_file_containing_content', //this is the primary method for setting
     *                    help tab content.  The fallback if it isn't present is to try a the callback.  Filename
     *                    should match a file in the admin folder's "help_tabs" dir (ie..
     *                    events/help_tabs/name_of_file_containing_content.help_tab.php)
     *                    'callback' => 'callback_method_for_content', //if 'filename' isn't present then system will
     *                    attempt to use the callback which should match the name of a method in the class
     *                    ),
     *                'tab2_id' => array(
     *                    'title' => 'tab2 title',
     *                    'filename' => 'file_name_2'
     *                    'callback' => 'callback_method_for_content',
     *                 ),
     *            'help_sidebar' => 'callback_for_sidebar_content', //this is used for setting up the sidebar in the
     *            help tab area on an admin page. @return void
     *
     * @abstract
     */
    abstract protected function _set_page_config();


    /**
     * _add_screen_options
     * Child classes can add any extra wp_screen_options within this method using built-in WP functions/methods for
     * doing so. Note child classes can also define _add_screen_options_($this->_current_view) to limit screen options
     * to a particular view.
     *
     * @link   http://chrismarslender.com/wp-tutorials/wordpress-screen-options-tutorial/
     *         see also WP_Screen object documents...
     * @link   http://codex.wordpress.org/Class_Reference/WP_Screen
     * @abstract
     * @return void
     */
    abstract protected function _add_screen_options();


    /**
     * _add_feature_pointers
     * Child classes should use this method for implementing any "feature pointers" (using built-in WP styling js).
     * Note child classes can also define _add_feature_pointers_($this->_current_view) to limit screen options to a
     * particular view. Note: this is just a placeholder for now.  Implementation will come down the road See:
     * WP_Internal_Pointers class in wp-admin/includes/template.php for example (its a final class so can't be
     * extended) also see:
     *
     * @link   http://eamann.com/tech/wordpress-portland/
     * @abstract
     * @return void
     */
    abstract protected function _add_feature_pointers();


    /**
     * load_scripts_styles
     * child classes put their wp_enqueue_script and wp_enqueue_style hooks in here for anything they need loaded for
     * their pages/subpages.  Note this is for all pages/subpages of the system.  You can also load only specific
     * scripts/styles per view by putting them in a dynamic function in this format
     * (load_scripts_styles_{$this->_current_view}) which matches your page route (action request arg)
     *
     * @abstract
     * @return void
     */
    abstract public function load_scripts_styles();


    /**
     * admin_init
     * Anything that should be set/executed at 'admin_init' WP hook runtime should be put in here.  This will apply to
     * all pages/views loaded by child class.
     *
     * @abstract
     * @return void
     */
    abstract public function admin_init();


    /**
     * admin_notices
     * Anything triggered by the 'admin_notices' WP hook should be put in here.  This particular method will apply to
     * all pages/views loaded by child class.
     *
     * @abstract
     * @return void
     */
    abstract public function admin_notices();


    /**
     * admin_footer_scripts
     * Anything triggered by the 'admin_print_footer_scripts' WP hook should be put in here. This particular method
     * will apply to all pages/views loaded by child class.
     *
     * @return void
     */
    abstract public function admin_footer_scripts();


    /**
     * admin_footer
     * anything triggered by the 'admin_footer' WP action hook should be added to here. This particular method will
     * apply to all pages/views loaded by child class.
     *
     * @return void
     */
    public function admin_footer()
    {
    }


    /**
     * _global_ajax_hooks
     * all global add_action('wp_ajax_{name_of_hook}') hooks in here.
     * Note: within the ajax callback methods.
     *
     * @abstract
     * @return void
     */
    protected function _global_ajax_hooks()
    {
        // for lazy loading of metabox content
        add_action('wp_ajax_espresso-ajax-content', [$this, 'ajax_metabox_content'], 10);
    }


    public function ajax_metabox_content()
    {
        $content_id  = $this->request->getRequestParam('contentid', '');
        $content_url = $this->request->getRequestParam('contenturl', '', 'url');
        self::cached_rss_display($content_id, $content_url);
        wp_die();
    }


    /**
     * allows extending classes do something specific before the parent constructor runs _page_setup().
     *
     * @return void
     */
    protected function _before_page_setup()
    {
        // default is to do nothing
    }


    /**
     * Makes sure any things that need to be loaded early get handled.
     * We also escape early here if the page requested doesn't match the object.
     *
     * @final
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    final protected function _page_setup()
    {
        // requires?
        // admin_init stuff - global - we're setting this REALLY early
        // so if EE_Admin pages have to hook into other WP pages they can.
        // But keep in mind, not everything is available from the EE_Admin Page object at this point.
        add_action('admin_init', [$this, 'admin_init_global'], 5);
        // next verify if we need to load anything...
        $this->_current_page = $this->request->getRequestParam('page', '', 'key');
        $this->_current_page = $this->request->getRequestParam('current_page', $this->_current_page, 'key');

        $this->page_folder   = strtolower(
            str_replace(['_Admin_Page', 'Extend_'], '', get_class($this))
        );
        global $ee_menu_slugs;
        $ee_menu_slugs = (array) $ee_menu_slugs;
        if (
            ! $this->request->isAjax()
            && (! $this->_current_page || ! isset($ee_menu_slugs[ $this->_current_page ]))
        ) {
            return;
        }
        // because WP List tables have two duplicate select inputs for choosing bulk actions,
        // we need to copy the action from the second to the first
        $action     = $this->request->getRequestParam('action', '-1', 'key');
        $action2    = $this->request->getRequestParam('action2', '-1', 'key');
        $action     = $action !== '-1' ? $action : $action2;
        $req_action = $action !== '-1' ? $action : 'default';

        // if a specific 'route' has been set, and the action is 'default' OR we are doing_ajax
        // then let's use the route as the action.
        // This covers cases where we're coming in from a list table that isn't on the default route.
        $route = $this->request->getRequestParam('route');
        $this->_req_action = $route && ($req_action === 'default' || $this->request->isAjax())
            ? $route
            : $req_action;

        $this->_current_view = $this->_req_action;
        $this->_req_nonce    = $this->_req_action . '_nonce';
        $this->_define_page_props();
        $this->_current_page_view_url = add_query_arg(
            ['page' => $this->_current_page, 'action' => $this->_current_view],
            $this->_admin_base_url
        );
        // default things
        $this->_default_espresso_metaboxes = [
            '_espresso_news_post_box',
            '_espresso_links_post_box',
            '_espresso_ratings_request',
            '_espresso_sponsors_post_box',
        ];
        // set page configs
        $this->_set_page_routes();
        $this->_set_page_config();
        // let's include any referrer data in our default_query_args for this route for "stickiness".
        if ($this->request->requestParamIsSet('wp_referer')) {
            $wp_referer = $this->request->getRequestParam('wp_referer');
            if ($wp_referer) {
                $this->_default_route_query_args['wp_referer'] = $wp_referer;
            }
        }
        // for caffeinated and other extended functionality.
        //  If there is a _extend_page_config method
        // then let's run that to modify the all the various page configuration arrays
        if (method_exists($this, '_extend_page_config')) {
            $this->_extend_page_config();
        }
        // for CPT and other extended functionality.
        // If there is an _extend_page_config_for_cpt
        // then let's run that to modify all the various page configuration arrays.
        if (method_exists($this, '_extend_page_config_for_cpt')) {
            $this->_extend_page_config_for_cpt();
        }
        // filter routes and page_config so addons can add their stuff. Filtering done per class
        $this->_page_routes = apply_filters(
            'FHEE__' . get_class($this) . '__page_setup__page_routes',
            $this->_page_routes,
            $this
        );
        $this->_page_config = apply_filters(
            'FHEE__' . get_class($this) . '__page_setup__page_config',
            $this->_page_config,
            $this
        );
        // if AHEE__EE_Admin_Page__route_admin_request_$this->_current_view method is present
        // then we call it hooked into the AHEE__EE_Admin_Page__route_admin_request action
        if (method_exists($this, 'AHEE__EE_Admin_Page__route_admin_request_' . $this->_current_view)) {
            add_action(
                'AHEE__EE_Admin_Page__route_admin_request',
                [$this, 'AHEE__EE_Admin_Page__route_admin_request_' . $this->_current_view],
                10,
                2
            );
        }
        // next route only if routing enabled
        if ($this->_routing && ! $this->request->isAjax()) {
            $this->_verify_routes();
            // next let's just check user_access and kill if no access
            $this->check_user_access();
            if ($this->_is_UI_request) {
                // admin_init stuff - global, all views for this page class, specific view
                add_action('admin_init', [$this, 'admin_init'], 10);
                if (method_exists($this, 'admin_init_' . $this->_current_view)) {
                    add_action('admin_init', [$this, 'admin_init_' . $this->_current_view], 15);
                }
            } else {
                // hijack regular WP loading and route admin request immediately
                @ini_set('memory_limit', apply_filters('admin_memory_limit', WP_MAX_MEMORY_LIMIT));
                $this->route_admin_request();
            }
        }
    }


    /**
     * Provides a way for related child admin pages to load stuff on the loaded admin page.
     *
     * @return void
     * @throws EE_Error
     */
    private function _do_other_page_hooks()
    {
        $registered_pages = apply_filters('FHEE_do_other_page_hooks_' . $this->page_slug, []);
        foreach ($registered_pages as $page) {
            // now let's setup the file name and class that should be present
            $classname = str_replace('.class.php', '', $page);
            // autoloaders should take care of loading file
            if (! class_exists($classname)) {
                $error_msg[] = sprintf(
                    esc_html__(
                        'Something went wrong with loading the %s admin hooks page.',
                        'event_espresso'
                    ),
                    $page
                );
                $error_msg[] = $error_msg[0]
                               . "\r\n"
                               . sprintf(
                                   esc_html__(
                                       'There is no class in place for the %1$s admin hooks page.%2$sMake sure you have %3$s defined. If this is a non-EE-core admin page then you also must have an autoloader in place for your class',
                                       'event_espresso'
                                   ),
                                   $page,
                                   '<br />',
                                   '<strong>' . $classname . '</strong>'
                               );
                throw new EE_Error(implode('||', $error_msg));
            }
            // notice we are passing the instance of this class to the hook object.
            $this->loader->getShared($classname, [$this]);
        }
    }


    /**
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function load_page_dependencies()
    {
        try {
            $this->_load_page_dependencies();
        } catch (EE_Error $e) {
            $e->get_error();
        }
    }


    /**
     * load_page_dependencies
     * loads things specific to this page class when its loaded.  Really helps with efficiency.
     *
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _load_page_dependencies()
    {
        // let's set the current_screen and screen options to override what WP set
        $this->_current_screen = get_current_screen();
        // load admin_notices - global, page class, and view specific
        add_action('admin_notices', [$this, 'admin_notices_global'], 5);
        add_action('admin_notices', [$this, 'admin_notices'], 10);
        if (method_exists($this, 'admin_notices_' . $this->_current_view)) {
            add_action('admin_notices', [$this, 'admin_notices_' . $this->_current_view], 15);
        }
        // load network admin_notices - global, page class, and view specific
        add_action('network_admin_notices', [$this, 'network_admin_notices_global'], 5);
        if (method_exists($this, 'network_admin_notices_' . $this->_current_view)) {
            add_action('network_admin_notices', [$this, 'network_admin_notices_' . $this->_current_view]);
        }
        // this will save any per_page screen options if they are present
        $this->_set_per_page_screen_options();
        // setup list table properties
        $this->_set_list_table();
        // child classes can "register" a metabox to be automatically handled via the _page_config array property.
        // However in some cases the metaboxes will need to be added within a route handling callback.
        $this->_add_registered_meta_boxes();
        $this->_add_screen_columns();
        // add screen options - global, page child class, and view specific
        $this->_add_global_screen_options();
        $this->_add_screen_options();
        $add_screen_options = "_add_screen_options_{$this->_current_view}";
        if (method_exists($this, $add_screen_options)) {
            $this->{$add_screen_options}();
        }
        // add help tab(s) - set via page_config and qtips.
        $this->_add_help_tabs();
        $this->_add_qtips();
        // add feature_pointers - global, page child class, and view specific
        $this->_add_feature_pointers();
        $this->_add_global_feature_pointers();
        $add_feature_pointer = "_add_feature_pointer_{$this->_current_view}";
        if (method_exists($this, $add_feature_pointer)) {
            $this->{$add_feature_pointer}();
        }
        // enqueue scripts/styles - global, page class, and view specific
        add_action('admin_enqueue_scripts', [$this, 'load_global_scripts_styles'], 5);
        add_action('admin_enqueue_scripts', [$this, 'load_scripts_styles'], 10);
        if (method_exists($this, "load_scripts_styles_{$this->_current_view}")) {
            add_action('admin_enqueue_scripts', [$this, "load_scripts_styles_{$this->_current_view}"], 15);
        }
        add_action('admin_enqueue_scripts', [$this, 'admin_footer_scripts_eei18n_js_strings'], 100);
        // admin_print_footer_scripts - global, page child class, and view specific.
        // NOTE, despite the name, whenever possible, scripts should NOT be loaded using this.
        // In most cases that's doing_it_wrong().  But adding hidden container elements etc.
        // is a good use case. Notice the late priority we're giving these
        add_action('admin_print_footer_scripts', [$this, 'admin_footer_scripts_global'], 99);
        add_action('admin_print_footer_scripts', [$this, 'admin_footer_scripts'], 100);
        if (method_exists($this, "admin_footer_scripts_{$this->_current_view}")) {
            add_action('admin_print_footer_scripts', [$this, "admin_footer_scripts_{$this->_current_view}"], 101);
        }
        // admin footer scripts
        add_action('admin_footer', [$this, 'admin_footer_global'], 99);
        add_action('admin_footer', [$this, 'admin_footer'], 100);
        if (method_exists($this, "admin_footer_{$this->_current_view}")) {
            add_action('admin_footer', [$this, "admin_footer_{$this->_current_view}"], 101);
        }
        do_action('FHEE__EE_Admin_Page___load_page_dependencies__after_load', $this->page_slug);
        // targeted hook
        do_action(
            "FHEE__EE_Admin_Page___load_page_dependencies__after_load__{$this->page_slug}__{$this->_req_action}"
        );
    }


    /**
     * _set_defaults
     * This sets some global defaults for class properties.
     */
    private function _set_defaults()
    {
        $this->_current_screen       = $this->_admin_page_title = $this->_req_action = $this->_req_nonce = null;
        $this->_event                = $this->_template_path = $this->_column_template_path = null;
        $this->_nav_tabs             = $this->_views = $this->_page_routes = [];
        $this->_page_config          = $this->_default_route_query_args = [];
        $this->_default_nav_tab_name = 'overview';
        // init template args
        $this->_template_args = [
            'admin_page_header'  => '',
            'admin_page_content' => '',
            'post_body_content'  => '',
            'before_list_table'  => '',
            'after_list_table'   => '',
        ];
    }


    /**
     * route_admin_request
     *
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     * @see    _route_admin_request()
     */
    public function route_admin_request()
    {
        try {
            $this->_route_admin_request();
        } catch (EE_Error $e) {
            $e->get_error();
        }
    }


    public function set_wp_page_slug($wp_page_slug)
    {
        $this->_wp_page_slug = $wp_page_slug;
        // if in network admin then we need to append "-network" to the page slug. Why? Because that's how WP rolls...
        if (is_network_admin()) {
            $this->_wp_page_slug .= '-network';
        }
    }


    /**
     * _verify_routes
     * All this method does is verify the incoming request and make sure that routes exist for it.  We do this early so
     * we know if we need to drop out.
     *
     * @return bool
     * @throws EE_Error
     */
    protected function _verify_routes()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        if (! $this->_current_page && ! $this->request->isAjax()) {
            return false;
        }
        $this->_route = false;
        // check that the page_routes array is not empty
        if (empty($this->_page_routes)) {
            // user error msg
            $error_msg = sprintf(
                esc_html__('No page routes have been set for the %s admin page.', 'event_espresso'),
                $this->_admin_page_title
            );
            // developer error msg
            $error_msg .= '||' . $error_msg
                          . esc_html__(
                              ' Make sure the "set_page_routes()" method exists, and is setting the "_page_routes" array properly.',
                              'event_espresso'
                          );
            throw new EE_Error($error_msg);
        }
        // and that the requested page route exists
        if (array_key_exists($this->_req_action, $this->_page_routes)) {
            $this->_route        = $this->_page_routes[ $this->_req_action ];
            $this->_route_config = isset($this->_page_config[ $this->_req_action ])
                ? $this->_page_config[ $this->_req_action ]
                : [];
        } else {
            // user error msg
            $error_msg = sprintf(
                esc_html__(
                    'The requested page route does not exist for the %s admin page.',
                    'event_espresso'
                ),
                $this->_admin_page_title
            );
            // developer error msg
            $error_msg .= '||' . $error_msg
                          . sprintf(
                              esc_html__(
                                  ' Create a key in the "_page_routes" array named "%s" and set its value to the appropriate method.',
                                  'event_espresso'
                              ),
                              $this->_req_action
                          );
            throw new EE_Error($error_msg);
        }
        // and that a default route exists
        if (! array_key_exists('default', $this->_page_routes)) {
            // user error msg
            $error_msg = sprintf(
                esc_html__(
                    'A default page route has not been set for the % admin page.',
                    'event_espresso'
                ),
                $this->_admin_page_title
            );
            // developer error msg
            $error_msg .= '||' . $error_msg
                          . esc_html__(
                              ' Create a key in the "_page_routes" array named "default" and set its value to your default page method.',
                              'event_espresso'
                          );
            throw new EE_Error($error_msg);
        }
        // first lets' catch if the UI request has EVER been set.
        if ($this->_is_UI_request === null) {
            // lets set if this is a UI request or not.
            $this->_is_UI_request = ! $this->request->getRequestParam('noheader', false, 'bool');
            // wait a minute... we might have a noheader in the route array
            $this->_is_UI_request = ! (
                is_array($this->_route) && isset($this->_route['noheader']) && $this->_route['noheader']
            )
                ? $this->_is_UI_request
                : false;
        }
        $this->_set_current_labels();
        return true;
    }


    /**
     * this method simply verifies a given route and makes sure its an actual route available for the loaded page
     *
     * @param string $route the route name we're verifying
     * @return bool we'll throw an exception if this isn't a valid route.
     * @throws EE_Error
     */
    protected function _verify_route($route)
    {
        if (array_key_exists($this->_req_action, $this->_page_routes)) {
            return true;
        }
        // user error msg
        $error_msg = sprintf(
            esc_html__('The given page route does not exist for the %s admin page.', 'event_espresso'),
            $this->_admin_page_title
        );
        // developer error msg
        $error_msg .= '||' . $error_msg
                      . sprintf(
                          esc_html__(
                              ' Check the route you are using in your method (%s) and make sure it matches a route set in your "_page_routes" array property',
                              'event_espresso'
                          ),
                          $route
                      );
        throw new EE_Error($error_msg);
    }


    /**
     * perform nonce verification
     * This method has be encapsulated here so that any ajax requests that bypass normal routes can verify their nonces
     * using this method (and save retyping!)
     *
     * @param string $nonce     The nonce sent
     * @param string $nonce_ref The nonce reference string (name0)
     * @return void
     * @throws EE_Error
     */
    protected function _verify_nonce($nonce, $nonce_ref)
    {
        // verify nonce against expected value
        if (! wp_verify_nonce($nonce, $nonce_ref)) {
            // these are not the droids you are looking for !!!
            $msg = sprintf(
                esc_html__('%sNonce Fail.%s', 'event_espresso'),
                '<a href="https://www.youtube.com/watch?v=56_S0WeTkzs">',
                '</a>'
            );
            if (WP_DEBUG) {
                $msg .= "\n  ";
                $msg .= sprintf(
                    esc_html__(
                        'In order to dynamically generate nonces for your actions, use the %s::add_query_args_and_nonce() method. May the Nonce be with you!',
                        'event_espresso'
                    ),
                    __CLASS__
                );
            }
            if (! $this->request->isAjax()) {
                wp_die($msg);
            }
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            $this->_return_json();
        }
    }


    /**
     * _route_admin_request()
     * Meat and potatoes of the class.  Basically, this dude checks out what's being requested and sees if theres are
     * some doodads to work the magic and handle the flingjangy. Translation:  Checks if the requested action is listed
     * in the page routes and then will try to load the corresponding method.
     *
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _route_admin_request()
    {
        if (! $this->_is_UI_request) {
            $this->_verify_routes();
        }
        $nonce_check = ! isset($this->_route_config['require_nonce']) || $this->_route_config['require_nonce'];
        if ($this->_req_action !== 'default' && $nonce_check) {
            // set nonce from post data
            $nonce = $this->request->getRequestParam($this->_req_nonce, '');
            $this->_verify_nonce($nonce, $this->_req_nonce);
        }
        // set the nav_tabs array but ONLY if this is  UI_request
        if ($this->_is_UI_request) {
            $this->_set_nav_tabs();
        }
        // grab callback function
        $func = is_array($this->_route) ? $this->_route['func'] : $this->_route;
        // check if callback has args
        $args      = is_array($this->_route) && isset($this->_route['args']) ? $this->_route['args'] : [];
        $error_msg = '';
        // action right before calling route
        // (hook is something like 'AHEE__Registrations_Admin_Page__route_admin_request')
        if (! did_action('AHEE__EE_Admin_Page__route_admin_request')) {
            do_action('AHEE__EE_Admin_Page__route_admin_request', $this->_current_view, $this);
        }
        // right before calling the route, let's clean the _wp_http_referer
        $this->request->unSetRequestParam('_wp_http_referer');
        $this->request->unSetServerParam('_wp_http_referer');
        $cleaner_request_uri = remove_query_arg(
            '_wp_http_referer',
            wp_unslash($this->request->getServerParam('REQUEST_URI'))
        );
        $this->request->setRequestParam('_wp_http_referer', $cleaner_request_uri);
        $this->request->setServerParam('REQUEST_URI', $cleaner_request_uri);
        if (! empty($func)) {
            if (is_array($func)) {
                [$class, $method] = $func;
            } elseif (strpos($func, '::') !== false) {
                [$class, $method] = explode('::', $func);
            } else {
                $class  = $this;
                $method = $func;
            }
            if (! (is_object($class) && $class === $this) && ! in_array($this, $args)) {
                // send along this admin page object for access by addons.
                $args['admin_page'] = $this;
            }
            if (
                // is it a method on a class that doesn't work?
                (
                    (
                        method_exists($class, $method)
                        && call_user_func_array([$class, $method], $args) === false
                    )
                    && (
                        // is it a standalone function that doesn't work?
                        function_exists($method)
                        && call_user_func_array(
                            $func,
                            array_merge(['admin_page' => $this], $args)
                        ) === false
                    )
                )
                || (
                    // is it neither a class method NOR a standalone function?
                    ! method_exists($class, $method)
                    && ! function_exists($method)
                )
            ) {
                // user error msg
                $error_msg = esc_html__(
                    'An error occurred. The  requested page route could not be found.',
                    'event_espresso'
                );
                // developer error msg
                $error_msg .= '||';
                $error_msg .= sprintf(
                    esc_html__(
                        'Page route "%s" could not be called. Check that the spelling for method names and actions in the "_page_routes" array are all correct.',
                        'event_espresso'
                    ),
                    $method
                );
            }
            if (! empty($error_msg)) {
                throw new EE_Error($error_msg);
            }
        }
        // if we've routed and this route has a no headers route AND a sent_headers_route,
        // then we need to reset the routing properties to the new route.
        // now if UI request is FALSE and noheader is true AND we have a headers_sent_route in the route array then let's set UI_request to true because the no header route has a second func after headers have been sent.
        if (
            $this->_is_UI_request === false
            && is_array($this->_route)
            && ! empty($this->_route['headers_sent_route'])
        ) {
            $this->_reset_routing_properties($this->_route['headers_sent_route']);
        }
    }


    /**
     * This method just allows the resetting of page properties in the case where a no headers
     * route redirects to a headers route in its route config.
     *
     * @param string $new_route New (non header) route to redirect to.
     * @return   void
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @since   4.3.0
     */
    protected function _reset_routing_properties($new_route)
    {
        $this->_is_UI_request = true;
        // now we set the current route to whatever the headers_sent_route is set at
        $this->request->setRequestParam('action', $new_route);
        // rerun page setup
        $this->_page_setup();
    }


    /**
     * _add_query_arg
     * adds nonce to array of arguments then calls WP add_query_arg function
     *(internally just uses EEH_URL's function with the same name)
     *
     * @param array  $args
     * @param string $url
     * @param bool   $sticky                  if true, then the existing Request params will be appended to the
     *                                        generated url in an associative array indexed by the key 'wp_referer';
     *                                        Example usage: If the current page is:
     *                                        http://mydomain.com/wp-admin/admin.php?page=espresso_registrations
     *                                        &action=default&event_id=20&month_range=March%202015
     *                                        &_wpnonce=5467821
     *                                        and you call:
     *                                        EE_Admin_Page::add_query_args_and_nonce(
     *                                        array(
     *                                        'action' => 'resend_something',
     *                                        'page=>espresso_registrations'
     *                                        ),
     *                                        $some_url,
     *                                        true
     *                                        );
     *                                        It will produce a url in this structure:
     *                                        http://{$some_url}/?page=espresso_registrations&action=resend_something
     *                                        &wp_referer[action]=default&wp_referer[event_id]=20&wpreferer[
     *                                        month_range]=March%202015
     * @param bool   $exclude_nonce           If true, the the nonce will be excluded from the generated nonce.
     * @return string
     */
    public static function add_query_args_and_nonce(
        $args = [],
        $url = false,
        $sticky = false,
        $exclude_nonce = false
    ) {
        // if there is a _wp_http_referer include the values from the request but only if sticky = true
        if ($sticky) {
            /** @var RequestInterface $request */
            $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
            $request->unSetRequestParams(['_wp_http_referer', 'wp_referer'], true);
            foreach ($request->requestParams() as $key => $value) {
                // do not add nonces
                if (strpos($key, 'nonce') !== false) {
                    continue;
                }
                $args[ 'wp_referer[' . $key . ']' ] = is_string($value) ? htmlspecialchars($value) : $value;
            }
        }
        return EEH_URL::add_query_args_and_nonce($args, $url, $exclude_nonce);
    }


    /**
     * This returns a generated link that will load the related help tab.
     *
     * @param string $help_tab_id the id for the connected help tab
     * @param string $icon_style  (optional) include css class for the style you want to use for the help icon.
     * @param string $help_text   (optional) send help text you want to use for the link if default not to be used
     * @return string              generated link
     * @uses EEH_Template::get_help_tab_link()
     */
    protected function _get_help_tab_link($help_tab_id, $icon_style = '', $help_text = '')
    {
        return EEH_Template::get_help_tab_link(
            $help_tab_id,
            $this->page_slug,
            $this->_req_action,
            $icon_style,
            $help_text
        );
    }


    /**
     * _add_help_tabs
     * Note child classes define their help tabs within the page_config array.
     *
     * @link   http://codex.wordpress.org/Function_Reference/add_help_tab
     * @return void
     * @throws DomainException
     * @throws EE_Error
     */
    protected function _add_help_tabs()
    {
        if (isset($this->_page_config[ $this->_req_action ])) {
            $config = $this->_page_config[ $this->_req_action ];
            // let's see if there is a help_sidebar set for the current route and we'll set that up for usage as well.
            if (is_array($config) && isset($config['help_sidebar'])) {
                // check that the callback given is valid
                if (! method_exists($this, $config['help_sidebar'])) {
                    throw new EE_Error(
                        sprintf(
                            esc_html__(
                                'The _page_config array has a callback set for the "help_sidebar" option.  However the callback given (%s) is not a valid callback.  Doublecheck the spelling and make sure this method exists for the class %s',
                                'event_espresso'
                            ),
                            $config['help_sidebar'],
                            get_class($this)
                        )
                    );
                }
                $content = apply_filters(
                    'FHEE__' . get_class($this) . '__add_help_tabs__help_sidebar',
                    $this->{$config['help_sidebar']}()
                );
                $this->_current_screen->set_help_sidebar($content);
            }
            if (! isset($config['help_tabs'])) {
                return;
            } //no help tabs for this route
            foreach ((array) $config['help_tabs'] as $tab_id => $cfg) {
                // we're here so there ARE help tabs!
                // make sure we've got what we need
                if (! isset($cfg['title'])) {
                    throw new EE_Error(
                        esc_html__(
                            'The _page_config array is not set up properly for help tabs.  It is missing a title',
                            'event_espresso'
                        )
                    );
                }
                if (! isset($cfg['filename']) && ! isset($cfg['callback']) && ! isset($cfg['content'])) {
                    throw new EE_Error(
                        esc_html__(
                            'The _page_config array is not setup properly for help tabs. It is missing a either a filename reference, or a callback reference or a content reference so there is no way to know the content for the help tab',
                            'event_espresso'
                        )
                    );
                }
                // first priority goes to content.
                if (! empty($cfg['content'])) {
                    $content = ! empty($cfg['content']) ? $cfg['content'] : null;
                    // second priority goes to filename
                } elseif (! empty($cfg['filename'])) {
                    $file_path = $this->_get_dir() . '/help_tabs/' . $cfg['filename'] . '.help_tab.php';
                    // it's possible that the file is located on decaf route (and above sets up for caf route, if this is the case then lets check decaf route too)
                    $file_path = ! is_readable($file_path) ? EE_ADMIN_PAGES
                                                             . basename($this->_get_dir())
                                                             . '/help_tabs/'
                                                             . $cfg['filename']
                                                             . '.help_tab.php' : $file_path;
                    // if file is STILL not readable then let's do a EE_Error so its more graceful than a fatal error.
                    if (! isset($cfg['callback']) && ! is_readable($file_path)) {
                        EE_Error::add_error(
                            sprintf(
                                esc_html__(
                                    'The filename given for the help tab %s is not a valid file and there is no other configuration for the tab content.  Please check that the string you set for the help tab on this route (%s) is the correct spelling.  The file should be in %s',
                                    'event_espresso'
                                ),
                                $tab_id,
                                key($config),
                                $file_path
                            ),
                            __FILE__,
                            __FUNCTION__,
                            __LINE__
                        );
                        return;
                    }
                    $template_args['admin_page_obj'] = $this;
                    $content                         = EEH_Template::display_template(
                        $file_path,
                        $template_args,
                        true
                    );
                } else {
                    $content = '';
                }
                // check if callback is valid
                if (
                    empty($content)
                    && (
                        ! isset($cfg['callback']) || ! method_exists($this, $cfg['callback'])
                    )
                ) {
                    EE_Error::add_error(
                        sprintf(
                            esc_html__(
                                'The callback given for a %s help tab on this page does not content OR a corresponding method for generating the content.  Check the spelling or make sure the method is present.',
                                'event_espresso'
                            ),
                            $cfg['title']
                        ),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                    return;
                }
                // setup config array for help tab method
                $id  = $this->page_slug . '-' . $this->_req_action . '-' . $tab_id;
                $_ht = [
                    'id'       => $id,
                    'title'    => $cfg['title'],
                    'callback' => isset($cfg['callback']) && empty($content) ? [$this, $cfg['callback']] : null,
                    'content'  => $content,
                ];
                $this->_current_screen->add_help_tab($_ht);
            }
        }
    }


    /**
     * This simply sets up any qtips that have been defined in the page config
     *
     * @return void
     */
    protected function _add_qtips()
    {
        if (isset($this->_route_config['qtips'])) {
            $qtips = (array) $this->_route_config['qtips'];
            // load qtip loader
            $path = [
                $this->_get_dir() . '/qtips/',
                EE_ADMIN_PAGES . basename($this->_get_dir()) . '/qtips/',
            ];
            EEH_Qtip_Loader::instance()->register($qtips, $path);
        }
    }


    /**
     * _set_nav_tabs
     * This sets up the nav tabs from the page_routes array.  This method can be overwritten by child classes if you
     * wish to add additional tabs or modify accordingly.
     *
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    protected function _set_nav_tabs()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $i = 0;
        foreach ($this->_page_config as $slug => $config) {
            if (! is_array($config) || empty($config['nav'])) {
                continue;
            }
            // no nav tab for this config
            // check for persistent flag
            if ($slug !== $this->_req_action && isset($config['nav']['persistent']) && ! $config['nav']['persistent']) {
                // nav tab is only to appear when route requested.
                continue;
            }
            if (! $this->check_user_access($slug, true)) {
                // no nav tab because current user does not have access.
                continue;
            }
            $css_class                = isset($config['css_class']) ? $config['css_class'] . ' ' : '';
            $this->_nav_tabs[ $slug ] = [
                'url'       => isset($config['nav']['url'])
                    ? $config['nav']['url']
                    : self::add_query_args_and_nonce(
                        ['action' => $slug],
                        $this->_admin_base_url
                    ),
                'link_text' => isset($config['nav']['label'])
                    ? $config['nav']['label']
                    : ucwords(
                        str_replace('_', ' ', $slug)
                    ),
                'css_class' => $this->_req_action === $slug ? $css_class . 'nav-tab-active' : $css_class,
                'order'     => isset($config['nav']['order']) ? $config['nav']['order'] : $i,
            ];
            $i++;
        }
        // if $this->_nav_tabs is empty then lets set the default
        if (empty($this->_nav_tabs)) {
            $this->_nav_tabs[ $this->_default_nav_tab_name ] = [
                'url'       => $this->_admin_base_url,
                'link_text' => ucwords(str_replace('_', ' ', $this->_default_nav_tab_name)),
                'css_class' => 'nav-tab-active',
                'order'     => 10,
            ];
        }
        // now let's sort the tabs according to order
        usort($this->_nav_tabs, [$this, '_sort_nav_tabs']);
    }


    /**
     * _set_current_labels
     * This method modifies the _labels property with any optional specific labels indicated in the _page_routes
     * property array
     *
     * @return void
     */
    private function _set_current_labels()
    {
        if (is_array($this->_route_config) && isset($this->_route_config['labels'])) {
            foreach ($this->_route_config['labels'] as $label => $text) {
                if (is_array($text)) {
                    foreach ($text as $sublabel => $subtext) {
                        $this->_labels[ $label ][ $sublabel ] = $subtext;
                    }
                } else {
                    $this->_labels[ $label ] = $text;
                }
            }
        }
    }


    /**
     *        verifies user access for this admin page
     *
     * @param string $route_to_check if present then the capability for the route matching this string is checked.
     * @param bool   $verify_only    Default is FALSE which means if user check fails then wp_die().  Otherwise just
     *                               return false if verify fail.
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function check_user_access($route_to_check = '', $verify_only = false)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $route_to_check = empty($route_to_check) ? $this->_req_action : $route_to_check;
        $capability     = ! empty($route_to_check) && isset($this->_page_routes[ $route_to_check ])
                          && is_array(
                              $this->_page_routes[ $route_to_check ]
                          )
                          && ! empty($this->_page_routes[ $route_to_check ]['capability'])
            ? $this->_page_routes[ $route_to_check ]['capability'] : null;
        if (empty($capability) && empty($route_to_check)) {
            $capability = is_array($this->_route) && empty($this->_route['capability']) ? 'manage_options'
                : $this->_route['capability'];
        } else {
            $capability = empty($capability) ? 'manage_options' : $capability;
        }
        $id = is_array($this->_route) && ! empty($this->_route['obj_id']) ? $this->_route['obj_id'] : 0;
        if (
            ! $this->request->isAjax()
            && (
                ! function_exists('is_admin')
                || ! EE_Registry::instance()->CAP->current_user_can(
                    $capability,
                    $this->page_slug
                    . '_'
                    . $route_to_check,
                    $id
                )
            )
        ) {
            if ($verify_only) {
                return false;
            }
            if (is_user_logged_in()) {
                wp_die(esc_html__('You do not have access to this route.', 'event_espresso'));
            } else {
                return false;
            }
        }
        return true;
    }


    /**
     * admin_init_global
     * This runs all the code that we want executed within the WP admin_init hook.
     * This method executes for ALL EE Admin pages.
     *
     * @return void
     */
    public function admin_init_global()
    {
    }


    /**
     * wp_loaded_global
     * This runs all the code that we want executed within the WP wp_loaded hook.  This method is optional for an
     * EE_Admin page and will execute on every EE Admin Page load
     *
     * @return void
     */
    public function wp_loaded()
    {
    }


    /**
     * admin_notices
     * Anything triggered by the 'admin_notices' WP hook should be put in here.  This particular method will apply on
     * ALL EE_Admin pages.
     *
     * @return void
     */
    public function admin_notices_global()
    {
        $this->_display_no_javascript_warning();
        $this->_display_espresso_notices();
    }


    public function network_admin_notices_global()
    {
        $this->_display_no_javascript_warning();
        $this->_display_espresso_notices();
    }


    /**
     * admin_footer_scripts_global
     * Anything triggered by the 'admin_print_footer_scripts' WP hook should be put in here. This particular method
     * will apply on ALL EE_Admin pages.
     *
     * @return void
     */
    public function admin_footer_scripts_global()
    {
        $this->_add_admin_page_ajax_loading_img();
        $this->_add_admin_page_overlay();
        // if metaboxes are present we need to add the nonce field
        if (
            isset($this->_route_config['metaboxes'])
            || isset($this->_route_config['list_table'])
            || (isset($this->_route_config['has_metaboxes']) && $this->_route_config['has_metaboxes'])
        ) {
            wp_nonce_field('closedpostboxes', 'closedpostboxesnonce', false);
            wp_nonce_field('meta-box-order', 'meta-box-order-nonce', false);
        }
    }


    /**
     * admin_footer_global
     * Anything triggered by the wp 'admin_footer' wp hook should be put in here. This particular method will apply on
     * ALL EE_Admin Pages.
     *
     * @return void
     */
    public function admin_footer_global()
    {
        // dialog container for dialog helper
        echo '
        <div class="ee-admin-dialog-container auto-hide hidden">
            <div class="ee-notices"></div>
            <div class="ee-admin-dialog-container-inner-content"></div>
        </div>
        ';

        // current set timezone for timezone js
        echo '<span id="current_timezone" class="hidden">' . esc_html(EEH_DTT_Helper::get_timezone()) . '</span>';
    }


    /**
     * This function sees if there is a method for help popup content existing for the given route.  If there is then
     * we'll use the retrieved array to output the content using the template. For child classes: If you want to have
     * help popups then in your templates or your content you set "triggers" for the content using the
     * "_set_help_trigger('help_trigger_id')" where "help_trigger_id" is what you will use later in your custom method
     * for the help popup content on that page. Then in your Child_Admin_Page class you need to define a help popup
     * method for the content in the format "_help_popup_content_{route_name}()"  So if you are setting help content
     * for the
     * 'edit_event' route you should have a method named "_help_popup_content_edit_route". In your defined
     * "help_popup_content_..." method.  You must prepare and return an array in the following format array(
     *    'help_trigger_id' => array(
     *        'title' => esc_html__('localized title for popup', 'event_espresso'),
     *        'content' => esc_html__('localized content for popup', 'event_espresso')
     *    )
     * );
     * Then the EE_Admin_Parent will take care of making sure that is setup properly on the correct route.
     *
     * @param array $help_array
     * @param bool  $display
     * @return string content
     * @throws DomainException
     * @throws EE_Error
     */
    protected function _set_help_popup_content($help_array = [], $display = false)
    {
        $content    = '';
        $help_array = empty($help_array) ? $this->_get_help_content() : $help_array;
        // loop through the array and setup content
        foreach ($help_array as $trigger => $help) {
            // make sure the array is setup properly
            if (! isset($help['title']) || ! isset($help['content'])) {
                throw new EE_Error(
                    esc_html__(
                        'Does not look like the popup content array has been setup correctly.  Might want to double check that.  Read the comments for the _get_help_popup_content method found in "EE_Admin_Page" class',
                        'event_espresso'
                    )
                );
            }
            // we're good so let's setup the template vars and then assign parsed template content to our content.
            $template_args = [
                'help_popup_id'      => $trigger,
                'help_popup_title'   => $help['title'],
                'help_popup_content' => $help['content'],
            ];
            $content       .= EEH_Template::display_template(
                EE_ADMIN_TEMPLATE . 'admin_help_popup.template.php',
                $template_args,
                true
            );
        }
        if ($display) {
            echo wp_kses($content, AllowedTags::getWithFormTags());
            return '';
        }
        return $content;
    }


    /**
     * All this does is retrieve the help content array if set by the EE_Admin_Page child
     *
     * @return array properly formatted array for help popup content
     * @throws EE_Error
     */
    private function _get_help_content()
    {
        // what is the method we're looking for?
        $method_name = '_help_popup_content_' . $this->_req_action;
        // if method doesn't exist let's get out.
        if (! method_exists($this, $method_name)) {
            return [];
        }
        // k we're good to go let's retrieve the help array
        $help_array = call_user_func([$this, $method_name]);
        // make sure we've got an array!
        if (! is_array($help_array)) {
            throw new EE_Error(
                esc_html__(
                    'Something went wrong with help popup content generation. Expecting an array and well, this ain\'t no array bub.',
                    'event_espresso'
                )
            );
        }
        return $help_array;
    }


    /**
     * EE Admin Pages can use this to set a properly formatted trigger for a help popup.
     * By default the trigger html is printed.  Otherwise it can be returned if the $display flag is set "false"
     * See comments made on the _set_help_content method for understanding other parts to the help popup tool.
     *
     * @param string  $trigger_id reference for retrieving the trigger content for the popup
     * @param boolean $display    if false then we return the trigger string
     * @param array   $dimensions an array of dimensions for the box (array(h,w))
     * @return string
     * @throws DomainException
     * @throws EE_Error
     */
    protected function _set_help_trigger($trigger_id, $display = true, $dimensions = ['400', '640'])
    {
        if ($this->request->isAjax()) {
            return '';
        }
        // let's check and see if there is any content set for this popup.  If there isn't then we'll include a default title and content so that developers know something needs to be corrected
        $help_array   = $this->_get_help_content();
        $help_content = '';
        if (empty($help_array) || ! isset($help_array[ $trigger_id ])) {
            $help_array[ $trigger_id ] = [
                'title'   => esc_html__('Missing Content', 'event_espresso'),
                'content' => esc_html__(
                    'A trigger has been set that doesn\'t have any corresponding content. Make sure you have set the help content. (see the "_set_help_popup_content" method in the EE_Admin_Page for instructions.)',
                    'event_espresso'
                ),
            ];
            $help_content              = $this->_set_help_popup_content($help_array);
        }
        // let's setup the trigger
        $content = '<a class="ee-dialog" href="?height='
                   . esc_attr($dimensions[0])
                   . '&width='
                   . esc_attr($dimensions[1])
                   . '&inlineId='
                   . esc_attr($trigger_id)
                   . '" target="_blank"><span class="question ee-help-popup-question"></span></a>';
        $content .= $help_content;
        if ($display) {
            echo wp_kses($content, AllowedTags::getWithFormTags());
            return '';
        }
        return $content;
    }


    /**
     * _add_global_screen_options
     * Add any extra wp_screen_options within this method using built-in WP functions/methods for doing so.
     * This particular method will add_screen_options on ALL EE_Admin Pages
     *
     * @link   http://chrismarslender.com/wp-tutorials/wordpress-screen-options-tutorial/
     *         see also WP_Screen object documents...
     * @link   http://codex.wordpress.org/Class_Reference/WP_Screen
     * @abstract
     * @return void
     */
    private function _add_global_screen_options()
    {
    }


    /**
     * _add_global_feature_pointers
     * This method is used for implementing any "feature pointers" (using built-in WP styling js).
     * This particular method will implement feature pointers for ALL EE_Admin pages.
     * Note: this is just a placeholder for now.  Implementation will come down the road
     *
     * @see    WP_Internal_Pointers class in wp-admin/includes/template.php for example (its a final class so can't be
     *         extended) also see:
     * @link   http://eamann.com/tech/wordpress-portland/
     * @abstract
     * @return void
     */
    private function _add_global_feature_pointers()
    {
    }


    /**
     * load_global_scripts_styles
     * The scripts and styles enqueued in here will be loaded on every EE Admin page
     *
     * @return void
     */
    public function load_global_scripts_styles()
    {
        /** STYLES **/
        // add debugging styles
        if (WP_DEBUG) {
            add_action('admin_head', [$this, 'add_xdebug_style']);
        }
        // register all styles
        wp_register_style(
            'espresso-ui-theme',
            EE_GLOBAL_ASSETS_URL . 'css/espresso-ui-theme/jquery-ui-1.10.3.custom.min.css',
            [],
            EVENT_ESPRESSO_VERSION
        );
        wp_register_style('ee-admin-css', EE_ADMIN_URL . 'assets/ee-admin-page.css', [], EVENT_ESPRESSO_VERSION);
        // helpers styles
        wp_register_style(
            'ee-text-links',
            EE_PLUGIN_DIR_URL . 'core/helpers/assets/ee_text_list_helper.css',
            [],
            EVENT_ESPRESSO_VERSION
        );
        /** SCRIPTS **/
        // register all scripts
        wp_register_script(
            'ee-dialog',
            EE_ADMIN_URL . 'assets/ee-dialog-helper.js',
            ['jquery', 'jquery-ui-draggable'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_register_script(
            'ee_admin_js',
            EE_ADMIN_URL . 'assets/ee-admin-page.js',
            ['espresso_core', 'ee-parse-uri', 'ee-dialog'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_register_script(
            'jquery-ui-timepicker-addon',
            EE_GLOBAL_ASSETS_URL . 'scripts/jquery-ui-timepicker-addon.js',
            ['jquery-ui-datepicker', 'jquery-ui-slider'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        // script for sorting tables
        wp_register_script(
            'espresso_ajax_table_sorting',
            EE_ADMIN_URL . 'assets/espresso_ajax_table_sorting.js',
            ['ee_admin_js', 'jquery-ui-sortable'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        // script for parsing uri's
        wp_register_script(
            'ee-parse-uri',
            EE_GLOBAL_ASSETS_URL . 'scripts/parseuri.js',
            [],
            EVENT_ESPRESSO_VERSION,
            true
        );
        // and parsing associative serialized form elements
        wp_register_script(
            'ee-serialize-full-array',
            EE_GLOBAL_ASSETS_URL . 'scripts/jquery.serializefullarray.js',
            ['jquery'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        // helpers scripts
        wp_register_script(
            'ee-text-links',
            EE_PLUGIN_DIR_URL . 'core/helpers/assets/ee_text_list_helper.js',
            ['jquery'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_register_script(
            'ee-moment-core',
            EE_GLOBAL_ASSETS_URL . 'moment/moment-with-locales.min.js',
            [],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_register_script(
            'ee-moment',
            EE_GLOBAL_ASSETS_URL . 'moment/moment-timezone-with-data.min.js',
            ['ee-moment-core'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_register_script(
            'ee-datepicker',
            EE_ADMIN_URL . 'assets/ee-datepicker.js',
            ['jquery-ui-timepicker-addon', 'ee-moment'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        // google charts
        wp_register_script(
            'google-charts',
            'https://www.gstatic.com/charts/loader.js',
            [],
            EVENT_ESPRESSO_VERSION
        );
        // ENQUEUE ALL BASICS BY DEFAULT
        wp_enqueue_style('ee-admin-css');
        wp_enqueue_script('ee_admin_js');
        wp_enqueue_script('ee-accounting');
        wp_enqueue_script('jquery-validate');
        // taking care of metaboxes
        if (
            empty($this->_cpt_route)
            && (isset($this->_route_config['metaboxes']) || isset($this->_route_config['has_metaboxes']))
        ) {
            wp_enqueue_script('dashboard');
        }
        // LOCALIZED DATA
        // localize script for ajax lazy loading
        $lazy_loader_container_ids = apply_filters(
            'FHEE__EE_Admin_Page_Core__load_global_scripts_styles__loader_containers',
            ['espresso_news_post_box_content']
        );
        wp_localize_script('ee_admin_js', 'eeLazyLoadingContainers', $lazy_loader_container_ids);
        add_filter(
            'admin_body_class',
            function ($classes) {
                if (strpos($classes, 'espresso-admin') === false) {
                    $classes .= ' espresso-admin';
                }
                return $classes;
            }
        );
    }


    /**
     *        admin_footer_scripts_eei18n_js_strings
     *
     * @return        void
     */
    public function admin_footer_scripts_eei18n_js_strings()
    {
        EE_Registry::$i18n_js_strings['ajax_url']       = WP_AJAX_URL;
        EE_Registry::$i18n_js_strings['confirm_delete'] = wp_strip_all_tags(
            __(
                'Are you absolutely sure you want to delete this item?\nThis action will delete ALL DATA associated with this item!!!\nThis can NOT be undone!!!',
                'event_espresso'
            )
        );
        EE_Registry::$i18n_js_strings['January']        = wp_strip_all_tags(__('January', 'event_espresso'));
        EE_Registry::$i18n_js_strings['February']       = wp_strip_all_tags(__('February', 'event_espresso'));
        EE_Registry::$i18n_js_strings['March']          = wp_strip_all_tags(__('March', 'event_espresso'));
        EE_Registry::$i18n_js_strings['April']          = wp_strip_all_tags(__('April', 'event_espresso'));
        EE_Registry::$i18n_js_strings['May']            = wp_strip_all_tags(__('May', 'event_espresso'));
        EE_Registry::$i18n_js_strings['June']           = wp_strip_all_tags(__('June', 'event_espresso'));
        EE_Registry::$i18n_js_strings['July']           = wp_strip_all_tags(__('July', 'event_espresso'));
        EE_Registry::$i18n_js_strings['August']         = wp_strip_all_tags(__('August', 'event_espresso'));
        EE_Registry::$i18n_js_strings['September']      = wp_strip_all_tags(__('September', 'event_espresso'));
        EE_Registry::$i18n_js_strings['October']        = wp_strip_all_tags(__('October', 'event_espresso'));
        EE_Registry::$i18n_js_strings['November']       = wp_strip_all_tags(__('November', 'event_espresso'));
        EE_Registry::$i18n_js_strings['December']       = wp_strip_all_tags(__('December', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Jan']            = wp_strip_all_tags(__('Jan', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Feb']            = wp_strip_all_tags(__('Feb', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Mar']            = wp_strip_all_tags(__('Mar', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Apr']            = wp_strip_all_tags(__('Apr', 'event_espresso'));
        EE_Registry::$i18n_js_strings['May']            = wp_strip_all_tags(__('May', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Jun']            = wp_strip_all_tags(__('Jun', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Jul']            = wp_strip_all_tags(__('Jul', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Aug']            = wp_strip_all_tags(__('Aug', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Sep']            = wp_strip_all_tags(__('Sep', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Oct']            = wp_strip_all_tags(__('Oct', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Nov']            = wp_strip_all_tags(__('Nov', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Dec']            = wp_strip_all_tags(__('Dec', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Sunday']         = wp_strip_all_tags(__('Sunday', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Monday']         = wp_strip_all_tags(__('Monday', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Tuesday']        = wp_strip_all_tags(__('Tuesday', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Wednesday']      = wp_strip_all_tags(__('Wednesday', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Thursday']       = wp_strip_all_tags(__('Thursday', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Friday']         = wp_strip_all_tags(__('Friday', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Saturday']       = wp_strip_all_tags(__('Saturday', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Sun']            = wp_strip_all_tags(__('Sun', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Mon']            = wp_strip_all_tags(__('Mon', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Tue']            = wp_strip_all_tags(__('Tue', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Wed']            = wp_strip_all_tags(__('Wed', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Thu']            = wp_strip_all_tags(__('Thu', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Fri']            = wp_strip_all_tags(__('Fri', 'event_espresso'));
        EE_Registry::$i18n_js_strings['Sat']            = wp_strip_all_tags(__('Sat', 'event_espresso'));
    }


    /**
     *        load enhanced xdebug styles for ppl with failing eyesight
     *
     * @return        void
     */
    public function add_xdebug_style()
    {
        echo '<style>.xdebug-error { font-size:1.5em; }</style>';
    }


    /************************/
    /** LIST TABLE METHODS **/
    /************************/
    /**
     * this sets up the list table if the current view requires it.
     *
     * @return void
     * @throws EE_Error
     */
    protected function _set_list_table()
    {
        // first is this a list_table view?
        if (! isset($this->_route_config['list_table'])) {
            return;
        } //not a list_table view so get out.
        // list table functions are per view specific (because some admin pages might have more than one list table!)
        $list_table_view = '_set_list_table_views_' . $this->_req_action;
        if (! method_exists($this, $list_table_view) || $this->{$list_table_view}() === false) {
            // user error msg
            $error_msg = esc_html__(
                'An error occurred. The requested list table views could not be found.',
                'event_espresso'
            );
            // developer error msg
            $error_msg .= '||'
                          . sprintf(
                              esc_html__(
                                  'List table views for "%s" route could not be setup. Check that you have the corresponding method, "%s" set up for defining list_table_views for this route.',
                                  'event_espresso'
                              ),
                              $this->_req_action,
                              $list_table_view
                          );
            throw new EE_Error($error_msg);
        }
        // let's provide the ability to filter the views per PAGE AND ROUTE, per PAGE, and globally
        $this->_views = apply_filters(
            'FHEE_list_table_views_' . $this->page_slug . '_' . $this->_req_action,
            $this->_views
        );
        $this->_views = apply_filters('FHEE_list_table_views_' . $this->page_slug, $this->_views);
        $this->_views = apply_filters('FHEE_list_table_views', $this->_views);
        $this->_set_list_table_view();
        $this->_set_list_table_object();
    }


    /**
     * set current view for List Table
     *
     * @return void
     */
    protected function _set_list_table_view()
    {
        $this->_view = isset($this->_views['in_use']) ? 'in_use' : 'all';
        $status = $this->request->getRequestParam('status', null, 'key');
        $this->_view = $status && array_key_exists($status, $this->_views)
            ? $status
            : $this->_view;
    }


    /**
     * _set_list_table_object
     * WP_List_Table objects need to be loaded fairly early so automatic stuff WP does is taken care of.
     *
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws InvalidInterfaceException
     */
    protected function _set_list_table_object()
    {
        if (isset($this->_route_config['list_table'])) {
            if (! class_exists($this->_route_config['list_table'])) {
                throw new EE_Error(
                    sprintf(
                        esc_html__(
                            'The %s class defined for the list table does not exist.  Please check the spelling of the class ref in the $_page_config property on %s.',
                            'event_espresso'
                        ),
                        $this->_route_config['list_table'],
                        get_class($this)
                    )
                );
            }
            $this->_list_table_object = $this->loader->getShared(
                $this->_route_config['list_table'],
                [$this]
            );
        }
    }


    /**
     * get_list_table_view_RLs - get it? View RL ?? VU-RL???  URL ??
     *
     * @param array $extra_query_args                     Optional. An array of extra query args to add to the generated
     *                                                    urls.  The array should be indexed by the view it is being
     *                                                    added to.
     * @return array
     */
    public function get_list_table_view_RLs($extra_query_args = [])
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        if (empty($this->_views)) {
            $this->_views = [];
        }
        // cycle thru views
        foreach ($this->_views as $key => $view) {
            $query_args = [];
            // check for current view
            $this->_views[ $key ]['class']               = $this->_view === $view['slug'] ? 'current' : '';
            $query_args['action']                        = $this->_req_action;
            $query_args[ $this->_req_action . '_nonce' ] = wp_create_nonce($query_args['action'] . '_nonce');
            $query_args['status']                        = $view['slug'];
            // merge any other arguments sent in.
            if (isset($extra_query_args[ $view['slug'] ])) {
                $query_args = array_merge($query_args, $extra_query_args[ $view['slug'] ]);
            }
            $this->_views[ $key ]['url'] = EE_Admin_Page::add_query_args_and_nonce($query_args, $this->_admin_base_url);
        }
        return $this->_views;
    }


    /**
     * _entries_per_page_dropdown
     * generates a dropdown box for selecting the number of visible rows in an admin page list table
     *
     * @param int $max_entries total number of rows in the table
     * @return string
     * @todo   : Note: ideally this should be added to the screen options dropdown as that would be consistent with how
     *         WP does it.
     */
    protected function _entries_per_page_dropdown($max_entries = 0)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $values   = [10, 25, 50, 100];
        $per_page = $this->request->getRequestParam('per_page', 10, 'int');
        if ($max_entries) {
            $values[] = $max_entries;
            sort($values);
        }
        $entries_per_page_dropdown = '
			<div id="entries-per-page-dv" class="alignleft actions">
				<label class="hide-if-no-js">
					Show
					<select id="entries-per-page-slct" name="entries-per-page-slct">';
        foreach ($values as $value) {
            if ($value < $max_entries) {
                $selected                  = $value === $per_page ? ' selected="' . $per_page . '"' : '';
                $entries_per_page_dropdown .= '
						<option value="' . $value . '"' . $selected . '>' . $value . '&nbsp;&nbsp;</option>';
            }
        }
        $selected                  = $max_entries === $per_page ? ' selected="' . $per_page . '"' : '';
        $entries_per_page_dropdown .= '
						<option value="' . $max_entries . '"' . $selected . '>All&nbsp;&nbsp;</option>';
        $entries_per_page_dropdown .= '
					</select>
					entries
				</label>
				<input id="entries-per-page-btn" class="button-secondary" type="submit" value="Go" >
			</div>
		';
        return $entries_per_page_dropdown;
    }


    /**
     *        _set_search_attributes
     *
     * @return        void
     */
    public function _set_search_attributes()
    {
        $this->_template_args['search']['btn_label'] = sprintf(
            esc_html__('Search %s', 'event_espresso'),
            empty($this->_search_btn_label) ? $this->page_label
                : $this->_search_btn_label
        );
        $this->_template_args['search']['callback']  = 'search_' . $this->page_slug;
    }



    /*** END LIST TABLE METHODS **/


    /**
     * _add_registered_metaboxes
     *  this loads any registered metaboxes via the 'metaboxes' index in the _page_config property array.
     *
     * @link   http://codex.wordpress.org/Function_Reference/add_meta_box
     * @return void
     * @throws EE_Error
     */
    private function _add_registered_meta_boxes()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        // we only add meta boxes if the page_route calls for it
        if (
            is_array($this->_route_config) && isset($this->_route_config['metaboxes'])
            && is_array(
                $this->_route_config['metaboxes']
            )
        ) {
            // this simply loops through the callbacks provided
            // and checks if there is a corresponding callback registered by the child
            // if there is then we go ahead and process the metabox loader.
            foreach ($this->_route_config['metaboxes'] as $metabox_callback) {
                // first check for Closures
                if ($metabox_callback instanceof Closure) {
                    $result = $metabox_callback();
                } elseif (is_array($metabox_callback) && isset($metabox_callback[0], $metabox_callback[1])) {
                    $result = call_user_func([$metabox_callback[0], $metabox_callback[1]]);
                } else {
                    $result = call_user_func([$this, &$metabox_callback]);
                }
                if ($result === false) {
                    // user error msg
                    $error_msg = esc_html__(
                        'An error occurred. The  requested metabox could not be found.',
                        'event_espresso'
                    );
                    // developer error msg
                    $error_msg .= '||'
                                  . sprintf(
                                      esc_html__(
                                          'The metabox with the string "%s" could not be called. Check that the spelling for method names and actions in the "_page_config[\'metaboxes\']" array are all correct.',
                                          'event_espresso'
                                      ),
                                      $metabox_callback
                                  );
                    throw new EE_Error($error_msg);
                }
            }
        }
    }


    /**
     * _add_screen_columns
     * This will check the _page_config array and if there is "columns" key index indicated, we'll set the template as
     * the dynamic column template and we'll setup the column options for the page.
     *
     * @return void
     */
    private function _add_screen_columns()
    {
        if (
            is_array($this->_route_config)
            && isset($this->_route_config['columns'])
            && is_array($this->_route_config['columns'])
            && count($this->_route_config['columns']) === 2
        ) {
            add_screen_option(
                'layout_columns',
                [
                    'max'     => (int) $this->_route_config['columns'][0],
                    'default' => (int) $this->_route_config['columns'][1],
                ]
            );
            $this->_template_args['num_columns']                 = $this->_route_config['columns'][0];
            $screen_id                                           = $this->_current_screen->id;
            $screen_columns                                      = (int) get_user_option("screen_layout_{$screen_id}");
            $total_columns                                       = ! empty($screen_columns)
                ? $screen_columns
                : $this->_route_config['columns'][1];
            $this->_template_args['current_screen_widget_class'] = 'columns-' . $total_columns;
            $this->_template_args['current_page']                = $this->_wp_page_slug;
            $this->_template_args['screen']                      = $this->_current_screen;
            $this->_column_template_path                         = EE_ADMIN_TEMPLATE
                                                                   . 'admin_details_metabox_column_wrapper.template.php';
            // finally if we don't have has_metaboxes set in the route config
            // let's make sure it IS set other wise the necessary hidden fields for this won't be loaded.
            $this->_route_config['has_metaboxes'] = true;
        }
    }



    /** GLOBALLY AVAILABLE METABOXES **/


    /**
     * In this section we put any globally available EE metaboxes for all EE Admin pages.  They are called by simply
     * referencing the callback in the _page_config array property.  This way you can be very specific about what pages
     * these get loaded on.
     */
    private function _espresso_news_post_box()
    {
        $news_box_title = apply_filters(
            'FHEE__EE_Admin_Page___espresso_news_post_box__news_box_title',
            esc_html__('New @ Event Espresso', 'event_espresso')
        );
        add_meta_box(
            'espresso_news_post_box',
            $news_box_title,
            [
                $this,
                'espresso_news_post_box',
            ],
            $this->_wp_page_slug,
            'side'
        );
    }


    /**
     * Code for setting up espresso ratings request metabox.
     */
    protected function _espresso_ratings_request()
    {
        if (! apply_filters('FHEE_show_ratings_request_meta_box', true)) {
            return;
        }
        $ratings_box_title = apply_filters(
            'FHEE__EE_Admin_Page___espresso_news_post_box__news_box_title',
            esc_html__('Keep Event Espresso Decaf Free', 'event_espresso')
        );
        add_meta_box(
            'espresso_ratings_request',
            $ratings_box_title,
            [
                $this,
                'espresso_ratings_request',
            ],
            $this->_wp_page_slug,
            'side'
        );
    }


    /**
     * Code for setting up espresso ratings request metabox content.
     *
     * @throws DomainException
     */
    public function espresso_ratings_request()
    {
        EEH_Template::display_template(
            EE_ADMIN_TEMPLATE . 'espresso_ratings_request_content.template.php',
            []
        );
    }


    public static function cached_rss_display($rss_id, $url)
    {
        $loading   = '<p class="widget-loading hide-if-no-js">'
                     . esc_html__('Loading&#8230;', 'event_espresso')
                     . '</p><p class="hide-if-js">'
                     . esc_html__('This widget requires JavaScript.', 'event_espresso')
                     . '</p>';
        $pre       = '<div class="espresso-rss-display">' . "\n\t";
        $pre       .= '<span id="' . esc_attr($rss_id) . '_url" class="hidden">' . esc_url_raw($url) . '</span>';
        $post      = '</div>' . "\n";
        $cache_key = 'ee_rss_' . md5($rss_id);
        $output    = get_transient($cache_key);
        if ($output !== false) {
            echo wp_kses($pre . $output . $post, AllowedTags::getWithFormTags());
            return true;
        }
        if (! (defined('DOING_AJAX') && DOING_AJAX)) {
            echo wp_kses($pre . $loading . $post, AllowedTags::getWithFormTags());
            return false;
        }
        ob_start();
        wp_widget_rss_output($url, ['show_date' => 0, 'items' => 5]);
        set_transient($cache_key, ob_get_flush(), 12 * HOUR_IN_SECONDS);
        return true;
    }


    public function espresso_news_post_box()
    {
        ?>
        <div class="padding">
            <div id="espresso_news_post_box_content" class="infolinks">
                <?php
                // Get RSS Feed(s)
                self::cached_rss_display(
                    'espresso_news_post_box_content',
                    esc_url_raw(
                        apply_filters(
                            'FHEE__EE_Admin_Page__espresso_news_post_box__feed_url',
                            'https://eventespresso.com/feed/'
                        )
                    )
                );
                ?>
            </div>
            <?php do_action('AHEE__EE_Admin_Page__espresso_news_post_box__after_content'); ?>
        </div>
        <?php
    }


    private function _espresso_links_post_box()
    {
        // Hiding until we actually have content to put in here...
        // add_meta_box('espresso_links_post_box', esc_html__('Helpful Plugin Links', 'event_espresso'), array( $this, 'espresso_links_post_box'), $this->_wp_page_slug, 'side');
    }


    public function espresso_links_post_box()
    {
        // Hiding until we actually have content to put in here...
        // EEH_Template::display_template(
        //     EE_ADMIN_TEMPLATE . 'admin_general_metabox_contents_espresso_links.template.php'
        // );
    }


    protected function _espresso_sponsors_post_box()
    {
        if (apply_filters('FHEE_show_sponsors_meta_box', true)) {
            add_meta_box(
                'espresso_sponsors_post_box',
                esc_html__('Event Espresso Highlights', 'event_espresso'),
                [$this, 'espresso_sponsors_post_box'],
                $this->_wp_page_slug,
                'side'
            );
        }
    }


    public function espresso_sponsors_post_box()
    {
        EEH_Template::display_template(
            EE_ADMIN_TEMPLATE . 'admin_general_metabox_contents_espresso_sponsors.template.php'
        );
    }


    private function _publish_post_box()
    {
        $meta_box_ref = 'espresso_' . $this->page_slug . '_editor_overview';
        // if there is a array('label' => array('publishbox' => 'some title') ) present in the _page_config array
        // then we'll use that for the metabox label.
        // Otherwise we'll just use publish (publishbox itself could be an array of labels indexed by routes)
        if (! empty($this->_labels['publishbox'])) {
            $box_label = is_array($this->_labels['publishbox']) ? $this->_labels['publishbox'][ $this->_req_action ]
                : $this->_labels['publishbox'];
        } else {
            $box_label = esc_html__('Publish', 'event_espresso');
        }
        $box_label = apply_filters(
            'FHEE__EE_Admin_Page___publish_post_box__box_label',
            $box_label,
            $this->_req_action,
            $this
        );
        add_meta_box(
            $meta_box_ref,
            $box_label,
            [$this, 'editor_overview'],
            $this->_current_screen->id,
            'side',
            'high'
        );
    }


    public function editor_overview()
    {
        // if we have extra content set let's add it in if not make sure its empty
        $this->_template_args['publish_box_extra_content'] = isset($this->_template_args['publish_box_extra_content'])
            ? $this->_template_args['publish_box_extra_content']
            : '';
        echo EEH_Template::display_template(
            EE_ADMIN_TEMPLATE . 'admin_details_publish_metabox.template.php',
            $this->_template_args,
            true
        );
    }


    /** end of globally available metaboxes section **/


    /**
     * Public wrapper for the protected method.  Allows plugins/addons to externally call the
     * protected method.
     *
     * @param string $name
     * @param int    $id
     * @param bool   $delete
     * @param string $save_close_redirect_URL
     * @param bool   $both_btns
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @see   $this->_set_publish_post_box_vars for param details
     * @since 4.6.0
     */
    public function set_publish_post_box_vars(
        $name = '',
        $id = 0,
        $delete = false,
        $save_close_redirect_URL = '',
        $both_btns = true
    ) {
        $this->_set_publish_post_box_vars(
            $name,
            $id,
            $delete,
            $save_close_redirect_URL,
            $both_btns
        );
    }


    /**
     * Sets the _template_args arguments used by the _publish_post_box shortcut
     * Note: currently there is no validation for this.  However if you want the delete button, the
     * save, and save and close buttons to work properly, then you will want to include a
     * values for the name and id arguments.
     *
     * @param string  $name                       key used for the action ID (i.e. event_id)
     * @param int     $id                         id attached to the item published
     * @param string  $delete                     page route callback for the delete action
     * @param string  $save_close_redirect_URL    custom URL to redirect to after Save & Close has been completed
     * @param boolean $both_btns                  whether to display BOTH the "Save & Close" and "Save" buttons or just
     *                                            the Save button
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @todo  Add in validation for name/id arguments.
     */
    protected function _set_publish_post_box_vars(
        $name = '',
        $id = 0,
        $delete = '',
        $save_close_redirect_URL = '',
        $both_btns = true
    ) {
        // if Save & Close, use a custom redirect URL or default to the main page?
        $save_close_redirect_URL = ! empty($save_close_redirect_URL)
            ? $save_close_redirect_URL
            : $this->_admin_base_url;
        // create the Save & Close and Save buttons
        $this->_set_save_buttons($both_btns, [], [], $save_close_redirect_URL);
        // if we have extra content set let's add it in if not make sure its empty
        $this->_template_args['publish_box_extra_content'] = isset($this->_template_args['publish_box_extra_content'])
            ? $this->_template_args['publish_box_extra_content']
            : '';
        if ($delete && ! empty($id)) {
            // make sure we have a default if just true is sent.
            $delete           = ! empty($delete) ? $delete : 'delete';
            $delete_link_args = [$name => $id];
            $delete           = $this->get_action_link_or_button(
                $delete,
                $delete,
                $delete_link_args,
                'submitdelete deletion',
                '',
                false
            );
        }
        $this->_template_args['publish_delete_link'] = ! empty($id) ? $delete : '';
        if (! empty($name) && ! empty($id)) {
            $hidden_field_arr[ $name ] = [
                'type'  => 'hidden',
                'value' => $id,
            ];
            $hf                        = $this->_generate_admin_form_fields($hidden_field_arr, 'array');
        } else {
            $hf = '';
        }
        // add hidden field
        $this->_template_args['publish_hidden_fields'] = is_array($hf) && ! empty($name)
            ? $hf[ $name ]['field']
            : $hf;
    }


    /**
     * displays an error message to ppl who have javascript disabled
     *
     * @return void
     */
    private function _display_no_javascript_warning()
    {
        ?>
        <noscript>
            <div id="no-js-message" class="error">
                <p style="font-size:1.3em;">
                    <span style="color:red;"><?php esc_html_e('Warning!', 'event_espresso'); ?></span>
                    <?php esc_html_e(
                        'Javascript is currently turned off for your browser. Javascript must be enabled in order for all of the features on this page to function properly. Please turn your javascript back on.',
                        'event_espresso'
                    ); ?>
                </p>
            </div>
        </noscript>
        <?php
    }


    /**
     * displays espresso success and/or error notices
     *
     * @return void
     */
    protected function _display_espresso_notices()
    {
        $notices = $this->_get_transient(true);
        echo wp_kses(stripslashes($notices), AllowedTags::getWithFormTags());
    }


    /**
     * spinny things pacify the masses
     *
     * @return void
     */
    protected function _add_admin_page_ajax_loading_img()
    {
        ?>
        <div id="espresso-ajax-loading" class="ajax-loading-grey">
            <span class="ee-spinner ee-spin"></span><span class="hidden"><?php
                esc_html_e('loading...', 'event_espresso'); ?></span>
        </div>
        <?php
    }


    /**
     * add admin page overlay for modal boxes
     *
     * @return void
     */
    protected function _add_admin_page_overlay()
    {
        ?>
        <div id="espresso-admin-page-overlay-dv" class=""></div>
        <?php
    }


    /**
     * facade for add_meta_box
     *
     * @param string  $action        where the metabox gets displayed
     * @param string  $title         Title of Metabox (output in metabox header)
     * @param string  $callback      If not empty and $create_fun is set to false then we'll use a custom callback
     *                               instead of the one created in here.
     * @param array   $callback_args an array of args supplied for the metabox
     * @param string  $column        what metabox column
     * @param string  $priority      give this metabox a priority (using accepted priorities for wp meta boxes)
     * @param boolean $create_func   default is true.  Basically we can say we don't WANT to have the runtime function
     *                               created but just set our own callback for wp's add_meta_box.
     * @throws DomainException
     */
    public function _add_admin_page_meta_box(
        $action,
        $title,
        $callback,
        $callback_args,
        $column = 'normal',
        $priority = 'high',
        $create_func = true
    ) {
        do_action('AHEE_log', __FILE__, __FUNCTION__, $callback);
        // if we have empty callback args and we want to automatically create the metabox callback then we need to make sure the callback args are generated.
        if (empty($callback_args) && $create_func) {
            $callback_args = [
                'template_path' => $this->_template_path,
                'template_args' => $this->_template_args,
            ];
        }
        // if $create_func is true (default) then we automatically create the function for displaying the actual meta box.  If false then we take the $callback reference passed through and use it instead (so callers can define their own callback function/method if they wish)
        $call_back_func = $create_func
            ? function ($post, $metabox) {
                do_action('AHEE_log', __FILE__, __FUNCTION__, '');
                echo EEH_Template::display_template(
                    $metabox['args']['template_path'],
                    $metabox['args']['template_args'],
                    true
                );
            }
            : $callback;
        add_meta_box(
            str_replace('_', '-', $action) . '-mbox',
            $title,
            $call_back_func,
            $this->_wp_page_slug,
            $column,
            $priority,
            $callback_args
        );
    }


    /**
     * generates HTML wrapper for and admin details page that contains metaboxes in columns
     *
     * @throws DomainException
     * @throws EE_Error
     */
    public function display_admin_page_with_metabox_columns()
    {
        $this->_template_args['post_body_content']  = $this->_template_args['admin_page_content'];
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            $this->_column_template_path,
            $this->_template_args,
            true
        );
        // the final wrapper
        $this->admin_page_wrapper();
    }


    /**
     * generates  HTML wrapper for an admin details page
     *
     * @return void
     * @throws EE_Error
     * @throws DomainException
     */
    public function display_admin_page_with_sidebar()
    {
        $this->_display_admin_page(true);
    }


    /**
     * generates  HTML wrapper for an admin details page (except no sidebar)
     *
     * @return void
     * @throws EE_Error
     * @throws DomainException
     */
    public function display_admin_page_with_no_sidebar()
    {
        $this->_display_admin_page();
    }


    /**
     * generates HTML wrapper for an EE about admin page (no sidebar)
     *
     * @return void
     * @throws EE_Error
     * @throws DomainException
     */
    public function display_about_admin_page()
    {
        $this->_display_admin_page(false, true);
    }


    /**
     * display_admin_page
     * contains the code for actually displaying an admin page
     *
     * @param boolean $sidebar true with sidebar, false without
     * @param boolean $about   use the about_admin_wrapper instead of the default.
     * @return void
     * @throws DomainException
     * @throws EE_Error
     */
    private function _display_admin_page($sidebar = false, $about = false)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        // custom remove metaboxes hook to add or remove any metaboxes to/from Admin pages.
        do_action('AHEE__EE_Admin_Page___display_admin_page__modify_metaboxes');
        // set current wp page slug - looks like: event-espresso_page_event_categories
        // keep in mind "event-espresso" COULD be something else if the top level menu label has been translated.
        $this->_template_args['current_page']              = $this->_wp_page_slug;
        $this->_template_args['admin_page_wrapper_div_id'] = $this->_cpt_route
            ? 'poststuff'
            : 'espresso-default-admin';
        $template_path                                     = $sidebar
            ? EE_ADMIN_TEMPLATE . 'admin_details_wrapper.template.php'
            : EE_ADMIN_TEMPLATE . 'admin_details_wrapper_no_sidebar.template.php';
        if ($this->request->isAjax()) {
            $template_path = EE_ADMIN_TEMPLATE . 'admin_details_wrapper_no_sidebar_ajax.template.php';
        }
        $template_path                                     = ! empty($this->_column_template_path)
            ? $this->_column_template_path : $template_path;
        $this->_template_args['post_body_content']         = isset($this->_template_args['admin_page_content'])
            ? $this->_template_args['admin_page_content']
            : '';
        $this->_template_args['before_admin_page_content'] = isset($this->_template_args['before_admin_page_content'])
            ? $this->_template_args['before_admin_page_content']
            : '';
        $this->_template_args['after_admin_page_content']  = isset($this->_template_args['after_admin_page_content'])
            ? $this->_template_args['after_admin_page_content']
            : '';
        $this->_template_args['admin_page_content']        = EEH_Template::display_template(
            $template_path,
            $this->_template_args,
            true
        );
        // the final template wrapper
        $this->admin_page_wrapper($about);
    }


    /**
     * This is used to display caf preview pages.
     *
     * @param string $utm_campaign_source what is the key used for google analytics link
     * @param bool   $display_sidebar     whether to use the sidebar template or the full template for the page.  TRUE
     *                                    = SHOW sidebar, FALSE = no sidebar. Default no sidebar.
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.3.2
     */
    public function display_admin_caf_preview_page($utm_campaign_source = '', $display_sidebar = true)
    {
        // let's generate a default preview action button if there isn't one already present.
        $this->_labels['buttons']['buy_now']           = esc_html__(
            'Upgrade to Event Espresso 4 Right Now',
            'event_espresso'
        );
        $buy_now_url                                   = add_query_arg(
            [
                'ee_ver'       => 'ee4',
                'utm_source'   => 'ee4_plugin_admin',
                'utm_medium'   => 'link',
                'utm_campaign' => $utm_campaign_source,
                'utm_content'  => 'buy_now_button',
            ],
            'https://eventespresso.com/pricing/'
        );
        $this->_template_args['preview_action_button'] = ! isset($this->_template_args['preview_action_button'])
            ? $this->get_action_link_or_button(
                '',
                'buy_now',
                [],
                'button-primary button-large',
                esc_url_raw($buy_now_url),
                true
            )
            : $this->_template_args['preview_action_button'];
        $this->_template_args['admin_page_content']    = EEH_Template::display_template(
            EE_ADMIN_TEMPLATE . 'admin_caf_full_page_preview.template.php',
            $this->_template_args,
            true
        );
        $this->_display_admin_page($display_sidebar);
    }


    /**
     * display_admin_list_table_page_with_sidebar
     * generates HTML wrapper for an admin_page with list_table
     *
     * @return void
     * @throws EE_Error
     * @throws DomainException
     */
    public function display_admin_list_table_page_with_sidebar()
    {
        $this->_display_admin_list_table_page(true);
    }


    /**
     * display_admin_list_table_page_with_no_sidebar
     * generates HTML wrapper for an admin_page with list_table (but with no sidebar)
     *
     * @return void
     * @throws EE_Error
     * @throws DomainException
     */
    public function display_admin_list_table_page_with_no_sidebar()
    {
        $this->_display_admin_list_table_page();
    }


    /**
     * generates html wrapper for an admin_list_table page
     *
     * @param boolean $sidebar whether to display with sidebar or not.
     * @return void
     * @throws DomainException
     * @throws EE_Error
     */
    private function _display_admin_list_table_page($sidebar = false)
    {
        // setup search attributes
        $this->_set_search_attributes();
        $this->_template_args['current_page']     = $this->_wp_page_slug;
        $template_path                            = EE_ADMIN_TEMPLATE . 'admin_list_wrapper.template.php';
        $this->_template_args['table_url']        = $this->request->isAjax()
            ? add_query_arg(['noheader' => 'true', 'route' => $this->_req_action], $this->_admin_base_url)
            : add_query_arg(['route' => $this->_req_action], $this->_admin_base_url);
        $this->_template_args['list_table']       = $this->_list_table_object;
        $this->_template_args['current_route']    = $this->_req_action;
        $this->_template_args['list_table_class'] = get_class($this->_list_table_object);
        $ajax_sorting_callback                    = $this->_list_table_object->get_ajax_sorting_callback();
        if (! empty($ajax_sorting_callback)) {
            $sortable_list_table_form_fields = wp_nonce_field(
                $ajax_sorting_callback . '_nonce',
                $ajax_sorting_callback . '_nonce',
                false,
                false
            );
            $sortable_list_table_form_fields .= '<input type="hidden" id="ajax_table_sort_page" name="ajax_table_sort_page" value="'
                                                . $this->page_slug
                                                . '" />';
            $sortable_list_table_form_fields .= '<input type="hidden" id="ajax_table_sort_action" name="ajax_table_sort_action" value="'
                                                . $ajax_sorting_callback
                                                . '" />';
        } else {
            $sortable_list_table_form_fields = '';
        }
        $this->_template_args['sortable_list_table_form_fields'] = $sortable_list_table_form_fields;
        $hidden_form_fields                                      =
            isset($this->_template_args['list_table_hidden_fields'])
                ? $this->_template_args['list_table_hidden_fields']
                : '';

        $nonce_ref          = $this->_req_action . '_nonce';
        $hidden_form_fields .= '
            <input type="hidden" name="' . $nonce_ref . '" value="' . wp_create_nonce($nonce_ref) . '">';

        $this->_template_args['list_table_hidden_fields']        = $hidden_form_fields;
        // display message about search results?
        $search = $this->request->getRequestParam('s');
        $this->_template_args['before_list_table'] .= ! empty($search)
            ? '<p class="ee-search-results">' . sprintf(
                esc_html__('Displaying search results for the search string: %1$s', 'event_espresso'),
                trim($search, '%')
            ) . '</p>'
            : '';
        // filter before_list_table template arg
        $this->_template_args['before_list_table'] = apply_filters(
            'FHEE__EE_Admin_Page___display_admin_list_table_page__before_list_table__template_arg',
            $this->_template_args['before_list_table'],
            $this->page_slug,
            $this->request->requestParams(),
            $this->_req_action
        );
        // convert to array and filter again
        // arrays are easier to inject new items in a specific location,
        // but would not be backwards compatible, so we have to add a new filter
        $this->_template_args['before_list_table'] = implode(
            " \n",
            (array) apply_filters(
                'FHEE__EE_Admin_Page___display_admin_list_table_page__before_list_table__template_args_array',
                (array) $this->_template_args['before_list_table'],
                $this->page_slug,
                $this->request->requestParams(),
                $this->_req_action
            )
        );
        // filter after_list_table template arg
        $this->_template_args['after_list_table'] = apply_filters(
            'FHEE__EE_Admin_Page___display_admin_list_table_page__after_list_table__template_arg',
            $this->_template_args['after_list_table'],
            $this->page_slug,
            $this->request->requestParams(),
            $this->_req_action
        );
        // convert to array and filter again
        // arrays are easier to inject new items in a specific location,
        // but would not be backwards compatible, so we have to add a new filter
        $this->_template_args['after_list_table']   = implode(
            " \n",
            (array) apply_filters(
                'FHEE__EE_Admin_Page___display_admin_list_table_page__after_list_table__template_args_array',
                (array) $this->_template_args['after_list_table'],
                $this->page_slug,
                $this->request->requestParams(),
                $this->_req_action
            )
        );
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            $template_path,
            $this->_template_args,
            true
        );
        // the final template wrapper
        if ($sidebar) {
            $this->display_admin_page_with_sidebar();
        } else {
            $this->display_admin_page_with_no_sidebar();
        }
    }


    /**
     * This just prepares a legend using the given items and the admin_details_legend.template.php file and returns the
     * html string for the legend.
     * $items are expected in an array in the following format:
     * $legend_items = array(
     *        'item_id' => array(
     *            'icon' => 'http://url_to_icon_being_described.png',
     *            'desc' => esc_html__('localized description of item');
     *        )
     * );
     *
     * @param array $items see above for format of array
     * @return string html string of legend
     * @throws DomainException
     */
    protected function _display_legend($items)
    {
        $this->_template_args['items'] = apply_filters(
            'FHEE__EE_Admin_Page___display_legend__items',
            (array) $items,
            $this
        );
        return EEH_Template::display_template(
            EE_ADMIN_TEMPLATE . 'admin_details_legend.template.php',
            $this->_template_args,
            true
        );
    }


    /**
     * This is used whenever we're DOING_AJAX to return a formatted json array that our calling javascript can expect
     * The returned json object is created from an array in the following format:
     * array(
     *  'error' => FALSE, //(default FALSE), contains any errors and/or exceptions (exceptions return json early),
     *  'success' => FALSE, //(default FALSE) - contains any special success message.
     *  'notices' => '', // - contains any EE_Error formatted notices
     *  'content' => 'string can be html', //this is a string of formatted content (can be html)
     *  'data' => array() //this can be any key/value pairs that a method returns for later json parsing by the js.
     *  We're also going to include the template args with every package (so js can pick out any specific template args
     *  that might be included in here)
     * )
     * The json object is populated by whatever is set in the $_template_args property.
     *
     * @param bool  $sticky_notices    Used to indicate whether you want to ensure notices are added to a transient
     *                                 instead of displayed.
     * @param array $notices_arguments Use this to pass any additional args on to the _process_notices.
     * @return void
     * @throws EE_Error
     */
    protected function _return_json($sticky_notices = false, $notices_arguments = [])
    {
        // make sure any EE_Error notices have been handled.
        $this->_process_notices($notices_arguments, true, $sticky_notices);
        $data = isset($this->_template_args['data']) ? $this->_template_args['data'] : [];
        unset($this->_template_args['data']);
        $json = [
            'error'     => isset($this->_template_args['error']) ? $this->_template_args['error'] : false,
            'success'   => isset($this->_template_args['success']) ? $this->_template_args['success'] : false,
            'errors'    => isset($this->_template_args['errors']) ? $this->_template_args['errors'] : false,
            'attention' => isset($this->_template_args['attention']) ? $this->_template_args['attention'] : false,
            'notices'   => EE_Error::get_notices(),
            'content'   => isset($this->_template_args['admin_page_content'])
                ? $this->_template_args['admin_page_content'] : '',
            'data'      => array_merge($data, ['template_args' => $this->_template_args]),
            'isEEajax'  => true
            // special flag so any ajax.Success methods in js can identify this return package as a EEajax package.
        ];
        // make sure there are no php errors or headers_sent.  Then we can set correct json header.
        if (null === error_get_last() || ! headers_sent()) {
            header('Content-Type: application/json; charset=UTF-8');
        }
        echo wp_json_encode($json);
        exit();
    }


    /**
     * Simply a wrapper for the protected method so we can call this outside the class (ONLY when doing ajax)
     *
     * @return void
     * @throws EE_Error
     */
    public function return_json()
    {
        if ($this->request->isAjax()) {
            $this->_return_json();
        } else {
            throw new EE_Error(
                sprintf(
                    esc_html__('The public %s method can only be called when DOING_AJAX = TRUE', 'event_espresso'),
                    __FUNCTION__
                )
            );
        }
    }


    /**
     * This provides a way for child hook classes to send along themselves by reference so methods/properties within
     * them can be accessed by EE_Admin_child pages. This is assigned to the $_hook_obj property.
     *
     * @param EE_Admin_Hooks $hook_obj This will be the object for the EE_Admin_Hooks child
     */
    public function set_hook_object(EE_Admin_Hooks $hook_obj)
    {
        $this->_hook_obj = $hook_obj;
    }


    /**
     *        generates  HTML wrapper with Tabbed nav for an admin page
     *
     * @param boolean $about whether to use the special about page wrapper or default.
     * @return void
     * @throws DomainException
     * @throws EE_Error
     */
    public function admin_page_wrapper($about = false)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $this->_nav_tabs                                   = $this->_get_main_nav_tabs();
        $this->_template_args['nav_tabs']                  = $this->_nav_tabs;
        $this->_template_args['admin_page_title']          = $this->_admin_page_title;

        $this->_template_args['before_admin_page_content'] = apply_filters(
            "FHEE_before_admin_page_content{$this->_current_page}{$this->_current_view}",
            isset($this->_template_args['before_admin_page_content'])
                ? $this->_template_args['before_admin_page_content']
                : ''
        );

        $this->_template_args['after_admin_page_content']  = apply_filters(
            "FHEE_after_admin_page_content{$this->_current_page}{$this->_current_view}",
            isset($this->_template_args['after_admin_page_content'])
                ? $this->_template_args['after_admin_page_content']
                : ''
        );
        $this->_template_args['after_admin_page_content']  .= $this->_set_help_popup_content();

        if ($this->request->isAjax()) {
            $this->_template_args['admin_page_content'] = EEH_Template::display_template(
                // $template_path,
                EE_ADMIN_TEMPLATE . 'admin_wrapper_ajax.template.php',
                $this->_template_args,
                true
            );
            $this->_return_json();
        }
        // load settings page wrapper template
        $template_path = $about
            ? EE_ADMIN_TEMPLATE . 'about_admin_wrapper.template.php'
            : EE_ADMIN_TEMPLATE . 'admin_wrapper.template.php';

        EEH_Template::display_template($template_path, $this->_template_args);
    }


    /**
     * This returns the admin_nav tabs html using the configuration in the _nav_tabs property
     *
     * @return string html
     * @throws EE_Error
     */
    protected function _get_main_nav_tabs()
    {
        // let's generate the html using the EEH_Tabbed_Content helper.
        // We do this here so that it's possible for child classes to add in nav tabs dynamically at the last minute
        // (rather than setting in the page_routes array)
        return EEH_Tabbed_Content::display_admin_nav_tabs($this->_nav_tabs);
    }


    /**
     *        sort nav tabs
     *
     * @param $a
     * @param $b
     * @return int
     */
    private function _sort_nav_tabs($a, $b)
    {
        if ($a['order'] === $b['order']) {
            return 0;
        }
        return ($a['order'] < $b['order']) ? -1 : 1;
    }


    /**
     *    generates HTML for the forms used on admin pages
     *
     * @param array  $input_vars   - array of input field details
     * @param string $generator    (options are 'string' or 'array', basically use this to indicate which generator to
     *                             use)
     * @param bool   $id
     * @return array|string
     * @uses   EEH_Form_Fields::get_form_fields (/helper/EEH_Form_Fields.helper.php)
     * @uses   EEH_Form_Fields::get_form_fields_array (/helper/EEH_Form_Fields.helper.php)
     */
    protected function _generate_admin_form_fields($input_vars = [], $generator = 'string', $id = false)
    {
        return $generator === 'string'
            ? EEH_Form_Fields::get_form_fields($input_vars, $id)
            : EEH_Form_Fields::get_form_fields_array($input_vars);
    }


    /**
     * generates the "Save" and "Save & Close" buttons for edit forms
     *
     * @param bool             $both     if true then both buttons will be generated.  If false then just the "Save &
     *                                   Close" button.
     * @param array            $text     if included, generator will use the given text for the buttons ( array([0] =>
     *                                   'Save', [1] => 'save & close')
     * @param array            $actions  if included allows us to set the actions that each button will carry out (i.e.
     *                                   via the "name" value in the button).  We can also use this to just dump
     *                                   default actions by submitting some other value.
     * @param bool|string|null $referrer if false then we just do the default action on save and close.  Other wise it
     *                                   will use the $referrer string. IF null, then we don't do ANYTHING on save and
     *                                   close (normal form handling).
     */
    protected function _set_save_buttons($both = true, $text = [], $actions = [], $referrer = null)
    {
        // make sure $text and $actions are in an array
        $text          = (array) $text;
        $actions       = (array) $actions;
        $referrer_url  = ! empty($referrer) ? $referrer : $this->request->getServerParam('REQUEST_URI');
        $button_text   = ! empty($text)
            ? $text
            : [
                esc_html__('Save', 'event_espresso'),
                esc_html__('Save and Close', 'event_espresso'),
            ];
        $default_names = ['save', 'save_and_close'];
        $buttons = '';
        foreach ($button_text as $key => $button) {
            $ref     = $default_names[ $key ];
            $name    = ! empty($actions) ? $actions[ $key ] : $ref;
            $buttons .= '<input type="submit" class="button-primary ' . $ref . '" '
                        . 'value="' . $button . '" name="' . $name . '" '
                        . 'id="' . $this->_current_view . '_' . $ref . '" />';
            if (! $both) {
                break;
            }
        }
        // add in a hidden index for the current page (so save and close redirects properly)
        $buttons .= '<input type="hidden" id="save_and_close_referrer" name="save_and_close_referrer" value="'
                   . $referrer_url
                   . '" />';
        $this->_template_args['save_buttons'] = $buttons;
    }


    /**
     * Wrapper for the protected function.  Allows plugins/addons to call this to set the form tags.
     *
     * @param string $route
     * @param array  $additional_hidden_fields
     * @see   $this->_set_add_edit_form_tags() for details on params
     * @since 4.6.0
     */
    public function set_add_edit_form_tags($route = '', $additional_hidden_fields = [])
    {
        $this->_set_add_edit_form_tags($route, $additional_hidden_fields);
    }


    /**
     * set form open and close tags on add/edit pages.
     *
     * @param string $route                    the route you want the form to direct to
     * @param array  $additional_hidden_fields any additional hidden fields required in the form header
     * @return void
     */
    protected function _set_add_edit_form_tags($route = '', $additional_hidden_fields = [])
    {
        if (empty($route)) {
            $user_msg = esc_html__(
                'An error occurred. No action was set for this page\'s form.',
                'event_espresso'
            );
            $dev_msg  = $user_msg . "\n"
                        . sprintf(
                            esc_html__('The $route argument is required for the %s->%s method.', 'event_espresso'),
                            __FUNCTION__,
                            __CLASS__
                        );
            EE_Error::add_error($user_msg . '||' . $dev_msg, __FILE__, __FUNCTION__, __LINE__);
        }
        // open form
        $this->_template_args['before_admin_page_content'] = '<form name="form" method="post" action="'
                                                             . $this->_admin_base_url
                                                             . '" id="'
                                                             . $route
                                                             . '_event_form" >';
        // add nonce
        $nonce                                             =
            wp_nonce_field($route . '_nonce', $route . '_nonce', false, false);
        $this->_template_args['before_admin_page_content'] .= "\n\t" . $nonce;
        // add REQUIRED form action
        $hidden_fields = [
            'action' => ['type' => 'hidden', 'value' => $route],
        ];
        // merge arrays
        $hidden_fields = is_array($additional_hidden_fields)
            ? array_merge($hidden_fields, $additional_hidden_fields)
            : $hidden_fields;
        // generate form fields
        $form_fields = $this->_generate_admin_form_fields($hidden_fields, 'array');
        // add fields to form
        foreach ((array) $form_fields as $form_field) {
            $this->_template_args['before_admin_page_content'] .= "\n\t" . $form_field['field'];
        }
        // close form
        $this->_template_args['after_admin_page_content'] = '</form>';
    }


    /**
     * Public Wrapper for _redirect_after_action() method since its
     * discovered it would be useful for external code to have access.
     *
     * @param bool   $success
     * @param string $what
     * @param string $action_desc
     * @param array  $query_args
     * @param bool   $override_overwrite
     * @throws EE_Error
     * @see   EE_Admin_Page::_redirect_after_action() for params.
     * @since 4.5.0
     */
    public function redirect_after_action(
        $success = false,
        $what = 'item',
        $action_desc = 'processed',
        $query_args = [],
        $override_overwrite = false
    ) {
        $this->_redirect_after_action(
            $success,
            $what,
            $action_desc,
            $query_args,
            $override_overwrite
        );
    }


    /**
     * Helper method for merging existing request data with the returned redirect url.
     *
     * This is typically used for redirects after an action so that if the original view was a filtered view those
     * filters are still applied.
     *
     * @param array $new_route_data
     * @return array
     */
    protected function mergeExistingRequestParamsWithRedirectArgs(array $new_route_data)
    {
        foreach ($this->request->requestParams() as $ref => $value) {
            // unset nonces
            if (strpos($ref, 'nonce') !== false) {
                $this->request->unSetRequestParam($ref);
                continue;
            }
            // urlencode values.
            $value = is_array($value) ? array_map('urlencode', $value) : urlencode($value);
            $this->request->setRequestParam($ref, $value);
        }
        return array_merge($this->request->requestParams(), $new_route_data);
    }


    /**
     *    _redirect_after_action
     *
     * @param int    $success            - whether success was for two or more records, or just one, or none
     * @param string $what               - what the action was performed on
     * @param string $action_desc        - what was done ie: updated, deleted, etc
     * @param array  $query_args         - an array of query_args to be added to the URL to redirect to after the admin
     *                                   action is completed
     * @param BOOL   $override_overwrite by default all EE_Error::success messages are overwritten, this allows you to
     *                                   override this so that they show.
     * @return void
     * @throws EE_Error
     */
    protected function _redirect_after_action(
        $success = 0,
        $what = 'item',
        $action_desc = 'processed',
        $query_args = [],
        $override_overwrite = false
    ) {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        // class name for actions/filters.
        $classname = get_class($this);
        // set redirect url.
        // Note if there is a "page" index in the $query_args then we go with vanilla admin.php route,
        // otherwise we go with whatever is set as the _admin_base_url
        $redirect_url = isset($query_args['page']) ? admin_url('admin.php') : $this->_admin_base_url;
        $notices      = EE_Error::get_notices(false);
        // overwrite default success messages //BUT ONLY if overwrite not overridden
        if (! $override_overwrite || ! empty($notices['errors'])) {
            EE_Error::overwrite_success();
        }
        if (! empty($what) && ! empty($action_desc) && empty($notices['errors'])) {
            // how many records affected ? more than one record ? or just one ?
            if ($success > 1) {
                // set plural msg
                EE_Error::add_success(
                    sprintf(
                        esc_html__('The "%s" have been successfully %s.', 'event_espresso'),
                        $what,
                        $action_desc
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            } elseif ($success === 1) {
                // set singular msg
                EE_Error::add_success(
                    sprintf(
                        esc_html__('The "%s" has been successfully %s.', 'event_espresso'),
                        $what,
                        $action_desc
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
        }
        // check that $query_args isn't something crazy
        if (! is_array($query_args)) {
            $query_args = [];
        }
        /**
         * Allow injecting actions before the query_args are modified for possible different
         * redirections on save and close actions
         *
         * @param array $query_args       The original query_args array coming into the
         *                                method.
         * @since 4.2.0
         */
        do_action(
            "AHEE__{$classname}___redirect_after_action__before_redirect_modification_{$this->_req_action}",
            $query_args
        );
        // calculate where we're going (if we have a "save and close" button pushed)

        if (
            $this->request->requestParamIsSet('save_and_close')
            && $this->request->requestParamIsSet('save_and_close_referrer')
        ) {
            // even though we have the save_and_close referrer, we need to parse the url for the action in order to generate a nonce
            $parsed_url = parse_url($this->request->getRequestParam('save_and_close_referrer', '', 'url'));
            // regenerate query args array from referrer URL
            parse_str($parsed_url['query'], $query_args);
            // correct page and action will be in the query args now
            $redirect_url = admin_url('admin.php');
        }
        // merge any default query_args set in _default_route_query_args property
        if (! empty($this->_default_route_query_args) && ! $this->_is_UI_request) {
            $args_to_merge = [];
            foreach ($this->_default_route_query_args as $query_param => $query_value) {
                // is there a wp_referer array in our _default_route_query_args property?
                if ($query_param === 'wp_referer') {
                    $query_value = (array) $query_value;
                    foreach ($query_value as $reference => $value) {
                        if (strpos($reference, 'nonce') !== false) {
                            continue;
                        }
                        // finally we will override any arguments in the referer with
                        // what might be set on the _default_route_query_args array.
                        if (isset($this->_default_route_query_args[ $reference ])) {
                            $args_to_merge[ $reference ] = urlencode($this->_default_route_query_args[ $reference ]);
                        } else {
                            $args_to_merge[ $reference ] = urlencode($value);
                        }
                    }
                    continue;
                }
                $args_to_merge[ $query_param ] = $query_value;
            }
            // now let's merge these arguments but override with what was specifically sent in to the
            // redirect.
            $query_args = array_merge($args_to_merge, $query_args);
        }
        $this->_process_notices($query_args);
        // generate redirect url
        // if redirecting to anything other than the main page, add a nonce
        if (isset($query_args['action'])) {
            // manually generate wp_nonce and merge that with the query vars
            // becuz the wp_nonce_url function wrecks havoc on some vars
            $query_args['_wpnonce'] = wp_create_nonce($query_args['action'] . '_nonce');
        }
        // we're adding some hooks and filters in here for processing any things just before redirects
        // (example: an admin page has done an insert or update and we want to run something after that).
        do_action('AHEE_redirect_' . $classname . $this->_req_action, $query_args);
        $redirect_url = apply_filters(
            'FHEE_redirect_' . $classname . $this->_req_action,
            self::add_query_args_and_nonce($query_args, $redirect_url),
            $query_args
        );
        // check if we're doing ajax.  If we are then lets just return the results and js can handle how it wants.
        if ($this->request->isAjax()) {
            $default_data                    = [
                'close'        => true,
                'redirect_url' => $redirect_url,
                'where'        => 'main',
                'what'         => 'append',
            ];
            $this->_template_args['success'] = $success;
            $this->_template_args['data']    = ! empty($this->_template_args['data']) ? array_merge(
                $default_data,
                $this->_template_args['data']
            ) : $default_data;
            $this->_return_json();
        }
        wp_safe_redirect($redirect_url);
        exit();
    }


    /**
     * process any notices before redirecting (or returning ajax request)
     * This method sets the $this->_template_args['notices'] attribute;
     *
     * @param array $query_args         any query args that need to be used for notice transient ('action')
     * @param bool  $skip_route_verify  This is typically used when we are processing notices REALLY early and
     *                                  page_routes haven't been defined yet.
     * @param bool  $sticky_notices     This is used to flag that regardless of whether this is doing_ajax or not, we
     *                                  still save a transient for the notice.
     * @return void
     * @throws EE_Error
     */
    protected function _process_notices($query_args = [], $skip_route_verify = false, $sticky_notices = true)
    {
        // first let's set individual error properties if doing_ajax and the properties aren't already set.
        if ($this->request->isAjax()) {
            $notices = EE_Error::get_notices(false);
            if (empty($this->_template_args['success'])) {
                $this->_template_args['success'] = isset($notices['success']) ? $notices['success'] : false;
            }
            if (empty($this->_template_args['errors'])) {
                $this->_template_args['errors'] = isset($notices['errors']) ? $notices['errors'] : false;
            }
            if (empty($this->_template_args['attention'])) {
                $this->_template_args['attention'] = isset($notices['attention']) ? $notices['attention'] : false;
            }
        }
        $this->_template_args['notices'] = EE_Error::get_notices();
        // IF this isn't ajax we need to create a transient for the notices using the route (however, overridden if $sticky_notices == true)
        if (! $this->request->isAjax() || $sticky_notices) {
            $route = isset($query_args['action']) ? $query_args['action'] : 'default';
            $this->_add_transient(
                $route,
                $this->_template_args['notices'],
                true,
                $skip_route_verify
            );
        }
    }


    /**
     * get_action_link_or_button
     * returns the button html for adding, editing, or deleting an item (depending on given type)
     *
     * @param string $action        use this to indicate which action the url is generated with.
     * @param string $type          accepted strings must be defined in the $_labels['button'] array(as the key)
     *                              property.
     * @param array  $extra_request if the button requires extra params you can include them in $key=>$value pairs.
     * @param string $class         Use this to give the class for the button. Defaults to 'button-primary'
     * @param string $base_url      If this is not provided
     *                              the _admin_base_url will be used as the default for the button base_url.
     *                              Otherwise this value will be used.
     * @param bool   $exclude_nonce If true then no nonce will be in the generated button link.
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function get_action_link_or_button(
        $action,
        $type = 'add',
        $extra_request = [],
        $class = 'button button--primary',
        $base_url = '',
        $exclude_nonce = false
    ) {
        // first let's validate the action (if $base_url is FALSE otherwise validation will happen further along)
        if (empty($base_url) && ! isset($this->_page_routes[ $action ])) {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        'There is no page route for given action for the button.  This action was given: %s',
                        'event_espresso'
                    ),
                    $action
                )
            );
        }
        if (! isset($this->_labels['buttons'][ $type ])) {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        'There is no label for the given button type (%s). Labels are set in the <code>_page_config</code> property.',
                        'event_espresso'
                    ),
                    $type
                )
            );
        }
        // finally check user access for this button.
        $has_access = $this->check_user_access($action, true);
        if (! $has_access) {
            return '';
        }
        $_base_url  = ! $base_url ? $this->_admin_base_url : $base_url;
        $query_args = [
            'action' => $action,
        ];
        // merge extra_request args but make sure our original action takes precedence and doesn't get overwritten.
        if (! empty($extra_request)) {
            $query_args = array_merge($extra_request, $query_args);
        }
        $url = self::add_query_args_and_nonce($query_args, $_base_url, false, $exclude_nonce);
        return EEH_Template::get_button_or_link($url, $this->_labels['buttons'][ $type ], $class);
    }


    /**
     * _per_page_screen_option
     * Utility function for adding in a per_page_option in the screen_options_dropdown.
     *
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    protected function _per_page_screen_option()
    {
        $option = 'per_page';
        $args   = [
            'label'   => apply_filters(
                'FHEE__EE_Admin_Page___per_page_screen_options___label',
                $this->_admin_page_title,
                $this
            ),
            'default' => (int) apply_filters(
                'FHEE__EE_Admin_Page___per_page_screen_options__default',
                20
            ),
            'option'  => $this->_current_page . '_' . $this->_current_view . '_per_page',
        ];
        // ONLY add the screen option if the user has access to it.
        if ($this->check_user_access($this->_current_view, true)) {
            add_screen_option($option, $args);
        }
    }


    /**
     * set_per_page_screen_option
     * All this does is make sure that WordPress saves any per_page screen options (if set) for the current page.
     * we have to do this rather than running inside the 'set-screen-options' hook because it runs earlier than
     * admin_menu.
     *
     * @return void
     */
    private function _set_per_page_screen_options()
    {
        if ($this->request->requestParamIsSet('wp_screen_options')) {
            check_admin_referer('screen-options-nonce', 'screenoptionnonce');
            if (! $user = wp_get_current_user()) {
                return;
            }
            $option = $this->request->getRequestParam('wp_screen_options[option]', '', 'key');
            if (! $option) {
                return;
            }
            $value  = $this->request->getRequestParam('wp_screen_options[value]', 0, 'int');
            $map_option = $option;
            $option     = str_replace('-', '_', $option);
            switch ($map_option) {
                case $this->_current_page . '_' . $this->_current_view . '_per_page':
                    $max_value = apply_filters(
                        'FHEE__EE_Admin_Page___set_per_page_screen_options__max_value',
                        999,
                        $this->_current_page,
                        $this->_current_view
                    );
                    if ($value < 1) {
                        return;
                    }
                    $value = min($value, $max_value);
                    break;
                default:
                    $value = apply_filters(
                        'FHEE__EE_Admin_Page___set_per_page_screen_options__value',
                        false,
                        $option,
                        $value
                    );
                    if (false === $value) {
                        return;
                    }
                    break;
            }
            update_user_meta($user->ID, $option, $value);
            wp_safe_redirect(remove_query_arg(['pagenum', 'apage', 'paged'], wp_get_referer()));
            exit;
        }
    }


    /**
     * This just allows for setting the $_template_args property if it needs to be set outside the object
     *
     * @param array $data array that will be assigned to template args.
     */
    public function set_template_args($data)
    {
        $this->_template_args = array_merge($this->_template_args, (array) $data);
    }


    /**
     * This makes available the WP transient system for temporarily moving data between routes
     *
     * @param string $route             the route that should receive the transient
     * @param array  $data              the data that gets sent
     * @param bool   $notices           If this is for notices then we use this to indicate so, otherwise its just a
     *                                  normal route transient.
     * @param bool   $skip_route_verify Used to indicate we want to skip route verification.  This is usually ONLY used
     *                                  when we are adding a transient before page_routes have been defined.
     * @return void
     * @throws EE_Error
     */
    protected function _add_transient($route, $data, $notices = false, $skip_route_verify = false)
    {
        $user_id = get_current_user_id();
        if (! $skip_route_verify) {
            $this->_verify_route($route);
        }
        // now let's set the string for what kind of transient we're setting
        $transient = $notices
            ? 'ee_rte_n_tx_' . $route . '_' . $user_id
            : 'rte_tx_' . $route . '_' . $user_id;
        $data      = $notices ? ['notices' => $data] : $data;
        // is there already a transient for this route?  If there is then let's ADD to that transient
        $existing = is_multisite() && is_network_admin()
            ? get_site_transient($transient)
            : get_transient($transient);
        if ($existing) {
            $data = array_merge((array) $data, (array) $existing);
        }
        if (is_multisite() && is_network_admin()) {
            set_site_transient($transient, $data, 8);
        } else {
            set_transient($transient, $data, 8);
        }
    }


    /**
     * this retrieves the temporary transient that has been set for moving data between routes.
     *
     * @param bool   $notices true we get notices transient. False we just return normal route transient
     * @param string $route
     * @return mixed data
     */
    protected function _get_transient($notices = false, $route = '')
    {
        $user_id   = get_current_user_id();
        $route     = ! $route ? $this->_req_action : $route;
        $transient = $notices
            ? 'ee_rte_n_tx_' . $route . '_' . $user_id
            : 'rte_tx_' . $route . '_' . $user_id;
        $data      = is_multisite() && is_network_admin()
            ? get_site_transient($transient)
            : get_transient($transient);
        // delete transient after retrieval (just in case it hasn't expired);
        if (is_multisite() && is_network_admin()) {
            delete_site_transient($transient);
        } else {
            delete_transient($transient);
        }
        return $notices && isset($data['notices']) ? $data['notices'] : $data;
    }


    /**
     * The purpose of this method is just to run garbage collection on any EE transients that might have expired but
     * would not be called later. This will be assigned to run on a specific EE Admin page. (place the method in the
     * default route callback on the EE_Admin page you want it run.)
     *
     * @return void
     */
    protected function _transient_garbage_collection()
    {
        global $wpdb;
        // retrieve all existing transients
        $query =
            "SELECT option_name FROM {$wpdb->options} WHERE option_name LIKE '%rte_tx_%' OR option_name LIKE '%rte_n_tx_%'";
        if ($results = $wpdb->get_results($query)) {
            foreach ($results as $result) {
                $transient = str_replace('_transient_', '', $result->option_name);
                get_transient($transient);
                if (is_multisite() && is_network_admin()) {
                    get_site_transient($transient);
                }
            }
        }
    }


    /**
     * get_view
     *
     * @return string content of _view property
     */
    public function get_view()
    {
        return $this->_view;
    }


    /**
     * getter for the protected $_views property
     *
     * @return array
     */
    public function get_views()
    {
        return $this->_views;
    }


    /**
     * get_current_page
     *
     * @return string _current_page property value
     */
    public function get_current_page()
    {
        return $this->_current_page;
    }


    /**
     * get_current_view
     *
     * @return string _current_view property value
     */
    public function get_current_view()
    {
        return $this->_current_view;
    }


    /**
     * get_current_screen
     *
     * @return object The current WP_Screen object
     */
    public function get_current_screen()
    {
        return $this->_current_screen;
    }


    /**
     * get_current_page_view_url
     *
     * @return string This returns the url for the current_page_view.
     */
    public function get_current_page_view_url()
    {
        return $this->_current_page_view_url;
    }


    /**
     * just returns the Request
     *
     * @return RequestInterface
     */
    public function get_request()
    {
        return $this->request;
    }


    /**
     * just returns the _req_data property
     *
     * @return array
     */
    public function get_request_data()
    {
        return $this->request->requestParams();
    }


    /**
     * returns the _req_data protected property
     *
     * @return string
     */
    public function get_req_action()
    {
        return $this->_req_action;
    }


    /**
     * @return bool  value of $_is_caf property
     */
    public function is_caf()
    {
        return $this->_is_caf;
    }


    /**
     * @return mixed
     */
    public function default_espresso_metaboxes()
    {
        return $this->_default_espresso_metaboxes;
    }


    /**
     * @return mixed
     */
    public function admin_base_url()
    {
        return $this->_admin_base_url;
    }


    /**
     * @return mixed
     */
    public function wp_page_slug()
    {
        return $this->_wp_page_slug;
    }


    /**
     * updates  espresso configuration settings
     *
     * @param string                   $tab
     * @param EE_Config_Base|EE_Config $config
     * @param string                   $file file where error occurred
     * @param string                   $func function  where error occurred
     * @param string                   $line line no where error occurred
     * @return boolean
     */
    protected function _update_espresso_configuration($tab, $config, $file = '', $func = '', $line = '')
    {
        // remove any options that are NOT going to be saved with the config settings.
        if (isset($config->core->ee_ueip_optin)) {
            // TODO: remove the following two lines and make sure values are migrated from 3.1
            update_option('ee_ueip_optin', $config->core->ee_ueip_optin);
            update_option('ee_ueip_has_notified', true);
        }
        // and save it (note we're also doing the network save here)
        $net_saved    = ! is_main_site() || EE_Network_Config::instance()->update_config(false, false);
        $config_saved = EE_Config::instance()->update_espresso_config(false, false);
        if ($config_saved && $net_saved) {
            EE_Error::add_success(sprintf(esc_html__('"%s" have been successfully updated.', 'event_espresso'), $tab));
            return true;
        }
        EE_Error::add_error(sprintf(esc_html__('The "%s" were not updated.', 'event_espresso'), $tab), $file, $func, $line);
        return false;
    }


    /**
     * Returns an array to be used for EE_FOrm_Fields.helper.php's select_input as the $values argument.
     *
     * @return array
     */
    public function get_yes_no_values()
    {
        return $this->_yes_no_values;
    }


    protected function _get_dir()
    {
        $reflector = new ReflectionClass(get_class($this));
        return dirname($reflector->getFileName());
    }


    /**
     * A helper for getting a "next link".
     *
     * @param string $url   The url to link to
     * @param string $class The class to use.
     * @return string
     */
    protected function _next_link($url, $class = 'dashicons dashicons-arrow-right')
    {
        return '<a class="' . $class . '" href="' . $url . '"></a>';
    }


    /**
     * A helper for getting a "previous link".
     *
     * @param string $url   The url to link to
     * @param string $class The class to use.
     * @return string
     */
    protected function _previous_link($url, $class = 'dashicons dashicons-arrow-left')
    {
        return '<a class="' . $class . '" href="' . $url . '"></a>';
    }







    // below are some messages related methods that should be available across the EE_Admin system.  Note, these methods are NOT page specific


    /**
     * This processes an request to resend a registration and assumes we have a _REG_ID for doing so. So if the caller
     * knows that the _REG_ID isn't in the req_data array but CAN obtain it, the caller should ADD the _REG_ID to the
     * _req_data array.
     *
     * @return bool success/fail
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _process_resend_registration()
    {
        $this->_template_args['success'] = EED_Messages::process_resend($this->_req_data);
        do_action(
            'AHEE__EE_Admin_Page___process_resend_registration',
            $this->_template_args['success'],
            $this->request->requestParams()
        );
        return $this->_template_args['success'];
    }


    /**
     * This automatically processes any payment message notifications when manual payment has been applied.
     *
     * @param EE_Payment $payment
     * @return bool success/fail
     */
    protected function _process_payment_notification(EE_Payment $payment)
    {
        add_filter('FHEE__EE_Payment_Processor__process_registration_payments__display_notifications', '__return_true');
        do_action('AHEE__EE_Admin_Page___process_admin_payment_notification', $payment);
        $this->_template_args['success'] = apply_filters(
            'FHEE__EE_Admin_Page___process_admin_payment_notification__success',
            false,
            $payment
        );
        return $this->_template_args['success'];
    }


    /**
     * @param EEM_Base      $entity_model
     * @param string        $entity_PK_name name of the primary key field used as a request param, ie: id, ID, etc
     * @param string        $action         one of the EE_Admin_List_Table::ACTION_* constants: delete, restore, trash
     * @param string        $delete_column  name of the field that denotes whether entity is trashed
     * @param callable|null $callback       called after entity is trashed, restored, or deleted
     * @return int|float
     * @throws EE_Error
     */
    protected function trashRestoreDeleteEntities(
        EEM_Base $entity_model,
        $entity_PK_name,
        $action = EE_Admin_List_Table::ACTION_DELETE,
        $delete_column = '',
        callable $callback = null
    ) {
        $entity_PK      = $entity_model->get_primary_key_field();
        $entity_PK_name = $entity_PK_name ?: $entity_PK->get_name();
        $entity_PK_type = $this->resolveEntityFieldDataType($entity_PK);
        // grab ID if deleting a single entity
        if ($this->request->requestParamIsSet($entity_PK_name)) {
            $ID = $this->request->getRequestParam($entity_PK_name, 0, $entity_PK_type);
            return $this->trashRestoreDeleteEntity($entity_model, $ID, $action, $delete_column, $callback) ? 1 : 0;
        }
        // or grab checkbox array if bulk deleting
        $checkboxes = $this->request->getRequestParam('checkbox', [], $entity_PK_type, true);
        if (empty($checkboxes)) {
            return 0;
        }
        $success = 0;
        $IDs     = array_keys($checkboxes);
        // cycle thru bulk action checkboxes
        foreach ($IDs as $ID) {
            // increment $success
            if ($this->trashRestoreDeleteEntity($entity_model, $ID, $action, $delete_column, $callback)) {
                $success++;
            }
        }
        $count = (int) count($checkboxes);
        // if multiple entities were deleted successfully, then $deleted will be full count of deletions,
        // otherwise it will be a fraction of ( actual deletions / total entities to be deleted )
        return $success === $count ? $count : $success / $count;
    }


    /**
     * @param EE_Primary_Key_Field_Base $entity_PK
     * @return string
     * @throws EE_Error
     * @since   4.10.30.p
     */
    private function resolveEntityFieldDataType(EE_Primary_Key_Field_Base $entity_PK)
    {
        $entity_PK_type = $entity_PK->getSchemaType();
        switch ($entity_PK_type) {
            case 'boolean':
                return 'bool';
            case 'integer':
                return 'int';
            case 'number':
                return 'float';
            case 'string':
                return 'string';
        }
        throw new RuntimeException(
            sprintf(
                esc_html__(
                    '"%1$s" is an invalid schema type for the %2$s primary key.',
                    'event_espresso'
                ),
                $entity_PK_type,
                $entity_PK->get_name()
            )
        );
    }


    /**
     * @param EEM_Base      $entity_model
     * @param int|string    $entity_ID
     * @param string        $action        one of the EE_Admin_List_Table::ACTION_* constants: delete, restore, trash
     * @param string        $delete_column name of the field that denotes whether entity is trashed
     * @param callable|null $callback      called after entity is trashed, restored, or deleted
     * @return bool
     */
    protected function trashRestoreDeleteEntity(
        EEM_Base $entity_model,
        $entity_ID,
        $action,
        $delete_column,
        callable $callback = null
    ) {
        $entity_ID = absint($entity_ID);
        if (! $entity_ID) {
            $this->trashRestoreDeleteError($action, $entity_model);
        }
        $result = 0;
        try {
            $entity = $entity_model->get_one_by_ID($entity_ID);
            if (! $entity instanceof EE_Base_Class) {
                throw new DomainException(
                    sprintf(
                        esc_html__(
                            'Missing or invalid %1$s entity with ID of "%2$s" returned from db.',
                            'event_espresso'
                        ),
                        str_replace('EEM_', '', $entity_model->get_this_model_name()),
                        $entity_ID
                    )
                );
            }
            switch ($action) {
                case EE_Admin_List_Table::ACTION_DELETE:
                    $result = (bool) $entity->delete_permanently();
                    break;
                case EE_Admin_List_Table::ACTION_RESTORE:
                    $result = $entity->delete_or_restore(false);
                    break;
                case EE_Admin_List_Table::ACTION_TRASH:
                    $result = $entity->delete_or_restore();
                    break;
            }
        } catch (Exception $exception) {
            $this->trashRestoreDeleteError($action, $entity_model, $exception);
        }
        if (is_callable($callback)) {
            call_user_func_array($callback, [$entity_model, $entity_ID, $action, $result, $delete_column]);
        }
        return $result;
    }


    /**
     * @param EEM_Base $entity_model
     * @param string   $delete_column
     * @since 4.10.30.p
     */
    private function validateDeleteColumn(EEM_Base $entity_model, $delete_column)
    {
        if (empty($delete_column)) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'You need to specify the name of the "delete column" on the %2$s model, in order to trash or restore an entity.',
                        'event_espresso'
                    ),
                    $entity_model->get_this_model_name()
                )
            );
        }
        if (! $entity_model->has_field($delete_column)) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'The %1$s field does not exist on the %2$s model.',
                        'event_espresso'
                    ),
                    $delete_column,
                    $entity_model->get_this_model_name()
                )
            );
        }
    }


    /**
     * @param EEM_Base       $entity_model
     * @param Exception|null $exception
     * @param string         $action
     * @since 4.10.30.p
     */
    private function trashRestoreDeleteError($action, EEM_Base $entity_model, Exception $exception = null)
    {
        if ($exception instanceof Exception) {
            throw new RuntimeException(
                sprintf(
                    esc_html__(
                        'Could not %1$s the %2$s because the following error occurred: %3$s',
                        'event_espresso'
                    ),
                    $action,
                    $entity_model->get_this_model_name(),
                    $exception->getMessage()
                )
            );
        }
        throw new RuntimeException(
            sprintf(
                esc_html__(
                    'Could not %1$s the %2$s because an invalid ID was received.',
                    'event_espresso'
                ),
                $action,
                $entity_model->get_this_model_name()
            )
        );
    }
}

<?php

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;

/**
 * EE_Admin_Hooks
 * This is the abstract parent class used by children to contains any hooks that run on different EE Admin pages.
 *
 * @abstract
 * @package         EE_Admin_Hooks
 * @subpackage      includes/core/admin/EE_Admin_Hooks.class.php
 * @author          Darren Ethier
 */
abstract class EE_Admin_Hooks extends EE_Base
{


    /**
     * we're just going to use this to hold the name of the caller class (child class name)
     *
     * @var string
     */
    public $caller;


    /**
     * this is just a flag set automatically to indicate whether we've got an extended hook class running (i.e.
     * espresso_events_Registration_Form_Hooks_Extend extends espresso_events_Registration_Form_Hooks).  This flag is
     * used later to make sure we require the needed files.
     *
     * @var bool
     */
    protected $_extend;


    /**
     * child classes MUST set this property so that the page object can be loaded correctly
     *
     * @var string
     */
    protected $_name;


    /**
     * This is set by child classes and is an associative array of ajax hooks in the format:
     * array(
     *    'ajax_action_ref' => 'executing_method'; //must be public
     * )
     *
     * @var array
     */
    protected $_ajax_func;


    /**
     * This is an array of methods that get executed on a page routes admin_init hook. Use the following format:
     * array(
     *    'page_route' => 'executing_method' //must be public
     * )
     *
     * @var array
     */
    protected $_init_func;


    /**
     * This is an array of methods that output metabox content for the given page route.  Use the following format:
     * [
     *      0 => [
     *          'page_route' => 'string_for_page_route',    must correspond to a page route in the class being connected
     *                                                      with (i.e. "edit_event") If this is in an array then the
     *                                                      same params below will be used but the metabox will be
     *                                                      added to each route.
     *          'func' =>  'executing_method',              must be public (i.e. public function executing_method
     *                                                      ($post, $callback_args){} ).
     *                                                      Note if you include callback args in the array then you
     *                                                      need to declare them in the method arguments.
     *          'id' => 'identifier_for_metabox',           so it can be removed by addons
     *                                                      (optional, class will set it automatically)
     *          'priority' => 'default',                    default 'default' (optional)
     *          'label' => esc_html__('Localized Title', 'event_espresso'),
     *          'context' => 'advanced'                     advanced is default (optional),
     *      ]
     *      'callback_args' => array() //any callback args to include (optional)
     * ]
     * Why are we indexing numerically?  Because it's possible there may be more than one metabox per page_route.
     *
     * @var array
     */
    protected $_metaboxes;


    /**
     * This is an array of values that indicate any metaboxes we want removed from a given page route.  Usually this is
     * used when caffeinated functionality is replacing decaffeinated functionality.  Use the following format for the
     * array: array(
     *    0 => array(
     *        'page_route' => 'string_for_page_route' //can be string or array of strings that match a page_route(s)
     *        that are in the class being connected with (i.e. 'edit', or 'create_new').
     *        'id' => 'identifier_for_metabox', //what the id is of the metabox being removed
     *        'context' => 'normal', //the context for the metabox being removed (has to match)
     *        'screen' => 'screen_id', //(optional), if not included then this class will attempt to remove the metabox
     *        using the currently loaded screen object->id  however, there may be cases where you have to specify the
     *        id for the screen the metabox is on.
     *    )
     * )
     *
     * @var array
     */
    protected $_remove_metaboxes;


    /**
     * This parent class takes care of loading the scripts and styles if the child class has set the properties for
     * them in the following format.  Note, the first array index ('register') is for defining all the registers.  The
     * second array index is for indicating what routes each script/style loads on. array(
     * 'registers' => array(
     *        'script_ref' => array( // if more than one script is to be loaded its best to use the 'dependency'
     *        argument to link scripts together.
     *            'type' => 'js' // 'js' or 'css' (defaults to js).  This tells us what type of wp_function to use
     *            'url' => 'http://urltoscript.css.js',
     *            'depends' => array('jquery'), //an array of dependencies for the scripts. REMEMBER, if a script has
     *            already been registered elsewhere in the system.  You can just use the depends array to make sure it
     *            gets loaded before the one you are setting here.
     *            'footer' => TRUE //defaults to true (styles don't use this parameter)
     *        ),
     *    'enqueues' => array( //this time each key corresponds to the script ref followed by an array of page routes
     *    the script gets enqueued on.
     *        'script_ref' => array('route_one', 'route_two')
     *    ),
     *    'localize' => array( //this allows you to set a localized object.  Indicate which script the object is being
     *    attached to and then include an array indexed by the name of the object and the array of key/value pairs for
     *    the object.
     *        'scrip_ref' => array(
     *            'NAME_OF_JS_OBJECT' => array(
     *                'translate_ref' => esc_html__('localized_string', 'event_espresso'),
     *                'some_data' => 5
     *            )
     *        )
     *    )
     * )
     *
     * @var array
     */
    protected $_scripts_styles;


    /**
     * This is a property that will contain the current route.
     *
     * @var string;
     */
    protected $_current_route;


    /**
     * this optional property can be set by child classes to override the priority for the automatic action/filter hook
     * loading in the `_load_routed_hooks()` method.  Please follow this format: array(
     *    'wp_hook_reference' => 1
     *    )
     * )
     *
     * @var array
     */
    protected $_wp_action_filters_priority;


    /**
     * This just holds a merged array of the request vars
     *
     * @var array
     */
    protected $_req_data;

    /**
     * @var array
     */
    protected $_scripts;

    /**
     * @var array
     */
    protected $_styles;

    /**
     * This just holds an instance of the page object for this hook
     *
     * @var EE_Admin_Page
     */
    protected $_page_object;


    /**
     * This holds the EE_Admin_Page object from the calling admin page that this object hooks into.
     *
     * @var EE_Admin_Page|EE_Admin_Page_CPT
     */
    protected $_adminpage_obj;


    /**
     * Holds EE_Registry object
     *
     * @var EE_Registry
     */
    protected $EE = null;

    /**
     * @var RequestInterface
     */
    protected $request;


    /**
     * constructor
     *
     * @param EE_Admin_Page $admin_page
     * @throws EE_Error
     */
    public function __construct(EE_Admin_Page $admin_page)
    {
        $this->_adminpage_obj = $admin_page;
        $this->request        = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        $this->_req_data      = $this->request->requestParams();
        $this->_set_defaults();
        $this->_set_hooks_properties();
        // first let's verify we're on the right page
        if (
            ! isset($this->_req_data['page'])
            || (isset($this->_req_data['page'])
                && $this->_adminpage_obj->page_slug
                   != $this->_req_data['page'])
        ) {
            return;
        }
        // get out nothing more to be done here.
        // allow for extends to modify properties
        if (method_exists($this, '_extend_properties')) {
            $this->_extend_properties();
        }
        $this->_set_page_object();
        $this->_init_hooks();
        $this->_load_custom_methods();
        $this->_load_routed_hooks();
        add_action('admin_enqueue_scripts', [$this, 'enqueue_scripts_styles']);
        add_action('admin_enqueue_scripts', [$this, 'add_metaboxes'], 20);
        add_action('admin_enqueue_scripts', [$this, 'remove_metaboxes'], 15);
        $this->_ajax_hooks();
    }


    /**
     * used by child classes to set the following properties:
     * $_ajax_func (optional)
     * $_init_func (optional)
     * $_metaboxes (optional)
     * $_scripts (optional)
     * $_styles (optional)
     * $_name (required)
     * Also in this method will be registered any scripts or styles loaded on the targeted page (as indicated in the
     * _scripts/_styles properties) Also children should place in this method any filters/actions that have to happen
     * really early on page load (just after admin_init) if they want to have them registered for handling early.
     *
     * @abstract
     * @return void
     */
    abstract protected function _set_hooks_properties();


    /**
     * The hooks for enqueue_scripts and enqueue_styles will be run in here.  Child classes need to define their
     * scripts and styles in the relevant $_scripts and $_styles properties.  Child classes must have also already
     * registered the scripts and styles using wp_register_script and wp_register_style functions.
     *
     * @return void
     * @throws EE_Error
     */
    public function enqueue_scripts_styles()
    {
        if (! empty($this->_scripts_styles)) {
            // first let's do all the registrations
            if (! isset($this->_scripts_styles['registers'])) {
                $msg[] = esc_html__(
                    'There is no "registers" index in the <code>$this->_scripts_styles</code> property.',
                    'event_espresso'
                );
                $msg[] = sprintf(
                    esc_html__(
                        'Make sure you read the phpdoc comments above the definition of the $_scripts_styles property in the <code>EE_Admin_Hooks</code> class and modify according in the %s child',
                        'event_espresso'
                    ),
                    '<strong>' . $this->caller . '</strong>'
                );
                throw new EE_Error(implode('||', $msg));
            }
            $defaults = [
                'type'    => 'js',
                'url'     => '',
                'depends' => [],
                'version' => EVENT_ESPRESSO_VERSION,
                'footer'  => true,
            ];
            foreach ($this->_scripts_styles['registers'] as $ref => $details) {
                $details = wp_parse_args($details, $defaults);
                $type    = $details['type'];
                $url     = $details['url'];
                $depends = $details['depends'];
                $version = $details['version'];
                $footer  = $details['footer'];
                // let's make sure that we set the 'registers' type if it's not set!
                // We need it later to determine which enqueue we do
                $this->_scripts_styles['registers'][ $ref ]['type'] = $type;
                // let's make sure we're not missing any REQUIRED parameters
                if (empty($url)) {
                    $msg[] = sprintf(
                        esc_html__('Missing the url for the requested %s', 'event_espresso'),
                        $type == 'js' ? 'script' : 'stylesheet'
                    );
                    $msg[] = sprintf(
                        esc_html__(
                            'Doublecheck your <code>$this->_scripts_styles</code> array in %s and make sure that there is a "url" set for the %s ref',
                            'event_espresso'
                        ),
                        '<strong>' . $this->caller . '</strong>',
                        $ref
                    );
                    throw new EE_Error(implode('||', $msg));
                }
                // made it here so let's do the appropriate registration
                $type == 'js'
                    ? wp_register_script($ref, $url, $depends, $version, $footer)
                    : wp_register_style(
                        $ref,
                        $url,
                        $depends,
                        $version
                    );
            }
            // k now let's do the enqueues
            if (! isset($this->_scripts_styles['enqueues'])) {
                return;
            }  //not sure if we should throw an error here or not.

            foreach ($this->_scripts_styles['enqueues'] as $ref => $routes) {
                // make sure $routes is an array
                $routes = (array) $routes;
                if (in_array($this->_current_route, $routes)) {
                    $this->_scripts_styles['registers'][ $ref ]['type'] == 'js' ? wp_enqueue_script($ref)
                        : wp_enqueue_style($ref);
                    // if we have a localization for the script let's do that too.
                    if (isset($this->_scripts_styles['localize'][ $ref ])) {
                        foreach ($this->_scripts_styles['localize'][ $ref ] as $object_name => $indexes) {
                            wp_localize_script(
                                $ref,
                                $object_name,
                                $this->_scripts_styles['localize'][ $ref ][ $object_name ]
                            );
                        }
                    }
                }
            }
            // let's do the deregisters
            if (! isset($this->_scripts_styles['deregisters'])) {
                return;
            }
            foreach ($this->_scripts_styles['deregisters'] as $ref => $details) {
                $defaults = ['type' => 'js'];
                $details  = wp_parse_args($details, $defaults);
                $details['type'] === 'js' ? wp_deregister_script($ref) : wp_deregister_style($ref);
            }
        }
    }


    /**
     * just set the defaults for the hooks properties.
     *
     * @return void
     */
    private function _set_defaults()
    {
        $this->_ajax_func                  = [];
        $this->_init_func                  = [];
        $this->_metaboxes                  = [];
        $this->_scripts                    = [];
        $this->_styles                     = [];
        $this->_wp_action_filters_priority = [];
        $this->_current_route              = $this->getCurrentRoute();
        $this->caller                      = get_class($this);
        $this->_extend                     = (bool) stripos($this->caller, 'Extend');
    }


    /**
     * A helper for determining the current route.
     *
     * @return string
     */
    private function getCurrentRoute()
    {
        $action = $this->request->getRequestParam('action');
        // list tables do something else with 'action' for bulk actions.
        $action = $action !== '-1' && $action !== '' ? $action : 'default';
        $route  = $this->request->getRequestParam('route');
        // we set a 'route' variable in some cases where action is being used by something else.
        return $action === 'default' && $route !== '' ? $route : $action;
    }


    /**
     * this sets the _page_object property
     *
     * @return void
     * @throws EE_Error
     */
    protected function _set_page_object()
    {
        if ($this->_page_object instanceof EE_Admin_Page) {
            return;
        }
        // first make sure $this->_name is set
        if (empty($this->_name)) {
            $msg[] = esc_html__('We can\'t load the page object', 'event_espresso');
            $msg[] = sprintf(
                esc_html__("This is because the %s child class has not set the '_name' property", 'event_espresso'),
                $this->caller
            );
            throw new EE_Error(implode('||', $msg));
        }
        // change "the_message" to "the message"
        $class_name = str_replace('_', ' ', $this->_name);
        // change "the message" to "The_Message_Admin_Page"
        $class_name = str_replace(' ', '_', ucwords($class_name)) . '_Admin_Page';
        // first default file (if exists)
        $decaf_file = EE_ADMIN_PAGES . $this->_name . '/' . $class_name . '.core.php';
        if (is_readable($decaf_file)) {
            require_once($decaf_file);
        }
        // now we have to do require for extended file (if needed)
        if ($this->_extend) {
            require_once(EE_CORE_CAF_ADMIN_EXTEND . $this->_name . '/Extend_' . $class_name . '.core.php');
            // and extend the class name as well
            $class_name = 'Extend_' . $class_name;
        }
        // let's make sure the class exists
        if (! class_exists($class_name)) {
            $msg[] = esc_html__('We can\'t load the page object', 'event_espresso');
            $msg[] = sprintf(
                esc_html__(
                    'The class name that was given is %s. Check the spelling and make sure its correct, also there needs to be an autoloader setup for the class',
                    'event_espresso'
                ),
                $class_name
            );
            throw new EE_Error(implode('||', $msg));
        }
        $this->_page_object = LoaderFactory::getLoader()->getShared($class_name, [false]);
        $this->_page_object->initializePage();
    }


    /**
     * Child "hook" classes can declare any methods that they want executed when a specific page route is loaded.  The
     * advantage of this is when doing things like running our own db interactions on saves etc.  Remember that
     * $this->_req_data (all the _POST and _GET data) is available to your methods.
     *
     * @return void
     */
    private function _load_custom_methods()
    {
        /**
         * method cannot be named 'default' (@see http://us3.php
         * .net/manual/en/reserved.keywords.php) so need to
         * handle routes that are "default"
         *
         * @since 4.3.0
         */
        $method_callback = $this->_current_route == 'default' ? 'default_callback' : $this->_current_route;
        // these run before the Admin_Page route executes.
        if (method_exists($this, $method_callback)) {
            call_user_func([$this, $method_callback]);
        }
        // these run via the _redirect_after_action method in EE_Admin_Page which usually happens after non_UI methods in EE_Admin_Page classes.  There are two redirect actions, the first fires before $query_args might be manipulated by "save and close" actions and the seond fires right before the actual redirect happens.
        // first the actions
        // note that these action hooks will have the $query_args value available.
        $admin_class_name = get_class($this->_adminpage_obj);
        if (method_exists($this, '_redirect_action_early_' . $this->_current_route)) {
            add_action(
                'AHEE__'
                . $admin_class_name
                . '___redirect_after_action__before_redirect_modification_'
                . $this->_current_route,
                [$this, '_redirect_action_early_' . $this->_current_route],
                10
            );
        }
        if (method_exists($this, '_redirect_action_' . $this->_current_route)) {
            add_action(
                'AHEE_redirect_' . $admin_class_name . $this->_current_route,
                [$this, '_redirect_action_' . $this->_current_route],
                10
            );
        }
        // let's hook into the _redirect itself and allow for changing where the user goes after redirect.  This will have $query_args and $redirect_url available.
        if (method_exists($this, '_redirect_filter_' . $this->_current_route)) {
            add_filter(
                'FHEE_redirect_' . $admin_class_name . $this->_current_route,
                [$this, '_redirect_filter_' . $this->_current_route],
                10,
                2
            );
        }
    }


    /**
     * This method will search for a corresponding method with a name matching the route and the wp_hook to run.  This
     * allows child hook classes to target hooking into a specific wp action or filter hook ONLY on a certain route.
     * just remember, methods MUST be public Future hooks should be added in here to be access by child classes.
     *
     * @return void
     */
    private function _load_routed_hooks()
    {

        // this array provides the hook action names that will be referenced.  Key is the action. Value is an array with the type (action or filter) and the number of parameters for the hook.  We'll default all priorities for automatic hooks to 10.
        $hook_filter_array = [
            'admin_footer'                                                                            => [
                'type'     => 'action',
                'argnum'   => 1,
                'priority' => 10,
            ],
            'FHEE_list_table_views_' . $this->_adminpage_obj->page_slug . '_' . $this->_current_route => [
                'type'     => 'filter',
                'argnum'   => 1,
                'priority' => 10,
            ],
            'FHEE_list_table_views_' . $this->_adminpage_obj->page_slug                               => [
                'type'     => 'filter',
                'argnum'   => 1,
                'priority' => 10,
            ],
            'FHEE_list_table_views'                                                                   => [
                'type'     => 'filter',
                'argnum'   => 1,
                'priority' => 10,
            ],
            'AHEE__EE_Admin_Page___display_admin_page__modify_metaboxes'                              => [
                'type'     => 'action',
                'argnum'   => 1,
                'priority' => 10,
            ],
        ];
        foreach ($hook_filter_array as $hook => $args) {
            if (method_exists($this, $this->_current_route . '_' . $hook)) {
                if (isset($this->_wp_action_filters_priority[ $hook ])) {
                    $args['priority'] = $this->_wp_action_filters_priority[ $hook ];
                }
                if ($args['type'] == 'action') {
                    add_action(
                        $hook,
                        [$this, $this->_current_route . '_' . $hook],
                        $args['priority'],
                        $args['argnum']
                    );
                } else {
                    add_filter(
                        $hook,
                        [$this, $this->_current_route . '_' . $hook],
                        $args['priority'],
                        $args['argnum']
                    );
                }
            }
        }
    }


    /**
     * Loop throught the $_ajax_func array and add_actions for the array.
     *
     * @return void
     * @throws EE_Error
     */
    private function _ajax_hooks()
    {
        if (empty($this->_ajax_func)) {
            return;
        } //get out there's nothing to take care of.
        foreach ($this->_ajax_func as $action => $method) {
            // make sure method exists
            if (! method_exists($this, $method)) {
                $msg[] = esc_html__(
                    'There is no corresponding method for the hook labeled in the _ajax_func array',
                    'event_espresso'
                ) . '<br />';
                $msg[] = sprintf(
                    esc_html__(
                        'The method name given in the array is %s, check the spelling and make sure it exists in the %s class',
                        'event_espresso'
                    ),
                    $method,
                    $this->caller
                );
                throw new EE_Error(implode('||', $msg));
            }
            add_action('wp_ajax_' . $action, [$this, $method]);
        }
    }


    /**
     * Loop throught the $_init_func array and add_actions for the array.
     *
     * @return void
     * @throws EE_Error
     */
    protected function _init_hooks()
    {
        if (empty($this->_init_func)) {
            return;
        }
        // get out there's nothing to take care of.
        // We need to determine what page_route we are on!
        foreach ($this->_init_func as $route => $method) {
            // make sure method exists
            if (! method_exists($this, $method)) {
                $msg[] = esc_html__(
                    'There is no corresponding method for the hook labeled in the _init_func array',
                    'event_espresso'
                ) . '<br />';
                $msg[] = sprintf(
                    esc_html__(
                        'The method name given in the array is %s, check the spelling and make sure it exists in the %s class',
                        'event_espresso'
                    ),
                    $method,
                    $this->caller
                );
                throw new EE_Error(implode('||', $msg));
            }
            if ($route == $this->_current_route) {
                add_action('admin_init', [$this, $method]);
            }
        }
    }


    /**
     * Loop through the _metaboxes property and add_metaboxes accordingly
     * //todo we could eventually make this a config component class (i.e. new EE_Metabox);
     *
     * @return void
     * @throws EE_Error
     */
    public function add_metaboxes()
    {
        if (empty($this->_metaboxes)) {
            return;
        } //get out we don't have any metaboxes to set for this connection
        $this->_handle_metabox_array($this->_metaboxes);
    }


    /**
     * @param array $boxes
     * @param bool  $add
     * @throws EE_Error
     */
    private function _handle_metabox_array(array $boxes, $add = true)
    {
        foreach ($boxes as $box) {
            if (! isset($box['page_route'])) {
                continue;
            }
            // we don't have a valid array
            // let's make sure $box['page_route'] is an array so the "foreach" will work.
            $box['page_route'] = (array) $box['page_route'];
            foreach ($box['page_route'] as $route) {
                if ($route != $this->_current_route) {
                    continue;
                } //get out we only add metaboxes for set route.
                if ($add) {
                    $this->_add_metabox($box);
                } else {
                    $this->_remove_metabox($box);
                }
            }
        }
    }


    /**
     * Loop through the _remove_metaboxes property and remove metaboxes accordingly.
     *
     * @return void
     * @throws EE_Error
     */
    public function remove_metaboxes()
    {
        if (empty($this->_remove_metaboxes)) {
            return;
        } //get out there are no metaboxes to remove
        $this->_handle_metabox_array($this->_remove_metaboxes, false);
    }


    /**
     * This just handles adding a metabox
     *
     * @param array $args an array of args that have been set for this metabox by the child class
     * @throws EE_Error
     */
    private function _add_metabox($args)
    {
        $current_screen = get_current_screen();
        $screen_id      = is_object($current_screen) ? $current_screen->id : null;
        $func           = isset($args['func']) ? $args['func'] : 'some_invalid_callback';
        // set defaults
        $defaults      = [
            'callback_args' => [],
            'context'       => 'advanced',
            'func'          => $func,
            'id'            => $this->caller . '_' . $func . '_metabox',
            'label'         => $this->caller,
            'page'          => isset($args['page']) ? $args['page'] : $screen_id,
            'priority'      => 'default',
        ];
        $args          = wp_parse_args($args, $defaults);
        $callback_args = $args['callback_args'];
        $context       = $args['context'];
        $func          = $args['func'];
        $id            = $args['id'];
        $label         = $args['label'];
        $page          = $args['page'];
        $priority      = $args['priority'];
        // make sure method exists
        if (! method_exists($this, $func)) {
            $msg[] =
                esc_html__('There is no corresponding method to display the metabox content', 'event_espresso')
                . '<br />';
            $msg[] = sprintf(
                esc_html__(
                    'The method name given in the array is %s, check the spelling and make sure it exists in the %s class',
                    'event_espresso'
                ),
                $func,
                $this->caller
            );
            throw new EE_Error(implode('||', $msg));
        }
        // everything checks out so let's add the metabox
        add_meta_box($id, $label, [$this, $func], $page, $context, $priority, $callback_args);
    }


    private function _remove_metabox($args)
    {
        $current_screen = get_current_screen();
        $screen_id      = is_object($current_screen) ? $current_screen->id : null;
        $func           = isset($args['func']) ? $args['func'] : 'some_invalid_callback';
        // set defaults
        $defaults = [
            'context' => 'default',
            'id'      => isset($args['id'])
                ? $args['id']
                : $this->_current_route . '_' . $this->caller . '_' . $func . '_metabox',
            'screen'  => isset($args['screen']) ? $args['screen'] : $screen_id,
        ];
        $args     = wp_parse_args($args, $defaults);
        $context  = $args['context'];
        $id       = $args['id'];
        $screen   = $args['screen'];
        // everything checks out so lets remove the box!
        remove_meta_box($id, $screen, $context);
    }
}

<?php

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;

/**
 * EE_Admin_Page_Init
 * This is utilizes by all Admin_Page_Init child classes in order to define their require methods
 *
 * @package            Event Espresso
 * @abstract
 * @subpackage         includes/core/admin/EE_Admin_Page_Init.core.php
 * @author             Brent Christensen, Darren Ethier
 * ------------------------------------------------------------------------
 */
abstract class EE_Admin_Page_Init extends EE_Base
{
    // identity properties (set in _set_defaults and _set_init_properties)
    public $label;

    /**
     * Menu map has a capability.  However, this allows admin pages to have separate capability requirements for menus
     * and accessing pages.  If capability is NOT set, then it defaults to the menu_map capability.
     *
     * @var string
     */
    public $capability;


    /**
     * This holds the menu map object for this admin page.
     *
     * @var EE_Admin_Page_Menu_Map
     */
    protected $_menu_map;

    /**
     * deprecated
     */
    public $menu_label;

    public $menu_slug;


    // set in _set_defaults
    protected $_folder_name;

    protected $_folder_path;

    protected $_file_name;

    public $hook_file;

    protected $_wp_page_slug;

    protected $_routing;


    // will hold page object.
    protected $_loaded_page_object;


    // for caf
    protected $_files_hooked;

    protected $_hook_paths;

    // load_page?
    private $_load_page;

    /**
     * @var LoaderInterface
     */
    protected $loader;

    /**
     * @var RequestInterface
     */
    protected $request;


    /**
     * @Constructor
     * @return void
     */
    public function __construct(RequestInterface $request = null)
    {
        $this->loader = LoaderFactory::getLoader();
        $this->request = $request instanceof RequestInterface
            ? $request
            : $this->loader->getShared(RequestInterface::class);
        // set global defaults
        $this->_set_defaults();
        // set properties that are always available with objects.
        $this->_set_init_properties();
        // global styles/scripts across all wp admin pages
        add_action('admin_enqueue_scripts', [$this, 'load_wp_global_scripts_styles'], 5);
        // load initial stuff.
        $this->_set_file_and_folder_name();
        $this->_set_menu_map();
        if (! $this->verifyMenuMapSet()) {
            return;
        }
        // set default capability
        $this->_set_capability();
    }


    /**
     * _set_init_properties
     * Child classes use to set the following properties:
     * $label
     *
     * @abstract
     * @return void
     */
    abstract protected function _set_init_properties();


    /**
     * _set_menu_map is a function that child classes use to set the menu_map property (which should be an instance of
     * EE_Admin_Page_Menu_Map.  Their menu can either be EE_Admin_Page_Main_Menu or EE_Admin_Page_Sub_Menu.
     *
     * @since 4.4.0
     * @ return void.
     */
    protected function _set_menu_map()
    {
        return [];
    }


    /**
     * @return bool
     * @since   4.10.14.p
     */
    private function verifyMenuMapSet()
    {
        if (empty($this->_menu_map) || is_array($this->_menu_map)) {
            EE_Error::doing_it_wrong(
                get_class($this) . '::$_menu_map',
                sprintf(
                    esc_html__(
                        'The EE4 addon with the class %s is setting up the _menu_map property incorrectly for this version of EE core.  Please see Admin_Page_Init class examples in core for the new way of setting this property up.',
                        'event_espresso'
                    ),
                    get_class($this)
                ),
                '4.4.0'
            );
            return true;
        }
        return false;
    }


    /**
     * returns the menu map for this admin page
     *
     * @return EE_Admin_Page_Menu_Map
     * @since 4.4.0
     */
    public function get_menu_map()
    {
        return $this->_menu_map;
    }


    /**
     * This loads scripts and styles for the EE_Admin system
     * that must be available on ALL WP admin pages (i.e. EE_menu items)
     *
     * @return void
     */
    public function load_wp_global_scripts_styles()
    {
        wp_register_style(
            'espresso_menu',
            EE_ADMIN_URL . 'assets/admin-menu-styles.css',
            ['dashicons'],
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_style('espresso_menu');
    }


    /**
     * this sets default properties (might be overridden in _set_init_properties);
     *
     * @return  void
     */
    private function _set_defaults()
    {
        $this->_file_name    = $this->_folder_name = $this->_wp_page_slug = $this->capability = null;
        $this->_routing      = true;
        $this->_load_page    = false;
        $this->_files_hooked = $this->_hook_paths = [];
        // menu_map
        $this->_menu_map = $this->get_menu_map();
    }


    protected function _set_capability()
    {
        $capability       = empty($this->capability) ? $this->_menu_map->capability : $this->capability;
        $this->capability = apply_filters('FHEE_' . $this->_menu_map->menu_slug . '_capability', $capability);
    }


    /**
     * initialize_admin_page
     * This method is what executes the loading of the specific page class for the given dir_name as called by the
     * EE_Admin_Init class.
     *
     * @return void
     * @uses    _initialize_admin_page()
     */
    public function initialize_admin_page()
    {
        // let's check user access first
        $this->_check_user_access();
        if (! is_object($this->_loaded_page_object)) {
            return;
        }
        $this->_loaded_page_object->route_admin_request();
    }


    /**
     * @param string $wp_page_slug
     * @throws EE_Error
     */
    public function set_page_dependencies($wp_page_slug)
    {
        if (! $this->_load_page) {
            return;
        }
        if (! is_object($this->_loaded_page_object)) {
            $msg[] = esc_html__(
                'We can\'t load the page because we\'re missing a valid page object that tells us what to load',
                'event_espresso'
            );
            $msg[] = $msg[0] . "\r\n"
                     . sprintf(
                         esc_html__(
                             'The custom slug you have set for this page is %s. This means we\'re looking for the class %s_Admin_Page (found in %s_Admin_Page.core.php) within your %s directory',
                             'event_espresso'
                         ),
                         $this->_file_name,
                         $this->_file_name,
                         $this->_folder_path . $this->_file_name,
                         $this->_menu_map->menu_slug
                     );
            throw new EE_Error(implode('||', $msg));
        }
        $this->_loaded_page_object->set_wp_page_slug($wp_page_slug);
        $page_hook = 'load-' . $wp_page_slug;
        // hook into page load hook so all page specific stuff gets loaded.
        if (! empty($wp_page_slug)) {
            add_action($page_hook, [$this->_loaded_page_object, 'load_page_dependencies']);
        }
    }


    /**
     * This executes the initial page loads for EE_Admin pages to take care of any ajax or other code needing to run
     * before the load-page... hook. Note, the page loads are happening around the wp_init hook.
     *
     * @return void
     */
    public function do_initial_loads()
    {
        // no loading or initializing if menu map is setup incorrectly.
        if (empty($this->_menu_map) || is_array($this->_menu_map)) {
            return;
        }
        $this->_initialize_admin_page();
    }


    /**
     * all we're doing here is setting the $_file_name property for later use.
     *
     * @return void
     */
    private function _set_file_and_folder_name()
    {
        $bt = debug_backtrace();
        // for more reliable determination of folder name
        // we're using this to get the actual folder name of the CALLING class (i.e. the child class that extends this).  Why?  Because $this->menu_slug may be different than the folder name (to avoid conflicts with other plugins)
        $class = get_class($this);
        foreach ($bt as $index => $values) {
            if (isset($values['class']) && $values['class'] == $class) {
                $file_index         = $index - 1;
                $this->_folder_name = basename(dirname($bt[ $file_index ]['file']));
                if (! empty($this->_folder_name)) {
                    break;
                }
            }
        }
        $this->_folder_path = EE_ADMIN_PAGES . $this->_folder_name . '/';
        $this->_file_name   = preg_replace('/^ee/', 'EE', $this->_folder_name);
        $this->_file_name   = ucwords(str_replace('_', ' ', $this->_file_name));
        $this->_file_name   = str_replace(' ', '_', $this->_file_name);
    }


    /**
     * This automatically checks if we have a hook class in the loaded child directory.  If we DO then we will register
     * it with the appropriate pages.  That way all we have to do is make sure the file is named correctly and
     * "dropped" in. Example: if we wanted to set this up for Messages hooking into Events then we would do:
     * events_Messages_Hooks.class.php
     *
     * @param bool $extend This indicates whether we're checking the extend directory for any register_hooks
     *                     files/classes
     * @return array
     */
    public function register_hooks($extend = false)
    {

        // get a list of files in the directory that have the "Hook" in their name an
        // if this is an extended check (i.e. caf is active) then we will scan the caffeinated/extend directory first and any hook files that are found will be have their reference added to the $_files_hook array property.  Then, we make sure that when we loop through the core decaf directories to find hook files that we skip over any hooks files that have already been set by caf.
        if ($extend) {
            $hook_files_glob_path = apply_filters(
                'FHEE__EE_Admin_Page_Init__register_hooks__hook_files_glob_path__extend',
                EE_CORE_CAF_ADMIN_EXTEND
                . $this->_folder_name
                . '/*'
                . $this->_file_name
                . '_Hooks_Extend.class.php'
            );
            $this->_hook_paths    = $this->_register_hook_files($hook_files_glob_path, $extend);
        }
        // loop through decaf folders
        $hook_files_glob_path = apply_filters(
            'FHEE__EE_Admin_Page_Init__register_hooks__hook_files_glob_path',
            $this->_folder_path . '*' . $this->_file_name . '_Hooks.class.php'
        );
        $this->_hook_paths    = array_merge(
            $this->_register_hook_files($hook_files_glob_path),
            $this->_hook_paths
        );  // making sure any extended hook paths are later in the array than the core hook paths!
        return $this->_hook_paths;
    }


    protected function _register_hook_files($hook_files_glob_path, $extend = false)
    {
        $hook_paths = glob($hook_files_glob_path);
        if (empty($hook_paths)) {
            return [];
        }
        foreach ($hook_paths as $file) {
            // lets get the linked admin.
            $hook_file = $extend
                ? str_replace(EE_CORE_CAF_ADMIN_EXTEND . $this->_folder_name . '/', '', $file)
                : str_replace($this->_folder_path, '', $file);
            $replace         = $extend
                ? '_' . $this->_file_name . '_Hooks_Extend.class.php'
                : '_' . $this->_file_name . '_Hooks.class.php';
            $rel_admin       = str_replace($replace, '', $hook_file);
            $rel_admin       = strtolower($rel_admin);
            // make sure we haven't already got a hook setup for this page path
            if (in_array($rel_admin, $this->_files_hooked)) {
                continue;
            }
            $this->hook_file = $hook_file;
            $rel_admin_hook = 'FHEE_do_other_page_hooks_' . $rel_admin;
            add_filter($rel_admin_hook, [$this, 'load_admin_hook']);
            $this->_files_hooked[] = $rel_admin;
        }
        return $hook_paths;
    }


    public function load_admin_hook($registered_pages)
    {
        return array_merge((array) $this->hook_file, $registered_pages);
    }


    /**
     * _initialize_admin_page
     *
     * @see  initialize_admin_page() for info
     */
    protected function _initialize_admin_page()
    {
        // JUST CHECK WE'RE ON RIGHT PAGE.
        $page = $this->request->getRequestParam('page');
        $page = $this->request->getRequestParam('current_page', $page);
        $menu_slug = $this->_menu_map->menu_slug;


        if ($this->_routing && ($page === '' || $page !== $menu_slug)) {
            // not on the right page so let's get out.
            return;
        }
        $this->_load_page = true;

        // we don't need to do a page_request check here because it's only called via WP menu system.
        $admin_page  = $this->_file_name . '_Admin_Page';
        $hook_suffix = "{$menu_slug}_{$admin_page}";
        $admin_page  = apply_filters(
            "FHEE__EE_Admin_Page_Init___initialize_admin_page__admin_page__{$hook_suffix}",
            $admin_page
        );
        if (empty($admin_page)) {
            return;
        }
        // define requested admin page class name then load the file and instantiate
        $path_to_file = str_replace(['\\', '/'], '/', $this->_folder_path . $admin_page . '.core.php');
        // so if the file would be in EE_ADMIN/attendees/Attendee_Admin_Page.core.php, the filter would be:
        // FHEE__EE_Admin_Page_Init___initialize_admin_page__path_to_file__attendees_Attendee_Admin_Page
        $path_to_file = apply_filters(
            "FHEE__EE_Admin_Page_Init___initialize_admin_page__path_to_file__{$hook_suffix}",
            $path_to_file
        );
        if (! is_readable($path_to_file)) {
            return;
        }
        // This is a place where EE plugins can hook in to make sure their own files are required in the appropriate place
        do_action('AHEE__EE_Admin_Page___initialize_admin_page__before_initialization');
        do_action("AHEE__EE_Admin_Page___initialize_admin_page__before_initialization_{$menu_slug}");
        require_once($path_to_file);
        $this->_loaded_page_object = $this->loader->getShared($admin_page, [$this->_routing]);

        do_action('AHEE__EE_Admin_Page___initialize_admin_page__after_initialization');
        do_action("AHEE__EE_Admin_Page___initialize_admin_page__after_initialization_{$menu_slug}");
    }


    public function get_admin_page_name()
    {
        return $this->_file_name . '_Admin_Page';
    }


    /**
     * @return mixed
     */
    public function loaded_page_object()
    {
        return $this->_loaded_page_object;
    }

    /**
     * _check_user_access
     * verifies user access for this admin page.  If no user access is available then let's gracefully exit with a
     * WordPress die message.
     *
     * @return void  wp_die if fail
     */
    private function _check_user_access()
    {
        if (
            ! EE_Registry::instance()->CAP->current_user_can(
                $this->_menu_map->capability,
                $this->_menu_map->menu_slug
            )
        ) {
            wp_die(esc_html__('You don\'t have access to this page.', 'event_espresso'), '', ['back_link' => true]);
        }
    }
}

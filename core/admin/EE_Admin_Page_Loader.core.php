<?php

use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;

/**
 * EE_Admin_Page_Loader
 * This is a controller class used for initializing the Event Espresso Admin system
 * @package         EE_Admin_Page_Loader
 * @subpackage      /core/
 * @author          Darren Ethier
 */
class EE_Admin_Page_Loader
{

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;

    /**
     * _installed_pages
     * objects for page_init objects detected and loaded
     *
     * @access private
     * @var EE_Admin_Page_Init[]
     */
    private $_installed_pages = array();


    /**
     * this is used to hold the registry of menu slugs for all the installed admin pages
     *
     * @var array
     */
    private $_menu_slugs = array();


    /**
     * _caffeinated_extends
     * This array is the generated configuration array for which core EE_Admin pages are extended (and the bits and
     * pieces needed to do so).  This property is defined in the _set_caffeinated method.
     *
     * @var array
     */
    private $_caffeinated_extends = array();


    /**
     * _current_caf_extend_slug
     * This property is used for holding the page slug that is required for referencing the correct
     * _caffeinated_extends index when the corresponding core child EE_Admin_Page_init hooks are executed.
     *
     * @var array
     */
    private $_current_caf_extend_slug;

    /**
     * _prepped_menu_maps
     * This is the prepared array of EE_Admin_Page_Menu_Maps for adding to the admin_menu.
     *
     * @since  4.4.0
     * @var EE_Admin_Page_Menu_Map[]
     */
    private $_prepped_menu_maps = array();


    /**
     * _admin_menu_groups
     * array that holds the group headings and details for
     *
     * @access private
     * @var array
     */
    private $_admin_menu_groups = array();


    /**
     * This property will hold the hook file for setting up the filter that does all the connections between admin
     * pages.
     *
     * @var string
     */
    public $hook_file;


    /**
     * constructor
     *
     * @access public
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        $this->loader = LoaderFactory::getLoader();
        // load menu_map classes
        EE_Registry::instance()->load_file(EE_ADMIN, 'EE_Admin_Page_Menu_Map', 'core');
        // define the default "groups" for the admin_pages
        $this->_set_menu_groups();
        // let's do a scan and see what installed pages we have
        $this->_get_installed_pages();
        // set menus (has to be done on every load - we're not actually loading the page just setting the menus and where they point to).
        add_action('admin_menu', array($this, 'set_menus'));
        add_action('network_admin_menu', array($this, 'set_network_menus'));
    }


    /**
     * When caffeinated system is detected, this method is called to setup the caffeinated directory constants used by
     * files in the caffeinated folder.
     *
     * @access private
     * @return void
     */
    private function _define_caffeinated_constants()
    {
        if (! defined('EE_CORE_CAF_ADMIN')) {
            define('EE_CORE_CAF_ADMIN', EE_PLUGIN_DIR_PATH . 'caffeinated/admin/');
            define('EE_CORE_CAF_ADMIN_URL', EE_PLUGIN_DIR_URL . 'caffeinated/admin/');
            define('EE_CORE_CAF_ADMIN_NEW', EE_CORE_CAF_ADMIN . 'new/');
            define('EE_CORE_CAF_ADMIN_EXTEND', EE_CORE_CAF_ADMIN . 'extend/');
            define('EE_CORE_CAF_ADMIN_EXTEND_URL', EE_CORE_CAF_ADMIN_URL . 'extend/');
            define('EE_CORE_CAF_ADMIN_HOOKS', EE_CORE_CAF_ADMIN . 'hooks/');
        }
    }


    /**
     * _set_menu_groups
     * sets the filterable _admin_menu_groups property (list of various "groupings" within the EE admin menu array)
     *
     * @access private
     * @return void
     * @throws EE_Error
     */
    private function _set_menu_groups()
    {
        // set array of EE_Admin_Page_Menu_Group objects
        $groups = array(
            'main'       => new EE_Admin_Page_Menu_Group(
                array(
                    'menu_label'   => __('Main', 'event_espresso'),
                    'show_on_menu' => EE_Admin_Page_Menu_Map::NONE,
                    'menu_slug'    => 'main',
                    'capability'   => 'ee_read_ee',
                    'menu_order'   => 0,
                    'parent_slug'  => 'espresso_events',
                )
            ),
            'management' => new EE_Admin_Page_Menu_Group(
                array(
                    'menu_label'   => __('Management', 'event_espresso'),
                    'show_on_menu' => EE_Admin_Page_Menu_Map::BLOG_ADMIN_ONLY,
                    'menu_slug'    => 'management',
                    'capability'   => 'ee_read_ee',
                    'menu_order'   => 10,
                    'parent_slug'  => 'espresso_events',
                )
            ),
            'settings'   => new EE_Admin_Page_Menu_Group(
                array(
                    'menu_label'   => __('Settings', 'event_espresso'),
                    'show_on_menu' => EE_Admin_Page_Menu_Map::BLOG_ADMIN_ONLY,
                    'menu_slug'    => 'settings',
                    'capability'   => 'ee_read_ee',
                    'menu_order'   => 30,
                    'parent_slug'  => 'espresso_events',
                )
            ),
            'templates'  => new EE_Admin_Page_Menu_Group(
                array(
                    'menu_label'   => __('Templates', 'event_espresso'),
                    'show_on_menu' => EE_Admin_Page_Menu_Map::BLOG_ADMIN_ONLY,
                    'menu_slug'    => 'templates',
                    'capability'   => 'ee_read_ee',
                    'menu_order'   => 40,
                    'parent_slug'  => 'espresso_events',
                )
            ),
            'extras'     => new EE_Admin_Page_Menu_Group(
                array(
                    'menu_label'              => __('Extras', 'event_espresso'),
                    'show_on_menu'            => EE_Admin_Page_Menu_Map::BLOG_AND_NETWORK_ADMIN,
                    'menu_slug'               => 'extras',
                    'capability'              => 'ee_read_ee',
                    'menu_order'              => 50,
                    'parent_slug'             => 'espresso_events',
                    'maintenance_mode_parent' => 'espresso_maintenance_settings',
                )
            ),
            'tools'      => new EE_Admin_Page_Menu_Group(
                array(
                    'menu_label'   => __('Tools', 'event_espresso'),
                    'show_on_menu' => EE_Admin_Page_Menu_Map::BLOG_ADMIN_ONLY,
                    'menu_slug'    => 'tools',
                    'capability'   => 'ee_read_ee',
                    'menu_order'   => 60,
                    'parent_slug'  => 'espresso_events',
                )
            ),
            'addons'     => new EE_Admin_Page_Menu_Group(
                array(
                    'show_on_menu' => EE_Admin_Page_Menu_Map::BLOG_AND_NETWORK_ADMIN,
                    'menu_label'   => __('Add-ons', 'event_espresso'),
                    'menu_slug'    => 'addons',
                    'capability'   => 'ee_read_ee',
                    'menu_order'   => 20,
                    'parent_slug'  => 'espresso_events',
                )
            ),
        );
        $this->_admin_menu_groups = apply_filters(
            'FHEE__EE_Admin_Page_Loader___set_menu_groups__admin_menu_groups',
            $groups
        );
    }


    /**
     * This takes all the groups in the _admin_menu_groups array and returns the array indexed by group
     * slug.  The other utility with this function is it validates that all the groups are instances of
     * EE_Admin_Page_Menu_Group (cause some invalid things might have slipped in via addons).
     *
     * @return EE_Admin_Page_Menu_Group[]
     * @throws EE_Error
     * @since  4.4.0
     */
    private function _rearrange_menu_groups()
    {
        $groups = array();
        // first let's order the menu groups by their internal menu order
        // (note usort type hinting to ensure the incoming array is EE_Admin_Page_Menu_Map objects )
        usort($this->_admin_menu_groups, array($this, '_sort_menu_maps'));
        foreach ($this->_admin_menu_groups as $group) {
            if (! $group instanceof EE_Admin_Page_Menu_Group) {
                throw new EE_Error(
                    sprintf(
                        __(
                            'Unable to continue sorting the menu groups array because there is an invalid value for the menu groups.  All values in this array are required to be a EE_Admin_Page_Menu_Group object.  Instead there was: %s',
                            'event_espresso'
                        ),
                        print_r($group, true)
                    )
                );
            }
            $groups[ $group->menu_slug ] = $group;
        }
        return $groups;
    }


    /**
     * _get_installed_pages
     * This just gets the list of installed EE_Admin_pages.
     *
     * @access private
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    private function _get_installed_pages()
    {
        $installed_refs = array();
        $exclude = array('assets', 'templates');
        // grab everything in the  admin core directory
        $admin_screens = glob(EE_ADMIN_PAGES . '*', GLOB_ONLYDIR);
        if ($admin_screens) {
            foreach ($admin_screens as $admin_screen) {
                $admin_screen_name = basename($admin_screen);
                // files and anything in the exclude array need not apply
                if (is_dir($admin_screen) && ! in_array($admin_screen_name, $exclude, true)) {
                    // these folders represent the different EE admin pages
                    $installed_refs[ $admin_screen_name ] = $admin_screen;
                }
            }
        }
        if (empty($installed_refs)) {
            $error_msg[] = __(
                'There are no EE_Admin pages detected, it looks like EE did not install properly',
                'event_espresso'
            );
            $error_msg[] = $error_msg[0] . "\r\n"
                           . sprintf(
                               __(
                                   'Check that the %s folder exists and is writable. Maybe try deactivating, then reactivating Event Espresso again.',
                                   'event_espresso'
                               ),
                               EE_ADMIN_PAGES
                           );
            throw new EE_Error(implode('||', $error_msg));
        }
        // this just checks the caffeinated folder and takes care of setting up any caffeinated stuff.
        $installed_refs = $this->_set_caffeinated($installed_refs);
        // allow plugins to add in their own pages (note at this point they will need to have an autoloader defined for their class) OR hook into EEH_Autoloader::load_admin_page() to add their path.;
        $installed_refs = apply_filters(
            'FHEE__EE_Admin_Page_Loader___get_installed_pages__installed_refs',
            $installed_refs
        );
        $this->_caffeinated_extends = apply_filters(
            'FHEE__EE_Admin_Page_Loader___get_installed_pages__caffeinated_extends',
            $this->_caffeinated_extends
        );
        // loop through admin pages and setup the $_installed_pages array.
        $hooks_ref = [];
        foreach ($installed_refs as $page => $path) {
            // set autoloaders for our admin page classes based on included path information
            EEH_Autoloader::register_autoloaders_for_each_file_in_folder($path);
            // build list of installed pages
            $this->_installed_pages[ $page ] = $this->_load_admin_page($page, $path);
            // verify returned object
            if ($this->_installed_pages[ $page ] instanceof EE_Admin_Page_Init) {
                if (! $this->_installed_pages[ $page ]->get_menu_map() instanceof EE_Admin_Page_Menu_Map) {
                    continue;
                }
                // skip if in full maintenance mode and maintenance_mode_parent is set
                $maintenance_mode_parent = $this->_installed_pages[ $page ]->get_menu_map()->maintenance_mode_parent;
                if (empty($maintenance_mode_parent)
                    && EE_Maintenance_Mode::instance()->level() === EE_Maintenance_Mode::level_2_complete_maintenance
                ) {
                    unset($installed_refs[ $page ]);
                    continue;
                }
                $menu_slug = $this->_installed_pages[ $page ]->get_menu_map()->menu_slug;
                $this->_menu_slugs[ $menu_slug ] = $page;
                // flag for register hooks on extended pages b/c extended pages use the default INIT.
                $extend = false;
                // now that we've got the admin_init objects... lets see if there are any caffeinated pages extending the originals.  If there are then let's hook into the init admin filter and load our extend instead.
                if (isset($this->_caffeinated_extends[ $page ])) {
                    $this->_current_caf_extend_slug = $page;
                    $admin_page_name = $this->_installed_pages[ $page ]->get_admin_page_name();
                    $caf_path = $this->_caffeinated_extends[ $this->_current_caf_extend_slug ]['path'];
                    $caf_admin_page = $this->_caffeinated_extends[ $this->_current_caf_extend_slug ]['admin_page'];
                    add_filter(
                        "FHEE__EE_Admin_Page_Init___initialize_admin_page__path_to_file__{$menu_slug}_{$admin_page_name}",
                        static function ($path_to_file) use ($caf_path) {
                            return $caf_path;
                        }
                    );
                    add_filter(
                        "FHEE__EE_Admin_Page_Init___initialize_admin_page__admin_page__{$menu_slug}_{$admin_page_name}",
                        static function ($admin_page) use ($caf_admin_page) {
                            return $caf_admin_page;
                        }
                    );
                    $extend = true;
                }
                // let's do the registered hooks
                $extended_hooks = $this->_installed_pages[ $page ]->register_hooks($extend);
                foreach ($extended_hooks as $key => $value) {
                    $hooks_ref[] = $value;
                }
            }
        }
        // the hooks_ref is all the pages where we have $extended _Hooks files that will extend a class in a different folder.  So we want to make sure we load the file for the parent.
        // first make sure we've got unique values
        $hooks_ref = array_unique($hooks_ref);
        // now let's loop and require!
        foreach ($hooks_ref as $path) {
            require_once($path);
        }
        // make sure we have menu slugs global setup. Used in EE_Admin_Page->page_setup() to ensure we don't do a full class load for an admin page that isn't requested.
        global $ee_menu_slugs;
        $ee_menu_slugs = $this->_menu_slugs;
        // we need to loop again to run any early code
        foreach ($installed_refs as $page => $path) {
            if ($this->_installed_pages[ $page ] instanceof EE_Admin_Page_Init) {
                $this->_installed_pages[ $page ]->do_initial_loads();
            }
        }
        do_action('AHEE__EE_Admin_Page_Loader___get_installed_pages_loaded', $this->_installed_pages);
    }


    /**
     * get_admin_page_object
     *
     * @param string $page_slug
     * @return EE_Admin_Page
     */
    public function get_admin_page_object($page_slug = '')
    {
        if (isset($this->_installed_pages[ $page_slug ])) {
            return $this->_installed_pages[ $page_slug ]->loaded_page_object();
        }
        return null;
    }


    /**
     * _get_classname_for_admin_page
     * generates an "Admin Page" class based on the directory  name
     *
     * @param $dir_name
     * @return string
     */
    private function _get_classname_for_admin_page($dir_name = '')
    {
        $class_name = str_replace('_', ' ', strtolower($dir_name));
        return str_replace(' ', '_', ucwords($class_name)) . '_Admin_Page';
    }


    /**
     * _get_classname_for_admin_init_page
     * generates an "Admin Page Init" class based on the directory  name
     *
     * @param $dir_name
     * @return string
     */
    private function _get_classname_for_admin_init_page($dir_name = '')
    {
        $class_name = str_replace('_', ' ', strtolower($dir_name));
        return str_replace(' ', '_', ucwords($class_name)) . '_Admin_Page_Init';
    }


    /**
     * _load_admin_page
     * Loads and instantiates page_init object for a single EE_admin page.
     *
     * @param string $page page_reference
     * @param string $path
     * @return object|bool  return page object if valid, bool false if not.
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     * @throws InvalidInterfaceException
     */
    private function _load_admin_page($page = '', $path = '')
    {
        $class_name = $this->_get_classname_for_admin_init_page($page);
        EE_Registry::instance()->load_file($path, $class_name, 'core');
        if (! class_exists($class_name)) {
            $inner_error_msg = '<br />'
                               . sprintf(
                                   esc_html__(
                                       'Make sure you have %1$s defined. If this is a non-EE-core admin page then you also must have an autoloader in place for your class',
                                       'event_espresso'
                                   ),
                                   '<strong>' . $class_name . '</strong>'
                               );
            $error_msg[] = sprintf(
                __('Something went wrong with loading the %s admin page.', 'event_espresso'),
                $page
            );
            $error_msg[] = $error_msg[0]
                           . "\r\n"
                           . sprintf(
                               esc_html__(
                                   'There is no Init class in place for the %s admin page.',
                                   'event_espresso'
                               ),
                               $page
                           )
                           . $inner_error_msg;
            throw new EE_Error(implode('||', $error_msg));
        }
        return $this->loader->getShared($class_name);
    }


    /**
     * set_menus
     * This method sets up the menus for EE Admin Pages
     *
     * @access private
     * @return void
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function set_menus()
    {
        // prep the menu pages (sort, group.)
        $this->_prep_pages();
        foreach ($this->_prepped_menu_maps as $menu_map) {
            if (EE_Registry::instance()->CAP->current_user_can($menu_map->capability, $menu_map->menu_slug)) {
                $menu_map->add_menu_page();
            }
        }
    }


    /**
     * set_network_menus
     * This method sets up the menus for network EE Admin Pages.
     * Almost identical to EE_Admin_Page_Loader::set_menus() except pages
     * are only added to the menu map if they are intended for the admin menu
     *
     * @return void
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function set_network_menus()
    {
        $this->_prep_pages();
        foreach ($this->_prepped_menu_maps as $menu_map) {
            if (EE_Registry::instance()->CAP->current_user_can($menu_map->capability, $menu_map->menu_slug)) {
                $menu_map->add_menu_page(true);
            }
        }
    }


    /**
     * _prep_pages
     * sets the _prepped_menu_maps property
     *
     * @access private
     * @return void
     * @throws EE_Error
     * @throws InvalidDataTypeException
     */
    private function _prep_pages()
    {
        $pages_array = array();
        // rearrange _admin_menu_groups to be indexed by group slug.
        $menu_groups = $this->_rearrange_menu_groups();
        foreach ($this->_installed_pages as $page) {
            if ($page instanceof EE_Admin_page_Init) {
                $page_map = $page->get_menu_map();
                // if we've got an array then the menu map is in the old format
                // so let's throw a persistent notice that the admin system isn't setup correctly for this item.
                if ($page_map === null || is_array($page_map)) {
                    new PersistentAdminNotice(
                        'menu_map_warning_' . str_replace(' ', '_', $page->label) . '_' . EVENT_ESPRESSO_VERSION,
                        sprintf(
                            __(
                                'The admin page for %s was not correctly setup because it is using an older method for integrating with Event Espresso Core.  This means that full functionality for this component is not available.  This error message usually appears with an Add-on that is out of date.  Make sure you update all your Event Espresso 4 add-ons to the latest version to ensure they have necessary compatibility updates in place.',
                                'event_espresso'
                            ),
                            $page->label
                        )
                    );
                    continue;
                }
                // if page map is NOT a EE_Admin_Page_Menu_Map object then throw error.
                if (! $page_map instanceof EE_Admin_Page_Menu_Map) {
                    throw new EE_Error(
                        sprintf(
                            __(
                                'The menu map for %s must be an EE_Admin_Page_Menu_Map object.  Instead it is %s.  Please double check that the menu map has been configured correctly.',
                                'event_espresso'
                            ),
                            $page->label,
                            $page_map
                        )
                    );
                }
                // use the maintenance_mode_parent property and maintenance mode status to determine if this page even gets added to array.
                if (empty($page_map->maintenance_mode_parent)
                    && EE_Maintenance_Mode::instance()->level() === EE_Maintenance_Mode::level_2_complete_maintenance
                ) {
                    continue;
                }
                // assign to group (remember $page_map has the admin page stored in it).
                $pages_array[ $page_map->menu_group ][] = $page_map;
            }
        }
        if (empty($pages_array)) {
            throw new EE_Error(__('Something went wrong when prepping the admin pages', 'event_espresso'));
        }
        // let's sort the groups, make sure it's a valid group, add header (if to show).
        foreach ($pages_array as $group => $menu_maps) {
            // valid_group?
            if (! array_key_exists($group, $menu_groups)) {
                continue;
            }
            // sort pages.
            usort($menu_maps, array($this, '_sort_menu_maps'));
            // prepend header
            array_unshift($menu_maps, $menu_groups[ $group ]);
            // reset $pages_array with prepped data
            $pages_array[ $group ] = $menu_maps;
        }

        // now let's setup the _prepped_menu_maps property
        foreach ($menu_groups as $group => $group_objs) {
            if (isset($pages_array[ $group ])) {
                foreach ($pages_array[ $group ] as $key => $value) {
                    $this->_prepped_menu_maps[] = $value;
                }
            }
        }
    }


    /**
     * This method is the "workhorse" for detecting and setting up caffeinated functionality.
     * In this method there are three checks being done:
     * 1. Do we have any NEW admin page sets.  If we do, lets add them into the menu setup (via the $installed_refs
     * array) etc.  (new page sets are found in caffeinated/new/{page})
     * 2. Do we have any EXTENDED page sets.  Basically an extended EE_Admin Page extends the core {child}_Admin_Page
     * class.  eg. would be caffeinated/extend/events/Extend_Events_Admin_Page.core.php and in there would be a class:
     * Extend_Events_Admin_Page extends Events_Admin_Page.
     * 3. Do we have any files just for setting up hooks into other core pages.  The files can be any name in
     * "caffeinated/hooks" EXCEPT they need a ".class.php" extension and the file name must correspond with the
     * classname inside.  These classes are instantiated really early so that any hooks in them are run before the
     * corresponding apply_filters/do_actions that are found in any future loaded EE_Admin pages (INCLUDING caffeinated
     * admin_pages)
     *
     * @param array $installed_refs the original installed_refs array that may contain our NEW EE_Admin_Pages to be
     *                              loaded.
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _set_caffeinated($installed_refs)
    {
        // first let's check if there IS a caffeinated folder. If there is not then lets get out.
        if ((defined('EE_DECAF') && EE_DECAF) || ! is_dir(EE_PLUGIN_DIR_PATH . 'caffeinated/admin')) {
            return $installed_refs;
        }
        $this->_define_caffeinated_constants();
        $exclude = array('tickets');
        // okay let's setup an "New" pages first (we'll return installed refs later)
        $new_admin_screens = glob(EE_CORE_CAF_ADMIN . 'new/*', GLOB_ONLYDIR);
        if ($new_admin_screens) {
            foreach ($new_admin_screens as $admin_screen) {
                $admin_screen_name = basename($admin_screen);
                // files and anything in the exclude array need not apply
                if (is_dir($admin_screen) && ! in_array($admin_screen_name, $exclude, true)) {
                    // these folders represent the different NEW EE admin pages
                    $installed_refs[ $admin_screen_name ] = $admin_screen;
                    // set autoloaders for our admin page classes based on included path information
                    EEH_Autoloader::register_autoloaders_for_each_file_in_folder($admin_screen);
                }
            }
        }
        // let's see if there are any EXTENDS to setup in the $_caffeinated_extends array (that will be used later for hooking into the _initialize_admin_age in the related core_init admin page)
        $extends = glob(EE_CORE_CAF_ADMIN . 'extend/*', GLOB_ONLYDIR);
        if ($extends) {
            foreach ($extends as $extend) {
                if (is_dir($extend)) {
                    $extend_ref = basename($extend);
                    // now let's make sure there is a file that matches the expected format
                    $filename = str_replace(
                        ' ',
                        '_',
                        ucwords(
                            str_replace(
                                '_',
                                ' ',
                                $extend_ref
                            )
                        )
                    );
                    $filename = 'Extend_' . $filename . '_Admin_Page';
                    $this->_caffeinated_extends[ $extend_ref ]['path'] = str_replace(
                        array('\\', '/'),
                        '/',
                        EE_CORE_CAF_ADMIN
                        . 'extend/'
                        . $extend_ref
                        . '/'
                        . $filename
                        . '.core.php'
                    );
                    $this->_caffeinated_extends[ $extend_ref ]['admin_page'] = $filename;
                    // set autoloaders for our admin page classes based on included path information
                    EEH_Autoloader::register_autoloaders_for_each_file_in_folder($extend);
                }
            }
        }
        // let's see if there are any HOOK files and instantiate them if there are (so that hooks are loaded early!).
        $ee_admin_hooks = array();
        $hooks = glob(EE_CORE_CAF_ADMIN . 'hooks/*.class.php');
        if ($hooks) {
            foreach ($hooks as $hook) {
                if (is_readable($hook)) {
                    require_once $hook;
                    $classname = str_replace(
                        [EE_CORE_CAF_ADMIN . 'hooks/', '.class.php'],
                        '',
                        $hook
                    );
                    if (class_exists($classname)) {
                        $admin_page = $this->loader->getShared($classname);
                        $ee_admin_hooks[] = $admin_page;
                    }
                }
            }
        }
        $ee_admin_hooks = apply_filters('FHEE__EE_Admin_Page_Loader__set_caffeinated__ee_admin_hooks', $ee_admin_hooks);
        return $installed_refs;
    }


    /**
     * Utility method for sorting the _menu_maps (callback for usort php function)
     *
     * @since  4.4.0
     * @param  EE_Admin_Page_Menu_Map $a menu_map object
     * @param  EE_Admin_Page_Menu_Map $b being compared to
     * @return int    sort order
     */
    private function _sort_menu_maps(EE_Admin_Page_Menu_Map $a, EE_Admin_Page_Menu_Map $b)
    {
        if ($a->menu_order === $b->menu_order) {
            return 0;
        }
        return ($a->menu_order < $b->menu_order) ? -1 : 1;
    }


    /**
     * _default_header_link
     * This is just a dummy method to use with header submenu items
     *
     * @return bool false
     */
    public function _default_header_link()
    {
        return false;
    }
}

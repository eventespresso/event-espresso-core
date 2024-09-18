<?php

use EventEspresso\core\domain\services\admin\menu\AdminMenuManager;
use EventEspresso\core\domain\services\capabilities\FeatureFlags;
use EventEspresso\core\domain\services\database\MaintenanceStatus;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;

/**
 * EE_Admin_Page_Loader
 * This is a controller class used for initializing the Event Espresso Admin system
 *
 * @package         EE_Admin_Page_Loader
 * @subpackage      /core/
 * @author          Darren Ethier
 */
class EE_Admin_Page_Loader
{
    /**
     * @var AdminMenuManager $menu_manager
     */
    protected $menu_manager;

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
    private $_installed_pages = [];


    /**
     * this is used to hold the registry of menu slugs for all the installed admin pages
     *
     * @var array
     */
    private $_menu_slugs = [];


    /**
     * _caffeinated_extends
     * This array is the generated configuration array for which core EE_Admin pages are extended (and the bits and
     * pieces needed to do so).  This property is defined in the _set_caffeinated method.
     *
     * @var array
     */
    private $_caffeinated_extends = [];


    /**
     * This property will hold the hook file for setting up the filter that does all the connections between admin
     * pages.
     *
     * @var string
     */
    public $hook_file;

    /**
     * @var bool
     * @since 5.0.0.p
     */
    private bool $full_site_maintenance = false;


    /**
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function __construct(?LoaderInterface $loader)
    {
        $this->loader = $loader instanceof LoaderInterface ? $loader : LoaderFactory::getLoader();
        $this->menu_manager = $this->loader->getShared(AdminMenuManager::class);
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.0.p
     */
    public function init()
    {
        $this->menu_manager->initialize();
        $this->full_site_maintenance = MaintenanceStatus::isFullSite();
        // let's do a scan and see what installed pages we have
        $this->findAndLoadAdminPages();
    }


    /**
     * When caffeinated system is detected, this method is called to setup the caffeinated directory constants used by
     * files in the caffeinated folder.
     *
     * @access private
     * @return void
     */
    private function defineCaffeinatedConstants()
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
    private function findAndLoadAdminPages()
    {
        $admin_pages = $this->findAdminPages();
        $isCaffeinated = ! (defined('EE_DECAF') && EE_DECAF) && is_dir(EE_PLUGIN_DIR_PATH . 'caffeinated/admin');
        // first let's check if there IS a caffeinated folder.
        if ($isCaffeinated) {
            // this just checks the caffeinated folder and takes care of setting up any caffeinated stuff.
            $admin_pages = $this->findCaffeinatedAdminPages($admin_pages);
            // then extensions and hooks, although they don't get added to the admin pages array
            $this->findAdminPageExtensions();
            $this->findAdminPageHooks();
        }
        // allow plugins to add in their own pages (note at this point they will need to have an autoloader defined for their class) OR hook into EEH_Autoloader::load_admin_page() to add their path.;
        // loop through admin pages and setup the $_installed_pages array.
        $hooks_ref = [];
        $menu_pages = [];
        foreach ($admin_pages as $page => $path) {
            // don't load the page init class IF IT's ALREADY LOADED !!!
            if (
                isset($this->_installed_pages[ $page ])
                && $this->_installed_pages[ $page ] instanceof EE_Admin_Page_Init
            ) {
                continue;
            }
            // build list of installed pages
            $admin_page_init = $this->loadAdminPageInit($page);
            $this->_installed_pages[ $page ] = $admin_page_init;
            $admin_menu = $this->menu_manager->getAdminMenu($admin_page_init);
            $admin_page_init->setCapability($admin_menu->capability(), $admin_menu->menuSlug());
            // skip if in full maintenance mode and maintenance_mode_parent is NOT set
            if ($this->full_site_maintenance && ! $admin_menu->maintenanceModeParent()) {
                unset($admin_pages[ $page ]);
                continue;
            }
            $menu_slug = $admin_menu->menuSlug();
            $this->_menu_slugs[ $menu_slug ] = $page;
            $menu_pages[ $menu_slug ] = $admin_page_init;

            // now that we've got the admin_init objects...
            // let's see if there are any caffeinated pages extending the originals.
            // If there are then let's hook into the init admin filter and load our extentions instead.
            // Set flag for register hooks on extended pages b/c extended pages use the default INIT.
            $extended_hooks = $admin_page_init->register_hooks(
                $this->loadCaffeinatedExtensions($admin_page_init, $page, $menu_slug)
            );
            $hooks_ref = array_merge($hooks_ref, $extended_hooks);
        }
        // the hooks_ref is all the pages where we have $extended _Hooks files
        // that will extend a class in a different folder.
        // So we want to make sure we load the file for the parent.
        // first make sure we've got unique values
        $hooks_ref = array_unique($hooks_ref);
        // now let's loop and require!
        foreach ($hooks_ref as $path) {
            // if we're not caffeinated, then we don't need to do any of the following.
            if (! $isCaffeinated && strpos($path, 'caffeinated') !== false) {
                continue;
            }
            require_once($path);
        }
        // make sure we have menu slugs global setup. Used in EE_Admin_Page->page_setup() to ensure we don't do a full class load for an admin page that isn't requested.
        global $ee_menu_slugs;
        $ee_menu_slugs = $this->_menu_slugs;
        // we need to loop again to run any early code
        foreach ($this->_installed_pages as $page) {
            $page->do_initial_loads();
        }
        $this->menu_manager->setInstalledPages($menu_pages);
        do_action('AHEE__EE_Admin_Page_Loader___get_installed_pages_loaded', $this->_installed_pages);
    }


    /**
     * @return array
     * @throws EE_Error
     * @since   5.0.0.p
     */
    private function findAdminPages(): array
    {
        // grab everything in the  admin core directory
        $admin_page_folders = $this->findAdminPageFolders(EE_ADMIN_PAGES . '*');
        $admin_page_folders = apply_filters(
            'FHEE__EE_Admin_Page_Loader__findAdminPages__admin_page_folders',
            $admin_page_folders
        );
        if (! empty($admin_page_folders)) {
            return $admin_page_folders;
        }
        $error_msg = esc_html__(
            'There are no EE_Admin pages detected, it looks like EE did not install properly',
            'event_espresso'
        );
        $error_msg .= '||';
        $error_msg .= sprintf(
            esc_html__(
                'Check that the %s folder exists and is writable. Maybe try deactivating, then reactivating Event Espresso again.',
                'event_espresso'
            ),
            EE_ADMIN_PAGES
        );
        throw new RuntimeException($error_msg);
    }


    /**
     * get_admin_page_object
     *
     * @param string $page_slug
     * @return EE_Admin_Page
     */
    public function get_admin_page_object(string $page_slug = ''): ?EE_Admin_Page
    {
        return isset($this->_installed_pages[ $page_slug ])
               && $this->_installed_pages[ $page_slug ] instanceof EE_Admin_Page_Init
            ? $this->_installed_pages[ $page_slug ]->loaded_page_object()
            : null;
    }


    /**
     * generates an "Admin Page Init" class based on the directory  name
     *
     * @param string $dir_name
     * @return string
     */
    private function getClassnameForAdminPageInit(string $dir_name = ''): string
    {
        $class_name = str_replace('_', ' ', strtolower($dir_name));
        return str_replace(' ', '_', ucwords($class_name)) . '_Admin_Page_Init';
    }


    /**
     * _load_admin_page
     * Loads and instantiates page_init object for a single EE_admin page.
     *
     * @param string $page page_reference
     * @return EE_Admin_Page_Init
     * @throws EE_Error
     */
    private function loadAdminPageInit(string $page = ''): EE_Admin_Page_Init
    {
        $class_name = $this->getClassnameForAdminPageInit($page);
        if (class_exists($class_name)) {
            $admin_page_init = $this->loader->getShared($class_name);
            // verify returned object
            if ($admin_page_init instanceof EE_Admin_Page_Init) {
                return $admin_page_init;
            }
        }
        $error_msg = sprintf(
            esc_html__('Something went wrong with loading the %s admin page.', 'event_espresso'),
            $page
        );
        $error_msg .= '||'; // separates public from developer messages
        $error_msg .= "\r\n";
        $error_msg .= sprintf(
            esc_html__('There is no Init class in place for the %s admin page.', 'event_espresso'),
            $page
        );
        $error_msg .= '<br />';
        $error_msg .= sprintf(
            esc_html__(
                'Make sure you have %1$s defined. If this is a non-EE-core admin page then you also must have an autoloader in place for your class',
                'event_espresso'
            ),
            '<strong>' . $class_name . '</strong>'
        );
        throw new EE_Error($error_msg);
    }


    /**
     * This method is the "workhorse" for detecting and setting up caffeinated functionality.
     * In this method there are three checks being done:
     * 1. Do we have any NEW admin page sets.  If we do, lets add them into the menu setup (via the $admin_pages
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
     * @param array $admin_pages the original installed_refs array that may contain our NEW EE_Admin_Pages to be
     *                              loaded.
     * @return array
     * @throws EE_Error
     */
    private function findCaffeinatedAdminPages(array $admin_pages): array
    {
        $this->defineCaffeinatedConstants();

        $exclude = ['tickets'];
        $feature = $this->loader->getShared(FeatureFlags::class);
        if (! $feature->allowed('use_edd_plugin_licensing')) {
            $exclude[] = 'license_keys';
        }
        // okay let's setup an "New" pages first (we'll return installed refs later)
        $admin_pages += $this->findAdminPageFolders(EE_CORE_CAF_ADMIN . 'new/*', $exclude);

        return apply_filters(
            'FHEE__EE_Admin_Page_Loader___get_installed_pages__installed_refs',
            $admin_pages
        );
    }


    /**
     * @throws EE_Error
     * @since   5.0.0.p
     */
    private function findAdminPageExtensions()
    {
        // let's see if there are any EXTENDS to set up in the $_caffeinated_extends array
        // (that will be used later for hooking into the _initialize_admin_age in the related core_init admin page)
        $extensions = $this->findAdminPageFolders(EE_CORE_CAF_ADMIN . 'extend/*');
        if ($extensions) {
            foreach ($extensions as $folder => $extension) {
                // convert lowercase_snake_case to Uppercase_Snake_Case
                $filename = str_replace(' ', '_', ucwords(str_replace('_', ' ', $folder)));
                $filename = "Extend_{$filename}_Admin_Page";
                $filepath = EE_CORE_CAF_ADMIN . "extend/$folder/$filename.core.php";
                // save filename and filepath for later
                $this->_caffeinated_extends[ $folder ]['path']       = str_replace(['\\', '/'], '/', $filepath);
                $this->_caffeinated_extends[ $folder ]['admin_page'] = $filename;
            }
        }
        $this->_caffeinated_extends = apply_filters(
            'FHEE__EE_Admin_Page_Loader___get_installed_pages__caffeinated_extends',
            $this->_caffeinated_extends
        );
    }


    private function loadCaffeinatedExtensions(
        EE_Admin_Page_Init $admin_page_init,
        string $page,
        string $menu_slug
    ): bool {
        if (! isset($this->_caffeinated_extends[ $page ])) {
            return false;
        }
        $admin_page_name = $admin_page_init->get_admin_page_name();
        $caf_path        = $this->_caffeinated_extends[ $page ]['path'];
        $caf_admin_page  = $this->_caffeinated_extends[ $page ]['admin_page'];
        add_filter(
            "FHEE__EE_Admin_Page_Init___initialize_admin_page__path_to_file__{$menu_slug}_$admin_page_name",
            static function ($path_to_file) use ($caf_path) {
                return $caf_path;
            }
        );
        add_filter(
            "FHEE__EE_Admin_Page_Init___initialize_admin_page__admin_page__{$menu_slug}_$admin_page_name",
            static function ($admin_page) use ($caf_admin_page) {
                return $caf_admin_page;
            }
        );
        return true;
    }


    /**
     * @throws EE_Error
     * @since   5.0.0.p
     */
    private function findAdminPageHooks()
    {
        // let's see if there are any HOOK files and instantiate them if there are (so that hooks are loaded early!).
        $ee_admin_hooks   = [];
        $admin_page_hooks = $this->findAdminPageFolders(EE_CORE_CAF_ADMIN . 'hooks/*.class.php', [], 0, false);
        if ($admin_page_hooks) {
            foreach ($admin_page_hooks as $hook) {
                if (is_readable($hook)) {
                    require_once $hook;
                    $classname = str_replace([EE_CORE_CAF_ADMIN . 'hooks/', '.class.php'], '', $hook);
                    if (class_exists($classname)) {
                        $ee_admin_hooks[] = $this->loader->getShared($classname);
                    }
                }
            }
        }
        apply_filters('FHEE__EE_Admin_Page_Loader__set_caffeinated__ee_admin_hooks', $ee_admin_hooks);
    }


    /**
     * _default_header_link
     * This is just a dummy method to use with header submenu items
     *
     * @return bool false
     */
    public function _default_header_link(): bool
    {
        return false;
    }


    /**
     * @param string $path
     * @param int    $flags
     * @param array  $exclude
     * @param bool   $register_autoloaders
     * @return array
     * @throws EE_Error
     * @since 5.0.0.p
     */
    private function findAdminPageFolders(
        string $path,
        array $exclude = [],
        int $flags = GLOB_ONLYDIR,
        bool $register_autoloaders = true
    ): array {
        $folders = [];
        $subfolders = glob($path, $flags);
        if ($subfolders) {
            foreach ($subfolders as $admin_screen) {
                $admin_screen_name = basename($admin_screen);
                // files and anything in the exclude array need not apply
                if (! in_array($admin_screen_name, $exclude, true)) {
                    // these folders represent the different EE admin pages
                    $folders[ $admin_screen_name ] = $admin_screen;
                    if ($register_autoloaders) {
                        // set autoloaders for our admin page classes based on included path information
                        EEH_Autoloader::register_autoloaders_for_each_file_in_folder($admin_screen);
                    }
                }
            }
        }
        return $folders;
    }
}

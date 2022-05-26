<?php

namespace EventEspresso\core\domain\services\admin\menu;

use DomainException;
use EE_Admin_Page_Init;
use EE_Error;
use EE_Maintenance_Mode;
use EventEspresso\core\domain\entities\admin\menu\AdminMenuGroup;
use EventEspresso\core\domain\entities\admin\menu\AdminMenuItem;
use EventEspresso\core\domain\entities\admin\menu\AdminMenuMainItem;
use EventEspresso\core\domain\entities\admin\menu\AdminMenuSubItem;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use Exception;
use OutOfRangeException;

class AdminMenuManager
{
    /**
     * Default: null - defaults to below Comments
     *
     * 5 - below Posts
     * 10 - below Media
     * 15 - below Links
     * 20 - below Pages
     * 25 - below comments
     * 60 - below first separator
     * 65 - below Plugins
     * 70 - below Users
     * 75 - below Tools
     * 80 - below Settings
     * 100 - below second separator
     */
    const MENU_POSITION = 100;

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;

    /**
     * This is the prepared array of EE_Admin_Page_Menu_Maps for adding to the admin_menu.
     *
     * @var AdminMenuItem[]
     */
    private $admin_menu = [];

    /**
     * objects for page_init objects detected and loaded
     *
     * @var EE_Admin_Page_Init[]
     */
    private $installed_pages = [];

    /**
     * set to TRUE if site is currently in maintenance mode level 2
     *
     * @var bool
     */
    protected $maintenance_mode = false;


    /**
     * @param LoaderInterface|null $loader
     */
    public function __construct(?LoaderInterface $loader)
    {
        $this->loader = $loader instanceof LoaderInterface ? $loader : LoaderFactory::getLoader();
        add_filter('custom_menu_order', '__return_true');
        add_filter('menu_order', [$this, 'reorderAdminMenu']);
    }


    /**
     * @since $VID:$
     */
    public function initialize()
    {
        $this->maintenance_mode = EE_Maintenance_Mode::instance()->level() === EE_Maintenance_Mode::level_2_complete_maintenance;
        $this->initializeMenuGroups();
        // set menus (has to be done on every load - we're not actually loading the page just setting the menus and where they point to).
        add_action('admin_menu', [$this, 'generateAdminMenu'], 999);
        add_action('network_admin_menu', [$this, 'generateNetworkAdminMenu'], 999);
    }


    /**
     * @param EE_Admin_Page_Init[] $installed_pages
     */
    public function setInstalledPages(array $installed_pages): void
    {
        $this->installed_pages = $installed_pages;
    }


    /**
     * instantiates and returns the appropriate AdminMenuItem for the provided EE_Admin_Page_Init
     *
     * @param EE_Admin_Page_Init $admin_page_init
     * @return AdminMenuItem
     */
    public function getAdminMenu(EE_Admin_Page_Init $admin_page_init): AdminMenuItem
    {
        // see if admin page init is using new classes
        $menu_properties = $admin_page_init->getMenuProperties();
        if (empty($menu_properties)) {
            // no? ok setup the admin menu item the old way
            $admin_page_init->setupLegacyAdminMenuItem();
        } else {
            // adding the admin page init callback here means the menu doesn't have to cart that object around
            $menu_properties['menu_callback'] = [$admin_page_init, 'initialize_admin_page'];
            $admin_page_init->setAdminMenu($this->instantiateAdminMenu($menu_properties));
        }
        $admin_menu = $admin_page_init->adminMenu();
        if (! $admin_menu instanceof AdminMenuItem) {
            throw new DomainException(esc_html__('Invalid AdminMenuItem', 'event_espresso'));
        }
        if (! is_callable($admin_menu->menuCallback())) {
            $admin_menu->setMenuCallback([$admin_page_init, 'initialize_admin_page']);
        }
        // get the menu group that this menu item belongs to and then add it
        $admin_group = $this->getMenuGroup($admin_menu);
        $admin_group->addMenuItem($admin_menu);
        return $admin_menu;
    }


    /**
     * @param array $menu_properties
     * @return AdminMenuItem|null
     */
    private function instantiateAdminMenu(array $menu_properties): ?AdminMenuItem
    {
        $type = $menu_properties['menu_type'] ?? AdminMenuItem::TYPE_MENU_GROUP;
        unset($menu_properties['menu_type']);
        switch ($type) {
            case AdminMenuItem::TYPE_MENU_GROUP:
                unset($menu_properties['menu_callback']);
                return new AdminMenuGroup($menu_properties);
            case AdminMenuItem::TYPE_MENU_ITEM:
                return new AdminMenuMainItem($menu_properties);
            case AdminMenuItem::TYPE_MENU_SUB_ITEM:
                return new AdminMenuSubItem($menu_properties);
        }
        return null;
    }


    /**
     * sets the filterable _admin_menu_groups property (list of various "groupings" within the EE admin menu array)
     *
     * @return void
     */
    private function initializeMenuGroups()
    {
        // set array of AdminMenuGroup objects
        $this->admin_menu = apply_filters(
            'FHEE__EE_Admin_Page_Loader___set_menu_groups__admin_menu_groups',
            [
                'main'       => $this->instantiateAdminMenu(
                    [
                        'menu_label'   => esc_html__('Main', 'event_espresso'),
                        'show_on_menu' => AdminMenuItem::DISPLAY_NONE,
                        'menu_slug'    => 'main',
                        'capability'   => 'ee_read_ee',
                        'menu_order'   => 0,
                        'parent_slug'  => 'espresso_events',
                    ]
                ),
                'management' => $this->instantiateAdminMenu(
                    [
                        'menu_label'   => esc_html__('Management', 'event_espresso'),
                        'show_on_menu' => AdminMenuItem::DISPLAY_BLOG_ONLY,
                        'menu_slug'    => 'management',
                        'capability'   => 'ee_read_ee',
                        'menu_order'   => 10,
                        'parent_slug'  => 'espresso_events',
                    ]
                ),
                'addons'     => $this->instantiateAdminMenu(
                    [
                        'show_on_menu' => AdminMenuItem::DISPLAY_BLOG_AND_NETWORK,
                        'menu_label'   => esc_html__('Add-ons', 'event_espresso'),
                        'menu_slug'    => 'addons',
                        'capability'   => 'ee_read_ee',
                        'menu_order'   => 20,
                        'parent_slug'  => 'espresso_events',
                    ]
                ),
                'settings'   => $this->instantiateAdminMenu(
                    [
                        'menu_label'   => esc_html__('Settings', 'event_espresso'),
                        'show_on_menu' => AdminMenuItem::DISPLAY_BLOG_ONLY,
                        'menu_slug'    => 'settings',
                        'capability'   => 'ee_read_ee',
                        'menu_order'   => 30,
                        'parent_slug'  => 'espresso_events',
                    ]
                ),
                'templates'  => $this->instantiateAdminMenu(
                    [
                        'menu_label'   => esc_html__('Templates', 'event_espresso'),
                        'show_on_menu' => AdminMenuItem::DISPLAY_BLOG_ONLY,
                        'menu_slug'    => 'templates',
                        'capability'   => 'ee_read_ee',
                        'menu_order'   => 40,
                        'parent_slug'  => 'espresso_events',
                    ]
                ),
                'extras'     => $this->instantiateAdminMenu(
                    [
                        'menu_label'              => esc_html__('Extras', 'event_espresso'),
                        'show_on_menu'            => AdminMenuItem::DISPLAY_BLOG_AND_NETWORK,
                        'menu_slug'               => 'extras',
                        'capability'              => 'ee_read_ee',
                        'menu_order'              => 50,
                        'parent_slug'             => 'espresso_events',
                        'maintenance_mode_parent' => 'espresso_maintenance_settings',
                    ]
                ),
                'tools'      => $this->instantiateAdminMenu(
                    [
                        'menu_label'   => esc_html__('Tools', 'event_espresso'),
                        'show_on_menu' => AdminMenuItem::DISPLAY_BLOG_ONLY,
                        'menu_slug'    => 'tools',
                        'capability'   => 'ee_read_ee',
                        'menu_order'   => 60,
                        'parent_slug'  => 'espresso_events',
                    ]
                ),
            ]
        );
    }


    private function getMenuGroup(AdminMenuItem $admin_menu): AdminMenuGroup
    {
        if (! isset($this->admin_menu[ $admin_menu->menuGroup() ])) {
            throw new OutOfRangeException(esc_html__('AdminMenuGroup does not exist', 'event_espresso'));
        }
        $admin_group = $this->admin_menu[ $admin_menu->menuGroup() ];
        if (! $admin_group instanceof AdminMenuGroup) {
            throw new DomainException(esc_html__('Invalid AdminMenuGroup found', 'event_espresso'));
        }
        return $admin_group;
    }


    /**
     * set_network_menus
     * This method sets up the menus for network EE Admin Pages.
     * Almost identical to EE_Admin_Page_Loader::set_menus() except pages
     * are only added to the menu map if they are intended for the admin menu
     *
     * @return void
     * @throws DomainException
     */
    public function generateNetworkAdminMenu()
    {
        $this->generateAdminMenu(true);
    }


    /**
     * This method sets up the menus for EE Admin Pages
     *
     * @return void
     * @throws DomainException
     */
    public function generateAdminMenu(bool $network_admin = false)
    {
        $admin_menu = $this->sortMenu($this->admin_menu);
        $this->registerAdminMenu($admin_menu, $network_admin);
    }


    private function registerAdminMenu(array $admin_menu, bool $network_admin)
    {
        foreach ($admin_menu as $menu_item) {
            if ($menu_item instanceof AdminMenuItem && $menu_item->currentUserHasAccess()) {
                $sub_items = [];
                // if menu item is a group and has no sub-items,
                // or if its a regular menu item but is hidden, skip it
                if ($menu_item instanceof AdminMenuGroup) {
                    $sub_items = $menu_item->getMenuItems();
                    if (empty($sub_items)) {
                        continue;
                    }
                } elseif (! $menu_item->showOnMenu()) {
                    continue;
                }
                $wp_page_slug    = $menu_item->registerAdminMenuItem($network_admin);
                $admin_init_page = $this->installed_pages[ $menu_item->menuSlug() ] ?? null;
                if ($wp_page_slug && $admin_init_page instanceof EE_Admin_Page_Init) {
                    try {
                        $admin_init_page->setWpPageSlug($wp_page_slug);
                        $admin_init_page->set_page_dependencies($wp_page_slug);
                    } catch (Exception $e) {
                        EE_Error::add_error($e->getMessage(), $e->getFile(), __FUNCTION__, $e->getLine());
                    }
                }
                if ($menu_item instanceof AdminMenuGroup) {
                    $this->registerAdminMenu($sub_items, $network_admin);
                }
            }
        }
    }


    /**
     * Recursively sort menu groups and their sub items
     *
     * @return AdminMenuItem[]
     * @throws DomainException
     */
    public function sortMenu(array $admin_menu): array
    {
        foreach ($admin_menu as $menu_group) {
            if (! $menu_group instanceof AdminMenuItem) {
                throw new DomainException(esc_html__('Invalid AdminMenuItem', 'event_espresso'));
            }
            if ($menu_group instanceof AdminMenuGroup) {
                // sort sub items
                $menu_items = $this->sortMenu($menu_group->getMenuItems());
                $menu_group->setMenuItems($menu_items);
            }
        }
        // sort incoming array AFTER it's been looped through and elements have been validated
        usort($admin_menu, [$this, 'sortMenuItems']);
        return $admin_menu;
    }


    /**
     * Utility method for sorting the _menu_maps (callback for usort php function)
     *
     * @param AdminMenuItem $a menu_item
     * @param AdminMenuItem $b being compared to
     * @return int    sort order
     * @since  4.4.0
     */
    private function sortMenuItems(AdminMenuItem $a, AdminMenuItem $b): int
    {
        if ($a->menuOrder() === $b->menuOrder()) {
            return 0;
        }
        return $a->menuOrder() < $b->menuOrder() ? -1 : 1;
    }


    /**
     * Moves the Event Espresso admin menu to the position set by the AdminMenuManager::MENU_POSITION constant
     *
     * @param array $menu_order
     * @return array
     * @since $VID:$
     */
    public function reorderAdminMenu(array $menu_order): array
    {
        $current_index = array_search('espresso_events', $menu_order);
        if ($current_index === false) {
            return $menu_order;
        }
        // chop out the espresso admin menu if found
        $espresso_menu = array_splice($menu_order, $current_index, 1);
        // reinsert at position set by AdminMenuManager::MENU_POSITION constant
        array_splice($menu_order, AdminMenuManager::MENU_POSITION, 0, $espresso_menu);
        return $menu_order;
    }
}
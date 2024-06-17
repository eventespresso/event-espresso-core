<?php

namespace EventEspresso\core\domain\services\admin\menu;

use DomainException;
use EE_Admin_Page_Init;
use EE_Error;
use EventEspresso\core\domain\entities\admin\menu\AdminMenuGroup;
use EventEspresso\core\domain\entities\admin\menu\AdminMenuItem;
use EventEspresso\core\domain\entities\admin\menu\AdminMenuSubItem;
use EventEspresso\core\domain\entities\admin\menu\AdminMenuTopLevel;
use EventEspresso\core\domain\services\database\MaintenanceStatus;
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
    const DEFAULT_MENU_POSITION = 100;


    /**
     * @var AdminMenuItem[]
     */
    private array $menu_items = [];

    /**
     * objects for page_init objects detected and loaded
     *
     * @var EE_Admin_Page_Init[]
     */
    private array $installed_pages = [];

    /**
     * set to TRUE if site is currently in maintenance mode level 2
     *
     * @var bool
     */
    protected bool $maintenance_mode = false;

    /**
     * same values used by AdminMenuManager::DEFAULT_MENU_POSITION
     *
     * @var int
     */
    private int $menu_position;

    /**
     * @var AdminMenuItem
     */
    private AdminMenuItem $top_level_menu_item;


    public function __construct()
    {
    }


    public function initialize()
    {
        $this->maintenance_mode = MaintenanceStatus::isFullSite();
        $this->menu_position = apply_filters(
            'FHEE__EventEspresso_core_domain_services_admin_menu_AdminMenuManager__initialize__menu_position',
            AdminMenuManager::DEFAULT_MENU_POSITION,
            $this->maintenance_mode
        );
        $this->addTopLevelMenuItem();
        $this->initializeMenuGroups();
        add_action('admin_menu', [$this, 'generateAdminMenu']);
        add_action('network_admin_menu', [$this, 'generateNetworkAdminMenu']);
        add_filter('custom_menu_order', '__return_true');
        add_filter('menu_order', [$this, 'reorderAdminMenu']);
    }


    /**
     * adds the top level menu item that everything else descends from.
     * changes depending on whether site is in full maintenance mode or not
     *
     * @return void
     */
    private function addTopLevelMenuItem()
    {
        $this->top_level_menu_item = $this->maintenance_mode
            ? $this->instantiateAdminMenu(
                [
                    'menu_slug'    => 'espresso_maintenance_settings',
                    'menu_label'   => esc_html__('Event Espresso', 'event_espresso'),
                    'capability'   => 'manage_options',
                    'menu_group'   => 'main',
                    'menu_order'   => 10,
                    'menu_type'    => AdminMenuItem::TYPE_MENU_TOP,
                    'parent_slug'  => 'espresso_maintenance_settings',
                    'show_on_menu' => AdminMenuItem::DISPLAY_BLOG_ONLY,
                ]
            )
            : $this->instantiateAdminMenu(
                [
                    'menu_slug'    => 'espresso_events',
                    'menu_label'   => esc_html__('Event Espresso', 'event_espresso'),
                    'capability'   => 'ee_read_events',
                    'menu_group'   => 'main',
                    'menu_order'   => 10,
                    'menu_type'    => AdminMenuItem::TYPE_MENU_TOP,
                    'parent_slug'  => 'espresso_events',
                    'show_on_menu' => AdminMenuItem::DISPLAY_BLOG_ONLY,
                ]
            );
    }


    /**
     * sets the filterable _admin_menu_groups property (list of various "groupings" within the EE admin menu array)
     *
     * @return void
     */
    private function initializeMenuGroups()
    {
        $this->menu_items = apply_filters(
            'FHEE__EE_Admin_Page_Loader___set_menu_groups__admin_menu_groups',
            [
                'main'       => $this->instantiateAdminMenu(
                    [
                        'menu_slug'               => 'main',
                        'menu_label'              => esc_html__('Main', 'event_espresso'),
                        'capability'              => $this->maintenance_mode ? 'manage_options' : 'ee_read_ee',
                        'maintenance_mode_parent' => 'espresso_maintenance_settings',
                        'menu_order'              => 0,
                        'parent_slug'             => 'espresso_events',
                        'show_on_menu'            => AdminMenuItem::DISPLAY_NONE,
                    ]
                ),
                'management' => $this->instantiateAdminMenu(
                    [
                        'menu_slug'    => 'management',
                        'menu_label'   => esc_html__('Management', 'event_espresso'),
                        'capability'   => 'ee_read_ee',
                        'menu_order'   => 10,
                        'parent_slug'  => 'espresso_events',
                        'show_on_menu' => AdminMenuItem::DISPLAY_BLOG_ONLY,
                    ]
                ),
                'addons'     => $this->instantiateAdminMenu(
                    [
                        'menu_slug'    => 'addons',
                        'menu_label'   => esc_html__('Add-ons', 'event_espresso'),
                        'capability'   => 'ee_read_ee',
                        'menu_order'   => 20,
                        'parent_slug'  => 'espresso_events',
                        'show_on_menu' => AdminMenuItem::DISPLAY_BLOG_AND_NETWORK,
                    ]
                ),
                'settings'   => $this->instantiateAdminMenu(
                    [
                        'menu_slug'    => 'settings',
                        'menu_label'   => esc_html__('Settings', 'event_espresso'),
                        'capability'   => 'ee_read_ee',
                        'menu_order'   => 30,
                        'parent_slug'  => 'espresso_events',
                        'show_on_menu' => AdminMenuItem::DISPLAY_BLOG_ONLY,
                    ]
                ),
                'templates'  => $this->instantiateAdminMenu(
                    [
                        'menu_slug'    => 'templates',
                        'menu_label'   => esc_html__('Templates', 'event_espresso'),
                        'capability'   => 'ee_read_ee',
                        'menu_order'   => 40,
                        'parent_slug'  => 'espresso_events',
                        'show_on_menu' => AdminMenuItem::DISPLAY_BLOG_ONLY,
                    ]
                ),
                'extras'     => $this->instantiateAdminMenu(
                    [
                        'menu_slug'               => 'extras',
                        'menu_label'              => esc_html__('Extras', 'event_espresso'),
                        'capability'              => 'ee_read_ee',
                        'maintenance_mode_parent' => 'espresso_maintenance_settings',
                        'menu_order'              => 50,
                        'parent_slug'             => 'espresso_events',
                        'show_on_menu'            => AdminMenuItem::DISPLAY_BLOG_AND_NETWORK,
                    ]
                ),
                'tools'      => $this->instantiateAdminMenu(
                    [
                        'menu_slug'    => 'tools',
                        'menu_label'   => esc_html__('Tools', 'event_espresso'),
                        'capability'   => 'ee_read_ee',
                        'menu_order'   => 60,
                        'parent_slug'  => 'espresso_events',
                        'show_on_menu' => AdminMenuItem::DISPLAY_BLOG_ONLY,
                    ]
                ),
            ]
        );
    }


    /**
     * adds an AdminMenuItem
     *
     * @param AdminMenuItem $admin_menu_item
     * @return AdminMenuItem
     */
    public function addAdminMenuItem(AdminMenuItem $admin_menu_item): AdminMenuItem
    {
        // get the menu group that this menu item belongs to and then add it
        $admin_group = $this->getMenuGroup($admin_menu_item);
        $admin_group->addMenuItem($admin_menu_item);
        return $admin_menu_item;
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
            case AdminMenuItem::TYPE_MENU_TOP:
                return new AdminMenuTopLevel($menu_properties);
            case AdminMenuItem::TYPE_MENU_SUB_ITEM:
                return new AdminMenuSubItem($menu_properties);
        }
        return null;
    }


    /**
     * @param AdminMenuItem $admin_menu
     * @return AdminMenuGroup
     * @throws DomainException
     * @throws OutOfRangeException
     */
    private function getMenuGroup(AdminMenuItem $admin_menu): AdminMenuGroup
    {
        if (! isset($this->menu_items[ $admin_menu->menuGroup() ])) {
            throw new OutOfRangeException(esc_html__('AdminMenuGroup does not exist', 'event_espresso'));
        }
        $admin_group = $this->menu_items[ $admin_menu->menuGroup() ];
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
        $admin_menu = $this->sortMenu($this->menu_items);
        $this->top_level_menu_item->registerAdminMenuItem($network_admin);
        $this->registerAdminMenu($admin_menu, $network_admin);
    }


    /**
     * @param array $admin_menu
     * @param bool  $network_admin
     */
    private function registerAdminMenu(array $admin_menu, bool $network_admin)
    {
        foreach ($admin_menu as $menu_item) {
            if ($this->skipMenuItem($menu_item)) {
                continue;
            }
            try {
                $wp_page_slug    = $menu_item->registerAdminMenuItem($network_admin);
                $admin_init_page = $this->installed_pages[ $menu_item->menuSlug() ] ?? null;
                if ($wp_page_slug && $admin_init_page instanceof EE_Admin_Page_Init) {
                    $admin_init_page->setWpPageSlug($wp_page_slug);
                    $admin_init_page->set_page_dependencies($wp_page_slug);
                }
                if ($menu_item instanceof AdminMenuGroup) {
                    $this->registerAdminMenu($menu_item->getMenuItems(), $network_admin);
                }
            } catch (Exception $e) {
                EE_Error::add_error($e->getMessage(), $e->getFile(), __FUNCTION__, $e->getLine());
            }
        }
    }


    /**
     * returns TRUE if any of the following conditions is met:
     * - menu item is NOT an instanceof AdminMenuItem
     * - menu item has already been registered
     * - menu item should not be shown when site is in full maintenance mode
     * - current user does not have the required access permission
     * - menu item is a group but has no sub items
     *
     * @param AdminMenuItem|null $menu_item
     * @return bool
     */
    private function skipMenuItem(?AdminMenuItem $menu_item): bool
    {
        return ! $menu_item instanceof AdminMenuItem
               || $menu_item->isRegistered()
               || ! $menu_item->showOnMaintenanceModeMenu()
               || ! $menu_item->currentUserHasAccess()
               || (
                   $menu_item instanceof AdminMenuGroup
                   && $menu_item->hasNoMenuItems()
               );
    }


    /**
     * @param EE_Admin_Page_Init[] $installed_pages
     */
    public function setInstalledPages(array $installed_pages): void
    {
        $this->installed_pages = $installed_pages;
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
     *  sort sub menu items
     *
     * @param AdminMenuItem $a menu_item
     * @param AdminMenuItem $b being compared to
     * @return int    sort order
     */
    private function sortMenuItems(AdminMenuItem $a, AdminMenuItem $b): int
    {
        if ($a->menuOrder() === $b->menuOrder()) {
            return 0;
        }
        return $a->menuOrder() < $b->menuOrder() ? -1 : 1;
    }


    /**
     * Moves the Event Espresso admin menu to the position set by $this->menu_position
     *
     * @param array $menu_order
     * @return array
     */
    public function reorderAdminMenu(array $menu_order): array
    {
        $menu_slug     = $this->maintenance_mode ? 'espresso_maintenance_settings' : 'espresso_events';
        $current_index = array_search($menu_slug, $menu_order);
        if ($current_index === false) {
            return $menu_order;
        }
        // chop out the espresso admin menu if found
        $espresso_menu = array_splice($menu_order, $current_index, 1);
        // reinsert at position set by $this->menu_position
        array_splice($menu_order, $this->menu_position, 0, $espresso_menu);
        return $menu_order;
    }
}

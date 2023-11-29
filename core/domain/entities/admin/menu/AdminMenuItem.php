<?php

namespace EventEspresso\core\domain\entities\admin\menu;

use DomainException;
use EE_Admin_Page_Init;
use EE_Capabilities;
use EventEspresso\core\domain\services\database\MaintenanceStatus;
use InvalidArgumentException;
use OutOfBoundsException;

abstract class AdminMenuItem
{
    public const DISPLAY_NONE             = 0;

    public const DISPLAY_BLOG_ONLY        = 1;

    public const DISPLAY_BLOG_AND_NETWORK = 2;

    public const DISPLAY_NETWORK_ONLY     = 3;

    public const TYPE_MENU_TOP           = 'top';

    public const TYPE_MENU_GROUP          = 'group';

    public const TYPE_MENU_SUB_ITEM       = 'sub-item';


    /**
     * What capability is required to access this page.
     *
     * @since 4.4.0
     * @var string
     */
    protected $capability = 'administrator';

    /**
     * set to TRUE if site is currently in maintenance mode level 2
     *
     * @var bool
     */
    protected bool $maintenance_mode = false;

    /**
     * Menu maps can define a parent slug that gets used instead of the main parent slug for the menu when
     * EE_Maintenance_Mode::STATUS_FULL_SITE is active.
     *
     * @var string
     */
    public $maintenance_mode_parent = '';

    /**
     * The callback for displaying the page that the menu references.
     *
     * @since 4.4.0
     * @var string
     */
    protected $menu_callback;

    /**
     * The EE specific group this menu item belongs in (group slug).
     *
     * @since 4.4.0
     * @var string
     */
    protected $menu_group;

    /**
     * The label for the menu item. (What shows up in the actual menu).
     *
     * @since 4.4.0
     * @var string
     */
    protected $menu_label;

    /**
     * What order this item should be in the menu.
     *
     * @since 4.4.0
     * @var int
     */
    protected $menu_order;

    /**
     * What slug should be used to reference this menu item.
     *
     * @since 4.4.0
     * @var string
     */
    protected $menu_slug;

    /**
     * What menu item is the parent of this menu item.
     *
     * @since 4.4.0
     * @var string
     */
    protected $parent_slug;

    /**
     * set to TRUE once menu item has been added to generated menu
     *
     * @var bool
     */
    protected $registered = false;

    /**
     * Whether this item is displayed in the menu or not.
     * Sometimes an EE Admin Page needs to register itself but is not accessible via the WordPress
     * admin menu.
     *
     * @since 4.4.0
     * @var int
     */
    protected $show_on_menu = self::DISPLAY_BLOG_ONLY;

    /**
     * The title for the menu page. (the page the menu links to)
     *
     * @since  4.4.0
     * @var string
     */
    protected $title;


    /**
     * @param array $menu_args            An array of arguments used to setup the menu properties on construct.
     * @param array $required             An array of keys that should be in the $menu_args,
     *                                    this is used to validate that the items that should be defined are present.
     * @return void
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws OutOfBoundsException
     */
    public function __construct(array $menu_args, array $required)
    {
        // we don't want this coupling anymore >:(
        unset($menu_args['admin_init_page'], $required['admin_init_page']);
        $this->maintenance_mode = MaintenanceStatus::isFullSite();

        // filter all args before processing so plugins can manipulate various settings for menus.
        $menu_args = apply_filters(
            'FHEE__EE_Admin_Page_Menu_Map__construct__menu_args',
            $menu_args,
            $required,
            get_class($this)
        );

        $this->verifyRequired($menu_args, $required);
        $this->setProperties($menu_args);
    }


    /**
     * This method should define how the menu page gets added for this particular item
     * and go ahead and define it.  Note that child classes MUST also return the result of
     * the function used to register the WordPress admin page (the wp_page_slug string)
     *
     * @return string wp_page_slug.
     * @since  4.4.0
     */
    abstract protected function registerMenuItem(): string;


    /**
     * Called by client code to use this menu map for registering a WordPress admin page
     *
     * @param boolean $network_admin whether this is being added to the network admin page or not
     * @since  4.4.0
     */
    public function registerAdminMenuItem(bool $network_admin = false): string
    {
        $this->registered = true;
        return $this->displayOnBlogAndNetworkAdmin()
               || $this->displayOnBlogAdmin($network_admin)
               || $this->displayOnNetworkAdmin($network_admin)
            ? $this->registerMenuItem()
            : '';
    }


    /**
     * @param array $menu_args
     * @param array $required
     * @throws DomainException
     */
    private function verifyRequired(array $menu_args, array $required)
    {
        // verify that required keys are present in the incoming array.
        $missing = array_diff($required, array_keys($menu_args));

        if (! empty($missing)) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        '%1$s is missing some expected keys in the argument array.  The following keys are missing: %2$s',
                        'event_espresso'
                    ),
                    get_class($this),
                    implode(', ', $missing)
                )
            );
        }

        if (
            in_array('admin_init_page', $required, true)
            && ! (isset($menu_args['admin_init_page']) && $menu_args['admin_init_page'] instanceof EE_Admin_Page_Init)
        ) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'The value for the "admin_init_page" argument must be an instance of an EE_Admin_Page_Init object.  Instead %s was given as the value.',
                        'event_espresso'
                    ),
                    print_r($menu_args['admin_init_page'] ?? null, true)
                )
            );
        }
    }


    /**
     * @param array $menu_args
     * @throws InvalidArgumentException
     * @throws OutOfBoundsException
     */
    private function setProperties(array $menu_args)
    {
        $menu_args += [
            'capability'              => 'ee_read_ee',
            'maintenance_mode_parent' => '',
            'menu_callback'           => null,
            'menu_group'              => '',
            'menu_label'              => '',
            'menu_order'              => 100,
            'menu_slug'               => '',
            'parent_slug'             => 'espresso_events',
            'show_on_menu'            => AdminMenuItem::DISPLAY_NONE,
            'title'                   => '',
        ];

        $this->setMenuSlug($menu_args['menu_slug']);
        $this->setCapability($menu_args['capability']);
        $this->setMaintenanceModeParent($menu_args['maintenance_mode_parent']);
        $this->setMenuCallback($menu_args['menu_callback']);
        $this->setMenuGroup($menu_args['menu_group']);
        $this->setMenuLabel($menu_args['menu_label']);
        $this->setMenuOrder($menu_args['menu_order']);
        $this->setParentSlug($menu_args['parent_slug']);
        $this->setShowOnMenu($menu_args['show_on_menu']);
        $this->setTitle($menu_args['title']);
    }


    /**
     * The capability required for this menu to be displayed to the user.
     *
     * @return string
     */
    public function capability(): string
    {
        return $this->capability;
    }


    /**
     * @param string $capability
     */
    public function setCapability(string $capability): void
    {
        $this->capability = $capability;
        // filter capabilities (both static and dynamic)
        $this->capability = apply_filters('FHEE_management_capability', $this->capability, null);
        $this->capability = apply_filters('FHEE_' . $this->menu_slug . '_capability', $this->capability, null);
    }


    public function currentUserHasAccess(): bool
    {
        return EE_Capabilities::instance()->current_user_can($this->capability(), $this->menuSlug());
    }


    /**
     * @param bool $network_admin
     * @return bool
     */
    public function displayOnBlogAdmin(bool $network_admin): bool
    {
        return ! $network_admin && $this->show_on_menu === AdminMenuItem::DISPLAY_BLOG_ONLY;
    }


    /**
     * @return bool
     */
    public function displayOnBlogAndNetworkAdmin(): bool
    {
        return $this->show_on_menu === AdminMenuItem::DISPLAY_BLOG_AND_NETWORK;
    }


    /**
     * @param bool $network_admin
     * @return bool
     */
    public function displayOnNetworkAdmin(bool $network_admin): bool
    {
        return $network_admin && $this->show_on_menu === AdminMenuItem::DISPLAY_NETWORK_ONLY;
    }


    /**
     * parent slug to use when site is in full maintenance mode
     *
     * @return string
     */
    public function maintenanceModeParent(): string
    {
        return $this->maintenance_mode_parent;
    }


    /**
     * @param string $maintenance_mode_parent
     */
    public function setMaintenanceModeParent(string $maintenance_mode_parent): void
    {
        $this->maintenance_mode_parent = $maintenance_mode_parent;
    }


    /**
     *  Optional. The function to be called to output the content for this page.
     *
     * @return callable|null
     */
    public function menuCallback(): ?callable
    {
        return $this->menu_callback;
    }


    /**
     * @param callable|null $menu_callback
     */
    public function setMenuCallback(?callable $menu_callback): void
    {
        $this->menu_callback = $menu_callback;
    }


    /**
     * Slug for menu group that this menu item will appear under
     *
     * @return string
     */
    public function menuGroup(): string
    {
        return $this->menu_group;
    }


    /**
     * @param string $menu_group
     */
    public function setMenuGroup(string $menu_group): void
    {
        $this->menu_group = $menu_group;
    }


    /**
     * The text to be used for the menu.
     *
     * @return string
     */
    public function menuLabel(): string
    {
        return $this->menu_label;
    }


    /**
     * @param string $menu_label
     */
    public function setMenuLabel(string $menu_label): void
    {
        $this->menu_label = $menu_label;
    }


    /**
     * Optional. The position in the menu order this item should appear.
     *
     * @return int
     */
    public function menuOrder(): int
    {
        return $this->menu_order;
    }


    /**
     * @param int $menu_order
     */
    public function setMenuOrder(int $menu_order): void
    {
        $this->menu_order = absint($menu_order);
    }


    /**
     * The slug name to refer to this menu by. Should be unique for this menu
     *
     * @return string
     */
    public function menuSlug(): string
    {
        return $this->menu_slug;
    }


    /**
     * @param string $menu_slug
     */
    public function setMenuSlug(string $menu_slug): void
    {
        $this->menu_slug = sanitize_key($menu_slug);
    }


    /**
     * The slug name for the parent menu (or the file name of a standard WordPress admin page).
     *
     * @return string
     */
    public function parentSlug(): string
    {
        return $this->parent_slug;
    }


    /**
     * if site is in full maintenance mode,
     * then parent slug will be swapped with the maintenance_mode_parent if that property has been set
     *
     * @param string $parent_slug
     */
    public function setParentSlug(string $parent_slug): void
    {
        $this->parent_slug = $this->maintenance_mode && $this->maintenance_mode_parent
            ? $this->maintenance_mode_parent
            : $parent_slug;
    }


    /**
     * returns true if menu item has already been registered with WP core
     *
     * @return bool
     */
    public function isRegistered(): bool
    {
        return $this->registered;
    }


    /**
     * returns TRUE if:
     * - site is currently NOT in full site maintenance mode
     * - site IS in full site maintenance mode and menu item has a valid maintenance mode parent
     *
     * @return int
     */
    public function showOnMaintenanceModeMenu(): int
    {
        return ! $this->maintenance_mode || $this->maintenanceModeParent() !== '';
    }


    /**
     * @param int $show_on_menu
     * @throws DomainException
     */
    public function setShowOnMenu(int $show_on_menu): void
    {
        $valid_menu_options = [
            AdminMenuItem::DISPLAY_NONE,
            AdminMenuItem::DISPLAY_BLOG_ONLY,
            AdminMenuItem::DISPLAY_BLOG_AND_NETWORK,
            AdminMenuItem::DISPLAY_NETWORK_ONLY,
        ];
        if (! in_array($show_on_menu, $valid_menu_options, true)) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'Invalid "ShowOnMenu" option of "%1$s" supplied. You must use one of the AdminMenuItem::DISPLAY_* constants.',
                        'event_espresso'
                    ),
                    $show_on_menu
                )
            );
        }
        $this->show_on_menu = $show_on_menu;
    }


    /**
     * The text to be displayed in the title tags of the page when the menu is selected
     *
     * @return string
     */
    public function title(): string
    {
        return $this->title;
    }


    /**
     * @param string $title
     */
    public function setTitle(string $title): void
    {
        $this->title = $title;
    }
}

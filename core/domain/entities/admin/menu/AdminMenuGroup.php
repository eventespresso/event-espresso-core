<?php

namespace EventEspresso\core\domain\entities\admin\menu;

/**
 * Class AdminMenuGroup
 * Defines the EE_Admin page menu group object used in EE_Admin_Page Loader for setting up EE
 * Admin menu groups.
 *
 * A menu group is a special heading that does not link to anything but allows for logical separate of
 * submenu elements.
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\entities\admin\menu
 * @since   5.0.0.p
 */
class AdminMenuGroup extends AdminMenuItem
{
    /**
     * @var AdminMenuItem[]
     */
    private $menu_items = [];



    public function __construct(array $menu_args)
    {
        parent::__construct(
            $menu_args,
            // required args
            [
                'menu_label',
                'menu_slug',
                'menu_order',
                'parent_slug'
            ]
        );
    }


    public function addMenuItem(AdminMenuItem $menu_item): void
    {
        $this->menu_items[ $menu_item->menuSlug() ] = $menu_item;
    }

    public function getMenuItems(): array
    {
        return $this->menu_items;
    }

    public function hasNoMenuItems(): bool
    {
        return empty($this->menu_items);
    }

    public function setMenuItems(array $menu_items): void
    {
        $this->menu_items = $menu_items;
    }


    protected function registerMenuItem(): string
    {
        return add_submenu_page(
            $this->parentSlug(),
            $this->menuLabel(),
            $this->groupLink(),
            $this->capability(),
            $this->menuSlug(),
            '__return_false'
        );
    }


    protected function groupLink(): string
    {
        return '<span class="ee_menu_group"  onclick="return false;">' . $this->menuLabel() . '</span>';
    }
}

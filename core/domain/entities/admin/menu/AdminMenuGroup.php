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
 * @since   $VID:$
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


    /**
     * @param AdminMenuItem $menu_item
     * @return void
     */
    public function addMenuItem($menu_item)
    {
        $this->menu_items[ $menu_item->menuSlug() ] = $menu_item;
    }

    /**
     * @return mixed[]
     */
    public function getMenuItems()
    {
        return $this->menu_items;
    }

    /**
     * @return bool
     */
    public function hasNoMenuItems()
    {
        return empty($this->menu_items);
    }

    /**
     * @param mixed[] $menu_items
     * @return void
     */
    public function setMenuItems($menu_items)
    {
        $this->menu_items = $menu_items;
    }


    /**
     * @return string
     */
    protected function registerMenuItem()
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


    /**
     * @return string
     */
    protected function groupLink()
    {
        return '<span class="ee_menu_group"  onclick="return false;">' . $this->menuLabel() . '</span>';
    }
}

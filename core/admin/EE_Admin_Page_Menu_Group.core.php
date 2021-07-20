<?php

/**
 * Defines the EE_Admin page menu group object used in EE_Admin_Page Loader for setting up EE
 * Admin menu groups.
 *
 * A menu group is a special heading that does not link to anything but allows for logical separate of
 * submenu elements.
 *
 * @since          4.4.0
 * @package        Event Espresso
 * @subpackage     admin
 */
class EE_Admin_Page_Menu_Group extends EE_Admin_Page_Menu_Map
{

    /**
     * @throws EE_Error
     */
    public function __construct($menu_args = [])
    {
        $required = ['menu_label', 'menu_slug', 'menu_order', 'parent_slug'];
        parent::__construct($menu_args, $required);
    }


    protected function _add_menu_page()
    {
        return add_submenu_page(
            $this->parent_slug,
            $this->menu_label,
            $this->_group_link(),
            $this->capability,
            $this->menu_slug,
            '__return_false'
        );
    }


    private function _group_link()
    {
        return '<span class="ee_menu_group"  onclick="return false;">' . $this->menu_label . '</span>';
    }
}

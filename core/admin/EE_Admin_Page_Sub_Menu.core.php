<?php

use EventEspresso\core\domain\entities\admin\menu\AdminMenuSubItem;

/**
 * Defines the menu map structure for sub menu pages.
 *
 * @since      4.4.0
 * @package    Event Espresso
 * @subpackage admin
 * @deprecated $VID:$
 */
class EE_Admin_Page_Sub_Menu extends AdminMenuSubItem
{
    /**
     * @return string
     * @deprecated $VID:$
     */
    protected function _add_menu_page()
    {
        return $this->registerMenuItem();
    }
}

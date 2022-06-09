<?php

use EventEspresso\core\domain\entities\admin\menu\AdminMenuTopLevel;

/**
 * This defines the menu map structure for a main menu item.
 *
 * @since       4.4.0
 * @package     Event Espresso
 * @subpackage  admin
 * @deprecated  $VID:$
 */
class EE_Admin_Page_Main_Menu extends AdminMenuTopLevel
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

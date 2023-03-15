<?php

use EventEspresso\core\domain\entities\admin\menu\AdminMenuGroup;

/**
 * @since          4.4.0
 * @package        Event Espresso
 * @subpackage     admin
 * @deprecated     5.0.0.p
 */
class EE_Admin_Page_Menu_Group extends AdminMenuGroup
{
    /**
     * @return string
     * @deprecated 5.0.0.p
     */
    protected function _add_menu_page(): string
    {
        return $this->registerMenuItem();
    }


    /**
     * @return string
     * @deprecated 5.0.0.p
     */
    private function _group_link(): string
    {
        return $this->groupLink();
    }
}

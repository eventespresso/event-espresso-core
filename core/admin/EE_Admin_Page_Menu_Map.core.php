<?php

use EventEspresso\core\domain\entities\admin\menu\AdminMenuItem;

/**
 * Abstract class for defining EE Admin Page Menu Map objects
 *
 * @since          4.4.0
 * @package        Event Espresso
 * @subpackage     admin
 * @deprecated     $VID:$
 */
abstract class EE_Admin_Page_Menu_Map extends AdminMenuItem
{
    const NONE                   = 0;

    const BLOG_ADMIN_ONLY        = 1;

    const BLOG_AND_NETWORK_ADMIN = 2;

    const NETWORK_ADMIN_ONLY     = 3;


    /**
     * @return string
     * @deprecated $VID:$
     */
    protected function _add_menu_page(): string
    {
        return $this->registerMenuItem();
    }


    /**
     * @param boolean $network_admin whether this is being added to the network admin page or not
     * @deprecated $VID:$
     * @since  4.4.0
     */
    public function add_menu_page(bool $network_admin = false)
    {
        \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        \EEH_Debug_Tools::printr($this->menu_label, '$this->menu_label', __FILE__, __LINE__);

        $this->registerAdminMenuItem($network_admin);
    }


    public function __get(string $property)
    {
        $getter = lcfirst(ucwords($property, '_'));
        return method_exists($this, $getter) ? $this->{$getter}() : null;
    }


    public function __set(string $property, $value)
    {
        $setter = 'set' . ucwords($property, '_');
        if (method_exists($this, $setter)) {
            $this->{$setter}($value);
        }
    }
}

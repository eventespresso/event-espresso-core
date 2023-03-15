<?php

use EventEspresso\core\domain\entities\admin\menu\AdminMenuItem;

/**
 * Abstract class for defining EE Admin Page Menu Map objects
 *
 * @since          4.4.0
 * @package        Event Espresso
 * @subpackage     admin
 * @deprecated     5.0.0.p
 */
abstract class EE_Admin_Page_Menu_Map extends AdminMenuItem
{
    const NONE                   = 0;

    const BLOG_ADMIN_ONLY        = 1;

    const BLOG_AND_NETWORK_ADMIN = 2;

    const NETWORK_ADMIN_ONLY     = 3;


    /**
     * @return string
     * @deprecated 5.0.0.p
     */
    protected function _add_menu_page(): string
    {
        return $this->registerMenuItem();
    }


    /**
     * @param boolean $network_admin whether this is being added to the network admin page or not
     * @deprecated 5.0.0.p
     * @since  4.4.0
     */
    public function add_menu_page(bool $network_admin = false)
    {
        $this->registerAdminMenuItem($network_admin);
    }


    public function __get(string $property)
    {
        // converts a property name like 'menu_slug' into 'menuSlug'
        $getter = lcfirst(ucwords($property, '_'));
        return method_exists($this, $getter) ? $this->{$getter}() : null;
    }

    public function __set(string $property, $value)
    {
        // converts a property name like 'menu_slug' into 'setMenuSlug'
        $setter = 'set' . ucwords($property, '_');
        if (method_exists($this, $setter)) {
            $this->{$setter}($value);
        }
    }
}

<?php

namespace EventEspresso\core\domain\entities\admin\menu;

class AdminMenuSubItem extends AdminMenuTopLevel
{
    /**
     * @return string
     */
    protected function registerMenuItem()
    {
        return add_submenu_page(
            $this->parentSlug(),
            $this->title(),
            $this->menuLabel(),
            $this->capability(),
            $this->menuSlug(),
            $this->menuCallback()
        );
    }
}

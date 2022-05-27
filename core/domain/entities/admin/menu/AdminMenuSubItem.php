<?php

namespace EventEspresso\core\domain\entities\admin\menu;

class AdminMenuSubItem extends AdminMenuTopLevel
{
    protected function registerMenuItem(): string
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

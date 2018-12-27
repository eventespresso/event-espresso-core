<?php

/**
 * espresso_events_Messages_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 *
 *
 * @package         espresso_events_Messages_Hooks
 * @subpackage      includes/core/admin/messages/espresso_events_Messages_Hooks.class.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_Messages_Hooks extends EE_Admin_Hooks
{


    public function __construct(EE_Admin_Page $admin_page)
    {
        parent::__construct($admin_page);
    }


    protected function _set_hooks_properties()
    {
        $this->_name = 'messages';
    }
}

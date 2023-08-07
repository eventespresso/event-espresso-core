<?php

/**
 * espresso_events_Pricing_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 *
 * @package         espresso_events_Pricing_Hooks
 * @subpackage      caffeinated/admin/new/pricing/espresso_events_Pricing_Hooks.class.php
 * @author          Darren Ethier
 */
class espresso_events_Pricing_Hooks extends espresso_events_Events_Hooks_Extend
{
    protected function _set_hooks_properties()
    {
        $this->_name = 'events';
    }
}

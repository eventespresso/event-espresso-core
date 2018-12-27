<?php

/**
 * Extend_Registrations_Admin_Page
 *
 * This is the Registrations Caffeinated admin page.
 *
 *
 * @package         Extend_Registrations_Admin_Page
 * @subpackage      caffeinated/admin/extend/registrations/Extend_Registrations_Admin_Page.core.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_EE_Attendee_Contact_List_Table extends EE_Attendee_Contact_List_Table
{

    protected function _set_properties()
    {
        parent::_set_properties();
        $this->_bottom_buttons = array(
            'contact_list_report' => array(
                'route'         => 'contact_list_report',
                'extra_request' =>
                    array(
                        'return_url' => urlencode("//{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}"),
                    ),
            ),
        );
    }
}

<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed.');


/**
 * EE_Attendee_Contact_List_Table
 * List table for the EE_Attendee records in the admin.
 *
 * @package EventEspresso
 * @author  Darren Ethier
 */
class EE_Attendee_Contact_List_Table extends EE_Admin_List_Table
{
    /**
     * Initial setup of data (called by parent).
     */
    protected function _setup_data()
    {
        $this->_data = $this->_view !== 'trash'
            ? $this->_admin_page->get_attendees($this->_per_page)
            : $this->_admin_page->get_attendees($this->_per_page, false, true);
        $this->_all_data_count = $this->_view !== 'trash'
            ? $this->_admin_page->get_attendees($this->_per_page, true)
            : $this->_admin_page->get_attendees($this->_per_page, true, true);
    }


    /**
     * Initial setup of properties.
     */
    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => esc_html__('attendee', 'event_espresso'),
            'plural'   => esc_html__('attendees', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        );

        $this->_columns = array(
            'cb'          => '<input type="checkbox" />', //Render a checkbox instead of text
            'ATT_ID'      => esc_html__('ID', 'event_espresso'),
            'ATT_fname'   => esc_html__('First Name', 'event_espresso'),
            'ATT_lname'   => esc_html__('Last Name', 'event_espresso'),
            'ATT_email'   => esc_html__('Email Address', 'event_espresso'),
            'ATT_phone'   => esc_html__('Phone', 'event_espresso'),
            'ATT_address' => esc_html__('Address', 'event_espresso'),
            'ATT_city'    => esc_html__('City', 'event_espresso'),
            'STA_ID'      => esc_html__('State/Province', 'event_espresso'),
            'CNT_ISO'     => esc_html__('Country', 'event_espresso'),
        );

        $this->_sortable_columns = array(
            'ATT_ID'    => array('ATT_ID' => false),
            'ATT_lname' => array('ATT_lname' => true), //true means its already sorted
            'ATT_fname' => array('ATT_fname' => false),
            'ATT_email' => array('ATT_email' => false),
            'ATT_city'  => array('ATT_city' => false),
            'STA_ID'    => array('STA_ID' => false),
            'CNT_ISO'   => array('CNT_ISO' => false),
        );

        $this->_hidden_columns = array();
    }


    /**
     * Initial setup of filters
     * @return array
     */
    protected function _get_table_filters()
    {
        return array();
    }


    /**
     * Initial setup of counts for views
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _add_view_counts()
    {
        $this->_views['in_use']['count'] = $this->_admin_page->get_attendees($this->_per_page, true);
        if (EE_Registry::instance()->CAP->current_user_can(
            'ee_delete_contacts',
            'espresso_registrations_delete_registration'
        )) {
            $this->_views['trash']['count'] = $this->_admin_page->get_attendees($this->_per_page, true, true);
        }
    }


    /**
     * Get count of attendees.
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _get_attendees_count()
    {
        return EEM_Attendee::instance()->count();
    }


    /**
     * Checkbox column
     *
     * @param EE_Attendee $item
     * @return string
     * @throws EE_Error
     */
    public function column_cb($item)
    {
        return sprintf(
            '<input type="checkbox" name="checkbox[%1$s]" value="%1$s" />',
            $item->ID()
        );
    }


    /**
     * ATT_ID column
     *
     * @param EE_Attendee $item
     * @return string
     * @throws EE_Error
     */
    public function column_ATT_ID($item)
    {
        $content = $item->ID();
        $attendee_name = $item instanceof EE_Attendee ? $item->full_name() : '';
        $content .= '  <span class="show-on-mobile-view-only">' . $attendee_name . '</span>';
        return $content;
    }


    /**
     * ATT_lname column
     *
     * @param EE_Attendee $item
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     */
    public function column_ATT_lname($item)
    {
        // edit attendee link
        $edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
            array(
                'action' => 'edit_attendee',
                'post'   => $item->ID(),
            ),
            REG_ADMIN_URL
        );
        $name_link = EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_contacts',
            'espresso_registrations_edit_attendee'
        )
            ? '<a href="' . $edit_lnk_url . '" title="'
              . esc_attr__('Edit Contact', 'event_espresso') . '">'
              . $item->lname() . '</a>'
            : $item->lname();
        return $name_link;
    }


    /**
     * ATT_fname column
     *
     * @param EE_Attendee $item
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     */
    public function column_ATT_fname($item)
    {
        //Build row actions
        $actions = array();
        // edit attendee link
        if (EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_contacts',
            'espresso_registrations_edit_attendee'
        )) {
            $edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                array(
                    'action' => 'edit_attendee',
                    'post'   => $item->ID(),
                ),
                REG_ADMIN_URL
            );
            $actions['edit'] = '<a href="' . $edit_lnk_url . '" title="'
                               . esc_attr__('Edit Contact', 'event_espresso') . '">'
                               . esc_html__('Edit', 'event_espresso') . '</a>';
        }

        if ($this->_view === 'in_use') {
            // trash attendee link
            if (EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_contacts',
                'espresso_registrations_trash_attendees'
            )) {
                $trash_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                    array(
                        'action' => 'trash_attendee',
                        'ATT_ID' => $item->ID(),
                    ),
                    REG_ADMIN_URL
                );
                $actions['trash'] = '<a href="' . $trash_lnk_url . '" title="'
                                    . esc_attr__('Move Contact to Trash', 'event_espresso')
                                    . '">' . esc_html__('Trash', 'event_espresso') . '</a>';
            }
        } else {
            if (EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_contacts',
                'espresso_registrations_restore_attendees'
            )) {
                // restore attendee link
                $restore_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                    'action' => 'restore_attendees',
                    'ATT_ID' => $item->ID(),
                ), REG_ADMIN_URL);
                $actions['restore'] = '<a href="' . $restore_lnk_url . '" title="'
                                      . esc_attr__('Restore Contact', 'event_espresso') . '">'
                                      . esc_html__('Restore', 'event_espresso') . '</a>';
            }
        }

        $edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
            'action' => 'edit_attendee',
            'post'   => $item->ID(),
        ), REG_ADMIN_URL);
        $name_link = EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_contacts',
            'espresso_registrations_edit_attendee'
        )
            ? '<a href="' . $edit_lnk_url . '" title="'
              . esc_attr__('Edit Contact', 'event_espresso') . '">' . $item->fname() . '</a>'
            : $item->fname();

        //Return the name contents
        return sprintf('%1$s %2$s', $name_link, $this->row_actions($actions));
    }


    /**
     * Email Column
     * @param EE_Attendee $item
     * @return string
     */
    public function column_ATT_email($item)
    {
        return '<a href="mailto:' . $item->email() . '">' . $item->email() . '</a>';
    }


    /**
     * ATT_address column
     *
     * @param EE_Attendee $item
     * @return mixed
     */
    public function column_ATT_address($item)
    {
        return $item->address();
    }


    /**
     * ATT_city column
     * @param EE_Attendee $item
     * @return mixed
     */
    public function column_ATT_city($item)
    {
        return $item->city();
    }


    /**
     * State Column
     * @param EE_Attendee $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function column_STA_ID($item)
    {
        $states = EEM_State::instance()->get_all_states();
        $state = isset($states[$item->state_ID()]) ? $states[$item->state_ID()]->get('STA_name') : $item->state_ID();
        return ! is_numeric($state) ? $state : '';
    }


    /**
     * Country Column
     * @param EE_Attendee $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function column_CNT_ISO($item)
    {
        $countries = EEM_Country::instance()->get_all_countries();
        $country = isset($countries[$item->country_ID()])
            ? $countries[$item->country_ID()]->get('CNT_name')
            : $item->country_ID();
        return ! is_numeric($country) ? $country : '';
    }


    /**
     * Phone Number column
     * @param EE_Attendee $item
     * @return mixed
     */
    public function column_ATT_phone($item)
    {
        return $item->phone();
    }
}

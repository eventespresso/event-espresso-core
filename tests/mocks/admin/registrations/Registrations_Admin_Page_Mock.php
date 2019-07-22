<?php

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 * Registrations_Admin_Page_Mock
 * Used for testing Registrations Admin Page tests.
 *
 * @package            Event Espresso
 * @subpackage         mocks
 * @author             Darren
 * @since              4.6
 */
require_once EE_ADMIN . 'EE_Admin_Page.core.php';
require_once EE_ADMIN . 'EE_Admin_Page_CPT.core.php';
require_once EE_ADMIN_PAGES . 'registrations/Registrations_Admin_Page.core.php';

class Registrations_Admin_Page_Mock extends Registrations_Admin_Page
{


    public function __construct($routing = true)
    {
        //define any constants that might not be defined yet when using this mock.
        if ( ! defined('REG_PG_SLUG')) {
            define('REG_PG_SLUG', 'espresso_registrations');
            define('REG_PG_NAME', ucwords(str_replace('_', '', REG_PG_SLUG)));
            define('REG_ADMIN', EE_ADMIN_PAGES . 'registrations/');
            define('REG_ADMIN_URL', admin_url('admin.php?page=' . REG_PG_SLUG));
            define('REG_ASSETS_PATH', REG_ADMIN . 'assets/');
            define('REG_ASSETS_URL', EE_PLUGIN_DIR_URL . 'admin_pages/registrations/assets/');
            define('REG_TEMPLATE_PATH', REG_ADMIN . 'templates/');
            define('REG_TEMPLATE_URL', EE_PLUGIN_DIR_URL . 'admin_pages/registrations/templates/');
        }

        parent::__construct(false);
    }


    /**
     * get registrations for given parameters (used by list table)
     *
     * @param  int     $per_page   how many registrations displayed per page
     * @param  boolean $count      return the count or objects
     * @param  boolean $this_month whether to return for just this month
     * @param  boolean $today      whether to return results for just today
     * @throws \EE_Error
     * @return mixed (int|array)  int = count || array of registration objects
     */
    public function get_registrations($per_page = 10, $count = false, $this_month = false, $today = false)
    {
        return parent::get_registrations($per_page, $count, $this_month, $today);
    }


    /**
     * Mock for _set_registration_status_from_request
     *
     * @param bool|false $status
     * @param bool|false $notify
     * @return array
     */
    public function set_registration_status_from_request($status = false, $notify = false)
    {
        $this->_req_data = array_merge($_POST, $_REQUEST);
        return parent::_set_registration_status_from_request($status, $notify);
    }

    public function add_event_id_to_where_conditions(array $req)
    {
        return $this->_add_event_id_to_where_conditions($req);
    }


    public function add_category_id_to_where_conditions(array $req)
    {
        return $this->_add_category_id_to_where_conditions($req);
    }


    public function add_datetime_id_to_where_conditions(array $req)
    {
        return $this->_add_datetime_id_to_where_conditions($req);
    }


    public function add_registration_status_to_where_conditions(array $req)
    {
        return $this->_add_registration_status_to_where_conditions($req);
    }


    public function add_date_to_where_conditions($req)
    {
        return $this->_add_date_to_where_conditions($req);
    }


    public function add_search_to_where_conditions(array $req)
    {
        return $this->_add_search_to_where_conditions($req);
    }


    public function get_orderby_for_registrations_query()
    {
        return $this->_get_orderby_for_registrations_query();
    }


    public function get_limit($per_page)
    {
        return $this->_get_limit($per_page);
    }

} //end class Registrations_Admin_Page_Mock

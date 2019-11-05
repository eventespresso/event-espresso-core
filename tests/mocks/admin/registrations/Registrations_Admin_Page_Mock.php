<?php

use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

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
     * Mock for _set_registration_status_from_request
     *
     * @param bool|false $status
     * @param bool|false $notify
     * @return array
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws EntityNotFoundException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function set_registration_status_from_request($status = false, $notify = false)
    {
        $this->_req_data = array_merge($_POST, $_REQUEST);
        return $this->_set_registration_status_from_request($status, $notify);
    }


    /**
     * @param array $request
     * @param int   $per_page
     * @param bool  $count
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.10.2.p
     */
    public function get_registration_query_parameters(
        $request = array(),
        $per_page = 10,
        $count = false
    ) {
        return $this->_get_registration_query_parameters($request, $per_page, $count);
    }
}

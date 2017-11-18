<?php

namespace EventEspresso\core\services\request_stack\middleware;

use EE_Request;
use EE_Response;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class DetectLogin
 * Detects if the current request is for the WordPress Login or Register page and prevents EE from loading
 *
 * @package EventEspresso\core\services\request_stack\middleware
 * @author  Brent Christensen
 * @since   4.9.52
 */
class DetectLogin extends Middleware
{

    /**
     * converts a Request to a Response
     *
     * @param    EE_Request  $request
     * @param    EE_Response $response
     * @return    EE_Response
     */
    public function handle_request(EE_Request $request, EE_Response $response)
    {
        $this->_request  = $request;
        $this->_response = $response;
        global $pagenow;
        if (
            in_array(
                $pagenow,
                array('wp-login.php', 'wp-register.php'),
                true
            )
            && ! $request->get('ee_load_on_login')
        ) {
            $this->_response->terminate_request();
        }
        $this->_response = $this->process_request_stack($this->_request, $this->_response);
        return $this->_response;
    }


}
// Location: DetectLogin.php

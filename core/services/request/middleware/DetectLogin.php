<?php

namespace EventEspresso\core\services\request\middleware;

use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;

/**
 * Class DetectLogin
 * Detects if the current request is for the WordPress Login or Register page and prevents EE from loading
 *
 * @package EventEspresso\core\services\request\middleware
 * @author  Brent Christensen
 * @since   4.9.52
 */
class DetectLogin extends Middleware
{

    /**
     * converts a Request to a Response
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     */
    public function handleRequest(RequestInterface $request, ResponseInterface $response)
    {
        $this->request = $request;
        $this->response = $response;
        global $pagenow;
        if (in_array(
            $pagenow,
            array('wp-login.php', 'wp-register.php'),
            true
        )
            && ! filter_var($request->getRequestParam('ee_load_on_login'), FILTER_VALIDATE_BOOLEAN)
        ) {
            $this->response->terminateRequest();
        }
        $this->response = $this->processRequestStack($this->request, $this->response);
        return $this->response;
    }
}

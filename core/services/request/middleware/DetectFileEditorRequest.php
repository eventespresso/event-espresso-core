<?php

namespace EventEspresso\core\services\request\middleware;

use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;

/**
 * Class DetectFileEditorRequest
 * Detects File Editor requests and executes any logic needing set on those requests.
 * ported over from /core/middleware/EE_Detect_File_Editor_Request.core.php
 *
 * @package EventEspresso\core\services\request\middleware
 * @author  Darren Ethier
 * @since   4.9.59.p
 */
class DetectFileEditorRequest extends Middleware
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
        $this->request  = $request;
        $this->response = $response;
        // can't store user data during WP error scrapes if no user exists
        // so don't load the session since it's not going to work anyways
        if ($this->request->isWordPressScrape()) {
            add_filter('FHEE_load_EE_Session', '__return_false', 999);
        }
        $this->response = $this->processRequestStack($this->request, $this->response);
        return $this->response;
    }
}

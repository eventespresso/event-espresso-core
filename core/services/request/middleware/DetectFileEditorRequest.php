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
        if ($this->isFileEditorRequest()) {
            $this->setFiltersForRequest();
        }
        $this->response = $this->processRequestStack($this->request, $this->response);
        return $this->response;
    }


    /**
     * This sets any filters that need set on this request.
     */
    protected function setFiltersForRequest()
    {
        add_filter('FHEE_load_EE_Session', '__return_false', 999);
    }


    /**
     * Conditions for a "file editor request"
     *
     * @see wp-admin/includes/file.php
     *      The file editor does a loopback request to the admin AND to the frontend when checking active theme or
     *      active plugin edits.  So these conditions consider that.
     * @return bool
     */
    protected function isFileEditorRequest()
    {
        return $this->request->getRequestParam('wp_scrape_key')
               && $this->request->getRequestParam('wp_scrape_nonce');
    }
}

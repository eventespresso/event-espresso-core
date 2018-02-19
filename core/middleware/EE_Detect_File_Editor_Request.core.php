<?php
defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed.');


/**
 * EE_Detect_File_Editor_Request
 * Detects File Editor requests and executes any logic needing set on those requests.
 *
 * @package \
 * @author  Darren Ethier
 * @since   4.9.55.p
 */
class EE_Detect_File_Editor_Request extends EE_Middleware
{

    /**
     * Converts a Request to a Response
     *
     * @param EE_Request  $request
     * @param EE_Response $response
     * @return EE_Response
     */
    public function handle_request(EE_Request $request, EE_Response $response)
    {
        $this->_request = $request;
        $this->_response = $response;
        $this->setFiltersForRequest();
        $this->_response = $this->process_request_stack($this->_request, $this->_response);
        return $this->_response;
    }


    /**
     * This sets any filters that need set on this request.
     */
    protected function setFiltersForRequest()
    {
        if (! $this->isFileEditorRequest()) {
            return;
        }
        add_filter('FHEE_load_EE_Session', '__return_false', 999);
    }


    /**
     * Conditions for a "file editor request"
     * @see wp-admin/includes/file.php
     *      The file editor does a loopback request to the admin AND to the frontend when checking active theme or
     *      active plugin edits.  So these conditions consider that.
     * @return bool
     */
    protected function isFileEditorRequest()
    {
        return $this->_request->get('wp_scrape_key')
               && $this->_request->get('wp_scrape_nonce');
    }
}

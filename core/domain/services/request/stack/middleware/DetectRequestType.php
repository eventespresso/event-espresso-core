<?php

namespace EventEspresso\core\domain\services\request\stack\middleware;

use EE_Middleware;
use EE_Request;
use EE_Response;
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\MigrateActivationHistory;
use EventEspresso\core\services\request\RequestType;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class DetectRequestType
 * Migrates the Espresso Core Activation History array to the latest format,
 * then uses that to resolve the current Request Type which gets saved to the EE_Request
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson, Brent Christensen
 * @since         4.9.40
 */
class DetectRequestType extends EE_Middleware
{

    /**
     * Detects if the current EE core version has existed in the list of previously-installed versions of EE.
     *
     * @param    EE_Request  $request
     * @param    EE_Response $response
     * @return    EE_Response
     */
    public function handle_request(EE_Request $request, EE_Response $response)
    {
        $this->_request = $request;
        $this->_response = $response;
        // convert EE Core activation history to the latest format
        $migrate_activation_history = new MigrateActivationHistory();
        $request_type = new RequestType(
            $migrate_activation_history->updateFormat(
                new ActivationHistory()
            )
        );
        // determine whether current request is new activation, upgrade, etc
        $request_type->resolveFromActivationHistory();
        $request_type->detectMajorVersionChange();
        $this->_request->setRequestType($request_type);
        $this->_response = $this->process_request_stack($this->_request, $this->_response);
        return $this->_response;
    }


}

<?php

namespace EventEspresso\core\domain\services\admin\ajax;

use EE_Environment_Config;
use EventEspresso\core\domain\Domain;

/**
 * Class EventEditorHeartbeat
 * Handles WordPress Heartbeat AJAX requests for the Espresso Event Editor
 *
 * @package EventEspresso\core\domain\services\admin\ajax
 * @author  Brent Christensen
 * @since   4.9.76.p
 */
class EventEditorHeartbeat
{

    /**
     * @var Domain $domain
     */
    protected $domain;

    /**
     * @var EE_Environment_Config $environment
     */
    protected $environment;


    /**
     * EventEditorHeartbeat constructor.
     *
     * @param Domain                $domain
     * @param EE_Environment_Config $environment
     */
    public function __construct(Domain $domain, EE_Environment_Config $environment)
    {
        $this->domain = $domain;
        $this->environment = $environment;
        if ($this->domain->isCaffeinated()) {
            add_filter('heartbeat_received', array($this, 'heartbeatResponse'), 10, 2);
        }
    }


    /**
     * This will be used to listen for any heartbeat data packages coming via the WordPress heartbeat API and handle
     * accordingly.
     *
     * @param array $response The existing heartbeat response array.
     * @param array $data     The incoming data package.
     * @return array  possibly appended response.
     */
    public function heartbeatResponse($response, $data)
    {
        /**
         * check whether count of tickets is approaching the potential
         * limits for the server.
         */
        if (! empty($data['input_count'])) {
            $response['max_input_vars_check'] = $this->environment->max_input_vars_limit_check(
                $data['input_count']
            );
        }
        return $response;
    }
}

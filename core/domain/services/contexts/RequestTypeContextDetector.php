<?php

namespace EventEspresso\core\domain\services\contexts;

use EE_Request;
use InvalidArgumentException;
use EventEspresso\core\domain\entities\contexts\RequestTypeContext;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RequestTypeContextDetector
 * Basically a Factory class for generating a RequestTypeContext DTO based on the current request
 *
 * @package EventEspresso\core\domain\services\contexts
 * @author  Brent Christensen
 * @since   4.9.51
 */
class RequestTypeContextDetector
{

    /**
     * @var boolean $is_activation_request
     */
    private $is_activation_request;

    /**
     * @var RequestTypeContextFactory $factory
     */
    private $factory;

    /**
     * @var EE_Request $request
     */
    private $request;


    /**
     * RequestTypeContextDetector constructor.
     *
     * @param EE_Request                $request
     * @param bool                      $is_activation_request
     * @param RequestTypeContextFactory $factory
     */
    public function __construct(EE_Request $request, $is_activation_request = false, RequestTypeContextFactory $factory)
    {
        $this->request               = $request;
        $this->is_activation_request = filter_var($is_activation_request, FILTER_VALIDATE_BOOLEAN);
        $this->factory               = $factory;
    }


    /**
     * @return RequestTypeContext
     * @throws InvalidArgumentException
     */
    public function detectRequestTypeContext()
    {
        // Detect Activations
        if ($this->is_activation_request) {
            return $this->factory->create(RequestTypeContext::ACTIVATION);
        }
        // Detect REST API
        if (defined('REST_REQUEST') && REST_REQUEST) {
            return $this->factory->create(RequestTypeContext::API);
        }
        // Detect AJAX
        if (defined('DOING_AJAX') && DOING_AJAX) {
            if (filter_var($this->request->get('ee_front_ajax'), FILTER_VALIDATE_BOOLEAN)) {
                return $this->factory->create(RequestTypeContext::FRONT_AJAX);
            }
            return $this->factory->create(RequestTypeContext::ADMIN_AJAX);
        }
        // Detect WP_Cron
        if (defined('DOING_CRON') && DOING_CRON) {
            return $this->factory->create(RequestTypeContext::CRON);
        }
        // Detect WP_Cron
        if (defined('WP_CLI') && WP_CLI) {
            return $this->factory->create(RequestTypeContext::CLI);
        }
        // detect WordPress admin (ie: "Dashboard")
        if (is_admin()) {
            return $this->factory->create(RequestTypeContext::ADMIN);
        }
        // Detect iFrames
        if (
            apply_filters(
                'FHEE__EventEspresso_core_domain_services_contexts_RequestTypeContextDetector__detectRequestTypeContext__iframe_route',
                $this->request->get('event_list', '') === 'iframe'
                || $this->request->get('ticket_selector', '') === 'iframe'
                || $this->request->get('calendar', '') === 'iframe'
            )
        ) {
            return $this->factory->create(RequestTypeContext::IFRAME);
        }
        // Detect Feeds
        if ($this->request->get('feed', false)) {
            return $this->factory->create(RequestTypeContext::FEED);
        }
        // and by process of elimination...
        return $this->factory->create(RequestTypeContext::FRONTEND);
    }

}
// Location: RequestTypeContextDetector.php

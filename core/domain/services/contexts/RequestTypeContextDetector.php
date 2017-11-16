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
     * @param RequestTypeContextFactory $factory
     */
    public function __construct(EE_Request $request, RequestTypeContextFactory $factory)
    {
        $this->request = $request;
        $this->factory = $factory;
    }


    /**
     * @return RequestTypeContext
     * @throws InvalidArgumentException
     */
    public function detectRequestTypeContext()
    {
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

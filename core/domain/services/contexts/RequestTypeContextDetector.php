<?php

namespace EventEspresso\core\domain\services\contexts;

use EE_Request;
use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RequestTypeContextDetector
 * Basically a Factory class for generating a RequestTypeContext DTO based on the current request
 *
 * @package EventEspresso\core\domain\services\contexts
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RequestTypeContextDetector
{

    /**
     * @var EE_Request $request
     */
    private $request;


    /**
     * RequestTypeContextDetector constructor.
     *
     * @param EE_Request $request
     */
    public function __construct(EE_Request $request)
    {
        $this->request = $request;
    }


    /**
     * @return RequestTypeContext
     * @throws InvalidArgumentException
     */
    public function detectRequestTypeContext()
    {
        // Detect REST API
        if(defined('REST_REQUEST') && REST_REQUEST) {
            return new RequestTypeContext(
                RequestTypeContext::API,
                esc_html__('The current request is for the REST API', 'event_espresso')
            );
        }
        // Detect AJAX
        if (defined('DOING_AJAX') && DOING_AJAX) {
            if (filter_var($this->request->get('ee_front_ajax'), FILTER_VALIDATE_BOOLEAN)) {
                return new RequestTypeContext(
                    RequestTypeContext::FRONT_AJAX,
                    esc_html__('The current request is for the frontend via AJAX', 'event_espresso')
                );
            }
            return new RequestTypeContext(
                RequestTypeContext::ADMIN_AJAX,
                esc_html__('The current request is for the admin via AJAX', 'event_espresso')
            );
        }
        if(is_admin()){
            return new RequestTypeContext(
                RequestTypeContext::ADMIN,
                esc_html__('The current request is for the admin', 'event_espresso')
            );
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
            return new RequestTypeContext(
                RequestTypeContext::IFRAME,
                esc_html__('The current request is for an iframe', 'event_espresso')
            );
        }
        // Detect Feeds
        if ($this->request->get('feed', false)) {
            return new RequestTypeContext(
                RequestTypeContext::FEED,
                esc_html__('The current request is for a feed (ie: RSS)', 'event_espresso')
            );
        }
        // Detect Activations
        // todo: determine if this is an activation
        // todo: (which will be easy if/when FET-10766-extract-activation-detection gets merged into master)
        // if ( ??? ) {
        //     return new RequestTypeContext(
        //         RequestTypeContext::ACTIVATION,
        //         esc_html__('The current request is for some form of activation', 'event_espresso')
        //     );
        // }
        // and by process of elimination...
        return new RequestTypeContext(
            RequestTypeContext::FRONTEND,
            esc_html__('The current request is for the frontend', 'event_espresso')
        );
    }

}
// Location: RequestTypeContextDetector.php

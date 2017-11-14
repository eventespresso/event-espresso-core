<?php

namespace EventEspresso\core\domain\services\contexts;

use EE_Request;
use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use EventEspresso\core\services\loaders\LoaderInterface;
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
     * @var boolean $is_activation_request
     */
    private $is_activation_request;

    /**
     * @var LoaderInterface $loader
     */
    private $loader;

    /**
     * @var EE_Request $request
     */
    private $request;


    /**
     * RequestTypeContextDetector constructor.
     *
     * @param LoaderInterface $loader
     * @param EE_Request      $request
     * @param bool            $is_activation_request
     */
    public function __construct(LoaderInterface $loader, EE_Request $request, $is_activation_request = false)
    {
        $this->loader                = $loader;
        $this->request               = $request;
        $this->is_activation_request = filter_var($is_activation_request, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @return RequestTypeContext
     * @throws InvalidArgumentException
     */
    public function detectRequestTypeContext()
    {
        // Detect Activations
        if ($this->is_activation_request) {
            return $this->loader->getShared(
                'EventEspresso\core\domain\entities\contexts\RequestTypeContext',
                array(
                    RequestTypeContext::ACTIVATION,
                    esc_html__('The current request is for some form of activation', 'event_espresso')
                )
            );
        }
        // Detect REST API
        if (defined('REST_REQUEST') && REST_REQUEST) {
            return $this->loader->getShared(
                'EventEspresso\core\domain\entities\contexts\RequestTypeContext',
                array(
                    RequestTypeContext::API,
                    esc_html__('The current request is for the REST API', 'event_espresso'),
                )
            );
        }
        // Detect AJAX
        if (defined('DOING_AJAX') && DOING_AJAX) {
            if (filter_var($this->request->get('ee_front_ajax'), FILTER_VALIDATE_BOOLEAN)) {
                return $this->loader->getShared(
                    'EventEspresso\core\domain\entities\contexts\RequestTypeContext',
                    array(
                        RequestTypeContext::FRONT_AJAX,
                        esc_html__('The current request is for the frontend via AJAX', 'event_espresso'),
                    )
                );
            }
            return $this->loader->getShared(
                'EventEspresso\core\domain\entities\contexts\RequestTypeContext',
                array(
                    RequestTypeContext::ADMIN_AJAX,
                    esc_html__('The current request is for the admin via AJAX', 'event_espresso'),
                )
            );
        }
        if (is_admin()) {
            return $this->loader->getShared(
                'EventEspresso\core\domain\entities\contexts\RequestTypeContext',
                array(
                    RequestTypeContext::ADMIN,
                    esc_html__('The current request is for the admin', 'event_espresso'),
                )
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
            return $this->loader->getShared(
                'EventEspresso\core\domain\entities\contexts\RequestTypeContext',
                array(
                    RequestTypeContext::IFRAME,
                    esc_html__('The current request is for an iframe', 'event_espresso'),
                )
            );
        }
        // Detect Feeds
        if ($this->request->get('feed', false)) {
            return $this->loader->getShared(
                'EventEspresso\core\domain\entities\contexts\RequestTypeContext',
                array(
                    RequestTypeContext::FEED,
                    esc_html__('The current request is for a feed (ie: RSS)', 'event_espresso'),
                )
            );
        }
        // and by process of elimination...
        return $this->loader->getShared(
            'EventEspresso\core\domain\entities\contexts\RequestTypeContext',
            array(
                RequestTypeContext::FRONTEND,
                esc_html__('The current request is for the frontend', 'event_espresso'),
            )
        );
    }

}
// Location: RequestTypeContextDetector.php

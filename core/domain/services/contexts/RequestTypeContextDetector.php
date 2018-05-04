<?php

namespace EventEspresso\core\domain\services\contexts;

use EventEspresso\core\domain\Domain;
use EventEspresso\core\services\request\middleware\RecommendedVersions;
use EventEspresso\core\services\request\RequestInterface;
use InvalidArgumentException;
use EventEspresso\core\domain\entities\contexts\RequestTypeContext;

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
     * @var RequestInterface $request
     */
    private $request;


    /**
     * RequestTypeContextDetector constructor.
     *
     * @param RequestInterface          $request
     * @param RequestTypeContextFactory $factory
     */
    public function __construct(RequestInterface $request, RequestTypeContextFactory $factory)
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
        // Detect EE REST API
        if ($this->isEspressoRestApiRequest()) {
            return $this->factory->create(RequestTypeContext::API);
        }
        // Detect AJAX
        if (defined('DOING_AJAX') && DOING_AJAX) {
            if (filter_var($this->request->getRequestParam('ee_front_ajax'), FILTER_VALIDATE_BOOLEAN)) {
                return $this->factory->create(RequestTypeContext::AJAX_FRONT);
            }
            if (filter_var($this->request->getRequestParam('ee_admin_ajax'), FILTER_VALIDATE_BOOLEAN)) {
                return $this->factory->create(RequestTypeContext::AJAX_ADMIN);
            }
            return $this->factory->create(RequestTypeContext::AJAX_OTHER);
        }
        // Detect WP_Cron
        if ($this->isCronRequest()) {
            return $this->factory->create(RequestTypeContext::CRON);
        }
        // Detect command line requests
        if (defined('WP_CLI') && WP_CLI) {
            return $this->factory->create(RequestTypeContext::CLI);
        }
        // detect WordPress admin (ie: "Dashboard")
        if (is_admin()) {
            return $this->factory->create(RequestTypeContext::ADMIN);
        }
        // Detect iFrames
        if ($this->isIframeRoute()) {
            return $this->factory->create(RequestTypeContext::IFRAME);
        }
        // Detect Feeds
        if ($this->isFeedRequest()) {
            return $this->factory->create(RequestTypeContext::FEED);
        }
        // and by process of elimination...
        return $this->factory->create(RequestTypeContext::FRONTEND);
    }


    /**
     * @return bool
     */
    private function isEspressoRestApiRequest()
    {
        $ee_rest_url_prefix = RecommendedVersions::compareWordPressVersion('4.4.0')
            ? trim(rest_get_url_prefix(), '/')
            : 'wp-json';
        $ee_rest_url_prefix .= '/' . Domain::API_NAMESPACE;
        return $this->uriPathMatches($ee_rest_url_prefix);
    }


    /**
     * @return bool
     */
    private function isCronRequest()
    {
        return $this->uriPathMatches('wp-cron.php');
    }


    /**
     * @return bool
     */
    private function isFeedRequest()
    {
        return $this->uriPathMatches('feed');
    }


    /**
     * @param string $component
     * @return bool
     */
    private function uriPathMatches($component)
    {
        $request_uri = $this->request->requestUri();
        $parts = explode('?', $request_uri);
        $path = trim(reset($parts), '/');
        return strpos($path, $component) === 0;
    }


    /**
     * @return bool
     */
    private function isIframeRoute()
    {
        $is_iframe_route = apply_filters(
            'FHEE__EventEspresso_core_domain_services_contexts_RequestTypeContextDetector__isIframeRoute',
            $this->request->getRequestParam('event_list', '') === 'iframe'
            || $this->request->getRequestParam('ticket_selector', '') === 'iframe'
            || $this->request->getRequestParam('calendar', '') === 'iframe',
            $this
        );
        return filter_var($is_iframe_route, FILTER_VALIDATE_BOOLEAN);
    }
}

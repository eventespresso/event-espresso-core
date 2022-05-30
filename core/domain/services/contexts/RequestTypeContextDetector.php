<?php

namespace EventEspresso\core\domain\services\contexts;

use EventEspresso\core\domain\Domain;
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
     * @var RequestTypeContextFactoryInterface $factory
     */
    private $factory;

    /**
     * @var RequestInterface $request
     */
    private $request;

    /**
     * @var array $globalRouteConditions
     */
    private $globalRouteConditions;


    /**
     * RequestTypeContextDetector constructor.
     *
     * @param RequestInterface                   $request
     * @param RequestTypeContextFactoryInterface $factory
     * @param array                              $globalRouteConditions an array for injecting values that would
     *                                                                  otherwise be defined as global constants
     *                                                                  or other global variables for the current
     *                                                                  request route such as DOING_AJAX
     */
    public function __construct(
        RequestInterface $request,
        RequestTypeContextFactoryInterface $factory,
        array $globalRouteConditions = array()
    ) {
        $this->request = $request;
        $this->factory = $factory;
        $this->globalRouteConditions = $globalRouteConditions;
    }


    /**
     * @return mixed
     */
    private function getGlobalRouteCondition($globalRouteCondition, $default)
    {
        return isset($this->globalRouteConditions[ $globalRouteCondition ])
            ? $this->globalRouteConditions[ $globalRouteCondition ]
            : $default;
    }


    /**
     * @return RequestTypeContext
     * @throws InvalidArgumentException
     */
    public function detectRequestTypeContext()
    {
        // Detect error scrapes
        if (
            $this->request->getRequestParam('wp_scrape_key')
            && $this->request->getRequestParam('wp_scrape_nonce')
        ) {
            return $this->factory->create(RequestTypeContext::WP_SCRAPE);
        }
        // Detect EE REST API
        if ($this->isEspressoRestApiRequest()) {
            return $this->factory->create(RequestTypeContext::API);
        }
        // Detect WP REST API
        if ($this->isWordPressRestApiRequest()) {
            return $this->factory->create(RequestTypeContext::WP_API);
        }
        // Detect AJAX
        if ($this->getGlobalRouteCondition('DOING_AJAX', false)) {
            return $this->isAjaxRequest();
        }
        // make sure these constants are defined
        if (! defined('EE_ADMIN_AJAX')) {
            define('EE_ADMIN_AJAX', false);
        }
        if (! defined('EE_FRONT_AJAX')) {
            define('EE_FRONT_AJAX', false);
        }
        // Detect WP_Cron
        if ($this->isCronRequest()) {
            return $this->factory->create(RequestTypeContext::CRON);
        }
        // Detect command line requests
        if ($this->getGlobalRouteCondition('WP_CLI', false)) {
            return $this->factory->create(RequestTypeContext::CLI);
        }
        // detect WordPress admin (ie: "Dashboard")
        if ($this->getGlobalRouteCondition('is_admin', false)) {
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
     * @return RequestTypeContext
     */
    private function isAjaxRequest()
    {
        if (
            $this->request->getRequestParam('ee_front_ajax', false, 'bool')
            || $this->request->getRequestParam('data[ee_front_ajax]', false, 'bool')
        ) {
            if (! defined('EE_FRONT_AJAX')) {
                define('EE_FRONT_AJAX', true);
            }
            if (! defined('EE_ADMIN_AJAX')) {
                define('EE_ADMIN_AJAX', false);
            }
            return $this->factory->create(RequestTypeContext::AJAX_FRONT);
        }
        if (
            $this->request->getRequestParam('ee_admin_ajax', false, 'bool')
            || $this->request->getRequestParam('data[ee_admin_ajax]', false, 'bool')
        ) {
            if (! defined('EE_ADMIN_AJAX')) {
                define('EE_ADMIN_AJAX', true);
            }
            if (! defined('EE_FRONT_AJAX')) {
                define('EE_FRONT_AJAX', false);
            }
            return $this->factory->create(RequestTypeContext::AJAX_ADMIN);
        }
        if ($this->request->getRequestParam('action') === 'heartbeat') {
            return $this->factory->create(RequestTypeContext::AJAX_HEARTBEAT);
        }
        return $this->factory->create(RequestTypeContext::AJAX_OTHER);
    }


    /**
     * @return bool
     */
    private function isEspressoRestApiRequest()
    {
        // Check for URLs like http://mysite.com/?rest_route=/ee... and http://mysite.com/wp-json/ee/...
        return strpos(
            $this->request->getRequestParam('rest_route'),
            '/' . Domain::API_NAMESPACE
        ) === 0
            || $this->uriPathMatches(trim(rest_get_url_prefix(), '/') . '/' . Domain::API_NAMESPACE);
    }



    /**
     * @return bool
     */
    private function isWordPressRestApiRequest()
    {
        // Check for URLs like http://mysite.com/?rest_route=/.. and http://mysite.com/wp-json/...
        return $this->request->getRequestParam('rest_route') !== ''
            || $this->uriPathMatches(trim(rest_get_url_prefix(), '/'));
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
        $request_uri = $this->request->requestUri(true);
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

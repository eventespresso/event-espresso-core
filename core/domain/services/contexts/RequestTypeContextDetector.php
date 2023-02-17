<?php

namespace EventEspresso\core\domain\services\contexts;

use EventEspresso\core\domain\Domain;
use EventEspresso\core\services\graphql\GraphQLEndpoint;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use InvalidArgumentException;

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
     * @var GraphQLEndpoint $gql_endpoint
     */
    private $gql_endpoint;

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
     * @param GraphQLEndpoint                    $gql_endpoint
     * @param RequestInterface                   $request
     * @param RequestTypeContextFactoryInterface $factory
     * @param array                              $globalRouteConditions an array for injecting values that would
     *                                                                  otherwise be defined as global constants
     *                                                                  or other global variables for the current
     *                                                                  request route such as DOING_AJAX
     */
    public function __construct(
        GraphQLEndpoint $gql_endpoint,
        RequestInterface $request,
        RequestTypeContextFactoryInterface $factory,
        array $globalRouteConditions = []
    ) {
        $this->gql_endpoint = $gql_endpoint;
        $this->request = $request;
        $this->factory = $factory;
        $this->globalRouteConditions = $globalRouteConditions;
    }


    /**
     * @param string $globalRouteCondition
     * @param mixed  $default
     * @return mixed
     */
    private function getGlobalRouteCondition(string $globalRouteCondition, $default)
    {
        return $this->globalRouteConditions[ $globalRouteCondition ] ?? $default;
    }


    /**
     * @return RequestTypeContext
     * @throws InvalidArgumentException
     */
    public function detectRequestTypeContext(): RequestTypeContext
    {
        // Detect error scrapes
        if ($this->isWordPressErrorScrape()) {
            return $this->factory->create(RequestTypeContext::WP_SCRAPE);
        }
        // Detect activations
        if ($this->isWordPressActivationRequest()) {
            return $this->factory->create(RequestTypeContext::ACTIVATION);
        }
        // Detect EE REST API
        if ($this->isEspressoRestApiRequest()) {
            return $this->factory->create(RequestTypeContext::API);
        }
        // Detect WP REST API
        if ($this->isWordPressRestApiRequest()) {
            return $this->factory->create(RequestTypeContext::WP_API);
        }
        // Detect EE GraphQL
        if ($this->isEspressoGraphQLRequest()) {
            return $this->factory->create(RequestTypeContext::GQL);
        }
        // Detect AJAX
        if ($this->getGlobalRouteCondition('DOING_AJAX', false)) {
            return $this->isAjaxRequest();
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
    private function isAjaxRequest(): RequestTypeContext
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
    private function isWordPressErrorScrape(): bool
    {
        return (
            $this->request->getRequestParam('wp_scrape_key') !== ''
            && $this->request->getRequestParam('wp_scrape_nonce') !== ''
        ) || (
            $this->request->getRequestParam('action') === 'error_scrape'
            && $this->request->getRequestParam('_wpnonce') !== ''
        );
    }


    /**
     * @return bool
     */
    private function isWordPressActivationRequest(): bool
    {
        $action = $this->request->getRequestParam('action');
        $plugins_page_actions = [
            'activate',
            'activate-multi',
            'activate-selected',
            'deactivate',
            'deactivate-multi',
            'deactivate-selected',
            'delete-selected',
            'disable-auto-update-selected',
            'enable-auto-update-selected',
            'update-selected',
        ];
        return $this->uriPathMatches('wp-admin/plugins.php')
               && ($action === 'true' || in_array($action, $plugins_page_actions, true));
    }


    /**
     * @param string $extra_path
     * @return bool
     */
    private function isRestApiRequest(string $extra_path = ''): bool
    {
        $rest_route = $this->request->getRequestParam('rest_route');
        return (
            $this->request->getRequestParam('rest_route') !== ''
            && ( $extra_path === '' || strpos($rest_route, $extra_path) !== 0 )
        )
        || $this->uriPathMatches(trim(rest_get_url_prefix(), '/') . $extra_path);
    }


    /**
     * @return bool
     */
    private function isEspressoRestApiRequest(): bool
    {
        $api_namespace = '/' . ltrim(Domain::API_NAMESPACE, '/');
        // Check for URLs like http://mysite.com/?rest_route=/ee... and http://mysite.com/wp-json/ee/...
        return $this->isRestApiRequest($api_namespace);
    }


    /**
     * Checks for URLs like https://mysite.com/graphql
     *
     * @return bool
     */
    private function isEspressoGraphQLRequest(): bool
    {
        if ($this->gql_endpoint->isGraphqlRequest()) {
            return true;
        }
        $gql_endpoint = $this->gql_endpoint->getEndpoint();
        return $this->uriPathMatches($gql_endpoint) || $this->request->requestParamIsSet($gql_endpoint);
    }


    /**
     * @return bool
     */
    private function isWordPressRestApiRequest(): bool
    {
        // Check for URLs like http://mysite.com/?rest_route=/.. and http://mysite.com/wp-json/...
        return $this->isRestApiRequest();
    }


    /**
     * @return bool
     */
    private function isCronRequest(): bool
    {
        return $this->uriPathMatches('wp-cron.php');
    }


    /**
     * @return bool
     */
    private function isFeedRequest(): bool
    {
        return $this->uriPathMatches('feed');
    }


    /**
     * returns true if the current request URI starts with the supplied $component string
     *
     * @param string $component
     * @return bool
     */
    private function uriPathMatches(string $component): bool
    {
        $request_uri = $this->request->requestUri(true);
        $parts = explode('?', $request_uri);
        $path = trim(reset($parts), '/');
        return strpos($path, $component) === 0;
    }


    /**
     * @return bool
     */
    private function isIframeRoute(): bool
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

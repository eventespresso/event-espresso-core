<?php

namespace EventEspresso\core\services\addon\api;

use EventEspresso\core\services\request\RequestInterface;

class ThirdPartyPluginHandler
{
    /**
     * @var RequestInterface $request
     */
    private $request;


    /**
     * ThirdPartyPluginHandler constructor.
     *
     * @param RequestInterface $request
     */
    public function __construct(RequestInterface $request)
    {
        $this->request = $request;
    }


    public function loadPlugins()
    {
        $this->wpApiBasicAuth();
    }


    private function wpApiBasicAuth()
    {
        // if the WP API basic auth plugin isn't already loaded, load it now.
        // We want it for mobile apps. Just include the entire plugin
        // also, don't load the basic auth when a plugin is getting activated, because
        // it could be the basic auth plugin, and it doesn't check if its methods are already defined
        // and causes a fatal error
        if (
            ($this->request->isWordPressApi() || $this->request->isApi())
            && ! $this->request->isActivation()
            && ! function_exists('json_basic_auth_handler')
            && ! function_exists('json_basic_auth_error')
        ) {
            include_once EE_THIRD_PARTY . 'wp-api-basic-auth/basic-auth.php';
        }
    }
}

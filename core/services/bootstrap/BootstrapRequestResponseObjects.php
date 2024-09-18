<?php

namespace EventEspresso\core\services\bootstrap;

use EE_Dependency_Map;
use EE_Error;
use EE_Request;
use EventEspresso\core\domain\services\validation\email\strategies\Basic;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\LegacyRequestInterface;
use EventEspresso\core\services\request\Request;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\RequestParams;
use EventEspresso\core\services\request\Response;
use EventEspresso\core\services\request\ResponseInterface;
use EventEspresso\core\services\request\sanitizers\RequestSanitizer;
use EventEspresso\core\services\request\sanitizers\ServerSanitizer;
use EventEspresso\core\services\request\ServerParams;
use InvalidArgumentException;

/**
 * Class BootstrapRequestResponseObjects
 * Sets up the Request and Response objects
 * as well as backwards compatibility for the Legacy EE_Request object
 *
 * @package EventEspresso\core\services\bootstrap
 * @author  Brent Christensen
 * @since   4.9.53
 */
class BootstrapRequestResponseObjects
{
    protected LegacyRequestInterface $legacy_request;

    protected LoaderInterface $loader;

    protected RequestInterface $request;

    protected ResponseInterface $response;


    /**
     * BootstrapRequestResponseObjects constructor.
     *
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }


    /**
     * @return void
     */
    public function buildRequestResponse()
    {
        $email_validator   = new Basic();
        $request_sanitizer = new RequestSanitizer($email_validator);
        $server_sanitizer  = new ServerSanitizer();
        $request_params    = new RequestParams($request_sanitizer, $_GET, $_POST);
        $server_params     = new ServerParams($server_sanitizer, $_SERVER);
        // load our Request and Response objects
        $this->request  = apply_filters(
            'FHEE___EventEspresso_core_services_bootstrap_BootstrapRequestResponseObjects__buildRequestResponse__request',
            new Request($request_params, $server_params),
            $request_params,
            $server_params,
            $request_sanitizer,
            $server_sanitizer
        );
        $this->response = apply_filters(
            'FHEE___EventEspresso_core_services_bootstrap_BootstrapRequestResponseObjects__buildRequestResponse__response',
            new Response()
        );
        $this->loader->share(Basic::class, $email_validator);
        $this->loader->share(RequestSanitizer::class, $request_sanitizer);
        $this->loader->share(ServerSanitizer::class, $server_sanitizer);
        $this->loader->share(RequestParams::class, $request_params);
        $this->loader->share(ServerParams::class, $server_params);
    }


    /**
     * @return void
     * @throws InvalidArgumentException
     */
    public function shareRequestResponse()
    {
        $this->loader->share(Request::class, $this->request);
        $this->loader->share(Response::class, $this->response);
        EE_Dependency_Map::instance()->setRequest($this->request);
        EE_Dependency_Map::instance()->setResponse($this->response);
    }


    /**
     * @return void
     * @throws InvalidArgumentException
     * @throws EE_Error
     */
    public function setupLegacyRequest()
    {
        espresso_load_required(
            'EE_Request',
            EE_CORE . 'request_stack/EE_Request.core.php'
        );
        $this->legacy_request = new EE_Request($_GET, $_POST, $_COOKIE, $_SERVER);
        $this->legacy_request->setRequest($this->request);
        $this->legacy_request->admin      = $this->request->isAdmin();
        $this->legacy_request->ajax       = $this->request->isAjax();
        $this->legacy_request->front_ajax = $this->request->isFrontAjax();
        EE_Dependency_Map::instance()->setLegacyRequest($this->legacy_request);
        $this->loader->share('EE_Request', $this->legacy_request);
        $this->loader->share('EventEspresso\core\services\request\LegacyRequestInterface', $this->legacy_request);
    }
}

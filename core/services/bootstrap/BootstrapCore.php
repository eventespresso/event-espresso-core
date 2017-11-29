<?php

namespace EventEspresso\core\services\bootstrap;

use EE_Error;
use EEH_Autoloader;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\RequestStack;
use EventEspresso\core\services\request\RequestStackBuilder;
use EventEspresso\core\services\request\RequestStackCoreApp;
use EventEspresso\core\services\request\ResponseInterface;
use InvalidArgumentException;
use ReflectionException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class BootstrapCore
 * Bootstraps the main DI container as well as the Request and Response objects.
 * Then loads a few required autoloaders, then proceeds to build a request stack
 * which consists of an array of EE_Middleware request decorator classes.
 * Each middleware class wraps the previous middleware class with itself,
 * with the core application loader residing at the center.
 * The stack is then processed by passing an EE_Request object to the first class in the stack.
 * Each middleware class:
 *      accepts the request object
 *        passes the request to the next middleware class in the stack
 *        receives an EE_Response object from that next middleware class
 *        applies it's logic before and/or after doing the above
 *        returns an EE_Response object to the previous middleware class
 *        and can terminate the request at any point during the above
 * If none of the middleware classes terminate the request,
 * then the Request Stack will terminate itself after everything else is finished.
 *
 * @package EventEspresso\core\services\bootstrap
 * @author  Brent Christensen
 * @since   $VID:$
 */
class BootstrapCore
{

    /**
     * @type LoaderInterface $loader
     */
    private $loader;

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * @var ResponseInterface $response
     */
    protected $response;

    /**
     * @var RequestStackBuilder $request_stack_builder
     */
    protected $request_stack_builder;

    /**
     * @var RequestStack $request_stack
     */
    protected $request_stack;



    public function __construct()
    {
        // construct request stack and run middleware apps as soon as all WP plugins are loaded
        add_action('plugins_loaded', array($this, 'initialize'), 0);
    }


    public function initialize()
    {
        $this->bootstrapDependencyInjectionContainer();
        $bootstrap_request = $this->bootstrapRequestResponseObjects();
        $this->runRequestStack();
        $bootstrap_request->setupLegacyRequest();
    }


    /**
     * @throws ReflectionException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function bootstrapDependencyInjectionContainer()
    {
        $bootstrap_di = new BootstrapDependencyInjectionContainer();
        $bootstrap_di->buildLegacyDependencyInjectionContainer();
        $bootstrap_di->buildLoader();
        $registry = $bootstrap_di->getRegistry();
        $dependency_map = $bootstrap_di->getDependencyMap();
        $dependency_map->initialize();
        $registry->initialize();
        $this->loader = $bootstrap_di->getLoader();
    }


    /**
     * sets up the request and response objects
     *
     * @return BootstrapRequestResponseObjects
     * @throws InvalidArgumentException
     */
    private function bootstrapRequestResponseObjects()
    {
        /** @var BootstrapRequestResponseObjects $bootstrap_request */
        $bootstrap_request = $this->loader->getShared(
            'EventEspresso\core\services\bootstrap\BootstrapRequestResponseObjects',
            array($this->loader)
        );
        $bootstrap_request->buildRequestResponse();
        $bootstrap_request->shareRequestResponse();
        $this->request  = $this->loader->getShared('EventEspresso\core\services\request\Request');
        $this->response = $this->loader->getShared('EventEspresso\core\services\request\Response');
        return $bootstrap_request;
    }



    /**
     * run_request_stack
     * construct request stack and run middleware apps
     *
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function runRequestStack()
    {
        $this->loadAutoloader();
        $this->setAutoloadersForRequiredFiles();
        $this->request_stack_builder = $this->buildRequestStack();
        $this->request_stack         = $this->request_stack_builder->resolve(
            new RequestStackCoreApp()
        );
        $this->request_stack->handleRequest($this->request, $this->response);
        $this->request_stack->handleResponse();
    }



    /**
     * load_autoloader
     */
    protected function loadAutoloader()
    {
        // load interfaces
        espresso_load_required(
            'EEH_Autoloader',
            EE_CORE . 'helpers' . DS . 'EEH_Autoloader.helper.php'
        );
        EEH_Autoloader::instance();
    }



    /**
     * load_required_files
     *
     * @throws EE_Error
     */
    protected function setAutoloadersForRequiredFiles()
    {
        // load interfaces
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_CORE . 'interfaces', true);
        // load helpers
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_HELPERS);
        // load request stack
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_CORE . 'request_stack' . DS);
        // load middleware
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_CORE . 'middleware' . DS);
    }



    /**
     * build_request_stack
     *
     * @return RequestStackBuilder
     * @throws InvalidArgumentException
     */
    public function buildRequestStack()
    {
        $request_stack_builder = new RequestStackBuilder($this->loader);
        /**
         * ! IMPORTANT ! middleware stack operates FILO : FIRST IN LAST OUT
         * so items at the beginning of the final middleware stack will run last
         * First parameter is the middleware classname, second is an array of arguments
         */
        $stack_apps            = apply_filters(
            'FHEE__EventEspresso_core_services_bootstrap_BootstrapCore__buildRequestStack__stack_apps',
            array(
                // first in last out
                'EventEspresso\core\services\request\middleware\PreProductionVersionWarning' => array(),
                'EventEspresso\core\services\request\middleware\BotDetector' => array(),
                'EventEspresso\core\services\request\middleware\RecommendedVersions' => array(),
                // last in first out
                'EventEspresso\core\services\request\middleware\DetectLogin' => array(),
            )
        );
        // legacy filter for backwards compatibility
        $stack_apps            = apply_filters(
            'FHEE__EE_Bootstrap__build_request_stack__stack_apps',
            $stack_apps
        );
        // first we'll add this on its own because we need it to always be part of the stack
        // and we also need it to always run first because the rest of the system relies on it
        $request_stack_builder->push(
            array('EventEspresso\core\services\request\middleware\SetRequestTypeContextChecker', array())
        );
        // load middleware onto stack : FILO (First In Last Out)
        // items at the beginning of the $stack_apps array will run last
        foreach ((array) $stack_apps as $stack_app => $stack_app_args) {
            $request_stack_builder->push(array($stack_app, $stack_app_args));
        }
        return apply_filters(
            'FHEE__EE_Bootstrap__build_request_stack__request_stack_builder',
            $request_stack_builder
        );
    }


}
// Location: BootstrapCore.php

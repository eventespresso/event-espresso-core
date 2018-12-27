<?php

use EventEspresso\core\domain\DomainFactory;
use EventEspresso\core\domain\values\FilePath;
use EventEspresso\core\domain\values\FullyQualifiedName;
use EventEspresso\core\domain\values\Version;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestDecoratorInterface;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\RequestStackCoreAppInterface;
use EventEspresso\core\services\request\ResponseInterface;

/**
 * EE_Load_Espresso_Core
 * This is the core application loader class at the center of the EE Middleware Request Stack.
 * Although not an instance of EE_Middleware, it DOES implement the EEI_Request_Decorator, allowing it to communicate
 * with the other EE_Middleware classes.
 * Performs all of the basic class loading that used to be in the EE_System constructor.
 *
 * @package        Event Espresso
 * @subpackage     core/
 * @author         Brent Christensen, Michael Nelson
 * ------------------------------------------------------------------------
 */
class EE_Load_Espresso_Core implements RequestDecoratorInterface, RequestStackCoreAppInterface
{

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * @var ResponseInterface $response
     */
    protected $response;

    /**
     * @var EE_Dependency_Map $dependency_map
     */
    protected $dependency_map;

    /**
     * @var EE_Registry $registry
     */
    protected $registry;


    /**
     * EE_Load_Espresso_Core constructor
     *
     * @param EE_Registry       $registry
     * @param EE_Dependency_Map $dependency_map
     * @throws EE_Error
     */
    public function __construct(EE_Registry $registry, EE_Dependency_Map $dependency_map)
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'This class is deprecated. Please use %1$s instead. All Event Espresso request stack classes have been moved to %2$s and are now under the %3$s namespace',
                    'event_espresso'
                ),
                'EventEspresso\core\services\request\RequestStackCoreApp',
                '\core\services\request',
                'EventEspresso\core\services\request'
            ),
            '4.9.53'
        );
    }


    /**
     * handle
     * sets hooks for running rest of system
     * provides "AHEE__EE_System__construct__complete" hook for EE Addons to use as their starting point
     * starting EE Addons from any other point may lead to problems
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws DomainException
     */
    public function handleRequest(RequestInterface $request, ResponseInterface $response)
    {
    }


    /**
     * @return RequestInterface
     */
    public function request()
    {
    }


    /**
     * @return ResponseInterface
     */
    public function response()
    {
    }


    /**
     * @return EE_Dependency_Map
     * @throws EE_Error
     */
    public function dependency_map()
    {
    }


    /**
     * @return EE_Registry
     * @throws EE_Error
     */
    public function registry()
    {
    }


    /**
     * called after the request stack has been fully processed
     * if any of the middleware apps has requested the plugin be deactivated, then we do that now
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     */
    public function handleResponse(RequestInterface $request, ResponseInterface $response)
    {
    }
}

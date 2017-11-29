<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use InvalidArgumentException;
use ReflectionClass;
use ReflectionException;
use SplStack;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RequestStackBuilder
 * Assembles the EventEspresso RequestStack
 * ! IMPORTANT ! middleware stack operates FIRST IN LAST OUT
 * so items at the beginning of the final middleware array will run last
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   4.9.53
 */
class RequestStackBuilder extends SplStack
{

    /**
     * @type LoaderInterface $loader
     */
    private $loader;


    /**
     * RequestStackBuilder constructor.
     *
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }


    /**
     * builds decorated middleware stack
     * by continuously injecting previous middleware app into the next
     *
     * @param RequestStackCoreAppInterface $application
     * @return RequestStack
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function resolve(RequestStackCoreAppInterface $application)
    {
        $core_app = $application;
        for ($this->rewind(); $this->valid(); $this->next()) {
            $middleware_app       = $this->current();
            $middleware_app_class = array_shift($middleware_app);
            $middleware_app_args  = is_array($middleware_app) ? $middleware_app : array();
            $middleware_app_args  = array($application, $this->loader) + $middleware_app_args;
            $application = $this->loader->getShared($middleware_app_class, $middleware_app_args);
        }
        return new RequestStack($application, $core_app);
    }
}

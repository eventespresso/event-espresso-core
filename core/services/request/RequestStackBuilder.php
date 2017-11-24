<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;
use ReflectionClass;
use ReflectionException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RequestStackBuilder
 * Assembles the EventEspresso RequestStack
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   4.9.53
 */
class RequestStackBuilder
{

    /**
     * Stack of middleware objects
     *
     * @type array $middleware_stack
     */
    protected $middleware_stack;



    /**
     * RequestStackBuilder
     */
    public function __construct()
    {
        $this->middleware_stack = array();
    }



    /**
     * Add a Middleware class to the beginning of the middleware stack
     * ! IMPORTANT ! middleware stack operates  FIRST IN LAST OUT
     * First parameter is the middleware classname,
     * any number of arguments can also be passed, and detected via func_get_args()
     * @ param $class_name
     * @ param $args
     *
     * @return RequestStackBuilder
     * @throws InvalidArgumentException
     */
    public function unshift( /*$class_name, $args*/)
    {
        if (func_num_args() === 0) {
            throw new InvalidArgumentException('Missing argument(s) when calling unshift');
        }
        $middleware_args = func_get_args();
        $middleware_app_class = array_shift($middleware_args);
        $this->middleware_stack = array($middleware_app_class => $middleware_args) + $this->middleware_stack;
        return $this;
    }



    /**
     * Add a Middleware class to the end of the middleware stack
     * ! IMPORTANT ! middleware stack operates  FIRST IN LAST OUT
     * First parameter is the middleware classname,
     * any number of arguments can also be passed, and detected via func_get_args()
     * @ param $class_name
     * @ param $args
     *
     * @return RequestStackBuilder
     * @throws InvalidArgumentException
     */
    public function push( /*$class_name, $args...*/)
    {
        if (func_num_args() === 0) {
            throw new InvalidArgumentException('Missing argument(s) when calling push');
        }
        $middleware_args = func_get_args();
        $middleware_app_class = array_shift($middleware_args);
        $this->middleware_stack[ $middleware_app_class] = $middleware_args;
        return $this;
    }



    /**
     * builds decorated middleware stack
     * by continuously injecting previous middleware app into the next
     *
     * @param RequestDecorator $application
     * @return RequestStack
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function resolve(RequestDecorator $application)
    {
        $core_app = $application;
        $loader = LoaderFactory::getLoader();
        $middleware_stack = array();
        foreach ($this->middleware_stack as $middleware_app_class => $middleware_app_args) {
            $middleware_app_args = array($application, $loader) + $middleware_app_args;
            if (is_callable($middleware_app_class)) {
                $application = $middleware_app_class($application);
            } else {
                $reflection  = new ReflectionClass($middleware_app_class);
                /** @var RequestDecorator $application */
                $application = $reflection->newInstanceArgs($middleware_app_args);
            }
            $middleware_stack[] = $application;
        }
        $middleware_stack[] = $core_app;
        return new RequestStack($application, $middleware_stack);
    }


}
// Location: RequestStackBuilder.php

<?php

use EventEspresso\core\interfaces\InterminableInterface;
use EventEspresso\core\services\modules\ModuleRoutesManager;
use EventEspresso\core\services\request\RequestInterface;

/**
 *  Class EE_Module_Request_Router
 *
 *    This class handles module instantiation, forward chaining, and obtaining views for the Front Controller.
 *    Basically a Module Factory.
 *
 * @package     Event Espresso
 * @subpackage  /core/
 * @author      Brent Christensen
 */
final class EE_Module_Request_Router implements InterminableInterface
{
    private RequestInterface $request;

    private ModuleRoutesManager $module_routes_manager;

    private static array $_previous_routes = [];

    public ?WP_Query $WP_Query = null;


    /**
     * EE_Module_Request_Router constructor.
     *
     * @param RequestInterface    $request
     * @param ModuleRoutesManager $module_routes_manager
     */
    public function __construct(RequestInterface $request, ModuleRoutesManager $module_routes_manager)
    {
        $this->request               = $request;
        $this->module_routes_manager = $module_routes_manager;
    }


    /**
     * on the first call  to this method, it checks the Request for a "route"
     * on subsequent calls to this method,
     * instead of checking the Request for a route, it checks the previous routes array,
     * and checks if the last called route has any forwarding routes registered for it
     *
     * @param WP_Query $WP_Query
     * @return NULL|string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_route(WP_Query $WP_Query)
    {
        $this->WP_Query = $WP_Query;
        // assume this if first route being called
        $previous_route = false;
        // but is it really ???
        if (! empty(self::$_previous_routes)) {
            // get last run route
            $previous_routes = array_values(self::$_previous_routes);
            $previous_route  = array_pop($previous_routes);
        }
        //  has another route already been run ?
        if ($previous_route) {
            // check if  forwarding has been set
            $current_route = $this->get_forward((array) $previous_route);
            try {
                // check for recursive forwarding
                if (isset(self::$_previous_routes[ $current_route ])) {
                    throw new EE_Error(
                        sprintf(
                            esc_html__(
                                'An error occurred. The %s route has already been called, and therefore can not be forwarded to, because an infinite loop would be created and break the interweb.',
                                'event_espresso'
                            ),
                            $current_route
                        )
                    );
                }
            } catch (EE_Error $e) {
                $e->get_error();
                return null;
            }
        } else {
            // first route called
            $current_route = null;
            // grab all routes
            $routes = $this->module_routes_manager->getRoutes();
            foreach ($routes as $key => $route) {
                // first determine if route key uses w?ldc*rds
                $uses_wildcards = strpos($key, '?') !== false || strpos($key, '*') !== false;
                // check request for module route
                $route_found = $uses_wildcards
                    ? $this->request->matches($key)
                    : $this->request->requestParamIsSet($key);
                if ($route_found) {
                    $current_route = $uses_wildcards
                        ? $this->request->getMatch($key)
                        : $this->request->getRequestParam($key);
                    $current_route = sanitize_text_field($current_route);
                    if ($current_route) {
                        $current_route = [$key, $current_route];
                        break;
                    }
                }
            }
        }
        // sorry, but I can't read what you route !
        if (empty($current_route)) {
            return null;
        }
        // add route to previous routes array
        self::$_previous_routes[] = $current_route;
        return $current_route;
    }


    /**
     * this method simply takes a valid route, and resolves what module class method the route points to
     *
     * @param string $key
     * @param string $current_route
     * @return EED_Module|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function resolve_route(string $key, string $current_route): ?EED_Module
    {
        // get module method that route has been mapped to
        $module_method = $this->module_routes_manager->getRoute($current_route, $key);
        // verify result was returned
        if (empty($module_method)) {
            $msg = sprintf(
                esc_html__('The requested route %s could not be mapped to any registered modules.', 'event_espresso'),
                $current_route
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return null;
        }
        // grab module name
        $module_name = $module_method[0];
        // verify that a class method was registered properly
        if (! isset($module_method[1])) {
            $msg = sprintf(
                esc_html__('A class method for the %s  route has not been properly registered.', 'event_espresso'),
                $current_route
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return null;
        }
        // grab method
        $method = $module_method[1];
        // verify that class exists
        if (! class_exists($module_name)) {
            $msg = sprintf(esc_html__('The requested %s class could not be found.', 'event_espresso'), $module_name);
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return null;
        }
        // verify that method exists
        if (! method_exists($module_name, $method)) {
            $msg = sprintf(
                esc_html__('The class method %s for the %s route is in invalid.', 'event_espresso'),
                $method,
                $current_route
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return null;
        }
        // instantiate module and call route method
        return $this->_module_router($module_name, $method);
    }


    /**
     * this method instantiates modules and calls the method that was defined when the route was registered
     *
     * @param string $module_name
     * @return EED_Module|null
     */
    public static function module_factory(string $module_name): ?EED_Module
    {
        if ($module_name === 'EED_Module') {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'EED_Module is an abstract parent class an can not be instantiated. Please provide a proper module name.',
                        'event_espresso'
                    ),
                    $module_name
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return null;
        }
        // instantiate module class
        $module = new $module_name();
        // ensure that class is actually a module
        if (! $module instanceof EED_Module) {
            EE_Error::add_error(
                sprintf(
                    esc_html__('The requested %s module is not of the class EED_Module.', 'event_espresso'),
                    $module_name
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return null;
        }
        return $module;
    }


    /**
     * this method instantiates modules and calls the method that was defined when the route was registered
     *
     * @param string $module_name
     * @param string $method
     * @return EED_Module|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _module_router(string $module_name, string $method): ?EED_Module
    {
        // instantiate module class
        $module = EE_Module_Request_Router::module_factory($module_name);
        if ($module instanceof EED_Module) {
            // and call whatever action the route was for
            try {
                $module->{$method}($this->WP_Query);
            } catch (EE_Error $e) {
                $e->get_error();
                return null;
            }
        }
        return $module;
    }


    /**
     * @param array $current_route
     * @return string
     */
    public function get_forward(array $current_route): string
    {
        if (isset($current_route[0], $current_route[1])) {
            return $this->module_routes_manager->getForward($current_route[1], $current_route[0]);
        }
        return '';
    }


    /**
     * @param array $current_route
     * @return string
     */
    public function get_view(array $current_route): string
    {
        if (isset($current_route[0], $current_route[1])) {
            return $this->module_routes_manager->getView($current_route[1], $current_route[0]);
        }
        return '';
    }
}

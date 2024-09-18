<?php

namespace EventEspresso\core\services\modules;

use EE_Error;
use EE_Registry;
use EventEspresso\core\services\container\RegistryContainer;

class ModuleRoutesManager
{
    public RegistryContainer $modules;

    private array $module_route_map = [];

    private array $module_forward_map = [];

    private array $module_view_map = [];


    public function __construct()
    {
        $this->modules = EE_Registry::instance()->modules;
    }


    /**
     * adds module method routes to route_map
     *
     * @param string $route         "pretty" public alias for module method
     * @param string $module        module name (classname without EED_ prefix)
     * @param string $method_name   the actual module method to be routed to
     * @param string $key           url param key indicating a route is being called
     * @return bool
     */
    public function registerRoute(
        string $route = '',
        string $module = '',
        string $method_name = '',
        string $key = 'ee'
    ): bool {
        do_action('AHEE__EE_Config__register_route__begin', $route, $module, $method_name);
        $module       = str_replace('EED_', '', $module);
        $module_class = 'EED_' . $module;
        if (! isset($this->modules->{$module_class})) {
            $msg = sprintf(esc_html__('The module %s has not been registered.', 'event_espresso'), $module);
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        if (empty($route)) {
            $msg = sprintf(esc_html__('No route has been supplied.', 'event_espresso'), $route);
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        if (! method_exists('EED_' . $module, $method_name)) {
            $msg = sprintf(
                esc_html__('A valid class method for the %s route has not been supplied.', 'event_espresso'),
                $route
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        $this->module_route_map[ $key ][ $route ] = ['EED_' . $module, $method_name];
        return true;
    }


    /**
     * get module method route
     *
     * @param string $route  "pretty" public alias for module method
     * @param string $key    url param key indicating a route is being called
     * @return array
     */
    public function getRoute(string $route = '', string $key = 'ee'): array
    {
        do_action('AHEE__EE_Config__get_route__begin', $route);
        $route = (string) apply_filters('FHEE__EE_Config__get_route', $route);
        if (isset($this->module_route_map[ $key ][ $route ])) {
            return $this->module_route_map[ $key ][ $route ];
        }
        return [];
    }


    /**
     * get ALL module method routes
     *
     * @return array
     */
    public function getRoutes(): array
    {
        return $this->module_route_map;
    }


    /**
     * get forwarding route
     *
     * @param array|string $route    "pretty" public alias for module method
     * @param string       $key      url param key indicating a route is being called
     * @param int          $status   integer value corresponding  to status constant strings set in module parent class,
     *                               allows different forwards to be served based on status
     * @return string
     */
    public function getForward($route = '', string $key = 'ee', int $status = 0): string
    {
        if (is_array($route) && isset($route[0], $route[1])) {
            $key   = $route[0];
            $route = $route[1];
        }
        do_action('AHEE__EE_Config__get_forward__begin', $route, $status);
        if (isset($this->module_forward_map[ $key ][ $route ][ $status ])) {
            return apply_filters(
                'FHEE__EE_Config__get_forward',
                $this->module_forward_map[ $key ][ $route ][ $status ],
                $route,
                $status
            );
        }
        return '';
    }


    /**
     * allows modules to specify different view templates for different method routes and status results
     *
     * @param string $view      path to templates file used for view
     * @param string $route     "pretty" public alias for module method
     * @param string $key       url param key indicating a route is being called
     * @param int    $status    integer value corresponding  to status constant strings set in module parent class,
     *                          allows different views to be served based on status
     * @return bool
     */
    public function registerView(string $view, string $route, string $key = 'ee', int $status = 0): bool
    {
        do_action('AHEE__EE_Config__register_view__begin', $route, $status, $view);
        if (! isset($this->module_route_map[ $key ][ $route ]) || empty($route)) {
            $msg = sprintf(
                esc_html__('The module route %s for this view has not been registered.', 'event_espresso'),
                $route
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        if (! is_readable($view)) {
            $msg = sprintf(
                esc_html__(
                    'The %s view file could not be found or is not readable due to file permissions.',
                    'event_espresso'
                ),
                $view
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        $this->module_view_map[ $key ][ $route ][ $status ] = $view;
        return true;
    }


    /**
     * allows modules to forward request to another module for further processing
     *
     * @param array|string $forward  function name or array( class, method )
     * @param string       $route    "pretty" public alias for module method
     * @param string       $key      url param key indicating a route is being called
     * @param int          $status   integer value corresponding  to status constant strings set in module parent
     *                               class, allows different forwards to be served based on status
     * @return bool
     */
    public function registerForward($forward, string $route, string $key = 'ee', int $status = 0): bool
    {
        do_action('AHEE__EE_Config__register_forward', $route, $status, $forward);
        if (! isset($this->module_route_map[ $key ][ $route ]) || empty($route)) {
            $msg = sprintf(
                esc_html__('The module route %s for this forward has not been registered.', 'event_espresso'),
                $route
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        if (empty($forward)) {
            $msg = sprintf(esc_html__('No forwarding route has been supplied.', 'event_espresso'), $route);
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        if (is_array($forward)) {
            if (! isset($forward[1])) {
                $msg = sprintf(
                    esc_html__('A class method for the %s forwarding route has not been supplied.', 'event_espresso'),
                    $route
                );
                EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
                return false;
            }
            if (! method_exists($forward[0], $forward[1])) {
                $msg = sprintf(
                    esc_html__('The class method %1$s for the %2$s forwarding route is in invalid.', 'event_espresso'),
                    $forward[1],
                    $route
                );
                EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
                return false;
            }
        } elseif (! function_exists($forward)) {
            $msg = sprintf(
                esc_html__('The function %1$s for the %2$s forwarding route is in invalid.', 'event_espresso'),
                $forward,
                $route
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        $this->module_forward_map[ $key ][ $route ][ absint($status) ] = $forward;
        return true;
    }


    /**
     * get view for route and status
     *
     * @param string $route     "pretty" public alias for module method
     * @param string $key       url param key indicating a route is being called
     * @param int    $status    integer value corresponding  to status constant strings set in module parent class,
     *                          allows different views to be served based on status
     * @return string
     */
    public function getView(string $route = '', string $key = 'ee', int $status = 0): string
    {
        do_action('AHEE__EE_Config__get_view__begin', $route, $status);
        if (isset($this->module_view_map[ $key ][ $route ][ $status ])) {
            return (string) apply_filters(
                'FHEE__EE_Config__get_view',
                $this->module_view_map[ $key ][ $route ][ $status ],
                $route,
                $status
            );
        }
        return '';
    }
}

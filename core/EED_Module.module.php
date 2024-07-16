<?php

use EventEspresso\core\interfaces\ResettableInterface;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\modules\ModuleRoutesManager;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;

/**
 * * EED_Module
 *
 * @package     Event Espresso
 * @subpackage  /core/
 * @author      Brent Christensen
 */
abstract class EED_Module extends EE_Configurable implements ResettableInterface
{
    private static ?ModuleRoutesManager $module_routes_manager = null;

    /**
     * rendered output to be returned to WP
     */
    protected string $output = '';

    /**
     * the current active espresso template theme
     */
    protected string $theme = '';


    /**
     * @return void
     */
    public static function reset()
    {
        $module_name = get_called_class();
        new $module_name();
    }


    /**
     * set_hooks - for hooking into EE Core, other modules, etc
     *
     * @return void
     */
    public static function set_hooks()
    {
    }


    /**
     * set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @return void
     */
    public static function set_hooks_admin()
    {
    }


    /**
     * run - initial module setup
     * this method is primarily used for activating resources in the EE_Front_Controller thru the use of filters
     *
     * @param WP $WP
     * @return void
     */
    abstract public function run($WP);


    /**
     * EED_Module constructor.
     */
    final public function __construct()
    {
        $this->theme                                     = EE_Config::get_current_theme();
        $module_name                                     = $this->module_name();
        EE_Registry::instance()->modules->{$module_name} = $this;
    }


    /**
     * @param string $module_name
     * @return EED_Module|mixed
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected static function get_instance(string $module_name = '')
    {
        $module_name = ! empty($module_name)
            ? $module_name
            : get_called_class();
        if (
            ! isset(EE_Registry::instance()->modules->{$module_name})
            || ! EE_Registry::instance()->modules->{$module_name} instanceof EED_Module
        ) {
            EE_Registry::instance()->add_module($module_name);
        }
        return EE_Registry::instance()->get_module($module_name);
    }


    /**
     * @return string
     */
    public function module_name(): string
    {
        return get_class($this);
    }


    /**
     * @return string
     */
    public function theme(): string
    {
        return $this->theme;
    }


    /**
     * @return RequestInterface
     * @since 4.10.14.p
     */
    protected static function getRequest()
    {
        static $request;
        if (! $request instanceof RequestInterface) {
            $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        }
        return $request;
    }


    /**
     * @return ResponseInterface
     * @since 4.10.14.p
     */
    protected static function getResponse(): ResponseInterface
    {
        static $response;
        if (! $response instanceof RequestInterface) {
            $response = LoaderFactory::getLoader()->getShared(ResponseInterface::class);
        }
        return $response;
    }


    public static function getModuleRoutesManager(): ModuleRoutesManager
    {
        if (! self::$module_routes_manager instanceof ModuleRoutesManager) {
            self::$module_routes_manager = LoaderFactory::getLoader()->getShared(ModuleRoutesManager::class);
        }
        return self::$module_routes_manager;
    }


    public static function registerRoute(
        string $route = '',
        string $module = '',
        string $method_name = '',
        string $key = 'ee'
    ): bool {
        return self::getModuleRoutesManager()->registerRoute($route, $module, $method_name, $key);
    }
}

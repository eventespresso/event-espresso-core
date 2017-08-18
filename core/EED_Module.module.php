<?php
use EventEspresso\core\interfaces\ResettableInterface;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');


/**
 * * EED_Module
 *
 * @package     Event Espresso
 * @subpackage  /core/
 * @author      Brent Christensen
 */
abstract class EED_Module extends EE_Configurable implements ResettableInterface
{

    /**
     * rendered output to be returned to WP
     *
     * @var    string $output
     */
    protected $output = '';

    /**
     * the current active espresso template theme
     *
     * @var    string $theme
     */
    protected $theme = '';



    /**
     * @return void
     */
    public static function reset()
    {
        $module_name = get_called_class();
        new $module_name();
    }



    /**
     *    set_hooks - for hooking into EE Core, other modules, etc
     *
     * @access    public
     * @return    void
     */
    public static function set_hooks()
    {
    }



    /**
     *    set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @access    public
     * @return    void
     */
    public static function set_hooks_admin()
    {
    }



    /**
     *    run - initial module setup
     *    this method is primarily used for activating resources in the EE_Front_Controller thru the use of filters
     *
     * @access    public
     * @var            WP $WP
     * @return    void
     */
    abstract public function run($WP);



    /**
     * EED_Module constructor.
     */
    final public function __construct()
    {
        $this->theme = EE_Config::get_current_theme();
        $module_name = $this->module_name();
        EE_Registry::instance()->modules->{$module_name} = $this;
    }



    /**
     * @param $module_name
     * @return EED_Module
     */
    protected static function get_instance($module_name = '')
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
     *    module_name
     *
     * @access    public
     * @return    string
     */
    public function module_name()
    {
        return get_class($this);
    }



    /**
     * @return string
     */
    public function theme()
    {
        return $this->theme;
    }



}
// End of file EED_Module.module.php

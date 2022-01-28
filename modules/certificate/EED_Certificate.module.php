<?php

/**
 * Event List
 *
 * @package               Event Espresso
 * @subpackage            /modules/certificate/
 * @author                Brent Christensen
 * @method EED_Certificate get_instance($module_name)
 */
class EED_Certificate extends EED_Module
{


    /**
     * @return EED_Module|EED_Certificate
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
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
     *
     * @access    public
     * @return    void
     */
    public function run($WP)
    {
    }


    /**
     *    certificate_launch
     *
     * @access    public
     * @return    void
     */
    public function certificate_launch()
    {
        $request = self::getRequest();
        if ($request->requestParamIsSet('id') && $request->requestParamIsSet('r_id')) {
            echo espresso_certificate_launch(
                $request->getRequestParam('id'),
                $request->getRequestParam('r_id')
            );
        }
    }


    /**
     *    wp_loaded
     *
     * @access    public
     * @return    void
     */
    public function wp_loaded()
    {
    }


    /**
     *    wp
     *
     * @access    public
     * @return    void
     */
    public function wp()
    {
    }


    /**
     *    the_content
     *
     * @access    public
     * @return    string
     */
    public function the_content($content)
    {
        $content .= $this->ouput;
        return $content;
    }
}

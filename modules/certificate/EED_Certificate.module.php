<?php
/**
 * Event List
 *
 * @package               Event Espresso
 * @subpackage            /modules/certificate/
 * @author                Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Certificate extends EED_Module
{


    /**
     * @return EED_Module
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
        if (EE_Registry::instance()->REQ->is_set('id') && EE_Registry::instance()->REQ->is_set('r_id')) {
            echo espresso_certificate_launch(
                EE_Registry::instance()->REQ->get('id'),
                EE_Registry::instance()->REQ->get('r_id')
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
     * @return    void
     */
    public function the_content($content)
    {
        $content .= $this->ouput;
        return $content;
    }
}

<?php
/**
 * Event List
 *
 * @package               Event Espresso
 * @subpackage            /modules/csv/
 * @author                Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Csv extends EED_Module
{


    /**
     * @return EED_Csv
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
     *    export
     *
     * @access    public
     * @return    void
     */
    public function export()
    {
        $Export = EE_Registry::instance()->load_class('Export');
        $Export->export();
    }


    /**
     *    import
     *
     * @access    public
     * @return    void
     */
    public function import()
    {
        $Import = EE_Registry::instance()->load_class('Import');
        $Import->import();
    }
}

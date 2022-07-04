<?php

/**
 * Event List
 *
 * @package               Event Espresso
 * @subpackage            /modules/invoice/
 * @author                Brent Christensen
 * @method EED_Invoice get_instance($module_name)
 */
class EED_Invoice extends EED_Module
{
    /**
     * @return EED_Invoice|EED_Module
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
        EE_Config::register_route('download_invoice', 'EED_Invoice', 'download_invoice');
        EE_Config::register_route('launch_invoice', 'EED_Invoice', 'launch_invoice');
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
        if (is_readable(EE_MODULES . 'gateways/Invoice/lib/Invoice.class.php')) {
            require_once(EE_MODULES . 'gateways/Invoice/lib/Invoice.class.php');
        } else {
            $msg = esc_html__('The Invoice.class.php file could not be loaded.', 'event_espresso');
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        }
    }


    /**
     *    invoice_launch
     *
     * @access    public
     * @return    void
     */
    public function launch_invoice()
    {
        $this->run(null);
        $request = self::getRequest();
        if ($request->requestParamIsSet('id')) {
            $id = $request->getRequestParam('id', '', 'key');
            $invoice = new Invoice($id);
            $invoice->send_invoice();
        }
    }


    /**
     *    download_invoice
     *
     * @access    public
     * @return    void
     */
    public function download_invoice()
    {
        $this->run(null);
        $request = self::getRequest();
        if ($request->requestParamIsSet('id')) {
            $id = $request->getRequestParam('id', '', 'key');
            $invoice = new Invoice($id);
            // send invoice but force download
            $invoice->send_invoice(true);
        }
    }
}

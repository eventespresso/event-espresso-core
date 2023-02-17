<?php

use EventEspresso\core\Psr4Autoloader;

/**
 * Class EE_Psr4AutoloaderInit
 *
 * Loads the Psr4Autoloader class and registers namespaces
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.8
 *
 */
class EE_Psr4AutoloaderInit
{
    /**
     * @type Psr4Autoloader
     */
    protected static $psr4_loader;


    /**
     * @return void
     * @throws EE_Error
     */
    public function initializeAutoloader()
    {
        static $initialized = false;
        if (! $initialized) {
            // register the base directories for the namespace prefix
            EE_Psr4AutoloaderInit::psr4_loader()->addNamespace('EventEspresso', EE_PLUGIN_DIR_PATH);
            EE_Psr4AutoloaderInit::psr4_loader()->addNamespace('EventEspressoBatchRequest', EE_LIBRARIES . 'batch');
            EE_Psr4AutoloaderInit::psr4_loader()->addNamespace('EventEspressoVendor', EE_THIRD_PARTY);
            EE_Psr4AutoloaderInit::psr4_loader()->addNamespace('EETests', EE_PLUGIN_DIR_PATH . 'tests');
            $initialized = true;
        }
    }


    /**
     * @return Psr4Autoloader
     * @throws EE_Error
     */
    public static function psr4_loader(): Psr4Autoloader
    {
        if (! EE_Psr4AutoloaderInit::$psr4_loader instanceof Psr4Autoloader) {
            // instantiate PSR4 autoloader
            espresso_load_required('Psr4Autoloader', __DIR__ . '/Psr4Autoloader.php');
            EE_Psr4AutoloaderInit::$psr4_loader = new Psr4Autoloader();
            // register the autoloader
            EE_Psr4AutoloaderInit::psr4_loader()->register();
        }
        return EE_Psr4AutoloaderInit::$psr4_loader;
    }
}

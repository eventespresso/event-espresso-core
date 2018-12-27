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
     * @type \EventEspresso\core\Psr4Autoloader
     */
    protected static $psr4_loader;


    /**
     * @return \EventEspresso\core\Psr4Autoloader
     */
    public function initializeAutoloader()
    {
        static $initialized = false;
        if (! $initialized) {
            // instantiate PSR4 autoloader
            espresso_load_required('Psr4Autoloader', EE_CORE . 'Psr4Autoloader.php');
            EE_Psr4AutoloaderInit::$psr4_loader = new Psr4Autoloader();
            // register the autoloader
            EE_Psr4AutoloaderInit::$psr4_loader->register();
            // register the base directories for the namespace prefix
            EE_Psr4AutoloaderInit::$psr4_loader->addNamespace('EventEspresso', EE_PLUGIN_DIR_PATH);
            EE_Psr4AutoloaderInit::$psr4_loader->addNamespace('EventEspressoBatchRequest', EE_LIBRARIES . 'batch');
            EE_Psr4AutoloaderInit::$psr4_loader->addNamespace('EventEspressoVendor', EE_THIRD_PARTY);
            $initialized = true;
        }
    }


    /**
     * @return \EventEspresso\core\Psr4Autoloader
     */
    public static function psr4_loader()
    {
        return self::$psr4_loader;
    }
}

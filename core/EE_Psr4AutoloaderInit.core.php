<?php

use EventEspresso\core\Psr4Autoloader;

/**
 * Class EE_Psr4AutoloaderInit
 * Loads the Psr4Autoloader class and registers namespaces
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.8
 */
class EE_Psr4AutoloaderInit
{
    protected static ?Psr4Autoloader $psr4_loader = null;

    private static bool $initialized = false;


    /**
     * @return void
     * @throws EE_Error
     */
    public function initializeAutoloader()
    {
        if (! EE_Psr4AutoloaderInit::$initialized) {
            // register the base directories for the namespace prefix
            $psr4_loader = EE_Psr4AutoloaderInit::psr4_loader();
            $psr4_loader->addNamespace('EventEspresso', EE_PLUGIN_DIR_PATH);
            $psr4_loader->addNamespace('EventEspressoBatchRequest', EE_LIBRARIES . 'batch');
            $psr4_loader->addNamespace('EventEspressoVendor', EE_THIRD_PARTY);
            do_action('AHEE__EE_Psr4AutoloaderInit__initializeAutoloader', $psr4_loader);
            EE_Psr4AutoloaderInit::$initialized = true;
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
            EE_Psr4AutoloaderInit::$psr4_loader->register();
        }
        return EE_Psr4AutoloaderInit::$psr4_loader;
    }
}

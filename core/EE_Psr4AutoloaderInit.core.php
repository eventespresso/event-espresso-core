<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Psr4AutoloaderInit
 *
 * Loads the Psr4Autoloader class and registers namespaces
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.8
 *
 */

class EE_Psr4AutoloaderInit {



	/**
	 * @access    public
	 */
	public function __construct() {
		static $initialized = false;
		if ( ! $initialized ) {
			// instantiate PSR4 autoloader
			espresso_load_required( 'Psr4Autoloader', EE_CORE . 'Psr4Autoloader.php' );
			$psr4_loader = new \EventEspresso\Core\Psr4Autoloader();
			// register the autoloader
			$psr4_loader->register();
			// register the base directories for the namespace prefix
			$psr4_loader->addNamespace( 'EventEspresso', EE_PLUGIN_DIR_PATH );
			$initialized = true;
		}
	}



}
// End of file EE_Psr4AutoloaderInit.core.php
// Location: /core/EE_Psr4AutoloaderInit.core.php
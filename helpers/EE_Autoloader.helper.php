<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Autoloader
 *
 * This is a helper utility class for setting up autoloaders.
 *
 * @package		Event Espresso
 * @subpackage	/helper/EE_Autoloader.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */




class EE_Autoloader {



	/**
	 * This is a utility function that takes the incoming path config and classname, sets up file paths, and tries to autoload the file
	 *
	 * @access public
	 * @static
	 * @param  string $className name of class
	 * @param  array $dir_ref    config array in the following format:
	 * array(
	 * 'path' => array('class', 'core') //class suffixes	
	 * );
	 * @return void
	 */
	public static function try_autoload( $dir_ref, $className ) {
		//assemble a list of filenames
		foreach ( $dir_ref as $dir => $types ) {
			if ( is_array($types) ) {
				foreach ( $types as $type) {
					$filenames[] = $dir . $className . '.' . $type . '.php';
				}
			} else {
				$filenames[] = $dir . $className . '.' . $types . '.php';
			}
		}

		//now loop through assembled filenames and require as available
		foreach ( $filenames as $filename ) {
			if ( is_readable($filename) )
				require_once( $filename );
		}
	}




	/**
	 * This takes care of loading a single file in the admin pages that has the suffix ".core.php"
	 * @param  string $folder    folder name
	 * @param  string $className name of class
	 * @return void
	 */
	public static function load_admin_core( $folder, $className ) {
		$classfile = $className . '.core.php';
		$path = EE_CORE_ADMIN . $folder . DS . $classfile;
		if ( is_readable( $path ) )
			require_once( $path );
	}

}
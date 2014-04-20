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
 * EEH_Autoloader
 *
 * This is a helper utility class for setting up autoloaders.
 *
 * @package		Event Espresso
 * @subpackage	/helpers/EEH_Autoloader.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */




class EEH_Autoloader {

	/**
	 * 	instance of the EEH_Autoloader object
	 *	@var 	$_instance
	 * 	@access 	private
	 */
	private static $_instance = NULL;

	/**
	* 	$_autoloaders
	* 	@var array $_autoloaders
	* 	@access 	private
	*/
	private static $_autoloaders;

	/**
	 *	@singleton method used to instantiate class object
	 *	@access public
	 *	@return EEH_Autoloader
	 */
	public static function instance() {
		// check if class object is instantiated, and instantiated properly
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof  EEH_Autoloader )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}


	/**
	 * 	class constructor
	 *
	 *  @access 	private
	 *  @return 	void
	 */
	private function __construct() {
		self::$_autoloaders = array();
		$this->_register_custom_autoloaders();
		spl_autoload_register( array( $this, 'espresso_autoloader' ));
	}





	/**
	 * 	espresso_autoloader
	 *
	 * 	@access 	public
	 *	@param string $class_name - simple class name ie: session
	 * 	@return 		void
	 */
	public static function espresso_autoloader( $className ) {
		if ( isset( self::$_autoloaders[ $className ] ) && is_readable( self::$_autoloaders[ $className ] )) {
			require_once( self::$_autoloaders[ $className ] );
		}
	}




	/**
	 * 	register_autoloader
	 *
	 * 	@access 	public
	 *	@param string $class_paths - array of key => value pairings between classnames and paths
	 * 	@return 		void
	 */
	public static function register_autoloader( $class_paths = array() ) {
		$class_paths = is_array( $class_paths ) ? $class_paths : array( $class_paths );
		foreach ( $class_paths as $class => $path ) {
			// don't give up! you gotta...
			try {
				// get some class
				if ( empty( $class )) {
					throw new EE_Error ( __( 'An error occurred. No Class name was specified while registering an autoloader.','event_espresso' ));
				}
				// one day you will find the path young grasshopper
				if ( empty( $path )) {
					throw new EE_Error ( sprintf( __( 'An error occurred. No path was specified while registering an autoloader for the %s class.','event_espresso' ), $class ));
				}
				// is file readable ?
				if ( ! is_readable( $path )) {
					throw new EE_Error ( sprintf( __( 'An error occurred. The file for the %s class could not be found or is not readable due to file permissions. Please ensure the following path is correct: %s','event_espresso' ), $class, $path ));
				}
			} catch ( EE_Error $e ) {
				$e->get_error();
			}
			// add autoloader
			self::$_autoloaders[ $class ] = str_replace( array( '\/', '/' ), DS, $path );
		}
	}




	/**
	 * 	get_autoloaders
	 *
	 * 	@access public
	 * 	@return array
	 */
	public static function get_autoloaders() {
		return self::$_autoloaders;
	}




	/**
	 * 	register core, model and class 'autoloaders'
	 *
	 * 	@access private
	 * 	@return void
	 */
	private function _register_custom_autoloaders() {
		EEH_Autoloader::register_autoloaders_for_each_file_in_folder( EE_CORE );
		EEH_Autoloader::register_autoloaders_for_each_file_in_folder( EE_MODELS );
		EEH_Autoloader::register_autoloaders_for_each_file_in_folder( EE_MODELS . DS  . 'fields' );
		EEH_Autoloader::register_autoloaders_for_each_file_in_folder( EE_MODELS . DS  . 'helpers' );
		EEH_Autoloader::register_autoloaders_for_each_file_in_folder( EE_MODELS . DS  . 'relations' );
		EEH_Autoloader::register_autoloaders_for_each_file_in_folder( EE_MODELS . DS  . 'strategies' );
		EEH_Autoloader::register_autoloaders_for_each_file_in_folder( EE_CLASSES );
	}




	/**
	 * Assumes all the files in this folder have the normal naming scheme (namely that their classname
	 * is the file's name, plus ".whatever.php".) and adds each of them to the autoloader list.
	 * If that's not the case, you'll need to improve this function or just use EEH_File::get_classname_from_filepath_with_standard_filename() directly.
	 * Yes this has to scan the directory for files, but it only does it once -- not on EACH
	 * time the autoloader is used
	 * @param string $folder name, with or without trailing /, doesn't matter
	 * @return void
	 */
	public static function register_autoloaders_for_each_file_in_folder( $folder ){
		// make sure last char is a /
		$folder .= $folder[strlen($folder)-1] != DS ? DS : '';
		$class_to_filepath_map = array();
		$exclude = array( 'index' );
		//get all the files in that folder that end in php
		$filepaths = glob( $folder.'*.php');
		foreach( $filepaths as $filepath ) {
			$class_name = EEH_File::get_classname_from_filepath_with_standard_filename( $filepath );
			if ( ! in_array( $class_name, $exclude )) {
				$class_to_filepath_map [ $class_name ] = str_replace( array( '\/', '/' ), DS, $filepath );
			}
		}
		self::register_autoloader($class_to_filepath_map);
	}




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
//	public static function try_autoload( $dir_ref, $className ) {
//		//assemble a list of filenames
//		foreach ( $dir_ref as $dir => $types ) {
//			if ( is_array($types) ) {
//				foreach ( $types as $type) {
//					$filenames[] = $dir . $className . '.' . $type . '.php';
//				}
//			} else {
//				$filenames[] = $dir . $className . '.' . $types . '.php';
//			}
//		}
//		//now loop through assembled filenames and require as available
//		foreach ( $filenames as $filename ) {
//			if ( is_readable( $filename )) {
//				require_once( $filename );
//			}
//		}
//	}




	/**
	 * This takes care of loading a single file in the admin pages that has the suffix ".core.php"
	 * @param  string $folder_path    path to folder
	 * @param  string $className name of class
	 * @return void
	 */
//	public static function load_admin_core( $folder_path, $className ) {
//
//		$classfile = $className . '.core.php';
//		$paths_to_try = apply_filters( 'FHEE__EEH_Autoloader__load_admin_core', array( $folder_path . DS, $className ));
//
//		foreach ( $paths_to_try as $path ) {
//			if ( is_readable( $path . $classfile )) {
//				require_once( $path . $classfile );
//			}
//		}
//	}





}
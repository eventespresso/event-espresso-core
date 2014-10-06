<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 */
require_once( EE_HELPERS . 'EEH_Base.helper.php' );
/**
 *
 * Class EEH_File
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				$VID:$
 *
 */
class EEH_File extends EEH_Base {

	/**
	 * @var string $_credentials_form
	 */
	private static $_credentials_form;



	/**
	 * @throws EE_Error
	 * @return WP_Filesystem_Base
	 */
	private static function _get_wp_filesystem() {
		global $wp_filesystem;
		// no filesystem setup ???
		if ( ! $wp_filesystem instanceof WP_Filesystem_Base ) {
			// if some eager beaver's just trying to get in there too early...
			if ( ! did_action( 'wp_loaded' )) {
				$msg = __('An attempt to access and/or write to a file on the server could not be completed due to a lack of sufficient credentials.', 'event_espresso');
				if ( WP_DEBUG ) {
					$msg .= '<br />' .  __('The WP Filesystem can not be accessed until after the "wp_loaded" hook has run, so it\'s best not to attempt access until the "admin_init" hookpoint.', 'event_espresso');
				}
				throw new EE_Error( $msg );
			} else {
				// should be loaded if we are past the wp_loaded hook...
				if ( ! function_exists( 'WP_Filesystem' )) {
					require_once( ABSPATH . 'wp-admin/includes/file.php' );
				}
				// basically check for direct or previously configured access
				if ( ! WP_Filesystem() ) {
					// turn on output buffering so that we can capture the credentials form
					ob_start();
					$credentials = request_filesystem_credentials( '' );
					// store credentials form for the time being
					EEH_File::$_credentials_form = ob_get_clean();
					// if credentials do NOT exist
					if ( $credentials === FALSE ) {
						add_action( 'admin_notices', array( 'EEH_File', 'display_request_filesystem_credentials_form' ), 999 );
						throw new EE_Error( __('An attempt to access and/or write to a file on the server could not be completed due to a lack of sufficient credentials.', 'event_espresso'));
					}
				}
			}
		}
		return $wp_filesystem;
	}


	/**
	 * display_request_filesystem_credentials_form
	 */
	public static function display_request_filesystem_credentials_form() {
		if ( ! empty( EEH_File::$_credentials_form )) {
			echo '<div class="updated espresso-notices-attention"><p>' . EEH_File::$_credentials_form . '</p></div>';
		}
	}



	/**
	 *    verify_filepath_and_permissions
	 *    checks that a file is readable and has sufficient file permissions set to access
	 *
	 * @access public
	 * @param string $full_file_path - full server path to the folder or file
	 * @param string $file_name      - name of file if checking a file
	 * @param string $file_ext       - file extension (ie: "php") if checking a file
	 * @param string $type_of_file   - general type of file (ie: "module"), this is only used to improve error messages
	 * @throws EE_Error
	 * @return bool
	 */
	public static function verify_filepath_and_permissions( $full_file_path = '', $file_name = '', $file_ext = '', $type_of_file = '' ) {
		// load WP_Filesystem and set file permissions
		$wp_filesystem = EEH_File::_get_wp_filesystem();
		$full_file_path = EEH_File::standardise_directory_separators( $full_file_path );
		if ( ! $wp_filesystem->is_readable( $full_file_path )) {
			$file_name = ! empty( $type_of_file ) ? $file_name . ' ' . $type_of_file : $file_name;
			$file_name .= ! empty( $file_ext ) ? ' file' : ' folder';
			$msg = sprintf(
				__( 'The requested %1$s could not be found or is not readable, possibly due to an incorrect filepath, or incorrect file permissions.%2$s', 'event_espresso' ),
				$file_name,
				'<br />'
			);
			if ( EEH_File::exists( $full_file_path )) {
				$msg .= EEH_File::_permissions_error_for_unreadable_filepath( $full_file_path, $type_of_file );
			} else {
				// no file permissions means the file was not found
				$msg .= sprintf(
					__( 'Please ensure the following path is correct: "%s".', 'event_espresso' ),
					$full_file_path
				);
			}
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
				throw new EE_Error( $msg . '||' . $msg );
			}
			return FALSE;
		}
		return TRUE;
	}



	/**
	 * _permissions_error_for_unreadable_filepath - attempts to determine why permissions are set incorrectly for a file or folder
	 *
	 * @access private
	 * @param string $full_file_path - full server path to the folder or file
	 * @param string $type_of_file - general type of file (ie: "module"), this is only used to improve error messages
	 * @return string
	 */
	private static function _permissions_error_for_unreadable_filepath( $full_file_path = '', $type_of_file = '' ){
		// load WP_Filesystem and set file permissions
		$wp_filesystem = EEH_File::_get_wp_filesystem();
		// check file permissions
		$perms = $wp_filesystem->getchmod( $full_file_path );
		if ( $perms ) {
			// file permissions exist, but way be set incorrectly
			$type_of_file = ! empty( $type_of_file ) ? $type_of_file . ' ' : '';
			$type_of_file .= ! empty( $type_of_file ) ? 'file' : 'folder';
			return sprintf(
				__( 'File permissions for the requested %1$s are currently set at "%2$s". The recommended permissions are 644 for files and 755 for folders.', 'event_espresso' ),
				$type_of_file,
				$perms
			);
		} else {
			// file exists but file permissions could not be read ?!?!
			return sprintf(
				__( 'Please ensure that the server and/or PHP configuration allows the current process to access the following file: "%s".', 'event_espresso' ),
				$full_file_path
			);
		}
	}



	/**
	 * ensure_folder_exists_and_is_writable
	 * ensures that a folder exists and is writable, will attempt to create folder if it does not exist
	 * @param string $folder
	 * @throws EE_Error
	 * @return bool
	 */
	public static function ensure_folder_exists_and_is_writable( $folder = '' ){
		if ( empty( $folder )) {
			return FALSE;
		}
		// remove ending DS
		$folder = EEH_File::standardise_directory_separators( rtrim( $folder, '/\\' ));
		// determine parent folder
		$folder_segments = explode( DS, $folder );
		array_pop( $folder_segments );
		$parent_folder = implode( DS, $folder_segments ) . DS;
		// add DS to folder
		$folder = EEH_File::end_with_directory_separator( $folder );
		$wp_filesystem = EEH_File::_get_wp_filesystem();
		if ( ! $wp_filesystem->is_dir( $folder )) {
			if ( ! EEH_File::verify_is_writable( $parent_folder, 'folder' )) {
				return FALSE;
			} else {
				if ( ! $wp_filesystem->mkdir( $folder )) {
					if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
						$msg = sprintf( __( '"%s" could not be created.', 'event_espresso' ), $folder );
						$msg .= EEH_File::_permissions_error_for_unreadable_filepath( $folder );
						throw new EE_Error( $msg );
					}
					return FALSE;
				}
			}
		} elseif ( ! EEH_File::verify_is_writable( $folder, 'folder' )) {
			return FALSE;
		}
		return TRUE;
	}



	/**
	 * verify_is_writable - checks if a file or folder is writable
	 * @param string $full_path      - full server path to file or folder
	 * @param string $file_or_folder - whether checking a file or folder
	 * @throws EE_Error
	 * @return bool
	 */
	public static function verify_is_writable( $full_path = '', $file_or_folder = 'folder' ){
		// load WP_Filesystem and set file permissions
		$wp_filesystem = EEH_File::_get_wp_filesystem();
		$full_path = EEH_File::standardise_directory_separators( $full_path );
		if ( ! $wp_filesystem->is_writable( $full_path )) {
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
				$msg = sprintf( __( 'The "%1$s" %2$s is not writable.', 'event_espresso' ), $full_path, $file_or_folder );
				$msg .= EEH_File::_permissions_error_for_unreadable_filepath( $full_path );
				throw new EE_Error( $msg );
			}
			return FALSE;
		}
		return TRUE;
	}



	/**
	 * ensure_file_exists_and_is_writable
	 * ensures that a file exists and is writable, will attempt to create file if it does not exist
	 * @param string $full_file_path
	 * @throws EE_Error
	 * @return bool
	 */
	public static function ensure_file_exists_and_is_writable( $full_file_path = '' ) {
		// load WP_Filesystem and set file permissions
		$wp_filesystem = EEH_File::_get_wp_filesystem();
		$full_file_path = EEH_File::standardise_directory_separators( $full_file_path );
		if ( ! EEH_File::exists( $full_file_path )) {
			if ( ! $wp_filesystem->touch( $full_file_path )) {
				if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
					$msg = sprintf( __( 'The "%s" file could not be created.', 'event_espresso' ), $full_file_path );
					$msg .= EEH_File::_permissions_error_for_unreadable_filepath( $full_file_path );
					throw new EE_Error( $msg );
				}
				return FALSE;
			}
		}
		if ( ! EEH_File::verify_is_writable( $full_file_path, 'file' )) {
			return FALSE;
		}
		return TRUE;
	}



	/**
	 * get_file_contents
	 * @param string $full_file_path
	 * @return string
	 */
	public static function get_file_contents( $full_file_path = '' ){
		$full_file_path = EEH_File::standardise_directory_separators( $full_file_path );
		if ( EEH_File::verify_filepath_and_permissions( $full_file_path, EEH_File::get_filename_from_filepath( $full_file_path ) , EEH_File::get_file_extension( $full_file_path ))) {
			// load WP_Filesystem and set file permissions
			$wp_filesystem = EEH_File::_get_wp_filesystem();
			return $wp_filesystem->get_contents( $full_file_path );
		}
		return '';
	}



	/**
	 * write_file
	 * @param string $full_file_path
	 * @param string $file_contents - the content to be written to the file
	 * @param string $file_type
	 * @throws EE_Error
	 * @return bool
	 */
	public static function write_to_file( $full_file_path = '', $file_contents = '', $file_type = '' ){
		$full_file_path = EEH_File::standardise_directory_separators( $full_file_path );
		$file_type = ! empty( $file_type ) ? rtrim( $file_type, ' ' ) . ' ' : '';
		$folder = EEH_File::remove_filename_from_filepath( $full_file_path );
		if ( ! EEH_File::verify_is_writable( $folder, 'folder' )) {
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
				$msg = sprintf( __( 'The %1$sfile located at "%2$s" is not writable.', 'event_espresso' ), $file_type, $full_file_path );
				$msg .= EEH_File::_permissions_error_for_unreadable_filepath( $full_file_path );
				throw new EE_Error( $msg );
			}
			return FALSE;
		}
		// load WP_Filesystem and set file permissions
		$wp_filesystem = EEH_File::_get_wp_filesystem();
		// write the file
		if ( ! $wp_filesystem->put_contents( $full_file_path, $file_contents )) {
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
				$msg = sprintf( __( 'The %1$sfile located at "%2$s" could not be written to.', 'event_espresso' ), $file_type, $full_file_path );
				$msg .= EEH_File::_permissions_error_for_unreadable_filepath( $full_file_path, 'f' );
				throw new EE_Error( $msg );
			}
			return FALSE;
		}
		return TRUE;
	}



	/**
	 * exists
	 * checks if a file exists using the WP filesystem
	 *
	 * @param string $full_file_path
	 * @return bool
	 */
	public static function exists( $full_file_path = '' ) {
		$wp_filesystem = EEH_File::_get_wp_filesystem();
		return $wp_filesystem->exists( $full_file_path ) ? TRUE : FALSE;
	}



	/**
	 * is_readable
	 * checks if a file is_readable using the WP filesystem
	 *
	 * @param string $full_file_path
	 * @return bool
	 */
	public static function is_readable( $full_file_path = '' ) {
		$wp_filesystem = EEH_File::_get_wp_filesystem();
		return $wp_filesystem->is_readable( $full_file_path ) ? TRUE : FALSE;
	}



	/**
	 * remove_filename_from_filepath
	 * given a full path to a file including the filename itself, this removes  the filename and returns the path, up to, but NOT including the filename OR slash
	 *
	 * @param string $full_file_path
	 * @return string
	 */
	public static function remove_filename_from_filepath( $full_file_path = '' ) {
		return pathinfo( $full_file_path, PATHINFO_DIRNAME );
	}


	/**
	 * get_filename_from_filepath. Arguably the same as basename()
	 *
	 * @param string $full_file_path
	 * @return string
	 */
	public static function get_filename_from_filepath( $full_file_path = '' ) {
		return pathinfo( $full_file_path, PATHINFO_BASENAME );
	}


	/**
	 * get_file_extension
	 *
	 * @param string $full_file_path
	 * @return string
	 */
	public static function get_file_extension( $full_file_path = '' ) {
		return pathinfo( $full_file_path, PATHINFO_EXTENSION );
	}



	/**
	 * add_htaccess_deny_from_all
	 * @param string $folder
	 * @return bool
	 */
	public static function add_htaccess_deny_from_all( $folder = '' ) {
		$folder = EEH_File::standardise_and_end_with_directory_separator( $folder );
		if ( ! EEH_File::exists( $folder . '.htaccess' ) ) {
			if ( ! EEH_File::write_to_file( $folder . '.htaccess', 'deny from all', '.htaccess' )) {
				return FALSE;
			}
		}
		return TRUE;
	}



	/**
	 * Given that the file in $file_path has the normal name, (ie, CLASSNAME.whatever.php),
	 * extract that classname.
	 * @param string $file_path
	 * @return string
	 */
	public static function get_classname_from_filepath_with_standard_filename( $file_path ){
		//extract file from path
		$filename = basename( $file_path );
		//now remove the first period and everything after
		$pos_of_first_period = strpos( $filename,'.' );
		return substr($filename, 0, $pos_of_first_period);
	}



	/**
	 * standardise_directory_separators
	 *  convert all directory separators in a file path to whatever is set for DS
	 * @param string $file_path
	 * @return string
	 */
	public static function standardise_directory_separators( $file_path ){
		return str_replace( array( '\\', '/' ), DS, $file_path );
	}



	/**
	 * end_with_directory_separator
	 *  ensures that file path ends with DS
	 * @param string $file_path
	 * @return string
	 */
	public static function end_with_directory_separator( $file_path ){
		return rtrim( $file_path, '/\\' ) . DS;
	}



	/**
	 * shorthand for both EEH_FIle::end_with_directory_separator AND EEH_File::standardise_directory_separators
	 * @param $file_path
	 * @return string
	 */
	public static function standardise_and_end_with_directory_separator( $file_path ){
		return self::end_with_directory_separator( self::standardise_directory_separators( $file_path ));
	}



	/**
	 * takes the folder name (with or without trailing slash) and finds the files it in,
	 * and what the class's name inside of each should be.
	 * @param array $folder_paths
	 * @throws \EE_Error
	 * @return array where keys are what the class names SHOULD be, and values are their filepaths
	 */
	public static function get_contents_of_folders( $folder_paths = array() ){
		$class_to_folder_path = array();
		foreach( $folder_paths as $folder_path ){
			$folder_path = self::standardise_and_end_with_directory_separator( $folder_path );
			// load WP_Filesystem and set file permissions
			$files_in_folder = glob( $folder_path . '*' );
			$class_to_folder_path = array();
			if ( $files_in_folder ) {
				foreach( $files_in_folder as $file_path ){
					//only add files, not folders
					if ( ! is_dir( $file_path )){
						$classname = self::get_classname_from_filepath_with_standard_filename( $file_path );
						$class_to_folder_path[$classname] = $file_path;
					}
				}
			}
		}
		return $class_to_folder_path;
	}

}
// End of file EEH_File.helper.php
// Location: /helpers/EEH_File.helper.php
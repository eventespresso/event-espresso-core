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
	 *    verify_filepath_and_permissions
	 *    checks that a file is readable and has sufficient file permissions set to access
	 *
	 * @access public
	 * @param string $full_file_path - full server path to the folder or file
	 * @param string $file_name - name of file if checking a file
	 * @param string $file_ext - file extension (ie: "php") if checking a file
	 * @param string $type_of_file - general type of file (ie: "module"), this is only used to improve error messages
	 * @return bool
	 */
	public static function verify_filepath_and_permissions( $full_file_path = '', $file_name = '', $file_ext = '', $type_of_file = '' ) {
		$full_file_path = EEH_File::standardise_directory_separators( $full_file_path );
		if ( ! is_readable( $full_file_path )) {
			$file_name = ! empty( $type_of_file ) ? $file_name . ' ' . $type_of_file : $file_name;
			$file_name .= ! empty( $file_ext ) ? ' file' : ' folder';
			$msg = sprintf(
				__( 'The requested %s could not be found or is not readable, possibly due to an incorrect filepath, or incorrect file permissions.', 'event_espresso' ),
				$file_name
			);
			if ( file_exists( $full_file_path )) {
				$msg .= EEH_File::_permissions_error_for_unreadable_filepath( $full_file_path, $type_of_file );
			} else {
				// no file permissions means the file was not found
				$msg .= sprintf(
					__( '%sPlease ensure the following path is correct: "%s".', 'event_espresso' ),
					'<br />',
					$full_file_path
				);
			}
			if ( is_admin() ) {
				EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
			}
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
		// check file permissions
		$perms = substr( fileperms( $full_file_path ), 2 );
		if ( $perms ) {
			// file permissions exist, but way be set incorrectly
			$type_of_file = ! empty( $type_of_file ) ? $type_of_file . ' ' : '';
			$type_of_file .= ! empty( $type_of_file ) ? 'file' : 'folder';
			return sprintf(
				__( '%sFile permissions for the requested %s are currently set at "%s". The recommended permissions are 644 for files and 755 for folders.', 'event_espresso' ),
				'<br />',
				$type_of_file,
				$perms
			);
		} else {
			// file exists but file permissions could not be read ?!?!
			return sprintf(
				__( '%sPlease ensure that the server and/or PHP configuration allows the current process to access the following file: "%s".', 'event_espresso' ),
				'<br />',
				$full_file_path
			);
		}
	}



	/**
	 * ensure_folder_exists_and_is_writable
	 * ensures that a folder exists and is writable, will attempt to create folder if it does not exist
	 * @param string $folder
	 * @param string $msg - Prepended to any error message produced ie : "Something something could not be setup because" + error message
	 * @return bool
	 */
	public static function ensure_folder_exists_and_is_writable( $folder = '', $msg = '' ){
		if ( empty( $folder )) {
			return FALSE;
		}
		// remove ending DS
		$folder = EEH_File::standardise_directory_separators( rtrim( $folder, '/\\' ));
		// determine parent folder
		$folder_segments = explode( DS, $folder );
		array_pop( $folder_segments );
		$parent_folder = implode( DS, $folder ) . DS;
		// add DS to folder
		$folder = EEH_File::end_with_directory_separator( $folder );
		$msg = ! empty( $msg ) ? $msg . ' the ' : 'The ';
		if ( ! is_dir( $folder )) {
			if ( ! is_writable( $parent_folder )) {
				if ( ! EEH_File::verify_is_writable( $parent_folder, 'folder', $msg )) {
					return FALSE;
				}
			} else {
				if ( ! wp_mkdir_p( $folder )) {
					if ( is_admin() ) {
						$msg .= sprintf( __( '"%s" could not be created.', 'event_espresso' ), $folder );
						$msg .= EEH_File::_permissions_error_for_unreadable_filepath( $folder );
						EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
					}
					return FALSE;
				}
			}
		} elseif ( ! is_writable( $folder )) {
			if ( ! EEH_File::verify_is_writable( $folder, 'folder', $msg )) {
				return FALSE;
			}
		}
		return TRUE;
	}



	/**
	 * verify_is_writable - checks if a file or folder is writable
	 * @param string $full_path - full server path to file or folder
	 * @param string $file_or_folder - whether checking a file or folder
	 * @param string $msg - prepended to any error message produced ie : "Something something could not be setup because" + error message
	 * @return bool
	 */
	public static function verify_is_writable( $full_path = '', $file_or_folder = 'folder', $msg = '' ){
		$full_path = EEH_File::standardise_directory_separators( $full_path );
		$msg = ! empty( $msg ) ? $msg : 'The ';
		if ( ! is_writable( $full_path )) {
			if ( is_admin() ) {
				$msg .= sprintf( __( '"%s" %s is not writable.', 'event_espresso' ), $full_path, $file_or_folder );
				$msg .= EEH_File::_permissions_error_for_unreadable_filepath( $full_path );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
			return FALSE;
		}
		return TRUE;
	}



	/**
	 * ensure_file_exists_and_is_writable
	 * ensures that a file exists and is writable, will attempt to create file if it does not exist
	 * @param string $full_file_path
	 * @return bool
	 */
	public static function ensure_file_exists_and_is_writable( $full_file_path = '' ) {
		$full_file_path = EEH_File::standardise_directory_separators( $full_file_path );
		if ( ! file_exists( $full_file_path )) {
			if ( ! touch( $full_file_path )) {
				if ( is_admin() ) {
					$msg = sprintf( __( 'The "%s" file could not be created.', 'event_espresso' ), $full_file_path );
					$msg .= EEH_File::_permissions_error_for_unreadable_filepath( $full_file_path );
					EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
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
	 * write_file
	 * @param string $full_file_path
	 * @param string $file_contents - the content to be written to the file
	 * @param string $mode - the type of access required to the stream
	 * @return bool
	 */
	public static function write_to_file( $full_file_path = '', $file_contents = '', $mode = 'w' ){
		$full_file_path = EEH_File::standardise_directory_separators( $full_file_path );
		if ( ! EEH_File::verify_is_writable( $full_file_path, 'file' )) {
			if ( is_admin() ) {
				$msg = sprintf( __( 'The Espresso Log file "%s" is not writable.', 'event_espresso' ), $full_file_path );
				$msg .= EEH_File::_permissions_error_for_unreadable_filepath( $full_file_path );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
			return FALSE;
		}
		$handle = fopen( $full_file_path, $mode );
		if ( ! $handle ) {
			if ( is_admin() ) {
				$msg = sprintf( __( 'The Espresso Log file "%s" could not be opened for writing.', 'event_espresso' ), $full_file_path );
				$msg .= EEH_File::_permissions_error_for_unreadable_filepath( $full_file_path );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
			return FALSE;
		}
		if ( ! fwrite( $handle, $file_contents )) {
			if ( is_admin() ) {
				$msg = sprintf( __( 'The Espresso Log file "%s" could not be written to.', 'event_espresso' ), $full_file_path );
				$msg .= EEH_File::_permissions_error_for_unreadable_filepath( $full_file_path );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
			return FALSE;
		}
		fclose( $handle );
		return TRUE;
	}



	/**
	 * add_htaccess_deny_from_all
	 * @param string $folder
	 * @return bool
	 */
	public static function add_htaccess_deny_from_all( $folder = '' ) {
		$folder = EEH_File::standardise_and_end_with_directory_separator( $folder );
		if ( ! file_exists( $folder . '.htaccess' ) ) {
			if ( ! file_put_contents( $folder . '.htaccess', 'deny from all' )) {
				if ( is_admin() ) {
					$msg = sprintf( __( 'Could not create .htaccess file to block direct access to the "%s" folder.', 'event_espresso' ), $folder );
					$msg .= EEH_File::_permissions_error_for_unreadable_filepath( $folder );
					EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				}
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
	 * takes teh folder name (with or without trailing slash) and finds the files it in,
	 * and what the class's name inside of each should be.
	 * @param array $folder_paths
	 * @return array where keys are what the class names SHOULD be, and values are their filepaths
	 * @throws EE_Error
	 */
	public static function get_contents_of_folders( $folder_paths = array() ){
		$class_to_folder_path = array();
		foreach( $folder_paths as $folder_path ){
			$folder_path = self::standardise_and_end_with_directory_separator( $folder_path );
			$files_in_folder = glob($folder_path.'*');
			$class_to_folder_path = array();
			foreach( $files_in_folder as $file_path ){
				$classname = self::get_classname_from_filepath_with_standard_filename( $file_path );
				$class_to_folder_path[$classname] = $file_path;
			}
		}
		return $class_to_folder_path;
	}


}
// End of file EEH_File.helper.php
// Location: /helpers/EEH_File.helper.php
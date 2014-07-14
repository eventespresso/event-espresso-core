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
		if ( ! is_readable( $full_file_path )) {
			$file_name = ! empty( $type_of_file ) ? $file_name . ' ' . $type_of_file : $file_name;
			$file_name .= ! empty( $file_ext ) ? ' file' : ' folder';
			$msg = sprintf(
				__( 'The requested %s could not be found or is not readable, possibly due to an incorrect filepath, or incorrect file permissions.', 'event_espresso' ),
				$file_name
			);
			if ( file_exists( $full_file_path )) {
				// check file permissions
				$perms = substr( fileperms( $full_file_path ), 2 );
				if ( $perms ) {
					// file permissions exist, but way be set incorrectly
					$type_of_file = ! empty( $type_of_file ) ? $type_of_file . ' ' : '';
					$type_of_file .= ! empty( $type_of_file ) ? 'file' : 'folder';
					$msg .= sprintf(
						__( '%sFile permissions for the requested %s are currently set at "%s". The recommended permissions are 644 for files and 755 for folders.', 'event_espresso' ),
						'<br />',
						$type_of_file,
						$perms
					);
				} else {
					// file exists but file permissions could not be read ?!?!
					$msg .= sprintf(
						__( '%sPlease ensure that the server and/or PHP configuration allows the current process to access the following file: "%s".', 'event_espresso' ),
						'<br />',
						$full_file_path
					);
				}
			} else {
				// no file permissions means the file was not found
				$msg .= sprintf(
					__( '%sPlease ensure the following path is correct: "%s".', 'event_espresso' ),
					'<br />',
					$full_file_path
				);
			}
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
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
	 * @param string $folder_paths
	 * @return array where keys are what the class names SHOULD be, and values are their filepaths
	 * @throws EE_Error
	 */
	public static function get_contents_of_folders( $folder_paths ){
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
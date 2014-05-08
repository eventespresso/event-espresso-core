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


}
// End of file EEH_File.helper.php
// Location: /helpers/EEH_File.helper.php
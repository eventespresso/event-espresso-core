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
 * ------------------------------------------------------------------------
 *
 * EEH_File Helper
 *
 * @package			Event Espresso
 * @subpackage	/core/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
require_once( EE_HELPERS . 'EEH_Base.helper.php' );
class EEH_File extends EEH_Base {




	/**
	 * Given that the file in $filepath has the normal name, (ie, CLASSNAME.whatever.php),
	 * extract that classname.
	 * @param string $filepath
	 * @return string
	 */
	public static function get_classname_from_filepath_with_standard_filename( $filepath ){
		//extract file from path
		$filename = basename( $filepath );
		//now remove the first period and everything after
		$pos_of_first_period = strpos( $filename,'.' );
		return substr($filename, 0, $pos_of_first_period);
	}


}
// End of file EEH_File.helper.php
// Location: /helpers/EEH_File.helper.php
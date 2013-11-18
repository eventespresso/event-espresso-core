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
 * EEH_Base Helper
 *
 * @package			Event Espresso
 * @subpackage	/helpers/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EEH_Base {

	/**
	 * 	@var 	array	$uri_segment_array 	URL segments
	 *  @access 	private
	 */
//	final private function __construct() {}

	/**
	 *		@ override magic methods
	 *		@ return void
	 */	
	public function __set($a,$b) { return FALSE; }
	public function __get($a) { return FALSE; }
	public function __isset($a) { return FALSE; }
	public function __unset($a) { return FALSE; }
	public function __clone() { return FALSE; }
	public function __wakeup() { return FALSE; }	
	public function __destruct() { return FALSE; }		

}
// End of file EEH_Base.helper.php
// Location: /helpers/EEH_Base.helper.php
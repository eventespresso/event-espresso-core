<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * Visual Representation Interface
 * This interface is implemented on classes that have visual representations identifying type.
 *
 * @package Event Espresso
 * @subpackage interfaces
 * @since   4.8.0
 * @author  Darren Ethier
 */
interface EEI_Visual_Representation {

	/**
	 * Return the icon representing the object (usually a WP dashicon).
	 * @return string
	 */
	public function get_icon();


} //end EEI_Line_Item_Object interface

<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * Has Icon Interface
 * This interface is implemented on classes that have will have some sort of icon used to visually classify them.
 *
 * @package Event Espresso
 * @subpackage interfaces
 * @since   4.8.0
 * @author  Darren Ethier
 */
interface EEI_Has_Icon {

	/**
	 * Return the icon representing the object (usually a WP dashicon).
	 * @return string
	 */
	public function get_icon();


} //end EEI_Has_Icon interface

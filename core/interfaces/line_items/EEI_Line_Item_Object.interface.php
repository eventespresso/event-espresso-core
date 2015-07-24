<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * Line Item Object Interface
 * This interface is implemented on classes that could be represented as related objects on a EE_Line_Item.
 *
 * @package Event Espresso
 * @subpackage interfaces
 * @since   4.8.0
 * @author  Darren Ethier
 */
interface EEI_Line_Item_Object {

	/**
	 * Return the name representing the object (i.e. Event Title, or Ticket Name).
	 * @return string
	 */
	public function name();


	/**
	 * Return the ID representation for the object.
	 * @return mixed int|string
	 */
	public function ID();


} //end EEI_Line_Item_Object interface

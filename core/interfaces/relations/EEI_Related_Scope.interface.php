<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * Related Scope interface
 * What are related scopes?
 * A related scope is something that is considered to be a related object that describes the scope of the object this
 * interface is implemented on.  For instance, a EE_Promotion could have the scope of an EE_Event, an EE_Cart, or a EE_Ticket.
 * Only implement this interface on objects that have a well-defined related scope that is consistent across various contexts.
 *
 * @package Event Espresso
 * @subpackage interfaces
 * @since   4.8.0
 * @author  Darren Ethier
 */
interface EEI_Related_Scope {

	/**
	 * Used to return the related scope object.
	 * @return object  This may not necessarily be a EE_Base_Class object.
	 */
	public function get_related_scope_object();



	/**
	 * Return the name representing the related_scope_object (i.e. Event Title, or Ticket Name).
	 * @return string
	 */
	public function get_related_scope_name();


	/**
	 * Return the related scope ID.
	 * @return mixed int|string
	 */
	public function get_ID();

} //end EEi_Related_Scope interface

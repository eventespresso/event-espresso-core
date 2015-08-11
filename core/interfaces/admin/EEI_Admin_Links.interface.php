<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * Admin Links interface
 * This interface is implemented on classes for returning links to things in the admin.
 *
 * @package Event Espresso
 * @subpackage interfaces
 * @since   4.8.0
 * @author  Darren Ethier
 */
interface EEI_Admin_Links {


	/**
	 * Return the link to the admin details for the object.
	 * @return string
	 */
	public function get_admin_details_link();




	/**
	 * Returns the link to the editor for the object.  Sometimes this is the same as the details.
	 * @return string
	 */
	public function get_admin_edit_link();


	/**
	 * Returns the link to a settings page for the object.
	 * @return string
	 */
	public function get_admin_settings_link();


	/**
	 * Returns the link to the "overview" for the object (typically the "list table" view).
	 * @return string
	 */
	public function get_admin_overview_link();

} //end EEI_Admin_Links interface

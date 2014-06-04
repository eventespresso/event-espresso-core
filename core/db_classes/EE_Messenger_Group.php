<?php
/**
 * Contains EE Model Object for the Messenger Group model
 *
 * @since 4.5.0
 *
 * @package Event Espresso
 * @subpackage models
 */

if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * EE_Messenger_Group class
 *
 * @since 4.5.0
 *
 * @package 		Event Espresso
 * @subpackage 	core/db_classes/EE_Messenger_Group.class.php
 * @author          	Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Messenger_Group extends EE_Base_Class {

	/**
	 * new instance of object.
	 *
	 * @since 4.5.0
	 *
	 * @param array  $props_n_values
	 * @param string $timezone
	 * @return EE_Messenger_Group|mixed
	 */
	public static function new_instance( $props_n_values = array(), $timezone = '' ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}



	/**
	 * new instance of object with values from db.
	 *
	 * @since 4.5.0
	 *
	 * @param array  $props_n_values
	 * @param string $timezone
	 * @return EE_Messenger_Group
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = '' ) {
		return new self( $props_n_values, TRUE, $timezone );
	}




	/**
	 * Set Messages Group ID.
	 *
	 * @since 4.5.0
	 *
	 * @param int  $GRP_ID
	 * @return void
	 */
	public function set_GRP_ID( $GRP_ID ) {
		return $this->set( 'GRP_ID', $GRP_ID );
	}




	/**
	 * Get Messages Group ID.
	 *
	 * @since 4.5.0
	 * @return int|bool (group id if present or FALSE if not found or something else happend)
	 */
	public function GRP_ID() {
		return $this->get('GRP_ID');
	}



	/**
	 * Set messenger string.
	 *
	 * @since 4.5.0
	 * @todo  Should maybe make sure the string matches that of a valid active messenger before setting?
	 *
	 * @param string $messenger The string of a messenger (id slug) to set.
	 * @return void
	 */
	public function set_messenger( $messenger ) {
		return $this->set( 'MSSG_messenger', $messenger );
	}



	/**
	 * Get messenger string.
	 *
	 * @since 4.5.0
	 *
	 * @return string|bool   Messenger string if found or FALSE if not found (or something else happened).
	 */
	public function messenger() {
		return $this->get('MSSG_messenger');
	}
}

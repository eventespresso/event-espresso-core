<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Required  by EEM_Event_Question_Group in case someone queries for all its model objects
 */
class EE_Event_Question_Group extends EE_Base_Class{

	/**
	 * @param array $props_n_values
	 * @return EE_Event_Question_Group|mixed
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values);
	}



	/**
	 * @param array $props_n_values
	 * @return EE_Event_Question_Group
	 */
	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}
}
<?php
/**
 * Required  by EEM_Question_Group_Question in case someone queries for all its model objects
 */
class EE_Question_Group_Question extends EE_Base_Class{

	/**
	 * @param array $props_n_values
	 * @return EE_Question_Group_Question|mixed
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values );
	}



	/**
	 * @param array $props_n_values
	 * @return EE_Question_Group_Question
	 */
	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}
}
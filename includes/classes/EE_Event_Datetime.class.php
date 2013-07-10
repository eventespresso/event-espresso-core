<?php
/**
 * Required  by EEM_Event_Datetime_Group in case someone queries for all its model objects
 */
class EE_Event_Datetime extends EE_Base_Class{
	protected $_EVD_ID = null;
	protected $_EVT_ID = null;
	protected $_DTT_ID = null;
	protected $_Event;
	protected $_Datetime;


	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values);
	}


	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}
}
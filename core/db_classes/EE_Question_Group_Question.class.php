<?php
/**
 * Required  by EEM_Question_Group_Question in case someone queries for all its model objects
 */
class EE_Question_Group_Question extends EE_Base_Class{
	protected $_QGQ_ID;
	protected $_QSG_ID;
	protected $_QST_ID;
	protected $_QST_order;
	protected $_Question;
	protected $_Question_Group;
	


	
	

	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values );
	}




	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}
}
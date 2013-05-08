<?php
/**
 * Required  by EEM_Question_Group_Question in case someone queries for all its model objects
 */
class EE_Question_Group_Question extends EE_Base_Class{
	protected $_QGQ_ID;
	protected $_QSG_ID;
	protected $_QST_ID;
	protected $_Question;
	protected $_Question_Group;
	


	/**
	 * Constructor
	 *
	 * @access protected
	 * @param array array of values indexed by property name (without the leading underscore)
	 * @param bool  $bydb indicates whether the model is instantiating this class or not
	 * @return void
	 */
	protected function __construct( $fieldValues = array(), $bydb = FALSE ) {
		parent::__construct($fieldValues, $bydb);
	}
	
	

	public static function new_instance( $props_n_values = array() ) {
		$classname = get_class( self );
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : self::__construct( $props_n_values );
	}




	public static function new_instance_from_db ( $props_n_values = array() ) {
		self::__construct( $props_n_values, TRUE );
	}
}
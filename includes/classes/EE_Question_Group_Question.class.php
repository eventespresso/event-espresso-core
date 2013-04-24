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
	public function __construct( $QSG_ID = null, $QST_ID = null ) {
		/* @todo consolidate this logic by using constructor like EE_Answer, and ensuring each of EEM_Attendee's _field_settings has a type that performs the logic
		 * of removing html tags, encoding htmlentities, etc.
		 */
		if(is_array($QSG_ID)){
			parent::__construct($QSG_ID);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);
	}
}
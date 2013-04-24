<?php
/**
 * Required  by EEM_Event_Question_Group in case someone queries for all its model objects
 */
class EE_Event_Question_Group extends EE_Base_Class{
	protected $_EQG_ID = null;
	protected $_EVT_ID = null;
	protected $_QSG_ID = null;
	protected $_EQG_primary = null;
	protected $_Event;
	protected $_Question_Group;
	public function __construct( $EVT_ID = null, $QSG_ID = null ) {
		/* @todo consolidate this logic by using constructor like EE_Answer, and ensuring each of EEM_Attendee's _field_settings has a type that performs the logic
		 * of removing html tags, encoding htmlentities, etc.
		 */
		if(is_array($EVT_ID)){
			parent::__construct($EVT_ID);
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
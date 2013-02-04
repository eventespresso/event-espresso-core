<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Answer class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Answer.class.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( 'EE_Soft_Delete_Base_Class.class.php' );
class EE_Question_Group extends EE_Soft_Delete_Base_Class{
	
	/**
	 * ID of this question gruop
	 * @access protected
	 * @var int
	 */
	protected $_QSG_ID=FALSE;
	
	/**
	 * Name of this question group. eg, 'addrss info'
	 * @access protected
	 * @var stirng
	 */
	protected $_QSG_name=NULL;
	
	/**
	 * The unique identifier used for this question group within the system
	 * @access protected
	 * @var string
	 */
	protected $_QSG_identifier=NULL;
	
	/**
	 * Question group descripton
	 * @access protected
	 * @var string
	 */
	protected $_QSG_desc=NULL;
	
	/**
	 * Integer to indicate where this question group
	 * should be placed relative to other question gruops in a sequence
	 * @access protected 
	 * @var int
	 */
	protected $_QSG_order=NULL;
	
	/**
	 * Boolean to indicate whether the group name
	 * should be shown when displaying this question group
	 * on the frontend
	 * @access protected
	 * @var boolean 
	 */
	protected $_QSG_show_group_name=NULL;
	
	/**
	 * Boolean to dinicate whether the group description
	 * should be shown when displayign this question gruop
	 * on the frontend
	 * @access protected
	 * @var boolean 
	 */
	protected $_QSG_show_group_desc=NULL;
	
	/**
	 * Boolean to indicate whether this question gruop
	 * is a mandatory one, ie integral to the system
	 * @access protected
	 * @var boolea 
	 */
	protected $_QSG_system_ID=NULL;
	
	/**
	 * Boolean which indicates whether thsi question group
	 * has been deleted or not
	 * @access protected
	 * @var boolean 
	 */
	protected $_QSG_deleted=NULL;
	
	
	/**
	 * Related questions, lazy-loaded.
	 * @access protected
	 * @var EE_Question 
	 */
	protected $_Questions;
	
	/**
	 * Related Events
	 * @access protected
	 * @var EE_Event
	 */
	protected $_Events;
	/**
	 * 
	 * @param string/array $QSG_name name of question group  OR an array of all field values, where keys match these arguments' names
	 * @param string $QSG_identifier string ofr identifying the question group internally
	 * @param string $QSG_desc description
	 * @param int $QSG_order int to indicate where this question gruop should be displayed relative to others
	 * @param boolean $QSG_show_group_name whether to show the question group name on the frontend
	 * @param boolean $QSG_show_group_desc whether to show the question gruop description on teh frontend
	 * @param string $QSG_system_ID boolean indicates whether this question group is integral to the system, or an extra one
	 * @param boolean $QSG_deleted indicates whether this question gruop has been 'deleted'
	 * @access public
	 */
	public function __construct(
			$QSG_name=NULL,
			$QSG_identifier=NULL,
			$QSG_desc=NULL,
			$QSG_order=NULL,
			$QSG_show_group_name=NULL,
			$QSG_show_group_desc=NULL,
			$QSG_system_ID=NULL,
			$QSG_deleted=NULL) {
		//if the first parameter is an array, assume it's an array of key-value pairs for this object
		if(is_array($QSG_name)){
			parent::__construct($QSG_name);
			return;
		}
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=${$paramName};
			//yes, that's using a variable variable. { } added by br3nt to make it even more obvious ;D
		}
		parent::__construct($arrayForParent);
	}
	
	
	
	
	/**
	 * gets teh question gruop's name
	 * @access public
	 * @return string
	 */
	public function name(){
		return $this->get('QSG_name');
	}
	
	/**
	 * Gets the question group's internal name
	 * @access public
	 * @return string
	 */
	public function identifier(){
		return $this->get('QSG_identifier');
	}
	
	/**
	 * Gets the question group's description
	 * @access public
	 * @return string
	 */
	public function desc(){
		return $this->get('QSG_desc');
	}
	
	/**
	 * Gets the question group's order number in a sequence
	 * of other quesiton groups
	 * @access public
	 * @return int
	 */
	public function order(){
		return $this->get('QSG_order');
	}
	
	/**
	 * Returns whether to show the gruop's name on teh frontend
	 * @access public
	 * @return boolean
	 */
	public function show_group_name(){
		return $this->get('QSG_show_group_name');
	}
	
	/**
	 * Returns wehther to show the group's descripton
	 * on the frontend
	 * @access public
	 * @return boolean
	 */
	public function show_group_desc(){
		return $this->get('QSG_show_group_desc');
	}
	
	/**
	 * Returns wehther this is a 'sytem group' (meaning
	 * a question gruop integral to teh system, whose questions
	 * relate to teh attendee table)
	 * @access public
	 * @return boolean
	 */
	public function system_group(){
		return $this->get('QSG_system_ID');
	}
	
	/**
	 * Returns whether this question gruop has
	 * been deleted
	 * @access public
	 * @return boolean
	 */
	public function deleted(){
		return $this->get('QST_deleted');
	}
	
	/**
	 * Gets all the questions whicha re part of this question gruop
	 * @return EE_Question[]
	 */
	public function questions(){
		return $this->_get_many_related('Questions');
	}
	
	/**
	 * Gets all events which 
	 * @return EE_Event[]
	 */
	public function events(){
		throw new EE_Error(__("Question Group->events() not yet implemetned","event_esresso"));
		return $this->_get_many_related('Events');
	}
	
	/**
	 * Adds the question to this question group
	 * @param EE_Question || int $question object or ID
	 * @return boolean if successful
	 */
	public function add_question($questionObjectOrID){
		return $this->_add_relation_to($questionObjectOrID, 'Questions');
	}
	/**
	 * Removes the question from this question group
	 * @param EE_Question || int $question object or ID
	 * @return boolean of success
	 */
	public function remove_question($questionObjectOrID){
		return $this->_remove_relation_to($questionObjectOrID, 'Questions');
	}
}
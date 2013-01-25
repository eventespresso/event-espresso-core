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
require_once ( 'EE_Base_Class.class.php' );
class EE_Question_Option extends EE_Base_Class{
	
	/**
	 * Answer ID
	 * 
	 * @access protected
	 * @var int
	 */
	protected $_QSO_ID=FALSE;
	
	/**
	 * Question Option Name
	 * 
	 * @access protected
	 * @var string
	 */
	protected $_QSO_name=FALSE;
	
	/**
	 * Question Option Value
	 * 
	 * @access protected
	 * @var int
	 */
	protected $_QSO_value=FALSE;
	
	/**
	 * Question ID
	 * 
	 * @access protected
	 * @var int
	 */
	protected $_QST_ID=FALSE;
	
	/**
	 * Whether teh question has been deleted or not
	 * @access protected
	 * @var boolean
	 */
	protected $_QSO_deleted=FALSE;
	
	/**
	 * The question whcih relates to this question option
	 *@access protected
	 * @var EE_Question
	 */
	protected $_Question;


	/**
	 * Constructor
	 * @param string $QSO_name
	 * @param string $QSO_value
	 * @param int $QST_ID
	 */
	public function __construct($QSO_name=null, $QSO_value=null, $QST_ID=null) {
		$reflector = new ReflectionMethod($this,'__construct');	
		$arrayForParent=array();
		foreach($reflector->getParameters() as $param){
			$paramName=$param->name;
			$arrayForParent[$paramName]=$$paramName;//yes, that's using a variable variable.
		}
		parent::__construct($arrayForParent);
	}
	
	/**
	 * Sets the option's name
	 * @param strig $name
	 * @return bool success
	 */
	public function set_name($name){
		return $this->set('QSO_name',$name);
	}
	/**
	 * Sets the option's value
	 * @param string $value
	 * @return bool success
	 */
	public function set_value($value){
		return $this->set('QSO_value',$value);
	}
	/**
	 * Sets the ID of the related questino
	 * @param int $question_ID
	 * @return bool success
	 */
	public function set_question_ID($question_ID){
		return $this->set('QST_ID',$question_ID);
	}
	
	/**
	 * Gets teh option's name (usually used for displaying)
	 * @return string
	 */
	public function name(){
		return $this->get('QSO_name');
	}
	/**
	 * Gets the option's value (usually used internally)
	 * @return string
	 */
	public function value(){
		return $this->get('QSO_value');
	}
	/**
	 * Returns whether this option has been deleted or not
	 * @return boolean
	 */
	public function deleted(){
		return $this->get('QSO_deleted');
	}
	/**
	 * Gets the related question's ID
	 * @return int
	 */
	public function question_ID(){
		return $this->get('QST_ID');
	}
	
	/**
	 * Returns the question related to this question option
	 * @return EE_Question
	 */
	public function question(){
		return $this->_get_first_related('Question');
	}

}

/* End of file EE_Question_Option.class.php */
/* Location: /includes/classes/EE_Question_Option.class.php */
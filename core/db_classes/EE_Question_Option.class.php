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
 * @ since		 		4.0
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
require_once ( EE_CLASSES . 'EE_Soft_Delete_Base_Class.class.php' );
class EE_Question_Option extends EE_Soft_Delete_Base_Class{
	
	/**
	 * Answer ID
	 * 
	 * @access protected
	 * @var int
	 */
	protected $_QSO_ID=FALSE;
	
	/**
	 * Question Option key value
	 * 
	 * @access protected
	 * @var string
	 */
	protected $_QSO_name=FALSE;
	
	/**
	 * Question Option Display Text
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
	 * Question Option Opt Group Name
	 * 
	 * @access protected
	 * @var string
	 */
	protected $_QSO_opt_group=NULL;
	
	/**
	 * The question whcih relates to this question option
	 *@access protected
	 * @var EE_Question
	 */
	protected $_Question;


	
	

	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values );
	}




	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}

	
	
	/**
	 * Sets the option's key value
	 * @param strig $value
	 * @return bool success
	 */
	public function set_name($value){
		return $this->set('QSO_name',$value);
	}
	/**
	 * Sets the option's Display Text 
	 * @param string $text
	 * @return bool success
	 */
	public function set_value($text){
		return $this->set('QSO_value',$text);
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
	 * Sets the option's opt_group
	 * @param string $text
	 * @return bool success
	 */
	public function set_opt_group($text){
		return $this->_QSO_opt_group = $text;
	}
	
	/**
	 * Gets the option's key value
	 * @return string
	 */
	public function name(){
		return $this->get('QSO_name');
	}

	/**
	 * Gets the option's display text
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
	
	/**
	 * Gets the option's opt_group
	 * @return string
	 */
	public function opt_group(){
		return $this->_QSO_opt_group;
	}
}

/* End of file EE_Question_Option.class.php */
/* Location: /includes/classes/EE_Question_Option.class.php */

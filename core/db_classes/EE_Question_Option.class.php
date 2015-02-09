<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package 		Event Espresso
 * @ author 		Event Espresso
 * @ copyright 	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license 		{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link 				{@link http://www.eventespresso.com}
 * @ since 			4.0
 *
 */



/**
 * EE_Question_Option class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Answer.class.php
 * @author 				Mike Nelson
 */
class EE_Question_Option extends EE_Soft_Delete_Base_Class {

	/**
	 * Question Option Opt Group Name
	 *
	 * @access protected
	 * @var string
	 */
	protected $_QSO_opt_group = NULL;



	/**
	 * @param array $props_n_values
	 * @return EE_Question_Option
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values );
	}



	/**
	 * @param array $props_n_values
	 * @return EE_Question_Option
	 */
	public static function new_instance_from_db( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}



	/**
	 * Sets the option's key value
	 * @param string $value
	 * @return bool success
	 */
	public function set_value( $value ) {
		$this->set( 'QSO_value', $value );
	}



	/**
	 * Sets the option's Display Text
	 * @param string $text
	 * @return bool success
	 */
	public function set_desc( $text ) {
		$this->set( 'QSO_desc', $text );
	}



	/**
	 * Sets the order for this option
	 *
	 * @access public
	 * @param integer $order
	 * @return bool      $success
	 */
	public function set_order( $order ) {
		$this->set( 'QSO_order', $order );
	}



	/**
	 * Sets the ID of the related question
	 * @param int $question_ID
	 * @return bool success
	 */
	public function set_question_ID( $question_ID ) {
		$this->set( 'QST_ID', $question_ID );
	}



	/**
	 * Sets the option's opt_group
	 * @param string $text
	 * @return bool success
	 */
	public function set_opt_group( $text ) {
		return $this->_QSO_opt_group = $text;
	}



	/**
	 * Gets the option's key value
	 * @return string
	 */
	public function value() {
		return $this->get( 'QSO_value' );
	}



	/**
	 * Gets the option's display text
	 * @return string
	 */
	public function desc() {
		return $this->get( 'QSO_desc' );
	}



	/**
	 * Returns whether this option has been deleted or not
	 * @return boolean
	 */
	public function deleted() {
		return $this->get( 'QSO_deleted' );
	}



	/**
	 * Returns the order or the Question Option
	 *
	 * @access public
	 * @return integer
	 */
	public function order() {
		return $this->get( 'QSO_option' );
	}



	/**
	 * Gets the related question's ID
	 * @return int
	 */
	public function question_ID() {
		return $this->get( 'QST_ID' );
	}



	/**
	 * Returns the question related to this question option
	 * @return EE_Question
	 */
	public function question() {
		return $this->get_first_related( 'Question' );
	}



	/**
	 * Gets the option's opt_group
	 * @return string
	 */
	public function opt_group() {
		return $this->_QSO_opt_group;
	}
}

/* End of file EE_Question_Option.class.php */
/* Location: /includes/classes/EE_Question_Option.class.php */

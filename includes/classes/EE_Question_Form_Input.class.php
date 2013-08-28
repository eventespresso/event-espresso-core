<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso 
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2013 Event Espresso  All Rights Reserved.
 * @ license		{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link			{@link http://www.eventespresso.com}
 * @ since		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Question_Form_Input class
 *	 
 *	a conglomerate type object that combines an EE_Question object with an EE_Answer object 
 *	as well as some of it's own class properties to facilitate use within the EE_Form_Fields.helper class
 *	access to the EE_Question and EE_Answer objects properties are done indirectly via a super getter and setter
 *
 * @package		Event Espresso
 * @subpackage	includes/classes/EE_Question_Form_Input.class.php
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Question_Form_Input {

	
	
	/**
	 * 	EE_Question object
	 * @access private
	 * @var object
	 */
	private $_QST = NULL;

	
	
	/**
	 * 	EE_Answer object
	 * @access private
	 * @var object
	 */
	private $_ANS = NULL;

	
	
	/**
	 * 	$_QST_meta
	 * @access private
	 * @var array
	 */
	private $_QST_meta = array();

	
	
	/**
	 * 	$QST_input_name
	 * @access private
	 * @var string
	 */
	private $QST_input_name = '';

	
	
	/**
	 * 	$QST_input_id
	 * @access private
	 * @var string
	 */
	private $QST_input_id = '';

	
	
	/**
	 * 	$QST_input_class
	 * @access private
	 * @var string
	 */
	private $QST_input_class = '';

	
	
	/**
	 * 	$QST_disabled
	 * @access private
	 * @var string
	 */
	private $QST_disabled = '';





	/**
	 * constructor for questions
	 * @param object $QST EE_Question object
	 * @param object $ANS EE_Answer object
	 * @access public
	 */
	public function __construct(  EE_Question $QST = NULL, EE_Answer $ANS = NULL, $q_meta = array() ) {
		if ( empty( $QST ) || empty( $ANS )) {
			EE_Error::add_error( __( 'An error occured. A valid EE_Question or EE_Answer object was not received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		$this->_QST = $QST;
		$this->_ANS = $ANS;
		
		$this->set_question_form_input_meta( $q_meta );
		$this->set_question_form_input_init();		

	}
	
	
	
	/**
	 * set_question_form_input_init
	 * @access public
	 * @return void
	 */
	public function set_question_form_input_init() {
		$qstn_id = $this->_QST->system_ID() ? $this->_QST->system_ID() : $this->_QST->ID();
		$this->_set_input_name( $qstn_id );
		$this->_set_input_id( $qstn_id );
		$this->_set_input_class( $qstn_id );		
		$this->set_question_form_input_answer( $qstn_id );
	}
	
	
	
	/**
	 * sets meta data for the question form input
	 * @access public
	 * @return void
	 */
	public function set_question_form_input_meta( $q_meta = array() ) {
		
		$default_q_meta = array(
				'att_nmbr' => 1,
				'price_id' => '',
				'date' => '',
				'time' => '',
				'input_name' => '',
				'input_id' => '',
				'input_class' => '',
				'input_prefix' => 'qstn',
				'append_qstn_id' => TRUE,
				'htmlentities' => TRUE
		);		
		$this->_QST_meta = array_merge( $default_q_meta, $q_meta );	
		
	}
	
	
	
	/**
	 * set_input_name
	 * @access private
	 * @return void
	 */
	private function _set_input_name( $qstn_id ) {
		if ( ! empty( $qstn_id )) {
			$ANS_ID = $this->get( 'ANS_ID' );
			$qstn_id = isset( $ANS_ID ) ? '[' . $qstn_id . '][' . $ANS_ID . ']' : '[' . $qstn_id . ']';
		}
		$this->QST_input_name = $this->_QST_meta['append_qstn_id'] && ! empty( $qstn_id ) ? $this->_QST_meta['input_prefix'] . $this->_QST_meta['input_name'] . $qstn_id : $this->_QST_meta['input_prefix'] . $this->_QST_meta['input_name'];
	}
	
	
	
	/**
	 * set_input_id
	 * @access private
	 * @return void
	 */
	private function _set_input_id( $qstn_id ) {
		$input_id = isset( $this->_QST_meta['input_id'] ) && ! empty( $this->_QST_meta['input_id'] ) ? $this->_QST_meta['input_id'] : sanitize_key( $this->_QST->get('QST_display_text') );
		$this->QST_input_id = $this->_QST_meta['append_qstn_id'] && ! empty( $qstn_id ) ? $input_id . '-' . $qstn_id : $input_id;
	}
	
	
	
	/**
	 * set_input_class
	 * @access private
	 * @return void
	 */
	private function _set_input_class() {
		$this->QST_input_class = isset( $this->_QST_meta['input_class'] ) ? $this->_QST_meta['input_class'] : '';
	}
	
	
	
	/**
	 * set_question_form_input_answer
	 * @access public
	 * @param mixed	int | string 	$qstn_id
	 * @return void
	 */
	public function set_question_form_input_answer( $qstn_id ) {
		// check for answer in $_REQUEST in case we are reprocessing a form after an error
		if ( isset( $this->_QST_meta['EVT_ID'] ) && isset( $this->_QST_meta['att_nmbr'] ) && isset( $this->_QST_meta['date'] ) && isset( $this->_QST_meta['time'] ) && isset( $this->_QST_meta['price_id'] )) {
			if ( isset( $_REQUEST['qstn'][ $this->_QST_meta['EVT_ID'] ][ $this->_QST_meta['att_nmbr'] ][ $this->_QST_meta['date'] ][ $this->_QST_meta['time'] ][ $this->_QST_meta['price_id'] ][ $qstn_id ] )) {
				$answer = $_REQUEST['qstn'][ $this->_QST_meta['EVT_ID'] ][ $this->_QST_meta['att_nmbr'] ][ $this->_QST_meta['date'] ][ $this->_QST_meta['time'] ][ $this->_QST_meta['price_id'] ][ $qstn_id ];
				$this->_ANS->set( 'ANS_value', $answer );
			}
		}
	}

	
	
	/**
	 * get property values for question form input
	 * @access public
	 * @param 	string $property
	 * @return void
	 */
	public function get( $property = NULL ){
		if ( ! empty( $property )) {
			if ( $this->_question_form_input_property_exists( 'EE_Question', '_' . $property )) {
				return $this->_QST->get( $property );
			} else if ( $this->_question_form_input_property_exists( 'EE_Answer', '_' . $property )) {
				return $this->_ANS->get( $property );
			} else if  ( $this->_question_form_input_property_exists( __CLASS__, $property )) {
				return $this->{$property};
			} 
		}
		return NULL;
	}

	
	
	/**
	 * set property values for question form input
	 * @access public
	 * @param 	string $property
	 * @param	mixed $value
	 * @return void
	 */
	public function set( $property = NULL, $value = NULL ){
		if ( ! empty( $property )) {					
			if ( $this->_question_form_input_property_exists( 'EE_Question', '_' . $property )) {
				return $this->_QST->set( $property, $value );
			} else if ( $this->_question_form_input_property_exists( 'EE_Answer', '_' . $property )) {
				return $this->_ANS->set( $property, $value );
			} else if ( $this->_question_form_input_property_exists(  __CLASS__, $property )) {
				$this->{$property} = $value;
				return TRUE;
			}
		}
		return NULL;
	}




	/**
	 * 	_question_form_input_property_exists
	 * @access private
	 * @param 	string $classname
	 * @param	string $property
	 * @return boolean
	 */
	private function _question_form_input_property_exists( $classname, $property ) {
		// first try regular property exists method which works as expected in PHP 5.3+
		$prop = property_exists( $classname, $property );
		if ( ! $prop ) {
			// use reflection for < PHP 5.3 as a double check when property is not found, possible due to access restriction
			$reflector = new ReflectionClass( $classname );
			$prop = $reflector->hasProperty( $property );
		}
		return $prop;
	}



	/**
	 * 	add_temp_option
	 * @access public
	 * @param object $QSO EE_Question_Option
	 * @return boolean
	 */
	public function add_temp_option( EE_Question_Option $QSO ) {
		$this->_QST->add_temp_option( $QSO );
	}



	/**
	 * 	_question_form_input_property_exists
	 * @access public
	 * @return array
	 */
	public function options() {
		return $this->_QST->temp_options();
	}



	/**
	 * 	get_meta
	 * @access public
	 * @return array
	 */
	public function get_meta( $key = FALSE ) {
		return $key && isset( $this->_QST_meta[$key ] ) ? $this->_QST_meta[$key ] : FALSE;
	}


}	
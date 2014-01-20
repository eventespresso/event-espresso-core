<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Attendee Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Base.model.php' );

class EEM_Answer extends EEM_Base {

  	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Attendee instance
	 */	
	public static function instance(){
	
		// check if instance of EEM_Attendee already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		// EEM_Attendee object
		return self::$_instance;
	}

	protected function __construct(){
		$this->singlular_item = __('Answer','event_espresso');
		$this->plural_item = __('Answers','event_espresso');
		$this->_tables = array(
			'Answer'=> new EE_Primary_Table('esp_answer', 'ANS_ID')
		);
		$this->_fields = array(
			'Answer'=>array(
				'ANS_ID'=> new EE_Primary_Key_Int_Field('ANS_ID', __('Answer ID','event_espresso')),
				'REG_ID'=>new EE_Foreign_Key_Int_Field('REG_ID', __('Registration ID','event_espresso'), false, 0, 'Registration'),
				'QST_ID'=>new EE_Foreign_Key_Int_Field('QST_ID', __('Quesetion ID','event_espresso'), false, 0, 'Question'),
				'ANS_value'=>new EE_Maybe_Serialized_Text_Field('ANS_value', __('Answer Value','event_espresso'), false, '')
			));
		$this->_model_relations = array(
			'Registration'=>new EE_Belongs_To_Relation(),
			'Question'=>new EE_Belongs_To_Relation()
		);
		
		parent::__construct();
	}



	/**
	 * Gets the string answer to the question for this registration (it could either be stored
	 * on the attendee or in the answer table. This function finds its value regardless)
	 * @param EE_Registration $registration
	 * @param int $question_id
	 * @return string
	 */
	public function get_answer_value_to_question( EE_Registration $registration, $question_id = NULL ){
		$value = $this->get_attendee_property_answer_value( $registration, $question_id );
		if (  $value === NULL ){
			$answer_obj = $this->get_registration_question_answer_object( $registration, $question_id );
			if( $answer_obj instanceof EE_Answer ){
				$value = $answer_obj->value();
			}
		}
		return apply_filters( 'FHEE__EEM_Answer__get_answer_value_to_question__answer_value', $value, $registration, $question_id );
	}



	/**
	 * Gets the EE_Answer object for the question for this registration (if it exists)
	 * @param EE_Registration $registration
	 * @param int $question_id
	 * @return EE_Answer
	 */
	public function get_registration_question_answer_object( EE_Registration $registration, $question_id = NULL ){
		$answer_obj = $this->get_one( array( array( 'QST_ID'=>$question_id, 'REG_ID'=>$registration->ID() )));
		return apply_filters( 'FHEE__EEM_Answer__get_registration_question_answer_object__answer_obj', $answer_obj, $registration, $question_id );
	}



	/**
	 * Gets the string answer to the question for this registration's attendee
	 * @param EE_Registration $registration
	 * @param int $question_id
	 * @return string
	 */
	public function get_attendee_property_answer_value( EE_Registration $registration, $question_id = NULL ){
		$value = NULL;
		//only bother checking if the registration has an attendee
		if( $registration->attendee() instanceof EE_Attendee ){
			switch( $question_id ){
				case EEM_Attendee::fname_question_id:
					$value =  $registration->attendee()->fname();
					break;
				case EEM_Attendee::lname_question_id:
					$value = $registration->attendee()->lname();
					break;
				case EEM_Attendee::email_question_id:
					$value = $registration->attendee()->email();
					break;
				case EEM_Attendee::address_question_id:
					$value = $registration->attendee()->address();
					break;
				case EEM_Attendee::address2_question_id:
					$value = $registration->attendee()->address2();
					break;
				case EEM_Attendee::city_question_id:
					$value = $registration->attendee()->city();
					break;
				case EEM_Attendee::state_question_id:
					$value = $registration->attendee()->state_ID();
					break;
				case EEM_Attendee::country_question_id:
					$value = $registration->attendee()->country_ID();
					break;
				case EEM_Attendee::phone_question_id:
					$value = $registration->attendee()->phone();
					break;
				case EEM_Attendee::zip_question_id:
					$value = $registration->attendee()->zip();
					break;				
			}
		}
		return apply_filters( 'FHEE__EEM_Answer__get_attendee_question_answer_value__answer_value', $value, $registration, $question_id );		
	}



}
// End of file EEM_Answer.model.php
// Location: /includes/models/EEM_Answer.model.php
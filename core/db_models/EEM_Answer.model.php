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
 */
/**
 * Attendee Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 */
class EEM_Answer extends EEM_Base {

	/**
	 * private instance of the EEM_Answer object
	 * @type EEM_Answer
	 */
	private static $_instance = NULL;

	/**
	 * Mapping from system question ids to attendee field names
	 * @type array
	 */
	protected $_question_id_to_att_field_map = array(
		EEM_Attendee::fname_question_id => 'ATT_fname',
		EEM_Attendee::lname_question_id => 'ATT_lname',
		EEM_Attendee::email_question_id => 'ATT_email',
		EEM_Attendee::address_question_id => 'ATT_address',
		EEM_Attendee::address2_question_id => 'ATT_address2',
		EEM_Attendee::city_question_id => 'ATT_city',
		EEM_Attendee::state_question_id => 'STA_ID',
		EEM_Attendee::country_question_id => 'CNT_ISO',
		EEM_Attendee::zip_question_id => 'ATT_zip'
	);




	/**
	 *		This function is a singleton method used to instantiate the EEM_Answer object
	 *
	 *		@access public
	 *		@return \EEM_Answer
	 */
	public static function instance(){

		// check if instance of EEM_Answer already exists
		if ( ! self::$_instance instanceof EEM_Answer ) {
			// instantiate Espresso_model
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * resets the model and returns it
	 * @return EEM_Answer
	 */
	public static function reset(){
		self::$_instance = NULL;
		return self::instance();
	}



	/**
	 * 	constructor
	 */
	protected function __construct(){
		$this->singular_item = __('Answer','event_espresso');
		$this->plural_item = __('Answers','event_espresso');
		$this->_tables = array(
			'Answer'=> new EE_Primary_Table('esp_answer', 'ANS_ID')
		);
		$this->_fields = array(
			'Answer'=>array(
				'ANS_ID'=> new EE_Primary_Key_Int_Field('ANS_ID', __('Answer ID','event_espresso')),
				'REG_ID'=>new EE_Foreign_Key_Int_Field('REG_ID', __('Registration ID','event_espresso'), false, 0, 'Registration'),
				'QST_ID'=>new EE_Foreign_Key_Int_Field('QST_ID', __('Question ID','event_espresso'), false, 0, 'Question'),
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
	 * @param boolean $pretty_answer whether to call 'pretty_value' or just 'value'
	 * @return string
	 */
	public function get_answer_value_to_question( EE_Registration $registration, $question_id = NULL,$pretty_answer = FALSE ){
		$value = $this->get_attendee_property_answer_value( $registration, $question_id, $pretty_answer );
		if (  $value === NULL ){
			$answer_obj = $this->get_registration_question_answer_object( $registration, $question_id, $pretty_answer );
			if( $answer_obj instanceof EE_Answer ){
				if($pretty_answer){
					$value = $answer_obj->pretty_value();
				}else{
					$value = $answer_obj->value();
				}
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
	public function get_registration_question_answer_object( EE_Registration $registration, $question_id = NULL){
		$answer_obj = $this->get_one( array( array( 'QST_ID'=>$question_id, 'REG_ID'=>$registration->ID() )));
		return apply_filters( 'FHEE__EEM_Answer__get_registration_question_answer_object__answer_obj', $answer_obj, $registration, $question_id );
	}



	/**
	 * Gets the string answer to the question for this registration's attendee
	 * @param EE_Registration $registration
	 * @param int $question_id
	 * @param boolean $pretty_answer
	 * @return string
	 */
	public function get_attendee_property_answer_value( EE_Registration $registration, $question_id = NULL, $pretty_answer = FALSE ){
		$field_name = NULL;
		$value = NULL;
		//only bother checking if the registration has an attendee
		if( $registration->attendee() instanceof EE_Attendee && isset($this->_question_id_to_att_field_map[$question_id])){
			$field_name = $this->_question_id_to_att_field_map[$question_id];
			if($pretty_answer){
				if($field_name == 'STA_ID'){
					$state = $registration->attendee()->state_obj();
					$value = $state instanceof EE_State ? $state->name() : sprintf(__('Unknown State (%s)', 'event_espresso'),$registration->attendee()->state_ID());
				}else if($field_name == 'CNT_ISO'){
					$country = $registration->attendee()->country_obj();
					$value = $country instanceof EE_Country ? $country->name() : sprintf(__('Unknown Country (%s)', "event_espresso"),$registration->attendee()->country_ID());
				}else{
					$value = $registration->attendee()->get_pretty($field_name);
				}
			}else{
				$value = $registration->attendee()->get($field_name);
			}
		}
		return apply_filters( 'FHEE__EEM_Answer__get_attendee_question_answer_value__answer_value', $value, $registration, $question_id );
	}



}
// End of file EEM_Answer.model.php
// Location: /includes/models/EEM_Answer.model.php
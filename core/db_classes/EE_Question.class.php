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
 * EE_Question class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Answer.class.php
 * @author 				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Question extends EE_Soft_Delete_Base_Class implements EEI_Duplicatable {

	/**
	 *
	 * @param array $props_n_values  incoming values
	 * @param string $timezone  incoming timezone (if not set the timezone set for the website will be
	 *                          		used.)
	 * @param array $date_formats  incoming date_formats in an array where the first value is the
	 *                             		    date_format and the second value is the time format
	 * @return EE_Question
	 */
	public static function new_instance( $props_n_values = array(), $timezone = null, $date_formats = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__, $timezone, $date_formats );
		return $has_object ? $has_object : new self( $props_n_values, false, $timezone, $date_formats );
	}



	/**
	 * @param array $props_n_values  incoming values from the database
	 * @param string $timezone  incoming timezone as set by the model.  If not set the timezone for
	 *                          		the website will be used.
	 * @return EE_Question
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = null ) {
		return new self( $props_n_values, TRUE, $timezone );
	}



	/**
	 *        Set    Question display text
	 *
	 * @access        public
	 * @param string $QST_display_text
	 */
	public function set_display_text( $QST_display_text = '' ) {
		$this->set( 'QST_display_text', $QST_display_text );
	}



	/**
	 *        Set    Question admin text
	 *
	 * @access        public
	 * @param        string $QST_admin_label
	 */
	public function set_admin_label( $QST_admin_label = '' ) {
		$this->set( 'QST_admin_label', $QST_admin_label );
	}



	/**
	 *        Set    system name
	 *
	 * @access        public
	 * @param        mixed $QST_system
	 */
	public function set_system_ID( $QST_system = '' ) {
		$this->set( 'QST_system', $QST_system );
	}



	/**
	 *        Set    question's type
	 *
	 * @access        public
	 * @param        string $QST_type
	 */
	public function set_question_type( $QST_type = '' ) {
		$this->set( 'QST_type', $QST_type );
	}



	/**
	 *        Sets whether this question must be answered when presented in a form
	 *
	 * @access        public
	 * @param        bool $QST_required
	 */
	public function set_required( $QST_required = FALSE ) {
		$this->set( 'QST_required', $QST_required );
	}



	/**
	 *        Set    Question display text
	 *
	 * @access        public
	 * @param        string $QST_required_text
	 */
	public function set_required_text( $QST_required_text = '' ) {
		$this->set( 'QST_required_text', $QST_required_text );
	}



	/**
	 *        Sets the order of this question when placed in a sequence of questions
	 *
	 * @access        public
	 * @param        int $QST_order
	 */
	public function set_order( $QST_order = 0 ) {
		$this->set( 'QST_order', $QST_order );
	}



	/**
	 *        Sets whether the question is admin-only
	 *
	 * @access        public
	 * @param        bool $QST_admin_only
	 */
	public function set_admin_only( $QST_admin_only = FALSE ) {
		$this->set( 'QST_admin_only', $QST_admin_only );
	}



	/**
	 *        Sets the wordpress user ID on the question
	 *
	 * @access        public
	 * @param        int $QST_wp_user
	 */
	public function set_wp_user( $QST_wp_user = 1 ) {
		$this->set( 'QST_wp_user', $QST_wp_user );
	}



	/**
	 *        Sets whether the question has been deleted
	 *        (we use this boolean instead of actually
	 *        deleting it because when users delete this question
	 *        they really want to remove the question from future
	 *        forms, BUT keep their old answers which depend
	 *        on this record actually existing.
	 *
	 * @access        public
	 * @param 	bool $QST_deleted
	 */
	public function set_deleted( $QST_deleted = FALSE ) {
		$this->set( 'QST_deleted', $QST_deleted );
	}



	/**
	 * returns the text for displaying the question to users
	 * @access public
	 * @return string
	 */
	public function display_text() {
		return $this->get( 'QST_display_text' );
	}



	/**
	 * returns the text for the administrative label
	 * @access public
	 * @return string
	 */
	public function admin_label() {
		return $this->get( 'QST_admin_label' );
	}



	/**
	 * returns the attendee column name for this question
	 * @access public
	 * @return string
	 */
	public function system_ID() {
		return $this->get( 'QST_system' );
	}



	/**
	 * returns either a string of 'text', 'textfield', etc.
	 * @access public
	 * @return boolean
	 */
	public function required() {
		return $this->get( 'QST_required' );
	}



	/**
	 * returns the text which should be displayed when a user
	 * doesn't answer this question in a form
	 * @access public
	 * @return string
	 */
	public function required_text() {
		return $this->get( 'QST_required_text' );
	}



	/**
	 * returns the type of this question
	 * @access public
	 * @return string
	 */
	public function type() {
		return $this->get( 'QST_type' );
	}



	/**
	 * returns an integer showing where this question should
	 * be placed in a sequence of questions
	 * @access public
	 * @return int
	 */
	public function order() {
		return $this->get( 'QST_order' );
	}



	/**
	 * returns whether this question should only appears to admins,
	 * or to everyone
	 * @access public
	 * @return boolean
	 */
	public function admin_only() {
		return $this->get( 'QST_admin_only' );
	}



	/**
	 * returns the id the wordpress user who created this question
	 * @access public
	 * @return int
	 */
	public function wp_user() {
		return $this->get( 'QST_wp_user' );
	}



	/**
	 * returns whether this question has been marked as 'deleted'
	 * @access public
	 * @return boolean
	 */
	public function deleted() {
		return $this->get( 'QST_deleted' );
	}



	/**
	 * Gets an array of related EE_Answer  to this EE_Question
	 * @return EE_Answer[]
	 */
	public function answers() {
		return $this->get_many_related( 'Answer' );
	}



	/**
	 * Boolean check for if there are answers on this question in th db
	 * @return boolean true = has answers, false = no answers.
	 */
	public function has_answers() {
		return $this->count_related( 'Answer' ) > 0 ? TRUE : FALSE;
	}



	/**
	 * gets an array of EE_Question_Group which relate to this question
	 * @return EE_Question_Group[]
	 */
	public function question_groups() {
		return $this->get_many_related( 'Question_Group' );
	}



	/**
	 * Returns all the options for this question. By default, it returns only the not-yet-deleted ones.
	 * @param boolean      $notDeletedOptionsOnly            1
	 *                                                       whether to return ALL options, or only the ones which have not yet been deleleted
	 * @param string|array $selected_value_to_always_include , when retrieving options to an ANSWERED question,
	 *                                                       we want to usually only show non-deleted options AND the value that was selected for the answer,
	 *                                                       whether it was trashed or not.
	 * @return EE_Question_Option[]
	 */
	public function options( $notDeletedOptionsOnly = TRUE, $selected_value_to_always_include = NULL ) {
		if ( ! $this->ID() ) {
			return array();
		}
		$query_params = array();
		if ( $selected_value_to_always_include ) {
			if ( is_array( $selected_value_to_always_include ) ) {
				$query_params[ 0 ][ 'OR*options-query' ][ 'QSO_value' ] = array( 'IN', $selected_value_to_always_include );
			} else {
				$query_params[ 0 ][ 'OR*options-query' ][ 'QSO_value' ] = $selected_value_to_always_include;
			}
		}
		if ( $notDeletedOptionsOnly ) {
			$query_params[ 0 ][ 'OR*options-query' ][ 'QSO_deleted' ] = FALSE;
		}
		//order by QSO_order
		$query_params[ 'order_by' ] = array( 'QSO_order' => 'ASC' );
		return $this->get_many_related( 'Question_Option', $query_params );
	}



	/**
	 * returns an array of EE_Question_Options which relate to this question
	 * @return \EE_Question_Option[]
	 */
	public function temp_options() {
		return $this->_model_relations[ 'Question_Option' ];
	}



	/**
	 * Adds an option for this question. Note: if the option were previously associated with a different
	 * Question, that relationship will be overwritten.
	 * @param EE_Question_Option $option
	 * @return boolean success
	 */
	public function add_option( EE_Question_Option $option ) {
		return $this->_add_relation_to( $option, 'Question_Option' );
	}



	/**
	 * Adds an option directly to this question without saving to the db
	 * @param EE_Question_Option $option
	 * @return boolean success
	 */
	public function add_temp_option( EE_Question_Option $option ) {
		$this->_model_relations[ 'Question_Option' ][ ] = $option;
		return TRUE;
	}



	/**
	 * Marks the option as deleted.
	 * @param EE_Question_Option $option
	 * @return boolean success
	 */
	public function remove_option( EE_Question_Option $option ) {
		return $this->_remove_relation_to( $option, 'Question_Option' );
	}



	/**
	 * @return bool
	 */
	public function is_system_question() {
		$system_ID = $this->get( 'QST_system' );
		return ! empty( $system_ID ) ? TRUE : FALSE;
	}



	/**
	 * The purpose of this method is set the question order this question order to be the max out of all questions
	 *
	 * @access public
	 * @return void
	 */
	public function set_order_to_latest() {
		$latest_order = $this->get_model()->get_latest_question_order();
		$latest_order ++;
		$this->set( 'QST_order', $latest_order );
	}



	/**
	 * Retrieves the list of allowed question types from the model.
	 * @return string[]
	 */
	private function _allowed_question_types() {
		$questionModel = $this->get_model();
		/* @var $questionModel EEM_Question */
		return $questionModel->allowed_question_types();
	}

	/**
	 * Duplicates this question and its question options
	 * @return \EE_Question
	 */
	public function duplicate( $options = array() ) {
		$new_question = clone $this;
		$new_question->set( 'QST_ID', null );
		$new_question->set_display_text( sprintf( __( '%s **Duplicate**', 'event_espresso' ), $this->display_text() ) );
		$new_question->set_admin_label( sprintf( __( '%s **Duplicate**', 'event_espresso' ), $this->admin_label() ) );
		$new_question->set_system_ID( null );
		$new_question->set_wp_user( get_current_user_id() );
                //if we're duplicating a trashed question, assume we don't want the new one to be trashed
                $new_question->set_deleted( false );
		$success = $new_question->save();
		if( $success ) {
			//we don't totally want to duplicate the question options, because we want them to be for the NEW question
			foreach( $this->options() as $question_option ) {
				$question_option->duplicate( array( 'QST_ID' => $new_question->ID() ) );
			}
			return $new_question;
		} else {
			return null;
		}
	}

	/**
	 * Returns the question's maximum allowed response size
	 * @return int|float
	 */
	public function max() {
		return $this->get( 'QST_max' );
	}

	/**
	 * Sets the question's maximum allowed response size
	 * @param int|float $new_max
	 * @return void
	 */
	public function set_max( $new_max ) {
		$this->set( 'QST_max', $new_max );
	}



	/**
	 * Creates a form input from this question which can be used in HTML forms
	 * @param EE_Registration $registration
	 * @param EE_Answer $answer
	 * @param array $input_constructor_args
	 * @return EE_Form_Input_Base
	 */
	public function generate_form_input( $registration = null, $answer = null, $input_constructor_args = array() ) {
		$identifier = $this->is_system_question() ? $this->system_ID() : $this->ID();

		$input_constructor_args = array_merge(
				array(
					'required' => $this->required() ? true : false,
					'html_label_text' => $this->display_text(),
					'required_validation_error_message' => $this->required_text()
				),
				$input_constructor_args
			);
		if( ! $answer instanceof EE_Answer && $registration instanceof EE_Registration ) {
			$answer = EEM_Answer::instance()->get_registration_question_answer_object( $registration, $this->ID() );
		}
		// has this question been answered ?
		if ( $answer instanceof EE_Answer
             && $answer->value() !== ''
        ) {
			//answer gets htmlspecialchars called on it, undo that please
			//because the form input's display strategy may call esc_attr too
			//which also does html special characters
			$values_with_html_special_chars = $answer->value();
			if( is_array( $values_with_html_special_chars ) ) {
				$default_value = array_map( 'htmlspecialchars_decode', $values_with_html_special_chars );
			} else {
				$default_value = htmlspecialchars_decode( $values_with_html_special_chars );
			}
			$input_constructor_args['default'] = $default_value;
		}
		$max_max_for_question = EEM_Question::instance()->absolute_max_for_system_question( $this->system_ID() );
		if( EEM_Question::instance()->question_type_is_in_category(  $this->type(), 'text' ) ) {
			$input_constructor_args[ 'validation_strategies' ][] = new EE_Max_Length_Validation_Strategy(
				null,
				min( $max_max_for_question, $this->max() )
			);
		}
		$input_constructor_args = apply_filters(
			'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__input_constructor_args',
			$input_constructor_args,
			$registration,
			$this,
			$answer
		);

		$result = null;
		switch ( $this->type() ) {
			// Text
			case EEM_Question::QST_type_text :
				$result = new EE_Text_Input( $input_constructor_args );
				break;
			// Textarea
			case EEM_Question::QST_type_textarea :
				$result = new EE_Text_Area_Input( $input_constructor_args );
				break;
			// Radio Buttons
			case EEM_Question::QST_type_radio :
				$result = new EE_Radio_Button_Input( $this->options(), $input_constructor_args );
				break;
			// Dropdown
			case EEM_Question::QST_type_dropdown :
				$result = new EE_Select_Input( $this->options(), $input_constructor_args );
				break;
			// State Dropdown
			case EEM_Question::QST_type_state :
				$state_options = apply_filters(
					'FHEE__EE_Question__generate_form_input__state_options',
					null,
					$this,
					$registration,
					$answer
				);				
				$result = new EE_State_Select_Input( $state_options, $input_constructor_args );
				break;
			// Country Dropdown
			case EEM_Question::QST_type_country :
				$country_options = apply_filters(
					'FHEE__EE_Question__generate_form_input__country_options',
					null,
					$this,
					$registration,
					$answer
				);
				$result = new EE_Country_Select_Input( $country_options, $input_constructor_args );
				break;
			// Checkboxes
			case EEM_Question::QST_type_checkbox :
				$result = new EE_Checkbox_Multi_Input( $this->options(), $input_constructor_args );
				break;
			// Date
			case EEM_Question::QST_type_date :
				$result = new EE_Datepicker_Input( $input_constructor_args );
				break;
			case EEM_Question::QST_type_html_textarea :
				$input_constructor_args[ 'validation_strategies' ][] = new EE_Simple_HTML_Validation_Strategy();
				$result =  new EE_Text_Area_Input( $input_constructor_args );
				$result->remove_validation_strategy( 'EE_Plaintext_Validation_Strategy' );
				break;
			case EEM_Question::QST_type_email :
				$result = new EE_Email_Input( $input_constructor_args );
				break;
			case EEM_Question::QST_type_us_phone :
				$result = new EE_Phone_Input( $input_constructor_args );
				break;
			case EEM_Question::QST_type_int :
				$input_constructor_args[ 'validation_strategies' ][] = new EE_Int_Validation_Strategy();
				$result = new EE_Text_Input( $input_constructor_args );
				break;
			case EEM_Question::QST_type_decimal :
				$input_constructor_args[ 'validation_strategies' ][] = new EE_Float_Validation_Strategy();
				$result = new EE_Text_Input( $input_constructor_args );
				break;
			case EEM_Question::QST_type_url :
				$input_constructor_args[ 'validation_strategies' ][] = new EE_URL_Validation_Strategy();
				$result = new EE_Text_Input( $input_constructor_args );
				break;
			case EEM_Question::QST_type_year :
				$result = new EE_Year_Input(
						$input_constructor_args,
						apply_filters( 'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__year_question__four_digit', true, $this ),
						apply_filters( 'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__year_question__early_range', 100, $this ),
						apply_filters( 'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__year_question__end_range', 100, $this )
						);
				break;
			case EEM_Question::QST_type_multi_select :
				$result = new EE_Select_Multiple_Input( $this->options(), $input_constructor_args );
				break;
			// fallback
			default :
				$default_input = apply_filters(
					'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__default',
					null,
					$this->type(),
					$this,
					$input_constructor_args
				);
				if( ! $default_input ){
					$default_input = new EE_Text_Input( $input_constructor_args );
				}
				$result = $default_input;
		}
		return apply_filters( 'FHEE__EE_Question__generate_form_input__return', $result, $registration, $this, $answer );
	}


}

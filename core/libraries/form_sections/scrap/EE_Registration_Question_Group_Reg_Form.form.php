<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_Registration_Question_Group_Reg_Form
 *
 * For auto-generating form sections for an EE_Transaction
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.5.0
 *
 */

class EE_Registration_Question_Group_Reg_Form extends EE_Form_Section_Proper {

	/**
	 * @access public
	 * @param EE_Registration  $registration
	 * @param EE_Question_Group $question_group
	 * @return 	EE_Registration_Question_Group_Reg_Form
	 */
	public function __construct( EE_Registration $registration, EE_Question_Group $question_group ){
		// array of params to pass to parent constructor
		$form_args = array(
			'layout_strategy' 	=> new EE_Div_Per_Section_Layout(),
			'subsections' 			=> array(),
			'name' 					=> $question_group->identifier(),
			'html_id' 					=> 'ee-reg-form-qstn-grp-' . $question_group->identifier(),
			'html_class' 			=> 'ee-reg-form-qstn-grp-dv',
			'html_label_id' 		=> 'ee-reg-form-qstn-grp-' . $question_group->identifier() . '-lbl'
		);

		$questions = $question_group->get_many_related(
			'Question',
			array(
				array(
					// where params
					'QST_deleted' => 0,
					'QST_admin_only' => is_admin() ? 1 :0
				),
				'order_by'=>array(
					'Question_Group_Question.QGQ_order' =>'ASC'
				)
			)
		);
		foreach ( $questions as $question ) {
			if( $question instanceof EE_Question ){
				$form_args['subsections'][] = $this->_reg_form_question( $registration, $question );
			}
		}
//		d( $form_args );
		parent::__construct( $form_args );
	}

	/**
	 * @access public
	 * @param EE_Registration $registration
	 * @param EE_Question     $question
	 * @return 	EE_Form_Input_Base
	 */
	public function _reg_form_question( EE_Registration $registration, EE_Question $question ){

			// if this question was for an attendee detail, then check for that answer
			$answer_value = EEM_Answer::instance()->get_attendee_property_answer_value( $registration, $question->ID() );
			$answer = $registration->reg_url_link() || ! $answer_value ? EEM_Answer::instance()->get_one( array( array( 'QST_ID'=>$question->ID(), 'REG_ID'=>$registration->ID() ))) : NULL;
			// if NOT returning to edit an existing registration OR if this question is for an attendee property OR we still don't have an EE_Answer object
			if( ! $registration->reg_url_link() || $answer_value || ! $answer instanceof EE_Answer ) {
				// create an EE_Answer object for storing everything in
				$answer = EE_Answer::new_instance ( array(
					'QST_ID'=> $question->ID(),
					'REG_ID'=> $registration->ID()
				));
			}
			// verify instance
			if( $answer instanceof EE_Answer ){
				if ( ! empty( $answer_value )) {
					$answer->set( 'ANS_value', $answer_value );
				}
				$answer->cache( 'Question', $question );
				$answer_cache_id =$question->system_ID() != NULL ? $question->system_ID() . '-' . $registration->reg_url_link() : $question->ID() . '-' . $registration->reg_url_link();
				$registration->cache( 'Answer', $answer, $answer_cache_id );
			}
			return $this->_generate_question_input( $registration, $question, $answer );

	}



	/**
	 * @param EE_Registration $registration
	 * @param EE_Question     $question
	 * @param mixed EE_Answer|NULL      $answer
	 * @return EE_Form_Input_Base
	 */
	public function _generate_question_input( EE_Registration $registration, EE_Question $question, $answer ){
//		d( $registration );
//		d( $question );
//		d( $answer );
		// array of params to pass to parent constructor.
		// possible values:
		//		html_id;
		//		html_class;
		//		html_style;
		//		name;
		//		html_name;
		//		html_label_id;
		//		html_label_class;
		//		html_label_style;
		//		html_label_text;
		//		html_label;
		//		html_help_text;
		//		html_help_class = 'description';
		//		html_help_style;
		//		raw_value;
		$input_constructor_args = array(
			'layout_strategy' 	=> new EE_Div_Per_Section_Layout(),
			'name' 					=> $registration->reg_url_link() . '-' . $question->ID(),
			'html_name' 			=> 'ee_reg_qstn[' . $registration->reg_url_link() . '][' . $question->ID() . ']',
			'html_id' 					=> 'ee-reg-qstn-' . $registration->reg_url_link() . '-' . $question->ID(),
			'html_class' 			=> 'ee-reg-qstn',
			'required' 				=> $question->required(),
			'html_label_id'		=> 'ee-reg-qstn-' . $registration->reg_url_link() . '-' . $question->ID() . '-lbl',
			'html_label_class'	=> 'ee-reg-qstn-lbl',
			'html_label_text'		=> $question->display_text()
		);

		if ( $answer instanceof EE_Answer ) {
			$input_constructor_args['html_name'] .= '[' . $answer->ID() . ']';
			$input_constructor_args['default'] .= $answer->value();
		}

		switch ( $question->type() ) {
			// Text
			case EEM_Question::QST_type_text :
				$input_class = 'EE_Text_Input';
				break;
			// Textarea
			case EEM_Question::QST_type_textarea :
				$input_class = 'EE_Text_Area_Input';
				break;
			// Single
			case EEM_Question::QST_type_single :
				$input_class = 'EE_Checkbox_Multi_Input';
				break;
			// Dropdown
			case EEM_Question::QST_type_dropdown :
				$input_class = 'EE_Select_Input';
				break;
			// Multiple
			case EEM_Question::QST_type_multiple :
				$input_class = 'EE_Checkbox_Multi_Input';
				break;
			// Date
			case EEM_Question::QST_type_date :
				$input_class = 'EE_Text_Input';
				break;
		}
//		d( $input_constructor_args );
		return new $input_class( $input_constructor_args );

	}



}
// End of file EE_Registration_Question_Group_Reg_Form.form.php
// Location: /EE_Registration_Question_Group_Reg_Form.form.php
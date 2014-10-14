<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_Reg_Form_Question_Form
 *
 * For auto-generating form sections for an EE_Transaction
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.5.0
 *
 */

class EE_Reg_Form_Question_Form extends EE_Model_Form_Section {

	/**
	 * @access public
	 * @param EE_Registration $registration
	 * @param EE_Question     $question
	 * @return    EE_Reg_Form_Question_Form
	 */
	public function __construct( EE_Registration $registration, EE_Question $question ){

		if( $question instanceof EE_Question ){
			// array of params to pass to parent constructor
			$form_args = array(
				'name' => $registration->reg_url_link(),
				'subsections' => array(),
				'layout_strategy' => new EE_Div_Per_Section_Layout(),
				'html_name' =>  '[' . $registration->reg_url_link() . ']',
				'html_id' => $registration->reg_url_link(),
				'html_class' => 'ee-reg-page-questions'
			);

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
			$form_args['subsections'][] = new EE_Question_Answer_Form_Section( $registration, $question, $answer );
			parent::__construct( $form_args );
		}


	}


}
// End of file EE_Reg_Form_Question_Form.form.php
// Location: /EE_Reg_Form_Question_Form.form.php
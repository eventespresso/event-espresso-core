<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_Question_Answer_Form_Section
 *
 * Description
 *
 * @package         Event Espresso
 * @subpackage    core
 * @author				Brent Christensen
 * @since		 	   $VID:$
 *
 */

class EE_Question_Answer_Form_Section extends EE_Form_Section_Proper {

	/**
	 * @param EE_Registration $registration
	 * @param EE_Question     $question
	 * @param EE_Answer       $answer
	 */
	public function __construct( EE_Registration $registration, EE_Question $question, EE_Answer $answer ){
		// array of params to pass to parent constructor
		$form_args = array(
			'name' => $registration->reg_url_link(),
			'subsections' => array(),
			'layout_strategy' => new EE_Div_Per_Section_Layout(),
			'html_name' =>  '[' . $registration->reg_url_link() . ']',
			'html_id' => $registration->reg_url_link(),
			'html_class' => 'ee-reg-page-questions'
		);
		$input_constructor_args = array(array(
			'required' => $question->required(),
			'html_label_text'=>$model_field->get_nicename(),
			'default'=>$model_field->get_default_value(),
		));

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
		$reflection = new ReflectionClass( $input_class );
		$form_args['subsections'][] = $reflection->newInstanceArgs( $input_constructor_args );
		parent::__construct( $form_args );

	}


}



// End of file EE_Question_Answer_Form_Section.form.php
// Location: /EE_Question_Answer_Form_Section.form.php
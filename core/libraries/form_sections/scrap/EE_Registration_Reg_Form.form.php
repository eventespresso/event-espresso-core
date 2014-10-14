<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_Registration_Reg_Form
 *
 * For auto-generating form sections for an EE_Transaction
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.5.0
 *
 */

class EE_Registration_Reg_Form extends EE_Form_Section_Proper {

	/**
	 * @access public
	 * @param EE_Registration  $registration
	 * @param EE_SPCO_Reg_Step $reg_step
	 * @return 	EE_Registration_Reg_Form
	 */
	public function __construct( EE_Registration $registration, EE_SPCO_Reg_Step $reg_step ){
		// array of params to pass to parent constructor
		$form_args = array(
			'layout_strategy' 	=> new EE_Div_Per_Section_Layout(),
			'subsections' 			=> array(),
			'name' 					=> $registration->reg_url_link(),
			'html_id' 					=> 'ee-registration-' . $registration->reg_url_link()
		);

		// verify that registration has valid event
		if ( $registration->event() instanceof EE_Event ) {
			$query_params = array(
				array(
					'Event.EVT_ID' => $registration->event()->ID(),
					'Event_Question_Group.EQG_primary' => $registration->count() == 1 ? TRUE : FALSE
				),
				'order_by'=>array( 'QSG_order'=>'ASC' )
			);
			$question_groups = $registration->event()->question_groups( $query_params );
			if ( $question_groups ) {
				foreach ( $question_groups as $question_group ) {
					if ( $question_group instanceof EE_Question_Group ) {
						$form_args['subsections'][] = new EE_Registration_Question_Group_Reg_Form( $registration, $question_group );
					}
				}
			}
		}
//		d( $form_args );
		parent::__construct( $form_args );
	}




}
// End of file EE_Registration_Reg_Form.form.php
// Location: /EE_Registration_Reg_Form.form.php
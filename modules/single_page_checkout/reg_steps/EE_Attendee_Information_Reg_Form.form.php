<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_Attendee_Information_Reg_Form
 *
 * For auto-generating form sections for an EE_Transaction
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.5.0
 *
 */

class EE_Attendee_Information_Reg_Form extends EE_Form_Section_Proper {

	/**
	 * 	$_transaction - the transaction that the registration form is being constructed for
	 * 	@access private
	 *	@var EE_Transaction $_transaction
	 */
	public $_transaction = NULL;



	/**
	 * @access public
	 * @param EE_SPCO_Reg_Step_Attendee_Information $reg_step
	 * @return 	EE_Attendee_Information_Reg_Form
	 */
	public function __construct( EE_SPCO_Reg_Step_Attendee_Information $reg_step ){
//		echo '<br/><h5 style="color:#2EA2CC;">' . __CLASS__ . '<span style="font-weight:normal;color:#0074A2"> -> </span>' . __FUNCTION__ . '() <br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
		$form_args = array(
//			'layout_strategy' 	=> new EE_Template_Layout(),
			'layout_strategy' 	=> new EE_Div_Per_Section_Layout(),
			'subsections' 			=> array(),
			'name' 					=> $reg_step->name(),
			'html_id' 					=> 'ee-' . $reg_step->name() . '-reg-step-dv'
		);
		$registrations = $reg_step->checkout->transaction->registrations( array(), TRUE );
		// grab the saved registrations from the transaction
		if ( $registrations ) {
			foreach ( $registrations as $registration ) {
				if ( $registration instanceof EE_Registration ) {
					$form_args['subsections'][] = new EE_Registration_Reg_Form( $registration, $reg_step );
				}
			}
		}
//		d( $form_args );
		parent::__construct( $form_args );
	}


}
// End of file EE_Attendee_Information_Reg_Form.form.php
// Location: /EE_Attendee_Information_Reg_Form.form.php
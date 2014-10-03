<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Registration_Processor
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.6.0
 *
 */

class EE_Registration_Processor {



	/**
	 * generates reg code if that has yet to been done,
	 * sets reg status based on transaction status and event pre-approval setting
	 *
	 * @param  bool $from_admin      used to indicate the request is initiated by admin
	 * @param  bool $flip_reg_status used to indicate we DO want to automatically flip the registration status if txn is complete.
	 * @return array    an array with two boolean values, first indicates if new reg, second indicates if reg status was updated.
	 */
	public function finalize( $from_admin = FALSE, $flip_reg_status = TRUE ) {
		$update_reg = FALSE;
		$new_reg = FALSE;
		// update reg status if no monies are owing AND ( the REG status is pending payment and we're not doing this from admin ) OR ( the event default reg status is Approved )
		if ( ( ( $this->transaction()->is_completed() || $this->transaction()->is_overpaid() ) && $this->status_ID() == EEM_Registration::status_id_pending_payment && $flip_reg_status ) || $this->event()->default_registration_status() == EEM_Registration::status_id_approved ) {
			// automatically toggle status to approved
			$this->set_status( EEM_Registration::status_id_approved );
			$update_reg = TRUE;
		}
		//if we're doing this from admin and we have 'txn_reg_status_change' in the $_REQUEST then let's use that to trigger the status change.
		if ( $from_admin && isset( $_REQUEST[ 'txn_reg_status_change' ] ) && isset( $_REQUEST[ 'txn_reg_status_change' ][ 'reg_status' ] ) && $_REQUEST[ 'txn_reg_status_change' ][ 'reg_status' ] != 'NAN' ) {
			$this->set_status( $_REQUEST[ 'txn_reg_status_change' ][ 'reg_status' ] );
			$update_reg = TRUE;
		}
		// generate REG codes for NEW registrations
		$new_reg = $this->_generate_new_reg_code() == TRUE ? TRUE : $new_reg;
		// save the registration?
		if ( $update_reg || $new_reg ) {
			do_action( 'AHEE__EE_Registration__finalize__update_and_new_reg', $this, $from_admin );
			$this->save();
		}
		return array( 'new_reg' => $new_reg, 'to_approved' => $update_reg );
	}


}
// End of file EE_Registration_Processor.class.php
// Location: /core/business/EE_Registration_Processor.class.php
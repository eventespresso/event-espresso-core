<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Registration_Processor
 *
 * Provides method for manipulating and processing changes with regards to an EE_Registration
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.6.0
 *
 */

class EE_Registration_Processor {



	/**
	 * @return EE_Registration_Processor
	 */
	function __construct() {
	}



	/**
	 * generates reg_url_link
	 *
	 * @param int           $att_nmbr
	 * @param EE_Line_Item | string $item
	 * @return string
	 */
	public function generate_reg_url_link( $att_nmbr, $item ) {
		return $item instanceof EE_Line_Item ? $att_nmbr . '-' . $item->code() :  $att_nmbr . '-' . $item;
	}



	/**
	 * generates reg code
	 *
	 * @param \EE_Registration $registration
	 * @return string
	 */
	public function generate_reg_code( EE_Registration $registration ) {
	// figure out where to start parsing the reg code
		$chars = strpos( $registration->reg_url_link(), '-' ) + 4;
		// TXN_ID + TKT_ID + first 3 and last 3 chars of reg_url_link
		$new_reg_code = array(
			$registration->transaction_ID(),
			$registration->ticket_ID(),
			substr( $registration->reg_url_link(), 0, $chars ) . substr( $registration->reg_url_link(), - 3 )
		);
		// now put it all together
		$new_reg_code = implode( '-', $new_reg_code );
		return apply_filters( 'FHEE__EE_Registration_Processor___generate_reg_code__new_reg_code', $new_reg_code, $registration );
	}



	/**
	 * 	manually_update_registration_status
	 *
	 * 	if the reg status has actually changed, this will update the value for the registration and trigger any notifications
	 *
	 * 	@access public
	 * @param EE_Registration $registration
	 * @param string 	$new_reg_status
	 * @param bool 	$save TRUE will save the registration if the status is updated, FALSE will leave that up to client code
	 * 	@return boolean
	 */
	public function manually_update_registration_status( EE_Registration $registration, $new_reg_status = '', $save = TRUE ) {
		// get current REG_Status
		$old_reg_status = $registration->status_ID();
		// toggle reg status but only if it has changed and the user can do so
		if ( $old_reg_status !== $new_reg_status && EE_Registry::instance()->CAP->current_user_can( 'ee_edit_registration', 'toggle_registration_status', $registration->ID() )) {
			// change status to new value
			if ( $registration->set_status( $new_reg_status )) {
				if ( $save ) {
					$registration->save();
				}
				// send messages
				$this->trigger_registration_update_notifications(
					$registration,
					array(
						'manually_updated' 	=> TRUE,
						'old_reg_status' 			=> $old_reg_status,
						'new_reg_status' 		=> $new_reg_status
					)
				);
			}
			return TRUE;
		}
		return FALSE;
	}



	/**
	 *    toggle_registration_status_for_default_approved_events
	 *
	 * @access public
	 * @param EE_Registration $registration
	 * @param bool 	$save TRUE will save the registration if the status is updated, FALSE will leave that up to client code
	 * @return boolean
	 */
	public function toggle_registration_status_for_default_approved_events( EE_Registration $registration, $save = TRUE ) {
		// toggle reg status to approved IF the event default reg status is approved
		if ( $registration->event()->default_registration_status() == EEM_Registration::status_id_approved ) {
			// toggle status to approved
			$registration->set_status( EEM_Registration::status_id_approved );
			if ( $save ) {
				$registration->save();
			}
			return TRUE;
		}
		return FALSE;
	}


	/**
	 * 	toggle_registration_statuses_if_no_monies_owing
	 *
	 * 	@access public
	 * @param EE_Registration $registration
	 * @param bool 	$save TRUE will save the registration if the status is updated, FALSE will leave that up to client code
	 * 	@return boolean
	 */
	public function toggle_registration_status_if_no_monies_owing( EE_Registration $registration, $save = TRUE ) {
		// toggle reg status to approved IF
		if (
			// REG status is pending payment
			$registration->status_ID() == EEM_Registration::status_id_pending_payment
			// AND no monies are owing
			&& ( $registration->transaction()->is_completed() || $registration->transaction()->is_overpaid() || $registration->transaction()->is_free() )
		) {
			// toggle status to approved
			$registration->set_status( EEM_Registration::status_id_approved );
			if ( $save ) {
				$registration->save();
			}
			return TRUE;
		}
		return FALSE;
	}



	/**
	 *    registration_status_changed
	 *
	 * @access public
	 * @param EE_Registration $registration
	 * @param array 	$additional_details - and array of details that can be utilized by other methods that hook into the filter here.
	 * 			the existing values for this array are an attempt to describe the conditions that lead to the hookpoint being triggered
	 * @return void
	 */
	public function trigger_registration_update_notifications( EE_Registration $registration, $additional_details = array() ) {
		do_action(
			'AHEE__EE_Registration_Processor__trigger_registration_update_notifications',
			$registration,
			apply_filters(
				'FHEE__EE_Registration_Processor__trigger_registration_update_notifications__additional_conditions',
				array_merge(
					// defaults
					array(
						'checkout_or_payment' => FALSE, 	// whether this is being triggered as a result of the checkout or payment process
						'manually_updated' 		=> FALSE, 	// whether this is being triggered as a result of updates made via the admin
						'finalized' 						=> FALSE, 	// whether the finalize_registration step has been completed at this point
						'reg_steps' 						=> array(), 	// the TXN->reg_steps array
						'old_txn_status' 				=> NULL, 	// the TXN status at this point
						'last_payment'				=> NULL,	// EE_Payment object if just made
						'old_reg_status' 				=> NULL, 	// reg status prior to TXN update
						'new_reg_status' 			=> NULL 	// reg status after TXN update
					),
					$additional_details
				)
			)
		);
	}



	/**
	 * sets reg status based either on passed param or on transaction status and event pre-approval setting
	 *
	 * @param \EE_Registration $registration
	 * @param array 	$additional_details - and array of details that can be passed along to trigger_registration_update_notifications()
	 * @return bool
	 */
	public function update_registration_after_checkout_or_payment(  EE_Registration $registration, $additional_details = array() ) {
		$old_reg_status = $registration->status_ID();
		// if the registration status gets updated, then save the registration
		if ( $this->toggle_registration_status_for_default_approved_events( $registration, FALSE ) || $this->toggle_registration_status_if_no_monies_owing( $registration, FALSE )) {
			$registration->save();
		}
		$new_reg_status = $registration->status_ID();
		// send messages
		$this->trigger_registration_update_notifications(
			$registration,
			array_merge(
				is_array( $additional_details ) ? $additional_details : array( $additional_details ),
				array(
					'checkout_or_payment' 	=> TRUE,
					'old_reg_status' 					=> $old_reg_status,
					'new_reg_status' 				=> $new_reg_status
				)
			)
		);
		return $new_reg_status == EEM_Registration::status_id_approved ? TRUE : FALSE;
	}



}
// End of file EE_Registration_Processor.class.php
// Location: /core/business/EE_Registration_Processor.class.php
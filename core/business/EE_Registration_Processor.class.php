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
	 * @param \EE_Line_Item $item
	 * @return string
	 */
	public function generate_reg_url_link( $att_nmbr = 0, EE_Line_Item $item ) {
		return $att_nmbr . '-' . $item->code();
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
	 * 	@access public
	 * @param EE_Registration $registration
	 * @param string           $new_reg_status
	 * 	@return 	boolean
	 */
	public function manually_update_registration_status( EE_Registration $registration, $new_reg_status = '' ) {
		// get current REG_Status
		$old_reg_status = $registration->status_ID();
		// toggle reg status to approved IF the event default reg status is approved
		if ( ! empty( $new_reg_status ) && EE_Registry::instance()->CAP->current_user_can( 'ee_edit_registration', 'toggle_registration_status', $registration->ID() )) {
			// toggle status to approved
			if ( $registration->set_status( $new_reg_status )) {
				$registration->save();
				// send messages
				$this->registration_status_changed(
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
	 * 	toggle_registration_status_for_approved_events
	 *
	 * 	@access public
	 * @param EE_Registration $registration
	 * 	@return 	boolean
	 */
	public function toggle_registration_status_for_approved_events( EE_Registration $registration ) {
		// toggle reg status to approved IF the event default reg status is approved
		if ( $registration->event()->default_registration_status() == EEM_Registration::status_id_approved ) {
			// toggle status to approved
			$registration->set_status( EEM_Registration::status_id_approved );
			$registration->save();
			return TRUE;
		}
		return FALSE;
	}


	/**
	 * 	toggle_registration_status_if_no_monies_owing
	 *
	 * 	@access public
	 * @param EE_Registration $registration
	 * 	@return 	boolean
	 */
	public function toggle_registration_status_if_no_monies_owing( EE_Registration $registration ) {
		// toggle reg status to approved IF
		if (
			// REG status is pending payment
			$registration->status_ID() == EEM_Registration::status_id_pending_payment
			// AND no monies are owing
			&& ( $registration->transaction()->is_completed() || $registration->transaction()->is_overpaid() || $registration->transaction()->is_free() )
		) {
			// toggle status to approved
			$registration->set_status( EEM_Registration::status_id_approved );
			$registration->save();
			return TRUE;
		}
		return FALSE;
	}



	/**
	 *    registration_status_changed
	 *
	 * @access public
	 * @param EE_Registration $registration
	 * @param array           $additional_conditions
	 * @return    void
	 */
	public function registration_status_changed( EE_Registration $registration, $additional_conditions = array() ) {
		do_action(
			'AHEE__EE_Registration_Processor__trigger_registration_status_changed_hook',
			$registration,
			apply_filters(
				'FHEE__EE_Registration_Processor__trigger_registration_status_changed_hook__additional_conditions',
				$additional_conditions
			)
		);
	}



	/**
	 * sets reg status based either on passed param or on transaction status and event pre-approval setting
	 *
	 * @param \EE_Registration $registration
	 * @return bool
	 */
	public function finalize(  EE_Registration $registration ) {
		// if we're doing this from admin and we have a $new_reg_status
		if ( $this->toggle_registration_status_for_approved_events( $registration ) || $this->toggle_registration_status_if_no_monies_owing( $registration )) {
			// send messages
			$this->registration_status_changed( $registration, array( 'finalized' => TRUE ));
			return TRUE;
		}
		return FALSE;
	}



}
// End of file EE_Registration_Processor.class.php
// Location: /core/business/EE_Registration_Processor.class.php
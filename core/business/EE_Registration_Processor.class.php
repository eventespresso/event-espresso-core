<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
EE_Registry::instance()->load_class( 'Processor_Base' );

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
	 * initial reg status at the beginning of this request.
	 *
	 * @var string
	 */
	protected $_old_reg_status = NULL;

	/**
	 * reg status at the end of the request after all processing.
	 *
	 * @var string
	 */
	protected $_new_reg_status = NULL;

	/**
	 * 	@var EE_Registration_Processor $_instance
	 * 	@access 	private
	 */
	private static $_instance = NULL;



	/**
	 *@singleton method used to instantiate class object
	 *@access public
	 *@return EE_Registration_Processor instance
	 */
	public static function instance() {
		// check if class object is instantiated
		if ( ! self::$_instance instanceof EE_Registration_Processor ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}



	/**
	 * @return EE_Registration_Processor
	 */
	private function __construct() {
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
	 * @return string
	 */
	public function old_reg_status() {
		return $this->_old_reg_status;
	}



	/**
	 * @param string $old_reg_status
	 */
	public function set_old_reg_status( $old_reg_status ) {
		// only set the first time
		if ( $this->_old_reg_status === NULL ) {
			$this->_old_reg_status = $old_reg_status;
		}
	}



	/**
	 * @return string
	 */
	public function new_reg_status() {
		return $this->_new_reg_status;
	}



	/**
	 * @param string $new_reg_status
	 */
	public function set_new_reg_status( $new_reg_status ) {
		$this->_new_reg_status = $new_reg_status;
	}



	/**
	 * 	manually_update_registration_status
	 *
	 * 	@access public
	 * @param EE_Registration $registration
	 * @param string 	$new_reg_status
	 * @param bool 	$save TRUE will save the registration if the status is updated, FALSE will leave that up to client code
	 * 	@return boolean
	 */
	public function manually_update_registration_status( EE_Registration $registration, $new_reg_status = '', $save = TRUE ) {
		// set initial REG_Status
		$this->set_old_reg_status( $registration->status_ID() );
		// set incoming REG_Status
		$this->set_new_reg_status( $new_reg_status );
		// toggle reg status but only if it has changed and the user can do so
		if ( $this->old_reg_status() !== $this->new_reg_status() && EE_Registry::instance()->CAP->current_user_can( 'ee_edit_registration', 'toggle_registration_status', $registration->ID() )) {
			// change status to new value
			if ( $registration->set_status( $this->new_reg_status() )) {
				if ( $save ) {
					$registration->save();
				}
				// send messages
				$this->trigger_registration_update_notifications(
					$registration,
					array( 'manually_updated' 	=> true )
				);
			}
			return TRUE;
		}
		return FALSE;
	}



	/**
	 *    toggle_incomplete_registration_status_to_default
	 *
	 * 		changes any incomplete registrations to either the event or global default registration status
	 *
	 * @access public
	 * @param EE_Registration $registration
	 * @param bool 	$save TRUE will save the registration if the status is updated, FALSE will leave that up to client code
	 * @return void
	 */
	public function toggle_incomplete_registration_status_to_default( EE_Registration $registration, $save = TRUE ) {
		// set initial REG_Status
		$this->set_old_reg_status( $registration->status_ID() );
		// is the registration currently incomplete
		if ( $registration->status_ID() === EEM_Registration::status_id_incomplete ) {
			// grab default reg status for the event, if set
			$event_default_registration_status = $registration->event()->default_registration_status();
			// if no default reg status is set for the event, then use the global value
			$STS_ID = ! empty( $event_default_registration_status ) ? $event_default_registration_status : EE_Registry::instance()->CFG->registration->default_STS_ID;
			// if the event default reg status is approved, then downgrade temporarily to payment pending to ensure that payments are triggered
			$STS_ID = $STS_ID === EEM_Registration::status_id_approved ? EEM_Registration::status_id_pending_payment : $STS_ID;
			$registration->set_status( $STS_ID );
			if ( $save ) {
				$registration->save();
			}
		}
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
		// set initial REG_Status
		$this->set_old_reg_status( $registration->status_ID() );
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
		// set initial REG_Status
		$this->set_old_reg_status( $registration->status_ID() );
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
	 * @param array 	$additional_details
	 * @return void
	 */
	public function trigger_registration_update_notifications( EE_Registration $registration, $additional_details = array() ) {
		try {
			do_action(
				'AHEE__EE_Registration_Processor__trigger_registration_update_notifications',
				$registration,
				apply_filters(
					'FHEE__EE_Registration_Processor__trigger_registration_update_notifications__additional_conditions',
					array_merge(
					// defaults
						array(
							'checkout_or_payment' => false,
							'manually_updated' 		=> false,
							'payment_updates' 		=> false,
							'status_updates' 			=> $this->new_reg_status() !== $this->old_reg_status() ? true : false,
							'finalized' 						=> false,
							'revisit' 							=> false,
							'reg_steps' 						=> $registration->transaction()->reg_steps(),
							'txn_status' 						=> $registration->transaction()->status_ID(),
							'last_payment'				=> null,
							'old_reg_status' 				=> $this->old_reg_status(),
							'new_reg_status' 			=> $this->new_reg_status()
						),
						$additional_details
					)
				)
			);
		} catch( Exception $e ) {
			EE_Error::add_error( $e->getMessage(), $e->getFile(), '', $e->getLine() );
		}
	}



	/**
	 * sets reg status based either on passed param or on transaction status and event pre-approval setting
	 *
	 * @param \EE_Registration $registration
	 * @param array 	$additional_details
	 * @return bool
	 */
	public function update_registration_after_checkout_or_payment(  EE_Registration $registration, $additional_details = array() ) {
		// set initial REG_Status
		$this->set_old_reg_status( $registration->status_ID() );

		// DEBUG
		$DEBUG_7631 = get_option( 'EE_DEBUG_IPN_' . EE_Session::instance()->id(), array() );
		$microtime = microtime();
		if ( ! isset( $DEBUG_7631[ $registration->transaction_ID() ][ $microtime ] ) ) {
			$DEBUG_7631[ $registration->transaction_ID() ][ $microtime ] = array();
		}
		$DEBUG_7631[ $registration->transaction_ID() ][ $microtime ] = array();
		$DEBUG_7631[ $registration->transaction_ID() ][ $microtime ][ __CLASS__ ] = __FUNCTION__ . '() ' . __LINE__;
		$DEBUG_7631[ $registration->transaction_ID() ][ $microtime ][ 'REG_status_1' ] = $registration->status_ID();
		// DEBUG

		// if the registration status gets updated, then save the registration
		if ( $this->toggle_registration_status_for_default_approved_events( $registration, false ) || $this->toggle_registration_status_if_no_monies_owing( $registration, false )) {
			$registration->save();
		}

		// DEBUG
		$DEBUG_7631[ $registration->transaction_ID() ][ $microtime ][ 'REG_status_2' ] = $registration->status_ID();
		update_option( 'EE_DEBUG_IPN_' . EE_Session::instance()->id(), $DEBUG_7631 );
		// DEBUG

		// set new  REG_Status
		$this->set_new_reg_status( $registration->status_ID() );
		// send messages
		$this->trigger_registration_update_notifications(
			$registration,
			array_merge(
				is_array( $additional_details ) ? $additional_details : array( $additional_details ),
				array( 'checkout_or_payment' 	=> true )
			)
		);
		return $this->new_reg_status() == EEM_Registration::status_id_approved ? true : false;
	}



}
// End of file EE_Registration_Processor.class.php
// Location: /core/business/EE_Registration_Processor.class.php

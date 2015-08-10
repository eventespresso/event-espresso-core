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

class EE_Registration_Processor extends EE_Processor_Base {

	/**
	 * @var EE_Registration_Processor $_instance
	 * @access    private
	 */
	private static $_instance = null;

	/**
	 * initial reg status at the beginning of this request.
	 * indexed by registration ID
	 *
	 * @var array
	 */
	protected $_old_reg_status = array();

	/**
	 * reg status at the end of the request after all processing.
	 * indexed by registration ID
	 *
	 * @var array
	 */
	protected $_new_reg_status = array();

	/**
	 * amounts paid at the end of the request after all processing.
	 * indexed by registration ID
	 *
	 * @var array
	 */
	protected static $_amount_paid = array();



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
	 * generate_ONE_registration_from_line_item
	 *
	 * Although a ticket line item may have a quantity greater than 1,
	 * this method will ONLY CREATE ONE REGISTRATION !!!
	 * Regardless of the ticket line item quantity.
	 * This means that any code calling this method is responsible for ensuring
	 * that the final registration count matches the ticket line item quantity.
	 * This was done to make it easier to match the number of registrations
	 * to the number of tickets in the cart, when the cart has been edited
	 * after SPCO has already been initialized. So if an additional ticket was added to the cart, you can simply pass
	 * the line item to this method to add a second ticket, and in this case, you would not want to add 2 tickets.
	 *
	 * @param EE_Line_Item $line_item
	 * @param \EE_Transaction $transaction
	 * @param int $att_nmbr
	 * @param int $total_ticket_count
	 * @return \EE_Registration | null
	 * @throws \EE_Error
	 */
	public function generate_ONE_registration_from_line_item( EE_Line_Item $line_item, EE_Transaction $transaction, $att_nmbr = 1, $total_ticket_count = 1 ) {
		// grab the related ticket object for this line_item
		$ticket = $line_item->ticket();
		if ( ! $ticket instanceof EE_Ticket ) {
			EE_Error::add_error( sprintf( __( "Line item %s did not contain a valid ticket", "event_espresso" ), $line_item->ID() ), __FILE__, __FUNCTION__, __LINE__ );
			return null;
		}
		$first_datetime = $ticket->get_first_related( 'Datetime' );
		if ( ! $first_datetime instanceof EE_Datetime ) {
			EE_Error::add_error( sprintf( __( "The ticket (%s) is not associated with any valid datetimes.", "event_espresso" ), $ticket->name() ), __FILE__, __FUNCTION__, __LINE__ );
			return null;
		}
		$event = $first_datetime->get_first_related( 'Event' );
		if ( ! $event instanceof EE_Event ) {
			EE_Error::add_error( sprintf( __( "The ticket (%s) is not associated with a valid event.", "event_espresso" ), $ticket->name() ), __FILE__, __FUNCTION__, __LINE__ );
			return null;
		}
		$reg_url_link = $this->generate_reg_url_link( $att_nmbr, $line_item );
		// now create a new registration for the ticket
		$registration = EE_Registration::new_instance(
			array(
				'EVT_ID'          => $event->ID(),
				'TXN_ID'          => $transaction->ID(),
				'TKT_ID'          => $ticket->ID(),
				'STS_ID'          => EEM_Registration::status_id_incomplete,
				'REG_date'        => $transaction->datetime(),
				'REG_final_price' => $ticket->get_ticket_total_with_taxes(),
				'REG_session'     => EE_Registry::instance()->SSN->id(),
				'REG_count'       => $att_nmbr,
				'REG_group_size'  => $total_ticket_count,
				'REG_url_link'    => $reg_url_link
			)
		);
		$registration->set_reg_code( $this->generate_reg_code( $registration ) );
		$registration->save();
		$registration->_add_relation_to( $event, 'Event', array(), $event->ID() );
		$registration->_add_relation_to( $line_item->ticket(), 'Ticket', array(), $line_item->ticket()->ID() );
		$transaction->_add_relation_to( $registration, 'Registration' );
		return $registration;
	}



	/**
	 * generates reg_url_link
	 *
	 * @param int           $att_nmbr
	 * @param EE_Line_Item | string $item
	 * @return string
	 */
	public function generate_reg_url_link( $att_nmbr, $item ) {
		$reg_url_link = $item instanceof EE_Line_Item ? $item->code() : $item;
		$reg_url_link = $att_nmbr . '-' . md5( $reg_url_link . microtime() );
		return $reg_url_link;
	}



	/**
	 * generates reg code
	 *
	 * @param \EE_Registration $registration
	 * @return string
	 */
	public function generate_reg_code( EE_Registration $registration ) {
	// figure out where to start parsing the reg code
		$chars = strpos( $registration->reg_url_link(), '-' ) + 5;
		// TXN_ID + TKT_ID + first 3 and last 3 chars of reg_url_link
		$new_reg_code = array(
			$registration->transaction_ID(),
			$registration->ticket_ID(),
			substr( $registration->reg_url_link(), 0, $chars )
		);
		// now put it all together
		$new_reg_code = implode( '-', $new_reg_code );
		return apply_filters( 'FHEE__EE_Registration_Processor___generate_reg_code__new_reg_code', $new_reg_code, $registration );
	}



	/**
	 * @param int $REG_ID
	 * @return string
	 */
	public function old_reg_status( $REG_ID ) {
		return isset( $this->_old_reg_status[ $REG_ID ] ) ? $this->_old_reg_status[ $REG_ID ] : null;
	}



	/**
	 * @param int $REG_ID
	 * @param string $old_reg_status
	 */
	public function set_old_reg_status( $REG_ID, $old_reg_status ) {
		// only set the first time
		if ( ! isset( $this->_old_reg_status[ $REG_ID ] ) ) {
			$this->_old_reg_status[ $REG_ID ] = $old_reg_status;
		}
	}



	/**
	 * @param int $REG_ID
	 * @return string
	 */
	public function new_reg_status( $REG_ID ) {
		return isset( $this->_new_reg_status[ $REG_ID ] ) ? $this->_new_reg_status[ $REG_ID ] : null;
	}



	/**
	 * @param int $REG_ID
	 * @param string $new_reg_status
	 */
	public function set_new_reg_status( $REG_ID, $new_reg_status ) {
		$this->_new_reg_status[ $REG_ID ] = $new_reg_status;
	}



	/**
	 * reg_status_updated
	 *
	 * @param int $REG_ID
	 * @return bool
	 */
	public function reg_status_updated( $REG_ID ) {
		return $this->new_reg_status( $REG_ID ) !== $this->old_reg_status( $REG_ID ) ? true : false;
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
	public function manually_update_registration_status( EE_Registration $registration, $new_reg_status = '', $save = true ) {
		// set initial REG_Status
		$this->set_old_reg_status( $registration->ID(), $registration->status_ID() );
		// set incoming REG_Status
		$this->set_new_reg_status( $registration->ID(), $new_reg_status );
		// toggle reg status but only if it has changed and the user can do so
		if ( $this->reg_status_updated( $registration->ID() ) && EE_Registry::instance()->CAP->current_user_can(
				'ee_edit_registration',
				'toggle_registration_status', $registration->ID() )) {
			// change status to new value
			if ( $registration->set_status( $this->new_reg_status( $registration->ID() ) )) {
				if ( $save ) {
					$registration->save();
				}
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
		$this->set_old_reg_status( $registration->ID(), $registration->status_ID() );
		// is the registration currently incomplete ?
		if ( $registration->status_ID() === EEM_Registration::status_id_incomplete ) {
			// grab default reg status for the event, if set
			$event_default_registration_status = $registration->event()->default_registration_status();
			// if no default reg status is set for the event, then use the global value
			$STS_ID = ! empty( $event_default_registration_status ) ? $event_default_registration_status : EE_Registry::instance()->CFG->registration->default_STS_ID;
			// if the event default reg status is approved, then downgrade temporarily to payment pending to ensure that payments are triggered
			$STS_ID = $STS_ID === EEM_Registration::status_id_approved ? EEM_Registration::status_id_pending_payment : $STS_ID;
			// set incoming REG_Status
			$this->set_new_reg_status( $registration->ID(), $STS_ID );
			$registration->set_status( $STS_ID );
			if ( $save ) {
				$registration->save();
			}
			// don't trigger notifications during IPNs because they will get triggered by EE_Payment_Processor
			if ( ! EE_Processor_Base::$IPN ) {
				// otherwise, send out notifications
				add_filter( 'FHEE__EED_Messages___maybe_registration__deliver_notifications', '__return_true', 10 );
			}
			// DEBUG LOG
			//$this->log(
			//	__CLASS__, __FUNCTION__, __LINE__,
			//	$registration->transaction(),
			//	array(
			//		'IPN'                   => EE_Processor_Base::$IPN,
			//		'deliver_notifications' => has_filter( 'FHEE__EED_Messages___maybe_registration__deliver_notifications' ),
			//	)
			//);
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
		$this->set_old_reg_status( $registration->ID(), $registration->status_ID() );
		// if not already, toggle reg status to approved IF the event default reg status is approved
		if (
			$registration->status_ID() !== EEM_Registration::status_id_approved &&
			$registration->event()->default_registration_status() == EEM_Registration::status_id_approved
		) {
			// set incoming REG_Status
			$this->set_new_reg_status( $registration->ID(), EEM_Registration::status_id_approved );
			// toggle status to approved
			$registration->set_status( EEM_Registration::status_id_approved );
			if ( $save ) {
				$registration->save();
			}
			// don't trigger notifications during IPNs because they will get triggered by EE_Payment_Processor
			if ( ! EE_Processor_Base::$IPN ) {
				// otherwise, send out notifications
				add_filter( 'FHEE__EED_Messages___maybe_registration__deliver_notifications', '__return_true', 10 );
			}
			// DEBUG LOG
			//$this->log(
			//	__CLASS__, __FUNCTION__, __LINE__,
			//	$registration->transaction(),
			//	array(
			//		'IPN'                   => EE_Processor_Base::$IPN,
			//		'deliver_notifications' => has_filter( 'FHEE__EED_Messages___maybe_registration__deliver_notifications' ),
			//	)
			//);
			return TRUE;
		}
		return FALSE;
	}



	/**
	 *    toggle_registration_statuses_if_no_monies_owing
	 *
	 * @access public
	 * @param EE_Registration $registration
	 * @param bool $save TRUE will save the registration if the status is updated, FALSE will leave that up to client code
	 * @param array $additional_details
	 * @return bool
	 * @throws \EE_Error
	 */
	public function toggle_registration_status_if_no_monies_owing( EE_Registration $registration, $save = TRUE, $additional_details = array() ) {
		// set initial REG_Status
		$this->set_old_reg_status( $registration->ID(), $registration->status_ID() );
		//EEH_Debug_Tools::printr( $additional_details, '$additional_details', __FILE__, __LINE__ );
		// was a payment just made ?
		if (
			isset( $additional_details[ 'payment_updates' ], $additional_details[ 'last_payment' ] ) &&
			$additional_details[ 'payment_updates' ] &&
			$additional_details[ 'last_payment' ] instanceof EE_Payment
		) {
			$payment = $additional_details[ 'last_payment' ];
			$total_paid = 0;
			foreach ( self::$_amount_paid as $reg => $amount_paid ) {
				$total_paid += $amount_paid;
			}
		} else {
			$payment = null;
			$total_paid = 0;
		}
		//EEH_Debug_Tools::printr( $registration->status_ID(), '$registration->status_ID()', __FILE__, __LINE__ );
		//EEH_Debug_Tools::printr( $payment instanceof EE_Payment, '$payment instanceof EE_Payment &&', __FILE__, __LINE__ );
		//EEH_Debug_Tools::printr( isset( self::$_amount_paid[ $registration->ID() ] ), 'isset( self::$_amount_paid[ $registration->ID() ] ) &&', __FILE__, __LINE__ );
		//EEH_Debug_Tools::printr( $payment->amount(), '$payment->amount_no_code()', __FILE__, __LINE__ );
		//EEH_Debug_Tools::printr( $total_paid, '$total_paid', __FILE__, __LINE__ );
		//EEH_Debug_Tools::printr( $registration->final_price(), '$registration->final_price()', __FILE__, __LINE__ );
		//EEH_Debug_Tools::printr( $payment->amount() - $total_paid >= $registration->final_price(), '$payment->amount_no_code() - $total_paid >= $registration->final_price()', __FILE__, __LINE__ );
		// toggle reg status to approved IF
		if (
			// REG status is pending payment
			$registration->status_ID() == EEM_Registration::status_id_pending_payment
			// AND no monies are owing
			&& (
				(
					$registration->transaction()->is_completed() ||
					$registration->transaction()->is_overpaid() ||
					$registration->transaction()->is_free() ||
					apply_filters( 'FHEE__EE_Registration_Processor__toggle_registration_status_if_no_monies_owing', false, $registration )
				) || (
					$payment instanceof EE_Payment &&
					$payment->is_approved() &&
					// this specific registration has not yet been paid for
					! isset( self::$_amount_paid[ $registration->ID() ] ) &&
					// payment amount, less what we have already attributed to other registrations, is greater than this reg's final price
					$payment->amount() - $total_paid >= $registration->final_price()
				)
			)
		) {
			// mark as paid
			self::$_amount_paid[ $registration->ID() ] = $registration->final_price();
			// track new REG_Status
			$this->set_new_reg_status( $registration->ID(), EEM_Registration::status_id_approved );
			// toggle status to approved
			$registration->set_status( EEM_Registration::status_id_approved );
			if ( $save ) {
				$registration->save();
			}
			// don't trigger notifications during IPNs because they will get triggered by EE_Payment_Processor
			if ( ! EE_Processor_Base::$IPN ) {
				// otherwise, send out notifications
				add_filter( 'FHEE__EED_Messages___maybe_registration__deliver_notifications', '__return_true', 10 );
			}
			// DEBUG LOG
			//$this->log(
			//	__CLASS__, __FUNCTION__, __LINE__,
			//	$registration->transaction(),
			//	array(
			//		'IPN'                   => EE_Processor_Base::$IPN,
			//		'deliver_notifications' => has_filter( 'FHEE__EED_Messages___maybe_registration__deliver_notifications' ),
			//	)
			//);
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
			//do_action(
			//	'AHEE__EE_Registration_Processor__trigger_registration_update_notifications',
			//	$registration,
			//	apply_filters(
			//		'FHEE__EE_Registration_Processor__trigger_registration_update_notifications__additional_conditions',
			//		array_merge(
			//		// defaults
			//			array(
			//				'checkout_or_payment' => false,
			//				'manually_updated' 		=> false,
			//				'payment_updates' 		=> false,
			//				//'status_updates' 			=> $this->reg_status_updated( $registration->ID() ),
			//				'finalized' 						=> false,
			//				'revisit' 							=> false,
			//				'reg_steps' 						=> $registration->transaction()->reg_steps(),
			//				'txn_status' 						=> $registration->transaction()->status_ID(),
			//				'last_payment'				=> null,
			//				'old_reg_status' 				=> $this->old_reg_status( $registration->ID() ),
			//				'new_reg_status' 			=> $this->new_reg_status( $registration->ID() )
			//			),
			//			$additional_details
			//		)
			//	)
			//);
			EE_Registry::instance()->load_helper( 'Debug_Tools' );
			EEH_Debug_Tools::log( __CLASS__, __FUNCTION__, __LINE__, array( $registration->transaction(), $additional_details ), false, 'EE_Transaction: ' . $registration->transaction()->ID() );
			do_action(
				'AHEE__EE_Registration_Processor__trigger_registration_update_notifications',
				$registration,
				$additional_details
			);

		} catch( Exception $e ) {
			EE_Error::add_error( $e->getMessage(), $e->getFile(), 'function_added_from_exception', $e->getLine() );
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
		$this->set_old_reg_status( $registration->ID(), $registration->status_ID() );

		// if the registration status gets updated, then save the registration
		if ( $this->toggle_registration_status_for_default_approved_events( $registration, false ) || $this->toggle_registration_status_if_no_monies_owing( $registration, false, $additional_details )) {
			$registration->save();
		}

		// set new  REG_Status
		$this->set_new_reg_status( $registration->ID(), $registration->status_ID() );
		return $this->reg_status_updated( $registration->ID() ) && $this->new_reg_status( $registration->ID() ) == EEM_Registration::status_id_approved ? true : false;
	}



}
// End of file EE_Registration_Processor.class.php
// Location: /core/business/EE_Registration_Processor.class.php

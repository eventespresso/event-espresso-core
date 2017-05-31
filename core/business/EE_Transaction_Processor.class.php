<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
EE_Registry::instance()->load_class( 'Processor_Base' );

/**
 * Class EE_Transaction_Processor
 * This class contains business logic pertaining specifically to
 * the interaction of EE_Transaction and EE_Registration model objects
 * Provides methods for manipulating and processing changes to an EE_Transaction
 * and it's related EE_Registrations with regards to the checkout/registration process

*
*@package     Event Espresso
 * @subpackage 	core
 * @author      Brent Christensen
 * @since       4.6.0
 */
class EE_Transaction_Processor extends EE_Processor_Base {

	/**
	 * 	@var EE_Registration_Processor $_instance
	 * 	@access 	private
	 */
	private static $_instance;

	/**
	 * array of query WHERE params to use when retrieving cached registrations from a transaction
	 *
	 * @var array $registration_query_params
	 * @access private
	 */
	private $_registration_query_params = array();

	/**
	 * @deprecated
	 * @var string
	 */
	protected $_old_txn_status;

	/**
	 * @deprecated
	 * @var string
	 */
	protected $_new_txn_status;



	/**
	 *@singleton method used to instantiate class object
	 *@access public
	 * @param array $registration_query_params
	 *@return EE_Transaction_Processor instance
	 */
	public static function instance( $registration_query_params = array() ) {
		// check if class object is instantiated
		if ( ! self::$_instance instanceof EE_Transaction_Processor ) {
			self::$_instance = new self( $registration_query_params );
		}
		return self::$_instance;
	}



	/**
	 * @param array $registration_query_params
	 */
	private function __construct( $registration_query_params = array() ) {
		// make sure some query params are set for retrieving registrations
		$this->_set_registration_query_params( $registration_query_params );
	}



	/**
	 * @access private
	 * @param array $registration_query_params
	 */
	private function _set_registration_query_params( $registration_query_params ) {
		$this->_registration_query_params = ! empty( $registration_query_params ) ? $registration_query_params : array( 'order_by' => array( 'REG_count' => 'ASC' ));
	}



	/**
	 * manually_update_registration_statuses
	 *
	 * @access public
	 * @param EE_Transaction $transaction
	 * @param string         $new_reg_status
	 * @param array          $registration_query_params array of query WHERE params to use
	 *                                                  when retrieving cached registrations from a transaction
	 * @return    boolean
	 * @throws \EE_Error
	 */
	public function manually_update_registration_statuses(
		EE_Transaction $transaction,
		$new_reg_status = '',
		$registration_query_params = array()
	) {
		$status_updates = $this->_call_method_on_registrations_via_Registration_Processor(
			'manually_update_registration_status',
			$transaction,
			$registration_query_params,
			$new_reg_status
		);
		// send messages
		/** @type EE_Registration_Processor $registration_processor */
		$registration_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
		$registration_processor->trigger_registration_update_notifications(
			$transaction->primary_registration(),
			array( 'manually_updated' 	=> true )
		);
		do_action(
			'AHEE__EE_Transaction_Processor__manually_update_registration_statuses',
			$transaction,
			$status_updates
		);
		return $status_updates;
	}



	/**
	 * toggle_registration_statuses_for_default_approved_events
	 *
	 * @access public
	 * @param EE_Transaction $transaction
	 * @param array          $registration_query_params array of query WHERE params to use
	 *                                                  when retrieving cached registrations from a transaction
	 * @return    boolean
	 * @throws \EE_Error
	 */
	public function toggle_registration_statuses_for_default_approved_events(
		EE_Transaction $transaction,
		$registration_query_params = array()
	) {
		$status_updates = $this->_call_method_on_registrations_via_Registration_Processor(
			'toggle_registration_status_for_default_approved_events',
			$transaction,
			$registration_query_params
		);
		do_action(
			'AHEE__EE_Transaction_Processor__toggle_registration_statuses_for_default_approved_events',
			$transaction,
			$status_updates
		);
		return $status_updates;
	}



	/**
	 * toggle_registration_statuses_if_no_monies_owing
	 *
	 * @access public
	 * @param EE_Transaction $transaction
	 * @param array          $registration_query_params array of query WHERE params to use
	 *                                                  when retrieving cached registrations from a transaction
	 * @return    boolean
	 * @throws \EE_Error
	 */
	public function toggle_registration_statuses_if_no_monies_owing(
		EE_Transaction $transaction,
		$registration_query_params = array()
	) {
		$status_updates = $this->_call_method_on_registrations_via_Registration_Processor(
			'toggle_registration_status_if_no_monies_owing',
			$transaction,
			$registration_query_params
		);
		do_action(
			'AHEE__EE_Transaction_Processor__toggle_registration_statuses_if_no_monies_owing',
			$transaction,
			$status_updates
		);
		return $status_updates;
	}



    /**
     * update_transaction_and_registrations_after_checkout_or_payment
     * cycles thru related registrations and calls update_registration_after_checkout_or_payment() on each
     *
     * @param EE_Transaction $transaction
     * @param \EE_Payment | NULL $payment
     * @param array              $registration_query_params    array of query WHERE params to use
     *                                                         when retrieving cached registrations from a transaction
     * @param bool $trigger_notifications                      whether or not to call
     *                                                         \EE_Registration_Processor::trigger_registration_update_notifications()
     * @return array
     * @throws \EE_Error
     */
	public function update_transaction_and_registrations_after_checkout_or_payment(
		EE_Transaction $transaction,
		$payment = null,
		$registration_query_params = array(),
        $trigger_notifications = true
	) {
		// make sure some query params are set for retrieving registrations
		$this->_set_registration_query_params( $registration_query_params );
		// get final reg step status
		$finalized = $transaction->final_reg_step_completed();
		// if the 'finalize_registration' step has been initiated (has a timestamp)
		// but has not yet been fully completed (TRUE)
		if ( is_int( $finalized ) && $finalized !== false && $finalized !== true ) {
			$transaction->set_reg_step_completed( 'finalize_registration' );
			$finalized = true;
		}
		$transaction->save();
		// array of details to aid in decision making by systems
		$update_params = array(
			'old_txn_status'  => $transaction->old_txn_status(),
			'new_txn_status'  => $transaction->status_ID(),
			'finalized'       => $finalized,
			'revisit'         => $this->_revisit,
			'payment_updates' => $payment instanceof EE_Payment ? true : false,
			'last_payment'    => $payment
		);
		// now update the registrations and add the results to our $update_params
		$update_params['status_updates'] = $this->_call_method_on_registrations_via_Registration_Processor(
			'update_registration_after_checkout_or_payment',
			$transaction,
			$this->_registration_query_params,
			$update_params
		);
		if ($trigger_notifications) {
            // send messages
            /** @type EE_Registration_Processor $registration_processor */
            $registration_processor = EE_Registry::instance()->load_class('Registration_Processor');
            $registration_processor->trigger_registration_update_notifications(
                $transaction->primary_registration(),
                $update_params
            );
        }
        do_action(
			'AHEE__EE_Transaction_Processor__update_transaction_and_registrations_after_checkout_or_payment',
			$transaction,
			$update_params
		);
		return $update_params;
	}



    /**
     * update_transaction_after_registration_reopened
     * readjusts TXN and Line Item totals after a registration is changed from
     * cancelled or declined to another reg status such as pending payment or approved
     *
     * @param \EE_Registration $registration
     * @param array            $closed_reg_statuses
     * @param bool             $update_txn
     * @return bool
     * @throws \EE_Error
     */
	public function update_transaction_after_reinstating_canceled_registration(
		EE_Registration $registration,
		$closed_reg_statuses = array(),
		$update_txn = true
	) {
		// these reg statuses should not be considered in any calculations involving monies owing
		$closed_reg_statuses = ! empty( $closed_reg_statuses ) ? $closed_reg_statuses : EEM_Registration::closed_reg_statuses();
		if ( in_array( $registration->status_ID(), $closed_reg_statuses, true ) ) {
			return false;
		}
		try {
			$transaction = $this->get_transaction_for_registration( $registration );
			$ticket_line_item = $this->get_ticket_line_item_for_transaction_registration(
				$transaction,
				$registration
			);
			// un-cancel the ticket
			$success = EEH_Line_Item::reinstate_canceled_ticket_line_item( $ticket_line_item );
		} catch ( EE_Error $e ) {
			EE_Error::add_error(
				sprintf(
					__( 'The Ticket Line Item for Registration %1$d could not be reinstated because :%2$s%3$s', 'event_espresso' ),
					$registration->ID(),
					'<br />',
					$e->getMessage()
				),
				__FILE__, __FUNCTION__, __LINE__
			);
			return false;
		}
		if ( $update_txn ) {
			return $transaction->save() ? $success : false;
		}
		return $success;
	}



	/**
	 * update_transaction_after_canceled_or_declined_registration
	 * readjusts TXN and Line Item totals after a registration is cancelled or declined
	 *
	 * @param \EE_Registration $registration
	 * @param array            $closed_reg_statuses
	 * @param bool             $update_txn
	 * @return bool
	 * @throws \EE_Error
	 */
	public function update_transaction_after_canceled_or_declined_registration(
		EE_Registration $registration,
		$closed_reg_statuses = array(),
		$update_txn = true
	) {
		// these reg statuses should not be considered in any calculations involving monies owing
		$closed_reg_statuses = ! empty( $closed_reg_statuses ) ? $closed_reg_statuses : EEM_Registration::closed_reg_statuses();
		if ( ! in_array( $registration->status_ID(), $closed_reg_statuses, true ) ) {
			return false;
		}
		try {
			$transaction = $this->get_transaction_for_registration( $registration );
			if (
			    apply_filters(
                    'FHEE__EE_Transaction_Processor__update_transaction_after_canceled_or_declined_registration__cancel_ticket_line_item',
                    true,
                    $registration,
                    $transaction
                )
            ){
                $ticket_line_item = $this->get_ticket_line_item_for_transaction_registration( $transaction, $registration );
                EEH_Line_Item::cancel_ticket_line_item( $ticket_line_item );
			}
		} catch ( EE_Error $e ) {
			EE_Error::add_error(
				sprintf(
					__( 'The Ticket Line Item for Registration %1$d could not be cancelled because :%2$s%3$s', 'event_espresso' ),
					$registration->ID(),
					'<br />',
					$e->getMessage()
				),
				__FILE__, __FUNCTION__, __LINE__
			);
			return false;
		}
		if ( $update_txn ) {
			return $transaction->save() ? true : false;
		}
		return true;
	}



	/**
	 * get_transaction_for_registration
	 *
	 * @access 	public
	 * @param 	EE_Registration $registration
	 * @return 	EE_Transaction
	 * @throws 	EE_Error
	 */
	public function get_transaction_for_registration( EE_Registration $registration ) {
		$transaction = $registration->transaction();
		if ( ! $transaction instanceof EE_Transaction ) {
			throw new EE_Error(
				sprintf(
					__( 'The Transaction for Registration %1$d was not found or is invalid.', 'event_espresso' ),
					$registration->ID()
				)
			);
		}
		return $transaction;
	}



	/**
	 * get_ticket_line_item_for_transaction_registration
	 *
	 * @access 	public
	 * @param 	EE_Transaction  $transaction
	 * @param 	EE_Registration $registration
	 * @return 	EE_Line_Item
	 * @throws 	EE_Error
	 */
	public function get_ticket_line_item_for_transaction_registration(
		EE_Transaction $transaction,
		EE_Registration $registration
	) {
		EE_Registry::instance()->load_helper( 'Line_Item' );
		$ticket_line_item = EEM_Line_Item::instance()->get_ticket_line_item_for_transaction(
			$transaction->ID(),
			$registration->ticket_ID()
		);
		if ( ! $ticket_line_item instanceof EE_Line_Item ) {
			throw new EE_Error(
				sprintf(
					__( 'The Line Item for Transaction %1$d and Ticket %2$d was not found or is invalid.',
						'event_espresso' ),
					$transaction->ID(),
					$registration->ticket_ID()
				)
			);
		}
		return $ticket_line_item;
	}



	/**
	 * cancel_transaction_if_all_registrations_canceled
	 * cycles thru related registrations and checks their statuses
	 * if ALL registrations are Cancelled or Declined, then this sets the TXN status to
	 *
	 * @access 	public
	 * @param 	EE_Transaction 	$transaction
	 * @param 	string 			$new_TXN_status
	 * @param 	array          	$registration_query_params - array of query WHERE params to use when
	 *                                                     retrieving cached registrations from a transaction
	 * @param 	array          	$closed_reg_statuses
	 * @param 	bool 			$update_txn
	 * @return 	bool 			true if TXN status was updated, false if not
	 */
	public function toggle_transaction_status_if_all_registrations_canceled_or_declined(
		EE_Transaction $transaction,
		$new_TXN_status = '',
		$registration_query_params = array(),
		$closed_reg_statuses = array(),
		$update_txn = true
	) {
		// make sure some query params are set for retrieving registrations
		$this->_set_registration_query_params( $registration_query_params );
		// these reg statuses should not be considered in any calculations involving monies owing
		$closed_reg_statuses = ! empty( $closed_reg_statuses ) ? $closed_reg_statuses : EEM_Registration::closed_reg_statuses();
		// loop through cached registrations
		foreach ( $transaction->registrations( $this->_registration_query_params ) as $registration ) {
			if (
				$registration instanceof EE_Registration
				&& ! in_array( $registration->status_ID(), $closed_reg_statuses )
			) {
				return false;
			}
		}
		if ( in_array( $new_TXN_status, EEM_Transaction::txn_status_array() ) ) {
			$transaction->set_status( $new_TXN_status );
		}
		if ( $update_txn ) {
			return $transaction->save() ? true : false;
		}
		return true;
	}



	/**
	 * _call_method_on_registrations_via_Registration_Processor
	 * cycles thru related registrations and calls the requested method on each
	 *
	 * @access private
	 * @param string 		$method_name
	 * @param EE_Transaction $transaction
	 * @param array          $registration_query_params array of query WHERE params to use
	 *                                                  when retrieving cached registrations from a transaction
	 * @param string 	$additional_param
	 * @throws \EE_Error
	 * @return boolean
	 */
	private function _call_method_on_registrations_via_Registration_Processor(
		$method_name,
		EE_Transaction $transaction,
		$registration_query_params = array(),
		$additional_param = null
	) {
		$response = false;
		/** @type EE_Registration_Processor $registration_processor */
		$registration_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
		// check that method exists
		if ( ! method_exists( $registration_processor, $method_name )) {
			throw new EE_Error( __( 'Method does not exist.', 'event_espresso' ));
		}
		// make sure some query params are set for retrieving registrations
		$this->_set_registration_query_params( $registration_query_params );
		// loop through cached registrations
		foreach ( $transaction->registrations( $this->_registration_query_params ) as $registration ) {
			if ( $registration instanceof EE_Registration ) {
				if ( $additional_param ) {
					$response = $registration_processor->{$method_name}( $registration, $additional_param )
						? true
						: $response;
				} else {
					$response = $registration_processor->{$method_name}( $registration )
						? true
						: $response;
				}
			}
		}
		return $response;
	}



	/**
	 * set_transaction_payment_method_based_on_registration_statuses
	 * sets or unsets the PMD_ID field on the TXN based on the related REG statuses
	 * basically if ALL Registrations are "Not Approved", then the EE_Transaction.PMD_ID is set to null,
	 * but if any Registration has a different status, then EE_Transaction.PMD_ID is set to either:
	 *        the first "default" Payment Method
	 *        the first active Payment Method
	 *    whichever is found first.
	 *
	 * @param  EE_Registration $edited_registration
	 * @return void
	 * @throws \EE_Error
	 */
	public function set_transaction_payment_method_based_on_registration_statuses(
		EE_Registration $edited_registration
	) {
		if ( $edited_registration instanceof EE_Registration ) {
			$transaction = $edited_registration->transaction();
			if ( $transaction instanceof EE_Transaction ) {
				$all_not_approved = true;
				foreach ( $transaction->registrations() as $registration ) {
					if ( $registration instanceof EE_Registration ) {
						// if any REG != "Not Approved" then toggle to false
						$all_not_approved = $registration->is_not_approved() ? $all_not_approved : false;
					}
				}
				// if ALL Registrations are "Not Approved"
				if ( $all_not_approved ) {
					$transaction->set_payment_method_ID( null );
					$transaction->save();
				} else {
					$available_payment_methods = EEM_Payment_Method::instance()->get_all_for_transaction(
						$transaction,
						EEM_Payment_Method::scope_cart
					);
					if ( ! empty( $available_payment_methods ) ) {
						$PMD_ID = 0;
						foreach ( $available_payment_methods as $available_payment_method ) {
							if (
								$available_payment_method instanceof EE_Payment_Method
							    && $available_payment_method->open_by_default()
							) {
								$PMD_ID = $available_payment_method->ID();
								break;
							}
						}
						if ( ! $PMD_ID ) {
							$first_payment_method = reset( $available_payment_methods );
							if ( $first_payment_method instanceof EE_Payment_Method ) {
								$PMD_ID = $first_payment_method->ID();
							} else {
								EE_Error::add_error(
									__( 'A valid Payment Method could not be determined. Please ensure that at least one Payment Method is activated.', 'event_espresso' ),
									__FILE__, __LINE__, __FUNCTION__
								);
							}
						}
						$transaction->set_payment_method_ID( $PMD_ID );
						$transaction->save();
					} else {
						EE_Error::add_error(
							__( 'Please activate at least one Payment Method in order for things to operate correctly.', 'event_espresso' ),
							__FILE__, __LINE__, __FUNCTION__
						);
					}
				}
			}
		}
	}



	/********************************** DEPRECATED METHODS **********************************/



	/**
	 * @deprecated 4.9.12
	 * @return string
	 */
	public function old_txn_status() {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been moved into \EE_Transaction::old_txn_status(), please use that method instead.',
				'event_espresso'
			),
			'4.9.12'
		);
		return $this->_old_txn_status;
	}



	/**
	 * @deprecated 4.9.12
	 * @param string $old_txn_status
	 */
	public function set_old_txn_status( $old_txn_status ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been moved into \EE_Transaction::set_old_txn_status(), please use that method instead.',
				'event_espresso'
			),
			'4.9.12'
		);
		// only set the first time
		if ( $this->_old_txn_status === null ) {
			$this->_old_txn_status = $old_txn_status;
		}
	}



	/**
	 * @deprecated 4.9.12
	 * @return string
	 */
	public function new_txn_status() {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been removed. Please just use \EE_Transaction::status_ID() instead.',
				'event_espresso'
			),
			'4.9.12'
		);
		return $this->_new_txn_status;
	}



	/**
	 * @deprecated 4.9.12
	 * @param string $new_txn_status
	 */
	public function set_new_txn_status( $new_txn_status ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been removed. Please just use \EE_Transaction::set_status() instead.',
				'event_espresso'
			),
			'4.9.12'
		);
		$this->_new_txn_status = $new_txn_status;
	}



	/**
	 * reg_status_updated
	 *
	 * @deprecated 4.9.12
	 * @return bool
	 */
	public function txn_status_updated() {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been moved into \EE_Transaction::txn_status_updated(), please use that method instead.',
				'event_espresso'
			),
			'4.9.12'
		);
		return $this->_new_txn_status !== $this->_old_txn_status && $this->_old_txn_status !== null ? true : false;
	}



	/**
	 * all_reg_steps_completed
	 * returns:
	 *    true if ALL reg steps have been marked as completed
	 *        or false if any step is not completed
	 *
	 * @deprecated 4.9.12
	 * @param EE_Transaction $transaction
	 * @return boolean
	 */
	public function all_reg_steps_completed( EE_Transaction $transaction ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been moved into \EE_Transaction::all_reg_steps_completed(), please use that method instead.',
				'event_espresso'
			),
			'4.9.12',
			'5.0.0'
		);
		return $transaction->all_reg_steps_completed();
	}



	/**
	 * all_reg_steps_completed_except
	 * returns:
	 *        true if ALL reg steps, except a particular step that you wish to skip over, have been marked as completed
	 *        or false if any other step is not completed
	 *        or false if ALL steps are completed including the exception you are testing !!!
	 *
	 * @deprecated 4.9.12
	 * @param EE_Transaction $transaction
	 * @param string         $exception
	 * @return boolean
	 */
	public function all_reg_steps_completed_except( EE_Transaction $transaction, $exception = '' ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been moved into \EE_Transaction::all_reg_steps_completed_except(), please use that method instead.',
				'event_espresso'
			),
			'4.9.12',
			'5.0.0'
		);
		return $transaction->all_reg_steps_completed_except( $exception );
	}



	/**
	 * all_reg_steps_completed_except
	 * returns:
	 *        true if ALL reg steps, except the final step, have been marked as completed
	 *        or false if any step is not completed
	 *    or false if ALL steps are completed including the final step !!!
	 *
	 * @deprecated 4.9.12
	 * @param EE_Transaction $transaction
	 * @return boolean
	 */
	public function all_reg_steps_completed_except_final_step( EE_Transaction $transaction ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been moved into \EE_Transaction::all_reg_steps_completed_except_final_step(), please use that method instead.',
				'event_espresso'
			),
			'4.9.12',
			'5.0.0'
		);
		return $transaction->all_reg_steps_completed_except_final_step();
	}



	/**
	 * reg_step_completed
	 * returns:
	 *    true if a specific reg step has been marked as completed
	 *    a Unix timestamp if it has been initialized but not yet completed,
	 *    or false if it has not yet been initialized
	 *
	 * @deprecated 4.9.12
	 * @param EE_Transaction $transaction
	 * @param string         $reg_step_slug
	 * @return boolean | int
	 */
	public function reg_step_completed( EE_Transaction $transaction, $reg_step_slug ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been moved into \EE_Transaction::reg_step_completed(), please use that method instead.',
				'event_espresso'
			),
			'4.9.12',
			'5.0.0'
		);
		return $transaction->reg_step_completed( $reg_step_slug );
	}



	/**
	 * completed_final_reg_step
	 * returns:
	 *    true if the finalize_registration reg step has been marked as completed
	 *    a Unix timestamp if it has been initialized but not yet completed,
	 *    or false if it has not yet been initialized
	 *
	 * @deprecated 4.9.12
	 * @param EE_Transaction $transaction
	 * @return boolean | int
	 */
	public function final_reg_step_completed( EE_Transaction $transaction ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been moved into \EE_Transaction::final_reg_step_completed(), please use that method instead.',
				'event_espresso'
			),
			'4.9.12',
			'5.0.0'
		);
		return $transaction->final_reg_step_completed();
	}



	/**
	 * set_reg_step_initiated
	 * given a valid TXN_reg_step, this sets it's value to a unix timestamp
	 *
	 * @deprecated 4.9.12
	 * @access public
	 * @param \EE_Transaction $transaction
	 * @param string          $reg_step_slug
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function set_reg_step_initiated( EE_Transaction $transaction, $reg_step_slug ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been moved into \EE_Transaction::set_reg_step_initiated(), please use that method instead.',
				'event_espresso'
			),
			'4.9.12',
			'5.0.0'
		);
		return $transaction->set_reg_step_initiated( $reg_step_slug );
	}



	/**
	 * set_reg_step_completed
	 * given a valid TXN_reg_step, this sets the step as completed
	 *
	 * @deprecated 4.9.12
	 * @access public
	 * @param \EE_Transaction $transaction
	 * @param string          $reg_step_slug
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function set_reg_step_completed( EE_Transaction $transaction, $reg_step_slug ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been moved into \EE_Transaction::set_reg_step_completed(), please use that method instead.',
				'event_espresso'
			),
			'4.9.12',
			'5.0.0'
		);
		return $transaction->set_reg_step_completed( $reg_step_slug );
	}



	/**
	 * set_reg_step_completed
	 * given a valid TXN_reg_step slug, this sets the step as NOT completed
	 *
	 * @deprecated 4.9.12
	 * @access public
	 * @param \EE_Transaction $transaction
	 * @param string          $reg_step_slug
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function set_reg_step_not_completed( EE_Transaction $transaction, $reg_step_slug ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been moved into \EE_Transaction::set_reg_step_not_completed(), please use that method instead.',
				'event_espresso'
			),
			'4.9.12',
			'5.0.0'
		);
		return $transaction->set_reg_step_not_completed( $reg_step_slug );
	}




	/**
	 * remove_reg_step
	 * given a valid TXN_reg_step slug, this will remove (unset)
	 * the reg step from the TXN reg step array
	 *
	 * @deprecated 4.9.12
	 * @access public
	 * @param \EE_Transaction $transaction
	 * @param string          $reg_step_slug
	 * @return void
	 */
	public function remove_reg_step( EE_Transaction $transaction, $reg_step_slug ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been moved into \EE_Transaction::remove_reg_step(), please use that method instead.',
				'event_espresso'
			),
			'4.9.12',
			'5.0.0'
		);
		$transaction->remove_reg_step( $reg_step_slug );
	}



	/**
	 *    toggle_failed_transaction_status
	 * upgrades a TXNs status from failed to abandoned,
	 * meaning that contact information has been captured for at least one registrant
	 *
	 * @deprecated 4.9.12
	 * @access public
	 * @param EE_Transaction $transaction
	 * @return    boolean
	 * @throws \EE_Error
	 */
	public function toggle_failed_transaction_status( EE_Transaction $transaction ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been moved into \EE_Transaction::toggle_failed_transaction_status(), please use that method instead.',
				'event_espresso'
			),
			'4.9.12',
			'5.0.0'
		);
		return $transaction->toggle_failed_transaction_status();
	}



	/**
	 * toggle_abandoned_transaction_status
	 * upgrades a TXNs status from failed or abandoned to incomplete
	 *
	 * @deprecated 4.9.12
	 * @access public
	 * @param  EE_Transaction $transaction
	 * @return boolean
	 */
	public function toggle_abandoned_transaction_status( EE_Transaction $transaction ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			esc_html__(
				'This logic has been moved into \EE_Transaction::toggle_abandoned_transaction_status(), please use that method instead.',
				'event_espresso'
			),
			'4.9.12',
			'5.0.0'
		);
		return $transaction->toggle_abandoned_transaction_status();
	}



}
// End of file EE_Transaction_Processor.class.php
// Location: /EE_Transaction_Processor.class.php

<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EED_Ticket_Sales_Monitor
 *
 * ensures that tickets can not be added to the cart if they have sold out
 * in the time since the page with the ticket selector was first viewed
 *
 * @package               Event Espresso
 * @subpackage 		modules
 * @author                Brent Christensen
 * @since                 4.8.6
 *
 */
class EED_Ticket_Sales_Monitor extends EED_Module {

	/**
	 * an array of raw ticket data from EED_Ticket_Selector
	 *
	 * @var array $ticket_selections
	 */
	protected $ticket_selections = array();

	/**
	 * the raw ticket data from EED_Ticket_Selector is organized in rows
	 * according to how they are displayed in the actual Ticket_Selector
	 * this tracks the current row being processed
	 *
	 * @var int $current_row
	 */
	protected $current_row = 0;

	/**
	 * an array for monitoring "in progress" ticket sales
	 * where the key is the ticket ID and the value is the number of reserved tickets
	 *
	 * @var array $ticket_reserves
	 */
	protected $ticket_reserves = array();

	/**
	 * an array for tracking names of tickets that have sold out
	 *
	 * @var array $sold_out_tickets
	 */
	protected $sold_out_tickets = array();



	/**
	 *    set_hooks - for hooking into EE Core, other modules, etc
	 *
	 * @access    public
	 * @return    void
	 */
	public static function set_hooks() {
		add_filter(
			'FHEE__EED_Ticket_Selector__process_ticket_selections__valid_post_data',
			array( 'EED_Ticket_Sales_Monitor', 'validate_ticket_sales' ),
			10, 1
		);
		add_action(
			'AHEE__EE_Session__reset_checkout__before_reset',
			array( 'EED_Ticket_Sales_Monitor', 'session_checkout_reset' ),
			10, 1
		);
		add_action(
			'AHEE__EE_Cron_Tasks__finalize_abandoned_transactions__after_status_update_based_on_total_paid',
			array( 'EED_Ticket_Sales_Monitor', 'process_abandoned_transactions' ),
			10, 1
		);
		add_filter(
			'FHEE__EE_Cron_Tasks__process_expired_transactions__failed_transaction',
			array( 'EED_Ticket_Sales_Monitor', 'process_failed_transactions' ),
			10, 1
		);
	}



	/**
	 *    set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 * @access    public
	 * @return    void
	 */
	public static function set_hooks_admin() {
	}



	/**
	 * @return EED_Ticket_Sales_Monitor
	 */
	public static function instance() {
		return parent::get_instance( __CLASS__ );
	}



	/**
	 *    run
	 *
	 * @access    public
	 * @param WP_Query $WP_Query
	 * @return    void
	 */
	public function run( $WP_Query ) {
	}



	/********************************** VALIDATE_TICKET_SALES  **********************************/



	/**
	 *    validate_ticket_sales
	 *
	 * @access 	public
	 * @param 	array $valid
	 * @return 	array
	 */
	public static function validate_ticket_sales( $valid ) {
		return EED_Ticket_Sales_Monitor::instance()->_validate_ticket_sales( $valid );
	}



	/**
	 *    _validate_ticket_sales
	 *
	 * @access    protected
	 * @param 	array $valid
	 * @return 	array
	 * @throws \EE_Error
	 */
	protected function _validate_ticket_sales( $valid ) {
		//echo '<h3 style="color:#999;line-height:.9em;"><span style="color:#2EA2CC">' . __CLASS__ . '</span>::<span style="color:#E76700">' . __FUNCTION__ . '()</span><br/><span style="font-size:9px;font-weight:normal;">' . __FILE__ . '</span>    <b style="font-size:10px;">  ' . __LINE__ . ' </b></h3>';
		if ( ! isset( $valid[ 'id' ], $valid[ 'total_tickets' ], $valid[ 'rows' ], $valid[ 'qty' ], $valid[ 'ticket_obj' ] )) {
			EE_Error::add_error(
				__( 'Ticket selections could not be processed because the ticket information was missing or invalid.', 'event_espresso' ),
				__FILE__, __FUNCTION__, __LINE__
			);
			$valid[ 'rows' ] = 0;
			add_filter( 'FHEE__EED_Ticket_Selector__process_ticket_selections__tckts_slctd', '__return_true' );
			add_filter( 'FHEE__EED_Ticket_Selector__process_ticket_selections__success', '__return_false' );
			return $valid;
		}
		$this->ticket_selections = $valid;
		for ( $this->current_row = 0; $this->current_row < $this->ticket_selections[ 'rows' ]; $this->current_row++ ) {
			//echo "<br/><br/> this->current_row: " . $this->current_row;
			$this->_validate_ticket_sale( $this->ticket_selections[ 'ticket_obj' ][ $this->current_row ] );
		}
		if ( ! empty( $this->sold_out_tickets )) {
			EE_Error::add_attention(
				sprintf(
					apply_filters(
						'FHEE__EED_Ticket_Sales_Monitor___validate_ticket_sales__sold_out_tickets_notice',
						__( 'We\'re sorry...%1$sThe following tickets have sold out since you first viewed this page, and can no longer be registered for:%1$s%1$s%2$s%1$s%1$sPlease note that ticket availability can change at any time due to cancellations, so please check back again later if registration for these events is important to you.', 'event_espresso' )
					),
					'<br />',
					implode( '<br />', $this->sold_out_tickets )
				)
			);
		}
		if ( $this->ticket_selections[ 'total_tickets' ] == 0 ) {
			add_filter( 'FHEE__EED_Ticket_Selector__process_ticket_selections__tckts_slctd', '__return_true' );
			add_filter( 'FHEE__EED_Ticket_Selector__process_ticket_selections__success', '__return_false' );
		}
		return $this->ticket_selections;
	}



	/**
	 *    _validate_ticket_sale
	 *
	 * @access    protected
	 * @param   \EE_Registration $ticket
	 * @return    void
	 */
	protected function _validate_ticket_sale( $ticket ) {
		//echo '<h3 style="color:#999;line-height:.9em;"><span style="color:#2EA2CC">' . __CLASS__ . '</span>::<span style="color:#E76700">' . __FUNCTION__ . '()</span><br/><span style="font-size:9px;font-weight:normal;">' . __FILE__ . '</span>    <b style="font-size:10px;">  ' . __LINE__ . ' </b></h3>';
		if ( ! $ticket instanceof EE_Ticket ) {
			return;
		}
		//echo "\n . . . original ticket->reserved: " . $ticket->reserved() . '<br />';
		$ticket->refresh_from_db();
		// first let's determine the ticket availability based on sales
		//echo "\n . ticket->ID: " . $ticket->ID() . '<br />';
		$available = $ticket->qty() - $ticket->sold() - $ticket->reserved();
		//echo "\n . . . ticket->qty: " . $ticket->qty() . '<br />';
		//echo "\n . . . ticket->sold: " . $ticket->sold() . '<br />';
		//echo "\n . . . ticket->reserved: " . $ticket->reserved() . '<br />';
		//echo "\n . . . available: " . $available . '<br />';
		if ( $available < 1 ) {
			$this->_ticket_sold_out( $ticket );
			return;
		}
		$datetimes = $ticket->datetimes();
		if ( ! empty( $datetimes ) ) {
			foreach ( $datetimes as $datetime ) {
				if ( $datetime instanceof EE_Datetime ) {
					$datetime->refresh_from_db();
					$available = $this->_get_datetime_availability( $datetime, $ticket );
					//echo "\n . . . FINAL AVAILABLE: " . $available . '<br />';
					if ( $available < 1 ) {
						$this->_ticket_sold_out( $ticket );
						continue;
					}
					$qty = $this->ticket_selections[ 'qty' ][ $this->current_row ];
					//echo "\n . . . qty: " . $qty . '<br />';
					if ( $available < $qty ) {
						$qty = $available;
						//echo "\n . . . QTY ADJUSTED: " . $qty . '<br />';
						$this->_ticket_quantity_decremented( $ticket, $qty );
					}
					//echo "\n\n . . . INCREASE RESERVED: " . $qty;
					$ticket->increase_reserved( $qty );
					$ticket->save();
				}
			}
		}
		return;
	}



	/**
	 *    _process_event_data
	 *
	 * @access 	protected
	 * @param 	\EE_Datetime $datetime
	 * @param 	\EE_Ticket    $ticket
	 * @return 	int
	 */
	protected function _get_datetime_availability( EE_Datetime $datetime, EE_Ticket $ticket ) {
		//echo '<h3 style="color:#999;line-height:.9em;"><span style="color:#2EA2CC">' . __CLASS__ . '</span>::<span style="color:#E76700">' . __FUNCTION__ . '()</span><br/><span style="font-size:9px;font-weight:normal;">' . __FILE__ . '</span>    <b style="font-size:10px;">  ' . __LINE__ . ' </b></h3>';
		//echo "\n . . datetime->ID: " . $datetime->ID() . '<br />';
		// don't track datetimes with unlimited reg limits
		if ( $datetime->reg_limit() < 0 ) {
			return false;
		}
		// now let's determine ticket availability based on ALL sales for the datetime
		// because multiple tickets can apply to the same datetime,
		// so the tickets themselves may not be sold out, but the datetime may be
		// ex: 20 seats are available for a dinner where the choice of ticket is your meal preference...
		// you could get 20 people wanting chicken or 20 people wanting steak, you don't know...
		// so you have to set each ticket quantity to the maximum number of seats, which is 20,
		// but we don't want 40 people showing up, only 20, so we can't go by ticket quantity alone
		$available = $datetime->reg_limit() - $datetime->sold();
		//echo "\n . . . available: " . $available . '<br />';
		//echo "\n . . . datetime->reg_limit: " . $datetime->reg_limit() . '<br />';
		//echo "\n . . . datetime->sold: " . $datetime->sold() . '<br />';
		// we also need to factor reserved quantities for ALL tickets into this equation
		$all_tickets = $datetime->tickets();
		foreach ( $all_tickets as $one_of_many_tickets ) {
			//echo "\n . . . ticket->reserved: " . $ticket->reserved() . '<br />';
			$available = $available - $one_of_many_tickets->reserved();
		}
		return $available;
	}



	/**
	 *    _ticket_sold_out
	 *
	 * @access 	protected
	 * @param 	\EE_Ticket   $ticket
	 * @return 	bool
	 * @throws \EE_Error
	 */
	protected function _ticket_sold_out( EE_Ticket $ticket ) {
		//echo '<h3 style="color:#999;line-height:.9em;"><span style="color:#2EA2CC">' . __CLASS__ . '</span>::<span style="color:#E76700">' . __FUNCTION__ . '()</span><br/><span style="font-size:9px;font-weight:normal;">' . __FILE__ . '</span>    <b style="font-size:10px;">  ' . __LINE__ . ' </b></h3>';
		// make sure ticket quantity wasn't already zero before doing anything
		if ( $this->ticket_selections[ 'qty' ][ $this->current_row ] > 0 ) {
			unset( $this->ticket_selections[ 'ticket_obj' ][ $this->current_row ] );
			$this->ticket_selections[ 'total_tickets' ] = $this->ticket_selections[ 'total_tickets' ] - $this->ticket_selections[ 'qty' ][ $this->current_row ];
			$this->ticket_selections[ 'qty' ][ $this->current_row ] = 0;
			$this->sold_out_tickets[] = $ticket->name();
		}
	}



	/**
	 *    _ticket_quantity_decremented
	 *
	 * @access 	protected
	 * @param 	\EE_Ticket   $ticket
	 * @return 	bool
	 * @throws \EE_Error
	 */
	protected function _ticket_quantity_decremented( EE_Ticket $ticket, $qty = 1 ) {
		//echo '<h3 style="color:#999;line-height:.9em;"><span style="color:#2EA2CC">' . __CLASS__ . '</span>::<span style="color:#E76700">' . __FUNCTION__ . '()</span><br/><span style="font-size:9px;font-weight:normal;">' . __FILE__ . '</span>    <b style="font-size:10px;">  ' . __LINE__ . ' </b></h3>';
		// subtract the difference between what they requested and what they are actually getting
		$this->ticket_selections[ 'total_tickets' ] = $this->ticket_selections[ 'total_tickets' ] - ( $this->ticket_selections[ 'qty' ][ $this->current_row ] - $qty );
		$this->ticket_selections[ 'qty' ][ $this->current_row ] = $qty;
		//EEH_Debug_Tools::printr( $this->ticket_selections[ 'qty' ][ $this->current_row ], '$this->ticket_selections[ qty ][ $this->current_row ]', __FILE__, __LINE__ );
		EE_Error::add_attention(
			sprintf(
				apply_filters(
					'FHEE__EED_Ticket_Sales_Monitor___ticket_quantity_decremented__notice',
					__( 'We\'re sorry...%1$sThe ticket quantity for %2$s has been adjusted to match the current available amount due to sales that have occurred since you first viewed this page:', 'event_espresso' )
				),
				'<br />',
				$ticket->name()
			)
		);
	}



	/********************************** SESSION_CHECKOUT_RESET  **********************************/



	/**
	 *    session_checkout_reset
	 *
	 * @access    public
	 * @param    EE_Session $session
	 * @return    void
	 */
	public static function session_checkout_reset( EE_Session $session ) {
		$checkout = $session->checkout();
		if ( $checkout instanceof EE_Checkout ) {
			EED_Ticket_Sales_Monitor::instance()->_session_checkout_reset( $checkout );
		}
	}



	/**
	 *    session_checkout_reset
	 *
	 * @access    protected
	 * @param    EE_Checkout $checkout
	 * @return    void
	 */
	protected function _session_checkout_reset( EE_Checkout $checkout ) {
		//echo '<h3 style="color:#999;line-height:.9em;"><span style="color:#2EA2CC">' . __CLASS__ . '</span>::<span style="color:#E76700">' . __FUNCTION__ . '()</span><br/><span style="font-size:9px;font-weight:normal;">' . __FILE__ . '</span>    <b style="font-size:10px;">  ' . __LINE__ . ' </b></h3>';
		if ( ! $checkout->transaction instanceof EE_Transaction ) {
			return;
		}
		$this->_release_all_reserved_tickets_for_transaction( $checkout->transaction );
	}



	/**
	 *    session_checkout_reset
	 *
	 * @access    protected
	 * @param    EE_Transaction $transaction
	 * @return    void
	 */
	protected function _release_all_reserved_tickets_for_transaction( EE_Transaction $transaction ) {
		//echo '<h3 style="color:#999;line-height:.9em;"><span style="color:#2EA2CC">' . __CLASS__ . '</span>::<span style="color:#E76700">' . __FUNCTION__ . '()</span><br/><span style="font-size:9px;font-weight:normal;">' . __FILE__ . '</span>    <b style="font-size:10px;">  ' . __LINE__ . ' </b></h3>';
		//echo "\n . transaction->ID: " . $transaction->ID() . '<br />';
		/** @type EE_Transaction_Processor $transaction_processor */
		$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
		// check if 'finalize_registration' step has been completed...
		$finalized = $transaction_processor->reg_step_completed( $transaction, 'finalize_registration' );
		// if the session is getting cleared BEFORE the TXN has been finalized
		if ( ! $finalized ) {
			// let's cancel any reserved tickets
			$registrations = $transaction->registrations();
			if ( ! empty( $registrations ) ) {
				foreach ( $registrations as $registration ) {
					if ( $registration instanceof EE_Registration ) {
						//echo "\n . . registration->ID: " . $registration->ID() . '<br />';
						$ticket = $registration->ticket();
						if ( $ticket instanceof EE_Ticket ) {
							//echo "\n . . . ticket->ID: " . $ticket->ID() . '<br />';
							//echo "\n . . . ticket->reserved: " . $ticket->reserved() . '<br />';
							$ticket->decrease_reserved();
							$ticket->save();
							//echo "\n . . . ticket->reserved: " . $ticket->reserved() . '<br />';
						}
					}
				}
			}
		}
	}


	/********************************** PROCESS_ABANDONED_TRANSACTIONS  **********************************/



	/**
	 *    process_abandoned_transactions
	 *
	 * @access    public
	 * @param    EE_Transaction $transaction
	 * @return    void
	 */
	public static function process_abandoned_transactions( EE_Transaction $transaction ) {
		// has any money been paid towards this TXN? If so, then leave it alone
		$payments = $transaction->payments();
		if ( $transaction->is_free() || $transaction->paid() > 0 || ! empty( $payments ) ) {
			return;
		}
		// since you haven't even attempted to pay for your ticket...
		EED_Ticket_Sales_Monitor::instance()->_release_all_reserved_tickets_for_transaction( $transaction );
	}



	/********************************** PROCESS_FAILED_TRANSACTIONS  **********************************/



	/**
	 *    process_failed_transactions
	 *
	 * @access    public
	 * @param    EE_Transaction $transaction
	 * @return    void
	 */
	public static function process_failed_transactions( EE_Transaction $transaction ) {
		// since you haven't even attempted to pay for your ticket...
		EED_Ticket_Sales_Monitor::instance()->_release_all_reserved_tickets_for_transaction( $transaction );
	}





}
// End of file EED_Ticket_Sales_Monitor.module.php
// Location: /modules/ticket_sales_monitor/EED_Ticket_Sales_Monitor.module.php
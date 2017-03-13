<?php use EventEspresso\core\exceptions\EntityNotFoundException;

if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * EE_Registration class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Registration.class.php
 * @author 				Mike Nelson, Brent Christensen
 */
class EE_Registration extends EE_Soft_Delete_Base_Class implements EEI_Registration, EEI_Admin_Links {


	/**
	 * Used to reference when a registration has never been checked in.
	 * @type int
	 */
	const checkin_status_never = 2;

	/**
	 * Used to reference when a registration has been checked in.
	 * @type int
	 */
	const checkin_status_in = 1;


	/**
	 * Used to reference when a registration has been checked out.
	 * @type int
	 */
	const checkin_status_out = 0;


	/**
	 * extra meta key for tracking reg status os trashed registrations
     *
	 * @type string
	 */
	const PRE_TRASH_REG_STATUS_KEY = 'pre_trash_registration_status';


	/**
	 * extra meta key for tracking if registration has reserved ticket
     *
	 * @type string
	 */
	const HAS_RESERVED_TICKET_KEY = 'has_reserved_ticket';



	/**
	 *
	 * @param array $props_n_values  incoming values
	 * @param string $timezone  incoming timezone (if not set the timezone set for the website will be
	 *                          		used.)
	 * @param array $date_formats  incoming date_formats in an array where the first value is the
	 *                             		    date_format and the second value is the time format
	 * @return EE_Registration
	 */
	public static function new_instance( $props_n_values = array(), $timezone = null, $date_formats = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__, $timezone, $date_formats );
		return $has_object ? $has_object : new self( $props_n_values, false, $timezone, $date_formats );
	}



	/**
	 * @param array $props_n_values  incoming values from the database
	 * @param string $timezone  incoming timezone as set by the model.  If not set the timezone for
	 *                          		the website will be used.
	 * @return EE_Registration
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = null ) {
		return new self( $props_n_values, TRUE, $timezone );
	}



	/**
	 *        Set Event ID
	 *
	 * @param        int $EVT_ID Event ID
	 */
	public function set_event( $EVT_ID = 0 ) {
		$this->set( 'EVT_ID', $EVT_ID );
	}



    /**
     * Overrides parent set() method so that all calls to set( 'REG_code', $REG_code ) OR set( 'STS_ID', $STS_ID ) can be routed to internal methods
     *
     * @param string $field_name
     * @param mixed  $field_value
     * @param bool   $use_default
     * @throws \EE_Error
     * @throws \RuntimeException
     */
	public function set( $field_name, $field_value, $use_default = FALSE ) {
		switch( $field_name ) {
			case 'REG_code' :
				if ( ! empty( $field_value ) && $this->reg_code() === null ) {
					$this->set_reg_code( $field_value, $use_default );
				}
				break;
			case 'STS_ID' :
				$this->set_status( $field_value, $use_default );
				break;
			default :
				parent::set( $field_name, $field_value, $use_default );
		}
	}



    /**
     * Set Status ID
     * updates the registration status and ALSO...
     * calls reserve_registration_space() if the reg status changes TO approved from any other reg status
     * calls release_registration_space() if the reg status changes FROM approved to any other reg status
     *
     * @param string  $new_STS_ID
     * @param boolean $use_default
     * @return bool
     * @throws \RuntimeException
     * @throws \EE_Error
     */
	public function set_status( $new_STS_ID = NULL, $use_default = FALSE ) {
		// get current REG_Status
		$old_STS_ID = $this->status_ID();
		// if status has changed
		if (
			$old_STS_ID !== $new_STS_ID // and that status has actually changed
			&& ! empty( $old_STS_ID ) // and that old status is actually set
			&& ! empty( $new_STS_ID ) // as well as the new status
			&& $this->ID() // ensure registration is in the db
		) {
            // TO approved
			if ( $new_STS_ID === EEM_Registration::status_id_approved ) {
				// reserve a space by incrementing ticket and datetime sold values
				$this->_reserve_registration_space();
				do_action( 'AHEE__EE_Registration__set_status__to_approved', $this, $old_STS_ID, $new_STS_ID );
			// OR FROM  approved
			} else if ( $old_STS_ID === EEM_Registration::status_id_approved ) {
				// release a space by decrementing ticket and datetime sold values
				$this->_release_registration_space();
				do_action( 'AHEE__EE_Registration__set_status__from_approved', $this, $old_STS_ID, $new_STS_ID );
			}
            // update status
            parent::set('STS_ID', $new_STS_ID, $use_default);
            $this->_update_if_canceled_or_declined($new_STS_ID, $old_STS_ID);
            /** @type EE_Transaction_Payments $transaction_payments */
            $transaction_payments = EE_Registry::instance()->load_class('Transaction_Payments');
            $transaction_payments->recalculate_transaction_total( $this->transaction(), false );
			$this->transaction()->update_status_based_on_total_paid( true );
			do_action( 'AHEE__EE_Registration__set_status__after_update', $this );
			return TRUE;
		} else {
			//even though the old value matches the new value, it's still good to
			//allow the parent set method to have a say
			parent::set( 'STS_ID', $new_STS_ID, $use_default );
			return TRUE;
		}
	}



    /**
     * update REGs and TXN when cancelled or declined registrations involved
     *
     * @param string $new_STS_ID
     * @param string $old_STS_ID
     * @throws \EE_Error
     */
    private function _update_if_canceled_or_declined($new_STS_ID, $old_STS_ID)
    {
        // these reg statuses should not be considered in any calculations involving monies owing
        $closed_reg_statuses = EEM_Registration::closed_reg_statuses();
        // true if registration has been cancelled or declined
        if (
            in_array($new_STS_ID, $closed_reg_statuses, true)
            && ! in_array($old_STS_ID, $closed_reg_statuses, true)
        ) {
            /** @type EE_Registration_Processor $registration_processor */
            $registration_processor = EE_Registry::instance()->load_class('Registration_Processor');
            /** @type EE_Transaction_Processor $transaction_processor */
            $transaction_processor = EE_Registry::instance()->load_class('Transaction_Processor');
            // cancelled or declined registration
            $registration_processor->update_registration_after_being_canceled_or_declined(
                $this,
                $closed_reg_statuses
            );
            $transaction_processor->update_transaction_after_canceled_or_declined_registration(
                $this,
                $closed_reg_statuses,
                false
            );
            do_action('AHEE__EE_Registration__set_status__canceled_or_declined', $this, $old_STS_ID, $new_STS_ID);
            return;
        }
        // true if reinstating cancelled or declined registration
        if (
            in_array($old_STS_ID, $closed_reg_statuses, true)
            && ! in_array($new_STS_ID, $closed_reg_statuses, true)
        ) {
            /** @type EE_Registration_Processor $registration_processor */
            $registration_processor = EE_Registry::instance()->load_class('Registration_Processor');
            /** @type EE_Transaction_Processor $transaction_processor */
            $transaction_processor = EE_Registry::instance()->load_class('Transaction_Processor');
            // reinstating cancelled or declined registration
            $registration_processor->update_canceled_or_declined_registration_after_being_reinstated(
                $this,
                $closed_reg_statuses
            );
            $transaction_processor->update_transaction_after_reinstating_canceled_registration(
                $this,
                $closed_reg_statuses,
                false
            );
            do_action('AHEE__EE_Registration__set_status__after_reinstated', $this, $old_STS_ID, $new_STS_ID);
        }
	}


	/**
	 *        get Status ID
	 */
	public function status_ID() {
		return $this->get( 'STS_ID' );
	}



    /**
     * increments this registration's related ticket sold and corresponding datetime sold values
     *
     * @return void
     * @throws \EE_Error
     */
	private function _reserve_registration_space() {
	    // reserved ticket and datetime counts will be decremented as sold counts are incremented
        // so stop tracking that this reg has a ticket reserved
	    $this->release_reserved_ticket();
		$ticket = $this->ticket();
		$ticket->increase_sold();
		$ticket->save();
		// possibly set event status to sold out
		$this->event()->perform_sold_out_status_check();
	}



    /**
     * Gets the ticket this registration is for
     *
     * @param boolean $include_archived whether to include archived tickets or not.
     * @return EE_Ticket|EE_Base_Class
     * @throws \EE_Error
     */
	public function ticket( $include_archived = TRUE ) {
		$query_params = array();
		if ( $include_archived ) {
			$query_params[ 'default_where_conditions' ] = 'none';
		}
		return $this->get_first_related( 'Ticket', $query_params );
	}



	/**
	 * Gets the event this registration is for
	 * @return EE_Event
	 */
	public function event() {
		$event = $this->get_first_related('Event');
		if ( ! $event instanceof \EE_Event) {
			throw new EntityNotFoundException('Event ID', $this->event_ID());
		}
		return $event;
	}



	/**
	 * Gets the "author" of the registration.  Note that for the purposes of registrations, the author will correspond with the author of the event this registration is for.
	 *
	 * @since 4.5.0
	 *
	 * @return int
	 */
	public function wp_user() {
		$event = $this->event();
		if ( $event instanceof EE_Event ) {
			return $event->wp_user();
		}
		return 0;
	}



    /**
     * decrements (subtracts) this registration's related ticket sold and corresponding datetime sold values
     *
     * @return void
     * @throws \EE_Error
     */
	private function _release_registration_space() {
		$ticket = $this->ticket();
		$ticket->decrease_sold();
		$ticket->save();
	}



    /**
     * tracks this registration's ticket reservation in extra meta
     * and can increment related ticket reserved and corresponding datetime reserved values
     *
     * @param bool $update_ticket if true, will increment ticket and datetime reserved count
     * @return void
     * @throws \EE_Error
     */
	public function reserve_ticket($update_ticket = false) {
        if ($this->get_extra_meta(EE_Registration::HAS_RESERVED_TICKET_KEY, true, false) === false) {
            // PLZ NOTE: although checking $update_ticket first would be more efficient,
            // we NEED to ALWAYS call update_extra_meta(), which is why that is done first
            if ($this->update_extra_meta(EE_Registration::HAS_RESERVED_TICKET_KEY, true, false) && $update_ticket) {
                $ticket = $this->ticket();
                $ticket->increase_reserved();
                $ticket->save();
            }
        }
	}



    /**
     * stops tracking this registration's ticket reservation in extra meta
     * decrements (subtracts) related ticket reserved and corresponding datetime reserved values
     *
     * @param bool $update_ticket if true, will decrement ticket and datetime reserved count
     * @return void
     * @throws \EE_Error
     */
    public function release_reserved_ticket($update_ticket = false) {
        if ($this->get_extra_meta(EE_Registration::HAS_RESERVED_TICKET_KEY, true, false) !== false) {
            // PLZ NOTE: although checking $update_ticket first would be more efficient,
            // we NEED to ALWAYS call delete_extra_meta(), which is why that is done first
            if ($this->delete_extra_meta(EE_Registration::HAS_RESERVED_TICKET_KEY) && $update_ticket) {
                $ticket = $this->ticket();
                $ticket->decrease_reserved();
                $ticket->save();
            }
        }
	}



	/**
	 * Set Attendee ID
	 *
	 * @param        int $ATT_ID Attendee ID
	 */
	public function set_attendee_id( $ATT_ID = 0 ) {
		$this->set( 'ATT_ID', $ATT_ID );
	}



	/**
	 *        Set Transaction ID
	 *
	 * @param        int $TXN_ID Transaction ID
	 */
	public function set_transaction_id( $TXN_ID = 0 ) {
		$this->set( 'TXN_ID', $TXN_ID );
	}



	/**
	 *        Set Session
	 *
	 * @param    string $REG_session PHP Session ID
	 */
	public function set_session( $REG_session = '' ) {
		$this->set( 'REG_session', $REG_session );
	}



	/**
	 *        Set Registration URL Link
	 *
	 * @param    string $REG_url_link Registration URL Link
	 */
	public function set_reg_url_link( $REG_url_link = '' ) {
		$this->set( 'REG_url_link', $REG_url_link );
	}



	/**
	 *        Set Attendee Counter
	 *
	 * @param        int $REG_count Primary Attendee
	 */
	public function set_count( $REG_count = 1 ) {
		$this->set( 'REG_count', $REG_count );
	}



	/**
	 *        Set Group Size
	 *
	 * @param        boolean $REG_group_size Group Registration
	 */
	public function set_group_size( $REG_group_size = FALSE ) {
		$this->set( 'REG_group_size', $REG_group_size );
	}



	/**
	 *    is_not_approved -  convenience method that returns TRUE if REG status ID == EEM_Registration::status_id_not_approved
	 *
	 * @return        boolean
	 */
	public function is_not_approved() {
		return $this->status_ID() == EEM_Registration::status_id_not_approved ? TRUE : FALSE;
	}



	/**
	 *    is_pending_payment -  convenience method that returns TRUE if REG status ID == EEM_Registration::status_id_pending_payment
	 *
	 * @return        boolean
	 */
	public function is_pending_payment() {
		return $this->status_ID() == EEM_Registration::status_id_pending_payment ? TRUE : FALSE;
	}



	/**
	 *    is_approved -  convenience method that returns TRUE if REG status ID == EEM_Registration::status_id_approved
	 *
	 * @return        boolean
	 */
	public function is_approved() {
		return $this->status_ID() == EEM_Registration::status_id_approved ? TRUE : FALSE;
	}



	/**
	 *    is_cancelled -  convenience method that returns TRUE if REG status ID == EEM_Registration::status_id_cancelled
	 *
	 * @return        boolean
	 */
	public function is_cancelled() {
		return $this->status_ID() == EEM_Registration::status_id_cancelled ? TRUE : FALSE;
	}



	/**
	 *    is_declined -  convenience method that returns TRUE if REG status ID == EEM_Registration::status_id_declined
	 *
	 * @return        boolean
	 */
	public function is_declined() {
		return $this->status_ID() == EEM_Registration::status_id_declined ? TRUE : FALSE;
	}



	/**
	 *    is_incomplete -  convenience method that returns TRUE if REG status ID == EEM_Registration::status_id_incomplete
	 *
	 * @return        boolean
	 */
	public function is_incomplete() {
		return $this->status_ID() == EEM_Registration::status_id_incomplete ? TRUE : FALSE;
	}



	/**
	 *        Set Registration Date
	 *
	 * @param        mixed ( int or string ) $REG_date Registration Date - Unix timestamp or string representation of Date
	 */
	public function set_reg_date( $REG_date = FALSE ) {
		$this->set( 'REG_date', $REG_date );
	}



	/**
	 *    Set final price owing for this registration after all ticket/price modifications
	 *
	 * @access    public
	 * @param    float $REG_final_price
	 */
	public function set_final_price( $REG_final_price = 0.00 ) {
		$this->set( 'REG_final_price', $REG_final_price );
	}



	/**
	 *    Set amount paid towards this registration's final price
	 *
	 * @access    public
	 * @param    float $REG_paid
	 */
	public function set_paid( $REG_paid = 0.00 ) {
		$this->set( 'REG_paid', $REG_paid );
	}



	/**
	 *        Attendee Is Going
	 *
	 * @param        boolean $REG_att_is_going Attendee Is Going
	 */
	public function set_att_is_going( $REG_att_is_going = FALSE ) {
		$this->set( 'REG_att_is_going', $REG_att_is_going );
	}



	/**
	 * Gets the related attendee
	 * @return EE_Attendee
	 */
	public function attendee() {
		return $this->get_first_related( 'Attendee' );
	}



	/**
	 *        get Event ID
	 */
	public function event_ID() {
		return $this->get( 'EVT_ID' );
	}



	/**
	 *        get Event ID
	 */
	public function event_name() {
		$event = $this->event_obj();
		if ( $event ) {
			return $event->name();
		} else {
			return NULL;
		}
	}



	/**
	 * Fetches the event this registration is for
	 * @return EE_Event
	 */
	public function event_obj() {
		return $this->get_first_related( 'Event' );
	}



	/**
	 *        get Attendee ID
	 */
	public function attendee_ID() {
		return $this->get( 'ATT_ID' );
	}



	/**
	 *        get PHP Session ID
	 */
	public function session_ID() {
		return $this->get( 'REG_session' );
	}



	/**
	 * Gets the string which represents the URL trigger for the receipt template in the message template system.
	 * @param string $messenger 'pdf' or 'html'.  Default 'html'.
	 * @return string
	 */
	public function receipt_url( $messenger = 'html' ) {

		/**
		 * The below will be deprecated one version after this.  We check first if there is a custom receipt template already in use on old system.  If there is then we just return the standard url for it.
		 *
		 * @since 4.5.0
		 */
		$template_relative_path = 'modules/gateways/Invoice/lib/templates/receipt_body.template.php';
		$has_custom = EEH_Template::locate_template( $template_relative_path , array(), TRUE, TRUE, TRUE );

		if ( $has_custom ) {
			return add_query_arg( array( 'receipt' => 'true' ), $this->invoice_url( 'launch' ) );
		}
		return apply_filters( 'FHEE__EE_Registration__receipt_url__receipt_url', '', $this, $messenger, 'receipt' );
	}




	/**
	 * Gets the string which represents the URL trigger for the invoice template in the message template system.
	 * @param string $messenger 'pdf' or 'html'.  Default 'html'.
	 * @return string
	 */
	public function invoice_url( $messenger = 'html' ) {
		/**
		 * The below will be deprecated one version after this.  We check first if there is a custom invoice template already in use on old system.  If there is then we just return the standard url for it.
		 *
		 * @since 4.5.0
		 */
		$template_relative_path = 'modules/gateways/Invoice/lib/templates/invoice_body.template.php';
		$has_custom = EEH_Template::locate_template( $template_relative_path , array(), TRUE, TRUE, TRUE );

		if ( $has_custom ) {
			if ( $messenger == 'html' ) {
				return $this->invoice_url( 'launch' );
			}
			$route = $messenger == 'download' || $messenger == 'pdf' ? 'download_invoice' : 'launch_invoice';

			$query_args = array( 'ee' => $route, 'id' => $this->reg_url_link() );
			if ( $messenger == 'html' ) {
				$query_args['html'] = TRUE;
			}
			return add_query_arg( $query_args, get_permalink( EE_Registry::instance()->CFG->core->thank_you_page_id ) );
		}
		return apply_filters( 'FHEE__EE_Registration__invoice_url__invoice_url', '', $this, $messenger, 'invoice' );
	}



	/**
	 * get Registration URL Link
	 *
	 * @access public
	 * @return string
	 * @throws \EE_Error
	 */
	public function reg_url_link() {
		return (string)$this->get( 'REG_url_link' );
	}



	/**
	 * Echoes out invoice_url()
	 * @param string $type 'download','launch', or 'html' (default is 'launch')
	 * @return void
	 */
	public function e_invoice_url( $type = 'launch' ) {
		echo $this->invoice_url( $type );
	}



	/**
	 * Echoes out payment_overview_url
	 */
	public function e_payment_overview_url() {
		echo $this->payment_overview_url();
	}



	/**
	 * Gets the URL of the thank you page with this registration REG_url_link added as
	 * a query parameter
	 * @return string
	 */
	public function payment_overview_url() {
		return add_query_arg( array( 'e_reg_url_link' => $this->reg_url_link(), 'step' => 'payment_options', 'revisit' => TRUE ), EE_Registry::instance()->CFG->core->reg_page_url() );
	}



	/**
	 * Gets the URL of the thank you page with this registration REG_url_link added as
	 * a query parameter
	 * @return string
	 */
	public function edit_attendee_information_url() {
		return add_query_arg( array( 'e_reg_url_link' => $this->reg_url_link(), 'step' => 'attendee_information', 'revisit' => TRUE ), EE_Registry::instance()->CFG->core->reg_page_url() );
	}



	/**
	 * Simply generates and returns the appropriate admin_url link to edit this registration
	 * @return string
	 */
	public function get_admin_edit_url() {
		return EEH_URL::add_query_args_and_nonce( array( 'page' => 'espresso_registrations', 'action' => 'view_registration', '_REG_ID' => $this->ID() ), admin_url( 'admin.php' ) );
	}



	/**
	 *    is_primary_registrant?
	 */
	public function is_primary_registrant() {
		return $this->get( 'REG_count' ) == 1 ? TRUE : FALSE;
	}



	/**
	 * This returns the primary registration object for this registration group (which may be this object).
	 * @return EE_Registration
	 */
	public function get_primary_registration()  {
		if ( $this->is_primary_registrant() )
			return $this;

		//k reg_count !== 1 so let's get the EE_Registration object matching this txn_id and reg_count == 1
		$primary_registrant = EEM_Registration::instance()->get_one( array( array('TXN_ID' => $this->transaction_ID(), 'REG_count' => 1 ) ) );
		return $primary_registrant;
	}



	/**
	*		get  Attendee Number
	* 		@access		public
	*/
	public function count() {
		return $this->get( 'REG_count' );
	}



	/**
	 *        get Group Size
	 */
	public function group_size() {
		return $this->get( 'REG_group_size' );
	}



	/**
	 *        get Registration Date
	 */
	public function date() {
		return $this->get( 'REG_date' );
	}



	/**
	 * gets a pretty date
	 * @param string $date_format
	 * @param string $time_format
	 * @return string
	 */
	public function pretty_date( $date_format = NULL, $time_format = NULL ) {
		return $this->get_datetime( 'REG_date', $date_format, $time_format );
	}



	/**
	 * final_price
	 * the registration's share of the transaction total, so that the
	 * sum of all the transaction's REG_final_prices equal the transaction's total
	 * @return    float
	 */
	public function final_price() {
		return $this->get( 'REG_final_price' );
	}



	/**
	 * pretty_final_price
	 *  final price as formatted string, with correct decimal places and currency symbol
	 * @return string
	 */
	public function pretty_final_price() {
		return $this->get_pretty( 'REG_final_price' );
	}



	/**
	 * get paid (yeah)
	 * @return 	float
	 */
	public function paid() {
		return $this->get( 'REG_paid' );
	}



	/**
	 * pretty_paid
	 * @return 	float
	 */
	public function pretty_paid() {
		return $this->get_pretty( 'REG_paid' );
	}



	/**
	 * owes_monies_and_can_pay
	 * whether or not this registration has monies owing and it's' status allows payment
	 * @param array $requires_payment
	 * @return bool
	 */
	public function owes_monies_and_can_pay( $requires_payment = array()) {
		// these reg statuses require payment (if event is not free)
		$requires_payment = ! empty( $requires_payment ) ? $requires_payment : EEM_Registration::reg_statuses_that_allow_payment();
		if (
			in_array( $this->status_ID(), $requires_payment ) &&
			$this->final_price() != 0 &&
			$this->final_price() != $this->paid()
		) {
			return true;
		} else {
			return false;
		}
	}



	/**
	 * Prints out the return value of $this->pretty_status()
	 * @param bool $show_icons
	 * @return void
	 */
	public function e_pretty_status( $show_icons = FALSE ) {
		echo $this->pretty_status( $show_icons );
	}




	/**
	 * Returns a nice version of the status for displaying to customers
	 * @param bool $show_icons
	 * @return string
	 */
	public function pretty_status( $show_icons = FALSE ) {
		$status = EEM_Status::instance()->localized_status( array( $this->status_ID() => __( 'unknown', 'event_espresso' ) ), FALSE, 'sentence' );
		$icon = '';
		switch ( $this->status_ID() ) {
			case EEM_Registration::status_id_approved:
				$icon = $show_icons ? '<span class="dashicons dashicons-star-filled ee-icon-size-16 green-text"></span>' : '';
				break;
			case EEM_Registration::status_id_pending_payment:
				$icon = $show_icons ? '<span class="dashicons dashicons-star-half ee-icon-size-16 orange-text"></span>' : '';
				break;
			case EEM_Registration::status_id_not_approved:
				$icon = $show_icons ? '<span class="dashicons dashicons-marker ee-icon-size-16 orange-text"></span>' : '';
				break;
			case EEM_Registration::status_id_cancelled:
				$icon = $show_icons ? '<span class="dashicons dashicons-no ee-icon-size-16 lt-grey-text"></span>' : '';
				break;
			case EEM_Registration::status_id_incomplete:
				$icon = $show_icons ? '<span class="dashicons dashicons-no ee-icon-size-16 lt-orange-text"></span>' : '';
				break;
			case EEM_Registration::status_id_declined:
				$icon = $show_icons ? '<span class="dashicons dashicons-no ee-icon-size-16 red-text"></span>' : '';
				break;
			case EEM_Registration::status_id_wait_list:
				$icon = $show_icons ? '<span class="dashicons dashicons-clipboard ee-icon-size-16 purple-text"></span>' : '';
				break;
		}
		return $icon . $status[ $this->status_ID() ];
	}



	/**
	 *        get Attendee Is Going
	 */
	public function att_is_going() {
		return $this->get( 'REG_att_is_going' );
	}



	/**
	 * Gets related answers
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Answer[]
	 */
	public function answers( $query_params = NULL ) {
		return $this->get_many_related( 'Answer', $query_params );
	}



	/**
	 * Gets the registration's answer value to the specified question
	 * (either the question's ID or a question object)
	 * @param EE_Question|int $question
	 * @param bool            $pretty_value
	 * @return array|string if pretty_value= true, the result will always be a string
	 * (because the answer might be an array of answer values, so passing pretty_value=true
	 * will convert it into some kind of string)
	 */
	public function answer_value_to_question( $question, $pretty_value=true ) {
		$question_id = EEM_Question::instance()->ensure_is_ID($question);
		return EEM_Answer::instance()->get_answer_value_to_question($this,$question_id,$pretty_value);
	}



	/**
	 * question_groups
	 * returns an array of EE_Question_Group objects for this registration
	 *
	 * @return EE_Question_Group[]
	 */
	public function question_groups() {
		$question_groups = array();
		if ( $this->event() instanceof EE_Event ) {
			$question_groups = $this->event()->question_groups(
				array(
					array(
						'Event_Question_Group.EQG_primary' => $this->count() == 1 ? true : false
					),
					'order_by' => array( 'QSG_order' => 'ASC' )
				)
			);
		}
		return $question_groups;
	}



	/**
	 * count_question_groups
	 * returns a count of the number of EE_Question_Group objects for this registration
	 *
	 * @return int
	 */
	public function count_question_groups() {
		$qg_count = 0;
		if ( $this->event() instanceof EE_Event ) {
			$qg_count = $this->event()->count_related(
				'Question_Group',
				array(
					array(
						'Event_Question_Group.EQG_primary' => $this->count() == 1 ? true : false
					)
				)
			);
		}
		return $qg_count;
	}



	/**
	 * Returns the registration date in the 'standard' string format
	 * (function may be improved in the future to allow for different formats and timezones)
	 * @return string
	 */
	public function reg_date() {
		return $this->get_datetime( 'REG_date' );
	}



	/**
	 * Gets the datetime-ticket for this registration (ie, it can be used to isolate
	 * the ticket this registration purchased, or the datetime they have registered
	 * to attend)
	 * @return EE_Datetime_Ticket
	 */
	public function datetime_ticket() {
		return $this->get_first_related( 'Datetime_Ticket' );
	}



	/**
	 * Sets the registration's datetime_ticket.
	 * @param EE_Datetime_Ticket $datetime_ticket
	 * @return EE_Datetime_Ticket
	 */
	public function set_datetime_ticket( $datetime_ticket ) {
		return $this->_add_relation_to( $datetime_ticket, 'Datetime_Ticket' );
	}
	/**
	 * Gets deleted
	 * @return boolean
	 */
	public function deleted() {
		return $this->get( 'REG_deleted' );
	}

	/**
	 * Sets deleted
	 * @param boolean $deleted
	 * @return boolean
	 */
	public function set_deleted($deleted) {
	    if ( $deleted ) {
	        $this->delete();
        } else {
	        $this->restore();
        }
	}



	/**
	 * Get the status object of this object
	 * @return EE_Status
	 */
	public function status_obj() {
		return $this->get_first_related( 'Status' );
	}



	/**
	 * Returns the number of times this registration has checked into any of the datetimes
	 * its available for
	 * @return int
	 */
	public function count_checkins() {
		return $this->get_model()->count_related( $this, 'Checkin' );
	}



	/**
	 * Returns the number of current Check-ins this registration is checked into for any of the datetimes the registration is for.  Note, this is ONLY checked in (does not include checkedout)
	 * @return int
	 */
	public function count_checkins_not_checkedout() {
		return $this->get_model()->count_related( $this, 'Checkin', array( array( 'CHK_in' => 1 ) ) );
	}



	/**
	 * The purpose of this method is simply to check whether this registration can checkin to the given datetime.
	 *
	 * @param int | EE_Datetime $DTT_OR_ID The datetime the registration is being checked against
	 * @param bool   $check_approved   This is used to indicate whether the caller wants can_checkin to also consider registration status as well as datetime access.
	 *
	 * @return bool
	 */
	public function can_checkin( $DTT_OR_ID, $check_approved = TRUE ) {
		$DTT_ID = EEM_Datetime::instance()->ensure_is_ID( $DTT_OR_ID );

		//first check registration status
		if (  ( $check_approved && ! $this->is_approved() ) || ! $DTT_ID ) {
			return false;
		}
		//is there a datetime ticket that matches this dtt_ID?
		if ( ! ( EEM_Datetime_Ticket::instance()->exists( array( array( 'TKT_ID' => $this->get('TKT_ID' ), 'DTT_ID' => $DTT_ID ) ) ) ) ) {
			return false;
		}

		//final check is against TKT_uses
		return $this->verify_can_checkin_against_TKT_uses( $DTT_ID );
	}


	/**
	 * This method verifies whether the user can checkin for the given datetime considering the max uses value set on the ticket.
	 *
	 * To do this,  a query is done to get the count of the datetime records already checked into.  If the datetime given does
	 * not have a check-in record and checking in for that datetime will exceed the allowed uses, then return false.  Otherwise return true.
	 *
	 * @param int | EE_Datetime  $DTT_OR_ID  The datetime the registration is being checked against
	 * @return bool   true means can checkin.  false means cannot checkin.
	 */
	public function verify_can_checkin_against_TKT_uses( $DTT_OR_ID ) {
		$DTT_ID = EEM_Datetime::instance()->ensure_is_ID( $DTT_OR_ID );

		if ( ! $DTT_ID ) {
			return false;
		}

		$max_uses = $this->ticket() instanceof EE_Ticket ? $this->ticket()->uses() : EE_INF;

		// if max uses is not set or equals infinity then return true cause its not a factor for whether user can check-in
		// or not.
		if ( ! $max_uses || $max_uses === EE_INF ) {
			return true;
		}

		//does this datetime have a checkin record?  If so, then the dtt count has already been verified so we can just
		//go ahead and toggle.
		if ( EEM_Checkin::instance()->exists( array( array( 'REG_ID' => $this->ID(), 'DTT_ID' => $DTT_ID ) ) ) ) {
			return true;
		}

		//made it here so the last check is whether the number of checkins per unique datetime on this registration
		//disallows further check-ins.
		$count_unique_dtt_checkins = EEM_Checkin::instance()->count( array( array( 'REG_ID' => $this->ID(), 'CHK_in' => true ) ), 'DTT_ID', true );
		// checkins have already reached their max number of uses
		// so registrant can NOT checkin
		if ( $count_unique_dtt_checkins >= $max_uses ) {
			EE_Error::add_error( __( 'Check-in denied because number of datetime uses for the ticket has been reached or exceeded.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		return true;
	}



    /**
     * toggle Check-in status for this registration
     * Check-ins are toggled in the following order:
     * never checked in -> checked in
     * checked in -> checked out
     * checked out -> checked in
     *
     * @param  int $DTT_ID  include specific datetime to toggle Check-in for.
     *                      If not included or null, then it is assumed latest datetime is being toggled.
     * @param bool $verify  If true then can_checkin() is used to verify whether the person
     *                      can be checked in or not.  Otherwise this forces change in checkin status.
     * @return bool|int     the chk_in status toggled to OR false if nothing got changed.
     * @throws EE_Error
     */
	public function toggle_checkin_status( $DTT_ID = null, $verify = false ) {
		if ( empty( $DTT_ID ) ) {
			$datetime = $this->get_latest_related_datetime();
			$DTT_ID = $datetime instanceof EE_Datetime ? $datetime->ID() : 0;
		// verify the registration can checkin for the given DTT_ID
		} elseif ( ! $this->can_checkin( $DTT_ID, $verify ) ) {
			EE_Error::add_error(
					sprintf(
						__( 'The given registration (ID:%1$d) can not be checked in to the given DTT_ID (%2$d), because the registration does not have access', 'event_espresso'),
						$this->ID(),
						$DTT_ID
					),
					__FILE__, __FUNCTION__, __LINE__
			);
			return false;
		}
		$status_paths = array(
			EE_Registration::checkin_status_never => EE_Registration::checkin_status_in,
			EE_Registration::checkin_status_in => EE_Registration::checkin_status_out,
			EE_Registration::checkin_status_out => EE_Registration::checkin_status_in
		);
		//start by getting the current status so we know what status we'll be changing to.
		$cur_status = $this->check_in_status_for_datetime( $DTT_ID, NULL );
		$status_to = $status_paths[ $cur_status ];
		// database only records true for checked IN or false for checked OUT
		// no record ( null ) means checked in NEVER, but we obviously don't save that
		$new_status = $status_to === EE_Registration::checkin_status_in ? true : false;
		// add relation - note Check-ins are always creating new rows
		// because we are keeping track of Check-ins over time.
		// Eventually we'll probably want to show a list table
		// for the individual Check-ins so that they can be managed.
		$checkin = EE_Checkin::new_instance( array(
				'REG_ID' => $this->ID(),
				'DTT_ID' => $DTT_ID,
				'CHK_in' => $new_status
		) );
		// if the record could not be saved then return false
		if ( $checkin->save() === 0 ) {
			if ( WP_DEBUG ) {
				global $wpdb;
				$error = sprintf(
					__( 'Registration check in update failed because of the following database error: %1$s%2$s', 'event_espresso' ),
					'<br />',
					$wpdb->last_error
				);
			} else {
				$error = __( 'Registration check in update failed because of an unknown database error', 'event_espresso' );
			}
			EE_Error::add_error( $error, __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		return $status_to;
	}



    /**
     * Returns the latest datetime related to this registration (via the ticket attached to the registration).
     * "Latest" is defined by the `DTT_EVT_start` column.
     *
     * @return EE_Datetime|null
     * @throws \EE_Error
     */
	public function get_latest_related_datetime() {
		return EEM_Datetime::instance()->get_one(
			array(
				array(
					'Ticket.Registration.REG_ID' => $this->ID()
				),
				'order_by' => array( 'DTT_EVT_start' => 'DESC' )
			)
		);
	}



    /**
     * Returns the earliest datetime related to this registration (via the ticket attached to the registration).
     * "Earliest" is defined by the `DTT_EVT_start` column.
     *
     * @throws \EE_Error
     */
	public function get_earliest_related_datetime() {
		return EEM_Datetime::instance()->get_one(
			array(
				array(
					'Ticket.Registration.REG_ID' => $this->ID()
				),
				'order_by' => array( 'DTT_EVT_start' => 'ASC' )
			)
		);
	}



    /**
     * This method simply returns the check-in status for this registration and the given datetime.
     * If neither the datetime nor the checkin values are provided as arguments,
     * then this will return the LATEST check-in status for the registration across all datetimes it belongs to.
     *
     * @param  int $DTT_ID        The ID of the datetime we're checking against
     *                            (if empty we'll get the primary datetime for
     *                            this registration (via event) and use it's ID);
     * @param EE_Checkin $checkin If present, we use the given checkin object rather than the dtt_id.
     * @return int                Integer representing Check-in status.
     * @throws \EE_Error
     */
	public function check_in_status_for_datetime( $DTT_ID = 0, $checkin = null ) {
		$checkin_query_params = array(
			'order_by' => array( 'CHK_timestamp' => 'DESC' )
		);

		if ( $DTT_ID > 0 ) {
			$checkin_query_params[0] = array( 'DTT_ID' => $DTT_ID );
		}

		//get checkin object (if exists)
		$checkin = $checkin instanceof EE_Checkin
            ? $checkin
            : $this->get_first_related( 'Checkin', $checkin_query_params );
		if ( $checkin instanceof EE_Checkin ) {
			if ( $checkin->get( 'CHK_in' ) ) {
				return EE_Registration::checkin_status_in; //checked in
			}
			return EE_Registration::checkin_status_out; //had checked in but is now checked out.
		}
		return EE_Registration::checkin_status_never; //never been checked in
	}



	/**
	 * This method returns a localized message for the toggled Check-in message.
	 * @param  int $DTT_ID include specific datetime to get the correct Check-in message.  If not included or null, then it is assumed Check-in for primary datetime was toggled.
	 * @param bool $error  This just flags that you want an error message returned. This is put in so that the error message can be customized with the attendee name.
	 * @return string         internationalized message
	 */
	public function get_checkin_msg( $DTT_ID, $error = FALSE ) {
		//let's get the attendee first so we can include the name of the attendee
		$attendee = $this->get_first_related( 'Attendee' );
		if ( $attendee instanceof EE_Attendee ) {
			if ( $error ) {
				return sprintf( __( "%s's check-in status was not changed.", "event_espresso" ), $attendee->full_name() );
			}
			$cur_status = $this->check_in_status_for_datetime( $DTT_ID );
			//what is the status message going to be?
			switch ( $cur_status ) {
				case EE_Registration::checkin_status_never :
					return sprintf( __( "%s has been removed from Check-in records", "event_espresso" ), $attendee->full_name() );
					break;
				case EE_Registration::checkin_status_in :
					return sprintf( __( '%s has been checked in', 'event_espresso' ), $attendee->full_name() );
					break;
				case EE_Registration::checkin_status_out :
					return sprintf( __( '%s has been checked out', 'event_espresso' ), $attendee->full_name() );
					break;
			}
		}
		return __( "The check-in status could not be determined.", "event_espresso" );
	}



	/**
	 * Returns the related EE_Transaction to this registration
	 * @return EE_Transaction
	 */
	public function transaction() {
		$transaction = $this->get_first_related('Transaction');
		if ( ! $transaction instanceof \EE_Transaction) {
			throw new EntityNotFoundException('Transaction ID', $this->transaction_ID());
		}
		return $transaction;
	}




	/**
	 *        get Registration Code
	 */
	public function reg_code() {
		return $this->get( 'REG_code' );
	}



	/**
	 *        get Transaction ID
	 */
	public function transaction_ID() {
		return $this->get( 'TXN_ID' );
	}



	/**
	 * @return int
	 */
	public function ticket_ID() {
		return $this->get( 'TKT_ID' );
	}



	/**
	 *        Set Registration Code
	 *
	 * @access    public
	 * @param    string $REG_code Registration Code
	 * @param	boolean $use_default
	 */
	public function set_reg_code( $REG_code, $use_default = FALSE ) {
		if ( empty( $REG_code )) {
			EE_Error::add_error( __( 'REG_code can not be empty.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			return;
		}
		if ( ! $this->reg_code() ) {
			parent::set( 'REG_code', $REG_code, $use_default );
		} else {
			EE_Error::doing_it_wrong(
				__CLASS__ . '::' . __FUNCTION__,
				__( 'Can not change a registration REG_code once it has been set.', 'event_espresso' ),
				'4.6.0'
			);
		}
	}




	/**
	 * Returns all other registrations in the same group as this registrant who have the same ticket option.
	 *
	 * Note, if you want to just get all registrations in the same transaction (group), use:
	 * 	$registration->transaction()->registrations();
	 *
	 * @since 4.5.0
	 *
	 * @return EE_Registration[]  or empty array if this isn't a group registration.
	 */
	public function get_all_other_registrations_in_group() {
		if ( $this->group_size() < 2 ) {
			return array();
		}

		$query[0] = array(
			'TXN_ID' => $this->transaction_ID(),
			'REG_ID' => array( '!=', $this->ID() ),
			'TKT_ID' => $this->ticket_ID()
			);

		$registrations = $this->get_model()->get_all( $query );
		return $registrations;
	}

	/**
	 * Return the link to the admin details for the object.
	 * @return string
	 */
	public function get_admin_details_link() {
		EE_Registry::instance()->load_helper( 'URL' );
		return EEH_URL::add_query_args_and_nonce(
			array(
				'page' => 'espresso_registrations',
				'action' => 'view_registration',
				'_REG_ID' => $this->ID()
			),
			admin_url( 'admin.php' )
		);
	}

	/**
	 * Returns the link to the editor for the object.  Sometimes this is the same as the details.
	 * @return string
	 */
	public function get_admin_edit_link() {
		return $this->get_admin_details_link();
	}

	/**
	 * Returns the link to a settings page for the object.
	 * @return string
	 */
	public function get_admin_settings_link() {
		return $this->get_admin_details_link();
	}

	/**
	 * Returns the link to the "overview" for the object (typically the "list table" view).
	 * @return string
	 */
	public function get_admin_overview_link() {
		EE_Registry::instance()->load_helper( 'URL' );
		return EEH_URL::add_query_args_and_nonce(
			array(
				'page' => 'espresso_registrations'
			),
			admin_url( 'admin.php' )
		);
	}



	/**
	 * @param array $query_params
	 * @return \EE_Registration[]
	 * @throws \EE_Error
	 */
	public function payments( $query_params = array() ) {
		return $this->get_many_related( 'Payment', $query_params );
	}



	/**
	 * @param array $query_params
	 * @return \EE_Registration_Payment[]
	 * @throws \EE_Error
	 */
	public function registration_payments( $query_params = array() ) {
		return $this->get_many_related( 'Registration_Payment', $query_params );
	}




	/**
	 * This grabs the payment method corresponding to the last payment made for the amount owing on the registration.
	 * Note: if there are no payments on the registration there will be no payment method returned.
	 *
	 * @return EE_Payment_Method|null
	 */
	public function payment_method() {
		return EEM_Payment_Method::instance()->get_last_used_for_registration( $this );
	}



	/**
	 * @return \EE_Line_Item
	 * @throws EntityNotFoundException
	 * @throws \EE_Error
	 */
	public function ticket_line_item()
	{
		$ticket = $this->ticket();
		$transaction = $this->transaction();
		$line_item = null;
		$ticket_line_items = \EEH_Line_Item::get_line_items_by_object_type_and_IDs(
			$transaction->total_line_item(),
			'Ticket',
			array($ticket->ID())
		);
		foreach ($ticket_line_items as $ticket_line_item) {
			if (
				$ticket_line_item instanceof \EE_Line_Item
				&& $ticket_line_item->OBJ_type() === 'Ticket'
				&& $ticket_line_item->OBJ_ID() === $ticket->ID()
			) {
				$line_item = $ticket_line_item;
				break;
			}
		}
		if ( ! ($line_item instanceof \EE_Line_Item && $line_item->OBJ_type() === 'Ticket')) {
			throw new EntityNotFoundException('Line Item Ticket ID', $ticket->ID());
		}
		return $line_item;
	}



    /**
     * Soft Deletes this model object.
     *
     * @return boolean | int
     * @throws \RuntimeException
     * @throws \EE_Error
     */
    public function delete()
    {
        if($this->update_extra_meta(EE_Registration::PRE_TRASH_REG_STATUS_KEY, $this->status_ID()) === true) {
            $this->set_status(EEM_Registration::status_id_cancelled);
        }
        return parent::delete();
    }



    /**
     * Restores whatever the previous status was on a registration before it was trashed (if possible)
     *
     * @throws \EE_Error
     * @throws \RuntimeException
     */
    public function restore()
    {
        $previous_status = $this->get_extra_meta(
            EE_Registration::PRE_TRASH_REG_STATUS_KEY,
            true,
            EEM_Registration::status_id_cancelled
        );
        if ($previous_status) {
            $this->delete_extra_meta(EE_Registration::PRE_TRASH_REG_STATUS_KEY);
            $this->set_status($previous_status);
        }
        return parent::restore();
    }



    /*************************** DEPRECATED ***************************/



	/**
	 * @deprecated
	 * @since     4.7.0
	 * @access    public
	 */
	public function price_paid()
	{
		EE_Error::doing_it_wrong('EE_Registration::price_paid()',
			__('This method is deprecated, please use EE_Registration::final_price() instead.', 'event_espresso'),
			'4.7.0');
		return $this->final_price();
	}



	/**
	 * @deprecated
	 * @since     4.7.0
	 * @access    public
	 * @param    float $REG_final_price
	 */
	public function set_price_paid($REG_final_price = 0.00)
	{
		EE_Error::doing_it_wrong('EE_Registration::set_price_paid()',
			__('This method is deprecated, please use EE_Registration::set_final_price() instead.', 'event_espresso'),
			'4.7.0');
		$this->set_final_price($REG_final_price);
	}



	/**
	 * @deprecated
	 * @since 4.7.0
	 * @return string
	 */
	public function pretty_price_paid()
	{
		EE_Error::doing_it_wrong('EE_Registration::pretty_price_paid()',
			__('This method is deprecated, please use EE_Registration::pretty_final_price() instead.',
				'event_espresso'), '4.7.0');
		return $this->pretty_final_price();
	}



    /**
     * Gets the primary datetime related to this registration via the related Event to this registration
     *
     * @deprecated 4.9.17
     * @return EE_Datetime
     */
    public function get_related_primary_datetime() {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Use EE_Registration::get_latest_related_datetime() or EE_Registration::get_earliest_related_datetime()',
                'event_espresso'
            ),
            '4.9.17',
            '5.0.0'
        );
        return $this->event()->primary_datetime();
    }



}
/* End of file EE_Registration.class.php */
/* Location: includes/classes/EE_Registration.class.php */

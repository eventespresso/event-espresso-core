<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package 		Event Espresso
 * @ author 		Event Espresso
 * @ copyright 	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license 		{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link 				{@link http://www.eventespresso.com}
 * @ since 			4.0
 *
 */



/**
 * EE_Registration class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Registration.class.php
 * @author 				Mike Nelson, Brent Christensen
 */
class EE_Registration extends EE_Soft_Delete_Base_Class {

	/**
	 *
	 * @param array  $props_n_values
	 * @param string $timezone
	 * @return EE_Registration
	 */
	public static function new_instance( $props_n_values = array(), $timezone = '' ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}



	/**
	 * @param array $props_n_values
	 * @param string  $timezone
	 * @return EE_Registration
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = '' ) {
		return new self( $props_n_values, TRUE, $timezone );
	}



	/**
	 *        Set Event ID
	 *
	 * @access        public
	 * @param        int $EVT_ID Event ID
	 */
	public function set_event( $EVT_ID = 0 ) {
		$this->set( 'EVT_ID', $EVT_ID );
	}



	/**
	 * Overrides parent set() method so that all calls to set( 'STS_ID', $STS_ID ) can be routed to internal set_status()
	 * @param string $field_name
	 * @param mixed  $field_value
	 * @param bool   $use_default
	 */
	public function set( $field_name, $field_value, $use_default = FALSE ) {
		if ( $field_name == 'STS_ID' ) {
			$this->set_status( $field_value );
		} else {
			parent::set( $field_name, $field_value, $use_default );
		}
	}



	/**
	 *    Set Status ID
	 *    updates the registration status and ALSO...
	 *    calls reserve_registration_space() if the reg status changes TO approved from any other reg status
	 *    calls release_registration_space() if the reg status changes FROM approved to any other reg status
	 *
	 * @access        public
	 * @param string $new_STS_ID
	 */
	public function set_status( $new_STS_ID = '' ) {
		// get current REG_Status
		$old_STS_ID = $this->status_ID();
		// if status has changed TO approved
		if ( $old_STS_ID != $new_STS_ID && $new_STS_ID == EEM_Registration::status_id_approved ) {
			// reserve a space by incrementing ticket and datetime sold values
			$this->_reserve_registration_space();
			do_action( 'AHEE__EE_Registration__set_status__to_approved', $this, $old_STS_ID, $new_STS_ID );
			// OR if status has changed FROM  approved
		} else {
			if ( $old_STS_ID != $new_STS_ID && $old_STS_ID == EEM_Registration::status_id_approved ) {
				// release a space by decrementing ticket and datetime sold values
				$this->_release_registration_space();
				do_action( 'AHEE__EE_Registration__set_status__from_approved', $this, $old_STS_ID, $new_STS_ID );
			}
		}
		// update status
		parent::set( 'STS_ID', $new_STS_ID );
		do_action( 'AHEE__EE_Registration__set_status__after_update', $this, $old_STS_ID, $new_STS_ID );
	}



	/**
	 *        get Status ID
	 * @access        public
	 */
	public function status_ID() {
		return $this->get( 'STS_ID' );
	}



	/**
	 * increments this registration's related ticket sold and corresponding datetime sold values
	 * @return void
	 */
	private function _reserve_registration_space() {
		$ticket = $this->ticket();
		$ticket->increase_sold();
		$ticket->save();
		$datetimes = $ticket->datetimes();
		if ( is_array( $datetimes ) ) {
			foreach ( $datetimes as $datetime ) {
				if ( $datetime instanceof EE_Datetime ) {
					$datetime->increase_sold();
					$datetime->save();
				}
			}
		}
		// possibly set event status to sold out
		$this->event()->perform_sold_out_status_check();
	}



	/**
	 * Gets the ticket this registration is for
	 *
	 * @param boolean $include_archived whether to include archived tickets or not.
	 * @return EE_Ticket
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
		return $this->get_first_related( 'Event' );
	}



	/**
	 * decrements (subtracts) this registration's related ticket sold and corresponding datetime sold values
	 * @return void
	 */
	private function _release_registration_space() {
		$ticket = $this->ticket();
		$ticket->decrease_sold();
		$ticket->save();
		$datetimes = $ticket->datetimes();
		if ( is_array( $datetimes ) ) {
			foreach ( $datetimes as $datetime ) {
				if ( $datetime instanceof EE_Datetime ) {
					$datetime->decrease_sold();
					$datetime->save();
				}
			}
		}
	}



	/**
	 *        Set Attendee ID
	 *
	 * @access        public
	 * @param        int $ATT_ID Attendee ID
	 */
	public function set_attendee_id( $ATT_ID = 0 ) {
		$this->set( 'ATT_ID', $ATT_ID );
	}



	/**
	 *        Set Transaction ID
	 *
	 * @access        public
	 * @param        int $TXN_ID Transaction ID
	 */
	public function set_transaction_id( $TXN_ID = 0 ) {
		$this->set( 'TXN_ID', $TXN_ID );
	}



	/**
	 *        Set Session
	 *
	 * @access    public
	 * @param    string $REG_session PHP Session ID
	 */
	public function set_session( $REG_session = '' ) {
		$this->set( 'REG_session', $REG_session );
	}



	/**
	 *        Set Registration URL Link
	 *
	 * @access    public
	 * @param    string $REG_url_link Registration URL Link
	 */
	public function set_reg_url_link( $REG_url_link = '' ) {
		$this->set( 'REG_url_link', $REG_url_link );
	}



	/**
	 *        Set Attendee Counter
	 *
	 * @access        public
	 * @param        int $REG_count Primary Attendee
	 */
	public function set_count( $REG_count = 1 ) {
		$this->set( 'REG_count', $REG_count );
	}



	/**
	 *        Set Group Size
	 *
	 * @access        public
	 * @param        boolean $REG_group_size Group Registration
	 */
	public function set_group_size( $REG_group_size = FALSE ) {
		$this->set( 'REG_group_size', $REG_group_size );
	}



	/**
	 *    is_not_approved -  convenience method that returns TRUE if REG status ID == EEM_Registration::status_id_not_approved
	 *
	 * @access        public
	 * @return        boolean
	 */
	public function is_not_approved() {
		return $this->status_ID() == EEM_Registration::status_id_not_approved ? TRUE : FALSE;
	}



	/**
	 *    is_pending_payment -  convenience method that returns TRUE if REG status ID == EEM_Registration::status_id_pending_payment
	 *
	 * @access        public
	 * @return        boolean
	 */
	public function is_pending_payment() {
		return $this->status_ID() == EEM_Registration::status_id_pending_payment ? TRUE : FALSE;
	}



	/**
	 *    is_approved -  convenience method that returns TRUE if REG status ID == EEM_Registration::status_id_approved
	 *
	 * @access        public
	 * @return        boolean
	 */
	public function is_approved() {
		return $this->status_ID() == EEM_Registration::status_id_approved ? TRUE : FALSE;
	}



	/**
	 *    is_cancelled -  convenience method that returns TRUE if REG status ID == EEM_Registration::status_id_cancelled
	 *
	 * @access        public
	 * @return        boolean
	 */
	public function is_cancelled() {
		return $this->status_ID() == EEM_Registration::status_id_cancelled ? TRUE : FALSE;
	}



	/**
	 *    is_declined -  convenience method that returns TRUE if REG status ID == EEM_Registration::status_id_declined
	 *
	 * @access        public
	 * @return        boolean
	 */
	public function is_declined() {
		return $this->status_ID() == EEM_Registration::status_id_declined ? TRUE : FALSE;
	}



	/**
	 *        Set Registration Date
	 *
	 * @access        public
	 * @param        mixed ( int or string ) $REG_date Registration Date - Unix timestamp or string representation of Date
	 */
	public function set_reg_date( $REG_date = FALSE ) {
		$this->set( 'REG_date', $REG_date );
	}



	/**
	 *    Set final Price Paid for ticket after all modifications
	 *
	 * @access    public
	 * @param    float $REG_final_price
	 */
	public function set_price_paid( $REG_final_price = 0.00 ) {
		$this->set( 'REG_final_price', $REG_final_price );
	}



	/**
	 * @return string of price, with correct decimal places and currency symbol
	 */
	public function pretty_price_paid() {
		return $this->get_pretty( 'REG_final_price' );
	}



	/**
	 *        Attendee Is Going
	 *
	 * @access        public
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
	 * @access        public
	 */
	public function event_ID() {
		return $this->get( 'EVT_ID' );
	}



	/**
	 *        get Event ID
	 * @access        public
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
	 * @access        public
	 */
	public function attendee_ID() {
		return $this->get( 'ATT_ID' );
	}



	/**
	 *        get PHP Session ID
	 * @access        public
	 */
	public function session_ID() {
		return $this->get( 'REG_session' );
	}



	/**
	 * Gets the string which represents the URL for the 'receipt' PDF, which is currently
	 * just a variant of the invoice
	 * @param string $type 'download','launch', or 'html' (default is 'launch')
	 * @return string
	 */
	public function receipt_url( $type = 'launch' ) {
		return add_query_arg( array( 'receipt' => 'true' ), $this->invoice_url( $type ) );
	}



	/**
	 * Gets the string which represents the URL for the invoice PDF for this registration (according to EED_Invoice)
	 * Dependant on code in ee/includes/functions/init espresso_export_invoice
	 * @param string $type 'download','launch', or 'html' (default is 'launch')
	 * @return string
	 */
	public function invoice_url( $type = 'launch' ) {
		if ( $type == 'download' ) {
			$route = 'download_invoice';
		} else {
			$route = 'launch_invoice';
		}
		$query_args = array( 'ee' => $route, 'id' => $this->reg_url_link() );
		if ( $type == 'html' ) {
			$query_args[ 'html' ] = TRUE;
		}
		return add_query_arg( $query_args, get_permalink( EE_Registry::instance()->CFG->core->thank_you_page_id ) );
	}



	/**
	 *        get Registration URL Link
	 * @access        public
	 */
	public function reg_url_link() {
		return $this->get( 'REG_url_link' );
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
		return add_query_arg( array( 'ee' => '_register', 'e_reg_url_link' => $this->reg_url_link(), 'step' => 'payment_options', 'revisit' => TRUE ), get_permalink( EE_Registry::instance()->CFG->core->reg_page_id ) );
	}



	/**
	 * Gets the URL of the thank you page with this registration REG_url_link added as
	 * a query parameter
	 * @return string
	 */
	public function edit_attendee_information_url() {
		return add_query_arg( array( 'ee' => '_register', 'e_reg_url_link' => $this->reg_url_link(), 'step' => 'attendee_information', 'revisit' => TRUE ), get_permalink( EE_Registry::instance()->CFG->core->reg_page_id ) );
	}



	/**
	 * Simply generates and returns the appropriate admin_url link to edit this registration
	 * @return string
	 */
	public function get_admin_edit_url() {
		EE_Registry::instance()->load_helper( 'URL' );
		return EEH_URL::add_query_args_and_nonce( array( 'page' => 'espresso_registrations', 'action' => 'view_registration', '_REG_ID' => $this->ID() ), admin_url( 'admin.php' ) );
	}



	/**
	 *    is_primary_registrant?
	 * @access        public
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
	 * @access        public
	 */
	public function group_size() {
		return $this->get( 'REG_group_size' );
	}



	/**
	 *        get Registration Date
	 * @access        public
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
	 *        get Price Paid
	 * @access        public
	 */
	public function price_paid() {
		return $this->get( 'REG_final_price' );
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
			case EEM_Registration::status_id_not_approved:
				$icon = $show_icons ? '<span class="dashicons dashicons-marker ee-icon-size-16 orange-text"></span>' : '';
				break;
			case EEM_Registration::status_id_pending_payment:
				$icon = $show_icons ? '<span class="dashicons dashicons-star-half ee-icon-size-16 orange-text"></span>' : '';
				break;
			case EEM_Registration::status_id_cancelled:
				$icon = $show_icons ? '<span class="dashicons dashicons-no ee-icon-size-16 lt-grey-text"></span>' : '';
				break;
			case EEM_Registration::status_id_declined:
				$icon = $show_icons ? '<span class="dashicons dashicons-no ee-icon-size-16 red-text"></span>' : '';
				break;
		}
		return $icon . $status[ $this->status_ID() ];
	}



	/**
	 *        get Attendee Is Going
	 * @access        public
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
		$this->set( 'REG_deleted', $deleted );
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
	 * toggle Check-in status for this registration
	 *
	 * Check-ins are toggled in the following order:
	 * never checked in -> checkedin
	 * checked in -> checked out
	 * checked out -> never checked in
	 * @param  int $DTT_ID include specific datetime to toggle Check-in for.  If not included or null, then it is assumed primary datetime is being toggled.
	 * @return int|BOOL            the chk_in status toggled to OR false if nothing got changed.
	 */
	public function toggle_checkin_status( $DTT_ID = NULL ) {
		if ( empty( $DTT_ID ) ) {
			$datetime = $this->get_related_primary_datetime();
			$DTT_ID = $datetime->ID();
		}
		$status_paths = array( 0 => 1, 1 => 2, 2 => 1 );
		//start by getting the current status so we know what status we'll be changing to.
		$cur_status = $this->check_in_status_for_datetime( $DTT_ID, NULL );
		$status_to = $status_paths[ $cur_status ];
		//add relation - note Check-ins are always creating new rows because we are keeping track of Check-ins over time.  Eventually we'll probably want to show a list table for the individual Check-ins so that can be managed.
		$new_status = $status_to == 2 ? 0 : $status_to;
		$chk_data = array( 'REG_ID' => $this->ID(), 'DTT_ID' => $DTT_ID, 'CHK_in' => $new_status );
		$checkin = EE_Checkin::new_instance( $chk_data );
		$updated = $checkin->save();
		if ( $updated === 0 ) {
			$status_to = FALSE;
		}
		return $status_to;
	}



	/**
	 * Gets the primary datetime related to this registration via the related Event to this registration
	 * @return EE_Datetime
	 */
	public function get_related_primary_datetime() {
		return $this->event()->primary_datetime();
	}



	/**
	 * This method simply returns the check-in status for this registration and the given datetime.
	 * @param  int          $DTT_ID  The ID of the datetime we're checking against (if empty we'll get the primary datetime for this registration (via event) and use it's ID);
	 * @param EE_Checkin $checkin If present, we use the given checkin object rather than the dtt_id.
	 * @return int            Integer representing Check-in status.
	 */
	public function check_in_status_for_datetime( $DTT_ID = 0, $checkin = NULL ) {
		if ( empty( $DTT_ID ) && empty( $checkin ) ) {
			$datetime = $this->get_related_primary_datetime();
			if ( ! $datetime instanceof EE_Datetime ) {
				return 0;
			}
			$DTT_ID = $datetime->ID();
		}
		//get checkin object (if exists)
		$checkin = ! empty( $checkin ) ? $checkin : $this->get_first_related( 'Checkin', array( array( 'DTT_ID' => $DTT_ID ), 'order_by' => array( 'CHK_timestamp' => 'DESC' ) ) );
		if ( $checkin instanceof EE_Checkin ) {
			if ( $checkin->get( 'CHK_in' ) ) {
				return 1; //checked in
			} else {
				return 2; //had checked in but is now checked out.
			}
		} else {
			return 0; //never been checked in
		}
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
				case 0 :
					return sprintf( __( "%s has been removed from Check-in records", "event_espresso" ), $attendee->full_name() );
					break;
				case 1 :
					return sprintf( __( '%s has been checked in', 'event_espresso' ), $attendee->full_name() );
					break;
				case 2 :
					return sprintf( __( '%s has been checked out', 'event_espresso' ), $attendee->full_name() );
					break;
			}
		}
		return __( "The check-in status could not be determined.", "event_espresso" );
	}



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



	/**
	 * Returns the related EE_Transaction to this registration
	 * @return EE_Transaction
	 */
	public function transaction() {
		return $this->get_first_related( 'Transaction' );
	}



	/**
	 * generates reg code
	 * @return boolean
	 */
	private function _generate_new_reg_code() {
		// generate a reg code ?
		if ( ! $this->reg_code() ) {
			// figure out where to start parsing the reg code
			$chars = strpos( $this->reg_url_link(), '-' ) + 4;
			$new_reg_code = array( $this->transaction_ID(), $this->ticket_ID(), substr( $this->reg_url_link(), 0, $chars ) . substr( $this->reg_url_link(), - 3 ), $this->transaction()->is_completed() ? 1 : 0 );
			$new_reg_code = implode( '-', $new_reg_code );
			$new_reg_code = apply_filters( 'FHEE__EE_Registration___generate_new_reg_code__new_reg_code', $new_reg_code, $this );
			$this->set_reg_code( $new_reg_code );
			return TRUE;
		}
		return FALSE;
	}



	/**
	 *        get Registration Code
	 * @access        public
	 */
	public function reg_code() {
		return $this->get( 'REG_code' );
	}



	/**
	 *        get Transaction ID
	 * @access        public
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
	 */
	public function set_reg_code( $REG_code = '' ) {
		$this->set( 'REG_code', $REG_code );
	}
}
/* End of file EE_Registration.class.php */
/* Location: includes/classes/EE_Registration.class.php */

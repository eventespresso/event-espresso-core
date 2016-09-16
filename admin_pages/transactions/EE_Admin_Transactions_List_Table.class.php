<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package	Event Espresso
 * @ author		Seth Shoultes
 * @ copyright	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license	{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link		{@link http://www.eventespresso.com}
 * @ since		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Transactions Table class
 *
 * @package				Event Espresso
 * @subpackage			includes/admin_screens/Transactions_List_Table.class.php
 * @author					Brent Christensen
 *
 * ------------------------------------------------------------------------
 */


class EE_Admin_Transactions_List_Table extends EE_Admin_List_Table {

	private $_status;


	/**
	 * @param \Transactions_Admin_Page $admin_page
	 */
	public function __construct( \Transactions_Admin_Page $admin_page ){
		parent::__construct( $admin_page );
		$this->_status = $this->_admin_page->get_transaction_status_array();
	}



	/**
	 *_setup_data
	 */
	protected function _setup_data() {
		$this->_data = $this->_admin_page->get_transactions( $this->_per_page );
		$status = ! empty( $this->_req_data['status'] )? $this->_req_data['status'] : 'all';
		$this->_all_data_count = $this->_admin_page->get_transactions( $this->_per_page, TRUE, $status );
	}



	/**
	 *_set_properties
	 */
	protected function _set_properties() {
		$this->_wp_list_args = array(
			'singular' => __('transaction', 'event_espresso'),
			'plural' => __('transactions', 'event_espresso'),
			'ajax' => TRUE,
			'screen' => $this->_admin_page->get_current_screen()->id
			);
		$ID_column_name = __( 'ID', 'event_espresso' );
		$ID_column_name .= ' : <span class="show-on-mobile-view-only" style="float:none">';
		$ID_column_name .= __( 'Transaction Date', 'event_espresso' );
		$ID_column_name .= '</span> ';
		$this->_columns = array(
			'TXN_ID' => $ID_column_name,
			'TXN_timestamp'	=> __( 'Transaction Date', 'event_espresso' ),
			'TXN_total' => __( 'Total', 'event_espresso' ),
			'TXN_paid' => __( 'Paid', 'event_espresso' ),
			'ATT_fname' => __( 'Primary Registrant', 'event_espresso' ),
			'event_name' => __( 'Event', 'event_espresso' ),
			'actions' => __( 'Actions', 'event_espresso' )
		);

		$this->_sortable_columns = array(
			'TXN_ID' => array( 'TXN_ID' => FALSE ),
			'event_name' => array( 'event_name'=> FALSE ),
			'ATT_fname'	=> array( 'ATT_fname'=> FALSE ),
			'TXN_timestamp'	=> array( 'TXN_timestamp'=> TRUE ) //true means its already sorted
		);

		$this->_primary_column = 'TXN_ID';

		$this->_hidden_columns = array();
	}



	/**
	 * This simply sets up the row class for the table rows.
	 * Allows for easier overriding of child methods for setting up sorting.
	 *
	 * @param  EE_Transaction $item the current item
	 * @return string
	 * @throws \EE_Error
	 */
	protected function _get_row_class( $item ) {
		$class = parent::_get_row_class( $item );
		//add status class
		$class .= ' ee-status-strip txn-status-' . $item->status_ID();
		if ( $this->_has_checkbox_column ) {
			$class .= ' has-checkbox-column';
		}
		return $class;
	}


	/**
	 * _get_table_filters
	 * We use this to assemble and return any filters that are associated with this table that help further refine what get's shown in the table.
	 *
	 * @abstract
	 * @access protected
	 * @return array
	 */
	protected function _get_table_filters() {
		$filters = array();
		$start_date = isset( $this->_req_data['txn-filter-start-date'] ) ? wp_strip_all_tags( $this->_req_data['txn-filter-start-date'] ) : date( 'm/d/Y', strtotime( '-10 year' ));
		$end_date = isset( $this->_req_data['txn-filter-end-date'] ) ? wp_strip_all_tags( $this->_req_data['txn-filter-end-date'] ) : date( 'm/d/Y', current_time('timestamp') );
		ob_start();
		?>
		<label for="txn-filter-start-date">Display Transactions from </label>
		<input id="txn-filter-start-date" class="datepicker" type="text" value="<?php echo $start_date; ?>" name="txn-filter-start-date" size="15"/>
		<label for="txn-filter-end-date"> until </label>
		<input id="txn-filter-end-date" class="datepicker" type="text" value="<?php echo $end_date; ?>" name="txn-filter-end-date" size="15"/>
		<?php
		$filters[] = ob_get_contents();
		ob_end_clean();
		return $filters;
	}



	/**
	 *_add_view_counts
	 */
	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_admin_page->get_transactions( $this->_per_page, TRUE, 'all' );
		$this->_views['abandoned']['count'] = $this->_admin_page->get_transactions( $this->_per_page, TRUE, 'abandoned' );
		$this->_views['failed']['count'] = $this->_admin_page->get_transactions( $this->_per_page, TRUE, 'failed' );
	}



	/**
	 *    column TXN_ID
	 *
	 * @param \EE_Transaction $item
	 * @return string
	 * @throws \EE_Error
	 */
	public function column_TXN_ID( EE_Transaction $item ){
    	$view_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_transaction', 'TXN_ID'=>$item->ID() ), TXN_ADMIN_URL );
	   $content = '<a href="' . $view_lnk_url . '" title="' . esc_attr__( 'Go to Transaction Details', 'event_espresso' ) . '">' . $item->ID() . '</a>';

	   //txn timestamp
	   $content .= '  <span class="show-on-mobile-view-only">' . $this->_get_txn_timestamp( $item ) . '</span>';
	   return $content;
	}



	/**
	 * @param \EE_Transaction $item
	 * @return mixed|string|void
	 * @throws \EE_Error
	 */
	protected function _get_txn_timestamp( EE_Transaction $item ) {
		//txn timestamp
		// is TXN less than 2 hours old ?
		if (
			( $item->failed() || $item->is_abandoned() )
			&& (
				( time() - EE_Registry::instance()->SSN->lifespan() ) < $item->datetime( false, true )
			)
		) {
			$timestamp = __( 'TXN in progress...', 'event_espresso' );
	   } else {
			$timestamp = $item->get_i18n_datetime( 'TXN_timestamp' );
		}
		return $timestamp;
	}



	/**
	 *    column_cb
	 *
	 * @param \EE_Transaction $item
	 * @return string
	 * @throws \EE_Error
	 */
	public function column_cb($item ){
		return sprintf( '<input type="checkbox" name="%1$s[]" value="%2$s" />', $this->_wp_list_args['singular'],  $item->ID());
	}



	/**
	 *    column_TXN_timestamp
	 *
	 * @param \EE_Transaction $item
	 * @return string
	 * @throws \EE_Error
	 */
	public function column_TXN_timestamp( EE_Transaction $item ){
		$view_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_transaction', 'TXN_ID'=>$item->ID() ), TXN_ADMIN_URL );
		$txn_date = '<a href="'.$view_lnk_url.'" title="' . esc_attr__( 'View Transaction Details for TXN #', 'event_espresso' ) . $item->ID() . '">' . $this->_get_txn_timestamp( $item ) . '</a>';
		//status
		$txn_date .= '<br><span class="ee-status-text-small">' . EEH_Template::pretty_status( $item->status_ID(), false, 'sentence' ) . '</span>';
		return $txn_date;
	}



	/**
	 *    column_TXN_total
	 *
	 * @param \EE_Transaction $item
	 * @return string
	 * @throws \EE_Error
	 */
	public function column_TXN_total( EE_Transaction $item ){
		if ( $item->get('TXN_total') > 0 ) {
			return '<span class="txn-pad-rght">' . apply_filters( 'FHEE__EE_Admin_Transactions_List_Table__column_TXN_total__TXN_total', $item->get_pretty('TXN_total'), $item ) . '</span>';
		} else {
			return '<span class="txn-overview-free-event-spn">' . __( 'free', 'event_espresso' ) . '</span>';
		}
	}



	/**
	 *    column_TXN_paid
	 *
	 * @param \EE_Transaction $item
	 * @return mixed|string
	 * @throws \EE_Error
	 */
	public function column_TXN_paid( EE_Transaction $item ){
		$transaction_total = $item->get('TXN_total');
		$transaction_paid = $item->get('TXN_paid');

		if ( \EEH_Money::compare_floats( $transaction_total, 0,'>' ) ) {
			// monies owing
			$span_class = 'txn-overview-part-payment-spn';
			if ( \EEH_Money::compare_floats( $transaction_paid, $transaction_total, '>=' ) ) {
				// paid in full
				$span_class = 'txn-overview-full-payment-spn';
			} elseif ( \EEH_Money::compare_floats( $transaction_paid, 0, '==' ) ) {
				// no payments made
				$span_class = 'txn-overview-no-payment-spn';
			}
		} else {
			$span_class = 'txn-overview-free-event-spn';
			$transaction_paid = 0;
		}

		$payment_method = $item->payment_method();
		$payment_method_name = $payment_method instanceof EE_Payment_Method ? $payment_method->admin_name() : __( 'Unknown', 'event_espresso' );

		$content = '<span class="' . $span_class . ' txn-pad-rght">' . $transaction_paid !== 0 ? $item->get_pretty('TXN_paid') : $transaction_paid . '</span>';
		if ( $transaction_paid > 0 ) {
			$content .= '<br><span class="ee-status-text-small">' . sprintf( __( '...via %s', 'event_espresso' ), $payment_method_name ) . '</span>';
		}
		return $content;
	}



	/**
	 *    column_ATT_fname
	 *
	 * @param \EE_Transaction $item
	 * @return string|void
	 * @throws \EE_Error
	 */
	public function column_ATT_fname( EE_Transaction $item ){
		$primary_reg = $item->primary_registration();
		$attendee = $primary_reg->get_first_related('Attendee');
		if ( $attendee instanceof EE_Attendee ) {
			$edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_registration', '_REG_ID'=>$primary_reg->ID() ), REG_ADMIN_URL );
			$content = EE_Registry::instance()->CAP->current_user_can( 'ee_read_registration', 'espresso_registrations_view_registration', $primary_reg->ID() ) ? '<a href="'.$edit_lnk_url.'" title="' . esc_attr__( 'View Registration Details', 'event_espresso' ) . '">' . $attendee->full_name() . '</a>' : $attendee->full_name();
			$content .= '<br>' . $attendee->email();
			return $content;
		}
		return $item->failed() || $item->is_abandoned() ? __('no contact record.', 'event_espresso') : __('No contact record, because the transaction was abandoned or the registration process failed.', 'event_espresso');
	}



	/**
	 *    column_ATT_email
	 *
	 * @param \EE_Transaction $item
	 * @return string|void
	 * @throws \EE_Error
	 */
	public function column_ATT_email( EE_Transaction $item ){
		$attendee = $item->primary_registration()->get_first_related('Attendee');
		if ( ! empty( $attendee ) ) {
			return '<a href="mailto:' . $attendee->get( 'ATT_email' ) . '">' . $attendee->get( 'ATT_email' ) . '</a>';
		} else {
			return $item->failed() || $item->is_abandoned()
				? __( 'no contact record.', 'event_espresso' )
				: __(
					'No contact record, because the transaction was abandoned or the registration process failed.',
					'event_espresso'
				);
		}
	}



	/**
	 *    column_event_name
	 *
	 * @param \EE_Transaction $item
	 * @return string|void
	 * @throws \EE_Error
	 */
 	public function column_event_name( EE_Transaction $item ){
    	$actions = array();
		$event = $item->primary_registration()->get_first_related('Event');
		if ( !empty( $event ) ) {
			$edit_event_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'edit', 'post'=>$event->ID() ), EVENTS_ADMIN_URL );
			$event_name = $event->get('EVT_name');

			//filter this view by transactions for this event
			$txn_by_event_lnk = EE_Admin_Page::add_query_args_and_nonce( array( 'action' => 'default', 'EVT_ID' => $event->ID() ) );
			if ( EE_Registry::instance()->CAP->current_user_can( 'ee_edit_event', 'espresso_events_edit', $event->ID() ) ) {
				$actions['filter_by_event'] = '<a href="' . $txn_by_event_lnk . '" title="' . esc_attr__('Filter transactions by this event', 'event_espresso') . '">' . __('View Transactions for this event', 'event_espresso') . '</a>';
			}

			return sprintf('%1$s %2$s', EE_Registry::instance()->CAP->current_user_can( 'ee_edit_event', 'espresso_events_edit', $event->ID() ) ? '<a href="' . $edit_event_url . '" title="' . sprintf( esc_attr__( 'Edit Event: %s', 'event_espresso' ), $event->get('EVT_name') ) .'">' .  wp_trim_words( $event_name, 30, '...' ) . '</a>' : wp_trim_words( $event_name, 30, '...' ), $this->row_actions($actions) );
		} else {
			return __('The event associated with this transaction via the primary registration cannot be retrieved.', 'event_espresso');
		}
	}



	/**
	 *    column_actions
	 *
	 * @param \EE_Transaction $item
	 * @return string
	 * @throws \EE_Error
	 */
 	public function column_actions( EE_Transaction $item ){

    	$registration = $item->primary_registration();
    	$attendee = $registration->attendee();

        //Build row actions
		$view_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_transaction', 'TXN_ID'=>$item->ID() ), TXN_ADMIN_URL );
		$dl_invoice_lnk_url = $registration->invoice_url();
		$dl_receipt_lnk_url = $registration->receipt_url();
		$view_reg_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_registration', '_REG_ID'=>$registration->ID() ), REG_ADMIN_URL );
		$send_pay_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'send_payment_reminder', 'TXN_ID'=>$item->ID() ), TXN_ADMIN_URL );
	    $related_messages_link = EEH_MSG_Template::get_message_action_link( 'see_notifications_for', null, array(
		    'TXN_ID' => $item->ID()
	    ));

		//Build row actions
		$view_lnk = '
			<li>
				<a href="'.$view_lnk_url.'" title="' . esc_attr__( 'View Transaction Details', 'event_espresso' ) . '" class="tiny-text">
					<span class="dashicons dashicons-cart"></span>
				</a>
			</li>';

		$dl_invoice_lnk = '';
		//only show invoice link if message type is active.
		if ( $attendee instanceof EE_Attendee && EEH_MSG_Template::is_mt_active( 'invoice' ) ) {
			$dl_invoice_lnk = '
			<li>
				<a title="' . esc_attr__( 'View Transaction Invoice', 'event_espresso' ) . '" target="_blank" href="'.$dl_invoice_lnk_url.'" class="tiny-text">
					<span class="dashicons dashicons-media-spreadsheet ee-icon-size-18"></span>
				</a>
			</li>';
		}

		$dl_receipt_lnk = '';
		//only show receipt link if message type is active.
		if ( $attendee instanceof EE_Attendee && EEH_MSG_Template::is_mt_active( 'receipt' ) ) {
			$dl_receipt_lnk = '
			<li>
				<a title="' . esc_attr__( 'View Transaction Receipt', 'event_espresso' ) . '" target="_blank" href="'.$dl_receipt_lnk_url.'" class="tiny-text">
					<span class="dashicons dashicons-media-default ee-icon-size-18"></span>
				</a>
			</li>';
		}

		//only show payment reminder link if the message type is active.
		if ( EEH_MSG_Template::is_mt_active( 'payment_reminder' ) ) {
			$send_pay_lnk = $attendee instanceof EE_Attendee
							&& EE_Registry::instance()->CAP->current_user_can(
								'ee_send_message',
								'espresso_transactions_send_payment_reminder'
							)
				? '
				<li>
					<a href="'.$send_pay_lnk_url.'" title="' . esc_attr__( 'Send Payment Reminder', 'event_espresso' ) . '" class="tiny-text">
						<span class="dashicons dashicons-email-alt"></span>
					</a>
				</li>'
				: '';
			$send_pay_lnk = $item->get('STS_ID') !== EEM_Transaction::complete_status_code
							&& $item->get('STS_ID') !== EEM_Transaction::overpaid_status_code
				? $send_pay_lnk
				: '';
		} else {
			$send_pay_lnk = '';
		}

		$view_reg_lnk = EE_Registry::instance()->CAP->current_user_can(
			'ee_read_registration',
			'espresso_registrations_view_registration',
			$registration->ID()
		)
			? '
				<li>
					<a href="'.$view_reg_lnk_url.'" title="' . esc_attr__( 'View Registration Details', 'event_espresso' ) . '" class="tiny-text">
						<span class="dashicons dashicons-clipboard"></span>
					</a>
				</li>'
			: '';

		$view_related_messages_lnk = '';
		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_read_global_messages', 'view_filtered_messages' ) ) {
			$view_related_messages_lnk = '<li>' . $related_messages_link . '</li>';
		}

		return $this->_action_string( $view_lnk . $dl_invoice_lnk . $dl_receipt_lnk . $view_reg_lnk . $send_pay_lnk . $view_related_messages_lnk, $item, 'ul', 'txn-overview-actions-ul' );
    }


}

<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Event_Registrations_List_Table
 *
 * @package       Event Espresso
 */
class EE_Event_Registrations_List_Table extends EE_Admin_List_Table {

	/**
	 * This property will hold the related Datetimes on an event IF the event id is included in the request.
	 *
	 * @var EE_Datetime[]
	 */
	protected $_dtts_for_event = array();



	/**
	 * The event if one is specified in the request
	 *
	 * @var EE_Event
	 */
	protected $_evt = null;


	/**
	 * The DTT_ID if the current view has a specified datetime.
	 *
	 * @var int
	 */
	protected $_cur_dtt_id = 0;



	/**
	 * EE_Event_Registrations_List_Table constructor.
	 *
	 * @param \Registrations_Admin_Page $admin_page
	 */
	public function __construct( $admin_page ) {
		parent::__construct( $admin_page );
		$this->_status = $this->_admin_page->get_registration_status_array();
	}



	protected function _setup_data() {
		$this->_data = $this->_view !== 'trash' ? $this->_admin_page->get_event_attendees( $this->_per_page )
			: $this->_admin_page->get_event_attendees( $this->_per_page, false, true );
		$this->_all_data_count = $this->_view !== 'trash' ? $this->_admin_page->get_event_attendees(
			$this->_per_page,
			true
		) : $this->_admin_page->get_event_attendees( $this->_per_page, true, true );
	}



	protected function _set_properties() {
		$evt_id = isset( $this->_req_data['event_id'] ) ? $this->_req_data['event_id'] : null;
		$this->_wp_list_args = array(
			'singular' => __( 'registrant', 'event_espresso' ),
			'plural'   => __( 'registrants', 'event_espresso' ),
			'ajax'     => true,
			'screen'   => $this->_admin_page->get_current_screen()->id,
		);
		$columns = array();
		//$columns['_Reg_Status'] = '';
		if ( ! empty( $evt_id ) ) {
			$columns['cb'] = '<input type="checkbox" />'; //Render a checkbox instead of text
			$this->_has_checkbox_column = true;
		}
		$this->_columns = array(
			'_REG_att_checked_in' => '<span class="dashicons dashicons-yes ee-icon-size-18"></span>',
			'ATT_name'            => __( 'Registrant', 'event_espresso' ),
			'ATT_email'           => __( 'Email Address', 'event_espresso' ),
			'Event'               => __( 'Event', 'event_espresso' ),
			'PRC_name'            => __( 'TKT Option', 'event_espresso' ),
			'_REG_final_price'    => __( 'Price', 'event_espresso' ),
			'TXN_paid'            => __( 'Paid', 'event_espresso' ),
			'TXN_total'           => __( 'Total', 'event_espresso' ),
		);
		$this->_columns = array_merge( $columns, $this->_columns );
		$this->_primary_column = '_REG_att_checked_in';
		if ( ! empty( $evt_id )
		     && EE_Registry::instance()->CAP->current_user_can(
				'ee_read_registrations',
				'espresso_registrations_registrations_reports',
				$evt_id
			)
		) {
			$this->_bottom_buttons = array(
				'report' => array(
					'route'         => 'registrations_report',
					'extra_request' =>
						array(
							'EVT_ID'     => $evt_id,
							'return_url' => urlencode( "//{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}" ),
						),
				),
			);
		}
        $this->_bottom_buttons['report_filtered'] = array(
            'route'         => 'registrations_checkin_report',
            'extra_request' => array(
                'use_filters' => true,
                'filters'     => array_merge(
                    array(
                        'EVT_ID' => $evt_id,
                    ),
                    array_diff_key(
                        $this->_req_data,
                        array_flip(
                            array(
                                'page',
                                'action',
                                'default_nonce',
                            )
                        )
                    )
                ),
                'return_url'  => urlencode("//{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}"),
            ),
        );
		$this->_sortable_columns = array(
            /**
             * Allows users to change the default sort if they wish.
             * Returning a falsey on this filter will result in the default sort to be by firstname rather than last name.
             *
             * Note: usual naming conventions for filters aren't followed here so that just one filter can be used to
             * change the sorts on any list table involving registration contacts.  If you want to only change the filter
             * for a specific list table you can use the provided reference to this object instance.
             */
			'ATT_name' => array(
                    'FHEE__EE_Registrations_List_Table___set_properties__default_sort_by_registration_last_name',
                    true,
                    $this
                )
                ? array( 'ATT_lname' => true )
                : array( 'ATT_fname' => true ),
			'Event'    => array( 'Event.EVT.Name' => false ),
		);
		$this->_hidden_columns = array();
		$this->_evt = EEM_Event::instance()->get_one_by_ID( $evt_id );
		$this->_dtts_for_event = $this->_evt instanceof EE_Event ? $this->_evt->datetimes_ordered() : array();
	}



	/**
	 * @param \EE_Registration $item
	 * @return string
	 */
	protected function _get_row_class( $item ) {
		$class = parent::_get_row_class( $item );
		//add status class
		$class .= ' ee-status-strip reg-status-' . $item->status_ID();
		if ( $this->_has_checkbox_column ) {
			$class .= ' has-checkbox-column';
		}
		return $class;
	}



	/**
	 * @return array
	 * @throws \EE_Error
	 */
	protected function _get_table_filters() {
		$filters = $where = array();
		$current_EVT_ID = isset( $this->_req_data['event_id'] ) ? (int) $this->_req_data['event_id'] : 0;
		if ( empty( $this->_dtts_for_event ) || count( $this->_dtts_for_event ) === 1 ) {
			//this means we don't have an event so let's setup a filter dropdown for all the events to select
			//note possible capability restrictions
			if ( ! EE_Registry::instance()->CAP->current_user_can( 'ee_read_private_events', 'get_events' ) ) {
				$where['status**'] = array( '!=', 'private' );
			}
			if ( ! EE_Registry::instance()->CAP->current_user_can( 'ee_read_others_events', 'get_events' ) ) {
				$where['EVT_wp_user'] = get_current_user_id();
			}
			$events = EEM_Event::instance()->get_all(
				array(
					$where,
					'order_by' => array( 'Datetime.DTT_EVT_start' => 'DESC' ),
				)
			);
			$evts[] = array(
				'id'   => 0,
				'text' => __( 'To toggle Check-in status, select an event', 'event_espresso' ),
			);
			$checked = 'checked';
			/** @var EE_Event $evt */
			foreach ( $events as $evt ) {
				//any registrations for this event?
				if ( ! $evt->get_count_of_all_registrations() ) {
					continue;
				}
                                $evts[] = array(
					'id'    => $evt->ID(),
					'text'  => apply_filters('FHEE__EE_Event_Registrations___get_table_filters__event_name', $evt->get( 'EVT_name' ), $evt),
					'class' => $evt->is_expired() ? 'ee-expired-event' : '',
				);
				if ( $evt->ID() === $current_EVT_ID && $evt->is_expired() ) {
					$checked = '';
				}
			}
			$event_filter = '<div class="ee-event-filter">';
			$event_filter .= EEH_Form_Fields::select_input( 'event_id', $evts, $current_EVT_ID );
			$event_filter .= '<span class="ee-event-filter-toggle">';
			$event_filter .= '<input type="checkbox" id="js-ee-hide-expired-events" ' . $checked . '> ';
			$event_filter .= __( 'Hide Expired Events', 'event_espresso' );
			$event_filter .= '</span>';
			$event_filter .= '</div>';
			$filters[] = $event_filter;
		}
		if ( ! empty( $this->_dtts_for_event ) ) {
			//DTT datetimes filter
			$this->_cur_dtt_id = isset( $this->_req_data['DTT_ID'] ) ? $this->_req_data['DTT_ID'] : 0;
			if ( count( $this->_dtts_for_event ) > 1 ) {
				$dtts[0] = __( 'To toggle check-in status, select a datetime.', 'event_espresso' );
				foreach ( $this->_dtts_for_event as $dtt ) {
                    $datetime_string = $dtt->name();
                    $datetime_string = ! empty($datetime_string ) ? ' (' . $datetime_string . ')' : '';
					$datetime_string = $dtt->start_date_and_time() . ' - ' . $dtt->end_date_and_time() . $datetime_string;
					$dtts[ $dtt->ID() ] = $datetime_string;
				}
				$input = new EE_Select_Input(
					$dtts,
					array(
						'html_name' => 'DTT_ID',
						'html_id'   => 'DTT_ID',
						'default'   => $this->_cur_dtt_id,
					)
				);
				$filters[] = $input->get_html_for_input();
				$filters[] = '<input type="hidden" name="event_id" value="' . $current_EVT_ID . '">';
			}
		}
		return $filters;
	}



	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_get_total_event_attendees();
	}



	/**
	 * @return int
	 * @throws \EE_Error
	 */
	protected function _get_total_event_attendees() {
		$EVT_ID = isset( $this->_req_data['event_id'] ) ? absint( $this->_req_data['event_id'] ) : false;
		$DTT_ID = $this->_cur_dtt_id;
		$query_params = array();
		if ( $EVT_ID ) {
			$query_params[0]['EVT_ID'] = $EVT_ID;
		}
		//if DTT is included we only show for that datetime.  Otherwise we're showing for all datetimes (the event).
		if ( $DTT_ID ) {
			$query_params[0]['Ticket.Datetime.DTT_ID'] = $DTT_ID;
		}
		$status_ids_array = apply_filters(
			'FHEE__Extend_Registrations_Admin_Page__get_event_attendees__status_ids_array',
			array( EEM_Registration::status_id_pending_payment, EEM_Registration::status_id_approved )
		);
		$query_params[0]['STS_ID'] = array( 'IN', $status_ids_array );
		return EEM_Registration::instance()->count( $query_params );
	}



	/**
	 * @param \EE_Registration $item
	 * @return string
	 */
	public function column__Reg_Status( EE_Registration $item ) {
		return '<span class="ee-status-strip ee-status-strip-td reg-status-' . $item->status_ID() . '"></span>';
	}



	/**
	 * @param \EE_Registration $item
	 * @return string
	 * @throws \EE_Error
	 */
	public function column_cb( $item ) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" value="%1$s" />', $item->ID() );
	}



	/**
	 * column_REG_att_checked_in
	 *
	 * @param \EE_Registration $item
	 * @return string
	 * @throws \EE_Error
	 */
	public function column__REG_att_checked_in( EE_Registration $item ) {
		$attendee = $item->attendee();
		$attendee_name = $attendee instanceof EE_Attendee ? $attendee->full_name() : '';

		if ( $this->_cur_dtt_id === 0 && count( $this->_dtts_for_event ) === 1 ) {
			$latest_related_datetime = $item->get_latest_related_datetime();
			if ( $latest_related_datetime instanceof EE_Datetime ) {
				$this->_cur_dtt_id = $latest_related_datetime->ID();
			}
		}

		$checkinstatus = $item->check_in_status_for_datetime( $this->_cur_dtt_id );
		$nonce = wp_create_nonce( 'checkin_nonce' );
		$toggle_active = ! empty ( $this->_cur_dtt_id )
		                 && EE_Registry::instance()->CAP->current_user_can(
			'ee_edit_checkin',
			'espresso_registrations_toggle_checkin_status',
			$item->ID()
		)
			? ' clickable trigger-checkin'
			: '';
		$mobile_view_content = ' <span class="show-on-mobile-view-only">' . $attendee_name . '</span>';
		return '<span class="checkin-icons checkedin-status-' . $checkinstatus . $toggle_active . '"'
		       . ' data-_regid="' . $item->ID() . '"'
		       . ' data-dttid="' . $this->_cur_dtt_id . '"'
		       . ' data-nonce="' . $nonce . '">'
		       . '</span>'
		       . $mobile_view_content;
	}



	/**
	 * @param \EE_Registration $item
	 * @return mixed|string|void
	 * @throws \EE_Error
	 */
	public function column_ATT_name( EE_Registration $item ) {
		$attendee = $item->attendee();
		if ( ! $attendee instanceof EE_Attendee ) {
			return __( 'No contact record for this registration.', 'event_espresso' );
		}
		// edit attendee link
		$edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
			array( 'action' => 'view_registration', '_REG_ID' => $item->ID() ),
			REG_ADMIN_URL
		);
		$name_link = EE_Registry::instance()->CAP->current_user_can(
			'ee_edit_contacts',
			'espresso_registrations_edit_attendee'
		)
			? '<a href="' . $edit_lnk_url . '" title="' . esc_attr__( 'View Registration Details', 'event_espresso' ) . '">'
			    . $item->attendee()->full_name()
			    . '</a>'
			: $item->attendee()->full_name();
		$name_link .= $item->count() === 1
			? '&nbsp;<sup><div class="dashicons dashicons-star-filled lt-blue-icon ee-icon-size-8"></div></sup>	'
			: '';
		//add group details
		$name_link .= '&nbsp;' . sprintf( __( '(%s of %s)', 'event_espresso' ), $item->count(), $item->group_size() );
		//add regcode
		$link = EE_Admin_Page::add_query_args_and_nonce(
			array( 'action' => 'view_registration', '_REG_ID' => $item->ID() ),
			REG_ADMIN_URL
		);
		$name_link .= '<br>';
		$name_link .= EE_Registry::instance()->instance()->CAP->current_user_can(
			'ee_read_registration',
			'view_registration',
			$item->ID()
		)
			? '<a href="' . $link . '" title="' . esc_attr__( 'View Registration Details', 'event_espresso' ) . '">'
			  . $item->reg_code()
			  . '</a>'
			: $item->reg_code();
		//status
		$name_link .= '<br><span class="ee-status-text-small">';
		$name_link .= EEH_Template::pretty_status( $item->status_ID(), false, 'sentence' );
		$name_link .= '</span>';
		$actions = array();
		$DTT_ID = $this->_cur_dtt_id;
		$latest_related_datetime = empty( $DTT_ID ) && ! empty( $this->_req_data['event_id'] ) && $item instanceof EE_Registration
			? $item->get_latest_related_datetime()
			: null;
		$DTT_ID = $latest_related_datetime instanceof EE_Datetime
			? $latest_related_datetime->ID()
			: $DTT_ID;
		if ( ! empty( $DTT_ID )
		     && EE_Registry::instance()->CAP->current_user_can(
				'ee_read_checkins',
				'espresso_registrations_registration_checkins'
			)
		) {
			$checkin_list_url = EE_Admin_Page::add_query_args_and_nonce(
				array( 'action' => 'registration_checkins', '_REGID' => $item->ID(), 'DTT_ID' => $DTT_ID )
			);
			$actions['checkin'] = '<a href="' . $checkin_list_url . '" title="' . esc_attr__(
					'View all the check-ins/checkouts for this registrant',
					'event_espresso'
				) . '">' . __( 'View', 'event_espresso' ) . '</a>';
		}
		return ! empty( $DTT_ID ) ? sprintf( '%1$s %2$s', $name_link, $this->row_actions( $actions ) ) : $name_link;
	}



	/**
	 * @param \EE_Registration $item
	 * @return string
	 */
	public function column_ATT_email( EE_Registration $item ) {
		$attendee = $item->attendee();
		return $attendee instanceof EE_Attendee ? $attendee->email() : '';
	}



	/**
	 * @param \EE_Registration $item
	 * @return bool|string
	 * @throws \EE_Error
	 */
	public function column_Event( EE_Registration $item ) {
		try {
			$event = $this->_evt instanceof EE_Event ? $this->_evt : $item->event();
			$chkin_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
				array( 'action' => 'event_registrations', 'event_id' => $event->ID() ),
				REG_ADMIN_URL
			);
			$event_label = EE_Registry::instance()->CAP->current_user_can(
				'ee_read_checkins',
				'espresso_registrations_registration_checkins'
			) ? '<a href="' . $chkin_lnk_url . '" title="' . esc_attr__(
					'View Checkins for this Event',
					'event_espresso'
				) . '">' . $event->name() . '</a>' : $event->name();
		} catch ( \EventEspresso\core\exceptions\EntityNotFoundException $e ) {
			$event_label = esc_html__( 'Unknown', 'event_espresso' );
		}
		return $event_label;
	}



	/**
	 * @param \EE_Registration $item
	 * @return mixed|string|void
	 */
	public function column_PRC_name( EE_Registration $item ) {
		return $item->ticket() instanceof EE_Ticket ? $item->ticket()->name() : __( "Unknown", "event_espresso" );
	}



	/**
	 * column_REG_final_price
	 *
	 * @param \EE_Registration $item
	 * @return string
	 */
	public function column__REG_final_price( EE_Registration $item ) {
		return '<span class="reg-pad-rght">' . ' ' . $item->pretty_final_price() . '</span>';
	}



	/**
	 * column_TXN_paid
	 *
	 * @param \EE_Registration $item
	 * @return string
	 * @throws \EE_Error
	 */
	public function column_TXN_paid( EE_Registration $item ) {
		if ( $item->count() === 1 ) {
			if ( $item->transaction()->paid() >= $item->transaction()->total() ) {
				return '<span class="reg-pad-rght"><div class="dashicons dashicons-yes green-icon"></div></span>';
			} else {
				$view_txn_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
					array( 'action' => 'view_transaction', 'TXN_ID' => $item->transaction_ID() ),
					TXN_ADMIN_URL
				);
				return EE_Registry::instance()->CAP->current_user_can(
					'ee_read_transaction',
					'espresso_transactions_view_transaction'
				) ? '
				<span class="reg-pad-rght">
					<a class="status-'
				    . $item->transaction()->status_ID()
				    . '" href="'
				    . $view_txn_lnk_url
				    . '"  title="'
				    . esc_attr__( 'View Transaction', 'event_espresso' )
				    . '">
						'
				    . $item->transaction()->pretty_paid()
				    . '
					</a>
				<span>' : '<span class="reg-pad-rght">' . $item->transaction()->pretty_paid() . '</span>';
			}
		} else {
			return '<span class="reg-pad-rght"></span>';
		}
	}



	/**
	 *        column_TXN_total
	 *
	 * @param \EE_Registration $item
	 * @return string
	 * @throws \EE_Error
	 */
	public function column_TXN_total( EE_Registration $item ) {
		$txn = $item->transaction();
		$view_txn_url = add_query_arg( array( 'action' => 'view_transaction', 'TXN_ID' => $txn->ID() ), TXN_ADMIN_URL );
		if ( $item->get( 'REG_count' ) === 1 ) {
			$line_total_obj = $txn->total_line_item();
			$txn_total = $line_total_obj instanceof EE_Line_Item
				? $line_total_obj->get_pretty( 'LIN_total' )
				: __(
					'View Transaction',
					'event_espresso'
				);
			return EE_Registry::instance()->CAP->current_user_can(
				'ee_read_transaction',
				'espresso_transactions_view_transaction'
			) ? '<a href="'
			    . $view_txn_url
			    . '" title="'
			    . esc_attr__( 'View Transaction', 'event_espresso' )
			    . '"><span class="reg-pad-rght">'
			    . $txn_total
			    . '</span></a>' : '<span class="reg-pad-rght">' . $txn_total . '</span>';
		} else {
			return '<span class="reg-pad-rght"></span>';
		}
	}

}

<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');


class EE_Event_Registrations_List_Table extends EE_Admin_List_Table {

	/**
	 * This property will hold the related Datetimes on an event IF the event id is included in the request.
	 * @var EE_Datetime[]
	 */
	protected $_dtts_for_event = array();
	/**
	 * The event if one is specified in teh request
	 * @var EE_Event
	 */
	protected $_evt = NULL;

	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
        $this->_status = $this->_admin_page->get_registration_status_array();
	}




	protected function _setup_data() {
		$this->_data = $this->_view != 'trash' ? $this->_admin_page->get_event_attendees( $this->_per_page ) : $this->_admin_page->get_event_attendees( $this->_per_page, FALSE, TRUE );
		$this->_all_data_count = $this->_view != 'trash' ? $this->_admin_page->get_event_attendees(  $this->_per_page, TRUE ) : $this->_admin_page->get_event_attendees(  $this->_per_page, TRUE, TRUE);
	}




	protected function _set_properties() {
		$evt_id = isset( $this->_req_data['event_id'] ) ? $this->_req_data['event_id'] : NULL;

		$this->_wp_list_args = array(
			'singular' => __('registrant', 'event_espresso'),
			'plural' => __('registrants', 'event_espresso'),
			'ajax' => TRUE,
			'screen' => $this->_admin_page->get_current_screen()->id
			);

		$columns['_Reg_Status'] = '';
		if ( !empty( $evt_id ) )
			$columns['cb'] =  '<input type="checkbox" />'; //Render a checkbox instead of text

		$this->_columns = array(
				'_REG_att_checked_in' => '<span class="dashicons dashicons-yes ee-icon-size-18"></span>',
				'_REG_count' => '#',
				'ATT_name' =>  __('Registrant', 'event_espresso'),
				'ATT_email' =>  __('Email Address', 'event_espresso'),
				'Event' => __('Event', 'event_espresso'),
				'_REG_code' => __( 'Reg Code', 'event_espresso' ),
				'PRC_name' => __('TKT Option', 'event_espresso'),
				'_REG_final_price' => __('Price', 'event_espresso'),
				'TXN_paid' => __('Paid', 'event_espresso'),
				'TXN_total' => __('Total', 'event_espresso')
			);

		$this->_columns = array_merge( $columns, $this->_columns);

		if ( !empty( $evt_id ) ) {
			$this->_bottom_buttons = array(
			'report'=> array(
				'route' => 'registrations_report',
				'extra_request' => !empty($evt_id) ? array('EVT_ID'=>$evt_id) : NULL
				)
		);
		}

		$this->_sortable_columns = array(
			 //true means its already sorted
			'ATT_name' => array( 'ATT_name' => TRUE ),
			'_REG_code' => array( '_REG_code' => TRUE ),
			'Event' => array( 'Event.EVT.Name' => FALSE )
		);

		$this->_hidden_columns = array();
		
		
		$this->_evt = EEM_Event::instance()->get_one_by_ID($evt_id);
		$this->_dtts_for_event = !empty($evt_id) ? $this->_evt->datetimes_ordered() : array();
		

	}





	protected function _get_table_filters() {
		$filters = array();
		EE_Registry::instance()->load_helper( 'Form_Fields' );

		if ( empty( $this->_dtts_for_event ) ) {
			//this means we don't have an event so let's setup a filter dropdown for all the events to select
			$events = EEM_Event::instance()->get_all(array(array(), 'order_by' => array( 'EVT_name' => 'asc' ) ) );
			$evts[] = array('id' => 0, 'text' => __('To toggle Check-in status, select an event', 'event_espresso') );
			foreach ( $events as $evt ) {
				//any registrations for this event?
				if ( ! $evt->get_count_of_all_registrations() )
					continue;
				$evts[] = array( 'id' => $evt->ID(), 'text' => $evt->get('EVT_name') );
			}
			$filters[] = EEH_Form_Fields::select_input( 'event_id', $evts );
			
		} else {
			//DTT datetimes filter
			$cur_dtt = isset( $this->_req_data['DTT_ID'] ) ? $this->_req_data['DTT_ID'] : $this->_evt->primary_datetime()->ID();
			$dtts = array();
			foreach ( $this->_dtts_for_event as $dtt ) {
				$datetime_string = $dtt->start_date_and_time() . ' - ' . $dtt->end_date_and_time();
				$dtts[] = array('id' => $dtt->ID(), 'text' => $datetime_string );
			}
			$filters[] = EEH_Form_Fields::select_input('DTT_ID', $dtts, $cur_dtt);
		}

		return $filters;
	}
	





	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_get_total_event_attendees();
	}




	protected function _get_total_event_attendees() {
		$EVT_ID = isset($this->_req_data['event_id']) ? absint( $this->_req_data['event_id'] ) : FALSE;
		$DTT_ID = isset( $this->_req_data['DTT_ID'] ) ? $this->_req_data['DTT_ID'] : NULL;
		$query_params = array();
		if ($EVT_ID){
			$query_params[0]['EVT_ID']=$EVT_ID;
		}
		//if DTT is included we do multiple datetimes.  Otherwise we just do primary datetime
		if ( $DTT_ID ) {
			$query_params[0]['Ticket.Datetime.DTT_ID'] = $DTT_ID;
		}
		$status_ids_array = apply_filters( 'FHEE__Extend_Registrations_Admin_Page__get_event_attendees__status_ids_array', array( EEM_Registration::status_id_pending_payment, EEM_Registration::status_id_approved ) );

		$query_params[0]['STS_ID']= array('IN', $status_ids_array );
		return EEM_Registration::instance()->count($query_params);
	}





	function column_default( $item, $column_name ) {
		return isset( $item->$column_name ) ? $item->$column_name : '';
	}




	function column__Reg_Status( EE_Registration $item ) {
    	return '<span class="ee-status-strip ee-status-strip-td reg-status-' . $item->status_ID() . '"></span>';
    }





	function column_cb(EE_Registration $item) {
		return sprintf( '<input type="checkbox" name="checkbox[%1$s]" />', $item->ID() );
	}








	/**
	 * 		column_REG_att_checked_in
	*/
	function column__REG_att_checked_in(EE_Registration $item){
		$DTT_ID = isset( $this->_req_data['DTT_ID'] ) ? $this->_req_data['DTT_ID'] : 0;
		$checkinstatus = $item->check_in_status_for_datetime($DTT_ID);
		$nonce = wp_create_nonce('checkin_nonce');
		$toggle_active = isset ( $this->_req_data['event_id'] ) ? ' clickable trigger-checkin' : '';

		 return '<span class="checkin-icons checkedin-status-' . $checkinstatus . $toggle_active . '" data-_regid="' . $item->ID() . '" data-dttid="' . $DTT_ID . '" data-nonce="' . $nonce . '"></span>';
	}





	function column_ATT_name(EE_Registration $item) {
		// edit attendee link
		$edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_registration', '_REG_ID'=>$item->ID() ), REG_ADMIN_URL );
		$name_link = '<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Contact', 'event_espresso' ) . '">' . $item->attendee()->full_name() . '</a>';
		$name_link .= $item->count() == 1 ? '<img class="primary-attendee-star-img" src="' . EE_GLOBAL_ASSETS_URL . 'images/star-8x8.png" width="8" height="8" alt="this is the primary registrant"/>' : '';

		$actions = array();
		$DTT_ID = !empty( $this->_req_data['DTT_ID'] ) ? $this->_req_data['DTT_ID'] : NULL;
		$DTT_ID = empty( $DTT_ID ) && !empty( $this->_req_data['event_id'] ) ? EEM_Event::instance()->get_one_by_ID( $this->_req_data['event_id'] )->primary_datetime()->ID() : $DTT_ID;
		
		if ( !empty($DTT_ID) ) {
			$checkin_list_url = EE_Admin_Page::add_query_args_and_nonce( array('action' => 'registration_checkins', '_REGID' => $item->ID(), 'DTT_ID' => $DTT_ID));
			$actions['checkin'] = '<a href="' . $checkin_list_url . '" title="' . __('View all the check-ins/checkouts for this registrant', 'event_espresso' ) . '">' . __('View', 'event_espresso') . '</a>';
		}

		return !empty( $DTT_ID ) ? sprintf( '%1$s %2$s', $name_link, $this->row_actions($actions) ) : $name_link;
	}



	function column_ATT_email( EE_Registration $item ) {
		return $item->get_first_related('Attendee')->email();
	}


	/**
	 * 		column_REG_count
	*/
	function column__REG_count(EE_Registration $item){
		return sprintf(__( '%s of %s', 'event_espresso' ),$item->count(), $item->group_size());
	}


	/**
	 * REG_code
	 * @param  EE_Registration $item EE_Registration object
	 * @return string                Registration code
	 */
	function column__REG_code(EE_Registration $item){
		$link = EE_Admin_Page::add_query_args_and_nonce( array( 'action' => 'view_registration', '_REG_ID' => $item->ID() ), REG_ADMIN_URL );
		return '<a href="' . $link . '" title="' . __('View Registration Details', 'event_espresso') .'">' . $item->get('REG_code') . '</a>';
	}





	function column_Event(EE_Registration $item) {
		$event = $this->_evt instanceof EE_Event ? $this->_evt : $item->event();
		$chkin_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'event_registrations', 'event_id'=>$event->ID() ), REG_ADMIN_URL );	
		$event_label = '<a href="'.$chkin_lnk_url.'" title="' . __( 'View Checkins for this Event', 'event_espresso' ) . '">' . $event->name() . '</a>';	
		return $event_label;	
	}





	function column_PRC_name(EE_Registration $item){		
		return $item->ticket() ? $item->ticket()->name() : __("Unknown", "event_espresso");
	}






	/**
	 * 		column_REG_final_price
	*/
	function column__REG_final_price(EE_Registration $item){
		return '<span class="reg-pad-rght">' .  ' ' . $item->pretty_price_paid() . '</span>';	
	}





	/**
	 * 		column_TXN_paid
	*/
	function column_TXN_paid(EE_Registration $item){
	
		if ( $item->count() == 1 ) {
			
			if ( $item->transaction()->paid() >= $item->transaction()->total() ) {
				return '<span class="reg-pad-rght"><img class="" src="' . EE_GLOBAL_ASSETS_URL . 'images/check-mark-16x16.png" width="16" height="16" alt="Paid in Full"/></span>';
			} else {
				$view_txn_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_transaction', 'TXN_ID'=>$item->transaction_ID() ), TXN_ADMIN_URL );
				return '
				<span class="reg-pad-rght">
					<a class="status-'. $item->transaction()->status_ID() .'" href="'.$view_txn_lnk_url.'"  title="' . __( 'View Transaction', 'event_espresso' ) . '">
						' . $item->transaction()->pretty_paid(). '
					</a>
				<span>';
			}			
		} else {
			return '<span class="reg-pad-rght"></span>';
		}
		
	}




	/**
	 * 		column_TXN_total
	*/
	function column_TXN_total(EE_Registration $item){
		$txn = $item->transaction();
		$view_txn_url = add_query_arg( array('action' => 'view_transaction', 'TXN_ID' => $txn->ID() ), TXN_ADMIN_URL );	
		if ( $item->get('REG_count') == 1 ) {
			$line_total_obj = $txn->total_line_item();
			$txn_total = $line_total_obj instanceof EE_Line_Item ? $line_total_obj->get_pretty('LIN_total') : __('View Transaction', 'event_espresso');
			return '<a href="' . $view_txn_url . '" title="' . __('View Transaction', 'event_espresso') . '"><span class="reg-pad-rght">'. $txn_total  .'</span></a>';
		} else {
			return '<span class="reg-pad-rght"></span>';
		}		
	}

}

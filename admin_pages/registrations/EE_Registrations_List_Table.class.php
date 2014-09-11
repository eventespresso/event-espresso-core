<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link			{@link http://www.eventespresso.com}
 * @ since		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Registrations Table class
 *
 * @package			Event Espresso
 * @subpackage		includes/admin_screens/Registrations_List_Table.class.php
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */


class EE_Registrations_List_Table extends EE_Admin_List_Table {



	private $_status;



	/**
	 * 		constructor
	*/
	function __construct( $admin_page ){
        parent::__construct($admin_page);
        $this->_status = $this->_admin_page->get_registration_status_array();
	}





	protected function _setup_data() {
		$this->_data = $this->_admin_page->get_registrations( $this->_per_page );
		$this->_all_data_count = $this->_admin_page->get_registrations( $this->_per_page, TRUE, FALSE, FALSE );
	}




	protected function _set_properties() {
		$this->_wp_list_args = array(
			'singular' => __('registration', 'event_espresso'),
			'plural' => __('registrations', 'event_espresso'),
			'ajax' => TRUE,
			'screen' => $this->_admin_page->get_current_screen()->id
			);


		if ( isset( $_GET['event_id'] )) {
			$this->_columns = array(
				'_Reg_Status' => '',
            	'cb' => '<input type="checkbox" />', //Render a checkbox instead of text
	           	'_REG_ID' => __( 'ID', 'event_espresso' ),
	           	'_REG_count' => '#',
	           	'ATT_fname' => __( 'Name', 'event_espresso' ),
				'ATT_email' =>  __('Email', 'event_espresso'),
				'_REG_date' => __( 'Reg Date', 'event_espresso' ),
				'_REG_code' => __( 'Reg Code', 'event_espresso' ),
				//'Reg_status' => __( 'Status', 'event_espresso' ),
	  			'PRC_amount' => __( 'TKT Price', 'event_espresso' ),
	  			'_REG_final_price' => __( 'Final Price', 'event_espresso' ),
	  			'TXN_total' => __( 'Total Txn', 'event_espresso' ),
 				'TXN_paid' => __('Paid', 'event_espresso'),
	           	'actions' => __( 'Actions', 'event_espresso' )
	        );
			$this->_bottom_buttons = array(
				'report'=> array(
					'route' => 'registrations_report',
					'extra_request' => isset( $this->_req_data['event_id'] ) ? array('EVT_ID'=>$this->_req_data['event_id']) : NULL
					)
			);
		} else {
			$this->_columns = array(
				'_Reg_Status' => '',
            	'cb' => '<input type="checkbox" />', //Render a checkbox instead of text
	           	'_REG_ID' => __( 'ID', 'event_espresso' ),
				'_REG_count' => '#',
	           	'ATT_fname' => __( 'Name', 'event_espresso' ),
				'_REG_date' => __( 'TXN Date', 'event_espresso' ),
				'event_name' => __( 'Event', 'event_espresso' ),
	   	       	'DTT_EVT_start' => __( 'Event Date', 'event_espresso' ),
				'_REG_code' => __( 'Reg Code', 'event_espresso' ),
				//'Reg_status' => __( 'Status', 'event_espresso' ),
	  			'_REG_final_price' => __( 'Price', 'event_espresso' ),
            	'actions' => __( 'Actions', 'event_espresso' )
	        );
		}


        $this->_sortable_columns = array(
          	'_REG_date' => array( '_REG_date' => TRUE ),   //true means its already sorted
           	'ATT_fname' => array( 'ATT_fname' => FALSE ),
           	'event_name' => array( 'event_name' => FALSE ),
           	'DTT_EVT_start'	=> array( 'DTT_EVT_start' => FALSE ),
           	//'Reg_status' => array( 'Reg_status' => FALSE ),
			'_REG_ID' => array( '_REG_ID' => FALSE ),
        	);

        $this->_hidden_columns = array();
	}





	protected function _get_table_filters() {
		$filters = array();

		//todo we're currently using old functions here. We need to move things into the Events_Admin_Page() class as methods.
		EE_Registry::instance()->load_helper( 'Form_Fields' );

		$curstatus = isset( $this->_req_data['status'] ) ? $this->_req_data['status'] : NULL;
		$cur_date = isset( $this->_req_data['month_range'] ) ? $this->_req_data['month_range'] : '';
		$cur_category = isset( $this->_req_data['EVT_CAT'] ) ? $this->_req_data['EVT_CAT'] : -1;
		$reg_status = isset( $this->_req_data['_reg_status'] ) ? $this->_req_data['_reg_status'] : '';

		$filters[] = EEH_Form_Fields::generate_registration_months_dropdown( $cur_date, $reg_status, $cur_category );
		$filters[] = EEH_Form_Fields::generate_event_category_dropdown( $cur_category );

		$status = array();
		$status[] = array( 'id' => 0, 'text' => __('Select Status', 'event_espresso') );
		foreach ( $this->_status as $key => $value ) {
                $status[] = array( 'id' => $key, 'text' => $value );
            }
		$filters[] = EEH_Form_Fields::select_input('_reg_status', $status, isset($this->_req_data['_reg_status']) ? strtoupper(sanitize_key( $this->_req_data['_reg_status'] ) ): '');

		return $filters;
	}




	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_total_registrations();
		$this->_views['month']['count'] = $this->_total_registrations_this_month();
		$this->_views['today']['count'] = $this->_total_registrations_today();
		$this->_views['trash']['count'] = $this->_total_registrations(TRUE);
	}




	protected function _total_registrations($trashed = FALSE){
		$EVT_ID = isset( $this->_req_data['event_id'] ) ? absint( $this->_req_data['event_id'] ) : FALSE;
		$_where = $EVT_ID ? array( 'EVT_ID' => $EVT_ID ) : array();
		return $trashed ? EEM_Registration::instance()->count_deleted(array($_where) ) :EEM_Registration::instance()->count(array( $_where ) );
	}



	protected function _total_registrations_this_month(){
		$EVT_ID = isset( $this->_req_data['event_id'] ) ? absint( $this->_req_data['event_id'] ) : FALSE;
		$_where = $EVT_ID ? array( 'EVT_ID' => $EVT_ID ) : array();
		$this_year_r = date('Y', current_time('timestamp'));
		$time_start = ' 00:00:00';
		$time_end = ' 23:59:59';
		$this_month_r = date('m', current_time('timestamp'));
		$days_this_month = date( 't', current_time('timestamp') );
		$_where['REG_date']= array('BETWEEN',
			array(
				strtotime( $this_year_r . '-' . $this_month_r . '-01' . ' ' . $time_start ),
				strtotime( $this_year_r . '-' . $this_month_r . $days_this_month . ' ' . $time_end )
		));
		return EEM_Registration::instance()->count(array( $_where ) );
	}


	protected function _total_registrations_today(){

		$EVT_ID = isset( $this->_req_data['event_id'] ) ? absint( $this->_req_data['event_id'] ) : FALSE;
		$_where = $EVT_ID ? array( 'EVT_ID' => $EVT_ID ) : array();
		$curdate = date('Y-m-d', current_time('timestamp'));
		$time_start = ' 00:00:00';
		$time_end = ' 23:59:59';
		$_where['REG_date']= array('BETWEEN',
			array(
				strtotime($curdate . $time_start),
				strtotime($curdate . $time_end)
		));
		return EEM_Registration::instance()->count(array( $_where ) );
	}






    function column__Reg_Status( EE_Registration $item ) {
    	return '<span class="ee-status-strip ee-status-strip-td reg-status-' . $item->status_ID() . '"></span>';
    }



	/**
	 * 		column_cb
	*/
    function column_cb(EE_Registration $item){
	/** checkbox/lock **/
	$payment_count = $item->get_first_related('Transaction')->count_related('Payment');
	return $payment_count > 0 ? sprintf( '<input type="checkbox" name="_REG_ID[]" value="%1$s" />', $item->ID() ) . '<span class="ee-lock-icon"></span>' : sprintf( '<input type="checkbox" name="_REG_ID[]" value="%1$s" />', $item->ID() );
    }


	function column__REG_ID(EE_Registration $item){
		return $item->ID();
	}


	/**
	 * 		REG_date
	*/
	function column__REG_date(EE_Registration $item){

		//Build row actions
		$actions = array();

        //Build row actions
		$view_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_transaction', 'TXN_ID'=>$item->get_first_related('Transaction')->ID() ), TXN_ADMIN_URL );
		$REG_date = '<a href="'.$view_lnk_url.'" title="' . __( 'View Transaction Details', 'event_espresso' ) . '">' . $item->reg_date() . '</a>';

		return $REG_date;

	}




	/**
	* 		column_event_name
	*/
	function column_event_name(EE_Registration $item){

		// page=espresso_events&action=edit_event&EVT_ID=2&edit_event_nonce=cf3a7e5b62
		$edit_event_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'edit', 'post'=>$item->event_ID() ), EVENTS_ADMIN_URL );
		$event_name = $item->event_name();
		$event_name = $event_name ? $event_name : __("No Associated Event", 'event_espresso');
		$edit_event = '<a href="' . $edit_event_url . '" title="' . sprintf( __( 'Edit Event: %s', 'event_espresso' ), $event_name ) .'">' .  wp_trim_words( $event_name, 30, '...' ) . '</a>';

		$edit_event_url = EE_Admin_Page::add_query_args_and_nonce( array( 'event_id'=>$item->event_ID() ), REG_ADMIN_URL );
		$actions['event_filter'] = '<a href="' . $edit_event_url . '" title="' . sprintf( __( 'Filter this list to only show registrations for %s', 'event_espresso' ), $event_name ) .'">' .  __( 'View Registrations', 'event_espresso' ) . '</a>';

		return sprintf('%1$s %2$s', $edit_event, $this->row_actions($actions) );
	}








	/**
	 * 		column_default
	*/
   	function column_DTT_EVT_start(EE_Registration $item){
		$datetime_strings = array();
		$remove_defaults = array('default_where_conditions' => 'none');
		$datetimes = $item->ticket($remove_defaults)->datetimes($remove_defaults);
		foreach($datetimes as $datetime){
			$datetime_strings[] = $datetime->start_date_and_time();
		}
		return implode("<br />",$datetime_strings);
    }






	/**
	 * 		column_ATT_fname
	*/
   	function column_ATT_fname(EE_Registration $item){
   		$attendee = $item->attendee();
		$edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_registration', '_REG_ID'=>$item->ID() ), REG_ADMIN_URL );
		$attendee_name = $attendee instanceof EE_Attendee ? $attendee->full_name() : '';
		$link = '<a href="'.$edit_lnk_url.'" title="' . __( 'View Registration Details', 'event_espresso' ) . '">' . $attendee_name . '</a>';
		$link .= $item->count() == 1 ? '&nbsp;<sup><div class="dashicons dashicons-star-filled lt-blue-icon ee-icon-size-8"></div></sup>' : '';

		$payment_count = $item->get_first_related('Transaction')->count_related('Payment');

		//trash/restore/delete actions
		$actions = array();
		if ( $this->_view != 'trash' && $payment_count === 0 ) {
			$trash_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'trash_registrations', '_REG_ID'=>$item->ID() ), REG_ADMIN_URL );
			$actions['trash'] = '<a href="'.$trash_lnk_url.'" title="' . __( 'Trash Registration', 'event_espresso' ) . '">' . __( 'Trash', 'event_espresso' ) . '</a>';
		} elseif ( $this->_view == 'trash' ) {
			// restore registration link
			$restore_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'restore_registrations', '_REG_ID'=>$item->ID() ), REG_ADMIN_URL );
			$delete_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'delete_registrations', '_REG_ID'=>$item->ID() ), REG_ADMIN_URL );
			$actions['restore'] = '<a href="'.$restore_lnk_url.'" title="' . __( 'Restore Registration', 'event_espresso' ) . '">' . __( 'Restore', 'event_espresso' ) . '</a>';
			$actions['delete'] = '<a href="'.$delete_lnk_url.'" title="' . __( 'Delete Registration Permanently', 'event_espresso' ). '">' . __( 'Delete', 'event_espresso' ) . '</a>';
		}

		return sprintf('%1$s %2$s', $link, $this->row_actions($actions) );
	}




	function column_ATT_email( EE_Registration $item ) {
		$attendee = $item->get_first_related('Attendee');
		return ! $attendee instanceof EE_Attendee ? __('Unable to get the email address, something is wrong with this data', 'event_espresso') : $attendee->email();
	}





	/**
	 * 		column_REG_count
	*/
	function column__REG_count(EE_Registration $item){
		return  sprintf(__( '%1$s of %2$s', 'event_espresso' ), $item->count(), $item->group_size());
	}



	/**
	 * REG code column
	 * @param  EE_Registration $item registration object
	 * @return string                column contents
	 */
	function column__REG_code( EE_Registration $item) {
		return $item->get('REG_code');
	}




	/**
	 * 		column_Reg_status
	*/
   	/*function column_Reg_status(EE_Registration $item){
		return '<span class="status-'. $item->status_ID() .'">' . str_replace ( '_', ' ', $this->_status[ $item->status_ID() ] ) . '</span>';
	}/**/







	/**
	 * 		column_PRC_amount
	*/
	function column_PRC_amount(EE_Registration $item){
		$content = isset( $_GET['event_id'] ) ? '<span class="TKT_name">' . $item->ticket()->name() . '</span><br />' : '';

		if ( $item->price_paid() > 0 ) {
			$content .= '<span class="reg-pad-rght">' . $item->pretty_price_paid() . '</span>';
		} else {
			// free event
			$content .= '<span class="reg-overview-free-event-spn reg-pad-rght">' . __( 'free', 'event_espresso' ) . '</span>';
		}

		return $content;

	}






	/**
	 * 		column_REG_final_price
	*/
	function column__REG_final_price(EE_Registration $item){
		$content = isset( $_GET['event_id'] ) ? '' : '<span class="TKT_name">' . $item->ticket()->name() . '</span><br />';

		$content .= '<span class="reg-pad-rght">' .  $item->pretty_price_paid() . '</span>';
		return $content;

	}





	/**
	 * 		column_TXN_total
	*/
	function column_TXN_total(EE_Registration $item){
		if($item->transaction()){
			$view_txn_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_transaction', 'TXN_ID'=>$item->transaction_ID() ), TXN_ADMIN_URL );
			return '<span class="reg-pad-rght"><a class="status-'. $item->transaction()->status_ID() .'" href="'.$view_txn_lnk_url.'"  title="' . __( 'View Transaction', 'event_espresso' ) . '">'  . $item->transaction()->pretty_total() . '</a></span>';
		}else{
			__("None", "event_espresso");
		}
	}





	/**
	 * 		column_TXN_paid
	*/
	function column_TXN_paid(EE_Registration $item){

		if ( $item->count() == 1 ) {
			$transaction = $item->transaction() ? $item->transaction() : EE_Transaction::new_instance();
			if ( $transaction->paid() >= $transaction->total() ) {
				return '<span class="reg-pad-rght"><div class="dashicons dashicons-yes green-icon"></div></span>';
			} else {
				$view_txn_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_transaction', 'TXN_ID'=>$item->transaction_ID() ), TXN_ADMIN_URL );
				return '<span class="reg-pad-rght"><a class="status-'. $transaction->status_ID() .'" href="'.$view_txn_lnk_url.'"  title="' . __( 'View Transaction', 'event_espresso' ) . '">' . $item->transaction()->pretty_paid() . '</a><span>';
			}
		}

		return '&nbsp;';

	}







	/**
	 * 		column_actions
	*/
	function column_actions(EE_Registration $item) {

	        //Build row actions
		$view_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_registration', '_REG_ID'=>$item->ID() ), REG_ADMIN_URL );
		$edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'edit_attendee', 'post'=>$item->attendee_ID() ), REG_ADMIN_URL );

		// page=attendees&event_admin_reports=resend_email&registration_id=43653465634&event_id=2&form_action=resend_email
		//$resend_reg_lnk_url_params = array( 'action'=>'resend_registration', '_REG_ID'=>$item->REG_ID );
		$resend_reg_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'resend_registration', '_REG_ID'=>$item->ID() ), REG_ADMIN_URL );


	        //Build row actions
	        $view_lnk = '
		<li>
			<a href="'.$view_lnk_url.'" title="' . __( 'View Registration Details', 'event_espresso' ) . '" class="tiny-text">
				<div class="dashicons dashicons-clipboard"></div>
			</a>
		</li>';

	       $edit_lnk = '
		<li>
			<a href="'.$edit_lnk_url.'" title="' . __( 'Edit Contact Details', 'event_espresso' ) . '" class="tiny-text">
				<div class="ee-icon ee-icon-user-edit ee-icon-size-16"></div>
			</a>
		</li>';

	         $resend_reg_lnk = '
		<li>
			<a href="'.$resend_reg_lnk_url.'" title="' . __( 'Resend Registration Details', 'event_espresso' ) . '" class="tiny-text">
				<div class="dashicons dashicons-email-alt"></div>
			</a>
		</li>';

			// page=transactions&action=view_transaction&txn=256&_wpnonce=6414da4dbb
		$view_txn_lnk_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_transaction', 'TXN_ID'=>$item->transaction_ID() ), TXN_ADMIN_URL );
		$view_txn_lnk = '
		<li>
			<a href="'.$view_txn_lnk_url.'"  title="' . __( 'View Transaction', 'event_espresso' ) . '" class="tiny-text">
				<div class="dashicons dashicons-cart"></div>
			</a>
		</li>';

			$actions = '
	<ul class="reg-overview-actions-ul">' .
	$view_lnk . $edit_lnk . $resend_reg_lnk . $view_txn_lnk . '
	</ul>';

			return $actions;

	}

}

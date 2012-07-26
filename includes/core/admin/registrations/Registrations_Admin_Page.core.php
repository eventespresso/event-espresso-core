<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');		
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Admin_Registrations class
 *
 * @package			Event Espresso
 * @subpackage	includes/core/admin/transactions/Registrations_Admin_Page.core.php 
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Registrations_Admin_Page extends Admin_Page {

	private $_registration;
	private $_session;
	private static $_reg_status;


	

	public function __construct() {

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		parent::__construct();
		$this->define_page_vars();
		if ( isset($_POST['espresso_ajax']) && $_POST['espresso_ajax'] == 1 ) {
//			add_action('wp_ajax_espresso_apply_payment', array( &$this, 'apply_payments_or_refunds'));
//			add_action('wp_ajax_espresso_delete_payment', array( &$this, 'delete_payment'));
		}

	}




	/**
	 * 		grab url requests and route them
	*		@access private
	*		@return void
	*/
	public function route_admin_request() {			

		$this->_get_registration_status_array();

		if ( isset( $_REQUEST['action'] )) {

			check_admin_referer( $_REQUEST['action'] );

			switch ( $_REQUEST['action'] ) {

				case 'view_registration':
					$this->_registration_details();
					break;

				case 'edit_registration':
					$this->_registration_details( 'edit' );
					break;

				case 'delete_registration':
					$this->_delete_registration();
					break;
					
				case 'reports':
					$this->_registration_reports();
					break;
					
			}

		} else {
			$_REQUEST['action'] = FALSE;
			$this->_registrations_overview_list_table();
		}

	}





	/**
	 * 		grab url requests and route them
	*		@access private
	*		@return void
	*/
	public function define_page_vars() {
		$this->admin_base_url = REG_ADMIN_URL;
		$this->admin_page_title = __( 'Registrations', 'event_espresso' );
	}





	/**
	 * 		get list of registration statuses
	*		@access private
	*		@return void
	*/
	private function _get_registration_status_array() {

		global $wpdb;
		$SQL = 'SELECT STS_ID, STS_code FROM '. $wpdb->prefix . 'esp_status WHERE STS_type = "registration"';
		$results = $wpdb->get_results( $SQL );

		self::$_reg_status = array();
		foreach ( $results as $status ) {
			self::$_reg_status[ $status->STS_ID ] = $status->STS_code;
		}
	}





	/**
	 * 		generates HTML for main Registrations Admin page
	*		@access private
	*		@return void
	*/
	private function _registrations_overview_list_table() {

		global $wpdb, $espresso_premium;
		
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
		$REG = EEM_Registration::instance();
		require_once( REG_ADMIN . 'Registrations_List_Table.class.php' );

		require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin_screens/events/queries.php' );
		// require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/functions/attendee_functions.php' );

		if ( $espresso_premium ) {

			$filter_template_args = array();
			// base form url for filters
			$filter_template_args['reg_overview_filters_frm_url'] = REG_ADMIN_URL;
			// grab filter
			$filter = isset( $_REQUEST['filter'] ) ? sanitize_key( $_REQUEST['filter'] ) : FALSE;
			// set current status for filters
			$filter_template_args['reg_filter_all_class'] = $filter == 'all' ? ' current' : '';
			$filter_template_args['reg_filter_month_class'] = $filter == 'month' ? ' current' : '';
			$filter_template_args['reg_filter_today_class'] = $filter == 'today' ? ' current' : '';
			// filter form urls
			$filter_template_args['reg_filter_all_url'] = add_query_arg( array( 'filter' => 'all' ), REG_ADMIN_URL );
			$filter_template_args['reg_filter_month_url'] = add_query_arg( array( 'filter' => 'month' ), REG_ADMIN_URL );
			$filter_template_args['reg_filter_today_url'] = add_query_arg( array( 'filter' => 'today' ), REG_ADMIN_URL );
			// filter bt month
			$month_range = isset($_POST['month_range']) ? sanitize_key( $_REQUEST['month_range'] ) : '';
			$filter_template_args['reg_overview_filter_select_month'] = espresso_event_months_dropdown( $month_range );
			// filter by category
			$event_category = isset($_REQUEST['category_id']) ? sanitize_key( $_REQUEST['category_id'] ) : '';
			$filter_template_args['reg_overview_filter_select_category'] = espresso_category_dropdown( $event_category );
			// filter by reg status
			$reg_status = isset($_REQUEST['reg_status']) ? sanitize_key( $_REQUEST['reg_status'] ) : '';
			// process array of all possible reg stati
			$status = array();
			foreach ( self::$_reg_status as $key => $value ) {
				$status[] = array( 'id' => $key, 'text' => $value );
			}
			$filter_template_args['reg_overview_filter_select_status'] =  select_input('reg_status', $status, $reg_status);
			// load filter template
			$template_path = REG_TEMPLATE_PATH . 'reg_admin_overview_filters.template.php';
			$this->template_args['premium_reg_filters']  =  espresso_display_template( $template_path, $filter_template_args, TRUE );

		} else {
			// no soup for you !!!
			$this->template_args['premium_reg_filters'] = FALSE;
		}
		
		$this->template_args['start_date'] = isset( $_POST['reg-filter-start-date'] ) ? wp_strip_all_tags( $_POST['reg-filter-start-date'] ) : date( 'D M j, Y', strtotime( '-1 month' ));
		$this->template_args['end_date'] = isset( $_POST['reg-filter-end-date'] ) ? wp_strip_all_tags( $_POST['reg-filter-end-date'] ) : date( 'D M j, Y' );
		$this->template_args['end_date'] = ( strtotime( $this->template_args['end_date'] ) < strtotime( $this->template_args['start_date'] )) ? $this->template_args['start_date'] : $this->template_args['end_date'];

		$registrations = $REG->get_registrations_for_admin_page();
		//echo printr( $registrations, '$registrations' );
		$this->template_args['table_rows'] = $wpdb->num_rows;

		//Ticketing
		$ticketing_installed = ( file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php") || function_exists('espresso_ticket_launch')) ? TRUE : FALSE;


		$entries_per_page_dropdown = $this->_entries_per_page_dropdown( $this->template_args['table_rows'] );
		$this->template_args['list_table'] = new EE_Admin_Registrations_List_Table( $registrations, self::$_reg_status, $entries_per_page_dropdown, $ticketing_installed );

		// link back to here
		$this->template_args['reg_overview_url'] = REG_ADMIN_URL;
		$this->template_args['view_all_url'] = add_query_arg( array( 'per_page' => $this->template_args['table_rows'] ), REG_ADMIN_URL );
		// grab messages at the last second
		$this->template_args['notices'] = espresso_get_notices();
		// path to template
		$template_path = REG_TEMPLATE_PATH . 'reg_admin_overview.template.php';
		$this->template_args['admin_page_content'] = espresso_display_template( $template_path, $this->template_args, TRUE );
		
		// the final template wrapper
		$this->admin_page_wrapper();	
 
	}





	/**
	 * 		generates HTML for the View Registration Details Admin page
	*		@access private
	*		@return void
	*/
	private function _registration_details() {

		global $wpdb, $org_options, $ee_admin_page;
		
		$this->template_args = array();
		$this->template_args['registrations_page'] = $ee_admin_page['registrations'];

	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
	    $REG = EEM_Registration::instance();

		$REG_ID = ( ! empty( $_REQUEST['reg'] )) ? absint( $_REQUEST['reg'] ) : FALSE;
		$this->_registration = $REG->get_registration_for_admin_page( $REG_ID );
		$this->_session = maybe_unserialize( maybe_unserialize( $this->_registration->TXN_session_data ));

		//printr( $this->_registration, '$this->_registration  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );

		// add nav tab for this details page
		$this->nav_tabs['details']['url'] = wp_nonce_url( add_query_arg( array( 'action'=>'view_registration', 'reg' => $REG_ID ), REG_ADMIN_URL ), 'view_registration' );  
		$this->nav_tabs['details']['link_text'] = __( 'REG Details', 'event_espresso' );
		$this->nav_tabs['details']['css_class'] = ' nav-tab-active';
		$this->nav_tabs['details']['order'] = 15;

		$this->template_args['reg_nmbr']['value'] = $this->_registration->REG_ID;
		$this->template_args['reg_nmbr']['label'] = __( 'Registration Number', 'event_espresso' );

		$this->template_args['reg_datetime']['value'] = date( 'l F j, Y,    g:i:s a', $this->_registration->REG_date );
		$this->template_args['reg_datetime']['label'] = __( 'Date', 'event_espresso' );

		$this->template_args['reg_status']['value'] = self::$_reg_status[ $this->_registration->REG_status ];
		$this->template_args['reg_status']['label'] = __( 'Registration Status', 'event_espresso' );
		$this->template_args['reg_status']['class'] = 'status-' . $this->_registration->REG_status;

		$this->template_args['grand_total'] = $this->_registration->TXN_total;

		$this->template_args['currency_sign'] = $org_options['currency_symbol'];
		// link back to overview
		$this->template_args['reg_overview_url'] = REG_ADMIN_URL;

		add_meta_box( 'edit-reg-details-mbox', __( 'Registration Details', 'event_espresso' ), array( $this, '_reg_details_meta_box' ), $ee_admin_page['registrations'], 'normal', 'high' );
		add_meta_box( 'edit-reg-registrant-mbox', __( 'Attendee Details', 'event_espresso' ), array( $this, '_reg_registrant_side_meta_box' ), $ee_admin_page['registrations'], 'side', 'high' );
		//add_meta_box( 'edit-reg-billing-info-mbox', __( 'Billing Information', 'event_espresso' ), array( $this, '_reg_billing_info_side_meta_box' ), $ee_admin_page['registrations'], 'side', 'high' );

		if ( $this->_registration->REG_is_group_reg ) {
			add_meta_box( 'edit-reg-attendees-mbox', __( 'Other Attendees Registered in the Same Transaction', 'event_espresso' ), array( $this, '_reg_attendees_meta_box' ), $ee_admin_page['registrations'], 'normal', 'high' );
		}
		

		// grab messages at the last second
		$this->template_args['notices'] = espresso_get_notices();
		// path to template
		$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_wrapper.template.php';
		$this->template_args['admin_page_content'] = espresso_display_template( $template_path, $this->template_args, TRUE );
		
		// the final template wrapper
		$this->admin_page_wrapper();

	}





	/**
	 * 		generates HTML for the Registration main meta box
	*		@access private
	*		@return void
	*/
	function _reg_details_meta_box() {

		global $wpdb, $org_options;

//		echo printr( $this->_session, '$this->_session' );

		// process items in cart
		$cart_items = $this->_session['cart']['REG']['items'];
		$this->template_args['items'] = array();
		$exclude = array( 'attendees' );

		foreach ( $cart_items as $line_item_ID => $item ) {
			foreach ( $item as $key => $value ) {
				if ( ! in_array( $key, $exclude )) {
					if ( $key == 'options' ) {
						$options = $value;
						foreach ( $options as $opt => $option ) {
							if ( $opt == 'date' ) {
								$option = strtotime( $option );
							} else if  ( $opt == 'time' ) {
								$ampm = ( (float)$option > 11.59 ) ? (( (float)$option == 24.00 ) ? 'am' : 'pm' ) : 'am';
								$option = strtotime( $option . ' ' . $ampm );
							}
							$this->template_args['items'][ $item['name'] ][ $opt ] = $option;
						}
					} else {
						$this->template_args['items'][ $item['name'] ][ $key ] = $value;
					}
				} else {
					$this->template_args['event_attendees'][ $item['name'] ][ $key ] = $value;
				}
			}
		}

		// process taxes
		if ( $taxes = maybe_unserialize( $this->_registration->TXN_tax_data )) {
			$this->template_args['taxes'] = $taxes['taxes'];
		} else {
			$this->template_args['taxes'] = FALSE;
		}

		$this->template_args['grand_total'] = $this->_registration->TXN_total;

		$this->template_args['currency_sign'] = $org_options['currency_symbol'];
		$reg_status_class = 'status-' . $this->_registration->STS_ID;

		$reg_details = maybe_unserialize( $this->_registration ->TXN_details );
		//echo printr( $reg_details, '$reg_details' );

		$card_type = isset( $reg_details['card_type'] ) ? ' : ' . $reg_details['card_type'] : '';
		$reg_details['method'] = $reg_details['method'] == 'CC' ? 'Credit Card' . $card_type : $reg_details['method'];
		$this->template_args['method']['value'] = $reg_details['method'];
		$this->template_args['method']['label'] = __( 'Payment Method', 'event_espresso' );
		$this->template_args['method']['class'] = 'regular-text';

		$reg_details['response_msg'] = '<span class="' . $reg_status_class . '">' . $reg_details['response_msg'] . '</span>';
		$this->template_args['gateway_response_msg']['value'] = $reg_details['response_msg'];
		$this->template_args['gateway_response_msg']['label'] = __( 'Gateway Response Message', 'event_espresso' );
		$this->template_args['gateway_response_msg']['class'] = 'regular-text';

		if ( isset( $reg_details['registration_id'] )) {
			$this->template_args['reg_details']['registration_id']['value'] = $reg_details['registration_id'];
			$this->template_args['reg_details']['registration_id']['label'] = __( 'Registration ID', 'event_espresso' );
			$this->template_args['reg_details']['registration_id']['class'] = 'regular-text';
		}

		if ( isset( $reg_details['invoice_number'] )) {
			$this->template_args['reg_details']['invoice_number']['value'] = $reg_details['invoice_number'];
			$this->template_args['reg_details']['invoice_number']['label'] = __( 'Invoice Number', 'event_espresso' );
			$this->template_args['reg_details']['invoice_number']['class'] = 'regular-text';
		}

		$this->template_args['reg_details']['registration_session']['value'] = $this->_registration->REG_session;
		$this->template_args['reg_details']['registration_session']['label'] = __( 'Registration Session', 'event_espresso' );
		$this->template_args['reg_details']['registration_session']['class'] = 'regular-text';

		$this->template_args['reg_details']['ip_address']['value'] = $this->_session['ip_address'];
		$this->template_args['reg_details']['ip_address']['label'] = __( 'Registration placed from IP', 'event_espresso' );
		$this->template_args['reg_details']['ip_address']['class'] = 'regular-text';

		$this->template_args['reg_details']['user_agent']['value'] = $this->_session['user_agent'];
		$this->template_args['reg_details']['user_agent']['label'] = __( 'Registrant User Agent', 'event_espresso' );
		$this->template_args['reg_details']['user_agent']['class'] = 'large-text';

//		$this->template_args['reg_details']['session_dump']['value'] = '<pre>' . printr ( $this->_session, 'Session Dump', TRUE ) . '</pre>';
//		$this->template_args['reg_details']['session_dump']['label'] = __( 'Session Dump', 'event_espresso' );
//		$this->template_args['reg_details']['session_dump']['class'] = 'large-text';

		//echo printr( $this->template_args, '$this->template_args' );


//			$this->template_args['registration_form_url'] = add_query_arg( array( 'action' => 'edit_registration', 'process' => 'registration'  ), REG_ADMIN_URL );

		$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_main_meta_box_reg_details.template.php';
		echo espresso_display_template( $template_path, $this->template_args, TRUE );

	}





	/**
	 * 		generates HTML for the Attendees Registration main meta box
	*		@access private
	*		@return void
	*/
	function _reg_attendees_meta_box() {

		global $wpdb, $org_options;

	    $REG = EEM_Registration::instance();
		$attendees = $REG->get_registrations_for_transaction( $this->_registration ->TXN_ID, $this->_registration ->REG_ID );

		$this->template_args['attendees'] = array();

		$att_nmbr = 1;
		foreach ( $attendees as $attendee ) {
		
			$this->template_args['attendees'][ $att_nmbr ]['fname'] = ( isset( $attendee->ATT_fname ) & ! empty( $attendee->ATT_fname ) ) ? $attendee->ATT_fname : '';
			$this->template_args['attendees'][ $att_nmbr ]['lname'] = ( isset( $attendee->ATT_lname ) & ! empty( $attendee->ATT_lname ) ) ? $attendee->ATT_lname : '';
			$this->template_args['attendees'][ $att_nmbr ]['email'] = ( isset( $attendee->ATT_email ) & ! empty( $attendee->ATT_email ) ) ? $attendee->ATT_email : '';
			$this->template_args['attendees'][ $att_nmbr ]['final_price'] = ( isset( $attendee->REG_final_price ) & ! empty( $attendee->REG_final_price ) ) ? $attendee->REG_final_price : '';
			
			$address = array();
			
			if ( isset( $attendee->ATT_address ) && ( ! empty( $attendee->ATT_address ))) {
				$address[] = $attendee->ATT_address;
			}
			if ( isset( $attendee->ATT_address2 ) && ( ! empty( $attendee->ATT_address2 ))) {
				$address[] = $attendee->ATT_address2;
			}
			if ( isset( $attendee->ATT_city ) && ( ! empty( $attendee->ATT_city ))) {
				$address[] = $attendee->ATT_city;
			}
			if ( isset( $attendee->ATT_state ) && ( ! empty( $attendee->ATT_state ))) {
				$address[] = $attendee->ATT_state;
			}
			if ( isset( $attendee->ATT_zip ) && ( ! empty( $attendee->ATT_zip ))) {
				$address[] = $attendee->ATT_zip;
			}
			$this->template_args['attendees'][ $att_nmbr ]['address'] = implode( ', ', $address );
			
			$this->template_args['attendees'][ $att_nmbr ]['view_link'] = wp_nonce_url( add_query_arg( array( 'action'=>'view_registration', 'reg'=>$attendee->REG_ID ), REG_ADMIN_URL ), 'view_registration' );
			
			$att_nmbr++;
		}

		//printr( $attendees, '$attendees  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );

		$this->template_args['event_name'] = $this->_registration->event_name;
		$this->template_args['currency_sign'] = $org_options['currency_symbol'];

//			$this->template_args['registration_form_url'] = add_query_arg( array( 'action' => 'edit_registration', 'process' => 'attendees'  ), REG_ADMIN_URL );

		$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_main_meta_box_attendees.template.php';
		echo espresso_display_template( $template_path, $this->template_args, TRUE );

	}






	/**
	 * 		generates HTML for the Edit Registration side meta box
	*		@access private
	*		@return void
	*/
	function _reg_registrant_side_meta_box() {

		$this->template_args['fname'] = $this->_registration->ATT_fname;
		$this->template_args['lname'] = $this->_registration->ATT_lname;
		$this->template_args['email'] = $this->_registration->ATT_email;
		$this->template_args['address'] = $this->_registration->ATT_address;
		$this->template_args['address2'] = ( ! empty ( $this->_registration->ATT_address2 )) ? '<br />' . $this->_registration->ATT_address2 : '';
		$this->template_args['city'] = ( ! empty ( $this->_registration->ATT_city )) ? '<br />' . $this->_registration->ATT_city : '';
		$this->template_args['state'] = ( ! empty ( $this->_registration->STA_ID )) ? '<br />' . $this->_registration->STA_ID . ', ' : '';
		$this->template_args['country'] = ( ! empty ( $this->_registration->CNT_ISO )) ? $this->_registration->CNT_ISO : '';
		$this->template_args['zip'] = ( ! empty ( $this->_registration->ATT_zip )) ? '<br />' . $this->_registration->ATT_zip : '';
		$this->template_args['phone'] = $this->_registration->ATT_phone;
		$this->template_args['social'] = $this->_registration->ATT_social;
		$this->template_args['comments'] = $this->_registration->ATT_comments;
		$this->template_args['notes'] = $this->_registration->ATT_notes;

//			$this->template_args['registrant_form_url'] = add_query_arg( array( 'action' => 'edit_registration', 'process' => 'registrant'  ), REG_ADMIN_URL );

		$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_side_meta_box_registrant.template.php';
		echo espresso_display_template( $template_path, $this->template_args, TRUE );
	}





	/**
	 * 		generates HTML for the Edit Registration side meta box
	*		@access private
	*		@return void
	*/
	function _reg_billing_info_side_meta_box() {

		$billing_info = $this->_session['billing_info'];
		//echo printr( $billing_info, '$billing_info' );

		if ( is_array( $billing_info )) {

			$this->template_args['free_event'] = FALSE;

			$this->template_args['fname']['value'] = ! empty ( $billing_info['reg-page-billing-fname']['value'] ) ? $billing_info['reg-page-billing-fname']['value'] : '';
			$this->template_args['fname']['label'] = ! empty ( $billing_info['reg-page-billing-fname']['label'] ) ? $billing_info['reg-page-billing-fname']['label'] :  __( 'First Name', 'event_espresso' );
			
			$this->template_args['lname']['value'] = ! empty ( $billing_info['reg-page-billing-lname']['value'] ) ? $billing_info['reg-page-billing-lname']['value'] : '';
			$this->template_args['lname']['label'] = ! empty ( $billing_info['reg-page-billing-lname']['label'] ) ? $billing_info['reg-page-billing-lname']['label'] :  __( 'Last Name', 'event_espresso' );
			
			$this->template_args['email']['value'] = ! empty ( $billing_info['reg-page-billing-email']['value'] ) ? $billing_info['reg-page-billing-email']['value'] : '';
			$this->template_args['email']['label'] = __( 'Email', 'event_espresso' );
			
			$this->template_args['address']['value'] = ! empty ( $billing_info['reg-page-billing-address']['value'] ) ? $billing_info['reg-page-billing-address']['value'] : '';
			$this->template_args['address']['label'] = ! empty ( $billing_info['reg-page-billing-address']['label'] ) ? $billing_info['reg-page-billing-address']['label'] :  __( 'Address', 'event_espresso' );
			
			$this->template_args['city']['value'] = ! empty ( $billing_info['reg-page-billing-city']['value'] ) ? $billing_info['reg-page-billing-city']['value'] : '';
			$this->template_args['city']['label'] = ! empty ( $billing_info['reg-page-billing-city']['label'] ) ? $billing_info['reg-page-billing-city']['label'] :  __( 'City', 'event_espresso' );
			
			$this->template_args['state']['value'] = ! empty ( $billing_info['reg-page-billing-state']['value'] ) ? $billing_info['reg-page-billing-state']['value'] : '';
			$this->template_args['state']['label'] = ! empty ( $billing_info['reg-page-billing-state']['label'] ) ? $billing_info['reg-page-billing-state']['label'] :  __( 'State', 'event_espresso' );
			
			$this->template_args['country']['value'] = ! empty ( $billing_info['reg-page-billing-country']['value'] ) ? $billing_info['reg-page-billing-country']['value'] : '';
			$this->template_args['country']['label'] = ! empty ( $billing_info['reg-page-billing-country']['label'] ) ? $billing_info['reg-page-billing-country']['label'] : __( 'Country', 'event_espresso' );
			
			$this->template_args['zip']['value'] = ! empty ( $billing_info['reg-page-billing-zip']['value'] ) ? $billing_info['reg-page-billing-zip']['value'] : '';
			$this->template_args['zip']['label'] = ! empty ( $billing_info['reg-page-billing-zip']['label'] ) ? $billing_info['reg-page-billing-zip']['label'] :  __( 'Zip Code', 'event_espresso' );

			if ( isset( $billing_info['reg-page-billing-card-nmbr'] )) {

				$this->template_args['credit_card_info'] = TRUE;

				$ccard = $billing_info['reg-page-billing-card-nmbr']['value'];
				$this->template_args['card_nmbr']['value'] = substr( $ccard, 0, 4 ) . ' XXXX XXXX ' . substr( $ccard, -4 );
				$this->template_args['card_nmbr']['label'] = 'Credit Card';

				$this->template_args['card_exp_date']['value'] = $billing_info['reg-page-billing-card-exp-date-mnth']['value'] . ' / ' . $billing_info['reg-page-billing-card-exp-date-year']['value'];
				$this->template_args['card_exp_date']['label'] = 'mm / yy';

				$this->template_args['card_ccv_code']['value'] = $billing_info['reg-page-billing-card-ccv-code']['value'];
				$this->template_args['card_ccv_code']['label'] = $billing_info['reg-page-billing-card-ccv-code']['label'];

			} else {
				$this->template_args['credit_card_info'] = FALSE;
			}

		} else {

			$this->template_args['free_event'] = $billing_info;

		}


//			$this->template_args['billing_form_url'] = add_query_arg( array( 'action' => 'edit_registration', 'process' => 'billing'  ), REG_ADMIN_URL );

		$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_side_meta_box_box_billing_info.template.php';
		echo espresso_display_template( $template_path, $this->template_args, TRUE );
	}





	/**
	 * 		generates HTML for the View Registration Details Admin page
	*		@access private
	*		@return void
	*/
	private function _delete_registration() {
		echo '<h1>OMG !!! You just deleted everything !!!</h1>';
		echo '<h1>What have you done ?!?!?</h1>';
		echo '<h1>Timmy\'s gonna be maaaaaad at you !!! </h1>';
	}




	/**
	 * 		generates Business Reports regarding Registrations
	*		@access private
	*		@return void
	*/
	private function _registration_reports() {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	
		$page_args = array();
		
		$page_args['admin_reports'][] = $this->_registrations_per_day_report( '-3 month' );  //  option: '-1 week', '-2 weeks' defaults to '-1 month'
		$page_args['admin_reports'][] = $this->_get_registrations_per_event_report( '-3 month' ); //  option: '-1 week', '-2 weeks' defaults to '-1 month'
//		$page_args['admin_reports'][] = 'chart1';
		
		$template_path = EE_CORE_ADMIN . 'admin_reports.template.php';
		$this->template_args['admin_page_content'] = espresso_display_template( $template_path, $page_args, TRUE );
		
		//printr( $page_args, '$page_args' );
		
		// the final template wrapper
		$this->admin_page_wrapper();
		
	}






	/**
	 * 		generates Business Report showing total registratiopns per day
	*		@access private
	*		@return void
	*/
	private function _registrations_per_day_report( $period = '-1 month' ) {
	
		$report_ID = 'reg-admin-registrations-per-day-report-dv';
		$report_JS = 'espresso_reg_admin_regs_per_day';
		
		wp_enqueue_script( $report_JS, REG_ASSETS_URL . $report_JS . '_report.js', array('jquery'), '1.0', TRUE);

		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
	    $REG = EEM_Registration::instance();
	 
		if( $results = $REG->get_registrations_per_day_report( $period ) ) {		
//			printr( $results, '$registrations_per_day' );
			$regs = array();
			$xmin = date( 'Y-m-d', strtotime( '+1 year' ));
			$xmax = 0;
			$ymax = 0;
			foreach ( $results as $result ) {
				$regs[] = array( $result->regDate, (int)$result->total );
				$xmin = strtotime( $result->regDate ) < strtotime( $xmin ) ? $result->regDate : $xmin;
				$xmax = strtotime( $result->regDate ) > strtotime( $xmax ) ? $result->regDate : $xmax;
				$ymax = $result->total > $ymax ? $result->total : $ymax;
			}
			
			$xmin = date( 'Y-m-d', strtotime( date( 'Y-m-d', strtotime($xmin)) . ' -1 day' ));			
			$xmax = date( 'Y-m-d', strtotime( date( 'Y-m-d', strtotime($xmax)) . ' +1 day' ));
			// calculate # days between our min and max dates				
			$span = floor( (strtotime($xmax) - strtotime($xmin)) / (60*60*24)) + 1;
			
			$report_params = array(
														'title' 	=> 'Total Registrations per Day',
														'id' 		=> $report_ID,
														'regs' 	=> $regs,												
														'xmin' 	=> $xmin,
														'xmax' 	=> $xmax,
														'ymax' 	=> ceil($ymax * 1.25),
														'span' 	=> $span,
														'width'	=> ceil(900 / $span)												
													);
			wp_localize_script( $report_JS, 'regPerDay', $report_params );
		}
												
		return $report_ID;
	}






	/**
	 * 		generates Business Report showing total registratiopns per event
	*		@access private
	*		@return void
	*/
	private function _get_registrations_per_event_report( $period = '-1 month' ) {
	
		$report_ID = 'reg-admin-registrations-per-event-report-dv';
		$report_JS = 'espresso_reg_admin_regs_per_event';
		
		wp_enqueue_script( $report_JS, REG_ASSETS_URL . $report_JS . '_report.js', array('jquery'), '1.0', TRUE);

		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
	    $REG = EEM_Registration::instance();
	 
		if( $results = $REG->get_registrations_per_event_report( $period ) ) {		
//			printr( $results, '$registrations_per_event' );
			$regs = array();
			$limits = array();
			$ymax = 0;
			foreach ( $results as $result ) {
				$regs[] = array( $result->event_name, (int)$result->total );
				$ymax = $result->total > $ymax ? $result->total : $ymax;
			}	

			$span = $period == 'week' ? 9 : 33;

			$report_params = array(
														'title' 	=> 'Total Registrations per Event',
														'id' 		=> $report_ID,
														'regs' 	=> $regs,												
														'limits' => $limits,												
														'ymax' 	=> ceil($ymax * 1.25),
														'span' 	=> $span,
														'width'	=> ceil(900 / $span)								
													);
			wp_localize_script( $report_JS, 'regPerEvent', $report_params );		
		}

		return $report_ID;
	}




}



// end of file:  includes/core/admin/transactions/Registrations_Admin_Page.core.php
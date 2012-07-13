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
 * @subpackage		includes/admin_screens/EE_Admin_Registrations.class.php
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Admin_Registrations {

	private $_registration;
	private $_session;
	private static $_status;
	private $_view_or_edit = FALSE;
	// array for passing vars to templates
	public $_template_args = array();

	public function __construct() {

	global $org_options;
//echo '<h4>REG_ADMIN_URL : ' . REG_ADMIN_URL . '  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>REG_DIR_PATH : ' . REG_DIR_PATH . '  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>REG_DIR_URL : ' . REG_DIR_URL . '  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>REG_TEMPLATE_PATH : ' . REG_TEMPLATE_PATH . '  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>REG_TEMPLATE_URL : ' . REG_TEMPLATE_URL . '  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>REG_ASSETS_PATH : ' . REG_ASSETS_PATH . '  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>REG_ASSETS_URL : ' . REG_ASSETS_URL . '  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>REG_PG_SLUG : ' . REG_PG_SLUG . '  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
			

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
	 * 		get list of registration statuses
	*		@access private
	*		@return void
	*/
	private function _get_registration_status_array() {

		global $wpdb;
		$SQL = 'SELECT STS_ID, STS_code FROM '. $wpdb->prefix . 'esp_status WHERE STS_type = "registration"';
		$results = $wpdb->get_results( $SQL );

		self::$_status = array();
		foreach ( $results as $status ) {
			self::$_status[ $status->STS_ID ] = $status->STS_code;
		}
	}





	/**
	*		generates  HTML for the reg admin page
	*		@access public
	*		@return void
	*/		
	public function reg_admin_wrapper( $sidebar = FALSE ) {

		// tab urls
		$this->_template_args['tab_url_overview'] = REG_ADMIN_URL;  
		$this->_template_args['tab_lnk_overview'] = __( 'Overview', 'event_espresso' );
		$this->_template_args['tab_active_overview'] = '';

		$this->_template_args['tab_url_reports'] = wp_nonce_url( add_query_arg( array( 'action'=>'reports' ), REG_ADMIN_URL ), 'reports' );  
		$this->_template_args['tab_lnk_reports'] = __( 'Reports', 'event_espresso' );
		$this->_template_args['tab_active_reports'] = '';

		$this->_template_args['tab_url_setttings'] = wp_nonce_url( add_query_arg( array( 'action'=>'setttings' ), REG_ADMIN_URL ), 'setttings' );  
		$this->_template_args['tab_lnk_setttings'] = __( 'Settings', 'event_espresso' );
		$this->_template_args['tab_active_setttings'] = '';

		switch ( $_REQUEST['action'] ) {
			
			case 'reports' :
				$active_tab = 'reports';
				break;
				
			case 'setttings' :
				$active_tab = 'setttings';
				break;
				
			default :
				$active_tab = 'overview';

				
		}

		$this->_template_args['tab_active_'.$active_tab] = ' nav-tab-active';
				
		// update and error messages
		$this->_template_args['notices'] = espresso_get_notices();
		
		if ( $sidebar != FALSE ) {
			$sidebar = '_sidebar';
		}
		// load settings page wrapper template
		$template_path = REG_TEMPLATE_PATH . 'reg_admin_settings_wrapper'.$sidebar.'.template.php';
		espresso_display_template( $template_path, $this->_template_args );
	}





	/**
	 * 		generates HTML for main Registrations Admin page
	*		@access private
	*		@return void
	*/
	private function _registrations_overview_list_table() {

		global $wpdb, $espresso_premium;
		
		// default page args
		$page_args = array();
		
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
		require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/registrations/Registrations_List_Table.class.php' );
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
		$REG = EEM_Registration::instance();

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
			foreach ( self::$_status as $key => $value ) {
				$status[] = array( 'id' => $key, 'text' => $value );
			}
			$filter_template_args['reg_overview_filter_select_status'] =  select_input('reg_status', $status, $reg_status);
			// load filter template
			$template_path = REG_TEMPLATE_PATH . 'registrations_overview_filters.template.php';
			$this->_template_args['premium_reg_filters']  =  espresso_display_template( $template_path, $filter_template_args, TRUE );

		} else {
			// no soup for you !!!
			$this->_template_args['premium_reg_filters'] = FALSE;
		}
		
		$this->_template_args['start_date'] = isset( $_POST['reg-filter-start-date'] ) ? wp_strip_all_tags( $_POST['reg-filter-start-date'] ) : date( 'D M j, Y', strtotime( '-1 month' ));
		$this->_template_args['end_date'] = isset( $_POST['reg-filter-end-date'] ) ? wp_strip_all_tags( $_POST['reg-filter-end-date'] ) : date( 'D M j, Y' );
		$this->_template_args['end_date'] = ( strtotime( $this->_template_args['end_date'] ) < strtotime( $this->_template_args['start_date'] )) ? $this->_template_args['start_date'] : $this->_template_args['end_date'];

		$registrations = $REG->get_registrations_for_admin_page();
		//echo printr( $registrations, '$registrations' );
		$this->_template_args['table_rows'] = $wpdb->num_rows;

		//Ticketing
		$ticketing_installed = ( file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/ticketing/template.php") || function_exists('espresso_ticket_launch')) ? TRUE : FALSE;


		$entries_per_page_dropdown = $this->_entries_per_page_dropdown( $this->_template_args['table_rows'] );
		$this->_template_args['list_table'] = new EE_Admin_Registrations_List_Table( $registrations, self::$_status, $entries_per_page_dropdown, $ticketing_installed );

		// link back to here
		$this->_template_args['reg_overview_url'] = REG_ADMIN_URL;
		$this->_template_args['view_all_url'] = add_query_arg( array( 'per_page' => $this->_template_args['table_rows'] ), REG_ADMIN_URL );
		// grab messages at the last second
		$this->_template_args['notices'] = espresso_get_notices();
		// path to template
		$template_path = REG_TEMPLATE_PATH . 'registrations_overview.template.php';
		$this->_template_args['reg_content'] = espresso_display_template( $template_path, $this->_template_args, TRUE );
		
		// the final template wrapper
		$this->reg_admin_wrapper();
 
	}





	/**
	 * 		generates HTML for the View Registration Details Admin page
	*		@access private
	*		@return void
	*/
	private function _registration_details( $view_or_edit = 'view' ) {

		global $wpdb, $org_options, $ee_admin_page;

		$this->_view_or_edit = $view_or_edit;
		
		$this->_template_args = array();
		$this->_template_args['registrations_page'] = $ee_admin_page['registrations'];

	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
	    $REG = EEM_Registration::instance();

		$REG_ID = ( ! empty( $_REQUEST['reg'] )) ? absint( $_REQUEST['reg'] ) : FALSE;
		$this->_registration = $REG->get_registration_for_admin_page( $REG_ID );
		$this->_session = maybe_unserialize( maybe_unserialize( $this->_registration->TXN_session_data ));

		//printr( $this->_registration, '$this->_registration  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );

		$this->_template_args['reg_nmbr']['value'] = $this->_registration->REG_ID;
		$this->_template_args['reg_nmbr']['label'] = __( 'Registration Number', 'event_espresso' );

		$this->_template_args['reg_datetime']['value'] = date( 'l F j, Y,    g:i:s a', $this->_registration->REG_date );
		$this->_template_args['reg_datetime']['label'] = __( 'Date', 'event_espresso' );

		$this->_template_args['reg_status']['value'] = self::$_status[ $this->_registration->REG_status ];
		$this->_template_args['reg_status']['label'] = __( 'Registration Status', 'event_espresso' );
		$this->_template_args['reg_status']['class'] = 'status-' . $this->_registration->REG_status;

		$this->_template_args['grand_total'] = $this->_registration->TXN_total;

		$this->_template_args['currency_sign'] = $org_options['currency_symbol'];
		// link back to overview
		$this->_template_args['reg_overview_url'] = REG_ADMIN_URL;

		add_meta_box( 'edit-reg-details-mbox', __( 'Registration Details', 'event_espresso' ), array( $this, '_reg_details_meta_box' ), $ee_admin_page['registrations'], 'normal', 'high' );
//		add_meta_box( 'edit-reg-registrant-mbox', __( 'Primary Registrant', 'event_espresso' ), array( $this, '_reg_registrant_side_meta_box' ), $ee_admin_page['registrations'], 'side', 'high' );
//		add_meta_box( 'edit-reg-billing-info-mbox', __( 'Billing Information', 'event_espresso' ), array( $this, '_reg_billing_info_side_meta_box' ), $ee_admin_page['registrations'], 'side', 'high' );

		if ( $this->_registration->REG_is_group_reg ) {
			add_meta_box( 'edit-reg-attendees-mbox', __( 'Other Attendees Registered in the Same Transaction', 'event_espresso' ), array( $this, '_reg_attendees_meta_box' ), $ee_admin_page['registrations'], 'normal', 'high' );
		}
		

		// grab messages at the last second
		$this->_template_args['notices'] = espresso_get_notices();
		// path to template
		$template_path = REG_TEMPLATE_PATH . 'registration_details_wrapper.template.php';
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );

	}





	/**
	 * 		generates HTML for the Registration main meta box
	*		@access private
	*		@return void
	*/
	function _reg_details_meta_box() {

		global $wpdb, $org_options;

		if ( ! $this->_view_or_edit ) {
			$this->_view_or_edit = 'view';
		}

//		echo printr( $this->_session, '$this->_session' );

		// process items in cart
		$cart_items = $this->_session['cart']['REG']['items'];
		$this->_template_args['items'] = array();
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
							$this->_template_args['items'][ $item['name'] ][ $opt ] = $option;
						}
					} else {
						$this->_template_args['items'][ $item['name'] ][ $key ] = $value;
					}
				} else {
					$this->_template_args['event_attendees'][ $item['name'] ][ $key ] = $value;
				}
			}
		}

		// process taxes
		if ( $taxes = maybe_unserialize( $this->_registration->TXN_tax_data )) {
			$this->_template_args['taxes'] = $taxes['taxes'];
		} else {
			$this->_template_args['taxes'] = FALSE;
		}

		$this->_template_args['grand_total'] = $this->_registration->TXN_total;

		$this->_template_args['currency_sign'] = $org_options['currency_symbol'];
		$reg_status_class = 'status-' . $this->_registration->STS_ID;

		$reg_details = maybe_unserialize( $this->_registration ->TXN_details );
		//echo printr( $reg_details, '$reg_details' );

		$card_type = isset( $reg_details['card_type'] ) ? ' : ' . $reg_details['card_type'] : '';
		$reg_details['method'] = $reg_details['method'] == 'CC' ? 'Credit Card' . $card_type : $reg_details['method'];
		$this->_template_args['method']['value'] = $reg_details['method'];
		$this->_template_args['method']['label'] = __( 'Payment Method', 'event_espresso' );
		$this->_template_args['method']['class'] = 'regular-text';

		$reg_details['response_msg'] = $this->_view_or_edit == 'view' ? '<span class="' . $reg_status_class . '">' . $reg_details['response_msg'] . '</span>' : $reg_details['response_msg'];
		$this->_template_args['gateway_response_msg']['value'] = $reg_details['response_msg'];
		$this->_template_args['gateway_response_msg']['label'] = __( 'Gateway Response Message', 'event_espresso' );
		$this->_template_args['gateway_response_msg']['class'] = 'regular-text';

		if ( isset( $reg_details['registration_id'] )) {
			$this->_template_args['reg_details']['registration_id']['value'] = $reg_details['registration_id'];
			$this->_template_args['reg_details']['registration_id']['label'] = __( 'Registration ID', 'event_espresso' );
			$this->_template_args['reg_details']['registration_id']['class'] = 'regular-text';
		}

		if ( isset( $reg_details['invoice_number'] )) {
			$this->_template_args['reg_details']['invoice_number']['value'] = $reg_details['invoice_number'];
			$this->_template_args['reg_details']['invoice_number']['label'] = __( 'Invoice Number', 'event_espresso' );
			$this->_template_args['reg_details']['invoice_number']['class'] = 'regular-text';
		}

		$this->_template_args['reg_details']['registration_session']['value'] = $this->_registration->REG_session;
		$this->_template_args['reg_details']['registration_session']['label'] = __( 'Registration Session', 'event_espresso' );
		$this->_template_args['reg_details']['registration_session']['class'] = 'regular-text';

		$this->_template_args['reg_details']['ip_address']['value'] = $this->_session['ip_address'];
		$this->_template_args['reg_details']['ip_address']['label'] = __( 'Registration placed from IP', 'event_espresso' );
		$this->_template_args['reg_details']['ip_address']['class'] = 'regular-text';

		$this->_template_args['reg_details']['user_agent']['value'] = $this->_session['user_agent'];
		$this->_template_args['reg_details']['user_agent']['label'] = __( 'Registrant User Agent', 'event_espresso' );
		$this->_template_args['reg_details']['user_agent']['class'] = 'large-text';

//		$this->_template_args['reg_details']['session_dump']['value'] = '<pre>' . printr ( $this->_session, 'Session Dump', TRUE ) . '</pre>';
//		$this->_template_args['reg_details']['session_dump']['label'] = __( 'Session Dump', 'event_espresso' );
//		$this->_template_args['reg_details']['session_dump']['class'] = 'large-text';

		//echo printr( $this->_template_args, '$this->_template_args' );


		if ( $this->_view_or_edit == 'edit' ) {
			$this->_template_args['registration_form_url'] = add_query_arg( array( 'action' => 'edit_registration', 'process' => 'registration'  ), REG_ADMIN_URL );
		}

		$template_path = REG_TEMPLATE_PATH . $this->_view_or_edit . '_reg_details_meta_box.template.php';
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );

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

		$this->_template_args['attendees'] = array();

		$att_nmbr = 1;
		foreach ( $attendees as $attendee ) {
		
			$this->_template_args['attendees'][ $att_nmbr ]['fname'] = ( isset( $attendee->ATT_fname ) & ! empty( $attendee->ATT_fname ) ) ? $attendee->ATT_fname : '';
			$this->_template_args['attendees'][ $att_nmbr ]['lname'] = ( isset( $attendee->ATT_lname ) & ! empty( $attendee->ATT_lname ) ) ? $attendee->ATT_lname : '';
			$this->_template_args['attendees'][ $att_nmbr ]['email'] = ( isset( $attendee->ATT_email ) & ! empty( $attendee->ATT_email ) ) ? $attendee->ATT_email : '';
			$this->_template_args['attendees'][ $att_nmbr ]['final_price'] = ( isset( $attendee->REG_final_price ) & ! empty( $attendee->REG_final_price ) ) ? $attendee->REG_final_price : '';
			
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
			$this->_template_args['attendees'][ $att_nmbr ]['address'] = implode( ', ', $address );
			
			$this->_template_args['attendees'][ $att_nmbr ]['view_link'] = wp_nonce_url( add_query_arg( array( 'action'=>'view_registration', 'reg'=>$attendee->REG_ID ), REG_ADMIN_URL ), 'view_registration' );
			
			$att_nmbr++;
		}

		//printr( $attendees, '$attendees  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );

		$this->_template_args['event_name'] = $this->_registration->event_name;
		$this->_template_args['currency_sign'] = $org_options['currency_symbol'];

		if ( $this->_view_or_edit == 'edit' ) {
			$this->_template_args['registration_form_url'] = add_query_arg( array( 'action' => 'edit_registration', 'process' => 'attendees'  ), REG_ADMIN_URL );
		}

		$template_path = REG_TEMPLATE_PATH . 'view_reg_attendees_meta_box.template.php';
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );

	}






	/**
	 * 		generates HTML for the Edit Registration side meta box
	*		@access private
	*		@return void
	*/
	function _reg_registrant_side_meta_box() {

		if ( ! $this->_view_or_edit ) {
			$this->_view_or_edit = 'view';
		}

		$this->_template_args['fname'] = $this->_registration->ATT_fname;
		$this->_template_args['lname'] = $this->_registration->ATT_lname;
		$this->_template_args['email'] = $this->_registration->ATT_email;
		$this->_template_args['address'] = $this->_registration->ATT_address;
		$this->_template_args['address2'] = ( ! empty ( $this->_registration->ATT_address2 )) ? '<br />' . $this->_registration->ATT_address2 : '';
		$this->_template_args['city'] = ( ! empty ( $this->_registration->ATT_city )) ? '<br />' . $this->_registration->ATT_city : '';
		$this->_template_args['state'] = ( ! empty ( $this->_registration->STA_ID )) ? '<br />' . $this->_registration->STA_ID . ', ' : '';
		$this->_template_args['country'] = ( ! empty ( $this->_registration->CNT_ISO )) ? $this->_registration->CNT_ISO : '';
		$this->_template_args['zip'] = ( ! empty ( $this->_registration->ATT_zip )) ? '<br />' . $this->_registration->ATT_zip : '';
		$this->_template_args['phone'] = $this->_registration->ATT_phone;
		$this->_template_args['social'] = $this->_registration->ATT_social;
		$this->_template_args['comments'] = $this->_registration->ATT_comments;
		$this->_template_args['notes'] = $this->_registration->ATT_notes;

		if ( $this->_view_or_edit == 'edit' ) {
			$this->_template_args['registrant_form_url'] = add_query_arg( array( 'action' => 'edit_registration', 'process' => 'registrant'  ), REG_ADMIN_URL );
		}

		$template_path = REG_TEMPLATE_PATH . $this->_view_or_edit . '_reg_side_meta_box_registrant.template.php';
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );
	}





	/**
	 * 		generates HTML for the Edit Registration side meta box
	*		@access private
	*		@return void
	*/
	function _reg_billing_info_side_meta_box() {

		if ( ! $this->_view_or_edit ) {
			$this->_view_or_edit = 'view';
		}

		$billing_info = $this->_session['billing_info'];
		//echo printr( $billing_info, '$billing_info' );

		if ( is_array( $billing_info )) {

			$this->_template_args['free_event'] = FALSE;

			$this->_template_args['fname']['value'] = ! empty ( $billing_info['reg-page-billing-fname']['value'] ) ? $billing_info['reg-page-billing-fname']['value'] : '';
			$this->_template_args['fname']['label'] = ! empty ( $billing_info['reg-page-billing-fname']['label'] ) ? $billing_info['reg-page-billing-fname']['label'] :  __( 'First Name', 'event_espresso' );
			
			$this->_template_args['lname']['value'] = ! empty ( $billing_info['reg-page-billing-lname']['value'] ) ? $billing_info['reg-page-billing-lname']['value'] : '';
			$this->_template_args['lname']['label'] = ! empty ( $billing_info['reg-page-billing-lname']['label'] ) ? $billing_info['reg-page-billing-lname']['label'] :  __( 'Last Name', 'event_espresso' );
			
			$this->_template_args['email']['value'] = ! empty ( $billing_info['reg-page-billing-email']['value'] ) ? $billing_info['reg-page-billing-email']['value'] : '';
			$this->_template_args['email']['label'] = __( 'Email', 'event_espresso' );
			
			$this->_template_args['address']['value'] = ! empty ( $billing_info['reg-page-billing-address']['value'] ) ? $billing_info['reg-page-billing-address']['value'] : '';
			$this->_template_args['address']['label'] = ! empty ( $billing_info['reg-page-billing-address']['label'] ) ? $billing_info['reg-page-billing-address']['label'] :  __( 'Address', 'event_espresso' );
			
			$this->_template_args['city']['value'] = ! empty ( $billing_info['reg-page-billing-city']['value'] ) ? $billing_info['reg-page-billing-city']['value'] : '';
			$this->_template_args['city']['label'] = ! empty ( $billing_info['reg-page-billing-city']['label'] ) ? $billing_info['reg-page-billing-city']['label'] :  __( 'City', 'event_espresso' );
			
			$this->_template_args['state']['value'] = ! empty ( $billing_info['reg-page-billing-state']['value'] ) ? $billing_info['reg-page-billing-state']['value'] : '';
			$this->_template_args['state']['label'] = ! empty ( $billing_info['reg-page-billing-state']['label'] ) ? $billing_info['reg-page-billing-state']['label'] :  __( 'State', 'event_espresso' );
			
			$this->_template_args['country']['value'] = ! empty ( $billing_info['reg-page-billing-country']['value'] ) ? $billing_info['reg-page-billing-country']['value'] : '';
			$this->_template_args['country']['label'] = ! empty ( $billing_info['reg-page-billing-country']['label'] ) ? $billing_info['reg-page-billing-country']['label'] : __( 'Country', 'event_espresso' );
			
			$this->_template_args['zip']['value'] = ! empty ( $billing_info['reg-page-billing-zip']['value'] ) ? $billing_info['reg-page-billing-zip']['value'] : '';
			$this->_template_args['zip']['label'] = ! empty ( $billing_info['reg-page-billing-zip']['label'] ) ? $billing_info['reg-page-billing-zip']['label'] :  __( 'Zip Code', 'event_espresso' );

			if ( isset( $billing_info['reg-page-billing-card-nmbr'] )) {

				$this->_template_args['credit_card_info'] = TRUE;

				$ccard = $billing_info['reg-page-billing-card-nmbr']['value'];
				$this->_template_args['card_nmbr']['value'] = substr( $ccard, 0, 4 ) . ' XXXX XXXX ' . substr( $ccard, -4 );
				$this->_template_args['card_nmbr']['label'] = 'Credit Card';

				$this->_template_args['card_exp_date']['value'] = $billing_info['reg-page-billing-card-exp-date-mnth']['value'] . ' / ' . $billing_info['reg-page-billing-card-exp-date-year']['value'];
				$this->_template_args['card_exp_date']['label'] = 'mm / yy';

				$this->_template_args['card_ccv_code']['value'] = $billing_info['reg-page-billing-card-ccv-code']['value'];
				$this->_template_args['card_ccv_code']['label'] = $billing_info['reg-page-billing-card-ccv-code']['label'];

			} else {
				$this->_template_args['credit_card_info'] = FALSE;
			}

		} else {

			$this->_template_args['free_event'] = $billing_info;

		}



		if ( $this->_view_or_edit == 'edit' ) {
			$this->_template_args['billing_form_url'] = add_query_arg( array( 'action' => 'edit_registration', 'process' => 'billing'  ), REG_ADMIN_URL );
		}

		$template_path = REG_TEMPLATE_PATH . $this->_view_or_edit . '_reg_side_meta_box_billing_info.template.php';
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );
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
		$reg_reports = array();
		
		$page_args['reg_reports'][] = $this->_registrations_per_day_report( '-3 month' );  //  option: '-1 week', '-2 weeks' defaults to '-1 month'
		$page_args['reg_reports'][] = $this->_get_registrations_per_event_report( '-3 month' ); //  option: '-1 week', '-2 weeks' defaults to '-1 month'
//		$page_args['reg_reports'][] = 'chart1';
		
		$template_path = REG_TEMPLATE_PATH . 'registration_reports.template.php';
		$this->_template_args['reg_content'] = espresso_display_template( $template_path, $page_args, TRUE );
		
		//printr( $page_args, '$page_args' );
		
		// the final template wrapper
		$this->reg_admin_wrapper();
		
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









	/**
	 * 		generates HTML for the View Registration Details Admin page
	*		@access private
	*		@return void
	*/
	private function _entries_per_page_dropdown( $max_entries = FALSE ) {

		$values = array( 10, 25, 50, 100 );
		$per_page = ( ! empty( $_REQUEST['per_page'] )) ? absint( $_REQUEST['per_page'] ) : 10;

		if ( $max_entries ) {
			$values[] = $max_entries;
			sort( $values );
		}

		$entries_per_page_dropdown = '
			<div id="entries-per-page-dv" class="">
				<label class="hide-if-no-js">
					Show
					<select id="entries-per-page-slct" name="entries-per-page-slct">';

		foreach ( $values as $value ) {
			if ( $value < $max_entries ) {
				$selected = $value == $per_page ?  ' selected="' . $per_page . '"' : '';
				$entries_per_page_dropdown .= '
						<option value="'.$value.'"'.$selected.'>'.$value.'&nbsp;&nbsp;</option>';
			}
		}

		$selected = $max_entries == $per_page ?  ' selected="' . $per_page . '"' : '';
		$entries_per_page_dropdown .= '
						<option value="'.$max_entries.'"'.$selected.'>All&nbsp;&nbsp;</option>';

		$entries_per_page_dropdown .= '
					</select>
					entries
				</label>
			</div>
';
		return $entries_per_page_dropdown;

	}





}





function event_espresso_manage_registrations() {
	new EE_Admin_Registrations();
}





if ( ! function_exists( 'is_admin' ) or  ! current_user_can( 'manage_options' )) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
	wp_die( 'Insufficient privileges!' );
    exit();
}		


define( 'REG_ADMIN_URL', admin_url( 'admin.php?page=registrations' ));
define( 'REG_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'REG_DIR_URL', plugin_dir_url( __FILE__ ) );	
define( 'REG_TEMPLATE_PATH', REG_DIR_PATH . 'templates/' );		
define( 'REG_TEMPLATE_URL', REG_DIR_URL . 'templates/' );		
define( 'REG_ASSETS_PATH', REG_DIR_PATH . 'css_n_js/' );		
define( 'REG_ASSETS_URL', REG_DIR_URL . 'css_n_js/' );		
//define( 'JQPLOT_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jqplot/' );		
define( 'REG_PG_SLUG', 'registrations' );





/**
*		add some style
*
*		@access 		public
*		@return 		void
*/
function espresso_load_reg_admin_css() {
	if ( isset( $_REQUEST['action'] ) && $_REQUEST['action'] == 'reports' ) {
		wp_deregister_style('jqplot');
		wp_enqueue_style('jquery-jqplot-css', JQPLOT_URL . 'jquery.jqplot.min.css');			
	} else {
		wp_enqueue_style('jquery-ui-style', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery-ui-1.8.16.custom.css');
		wp_enqueue_style('jquery-ui-style-datepicker', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery.ui.datepicker.css');
	}	
	wp_register_style('espresso_reg', REG_ASSETS_URL . 'espresso_registrations_admin.css' );
	wp_enqueue_style('espresso_reg');

}
add_action('admin_print_styles', 'espresso_load_reg_admin_css');





/**
*		make it dance
*
*		@access 		public
*		@return 		void
*/
function espresso_load_reg_admin_js() {
//	wp_enqueue_script('jquery-ui-core');
//	wp_enqueue_script('jquery-ui-tabs');
//	wp_enqueue_script('jquery-ui-datepicker');
	wp_enqueue_script('common');
	wp_enqueue_script('wp-lists');
	wp_enqueue_script('postbox');
	
	
	
	if ( isset( $_REQUEST['action'] ) && $_REQUEST['action'] == 'reports' ) {
	    wp_deregister_script( 'jquery' );
	    wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
	    wp_enqueue_script( 'jquery' );
		wp_deregister_script('jqplot');
		wp_deregister_script('jquery-ui-core');
		wp_deregister_script('jquery-ui-tabs');
		wp_deregister_script('jquery-ui-datepicker');
		
//		wp_enqueue_script('jqplot', JQPLOT_URL . 'jquery.jqplot.min.js', array('jquery'), '', FALSE);
//		wp_enqueue_script('jqplot-barRenderer', JQPLOT_URL . 'plugins/jqplot.barRenderer.min.js', array('jquery'), '', FALSE);
//		echo '
//<!--[if IE]><script language="javascript" type="text/javascript" src="'.JQPLOT_URL.'excanvas.js"></script><![endif]-->
//';
		global $is_IE;
	    if( $is_IE ) {
	        wp_enqueue_script( 'excanvas' , JQPLOT_URL . 'excanvas.js', '', '', FALSE);
	    }
		wp_enqueue_script('jqplot', JQPLOT_URL . 'jquery.jqplot.min.js', array('jquery'), '', FALSE);
		wp_enqueue_script('jqplot-barRenderer', JQPLOT_URL . 'plugins/jqplot.barRenderer.min.js', array('jqplot'), '', FALSE);
		wp_enqueue_script('jqplot-canvasTextRenderer', JQPLOT_URL . 'plugins/jqplot.canvasTextRenderer.min.js', array('jqplot'), '', FALSE);
		wp_enqueue_script('jqplot-canvasAxisTickRenderer', JQPLOT_URL . 'plugins/jqplot.canvasAxisTickRenderer.min.js', array('jqplot'), '', FALSE);
		wp_enqueue_script('jqplot-categoryAxisRenderer', JQPLOT_URL . 'plugins/jqplot.categoryAxisRenderer.min.js', array('jqplot'), '', FALSE);
		wp_enqueue_script('jqplot-dateAxisRenderer', JQPLOT_URL . 'plugins/jqplot.dateAxisRenderer.min.js', array('jqplot'), '', FALSE);
		wp_enqueue_script('jqplot-highlighter', JQPLOT_URL . 'plugins/jqplot.highlighter.min.js', array('jqplot'), '', FALSE);
		wp_enqueue_script('jqplot-pointLabels', JQPLOT_URL . 'plugins/jqplot.pointLabels.min.js', array('jqplot'), '', FALSE);
//<script type="text/javascript" src="../src/plugins/jqplot.dateAxisRenderer.min.js"></script>
//<script type="text/javascript" src="../src/plugins/jqplot.canvasTextRenderer.min.js"></script>
//<script type="text/javascript" src="../src/plugins/jqplot.canvasAxisTickRenderer.min.js"></script>
//<script type="text/javascript" src="../src/plugins/jqplot.categoryAxisRenderer.min.js"></script>
//<script type="text/javascript" src="../src/plugins/jqplot.barRenderer.min.js"></script>

	} else {
		wp_register_script('espresso_reg', REG_ASSETS_URL . 'espresso_registrations_admin.js', array('jquery'), '1.0', TRUE);
		wp_enqueue_script('espresso_reg');
	}		


}
add_action('admin_print_scripts', 'espresso_load_reg_admin_js', 0);


// end of file:  includes/admin_screens/registrations/Registrations.class.php
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
 * EE_Admin_Transactions class
 *
 * @package			Event Espresso
 * @subpackage	includes/core/admin/transactions/Transactions_Admin_Page.core.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class Transactions_Admin_Page extends EE_Admin_Page implements Admin_Page_Interface {

	private $_transaction;
	private $_session;
	private static $_txn_status;
	private static $_pay_status;





	/**
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct() {

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		$this->page_slug = TXN_PG_SLUG;

		$this->_init();

		if ( $this->_AJAX ) {
			add_action('wp_ajax_espresso_apply_payment', array( &$this, 'apply_payments_or_refunds'));
			add_action('wp_ajax_espresso_apply_refund', array( &$this, 'apply_payments_or_refunds'));
			add_action('wp_ajax_espresso_delete_payment', array( &$this, 'delete_payment'));
		}
		
		// remove settings tab
		add_filter( 'filter_hook_espresso_admin_page_nav_tabs', array( &$this, '_remove_settings_from_admin_page_nav_tabs' ), 10 , 1 );
		// remove espresso_meta_boxes
		add_action( 'admin_init', array( &$this, '_remove_espresso_meta_boxes' ), 100 );

		
	}




	/**
	 * 		grab url requests and route them
	*		@access private
	*		@return void
	*/
	public function set_page_routes() {			

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		$this->_page_routes = array(
				'default'	=> '_transactions_overview_list_table',
				'view_transaction'	=> '_transaction_details',
				'send_payment_reminder'	=> '_send_payment_reminder',
				'delete_registration'	=> '_delete_registration',
				'reports'	=> '_transaction_reports',
				'espresso_apply_payment'	=> 'apply_payments_or_refunds',
				'espresso_apply_refund'	=> 'apply_payments_or_refunds',
				'espresso_delete_payment'	=> 'delete_payment'
		);	
	}




	/**
	 * 		grab url requests and route them
	*		@access private
	*		@return void
	*/
	public function define_page_vars() {
		$this->admin_base_url = TXN_ADMIN_URL;
		$this->admin_page_title = __( 'Transactions', 'event_espresso' );
	}









	/**
	 * 		get list of transaction statuses
	*		@access private
	*		@return void
	*/
	private function _get_transaction_status_array() {
	
		global $wpdb;
		$SQL = 'SELECT STS_ID, STS_code FROM '. $wpdb->prefix . 'esp_status WHERE STS_type = "transaction"';
		$results = $wpdb->get_results( $SQL );

		self::$_txn_status = array();
		foreach ( $results as $status ) {
			self::$_txn_status[ $status->STS_ID ] = __( $status->STS_code, 'event_espresso' );
		}
		// add status array to js available parameters
		//add_action( 'init', array( &$this, '_set_wp_localize_script_for_txn_status_array'));
		wp_localize_script('espresso_txn', 'txn_status_array', self::$_txn_status);		
	}





	/**
	 * 		_set_wp_localize_script
	*		@access public
	*		@return void
	*/
//	public function _set_wp_localize_script_for_txn_status_array() {
//		wp_localize_script('espresso_txn', 'txn_status_array', self::$_txn_status);		
//	}





	/**
	 * 		get list of paymnet statuses
	*		@access private
	*		@return void
	*/
	private function _get_payment_status_array() {
	
		global $wpdb;
		$SQL = 'SELECT STS_ID, STS_code FROM '. $wpdb->prefix . 'esp_status WHERE STS_type = "payment" ORDER BY STS_code';
		$results = $wpdb->get_results( $SQL );	

		self::$_pay_status = array();
		foreach ( $results as $status ) {
			self::$_pay_status[ $status->STS_ID ] = __( $status->STS_code, 'event_espresso' );
		}
		$this->template_args['payment_status'] = self::$_pay_status;
		// add status array to js available parameters
		wp_localize_script('espresso_txn', 'pay_status_array', self::$_pay_status);		
	}






	/**
	 * 		generates HTML for main Transactions Admin page
	*		@access protected
	*		@return void
	*/
	protected function _transactions_overview_list_table() {
		
		global $wpdb;

		$this->_get_transaction_status_array();

	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
	    $TXN = EEM_Transaction::instance();
		require_once( TXN_ADMIN . 'Transactions_List_Table.class.php');

		$this->template_args['start_date'] = isset( $_POST['txn-filter-start-date'] ) ? wp_strip_all_tags( $_POST['txn-filter-start-date'] ) : date( 'D M j, Y', strtotime( '-10 year' ));
		$this->template_args['end_date'] = isset( $_POST['txn-filter-end-date'] ) ? wp_strip_all_tags( $_POST['txn-filter-end-date'] ) : date( 'D M j, Y' );
		$this->template_args['end_date'] = ( strtotime( $this->template_args['end_date'] ) < strtotime( $this->template_args['start_date'] )) ? $this->template_args['start_date'] : $this->template_args['end_date'];
		
		$transactions = $TXN->get_transactions_for_admin_page( $this->template_args['start_date'], $this->template_args['end_date'] );  
		//echo printr( $transactions, '$transactions' );
		$this->template_args['table_rows'] = $wpdb->num_rows;
		$entries_per_page_dropdown = $this->_entries_per_page_dropdown( $this->template_args['table_rows'] );
		$this->template_args['list_table'] = new EE_Admin_Transactions_List_Table( $transactions, self::$_txn_status, $entries_per_page_dropdown );

		// link back to here
		$this->template_args['txn_overview_url'] = TXN_ADMIN_URL;  
		$this->template_args['view_all_url'] = add_query_arg( array( 'per_page' => $this->template_args['table_rows'] ), TXN_ADMIN_URL );  
		// grab messages at the last second
		$this->template_args['notices'] = espresso_get_notices();
		// path to template 
		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_overview.template.php';
		$this->template_args['admin_page_content'] = espresso_display_template( $template_path, $this->template_args, TRUE );
		
		// the final template wrapper
		$this->admin_page_wrapper();		
	}





	/**
	 * 		generates HTML for the View Transaction Details Admin page
	*		@access protected
	*		@return void
	*/
	protected function _transaction_details() {

		global $wpdb, $org_options, $ee_admin_page;
		
		$this->_get_transaction_status_array();

		$this->template_args = array();		
		$this->template_args['transactions_page'] = $ee_admin_page['transactions'];  

	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
	    $TXN = EEM_Transaction::instance();
		
		$TXN_ID = ( ! empty( $_REQUEST['txn'] )) ? absint( $_REQUEST['txn'] ) : FALSE;		
		$transaction = $TXN->get_transaction_for_admin_page( $TXN_ID );  
		$this->_transaction = array_shift( $transaction ); 
		$this->_session = maybe_unserialize( maybe_unserialize( $this->_transaction ->TXN_session_data ));

		// add nav tab for this details page
		$this->nav_tabs['details']['url'] = wp_nonce_url( add_query_arg( array( 'action'=>'view_transaction', 'txn' => $TXN_ID ), TXN_ADMIN_URL ), 'view_transaction' );  
		$this->nav_tabs['details']['link_text'] = __( 'TXN Details', 'event_espresso' );
		$this->nav_tabs['details']['css_class'] = ' nav-tab-active';
		$this->nav_tabs['details']['order'] = 15;
	
		$this->template_args['txn_nmbr']['value'] = $this->_transaction->TXN_ID;
		$this->template_args['txn_nmbr']['label'] = __( 'Transaction Number', 'event_espresso' );
		
		$this->template_args['txn_datetime']['value'] = date( 'l F j, Y,    g:i:s a', $this->_transaction->TXN_timestamp );
		$this->template_args['txn_datetime']['label'] = __( 'Date', 'event_espresso' );

		$this->template_args['txn_status']['value'] = self::$_txn_status[ $this->_transaction->STS_ID ];
		$this->template_args['txn_status']['label'] = __( 'Transaction Status', 'event_espresso' );	
		$this->template_args['txn_status']['class'] = 'status-' . $this->_transaction->STS_ID;

		$this->template_args['grand_total'] = $this->_transaction->TXN_total;
		$this->template_args['total_paid'] = $this->_transaction->TXN_paid;
		
		$amount_due = number_format(( $this->_transaction->TXN_total - $this->_transaction->TXN_paid ), 2 );
		$this->template_args['amount_due'] =  $org_options['currency_symbol'] . ' <span id="txn-admin-total-amount-due">' . $amount_due . '</span>';
		$this->template_args['amount_due_class'] =  '';	
		
		if ( $this->_transaction->TXN_paid == $this->_transaction->TXN_total ) {
			// paid in full
			$this->template_args['amount_due'] =  FALSE;
		} elseif ( $this->_transaction->TXN_paid > $this->_transaction->TXN_total ) {
			// overpaid
			$this->template_args['amount_due_class'] =  'txn-overview-no-payment-spn';			
		} elseif (( $this->_transaction->TXN_total > 0 ) && ( $this->_transaction->TXN_paid > 0 )) {
			// monies owing
			$this->template_args['amount_due_class'] =  'txn-overview-part-payment-spn';			
		} elseif (( $this->_transaction->TXN_total > 0 ) && ( $this->_transaction->TXN_paid == 0 )) {
			// no payments made yet
			$this->template_args['amount_due_class'] =  'txn-overview-no-payment-spn';			
		} elseif ( $this->_transaction->TXN_total == 0 ) {
			// free event 
			$this->template_args['amount_due'] =  FALSE;
		}

		$this->template_args['currency_sign'] = $org_options['currency_symbol'];
		// link back to overview
		$this->template_args['txn_overview_url'] = ! empty ( $_SERVER['HTTP_REFERER'] ) ? $_SERVER['HTTP_REFERER'] : TXN_ADMIN_URL;  
		
		add_meta_box( 'edit-txn-details-mbox', __( 'Transaction Details', 'event_espresso' ), array( $this, '_txn_details_meta_box' ), $ee_admin_page['transactions'], 'normal', 'high' );
		add_meta_box( 
									'edit-txn-attendees-mbox',
									__( 'Attendees Registered in this Transaction', 'event_espresso' ),
									array( $this, '_txn_attendees_meta_box' ),
									$ee_admin_page['transactions'],
									'normal',
									'high',
									array( 'TXN_ID' => $TXN_ID )
								);
		add_meta_box( 'edit-txn-registrant-mbox', __( 'Primary Registrant', 'event_espresso' ), array( $this, '_txn_registrant_side_meta_box' ), $ee_admin_page['transactions'], 'side', 'high' );
		add_meta_box( 'edit-txn-billing-info-mbox', __( 'Billing Information', 'event_espresso' ), array( $this, '_txn_billing_info_side_meta_box' ), $ee_admin_page['transactions'], 'side', 'high' );

		// grab messages at the last second
		$this->template_args['notices'] = espresso_get_notices();
		// path to template 
		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_header.template.php';
		$this->template_args['admin_page_header'] = espresso_display_template( $template_path, $this->template_args, TRUE );
		
		// the details template wrapper
		$this->display_admin_page_with_sidebar();
				
	}





	/**
	 * 		generates HTML for the Transaction main meta box
	*		@access private
	*		@return void
	*/
	function _txn_details_meta_box() {
	
		global $wpdb, $org_options;

//		printr( $this->_session, '$this->_session  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		printr( $this->_transaction, '$this->_transaction  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		// process items in cart
		$cart_items = $this->_session['cart']['REG']['items'];
		$this->template_args['items'] = array();
		$exclude = array( 'attendees' );
		
		$this->template_args['REG_code'] = $this->_transaction->REG_code;
		
		if ( ! empty( $cart_items )) {
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
						} elseif ( $key == 'line_item' ) {
							$this->template_args['items'][ $item['name'] ][ $key ] = '<a title="' . $value . '" style="color:#333;">' . substr( $value, 0, 6 ) . '...</a>';
						} else {
							$this->template_args['items'][ $item['name'] ][ $key ] = $value;
						}					
					} /*else {
						$this->template_args['event_attendees'][ $item['name'] ][ $key ] = $value;
					}*/
				}
			}		
		}

		
		// process taxes
		if ( $taxes = maybe_unserialize( $this->_transaction->TXN_tax_data )) {
			$this->template_args['taxes'] = $taxes['taxes'];
		} else {
			$this->template_args['taxes'] = FALSE;
		}

		$this->template_args['grand_total'] = $this->_transaction->TXN_total;


		$this->template_args['currency_sign'] = $org_options['currency_symbol'];
		$txn_status_class = 'status-' . $this->_transaction->STS_ID;
		
		$txn_details = maybe_unserialize( $this->_transaction ->TXN_details );
		
		// process payment details
	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Payment.model.php' );
	    $PAY = EEM_Payment::instance();
		if ( ! $this->template_args['payments'] = $PAY->get_payments_for_transaction( $this->_transaction->TXN_ID )) {
			$this->template_args['payments'] = FALSE;
		}
		
		$this->template_args['edit_payment_url'] = add_query_arg( array( 'action' => 'edit_payment'  ), TXN_ADMIN_URL );
		$this->template_args['delete_payment_url'] = add_query_arg( array( 'action' => 'delete_payment' ), TXN_ADMIN_URL );

		if ( isset( $txn_details['invoice_number'] )) {
			$this->template_args['txn_details']['invoice_number']['value'] = $txn_details['invoice_number'];
			$this->template_args['txn_details']['invoice_number']['label'] = __( 'Invoice Number', 'event_espresso' );
			$this->template_args['txn_details']['invoice_number']['class'] = 'regular-text';
		} 

		$this->template_args['txn_details']['registration_session']['value'] = $this->_transaction->REG_session;
		$this->template_args['txn_details']['registration_session']['label'] = __( 'Registration Session', 'event_espresso' );
		$this->template_args['txn_details']['registration_session']['class'] = 'regular-text';
		
		$this->template_args['txn_details']['ip_address']['value'] = $this->_session['ip_address'];
		$this->template_args['txn_details']['ip_address']['label'] = __( 'Transaction placed from IP', 'event_espresso' );
		$this->template_args['txn_details']['ip_address']['class'] = 'regular-text';
		
		$this->template_args['txn_details']['user_agent']['value'] = $this->_session['user_agent'];
		$this->template_args['txn_details']['user_agent']['label'] = __( 'Registrant User Agent', 'event_espresso' );
		$this->template_args['txn_details']['user_agent']['class'] = 'large-text';

//		$this->template_args['txn_details']['session_dump']['value'] = '<pre>' . printr ( $this->_session, 'Session Dump', TRUE ) . '</pre>';
//		$this->template_args['txn_details']['session_dump']['label'] = __( 'Session Dump', 'event_espresso' );
//		$this->template_args['txn_details']['session_dump']['class'] = 'large-text';

		$this->_get_payment_methods();
		$this->_get_active_gateways();
		// printr( $this->template_args['active_gateways'], 'active_gateways' );
		$this->_get_payment_status_array();
		
		$this->template_args['transaction_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'transaction'  ), TXN_ADMIN_URL );
		$this->template_args['apply_payment_form_url'] = add_query_arg( array( 'page' => 'transactions', 'action' => 'espresso_apply_payment' ), WP_AJAX_URL );
		$this->template_args['delete_payment_form_url'] = add_query_arg( array( 'page' => 'transactions', 'action' => 'espresso_delete_payment' ), WP_AJAX_URL );
		
		// 'espresso_delete_payment_nonce'
		
		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_main_meta_box_txn_details.template.php';
		echo espresso_display_template( $template_path, $this->template_args, TRUE );

	}





	/**
	 * 		_get_active_gateways
	*		@access private
	*		@return void
	*/
	private function _get_active_gateways() {
		global $espresso_wp_user;
		$this->template_args['active_gateways'] = array();
		$payment_options = get_user_meta($espresso_wp_user, 'payment_settings', true);
		//echo printr( $payment_options, '$payment_options' );
		if ( $gateways = get_user_meta($espresso_wp_user, 'active_gateways', true)) {
			//echo printr( $gateways, '$gateways' );
			foreach ( $gateways as $gw_key => $gateway ) {
				if ( isset( $payment_options[ $gw_key ]['type'] ) && $payment_options[ $gw_key ]['type'] != 'off-line' && $gw_key != 'paypal' ) {
					$this->template_args['active_gateways'][ $gw_key ] = $payment_options[ $gw_key ]['display_name'];
				}
			}
		}	
		 //printr( $this->template_args['active_gateways'], 'active_gateways' );
	}





	/**
	 * 		_get_payment_methods
	*		@access private
	*		@return void
	*/
	private function _get_payment_methods() {
		$this->template_args['payment_methods'] = array(
																						'PP' 		=> __( 'PayPal', 'event_espresso' ),
																						'CC' 		=> __( 'Credit Card', 'event_espresso' ),
																						'CHQ' 	=> __( 'Cheque', 'event_espresso' ),
																						'CSH' 	=> __( 'Cash', 'event_espresso' )
																					);
	}




	/**
	 * 		generates HTML for the Attendees Transaction main meta box
	*		@access private
	*		@return void
	*/
	function _txn_attendees_meta_box(  $post, $metabox = array( 'args' => array()) ) {
	
		global $wpdb, $org_options;
		
		extract( $metabox['args'] );		
		//printr( $metabox['args'] );
		
		// process items in cart
		$cart_items = $this->_session['cart']['REG']['items'];
		$this->template_args['items'] = array();
		$this->template_args['event_attendees'] = array();
		
		if ( ! empty( $cart_items )) {
			foreach ( $cart_items as $line_item_ID => $item ) {
				$event_name_and_price_option = $item['name'] . ' - ' . $item['options']['price_desc'];
				//printr( $item, '$item' );
				foreach ( $item['attendees'] as $att_nmbr => $attendee ) {
					// check for attendee object
					$attendee['att_obj'] = isset( $attendee['att_obj'] ) && is_object( $attendee['att_obj'] ) ? $attendee['att_obj'] : FALSE;
					if ( ! $attendee['att_obj'] ) {
						$where_cols_n_values = array( 'ATT_fname' => $attendee['fname'], 'ATT_lname' => $attendee['lname'], 'ATT_email' => $attendee['email'] );
					    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php' );
					    $ATT_MDL = EEM_Attendee::instance();
						if ( ! $attendee['att_obj'] = $ATT_MDL->find_existing_attendee( $where_cols_n_values )) {
							$attendee['att_obj'] = new EE_Attendee;
						}	 
					}
					// check for reg object
					$attendee['reg_obj'] = isset( $attendee['reg_obj'] ) && is_object( $attendee['reg_obj'] ) ? $attendee['reg_obj'] : FALSE;		
					if ( ! $attendee['reg_obj'] ) {
						$where_cols_n_values = array( 'ATT_fname' => $attendee['fname'], 'ATT_lname' => $attendee['lname'], 'ATT_email' => $attendee['email'] );
					    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
					    $REG_MDL = EEM_Registration::instance();
						if ( ! $attendee['reg_obj'] = $REG_MDL->get_registration_for_transaction_attendee( $TXN_ID, $attendee['att_obj']->ID(), $att_nmbr )) {
							$attendee['reg_obj'] = new EE_Registration;
						}	 
					}
					
					foreach ( $attendee as $key => $value ) {
						$this->template_args['event_attendees'][ $event_name_and_price_option ][ $att_nmbr ][ $key ] = maybe_unserialize( $value );
					}
				}
			}
		}
		//printr( $this->template_args['event_attendees'], 'event_attendees' );

		$this->template_args['currency_sign'] = $org_options['currency_symbol'];
		$this->template_args['transaction_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'attendees'  ), TXN_ADMIN_URL );  
		
		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_main_meta_box_attendees.template.php';
		echo espresso_display_template( $template_path, $this->template_args, TRUE );

	}






	/**
	 * 		generates HTML for the Edit Transaction side meta box
	*		@access private
	*		@return void
	*/
	function _txn_registrant_side_meta_box() {
	
		$this->template_args['ATT_ID'] = $this->_transaction->ATT_ID;
		$this->template_args['prime_reg_fname'] = $this->_transaction->ATT_fname;
		$this->template_args['prime_reg_lname'] = $this->_transaction->ATT_lname;
		$this->template_args['prime_reg_email'] = $this->_transaction->ATT_email;
		$this->template_args['prime_reg_address'] = $this->_transaction->ATT_address;
		$this->template_args['prime_reg_address2'] = ( ! empty ( $this->_transaction->ATT_address2 )) ? '<br />' . $this->_transaction->ATT_address2 : '';
		$this->template_args['prime_reg_city'] = ( ! empty ( $this->_transaction->ATT_city )) ? '<br />' . $this->_transaction->ATT_city : '';
		$this->template_args['prime_reg_state'] = ( ! empty ( $this->_transaction->STA_ID )) ? '<br />' . $this->_transaction->STA_ID . ', ' : '';
		$this->template_args['prime_reg_country'] = ( ! empty ( $this->_transaction->CNT_ISO )) ? $this->_transaction->CNT_ISO : '';
		$this->template_args['prime_reg_zip'] = ( ! empty ( $this->_transaction->ATT_zip )) ? '<br />' . $this->_transaction->ATT_zip : '';
		$this->template_args['prime_reg_phone'] = $this->_transaction->ATT_phone;
		$this->template_args['prime_reg_social'] = $this->_transaction->ATT_social;
		$this->template_args['prime_reg_comments'] = $this->_transaction->ATT_comments;
		$this->template_args['prime_reg_notes'] = $this->_transaction->ATT_notes;
		
		$this->template_args['registrant_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'registrant'  ), TXN_ADMIN_URL );  

		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_side_meta_box_registrant.template.php';
		echo espresso_display_template( $template_path, $this->template_args, TRUE );
	}





	/**
	 * 		generates HTML for the Edit Transaction side meta box
	*		@access private
	*		@return void
	*/
	function _txn_billing_info_side_meta_box() {
	
		$billing_info = $this->_session['billing_info'];		
		//printr( $billing_info, '$billing_info  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

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


			$this->template_args['fname']['value'] = '';
			$this->template_args['fname']['label'] =  __( 'First Name', 'event_espresso' );
			$this->template_args['lname']['value'] =  '';
			$this->template_args['lname']['label'] = __( 'Last Name', 'event_espresso' );
			$this->template_args['email']['value'] = '';
			$this->template_args['email']['label'] = __( 'Email', 'event_espresso' );
			$this->template_args['address']['value'] = '';
			$this->template_args['address']['label'] = __( 'Address', 'event_espresso' );
			$this->template_args['city']['value'] = '';
			$this->template_args['city']['label'] = __( 'City', 'event_espresso' );
			$this->template_args['state']['value'] = '';
			$this->template_args['state']['label'] =  __( 'State', 'event_espresso' );
			$this->template_args['country']['value'] = '';
			$this->template_args['country']['label'] = __( 'Country', 'event_espresso' );
			$this->template_args['zip']['value'] = '';
			$this->template_args['zip']['label'] = __( 'Zip Code', 'event_espresso' );
			$this->template_args['credit_card_info'] = FALSE;

			$this->template_args['free_event'] = $billing_info; 
			
		}
	
		//printr( $this->template_args, 'template_args' );
		
		$this->template_args['billing_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'billing'  ), TXN_ADMIN_URL );  

		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_side_meta_box_billing_info.template.php';
		echo espresso_display_template( $template_path, $this->template_args, TRUE );
	}





	/**
	 * 		registers a payment or refund made towards a transaction
	*		@access public
	*		@return void
	*/
	public function apply_payments_or_refunds() {
		
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';

		$return_data = FALSE;

		if ( isset( $_POST['txn_admin_payment'] )) {
		
			$payment = $_POST['txn_admin_payment'];
			//printr( $payment, '$payment' );

			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Payment.class.php');
			
			$payment['PAY_ID'] = $payment['PAY_ID'];
			
			// payments have a type value of 1 and refunds have a type value of -1
			$type = $payment['type'] < 0 ? -1 : 1;
			// if this is a refund
			if ( $type == -1 ){
				// remove negative sign from amount if it exists
				$payment['amount'] = abs( $payment['amount'] );
			}
			// so multiplying amount by type will give a positive value for payments, and negative values for refunds
			$amount = $payment['amount'] * $type;

			switch( $payment['method'] ) {
				
				case 'PP' :
					$payment['gateway'] = 'PayPal';
					break;

				case 'CC' :
					break;

				case 'CHQ' :
					$payment['gateway'] = '';
					$payment['gateway_response'] = '';
					break;

				case 'CSH' :
					$payment['gateway'] = '';
					$payment['txn_id_chq_nmbr'] = '';
					$payment['gateway_response'] = '';
					break;

			}

			// TXN_ID 	STS_ID 	PAY_timestamp 	PAY_method 	PAY_amount 	PAY_gateway 	PAY_gateway_response 	PAY_txn_id_chq_nmbr 	PAY_extra_accntng 	PAY_details 
			$payment = new EE_Payment( 
																	$payment['TXN_ID'], 
																	$payment['status'],
																	$payment['date'], 
																	$payment['method'], 
																	$amount,
																	$payment['gateway'],
																	$payment['gateway_response'],
																	$payment['txn_id_chq_nmbr'],
																	$payment['po_number'], 
																	$payment['accounting'], 
																	true, 
																	$payment,
																	$payment['PAY_ID']
																);

//			printr( $payment, '$payment' ); 
//			die();

			$return_data = $payment->apply_payment_to_transaction( TRUE );	
																
			$this->_get_payment_status_array();
			$return_data['PAY_ID'] = $payment->ID();
			$return_data['STS_ID'] = $payment->STS_ID();
			$return_data['status'] = self::$_pay_status[ $payment->STS_ID() ];
			$return_data['date'] = $payment->timestamp( 'D M j, Y' );
			$return_data['method'] = strtoupper( $payment->method() ) ;
			$this->_get_active_gateways();
			$return_data['gateway'] = isset( $this->template_args['active_gateways'][ $payment->gateway() ] ) ? $this->template_args['active_gateways'][ $payment->gateway() ] : $payment->gateway();
			$return_data['gateway_response'] = $payment->gateway_response();
			$return_data['txn_id_chq_nmbr'] = $payment->txn_id_chq_nmbr();
			$return_data['po_number'] = $payment->po_number();
			$return_data['extra_accntng'] = $payment->extra_accntng();

		} else {
			global $espresso_notices;
			$espresso_notices['errors'][] = __('An error occured. The payment form data could not be loaded.', 'event_espresso');
		}
		
		$notices = espresso_get_notices( FALSE, FALSE, FALSE ); // , TRUE
		
//		echo '<pre style="height:auto;border:2px solid lightblue;">' . print_r( $notices, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';
//		echo '<pre style="height:auto;border:2px solid lightblue;">' . print_r( $return_data, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';
//		die();
		
		echo json_encode( array( 'return_data' => $return_data, 'success' => $notices['success'], 'errors' => $notices['errors'] ));
		die();

	}





	/**
	 * 		delete a payment or refund made towards a transaction
	*		@access public
	*		@return void
	*/
	public function delete_payment() {
	
		global $espresso_notices;
		$return_data = FALSE;
		
		if ( isset( $_POST['ID'] )) {
			if ( $PAY_ID = absint( $_POST['ID'] )) {
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Payment.model.php');
				$PAY_MODEL = EEM_Payment::instance();
				$return_data = $PAY_MODEL->delete_payment( $PAY_ID );
				$return_data['PAY_ID'] = $PAY_ID;
			}
		} else {
			$espresso_notices['errors'][] = __('An error occured. The payment form data could not be loaded.', 'event_espresso');
		}
		$notices = espresso_get_notices( FALSE, FALSE, FALSE );
//		printr( $notices, '$notices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		printr( $return_data, '$return_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		echo json_encode( array( 'return_data' => $return_data, 'success' => $notices['success'], 'errors' => $notices['errors'] ));
		die();		
	}




	/**
	 * 		generates HTML for the View Transaction Details Admin page
	*		@access protected
	*		@return void
	*/
	protected function _send_payment_reminder() {
		echo '<div style="margin:2em auto; text-align:center;">Vinnie da Finger says: <h1>"YO!!!"</h1><h1>"Time to PAY UP!!!</h1></div>';
	}





	/**
	 * 		generates Business Reports regarding Transactions
	*		@access protected
	*		@return void
	*/
	protected function _transaction_reports() {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	
		$page_args = array();
		
		$page_args['admin_reports'][] = $this->_revenue_per_day_report( '-2 month' );  //  option: '-1 week', '-2 weeks' defaults to '-1 month'
		$page_args['admin_reports'][] = $this->_revenue_per_event_report( '-2 month' ); //  option: '-1 week', '-2 weeks' defaults to '-1 month'
//		$page_args['admin_reports'][] = 'chart1';
		
		$template_path = EE_CORE_ADMIN . 'admin_reports.template.php';
		$this->template_args['admin_page_content'] = espresso_display_template( $template_path, $page_args, TRUE );
		
		//printr( $page_args, '$page_args' );
		
		// the final template wrapper
		$this->admin_page_wrapper();
		
	}






	/**
	 * 		generates Business Report showing Total Revenue per Day
	*		@access private
	*		@return void
	*/
	private function _revenue_per_day_report( $period = '-1 month' ) {
	
		$report_ID = 'txn-admin-revenue-per-day-report-dv';
		$report_JS = 'espresso_txn_admin_revenue_per_day';
		
		wp_enqueue_script( $report_JS, TXN_ASSETS_URL . $report_JS . '_report.js', array('jquery'), '1.0', TRUE);

	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
	    $TXN = EEM_Transaction::instance();
	 
		if( $results = $TXN->get_revenue_per_day_report( $period ) ) {		
			//printr( $results, '$registrations_per_day' );
			$revenue = array();
			$xmin = date( 'Y-m-d', strtotime( '+1 year' ));
			$xmax = 0;
			$ymax = 0;
			foreach ( $results as $result ) {
				$revenue[] = array( $result->txnDate, (float)$result->revenue );
				$xmin = strtotime( $result->txnDate ) < strtotime( $xmin ) ? $result->txnDate : $xmin;
				$xmax = strtotime( $result->txnDate ) > strtotime( $xmax ) ? $result->txnDate : $xmax;
				//$ymax = $result->revenue > $ymax ? $result->revenue : $ymax;
			}
			
			$xmin = date( 'Y-m-d', strtotime( date( 'Y-m-d', strtotime($xmin)) . ' -1 day' ));			
			$xmax = date( 'Y-m-d', strtotime( date( 'Y-m-d', strtotime($xmax)) . ' +1 day' ));
			// calculate # days between our min and max dates				
			$span = floor( (strtotime($xmax) - strtotime($xmin)) / (60*60*24)) + 1;
			
			$report_params = array(
														'title' 		=> 'Total Revenue per Day',
														'id' 			=> $report_ID,
														'revenue' => $revenue,												
														'xmin' 		=> $xmin,
														'xmax' 		=> $xmax,
														//'ymax' 		=> ceil($ymax * 1.25),
														'span' 		=> $span,
														'width'		=> ceil(900 / $span)												
													);
			wp_localize_script( $report_JS, 'txnRevPerDay', $report_params );
		}
												
		return $report_ID;
	}






	/**
	 * 		generates Business Report showing total revenue per event
	*		@access private
	*		@return void
	*/
	private function _revenue_per_event_report( $period = '-1 month' ) {
	
		$report_ID = 'txn-admin-revenue-per-event-report-dv';
		$report_JS = 'espresso_txn_admin_revenue_per_event';
		
		wp_enqueue_script( $report_JS, TXN_ASSETS_URL . $report_JS . '_report.js', array('jquery'), '1.0', TRUE);

	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
	    $TXN = EEM_Transaction::instance();
	 
		if( $results = $TXN->get_revenue_per_event_report( $period ) ) {		
			//printr( $results, '$registrations_per_event' );
			$revenue = array();
			foreach ( $results as $result ) {
				$event_name = stripslashes( html_entity_decode( $result->event_name, ENT_QUOTES, 'UTF-8' ));
				$event_name = wp_trim_words( $event_name, 5, '...' );				
				$revenue[] = array( $event_name, (float)$result->revenue );
			}	

			$span = $period == 'week' ? 9 : 33;

			$report_params = array(
														'title' 		=> 'Total Revenue per Event',
														'id' 			=> $report_ID,
														'revenue'	=> $revenue,												
														'span' 		=> $span,
														'width'		=> ceil(900 / $span)								
													);
			wp_localize_script( $report_JS, 'revenuePerEvent', $report_params );		
		}

		return $report_ID;
	}





	/**
	 * 		_remove_espresso_meta_boxes
	*		@access public
	*		@return array
	*/
	public function _remove_espresso_meta_boxes() {	
		remove_meta_box('espresso_news_post_box', $this->wp_page_slug, 'side');
		remove_meta_box('espresso_links_post_box', $this->wp_page_slug, 'side');
		remove_meta_box('espresso_sponsors_post_box', $this->wp_page_slug, 'side');
	}




}


	
// end of file:  includes/core/admin/transactions/Transactions_Admin_Page.core.php
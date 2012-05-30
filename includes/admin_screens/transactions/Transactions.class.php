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
 * @subpackage		includes/admin_screens/EE_Admin_Transactions.class.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Admin_Transactions {

	private $_transaction;
	private $_session;
	private static $_status;
	private $_view_or_edit = FALSE;
	

	public function __construct() {

		global $org_options;
		define( 'TXN_ADMIN_URL', admin_url( 'admin.php?page=transactions' ));	
		define( 'TXN_TEMPLATE_URL', EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/transactions/templates/' );	

		// add some style
		$this->load_css();
		// and make it dance
		$this->load_js();

		$this->_get_transaction_status_array();
		
		if ( isset( $_REQUEST['action'] )) {
		
			check_admin_referer( $_REQUEST['action'] );	
			
			switch ( $_REQUEST['action'] ) {
			
				case 'view_transaction':
					$this->_transaction_details(); 
					break;

				case 'edit_transaction':
					$this->_transaction_details( 'edit' ); 
					break;

				case 'delete_transaction': 				
					$this->_delete_transaction(); 
					break;
			}		
				
		} else {
			$this->_transactions_overview_list_table();
		}

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

		self::$_status = array();
		foreach ( $results as $status ) {
			self::$_status[ $status->STS_ID ] = $status->STS_code;
		}
	}





	/**
	 * 		generates HTML for main Transactions Admin page
	*		@access private
	*		@return void
	*/
	private function _transactions_overview_list_table() {
		
		global $wpdb;

		// default page args
		$template_args = array();		

	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
		require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/transactions/Transactions_List_Table.class.php');
	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
	    $TXN = EEM_Transaction::instance();

		$template_args['start_date'] = isset( $_POST['txn-filter-start-date'] ) ? wp_strip_all_tags( $_POST['txn-filter-start-date'] ) : date( 'D M j, Y', strtotime( '-1 month' ));
		$template_args['end_date'] = isset( $_POST['txn-filter-end-date'] ) ? wp_strip_all_tags( $_POST['txn-filter-end-date'] ) : date( 'D M j, Y' );
		$template_args['end_date'] = ( strtotime( $template_args['end_date'] ) < strtotime( $template_args['start_date'] )) ? $template_args['start_date'] : $template_args['end_date'];
		
		$transactions = $TXN->get_transactions_for_admin_page( $template_args['start_date'], $template_args['end_date'] );  
		//echo printr( $transactions, '$transactions' );
		$template_args['table_rows'] = $wpdb->num_rows;
		$entries_per_page_dropdown = $this->_entries_per_page_dropdown( $template_args['table_rows'] );
		$template_args['list_table'] = new EE_Admin_Transactions_List_Table( $transactions, self::$_status, $entries_per_page_dropdown );

		// link back to here
		$template_args['txn_overview_url'] = TXN_ADMIN_URL;  
		$template_args['view_all_url'] = add_query_arg( array( 'per_page' => $template_args['table_rows'] ), TXN_ADMIN_URL );  
		// grab messages at the last second
		$template_args['notices'] = espresso_get_notices();
		// path to template 
		$template_path = TXN_TEMPLATE_URL . 'transactions_overview.template.php';
		echo espresso_display_template( $template_path, $template_args, TRUE );
		
	}





	/**
	 * 		generates HTML for the View Transaction Details Admin page
	*		@access private
	*		@return void
	*/
	private function _transaction_details( $view_or_edit = 'view' ) {

		global $wpdb, $org_options, $ee_admin_page;
		
		$this->_view_or_edit = $view_or_edit;

		$template_args = array();		
		$template_args['transactions_page'] = $ee_admin_page['transactions'];  

	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
	    $TXN = EEM_Transaction::instance();
		
		$TXN_ID = ( ! empty( $_REQUEST['txn'] )) ? absint( $_REQUEST['txn'] ) : FALSE;		
		$transaction = $TXN->get_transaction_for_admin_page( $TXN_ID );  
		$this->_transaction = array_shift( $transaction ); 
		$this->_session = maybe_unserialize( maybe_unserialize( $this->_transaction ->TXN_session_data ));

		$template_args['txn_nmbr']['value'] = $this->_transaction->TXN_ID;
		$template_args['txn_nmbr']['label'] = __( 'Transaction Number', 'event_espresso' );
		
		$template_args['txn_datetime']['value'] = date( 'l F j, Y,    g:i:s a', $this->_transaction->TXN_timestamp );
		$template_args['txn_datetime']['label'] = __( 'Date', 'event_espresso' );

		$template_args['txn_status']['value'] = self::$_status[ $this->_transaction->STS_ID ];
		$template_args['txn_status']['label'] = __( 'Transaction Status', 'event_espresso' );	
		$template_args['txn_status']['class'] = 'status-' . $this->_transaction->STS_ID;

		$template_args['grand_total'] = $this->_transaction->TXN_total;

		$template_args['currency_sign'] = $org_options['currency_symbol'];
		// link back to overview
		$template_args['txn_overview_url'] = ! empty ( $_SERVER['HTTP_REFERER'] ) ? $_SERVER['HTTP_REFERER'] : TXN_ADMIN_URL;  
		
		add_meta_box( 'edit-txn-details-mbox', __( 'Transaction Details', 'event_espresso' ), array( $this, '_txn_details_meta_box' ), $ee_admin_page['transactions'], 'normal', 'high' );
		add_meta_box( 'edit-txn-attendees-mbox', __( 'Attendees Registered in this Transaction', 'event_espresso' ), array( $this, '_txn_attendees_meta_box' ), $ee_admin_page['transactions'], 'normal', 'high' );
		add_meta_box( 'edit-txn-registrant-mbox', __( 'Primary Registrant', 'event_espresso' ), array( $this, '_txn_registrant_side_meta_box' ), $ee_admin_page['transactions'], 'side', 'high' );
		add_meta_box( 'edit-txn-billing-info-mbox', __( 'Billing Information', 'event_espresso' ), array( $this, '_txn_billing_info_side_meta_box' ), $ee_admin_page['transactions'], 'side', 'high' );

		// grab messages at the last second
		$template_args['notices'] = espresso_get_notices();
		// path to template 
		$template_path = TXN_TEMPLATE_URL . 'transaction_details_wrapper.template.php';
		echo espresso_display_template( $template_path, $template_args, TRUE );
				
	}





	/**
	 * 		generates HTML for the Transaction main meta box
	*		@access private
	*		@return void
	*/
	function _txn_details_meta_box() {
	
		global $wpdb, $org_options;
		
		if ( ! $this->_view_or_edit ) {
			$this->_view_or_edit = 'view';
		}

//		echo printr( $this->_session, '$this->_session' );

		// process items in cart
		$cart_items = $this->_session['cart']['REG']['items'];
		$template_args['items'] = array();
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
							$template_args['items'][ $item['name'] ][ $opt ] = $option;
						}
					} else {
						$template_args['items'][ $item['name'] ][ $key ] = $value;
					}					
				} else {
					$template_args['event_attendees'][ $item['name'] ][ $key ] = $value;
				}
			}
		}

		// process taxes
		if ( $taxes = maybe_unserialize( $this->_transaction->TXN_tax_data )) {
			$template_args['taxes'] = $taxes['taxes'];
		} else {
			$template_args['taxes'] = FALSE;
		}

		$template_args['grand_total'] = $this->_transaction->TXN_total;

		$template_args['currency_sign'] = $org_options['currency_symbol'];
		$txn_status_class = 'status-' . $this->_transaction->STS_ID;
		
		$txn_details = maybe_unserialize( $this->_transaction ->TXN_details );
		//echo printr( $txn_details, '$txn_details' );
		
		$card_type = isset( $txn_details['card_type'] ) ? ' : ' . $txn_details['card_type'] : '';
		$txn_details['method'] = $txn_details['method'] == 'CC' ? 'Credit Card' . $card_type : $txn_details['method'];
		$template_args['method']['value'] = $txn_details['method'];
		$template_args['method']['label'] = __( 'Payment Method', 'event_espresso' );
		$template_args['method']['class'] = 'regular-text';
		
		$txn_details['response_msg'] = $this->_view_or_edit == 'view' ? '<span class="' . $txn_status_class . '">' . $txn_details['response_msg'] . '</span>' : $txn_details['response_msg'];
		$template_args['gateway_response_msg']['value'] = $txn_details['response_msg'];
		$template_args['gateway_response_msg']['label'] = __( 'Gateway Response Message', 'event_espresso' );
		$template_args['gateway_response_msg']['class'] = 'regular-text';
		
		if ( isset( $txn_details['transaction_id'] )) {
			$template_args['txn_details']['transaction_id']['value'] = $txn_details['transaction_id'];
			$template_args['txn_details']['transaction_id']['label'] = __( 'Transaction ID', 'event_espresso' );
			$template_args['txn_details']['transaction_id']['class'] = 'regular-text';
		}

		if ( isset( $txn_details['invoice_number'] )) {
			$template_args['txn_details']['invoice_number']['value'] = $txn_details['invoice_number'];
			$template_args['txn_details']['invoice_number']['label'] = __( 'Invoice Number', 'event_espresso' );
			$template_args['txn_details']['invoice_number']['class'] = 'regular-text';
		}

		$template_args['txn_details']['registration_session']['value'] = $this->_transaction->REG_session;
		$template_args['txn_details']['registration_session']['label'] = __( 'Registration Session', 'event_espresso' );
		$template_args['txn_details']['registration_session']['class'] = 'regular-text';
		
		$template_args['txn_details']['ip_address']['value'] = $this->_session['ip_address'];
		$template_args['txn_details']['ip_address']['label'] = __( 'Transaction placed from IP', 'event_espresso' );
		$template_args['txn_details']['ip_address']['class'] = 'regular-text';
		
		$template_args['txn_details']['user_agent']['value'] = $this->_session['user_agent'];
		$template_args['txn_details']['user_agent']['label'] = __( 'Registrant User Agent', 'event_espresso' );
		$template_args['txn_details']['user_agent']['class'] = 'large-text';

//		$template_args['txn_details']['session_dump']['value'] = '<pre>' . printr ( $this->_session, 'Session Dump', TRUE ) . '</pre>';
//		$template_args['txn_details']['session_dump']['label'] = __( 'Session Dump', 'event_espresso' );
//		$template_args['txn_details']['session_dump']['class'] = 'large-text';

		//echo printr( $template_args, '$template_args' );
		
		
		if ( $this->_view_or_edit == 'edit' ) {
			$template_args['transaction_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'transaction'  ), TXN_ADMIN_URL );  
		}
		
		$template_path = TXN_TEMPLATE_URL . $this->_view_or_edit . '_txn_details_meta_box.template.php';
		echo espresso_display_template( $template_path, $template_args, TRUE );

	}





	/**
	 * 		generates HTML for the Attendees Transaction main meta box
	*		@access private
	*		@return void
	*/
	function _txn_attendees_meta_box() {
	
		global $wpdb, $org_options;
		
		if ( ! $this->_view_or_edit ) {
			$this->_view_or_edit = 'view';
		}

//		echo printr( $this->_session, '$this->_session' );

		// process items in cart
		$cart_items = $this->_session['cart']['REG']['items'];
		$template_args['items'] = array();
		$exclude = array( 'attendees' );

		foreach ( $cart_items as $line_item_ID => $item ) {
			foreach ( $item as $key => $value ) {
				if ( $key == 'attendees' ) {
					$template_args['event_attendees'][ $item['name'] ][ $key ] = $value;
				}
			}
		}

		$template_args['currency_sign'] = $org_options['currency_symbol'];
	
		if ( $this->_view_or_edit == 'edit' ) {
			$template_args['transaction_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'attendees'  ), TXN_ADMIN_URL );  
		}
		
		$template_path = TXN_TEMPLATE_URL . $this->_view_or_edit . '_txn_attendees_meta_box.template.php';
		echo espresso_display_template( $template_path, $template_args, TRUE );

	}






	/**
	 * 		generates HTML for the Edit Transaction side meta box
	*		@access private
	*		@return void
	*/
	function _txn_registrant_side_meta_box() {
	
		if ( ! $this->_view_or_edit ) {
			$this->_view_or_edit = 'view';
		}

		$template_args['fname'] = $this->_transaction->ATT_fname;
		$template_args['lname'] = $this->_transaction->ATT_lname;
		$template_args['email'] = $this->_transaction->ATT_email;
		$template_args['address'] = $this->_transaction->ATT_address;
		$template_args['address2'] = ( ! empty ( $this->_transaction->ATT_address2 )) ? '<br />' . $this->_transaction->ATT_address2 : '';
		$template_args['city'] = ( ! empty ( $this->_transaction->ATT_city )) ? '<br />' . $this->_transaction->ATT_city : '';
		$template_args['state'] = ( ! empty ( $this->_transaction->STA_ID )) ? '<br />' . $this->_transaction->STA_ID . ', ' : '';
		$template_args['country'] = ( ! empty ( $this->_transaction->CNT_ISO )) ? $this->_transaction->CNT_ISO : '';
		$template_args['zip'] = ( ! empty ( $this->_transaction->ATT_zip )) ? '<br />' . $this->_transaction->ATT_zip : '';
		$template_args['phone'] = $this->_transaction->ATT_phone;
		$template_args['social'] = $this->_transaction->ATT_social;
		$template_args['comments'] = $this->_transaction->ATT_comments;
		$template_args['notes'] = $this->_transaction->ATT_notes;
		
		if ( $this->_view_or_edit == 'edit' ) {
			$template_args['registrant_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'registrant'  ), TXN_ADMIN_URL );  
		}		

		$template_path = TXN_TEMPLATE_URL . $this->_view_or_edit . '_txn_side_meta_box_registrant.template.php';
		echo espresso_display_template( $template_path, $template_args, TRUE );
	}





	/**
	 * 		generates HTML for the Edit Transaction side meta box
	*		@access private
	*		@return void
	*/
	function _txn_billing_info_side_meta_box() {
	
		if ( ! $this->_view_or_edit ) {
			$this->_view_or_edit = 'view';
		}

		$billing_info = $this->_session['billing_info'];		
		//echo printr( $billing_info, '$billing_info' );

		if ( is_array( $billing_info )) {
		
			$template_args['free_event'] = FALSE; 
			
			$template_args['fname']['value'] = $billing_info['reg-page-billing-fname']['value'];
			$template_args['fname']['label'] = $billing_info['reg-page-billing-fname']['label'];
			
			$template_args['lname']['value'] = $billing_info['reg-page-billing-lname']['value'];
			$template_args['lname']['label'] = $billing_info['reg-page-billing-lname']['label'];
			
			$template_args['email']['value'] = $billing_info['reg-page-billing-email']['value'];
			$template_args['email']['label'] = 'Email';
			
			$template_args['address']['value'] = $billing_info['reg-page-billing-address']['value'];
			$template_args['address']['label'] = $billing_info['reg-page-billing-address']['label'];
			
			$template_args['city']['value'] = $billing_info['reg-page-billing-city']['value'];
			$template_args['city']['label'] = $billing_info['reg-page-billing-city']['label'];
			
			$template_args['state']['value'] = $billing_info['reg-page-billing-state']['value'];
			$template_args['state']['label'] = $billing_info['reg-page-billing-state']['label'];
			
			$template_args['country']['value'] = ! empty ( $billing_info['reg-page-billing-country']['value'] ) ? $billing_info['reg-page-billing-country']['value'] : '';
			$template_args['country']['label'] = ! empty ( $billing_info['reg-page-billing-country']['label'] ) ? $billing_info['reg-page-billing-country']['label'] : 'Country';
			
			$template_args['zip']['value'] = $billing_info['reg-page-billing-zip']['value'];
			$template_args['zip']['label'] = $billing_info['reg-page-billing-zip']['label'];
			
			if ( isset( $billing_info['reg-page-billing-card-nmbr'] )) {
				
				$template_args['credit_card_info'] = TRUE;
				
				$ccard = $billing_info['reg-page-billing-card-nmbr']['value'];
				$template_args['card_nmbr']['value'] = substr( $ccard, 0, 4 ) . ' XXXX XXXX ' . substr( $ccard, -4 );
				$template_args['card_nmbr']['label'] = 'Credit Card';
		
				$template_args['card_exp_date']['value'] = $billing_info['reg-page-billing-card-exp-date-mnth']['value'] . ' / ' . $billing_info['reg-page-billing-card-exp-date-year']['value'];
				$template_args['card_exp_date']['label'] = 'mm / yy';
		
				$template_args['card_ccv_code']['value'] = $billing_info['reg-page-billing-card-ccv-code']['value'];
				$template_args['card_ccv_code']['label'] = $billing_info['reg-page-billing-card-ccv-code']['label'];
				
			} else {
				$template_args['credit_card_info'] = FALSE;
			}
			
		} else {

			$template_args['free_event'] = $billing_info; 
			
		}
		

		
		if ( $this->_view_or_edit == 'edit' ) {
			$template_args['billing_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'billing'  ), TXN_ADMIN_URL );  
		}		

		$template_path = TXN_TEMPLATE_URL . $this->_view_or_edit . '_txn_side_meta_box_billing_info.template.php';
		echo espresso_display_template( $template_path, $template_args, TRUE );
	}





	/**
	 * 		generates HTML for the View Transaction Details Admin page
	*		@access private
	*		@return void
	*/
	private function _delete_transaction() {
		echo '<h1>OMG !!! You just deleted everything !!!</h1>';
		echo '<h1>What have you done ?!?!?</h1>';
		echo '<h1>Timmy\'s gonna be maaaaaad at you !!! </h1>';
	}





	/**
	 * 		generates HTML for the View Transaction Details Admin page
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




	
	/**
	*		load css
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function load_css() {

		wp_enqueue_style('jquery-ui-style', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery-ui-1.8.16.custom.css');
		wp_enqueue_style('jquery-ui-style-datepicker', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery.ui.datepicker.css');
		wp_register_style('espresso_txn', EVENT_ESPRESSO_PLUGINFULLURL . 'includes/admin_screens/transactions/espresso_transactions_admin.css' );		
		wp_enqueue_style('espresso_txn');
	}





	/**
	*		load js
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function load_js() {
		wp_enqueue_script('jquery-ui-core');
		wp_enqueue_script('jquery-ui-tabs');
		wp_enqueue_script('jquery-ui-datepicker');
		wp_enqueue_script('common');
		wp_enqueue_script('wp-lists');
		wp_enqueue_script('postbox');
		wp_register_script('espresso_txn', EVENT_ESPRESSO_PLUGINFULLURL . 'includes/admin_screens/transactions/espresso_transactions_admin.js', array('jquery'), '1.0', TRUE);
		wp_enqueue_script('espresso_txn');
	}





}
	
function event_espresso_manage_transactions() {
	new EE_Admin_Transactions();
}

// end of file:  includes/admin_screens/EE_Admin_Transactions.class.php
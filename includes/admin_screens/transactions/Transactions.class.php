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

	public function __construct() {

		global $org_options;
		define( 'TXN_ADMIN_URL', admin_url( 'admin.php?page=transactions' ));	
		define( 'TXN_TEMPLATE_URL', EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/transactions/templates/' );	

		// add some style
		$this->load_css();
		// and make it dance
		$this->load_js();

		
		if ( isset( $_REQUEST['action'] )) {
		
			check_admin_referer( $_REQUEST['action'] );	
			
			switch ( $_REQUEST['action'] ) {
			
				case 'view_transaction':
					$this->load_meta_box_js();		
					$this->_view_transaction_details(); 
					break;

				case 'edit_transaction':
					$this->load_meta_box_js();
					$this->_edit_transaction(); 
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
		
		$SQL = 'SELECT STS_ID, STS_code FROM '. $wpdb->prefix . 'esp_status WHERE STS_type = "transaction"';
		$results = $wpdb->get_results( $SQL );

		$stati = array();
		foreach ( $results as $status ) {
			$stati[ $status->STS_ID ] = $status->STS_code;
		}

		$template_args['start_date'] = isset( $_POST['txn-filter-start-date'] ) ? wp_strip_all_tags( $_POST['txn-filter-start-date'] ) : date( 'D M j, Y', strtotime( '-1 month' ));
		$template_args['end_date'] = isset( $_POST['txn-filter-end-date'] ) ? wp_strip_all_tags( $_POST['txn-filter-end-date'] ) : date( 'D M j, Y' );
		$template_args['end_date'] = ( strtotime( $template_args['end_date'] ) < strtotime( $template_args['start_date'] )) ? $template_args['start_date'] : $template_args['end_date'];
		
		
		$transactions = $TXN->get_transactions_for_admin_page( $template_args['start_date'], $template_args['end_date'] );  
		$template_args['table_rows'] = $wpdb->num_rows;
		$entries_per_page_dropdown = $this->_entries_per_page_dropdown( $template_args['table_rows'] );
		$template_args['list_table'] = new EE_Admin_Transactions_List_Table( $transactions, $stati, $entries_per_page_dropdown );

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
	 * 		generates HTML for the View Transaction Details Admin page
	*		@access private
	*		@return void
	*/
	private function _view_transaction_details() {

		global $wpdb, $org_options, $ee_admin_page;

		// default page args
		$template_args = array();		

	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Base.model.php' );
	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
	    $TXN = EEM_Transaction::instance();
		
		$SQL = 'SELECT STS_ID, STS_code FROM '. $wpdb->prefix . 'esp_status WHERE STS_type = "transaction"';
		$results = $wpdb->get_results( $SQL );

		$stati = array();
		foreach ( $results as $status ) {
			$stati[ $status->STS_ID ] = $status->STS_code;
		}
		
		$TXN_ID = ( ! empty( $_REQUEST['txn'] )) ? absint( $_REQUEST['txn'] ) : FALSE;
		
		$transaction = $TXN->get_transaction_for_admin_page( $TXN_ID );  
		$this->_transaction = array_shift( $transaction );  
/*		$session = maybe_unserialize( maybe_unserialize( $this->_transaction ->TXN_session_data ));
		// process items in cart
		$cart_items = $session['cart']['REG']['items'];
		//echo printr( $cart_items, '$cart_items' );
		$items = array();
		$exclude = array( 'attendees' );
		
		foreach ( $cart_items as $line_item_ID => $item ) {
			foreach ( $item as $key => $value ) {
				if ( ! in_array( $key, $exclude )) {
					if ( $key == 'options' ) {
						$options = $value;
						foreach ( $options as $opt => $option ) {
							$items[ $line_item_ID ][ $opt ] = $option;
						}
					} else {
						$items[ $line_item_ID ][ $key ] = $value;
					}					
				} 
			}
		}
		//echo printr($items);
		
		require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/transactions/Transaction_Details_Item_List_Table.class.php');
		$items_table = new EE_Admin_Transaction_Details_Item_List_Table( $items );
		ob_start();
		$items_table->display();
		$template_args['txn_items_table'] = ob_get_clean();*/

		$template_args['transactions_page'] = $ee_admin_page['transactions'];  
		
		add_meta_box( 'edit-txn-primary-mbox', __( 'Transaction Details', 'event_espresso' ), array( $this, 'view_txn_primary_meta_box' ), $ee_admin_page['transactions'], 'normal', 'high' );
		add_meta_box( 'edit-txn-registrant-mbox', __( 'Primary Registrant', 'event_espresso' ), array( $this, 'view_txn_registrant_side_meta_box' ), $ee_admin_page['transactions'], 'side', 'high' );
		add_meta_box( 'edit-txn-billing-info-mbox', __( 'Billing Information', 'event_espresso' ), array( $this, 'view_txn_billing_info_side_meta_box' ), $ee_admin_page['transactions'], 'side', 'high' );

		// link back to overview
		$template_args['txn_overview_url'] = TXN_ADMIN_URL;  
		// grab messages at the last second
		$template_args['notices'] = espresso_get_notices();
		// path to template 
		$template_path = TXN_TEMPLATE_URL . 'view_transaction_details.template.php';
		echo espresso_display_template( $template_path, $template_args, TRUE );
				
	}




	/**
	 * 		generates HTML for the Edit Transaction main meta box
	*		@access private
	*		@return void
	*/
	function view_txn_primary_meta_box() {
	
		global $wpdb, $org_options;
		//echo printr($this->_transaction);
		$session = maybe_unserialize( maybe_unserialize( $this->_transaction ->TXN_session_data ));
		//echo printr( $session, '$session' );
		
		// process items in cart
		$cart_items = $session['cart']['REG']['items'];
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
							$template_args['items'][ $line_item_ID ][ $opt ] = $option;
						}
					} else {
						$template_args['items'][ $line_item_ID ][ $key ] = $value;
					}					
				} else {
					$template_args['attendees'][ $line_item_ID ][ $key ] = $value;
				}
			}
		}
		
		// process taxes
		$taxes = maybe_unserialize( $this->_transaction->TXN_tax_data );
		$template_args['taxes'] = $taxes['taxes'];
		$template_args['grand_total'] = $this->_transaction->TXN_total;

		
		$template_args['currency_sign'] = $org_options['currency_symbol'];
		$template_path = TXN_TEMPLATE_URL . 'view_txn_primary_meta_box.template.php';
		echo espresso_display_template( $template_path, $template_args, TRUE );
	}



	/**
	 * 		generates HTML for the Edit Transaction side meta box
	*		@access private
	*		@return void
	*/
	function view_txn_registrant_side_meta_box() {
	
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
		
		$template_path = TXN_TEMPLATE_URL . 'view_txn_side_meta_box_registrant.template.php';
		echo espresso_display_template( $template_path, $template_args, TRUE );
	}




	/**
	 * 		generates HTML for the Edit Transaction side meta box
	*		@access private
	*		@return void
	*/
	function view_txn_billing_info_side_meta_box() {
	
		$session = maybe_unserialize( maybe_unserialize( $this->_transaction ->TXN_session_data ));
		$billing_info = $session['billing_info'];
		
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

		$template_path = TXN_TEMPLATE_URL . 'view_txn_side_meta_box_billing_info.template.php';
		echo espresso_display_template( $template_path, $template_args, TRUE );
	}




	/**
	 * 		generates HTML for the View Transaction Details Admin page
	*		@access private
	*		@return void
	*/
	private function _edit_transaction() {
		echo '<h1>Edit</h1>';
	}





	/**
	 * 		generates HTML for the View Transaction Details Admin page
	*		@access private
	*		@return void
	*/
	private function _delete_transaction() {
		echo '<h1>OMG !!! You just deleted everything !!!</h1>';
		echo '<h1>What have you done ?!?!?</h1>';
		echo '<h1>Timmy\'s going to be maaaaaad at you !!! </h1>';
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
		wp_register_script('espresso_txn', EVENT_ESPRESSO_PLUGINFULLURL . 'includes/admin_screens/transactions/espresso_transactions_admin.js', array('jquery'), '1.0', TRUE);
		wp_enqueue_script('espresso_txn');
	}





	/**
	*		load_meta_box_js
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function load_meta_box_js() {
		wp_enqueue_script('common');
		wp_enqueue_script('wp-lists');
		wp_enqueue_script('postbox');
	}


}
	
function event_espresso_manage_transactions() {
	new EE_Admin_Transactions();
}

// end of file:  includes/admin_screens/EE_Admin_Transactions.class.php
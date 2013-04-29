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
 * @ since		 		4.0
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
class Transactions_Admin_Page extends EE_Admin_Page {

	private $_transaction;
	private $_session;
	private static $_txn_status;
	private static $_pay_status;





	/**
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
	}







	protected function _init_page_props() {
		$this->page_slug = TXN_PG_SLUG;
		$this->page_label = __('Transactions', 'event_espresso');
	}








	protected function _ajax_hooks() {
		add_action('wp_ajax_espresso_apply_payment', array( $this, 'apply_payments_or_refunds'));
		add_action('wp_ajax_espresso_apply_refund', array( $this, 'apply_payments_or_refunds'));
		add_action('wp_ajax_espresso_delete_payment', array( $this, 'delete_payment'));
	}







	protected function  _define_page_props() {
		$this->_admin_base_url = TXN_ADMIN_URL;
		$this->_admin_page_title = $this->page_label;
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Transaction', 'event_espresso'),
				'edit' => __('Edit Transaction', 'event_espresso'),
				'delete' => __('Delete Transaction','event_espresso')
				)
			);
	}









	/**
	 * 		grab url requests and route them
	*		@access private
	*		@return void
	*/
	public function _set_page_routes() {			

		$this->_get_transaction_status_array();

		$this->_page_routes = array(
				'default' => '_transactions_overview_list_table',
				'view_transaction' => '_transaction_details',
				'send_payment_reminder'	=> array(
					'func' => '_send_payment_reminder',
					'noheader' => TRUE
					),
				'reports' => '_transaction_reports',
				'espresso_apply_payment' => array(
				 	'func' => 'apply_payments_or_refunds',
				 	'noheader' => TRUE
				 	),
				'espresso_apply_refund'	=> array(
					'func' => 'apply_payments_or_refunds',
					'noheader' => TRUE
					),
				'espresso_delete_payment' => array(
					'func' => 'delete_payment',
					'noheader' => TRUE
					)
		);
		
	}








	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Overview', 'event_espresso'),
					'order' => 10
					),
				'list_table' => 'EE_Admin_Transactions_List_Table'
				),
			'view_transaction' => array(
				'nav' => array(
					'label' => __('View Transaction', 'event_espresso'),
					'order' => 5,
					'url' => isset($this->_req_data['txn']) ? add_query_arg(array('txn' => $this->_req_data['txn'] ), $this->_current_page_view_url )  : $this->_admin_base_url,
					'persistent' => FALSE
					),
				'metaboxes' => array('_transaction_details_metaboxes')
				),
			'reports' => array(
				'nav' => array(
					'label' => __('Reports', 'event_espresso'),
					'order' => 20
					)
				)
		);
	}






	/**
	 * The below methods aren't used by this class currently
	 */
	protected function _add_screen_options() {}
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}






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

	}




	/**
	 * return the transaction status array for wp_list_table
	 *
	 * @access public
	 * @return array
	 */
	public function get_transaction_status_array() {
		return self::$_txn_status;
	}





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
		//printr( self::$_pay_status, 'self::$_pay_status  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$this->_template_args['payment_status'] = self::$_pay_status;
			
	}






	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}





	public function load_scripts_styles() {
		//enqueue style
		wp_register_style( 'espresso_txn', TXN_ASSETS_URL . 'espresso_transactions_admin.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('espresso_txn');

		//scripts
		wp_register_script('espresso_txn', TXN_ASSETS_URL . 'espresso_transactions_admin.js', array('ee_admin_js', 'jquery-ui-datepicker', 'jquery-ui-draggable'), EVENT_ESPRESSO_VERSION, TRUE);
		wp_enqueue_script('espresso_txn');	

		global $eei18n_js_strings;
		$eei18n_js_strings['invalid_server_response'] = __( 'An error occured! Your request may have been processed, but a valid response from the server was not received. Please refresh the page and try again.', 'event_espresso' );
		$eei18n_js_strings['error_occured'] = __(  'An error occured! Please refresh the page and try again.', 'event_espresso' );
		$eei18n_js_strings['txn_status_array'] = self::$_txn_status;
		$eei18n_js_strings['pay_status_array'] = self::$_pay_status;

		wp_localize_script( 'espresso_txn', 'eei18n', $eei18n_js_strings );

	}




	public function load_scripts_styles_view_transaction() {
		//styles
		wp_enqueue_style('jquery-ui-style');
		wp_enqueue_style('jquery-ui-style-datepicker-css');

		//scripts
	}





	public function load_scripts_styles_default() {
		//styles
		wp_enqueue_style('jquery-ui-style');
		wp_enqueue_style('jquery-ui-style-datepicker-css');

	}






	public function load_scripts_styles_reports() {
		//styles
		wp_enqueue_style('jquery-jqplot-css', JQPLOT_URL . 'jquery.jqplot.min.css', array(), EVENT_ESPRESSO_VERSION);

		//scripts
		wp_deregister_script( 'jquery' );
        wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
		global $is_IE;
		if ( $is_IE ) {
			wp_enqueue_script( 'excanvas' , JQPLOT_URL . 'excanvas.min.js', array(), ESPRESSO_E, FALSE);
		}
		wp_enqueue_script('jqplot-all');
	}







	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('View All', 'event_espresso'),
				'count' => 0
				)
			);
	}






	/**
	 * This sets the _transaction property for the transaction details screen
	 */
	private function _set_transaction_object() {
		if ( is_object( $this->_transaction) )
			return; //get out we've already set the object

	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
	    $TXN = EEM_Transaction::instance();

	    $TXN_ID = ( ! empty( $_REQUEST['txn'] )) ? absint( $_REQUEST['txn'] ) : FALSE;

	    if ( $transaction = $TXN->get_transaction_for_admin_page( $TXN_ID ) ) {
	    	$this->_transaction = array_shift( $transaction ); 
			$this->_session = maybe_unserialize( $this->_transaction ->TXN_session_data );
			//printr( $this->_session, '$this->_session  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			if ( ! is_array( $this->_session )) {
				//$this->_session = maybe_unserialize( base64_decode( $this->_session ));
				$this->_session = EE_Ticket_Prices::unobfuscate( $this->_session );
				//printr( $this->_session, '$this->_session  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			}			
			
			$this->_session = maybe_unserialize( $this->_session );
			//printr( $this->_session, '$this->_session  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

	    	return;
	    } else {
	    	$error_msg = __('An error occured and the details for Transaction ID #', 'event_espresso') . $TXN_ID .  __(' could not be retreived.', 'event_espresso');
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			$this->_transaction = NULL;
			$this->_session = NULL;
	    }
	}






	protected function _transaction_legend_items() {
		$items = array(
			'view_details' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL .'images/magnifier.png',
				'desc' => __('View Transaction Details', 'event_espresso')
				),
			'download_invoice' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL .'images/invoice-1-16x16.png',
				'desc' => __('Download Invoice for Transaction.', 'event_espresso')
				),
			'view_registration' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL .'images/edit.png',
				'desc' => __('View Registration Details', 'event_espresso')
				)
		);
		return $items;
	}



	protected function _transactions_overview_list_table() {
		$this->_template_args['after_list_table'] = $this->_display_legend( $this->_transaction_legend_items() );
		$this->display_admin_list_table_page_with_no_sidebar();
	}









	/**
	 * 		generates HTML for the View Transaction Details Admin page
	*		@access protected
	*		@return void
	*/
	protected function _transaction_details() {

		global $wpdb, $org_options;
		
		$this->_get_transaction_status_array();

		$this->_template_args = array();		
		$this->_template_args['transactions_page'] = $this->wp_page_slug;  

	    $this->_set_transaction_object();
	
		$this->_template_args['txn_nmbr']['value'] = $this->_transaction->TXN_ID;
		$this->_template_args['txn_nmbr']['label'] = __( 'Transaction Number', 'event_espresso' );
		
		$this->_template_args['txn_datetime']['value'] = date( 'l F j, Y,    g:i:s a', $this->_transaction->TXN_timestamp );
		$this->_template_args['txn_datetime']['label'] = __( 'Date', 'event_espresso' );

		$this->_template_args['txn_status']['value'] = self::$_txn_status[ $this->_transaction->STS_ID ];
		$this->_template_args['txn_status']['label'] = __( 'Transaction Status', 'event_espresso' );	
		$this->_template_args['txn_status']['class'] = 'status-' . $this->_transaction->STS_ID;

		$this->_template_args['grand_total'] = $this->_transaction->TXN_total;
		$this->_template_args['total_paid'] = $this->_transaction->TXN_paid;
		
		$amount_due = number_format(( $this->_transaction->TXN_total - $this->_transaction->TXN_paid ), 2 );
		$this->_template_args['amount_due'] =  $org_options['currency_symbol'] . ' <span id="txn-admin-total-amount-due">' . $amount_due . '</span>';
		$this->_template_args['amount_due_class'] =  '';	
		
		if ( $this->_transaction->TXN_paid == $this->_transaction->TXN_total ) {
			// paid in full
			$this->_template_args['amount_due'] =  FALSE;
		} elseif ( $this->_transaction->TXN_paid > $this->_transaction->TXN_total ) {
			// overpaid
			$this->_template_args['amount_due_class'] =  'txn-overview-no-payment-spn';			
		} elseif (( $this->_transaction->TXN_total > 0 ) && ( $this->_transaction->TXN_paid > 0 )) {
			// monies owing
			$this->_template_args['amount_due_class'] =  'txn-overview-part-payment-spn';			
		} elseif (( $this->_transaction->TXN_total > 0 ) && ( $this->_transaction->TXN_paid == 0 )) {
			// no payments made yet
			$this->_template_args['amount_due_class'] =  'txn-overview-no-payment-spn';			
		} elseif ( $this->_transaction->TXN_total == 0 ) {
			// free event 
			$this->_template_args['amount_due'] =  FALSE;
		}

		$this->_template_args['currency_sign'] = $org_options['currency_symbol'];
		// link back to overview
		$this->_template_args['txn_overview_url'] = ! empty ( $_SERVER['HTTP_REFERER'] ) ? $_SERVER['HTTP_REFERER'] : TXN_ADMIN_URL;  
		

		// grab messages at the last second
		$this->_template_args['notices'] = EE_Error::get_notices();
		// path to template 
		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_header.template.php';
		$this->_template_args['admin_page_header'] = espresso_display_template( $template_path, $this->_template_args, TRUE );
		
		// the details template wrapper
		$this->display_admin_page_with_sidebar();
				
	}





	protected function _transaction_details_metaboxes() {

		$this->_set_transaction_object();

		add_meta_box( 'edit-txn-details-mbox', __( 'Transaction Details', 'event_espresso' ), array( $this, '_txn_details_meta_box' ), $this->wp_page_slug, 'normal', 'high' );
		add_meta_box( 
			'edit-txn-attendees-mbox',
			__( 'Attendees Registered in this Transaction', 'event_espresso' ),
			array( $this, '_txn_attendees_meta_box' ),
			$this->wp_page_slug,
			'normal',
			'high',
			array( 'TXN_ID' => $this->_transaction->TXN_ID )
		);
		add_meta_box( 'edit-txn-registrant-mbox', __( 'Primary Registrant', 'event_espresso' ), array( $this, '_txn_registrant_side_meta_box' ), $this->wp_page_slug, 'side', 'high' );
		add_meta_box( 'edit-txn-billing-info-mbox', __( 'Billing Information', 'event_espresso' ), array( $this, '_txn_billing_info_side_meta_box' ), $this->wp_page_slug, 'side', 'high' );

	}


	/**
	 * 		generates HTML for the Transaction main meta box
	*		@access private
	*		@return void
	*/
	function _txn_details_meta_box() {
	
		global $wpdb, $org_options;
		$this->_set_transaction_object();

		// process items in cart
		$cart_items = isset( $this->_session['cart'] ) ? $this->_session['cart']['REG']['items'] : array();
		$this->_template_args['items'] = array();
		$exclude = array( 'attendees' );
		
		$this->_template_args['REG_code'] = $this->_transaction->REG_code;
		
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
								$this->_template_args['items'][ $item['name'] ][ $opt ] = $option;
							}
						} elseif ( $key == 'line_item' ) {
							$this->_template_args['items'][ $item['name'] ][ $key ] = '<a title="' . $value . '" style="color:#333;">' . substr( $value, 0, 6 ) . '...</a>';
						} else {
							$this->_template_args['items'][ $item['name'] ][ $key ] = $value;
						}					
					} 
				}
			}		
		}

		
		// process taxes
		if ( $taxes = maybe_unserialize( $this->_transaction->TXN_tax_data )) {
			$this->_template_args['taxes'] = $taxes['taxes'];
		} else {
			$this->_template_args['taxes'] = FALSE;
		}

		$this->_template_args['grand_total'] = $this->_transaction->TXN_total;
		$this->_template_args['TXN_status'] = $this->_transaction->STS_ID;


		$this->_template_args['currency_sign'] = $org_options['currency_symbol'];
		$txn_status_class = 'status-' . $this->_transaction->STS_ID;
		
		$txn_details = maybe_unserialize( $this->_transaction ->TXN_details );
		
		// process payment details
	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Payment.model.php' );
	    $PAY = EEM_Payment::instance();
		if ( ! $this->_template_args['payments'] = $PAY->get_payments_for_transaction( $this->_transaction->TXN_ID )) {
			$this->_template_args['payments'] = FALSE;
		}
		
		$this->_template_args['edit_payment_url'] = add_query_arg( array( 'action' => 'edit_payment'  ), TXN_ADMIN_URL );
		$this->_template_args['delete_payment_url'] = add_query_arg( array( 'action' => 'delete_payment' ), TXN_ADMIN_URL );

		if ( isset( $txn_details['invoice_number'] )) {
			$this->_template_args['txn_details']['invoice_number']['value'] = $txn_details['invoice_number'];
			$this->_template_args['txn_details']['invoice_number']['label'] = __( 'Invoice Number', 'event_espresso' );
			$this->_template_args['txn_details']['invoice_number']['class'] = 'regular-text';
		} 

		$this->_template_args['txn_details']['registration_session']['value'] = $this->_transaction->REG_session;
		$this->_template_args['txn_details']['registration_session']['label'] = __( 'Registration Session', 'event_espresso' );
		$this->_template_args['txn_details']['registration_session']['class'] = 'regular-text';
		
		$this->_template_args['txn_details']['ip_address']['value'] = $this->_session['ip_address'];
		$this->_template_args['txn_details']['ip_address']['label'] = __( 'Transaction placed from IP', 'event_espresso' );
		$this->_template_args['txn_details']['ip_address']['class'] = 'regular-text';
		
		$this->_template_args['txn_details']['user_agent']['value'] = $this->_session['user_agent'];
		$this->_template_args['txn_details']['user_agent']['label'] = __( 'Registrant User Agent', 'event_espresso' );
		$this->_template_args['txn_details']['user_agent']['class'] = 'large-text';


		$this->_get_payment_methods();
		$this->_get_active_gateways();
		$this->_get_payment_status_array();
		
		$this->_template_args['transaction_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'transaction'  ), TXN_ADMIN_URL );
		$this->_template_args['apply_payment_form_url'] = add_query_arg( array( 'page' => 'espresso_transactions', 'action' => 'espresso_apply_payment' ), WP_AJAX_URL );
		$this->_template_args['delete_payment_form_url'] = add_query_arg( array( 'page' => 'espresso_transactions', 'action' => 'espresso_delete_payment' ), WP_AJAX_URL );
		
		// 'espresso_delete_payment_nonce'
		
		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_main_meta_box_txn_details.template.php';
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );

	}





	/**
	 * 		_get_active_gateways
	*		@access private
	*		@return void
	*/
	private function _get_active_gateways() {
		global $espresso_wp_user;
		$this->_template_args['active_gateways'] = array();
		$payment_options = get_user_meta($espresso_wp_user, 'payment_settings', true);
		//echo printr( $payment_options, '$payment_options' );
		if ( $gateways = get_user_meta($espresso_wp_user, 'active_gateways', true)) {
			//echo printr( $gateways, '$gateways' );
			foreach ( $gateways as $gw_key => $gateway ) {
				if ( isset( $payment_options[ $gw_key ]['type'] ) && $payment_options[ $gw_key ]['type'] != 'off-line' && $gw_key != 'paypal' ) {
					$this->_template_args['active_gateways'][ $gw_key ] = $payment_options[ $gw_key ]['display_name'];
				}
			}
		}	
	}





	/**
	 * 		_get_payment_methods
	*		@access private
	*		@return void
	*/
	private function _get_payment_methods() {
		$this->_template_args['payment_methods'] = array(
			'PP' => __( 'PayPal', 'event_espresso' ),
			'CC' => __( 'Credit Card', 'event_espresso' ),
			'CHQ' => __( 'Cheque', 'event_espresso' ),
			'CSH' => __( 'Cash', 'event_espresso' )
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
		
		// process items in cart
		$cart_items = $this->_session['cart']['REG']['items'];
		$this->_template_args['items'] = array();
		$this->_template_args['event_attendees'] = array();
		
		if ( ! empty( $cart_items )) {
			foreach ( $cart_items as $line_item_ID => $item ) {
				$event_name_and_price_option = $item['name'] . ' - ' . $item['options']['price_desc'];
				//printr( $item, '$item' );
				foreach ( $item['attendees'] as $att_nmbr => $attendee ) {
					// check for attendee object
					$attendee['att_obj'] = isset( $attendee['att_obj'] ) && is_object( $attendee['att_obj'] ) ? $attendee['att_obj'] : FALSE;
					if ( ! $attendee['att_obj'] ) {
						if ( isset( $attendee[1] ) && isset( $attendee[2] ) && isset( $attendee[3] )) {
							$where_cols_n_values = array( 'ATT_fname' => $attendee[1], 'ATT_lname' => $attendee[2], 'ATT_email' => $attendee[3] );
						    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php' );
						    $ATT_MDL = EEM_Attendee::instance();
							$attendee['att_obj'] = $ATT_MDL->find_existing_attendee( $where_cols_n_values );
						} else {
							$attendee['att_obj'] = FALSE;
						}
						if ( ! $attendee['att_obj'] ) {
							$attendee['att_obj'] = new EE_Attendee;
						}	 
					}
					// check for reg object
					$attendee['reg_obj'] = isset( $attendee['reg_obj'] ) && is_object( $attendee['reg_obj'] ) ? $attendee['reg_obj'] : FALSE;		
					if ( ! $attendee['reg_obj'] ) {
						//$where_cols_n_values = array( 'ATT_fname' => $attendee[1], 'ATT_lname' => $attendee[2], 'ATT_email' => $attendee[3] );
					    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
					    $REG_MDL = EEM_Registration::instance();
						if ( ! $attendee['reg_obj'] = $REG_MDL->get_registration_for_transaction_attendee( $TXN_ID, $attendee['att_obj']->ID(), $att_nmbr )) {
							$attendee['reg_obj'] = new EE_Registration;
						}	 
					}
					
					foreach ( $attendee as $key => $value ) {
						$this->_template_args['event_attendees'][ $event_name_and_price_option ][ $att_nmbr ][ $key ] = maybe_unserialize( $value );
					}
				}
			}
		}
		//printr( $this->_template_args['event_attendees'], 'event_attendees' );

		$this->_template_args['currency_sign'] = $org_options['currency_symbol'];
		$this->_template_args['transaction_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'attendees'  ), TXN_ADMIN_URL );  
		
		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_main_meta_box_attendees.template.php';
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );

	}






	/**
	 * 		generates HTML for the Edit Transaction side meta box
	*		@access private
	*		@return void
	*/
	function _txn_registrant_side_meta_box() {
	
		$this->_template_args['ATT_ID'] = $this->_transaction->ATT_ID;
		$this->_template_args['prime_reg_fname'] = $this->_transaction->ATT_fname;
		$this->_template_args['prime_reg_lname'] = $this->_transaction->ATT_lname;
		$this->_template_args['prime_reg_email'] = $this->_transaction->ATT_email;
		$this->_template_args['prime_reg_address'] = $this->_transaction->ATT_address;
		$this->_template_args['prime_reg_address2'] = ( ! empty ( $this->_transaction->ATT_address2 )) ? '<br />' . $this->_transaction->ATT_address2 : '';
		$this->_template_args['prime_reg_city'] = ( ! empty ( $this->_transaction->ATT_city )) ? '<br />' . $this->_transaction->ATT_city : '';
		$this->_template_args['prime_reg_state'] = ( ! empty ( $this->_transaction->STA_ID )) ? '<br />' . $this->_transaction->STA_ID . ', ' : '';
		$this->_template_args['prime_reg_country'] = ( ! empty ( $this->_transaction->CNT_ISO )) ? $this->_transaction->CNT_ISO : '';
		$this->_template_args['prime_reg_zip'] = ( ! empty ( $this->_transaction->ATT_zip )) ? '<br />' . $this->_transaction->ATT_zip : '';
		$this->_template_args['prime_reg_phone'] = $this->_transaction->ATT_phone;
		$this->_template_args['prime_reg_social'] = $this->_transaction->ATT_social;
		$this->_template_args['prime_reg_comments'] = $this->_transaction->ATT_comments;
		$this->_template_args['prime_reg_notes'] = $this->_transaction->ATT_notes;
		
		$this->_template_args['registrant_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'registrant'  ), TXN_ADMIN_URL );  

		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_side_meta_box_registrant.template.php';
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );
	}





	/**
	 * 		generates HTML for the Edit Transaction side meta box
	*		@access private
	*		@return void
	*/
	function _txn_billing_info_side_meta_box() {
	
		$billing_info = $this->_session['billing_info'];		

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


			$this->_template_args['fname']['value'] = '';
			$this->_template_args['fname']['label'] =  __( 'First Name', 'event_espresso' );
			$this->_template_args['lname']['value'] =  '';
			$this->_template_args['lname']['label'] = __( 'Last Name', 'event_espresso' );
			$this->_template_args['email']['value'] = '';
			$this->_template_args['email']['label'] = __( 'Email', 'event_espresso' );
			$this->_template_args['address']['value'] = '';
			$this->_template_args['address']['label'] = __( 'Address', 'event_espresso' );
			$this->_template_args['city']['value'] = '';
			$this->_template_args['city']['label'] = __( 'City', 'event_espresso' );
			$this->_template_args['state']['value'] = '';
			$this->_template_args['state']['label'] =  __( 'State', 'event_espresso' );
			$this->_template_args['country']['value'] = '';
			$this->_template_args['country']['label'] = __( 'Country', 'event_espresso' );
			$this->_template_args['zip']['value'] = '';
			$this->_template_args['zip']['label'] = __( 'Zip Code', 'event_espresso' );
			$this->_template_args['credit_card_info'] = FALSE;
			$this->_template_args['free_event'] = $billing_info; 
			
		}
	
		//printr( $this->_template_args, 'template_args' );
		
		$this->_template_args['billing_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'billing'  ), TXN_ADMIN_URL );  

		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_side_meta_box_billing_info.template.php';
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );
	}





	/**
	 * 		registers a payment or refund made towards a transaction
	*		@access public
	*		@return void
	*/
	public function apply_payments_or_refunds() {

		$return_data = FALSE;

		if ( isset( $this->_req_data['txn_admin_payment'] )) {
		
			$payment = $this->_req_data['txn_admin_payment'];
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
					$payment['gateway_response'] = '';
					break;

				case 'CC' :
					$payment['gateway'] = 'Credit_Card';
					$payment['gateway_response'] = '';
					break;

				case 'CHQ' :
					$payment['gateway'] = 'Cheque';
					$payment['gateway_response'] = '';
					break;

				case 'CSH' :
					$payment['gateway'] = 'Cash';
					$payment['txn_id_chq_nmbr'] = '';
					$payment['gateway_response'] = '';
					break;

			}
			//savea  the new payment
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
			if( ! $payment->save() ){
				$msg = __( 'An error occured. The payment has not been processed succesfully.', 'event_espresso' );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
			//update the transaction with this payment
			if( $payment->apply_payment_to_transaction( TRUE ) ){
				$msg =__('The payment has been processed succesfully.', 'event_espresso');
				EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}else{
				$msg = __( 'An error occured. The payment was processed succesfully but the amount paid for the transaction was not updated.', 'event_espresso');
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
			
			//prepare to render page
			$transaction = $payment->transaction();
			$this->_get_payment_status_array();
			$return_data['amount'] = $payment->amount();
			$return_data['total_paid'] = $transaction->total();
			$return_data['txn_status'] = $transaction->status_ID();
			$return_data['pay_status'] = $payment->STS_ID();
			$return_data['PAY_ID'] = $payment->ID();
			$return_data['STS_ID'] = $payment->STS_ID();
			$return_data['status'] = self::$_pay_status[ $payment->STS_ID() ];
			$return_data['date'] = $payment->timestamp( 'D M j, Y' );
			$return_data['method'] = strtoupper( $payment->method() ) ;
			$this->_get_active_gateways();
			$return_data['gateway'] = isset( $this->_template_args['active_gateways'][ $payment->gateway() ] ) ? $this->_template_args['active_gateways'][ $payment->gateway() ] : $payment->gateway();
			$return_data['gateway_response'] = $payment->gateway_response();
			$return_data['txn_id_chq_nmbr'] = $payment->txn_id_chq_nmbr();
			$return_data['po_number'] = $payment->po_number();
			$return_data['extra_accntng'] = $payment->extra_accntng();

			$this->_process_payment_notification( $payment );

		} else {
			$msg = __( 'An error occured. The payment form data could not be loaded.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );			
		}
		
		$notices = EE_Error::get_notices( FALSE, FALSE, FALSE ); 
		
		echo json_encode( array( 'return_data' => $return_data, 'success' => $notices['success'], 'errors' => $notices['errors'] ));
		die();

	}





	/**
	 * 		delete a payment or refund made towards a transaction
	*		@access public
	*		@return void
	*/
	public function delete_payment() {
	
		$return_data = FALSE;
		
		if ( isset( $this->_req_data['ID'] )) {
			if ( $PAY_ID = absint( $this->_req_data['ID'] )) {
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Payment.model.php');
				$PAY_MODEL = EEM_Payment::instance();
				$return_data = $PAY_MODEL->delete_payment( $PAY_ID );
				$return_data['PAY_ID'] = $PAY_ID;
			}
		} else {
			$msg = __( 'An error occured. The payment form data could not be loaded.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );			
		}
		$notices = EE_Error::get_notices( FALSE, FALSE, FALSE );

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
	
		$page_args = array();
		
		$page_args['admin_reports'][] = $this->_revenue_per_day_report( '-1 month' );  //  option: '-1 week', '-2 weeks' defaults to '-1 month'
		$page_args['admin_reports'][] = $this->_revenue_per_event_report( '-1 month' ); //  option: '-1 week', '-2 weeks' defaults to '-1 month'
//		$page_args['admin_reports'][] = 'chart1';
		
		$template_path = EE_CORE_ADMIN_TEMPLATE . 'admin_reports.template.php';
		$this->_template_args['admin_page_content'] = espresso_display_template( $template_path, $page_args, TRUE );
		
		
		// the final template wrapper
		$this->display_admin_page_with_no_sidebar();
		
	}






	/**
	 * 		generates Business Report showing Total Revenue per Day
	*		@access private
	*		@return void
	*/
	private function _revenue_per_day_report( $period = '-1 month' ) {
	
		$report_ID = 'txn-admin-revenue-per-day-report-dv';
		$report_JS = 'espresso_txn_admin_revenue_per_day';
		
		wp_enqueue_script( $report_JS, TXN_ASSETS_URL . $report_JS . '_report.js', array('jqplot-all'), '1.0', TRUE);

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
		
		wp_enqueue_script( $report_JS, TXN_ASSETS_URL . $report_JS . '_report.js', array('jqplot-all'), '1.0', TRUE);

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
	 * get transactions for given parameters (used by list table)
	 * @param  int  $perpage how many transactions displayed per page
	 * @param  boolean $count   return the count or objects
	 * @return mixed (int|array)           int = count || array of transaction objects
	 */
	public function get_transactions( $perpage, $count = FALSE ) {
	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
	    $TXN = EEM_Transaction::instance();

	    $start_date = isset( $this->_req_data['txn-filter-start-date'] ) ? wp_strip_all_tags( $this->_req_data['txn-filter-start-date'] ) : date( 'D M j, Y', strtotime( '-10 year' ));
	    $end_date = isset( $this->_req_data['txn-filter-end-date'] ) ? wp_strip_all_tags( $this->_req_data['txn-filter-end-date'] ) : date( 'D M j, Y' );

	    //set orderby
		$this->_req_data['orderby'] = ! empty($this->_req_data['orderby']) ? $this->_req_data['orderby'] : '';

		switch ( $this->_req_data['orderby'] ) {
			case 'TXN_ID':
				$orderby = 'TXN_ID';
				break;
			case 'ATT_fname':
				$orderby = 'TXN_att_name';
				break;
			case 'event_name':
				$orderby = 'event_name';
				break;
			default: //'TXN_timestamp'
				$orderby = 'TXN_timestamp';
		}

		$sort = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] )) ? $this->_req_data['order'] : 'DESC';
		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $perpage ) && !empty( $perpage ) ? $perpage : 10;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $per_page;

		$offset = ($current_page-1)*$per_page;
		$limit = array( $offset, $per_page );

		$transactions =   $TXN->get_transactions_for_admin_page( $start_date, $end_date, $orderby, $sort, $limit, $count );
		return $transactions;

	}


	public function get_all_transactions_count() {
	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
	    $TXN = EEM_Transaction::instance();

	    return $TXN->get_all_transactions(TRUE);
	}

	

}


	
// end of file:  includes/core/admin/transactions/Transactions_Admin_Page.core.php
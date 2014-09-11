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
	/**
	 *
	 * @var EE_Transaction
	 */
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
		$this->_admin_base_url = TXN_ADMIN_URL;
		$this->_admin_base_path = TXN_ADMIN;
	}








	protected function _ajax_hooks() {
		add_action('wp_ajax_espresso_apply_payment', array( $this, 'apply_payments_or_refunds'));
		add_action('wp_ajax_espresso_apply_refund', array( $this, 'apply_payments_or_refunds'));
		add_action('wp_ajax_espresso_delete_payment', array( $this, 'delete_payment'));
	}







	protected function  _define_page_props() {
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
					),

		);

	}








	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Overview', 'event_espresso'),
					'order' => 10
					),
				'list_table' => 'EE_Admin_Transactions_List_Table',
				'help_tabs' => array(
					'transactions_overview_help_tab' => array(
						'title' => __('Transactions Overview', 'event_espresso'),
						'filename' => 'transactions_overview'
					),
					'transactions_overview_table_column_headings_help_tab' => array(
						'title' => __('Transactions Table Column Headings', 'event_espresso'),
						'filename' => 'transactions_overview_table_column_headings'
					),
					'transactions_overview_views_filters_help_tab' => array(
						'title' => __('Transaction Views & Filters & Search', 'event_espresso'),
						'filename' => 'transactions_overview_views_filters_search'
					),
				),
				'help_tour' => array( 'Transactions_Overview_Help_Tour' ),
				'qtips' => array( 'Transactions_List_Table_Tips' ),
				'require_nonce' => FALSE
				),
			'view_transaction' => array(
				'nav' => array(
					'label' => __('View Transaction', 'event_espresso'),
					'order' => 5,
					'url' => isset($this->_req_data['TXN_ID']) ? add_query_arg(array('TXN_ID' => $this->_req_data['TXN_ID'] ), $this->_current_page_view_url )  : $this->_admin_base_url,
					'persistent' => FALSE
					),
				'help_tabs' => array(
					'transactions_view_transaction_help_tab' => array(
						'title' => __('View Transaction', 'event_espresso'),
						'filename' => 'transactions_view_transaction'
					),
					'transactions_view_transaction_transaction_details_table_help_tab' => array(
						'title' => __('Transaction Details Table', 'event_espresso'),
						'filename' => 'transactions_view_transaction_transaction_details_table'
					),
					'transactions_view_transaction_attendees_registered_help_tab' => array(
						'title' => __('Attendees Registered', 'event_espresso'),
						'filename' => 'transactions_view_transaction_attendees_registered'
					),
					'transactions_view_transaction_views_primary_registrant_billing_information_help_tab' => array(
						'title' => __('Primary Registrant & Billing Information', 'event_espresso'),
						'filename' => 'transactions_view_transaction_primary_registrant_billing_information'
					),
				),
				'qtips' => array( 'Transaction_Details_Tips' ),
				'help_tour' => array( 'Transaction_Details_Help_Tour' ),
				'metaboxes' => array('_transaction_details_metaboxes'),

				'require_nonce' => FALSE
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
		self::$_txn_status = EEM_Transaction::instance()->status_array(TRUE);
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
	 * 		get list of payment statuses
	*		@access private
	*		@return void
	*/
	private function _get_payment_status_array() {
		self::$_pay_status = EEM_Payment::instance()->status_array(TRUE);
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
		add_filter('FHEE_load_accounting_js', '__return_true');

		//scripts
		wp_register_script('espresso_txn', TXN_ASSETS_URL . 'espresso_transactions_admin.js', array('ee_admin_js', 'ee-datepicker', 'jquery-ui-datepicker', 'jquery-ui-draggable', 'ee-dialog', 'ee-accounting', 'ee-serialize-full-array'), EVENT_ESPRESSO_VERSION, TRUE);
		wp_enqueue_script('espresso_txn');

		;
		EE_Registry::$i18n_js_strings['invalid_server_response'] = __( 'An error occurred! Your request may have been processed, but a valid response from the server was not received. Please refresh the page and try again.', 'event_espresso' );
		EE_Registry::$i18n_js_strings['error_occurred'] = __(  'An error occurred! Please refresh the page and try again.', 'event_espresso' );
		EE_Registry::$i18n_js_strings['txn_status_array'] = self::$_txn_status;
		EE_Registry::$i18n_js_strings['pay_status_array'] = self::$_pay_status;

		wp_localize_script( 'espresso_txn', 'eei18n', EE_Registry::$i18n_js_strings );

	}




	public function load_scripts_styles_view_transaction() {
		//styles
		wp_enqueue_style('espresso-ui-theme');
	}





	public function load_scripts_styles_default() {
		//styles
		wp_enqueue_style('espresso-ui-theme');
	}





	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('View All Transactions', 'event_espresso'),
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

	    $TXN = EEM_Transaction::instance();

	    $TXN_ID = ( ! empty( $this->_req_data['TXN_ID'] )) ? absint( $this->_req_data['TXN_ID'] ) : FALSE;

	    //get transaction object
	    $this->_transaction = $TXN->get_one_by_ID($TXN_ID);
	    $this->_session = !empty( $this->_transaction ) ? $this->_transaction->get('TXN_session_data') : NULL;

	 	if ( empty( $this->_transaction ) ) {
	    	$error_msg = __('An error occurred and the details for Transaction ID #', 'event_espresso') . $TXN_ID .  __(' could not be retrieved.', 'event_espresso');
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
	    }
	}






	protected function _transaction_legend_items() {
		$items = array(
			'view_details' => array(
				'class' => 'dashicons dashicons-cart',
				'desc' => __('View Transaction Details', 'event_espresso')
				),
			'download_invoice' => array(
				'class' => 'ee-icon ee-icon-PDF-file-type',
				'desc' => __('Download Transaction Invoice as a PDF', 'event_espresso')
				),
			'view_registration' => array(
				'class' => 'dashicons dashicons-clipboard',
				'desc' => __('View Registration Details', 'event_espresso')
				)
		);

		EE_Registry::instance()->load_helper( 'MSG_Template' );
		if ( EEH_MSG_Template::is_mt_active( 'payment_reminder' ) ) {
			$items['send_payment_reminder'] = array(
				'class' => 'dashicons dashicons-email-alt',
				'desc' => __('Send Payment Reminder', 'event_espresso')
				);
		} else {
			$items['blank*'] = array(
				'class'=> '',
				'desc' => ''
				);
		}

		$more_items = array(
			'blank' => array(
			 	'class' => '',
			 	'desc' => ''
			 	),
			 'overpaid' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EEM_Transaction::overpaid_status_code,
				'desc' => EEH_Template::pretty_status( EEM_Transaction::overpaid_status_code, FALSE, 'sentence' )
				),
			 'complete' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EEM_Transaction::complete_status_code,
				'desc' => EEH_Template::pretty_status( EEM_Transaction::complete_status_code, FALSE, 'sentence' )
				),
			 'incomplete' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EEM_Transaction::incomplete_status_code,
				'desc' => EEH_Template::pretty_status( EEM_Transaction::incomplete_status_code, FALSE, 'sentence' )
				),
			 'failed' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EEM_Transaction::failed_status_code,
				'desc' => EEH_Template::pretty_status( EEM_Transaction::failed_status_code, FALSE, 'sentence' )
				),
		);

		return array_merge( $items, $more_items);
	}



	protected function _transactions_overview_list_table() {
		$this->_admin_page_title = __('Transactions', 'event_espresso');
		$event = isset($this->_req_data['EVT_ID']) ? EEM_Event::instance()->get_one_by_ID($this->_req_data['EVT_ID'] ) : NULL;
		$this->_template_args['admin_page_header'] = $event instanceof EE_Event ? sprintf( __('%sViewing Transactions for the Event: %s%s', 'event_espresso'), '<h3>', '<a href="' . EE_Admin_Page::add_query_args_and_nonce(array('action' => 'edit', 'post' => $event->ID()), EVENTS_ADMIN_URL ) . '" title="' . __('Click to Edit event', 'event_espresso') . '">' . $event->get('EVT_name') . '</a>', '</h3>' ) : '';
		$this->_template_args['after_list_table'] = $this->_display_legend( $this->_transaction_legend_items() );
		$this->display_admin_list_table_page_with_no_sidebar();
	}









	/**
	 * 		generates HTML for the View Transaction Details Admin page
	*		@access protected
	*		@return void
	*/
	protected function _transaction_details() {

		$this->_get_transaction_status_array();

		$this->_template_args = array();
		$this->_template_args['transactions_page'] = $this->wp_page_slug;

	    $this->_set_transaction_object();

		$this->_template_args['txn_nmbr']['value'] = $this->_transaction->ID();
		$this->_template_args['txn_nmbr']['label'] = __( 'Transaction Number', 'event_espresso' );

		$this->_template_args['txn_datetime']['value'] = $this->_transaction->get_datetime('TXN_timestamp', 'l F j, Y', 'g:i:s a' );
		$this->_template_args['txn_datetime']['label'] = __( 'Date', 'event_espresso' );

		$this->_template_args['txn_status']['value'] = self::$_txn_status[ $this->_transaction->get('STS_ID') ];
		$this->_template_args['txn_status']['label'] = __( 'Transaction Status', 'event_espresso' );
		$this->_template_args['txn_status']['class'] = 'status-' . $this->_transaction->get('STS_ID');

		$this->_template_args['grand_total'] = $this->_transaction->get('TXN_total');
		$this->_template_args['total_paid'] = $this->_transaction->get('TXN_paid');

		EE_Registry::instance()->load_helper( 'MSG_Template' );

		$this->_template_args['send_payment_reminder_button'] = EEH_MSG_Template::is_mt_active( 'payment_reminder' )
			 && $this->_transaction->get('STS_ID') != EEM_Transaction::complete_status_code
			 && $this->_transaction->get('STS_ID') != EEM_Transaction::overpaid_status_code
			 ? EEH_Template::get_button_or_link( EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'send_payment_reminder', 'TXN_ID'=>$this->_transaction->ID(), 'redirect_to' => 'view_transaction' ), TXN_ADMIN_URL ), __(' Send Payment Reminder'), 'button secondary-button right',  'dashicons dashicons-email-alt' )
			 : '';

		$amount_due = $this->_transaction->get('TXN_total') - $this->_transaction->get('TXN_paid');
		$this->_template_args['amount_due'] =  ' <span id="txn-admin-total-amount-due">' . EEH_Template::format_currency( $amount_due, TRUE ) . '</span>';
		if ( EE_Registry::instance()->CFG->currency->sign_b4 ) {
			$this->_template_args['amount_due'] = EE_Registry::instance()->CFG->currency->sign . $this->_template_args['amount_due'];
		} else {
			$this->_template_args['amount_due'] = $this->_template_args['amount_due'] . EE_Registry::instance()->CFG->currency->sign;
		}
		$this->_template_args['amount_due_class'] =  '';

		if ( $this->_transaction->get('TXN_paid') == $this->_transaction->get('TXN_total') ) {
			// paid in full
			$this->_template_args['amount_due'] =  FALSE;
		} elseif ( $this->_transaction->get('TXN_paid') > $this->_transaction->get('TXN_total') ) {
			// overpaid
			$this->_template_args['amount_due_class'] =  'txn-overview-no-payment-spn';
		} elseif (( $this->_transaction->get('TXN_total') > 0 ) && ( $this->_transaction->get('TXN_paid') > 0 )) {
			// monies owing
			$this->_template_args['amount_due_class'] =  'txn-overview-part-payment-spn';
		} elseif (( $this->_transaction->get('TXN_total') > 0 ) && ( $this->_transaction->get('TXN_paid') == 0 )) {
			// no payments made yet
			$this->_template_args['amount_due_class'] =  'txn-overview-no-payment-spn';
		} elseif ( $this->_transaction->get('TXN_total') == 0 ) {
			// free event
			$this->_template_args['amount_due'] =  FALSE;
		}

		$gateway = $this->_transaction->get_extra_meta('gateway', true, FALSE);

		$this->_template_args['method_of_payment'] = $gateway;
		$this->_template_args['currency_sign'] = EE_Registry::instance()->CFG->currency->sign;
		// link back to overview
		$this->_template_args['txn_overview_url'] = ! empty ( $_SERVER['HTTP_REFERER'] ) ? $_SERVER['HTTP_REFERER'] : TXN_ADMIN_URL;


		// grab messages at the last second
		$this->_template_args['notices'] = EE_Error::get_notices();
		// path to template
		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_header.template.php';
		$this->_template_args['admin_page_header'] = EEH_Template::display_template( $template_path, $this->_template_args, TRUE );

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
			array( 'TXN_ID' => $this->_transaction->ID() )
		);
		add_meta_box( 'edit-txn-registrant-mbox', __( 'Primary Contact', 'event_espresso' ), array( $this, '_txn_registrant_side_meta_box' ), $this->wp_page_slug, 'side', 'high' );
		add_meta_box( 'edit-txn-billing-info-mbox', __( 'Billing Information', 'event_espresso' ), array( $this, '_txn_billing_info_side_meta_box' ), $this->wp_page_slug, 'side', 'high' );

	}


	/**
	 * 		generates HTML for the Transaction main meta box
	*		@access private
	*		@return void
	*/
	function _txn_details_meta_box() {

		global $wpdb;
		$this->_set_transaction_object();

		//get line items from transaction
		$this->_template_args['line_items'] = $this->_transaction->get_many_related('Line_Item', array(array('LIN_type' => 'line-item' ) ) );

		$this->_template_args['REG_code'] = $this->_transaction->get_first_related('Registration')->get('REG_code');


		// process taxes
		if ( $taxes = $this->_transaction->get_many_related('Line_Item', array( array('LIN_type' => EEM_Line_Item::type_tax) ) ) ) {
			$this->_template_args['taxes'] = $taxes;
		} else {
			$this->_template_args['taxes'] = FALSE;
		}

		$this->_template_args['grand_total'] = EEH_Template::format_currency($this->_transaction->get('TXN_total'), FALSE, FALSE );
		$this->_template_args['grand_raw_total'] = $this->_transaction->get('TXN_total');
		$this->_template_args['TXN_status'] = $this->_transaction->get('STS_ID');

		$txn_status_class = 'status-' . $this->_transaction->get('STS_ID');

		// process payment details
		if ( ! $this->_template_args['payments'] = $this->_transaction->get_many_related('Payment') ) {
			$this->_template_args['payments'] = FALSE;
		}

		$this->_template_args['edit_payment_url'] = add_query_arg( array( 'action' => 'edit_payment'  ), TXN_ADMIN_URL );
		$this->_template_args['delete_payment_url'] = add_query_arg( array( 'action' => 'espresso_delete_payment' ), TXN_ADMIN_URL );

		if ( isset( $txn_details['invoice_number'] )) {
			$this->_template_args['txn_details']['invoice_number']['value'] = $this->_template_args['REG_code'];
			$this->_template_args['txn_details']['invoice_number']['label'] = __( 'Invoice Number', 'event_espresso' );
			$this->_template_args['txn_details']['invoice_number']['class'] = 'regular-text';
		}

		$this->_template_args['txn_details']['registration_session']['value'] = $this->_transaction->get_first_related('Registration')->get('REG_session');
		$this->_template_args['txn_details']['registration_session']['label'] = __( 'Registration Session', 'event_espresso' );
		$this->_template_args['txn_details']['registration_session']['class'] = 'regular-text';

		$this->_template_args['txn_details']['ip_address']['value'] = isset( $this->_session['ip_address'] ) ? $this->_session['ip_address'] : '';
		$this->_template_args['txn_details']['ip_address']['label'] = __( 'Transaction placed from IP', 'event_espresso' );
		$this->_template_args['txn_details']['ip_address']['class'] = 'regular-text';

		$this->_template_args['txn_details']['user_agent']['value'] = isset( $this->_session['user_agent'] ) ? $this->_session['user_agent'] : '';
		$this->_template_args['txn_details']['user_agent']['label'] = __( 'Registrant User Agent', 'event_espresso' );
		$this->_template_args['txn_details']['user_agent']['class'] = 'large-text';


		$this->_get_payment_methods();
		$this->_get_active_gateways();
		$this->_get_payment_status_array();
		$this->_get_reg_status_selection(); //setsup the template args for the reg status array for the transaction.

		$this->_template_args['transaction_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'transaction'  ), TXN_ADMIN_URL );
		$this->_template_args['apply_payment_form_url'] = add_query_arg( array( 'page' => 'espresso_transactions', 'action' => 'espresso_apply_payment' ), WP_AJAX_URL );
		$this->_template_args['delete_payment_form_url'] = add_query_arg( array( 'page' => 'espresso_transactions', 'action' => 'espresso_delete_payment' ), WP_AJAX_URL );

		// 'espresso_delete_payment_nonce'

		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_main_meta_box_txn_details.template.php';
		echo EEH_Template::display_template( $template_path, $this->_template_args, TRUE );

	}





	/**
	 * This method merely sets up the reg_status_selection section of the apply_payment/refund/edit dialog (along with any requests for doing notifications)
	 *
	 * @todo this will need to be adjusted either once MER comes along OR we move default reg status to tickets instead of events.
	 * @return string html
	 */
	protected function _get_reg_status_selection() {
		//first get all possible statuses
		$statuses = EEM_Registration::reg_status_array(array(), TRUE);

		//let's add a "don't change" option.
		$status_array['NAN'] = __('Leave the Same', 'event_espresso');
		$status_array = array_merge( $status_array, $statuses );

		$this->_template_args['status_change_select'] = EEH_Form_Fields::select_input( 'txn_reg_status_change[reg_status]', $status_array, 'NAN', '', 'txn-reg-status-change-reg-status' );
		$this->_template_args['delete_status_change_select'] = EEH_Form_Fields::select_input( 'delete_txn_reg_status_change[reg_status]', $status_array, 'NAN', '', 'delete-txn-reg-status-change-reg-status' );

	}




	/**
	 * 		_get_active_gateways
	*		@access private
	*		@return void
	*/
	private function _get_active_gateways() {
		global $espresso_wp_user;
		$this->_template_args['active_gateways'] = array();
		$payment_options = EE_Registry::instance()->CFG->gateway->payment_settings;//get_user_meta($espresso_wp_user, 'payment_settings', true);
		//echo printr( $payment_options, '$payment_options' );
		if ( $gateways = EE_Registry::instance()->CFG->gateway->active_gateways){//get_user_meta($espresso_wp_user, 'active_gateways', true)) {
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
			'DB'=>  __("Debit Card", 'event_espresso'),
			'CHQ' => __( 'Cheque', 'event_espresso' ),
			'CSH' => __( 'Cash', 'event_espresso' ),
			'BK'=>  __("Bank", 'event_espresso'),
			'IV'=>  __("Invoice", 'event_espresso'),
			'MO'=>  __("Money Order", 'event_espresso'),
		);
	}






	/**
	 * 		generates HTML for the Attendees Transaction main meta box
	*		@access private
	*		@return void
	*/
	function _txn_attendees_meta_box(  $post, $metabox = array( 'args' => array()) ) {

		global $wpdb;

		extract( $metabox['args'] );


		// process items in cart
		$line_items = $this->_transaction->get_many_related('Line_Item', array( array( 'LIN_type' => 'line-item' ) ) );
		$this->_template_args['event_attendees'] = array();

		if ( ! empty( $line_items )) {
			foreach ( $line_items as $item ) {
				$ticket = $item->ticket();
				if ( empty( $ticket ) )
					continue; //right now we're only handling tickets here.  Cause its expected that only tickets will have attendees right?
				$registrations = $ticket->get_many_related('Registration', array( array('TXN_ID' => $this->_transaction->ID() )));
				$event = $ticket->get_first_related('Registration')->get_first_related('Event');

				foreach( $registrations as $registration ) {
					$attendee = $registration->get_first_related('Attendee');
					$this->_template_args['event_attendees'][$registration->ID()]['att_num'] = $registration->get('REG_count');
					$this->_template_args['event_attendees'][$registration->ID()]['event_ticket_name'] = $event->get('EVT_name') . ' - ' . $item->get('LIN_name');
					$this->_template_args['event_attendees'][$registration->ID()]['attendee'] = $attendee->full_name();
					$this->_template_args['event_attendees'][$registration->ID()]['ticket_price'] = EEH_Template::format_currency($item->get('LIN_unit_price'));
					$this->_template_args['event_attendees'][$registration->ID()]['email'] = $attendee->email();
					$this->_template_args['event_attendees'][$registration->ID()]['address'] =  implode(',<br>', $attendee->full_address_as_array() );
					$this->_template_args['event_attendees'][$registration->ID()]['att_id'] = $attendee->ID();
				}
		}
		$this->_template_args['transaction_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'attendees'  ), TXN_ADMIN_URL );

		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_main_meta_box_attendees.template.php';
		echo EEH_Template::display_template( $template_path, $this->_template_args, TRUE );
		}
	}






	/**
	 * 		generates HTML for the Edit Transaction side meta box
	*		@access private
	*		@return void
	*/
	function _txn_registrant_side_meta_box() {

		$primary_att = $this->_transaction->primary_registration()->get_first_related('Attendee');

		if ( empty( $primary_att ) )
			throw new EE_Error(__("For some reason, the primary attendee cannot be retrieved for this transaction.  It is possible there is an error in the database", 'event_espresso') );

		$this->_template_args['ATT_ID'] = $primary_att->get('ATT_ID');
		$this->_template_args['prime_reg_fname'] = $primary_att->get('ATT_fname');
		$this->_template_args['prime_reg_lname'] = $primary_att->get('ATT_lname');
		$this->_template_args['prime_reg_email'] = $primary_att->get('ATT_email');
		$this->_template_args['prime_reg_address'] = $primary_att->get('ATT_address');
		$this->_template_args['prime_reg_address2'] = $primary_att->get('ATT_address2');
		$this->_template_args['prime_reg_city'] = $primary_att->get('ATT_city');
		$state = $primary_att->state_obj();
		$this->_template_args['prime_reg_state'] = !empty( $state ) ? $state->get('STA_name' ) : '';
		$this->_template_args['prime_reg_country'] = $primary_att->get('CNT_ISO');
		$this->_template_args['prime_reg_zip'] = $primary_att->get('ATT_zip');
		$this->_template_args['prime_reg_phone'] = $primary_att->get('ATT_phone');

		$this->_template_args['registrant_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'registrant'  ), TXN_ADMIN_URL );

		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_side_meta_box_registrant.template.php';
		echo EEH_Template::display_template( $template_path, $this->_template_args, TRUE );
	}





	/**
	 * 		generates HTML for the Edit Transaction side meta box
	*		@access private
	*		@return void
	*/
	function _txn_billing_info_side_meta_box() {

		$this->_template_args['billing_info'] = $this->_transaction->billing_info();

		$this->_template_args['billing_form_url'] = add_query_arg( array( 'action' => 'edit_transaction', 'process' => 'billing'  ), TXN_ADMIN_URL );

		$template_path = TXN_TEMPLATE_PATH . 'txn_admin_details_side_meta_box_billing_info.template.php';
		echo EEH_Template::display_template( $template_path, $this->_template_args, TRUE );/**/
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
					$payment['gateway'] = 'Credit_Card';
					break;

				case 'CHQ' :
					$payment['gateway'] = 'Cheque';
					break;

				case 'CSH' :
					$payment['gateway'] = 'Cash';
					$payment['txn_id_chq_nmbr'] = '';
					break;
				case 'DB' :
					$payment['gateway'] = 'Debit';
					$payment['gateway_response'] = '';
					break;
				case 'BK' :
					$payment['gateway'] = 'Bank';
					break;
				case 'IV' :
					$payment['gateway'] = 'Invoice';
					break;
				case 'MO' :
					$payment['gateway'] = 'Money_Order';
			}
			$payment['gateway_response'] = '';
			//savea  the new payment
			$payment = EE_Payment::new_instance(
				array(
					'TXN_ID' => $payment['TXN_ID'],
					'STS_ID' => $payment['status'],
					'PAY_timestamp' => $payment['date'],
					'PAY_method' => $payment['method'],
					'PAY_amount' => $amount,
					'PAY_gateway' => $payment['gateway'],
					'PAY_gateway_response' => $payment['gateway_response'],
					'PAY_txn_id_chq_nmbr' => $payment['txn_id_chq_nmbr'],
					'PAY_po_number' => $payment['po_number'],
					'PAY_extra_accntng' => $payment['accounting'],
					'PAY_via_admin' => true,
					'PAY_details' => $payment,
					'PAY_ID' => $payment['PAY_ID']
				)
			);
			if( ! $payment->save() ){
				$msg = __( 'An error occurred. The payment has not been processed succesfully.', 'event_espresso' );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
			//update the transaction with this payment
			if( $payment->apply_payment_to_transaction() ){
				$msg =__('The payment has been processed succesfully.', 'event_espresso');
				EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}else{
				$msg = __( 'An error occurred. The payment was processed succesfully but the amount paid for the transaction was not updated.', 'event_espresso');
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}

			//prepare to render page
			$transaction = $payment->transaction();
			$this->_get_payment_status_array();
			$return_data['amount'] = $payment->amount();
			$return_data['total_paid'] = $transaction->paid();
			$return_data['txn_status'] = $transaction->status_ID();
			$return_data['pay_status'] = $payment->STS_ID();
			$return_data['PAY_ID'] = $payment->ID();
			$return_data['STS_ID'] = $payment->STS_ID();
			$return_data['status'] = self::$_pay_status[ $payment->STS_ID() ];
			$return_data['date'] = $payment->timestamp( 'Y-m-d', 'h:i a' );
			$return_data['method'] = strtoupper( $payment->method() ) ;
			$this->_get_active_gateways();
			$return_data['gateway'] = isset( $this->_template_args['active_gateways'][ $payment->gateway() ] ) ? $this->_template_args['active_gateways'][ $payment->gateway() ] : $payment->gateway();
			$return_data['gateway_response'] = $payment->gateway_response();
			$return_data['txn_id_chq_nmbr'] = $payment->txn_id_chq_nmbr();
			$return_data['po_number'] = $payment->po_number();
			$return_data['extra_accntng'] = $payment->extra_accntng();

			$this->_process_payment_notification( $payment );

			if ( isset($this->_req_data['txn_reg_status_change'] ) )
				$this->_process_registration_status_change( $transaction );



		} else {
			$msg = __( 'An error occurred. The payment form data could not be loaded.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}

		$notices = EE_Error::get_notices( FALSE, FALSE, FALSE );

		echo json_encode( array( 'return_data' => $return_data, 'success' => $notices['success'], 'errors' => $notices['errors'] ));
		die();

	}





	/**
	 * This processes requested registration status changes for all the registrations on a given transaction and (optionally) sends out notifications for the changes.
	 * @param  EE_Transaction $transaction transaction object
	 * @return void
	 */
	protected function _process_registration_status_change( $transaction ) {
		//first if there is no change in status then we get out.
		if ( !isset( $this->_req_data['txn_reg_status_change'] ) )
			return false; //no error message, just nothing to do man.

		if ( $this->_req_data['txn_reg_status_change']['reg_status'] == 'NAN' )
			return;  //no error message, no change requested.

		//made it here dude?  Oh WOW.  K, let's take care of changing the statuses then //note notifications will only get sent if the email notification is toggled.
		$transaction->finalize(true, FALSE);
	}






	/**
	 * 		delete a payment or refund made towards a transaction
	*		@access public
	*		@return void
	*/
	public function delete_payment() {

		$return_data = array();

		if ( isset( $this->_req_data['delete_txn_admin_payment'] )) {
			$pymt = $this->_req_data['delete_txn_admin_payment'];
			if ( $payment = EEM_Payment::instance()->get_one_by_ID( $pymt['PAY_ID'] )) {
				if ( $transaction = EEM_Payment::instance()->delete_by_ID( $payment->ID() )) {
					$return_data = array(
						'amount' => $payment->amount(),
						'total_paid' => $transaction->paid(),
						'txn_status' => $transaction->status_ID(),
						'pay_status' => $payment->STS_ID(),
						'PAY_ID' => $pymt['PAY_ID'],
						'delete_txn_reg_status_change' => $this->_req_data['delete_txn_reg_status_change']
					);
				}
			}
			if( isset( $this->_req_data['delete_txn_reg_status_change'] ) ) {
				$this->_req_data['txn_reg_status_change'] = $this->_req_data['delete_txn_reg_status_change'];
				$_REQUEST['txn_reg_status_change'] = $this->_req_data['delete_txn_reg_status_change'];
				$this->_process_registration_status_change( $transaction );
			}
		} else {
			$msg = __( 'An error occurred. The payment form data could not be loaded.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			$return_data = FALSE;
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
	    $TXN_ID = ( ! empty( $this->_req_data['TXN_ID'] )) ? absint( $this->_req_data['TXN_ID'] ) : FALSE;
		$transaction = EEM_Transaction::instance()->get_one_by_ID( $TXN_ID );
		$query_args = isset($this->_req_data['redirect_to'] ) ? array('action' => $this->_req_data['redirect_to'], 'TXN_ID' => $this->_req_data['TXN_ID'] ) : array();
		do_action( 'AHEE__Transactions_Admin_Page___send_payment_reminder__process_admin_payment_reminder', $transaction );

		$this->_redirect_after_action( FALSE, __('payment reminder', 'event_espresso'), __('sent', 'event_espresso'), $query_args, TRUE );
	}





	/**
	 * get transactions for given parameters (used by list table)
	 * @param  int  $perpage how many transactions displayed per page
	 * @param  boolean $count   return the count or objects
	 * @return mixed (int|array)           int = count || array of transaction objects
	 */
	public function get_transactions( $perpage, $count = FALSE ) {
	    $TXN = EEM_Transaction::instance();

	    $start_date = isset( $this->_req_data['txn-filter-start-date'] ) ? wp_strip_all_tags( $this->_req_data['txn-filter-start-date'] ) : date( 'D M j, Y', strtotime( '-10 year' ));
	    $end_date = isset( $this->_req_data['txn-filter-end-date'] ) ? wp_strip_all_tags( $this->_req_data['txn-filter-end-date'] ) : date( 'D M j, Y' );

	    //make sure our timestampes start and end right at the boundaries for each day
	    $start_date = date( 'Y-m-d', strtotime( $start_date ) ) . ' 00:00:00';
	    $end_date = date( 'Y-m-d', strtotime( $end_date ) ) . ' 23:59:59';


	    //convert to timestamps
	    $start_date = strtotime( $start_date );
	    $end_date = strtotime( $end_date );

	    //makes sure start date is the lowest value and vice versa
	    $start_date = min( $start_date, $end_date );
	    $end_date = max( $start_date, $end_date );

	    //set orderby
		$this->_req_data['orderby'] = ! empty($this->_req_data['orderby']) ? $this->_req_data['orderby'] : '';

		switch ( $this->_req_data['orderby'] ) {
			case 'TXN_ID':
				$orderby = 'TXN_ID';
				break;
			case 'ATT_fname':
				$orderby = 'Registration.Attendee.ATT_fname';
				break;
			case 'event_name':
				$orderby = 'Registration.Event.EVT_name';
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

		$_where = array(
			'TXN_timestamp' => array('BETWEEN', array($start_date, $end_date) ),
			'Registration.REG_count' => 1
			);

		if ( isset( $this->_req_data['EVT_ID'] ) ) {
			$_where['Registration.EVT_ID'] = $this->_req_data['EVT_ID'];
		}

		if ( isset( $this->_req_data['s'] ) ) {
			$sstr = '%' . $this->_req_data['s'] . '%';
			$_where['OR'] = array(
				'Registration.Event.EVT_name' => array( 'LIKE', $sstr),
				'Registration.Event.EVT_desc' => array( 'LIKE', $sstr ),
				'Registration.Event.EVT_short_desc' => array( 'LIKE' , $sstr ),
				'Registration.Attendee.ATT_fname' => array( 'LIKE', $sstr ),
				'Registration.Attendee.ATT_lname' => array( 'LIKE', $sstr ),
				'Registration.Attendee.ATT_short_bio' => array( 'LIKE', $sstr ),
				'Registration.Attendee.ATT_email' => array('LIKE', $sstr ),
				'Registration.Attendee.ATT_address' => array( 'LIKE', $sstr ),
				'Registration.Attendee.ATT_address2' => array( 'LIKE', $sstr ),
				'Registration.Attendee.ATT_city' => array( 'LIKE', $sstr ),
				'Registration.REG_final_price' => array( 'LIKE', $sstr ),
				'Registration.REG_code' => array( 'LIKE', $sstr ),
				'Registration.REG_count' => array( 'LIKE' , $sstr ),
				'Registration.REG_group_size' => array( 'LIKE' , $sstr ),
				'Registration.Ticket.TKT_name' => array( 'LIKE', $sstr ),
				'Registration.Ticket.TKT_description' => array( 'LIKE', $sstr ),
				'Payment.PAY_method' => array('LIKE', $sstr),
				'Payment.PAY_gateway' => array('LIKE', $sstr),
				'TXN_session_data' => array( 'LIKE', $sstr )
				);
		}

		$query_params = array( $_where, 'order_by' => array( $orderby => $sort ), 'limit' => $limit );

		$transactions = $count ? $TXN->count( array($_where), 'TXN_ID', TRUE ) : $TXN->get_all($query_params);


		return $transactions;

	}



}



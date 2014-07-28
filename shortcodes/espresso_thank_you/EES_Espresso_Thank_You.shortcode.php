<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Event Espresso
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EES_Espresso_Thank_You
 *
 * @package		 	Event Espresso
 * @subpackage 	/shortcodes/
 * @author 				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EES_Espresso_Thank_You  extends EES_Shortcode {

	/**
	 * time in seconds to wait for the IPN to arrive before telling the registrant to bugger off ( 1200s = 20 minutes )
	 */
	const IPN_wait_time = 1200;

	/**
	 * The transaction specified by the reg_url_link passed from the Request, or from the Session
	 * @var EE_Transaction $_current_txn
	 */
	private $_current_txn = NULL;

	/**
	 * @var EE_Registration $_primary_registrant
	 */
	private $_primary_registrant = NULL;

	/**
	 * The reg_url_link passed from the Request, or from the Session
	 * @var string $_reg_url_link
	 */
	private $_reg_url_link = NULL;

	/**
	 * whether the incoming reg_url_link is for the primary registrant or not
	 * @var boolean $_is_primary
	 */
	private $_is_primary = NULL;

	/**
	 * The URL for revisiting the SPCO attendee information step
	 * @var string $_SPCO_attendee_information_url
	 */
	private $_SPCO_attendee_information_url = NULL;

	/**
	 * The URL for revisiting the SPCO payment options step
	 * @var string $_SPCO_payment_options_url
	 */
	private $_SPCO_payment_options_url = NULL;

	/**
	 * whether to display the Payment Options link
	 * @var boolean $_show_try_pay_again_link
	 */
	private $_show_try_pay_again_link = FALSE;

	/**
	 * whether the selected payment method is Bank, Check , Invoice, etc
	 * @var boolean $_is_offline_payment_method
	 */
	private $_is_offline_payment_method = FALSE;




	/**
	 * 	set_hooks - for hooking into EE Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		add_action( 'wp_loaded', array( 'EES_Espresso_Thank_You', 'set_definitions' ), 2 );
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		// AJAX for IPN monitoring
		add_filter( 'heartbeat_received', array( 'EES_Espresso_Thank_You', 'thank_you_page_IPN_monitor' ), 10, 3 );
		add_filter( 'heartbeat_nopriv_received', array( 'EES_Espresso_Thank_You', 'thank_you_page_IPN_monitor' ), 10, 3 );
		add_action( 'wp_ajax_espresso_resend_reg_confirmation_email', array( 'EES_Espresso_Thank_You', 'resend_reg_confirmation_email' ), 10, 2 );
		add_action( 'wp_ajax_nopriv_espresso_resend_reg_confirmation_email', array( 'EES_Espresso_Thank_You', 'resend_reg_confirmation_email' ), 10, 2 );
	}



	/**
	 * 	set_definitions
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_definitions() {
		define( 'THANK_YOU_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'THANK_YOU_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
	}



	/**
	 * 	get_txn
	 *
	 *  @access 	public
	 *  @return 	mixed EE_Transaction || FALSE
	 */
	public function get_txn() {
		return $this->_current_txn instanceof EE_Transaction ? $this->_current_txn : FALSE;
	}



	/**
	 *    get_txn_payments
	 *
	 * @access    public
	 * @param int $since
	 * @return    mixed array of EE_Payment || FALSE
	 */
	public function get_txn_payments( $since = 0 ) {
		if ( ! $this->get_txn() ) {
			return FALSE;
		}
		$args = array( 'order_by' => array( 'PAY_timestamp' => 'ASC' ));
		if ( $since > 0 ) {
			$args[0] = array( 'PAY_timestamp' => array( '>', $since ));
		}
		// get array of payments with most recent first
		$payments = $this->_current_txn->payments( $args );
//		global $wpdb;
//		echo $wpdb->last_query;
//		printr( $payments, '$payments  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		return $payments;
	}



	/**
	 * 	set_reg_url_link
	 *
	 *  @access 	public
	 *  @param  	string $reg_url_link
	 *  @return 	string
	 */
	public function set_reg_url_link( $reg_url_link= NULL ) {
		$this->_reg_url_link = ! empty( $reg_url_link ) ? $reg_url_link : $this->_reg_url_link;
	}



	/**
	 * 	run - initial shortcode module setup called during "wp_loaded" hook
	 * 	this method is primarily used for loading resources that will be required by the shortcode when it is actually processed
	 *
	 *  @access 	public
	 *  @param  	WP $WP
	 *  @return 	void
	 */
	public function run( WP $WP ) {
		// ensure this shortcode doesn't trigger on anything BUT the thank you page
		if ( isset( $WP->request ) && basename( $WP->request ) != basename( EE_Registry::instance()->CFG->core->thank_you_page_url() )) {
			return;
		} else if ( isset( $WP->query_vars['page_id'] ) && $WP->query_vars['page_id'] != EE_Registry::instance()->CFG->core->thank_you_page_id ) {
			return;
		}
		// only do thank you page stuff if we have a REG_url_link in the url
		if ( ! EE_Registry::instance()->REQ->is_set( 'e_reg_url_link' )) {
			EE_Error::add_error(
				__( 'No transaction information could be retrieved because the registration URL link is missing or invalid.', 'event_espresso' ),
				__FILE__, __FUNCTION__, __LINE__
			);
			return;
		}
		// check for reg_url_link
		$this->_reg_url_link = EE_Registry::instance()->REQ->get( 'e_reg_url_link' );
		// and retrieve the current TXN
		$this->_current_txn = EE_Registry::instance()->load_model( 'Transaction' )->get_transaction_from_reg_url_link();
		// verify TXN
		if ( ! $this->_current_txn instanceof EE_Transaction ) {
			EE_Error::add_error(
				__( 'No transaction information could be retrieved or the transaction data is not of the correct type.', 'event_espresso' ),
				__FILE__, __FUNCTION__, __LINE__
			);
			return;
		}
		if ( EE_Registry::instance()->REQ->is_set( 'resend' )) {
			return EES_Espresso_Thank_You::resend_reg_confirmation_email();
		}
		// soon to be derprecated
		EE_Registry::instance()->load_model( 'Gateways' )->thank_you_page_logic( $this->_current_txn );
		EE_Registry::instance()->LIB->EEM_Gateways->reset_session_data();
		// load assets
		add_action( 'wp_enqueue_scripts', array( $this, 'load_js' ), 10 );
		add_action( 'shutdown', array( EE_Session::instance(), 'clear_session' ));
		return;
	}


	/**
	 * 	load_js
	 *
	 * 	@access 		public
	 * 	@return 		void
	 */
	public function load_js() {
		wp_register_script( 'thank_you_page', THANK_YOU_ASSETS_URL . 'thank_you_page.js', array( 'espresso_core', 'heartbeat' ), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_script( 'thank_you_page' );
		EE_Registry::$i18n_js_strings['e_reg_url_link'] = $this->_reg_url_link;
		EE_Registry::$i18n_js_strings['initial_access'] = current_time('timestamp');
		EE_Registry::$i18n_js_strings['IPN_wait_time'] = EES_Espresso_Thank_You::IPN_wait_time;
		EE_Registry::$i18n_js_strings['TXN_complete'] = EEM_Transaction::complete_status_code;
		EE_Registry::$i18n_js_strings['TXN_incomplete'] = EEM_Transaction::incomplete_status_code;
		EE_Registry::$i18n_js_strings['checking_for_new_payments'] = __( 'checking for new payments...', 'event_espresso' );
		EE_Registry::$i18n_js_strings['loading_payment_info'] = __( 'loading payment information...', 'event_espresso' );
		EE_Registry::$i18n_js_strings['server_error'] = __('An unknown error occurred on the server while attempting to process your request. Please refresh the page and try again.', 'event_espresso');
		EE_Registry::$i18n_js_strings['slow_IPN'] = apply_filters(
			'EES_Espresso_Thank_You__load_js__slow_IPN',
			sprintf(
				__( '%sThe Payment Notification appears to be taking longer than usual to arrive. Maybe check back later or just wait for your payment and registration confirmation results to be sent to you via email. We apologize for any inconvenience this may have caused.%s', 'event_espresso' ),
				'<div id="espresso-thank-you-page-slow-IPN-dv" class="ee-attention jst-left">',
				'</div>'
			)
		);
		wp_localize_script( 'thank_you_page', 'eei18n', EE_Registry::$i18n_js_strings );
	}




	/**
	 * 	init
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function init() {
		//get the transaction. yes, we may have just loaded it, but it may have been updated, or this may be via an ajax request
		$this->_current_txn = EE_Registry::instance()->load_model( 'Transaction' )->get_transaction_from_reg_url_link( $this->_reg_url_link );
		// verify TXN
		if ( ! $this->_current_txn instanceof EE_Transaction ) {
			EE_Error::add_error(
				__( 'No transaction information could be retrieved or the transaction data is not of the correct type.', 'event_espresso' ),
				__FILE__, __FUNCTION__, __LINE__
			);
			return;
		}
		// if we've made it to the Thank You page, then let's toggle any "Failed" transactions to "Incomplete"
		if ( $this->_current_txn->status_ID() == EEM_Transaction::failed_status_code ) {
			$this->_current_txn->set_status( EEM_Transaction::incomplete_status_code );
			$this->_current_txn->save();
		}
		$this->_primary_registrant = $this->_current_txn->primary_registration() instanceof EE_Registration ? $this->_current_txn->primary_registration() : NULL;
		$this->_is_primary = $this->_primary_registrant->reg_url_link() == $this->_reg_url_link ? TRUE : FALSE;

		// txn status ?
		if( $this->_current_txn->is_completed() ){
			$this->_show_try_pay_again_link = FALSE;
		} else if ( $this->_current_txn->is_incomplete() && ( $this->_primary_registrant->is_approved() || $this->_primary_registrant->is_pending_payment() )){
			$this->_show_try_pay_again_link = TRUE;
		} else if ( $this->_primary_registrant->is_approved() || $this->_primary_registrant->is_pending_payment() ) {
			// its pending
			$this->_show_try_pay_again_link = isset( EE_Registry::instance()->CFG->registration->show_pending_payment_options ) && EE_Registry::instance()->CFG->registration->show_pending_payment_options ? TRUE : FALSE;
		} else {
			$this->_show_try_pay_again_link = FALSE;
		}
		$this->_is_offline_payment_method = in_array( $this->_current_txn->selected_gateway( TRUE ), array( 'Bank', 'Check', 'Invoice' ));
		if ( $this->_current_txn->last_payment() instanceof EE_Payment && $this->_current_txn->last_payment()->gateway() != NULL ) {
			$this->_is_offline_payment_method = in_array( $this->_current_txn->last_payment()->gateway(), array( 'Bank', 'Check', 'Invoice' ));
		}
		// link to SPCO
		$revisit_spco_url = add_query_arg(
			array( 'ee'=>'_register', 'revisit'=>TRUE, 'e_reg_url_link'=>$this->_reg_url_link ),
			EE_Registry::instance()->CFG->core->reg_page_url()
		);
		// link to SPCO payment_options
		$this->_SPCO_payment_options_url = $this->_primary_registrant instanceof EE_Registration ? $this->_primary_registrant->payment_overview_url() : add_query_arg( array('step'=>'payment_options' ), $revisit_spco_url );
		// link to SPCO attendee_information
		$this->_SPCO_attendee_information_url = $this->_primary_registrant instanceof EE_Registration ? $this->_primary_registrant->edit_attendee_information_url() : FALSE;

		EE_Registry::instance()->load_helper( 'Template' );
		EE_Registry::instance()->load_helper( 'Template_Validator' );

		do_action( 'AHEE__EES_Espresso_Thank_You__init_end', $this->_current_txn );

	}




	/**
	 * 	process_shortcode - EES_Espresso_Thank_You
	 *
	 *  @access 	public
	 *  @param	array 	$attributes
	 *  @return 	string
	 */
	public function process_shortcode( $attributes = array() ) {

		$this->init();

		if ( ! $this->_current_txn instanceof EE_Transaction ) {
			EE_Error::add_error(
				__( 'No transaction information could be retrieved or the transaction data is not of the correct type.', 'event_espresso' ),
				__FILE__, __FUNCTION__, __LINE__
			);
			return '';
		}
		// link to receipt
		$template_args['TXN_receipt_url'] = $this->_current_txn->receipt_url( 'html' );
		$template_args['transaction'] = $this->_current_txn;

 		add_action( 'AHEE__thank_you_page_overview_template__content', array( $this, 'get_registration_details' ));
 		if ( $this->_is_primary && ! $this->_current_txn->is_free() ) {
			add_action( 'AHEE__thank_you_page_overview_template__content', array( $this, 'get_ajax_content' ));
		}

		return EEH_Template::locate_template( THANK_YOU_TEMPLATES_PATH . 'thank-you-page-overview.template.php', $template_args, TRUE, TRUE );

	}



	/**
	 * 	thank_you_page_IPN_monitor
	 * 	this basically just pulls the TXN based on the reg_url_link sent from the server,
	 * 	then checks that the TXN status is not failed, and that no other errors have been generated.
	 * 	it also calculates the IPN wait time since the Thank You page was first loaded
	 *
	 *  @access 	public
	 * @param array  $response
	 * @param array  $data
	 * @param string $screen_id
	 *  @return 	array
	 */
	public static function thank_you_page_IPN_monitor( $response = array(), $data = array() ) {
		// does this heartbeat contain our data ?
		if ( isset( $data['espresso_thank_you_page'] )) {
			// check for reg_url_link in the incoming heartbeat data
			if ( ! isset( $data['espresso_thank_you_page']['e_reg_url_link'] )) {
				$response['espresso_thank_you_page'] = array (
					'errors' => ! empty( $notices['errors'] ) ? $notices['errors'] : __( 'No transaction information could be retrieved because the registration URL link is missing or invalid.', 'event_espresso' )
				);
				return $response;
			}
			// kk heartbeat has our data
			$response['espresso_thank_you_page'] = array();
			// set defs, instantiate the thank you page class, and get the ball rolling
			EES_Espresso_Thank_You::set_definitions();
			$espresso_thank_you_page = EES_Espresso_Thank_You::instance();
			$espresso_thank_you_page->set_reg_url_link( $data['espresso_thank_you_page']['e_reg_url_link'] );
			$espresso_thank_you_page->init();
			//get TXN
			$TXN = $espresso_thank_you_page->get_txn();
			// no TXN? then get out
			if ( ! $TXN instanceof EE_Transaction ) {
				$notices = EE_Error::get_notices();
				$response['espresso_thank_you_page'] = array (
					'errors' => ! empty( $notices['errors'] ) ? $notices['errors'] : __( 'No transaction information could be retrieved or the transaction data is not of the correct type.', 'event_espresso' )
				);
				return $response;
			}
			// grab transient of TXN's status
			$txn_status = isset( $data['espresso_thank_you_page']['txn_status'] ) ? $data['espresso_thank_you_page']['txn_status'] : NULL;
			// has the TXN status changed since we last checked (or empty because this is the first time running through this code)?
			if ( $txn_status !== $TXN->status_ID() ) {
				// switch between two possible basic outcomes
				switch( $TXN->status_ID()) {
					// TXN has been updated in some way
					case EEM_Transaction::overpaid_status_code:
					case EEM_Transaction::complete_status_code:
					case EEM_Transaction::incomplete_status_code:
						// send updated TXN results back to client,
						$response['espresso_thank_you_page'] = array(
							'transaction_details' => $espresso_thank_you_page->get_transaction_details(),
							'txn_status' => $TXN->status_ID()
						);
						break;
					// or we have a bad TXN, or really slow IPN, so calculate the wait time and send that back...
					case EEM_Transaction::failed_status_code:
					default:
						// keep on waiting...
						return $espresso_thank_you_page->_update_server_wait_time( $data['espresso_thank_you_page'] );
				}

			// or is the TXN still failed (never been updated) ???
			} else if ( $TXN->failed() ) {
				// keep on waiting...
				return $espresso_thank_you_page->_update_server_wait_time( $data['espresso_thank_you_page'] );
			}
			// TXN is happening so let's get the payments now
			// if we've already gotten payments then the heartbeat data will contain the timestamp of the last time we checked
			$since = isset( $data['espresso_thank_you_page']['get_payments_since'] ) ? $data['espresso_thank_you_page']['get_payments_since'] : 0;
			// then check for payments
			$payments = $espresso_thank_you_page->get_txn_payments( $since );
			// has a payment been processed ?
			if ( ! empty( $payments ) || $espresso_thank_you_page->_is_offline_payment_method ) {
				if ( $since ) {
					$response['espresso_thank_you_page'] = array(
						'new_payments' => $espresso_thank_you_page->get_new_payments( $payments ),
						'transaction_details' => $espresso_thank_you_page->get_transaction_details(),
						'txn_status' => $TXN->status_ID()
					);
				} else {
					$response['espresso_thank_you_page']['payment_details'] = $espresso_thank_you_page->get_payment_details( $payments );
				}
				// reset time to check for payments
				$response['espresso_thank_you_page']['get_payments_since'] = current_time('timestamp');
			} else {
				$response['espresso_thank_you_page']['get_payments_since'] = $since;
			}

		}
		return $response;
	}



	/**
	 * 	_update_server_wait_time
	 *
	 *  @access 	public
	 *  @param 	array $thank_you_page_data thank you page portion of the incoming JSON array from the WP heartbeat data
	 *  @return 	array
	 */
	private function _update_server_wait_time( $thank_you_page_data = array() ) {
		$response['espresso_thank_you_page'] = array (
			'still_waiting' => isset( $thank_you_page_data['initial_access'] ) ? current_time('timestamp') - $thank_you_page_data['initial_access'] : 0,
			'txn_status' => $this->_current_txn->status_ID()
		);
		return $response;
	}



	/**
	 * 	get_registration_details
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function get_registration_details() {
		//prepare variables for displaying
		$template_args = array();
		$template_args['transaction'] = $this->_current_txn;
		$template_args['reg_url_link'] = $this->_reg_url_link;
		$template_args['is_primary'] = $this->_is_primary;
		$template_args['SPCO_attendee_information_url'] = $this->_SPCO_attendee_information_url;

		$template_args['resend_reg_confirmation_url'] = add_query_arg(
			array( 'e_reg_url_link'=>$this->_reg_url_link, 'resend' => 'reg_confirmation' ),
			EE_Registry::instance()->CFG->core->thank_you_page_url()
		);
		// verify template arguments
		EEH_Template_Validator::verify_instanceof( $template_args['transaction'], '$transaction', 'EE_Transaction' );
		EEH_Template_Validator::verify_isnt_null( $template_args['SPCO_attendee_information_url'], '$SPCO_attendee_information_url');
		echo EEH_Template::locate_template( THANK_YOU_TEMPLATES_PATH . 'thank-you-page-registration-details.template.php', $template_args, TRUE, TRUE );
	}



	/**
	 * 	resend_reg_confirmation_email
	 */
	public static function resend_reg_confirmation_email() {
		EE_Registry::instance()->load_core( 'Request_Handler' );
		$reg_url_link = EE_Registry::instance()->REQ->get( 'e_reg_url_link' );
		// was a REG_ID passed ?
		if ( $reg_url_link ) {
			// get registration from reg_url_link
			$registration = EE_Registry::instance()->load_model( 'Registration' )->get_one( array( array( 'REG_url_link' => $reg_url_link )));
			if ( $registration instanceof EE_Registration ) {
				// resend email
				EE_Registry::instance()->load_lib( 'Messages_Init' )->process_resend( TRUE, array( '_REG_ID' => $registration->ID() ));
			} else {
				EE_Error::add_error(
					__( 'The Registration Confirmation email could not be sent because a valid Registration could not be retrieved from the database.', 'event_espresso' ),
					__FILE__, __FUNCTION__, __LINE__
				);
			}
		} else {
			EE_Error::add_error(
				__( 'The Registration Confirmation email could not be sent because a registration URL link is missing or invalid.', 'event_espresso' ),
				__FILE__, __FUNCTION__, __LINE__
			);
		}
		// request sent via AJAX ?
		if ( EE_FRONT_AJAX ) {
			echo json_encode( EE_Error::get_notices( FALSE ));
			die();
		// or was JS disabled ?
		} else {
			// save errors so that they get picked up on the next request
			EE_Error::get_notices( TRUE, TRUE );
			wp_safe_redirect(
				add_query_arg(
					array( 'e_reg_url_link'=> $reg_url_link ),
					EE_Registry::instance()->CFG->core->thank_you_page_url()
				)
			);
		}
	}



	/**
	 * 	get_ajax_content
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function get_ajax_content() {
?>
	<div id="espresso-thank-you-page-ajax-content-dv">
		<div id="espresso-thank-you-page-ajax-transaction-dv"></div>
		<div id="espresso-thank-you-page-ajax-payment-dv"></div>
		<div id="espresso-thank-you-page-ajax-loading-dv">
			<div id="ee-ajax-loading-dv" class="left lt-blue-text">
				<span class="dashicons dashicons-upload"></span><span id="ee-ajax-loading-msg-spn"><?php _e( 'loading transaction and payment information...', 'event_espresso' );?></span>
			</div>
			<?php if ( ! $this->_is_offline_payment_method ) : ?>
			<p id="ee-ajax-loading-pg" class="highlight-bg small-text clear">
				<?php echo apply_filters( 'EES_Espresso_Thank_You__get_ajax_content__waiting_for_IPN_msg', __( 'Some payment gateways can take 15 minutes or more to return their payment notification, so please be patient if you require payment confirmation as soon as possible. Please note that as soon as everything is finalized, we will send your full payment and registration confirmation results to you via email.', 'event_espresso' ));?><br/>
				<span class="jst-rght ee-block small-text lt-grey-text"><?php _e( 'current wait time ', 'event_espresso' );?><span id="espresso-thank-you-page-ajax-time-dv">00:00:00</span></span>
			</p>
			<?php endif; ?>
		</div>
		<div class="clear"></div>
	</div>
<?php
	}



	/**
	 * 	get_transaction_details
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function get_transaction_details() {
		//prepare variables for displaying
		$template_args = array();
		$template_args['transaction'] = $this->_current_txn;
		$template_args['reg_url_link'] = $this->_reg_url_link;
		$template_args['primary_registrant_name'] = $this->_primary_registrant->attendee()->full_name( TRUE );
		// link to SPCO payment_options
		$template_args['show_try_pay_again_link'] = $this->_show_try_pay_again_link;
		$template_args['SPCO_payment_options_url'] = $this->_SPCO_payment_options_url;
		// verify template arguments
		EEH_Template_Validator::verify_instanceof( $template_args['transaction'], '$transaction', 'EE_Transaction' );
		EEH_Template_Validator::verify_isnt_null( $template_args['show_try_pay_again_link'], '$show_try_pay_again_link' );
		EEH_Template_Validator::verify_isnt_null( $template_args['SPCO_payment_options_url'], '$SPCO_payment_options_url' );
		return EEH_Template::locate_template( THANK_YOU_TEMPLATES_PATH . 'thank-you-page-transaction-details.template.php', $template_args, TRUE, TRUE );
	}



	/**
	 * 	get_payment_row_html
	 *
	 *  @access 	public
	 *  @param 	EE_Payment	$payment
	 *  @return 	string
	 */
	public function get_payment_row_html( $payment = NULL ) {
		$html = '';
		if ( $payment instanceof EE_Payment ) {
			$payment_declined_msg = $payment->STS_ID() === EEM_Payment::status_id_declined ? '<br /><span class="small-text">' . $payment->gateway_response() . '</span>' : '';
			$html .= '
				<tr>
					<td>
						' . $payment->timestamp() . '
					</td>
					<td>
						' . str_replace( '_', ' ', $payment->gateway() ) . '
					</td>
					<td class="jst-rght">
						' . EEH_Template::format_currency( $payment->amount() ) . '
					</td>
					<td class="jst-rght" style="line-height:1;">
						' . $payment->pretty_status( TRUE ) . $payment_declined_msg . '
					</td>
				</tr>';
				do_action( 'AHEE__thank_you_page_payment_details_template__after_each_payment', $payment );
		}
		return $html;
	}



	/**
	 *    get_payment_details
	 *
	 * @access    public
	 * @param    array $payments
	 * @return    string
	 */
	public function get_payment_details( $payments = array() ) {
		//prepare variables for displaying
		$template_args = array();
		$template_args['transaction'] = $this->_current_txn;
		$template_args['reg_url_link'] = $this->_reg_url_link;
		$template_args['payments'] = array();
		foreach ( $payments as $payment ) {
			$template_args['payments'][] = $this->get_payment_row_html( $payment );
		}
		//create a hacky payment object, but dont save it
		$gateway_name = $this->_current_txn->selected_gateway();
		$payment = EE_Payment::new_instance( array(
			'TXN_ID'=>$this->_current_txn->ID(),
			'STS_ID'=>EEM_Payment::status_id_pending,
			'PAY_timestamp'=>current_time('timestamp'),
			'PAY_amount'=>$this->_current_txn->total(),
			'PAY_gateway'=>$gateway_name
		));
		$template_args['gateway_content'] = EEM_Gateways::instance()->get_payment_overview_content( $gateway_name, $payment );
		// link to SPCO payment_options
		$template_args['show_try_pay_again_link'] = $this->_show_try_pay_again_link;
		$template_args['SPCO_payment_options_url'] = $this->_SPCO_payment_options_url;
		// verify template arguments
		EEH_Template_Validator::verify_instanceof( $template_args['transaction'], '$transaction', 'EE_Transaction' );
		EEH_Template_Validator::verify_isnt_null( $template_args['payments'], '$payments' );
		EEH_Template_Validator::verify_isnt_null( $template_args['show_try_pay_again_link'], '$show_try_pay_again_link' );
		EEH_Template_Validator::verify_isnt_null( $template_args['gateway_content'], '$gateway_content');
		EEH_Template_Validator::verify_isnt_null( $template_args['SPCO_payment_options_url'], '$SPCO_payment_options_url');
		return EEH_Template::locate_template( THANK_YOU_TEMPLATES_PATH . 'thank-you-page-payment-details.template.php', $template_args, TRUE, TRUE );
	}



	/**
	 *    get_payment_details
	 *
	 * @access    public
	 * @param array $payments
	 * @return    string
	 */
	public function get_new_payments( $payments = array() ) {
		$payments_html = '';
		//prepare variables for displaying
		foreach ( $payments as $payment ) {
			$payments_html .= $this->get_payment_row_html( $payment );
		}
		return $payments_html;
	}



}
// End of file EES_Espresso_Thank_You.shortcode.php
// Location: /shortcodes/EES_Espresso_Thank_You.shortcode.php
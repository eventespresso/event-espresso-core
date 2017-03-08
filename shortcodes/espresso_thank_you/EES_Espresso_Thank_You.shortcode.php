<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 *
 * EES_Espresso_Thank_You
 *
 * @package 	Event Espresso
 * @subpackage 	/shortcodes/
 * @author 		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EES_Espresso_Thank_You extends EES_Shortcode {

	/**
	 * time in seconds to wait for the IPN to arrive before telling the registrant to bugger off ( 1200s = 20 minutes )
	 */
	const IPN_wait_time = 1200;

	/**
	 * The transaction specified by the reg_url_link passed from the Request, or from the Session
	 *
	 * @var EE_Transaction $_current_txn
	 */
	private $_current_txn;

	/**
	 * @var EE_Registration $_primary_registrant
	 */
	private $_primary_registrant;

	/**
	 * The reg_url_link passed from the Request, or from the Session
	 *
	 * @var string $_reg_url_link
	 */
	private $_reg_url_link;

	/**
	 * whether the incoming reg_url_link is for the primary registrant or not
	 *
	 * @var boolean $_is_primary
	 */
	private $_is_primary;

	/**
	 * The URL for revisiting the SPCO attendee information step
	 *
	 * @var string $_SPCO_attendee_information_url
	 */
	private $_SPCO_attendee_information_url;

	/**
	 * The URL for revisiting the SPCO payment options step
	 *
	 * @var string $_SPCO_payment_options_url
	 */
	private $_SPCO_payment_options_url;

	/**
	 * whether to display the Payment Options link
	 *
	 * @var boolean $_show_try_pay_again_link
	 */
	private $_show_try_pay_again_link = false;

	/**
	 * whether payments are allowed at this time
	 *
	 * @var boolean $_payments_closed
	 */
	private $_payments_closed = false;

	/**
	 * whether the selected payment method is Bank, Check , Invoice, etc
	 *
	 * @var boolean $_is_offline_payment_method
	 */
	private $_is_offline_payment_method = true;



	/**
	 *    set_hooks - for hooking into EE Core, modules, etc
	 *
	 * @access    public
	 * @return    void
	 */
	public static function set_hooks() {
		add_action( 'wp_loaded', array( 'EES_Espresso_Thank_You', 'set_definitions' ), 2 );
	}



	/**
	 *    set_hooks_admin - for hooking into EE Admin Core, modules, etc
	 *
	 * @access    public
	 * @return    void
	 */
	public static function set_hooks_admin() {
		// AJAX for IPN monitoring
		add_filter( 'heartbeat_received', array( 'EES_Espresso_Thank_You', 'thank_you_page_IPN_monitor' ), 10, 3 );
		add_filter(
			'heartbeat_nopriv_received',
			array( 'EES_Espresso_Thank_You', 'thank_you_page_IPN_monitor' ),
			10,
			3
		);
		add_action(
			'wp_ajax_espresso_resend_reg_confirmation_email',
			array( 'EES_Espresso_Thank_You', 'resend_reg_confirmation_email' ),
			10,
			2
		);
		add_action(
			'wp_ajax_nopriv_espresso_resend_reg_confirmation_email',
			array( 'EES_Espresso_Thank_You', 'resend_reg_confirmation_email' ),
			10,
			2
		);
	}



	/**
	 *    set_definitions
	 *
	 * @access    public
	 * @return    void
	 */
	public static function set_definitions() {
		define( 'THANK_YOU_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'THANK_YOU_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ ) ) . 'templates' . DS );
	}



	/**
	 *    get_txn
	 *
	 * @access    public
	 * @return    EE_Transaction
	 */
	public function get_txn() {
		if ( $this->_current_txn instanceof EE_Transaction ) {
			return $this->_current_txn;
		}
		$TXN_model = EE_Registry::instance()->load_model( 'Transaction' );
		if ( ! $TXN_model instanceof EEM_Transaction ) {
			EE_Error::add_error(
				__( 'The transaction model could not be established.', 'event_espresso' ),
				__FILE__,
				__FUNCTION__,
				__LINE__
			);
			return null;
		}
		//get the transaction. yes, we may have just loaded it, but it may have been updated, or this may be via an ajax request
		$this->_current_txn = $TXN_model->get_transaction_from_reg_url_link( $this->_reg_url_link );
		// verify TXN
		if ( WP_DEBUG && ! $this->_current_txn instanceof EE_Transaction ) {
			EE_Error::add_error(
				__(
					'No transaction information could be retrieved or the transaction data is not of the correct type.',
					'event_espresso'
				),
				__FILE__,
				__FUNCTION__,
				__LINE__
			);
			return null;
		}
		return $this->_current_txn;
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
			return false;
		}
		$args = array( 'order_by' => array( 'PAY_timestamp' => 'ASC' ) );
		if ( $since > 0 ) {
			$args[0] = array( 'PAY_timestamp' => array( '>', $since ) );
		}
		// get array of payments with most recent first
		return $this->_current_txn->payments( $args );
	}



	/**
	 *    get_reg_url_link
	 *
	 * @access    public
	 * @return    void
	 */
	private function _get_reg_url_link() {
		if ( ! empty( $this->_reg_url_link ) ) {
			return;
		}
		// only do thank you page stuff if we have a REG_url_link in the url
		if ( WP_DEBUG && ! EE_Registry::instance()->REQ->is_set( 'e_reg_url_link' ) ) {
			EE_Error::add_error(
				__(
					'No transaction information could be retrieved because the registration URL link is missing or invalid.',
					'event_espresso'
				),
				__FILE__,
				__FUNCTION__,
				__LINE__
			);
			return;
		}
		// check for reg_url_link
		$this->_reg_url_link = EE_Registry::instance()->REQ->get( 'e_reg_url_link' );
	}



	/**
	 *    set_reg_url_link
	 *
	 * @access    public
	 * @param    string $reg_url_link
	 * @return    string
	 */
	public function set_reg_url_link( $reg_url_link = null ) {
		$this->_reg_url_link = ! empty( $reg_url_link ) ? $reg_url_link : $this->_reg_url_link;
	}



	/**
	 *    run - initial shortcode module setup called during "wp_loaded" hook
	 *    this method is primarily used for loading resources that will be required by the shortcode when it is actually processed
	 *
	 * @access    public
	 * @param    WP $WP
	 * @return    void
	 */
	public function run( WP $WP ) {
		// remove site_url() from thank you page URL
		$thank_you_page_URL = substr( EE_Registry::instance()->CFG->core->thank_you_page_url(), strlen( home_url() ) );
		// remove other non-essential details from URL
		$thank_you_page_URL = trim( parse_url( $thank_you_page_URL, PHP_URL_PATH ), '/' );
		// ensure this shortcode doesn't trigger on anything BUT the thank you page
		if ( isset( $WP->request ) && trim( $WP->request, '/' ) !== $thank_you_page_URL ) {
			return;
		} else if (
			isset( $WP->query_vars['page_id'] )
			&& (int)$WP->query_vars['page_id'] !== (int)EE_Registry::instance()->CFG->core->thank_you_page_id
		) {
			return;
		}
		$this->_get_reg_url_link();
		// resend_reg_confirmation_email ?
		if ( EE_Registry::instance()->REQ->is_set( 'resend' ) ) {
			EES_Espresso_Thank_You::resend_reg_confirmation_email();
		}
		// load assets
		add_action( 'wp_enqueue_scripts', array( $this, 'load_js' ), 10 );
		EE_Registry::instance()->SSN->clear_session( __CLASS__, __FUNCTION__ );
		$this->_translate_strings();
	}



	/**
	 *    load_js
	 *
	 * @access        public
	 * @return        void
	 */
	protected function _translate_strings() {
		EE_Registry::$i18n_js_strings['e_reg_url_link'] = $this->_reg_url_link;
		EE_Registry::$i18n_js_strings['initial_access'] = time();
		EE_Registry::$i18n_js_strings['IPN_wait_time'] = EES_Espresso_Thank_You::IPN_wait_time;
		EE_Registry::$i18n_js_strings['TXN_complete'] = EEM_Transaction::complete_status_code;
		EE_Registry::$i18n_js_strings['TXN_incomplete'] = EEM_Transaction::incomplete_status_code;
		EE_Registry::$i18n_js_strings['checking_for_new_payments'] = __(
			'checking for new payments...',
			'event_espresso'
		);
		EE_Registry::$i18n_js_strings['loading_payment_info'] = __(
			'loading payment information...',
			'event_espresso'
		);
		EE_Registry::$i18n_js_strings['server_error'] = __(
			'An unknown error occurred on the server while attempting to process your request. Please refresh the page and try again.',
			'event_espresso'
		);
		EE_Registry::$i18n_js_strings['slow_IPN'] = apply_filters(
			'EES_Espresso_Thank_You__load_js__slow_IPN',
			sprintf(
				__(
					'%sThe Payment Notification appears to be taking longer than usual to arrive. Maybe check back later or just wait for your payment and registration confirmation results to be sent to you via email. We apologize for any inconvenience this may have caused.%s',
					'event_espresso'
				),
				'<div id="espresso-thank-you-page-slow-IPN-dv" class="ee-attention jst-left">',
				'</div>'
			)
		);
	}



	/**
	 *    load_js
	 *
	 * @access        public
	 * @return        void
	 */
	public function load_js() {
		wp_register_script(
			'thank_you_page',
			THANK_YOU_ASSETS_URL . 'thank_you_page.js',
			array( 'espresso_core', 'heartbeat' ),
			EVENT_ESPRESSO_VERSION,
			true
		);
		wp_enqueue_script( 'thank_you_page' );
	}



	/**
	 *    init
	 *
	 * @access    public
	 * @return    void
	 * @throws \EE_Error
	 */
	public function init() {
		$this->_get_reg_url_link();
		if ( ! $this->get_txn() ) {
			echo EEH_HTML::div(
				EEH_HTML::h4( __( 'We\'re sorry...', 'event_espresso' ), '', '' ) .
				sprintf(
					__(
						'This is a system page for displaying transaction information after a purchase.%1$sYou are most likely seeing this notice because you have navigated to this page%1$sthrough some means other than completing a transaction.%1$sSorry for the disappointment, but you will most likely find nothing of interest here.%1$s%1$s',
						'event_espresso'
					),
					'<br/>'
				),
				'',
				'ee-attention'
			);
			return null;
		}
		// if we've made it to the Thank You page, then let's toggle any "Failed" transactions to "Incomplete"
		if ( $this->_current_txn->status_ID() === EEM_Transaction::failed_status_code ) {
			$this->_current_txn->set_status( EEM_Transaction::incomplete_status_code );
			$this->_current_txn->save();
		}
		$this->_primary_registrant = $this->_current_txn->primary_registration() instanceof EE_Registration
			? $this->_current_txn->primary_registration()
			: null;
		$this->_is_primary = $this->_primary_registrant->reg_url_link() === $this->_reg_url_link ? true : false;
		$show_try_pay_again_link_default = apply_filters(
			'AFEE__EES_Espresso_Thank_You__init__show_try_pay_again_link_default',
			true
		);
		$this->_show_try_pay_again_link = $show_try_pay_again_link_default;
		// txn status ?
		if ( $this->_current_txn->is_completed() ) {
			$this->_show_try_pay_again_link = $show_try_pay_again_link_default;
		} else if (
			$this->_current_txn->is_incomplete()
			&& ( $this->_primary_registrant->is_approved()
			|| $this->_primary_registrant->is_pending_payment() )
		) {
			$this->_show_try_pay_again_link = true;
		} else if ( $this->_primary_registrant->is_approved() || $this->_primary_registrant->is_pending_payment() ) {
			// its pending
			$this->_show_try_pay_again_link = isset(
				EE_Registry::instance()->CFG->registration->show_pending_payment_options
			)
			&& EE_Registry::instance()->CFG->registration->show_pending_payment_options
				? true
				: $show_try_pay_again_link_default;
		}
		$this->_payments_closed = ! $this->_current_txn->payment_method() instanceof EE_Payment_Method
			? true
			: false;
		$this->_is_offline_payment_method = false;
		if (
			// if payment method is unknown
			! $this->_current_txn->payment_method() instanceof EE_Payment_Method
			|| (
				// or is an offline payment method
				$this->_current_txn->payment_method() instanceof EE_Payment_Method
				&& $this->_current_txn->payment_method()->is_off_line()
			)
		) {
			$this->_is_offline_payment_method = true;
		}
		// link to SPCO
		$revisit_spco_url = add_query_arg(
			array( 'ee' => '_register', 'revisit' => true, 'e_reg_url_link' => $this->_reg_url_link ),
			EE_Registry::instance()->CFG->core->reg_page_url()
		);
		// link to SPCO payment_options
		$this->_SPCO_payment_options_url = $this->_primary_registrant instanceof EE_Registration
			? $this->_primary_registrant->payment_overview_url()
			: add_query_arg(
				array( 'step' => 'payment_options' ),
				$revisit_spco_url
			);
		// link to SPCO attendee_information
		$this->_SPCO_attendee_information_url = $this->_primary_registrant instanceof EE_Registration
			? $this->_primary_registrant->edit_attendee_information_url()
			: false;
		do_action( 'AHEE__EES_Espresso_Thank_You__init_end', $this->_current_txn );
		// set no cache headers and constants
		EE_System::do_not_cache();
	}



	/**
	 *    process_shortcode - EES_Espresso_Thank_You
	 *
	 * @access    public
	 * @param    array $attributes
	 * @return    string
	 * @throws \EE_Error
	 */
	public function process_shortcode( $attributes = array() ) {
		$this->init();
		if ( ! $this->_current_txn instanceof EE_Transaction ) {
			return EE_Error::get_notices();
		}
		//EEH_Debug_Tools::log( __CLASS__, __FUNCTION__, __LINE__, array( $this->_current_txn ), true, 	'EE_Transaction: ' . $this->_current_txn->ID() );
		// link to receipt
		$template_args['TXN_receipt_url'] = $this->_current_txn->receipt_url( 'html' );
		if ( ! empty( $template_args['TXN_receipt_url'] ) ) {
			$template_args['order_conf_desc'] = __(
				'%1$sCongratulations%2$sYour registration has been successfully processed.%3$sCheck your email for your registration confirmation or click the button below to view / download / print a full description of your purchases and registration information.',
				'event_espresso'
			);
		} else {
			$template_args['order_conf_desc'] = __(
				'%1$sCongratulations%2$sYour registration has been successfully processed.%3$sCheck your email for your registration confirmation.',
				'event_espresso'
			);
		}
		$template_args['transaction'] = $this->_current_txn;
		$template_args['revisit'] = EE_Registry::instance()->REQ->get( 'revisit', false );
		add_action( 'AHEE__thank_you_page_overview_template__content', array( $this, 'get_registration_details' ) );
		if ( $this->_is_primary && ! $this->_current_txn->is_free() ) {
			add_action( 'AHEE__thank_you_page_overview_template__content', array( $this, 'get_ajax_content' ) );
		}
		return EEH_Template::locate_template(
			THANK_YOU_TEMPLATES_PATH . 'thank-you-page-overview.template.php',
			$template_args,
			true,
			true
		);
	}



	/**
	 *    thank_you_page_IPN_monitor
	 *    this basically just pulls the TXN based on the reg_url_link sent from the server,
	 *    then checks that the TXN status is not failed, and that no other errors have been generated.
	 *    it also calculates the IPN wait time since the Thank You page was first loaded
	 *
	 * @access    public
	 * @param array $response
	 * @param array $data
	 * @return    array
	 * @throws \EE_Error
	 */
	public static function thank_you_page_IPN_monitor( $response = array(), $data = array() ) {
		// does this heartbeat contain our data ?
		if ( ! isset( $data['espresso_thank_you_page'] ) ) {
			return $response;
		}
		// check for reg_url_link in the incoming heartbeat data
		if ( ! isset( $data['espresso_thank_you_page']['e_reg_url_link'] ) ) {
			$response['espresso_thank_you_page'] = array(
			'errors' => ! empty( $notices['errors'] )
				? $notices['errors']
				: __(
					'No transaction information could be retrieved because the registration URL link is missing or invalid.',
					'event_espresso'
				)
			);
			return $response;
		}
		// kk heartbeat has our data
		$response['espresso_thank_you_page'] = array();
		// set_definitions, instantiate the thank you page class, and get the ball rolling
		EES_Espresso_Thank_You::set_definitions();
		/** @var $espresso_thank_you_page EES_Espresso_Thank_You */
		$espresso_thank_you_page = EES_Espresso_Thank_You::instance();
		$espresso_thank_you_page->set_reg_url_link( $data['espresso_thank_you_page']['e_reg_url_link'] );
		$espresso_thank_you_page->init();
		//get TXN
		$TXN = $espresso_thank_you_page->get_txn();
		// no TXN? then get out
		if ( ! $TXN instanceof EE_Transaction ) {
			$notices = EE_Error::get_notices();
			$response['espresso_thank_you_page'] = array(
			'errors' => ! empty( $notices['errors'] )
				? $notices['errors']
				: sprintf(
					__(
						'The information for your transaction could not be retrieved from the server or the transaction data received was invalid because of a technical reason. (%s)',
						'event_espresso'
					),
					__LINE__
				)
			);
			return $response;
		}
		// grab transient of TXN's status
		$txn_status = isset( $data['espresso_thank_you_page']['txn_status'] )
			? $data['espresso_thank_you_page']['txn_status']
			: null;
		// has the TXN status changed since we last checked (or empty because this is the first time running through this code)?
		if ( $txn_status !== $TXN->status_ID() ) {
			// switch between two possible basic outcomes
			switch ( $TXN->status_ID() ) {
				// TXN has been updated in some way
				case EEM_Transaction::overpaid_status_code:
				case EEM_Transaction::complete_status_code:
				case EEM_Transaction::incomplete_status_code:
					// send updated TXN results back to client,
					$response['espresso_thank_you_page'] = array(
						'transaction_details' => $espresso_thank_you_page->get_transaction_details(),
						'txn_status'          => $TXN->status_ID()
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
		$since = isset( $data['espresso_thank_you_page']['get_payments_since'] )
			? $data['espresso_thank_you_page']['get_payments_since']
			: 0;
		// then check for payments
		$payments = $espresso_thank_you_page->get_txn_payments( $since );
		// has a payment been processed ?
		if ( ! empty( $payments ) || $espresso_thank_you_page->_is_offline_payment_method ) {
			if ( $since ) {
				$response['espresso_thank_you_page'] = array(
					'new_payments'        => $espresso_thank_you_page->get_new_payments( $payments ),
					'transaction_details' => $espresso_thank_you_page->get_transaction_details(),
					'txn_status'          => $TXN->status_ID()
				);
			} else {
				$response['espresso_thank_you_page']['payment_details'] = $espresso_thank_you_page->get_payment_details(
					$payments
				);
			}
			// reset time to check for payments
			$response['espresso_thank_you_page']['get_payments_since'] = time();
		} else {
			$response['espresso_thank_you_page']['get_payments_since'] = $since;
		}
		return $response;
	}



	/**
	 *    _update_server_wait_time
	 *
	 * @access    public
	 * @param    array $thank_you_page_data thank you page portion of the incoming JSON array from the WP heartbeat data
	 * @return    array
	 */
	private function _update_server_wait_time( $thank_you_page_data = array() ) {
		$response['espresso_thank_you_page'] = array(
			'still_waiting' => isset( $thank_you_page_data['initial_access'] )
				? time() - $thank_you_page_data['initial_access']
				: 0,
			'txn_status'    => $this->_current_txn->status_ID()
		);
		return $response;
	}



	/**
	 *    get_registration_details
	 *
	 * @access    public
	 * @return    string
	 * @throws \EE_Error
	 */
	public function get_registration_details() {
		//prepare variables for displaying
		$template_args = array();
		$template_args['transaction'] = $this->_current_txn;
		$template_args['reg_url_link'] = $this->_reg_url_link;
		$template_args['is_primary'] = $this->_is_primary;
		$template_args['SPCO_attendee_information_url'] = $this->_SPCO_attendee_information_url;
		$template_args['resend_reg_confirmation_url'] = add_query_arg(
			array( 'token' => $this->_reg_url_link, 'resend_reg_confirmation' => 'true' ),
			EE_Registry::instance()->CFG->core->thank_you_page_url()
		);
		// verify template arguments
		EEH_Template_Validator::verify_instanceof( $template_args['transaction'], '$transaction', 'EE_Transaction' );
		EEH_Template_Validator::verify_isnt_null(
			$template_args['SPCO_attendee_information_url'],
			'$SPCO_attendee_information_url'
		);
		echo EEH_Template::locate_template(
			THANK_YOU_TEMPLATES_PATH . 'thank-you-page-registration-details.template.php',
			$template_args,
			true,
			true
		);
	}



	/**
	 *    resend_reg_confirmation_email
	 */
	public static function resend_reg_confirmation_email() {
		EE_Registry::instance()->load_core( 'Request_Handler' );
		$reg_url_link = EE_Registry::instance()->REQ->get( 'token' );
		// was a REG_ID passed ?
		if ( $reg_url_link ) {
			$registration = EE_Registry::instance()->load_model( 'Registration' )->get_one(
				array( array( 'REG_url_link' => $reg_url_link ) )
			);
			if ( $registration instanceof EE_Registration ) {
				// resend email
				EED_Messages::process_resend( array( '_REG_ID' => $registration->ID() ) );
			} else {
				EE_Error::add_error(
					__(
						'The Registration Confirmation email could not be sent because a valid Registration could not be retrieved from the database.',
						'event_espresso'
					),
					__FILE__,
					__FUNCTION__,
					__LINE__
				);
			}
		} else {
			EE_Error::add_error(
				__(
					'The Registration Confirmation email could not be sent because a registration token is missing or invalid.',
					'event_espresso'
				),
				__FILE__,
				__FUNCTION__,
				__LINE__
			);
		}
		// request sent via AJAX ?
		if ( EE_FRONT_AJAX ) {
			echo wp_json_encode( EE_Error::get_notices( false ) );
			die();
			// or was JS disabled ?
		} else {
			// save errors so that they get picked up on the next request
			EE_Error::get_notices( true, true );
			wp_safe_redirect(
				add_query_arg(
					array( 'e_reg_url_link' => $reg_url_link ),
					EE_Registry::instance()->CFG->core->thank_you_page_url()
				)
			);
		}
	}



	/**
	 *    get_ajax_content
	 *
	 * @access    public
	 * @return    void
	 */
	public function get_ajax_content() {
		if ( ! $this->get_txn() ) {
			return;
		}
		// first determine which event(s) require pre-approval or not
		$events = array();
		$events_requiring_pre_approval = array();
		foreach ( $this->_current_txn->registrations() as $registration ) {
			if ( $registration instanceof EE_Registration ) {
				$event = $registration->event();
				if ( $event instanceof EE_Event ) {
					if ( $registration->is_not_approved() && $registration->event() instanceof EE_Event ) {
						$events_requiring_pre_approval[ $event->ID() ] = $event;
					} else {
						$events[ $event->ID() ] = $event;
					}
				}
			}
		}
		$this->display_details_for_events_requiring_pre_approval( $events_requiring_pre_approval );
		$this->display_details_for_events( $events );
	}



	/**
	 *    display_details_for_events
	 *
	 * @access    public
	 * @param EE_Event[] $events
	 * @return string
	 */
	public function display_details_for_events( $events = array() ) {
		if ( ! empty( $events ) ) {
			?>
			<div id="espresso-thank-you-page-ajax-content-dv">
				<div id="espresso-thank-you-page-ajax-transaction-dv"></div>
				<div id="espresso-thank-you-page-ajax-payment-dv"></div>
				<div id="espresso-thank-you-page-ajax-loading-dv">
					<div id="ee-ajax-loading-dv" class="float-left lt-blue-text">
						<span class="dashicons dashicons-upload"></span><span id="ee-ajax-loading-msg-spn"><?php _e(
							'loading transaction and payment information...',
							'event_espresso'
							); ?></span>
					</div>
					<?php if ( ! $this->_is_offline_payment_method && ! $this->_payments_closed ) : ?>
						<p id="ee-ajax-loading-pg" class="highlight-bg small-text clear">
							<?php echo apply_filters(
								'EES_Espresso_Thank_You__get_ajax_content__waiting_for_IPN_msg',
								__(
									'Some payment gateways can take 15 minutes or more to return their payment notification, so please be patient if you require payment confirmation as soon as possible. Please note that as soon as everything is finalized, we will send your full payment and registration confirmation results to you via email.',
									'event_espresso'
								)
							); ?>
							<br/>
							<span class="jst-rght ee-block small-text lt-grey-text">
								<?php _e( 'current wait time ', 'event_espresso' ); ?>
							<span id="espresso-thank-you-page-ajax-time-dv">00:00:00</span></span>
						</p>
					<?php endif; ?>
				</div>
				<div class="clear"></div>
			</div>
			<?php
		}
	}



	/**
	 *    display_details_for_events_requiring_pre_approval
	 *
	 * @access    public
	 * @param EE_Event[] $events
	 * @return string
	 */
	public function display_details_for_events_requiring_pre_approval( $events = array() ) {
		if ( ! empty( $events ) ) {
			?>
			<div id="espresso-thank-you-page-not-approved-message-dv">
				<h4 class="orange-text"><?php _e( 'Important Notice:', 'event_espresso' ); ?></h4>
				<p id="events-requiring-pre-approval-pg" class="small-text">
					<?php echo apply_filters(
						'AHEE__EES_Espresso_Thank_You__get_ajax_content__not_approved_message',
						__(
							'The following Event(s) you have registered for do not require payment at this time and will not be billed for during this transaction. Billing will only occur after all attendees have been approved by the event organizer. You will be notified when your registration has been processed. If this is a free event, then no billing will occur.',
							'event_espresso'
						)
					); ?>
				</p>
				<ul class="events-requiring-pre-approval-ul">
					<?php foreach ( $events as $event ) {
						if ( $event instanceof EE_Event ) {
							echo '<li><span class="dashicons dashicons-marker ee-icon-size-16 orange-text"></span>',
								$event->name(),
								'</li>';
						}
					} ?>
				</ul>
				<div class="clear"></div>
			</div>
			<?php
		}
	}



	/**
	 *    get_transaction_details
	 *
	 * @access    public
	 * @return    string
	 * @throws \EE_Error
	 */
	public function get_transaction_details() {
		//prepare variables for displaying
		$template_args = array();
		$template_args['transaction'] = $this->_current_txn;
		$template_args['reg_url_link'] = $this->_reg_url_link;
		$template_args['primary_registrant_name'] = $this->_primary_registrant->attendee()->full_name( true );
		// link to SPCO payment_options
		$template_args['show_try_pay_again_link'] = $this->_show_try_pay_again_link;
		$template_args['SPCO_payment_options_url'] = $this->_SPCO_payment_options_url;
		// verify template arguments
		EEH_Template_Validator::verify_instanceof( $template_args['transaction'], '$transaction', 'EE_Transaction' );
		EEH_Template_Validator::verify_isnt_null(
			$template_args['show_try_pay_again_link'],
			'$show_try_pay_again_link'
		);
		EEH_Template_Validator::verify_isnt_null(
			$template_args['SPCO_payment_options_url'],
			'$SPCO_payment_options_url'
		);
		return EEH_Template::locate_template(
			THANK_YOU_TEMPLATES_PATH . 'thank-you-page-transaction-details.template.php',
			$template_args,
			true,
			true
		);
	}



	/**
	 *    get_payment_row_html
	 *
	 * @access    public
	 * @param    EE_Payment $payment
	 * @return    string
	 * @throws \EE_Error
	 */
	public function get_payment_row_html( $payment = null ) {
		$html = '';
		if ( $payment instanceof EE_Payment ) {
			if (
				$payment->payment_method() instanceof EE_Payment_Method
				&& $payment->status() === EEM_Payment::status_id_failed
				&& $payment->payment_method()->is_off_site()
			) {
				// considering the registrant has made it to the Thank You page,
				// any failed payments may actually be pending and the IPN is just slow
				// so let's
				$payment->set_status( EEM_Payment::status_id_pending );
			}
			$payment_declined_msg = $payment->STS_ID() === EEM_Payment::status_id_declined
				? '<br /><span class="small-text">' . $payment->gateway_response() . '</span>'
				: '';
			$html .= '
				<tr>
					<td>
						' . $payment->timestamp() . '
					</td>
					<td>
						' . (
								$payment->payment_method() instanceof EE_Payment_Method
									? $payment->payment_method()->name()
									: __( 'Unknown', 'event_espresso' )
							) . '
					</td>
					<td class="jst-rght">
						' . EEH_Template::format_currency( $payment->amount() ) . '
					</td>
					<td class="jst-rght" style="line-height:1;">
						' . $payment->pretty_status( true ) . $payment_declined_msg . '
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
	 * @throws \EE_Error
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
		$payment = EE_Payment::new_instance(
			array(
				'TXN_ID'        => $this->_current_txn->ID(),
				'STS_ID'        => EEM_Payment::status_id_pending,
				'PAY_timestamp' => time(),
				'PAY_amount'    => $this->_current_txn->total(),
				'PMD_ID'        => $this->_current_txn->payment_method_ID()
			)
		);
		$payment_method = $this->_current_txn->payment_method();
		if ( $payment_method instanceof EE_Payment_Method && $payment_method->type_obj() instanceof EE_PMT_Base ) {
			$template_args['gateway_content'] = $payment_method->type_obj()->payment_overview_content( $payment );
		} else {
			$template_args['gateway_content'] = '';
		}
		// link to SPCO payment_options
		$template_args['show_try_pay_again_link'] = $this->_show_try_pay_again_link;
		$template_args['SPCO_payment_options_url'] = $this->_SPCO_payment_options_url;
		// verify template arguments
		EEH_Template_Validator::verify_instanceof( $template_args['transaction'], '$transaction', 'EE_Transaction' );
		EEH_Template_Validator::verify_isnt_null( $template_args['payments'], '$payments' );
		EEH_Template_Validator::verify_isnt_null(
			$template_args['show_try_pay_again_link'],
			'$show_try_pay_again_link'
		);
		EEH_Template_Validator::verify_isnt_null( $template_args['gateway_content'], '$gateway_content' );
		EEH_Template_Validator::verify_isnt_null(
			$template_args['SPCO_payment_options_url'],
			'$SPCO_payment_options_url'
		);
		return EEH_Template::locate_template(
			THANK_YOU_TEMPLATES_PATH . 'thank-you-page-payment-details.template.php',
			$template_args,
			true,
			true
		);
	}



	/**
	 *    get_payment_details
	 *
	 * @access    public
	 * @param array $payments
	 * @return    string
	 * @throws \EE_Error
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

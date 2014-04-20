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
 * @package			Event Espresso
 * @subpackage		/shortcodes/
 * @author				Brent Christensen
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
	protected $_current_txn = NULL;

	/**
	 * @var EE_Registration $_primary_registrant
	 */
	protected $_primary_registrant = NULL;

	/**
	 * The reg_url_link passed from the Request, or from the Session
	 * @var string $_reg_url_link
	 */
	protected $_reg_url_link = NULL;

	/**
	 * whether the incoming reg_url_link is for the primary registrant or not
	 * @var boolean $_is_primary
	 */
	protected $_is_primary = NULL;

	/**
	 * The URL for revisiting the SPCO attendee information step
	 * @var string $_SPCO_attendee_information_url
	 */
	protected $_SPCO_attendee_information_url = NULL;

	/**
	 * The URL for revisiting the SPCO payment options step
	 * @var string $_SPCO_payment_options_url
	 */
	protected $_SPCO_payment_options_url = NULL;

	/**
	 * whether to display the Payment Options link
	 * @var boolean $_show_try_pay_again_link
	 */
	protected $_show_try_pay_again_link = FALSE;




	/**
	 * 	set_hooks - for hooking into EE Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		add_action( 'wp_loaded', array( 'EES_Espresso_Thank_You', 'set_definitions' ), 2 );
		add_filter( 'heartbeat_received', array( 'EES_Espresso_Thank_You', 'thank_you_page_IPN_monitor' ), 10, 3 );
		add_filter( 'heartbeat_nopriv_received', array( 'EES_Espresso_Thank_You', 'thank_you_page_IPN_monitor' ), 10, 3 );
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
	public function run( WP $WP= NULL ) {

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
		// soon to be derprecated
		EE_Registry::instance()->load_model( 'Gateways' )->thank_you_page_logic( $this->_current_txn );
		EE_Registry::instance()->LIB->EEM_Gateways->reset_session_data();
		// load assets
		add_filter( 'FHEE_load_css', '__return_true' );
		add_filter( 'FHEE_load_js', '__return_true' );
		add_action( 'wp_enqueue_scripts', array( $this, 'load_js' ), 10 );
		add_action( 'shutdown', array( EE_Session::instance(), 'clear_session' ));

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
		EE_Registry::$i18n_js_strings['reg_url_link'] = $this->_reg_url_link;
		EE_Registry::$i18n_js_strings['server_time'] = time();
		EE_Registry::$i18n_js_strings['IPN_wait_time'] = EES_Espresso_Thank_You::IPN_wait_time;
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
		if ( ! $this->_current_txn instanceof EE_Transaction ) {
			EE_Error::add_error(
				__( 'No transaction information could be retrieved or the transaction data is not of the correct type.', 'event_espresso' ),
				__FILE__, __FUNCTION__, __LINE__
			);
			return;
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
		// link to SPCO
		$revisit_spco_url = add_query_arg(
			array( 'ee'=>'_register', 'revisit'=>TRUE, 'e_reg_url_link'=>EE_Registry::instance()->REQ->get( 'e_reg_url_link' )),
			EE_Registry::instance()->CFG->core->reg_page_url
		);
		// link to SPCO payment_options
		$this->_SPCO_payment_options_url = $this->_primary_registrant instanceof EE_Registration ? $this->_primary_registrant->payment_overview_url() : add_query_arg( array('step'=>'payment_options' ), $revisit_spco_url );
		// link to SPCO attendee_information
		$this->_SPCO_attendee_information_url = $this->_primary_registrant instanceof EE_Registration ? $this->_primary_registrant->edit_attendee_information_url() : FALSE;

		EE_Registry::instance()->load_helper( 'Template' );
		EE_Registry::instance()->load_helper( 'Template_Validator' );
	}




	/**
	 * 	process_shortcode - EES_Espresso_Thank_You
	 *
	 *  @access 	public
	 *  @param	array 	$attributes
	 *  @return 	mixed string
	 */
	public function process_shortcode( $attributes = array() ) {

		$this->init();

		if ( ! $this->_current_txn instanceof EE_Transaction ) {
			EE_Error::add_error(
				__( 'No transaction information could be retrieved or the transaction data is not of the correct type.', 'event_espresso' ),
				__FILE__, __FUNCTION__, __LINE__
			);
			return;
		}
		// link to receipt
		$template_args['TXN_receipt_url'] = $this->_current_txn->receipt_url('html');


 		add_action( 'AHEE__thank_you_page_overview_template__content', array( $this, 'get_registration_details' ));
 		if ( $this->_is_primary ) {
			add_action( 'AHEE__thank_you_page_overview_template__content', array( $this, 'get_ajax_content' ));
		}

		return EEH_Template::locate_template( THANK_YOU_TEMPLATES_PATH . 'thank-you-page-overview.template.php', $template_args, TRUE, TRUE );

	}



	/**
	 *    thank_you_page_IPN_monitor
	 *    this basically just pulls the TXN based on the reg_url_link sent from the server,
	 *    then checks that the TXN status is not failed, and that no other errors have been generated.
	 *    it also calculates the IPN wait time since the Thank You page was first loaded
	 *
	 * @access    public
	 * @param $response
	 * @param $data
	 * @param $screen_id
	 * @return    array
	 */
	public static function thank_you_page_IPN_monitor( $response, $data, $screen_id ) {
		if ( isset( $data['espresso_thank_you_page'] ) && isset( $data['espresso_thank_you_page']['reg_url_link'] )) {
			if ( ! isset( $data['espresso_thank_you_page']['reg_url_link'] )) {
				$response['espresso_thank_you_page'] = array (
					'errors' => ! empty( $notices['errors'] ) ? $notices['errors'] : __( 'No transaction information could be retrieved because the registration URL link is missing or invalid.', 'event_espresso' )
				);
				return $response;
			}
			// set defs, instantiate the thank you page class, and get the ball rolling
			EES_Espresso_Thank_You::set_definitions();
			$espresso_thank_you_page = EES_Espresso_Thank_You::instance();
			$espresso_thank_you_page->set_reg_url_link( $data['espresso_thank_you_page']['reg_url_link'] );
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
			// bad TXN?
			if ( $TXN->failed() ) {
				$response['espresso_thank_you_page'] = array (
					'still_waiting' => isset( $data['espresso_thank_you_page']['server_time'] ) ? time() - $data['espresso_thank_you_page']['server_time'] : 0
				);
				return $response;
			}
			// TXN has been processed, and heartbeat has our data
			$response['espresso_thank_you_page'] = array (
				'transaction_details' => $espresso_thank_you_page->get_transaction_details(),
				'payment_details' => $espresso_thank_you_page->get_payment_details(),
			);

		}
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
		// verify template arguments
		EEH_Template_Validator::verify_instanceof( $template_args['transaction'], '$transaction', 'EE_Transaction' );
		EEH_Template_Validator::verify_isnt_null( $template_args['SPCO_attendee_information_url'], '$SPCO_attendee_information_url');
		echo EEH_Template::locate_template( THANK_YOU_TEMPLATES_PATH . 'thank-you-page-registration-details.template.php', $template_args, TRUE, TRUE );
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
			<div id="ee-ajax-loading-pg" class="left lt-blue-text">
				<span class="dashicons dashicons-upload"></span><?php _e( 'loading transaction and payment information...', 'event_espresso' );?>
			</div>
			<p class="highlight-bg small-text clear">
				<?php echo apply_filters( 'EES_Espresso_Thank_You__get_ajax_content__waiting_for_IPN_msg', __( 'Some payment gateways can take 15 minutes or more to return their payment notification, so please be patient if you require payment confirmation as soon as possible. Please note that as soon as everything is finalized, we will send your full payment and registration confirmation results to you via email.', 'event_espresso' ));?><br/>
				<span class="jst-rght ee-block small-text lt-grey-text"><?php _e( 'current wait time ', 'event_espresso' );?><span id="espresso-thank-you-page-ajax-time-dv">00:00:00</span></span>
			</p>
		</div>
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
	 * 	get_payment_details
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function get_payment_details() {
		//prepare variables for displaying
		$template_args = array();
		$template_args['transaction'] = $this->_current_txn;
		$template_args['reg_url_link'] = $this->_reg_url_link;
		//get payments, but order with newest at the top, so users see that first
		$template_args['payments'] = $this->_current_txn->payments(array('order_by'=>array('PAY_timestamp'=>'DESC')));
		//create a hackey payment object, but dont save it
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
		EEH_Template_Validator::verify_is_array_of( $template_args['payments'], '$payments', 'EE_Payment' );
		EEH_Template_Validator::verify_isnt_null( $template_args['show_try_pay_again_link'], '$show_try_pay_again_link' );
		EEH_Template_Validator::verify_isnt_null( $template_args['gateway_content'], '$gateway_content');
		EEH_Template_Validator::verify_isnt_null( $template_args['SPCO_payment_options_url'], '$SPCO_payment_options_url');
		return EEH_Template::locate_template( THANK_YOU_TEMPLATES_PATH . 'thank-you-page-payment-details.template.php', $template_args, TRUE, TRUE );
	}



}
// End of file EES_Espresso_Thank_You.shortcode.php
// Location: /shortcodes/EES_Espresso_Thank_You.shortcode.php
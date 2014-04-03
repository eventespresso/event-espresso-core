<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
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
 * @subpackage	/shortcodes/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EES_Espresso_Thank_You  extends EES_Shortcode {
	
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
	 * The URL for revisting the SPCO attendee information step
	 * @var string $_SPCO_attendee_information_url
	 */
	protected $_SPCO_attendee_information_url = NULL;
	
	/**
	 * The URL for revisting the SPCO payment options step
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
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
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
	 * 	run - initial shortcode module setup called during "wp_loaded" hook
	 * 	this method is primarily used for loading resources that will be required by the shortcode when it is actually processed
	 *
	 *  @access 	public
	 *  @param  	WP $WP 
	 *  @return 	void
	 */
	public function run( WP $WP ) {
		
		// only do thank you page stuff if we have a REG_url_link in the url
		if ( EE_Registry::instance()->REQ->is_set( 'e_reg_url_link' )) {		
			$this->_reg_url_link = EE_Registry::instance()->REQ->get( 'e_reg_url_link' );
			$this->_current_txn = EE_Registry::instance()->load_model( 'Transaction' )->get_transaction_from_reg_url_link();
			if ( ! $this->_current_txn instanceof EE_Transaction ) {
				EE_Error::add_error( __( 'No transaction information could be retrieved or the transaction data is not of the correct type.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			} else {
				EE_Registry::instance()->load_model( 'Gateways' )->thank_you_page_logic( $this->_current_txn );
				EE_Registry::instance()->LIB->EEM_Gateways->reset_session_data();
				add_filter( 'FHEE_load_css', '__return_true' );
				add_filter( 'FHEE_load_js', '__return_true' );
				add_action( 'shutdown', array( EE_Session::instance(), 'clear_session' ));
			}
		} 
	}




	/**
	 * 	process_shortcode - EES_Espresso_Thank_You 
	 * 
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	void
	 */
	public function process_shortcode( $attributes = array() ) {

		if ( ! $this->_current_txn instanceof EE_Transaction ) {
			EE_Error::add_error( __( 'No transaction information could be retrieved or the transaction data is not of the correct type.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );			return;
		} 
			
		//prepare variables for displaying
//		$registrations = $this->_current_txn->registrations();
//		$event_names = array();
//		foreach( $registrations as $registration ){
//			$event_names[ $registration->event_name() ] = $registration->event_name();
//		}
//		$primary_registrant = $this->_current_txn->primary_registration() instanceof EE_Registration ? $this->_current_txn->primary_registration() : NULL;
		//get the transaction. yes, we had it during 'handle_thank_you_page', but it may have been updated
		$this->_current_txn = EE_Registry::instance()->LIB->EEM_Transaction->get_one_by_ID( $this->_current_txn->ID() );
		$this->_primary_registrant = $this->_current_txn->primary_registration() instanceof EE_Registration ? $this->_current_txn->primary_registration() : NULL;
		//printr( $this->_current_txn, '$this->_current_txn  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		// registrations
//		$registrations = $this->_current_txn->registrations();
//		$event_names = array();
//		foreach( $registrations as $registration ){
//			if ( $registration instanceof EE_Registration && ( ! $this->_revisit || ( $this->_revisit && $this->_reg_url_link == $registration->reg_url_link() ))) {
//				$event_names[ $registration->event_name() ] = $registration->event_name();					
//			}
//		}			
//		$template_args['event_names'] = $event_names;			
		
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
		$this->_SPCO_payment_options_url = $this->_primary_registrant ? $this->_primary_registrant->payment_overview_url() : add_query_arg( array('step'=>'payment_options' ), $revisit_spco_url );
		// link to SPCO attendee_information
		$this->_SPCO_attendee_information_url = $this->_primary_registrant ? $this->_primary_registrant->edit_attendee_information_url() : FALSE;
		// link to receipt
		$template_args['TXN_receipt_url'] = $this->_current_txn->receipt_url('html');

//		EEH_Template_Validator::verify_instanceof( $template_args['primary_registrant']->attendee(), '$primary_registrant', 'EE_Attendee');
//		EEH_Template_Validator::verify_is_array( $template_args['event_names'], '$event_names');


		return EEH_Template::locate_template( THANK_YOU_TEMPLATES_PATH . 'espresso-thank-you-page-overview.template.php', TRUE, $template_args, TRUE );		
		
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
		return EEH_Template::locate_template( THANK_YOU_TEMPLATES_PATH . 'espresso-thank-you-page-registration-details.template.php', TRUE, $template_args, TRUE );		}



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
		return EEH_Template::locate_template( THANK_YOU_TEMPLATES_PATH . 'espresso-thank-you-page-transaction-details.template.php', TRUE, $template_args, TRUE );		
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
		return EEH_Template::locate_template( THANK_YOU_TEMPLATES_PATH . 'espresso-thank-you-page-payment-details.template.php', TRUE, $template_args, TRUE );		
	}



}
// End of file EES_Espresso_Thank_You.shortcode.php
// Location: /shortcodes/EES_Espresso_Thank_You.shortcode.php
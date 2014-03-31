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
	 * The reg_url_link passed from the Request, or from the Session
	 * @var string $_reg_url_link
	 */
	protected $_reg_url_link = NULL;

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
			$this->_payment_method = EE_Registry::instance()->REQ->get('payment_method');
			if ( ! $this->_current_txn instanceof EE_Transaction ) {
				EE_Error::add_error( __( 'No transaction information could be retrieved or the transaction data is not of the correct type.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			} else {
				EE_Registry::instance()->load_core( 'Payment_Processor' )->process_ipn( EE_Registry::instance()->REQ, $this->_current_txn,$this->_payment_method );
				add_filter( 'FHEE_load_css', '__return_true' );
				add_filter( 'FHEE_load_js', '__return_true' );
				add_action( 'shutdown', array( EE_Session::instance(), 'clear_session' ));
			}
		} else {
			EE_Error::add_error( __( 'No transaction information could be retrieved  because the reg_url_link is missing.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );			
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
			EE_Error::add_error( __( 'No transaction information could be retrieved or the transaction data is not of the correct type.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
		} else {
			//get the transaction. yes, we had it during 'handle_thank_you_page', but it may have been updated
			$this->_current_txn = EE_Registry::instance()->LIB->EEM_Transaction->get_one_by_ID( $this->_current_txn->ID() );
			$primary_registrant = $this->_current_txn->primary_registration() instanceof EE_Registration ? $this->_current_txn->primary_registration() : NULL;
			//printr( $this->_current_txn, '$this->_current_txn  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			// registrations
			$registrations = $this->_current_txn->registrations();
			$event_names = array();
			foreach( $registrations as $registration ){
				if ( $registration instanceof EE_Registration && ( ! $this->_revisit || ( $this->_revisit && $this->_reg_url_link == $registration->reg_url_link() ))) {
					$event_names[ $registration->event_name() ] = $registration->event_name();					
				}
			}			
			
			//prepare variables for displaying
			$template_args = array();
			$template_args['transaction'] = $this->_current_txn;
			$template_args['reg_url_link'] = $this->_reg_url_link;
			$template_args['is_primary'] = $primary_registrant->reg_url_link() == $this->_reg_url_link ? TRUE : FALSE;
						//get payments, but order with newest at teh top, so users see taht first
			$template_args['payments'] = $this->_current_txn->payments(array('order_by'=>array('PAY_timestamp'=>'DESC')));
			$template_args['primary_registrant'] = $primary_registrant;
			
			// txn status ? 
			if( $this->_current_txn->is_completed() ){
				$template_args['show_try_pay_again_link'] = FALSE;
			} else if ( $this->_current_txn->is_incomplete() && ( $primary_registrant->is_approved() || $primary_registrant->is_pending_payment() )){
				$template_args['show_try_pay_again_link'] = TRUE;
			} else if ( $primary_registrant->is_approved() || $primary_registrant->is_pending_payment() ) {
				// its pending
				$template_args['show_try_pay_again_link'] = isset( EE_Registry::instance()->CFG->registration->show_pending_payment_options ) && EE_Registry::instance()->CFG->registration->show_pending_payment_options ? TRUE : FALSE;
			} else {
				$template_args['show_try_pay_again_link']  = FALSE;
			}
			// link to SPCO
			$revisit_spco_url = add_query_arg( 
				array( 'ee'=>'_register', 'revisit'=>TRUE, 'e_reg_url_link'=>EE_Registry::instance()->REQ->get( 'e_reg_url_link' )), 
				get_permalink( EE_Registry::instance()->CFG->core->reg_page_id )
			);

			$template_args['event_names'] = $event_names;			
			// link to SPCO payment_options
			$template_args['SPCO_payment_options_url'] = $primary_registrant ? $primary_registrant->payment_overview_url() : add_query_arg(  array('step'=>'payment_options' ), $revisit_spco_url );
			// link to SPCO attendee_information
			$template_args['SPCO_attendee_information_url'] =$primary_registrant ? $primary_registrant->edit_attendee_information_url() : FALSE;
			$template_args['gateway_content'] = '';			
			//create a hackey payment object, but dont save it
			$payment = EE_Payment::new_instance( array(
				'TXN_ID'=>$this->_current_txn->ID(), 
				'STS_ID'=>EEM_Payment::status_id_pending, 
				'PAY_timestamp'=>current_time('timestamp'), 
				'PAY_amount'=>$this->_current_txn->total()
			));

			$template_args['gateway_content'] = EEM_Gateways::instance()->get_payment_overview_content( $gateway_name,$payment );

			
			
			EE_Registry::instance()->REQ->add_output( EEH_Template::display_template( THANK_YOU_TEMPLATES_PATH . 'payment_overview.template.php', $template_args, TRUE ));			
		}

		return EE_Registry::instance()->REQ->get_output();		
		
	}

}
// End of file EES_Espresso_Thank_You.shortcode.php
// Location: /shortcodes/EES_Espresso_Thank_You.shortcode.php
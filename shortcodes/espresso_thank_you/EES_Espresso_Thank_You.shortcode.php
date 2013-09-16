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
	public function set_definitions() {
		define( 'THANK_YOU_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'THANK_YOU_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
	}



	/**
	 * 	run - initial shortcode module setup called during "wp_loaded" hook
	 * 	this method is primarily used for loading resources that will be required by the shortcode when it is actually processed
	 *
	 *  @access 	public
	 *	@param 	EE_Registry $EE
	 *  @return 	void
	 */
	public function run( EE_Registry $EE = NULL ) {
		$this->EE = $EE;
		//only do thank you page stuff if we have a REG_url_link in the url
		//otherwise, just leave the transaction page shortcode as-is
		
		$txn = EEM_Transaction::instance()->get_one( array(  array( 'TXN_ID' => 14 )));
		$reg = $txn->primary_registration();
		printr( $reg, '$reg  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );


//		if ( $this->EE->REQ->is_set( 'e_reg_url_link' )) {
//			// load classes
//			$this->EE->load_model( 'Gateways' );
//			$this->EE->LIB->EEM_Gateways->set_ajax( false );
//			$this->EE->load_class( 'Registration' );
//			$this->EE->load_model( 'Transaction' );
//			
//			$this->_current_txn =$this->EE->LIB->EEM_Transaction->get_transaction_from_reg_url_link();
//			add_action( 'init', array( $this, 'handle_thank_you_page' ), 30 );
//		}

	}



	/**
	 * performs business logic on page load, like maybe forgetting some session info etc
	 */
	function handle_thank_you_page(){
		$this->EE->LIB->EEM_Gateways->thank_you_page_logic( $this->_current_txn );
		$this->EE->LIB->EEM_Gateways->reset_session_data();
	}



	/**
	 * 	process_shortcode - EES_Espresso_Thank_You 
	 * 
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	void
	 */
	public function process_shortcode( $attributes ) {
		
		
//		$txn1 = $this->EE->LIB->EEM_Transaction->get_one_by_ID( 13 );
//		$reg = $txn1->primary_registration();
//		printr( $reg, '$reg  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		//prepare variables for displaying
		//get teh transaction. yes, we had it during 'handle_thank_you_page', but it may have been updated
		$registrations = $this->_current_txn->registrations();
		$event_names = array();
		foreach( $registrations as $registration ){
			$event_names[ $registration->event_name() ] = $registration->event_name();
		}
		$this->_current_txn = $this->EE->LIB->EEM_Transaction->get_one_by_ID( $this->_current_txn->ID() );
		//printr( $this->_current_txn, '$this->_current_txn  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$template_args = array();
		//update the trsansaction, in case we just updated it.
		$template_args['transaction'] = $this->_current_txn;
		$template_args['payments'] = $this->_current_txn->payments();
		$template_args['primary_registrant'] = $this->_current_txn->primary_registration();
		printr( $template_args['primary_registrant'], 'primary_registrant  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$template_args['event_names'] = $event_names;

		// txn status ? 
		if( $this->_current_txn->is_completed() ){
			$template_args['show_try_pay_again_link'] = FALSE;
		} else if ( $this->_current_txn->is_incomplete() ){
			$template_args['show_try_pay_again_link'] = TRUE;
		} else {
			// its pending
			$template_args['show_try_pay_again_link'] = $this->EE->CFG->registration->show_pending_payment_options ? TRUE : FALSE;
		}
		
		$template_args['SPCO_step_2_url'] = add_query_arg( array( 'ee'=>'register', 'step'=>'2' ), get_permalink( $this->EE->CFG->core->reg_page_id ));
		$txn_details = $this->_current_txn->details();
		
		$template_args['gateway_content'] = '';
		if( $txn_details && array_key_exists( 'gateway',$txn_details )){			
			//create a hackey payment object, but dont save it
			$gateway_name = $txn_details['gateway'];
			$payment = EE_Payment::new_instance( array(
				'TXN_ID'=>$this->_current_txn->ID(), 
				'STS_ID'=>EEM_Payment::status_id_pending, 
				'PAY_timestamp'=>current_time('timestamp'), 
				'PAY_amount'=>$this->_current_txn->total(), 
				'PAY_gateway'=>$gateway_name
			));
		
			$template_args['gateway_content'] = EEM_Gateways::instance()->get_payment_overview_content( $gateway_name,$payment );

		} 
		
		$this->EE->REQ->add_output( espresso_display_template( THANK_YOU_TEMPLATES_PATH . 'payment_overview.template.php', $template_args, TRUE ));
		return $this->EE->REQ->get_output();		
		
	}

}
// End of file EES_Espresso_Thank_You.shortcode.php
// Location: /shortcodes/EES_Espresso_Thank_You.shortcode.php
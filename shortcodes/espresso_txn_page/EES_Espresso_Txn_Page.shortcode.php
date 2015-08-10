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
 * EES_Espresso_Txn_Page
 *
 * @package			Event Espresso
 * @subpackage	/shortcodes/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EES_Espresso_Txn_Page  extends EES_Shortcode {

	/**
	 * The transaction specified by the reg_url_link passed from the Request, or from the Session
	 * @var EE_Transaction $_current_txn
	 */
	protected $_current_txn = NULL;

	/**
	 * The current payment method for the IPN
	 * @var EE_Payment_Method $_current_pm
	 */
	protected $_current_pm = NULL;

	/**
	 * 	set_hooks - for hooking into EE Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		add_action( 'wp_loaded', array( 'EES_Espresso_Txn_Page', 'set_definitions' ), 2 );
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
		define( 'TXN_PAGE_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'TXN_PAGE_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
	}



	/**
	 * 	run - initial shortcode module setup called during "wp_loaded" hook
	 * 	this method is primarily used for loading resources that will be required by the shortcode when it is actually processed
	 *
	 *  @access 	public
	 *  @param 	 WP $WP
	 *  @return 	void
	 */
	public function run( WP $WP ) {
		if ( EE_Registry::instance()->REQ->is_set('e_reg_url_link' )){
			$this->_current_txn = EE_Registry::instance()->load_model( 'Transaction' )->get_transaction_from_reg_url_link();
		} else {
			$this->_current_txn = null;
		}
		if ( $this->_current_txn instanceof EE_Transaction ) {
			//EE_Registry::instance()->load_helper( 'Debug_Tools' );
			//EEH_Debug_Tools::log( __CLASS__, __FUNCTION__, __LINE__, array( $this->_current_txn ), true, 	'EE_Transaction: ' . $this->_current_txn->ID() );
			$payment_method_slug = EE_Registry::instance()->REQ->get( 'ee_payment_method', NULL );
			if( $payment_method_slug ) {
				$payment_method = EEM_Payment_Method::instance()->get_one_by_slug( $payment_method_slug );
			}else{
				$payment_method = null;
			}
			/** @type EE_Payment_Processor $payment_processor */
			$payment_processor = EE_Registry::instance()->load_core('Payment_Processor');
			$payment_processor->process_ipn( $_REQUEST, $this->_current_txn, $payment_method );
			//allow gateways to add a filter to stop rendering the page
			if( apply_filters( 'FHEE__EES_Espresso_Txn_Page__run__exit', FALSE ) ){
				exit;
			}
		}

	}




	/**
	 * 	process_shortcode - EES_Espresso_Txn_Page
	 *
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	string
	 */
	public function process_shortcode( $attributes = array() ) {
		return __( 'This is the Event Espresso Transactions page. This page receives instant payment notification (IPN) requests and should have a status of published, but should not be easily accessible by site visitors. Do not add it to your website\'s navigation menu or link to it from another page. Also, do not delete it or change its status to private.', 'event_espresso' );
	}



}
// End of file EES_Espresso_Txn_Page.shortcode.php
// Location: /shortcodes/EES_Espresso_Txn_Page.shortcode.php
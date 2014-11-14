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
		if ( EE_Registry::instance()->REQ->is_set('e_reg_url_link' ) && EE_Registry::instance()->REQ->is_set('ee_gateway') ){
			$this->_current_txn = EE_Registry::instance()->load_model( 'Transaction' )->get_transaction_from_reg_url_link();
			EEM_Gateways::instance()->set_selected_gateway( EE_Registry::instance()->REQ->get('ee_gateway') );
			EEM_Gateways::instance()->handle_ipn_for_transaction( $this->_current_txn );
		}
	}




	/**
	 * 	process_shortcode - EES_Espresso_Txn_Page
	 *
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	void
	 */
	public function process_shortcode( $attributes = array() ) {
		if($this->_current_txn){
			printf(__("IPN successfully received for Transaction with ID '%d'", "event_espresso"),$this->_current_txn->ID());
		}else{
			printf(__("No IPN (or incomplete IPN) received.", "event_espresso"));
		}
	}

}
// End of file EES_Espresso_Txn_Page.shortcode.php
// Location: /shortcodes/EES_Espresso_Txn_Page.shortcode.php
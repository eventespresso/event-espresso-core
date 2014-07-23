<?php

/**
 * Basically a controller for the transaction page. The transaction page should really
 * only be used for receiving IPN (instant payment notifications) from gateways.
 */
class EE_Transaction_Page{

	// instance of the EE_Single_Page_Checkout object
	/**
	 * @var null
	 */
	private static $_instance = NULL;

	/**
	 * Gateways model for querying
	 * @var EEM_Gateways
	 */
	private $_GATEWAYS = NULL;

	/**
	 * Transaction model for querying
	 * @var EEM_Transaction
	 */
	private $_TXN = NULL;



	/**
	 * 		@singleton method used to instantiate class object
	 * 		@access public
	 * 		@return \EE_Transaction_Page
	 */
	public static function instance() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		// check if class object is instantiated
		if ( ! self::$_instance instanceof EE_Transaction_Page ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}



	/**
	 *
	 */
	protected function __construct(){
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		add_action('init',array($this,'handle_ipn'),30);
		$this->load_classes();
	}



	/**
	 * 	load_classes
	 */
	protected function load_classes(){
		// load gateways
		$this->_GATEWAYS = EE_Registry::instance()->load_model( 'Gateways' );
		$this->_TXN = EE_Registry::instance()->load_model( 'Transaction' );
	}

	/**
	 * handles the IPN. Gets the gateways model to call the currently-used gateway,
	 * and handle the IPN in its desired manner.
	 * Expects that the IPN sent a POST or GET requests with parameters 'e_reg_url_link'
	 * (which is a registration's REG_url_link value) and 'ee_gateway' (which is the
	 * gateway_name of the gateway sending the IPN. Eg, 'PayPal_Standard').
	 * Maybe we'll want to die afterwards? For now I'll just let the gateway handle that
	 */
	function handle_ipn(){
		//in the REQUEST, we expect  reg_url_link, ee_gateway. If not,
		//it must not be an Instant Payment Notification...
		if(( isset( $_GET['e_reg_url_link'] ) && isset( $_GET['ee_gateway'] )) || ( isset( $_POST['e_reg_url_link'] ) && isset( $_POST['ee_gateway'] ))) {
			$transaction = $this->_TXN->get_transaction_from_reg_url_link($_GET['e_reg_url_link']);
			$indicated_gateway=array_key_exists('ee_gateway',$_GET)?$_GET['ee_gateway']:$_POST['ee_gateway'];
			$this->_GATEWAYS->set_selected_gateway($indicated_gateway);
			$this->_GATEWAYS->handle_ipn_for_transaction($transaction);
		}
	}
}
<?php

/**
 * Basically a controller for the transaction page. The transaction page should really
 * only be used for receiving IPN (instant paymen tnotifications) from gateways.
 */
class EE_Transaction_Page{
	// instance of the EE_Single_Page_Checkout object
	private static $_instance = NULL;
	/**
	 * Indicates ifthe current request is an ajax request
	 * @var boolean
	 */
	private $_ajax = FALSE;
	
	/**
	 * Gateways model for querying
	 * @var EEM_Gateways
	 */
	private $_GATEWAYS = NULL;
	
	/**
	 * Transactino model for querying
	 * @var EEM_Transaction 
	 */
	private $_TXN = NULL;
	/**
	 * 		@singleton method used to instantiate class object
	 * 		@access public
	 * 		@return class instance
	 */
	public static function instance() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		// check if class object is instantiated
		if (self::$_instance === NULL or !is_object(self::$_instance) or !is_a(self::$_instance, __CLASS__)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	protected function __construct(){
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		
		if ( isset($_POST['espresso_ajax']) && $_POST['espresso_ajax'] == 1 ) {
			$this->_ajax = TRUE;
		} else if (  isset($_REQUEST['espresso_ajax']) && $_REQUEST['espresso_ajax'] == 1 ) {
			$this->_ajax = TRUE;
		} else {
			 $this->_ajax = FALSE;
		}	
		
		add_action('init',array($this,'handle_ipn'),30);
		$this->load_classes();
	}
	
	protected function load_classes(){
		// load gateways
		if (!defined('ESPRESSO_GATEWAYS')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Gateways.model.php');
			$EEM_Gateways = EEM_Gateways::instance();
		}
		$this->_GATEWAYS = $EEM_Gateways;
		$this->_GATEWAYS->set_ajax( $this->_ajax );
		
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php');
		$this->_TXN = EEM_Transaction::instance();
	}
	
	/**
	 * handles the IPN. Gets the gateways model to call the currently-used gateway,
	 * and handle teh IPN in its desired manner. 
	 * Expects that the IPN sent a POST or GET requests with parameters 'reg_url_link'
	 * (which is a registration's REG_url_link value) and 'ee_gateway' (which is the 
	 * gateway_name of the gateway sending teh IPN. Eg, 'Paypal_Standard'). 
	 * Maybe we'll want to die afterwards? For now I'll just let the gateway handle that
	 */
	function handle_ipn(){
		//in the REQUEEST, we expect  reg_url_link, ee_gateway. If not, 
		//it must not be an Instant Payment NOtification...
		if((isset($_GET['reg_url_link']) && isset($_GET['ee_gateway']) )
				||
				(isset($_POST['reg_url_link']) && isset($_POST['ee_gateway']))){		
			$transaction = $this->_TXN->get_transaction_from_reg_url_link($_GET['reg_url_link']);
			$indicated_gateway=array_key_exists('ee_gateway',$_GET)?$_GET['ee_gateway']:$_POST['ee_gateway'];
			$this->_GATEWAYS->set_selected_gateway($indicated_gateway);
			$this->_GATEWAYS->handle_ipn_for_transaction($transaction);
		}
	}
}
<?php

class EE_Thank_You_Page{
	// instance of the EE_Single_Page_Checkout object
	private static $_instance = NULL;
	
	
	/**
	 * Gateways model for handling all gateway interactions
	 * @var EEM_Gateways 
	 */
	private $_GATEWAYS = NULL; 
	
	
	/**
	 * Transactino model for querying
	 * @var EEM_Transaction 
	 */
	private $_TXN = NULL;
	
	
	/**
	 * Payment model for making queries
	 * @var EEM_Payment 
	 */
	private $_PAY = NULL;
	
	
	
	/**
	 * Registration model for making queries
	 * @var EEM_Registration
	 */
	private $_REG = NULL;
	
	/**
	 * The trnasaction specified by teh reg_url_link in the GET parameter, or in the session
	 * @var EE_Transaction
	 */
	protected $_current_transaction = null;
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
		
		add_action('init',array($this,'handle_thank_you_page'),30);
		add_action( 'wp', array($this,'display_payment_overview'), 102 );
		$this->load_classes();
		
		$transaction = $this->_TXN->get_transaction_from_reg_url_link($_GET['e_reg_url_link']);
		$this->_current_transaction = $transaction;
	}
	
	protected function load_classes(){
		// load gateways
		if (!defined('ESPRESSO_GATEWAYS')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Gateways.model.php');
			$EEM_Gateways = EEM_Gateways::instance();
		}
		$this->_GATEWAYS = $EEM_Gateways;
		$this->_GATEWAYS->set_ajax( false );
		
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php');
		$this->_TXN = EEM_Transaction::instance();
		
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Payment.model.php');
		$this->_PAY = EEM_Payment::instance();
		
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php');
		$this->_REG = EEM_Registration::instance();
	}
	
	
	
	/**
	 * performs business logic on page load, like maybe forgetting some session info etc
	 */
	function handle_thank_you_page(){
		$this->_GATEWAYS->thank_you_page_logic($this->_current_transaction);
		$this->_GATEWAYS->reset_session_data();
	}
	
	/**
	 * Gets content for displaying teh payment_overview
	 * @global type $org_options
	 * @global type $espresso_content
	 */
	function display_payment_overview(){
		global $espresso_content;
		$espresso_content = $this->_get_payment_overview_content($_GET['e_reg_url_link']);
		//not sure why we wait to add this shortcode, but its what was previously in teh code...
		add_shortcode('ESPRESSO_PAYMENTS', 'return_espresso_content');
	}
	
	
	
	/**
	 * Gets teh contents of the the payment overview
	 * @param string $reg_url_link
	 * @global type $org_option
	 * @return string html for displaying payment overview
	 */
	protected function _get_payment_overview_content($reg_url_link){
		global $org_options;
		//prepare variables for displaying
		//get teh transaction. yes, we had it during 'handle_thank_you_page', but it may have been updated
		$transaction = $this->_current_transaction;
		$registrations = $transaction->registrations();
		$event_names = array();
		foreach($registrations as $registration){
			$event_names[$registration->event_name()]=$registration->event_name();
		}
		
		$template_args=array();
		//update the trsansaction, in case we just updated it.
		$template_args['transaction']=$this->_TXN->get_transaction($transaction->ID());
		$template_args['payments'] = $transaction->payments();//$this->_PAY->get_approved_payments_for_transaction($transaction->ID());
		$template_args['primary_registrant'] = $this->_REG->get_primary_registration_for_transaction_ID($transaction->ID());
		$template_args['event_names']=$event_names;
		$consider_pending_payments_as_incomplete = $org_options['show_pending_payment_options'] == '1';
		if($transaction->is_completed()){
			$template_args['show_try_pay_again_link'] = false;
		}elseif($transaction->is_incomplete()){
			$template_args['show_try_pay_again_link'] = true;
		}else{//its pending
			if($consider_pending_payments_as_incomplete){
				$template_args['show_try_pay_again_link'] = true;
			}else{
				$template_args['show_try_pay_again_link'] = false;
			}
		}
		$template_args['currency_symbol']=$org_options['currency_symbol'];
		$template_args['SPCO_step_2_url']= add_query_arg(array('e_reg'=>'register','step'=>'2'),get_permalink($org_options['event_page_id']));
		return  espresso_display_template(EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/payment_overview.template.php',$template_args,true);
		
	}
}
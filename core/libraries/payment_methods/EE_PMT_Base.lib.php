<?php 
EE_Registry::instance()->load_lib('Gateway');
EE_Registry::instance()->load_lib('Onsite_Gateway');
EE_Registry::instance()->load_lib('Offsite_Gateway');
abstract class EE_PMT_Base{
	/**
	 *
	 * @var EE_Payment_Method
	 */
	protected $_pm_instance = NULL;
	/**
	 **
	 * @var boolean
	 */
	protected $_requires_https = FALSE;
	/** @var EE_Gateway */
	protected $_gateway = NULL;
	/**
	 * @var EE_Form_Section_Proper
	 */
	protected $_settings_form = NULL;
	/** 
	 * @var EE_Form_Section_Proper
	 */
	protected $_billing_form = NULL;
	/**
	 * String of the absolute path to the folder containing this file, with a trailing slash.
	 * eg '/public_html/wp-site/wp-content/plugins/event-espresso/payment_methods/Invoice/'
	 * @var string
	 */
	protected $_file_folder = NULL;
	/**
	 * String to the absolute URL to this file (useful for getting its web-accessilbe resources
	 * like images, js, or css)
	 * @var string
	 */
	protected $_file_url = NULL;
	/**
	 * Pretty name for the payment method
	 * @var string
	 */
	protected $_pretty_name = NULL;
	/**
	 *
	 * @var string
	 */
	protected $_default_button_url = NULL;
	/**
	 * 
	 * @param EE_Payment_Method $pm_instance
	 */
	function __construct($pm_instance = NULL) {
		if ( $pm_instance instanceof EE_Payment_Method ){
			$this->set_instance($pm_instance);
		}
		$this->_set_file_folder();
		$this->_set_file_url();
		if($this->_gateway){
			$this->_gateway->set_payment_model(EEM_Payment::instance());
			$this->_gateway->set_payment_log(EEM_Payment_Log::instance());
			EE_Registry::instance()->load_helper('Template');
			$this->_gateway->set_template_helper(new EEH_Template());
		}
		if( ! $this->_pretty_name){
			throw new EE_Error(sprintf(__("You must set the pretty name for the Payment Method Type in the constructor (_pretty_name), and please make it internationalized", "event_espresso")));
		}
		//if the child didn't specify a default button, use the credit card one
		if( ! $this->_default_button_url){
			$this->_default_button_url = EE_PLUGIN_DIR_URL . 'payment_methods' . DS . 'pay-by-credit-card.png';
		}
	}
	
	/**
	 * sets the file_folder property
	 */
	protected function _set_file_folder(){
		$reflector = new ReflectionClass(get_class($this));
		$fn = $reflector->getFileName();
		$this->_file_folder =  dirname($fn).DS;
	}
	/**
	 * sets the file URL with a trailing slash for this PMT
	 */
	protected function _set_file_url(){
		$plugins_dir_fixed = str_replace('\\',DS,WP_PLUGIN_DIR);
		$file_folder_fixed = str_replace('\\',DS,$this->file_folder());
		$file_path = str_replace($plugins_dir_fixed,WP_PLUGIN_URL,$file_folder_fixed);
		$this->_file_url = $file_path;
	}
	/**
	 * Returns the folder containing the PMT child class, witha trailing slash
	 * @return string
	 */
	public function file_folder(){
		return $this->_file_folder;
	}
	public function file_url(){
		return $this->_file_url;
	}
	/**
	 * Sets the payment method instance this payment method type is for.
	 * Its important teh paymetn method instance is set before
	 * @param EE_Payment_Method $payment_method_instance
	 */
	function set_instance($payment_method_instance){
		$this->_pm_instance = $payment_method_instance;
		//if they have already requeste dthe settings form, make sure its
		//data matches this model object
		if($this->_settings_form){
			$this->settings_form()->populate_model_obj($payment_method_instance);
		}
		if($this->_gateway && $this->_gateway instanceof EE_Gateway){
			$this->_gateway->set_settings($payment_method_instance->settings_array());
		}
	}
	
	/**
	 * Gets teh form for displaying to admins where they setup the payment method
	 * @return EE_Payment_Method_Form
	 */
	function settings_form(){
		if( ! $this->_settings_form){
			$this->_settings_form = $this->generate_new_settings_form();
			//if we have already assigned a model object to this pmt, make
			//sure its reflected in teh form we just generated
			if($this->_pm_instance){
				$this->_settings_form->populate_model_obj($this->_pm_instance);
			}
		}
		return $this->_settings_form;
	}
	/**
	 * Gets the form for all the settings related to this payment method type
	 * @return EE_Payment_Method_Form
	 */
	abstract function generate_new_settings_form();
	/**
	 * Sets the form for settings. This may be useful if we have already received
	 * a form submission and have form data it in, and want to use it anytime we're showing
	 * this paymennt method type's settings form later in the request
	 * @param EE_Payment_Method_Form $form
	 */
	public function set_settings_form($form){
		$this->_settings_form = $form;
	}
	/**
	 * Gets the form for displaying to attendees where they can enter their billing info
	 * which will be sent to teh gateway (can be null)
	 * @return EE_Form_Section_Proper
	 */
	public function billing_form(){
		if( ! $this->_billing_form){
			$this->_billing_form = $this->generate_new_billing_form();
		}
		return $this->_billing_form;
	}
	/**
	 * Creates the billing form fo rthis payment method type
	 * @return EE_Form_Section_Proper
	 */
	abstract function generate_new_billing_form();
	/**
	 * Sets the billing form for this paymetn method type. You may want to use this
	 * if you have form
	 * @param EE_Payment_Method $form
	 */
	public function set_billing_form($form){
		$this->_billing_form = $form;
	}
	/**
	 * Returns whether or not this payment method requires HTTPS to be used
	 * @return boolean
	 */
	function requires_https(){
		return $this->_requires_https;
	}
	/**
	 * 
	 * @param EE_Transaction $transaction
	 * @param type $amount
	 * @param type $billing_info
	 * @param type $return_url
	 * @param type $method
	 * @param type $by_admin
	 * @throws EE_Error
	 */
	function process_payment( $transaction, $amount = NULL, $billing_info = NULL, $return_url = NULL,$fail_url = NULL, $method = 'CART', $by_admin = FALSE ){		//@todo: add surcharge for the payment method, if any
		if($this->_gateway){
			//there is a gateway, so we're going to make a paymetn object
			//but wait! do they already have a paymetn in progress that we thougth was failed?
			$duplicate_properties = array(
				'TXN_ID' => $transaction->ID(),
				'STS_ID' => EEM_Payment::status_id_failed,
				'PMD_source' => $method,
				'PAY_amount' => $amount !== NULL ? $amount : $transaction->total(),
				'PMD_ID' => $this->_pm_instance->ID(),
				'PAY_gateway_response'=>NULL,
			);
			$payment = EEM_Payment::instance()->get_one(array($duplicate_properties));
			//if we didn't already have a paymetn in progress for the same thing,
			//then we actually want to make a new payment
			if( ! $payment){
				$payment = EE_Payment::new_instance(array_merge($duplicate_properties,array(
					'PAY_timestamp' => current_time('mysql',false),
					'PAY_txn_id_chq_nmbr' => NULL,
					'PAY_po_number' => NULL,
					'PAY_extra_accntng' => NULL,
					'PAY_details' => NULL)));
			}
			if($this->_gateway instanceof EE_Offsite_Gateway){
				$core_config = EE_Config::instance()->core;
				$payment = $this->_gateway->set_redirection_info($payment,$billing_info,$return_url,
						$core_config->txn_page_url(array('e_reg_url_link'=>$transaction->primary_registration()->reg_url_link(),'ee_payment_method'=>$this->_pm_instance->slug())),
						$core_config->cancel_page_url());
			}elseif($this->_gateway instanceof EE_Onsite_Gateway){
				$payment = $this->_gateway->do_direct_payment($payment,$billing_info);
				$payment->save();
				$transaction->update_based_on_payments();//also saves transaction
				$transaction->finalize();
			}else{
				throw new EE_Error(sprintf(__("Gateway for payment method type '%s' is '%s', not a subclass of either EE_Offsite_Gateway or EE_Onsite_Gateway, or NULL (to indicate NO gateway)", "event_espresso"),get_class($this),typeof($this->_gateway)));
			}
		}else{//no gateway provided
			//so create no payment. The payment processor will know how to handle this
			$payment = NULL; // <<<<<  added by brent as interm solution so that $payment is defined for return below
		}
		return $payment;
	}
	/**
	 * Handles an instant payment notification when the transaction is known (by default).
	 * @param array $req_data
	 * @param EE_Transaction $transaction
	 * @return EE_Payment
	 * @throws EE_Error
	 */
	public function handle_ipn($req_data,$transaction){
		$transaction = EEM_Transaction::instance()->ensure_is_obj($transaction);
		if( ! $this->_gateway instanceof EE_Offsite_Gateway){
			throw new EE_Error(sprintf(__("Could not handle IPN because '%s' is not an offsite gateway", "event_espresso"), print_r( $this->_gateway, TRUE )));
			
		}
		$payment = $this->_gateway->handle_payment_update($req_data,$transaction);
		return $payment;
	}
	
	/**
	 * Gets the payment this IPN is for. Children may often want to 
	 * override this to inspect the request
	 * @param array $req_data
	 * @param EE_Transaction $transaction
	 * @return EE_Payment
	 */
	protected function find_payment_for_ipn($req_data,$transaction){
		return $transaction->last_payment();
	}
	/**
	 * In case generic code cannot provide the paymetn processor with a specific payment method
	 * and transaction, it will try calling this method on each activate payment method.
	 * If the payment method is able to identify the request as being for it, it should fetch
	 * the payment its for and return it. If not, it should throw an EE_Error to indicate it cannot 
	 * handle the IPN
	 * @param array $req_data
	 * @return EE_Payment only if this payment method can find the info its needs from $req_data
	 * and identifies the IPN as being for this paymetn method (not just fo ra paymetn method of this type)
	 * @throws EE_Error
	 */
	public function handle_unclaimed_ipn($req_data){
		throw new EE_Error(sprintf(__("Payment Method '%s' cannot handle unclaimed ipns", "event_espresso"),get_class($this)));
	}
	/**
	 * Logic to be accomplished when the payment attempt is complete.
	 * Most payment methods don't need to do anything at this point; but some, like Mijireh, do.
	 * (Mijireh is an offsite gateway which doesn't send an IPN. So when the user returns to EE from
	 * mijireh, this method needs to be called so the Mijireh PM can ping Mijireh to know the status
	 * of the payment). Fed a transaction because it's always assumed to be the last payment that
	 * 
	 * @param EE_Transaction $transaction
	 * @return void
	 */
	public function finalize_payment_for($transaction){
	}
	
	/**
	 * Whether or not this payment method's gateway supports sending refund requests
	 * @return boolean
	 */
	public function supports_sending_refunds(){
		if($this->_gateway && $this->_gateway instanceof EE_Gateway){
			return $this->_gateway->supports_sending_refunds();
		}else{
			return false;
		}
	}
	/**
	 * 
	 * @param type $payment
	 * @param type $refund_info
	 * @return EE_Payment
	 */
	public function process_refund($payment, $refund_info = array()){
		if($this->_gateway && $this->_gateway instanceof EE_Gateway){
			return $this->_gateway->do_direct_refund();
		}else{
			throw new EE_Error(sprintf(__("Payment Method Type '%s' does not support sending refund requests", "event_espresso"),get_class($this)));
		}
	}
	
	const onsite = 'on-site';
	const offsite = 'off-site';
	const offline = 'off-line';
	/**
	 * Returns one the class's consts onsite,offsite, or offline, depending on this
	 * payment method's gateway.
	 * @return string
	 * @throws EE_Error
	 */
	public function payment_occurs(){
		if( ! $this->_gateway){
			return EE_PMT_Base::offline;
		}elseif($this->_gateway instanceof EE_Onsite_Gateway){
			return EE_PMT_Base::onsite;
		}elseif($this->_gateway instanceof EE_Offsite_Gateway){
			return EE_PMT_Base::offsite;
		}else{
			throw new EE_Error(sprintf(__("Payment method type '%s's gateway isnt an instance of EE_Onsite_Gateway, EE_Offsite_Gateway, or null. It must be one of those", "event_espresso"),get_class($this)));
		}
	}
	
	/**
	 * For adding any html output ab ove the payment overview.
	 * Many gateways won't want ot display anything, so this function just returns an empty string.
	 * Other gateways may want to override this, such as offline gateways.
	 * @return string
	 */
	public function payment_overview_content(EE_Payment $payment){
		EE_Registry::instance()->load_helper('Template');
		return EEH_Template::display_template(EE_LIBRARIES.'payment_methods'.DS.'templates'.DS.'payment_details_content.template.php', array('payment_method'=>$this->_pm_instance,'payment'=>$payment) , true);
	}
	
	/**
	 * @return array exactly like EE_Admin_Page _page_config's 'help_tabs' attribute. @see EE_Admin_Page::_set_page_config()
	 */
	public function help_tabs_config(){
		return array();
	}
	/**
	 * The system name for this PMT (eg AIM, Paypal_Pro, Invoice... what gets put into
	 * the payment method's table's PMT_type column)
	 * @return string
	 */
	public function system_name(){
		$classname = get_class($this);
		return str_replace("EE_PMT_",'',$classname);
	}
	/**
	 * A pretty i18n version of the PMT name
	 * @return string
	 */
	public function pretty_name(){
		return $this->_pretty_name;
	}
	/**
	 * Gets the default absolute URL to the paymetn method type's button
	 * @return string
	 */
	public function default_button_url(){
		return $this->_default_button_url;
	}
}
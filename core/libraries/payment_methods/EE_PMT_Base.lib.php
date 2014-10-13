<?php
EE_Registry::instance()->load_lib('Gateway');
EE_Registry::instance()->load_lib('Onsite_Gateway');
EE_Registry::instance()->load_lib('Offsite_Gateway');
/**
 *
 * Class EE_PMT_Base
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				$VID:$
 *
 */
abstract class EE_PMT_Base{

	const onsite = 'on-site';
	const offsite = 'off-site';
	const offline = 'off-line';

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

	/**
	 * @var EE_Gateway
	 */
	protected $_gateway = NULL;

	/**
	 * @var EE_Payment_Method_Form
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
	 * String to the absolute URL to this file (useful for getting its web-accessible resources
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
	 * @var string
	 */
	protected $_default_description = NULL;


	/**
	 *
	 * @param EE_Payment_Method $pm_instance
	 * @throws EE_Error
	 * @return EE_PMT_Base
	 */
	function __construct($pm_instance = NULL) {
		if ( $pm_instance instanceof EE_Payment_Method ){
			$this->set_instance($pm_instance);
		}
		$this->_set_file_folder();
		$this->_set_file_url();
		if($this->_gateway){
			$this->_gateway->set_payment_model( EEM_Payment::instance() );
			$this->_gateway->set_payment_log( EEM_Change_Log::instance() );
			EE_Registry::instance()->load_helper( 'Template' );
			$this->_gateway->set_template_helper( new EEH_Template() );
			EE_Registry::instance()->load_helper( 'Line_Item' );
			$this->_gateway->set_line_item_helper( new EEH_Line_Item() );
		}
		if( ! $this->_pretty_name){
			throw new EE_Error(sprintf(__("You must set the pretty name for the Payment Method Type in the constructor (_pretty_name), and please make it internationalized", "event_espresso")));
		}
		//if the child didn't specify a default button, use the credit card one
		if( $this->_default_button_url === NULL){
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
	 * Gets the default description on all payment methods of this type
	 * @return string
	 */
	public function default_description(){
		return $this->_default_description;
	}



	/**
	 * Returns the folder containing the PMT child class, with a trailing slash
	 * @return string
	 */
	public function file_folder(){
		return $this->_file_folder;
	}



	/**
	 * @return string
	 */
	public function file_url(){
		return $this->_file_url;
	}



	/**
	 * Sets the payment method instance this payment method type is for.
	 * Its important teh payment method instance is set before
	 * @param EE_Payment_Method $payment_method_instance
	 */
	function set_instance($payment_method_instance){
		$this->_pm_instance = $payment_method_instance;
		//if they have already requested the settings form, make sure its
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
			$this->_settings_form->set_payment_method_type( $this );
			$this->_settings_form->_construct_finalize(NULL, NULL );
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
	 * this payment method type's settings form later in the request
	 * @param EE_Payment_Method_Form $form
	 */
	public function set_settings_form($form){
		$this->_settings_form = $form;
	}


	/**
	 * Gets the form for displaying to attendees where they can enter their billing info
	 * which will be sent to teh gateway (can be null)
	 * @param \EE_Transaction $transaction
	 * @return EE_Billing_Info_Form | EE_Billing_Attendee_Info_Form
	 */
	public function billing_form( EE_Transaction $transaction = NULL ){
		if( ! $this->_billing_form ){
			$this->_billing_form = $this->generate_new_billing_form( $transaction );
		}
		//if we know who the attendee is, and this is a billing form
		//that uses attendee info, populate it
		if( $this->_billing_form instanceof EE_Billing_Attendee_Info_Form &&
				$transaction instanceof EE_Transaction &&
				$transaction->primary_registration() instanceof EE_Registration &&
				$transaction->primary_registration()->attendee() instanceof EE_Attendee ){
			$this->_billing_form->populate_from_attendee( $transaction->primary_registration()->attendee() );
		}
		return $this->_billing_form;
	}


	/**
	 * Creates the billing form for this payment method type
	 * @param \EE_Transaction $transaction
	 * @return EE_Billing_Info_Form
	 */
	abstract function generate_new_billing_form( EE_Transaction $transaction = NULL );



	/**
	 * Sets the billing form for this payment method type. You may want to use this
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
	 * @param EE_Transaction       $transaction
	 * @param float                $amount
	 * @param EE_Billing_Info_Form $billing_info
	 * @param string               $return_url
	 * @param null                 $fail_url
	 * @param string               $method
	 * @param bool           $by_admin
	 * @return \EE_Base_Class|\EE_Payment|null
	 * @throws EE_Error
	 */
	function process_payment( EE_Transaction $transaction, $amount = NULL, $billing_info = NULL, $return_url = NULL,$fail_url = NULL, $method = 'CART', $by_admin = FALSE ){
		// @todo: add surcharge for the payment method, if any
		if ( $this->_gateway ) {
			//there is a gateway, so we're going to make a payment object
			//but wait! do they already have a payment in progress that we thought was failed?
			$duplicate_properties = array(
				'TXN_ID' => $transaction->ID(),
				'STS_ID' => EEM_Payment::status_id_failed,
				'PAY_source' => $method,
				'PAY_amount' => $amount !== NULL ? $amount : $transaction->total(),
				'PMD_ID' => $this->_pm_instance->ID(),
				'PAY_gateway_response'=>NULL,
			);
			$payment = EEM_Payment::instance()->get_one( array( $duplicate_properties ));
			//if we didn't already have a payment in progress for the same thing,
			//then we actually want to make a new payment
			if ( ! $payment instanceof EE_Payment ){
				$payment = EE_Payment::new_instance(
					array_merge(
						$duplicate_properties,
						array(
							'PAY_timestamp' => current_time( 'mysql' ),
							'PAY_txn_id_chq_nmbr' => NULL,
							'PAY_po_number' => NULL,
							'PAY_extra_accntng' => NULL,
							'PAY_details' => NULL
						)
					)
				);
			}
			//make sure the payment has been saved to show we started it, and so it has an ID should the gateway try to log it
			$payment->save();
			$billing_values = $this->_get_billing_values_from_form( $billing_info );
			// if there is billing info, clean it and save it now
			if( $billing_info instanceof EE_Billing_Attendee_Info_Form ){
				$this->_save_billing_info_to_attendee( $billing_info, $transaction );
			}

			//  Offsite Gateway
			if( $this->_gateway instanceof EE_Offsite_Gateway ){

				$payment = $this->_gateway->set_redirection_info(
					$payment,
					$billing_values,
					$return_url,
					EE_Config::instance()->core->txn_page_url(
						array(
							'e_reg_url_link'=>$transaction->primary_registration()->reg_url_link(),
							'ee_payment_method'=>$this->_pm_instance->slug()
						)
					),
					EE_Config::instance()->core->cancel_page_url()
				);

			//  Onsite Gateway
			} elseif ( $this->_gateway instanceof EE_Onsite_Gateway ) {

				$payment = $this->_gateway->do_direct_payment($payment,$billing_values);
				$payment->save();

			} else {
				throw new EE_Error(
					sprintf(
						__('Gateway for payment method type "%s" is "%s", not a subclass of either EE_Offsite_Gateway or EE_Onsite_Gateway, or NULL (to indicate NO gateway)', 'event_espresso' ),
						get_class($this),
						gettype( $this->_gateway )
					)
				);
			}

		} else {
			//no gateway provided
			//so create no payment. The payment processor will know how to handle this
			$payment = NULL;
		}
		return $payment;
	}

	/**
	 * Gets the values we want to pass onto the gateway. Normally these
	 * are just the 'pretty' values, but there may be times the data may need
	 * a  little massaging
	 * @param EE_Billing_Info_Form $billing_form
	 * @return array
	 */
	protected function _get_billing_values_from_form( $billing_form ){
		if($billing_form instanceof EE_Form_Section_Proper ){
			return $billing_form->input_pretty_values();
		}else{
			return NULL;
		}
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
		$payment = $this->_gateway->handle_payment_update( $req_data, $transaction );
		return $payment;
	}



	/**
	 * Saves the billing info onto the attendee of the primary registrant on this transaction, and
	 * cleans it first.
	 * @param EE_Billing_Attendee_Info_Form $billing_form
	 * @param EE_Transaction $transaction
	 * @return boolean success
	 */
	protected function _save_billing_info_to_attendee($billing_form, $transaction){
		if( ! $transaction || ! $transaction instanceof EE_Transaction){
			EE_Error::add_error(__("Cannot save billing info because no transaction was specified", "event_espresso"), __FILE__, __FUNCTION__, __LINE__);
			return false;
		}
		$primary_reg = $transaction->primary_registration();
		if( ! $primary_reg ){
			EE_Error::add_error(__("Cannot save billing info because the transaction has no primary registration", "event_espresso"), __FILE__, __FUNCTION__, __LINE__);
			return false;
		}
		$attendee = $primary_reg->attendee();
		if( ! $attendee ){
			EE_Error::add_error(__("Cannot save billing info because the transaction's primary registration has no attendee!", "event_espresso"), __FILE__, __FUNCTION__, __LINE__);
			return false;
		}
		return $attendee->save_and_clean_billing_info_for_payment_method($billing_form, $transaction->payment_method() );

	}



	/**
	 * Gets the payment this IPN is for. Children may often want to
	 * override this to inspect the request
	 * @param EE_Transaction $transaction
	 * @param array $req_data
	 * @return EE_Payment
	 */
	protected function find_payment_for_ipn( EE_Transaction $transaction, $req_data = array() ){
		return $transaction->last_payment();
	}



	/**
	 * In case generic code cannot provide the payment processor with a specific payment method
	 * and transaction, it will try calling this method on each activate payment method.
	 * If the payment method is able to identify the request as being for it, it should fetch
	 * the payment its for and return it. If not, it should throw an EE_Error to indicate it cannot
	 * handle the IPN
	 * @param array $req_data
	 * @return EE_Payment only if this payment method can find the info its needs from $req_data
	 * and identifies the IPN as being for this payment method (not just fo ra payment method of this type)
	 * @throws EE_Error
	 */
	public function handle_unclaimed_ipn( $req_data = array() ){
		throw new EE_Error(sprintf(__("Payment Method '%s' cannot handle unclaimed IPNs", "event_espresso"), get_class($this) ));
	}



	/**
	 * Logic to be accomplished when the payment attempt is complete.
	 * Most payment methods don't need to do anything at this point; but some, like Mijireh, do.
	 * (Mijireh is an offsite gateway which doesn't send an IPN. So when the user returns to EE from
	 * mijireh, this method needs to be called so the Mijireh PM can ping Mijireh to know the status
	 * of the payment). Fed a transaction because it's always assumed to be the last payment that
	 * we're dealing with. Returns that last payment (if there is one)
	 *
	 * @param EE_Transaction $transaction
	 * @return EE_Payment
	 */
	public function finalize_payment_for($transaction){
		return $transaction->last_payment();
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
	 * @param EE_Payment $payment
	 * @param array      $refund_info
	 * @throws EE_Error
	 * @return EE_Payment
	 */
	public function process_refund($payment, $refund_info = array()){
		if($this->_gateway && $this->_gateway instanceof EE_Gateway){
			return $this->_gateway->do_direct_refund( $payment, $refund_info );
		}else{
			throw new EE_Error(sprintf(__("Payment Method Type '%s' does not support sending refund requests", "event_espresso"),get_class($this)));
		}
	}



	/**
	 * Returns one the class's constants onsite,offsite, or offline, depending on this
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
	 * @param EE_Payment $payment
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
	 * Gets the default absolute URL to the payment method type's button
	 * @return string
	 */
	public function default_button_url(){
		return $this->_default_button_url;
	}



	/**
	 * Gets the gateway used by this payment method (if any)
	 * @return EE_Gateway
	 */
	public function get_gateway(){
		return $this->_gateway;
	}



	/**
	 * @return string html for the link to a help tab
	 */
	public function get_help_tab_link(){
		return EEH_Template::get_help_tab_link( $this->get_help_tab_name() );
	}



	/**
	 * Returns the name of the help tab for this PMT
	 * @return string
	 */
	public function get_help_tab_name(){
		return 'ee_' . strtolower( $this->system_name() ) . '_help_tab';
	}



}
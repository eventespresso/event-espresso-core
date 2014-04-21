<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

abstract class EE_Offsite_Gateway extends EE_Gateway {

	protected $_gatewayUrl = NULL;
	protected $fields = array();
	
	
	
	/**
	 *  Gets the URL that the user should generally be sent back to after payment completion offiste
	 *  Adds the reg_url_link in order to remember which session we were in the middle of processing
	 * @param EE_Registration or int, current registration we want to link back to in the return url.
	 * @param boolean $urlencode whether or not to url-encode the url (if true, you probably intend to pass
	 * this string as a URL parameter itself, or maybe a post parameter)
	 *  @return string URL on the current site of the thank_you page, with parameters added on to know which registration was just 
	 * processed in order to correctly display the payment status. And it gets URL-encoded by default
	 */
	protected function _get_notify_url( $registration, $urlencode = false ){
		//if $registration is an ID instead of an EE_Registration, make it an EE_Registration
		if( ! ($registration instanceof EE_Registration)){
			$registration = $this->_REG->get_one_by_ID($registration);
		}
		if(empty($registration)){
			$msg[0]=__("Cannot get Notify URL for gateway. Invalid registration",'event_espresso');
			$msg[1]=sprinf(__("Registration being used is %s.",'event_espresso'),  print_r($registration, true));
			EE_Error::add_error(implode("||", $msg), __FILE__, __FUNCTION__, __LINE__);
			return '';
		}
		//get a registration that's currently getting processed
		/*@var $registration EE_Registration */
		$url=add_query_arg(array('e_reg_url_link'=>$registration->reg_url_link(),
					'ee_gateway'=>$this->_gateway_name),
				get_permalink(EE_Registry::instance()->CFG->core->txn_page_id));
		if($urlencode){
			$url=urlencode($url);
		}
		return $url;
	}
	
	protected function __construct(EEM_Gateways &$model) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		parent::__construct($model);
	}
	
	/**
	 * 		process_gateway_selection()
	 * 		@access public
	 * 		@return 	mixed	array on success or FALSE on fail
	 */
	public function process_gateway_selection() {	
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$msg = $this->_EEM_Gateways->display_name() . __( ' gateway selected.', 'event_espresso' );
		EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );		
	}

	/**
	 * 		set_billing_info_for_confirmation
	 * 		@access public
	 * 		@param array	$billing_info
	 * 		@return array
	 */
	public function set_billing_info_for_confirmation( $billing_info ) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$confirm_data = array();
		$confirm_data['gateway'] = $this->_EEM_Gateways->display_name();
		return $confirm_data;
	}


	/**
	 * 		_redirect_after_reg_step_3 - how to handle redirection after processing reg step 3
	 * 		@access public
	 * 		@param	string 	$return_page_url
	 * 		@return 	mixed	void or echo
	 */
	public function redirect_after_reg_step_3() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
	
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
	
		if ( $this->_EEM_Gateways->ajax() ) {
			$form_data =  $this->_EEM_Gateways->off_site_form();
			$response_data = array(
					'success' => 'Forwarding to Off-Site Payment Provider',
					'return_data' => array('off-site-redirect' => $form_data['form'])
			);
			echo json_encode($response_data);
			die();
		} else {
			$form_data = $this->_EEM_Gateways->off_site_form();
			echo $form_data['pre-form'] . $form_data['form'] . $form_data['post-form'];
			die();
		}

	}

	/**
	 * Adds a key=>value pair to the fields array
	 *
	 * @param string key of field
	 * @param string value of field
	 * @return
	 */
	public function addField($field, $value) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->fields["$field"] = $value;
	}

	/**
	 * Submit Payment Request (redirect)
	 *
	 * Generates a form with hidden elements from the fields array
	 * and submits it to the payment gateway URL. The user is presented
	 * a redirecting message along with a button to click.
	 *
	 * @param string value of buttn text
	 * @return void
	 */
	public function submitPayment() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$pre_form = "<html>\n";
		$pre_form .= "<head><title>Processing Payment...</title></head>\n";
		$pre_form .= "<body>\n";
		$form = "<h2 style=\"margin:2em auto; line-height:2em; text-align:center;\">Please wait...<br/>your order is being processed and you will be redirected to the payment website.</h2>";
		$form .= "<form method=\"POST\" name=\"gateway_form\" ";
		$form .= "action=\"" . $this->_gatewayUrl . "\">\n";
		$form .= $this->_output_inputs();
		$form .= "<p style=\"text-align:center;\"><br/>If you are not automatically redirected to ";
		$form .= "the payment website within 10 seconds...<br/><br/>\n";
		$form .= "<input type=\"submit\" value=\"Click Here\"></p>\n";
		$form .= "</form>\n";
		$post_form = "</body></html>\n";
		return array('pre-form' => $pre_form, 'form' => $form, 'post-form' => $post_form);
	}
	
	protected function _output_inputs() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$output = '';
		foreach ($this->fields as $name => $value) {
			$output .= "<input type=\"hidden\" name=\"$name\" value=\"$value\"/>\n";
		}
		return $output;
	}
	
	/**
	 * This function should create a payment given the IPN data, and update the transaction accordingly.
	 * I would have made thsi function abstract, but then I'd get compile-time errors until I rewrote all the gateways...
	 * SO maybe in the future I wll make it abstract.
	 * @param EE_Transaction $transaction
	 * @throws EE_Error
	 */
	public function handle_ipn_for_transaction(EE_Transaction $transaction){
		throw new EE_Error(sprintf(__('handle_ipn_for_transaction not implemented for gateway %s. || This function should take care of creating a payment given the ipn data, and updating the transaction accordingly.','event_espresso'),get_class($this)));
	
	}
	
	/**
	 * Handles the gateway-specific logic when displaying the payment page..
	 * @global type $EE_Session
	 * @param EE_Transaction $transaction
	 * @return string
	 */
	public function thank_you_page_logic(EE_Transaction $transaction){
		//check that we've received an IPN for this payment, otherwise consider this the IPN
		$this->_EEM_Gateways->handle_ipn_for_transaction($transaction);
		parent::thank_you_page_logic($transaction);
	}
	
}
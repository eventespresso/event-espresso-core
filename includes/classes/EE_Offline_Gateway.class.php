<?php

abstract class EE_Offline_Gateway extends EE_Gateway {

	abstract public function espresso_process_off_site_payment();

	protected function __construct(EEM_Gateways &$model) {
		parent::__construct($model);
	}

//	protected function _update_actions() {
//		parent::_update_actions();
//		if ($this->_selected) {
//			if (!has_action('action_hook_espresso_process_off_site_payment', array(&$this, 'espresso_process_off_site_payment'))) {
//				add_action('action_hook_espresso_process_off_site_payment', array(&$this, 'espresso_process_off_site_payment'));
//			}
//		} else {
//			if (has_action('action_hook_espresso_process_off_site_payment', array(&$this, 'espresso_process_off_site_payment'))) {
//				remove_action('action_hook_espresso_process_off_site_payment', array(&$this, 'espresso_process_off_site_payment'));
//			}
//		}
//	}



	/**
	 * 		process_gateway_selection()
	 * 		@access public
	 * 		@return 	mixed	array on success or FALSE on fail
	 */
	public function process_gateway_selection() {	
		global $espresso_notices;
		$espresso_notices['success'][] = __('Off-line gateway selected', 'event_espresso');
	}



	/**
	 * 		set_billing_info_for_confirmation
	 * 		@access public
	 * 		@param array	$billing_info
	 * 		@return array
	 */
	public function set_billing_info_for_confirmation( $billing_info ) {
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
	public function redirect_after_reg_step_3( $return_page_url ) {
		
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
	
		if ( $this->_EEM_Gateways->ajax() ) {
			$SPCO = EE_Single_Page_Checkout::instance();
			$SPCO->send_ajax_response( 'Redirecting to Off-site Payment Provider', FALSE, '_redirect_to_off_site', $return_page_url );
		} else {
			$form_data = $this->_EEM_Gateways->off_site_form();
			echo $form_data['pre-form'] . $form_data['form'] . $form_data['post-form'];
			die();
		}

	}

	

}
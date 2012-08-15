<?php

abstract class EE_Offline_Gateway extends EE_Gateway {

	abstract public function espresso_process_off_site_payment();

	protected function __construct(EEM_Gateways &$model) {
		parent::__construct($model);
	}

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

	public function process_reg_step_3() {

	}

	public function thank_you_page() {
		global $EE_Session;
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );

		// grab session data
		$session = $EE_Session->get_session_data();

		$transaction = $session['transaction'];
		$txn_results = $session['txn_results'];
		$transaction->set_details( $txn_results );
		unset( $session['transaction'] );
		$transaction->set_session_data( $session );
		$transaction->update();
	}
	

}
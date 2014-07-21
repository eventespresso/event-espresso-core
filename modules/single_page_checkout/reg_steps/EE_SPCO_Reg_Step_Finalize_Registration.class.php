<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_SPCO_Reg_Step_Finalize_Registration
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.5.0
 *
 */
class EE_SPCO_Reg_Step_Finalize_Registration extends EE_SPCO_Reg_Step {

	/**
	 *    class constructor
	 *
	 * @access    public
	 * @param    EE_Checkout $checkout
	 * @return 	\EE_SPCO_Reg_Step_Finalize_Registration
	 */
	public function __construct( EE_Checkout $checkout ) {
		$this->_slug = 'finalize_registration';
		$this->_name = __('Finalize Registration', 'event_espresso');
		$this->_template = '';
//		$this->_template = SPCO_TEMPLATES_PATH . 'finalize_registration_main.template.php';
		$this->checkout = $checkout;
	}



	public function translate_js_strings() {

	}

	public function enqueue_styles_and_scripts() {

	}



	/**
	 * @return boolean
	 */
	public function initialize_reg_step() {

	}



	/**
	 * @return string
	 */
	public function generate_reg_form() {
		echo '<br/><h5 style="color:#2EA2CC;">' . __CLASS__ . '<span style="font-weight:normal;color:#0074A2"> -> </span>' . __FUNCTION__ . '() <br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
		die();

	}



	/**
	 * @return boolean
	 */
	public function process_reg_step() {

	}



	/**
	 * @return boolean
	 */
	public function update_reg_step() {

	 }




	/**
	 * This processes the registration form from the admin and returns either the true or false depending on the success of the process.
	 *
	 * Note that this method handles not only validating the registration form but also saving to the database all the data in the session.
	 *
	 * @access  public
	 * @return mixed bool|int (either false on fail OR TXN id on success)
	 */
	public function process_registration_from_admin() {
		//nonce check was done in admin so no need to do here.
		//first lets validate the registration form
		$this->init_for_admin();
		//if failure in processing attendee info then let's get out early
		if ( ! $this->_process_attendee_information() ) {
			return FALSE;
		}
		// same deal when saving everything
		if ( ! $this->_save_all_registration_information() ) {
			return FALSE;
		}
		//all is good so let's continue with finalizing the registration.
		EE_Registry::instance()->SSN->set_session_data( array( 'transaction', NULL ));
		$this->_transaction->set_txn_session_data( EE_Registry::instance()->SSN->get_session_data() );
		$this->checkout->cart->get_grand_total()->save_this_and_descendants_to_txn( $this->_transaction->ID() );
		//is this free event?
		if ( $this->checkout->cart->get_grand_total()->total() == EEH_Template::format_currency( 0, TRUE ) ) {
			$this->_transaction->set_status( EEM_Transaction::complete_status_code );
		} else {
			$this->_transaction->set_status( EEM_Transaction::incomplete_status_code );
		}
		$this->_transaction->finalize( TRUE );
		EE_Registry::instance()->SSN->clear_session( __CLASS__, __FUNCTION__ );
		return $this->_transaction->ID();
	}





	/**
	 * 	_process_finalize_registration
	 *
	 * 	@access private
	 * 	@return 	void
	 */
	private function _process_finalize_registration() {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		// save everything
		if ( $this->_continue_reg && $this->_save_all_registration_information() ) {
			//			echo '<h2 style="color:#E76700;">_process_finalize_registration<br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h2>';
			// save TXN data to the cart
			$this->checkout->cart->get_grand_total()->save_this_and_descendants_to_txn( $this->_transaction->ID() );

			do_action( 'AHEE__EE_Single_Page_Checkout__process_finalize_registration__before_gateway', $this->_transaction );
			$this->_selected_method_of_payment = $this->_get_selected_method_of_payment();
			// if Default REG Status is set to REQUIRES APPROVAL... then payments are NOT allowed
			if ( $this->_selected_method_of_payment == 'payments_closed' ) {
				// set TXN Status to Open
				$this->_transaction->set_status( EEM_Transaction::incomplete_status_code );
				$this->_transaction->save();
				$this->_transaction->finalize();

				// Default REG Status is set to PENDING PAYMENT OR APPROVED, and payments are allowed
			} else if ( $this->_transaction->total() > 0 ) {
				// attempt payment via payment method
				$this->_process_payment();
			} else {
				// set TXN Status to Open
				$this->_transaction->set_status( EEM_Transaction::complete_status_code );
				$this->_transaction->save();
				$this->_transaction->finalize();
				$this->checkout->redirect_to_thank_you_page = TRUE;
			}

		}
		$this->checkout->next_step = FALSE;
		$this->go_to_next_step( __FUNCTION__ );

	}



}
// End of file EE_SPCO_Reg_Step_Finalize_Registration.class.php
// Location: /EE_SPCO_Reg_Step_Finalize_Registration.class.php
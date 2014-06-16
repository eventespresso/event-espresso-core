<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_Checkout
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage    core
 * @author				Brent Christensen
 * @since 				4.5.0
 *
 */
class EE_Checkout {

	/**
	 * array of EE_SPCO_Reg_Step objects
	 * @type EE_SPCO_Reg_Step[]
	 */
	public $reg_steps = array();

	/**
	 * where we are in the reg process
	 * @type EE_SPCO_Reg_Step
	 */
	public $current_step = '';

	/**
	 * where we are going next in the reg process
	 * @type string
	 */
	public $next_step = '';

	/**
	 * base url for the site's registration checkout page - additional url params will be added to this
	 * @type string
	 */
	public $reg_page_base_url = '';

	/**
	 * base url for the site's registration cancelled page - additional url params will be added to this
	 * @type string
	 */
	public $cancel_page_url = '';

	/**
	 * base url for the site's thank you page - additional url params will be added to this
	 * @type string
	 */
	public $thank_you_page_url = '';

	/**
	 * redirect to thank you page ?
	 * @type bool
	 */
	public $redirect_to_thank_you_page = FALSE;

	/**
	 * array of data to be passed back to the client during AJAX requests
	 * @type array
	 */
	public $json_response = array();

	/**
	 * reg_url_link for a previously saved registration
	 * @type string
	 */
	public $reg_url_link = '';

	/**
	 * whether returning to edit attendee information or to retry a payment
	 * @type bool
	 */
	public $revisit = FALSE;

	/**
	 * whether the primary registrant is returning to edit attendee information or to retry a payment
	 * @type bool
	 */
	public $primary_revisit = FALSE;

	/**
	 * is registration allowed to progress or halted for some reason such as failing to pass recaptcha?
	 * @type bool
	 */
	public $continue_reg = TRUE;

	/**
	 * 	$_cart - the current cart object
	 * 	@access private
	 *	@var EE_CART $_cart
	 */
	public $cart = NULL;

	/**
	 * 	$_transaction - the current transaction object
	 * 	@access private
	 *	@var EE_Transaction $_transaction
	 */
	public $transaction = NULL;

	/**
	 * 	the related attendee object for the primary registrant
	 * @type EE_Attendee
	 */
	public $primary_attendee_obj = NULL;

	/**
	 * string slug for the payment method that was selected during the payment options step
	 * @type string
	 */
	public $selected_method_of_payment = NULL;

	/**
	 *	$_payment_method - the payment method object for the selected method of payment
	 * 	@access private
	 *	@var EE_Payment_Method $_payment_method
	 */
	public $payment_method = NULL;

	/**
	 * 	if a payment method was selected that uses an on-site gateway, then this is the billing form
	 * @type EE_Billing_Info_Form
	 */
	public $billing_form = NULL;



	/**
	 *    class constructor
	 *
	 * @access    public
	 * @return    \EE_Checkout
	 */
	public function __construct(  ) {
		$this->reg_page_base_url = EE_Registry::instance()->CFG->core->reg_page_url();
		$this->thank_you_page_url = EE_Registry::instance()->CFG->core->thank_you_page_url();
		$this->cancel_page_url = EE_Registry::instance()->CFG->core->cancel_page_url();
		$this->continue_reg = apply_filters( 'FHEE__EE_Checkout___construct___continue_reg', TRUE );
	}



	/**
	 * sort_reg_steps
	 *
	 * @access public
	 * @return void
	 */
	public function sort_reg_steps() {
		$reg_step_sorting_callback = apply_filters( 'FHEE__EE_Checkout__sort_reg_steps__reg_step_sorting_callback', 'reg_step_sorting_callback' );
		usort( $this->reg_steps, array( $this, $reg_step_sorting_callback ));
	}



	/**
	 * reg_step_sorting_callback
	 *
	 * @access public
	 * @param EE_SPCO_Reg_Step $reg_step_A
	 * @param EE_SPCO_Reg_Step $reg_step_B
	 * @return array()
	 */
	public function reg_step_sorting_callback( EE_SPCO_Reg_Step $reg_step_A, EE_SPCO_Reg_Step $reg_step_B ) {
		if ( $reg_step_A->order() == $reg_step_B->order() ) {
			return 0;
		}
		return ( $reg_step_A->order() > $reg_step_B->order() ) ? 1 : -1;
	}



}



// End of file EE_Checkout.class.php
// Location: /EE_Checkout.class.php
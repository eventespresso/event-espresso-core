<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EED_Mijireh_Payment_Checker
 * Adds hooks so we check for completed Mijireh payments from the transactions page
 * (because it's quite possible a user paid with Mijireh, but when they returned from Mijireh
 * the payment processing server hasn't yet confirmed whether or not the payment was approved.
 * So when the customer arrives at the thank you page, we checked with Mijireh to see
 * if the payment was complete and Mijireh didn't know. So we need another way
 * to check with Mijireh whether or not the payment was been completed. This implementation
 * checks when an admin visits the admin transaction details page).
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EED_Mijireh_Payment_Checker extends EED_Module{

	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *	Mijireh Slurper module mostly just detects a special request on the EE payment methods page
	 *	to perform a redirect to a slurping page; detects a special request on the post.php editing page to
	 *	initiate slurping into Mijireh; and adds a metabox to the post.php editing page when Mijireh's special
	 *	shortcode is present
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		add_action( 'AHEE__Transactions_Admin_Page__transaction_details__start', array( 'EED_Mijireh_Payment_Checker', 'check_for_payment_update_on_transaction' ), 10, 1 );
	}



    /**
     * If the transaction has pending mijireh payments, we check with mijireh to see if they've been completed.
     * @param EE_Transaction $transaction
     * @throws EE_Error if a model is misconfigured
     */
	public static function check_for_payment_update_on_transaction( $transaction ) {
		if( $transaction instanceof EE_Transaction ) {
			//are there pending Mijireh payments on this transaction?
            $a_mijireh_payment = EEM_Payment::instance()->get_one(
                array(
                    array(
                        'TXN_ID' => $transaction->ID(),
                        'STS_ID' => EEM_Payment::status_id_pending,
                        'Payment_Method.PMD_type' => 'Mijireh',
                    )
                )
            );
			if($a_mijireh_payment instanceof EE_Payment) {
				add_action(
					'AHEE__EE_Registration_Processor__trigger_registration_update_notifications',
					array( 'EED_Mijireh_Payment_Checker', 'send_notifications_after_mijireh_ipn' ),
					5, 2
				);
				EE_Payment_Processor::instance()->process_ipn( array(), $transaction, $a_mijireh_payment->payment_method() );
			}
		}
	}



	/**
	 *    send_notifications_after_mijireh_ipn
	 *
	 * checks if the payment processed in the IPN was approved and if not, blocks messages from being sent.
	 *
	 * @access    public
	 * @param EE_Registration $registration
	 * @param array $additional_details
	 */
	public static function send_notifications_after_mijireh_ipn( $registration, $additional_details ) {
		$last_payment = isset( $additional_details[ 'last_payment' ] ) ? $additional_details[ 'last_payment' ] : null;
		if ( ! $last_payment instanceof EE_Payment || $last_payment->status() != EEM_Payment::status_id_approved ) {
			add_filter( 'FHEE__EED_Messages___maybe_registration__deliver_notifications', '__return_false', 15 );
		}
	}



	/**
	 *    run - initial module setup
	 *
	 * @access    public
	 * @param WP_Query $WP_Query
	 */
	public function run( $WP_Query = null ) {
	}
}

// End of file EED_Mijireh_Payment_Checker.module.php
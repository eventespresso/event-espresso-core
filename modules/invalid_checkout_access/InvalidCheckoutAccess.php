<?php
namespace EventEspresso\modules\invalid_checkout_access;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class InvalidCheckoutAccessForm
 * Controls and tracks invalid access to the registration checkout page
 *
 * @package Event Espresso
 * @author  Brent Christensen
 * @since   4.9.17
 */
class InvalidCheckoutAccess {

	/**
	 * key used for saving invalid checkout access data to the wp_options table
	 */
	const OPTION_KEY = 'ee_invalid_checkout_access';



	/**
	 * _block_bots
	 * checks that the incoming request has either of the following set:
	 *  a uts (unix timestamp) which indicates that the request was redirected from the Ticket Selector
	 *  a REG URL Link, which indicates that the request is a return visit to SPCO for a valid TXN
	 * so if you're not coming from the Ticket Selector nor returning for a valid IP...
	 * then where you coming from man?
	 *
	 * @param \EE_Checkout $checkout
	 * @return bool true if access to registration checkout appears to be invalid
	 */
	public function checkoutAccessIsInvalid( \EE_Checkout $checkout ) {
		if (
			! ( $checkout->uts || $checkout->reg_url_link )
			&& ! ( defined( 'DOING_AJAX' ) && DOING_AJAX )
            && \EE_Config::instance()->registration->track_invalid_checkout_access()
        ) {
			/** @var \EE_Request $request */
			$request = \EE_Registry::instance()->load_core( 'EE_Request' );
			$ip_address = $request->ip_address();
			$ee_bot_checkout = get_option( InvalidCheckoutAccess::OPTION_KEY );
			if ( $ee_bot_checkout === false ) {
				$ee_bot_checkout = array();
				add_option( InvalidCheckoutAccess::OPTION_KEY, $ee_bot_checkout, '', false );
			}
			if ( ! isset( $ee_bot_checkout[ $ip_address ] ) ) {
				$ee_bot_checkout[ $ip_address ] = array();
			}
			$http_referer = isset( $_SERVER['HTTP_REFERER'] )
				? esc_attr( $_SERVER['HTTP_REFERER'] )
				: 0;
			if ( ! isset( $ee_bot_checkout[ $ip_address ][ $http_referer ] ) ) {
				$ee_bot_checkout[ $ip_address ][ $http_referer ] = 0;
			}
			$ee_bot_checkout[ $ip_address ][ $http_referer ]++;
			update_option( InvalidCheckoutAccess::OPTION_KEY, $ee_bot_checkout );
            if (WP_DEBUG) {
                \EE_Error::add_error(
                    esc_html__('Direct access to the registration checkout page is not allowed.', 'event_espresso'),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
			return true;
		}
		return false;
	}


	/**
	 * _invalid_checkout_access_form
	 *
	 * @return \EE_Form_Section_Proper
	 * @throws \EE_Error
	 */
	public function getForm() {
		return new \EE_Form_Section_Proper(
			array(
				'name'            => 'invalid_checkout_access',
				'html_id'         => 'invalid_checkout_access',
				'layout_strategy' => new \EE_Admin_Two_Column_Layout(),
				'subsections'     => array(
					'invalid_checkout_access_hdr'   => new \EE_Form_Section_HTML(
						\EEH_HTML::h2( esc_html__( 'Invalid Checkout Access', 'event_espresso' ) )
					),
					'ee_bot_checkout_data'          => new \EE_Text_Area_Input(
						array(
							'html_label_text' => esc_html__( 'Invalid Checkout Data', 'event_espresso' ),
							'default'         => var_export(
								get_option( InvalidCheckoutAccess::OPTION_KEY, array() ),
								true
							),
							'required'        => false,
							'html_help_text'  => esc_html__(
								'Event Espresso blocks any attempt to directly access the registration checkout page, that is NOT from a Ticket Selector or for a return visit for a valid transaction. These are not valid requests accessing your checkout page, so we track the IP addresses, what web page they just came from, and the number of times that they have attempted to access your registration page. This information may help you with protecting your site by other means, such as firewalls, etc, but please note that IP addresses are almost guaranteed to be spoofed by malicious agents.',
								'event_espresso'
							)
						)
					),
					'track_invalid_checkout_access' => new \EE_Yes_No_Input(
						array(
							'html_label_text'         => __( 'Track Invalid Checkout Access?', 'event_espresso' ),
							'html_help_text'          => esc_html__(
								'Controls whether or not invalid attempts to directly access the registration checkout page should be tracked. Setting this to "No" means that the above data will no longer be collected.',
								'event_espresso'
							),
							'default'                 => \EE_Config::instance()
															->registration
															->track_invalid_checkout_access(),
							'display_html_label_text' => false
						)
					),
					'delete_invalid_checkout_data'  => new \EE_Yes_No_Input(
						array(
							'html_label_text'         => __( 'Reset Invalid Checkout Data', 'event_espresso' ),
							'html_help_text'          => esc_html__(
								'Setting this to "Yes" will delete all existing invalid checkout access data.',
								'event_espresso'
							),
							'default'                 => false,
							'display_html_label_text' => false
						)
					),
				)
			)
		);
	}



	/**
	 * update_invalid_checkout_access_form
	 *
	 * @param \EE_Registration_Config $EE_Registration_Config
	 * @return \EE_Registration_Config
	 */
	public function processForm( \EE_Registration_Config $EE_Registration_Config ) {
		try {
			$invalid_checkout_access_form = $this->getForm();
			// if not displaying a form, then check for form submission
			if ( $invalid_checkout_access_form->was_submitted() ) {
				// capture form data
				$invalid_checkout_access_form->receive_form_submission();
				// validate form data
				if ( $invalid_checkout_access_form->is_valid() ) {
					// grab validated data from form
					$valid_data = $invalid_checkout_access_form->valid_data();
					// ensure form inputs we want are set
					if (
						isset(
							$valid_data['track_invalid_checkout_access'],
							$valid_data['delete_invalid_checkout_data']
						)
					) {
						$EE_Registration_Config->set_track_invalid_checkout_access(
							$valid_data['track_invalid_checkout_access']
						);
						// if deleting, then update option with empty array
						if ( filter_var( $valid_data['delete_invalid_checkout_data'], FILTER_VALIDATE_BOOLEAN ) ) {
							update_option( InvalidCheckoutAccess::OPTION_KEY, array() );
						}
					} else {
						\EE_Error::add_error(
							esc_html__(
								'Invalid or missing Invalid Checkout Access form data. Please refresh the form and try again.',
								'event_espresso'
							),
							__FILE__,
							__FUNCTION__,
							__LINE__
						);
					}
				} else {
					if ( $invalid_checkout_access_form->submission_error_message() !== '' ) {
						\EE_Error::add_error(
							$invalid_checkout_access_form->submission_error_message(),
							__FILE__,
							__FUNCTION__,
							__LINE__
						);
					}
				}
			}
		} catch ( \EE_Error $e ) {
			$e->get_error();
		}
		return $EE_Registration_Config;
	}

}
// End of file InvalidCheckoutAccess.php
// Location: EventEspresso\modules\invalid_checkout_access/InvalidCheckoutAccess.php
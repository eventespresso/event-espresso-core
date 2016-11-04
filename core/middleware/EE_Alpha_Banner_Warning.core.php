<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Alpha_Banner_Warning
 *
 * Displays a warning banner if an ALPHA version of EE is being run
 *
 * @package 	Event Espresso
 * @subpackage 	core
 * @author 		Brent Christensen
 * @since 		4.8.20
 *
 */

class EE_Alpha_Banner_Warning extends EE_Middleware {


	/**
	 * converts a Request to a Response
	 *
	 * @param 	EE_Request 	$request
	 * @param 	EE_Response $response
	 * @return 	EE_Response
	 */
	public function handle_request( EE_Request $request, EE_Response $response ) {
		$this->_request = $request;
		$this->_response = $response;
		$this->display_alpha_banner_warning();
		$this->_response = $this->process_request_stack( $this->_request, $this->_response );
		return $this->_response;
	}



	/**
	 *    display_alpha_banner_warning
	 *
	 *    displays message on frontend of site notifying admin that EE has been temporarily placed into maintenance mode
	 *
	 * @access    public
	 * @return    string
	 */
	public function display_alpha_banner_warning() {
		// skip AJAX requests
		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			return;
		}
		// skip stable releases
		if ( strpos( EVENT_ESPRESSO_VERSION, '.alpha' ) === false ) {
			return;
		}
		// post release candidate warning
		if ( is_admin() ) {
			add_action( 'admin_notices', array( $this, 'alpha_banner_admin_notice' ), -999 );
		} else {
			// site admin has authorized use of non-stable release candidate for production
			if ( defined( 'ALLOW_NON_STABLE_RELEASE_ON_LIVE_SITE' ) && ALLOW_NON_STABLE_RELEASE_ON_LIVE_SITE ) {
				return;
			}
			add_action( 'shutdown', array( $this, 'alpha_banner_warning_notice' ), 10 );
		}
	}



	/**
	 *    alpha_banner_admin_notice
	 *    displays admin notice that current version of EE is not a stable release
	 *
	 * @access public
	 * @return void
	 */
	public function alpha_banner_admin_notice() {
		EE_Error::add_attention(
			sprintf(
				__( 'This version of Event Espresso is for testing and/or evaluation purposes only. It is %1$snot%2$s considered a stable release and should therefore %1$snot%2$s be activated on a live or production website.', 'event_espresso' ),
				'<strong>',
				'</strong>'
			),
			__FILE__, __FUNCTION__, __LINE__
		);
	}



	/**
	 *    alpha_banner_warning_notice
	 *    displays message on frontend of site notifying admin that current version of EE is not a stable release
	 *
	 * @access public
	 * @return void
	 */
	public function alpha_banner_warning_notice() {
		printf(
			__( '%1$sThis version of Event Espresso is for testing and/or evaluation purposes only. It is %2$snot%3$s considered a stable release and should therefore %2$snot%3$s be activated on a live or production website.%4$s', 'event_espresso' ),
			'<div id="ee-release-candidate-notice-dv" class="ee-really-important-notice-dv"><p>',
			'<strong>',
			'</strong>',
			'</p></div>'
		);
	}


}
// End of file EE_Alpha_Banner_Warning.core.php
// Location: /core/middleware/EE_Alpha_Banner_Warning.core.php
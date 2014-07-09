<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EED_Recaptcha
 *
 * @package		Event Espresso
 * @subpackage	/modules/recaptcha/
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Recaptcha  extends EED_Module {



	/**
	 * @return EED_Recaptcha
	 */
	public static function instance() {
		return parent::get_instance( __CLASS__ );
	}



	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		if ( EE_Registry::instance()->CFG->registration->use_captcha ) {
			add_action( 'AHEE__before_spco_whats_next_buttons', array( 'EED_Recaptcha', 'display_recaptcha' ), 10, 2 );
			add_filter( 'FHEE__EED_Single_Page_Checkout__init___continue_reg', array( 'EED_Recaptcha', 'recaptcha_passed' ), 10 );
			add_filter( 'FHEE__EE_Single_Page_Checkout__JSON_response', array( 'EED_Recaptcha', 'recaptcha_response' ), 10, 1 );
		}
	}



	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		if ( EE_Registry::instance()->CFG->registration->use_captcha ) {
			add_filter( 'FHEE__EED_Single_Page_Checkout__init___continue_reg', array( 'EED_Recaptcha', 'recaptcha_passed' ), 10 );
			add_filter( 'FHEE__EE_Single_Page_Checkout__JSON_response', array( 'EED_Recaptcha', 'recaptcha_response' ), 10, 1 );
		}
	}





	/**
	 * 	run
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( $WP ) {}






	/**
	 * recaptcha_passed
	 *
	 * @access public
	 * @return boolean
	 */
	public static function recaptcha_passed() {
		// logged in means you have already passed a turing test of sorts
		if ( is_user_logged_in() ) {
			return TRUE;
		}
		// was test already passed?
		$recaptcha_passed = EE_Registry::instance()->SSN->get_session_data( 'recaptcha_passed' );
		// verify recaptcha
		if ( ! $recaptcha_passed && EE_Registry::instance()->REQ->is_set( 'recaptcha_response_field' )) {
			$recaptcha_passed = EED_Recaptcha::_process_recaptcha_response();
			EE_Registry::instance()->SSN->set_session_data( array( 'recaptcha_passed' => $recaptcha_passed ));
			EE_Registry::instance()->SSN->update();
		}
		return $recaptcha_passed;
	}





	/**
	 * recaptcha_response
	 *
	 * @access public
	 * @return boolean
	 */
	public static function recaptcha_response( $recaptcha_response = array() ) {
		// verify recaptcha
		$recaptcha_response['recaptcha_passed'] = EED_Recaptcha::recaptcha_passed() === TRUE ? TRUE : FALSE;
		return $recaptcha_response;
	}





	/**
	 * display_recaptcha
	 *
	 * @access public
	 * @return string html
	 */
	public static function display_recaptcha( $current_step, $next_step ) {
		// don't display if not using recaptcha or user is logged in
		if ( EE_Registry::instance()->CFG->registration->use_captcha && ! is_user_logged_in() ) {
			// verify library is loaded
			if ( ! function_exists( 'recaptcha_get_html' )) {
				// EE_Registry::instance()->load_file( EE_THIRD_PARTY . 'recaptchalib.php', '', '' );
				require_once( EE_THIRD_PARTY . 'recaptchalib.php' );
			}
			// only display if they have NOT passed the test yet
			if ( ! EED_Recaptcha::recaptcha_passed() ) {
?>
<script type="text/javascript">
/* <! [CDATA [ */
var RecaptchaOptions = { theme : "<?php echo EE_Registry::instance()->CFG->registration->recaptcha_theme;?>", lang : "<?php echo EE_Registry::instance()->CFG->registration->recaptcha_language;?>" };
/*  ] ]>  */
</script>
<p id="spco-captcha" class="reg-page-form-field-wrap-pg">
	<span><?php echo __('Anti-Spam Measure: Please enter the following phrase:', 'event_espresso');?></span>
	<?PHP echo recaptcha_get_html( EE_Registry::instance()->CFG->registration->recaptcha_publickey, NULL, is_ssl() ? TRUE : FALSE );?>
</p>
<?php
			}
		}
	}




	/**
	 * 	process_recaptcha
	 *
	 * 	@access private
	 * 	@return 	void
	 */
	private static function _process_recaptcha_response() {

		$response_data = array( 'error' => FALSE );
		// check recaptcha
		if ( EE_Registry::instance()->CFG->registration->use_captcha && ! is_user_logged_in() ) {
			if ( ! function_exists( 'recaptcha_check_answer' )) {
				require_once( EE_THIRD_PARTY . 'recaptchalib.php' );
			}
			$response = recaptcha_check_answer(
				EE_Registry::instance()->CFG->registration->recaptcha_privatekey,
				$_SERVER["REMOTE_ADDR"],
				EE_Registry::instance()->REQ->is_set( 'recaptcha_challenge_field' ) ? EE_Registry::instance()->REQ->get( 'recaptcha_challenge_field' ) : '',
				EE_Registry::instance()->REQ->is_set( 'recaptcha_response_field' ) ? EE_Registry::instance()->REQ->get( 'recaptcha_response_field' ) : ''
			);
			// ohhh soo sorry... it appears you can't read gibberish chicken scratches !!!
			if ( ! $response->is_valid ) {
				$response_data['success'] = FALSE;
				$response_data['recaptcha_reload'] = TRUE;
				$response_data['error'] = sprintf(
					__('Sorry, but you did not enter the correct anti-spam phrase.%sPlease try again with the new phrase that has been generated for you.', 'event_espresso'),
					'<br/>'
				);
				if ( EE_Registry::instance()->REQ->front_ajax ) {
					echo json_encode( $response_data );
					die();
				}
			}
		}
		if ( $response_data['error'] ) {
			EE_Error::add_error( $response_data['error'], __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		} else {
			return TRUE;
		}
	}







}
// End of file EED_Recaptcha.module.php
// Location: /modules/recaptcha/EED_Recaptcha.module.php
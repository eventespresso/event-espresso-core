<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * EED_Bot_Trap Class
 *
 * adds an email input (honeypot) to the ticket selector form submission
 * and also checks that the form is not being submitted either too fast or too slow
 * which can be an indication that the form was submitted by a bot
 *
 * @package 			Event Espresso
 * @subpackage 	/modules/bot_trap/
 * @author 				Brent Christensen
 */
class EED_Bot_Trap  extends EED_Module {


	const PLACEHOLDER_EMAIL_ADDY = 'a@b.com';


	/**
	 * @return EED_Bot_Trap
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
		if ( apply_filters( 'FHEE__EED_Bot_Trap__set_hooks__use_bot_trap', true ) ) {
			define( 'EE_BOT_TRAP_BASE_URL', plugin_dir_url( __FILE__ ) . DS );
			add_action( 'AHEE__ticket_selector_chart__template__after_ticket_selector', array( 'EED_Bot_Trap', 'generate_bot_trap' ), 10, 2 );
			add_action( 'EED_Ticket_Selector__process_ticket_selections__before', array( 'EED_Bot_Trap', 'process_bot_trap' ), 1, 2 );
			// redirect bots to bogus success page
			EE_Config::register_route( 'ticket_selection_received', 'EED_Bot_Trap', 'display_bot_trap_success' );
		}
	}



	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
	}



	/**
	 *    run - initial module setup
	 *
	 * @access    public
	 * @param    WP $WP
	 * @return    void
	 */
	public function run( $WP ) {}



	/**
	 * generate_bot_trap
	 *
	 * @access    public
	 * @return    void
	 */
	public static function generate_bot_trap() {
		EE_Registry::instance()->load_core( 'EE_Encryption' );
		$do_not_enter = __( 'please do not enter anything in this input', 'event_espresso' );
		$html = '<div id="tkt-slctr-request-processor-dv" style="float:left; margin-left:-999em;">';
		$html .= '<label for="tkt-slctr-request-processor-email">' . $do_not_enter  . '</label>';
		$html .= '<input type="email" name="tkt-slctr-request-processor-email" placeholder="' . $do_not_enter . '" value="' . EED_Bot_Trap::PLACEHOLDER_EMAIL_ADDY . '"/>';
		$html .= '<input type="hidden" name="tkt-slctr-request-processor-token" value="';
		$html .= EE_Encryption::instance()->encrypt( time() );
		$html .= '"/>';
		$html .= '</div>';
		echo $html;
	}



	/**
	 * process_bot_trap
	 *
	 * @access    public
	 * @return    void
	 */
	public static function process_bot_trap() {
		EE_Registry::instance()->load_core( 'EE_Encryption' );
		// what's your email address Mr. Bot ?
		$empty_trap = isset( $_REQUEST[ 'tkt-slctr-request-processor-email' ] ) && $_REQUEST[ 'tkt-slctr-request-processor-email' ] == EED_Bot_Trap::PLACEHOLDER_EMAIL_ADDY ? true : false;
		// get encrypted timestamp for when the form was originally displayed
		$bot_trap_timestamp = isset( $_REQUEST[ 'tkt-slctr-request-processor-token' ] ) ? sanitize_text_field( $_REQUEST[ 'tkt-slctr-request-processor-token' ] ) : '';
		// decrypt and convert to absolute  integer
		$bot_trap_timestamp = absint( EE_Encryption::instance()->decrypt( $bot_trap_timestamp ) );
		// ticket form submitted too impossibly fast ( less than a second ) or more than an hour later ???
		$suspicious_timing = $bot_trap_timestamp > ( time() - 1 ) || $bot_trap_timestamp < ( time() - HOUR_IN_SECONDS ) ? true : false;
		// are we human ?
		if ( $empty_trap && ! $suspicious_timing ) {
			return;
		}
		// UH OH...
		$redirect_url = add_query_arg(
			array( 'ee' => 'ticket_selection_received' ),
			EE_Registry::instance()->CFG->core->reg_page_url()
		);
		if ( $suspicious_timing ) {
			$redirect_url = add_query_arg(
				array( 'ee-notice' => urlencode( __( 'We\'re sorry, but your ticket selections could not be processed due to a server timing error. Please hit the back button on your browser and try again.', 'event_espresso' ) ) ),
				$redirect_url
			);
		}
		wp_safe_redirect(
			apply_filters( 'FHEE__EED_Bot_Trap__process_bot_trap__redirect_url', $redirect_url )
		);
		exit();
	}



	/**
	 * display_bot_trap_success
	 * shows a "success" screen to bots so that they (ie: the ppl managing them) think the form was submitted successfully
	 *
	 * @access    public
	 * @return    void
	 */
	public static function display_bot_trap_success() {
		EE_Registry::instance()->load_helper( 'HTML' );
		add_filter( 'FHEE__EED_Single_Page_Checkout__run', '__return_false' );
		$bot_notice = __( 'Thank you so much. Your ticket selections have been received for consideration.', 'event_espresso' );
		$bot_notice = isset( $_REQUEST[ 'ee-notice' ] ) && $_REQUEST[ 'ee-notice' ] !== '' ? sanitize_text_field( stripslashes( $_REQUEST[ 'ee-notice' ] ) ) : $bot_notice;
		EE_Registry::instance()->REQ->add_output( EEH_HTML::div( $bot_notice, '', 'ee-attention' ) );
	}


}
// End of file EED_Bot_Trap.module.php
// Location: /modules/bot_trap/EED_Bot_Trap.module.php
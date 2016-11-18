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
	 * @type bool $_not_a_robot
	 */
	private static $_not_a_robot;



	/**
	 * @type string $_recaptcha_response
	 */
	private static $_recaptcha_response;



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
		// use_captcha ?
		if (
			EE_Registry::instance()->CFG->registration->use_captcha
			&& ! (
				EE_Registry::instance()->REQ->get( 'step', '' ) === 'payment_options'
				&& (boolean) EE_Registry::instance()->REQ->get( 'revisit', false ) === true
			)
		) {
			EED_Recaptcha::set_definitions();
			EED_Recaptcha::enqueue_styles_and_scripts();
			add_action( 'wp', array( 'EED_Recaptcha', 'set_late_hooks' ), 1, 0 );
			add_action(
				'AHEE__before_spco_whats_next_buttons',
				array( 'EED_Recaptcha', 'display_recaptcha' ), 10, 0
			);
			add_filter(
				'FHEE__EED_Single_Page_Checkout__init___continue_reg',
				array( 'EED_Recaptcha', 'not_a_robot' ), 10
			);
			add_filter(
				'FHEE__EE_SPCO_Reg_Step__set_completed___completed',
				array( 'EED_Recaptcha', 'not_a_robot' ), 10
			);
			add_filter(
				'FHEE__EE_SPCO_JSON_Response___toString__JSON_response',
				array( 'EED_Recaptcha', 'recaptcha_response' ), 10, 1
			);
			add_filter(
				'FHEE__EED_Recaptcha___bypass_recaptcha__bypass_request_params_array',
				array( 'EED_Recaptcha', 'bypass_recaptcha_for_spco_load_payment_method' ), 10, 1
			);
		}
	}



	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		EED_Recaptcha::set_definitions();
		// use_captcha ?
		if (
			EE_Registry::instance()->CFG->registration->use_captcha
            && EE_Registry::instance()->REQ->get( 'step', '' ) !== ''
            && ! (
				EE_Registry::instance()->REQ->get( 'step', '' ) === 'payment_options'
				&& (boolean) EE_Registry::instance()->REQ->get( 'revisit', false ) === true
			)
		) {
			EED_Recaptcha::enqueue_styles_and_scripts();
			add_filter( 'FHEE__EED_Single_Page_Checkout__init___continue_reg', array( 'EED_Recaptcha', 'not_a_robot' ), 10 );
			add_filter( 'FHEE__EE_SPCO_Reg_Step__set_completed___completed', array( 'EED_Recaptcha', 'not_a_robot' ), 10 );
			add_filter( 'FHEE__EE_SPCO_JSON_Response___toString__JSON_response', array( 'EED_Recaptcha', 'recaptcha_response' ), 10, 1 );
		}
		// admin settings
		add_action( 'AHEE__Extend_Registration_Form_Admin_Page___reg_form_settings_template', array( 'EED_Recaptcha', 'admin_settings' ), 10, 1 );
		add_filter( 'FHEE__Extend_Registration_Form_Admin_Page___update_reg_form_settings__CFG_registration', array( 'EED_Recaptcha', 'update_admin_settings' ), 10, 1 );
	}



	/**
	 * 	set_definitions
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_definitions() {
		if ( is_user_logged_in() ) {
			EED_Recaptcha::$_not_a_robot = true;
		}
		define( 'RECAPTCHA_BASE_PATH', rtrim( str_replace( array( '\\', '/' ), DS, plugin_dir_path( __FILE__ )), DS ) . DS );
		define( 'RECAPTCHA_BASE_URL', plugin_dir_url( __FILE__ ));
	}



	/**
	 * set_late_hooks
	 *
	 * @access    public
	 * @return    void
	 */
	public static function set_late_hooks() {
		add_filter(
			'FHEE__Single_Page_Checkout__translate_js_strings__ajax_submit',
			array( 'EED_Recaptcha', 'not_a_robot' )
		);
	}



	/**
	 * 	enqueue_styles_and_scripts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function enqueue_styles_and_scripts() {
		wp_register_script( 'espresso_recaptcha', RECAPTCHA_BASE_URL . 'scripts' . DS . 'espresso_recaptcha.js', array( 'single_page_checkout' ), EVENT_ESPRESSO_VERSION, TRUE );
		wp_register_script( 'google_recaptcha', 'https://www.google.com/recaptcha/api.js?hl=' . EE_Registry::instance()->CFG->registration->recaptcha_language, array( 'espresso_recaptcha' ), EVENT_ESPRESSO_VERSION, TRUE );
		EE_Registry::$i18n_js_strings['no_SPCO_error'] = __( 'It appears the Single Page Checkout javascript was not loaded properly! Please refresh the page and try again or contact support.', 'event_espresso' );
		EE_Registry::$i18n_js_strings['no_recaptcha_error'] = __( 'There appears to be a problem with the reCAPTCHA configuration! Please check the admin settings or contact support.', 'event_espresso' );
		EE_Registry::$i18n_js_strings['recaptcha_fail'] = __( 'Please complete the anti-spam test before proceeding.', 'event_espresso' );
	}



	/**
	 *    run
	 *
	 * @access    public
	 * @param \WP $WP
	 */
	public function run( $WP ) {
	}



	/**
	 * not_a_robot
	 *  @return boolean
	 */
	public static function not_a_robot() {
		$not_a_robot = is_bool( EED_Recaptcha::$_not_a_robot ) ? EED_Recaptcha::$_not_a_robot :
			EED_Recaptcha::recaptcha_passed();
		return $not_a_robot;
	}





	/**
	 * display_recaptcha
	 *
	 * @access public
	 * @return void
	 */
	public static function display_recaptcha() {
		// logged in means you have already passed a turing test of sorts
		if ( is_user_logged_in() ) {
			return;
		}
		// don't display if not using recaptcha or user is logged in
		if ( EE_Registry::instance()->CFG->registration->use_captcha ) {
			// only display if they have NOT passed the test yet
			if ( ! EED_Recaptcha::$_not_a_robot ) {
				EEH_Template::display_template(
					RECAPTCHA_BASE_PATH . DS . 'templates' . DS . 'recaptcha.template.php',
					array(
						'recaptcha_publickey' 	=> EE_Registry::instance()->CFG->registration->recaptcha_publickey,
						'recaptcha_theme' 		=> EE_Registry::instance()->CFG->registration->recaptcha_theme,
						'recaptcha_type' 			=> EE_Registry::instance()->CFG->registration->recaptcha_type
					)
				);
				wp_enqueue_script( 'google_recaptcha' );
			}
		}
	}



	/**
	 * bypass_recaptcha_for_spco_load_payment_method
	 *
	 * @access public
	 * @return string
	 */
	public static function bypass_recaptcha_for_spco_load_payment_method() {
		return array(
			'EESID' 		=> EE_Registry::instance()->SSN->id(),
			'step' 		=> 'payment_options',
			'action' 	=> 'switch_spco_billing_form'
		);
	}



	/**
	 * recaptcha_passed
	 *
	 * @access public
	 * @return boolean
	 */
	public static function recaptcha_passed() {
		// logged in means you have already passed a turing test of sorts
		if ( is_user_logged_in() || EED_Recaptcha::_bypass_recaptcha() ) {
			return TRUE;
		}
		// was test already passed?
		$recaptcha_passed = EE_Registry::instance()->SSN->get_session_data( 'recaptcha_passed' );
		$recaptcha_passed = filter_var( $recaptcha_passed, FILTER_VALIDATE_BOOLEAN );
		// verify recaptcha
		EED_Recaptcha::_get_recaptcha_response();
		if ( ! $recaptcha_passed && EED_Recaptcha::$_recaptcha_response ) {
			$recaptcha_passed = EED_Recaptcha::_process_recaptcha_response();
			EE_Registry::instance()->SSN->set_session_data( array( 'recaptcha_passed' => $recaptcha_passed ));
		}
		EED_Recaptcha::$_not_a_robot = $recaptcha_passed;
		return $recaptcha_passed;
	}



	/**
	 * recaptcha_response
	 *
	 * @access public
	 * @param array $recaptcha_response
	 * @return boolean
	 */
	public static function recaptcha_response( $recaptcha_response = array() ) {
		if ( EED_Recaptcha::_bypass_recaptcha() ) {
			$recaptcha_response['bypass_recaptcha'] = TRUE;
			$recaptcha_response['recaptcha_passed'] = TRUE;
		} else {
			$recaptcha_response['recaptcha_passed'] = EED_Recaptcha::$_not_a_robot;
		}
		return $recaptcha_response;
	}




	/**
	 * 	_bypass_recaptcha
	 *
	 * 	@access private
	 * 	@return 	boolean
	 */
	private static function _bypass_recaptcha() {
		// an array of key value pairs that must match exactly with the incoming request, in order to bypass recaptcha for the current request ONLY
		$bypass_request_params_array = apply_filters( 'FHEE__EED_Recaptcha___bypass_recaptcha__bypass_request_params_array', array() );
		// does $bypass_request_params_array have any values ?
		if ( empty( $bypass_request_params_array )) {
			return FALSE;
		}
		// initially set bypass to TRUE
		$bypass_recaptcha = TRUE;
		foreach ( $bypass_request_params_array as $key => $value ) {
			// if $key is not found or value doesn't match exactly, then toggle bypass to FALSE, otherwise carry over it's value. This way, one missed setting results in no bypass
			$bypass_recaptcha = isset( $_REQUEST[ $key ] ) && $_REQUEST[ $key ] === $value ? $bypass_recaptcha : FALSE;
		}
		return $bypass_recaptcha;
	}




	/**
	 * 	process_recaptcha
	 *
	 * 	@access private
	 * 	@return 	boolean
	 */
	private static function _get_recaptcha_response() {
		EED_Recaptcha::$_recaptcha_response = EE_Registry::instance()->REQ->get( 'g-recaptcha-response', false );
	}




	/**
	 * 	process_recaptcha
	 *
	 * 	@access private
	 * 	@return 	boolean
	 */
	private static function _process_recaptcha_response() {
		// verify library is loaded
		if ( ! class_exists( '\\ReCaptcha\\ReCaptcha' )) {
			require_once( RECAPTCHA_BASE_PATH . DS . 'autoload.php' );
		}
		// The response from reCAPTCHA
		EED_Recaptcha::_get_recaptcha_response();
		$recaptcha_response = EED_Recaptcha::$_recaptcha_response;
		// Was there a reCAPTCHA response?
		if ( $recaptcha_response ) {
			// if allow_url_fopen is Off, then set a different request method
			$request_method = ! ini_get( 'allow_url_fopen' ) ? new \ReCaptcha\RequestMethod\SocketPost() : null;
			$recaptcha = new \ReCaptcha\ReCaptcha(
				EE_Registry::instance()->CFG->registration->recaptcha_privatekey,
				$request_method
			);
			$recaptcha_response = $recaptcha->verify(
				EED_Recaptcha::$_recaptcha_response,
				$_SERVER[ 'REMOTE_ADDR' ]
			);
		}
		if ( $recaptcha_response instanceof \ReCaptcha\Response && $recaptcha_response->isSuccess() ) {
			return TRUE;
		}
		// sorry... it appears you can't don't know what soup or hamburgers are !!!
		return FALSE;
	}





	/***************************************		reCAPTCHA ADMIN SETTINGS 		***************************************/



	/**
	 * admin_settings
	 *
	 * @access public
	 * @return array
	 */
	public static function admin_settings() {
		echo EED_Recaptcha::_recaptcha_settings_form()->get_html_and_js();
	}



	/**
	 * _recaptcha_main_settings
	 *
	 * @access protected
	 * @return EE_Form_Section_Proper
	 */
	protected static function _recaptcha_settings_form() {


		return new EE_Form_Section_Proper(
			array(
				'name' 					=> 'recaptcha_settings_form',
				'html_id' 					=> 'recaptcha_settings_form',
				'layout_strategy'		=> new EE_Div_Per_Section_Layout(),
				'subsections' 			=> apply_filters(
					'FHEE__EED_Recaptcha___recaptcha_settings_form__form_subsections',
					array(
						'main_settings_hdr' 				=> new EE_Form_Section_HTML( EEH_HTML::h2( __( 'reCAPTCHA Anti-spam Settings', 'event_espresso' ) . EEH_Template::get_help_tab_link( 'recaptcha_info' ))),
						'main_settings' 						=> EED_Recaptcha::_recaptcha_main_settings(),
						'appearance_settings_hdr' 	=> new EE_Form_Section_HTML( EEH_HTML::h2( __( 'reCAPTCHA Appearance', 'event_espresso' ) )),
						'appearance_settings' 			=> EED_Recaptcha::_recaptcha_appearance_settings(),
						// 'recaptcha_example' 				=> new EE_Form_Section_HTML( EED_Recaptcha::display_recaptcha() ),
						'required_fields_note' 			=> new EE_Form_Section_HTML( EEH_HTML::p( __( 'All fields marked with a * are required fields', 'event_espresso' ), '', 'grey-text' ))
					)
				)
			)
		);
	}



	/**
	 * _recaptcha_main_settings
	 *
	 * @access protected
	 * @return EE_Form_Section_Proper
	 */
	protected static function _recaptcha_main_settings() {
		return new EE_Form_Section_Proper(
			array(
				'name' 					=> 'recaptcha_settings_tbl',
				'html_id' 					=> 'recaptcha_settings_tbl',
				'html_class' 			=> 'form-table',
				'layout_strategy'		=> new EE_Admin_Two_Column_Layout(),
				'subsections' 			=> apply_filters(
					'FHEE__EED_Recaptcha___recaptcha_main_settings__form_subsections',
					array(
						'use_captcha' 				=> new EE_Yes_No_Input(
							array(
								'html_label_text'	 	=> __( 'Use reCAPTCHA', 'event_espresso' ),
								'html_help_text' 		=> sprintf(
									__( 'reCAPTCHA is a free service that  protects your website from spam and abuse. It employs advanced risk analysis technology to separate humans from abusive actors. Sign up %1$shere%2$s to receive your Public and Private keys.', 'event_espresso' ),
									'<a href="https://www.google.com/recaptcha/intro/index.html">',
									'</a>'
								),
								'default' 								=> isset( EE_Registry::instance()->CFG->registration->use_captcha ) ? EE_Registry::instance()->CFG->registration->use_captcha : FALSE,
								'display_html_label_text' 	=> FALSE
							)
						),
						'recaptcha_publickey' 		=> new EE_Text_Input(
							array(
								'html_label_text'	 	=> __( 'Site Key', 'event_espresso' ),
								'html_help_text' 		=> __( 'The site key is used to display the widget on your site.', 'event_espresso' ),
								'default' 					=> isset( EE_Registry::instance()->CFG->registration->recaptcha_publickey ) ? stripslashes( EE_Registry::instance()->CFG->registration->recaptcha_publickey ) : ''
							)
						),
						'recaptcha_privatekey' 		=> new EE_Text_Input(
							array(
								'html_label_text'	 	=> __( 'Secret Key', 'event_espresso' ),
								'html_help_text' 		=> __( 'The secret key authorizes communication between your application backend and the reCAPTCHA server to verify the user\'s response. The secret key needs to be kept safe for security purposes.', 'event_espresso' ),
								'default' 					=> isset( EE_Registry::instance()->CFG->registration->recaptcha_privatekey ) ? stripslashes( EE_Registry::instance()->CFG->registration->recaptcha_privatekey ) : ''
							)
						)
					)
				)
			)
		);
	}






	/**
	 * _recaptcha_appearance_settings
	 *
	 * @access protected
	 * @return EE_Form_Section_Proper
	 */
	protected static function _recaptcha_appearance_settings() {
		return new EE_Form_Section_Proper(
			array(
				'name' 					=> 'recaptcha_appearance_settings_tbl',
				'html_id' 					=> 'recaptcha_appearance_settings_tbl',
				'html_class' 			=> 'form-table',
				'layout_strategy'		=> new EE_Admin_Two_Column_Layout(),
				'subsections' 			=> apply_filters(
					'FHEE__EED_Recaptcha___recaptcha_appearance_settings__form_subsections',
					array(
						'recaptcha_theme' 		=> new EE_Radio_Button_Input(
							array(
								'light' => __( 'Light', 'event_espresso' ),
								'dark' => __( 'Dark', 'event_espresso' )
							),
							array(
								'html_label_text'	 	=> __( 'Theme', 'event_espresso' ),
								'html_help_text' 		=> __( 'The color theme of the widget.', 'event_espresso' ),
								'default' 					=> isset( EE_Registry::instance()->CFG->registration->recaptcha_theme ) ? EE_Registry::instance()->CFG->registration->recaptcha_theme : 'light',
								'display_html_label_text' => FALSE
							)
						),
						'recaptcha_type' 		=> new EE_Radio_Button_Input(
							array(
								'image' => __( 'Image', 'event_espresso' ),
								'audio' => __( 'Audio', 'event_espresso' )
							),
							array(
								'html_label_text'	 	=> __( 'Type', 'event_espresso' ),
								'html_help_text' 		=> __( 'The type of CAPTCHA to serve.', 'event_espresso' ),
								'default' 					=> isset( EE_Registry::instance()->CFG->registration->recaptcha_type ) ? EE_Registry::instance()->CFG->registration->recaptcha_type : 'image',
								'display_html_label_text' =>FALSE
							)
						),
						'recaptcha_language' 		=> new EE_Select_Input(
							array(
								 'ar' 			=> __( 'Arabic', 'event_espresso' ),
								 'bg' 		=> __( 'Bulgarian', 'event_espresso' ),
								 'ca' 			=> __( 'Catalan', 'event_espresso' ),
								 'zh-CN' 	=>  __( 'Chinese (Simplified)', 'event_espresso' ),
								 'zh-TW' 	=>  __( 'Chinese (Traditional)	', 'event_espresso' ),
								 'hr' 			=> __( 'Croatian', 'event_espresso' ),
								 'cs' 			=> __( 'Czech', 'event_espresso' ),
								 'da' 			=> __( 'Danish', 'event_espresso' ),
								 'nl' 			=> __( 'Dutch', 'event_espresso' ),
								 'en-GB' 	=>  __( 'English (UK)', 'event_espresso' ),
								 'en' 			=> __( 'English (US)', 'event_espresso' ),
								 'fil' 			=> __( 'Filipino', 'event_espresso' ),
								 'fi' 			=> __( 'Finnish', 'event_espresso' ),
								 'fr' 			=> __( 'French', 'event_espresso' ),
								 'fr-CA' 	=>  __( 'French (Canadian)', 'event_espresso' ),
								 'de' 			=> __( 'German', 'event_espresso' ),
								 'de-AT' 	=>  __( 'German (Austria)', 'event_espresso' ),
								 'de-CH' 	=>  __( 'German (Switzerland)', 'event_espresso' ),
								 'el' 			=> __( 'Greek', 'event_espresso' ),
								 'iw' 			=> __( 'Hebrew', 'event_espresso' ),
								 'hi' 			=> __( 'Hindi', 'event_espresso' ),
								 'hu' 		=> __( 'Hungarian', 'event_espresso' ),
								 'id' 			=> __( 'Indonesian', 'event_espresso' ),
								 'it' 			=> __( 'Italian', 'event_espresso' ),
								 'ja' 			=> __( 'Japanese', 'event_espresso' ),
								 'ko' 			=> __( 'Korean', 'event_espresso' ),
								 'lv' 			=> __( 'Latvian', 'event_espresso' ),
								 'lt' 			=> __( 'Lithuanian', 'event_espresso' ),
								 'no' 		=> __( 'Norwegian', 'event_espresso' ),
								 'fa' 			=> __( 'Persian', 'event_espresso' ),
								 'pl' 			=> __( 'Polish', 'event_espresso' ),
								 'pt' 			=> __( 'Portuguese', 'event_espresso' ),
								 'pt-BR' 	=>  __( 'Portuguese (Brazil)', 'event_espresso' ),
								 'pt-PT' 	=>  __( 'Portuguese (Portugal)', 'event_espresso' ),
								 'ro' 			=> __( 'Romanian', 'event_espresso' ),
								 'ru' 			=> __( 'Russian', 'event_espresso' ),
								 'sr' 			=> __( 'Serbian', 'event_espresso' ),
								 'sk' 			=> __( 'Slovak', 'event_espresso' ),
								 'sl' 			=> __( 'Slovenian', 'event_espresso' ),
								 'es' 			=> __( 'Spanish', 'event_espresso' ),
								 'es-419' 	=>  __( 'Spanish (Latin America)', 'event_espresso' ),
								 'sv' 			=> __( 'Swedish', 'event_espresso' ),
								 'th' 			=> __( 'Thai', 'event_espresso' ),
								 'tr' 			=> __( 'Turkish', 'event_espresso' ),
								 'uk' 			=> __( 'Ukrainian', 'event_espresso' ),
								 'vi' 			=> __( 'Vietnamese', 'event_espresso')
							),
							array(
								'html_label_text'	 	=> __( 'Language', 'event_espresso' ),
								'html_help_text' 		=> __( 'Forces the widget to render in a specific language.', 'event_espresso' ),
								'default' 					=> isset( EE_Registry::instance()->CFG->registration->recaptcha_language ) ? EE_Registry::instance()->CFG->registration->recaptcha_language : 'en'
							)
						)
					)
				)
			)
		);
	}





	/**
	 * _recaptcha_example
	 *
	 * @access protected
	 * @return EE_Form_Section_Proper
	 */
	protected static function _recaptcha_example() {
		//		 if ( !empty( $recaptcha_example ) ) { ?>
		<!--		-->
		<!--			<h2 class="ee-admin-settings-hdr admin-recaptcha-settings-hdr">-->
		<!--				--><?php //_e('reCAPTCHA Example', 'event_espresso'); ?>
		<!--			</h2>-->
		<!--			<p class="description">--><?php //_e('A reCAPTCHA displaying here means that you have a valid public key entered for the reCAPTCHA settings and this is how the reCAPTCHA will look with the currently set appearance settings.  If you do not see a reCAPTCHA then please doublecheck the key you entered for a public key.', 'event_espresso'); ?><!--</p>-->
		<!--			<table class="form-table">-->
		<!--				<tbody>-->
		<!--		-->
		<!--					<tr class="admin-recaptcha-settings-tr">-->
		<!--						<td>-->
		<!--							--><?php //echo $recaptcha_example; ?>
		<!--						</td>-->
		<!--					</tr>-->
		<!--		-->
		<!--				</tbody>-->
		<!--			</table>-->
		<!--		--><?php //}
	}


	/**
	 * admin_settings_template
	 *
	 * @access public
	 * @param EE_Registration_Config $EE_Registration_Config
	 * @return array
	 */
	public static function update_admin_settings( EE_Registration_Config $EE_Registration_Config ) {
		try {
			$recaptcha_settings_form = EED_Recaptcha::_recaptcha_settings_form();
			// if not displaying a form, then check for form submission
			if ( $recaptcha_settings_form->was_submitted() ) {
				// capture form data
				$recaptcha_settings_form->receive_form_submission();
				// validate form data
				if ( $recaptcha_settings_form->is_valid() ) {
					// grab validated data from form
					$valid_data = $recaptcha_settings_form->valid_data();
					// user proofing recaptcha:  If Use reCAPTCHA is set to yes but we dont' have site or secret keys then set Use reCAPTCHA to FALSE and give error message.
					if (
						apply_filters( 'FHEE__Extend_Registration_Form_Admin_Page__check_for_recaptcha_keys', TRUE, $EE_Registration_Config )
						&& $valid_data['main_settings']['use_captcha']
						&& ( ! $EE_Registration_Config->use_captcha && ( empty( $valid_data['main_settings']['recaptcha_publickey'] ) || empty( $valid_data['main_settings']['recaptcha_privatekey'] )))
					) {
						$valid_data['main_settings']['use_captcha'] = FALSE;
						EE_Error::add_error( __('The use reCAPTCHA setting has been reset to "no". In order to enable the reCAPTCHA service, you must enter a Site Key and Secret Key.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
					}
					$EE_Registration_Config->use_captcha = $valid_data['main_settings']['use_captcha'];
					$EE_Registration_Config->recaptcha_publickey = $valid_data['main_settings']['recaptcha_publickey'];
					$EE_Registration_Config->recaptcha_privatekey = $valid_data['main_settings']['recaptcha_privatekey'];
					$EE_Registration_Config->recaptcha_type = $valid_data['appearance_settings']['recaptcha_type'];
					$EE_Registration_Config->recaptcha_theme = $valid_data['appearance_settings']['recaptcha_theme'];
					$EE_Registration_Config->recaptcha_language = $valid_data['appearance_settings']['recaptcha_language'];
				} else {
					if ( $recaptcha_settings_form->submission_error_message() != '' ) {
						EE_Error::add_error( $recaptcha_settings_form->submission_error_message(), __FILE__, __FUNCTION__, __LINE__ );
					}
				}
			}
		} catch( EE_Error $e ) {
			$e->get_error();
		}

//		d( $EE_Registration_Config );
//		die();
		return $EE_Registration_Config;
	}


}
// End of file EED_Recaptcha.module.php
// Location: /modules/recaptcha/EED_Recaptcha.module.php

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
		define( 'RECAPTCHA_BASE_PATH', rtrim( str_replace( array( '\\', '/' ), DS, plugin_dir_path( __FILE__ )), DS ) . DS );
		if ( EE_Registry::instance()->CFG->registration->use_captcha ) {
			add_action( 'AHEE__before_spco_whats_next_buttons', array( 'EED_Recaptcha', 'display_recaptcha' ), 10, 0 );
			add_filter( 'FHEE__EED_Single_Page_Checkout__init___continue_reg', array( 'EED_Recaptcha', 'recaptcha_passed' ), 10 );
			add_filter( 'FHEE__EE_SPCO_JSON_Response___toString__JSON_response', array( 'EED_Recaptcha', 'recaptcha_response' ), 10, 1 );
		}
	}



	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		define( 'RECAPTCHA_BASE_PATH', rtrim( str_replace( array( '\\', '/' ), DS, plugin_dir_path( __FILE__ )), DS ) . DS );
		if ( EE_Registry::instance()->CFG->registration->use_captcha ) {
			add_filter( 'FHEE__EED_Single_Page_Checkout__init___continue_reg', array( 'EED_Recaptcha', 'recaptcha_passed' ), 10 );
			add_filter( 'FHEE__EE_SPCO_JSON_Response___toString__JSON_response', array( 'EED_Recaptcha', 'recaptcha_response' ), 10, 1 );
		}
//		add_filter( 'FHEE__Extend_Registration_Form_Admin_Page___reg_form_settings___template_args', array( 'EED_Recaptcha', 'admin_settings' ), 10, 1 );
		add_action( 'AHEE__Extend_Registration_Form_Admin_Page___reg_form_settings_template', array( 'EED_Recaptcha', 'admin_settings' ), 10, 1 );
		add_filter( 'FHEE__Extend_Registration_Form_Admin_Page___update_reg_form_settings__CFG_registration', array( 'EED_Recaptcha', 'update_admin_settings' ), 10, 1 );
	}





	/**
	 * 	run
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( $WP ) {}





	/**
	 * display_recaptcha
	 *
	 * @access public
	 * @return string html
	 */
	public static function display_recaptcha() {
		// don't display if not using recaptcha or user is logged in
		if ( EE_Registry::instance()->CFG->registration->use_captcha /*&& ! is_user_logged_in()*/ ) {
			// only display if they have NOT passed the test yet
			if ( ! EED_Recaptcha::recaptcha_passed() ) {
				EE_Registry::instance()->load_helper( 'Template' );
				EEH_Template::display_template(
					RECAPTCHA_BASE_PATH . DS . 'templates' . DS . 'recaptcha.template.php',
					array(
						'recaptcha_language' 	=> EE_Registry::instance()->CFG->registration->recaptcha_language,
						'recaptcha_site_key' 		=> EE_Registry::instance()->CFG->registration->recaptcha_site_key,
						'recaptcha_theme' 		=> EE_Registry::instance()->CFG->registration->recaptcha_theme,
						'recaptcha_type' 			=> EE_Registry::instance()->CFG->registration->recaptcha_type
					)
				);
			}
		}
	}






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
		if ( ! $recaptcha_passed && EE_Registry::instance()->REQ->is_set( 'g-recaptcha-response' )) {
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
	 * @param array $recaptcha_response
	 * @return boolean
	 */
	public static function recaptcha_response( $recaptcha_response = array() ) {
		// verify recaptcha
		$recaptcha_response['recaptcha_passed'] = filter_var( EED_Recaptcha::recaptcha_passed(), FILTER_VALIDATE_BOOLEAN );
		return $recaptcha_response;
	}




	/**
	 * 	process_recaptcha
	 *
	 * 	@access private
	 * 	@return 	boolean
	 */
	private static function _process_recaptcha_response() {

		$response_data = array( 'error' => FALSE );
		// check recaptcha
		if ( EE_Registry::instance()->CFG->registration->use_captcha && ! is_user_logged_in() ) {
			// verify library is loaded
			if ( ! class_exists( 'ReCaptcha' )) {
				require_once( EE_THIRD_PARTY . 'recaptchalib.php' );
			}
			// The response from reCAPTCHA
			$response = null;
			// The error code from reCAPTCHA, if any
			$error = null;
			$recaptcha_response = EE_Registry::instance()->REQ->get( 'g-recaptcha-response', FALSE );
			// Was there a reCAPTCHA response?
			if ( $recaptcha_response ) {
				$reCaptcha = new ReCaptcha( EE_Registry::instance()->CFG->registration->recaptcha_secret_key );
				$response = $reCaptcha->verifyResponse(
					$_SERVER['REMOTE_ADDR'],
					EE_Registry::instance()->REQ->get( 'g-recaptcha-response' )
				);
			}
			//printr( $response, '$response  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			// sorry... it appears you can't read gibberish chicken scratches !!!
			if ( ! $response instanceof ReCaptchaResponse || ! $response->success ) {
				$response_data['success'] = FALSE;
				$response_data['recaptcha_reload'] = TRUE;
				$response_data['error'] = sprintf(
					__('Sorry, but you did not enter the correct anti-spam phrase.%sPlease try again with the new phrase that has been generated for you.', 'event_espresso'),
					'<br/>'
				);
//				if ( EE_Registry::instance()->REQ->front_ajax ) {
//					echo json_encode( $response_data );
//					die();
//				}
			}
		}
		if ( $response_data['error'] ) {
			EE_Error::add_error( $response_data['error'], __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		} else {
			return TRUE;
		}
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

		EE_Registry::instance()->load_helper( 'HTML' );
		EE_Registry::instance()->load_helper( 'Template' );

		return new EE_Form_Section_Proper(
			array(
				'name' 					=> 'recaptcha_settings_form',
				'html_id' 					=> 'recaptcha_settings_form',
				'layout_strategy'		=> new EE_Div_Per_Section_Layout(),
				'subsections' 			=> array(
					'main_settings_hdr' 				=> new EE_Form_Section_HTML( EEH_HTML::h3( __( 'reCAPTCHA Anti-spam Settings', 'event_espresso' ) . EEH_Template::get_help_tab_link( 'recaptcha_info' ))),
					'main_settings' 						=> EED_Recaptcha::_recaptcha_main_settings(),
					'appearance_settings_hdr' 	=> new EE_Form_Section_HTML( EEH_HTML::h3( __( 'reCAPTCHA Appearance', 'event_espresso' ) )),
					'appearance_settings' 			=> EED_Recaptcha::_recaptcha_appearance_settings(),
					'recaptcha_example' 				=> EED_Recaptcha::_recaptcha_example(),
					'required_fields_note' 			=> new EE_Form_Section_HTML( EEH_HTML::p( __( 'All fields marked with a * are required fields', 'event_espresso' ), '', 'grey-text' ))
				),
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
				'subsections' 			=> array(
					'use_captcha' 				=> new EE_Radio_Button_Input(
						array(
							TRUE => __( 'Yes', 'event_espresso' ),
							FALSE => __( 'No', 'event_espresso' )
						),
						array(
							'html_label_text'	 	=> __( 'Use reCAPTCHA', 'event_espresso' ),
							'html_help_text' 		=> sprintf(
								__( 'reCAPTCHA is a free service that  protects your website from spam and abuse. It employs advanced risk analysis technology to separate humans from abusive actors. Sign up %1$shere%2$s to receive your Public and Private keys.', 'event_espresso' ),
								'<a href="https://www.google.com/recaptcha/intro/index.html">',
								'</a>'
							),
							'default' 								=> isset( EE_Registry::instance()->CFG->registration->use_captcha ) ? EE_Registry::instance()->CFG->registration->use_captcha : FALSE,
							'display_html_label_text' 	=> FALSE,
//							'normalization_strategy' 	=> new EE_Int_Normalization()
						)
					),
					'recaptcha_site_key' 		=> new EE_Text_Input(
						array(
							'html_label_text'	 	=> __( 'Site Key', 'event_espresso' ),
							'html_help_text' 		=> __( 'The site key is used to display the widget on your site.', 'event_espresso' ),
							'required' 				=> TRUE,
							'default' 					=> isset( EE_Registry::instance()->CFG->registration->recaptcha_site_key ) ? stripslashes( EE_Registry::instance()->CFG->registration->recaptcha_site_key ) : ''
						)
					),
					'recaptcha_secret_key' 		=> new EE_Text_Input(
						array(
							'html_label_text'	 	=> __( 'Secret Key', 'event_espresso' ),
							'html_help_text' 		=> __( 'The secret key authorizes communication between your application backend and the reCAPTCHA server to verify the user\'s response. The secret key needs to be kept safe for security purposes.', 'event_espresso' ),
							'required' 				=> TRUE,
							'default' 					=> isset( EE_Registry::instance()->CFG->registration->recaptcha_secret_key ) ? stripslashes( EE_Registry::instance()->CFG->registration->recaptcha_secret_key ) : ''
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
				'subsections' 			=> array(
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
					),
				),
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
		<!--			<h4 class="ee-admin-settings-hdr admin-recaptcha-settings-hdr">-->
		<!--				--><?php //_e('reCAPTCHA Example', 'event_espresso'); ?>
		<!--			</h4>-->
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
						apply_filters( 'FHEE__Extend_Registration_Form_Admin_Page__check_for_recaptcha_keys', $EE_Registration_Config->use_captcha )
						&& $valid_data['main_settings']['use_captcha']
						&& ( ! $EE_Registration_Config->use_captcha && ( empty( $valid_data['main_settings']['recaptcha_site_key'] ) || empty( $valid_data['main_settings']['recaptcha_secret_key'] )))
					) {
						$valid_data['main_settings']['use_captcha'] = FALSE;
						EE_Error::add_error( __('The use reCAPTCHA setting has been reset to "no". In order to enable the reCAPTCHA service, you must enter a Site Key and Secret Key.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
					}
					$EE_Registration_Config->use_captcha = $valid_data['main_settings']['use_captcha'];
					$EE_Registration_Config->recaptcha_site_key = $valid_data['main_settings']['recaptcha_site_key'];
					$EE_Registration_Config->recaptcha_secret_key = $valid_data['main_settings']['recaptcha_secret_key'];
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
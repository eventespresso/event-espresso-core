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
	 * @param array $recaptcha_response
	 * @return boolean
	 */
	public static function recaptcha_response( $recaptcha_response = array() ) {
		// verify recaptcha
		$recaptcha_response['recaptcha_passed'] = filter_var( EED_Recaptcha::recaptcha_passed(), FILTER_VALIDATE_BOOLEAN );
		return $recaptcha_response;
	}





	/**
	 * display_recaptcha
	 *
	 * @access public
	 * @return string html
	 */
	public static function display_recaptcha() {
		// don't display if not using recaptcha or user is logged in
		if ( EE_Registry::instance()->CFG->registration->use_captcha && ! is_user_logged_in() ) {
			// verify library is loaded
//			if ( ! function_exists( 'recaptcha_get_html' )) {
//				// EE_Registry::instance()->load_file( EE_THIRD_PARTY . 'recaptchalib.php', '', '' );
//				require_once( EE_THIRD_PARTY . 'recaptchalib.php' );
//			}
			// only display if they have NOT passed the test yet
			if ( ! EED_Recaptcha::recaptcha_passed() ) {
				echo '<script src="https://www.google.com/recaptcha/api.js" async defer></script>';
				echo '<div class="g-recaptcha" data-sitekey="' . EE_Registry::instance()->CFG->registration->recaptcha_site_key . '"></div>';

?>

<script type="text/javascript">
/* <! [CDATA [ */
var RecaptchaOptions = { theme : "<?php echo EE_Registry::instance()->CFG->registration->recaptcha_theme;?>", lang : "<?php echo EE_Registry::instance()->CFG->registration->recaptcha_language;?>" };
/*  ] ]>  */
</script>
<p id="spco-captcha" class="reg-page-form-field-wrap-pg">
	<span><?php echo __('Anti-Spam Measure: Please enter the following phrase:', 'event_espresso');?></span>
	<?PHP echo recaptcha_get_html( EE_Registry::instance()->CFG->registration->recaptcha_site_key, NULL, is_ssl() ? TRUE : FALSE );?>
</p>
<?php
			}
		}
	}




	/**
	 * 	process_recaptcha
	 *
	 * 	@access private
	 * 	@return 	boolean
	 */
	private static function _process_recaptcha_response() {

		// https://www.google.com/recaptcha/api/siteverify?secret=your_secret&response=response_string&remoteip=user_ip_address

		$response_data = array( 'error' => FALSE );
		// check recaptcha
		if ( EE_Registry::instance()->CFG->registration->use_captcha && ! is_user_logged_in() ) {
			if ( ! function_exists( 'recaptcha_check_answer' )) {
				require_once( EE_THIRD_PARTY . 'recaptchalib.php' );
			}
			$response = recaptcha_check_answer(
				EE_Registry::instance()->CFG->registration->recaptcha_secret_key,
				$_SERVER["REMOTE_ADDR"],
				EE_Registry::instance()->REQ->is_set( 'recaptcha_challenge_field' ) ? EE_Registry::instance()->REQ->get( 'recaptcha_challenge_field' ) : '',
				EE_Registry::instance()->REQ->is_set( 'recaptcha_response_field' ) ? EE_Registry::instance()->REQ->get( 'recaptcha_response_field' ) : ''
			);
			// sorry... it appears you can't read gibberish chicken scratches !!!
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





	/***************************************		reCAPTCHA ADMIN SETTINGS 		***************************************/



	/**
	 * admin_settings
	 *
	 * @access public
	 * @return array
	 */
	public static function admin_settings() {

		EE_Registry::instance()->load_helper( 'HTML' );
		EE_Registry::instance()->load_helper( 'Template' );

		$use_captcha = isset( EE_Registry::instance()->CFG->registration->use_captcha ) ? EE_Registry::instance()->CFG->registration->use_captcha : FALSE;
		$show_captcha = $use_captcha ?  '': 'display:none;';

		$admin_settings = new EE_Form_Section_Proper(
			array(
				'name' 					=> 'recaptcha_settings',
				'html_id' 					=> 'recaptcha_settings',
				'layout_strategy'		=> new EE_Div_Per_Section_Layout(),
				'subsections' 			=> array(
					'recaptcha_settings_hdr' 		=> new EE_Form_Section_HTML( EEH_HTML::h3( __( 'reCAPTCHA Anti-spam Settings', 'event_espresso' ) . EEH_Template::get_help_tab_link( 'recaptcha_info' ))),
					'recaptcha_settings' 				=> EED_Recaptcha::_recaptcha_main_settings( $use_captcha, $show_captcha ),
					'appearance_settings_hdr' 	=> new EE_Form_Section_HTML( EEH_HTML::h3( __( 'reCAPTCHA Appearance', 'event_espresso' ), '', '', $show_captcha )),
					'appearance_settings' 			=> EED_Recaptcha::_recaptcha_appearance_settings( $use_captcha, $show_captcha ),
				),
			)
		);
		echo $admin_settings->get_html_and_js();

//		$template_args['values'] = array(
//			array('id' => TRUE, 'text' => __('Yes', 'event_espresso')),
//			array('id' => FALSE, 'text' => __('No', 'event_espresso'))
//		);
//		$template_args['use_captcha'] = isset( EE_Registry::instance()->CFG->registration->use_captcha ) ? EE_Registry::instance()->CFG->registration->use_captcha : FALSE;

//		$template_args['recaptcha_site_key'] = isset( EE_Registry::instance()->CFG->registration->recaptcha_site_key ) ? stripslashes( EE_Registry::instance()->CFG->registration->recaptcha_site_key ) : '';
//		$template_args['recaptcha_secret_key'] = isset( EE_Registry::instance()->CFG->registration->recaptcha_secret_key ) ? stripslashes( EE_Registry::instance()->CFG->registration->recaptcha_secret_key ) : '';

//		$template_args['recaptcha_example'] = ! empty( EE_Registry::instance()->CFG->registration->recaptcha_site_key ) ? EED_Recaptcha::display_recaptcha() : '';
//		EEH_Template::display_template( RECAPTCHA_BASE_PATH . 'templates' . DS . 'recaptcha_admin_settings.template.php', $template_args );

	}



	/**
	 * _recaptcha_main_settings
	 *
	 * @access protected
	 * @param bool   $use_captcha
	 * @param string $show_captcha
	 * @return EE_Form_Section_Proper
	 */
	protected static function _recaptcha_main_settings( $use_captcha = FALSE, $show_captcha = '' ) {
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
							'default' 					=> $use_captcha,
							'display_html_label_text' =>FALSE
						)
					),
					'recaptcha_site_key' 		=> new EE_Text_Input(
						array(
							'html_label_text'	 	=> __( 'Site Key', 'event_espresso' ),
							'html_style' 			=> $show_captcha,
							'default' 					=> isset( EE_Registry::instance()->CFG->registration->recaptcha_site_key ) ? stripslashes( EE_Registry::instance()->CFG->registration->recaptcha_site_key ) : ''
						)
					),
					'recaptcha_secret_key' 		=> new EE_Text_Input(
						array(
							'html_label_text'	 	=> __( 'Secret Key', 'event_espresso' ),
							'html_style' 			=> $show_captcha,
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
	 * @param bool   $use_captcha
	 * @param string $show_captcha
	 * @return EE_Form_Section_Proper
	 */
	protected static function _recaptcha_appearance_settings( $use_captcha = FALSE, $show_captcha = '' ) {
		return new EE_Form_Section_Proper(
			array(
				'name' 					=> 'recaptcha_appearance_settings_tbl',
				'html_id' 					=> 'recaptcha_appearance_settings_tbl',
				'html_class' 			=> 'form-table',
				'layout_strategy'		=> new EE_Admin_Two_Column_Layout(),
				'subsections' 			=> array(
					'recaptcha_theme' 		=> new EE_Radio_Button_Input(
						array(
							'dark' => __( 'Dark', 'event_espresso' ),
							'light' => __( 'Light', 'event_espresso' )
						),
						array(
							'html_label_text'	 	=> __( 'Theme', 'event_espresso' ),
							'html_style' 			=> $show_captcha,
							'default' 					=> isset( EE_Registry::instance()->CFG->registration->recaptcha_theme ) ? EE_Registry::instance()->CFG->registration->recaptcha_theme : 'light',
							'display_html_label_text' => FALSE
						)
					),
					'recaptcha_type' 		=> new EE_Radio_Button_Input(
						array(
							'audio' => __( 'Audio', 'event_espresso' ),
							'image' => __( 'Image', 'event_espresso' )
						),
						array(
							'html_label_text'	 	=> __( 'Type', 'event_espresso' ),
							'html_style' 			=> $show_captcha,
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
							'html_style' 			=> $show_captcha,
							'default' 					=> isset( EE_Registry::instance()->CFG->registration->recaptcha_language ) ? EE_Registry::instance()->CFG->registration->recaptcha_language : 'en'
						)
					),
				),
			)
		);
//		$template_args['recaptcha_theme_options'] = array(
//			array( 'id'  => 'dark', 'text'=> __( 'Dark', 'event_espresso' )),
//			array( 'id'  => 'light', 'text'=> __( 'Light', 'event_espresso' ))
//		);
//		$template_args['recaptcha_theme'] = isset( EE_Registry::instance()->CFG->registration->recaptcha_theme ) ? EE_Registry::instance()->CFG->registration->recaptcha_theme : 'light';
//		$template_args['recaptcha_type_options'] = array(
//			array( 'id'  => 'audio', 'text'=> __( 'Audio', 'event_espresso' )),
//			array( 'id'  => 'image', 'text'=> __( 'Image', 'event_espresso' ))
//		);
//		$template_args['recaptcha_type'] = isset( EE_Registry::instance()->CFG->registration->recaptcha_type ) ? EE_Registry::instance()->CFG->registration->recaptcha_type : 'image';
//		$template_args['recaptcha_language_options'] = array(
//			array( 'id'  => 'ar', 'text'=> __('Arabic', 'event_espresso')),
//			array( 'id'  => 'bg', 'text'=> __('Bulgarian', 'event_espresso')),
//			array( 'id'  => 'ca', 'text'=> __('Catalan', 'event_espresso')),
//			array( 'id'  => 'zh-CN', 'text'=> __('Chinese (Simplified)', 'event_espresso')),
//			array( 'id'  => 'zh-TW', 'text'=> __('Chinese (Traditional)	', 'event_espresso')),
//			array( 'id'  => 'hr', 'text'=> __('Croatian', 'event_espresso')),
//			array( 'id'  => 'cs', 'text'=> __('Czech', 'event_espresso')),
//			array( 'id'  => 'da', 'text'=> __('Danish', 'event_espresso')),
//			array( 'id'  => 'nl', 'text'=> __('Dutch', 'event_espresso')),
//			array( 'id'  => 'en-GB', 'text'=> __('English (UK)', 'event_espresso')),
//			array( 'id'  => 'en', 'text'=> __('English (US)', 'event_espresso')),
//			array( 'id'  => 'fil', 'text'=> __('Filipino', 'event_espresso')),
//			array( 'id'  => 'fi', 'text'=> __('Finnish', 'event_espresso')),
//			array( 'id'  => 'fr', 'text'=> __('French', 'event_espresso')),
//			array( 'id'  => 'fr-CA', 'text'=> __('French (Canadian)', 'event_espresso')),
//			array( 'id'  => 'de', 'text'=> __('German', 'event_espresso')),
//			array( 'id'  => 'de-AT', 'text'=> __('German (Austria)', 'event_espresso')),
//			array( 'id'  => 'de-CH', 'text'=> __('German (Switzerland)', 'event_espresso')),
//			array( 'id'  => 'el', 'text'=> __('Greek', 'event_espresso')),
//			array( 'id'  => 'iw', 'text'=> __('Hebrew', 'event_espresso')),
//			array( 'id'  => 'hi', 'text'=> __('Hindi', 'event_espresso')),
//			array( 'id'  => 'hu', 'text'=> __('Hungarian', 'event_espresso')),
//			array( 'id'  => 'id', 'text'=> __('Indonesian', 'event_espresso')),
//			array( 'id'  => 'it', 'text'=> __('Italian', 'event_espresso')),
//			array( 'id'  => 'ja', 'text'=> __('Japanese', 'event_espresso')),
//			array( 'id'  => 'ko', 'text'=> __('Korean', 'event_espresso')),
//			array( 'id'  => 'lv', 'text'=> __('Latvian', 'event_espresso')),
//			array( 'id'  => 'lt', 'text'=> __('Lithuanian', 'event_espresso')),
//			array( 'id'  => 'no', 'text'=> __('Norwegian', 'event_espresso')),
//			array( 'id'  => 'fa', 'text'=> __('Persian', 'event_espresso')),
//			array( 'id'  => 'pl', 'text'=> __('Polish', 'event_espresso')),
//			array( 'id'  => 'pt', 'text'=> __('Portuguese', 'event_espresso')),
//			array( 'id'  => 'pt-BR', 'text'=> __('Portuguese (Brazil)', 'event_espresso')),
//			array( 'id'  => 'pt-PT', 'text'=> __('Portuguese (Portugal)', 'event_espresso')),
//			array( 'id'  => 'ro', 'text'=> __('Romanian', 'event_espresso')),
//			array( 'id'  => 'ru', 'text'=> __('Russian', 'event_espresso')),
//			array( 'id'  => 'sr', 'text'=> __('Serbian', 'event_espresso')),
//			array( 'id'  => 'sk', 'text'=> __('Slovak', 'event_espresso')),
//			array( 'id'  => 'sl', 'text'=> __('Slovenian', 'event_espresso')),
//			array( 'id'  => 'es', 'text'=> __('Spanish', 'event_espresso')),
//			array( 'id'  => 'es-419', 'text'=> __('Spanish (Latin America)', 'event_espresso')),
//			array( 'id'  => 'sv', 'text'=> __('Swedish', 'event_espresso')),
//			array( 'id'  => 'th', 'text'=> __('Thai', 'event_espresso')),
//			array( 'id'  => 'tr', 'text'=> __('Turkish', 'event_espresso')),
//			array( 'id'  => 'uk', 'text'=> __('Ukrainian', 'event_espresso')),
//			array( 'id'  => 'vi', 'text'=> __('Vietnamese', 'event_espresso'))
//		);
//		$template_args['recaptcha_language'] = isset( EE_Registry::instance()->CFG->registration->recaptcha_language ) ? EE_Registry::instance()->CFG->registration->recaptcha_language : 'en';
	}



	/**
	 * admin_settings_template
	 *
	 * @access public
	 * @param EE_Registration_Config $EE_Registration_Config
	 * @return array
	 */
	public static function update_admin_settings( EE_Registration_Config $EE_Registration_Config ) {
		// grab original setting
		$use_captcha = isset( $_REQUEST['use_captcha'] ) ? absint( $_REQUEST['use_captcha'] ) : FALSE;
		//user  proofing recaptcha settings in here as well.  If Use reCAPTCHA is set to yes but we dont' have site or secret keys then set Use reCAPTCHA to FALSE and give error message.
		if (
			apply_filters( 'FHEE__Extend_Registration_Form_Admin_Page__check_for_recaptcha_keys', $EE_Registration_Config->use_captcha )
			&& $use_captcha
			&& ( ! $EE_Registration_Config->use_captcha && ( empty( $_REQUEST['recaptcha_site_key'] ) || empty( $_REQUEST['recaptcha_secret_key'] )))
		) {
			$use_captcha = FALSE;
			EE_Error::add_error( __('The use reCAPTCHA setting has been reset to "no". In order to enable the reCAPTCHA service, you must enter a Site Key and Secret Key.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}
		$EE_Registration_Config->use_captcha = $use_captcha;
		$EE_Registration_Config->recaptcha_site_key = isset( $_REQUEST['recaptcha_site_key'] ) ? sanitize_text_field( $_REQUEST['recaptcha_site_key'] ) : NULL;
		$EE_Registration_Config->recaptcha_secret_key = isset( $_REQUEST['recaptcha_secret_key'] ) ? sanitize_text_field( $_REQUEST['recaptcha_secret_key'] ) : NULL;
		$EE_Registration_Config->recaptcha_type = isset( $_REQUEST['recaptcha_type'] ) ? absint( $_REQUEST['recaptcha_type'] ) : 500;
		$EE_Registration_Config->recaptcha_theme = isset( $_REQUEST['recaptcha_theme'] ) ? sanitize_text_field( $_REQUEST['recaptcha_theme'] ) : 'clean';
		$EE_Registration_Config->recaptcha_language = isset( $_REQUEST['recaptcha_language'] ) ? sanitize_text_field( $_REQUEST['recaptcha_language'] ) : 'en';
		return $EE_Registration_Config;
	}


}
// End of file EED_Recaptcha.module.php
// Location: /modules/recaptcha/EED_Recaptcha.module.php
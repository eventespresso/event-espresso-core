<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 *
 * EED_Add_New_State class
 *
 * @package		Event Espresso
 * @subpackage	/modules/add_new_state/
 * @author		Brent Christensen
 *
 */
class EED_Add_New_State  extends EED_Module {



	/**
	 * @return EED_Add_New_State
	 */
	public static function instance() {
		return parent::get_instance( __CLASS__ );
	}


	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  	@access 	public
	 *  	@return 		void
	 */
	public static function set_hooks() {
		add_action( 'wp_loaded', array( 'EED_Add_New_State', 'set_definitions' ), 2 );
		add_action( 'wp_enqueue_scripts', array( 'EED_Add_New_State', 'translate_js_strings' ), 1 );
		add_filter( 'FHEE__EE_SPCO_Reg_Step_Attendee_Information___question_group_reg_form__question_group_reg_form', array( 'EED_Add_New_State', 'display_add_new_state_micro_form' ), 1, 1 );
		add_filter( 'FHEE__EE_Single_Page_Checkout__process_attendee_information__valid_data_line_item', array( 'EED_Add_New_State', 'unset_new_state_request_params' ), 10, 1 );
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  	@access 	public
	 *  	@return 		void
	 */
	public static function set_hooks_admin() {
		add_action( 'wp_loaded', array( 'EED_Add_New_State', 'set_definitions' ), 2 );
//		add_filter( 'FHEE__EEH_Form_Fields__select__before_end_wrapper', array( 'EED_Add_New_State', 'display_add_new_state_micro_form' ), 1, 7 );
		add_action( 'wp_ajax_espresso_add_new_state', array( 'EED_Add_New_State', 'add_new_state' ));
		add_action( 'wp_ajax_nopriv_espresso_add_new_state', array( 'EED_Add_New_State', 'add_new_state' ));
		add_filter( 'FHEE__EE_Single_Page_Checkout__process_attendee_information__valid_data_line_item', array( 'EED_Add_New_State', 'unset_new_state_request_params' ), 10, 1 );
		add_action( 'AHEE__General_Settings_Admin_Page__update_country_settings__state_saved', array( 'EED_Add_New_State', 'update_country_settings' ), 10, 3 );
		add_action( 'AHEE__General_Settings_Admin_Page__delete_state__state_deleted', array( 'EED_Add_New_State', 'update_country_settings' ), 10, 3 );
	}



	/**
	 * 	set_definitions
	 *
	 *  	@access 	public
	 *  	@return 		void
	 */
	public static function set_definitions() {
		define( 'ANS_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'ANS_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
	}



	/**
	 *    run - initial module setup
	 *
	 * @access    public
	 * @param \WP $WP
	 * @return        void
	 */
	public function run( $WP ) {
	}



	/**
	 * 		translate_js_strings
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public static function translate_js_strings() {
		EE_Registry::$i18n_js_strings['ans_no_country'] = __('In order to proceed, you need to select the Country that your State/Province belongs to.', 'event_espresso');
		EE_Registry::$i18n_js_strings['ans_no_name'] = __('In order to proceed, you need to enter the name of your State/Province.', 'event_espresso');
		EE_Registry::$i18n_js_strings['ans_no_abbreviation'] = __('In order to proceed, you need to enter an abbreviation for the name of your State/Province.', 'event_espresso');
		EE_Registry::$i18n_js_strings['ans_save_success'] = __('The new state was successfully saved to the database.', 'event_espresso');
		EE_Registry::$i18n_js_strings['ans_server_save_error'] = __('An unknown error has occurred on the server while saving the new state to the database.', 'event_espresso');
	}



	/**
	 * 	wp_enqueue_scripts
	 *
	 * 	@access 	public
	 * 	@return 		void
	 */
	public static function wp_enqueue_scripts() {
		wp_register_script( 'add_new_state', ANS_ASSETS_URL . 'add_new_state.js', array( 'espresso_core', 'single_page_checkout' ), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_script( 'add_new_state' );
	}



	/**
	 *    display_add_new_state_micro_form
	 *
	 * @access 	public
	 * @param 	EE_Form_Section_Proper $question_group_reg_form
	 * @return 	string
	 */
//	public static function display_add_new_state_micro_form( $html, EE_Form_Input_With_Options_Base $input ){
	public static function display_add_new_state_micro_form( EE_Form_Section_Proper $question_group_reg_form ){
		// is the "state" question in this form section?
		$input = $question_group_reg_form->get_subsection( 'state' );
		// we're only doing this for state select inputs
		if ( $input instanceof EE_State_Select_Input ) {
			// load helpers
			EE_Registry::instance()->load_helper( 'HTML' );
			// load JS
			add_action( 'wp_enqueue_scripts', array( 'EED_Add_New_State', 'wp_enqueue_scripts' ), 10 );
			// grab any set values from the request
			$country_name = str_replace( 'state', 'new_state_country', $input->html_name() );
			$state_name = str_replace( 'state', 'new_state_name', $input->html_name() );
			$abbrv_name = str_replace( 'state', 'new_state_abbrv', $input->html_name() );
			$new_state_submit_id = str_replace( 'state', 'new_state', $input->html_id() );
			$country_options = array();
			$countries = EEM_Country::instance()->get_all_countries();
			if ( ! empty( $countries )) {
				foreach( $countries as $country ){
					if ( $country instanceof EE_Country ) {
						$country_options[ $country->ID() ] = $country->name();
					}
				}
			}
			$new_state_micro_form = new EE_Form_Section_Proper(
				array(
					'name'					=> 'new_state_micro_form',
					'html_id' 				=> 'new_state_micro_form',
					'layout_strategy' => new EE_No_Layout(),
					'subsections' 		=> array(
						// add hidden input to indicate that a new state is being added
						'add_new_state' 	=> new EE_Hidden_Input(
							array(
								'html_name' 	=> str_replace( 'state', 'add_new_state', $input->html_name() ),
								'html_id' 			=> str_replace( 'state', 'add_new_state', $input->html_id() ),
								'default'			=> 0
							)
						),
						// add link for displaying hidden container
						'click_here_link' 	=>new EE_Form_Section_HTML(
							apply_filters(
								'FHEE__EED_Add_New_State__display_add_new_state_micro_form__click_here_link',
								EEH_HTML::link(
									'',
									__('click here to add a new state/province', 'event_espresso'),
									'',
									'display-' . $input->html_id(),
									'ee-form-add-new-state-lnk display-the-hidden smaller-text hide-if-no-js',
									'',
									'rel="' . $input->html_id() . '"'
								)
							)
						),
						// add initial html for hidden container
						'add_new_state_micro_form' =>new EE_Form_Section_HTML(
							apply_filters(
								'FHEE__EED_Add_New_State__display_add_new_state_micro_form__add_new_state_micro_form',
								EEH_HTML::div( '', $input->html_id() . '-dv', 'ee-form-add-new-state-dv', 'display: none;' ) .
								EEH_HTML::h6( __('If your State/Province does not appear in the list above, you can easily add it by doing the following:', 'event_espresso')) .
								EEH_HTML::ul() .
								EEH_HTML::li( __('first select the Country that your State/Province belongs to', 'event_espresso') ) .
								EEH_HTML::li( __('enter the name of your State/Province', 'event_espresso') ) .
								EEH_HTML::li( __('enter a two to six letter abbreviation for the name of your State/Province', 'event_espresso') ) .
								EEH_HTML::li( __('click the ADD button', 'event_espresso') ) .
								EEH_HTML::ulx()
							)
						),
						// NEW STATE COUNTRY
						'new_state_country' =>new EE_Country_Select_Input(
							$country_options,
							array(
								'html_name' 			=> $country_name,
								'html_id' 					=> str_replace( 'state', 'new_state_country', $input->html_id() ),
								'html_class' 			=> $input->html_class() . ' new-state-country',
								'html_label_text'		=> __('New State/Province Country', 'event_espresso'),
								'default'					=> EE_Registry::instance()->REQ->get( $country_name, '' ),
								'required' 				=> false
							)
						),
						// NEW STATE NAME
						'new_state_name' => new EE_Text_Input(
							array(
								'html_name' 			=> $state_name,
								'html_id' 					=> str_replace( 'state', 'new_state_name', $input->html_id() ),
								'html_class' 			=> $input->html_class() . ' new-state-state',
								'html_label_text'		=> __('New State/Province Name', 'event_espresso'),
								'default'					=> EE_Registry::instance()->REQ->get( $state_name, '' ),
								'required' 				=> false
							)
						),
						'spacer' => new EE_Form_Section_HTML( EEH_HTML::br() ),
						// NEW STATE NAME
						'new_state_abbrv' => new EE_Text_Input(
							array(
								'html_name' 					=> $abbrv_name,
								'html_id' 							=> str_replace( 'state', 'new_state_abbrv', $input->html_id() ),
								'html_class' 					=> $input->html_class() . ' new-state-abbrv',
								'html_label_text'				=> __('New State/Province Abbreviation', 'event_espresso'),
								'html_other_attributes'	=> 'size="24"',
								'default'							=> EE_Registry::instance()->REQ->get( $abbrv_name, '' ),
								'required' 						=> false
							)
						),
						// "submit" button
						'add_new_state_submit_button' => new EE_Form_Section_HTML(
							apply_filters(
								'FHEE__EED_Add_New_State__display_add_new_state_micro_form__add_new_state_submit_button',
								EEH_HTML::nbsp(3) .
								EEH_HTML::link( '', __('ADD', 'event_espresso'), '', 'submit-' . $new_state_submit_id, 'ee-form-add-new-state-submit button button-secondary', '', 'rel="' . $new_state_submit_id . '"' )
							)
						),
						// extra info
						'add_new_state_extra' => new EE_Form_Section_HTML(
							apply_filters(
								'FHEE__EED_Add_New_State__display_add_new_state_micro_form__add_new_state_extra',
								EEH_HTML::br(2) .
								EEH_HTML::div( '', '', 'small-text' ) .
								EEH_HTML::strong( __('Don\'t know your State/Province Abbreviation?', 'event_espresso') ) .
								EEH_HTML::br() .
								sprintf(
									__('You can look here: %s, for a list of Countries and links to their State/Province Abbreviations ("Subdivisions assigned codes" column).', 'event_espresso'),
									EEH_HTML::link( 'http://en.wikipedia.org/wiki/ISO_3166-2', 'http://en.wikipedia.org/wiki/ISO_3166-2', '', '', 'ee-form-add-new-state-wiki-lnk' )
								) .
								EEH_HTML::divx() .
								EEH_HTML::br() .
								EEH_HTML::link( '', __('cancel new state/province', 'event_espresso'), '', 'hide-' . $input->html_id(), 'ee-form-cancel-new-state-lnk smaller-text', '', 'rel="' . $input->html_id() . '"' ) .
								EEH_HTML::divx() .
								EEH_HTML::br(2)
							)
						)

					)
				)
			);
			$question_group_reg_form->add_subsections( array( $new_state_micro_form ), 'country' );
		}
		return $question_group_reg_form;
	}





	/**
	 * 	set_new_state_input_width
	 *
	 * 	@access 	public
	 * 	@return 	string | int
	 */
	public static function add_new_state() {
		$REQ = EE_Registry::instance()->load_core('Request_Handler');
		if ( $REQ->is_set( 'add_new_state' ) && $REQ->get( 'add_new_state' ) == 1 ) {
			EE_Registry::instance()->load_model('State');
			// grab country ISO code, new state name, and new state abbreviation
			$state_country = $REQ->is_set( 'new_state_country' ) ? sanitize_text_field( $REQ->get( 'new_state_country' )) : FALSE;
			$state_name = $REQ->is_set( 'new_state_name' ) ? sanitize_text_field( $REQ->get( 'new_state_name' )) : FALSE;
			$state_abbr = $REQ->is_set( 'new_state_abbrv' ) ? sanitize_text_field( $REQ->get( 'new_state_abbrv' )) : FALSE;

//echo '<h4>$state_country : ' . $state_country . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//echo '<h4>$state_name : ' . $state_name . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//echo '<h4>$state_abbr : ' . $state_abbr . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

			if ( $state_country && $state_name && $state_abbr ) {
				$new_state = EED_Add_New_State::save_new_state_to_db( array(
					'CNT_ISO'=> strtoupper( $state_country ),
					'STA_abbrev' => strtoupper( $state_abbr ),
					'STA_name' => ucwords( $state_name ),
					'STA_active' => FALSE
				));

				if ( $new_state instanceof EE_State ) {
					// clean house
					EE_Registry::instance()->REQ->un_set( 'add_new_state' );
					EE_Registry::instance()->REQ->un_set( 'new_state_country' );
					EE_Registry::instance()->REQ->un_set( 'new_state_name' );
					EE_Registry::instance()->REQ->un_set( 'new_state_abbrv' );


					if ( EE_Registry::instance()->REQ->ajax ) {
						echo json_encode( array(
							'success' => TRUE,
							'id' => $new_state->ID(),
							'name' => $new_state->name(),
							'abbrev' => $new_state->abbrev(),
							'country_iso' => $new_state->country_iso(),
							'country_name' => $new_state->country()->name()
						));
						exit();
					} else {
						return $new_state->ID();
					}
				}

			} else {
				$error = __( 'A new State/Province could not be added because invalid or missing data was received.', 'event_espresso' );
				if ( EE_Registry::instance()->REQ->ajax ) {
					echo json_encode( array( 'error' => $error ));
					exit();
				} else {
					EE_Error::add_error( $error, __FILE__, __FUNCTION__, __LINE__ );
				}
			}
		}
		return FALSE;
	}



	/**
	 *        generate_state_abbreviation
	 *
	 * @access        public
	 * @param array $request_params
	 * @return        boolean
	 */
	public static function unset_new_state_request_params ( $request_params ) {
		unset( $request_params['add_new_state'] );
		unset( $request_params['new_state_country'] );
		unset( $request_params['new_state_name'] );
		unset( $request_params['new_state_abbrv'] );
		return $request_params;
	}



	/**
	 *        generate_state_abbreviation
	 *
	 * @access        public
	 * @param array $props_n_values
	 * @return        boolean
	 */
	public static function save_new_state_to_db ( $props_n_values = array() ) {
//		printr( $props_n_values, '$props_n_values  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$existing_state = EEM_State::instance()->get_all( array( $props_n_values, 'limit' => 1 ));
		if ( ! empty( $existing_state )) {
			return array_pop( $existing_state );
		}
		$new_state = EE_State::new_instance( $props_n_values );
		if ( $new_state instanceof EE_State ) {
			// if not non-ajax admin
			$new_state_key = $new_state->country_iso() . '-' . $new_state->abbrev();
			$new_state_notice = sprintf(
					__( 'A new State named "%1$s (%2$s)" was dynamically added from an Event Espresso form for the Country of "%3$s".%5$sTo verify, edit, and/or delete this new State, please go to the %4$s and update the States / Provinces section.%5$sCheck "Yes" to have this new State
					 added to dropdown select lists in forms.', 'event_espresso' ),
					'<b>' . $new_state->name() . '</b>',
					'<b>' . $new_state->abbrev() . '</b>',
					'<b>' . $new_state->country()->name() . '</b>',
					'<a href="' . add_query_arg( array( 'page' => 'espresso_general_settings', 'action' => 'country_settings', 'country' => $new_state->country_iso() ), admin_url( 'admin.php' )) . '">' . __( 'Event Espresso - General Settings > Countries Tab', 'event_espresso' ) . '</a>',
					'<br />'
			);
			EE_Error::add_persistent_admin_notice( $new_state_key, $new_state_notice );
			$new_state->save();
			EEM_State::instance()->reset_cached_states();
			return $new_state;
		}
		return FALSE;
	}



	/**
	 *        update_country_settings
	 *
	 * @access        public
	 * @param string $CNT_ISO
	 * @param string $STA_ID
	 * @param array  $cols_n_values
	 * @return        boolean
	 */
	public static function update_country_settings( $CNT_ISO = '', $STA_ID = '', $cols_n_values = array() ) {
		$CNT_ISO = ! empty( $CNT_ISO ) ? $CNT_ISO : FALSE;
		if ( ! $CNT_ISO ) {
			EE_Error::add_error( __( 'An invalid or missing Country ISO Code was received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
		}
		$STA_abbrev = is_array( $cols_n_values ) && isset( $cols_n_values['STA_abbrev'] ) ? $cols_n_values['STA_abbrev'] : FALSE;
		if (  ! $STA_abbrev && ! empty( $STA_ID )) {
			$state = EEM_State::instance()->get_one_by_ID( $STA_ID );
			if ( $state instanceof EE_State ) {
				$STA_abbrev = $state->abbrev();
			}
		}
		if ( ! $STA_abbrev ) {
			EE_Error::add_error( __( 'An invalid or missing State Abbreviation was received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
		}
		EE_Error::dismiss_persistent_admin_notice( $CNT_ISO . '-' . $STA_abbrev, TRUE, TRUE );
	}





}
// End of file EED_Add_New_State.module.php
// Location: /modules/add_new_state/EED_Add_New_State.module.php
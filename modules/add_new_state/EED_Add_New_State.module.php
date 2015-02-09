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
 * Event List
 *
 * @package		Event Espresso
 * @subpackage	/modules/add_new_state/
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
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
		add_filter( 'FHEE__EEH_Form_Fields__select__before_end_wrapper', array( 'EED_Add_New_State', 'display_add_new_state_micro_form' ), 1, 7 );
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
	 * 	run - initial module setup
	 *
	 *  	@access 	public
	 *  	@return 		void
	 */
	public function run( $WP ) {
	}



	/**
	 * 	wp_enqueue_scripts
	 *
	 * 	@access 	public
	 * 	@return 		void
	 */
	public static function wp_enqueue_scripts() {
		wp_register_script( 'add_new_state', ANS_ASSETS_URL . 'add_new_state.js', array( 'espresso_core' ), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_script( 'add_new_state' );
	}






	/**
	 * 	display_add_new_state_micro_form
	 *
	 * 	@access 	public
	 * 	@return 		string
	 */
	public static function display_add_new_state_micro_form( $input_html, $question, $answer, $name, $id, $class, $system_ID ){
		// load JS
		add_action( 'wp_enqueue_scripts', array( 'EED_Add_New_State', 'wp_enqueue_scripts' ), 10 );
		$output = '';
		// we're only doing this for state select inputs
		if ( $system_ID == 'state' ) {
			// add hidden input to indicate that a new state is being added
			$output .= EEH_Form_Fields::hidden_input( str_replace( 'state', 'add_new_state', $name ), 0, str_replace( 'state', 'add_new_state', $id ) );
			$output .= '<a id="display-' . $id . '" class="ee-form-add-new-state-lnk display-the-hidden smaller-text hide-if-no-js" rel="' . $id . '">' . __('click here to add a new state/province', 'event_espresso') . '</a>';
			$output .= '<div id="' . $id . '-dv" class="ee-form-add-new-state-dv" style="display: none;">';
			$output .= '<h6>' . __('If your State/Province does not appear in the list above, you can easily add it by doing the following:', 'event_espresso') .'</h6>';
			$output .= '<ul>';
			$output .= sprintf(
				__('%1$sfirst select the Country that your State/Province belongs to%2$s%1$senter the name of your State/Province%2$s%1$senter a two to six letter abbreviation for the name of your State/Province%2$s%1$sclick the ADD button%2$s', 'event_espresso'),
				'<li>',
				'</li>'
			);
			$output .= '</ul>';

			// NEW STATE COUNTRY
			$cntry_id = str_replace( 'state', 'new_state_country', $id );
			$cntry_input = str_replace( 'state', 'new_state_country', $name );

			$country = new EE_Question_Form_Input(
				EE_Question::new_instance( array(
					'QST_display_text' => __('New State/Province Country', 'event_espresso'),
					'QST_system' => 'admin-country',
					'QST_type'=> EEM_Question::QST_type_dropdown,
					'QST_required' => FALSE
				)),
				EE_Answer::new_instance( array(
					'ANS_value'=> EE_Registry::instance()->REQ->is_set( $cntry_input ) ? EE_Registry::instance()->REQ->get( $cntry_input ) : ''
				)),
				array(
					'input_name' => $cntry_input,
					'input_id' => $cntry_id,
					'input_class' => $class,
					'input_prefix' => '',
					'append_qstn_id' => FALSE
				)
			);
			$output .= EEH_Form_Fields::generate_form_input( $country );

			// NEW STATE NAME
			$state_id = str_replace( 'state', 'new_state_name', $id );
			$state_name = str_replace( 'state', 'new_state_name', $name );

			$new_state_name = new EE_Question_Form_Input(
				EE_Question::new_instance( array(
					'QST_display_text' => __('New State/Province Name', 'event_espresso'),
					'QST_system' => '',
					'QST_type'=> EEM_Question::QST_type_text,
					'QST_required' => FALSE
				)),
				EE_Answer::new_instance( array(
					'ANS_value'=> EE_Registry::instance()->REQ->is_set( $state_name ) ? EE_Registry::instance()->REQ->get( $state_name ) : ''
				)),
				array(
					'input_name' => $state_name,
					'input_id' => $state_id,
					'input_class' => $class,
					'input_prefix' => '',
					'append_qstn_id' => FALSE
				)
			);
			$output .= EEH_Form_Fields::generate_form_input( $new_state_name );

			// NEW STATE ABBREVIATION
			$abbrv_id = str_replace( 'state', 'new_state_abbrv', $id );
			$abbrv_name = str_replace( 'state', 'new_state_abbrv', $name );

			$new_state_abbrv = new EE_Question_Form_Input(
				EE_Question::new_instance( array(
					'QST_display_text' => __('New State/Province Abbreviation', 'event_espresso'),
					'QST_system' => '',
					'QST_type'=> EEM_Question::QST_type_text,
					'QST_required' => FALSE
				)),
				EE_Answer::new_instance( array(
					'ANS_value'=> EE_Registry::instance()->REQ->is_set( $abbrv_name ) ? EE_Registry::instance()->REQ->get( $abbrv_name ) : ''
				)),
				array(
					'input_name' => $abbrv_name,
					'input_id' => $abbrv_id,
					'input_class' => $class,
					'input_prefix' => '',
					'append_qstn_id' => FALSE
				)
			);
			// add filters for reducing size of State Abbrv text input, and adding an "ADD" button, as well as a "cancel" button
			add_filter( 'FHEE__EEH_Form_Fields__additional_form_field_attributes', array( 'EED_Add_New_State', 'set_new_state_input_size' ));
			add_filter( 'FHEE__EEH_Form_Fields__input_html', array( 'EED_Add_New_State', 'add_new_state_submit_button' ), 1, 3 );
			add_filter( 'FHEE__EEH_Form_Fields__input_html', array( 'EED_Add_New_State', 'cancel_new_state' ), 2, 3 );
			$output .= EEH_Form_Fields::generate_form_input( $new_state_abbrv );
			// remove the filters from above so that they don't affect any other inputs
			remove_filter( 'FHEE__EEH_Form_Fields__additional_form_field_attributes', array( 'EED_Add_New_State', 'set_new_state_input_size' ));
			remove_filter( 'FHEE__EEH_Form_Fields__input_html', array( 'EED_Add_New_State', 'add_new_state_submit_button' ), 1, 3 );
			remove_filter( 'FHEE__EEH_Form_Fields__input_html', array( 'EED_Add_New_State', 'cancel_new_state' ), 2, 3 );
			$output .= '</div>';
		}
		return $input_html .$output;
	}



	/**
	 * 	set_new_state_input_width
	 *
	 * 	@access 	public
	 * 	@return 		string
	 */
	public static function set_new_state_input_size(){
		return ' size="24" style="display:inline-block; width:auto;"';
	}

	/**
	 * 	set_new_state_input_width
	 *
	 * 	@access 	public
	 * 	@return 		string
	 */
	public static function add_new_state_submit_button( $input_html, $label_html, $id ){
		$id = str_replace( 'new_state_abbrv', 'new_state', $id );
		return $input_html . '&nbsp;&nbsp;&nbsp;<a id="submit-' . $id . '" class="ee-form-add-new-state-submit ee-button big" rel="' . $id . '">' . __('ADD', 'event_espresso') . '</a>';
	}

	/**
	 * 	set_new_state_input_width
	 *
	 * 	@access 	public
	 * 	@return 		string
	 */
	public static function cancel_new_state( $input_html, $label_html, $id ){
		$id = str_replace( 'new_state_abbrv', 'new_state', $id );
		'http://en.wikipedia.org/wiki/List_of_FIPS_region_codes_(A%E2%80%93C)';
		$input_html .= '<div class="small-text"><b>' . __('Don\'t know your State/Province Abbreviation?', 'event_espresso') . '</b><br/>';
		$input_html .= sprintf(
			__('You can look here: %s, for a list of Countries and links to their State/Province Abbreviations ("Subdivisions assigned codes" column).', 'event_espresso'),
			'<a class="ee-form-add-new-state-wiki-lnk" href="http://en.wikipedia.org/wiki/ISO_3166-2">http://en.wikipedia.org/wiki/ISO_3166-2</a>'
		);
		$input_html .= '</div><br/>';
		$input_html .= '<a id="hide-' . $id . '" class="ee-form-cancel-new-state-lnk smaller-text" rel="' . $id . '">' . sprintf( __('cancel%snew%sstate/province', 'event_espresso'), '&nbsp;', '&nbsp;' ) . '</a>';
		return $input_html;
	}




	/**
	 * 	set_new_state_input_width
	 *
	 * 	@access 	public
	 * 	@return 		mixed 	string | int
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
	}




	/**
	*		generate_state_abbreviation
	*
	* 		@access		public
	*		@return 		boolean
	*/
	public static function unset_new_state_request_params ( $request_params ) {
		unset( $request_params['add_new_state'] );
		unset( $request_params['new_state_country'] );
		unset( $request_params['new_state_name'] );
		unset( $request_params['new_state_abbrv'] );
		return $request_params;
	}




	/**
	*		generate_state_abbreviation
	*
	* 		@access		public
	*		@return 		boolean
	*/
	public static function save_new_state_to_db ( $props_n_values = array() ) {
//		printr( $props_n_values, '$props_n_values  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		if ( $existing_state = EEM_State::instance()->get_all( array( $props_n_values, 'limit' => 1 ))) {
			return array_pop( $existing_state );
		}
		$new_state = EE_State::new_instance( $props_n_values );
		if ( $new_state instanceof EE_State ) {
			// if not non-ajax admin
			$new_state_key = $new_state->country_iso() . '-' . $new_state->abbrev();
			$new_state_notice = sprintf(
					__( 'A new State named "%s (%s)" was dynamically added from an Event Espresso form for the Country of "%s".<br/>To verify, edit, and/or delete this new State, please go to the %s and update the States / Provinces section.<br/>Check "Yes" to have this new State added to dropdown select lists in forms.', 'event_espresso' ),
					'<b>' . $new_state->name() . '</b>',
					'<b>' . $new_state->abbrev() . '</b>',
					'<b>' . $new_state->country()->name() . '</b>',
					'<a href="' . add_query_arg( array( 'page' => 'espresso_general_settings', 'action' => 'country_settings', 'country' => $new_state->country_iso() ), admin_url( 'admin.php' )) . '">' . __( 'Event Espresso - General Settings > Countries Tab', 'event_espresso' ) . '</a>'
			);
			EE_Error::add_persistent_admin_notice( $new_state_key, $new_state_notice );
			$new_state->save();
			EEM_State::instance()->reset_cached_states();
			return $new_state;
		}
	}





	/**
	*		update_country_settings
	*
	* 		@access		public
	*		@return 		boolean
	*/
	public static function update_country_settings( $CNT_ISO = '', $STA_ID = '', $cols_n_values = array() ) {
		$CNT_ISO = ! empty( $CNT_ISO ) ? $CNT_ISO : FALSE;
		if ( ! $CNT_ISO ) {
			EE_Error::add_error( __( 'An invalid or missing Country ISO Code was received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
		}
		$STA_abbrev = is_array( $cols_n_values ) && isset( $cols_n_values['STA_abbrev'] ) ? $cols_n_values['STA_abbrev'] : FALSE;
		if (  ! $STA_abbrev && ! empty( $STA_ID )) {
			if( $state = EEM_State::instance()->get_one_by_ID( $STA_ID )) {
				if ( $state instanceof EE_State ) {
					$STA_abbrev = $state->abbrev();
				}
			}
		}
		if ( ! $STA_abbrev ) {
			EE_Error::add_error( __( 'An invalid or missing State Abbreviation was received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
		}
		EE_Error::dismiss_persistent_admin_notice( $CNT_ISO . '-' . $STA_abbrev );
	}





}
// End of file EED_Add_New_State.module.php
// Location: /modules/add_new_state/EED_Add_New_State.module.php
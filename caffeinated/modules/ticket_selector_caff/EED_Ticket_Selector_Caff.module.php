<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 *
 * EED_Ticket_Selector_Caff
 *
 * @package		Event Espresso
 * @subpackage	/modules/events_archive_caff/
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Ticket_Selector_Caff  extends EED_Ticket_Selector {


	/**
	 * @return EED_Ticket_Selector_Caff
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
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		define( 'TICKET_SELECTOR_CAFF_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
		add_action( 'AHEE__template_settings__template__before_settings_form', array( 'EED_Ticket_Selector_Caff', 'template_settings_form' ), 10 );
		add_filter( 'FHEE__General_Settings_Admin_Page__update_template_settings__data', array( 'EED_Ticket_Selector_Caff', 'update_template_settings' ), 10, 2 );
	}


	//just required because of abstract declaration
	public function run( $WP ) {
		$this->set_config();
	}




	protected function set_config(){
		$this->set_config_section( 'template_settings' );
		$this->set_config_class( 'EE_Ticket_Selector_Config' );
		$this->set_config_name( 'EED_Ticket_Selector' );
	}





	/**
	 * 	template_settings_form
	 *
	 *  @access 	public
	 *  @static
	 *  @return 	void
	 */
	public static function template_settings_form() {
		echo EED_Ticket_Selector_Caff::_ticket_selector_settings_form()->get_html_and_js();
	}





	public static function _ticket_selector_settings_form() {
		EE_Registry::instance()->load_helper('HTML');
		EE_Registry::instance()->load_helper('Template');

		return new EE_Form_Section_Proper(
			array(
				'name' => 'ticket_selector_settings_form',
				'html_id' => 'ticket_selector_settings_form',
				'layout_strategy' => new EE_Div_Per_Section_Layout(),
				'subsections' => apply_filters(
					'FHEE__EED_Ticket_Selector_Caff___ticket_selector_settings_form__form_subsections',
					array(
						'appearance_settings_hdr' 				=> new EE_Form_Section_HTML( EEH_HTML::h3( __( 'Ticket Selector Template Settings', 'event_espresso' ))),
						'appearance_settings' 			=> EED_Ticket_Selector_Caff::_ticket_selector_appearance_settings()
					)
				)
			)
		);
	}





	public static function _ticket_selector_appearance_settings() {
		return new EE_Form_Section_Proper(
			array(
				'name' => 'ticket_selector_settings_tbl',
				'html_id' => 'ticket_selector_settings_tbl',
				'html_class' => 'form-table',
				'layout_strategy' => new EE_Admin_Two_Column_Layout(),
				'subsections' => apply_filters(
					'FHEE__EED_Ticket_Selector_Caff___ticket_selector_appearance_settings__form_subsections', array(
						'show_ticket_details' => new EE_Yes_No_Input(
							array(
								'html_label_text' => __('Show Ticket Details?', 'event_espresso' ),
								'html_help_text' => __( 'This lets you choose whether the extra ticket details section is displayed with the ticket selector.', 'event_espresso'),
								'default' => isset( EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->show_ticket_details ) ? EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->show_ticket_details : true,
								'display_html_label_text' => false
								)
							),
						'show_ticket_sale_columns' => new EE_Yes_No_Input(
							array(
								'html_label_text' => __('Show Ticket Sale Info?', 'event_espresso' ),
								'html_help_text' => __( 'This lets you indicate whether information about ticket sales is shown with ticket details in the ticket selector.', 'event_espresso'),
								'default' => isset( EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->show_ticket_sale_columns ) ? EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->show_ticket_sale_columns : true,
								'display_html_label_text' => false
								)
							),
						'show_expired_tickets' => new EE_Yes_No_Input(
							array(
								'html_label_text' => __( 'Show Expired Tickets?', 'event_espresso' ),
								'html_help_text' => __( 'Indicate whether to show expired tickets in the ticket selector', 'event_espresso' ),
								'default' => isset( EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->show_expired_tickets ) ? EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->show_expired_tickets : true,
								'display_html_label_text' => false
							)
						)
						)
					)
				)
			);
	}




	/**
	 * callback for updating template settings
	 *
	 * @since 4.6.18.rc.006
	 *
	 * @param EE_Template_Config $CFG
	 * @param array             $REQ incoming request
	 *
	 * @return void
	 */
	public static function update_template_settings( EE_Template_Config $CFG, $REQ ) {
		if ( ! isset( $CFG->EED_Ticket_Selector ) ) {
			$CFG->EED_Ticket_Selector = new EE_Ticket_Selector_Config();
		}
		try {
			$ticket_selector_form = EED_Ticket_Selector_Caff::_ticket_selector_settings_form();

			//check for form submission
			if ( $ticket_selector_form->was_submitted() ) {

				//capture form data
				$ticket_selector_form->receive_form_submission();

				//validate form data
				if ( $ticket_selector_form->is_valid() ) {

					//grab validated data from form
					$valid_data = $ticket_selector_form->valid_data();

					//set data on config
					$CFG->EED_Ticket_Selector->show_ticket_sale_columns = $valid_data['appearance_settings']['show_ticket_sale_columns'];
					$CFG->EED_Ticket_Selector->show_ticket_details = $valid_data['appearance_settings']['show_ticket_details'];
					$CFG->EED_Ticket_Selector->show_expired_tickets = $valid_data['appearance_settings']['show_expired_tickets'];
				} else {
					if ( $ticket_selector_form->submission_error_message() != '' ) {
						EE_Error::add_error( $ticket_selector_form->submission_error_message(), __FILE__, __FUNCTION__, __LINE__ );
					}
				}

			}
		} catch( EE_Error $e ) {
			$e->get_error();
		}

		return $CFG;
	}

} //end EED_Ticket_Selector_Caff

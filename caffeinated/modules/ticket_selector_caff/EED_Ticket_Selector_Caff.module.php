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
        add_action(
            'AHEE__ticket_selector_chart_template__ticket_details__after_description',
            array('EED_Ticket_Selector_Caff', 'ticket_price_details'),
            10,
            3
        );
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


	/**
	 * @param \WP $WP
	 */
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
		echo EED_Ticket_Selector_Caff::_ticket_selector_settings_form()->get_html();
	}



	/**
	 * @return \EE_Form_Section_Proper
	 * @throws \EE_Error
	 */
	public static function _ticket_selector_settings_form() {

		return new EE_Form_Section_Proper(
			array(
				'name' => 'ticket_selector_settings_form',
				'html_id' => 'ticket_selector_settings_form',
				'layout_strategy' => new EE_Div_Per_Section_Layout(),
				'subsections' => apply_filters(
					'FHEE__EED_Ticket_Selector_Caff___ticket_selector_settings_form__form_subsections',
					array(
						'appearance_settings_hdr' 	=> new EE_Form_Section_HTML(
							EEH_HTML::br(2) .
							EEH_HTML::h2( esc_html__( 'Ticket Selector Template Settings', 'event_espresso' ))
						),
						'appearance_settings' 			=> EED_Ticket_Selector_Caff::_ticket_selector_appearance_settings()
					)
				)
			)
		);
	}



    /**
     * @return \EE_Form_Section_Proper
     * @throws \EE_Error
     */
    public static function _ticket_selector_appearance_settings() {
        if ( ! \EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector instanceof EE_Ticket_Selector_Config ) {
            \EED_Ticket_Selector::instance()->set_config();
            \EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector = \EED_Ticket_Selector::instance()->config();
        }
        // get option for whether to show datetime selector in TS
	    $show_datetime_selector = \EE_Registry::instance()
		    ->CFG
		    ->template_settings
		    ->EED_Ticket_Selector
		    ->getShowDatetimeSelector();
	    // and option for how may datetimes must exist if display is conditional
	    $datetime_selector_threshold = \EE_Registry::instance()
		    ->CFG
		    ->template_settings
		    ->EED_Ticket_Selector
		    ->getDatetimeSelectorThreshold();

		return new EE_Form_Section_Proper(
			array(
				'name' => 'ticket_selector_settings_tbl',
				'html_id' => 'ticket_selector_settings_tbl',
				'html_class' => 'form-table',
				'layout_strategy' => new EE_Admin_Two_Column_Layout(),
				'subsections' => apply_filters(
					'FHEE__EED_Ticket_Selector_Caff___ticket_selector_appearance_settings__form_subsections',
						array(
							'show_ticket_details' => new EE_Yes_No_Input(
								array(
									'html_label_text' => esc_html__('Show Ticket Details?', 'event_espresso' ),
									'html_help_text' => esc_html__( 'This lets you choose whether the extra ticket details section is displayed with the ticket selector.', 'event_espresso'),
									'default' => isset( EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->show_ticket_details )
										? EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->show_ticket_details
										: true,
									'display_html_label_text' => false
								)
							),
							'show_ticket_sale_columns' => new EE_Yes_No_Input(
								array(
									'html_label_text' => esc_html__('Show Ticket Sale Info?', 'event_espresso' ),
									'html_help_text' => esc_html__( 'This lets you indicate whether information about ticket sales is shown with ticket details in the ticket selector.', 'event_espresso'),
									'default' => isset( EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->show_ticket_sale_columns )
										? EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->show_ticket_sale_columns
										: true,
									'display_html_label_text' => false
								)
							),
							'show_expired_tickets' => new EE_Yes_No_Input(
								array(
									'html_label_text' => esc_html__( 'Show Expired Tickets?', 'event_espresso' ),
									'html_help_text' => esc_html__( 'Indicate whether to show expired tickets in the ticket selector', 'event_espresso' ),
									'default' => isset( EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->show_expired_tickets )
										? EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->show_expired_tickets
										: true,
									'display_html_label_text' => false
								)
							),
							'show_datetime_selector' => new EE_Select_Input(
                                \EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector->getShowDatetimeSelectorOptions(false),
								array(
									'html_label_text' => esc_html__( 'Show Date & Time Filter?', 'event_espresso' ),
									'html_help_text' => sprintf(
									    esc_html__(
									        'Indicates whether or not to display a dropdown select box above each ticket selector that displays dates and times for the available tickets. Ticket options can be unselected, which removes (hides) them from the list of tickets being displayed.%1$sOptions include:%1$s &bull; %2$sdo not show date & time filter%3$s%1$s &nbsp; this option will NEVER display a date filter, regardless of how many dates exist.%1$s &bull; %2$smaybe show date & time filter%3$s%1$s &nbsp; this option will conditionally display the date filter when the number of dates for the event matches the value set for "Date Filter Threshold".',
                                            'event_espresso'
                                        ),
                                        '<br>',
                                        '<strong>',
                                        '</strong>'

                                    ),
									'default' => ! empty( $show_datetime_selector )
										? $show_datetime_selector
										: \EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR,
									'display_html_label_text' => false
								)
							),
							'datetime_selector_threshold' => new EE_Select_Input(
                                array_combine($r = range(1, 10), $r),
								array(
									'html_label_text' => esc_html__( 'Date & Time Filter Threshold', 'event_espresso' ),
									'html_help_text' => esc_html__(
                                        'The number of unique dates an event has to have before conditionally displaying a date & time filter',
                                        'event_espresso'
                                    ),
									'default' => ! empty( $datetime_selector_threshold )
										? $datetime_selector_threshold
										: 3,
									'display_html_label_text' => false
								)
							),
						)
					)
				)
			);
	}




	/**
	 * callback for updating template settings
	 *
	 * @since 4.6.18.rc.006
	 * @param EE_Template_Config $CFG
	 * @param array              $REQ incoming request
	 * @return EE_Template_Config
	 */
	public static function update_template_settings( EE_Template_Config $CFG, $REQ ) {
		if ( ! $CFG->EED_Ticket_Selector instanceof EE_Ticket_Selector_Config ) {
            \EED_Ticket_Selector::instance()->set_config();
            $CFG->EED_Ticket_Selector = \EED_Ticket_Selector::instance()->config();
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
					$CFG->EED_Ticket_Selector->setShowDatetimeSelector(
					    $valid_data['appearance_settings']['show_datetime_selector']
                    );
					$CFG->EED_Ticket_Selector->setDatetimeSelectorThreshold(
					    $valid_data['appearance_settings']['datetime_selector_threshold']
                    );
				} else {
					if ( $ticket_selector_form->submission_error_message() !== '' ) {
						EE_Error::add_error( $ticket_selector_form->submission_error_message(), __FILE__, __FUNCTION__, __LINE__ );
					}
				}

			}
		} catch( EE_Error $e ) {
			$e->get_error();
		}

		return $CFG;
	}



    /**
     * @param \EE_Ticket $ticket
     * @param int        $ticket_price
     * @param bool       $display_ticket_price
     */
    public static function ticket_price_details(EE_Ticket $ticket, $ticket_price = 0, $display_ticket_price = false)
    {
        require(
            str_replace('\\', DS, plugin_dir_path(__FILE__))
            . 'templates' . DS . 'ticket_selector_price_details.template.php'
        );
	}



} //end EED_Ticket_Selector_Caff

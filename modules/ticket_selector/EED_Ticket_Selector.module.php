<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * ------------------------------------------------------------------------
 *
 * Ticket Selector  class
 *
 * @package		Event Espresso
 * @subpackage	includes/classes/EE_Ticket_Selector.class.php
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Ticket_Selector extends  EED_Module {

    /**
     * @var EventEspresso\modules\ticket_selector\DisplayTicketSelector $ticket_selector
     */
    private static $ticket_selector;



	/**
	 * @return EED_Ticket_Selector
	 */
	public static function instance() {
		return parent::get_instance( __CLASS__ );
	}



	protected function set_config(){
		$this->set_config_section( 'template_settings' );
		$this->set_config_class( 'EE_Ticket_Selector_Config' );
		$this->set_config_name( 'EED_Ticket_Selector' );
	}



	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		// routing
		EE_Config::register_route( 'iframe', 'EED_Ticket_Selector', 'ticket_selector_iframe', 'ticket_selector' );
		EE_Config::register_route( 'process_ticket_selections', 'EED_Ticket_Selector', 'process_ticket_selections' );
		add_action( 'wp_loaded', array( 'EED_Ticket_Selector', 'set_definitions' ), 2 );
		add_action( 'AHEE_event_details_header_bottom', array( 'EED_Ticket_Selector', 'display_ticket_selector' ), 10, 1 );
		add_action( 'wp_enqueue_scripts', array( 'EED_Ticket_Selector', 'load_tckt_slctr_assets' ), 10 );
	}



	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		EventEspresso\core\libraries\iframe_display\Iframe::addEventEditorIframeEmbedButton( 'ticket_selector' );
	}



	/**
	 * 	set_definitions
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_definitions() {
		define( 'TICKET_SELECTOR_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		define( 'TICKET_SELECTOR_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );

		//if config is not set, initialize
		//If config is not set, set it.
		if ( ! isset( EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector ) ) {
			EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector = new EE_Ticket_Selector_Config();
		}
	}



    /**
     * @return \EventEspresso\modules\ticket_selector\DisplayTicketSelector
     */
    public static function ticketSelector()
    {
        if ( ! EED_Ticket_Selector::$ticket_selector instanceof \EventEspresso\modules\ticket_selector\DisplayTicketSelector) {
            EED_Ticket_Selector::$ticket_selector = new EventEspresso\modules\ticket_selector\DisplayTicketSelector();
        }
        return EED_Ticket_Selector::$ticket_selector;
    }


	/**
	 * 	gets the ball rolling
	 *
	 *	@access public
	 * 	@param	WP $WP
	 * 	@return void
	 */
	public function run( $WP ) {}



	/**
	 * ticket_selector_iframe
	 *
	 * @access    public
	 * @return    void
	 * @throws \EE_Error
	 */
	public function ticket_selector_iframe() {
		$ticket_selector_iframe = new EventEspresso\modules\ticket_selector\TicketSelectorIframe();
		$ticket_selector_iframe->display();
	}



	/**
	 *    creates buttons for selecting number of attendees for an event
	 *
	 * @access 	public
	 * @param 	WP_Post|int $event
	 * @param 	bool 	$view_details
	 * @return 	string
	 */
	public static function display_ticket_selector( $event = NULL, $view_details = FALSE ) {
		return EED_Ticket_Selector::ticketSelector()->display( $event, $view_details );
	}



	/**
	 *    process_ticket_selections
	 *
	 * @access        public
	 * @access        public
	 * @return        array  or FALSE
	 * @throws \EE_Error
	 */
	public function process_ticket_selections() {
		$form = new EventEspresso\modules\ticket_selector\ProcessTicketSelector();
		$form->process_ticket_selections();
	}



	/**
	* 	load js
	*
	* 	@access 		public
	* 	@return 		void
	*/
	public static function load_tckt_slctr_assets() {
		if ( apply_filters( 'FHEE__EED_Ticket_Selector__load_tckt_slctr_assets', FALSE ) ) {
			// add some style
			wp_register_style('ticket_selector', TICKET_SELECTOR_ASSETS_URL . 'ticket_selector.css');
			wp_enqueue_style('ticket_selector');
			// make it dance
			// wp_register_script('ticket_selector', TICKET_SELECTOR_ASSETS_URL . 'ticket_selector.js', array('espresso_core'), '', TRUE);
			// wp_enqueue_script('ticket_selector');
		}
	}



	/****************************** DEPRECATED ******************************/



    /**
     * @deprecated
     * @return string
     */
    public static function display_view_details_btn()
    {
        // todo add doing_it_wrong() notice during next major version
        return EED_Ticket_Selector::ticketSelector()->displayViewDetailsButton();
    }



    /**
     * @deprecated
     * @return string
     */
    public static function display_ticket_selector_submit()
    {
        // todo add doing_it_wrong() notice during next major version
        return EED_Ticket_Selector::ticketSelector()->displaySubmitButton();
    }



    /**
     * @deprecated
     * @param string $permalink_string
     * @param int    $id
     * @param string $new_title
     * @param string $new_slug
     * @return string
     */
    public static function iframe_code_button($permalink_string, $id, $new_title = '', $new_slug = '')
    {
        // todo add doing_it_wrong() notice during next major version
        return \EventEspresso\core\libraries\iframe_display\Iframe::eventListIframeEmbedButton(
            $permalink_string,
            $id,
            $new_title,
            $new_slug,
            'ticket_selector'
        );
    }



    /**
     * @deprecated
     * @param int    $ID
     * @param string $external_url
     * @return string
     */
    public static function ticket_selector_form_open($ID = 0, $external_url = '')
    {
        // todo add doing_it_wrong() notice during next major version
        return EED_Ticket_Selector::ticketSelector()->formOpen($ID, $external_url);
    }



    /**
     * @deprecated
     * @return string
     */
    public static function ticket_selector_form_close()
    {
        // todo add doing_it_wrong() notice during next major version
        return EED_Ticket_Selector::ticketSelector()->formClose();
    }



    /**
     * @deprecated
     * @return string
     */
    public static function no_tkt_slctr_end_dv()
    {
        // todo add doing_it_wrong() notice during next major version
        return EED_Ticket_Selector::ticketSelector()->noTicketSelectorEndDiv();
    }



    /**
     * @deprecated
     */
    public static function load_tckt_slctr_assets_admin()
    {
        // todo add doing_it_wrong() notice during next major version
        \EventEspresso\core\libraries\iframe_display\Iframe::EventsAdminEmbedButtonAssets();
    }


}
// End of file EED_Ticket_Selector.module.php
// Location: modules/ticket_selector/EED_Ticket_Selector.module.php

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
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EED_Event_Single_Caff
 *
 * @package		Event Espresso
 * @subpackage	/modules/event_single_caff/
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Event_Single_Caff  extends EED_Event_Single {



	/**
	 * @return EED_Event_Single_Caff
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
		define( 'EVENT_SINGLE_CAFF_TEMPLATES_PATH', plugin_dir_path( __FILE__ ) . 'templates' . DS );
		add_action( 'AHEE__template_settings__template__before_settings_form', array( 'EED_Event_Single_Caff', 'template_settings_form' ), 10 );
		add_filter( 'FHEE__General_Settings_Admin_Page__update_template_settings__data', array( 'EED_Event_Single_Caff', 'update_template_settings' ), 10, 2 );
	}






	/**
	 * 	template_settings_form
	 *
	 *  @access 	public
	 *  @static
	 *  @return 	void
	 */
	public static function template_settings_form() {
		$EE = EE_Registry::instance();
		$EE->CFG->template_settings->EED_Event_Single = isset( $EE->CFG->template_settings->EED_Event_Single ) ? $EE->CFG->template_settings->EED_Event_Single : new EE_Event_Single_Config();
		$EE->CFG->template_settings->EED_Event_Single = apply_filters( 'FHEE__EED_Event_Single__template_settings_form__event_list_config', $EE->CFG->template_settings->EED_Event_Single );
		EEH_Template::display_template( EVENT_SINGLE_CAFF_TEMPLATES_PATH . 'admin-event-single-settings.template.php', $EE->CFG->template_settings->EED_Event_Single );
	}



	/**
	 *    update_template_settings
	 *
	 * @access    public
	 * @param $CFG
	 * @param $REQ
	 * @return    void
	 */
	public static function update_template_settings( $CFG, $REQ ) {
		$CFG->EED_Event_Single = new EE_Event_Single_Config();
		$CFG->EED_Event_Single->display_status_banner_single = !empty( $REQ['display_status_banner_single'] ) && $REQ['display_status_banner_single'] ? TRUE : FALSE;
		$CFG->EED_Event_Single->display_venue = !empty( $REQ['display_venue'] ) && $REQ['display_venue'] ? TRUE : FALSE;
		return $CFG;
	}



	/**
	 *    run - initial module setup
	 *
	 * @access    public
	 * @param WP $WP
	 * @return    void
	 */
	public function run( $WP ) {
	}


}
// End of file EED_Event_Single_Caff.module.php
// Location: /modules/event_single_caff/EED_Event_Single_Caff.module.php
<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Extend_General_Settings_Admin_Page
 *
 * This contains the logic for setting up the Custom General_Settings related pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * This is the extended (caf) general settings class
 *
 * @package		Extend_General_Settings_Admin_Page
 * @subpackage	caffeinated/admin/extend/general_settings/Extend_General_Settings_Admin_Page.core.php
 * @author			Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Extend_General_Settings_Admin_Page extends General_Settings_Admin_Page {



	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
		define( 'GEN_SET_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'general_settings/templates/' );
	}



	protected function _extend_page_config() {


		//filters and action hooks here
		add_action('action_hook_espresso_general_settings_admin_options_settings_extra_settings', array( $this, 'use_venue_and_staff_manager_settings'), 10 );
	}



	public function use_venue_and_staff_manager_settings( $template_args ) {
		$_args['use_venue_manager_select'] = EE_Form_Fields::select_input('use_venue_manager', $template_args['values'], $template_args['use_venue_manager'] );
		$_args['use_personnel_manager_select'] = EE_Form_Fields::select_input('use_personnel_manager', $template_args['values'], $template_args['use_personnel_manager'] );
		$template = GEN_SET_CAF_TEMPLATE_PATH . 'use_venue_and_staff_manager_settings.template.php';
		espresso_display_template( $template, $_args );
	}



}
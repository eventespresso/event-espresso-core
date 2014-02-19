<?php
/*
  Plugin Name: Event Espresso - Calendar
  Plugin URI: http://www.eventespresso.com
  Description: A full calendar addon for Event Espresso. Includes month, week, and day views.
  Version: 2.2.1.DEV
  Author: Event Espresso
  Author URI: http://www.eventespresso.com
  Copyright 2013 Event Espresso (email : support@eventespresso.com)

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License, version 2, as
  published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA02110-1301USA
 *
 * ------------------------------------------------------------------------
 *
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Event Espresso
 * @ copyright		(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	EE4
 *
 * ------------------------------------------------------------------------
 *
 * EE_Calendar
 *
 * @package			Event Espresso
 * @subpackage		espresso-calendar
 * @author			Seth Shoultes, Chris Reynolds, Brent Christensen, Michael Nelson 
 *
 * ------------------------------------------------------------------------
 */
 class EE_Calendar {
 

	/**
	 * 	instance of the EE_Calendar object
	 *	@var 	$_instance
	 * 	@access 	private
	 */
	private static $_instance = NULL;
	
		
	/**
	 *	@singleton method used to instantiate class object
	 *	@access public
	 *	@return EE_Calendar instance
	 */
	public static function instance() {
		// check if class object is instantiated
		if ( ! self::$_instance instanceof EE_Calendar ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}




	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct() {
		// is EE running and not in M-Mode ?
		if ( defined( 'EVENT_ESPRESSO_VERSION' ) && ! EE_Maintenance_Mode::instance()->level() ) {
			// calendar_version
			define( 'EE_CALENDAR_VERSION', '2.2.1.DEV' );
			// define the plugin directory path and URL
			define( 'EE_CALENDAR_PLUGINFULLPATH', plugin_dir_path( __FILE__ ));
			define( 'EE_CALENDAR_PLUGINFULLURL', plugin_dir_url( __FILE__ ));	
			define( 'EE_CALENDAR_SHORTCODE_PATH', EE_CALENDAR_PLUGINFULLPATH . 'espresso_calendar' . DS );
			define( 'EE_CALENDAR_ADMIN', EE_CALENDAR_PLUGINFULLPATH . 'calendar' . DS );	

			// activate
			register_activation_hook(  __FILE__ , array( $this, 'activation' ));
			// add Calendar to list of shortcodes to be registered
			add_filter( 'FHEE__EE_Config__register_shortcodes__shortcodes_to_register', array( 'EE_Calendar', 'add_shortcode' ));
			// we need cars
			EEH_Autoloader::instance()->register_autoloader( array( 
				'EE_Calendar_Config' =>EE_CALENDAR_SHORTCODE_PATH . 'EE_Calendar_Config.php',
				'EE_Datetime_In_Calendar' =>EE_CALENDAR_SHORTCODE_PATH . 'EE_Datetime_In_Calendar.class.php',
				'Calendar_Admin_Page_Init' => EE_CALENDAR_ADMIN . 'Calendar_Admin_Page_Init.core.php'
			));
			//check that the EE_Calendar_Config is in the main config file
			if( ! isset( EE_Config::instance()->addons['calendar'] ) || ! EE_Config::instance()->addons['calendar'] instanceof EE_Calendar_Config ){
				EE_Config::instance()->addons['calendar'] = new EE_Calendar_Config();
				EE_Config::instance()->update_espresso_config();
			}
			// load admin
			if ( is_admin() ) {
				
				add_filter( 'FHEE__EE_Admin_Page_Loader___get_installed_pages__installed_refs', array( $this, 'calendar_admin' ));
			}			
		}		
	}




	/**
	 * Filters the list of shortcodes to add ours.
	 * @param array $shortcodes_to_register  array of paths to all shortcodes that require registering
	 * and they're just full filepaths to FOLDERS containing a shortcode class file. Eg.
	 * array('monkeybrains'=>'/public_html/wondersite/wp-content/plugins/ee4/shortcodes/espresso_monkey',...)
	 * @return array
	 */
	public static function add_shortcode( $shortcodes_to_register ){
		$shortcodes_to_register[] = EE_CALENDAR_SHORTCODE_PATH;
		return $shortcodes_to_register;
	}



	/**
	 * 	activation
	 *
	 *  @return 	void
	 */
	public static function activation() {		
		if ( ! current_user_can( 'activate_plugins' )) {
			return;
		}
		$plugin = isset( $_REQUEST['plugin'] ) ? $_REQUEST['plugin'] : '';
		check_admin_referer( "activate-plugin_{$plugin}" );
		require_once( EE_CALENDAR_ADMIN . 'calendar_admin.php' );
		EE_Calendar_Admin::activation();
	}	 



	/**
	 * 	calendar_admin
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function calendar_admin( $installed_refs = array()) {
		$installed_refs[] = 'calendar';
		return $installed_refs;
	}



 }
 add_action( 'plugins_loaded', array( 'EE_Calendar', 'instance' ));

// End of file espresso-calendar.php
// Location: /espresso-calendar/espresso-calendar.php
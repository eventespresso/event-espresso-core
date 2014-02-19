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
		// calendar_version
		define( 'EE_CALENDAR_VERSION', '2.2.1.DEV' );
		// define the plugin directory path and URL
		define( 'EE_CALENDAR_PLUGINFULLPATH', plugin_dir_path( __FILE__ ));
		define( 'EE_CALENDAR_PLUGINFULLURL', plugin_dir_url( __FILE__ ));
		define( 'EE_CALENDAR_PLUGIN_FILE', plugin_basename( __FILE__ ));
		define( 'EE_CALENDAR_SHORTCODE_PATH', EE_CALENDAR_PLUGINFULLPATH . 'espresso_calendar' . DS );
		define( 'EE_CALENDAR_ADMIN', EE_CALENDAR_PLUGINFULLPATH . 'calendar' . DS );
		define( 'EE_CALENDAR_DMS_PATH', EE_CALENDAR_PLUGINFULLPATH . 'data_migration_scripts' . DS );
		// we need cars
		add_action( 'AHEE__EE_System__construct__autoloaders_available', array( $this, 'register_autoloaders' ));
		// GO !!!
		add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ));
	}



	/**
	 * 	register_autoloaders
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function register_autoloaders() {
		EEH_Autoloader::instance()->register_autoloader( array( 
			'EE_Calendar_Config' =>EE_CALENDAR_SHORTCODE_PATH . 'EE_Calendar_Config.php',
			'EE_Datetime_In_Calendar' =>EE_CALENDAR_SHORTCODE_PATH . 'EE_Datetime_In_Calendar.class.php',
			'Calendar_Admin_Page_Init' => EE_CALENDAR_ADMIN . 'Calendar_Admin_Page_Init.core.php'
		));
	}



	/**
	 * 	plugins_loaded
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function plugins_loaded() {
		// is EE running and not in M-Mode ?
		if ( defined( 'EVENT_ESPRESSO_VERSION' ) && ! EE_Maintenance_Mode::instance()->level() ) {
			// calendar settings
			$this->_set_calendar_config();
			// activate
			register_activation_hook(  __FILE__ , array( $this, 'activation' ));
			// migrate data
			$this->_setup_migration_script_hooks();
			// load admin
			add_filter( 'FHEE__EE_Admin_Page_Loader___get_installed_pages__installed_refs', array( $this, 'calendar_admin' ));
			// add Calendar to list of shortcodes to be registered
			add_filter( 'FHEE__EE_Config__register_shortcodes__shortcodes_to_register', array( 'EE_Calendar', 'add_shortcode' ));
			// widget
			add_action( 'widgets_init', array( $this, 'widget_init' ));		
		}		
	}



	/**
	 * 	_get_calendar_config
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	private function _set_calendar_config() {
		//check that the EE_Calendar_Config is in the main config file
		if( ! isset( EE_Config::instance()->addons['calendar'] ) || ! EE_Config::instance()->addons['calendar'] instanceof EE_Calendar_Config ){
			EE_Config::instance()->addons['calendar'] = new EE_Calendar_Config();
			EE_Config::instance()->update_espresso_config();
		}
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
	 * 	widget_init
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function widget_init() {
		EE_Registry::instance()->load_file( EE_CALENDAR_SHORTCODE_PATH . 'espresso-calendar-widget', 'Espresso_Calendar_Widget', '', array(), TRUE );
		register_widget( 'Espresso_Calendar_Widget' ); 
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
		EE_Registry::instance()->load_file( EE_CALENDAR_ADMIN . 'calendar_admin', 'EE_Calendar_Admin', '', array(), TRUE );
		EE_Calendar_Admin::activation();
	}	 



	/**
	 * Setup hooks for adding calendar logic to EE4 migrations. Initially only adds
	 * a stage to teh 4.1.0 migration script
	 */
	protected function _setup_migration_script_hooks(){
		add_filter( 'FHEE__EE_DMS_4_1_0__autoloaded_stages',array($this,'autoload_migration_stage'));
		add_filter( 'FHEE__EE_DMS_4_1_0__construct__migration_stages',array($this,'add_migration_stage'));
	}
	/**
	 * Add our 4.1.0 migration stage for autoloading
	 * @param array $classname_to_filepath_array strings are classnames, valuesa re their full paths
	 * @return arrat
	 */
	public function autoload_migration_stage($classname_to_filepath_array){
		$classname_to_filepath_array['EE_DMS_4_1_0_calendar_metadata'] = EE_CALENDAR_DMS_PATH . '4_1_0_stages' . DS . 'EE_DMS_4_1_0_calendar_metadata.dmsstage.php';
		$classname_to_filepath_array['EE_DMS_4_1_0_calendar_options'] = EE_CALENDAR_DMS_PATH . '4_1_0_stages' . DS . 'EE_DMS_4_1_0_calendar_options.dmsstage.php';
		return $classname_to_filepath_array;
	}
	/**
	 * Adds our data migration stage into the list
	 * @param EE_Data_Migration_Script_Stage[] $migration_stages keys are their priority, values are EE_Data_Migration_Script_Stage
	 * return EE_Data_Migration_Script_Stage[]
	 */
	public function add_migration_stage($migration_stages){
		$migration_stages[] = new EE_DMS_4_1_0_calendar_metadata();
		$migration_stages[] = new EE_DMS_4_1_0_calendar_options();
		return $migration_stages;
	}



 }
 EE_Calendar::instance();
// End of file espresso-calendar.php
// Location: /espresso-calendar/espresso-calendar.php
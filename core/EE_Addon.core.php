<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 *
 * Event Espresso
 *
 * Event Registration and Ticketing Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			    Event Espresso
 * @ copyright		(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	$VID:$
 *
 * ------------------------------------------------------------------------
 *
 * Class EE_Addon
 *
 * Abstract Parent class for all classes that want to function as EE Addons
 *
 * @package			Event Espresso
 * @subpackage		core
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Addon {

	/**
	 * @var $_version
	 * @type string
	 */
	protected $_version;

	/**
	 * @var $_min_core_version
	 * @type string
	 */
	protected $_min_core_version;

	/**
	 * @var $_activation_indicator_option_name
	 * @type string
	 */
	protected $_activation_indicator_option_name;

	/**
	 * @var $_config_section
	 * @type string
	 */
	protected static $_config_section;

	/**
	 * @var $_config_class
	 * @type string
	 */
	protected static $_config_class;

	/**
	 * @var $_config_class
	 * @type string
	 */
	protected static $_config;



	/**
	 * @param mixed $version
	 */
	public function set_version( $version = NULL ) {
		$this->_version = $version;
	}


	/**
	 * @param mixed $min_core_version
	 */
	public function set_min_core_version( $min_core_version = NULL ) {
		$this->_min_core_version = $min_core_version;
	}



	/**
	 * get__version
	 * @return string
	 */
	public function version() {
		return $this->_version;
	}



	/**
	 * get__min_core_version
	 * @return string
	 */
	public function min_core_version() {
		return $this->_min_core_version;
	}


	/**
	 * set_activation_indicator_option
	 */
	public function set_activation_indicator_option( $activation_indicator_option_name = '' ) {
		$this->_activation_indicator_option_name = $activation_indicator_option_name;
	}

	/**
	 * get_activation_indicator_option
	 * @return string
	 */
	public function get_activation_indicator_option() {
		return $this->_activation_indicator_option_name;
	}




	/**
	 * set_db_update_option_name
	 * Until we do something better, we'll just check for migration scripts upon
	 * plugin activation only. In the future, we'll want to do it on plugin updates too
	 * @return bool
	 */
	public function set_db_update_option_name(){
		//let's just handle this on the next request, ok? right now we're just not really ready
		return update_option( $this->_activation_indicator_option_name, TRUE );
	}




	/**
	 * new_install - check for migration scripts
	 * @return mixed void|bool
	 */
	public function new_install() {
		//if core is also active, then get core to check for migration scripts
		//and set maintenance mode is necessary
		if ( get_option( $this->_activation_indicator_option_name )) {
			EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
			return delete_option( $this->_activation_indicator_option_name );
		}
		return;
	}



	/**
	 * upgrade - check for migration scripts
	 * @return mixed void|bool
	 */
	public function upgrade() {
		// if core is also active, then get core to check for migration scripts
		// and set maintenance mode is necessary
		if ( get_option( $this->_activation_indicator_option_name )) {
			EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
			return delete_option( $this->_activation_indicator_option_name );
		}
		return;
	}



}
// End of file EE_Addon.core.php
// Location: /core/EE_Addon.core.php

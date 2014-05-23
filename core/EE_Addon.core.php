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
	 * @var $_config
	 * @type EE_Config_Base
	 */
	protected $_config;



	/**
	 * new_install - check for migration scripts
	 * @return mixed
	 */
	abstract public function new_install();



	/**
	 * upgrade - check for migration scripts
	 * @return mixed
	 */
	abstract public function upgrade();




	/**
	 *get_db_update_option_name
	 * @return string
	 */
	abstract public function get_db_update_option_name();


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
	 * @param EE_Config_Base $config
	 */
	public function set_config( $config ) {
		$this->_config = $config;
	}



	/**
	 * @return EE_Config_Base
	 */
	public function config() {
		return $this->_config;
	}








}
// End of file EE_Addon.core.php
// Location: /core/EE_Addon.core.php

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
	 *    set_config
	 *
	 * @access    public
	 * @param string $name
	 * @param string $config_class
	 * @param string $section
	 * @throws EE_Error
	 * @internal  param string $_config_class
	 * @return    void
	 */
	public static function set_config( $name = '', $config_class = '',  $section = 'addons' ) {
		$name = ! empty( $name ) ? $name : EEH_Class_Tools::get_called_class();
		$config_class = ! empty( $config_class ) ? $config_class : $name . '_Config';
		if ( ! isset( EE_Config::instance()->$section ) || ! ( EE_Config::instance()->$section instanceof EE_Config_Base || EE_Config::instance()->$section instanceof StdClass )) {
			throw new EE_Error( sprintf( __( 'The %s configuration does not exist.', 'event_espresso' ), $section ));
		}
		if ( ! empty( $section )) {
			self::$_config_section = $section;
		}
		if ( ! empty( $config_class )) {
			self::$_config_class = $config_class;
		}
		$config_class = self::$_config_class;
		if ( ! isset( EE_Config::instance()->$section->$name ) || ! EE_Config::instance()->$section->$name instanceof $config_class ){
			EE_Config::instance()->$section->$name = new $config_class;
			EE_Config::instance()->update_espresso_config();
		}

	}



	/**
	 *    get_config
	 *
	 * @access 	public
	 * @param 	string $name
	 * @return 	EE_Config_Base
	 */
	public static function get_config( $name = '' ) {
		// check that config has even been set
		if ( empty( self::$_config_class )) {
			EE_Error::add_error( sprintf( __( 'No configuration has been set for %s.', 'event_espresso' ), $name ), __FILE__, __FUNCTION__, __LINE__ );
			return NULL;
		}
		$config_class = self::$_config_class;
		// check for cached config
		if ( ! self::$_config ) {
			self::$_config = isset( EE_Config::instance()->addons->$name ) || EE_Config::instance()->addons->$name instanceof $config_class ? EE_Config::instance()->addons->$name : new $config_class;
		}
		return self::$_config;
	}






}
// End of file EE_Addon.core.php
// Location: /core/EE_Addon.core.php
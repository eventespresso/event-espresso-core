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
abstract class EE_Addon extends EED_Module {

	/**
	 * @var $_version
	 * @type string
	 */
	private $_version;

	/**
	 * @var $_min_core_version
	 * @type string
	 */
	private $_min_core_version;

	/**
	 * new_install - check for migration scripts
	 * @return mixed
	 */
	abstract function new_install();

	/**
	 * upgrade - check for migration scripts
	 * @return mixed
	 */
	abstract function upgrade();



	/**
	 * get__min_core_version
	 * @return string
	 */
	public function min_core_version() {
		return $this->_min_core_version;
	}



	/**
	 * get__version
	 * @return string
	 */
	public function version() {
		return $this->_version;
	}



	/**
	 *get_db_update_option_name
	 */
	public function get_db_update_option_name() {
	}






}
// End of file EE_Addon.core.php
// Location: /core/EE_Addon.core.php
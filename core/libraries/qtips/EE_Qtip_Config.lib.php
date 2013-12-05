<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }

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
 * EE_Qtip_Config	
 *
 * This is the parent class for the Qtip PHP library for interfacing with the qTip2 js library.
 *
 * @package		Event Espresso
 * @abstract
 * @subpackage	/core/libraries/qtips/EE_Qtip_Config.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Qtip_Config extends EE_Base {
	protected $_qtipsa;
	protected $_qtips;
	protected $_label;
	protected $_default_options;


	public function __construct() {
		$this->_set_default_options();
		$this->_set_tip_array();
		$this->_construct_tips;
	}

	abstract protected function _set_tips_array();


	protected function _set_default_options() {
		$this->_label = new stdClass();
		$this->_label->singular = __('Qtip Config', 'event_espresso');
		$this->_label->plural = __('Qtip Configs', 'event_espresso');
		$this->_default_options = array();
	}


	protected function _construct_tips() {
		//loop through _qtips array, and construct the EE_Qtip objects from the array and then set the _qtips property.
	}

	public function get_label() {
		return $this->_label;
	}


	public function get_tips() {
		return $this->_qtips;
	}


} //end EE_Qtip_Config




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
 * EE_Qtip	
 *
 * All Qtips should be derivatives of this object.
 *
 * @package		Event Espresso
 * @abstract
 * @subpackage	/core/libraries/qtips/EE_Qtip_Config.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Qtip extends EE_Base {
	public $content_id;
	public $options;
	public $target;
	public $content;

	public function _construct( $setup_array ) {
		foreach ( $setup_array as $prop => $value ) {
			if ( property_exists( $this, $prop ) )
				$this->$prop = $value;
		}
	}
}
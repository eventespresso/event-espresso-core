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
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Admin_Hooks
 * This is the abstract parent class used by children to contains any hooks that run on different EE Admin pages.
 * 
 *
 * @abstract
 * @package		EE_Admin_Hooks
 * @subpackage	includes/core/admin/EE_Admin_Hooks.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Admin_Hooks extends EE_Base {

	/**
	 * This is set by child classes and is an associative array of ajax hooks in the format:
	 * array(
	 * 	'ajax_action_ref' => '_executing_method';
	 * )
	 * @var array
	 */
	protected $_ajax_func;


	/**
	 * This is an array of methods that get executed on a page routes init hook. Use the following format:
	 * array(
	 * 	'page_route' => '_executing_method'
	 * )
	 * @var array
	 */
	protected $_init_func;



	/**
	 * This is a property that will contain the current route.
	 * @var string;
	 */
	protected $_current_route;

	public function __construct() {
		$this->_set_defaults();
		$this->_set_hooks_properties();
		$this->_ajax_hooks();
		$this->_init_hooks();
	}



	/**
	 * used by child classes to set the $_ajax_fun and $_init_func properties
	 *
	 * @access protected
	 * @abstract
	 * @return void
	 */
	abstract protected function _set_hooks_properties();





	/**
	 * just set the defaults for the hooks properties.
	 *
	 * @access private
	 * @return void
	 */
	private function _set_defaults() {
		$this->_ajax_func = $this->_init_func = array();
		$this->_current_route = isset( $_REQUEST['action'] ) ? $_REQUEST['action'] : 'default';
	}


	

	/**
	 * Loop throught the $_ajax_func array and add_actions for the array.
	 * @return void
	 */
	private function _ajax_hooks() {
		if ( empty( $_ajax_func) )
			return; //get out there's nothing to take care of.

		foreach ( $this->_ajax_func as $action => $method ) {
			//make sure method exists
			if ( !method_exists($this, $method) ) {
				$msg[] = __('There is no corresponding method for the hook labeled in the _ajax_func array', 'event_espresso') . '<br />';
				$msg[] = sprintf( __('The method name given in the array is %s, check the spelling and make sure it exists in the %s class', 'event_espresso' ), $method, __CLASS__ );
				throw EE_Error( implode('||', $msg ) );
			}

			add_action('wp_ajax_' . $action, array( $this, $method ) );
		}
	}




	/**
	 * Loop throught the $_init_func array and add_actions for the array.
	 * @return void
	 */
	private function _init_hooks() {
		if ( empty( $_init_func) )
			return; //get out there's nothing to take care of.


		foreach ( $this->_init_func as $route => $method ) {
			//make sure method exists
			if ( !method_exists($this, $method) ) {
				$msg[] = __('There is no corresponding method for the hook labeled in the _init_func array', 'event_espresso') . '<br />';
				$msg[] = sprintf( __('The method name given in the array is %s, check the spelling and make sure it exists in the %s class', 'event_espresso' ), $method, __CLASS__ );
				throw EE_Error( implode('||', $msg ) );
			}
			if ( $route == $this->_current_route )
				add_action('init', array( $this, $method ) );
		}
	}
}
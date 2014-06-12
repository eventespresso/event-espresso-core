<?php
/**
 * This file contains the code related to the capabilities system in Event Espresso.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage core, capabilities
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');


/**
 * This class contains all the code related to Event Espresso capabilities.
 * Assigned to the EE_Registry::instance()->CAP property.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage core, capabilities
 * @author Darren Ethier
 */
final class EE_Capabilities extends EE_Base {


	/**
	 * instance of EE_Capabilities object
	 *
	 * @var EE_Capabilities
	 */
	private static $_instance = NULL;


	/**
	 * This is a map of caps that correspond to a EE route.
	 *
	 * format:  array {
	 * 	@type string $route index is the unique_route_name {
	 * 	      @type array $caps  values are the capabilities in an array.
	 * 	}
	 * }
	 *
	 * example: $_caps_map = array( 'espresso_events_route' => array( 'administrator', 'edit_event' ) );
	 *
	 * unique_route_name in most cases is formed from {page_slug}_{route}.
	 *
	 * @var array
	 */
	private $_caps_map = array();




	/**
	 * singleton method used to instantiat class object
	 *
	 * @since 4.5.0
	 *
	 * @return EE_Capabilities
	 */
	public static function instance() {
		//check if instantiated, and if not do so.
		if ( ! self::$_instance instanceof EE_Capabilities ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}




	/**
	 * private constructor
	 *
	 * @since 4.5.0
	 *
	 * @return void
	 */
	private function __construct() {
		$this->_caps_map = $this->_init_caps_map();
	}




	/**
	 * This sets up and returns the initial capabilities map for Event Espresso
	 *
	 * @since 4.5.0
	 *
	 * @return array
	 */
	private function _init_caps_map() {
		return array();
	}




	/**
	 * This returns capabilities for the given reference.
	 *
	 * @param string $ref Should match an index in _caps_map.
	 *
	 * @return array array of capabilities for the given ref.
	 */
	public function get_caps( $ref ) {
		$caps = isset( $this->_caps_map[$ref] ) ? $this->_caps_map[$ref] : array();
		return apply_filters( 'FHEE__EE_Capabilities__get_caps__caps', $caps, $ref );
	}



	/**
	 * This sets capabilities for the given reference and cap.
	 *
	 * @since 4.5.0
	 *
	 * @param string $ref    a unique reference for the capabilities.
	 * @param string|array $caps the caps required for the given route_ref
	 */
	public function set_caps( $ref, $caps ) {
		$this->_caps_map[$ref] = (array) $caps;
	}



	/**
	 * This is a wrapper for the native wp current_user_can method.  It basically allows us to have grouped capabilities on a specific ref (unique route reference) and handles seeing if any of the capabilities required are a match.
	 *
	 * @param string $ref Should match an index in _caps_map
	 *
	 * @return bool 	True if user has access, false if not.
	 */
	public function current_user_can( $ref ) {
		$caps = $this->get_caps( $ref );
		if ( empty( $caps ) ) {
			//nothing matching this index!
			return false;
		}

		$has_access = false;
		foreach ( $caps as $cap ) {
			$has_access = current_user_can ( $cap );
			if ( $has_access ) {
				//user has access to jump out.
				return true;
			}
		}

		//no access for yuze
		return false;
	}




	/**
	 * This is a wrapper for the native wp current_user_can_for_blog function.  It basically allows us to have grouped capabilities on a specific ref (unique route refernece) and handles seeing if any of the capabiliteis required are a match.
	 *
	 * @param int $blog_id Blog ID
	 * @param string $ref     Should match an index in $_caps_map
	 *
	 * @return bool
	 */
	public function current_user_can_for_blog( $blog_id, $ref ) {
		$caps = $this->get_caps( $ref );
		if ( empty( $caps ) ) {
			//nothing matching this index!
			return false;
		}

		$has_access = false;
		foreach ( $caps as $cap ) {
			$has_access = current_user_can_for_blog( $blog_id, $cap );
			if ( $has_access ) {
				//user has access to jump out.
				return true;
			}
		}

		//no access for yuze
		return false;
	}
}

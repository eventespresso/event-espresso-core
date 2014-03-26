<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4.1
 *
 * ------------------------------------------------------------------------
 *
 * EE_Network_Config
 * This sets up the configuration object for items saved to the db using update_site_option (and retrieved using get_site_option).  On multi-site WP installs these options function as network wide options.  On single-site WP installs these options work the same as update_option and get_option.
 *
 * EE_Network_Config is assigned to the NET_CFG property on EE_Registry.
 *
 * @package		Event Espresso
 * @subpackage	core/
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
final class EE_Network_Config {


	/**
	 * instance of the EE_Network_Config object
	 * @var EE_Network_Config
	 * @access  private
	 */
	private static $_instance = NULL;



	/**
	 * addons can add their specific network_confg objects to this property
	 * @var EE_Config_Base[]
	 */
	public $addons;



	/**
	 * @var EE_Network_Core_Config
	 */
	public $core;



	/**
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return EE_Network_Config instance
	 */
	public static function instance() {
		// check if class object is instantiated, and instantiated properly
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Network_Config )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}




	/**
	 * 	class constructor
	 *
	 *  @access 	private
	 *  @return 	void
	 */
	private function __construct() {
		do_action( 'AHEE__EE_Network_Config__construct__begin',$this );
		//set defaults
		$this->core = new EE_Network_Core_Config();
		$this->addons = array();
		
		$this->_load_config();
		
		// construct__end hook
		do_action( 'AHEE__EE_Network_Config__construct__end',$this );
	}



	/**
	 * 		load EE Network Config options
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _load_config() {
		$config = $this->get_config();
		foreach ( $config as $prop => $settings ) {
			$prop_class = is_object( $settings ) ? get_class( $this->$prop ) : FALSE;
			if ( ! empty( $settings ) && ( ! $prop_class || ( $settings instanceof $prop_class ))) {
				$this->$prop = $settings;
			}
		}
	}




	/**
	 * 	get_config
	 *
	 *  @access 	public
	 *  @return 	array of network config stuff
	 */
	public function get_config() {
		// grab network configuration
		$CFG = get_site_option( 'ee_network_config', array() );
		$CFG = apply_filters( 'FHEE__EE_Network_Config__get_config__CFG', $CFG );
		return $CFG;
	}



	/**
	 * 	update_config'
	 *
	 *  @access 	public
	 *  @return 	boolean success 
	 */
	public function update_config( $add_success = FALSE, $add_error = TRUE ) {
		do_action( 'AHEE__EE_Network_Config__update_config__begin',$this );
		// compare existing settings with what's already saved'
		$saved_config = $this->get_config();
		// update
		$saved = $saved_config == $this ? TRUE : update_site_option( 'ee_network_config', $this );
		do_action( 'AHEE__EE_Network_Config__update_config__end', $this, $saved );
		// if config remains the same or was updated successfully
		if ( $saved ) {
			if ( $add_success ) {
				$msg = is_multisite() ? __( 'The Event Espresso Network Configuration Settings have been successfully updated.', 'event_espresso' ) : __( 'Extra Event Espresso Configuration settings were successfully updated.', 'event_espresso' );
				EE_Error::add_success( $msg );
			}
			return TRUE;
		} else {
			if ( $add_error ) {
				$msg = is_multisite() ? __( 'The Event Espresso Network Configuration Settings were not updated.', 'event_espresso' ) : __( 'Extra Event Espresso Network Configuration settings were not updated.', 'event_espresso' );
				EE_Error::add_error( $msg , __FILE__, __FUNCTION__, __LINE__ );
			}
			return FALSE;
		}
	}


	/**
	 * 	__sleep
	 *
	 *  @access 	public
	 *  @return 	array
	 */
	public function __sleep() {
		return apply_filters( 'FHEE__EE_Network_Config__sleep',array(
			'core',
		) );
	}

} //end EE_Network_Config.



/**
 * Class for defining what's in the EE_Network_Config core settings.
 */
class EE_Network_Core_Config extends EE_Config_Base {

	/**
	 * PUE site license key
	 * @var string
	 */
	public $site_license_key;


	
	public function __construct() {
		$this->site_license_key = NULL;
	}

}
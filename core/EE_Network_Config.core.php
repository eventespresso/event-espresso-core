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
	 * addons can add their specific network_config objects to this property
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
	 */
	private function __construct() {
		do_action( 'AHEE__EE_Network_Config__construct__begin',$this );
		//set defaults
		$this->core = apply_filters( 'FHEE__EE_Network_Config___construct__core', new EE_Network_Core_Config() );
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
		//load network config start hook
		do_action( 'AHEE__EE_Network_Config___load_config__start', $this );
		$config = $this->get_config();
		foreach ( $config as $config_prop => $settings ) {
			if ( is_object( $settings ) && property_exists( $this, $config_prop ) ) {
				$this->{$config_prop} = apply_filters( 'FHEE__EE_Network_Config___load_config__config_settings', $settings, $config_prop, $this );
				if ( method_exists( $settings, 'populate' ) ) {
					$this->{$config_prop}->populate();
				}
				if ( method_exists( $settings, 'do_hooks' ) ) {
					$this->{$config_prop}->do_hooks();
				}
			}
		}
		if ( apply_filters( 'FHEE__EE_Network_Config___load_config__update_network_config', false ) ) {
			$this->update_config();
		}

		//load network config end hook
		do_action( 'AHEE__EE_Network_Config___load_config__end', $this );
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
	 *    update_config'
	 *
	 * @access    public
	 * @param bool $add_success
	 * @param bool $add_error
	 * @return bool success
	 */
	public function update_config( $add_success = FALSE, $add_error = TRUE ) {
		do_action( 'AHEE__EE_Network_Config__update_config__begin',$this );

		//need to bust cache for comparing original if this is a multisite install
		if ( is_multisite() ) {
			global $current_site;
			$cache_key = $current_site->id . ':ee_network_config';
			wp_cache_delete( $cache_key, 'site-options' );
		}

		//we have to compare existing saved config with config in memory because if there is no difference that means
		//that the method executed fine but there just was no update.  WordPress doesn't distinguish between false because
		//there were 0 records updated because of no change vs false because some error produced problems with the update.
		$original = get_site_option( 'ee_network_config' );

		if ( $original == $this ) {
			return true;
		}
		// update
		$saved = update_site_option( 'ee_network_config', $this );

		do_action( 'AHEE__EE_Network_Config__update_config__end', $this, $saved );
		// if config remains the same or was updated successfully
		if ( $saved ) {
			if ( $add_success ) {
				$msg = is_multisite() ? __( 'The Event Espresso Network Configuration Settings have been successfully updated.', 'event_espresso' ) : __( 'Extra Event Espresso Configuration settings were successfully updated.', 'event_espresso' );
				EE_Error::add_success( $msg );
			}
			return true;
		} else {
			if ( $add_error ) {
				$msg = is_multisite() ? __( 'The Event Espresso Network Configuration Settings were not updated.', 'event_espresso' ) : __( 'Extra Event Espresso Network Configuration settings were not updated.', 'event_espresso' );
				EE_Error::add_error( $msg , __FILE__, __FUNCTION__, __LINE__ );
			}
			return false;
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



	/**
	 * This indicates whether messages system processing should be done on the same request or not.
	 * @var
	 */
	public $do_messages_on_same_request;



	/**
	 * EE_Network_Core_Config constructor.
	 */
	public function __construct() {
		$this->site_license_key = '';
		$this->do_messages_on_same_request = false;
	}

}

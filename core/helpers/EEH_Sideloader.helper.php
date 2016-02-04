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
 * EEH_Sideloader
 *
 * This is a helper utility class that provides "sideloading" functionality.  Sideloading simply refers to retrieving files hosted elsehwere (usually github) that are downloaded into EE.
 *
 * @package		Event Espresso
 * @subpackage	/helpers/EEH_Sideloader.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */



require_once( EE_HELPERS . 'EEH_Base.helper.php' );
class EEH_Sideloader extends EEH_Base {

	private $_upload_to;
	private $_upload_from;
	private $_permissions;
	private $_new_file_name;


	/**
	 * constructor allows the user to set the properties on the sideloader on construct.  However, there are also setters for doing so.
	 *
	 * @access public
	 * @param array $init array fo initializing the sideloader if keys match the properties.
	 */
	public function __construct( $init = array() ) {
		$this->_init( $init );
	}


	/**
	 * sets the properties for class either to defaults or using incoming initialization array
	 *
	 * @access private
	 * @param  array  $init array on init (keys match properties others ignored)
	 * @return void
	 */
	private function _init( $init ) {
		$defaults = array(
			'_upload_to' => $this->_get_wp_uploads_dir(),
			'_upload_from' => '',
			'_permissions' => 0644,
			'_new_file_name' => 'EE_Sideloader_' . uniqid() . '.default'
			);

		$props = array_merge( $defaults, $init );

		foreach ( $props as $key => $val ) {
			if ( EEH_Class_Tools::has_property( $this, $key ) ) {
				$this->{$key} = $val;
			}
		}

		//make sure we include the required wp file for needed functions
		require_once( ABSPATH . 'wp-admin/includes/file.php' );
	}


	//utilities
	private function _get_wp_uploads_dir() {}

	//setters
	public function set_upload_to( $upload_to_folder ) {
		$this->_upload_to = $upload_to_folder;
	}
	public function set_upload_from( $upload_from_folder ) {
		$this->_upload_from_folder = $upload_from_folder;
	}
	public function set_permissions( $permissions ) {
		$this->_permissions = $permissions;
	}
	public function set_new_file_name( $new_file_name ) {
		$this->_new_file_name = $new_file_name;
	}

	//getters
	public function get_upload_to() {
		return $this->_upload_to;
	}
	public function get_upload_from() {
		return $this->_upload_from;
	}
	public function get_permissions() {
		return $this->_permissions;
	}
	public function get_new_file_name() {
		return $this->_new_file_name;
	}


	//upload methods
	public function sideload() {
		//setup temp dir
		$temp_file = wp_tempnam( $this->_upload_from );

		if ( !$temp_file ) {
			EE_Error::add_error( __('Something went wrong with the upload.  Unable to create a tmp file for the uploaded file on the server', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}

		do_action( 'AHEE__EEH_Sideloader__sideload__before', $this, $temp_file );

		$wp_remote_args = apply_filters( 'FHEE__EEH_Sideloader__sideload__wp_remote_args', array( 'timeout' => 500, 'stream' => true, 'filename' => $temp_file ), $this, $temp_file );

		$response = wp_safe_remote_get( $this->_upload_from, $wp_remote_args );

		if ( is_wp_error( $response ) || 200 != wp_remote_retrieve_response_code( $response ) ) {
			unlink( $temp_file );
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
				EE_Error::add_error( sprintf( __('Unable to upload the file.  Either the path given to upload from is incorrect, or something else happened.  Here is the response returned:<br />%s<br />Here is the path given: %s', 'event_espresso'), var_export( $response, true ), $this->_upload_from ), __FILE__, __FUNCTION__, __LINE__ );
			}
			return false;
		}

		//possible md5 check
		$content_md5 = wp_remote_retrieve_header( $response, 'content-md5' );
		if ( $content_md5 ) {
			$md5_check = verify_file_md5( $temp_file, $content_md5 );
			if ( is_wp_error( $md5_check ) ) {
				unlink( $temp_file );
				EE_Error::add_error( $md5_check->get_error_message(), __FILE__, __FUNCTION__, __LINE__ );
				return false;
			}
		}

		$file = $temp_file;

		//now we have the file, let's get it in the right directory with the right name.
		$path = apply_filters( 'FHEE__EEH_Sideloader__sideload__new_path', $this->_upload_to . $this->_new_file_name, $this );

		//move file in
		if ( false === @ rename( $file, $path ) ) {
			unlink( $temp_file );
			EE_Error::add_error(  sprintf( __('Unable to move the file to new location (possible permissions errors). This is the path the class attempted to move the file to: %s', 'event_espresso' ), $path ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}

		//set permissions
		$permissions = apply_filters( 'FHEE__EEH_Sideloader__sideload__permissions_applied', $this->_permissions, $this );
		chmod( $path, $permissions );

		//that's it.  let's allow for actions after file uploaded.
		do_action( 'AHEE__EE_Sideloader__sideload_after', $this, $path );

		//unlink tempfile
		@unlink( $temp_file );
		return true;
	}

} //end EEH_Template class

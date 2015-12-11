<?php
namespace EventEspresso\core\libraries\rest_api\controllers;

if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * Base
 *
 * Base controller for EE REST API
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class Base {
	/**
	 * Contains debug info we'll send back in the response headers
	 * @var array
	 */
	protected $_debug_info = array();

	/**
	 * Indicates whether or not the API is in debug mode
	 * @var boolean
	 */
	protected $_debug_mode = false;

	/**
	 * Indicates the version that was requested
	 * @var string
	 */
	protected $_requested_version;

	public function __construct() { 		
		$this->_debug_mode = defined( 'EE_REST_API_DEBUG_MODE' ) ? EE_REST_API_DEBUG_MODE : false;
	}


	/**
	 * Sets the version the user requested
	 * @param string $version eg '4.8'
	 */
	public function set_requested_version( $version ) {
		$this->_requested_version = $version;
	}

	/**
	 * Sends a response, but also makes sure to attach headers that
	 * are handy for debugging.
	 * Specifically, we assume folks will want to know what exactly was the DB query that got run,
	 * what exactly was the Models query that got run, what capabilities came into play, what fields were ommitted from the response, others?
	 * @param array|WP_Error $response
	 */
	public function send_response( $response ) {
		if( $response instanceof \WP_Error ) {
			//we want to send a "normal"-looking WP error response, but we also
			//want to add headers. It doesn't seem WP API 1.2 supports this.
			//I'd like to use WP_JSON_Server::error_to_response() but its protected
			//so here's most of it copy-and-pasted :P
			$error_data = $response->get_error_data();
			if ( is_array( $error_data ) && isset( $error_data['status'] ) ) {
				$status = $error_data['status'];
			} else {
				$status = 500;
			}

			$data = array();
			foreach ( (array) $response->errors as $code => $messages ) {
				foreach ( (array) $messages as $message ) {
					$data[] = array( 'code' => $code, 'message' => $message );
				}
			}
			$response = new \WP_REST_Response( $data, $status );
		}else{
			$status = 200;
		}
		$headers = array();
		foreach( $this->_debug_info  as $debug_key => $debug_info ) {
			if( is_array( $debug_info ) ) {
				$debug_info = json_encode( $debug_info );
			}
			$headers[ 'X-EE4-Debug-' . ucwords( $debug_key ) ] = $debug_info;
		}
		return new \WP_REST_Response( $response, $status,  $headers );
	}
}

// End of file Base.php
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
	
	/**
	 * Applies the regex to the route, then creates an array using the values of
	 * $match_keys as keys (but ignores the full pattern match). Returns the array of matches.
	 * For example, if you call 
	 * parse_route( '/ee/v4.8/events', '~\/ee\/v([^/]*)\/(.*)~', array( 'version', 'model' ) )
	 * it will return array( 'version' => '4.8', 'model' => 'events' )
	 * @param string $route
	 * @param string $regex
	 * @param int $expected_matches, EXCLUDING matching the entire regex
	 * @return array where  $match_keys are the keys (the first value of $match_keys
	 * becomes the first key of the return value, etc. Eg passing in $match_keys of
	 *	array( 'model', 'id' ), will, if the regex is successful, will return
	 *	array( 'model' => 'foo', 'id' => 'bar' )      
	 */
	public function parse_route( $route, $regex, $match_keys ) {
		$indexed_matches = array();
		try{
			$success = preg_match( $regex, $route, $matches );
			if( 
				is_array( $matches ) ) {
				//skip the overall regex match. Who cares
				for( $i = 1; $i <= count( $match_keys ); $i++ ) {
					if( ! isset( $matches[ $i ] ) ) {
						$success = false;
					} else {
						$indexed_matches[ $match_keys[ $i - 1 ] ] = $matches[ $i ];
					}
				}
			}
			if( ! $success ) {
				return $this->send_response( new \WP_Error( 'endpoint_parsing_error', __( 'We could not parse the URL. Please contact event espresso support', 'event_espresso' ) ) );
			}
		} catch ( \EE_Error $e) {
			return $this->send_response( new \WP_Error( 'ee_exception', $e->getMessage() . ( defined('WP_DEBUG') && WP_DEBUG ? $e->getTraceAsString() : '' ) ) );
		}
		return $indexed_matches;
	}
}

// End of file Base.php
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
	 * Sets some debug info that we'll send back in headers
	 * @param string $key
	 * @param string|array $info
	 */
	protected function _set_debug_info( $key, $info ){
		$this->_debug_info[ $key ] = $info;
	}



	/**
	 * Sends a response, but also makes sure to attach headers that
	 * are handy for debugging.
	 * Specifically, we assume folks will want to know what exactly was the DB query that got run,
	 * what exactly was the Models query that got run, what capabilities came into play, what fields were omitted from
	 * the response, others?
	 *
	 * @param array|\WP_Error|\Exception $response
	 * @return \WP_REST_Response
	 */
	public function send_response( $response ) {
		if( $response instanceof \Exception ) {
			$response = new \WP_Error( $response->getCode(), $response->getMessage() );
		}
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

			$errors = array();
			foreach ( (array) $response->errors as $code => $messages ) {
				foreach ( (array) $messages as $message ) {
					$errors[] = array(
						'code'    => $code,
						'message' => $message,
						'data'    => $response->get_error_data( $code )
					);
				}
			}
			$data = isset( $errors[0] ) ? $errors[0] : array();
			if ( count( $errors ) > 1 ) {
				// Remove the primary error.
				array_shift( $errors );
				$data['additional_errors'] = $errors;
			}
			$rest_response = new \WP_REST_Response( $data, $status );
		}else{
			$rest_response = new \WP_REST_Response( $response, 200 );
		}
		$headers = array();
		if( $this->_debug_mode && is_array( $this->_debug_info ) ) {
			foreach( $this->_debug_info  as $debug_key => $debug_info ) {
				if( is_array( $debug_info ) ) {
					$debug_info = json_encode( $debug_info );
				}
				$headers[ 'X-EE4-Debug-' . ucwords( $debug_key ) ] = $debug_info;
			}
		}
		$rest_response->set_headers( $headers );
		return $rest_response;
	}



	/**
	 * Applies the regex to the route, then creates an array using the values of
	 * $match_keys as keys (but ignores the full pattern match). Returns the array of matches.
	 * For example, if you call
	 * parse_route( '/ee/v4.8/events', '~\/ee\/v([^/]*)\/(.*)~', array( 'version', 'model' ) )
	 * it will return array( 'version' => '4.8', 'model' => 'events' )
	 *
	 * @param string $route
	 * @param string $regex
	 * @param array  $match_keys EXCLUDING matching the entire regex
	 * @return array where  $match_keys are the keys (the first value of $match_keys
	 * becomes the first key of the return value, etc. Eg passing in $match_keys of
	 * array( 'model', 'id' ), will, if the regex is successful, will return
	 * array( 'model' => 'foo', 'id' => 'bar' )
	 * @throws \EE_Error if it couldn't be parsed
	 */
	public function parse_route( $route, $regex, $match_keys ) {
		$indexed_matches = array();
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
			throw new \EE_Error(
				__( 'We could not parse the URL. Please contact Event Espresso Support', 'event_espresso' ),
				'endpoint_parsing_error'
			);
		}
		return $indexed_matches;
	}
}

// End of file Base.php
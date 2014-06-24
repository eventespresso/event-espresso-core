<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * EEH_URL helper
 * Helper class for URL-related PHP functions
 *
 * @package			Event Espresso
 * @subpackage 	/helper/EEH_URL.helper.php
 * @author				Brent Christensen, Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEH_URL{

	/**
	 * _add_query_arg
	 * adds nonce to array of arguments then calls WP add_query_arg function
	 *
	 * @access public
	 * @param array       $args
	 * @param string $url
	 * @return string
	 */
	public static function add_query_args_and_nonce( $args = array(), $url = '' ) {
		if ( empty( $url )) {
			$user_msg = __('An error occurred. A URL is a required parameter for the add_query_args_and_nonce method.', 'event_espresso' );
			$dev_msg = $user_msg . "\n" . sprintf(
					__('In order to dynamically generate nonces for your actions, you need to supply a valid URL as a second parameter for the %s::add_query_args_and_nonce method.', 'event_espresso' ),
					__CLASS__
				);
			EE_Error::add_error( $user_msg . '||' . $dev_msg, __FILE__, __FUNCTION__, __LINE__ );
		}
		// check that an action exists
		if ( isset( $args['action'] ) && ! empty( $args['action'] )) {
			$args = array_merge( $args, array( $args['action'] . '_nonce' => wp_create_nonce( $args['action'] . '_nonce' )));
		} else {
			$args = array_merge( $args, array( 'action' => 'default', 'default_nonce' => wp_create_nonce( 'default_nonce' )));
		}

		//finally, let's always add a return address (if present) :)
		$args = !empty( $_REQUEST['action'] ) ? array_merge( $args, array( 'return' => $_REQUEST['action'] ) ) : $args;

		return add_query_arg( $args, $url );

	}



	/**
	 * refactor_url
	 * primarily used for removing the query string from a URL
	 *
	 * @param string $url
	 * @param bool   $remove_query - TRUE (default) will strip off any URL params, ie: ?this=1&that=2
	 * @param bool   $base_url_only - TRUE will only return the scheme and host with no other parameters
	 * @return string
	 */
	public static function refactor_url( $url = '', $remove_query = TRUE, $base_url_only = FALSE ) {
		// break apart incoming URL
		$url_bits = parse_url( $url );
		// HTTP or HTTPS ?
		$scheme = isset( $url_bits[ 'scheme' ] ) ? $url_bits[ 'scheme' ] . '://' : 'http://';
		// domain
		$host = isset( $url_bits[ 'host' ] ) ? $url_bits[ 'host' ] : '';
		// if only the base URL is requested, then return that now
		if ( $base_url_only ) {
			return $scheme . $host;
		}
		$port = isset( $url_bits[ 'port' ] ) ? ':' . $url_bits[ 'port' ] : '';
		$user = isset( $url_bits[ 'user' ] ) ? $url_bits[ 'user' ] : '';
		$pass = isset( $url_bits[ 'pass' ] ) ? ':' . $url_bits[ 'pass' ] : '';
		$pass = ( $user || $pass ) ? $pass . '@' : '';
		$path = isset( $url_bits[ 'path' ] ) ? $url_bits[ 'path' ] : '';
		// if the query string is not required, then return what we have so far
		if ( $remove_query ) {
			return $scheme . $user . $pass . $host . $port . $path;
		}
		$query = isset( $url_bits[ 'query' ] ) ? '?' . $url_bits[ 'query' ] : '';
		$fragment = isset( $url_bits[ 'fragment' ] ) ? '#' . $url_bits[ 'fragment' ] : '';
		return $scheme . $user . $pass . $host . $port . $path . $query . $fragment;
	}



	/**
	 * get_query_string
	 * returns just the query string from a URL, formatted by default into an array of key value pairs
	 *
	 * @param string $url
	 * @param bool   $as_array TRUE (default) will return query params as an array of key value pairs, FALSE will simply return the query string
	 * @return string|array
	 */
	public static function get_query_string( $url = '', $as_array = TRUE ) {
		// break apart incoming URL
		$url_bits = parse_url( $url );
		// grab query string from URL
		$query = isset( $url_bits[ 'query' ] ) ? $url_bits[ 'query' ] : '';
		// if we don't want the query string formatted into an array of key => value pairs, then just return it as is
		if ( ! $as_array ) {
			return $query;
		}
		// if no query string exists then just return an empty array now
		if ( empty( $query )) {
			return array();
		}
		// empty array to hold results
		$query_params = array();
		// now break apart the query string into separate params
		$query = explode( '&', $query );
		// loop thru our query params
		foreach ( $query as $query_args ) {
			// break apart the key value pairs
			$query_args = explode( '=', $query_args );
			// and add to our results array
			$query_params[ $query_args[0] ] = $query_args[1];
		}
		return $query_params;
	}




}
// End of file EEH_URL.helper.php

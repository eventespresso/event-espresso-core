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
	 * @param bool  $exclude_nonce  If true then the nonce will be excluded from the generated url.
	 * @return string
	 */
	public static function add_query_args_and_nonce( $args = array(), $url = '', $exclude_nonce = false ) {
		if ( empty( $url ) ) {
			$user_msg = __('An error occurred. A URL is a required parameter for the add_query_args_and_nonce method.', 'event_espresso' );
			$dev_msg = $user_msg . "\n" . sprintf(
					__('In order to dynamically generate nonces for your actions, you need to supply a valid URL as a second parameter for the %s::add_query_args_and_nonce method.', 'event_espresso' ),
					__CLASS__
				);
			EE_Error::add_error( $user_msg . '||' . $dev_msg, __FILE__, __FUNCTION__, __LINE__ );
		}
		// check that an action exists and add nonce
		if ( ! $exclude_nonce ) {
			if ( isset( $args['action'] ) && ! empty( $args['action'] ) ) {
				$args = array_merge( $args, array( $args['action'] . '_nonce' => wp_create_nonce( $args['action'] . '_nonce' ) ) );
			} else {
				$args = array_merge( $args, array( 'action' => 'default', 'default_nonce' => wp_create_nonce( 'default_nonce' ) ) );
			}
		}

		//finally, let's always add a return address (if present) :)
		$args = ! empty( $_REQUEST['action'] ) && ! isset( $_REQUEST[ 'return' ] )
			? array_merge( $args, array( 'return' => $_REQUEST['action'] ) )
			: $args;

		return add_query_arg( $args, $url );

	}



	/**
	 * Returns whether not the remote file exists.
	 * Checking via GET because HEAD requests are blocked on some server configurations.
	 * @param string $url
	 * @param boolean $sslverify whether we care if the SSL certificate for the requested site is setup properly
	 * @return boolean
	 */
	public static function remote_file_exists( $url, $args = array() ){
		$results = wp_remote_request($url,array_merge( array(
			'method'=>'GET',
			'redirection'=>1
		), $args ) );
		if( ! $results instanceof WP_Error &&
				isset($results['response']) &&
				isset($results['response']['code']) &&
				$results['response']['code'] == '200'){
			return true;
		}else{
			return false;
		}
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
		// decode, then break apart incoming URL
		$url_bits = parse_url( html_entity_decode( $url ) );
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



	/**
	 * prevent_prefetching
	 * @return void
	 */
	public static function prevent_prefetching(){
		// prevent browsers from prefetching of the rel='next' link, because it may contain content that interferes with the registration process
		remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
	}




	/**
	 * This generates a unique site-specific string.
	 * An example usage for this string would be to save as a unique identifier for a record in the db for usage in urls.
	 *
	 * @param   string $prefix Use this to prefix the string with something.
	 * @return string
	 */
	public static function generate_unique_token( $prefix = '' ) {
		$token =  md5( uniqid() . mt_rand() );
		return $prefix ? $prefix . '_' . $token : $token;
	}



	/**
	 * add_nocache_headers
	 * @return void
	 */
	public static function add_nocache_headers(){
		// add no cache headers
//		add_action( 'wp_head' , array( 'EED_Single_Page_Checkout', 'nocache_headers' ), 10 );
		// plus a little extra for nginx
//		add_filter( 'nocache_headers' , array( 'EED_Single_Page_Checkout', 'nocache_headers_nginx' ), 10, 1 );
	}



	/**
	 * filter_input_server_url
	 * uses filter_input() to sanitize one of the INPUT_SERVER URL values
	 * but adds a backup in case filter_input() returns nothing, which can erringly happen on some servers
	 *
	 * @param string $server_variable
	 * @return string
	 */
	public static function filter_input_server_url( $server_variable = 'REQUEST_URI' ){
		$URL = '';
		$server_variables = array(
			'REQUEST_URI' => 1,
			'HTTP_HOST' => 1,
			'PHP_SELF' => 1,
		);
		$server_variable = strtoupper( $server_variable );
		// whitelist INPUT_SERVER var
		if ( isset( $server_variables[ $server_variable ] ) ) {
            $URL = filter_input( INPUT_SERVER, $server_variable, FILTER_SANITIZE_URL, FILTER_NULL_ON_FAILURE );
            if ( empty( $URL ) ) {
                 // fallback sanitization if the above fails
				$URL = wp_sanitize_redirect( $_SERVER[ $server_variable ] );
			}
		}
		return $URL;
	}



	/**
	 * Gets the current page's full URL
	 * @return string
	 */
	public static function current_url() {
		if ( isset( $_SERVER[ 'HTTP_HOST' ], $_SERVER[ 'REQUEST_URI' ] ) ) {
			$url = is_ssl() ? 'https://' : 'http://';
			$url .= \EEH_URL::filter_input_server_url( 'HTTP_HOST' );
			$url .= \EEH_URL::filter_input_server_url( 'REQUEST_URI' );
		} else {
			$url = 'unknown';
		}
		return $url;
	}



}
// End of file EEH_URL.helper.php

<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

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
 * EEH_URL helper
 * Helper class for URL-related PHP functions
 *
 * @package		Event Espresso
 * @subpackage	/helper/EEH_URL.helper.php
 * @author		Michael Nelson
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
	 * @param bool|string $url
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
	 * Returns whether not the remote file exists.
	 * (Sends a HEAD curl request. It would probably be better to use wp_remote_get,
	 * but its nice
	 * @param string $url
	 * @return boolean
	 */
	public static function remote_file_exists($url){
		$results = wp_remote_request($url,array(
			'method'=>'HEAD',
			'redirection'=>1,
		));
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
	 * prevent_prefetching
	 * @return void
	 */
	public static function prevent_prefetching(){
		// prevent browsers from prefetching of the rel='next' link, because it may contain content that interferes with the registration process
		remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
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



}

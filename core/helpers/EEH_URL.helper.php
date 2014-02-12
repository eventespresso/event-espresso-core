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
	 * 	@access public
	 *	@param array $args
	 *	@param string $url
	 * 	@return void
	 */
	public static function add_query_args_and_nonce( $args = array(), $url = FALSE ) {
		if ( ! $url ) {
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
}
?>

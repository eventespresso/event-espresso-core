<?php
/**
 * Plugin Name: JSON Basic Authentication
 * Description: Basic Authentication handler for the JSON API, used for development and debugging purposes
 * Author: WordPress API Team
 * Author URI: https://github.com/WP-API
 * Version: 0.2
 * Plugin URI: https://github.com/WP-API/Basic-Auth
 */
/**
 * @global $wp_json_basic_auth_error WP_Error for using when displaying errors
 * @global  $wp_json_basic_auth_success boolean indicating we successfully authenticated the user using basic auth (false
 *                                              if we found basic auth data but it didn't correspond to a real user's credentials)
 * @global $wp_json_basic_auth_received_data indicating whether basic auth data was received (either in the normal
 *                                              HTTP header, or using the CGI-htaccess workaround, or the query string
 *@param $user


*
*@return int|null|\WP_Error|\WP_User
 */
function json_basic_auth_handler( $user ) {
    global $wp_json_basic_auth_error, $wp_json_basic_auth_success, $wp_json_basic_auth_received_data;
    $wp_json_basic_auth_error = null;
    $wp_json_basic_auth_success = false;
    $wp_json_basic_auth_received_data = false;

    // Don't authenticate twice
    if ( ! empty( $user ) ) {
        return $user;
    }
    $username = null;
    $password = null;
	//account for issue where some servers remove the PHP auth headers
	//so instead look for auth info in a custom environment variable set by rewrite rules
	//probably in .htaccess
    //and, as a last resort, look in the querystring
    if( isset( $_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW'] ) ) {
        $username = $_SERVER['PHP_AUTH_USER'];
        $password = $_SERVER['PHP_AUTH_PW'];
    } else {
        //ok so no normal HTTP basic auth data. Let's search for it elsewhere...
        $header = null;
        //did it somehow not get into PHP?
        if( isset( $_SERVER['HTTP_AUTHORIZATION'])) {
            $header = $_SERVER['HTTP_AUTHORIZATION'];
        }
        //did CGI or Fast CGI somehow remove the Authorization header, so the site owner used the .htaccess workaround?
        if( empty( $header) && isset( $_SERVER[ 'REDIRECT_HTTP_AUTHORIZATION' ] ) ) {
            $header = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
        }
        //did they pass it in the query string?
        if( empty( $header) && isset( $_GET['_authorization'] ) ) {
            $header = $_GET['_authorization'];
            //and now remove this special header so it doesn't interfere with other parts of the request
            unset( $_GET['authorization'] );
        }
        //ok if we found the header data ourselves, let's parse it
        if( ! empty( $header ) ) {
            //make sure there's the word 'Basic ' at the start, or else it's not for us
            if( strpos( $header, 'Basic ' ) === 0 ) {
                $header_sans_word_basic = str_replace( 'Basic ', '', $header );
                $auth_parts = explode( ':', base64_decode( $header_sans_word_basic ), 2 );
                if ( is_array( $auth_parts ) && isset( $auth_parts[0], $auth_parts[1] ) ) {
                    $username = $auth_parts[0];
                    $password = $auth_parts[1];
                }
            }
        }
    }

    // Check that we're trying to authenticate
    if ( ! isset($username ) ) {
        return $user;
    }
    //we have some authorization data we can try authenticating with
    $wp_json_basic_auth_received_data = true;
    /**
     * In multi-site, wp_authenticate_spam_check filter is run on authentication. This filter calls
     * get_currentuserinfo which in turn calls the determine_current_user filter. This leads to infinite
     * recursion and a stack overflow unless the current function is removed from the determine_current_user
     * filter during authentication.
     */
    remove_filter( 'determine_current_user', 'json_basic_auth_handler', 20 );
    remove_filter( 'authenticate', 'wp_authenticate_spam_check', 99 );

    $user = wp_authenticate( $username, $password );

    add_filter( 'determine_current_user', 'json_basic_auth_handler', 20 );
    add_filter( 'authenticate', 'wp_authenticate_spam_check', 99 );

    if ( is_wp_error( $user ) ) {
        $wp_json_basic_auth_error = $user;
        return null;
    }

    $wp_json_basic_auth_error = true;
    //if we found a user, remove regular cookie filters because
    //they're just going to overwrite what we've found
    if( $user->ID ){
        $wp_json_basic_auth_success = true;
        remove_filter( 'determine_current_user', 'wp_validate_auth_cookie' );
        remove_filter( 'determine_current_user', 'wp_validate_logged_in_cookie', 20 );
    }
    return $user->ID;
}
add_filter( 'determine_current_user', 'json_basic_auth_handler', 20 );

function json_basic_auth_error( $error ) {
	// Passthrough other errors
	if ( ! empty( $error ) ) {
		return $error;
	}

	global $wp_json_basic_auth_error;

	return $wp_json_basic_auth_error;
}
add_filter( 'json_authentication_errors', 'json_basic_auth_error' );
add_filter( 'rest_authentication_errors', 'json_basic_auth_error' );

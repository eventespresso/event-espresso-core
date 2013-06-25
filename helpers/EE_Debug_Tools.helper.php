<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

		
		


	/**
	 * 		@ print_r an array
	 * 		@ access public
	 * 		@ return void
	 */
	function printr( $var, $var_name = FALSE, $height = 'auto', $die = FALSE ) {
		
		if( ! $var_name ) {
		
			if ( is_object( $var )) {
				$var_name = 'object';
			} else if ( is_array( $var )) {
				$var_name = 'array';
			} else if ( is_numeric( $var )) {
				$var_name = 'numeric';
			} else {
				$var_name = 'string';
			}  
			
		}
		$var_name = str_replace( array( '$', '_' ), array( '', ' ' ), $var_name );
		$var_name = ucwords( $var_name );
		
		echo '<pre style="display:block; width:100%; height:' . $height . '; overflow:scroll; border:2px solid light-blue;">';
		echo '<h3><b>' . $var_name . '</b></h3>';
		echo print_r($var);
		echo '</pre>';
		
		if( $die ) {
			die();
		}
	}



	/**
	 * 		print_r EE_Session object at bottom of page after everything else has happened
	 *
	 * 		@return void
	 */
	function espresso_printr_session() {
		if ( function_exists( 'wp_get_current_user' ) && current_user_can('administrator') && ( defined('WP_DEBUG') && WP_DEBUG )) {	
			global $EE_Session;
			echo '<pre style="height:auto;padding:1em;border:2px solid lightblue;">';
			echo print_r( $EE_Session, TRUE );
			espresso_list_hooked_functions();
			echo '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';
		}
	}
	if ( ! defined('DOING_AJAX') || ! isset( $_REQUEST['noheader'] ) || $_REQUEST['noheader'] != 'true' ) {
		add_action( 'shutdown', 'espresso_printr_session' );
	}



	/**
	 * 		List All Hooked Functions
	 * 		to list all functions for a specific hook, add ee_list_hooks={hook-name} to URL
	 *		http://wp.smashingmagazine.com/2009/08/18/10-useful-wordpress-hook-hacks/  
	 *
	 * 		@return void
	 */
	function espresso_list_hooked_functions( $tag=FALSE ){
		global $wp_filter;
		echo '<br/><br/><br/><h3>Hooked Functions</h3>';
		if ( $tag ) {
			$hook[$tag]=$wp_filter[$tag];
			if ( ! is_array( $hook[$tag] )) {
				trigger_error( "Nothing found for '$tag' hook", E_USER_WARNING );
				return;
			}
			echo '<h5>For Tag: '. $tag .'</h5>';
		}
		else {
			$hook=$wp_filter;
			ksort( $hook );
		}
		foreach( $hook as $tag => $priority ) {
			echo "<br />&gt;&gt;&gt;&gt;&gt;\t<strong>$tag</strong><br />";
			ksort( $priority );
			foreach( $priority as $priority => $function ){
				echo $priority;
				foreach( $function as $name => $properties ) echo "\t$name<br />";
			}
		}
		return;
	}



	/**
	 * 		captures plugin activation errors for debugging
	 *
	 * 		@return void
	 */
	function espresso_plugin_activation_errors() {
		if ( WP_DEBUG === TRUE ) {
			file_put_contents( EVENT_ESPRESSO_UPLOAD_DIR. 'logs/espresso_plugin_activation_errors.html', ob_get_contents() );
		}	
	}
	add_action( 'activated_plugin', 'espresso_plugin_activation_errors' );
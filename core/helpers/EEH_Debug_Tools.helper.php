<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');



class EEH_Debug_Tools{
	/**
	 * 	instance of the EEH_Autoloader object
	 *	@var 	$_instance
	 * 	@access 	private
	 */
	private static $_instance = NULL;

	/**
	 * float containing the start time for the timer
	 */
	private $_starttime;
	/**
	 * array containing all the timer'd times, which can be outputted via show_times()
	 */
	private $_times = array();
	/**
	 *	@singleton method used to instantiate class object
	 *	@access public
	 *	@return EEH_Debug_Tools
	 */
	public static function instance() {
		// check if class object is instantiated, and instantiated properly
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EEH_Debug_Tools )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	/**
	 * 	class constructor
	 *
	 *  	@access 	private
	 *  	@return 	void
	 */
	private function __construct() {
		// load Kint PHP debugging library
		if( ! class_exists('Kint')){
			require_once( EE_THIRD_PARTY . 'kint' . DS . 'Kint.class.php' );
		}
		if ( ! defined('DOING_AJAX') || ! isset( $_REQUEST['noheader'] ) || $_REQUEST['noheader'] != 'true' || ! isset( $_REQUEST['TB_iframe'] )) {
			//add_action( 'shutdown', array($this,'espresso_session_footer_dump') );
		}
		add_action( 'activated_plugin',array($this,'ee_plugin_activation_errors') );
	}



	/**
	 * 	dump EE_Session object at bottom of page after everything else has happened
	 *
	 * 	@return void
	 */
	public function espresso_session_footer_dump() {
		if ( function_exists( 'wp_get_current_user' ) && current_user_can('update_core') && ( defined('WP_DEBUG') && WP_DEBUG ) &&  ! defined('DOING_AJAX') && class_exists( 'EE_Registry' )) {
			Kint::dump(  EE_Registry::instance()->SSN->id() );
			Kint::dump( EE_Registry::instance()->SSN );
//			Kint::dump( EE_Registry::instance()->SSN->get_session_data('cart')->get_tickets() );
			$this->espresso_list_hooked_functions();
			$this->show_times();
		}
	}



	/**
	 * 	List All Hooked Functions
	 * 	to list all functions for a specific hook, add ee_list_hooks={hook-name} to URL
	 *	http://wp.smashingmagazine.com/2009/08/18/10-useful-wordpress-hook-hacks/
	 *
	 * 	@return void
	 */
	public function espresso_list_hooked_functions( $tag=FALSE ){
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
	 *
	 */
	public function start_timer(){
		$mtime = microtime();
		$mtime = explode(" ",$mtime);
		$mtime = $mtime[1] + $mtime[0];
		$this->_starttime = $mtime;
	}

	public function stop_timer($string_to_display){
		$mtime = microtime();
		$mtime = explode(" ",$mtime);
		$mtime = $mtime[1] + $mtime[0];
		$endtime = $mtime;
		$totaltime = ($endtime - $this->_starttime);
		$this->_times[] = $string_to_display.": $totaltime<br>";
	 }
	 public function show_times($output_now=true){
		 if($output_now){
			 echo implode("<br>",$this->_times);
		 }else{
			 return implode("<br>",$this->_times);
		 }
	 }



	/**
	 * 	captures plugin activation errors for debugging
	 *
	 * 	@return void
	 */
	public function ee_plugin_activation_errors() {
		if ( WP_DEBUG === TRUE ) {
			$errors = ob_get_contents();
			if ( include_once( EE_HELPERS . 'EEH_File.helper.php' )) {
				try {
					EEH_File::ensure_folder_exists_and_is_writable( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS );
					EEH_File::ensure_file_exists_and_is_writable( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . 'espresso_plugin_activation_errors.html' );
					EEH_File::write_to_file( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . 'espresso_plugin_activation_errors.html', $errors );
				} catch( EE_Error $e ){
					EE_Error::add_error( sprintf( __(  'The Event Espresso activation errors file could not be setup because: %s', 'event_espresso' ), $e->getMessage() ));
				}
			} else {
				// old school attempt
				file_put_contents( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . 'espresso_plugin_activation_errors.html', $errors );
			}
			update_option( 'ee_plugin_activation_errors', $errors );
		}
	}



	/**
	 * This basically mimics the WordPress _doing_it_wrong() function except adds our own messaging etc.  Very useful for providing helpful messages to developers when the method of doing something has been deprecated, or we want to make sure they use something the right way.
	 *
	 * @access public
	 * @param  string $function The function that was called
	 * @param  string $message  A message explaining what has been done incorrectly
	 * @param  string $version  The version of Event Espresso where the error was added
	 * @return trigger_error()
	 */
	public function doing_it_wrong( $function, $message, $version ) {
		do_action( 'AHEE__EEH_Debug_Tools__doing_it_wrong_run', $function, $message, $version);
		$version = is_null( $version ) ? '' : sprintf( __('(This message was added in version %s of Event Espresso.', 'event_espresso' ), $version );
		trigger_error( sprintf( __('%1$s was called <strong>incorrectly</strong>. %2$s %3$s','event_espresso' ), $function, $message, $version ) );
	}



}



/**
 * borrowed from Kint Debugger
 * Plugin URI: http://upthemes.com/plugins/kint-debugger/
 */
if ( !function_exists( 'dump_wp_query' ) ) {
	function dump_wp_query(){
		global $wp_query;
		d($wp_query);
	}
}

/**
 * borrowed from Kint Debugger
 * Plugin URI: http://upthemes.com/plugins/kint-debugger/
 */
if ( !function_exists( 'dump_wp' ) ) {
	function dump_wp(){
		global $wp;
		d($wp);
	}
}

/**
 * borrowed from Kint Debugger
 * Plugin URI: http://upthemes.com/plugins/kint-debugger/
 */
if ( !function_exists( 'dump_post' ) ) {
	function dump_post(){
		global $post;
		d($post);
	}
}





/**
 * 	@ print_r an array
 * 	@ access public
 * 	@ return void
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
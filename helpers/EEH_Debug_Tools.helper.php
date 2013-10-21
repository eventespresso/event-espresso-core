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
		require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'tpc' . DS . 'kint' . DS . 'Kint.class.php' );
		
		if ( ! defined('DOING_AJAX') || ! isset( $_REQUEST['noheader'] ) || $_REQUEST['noheader'] != 'true' || ! isset( $_REQUEST['TB_iframe'] )) {
			add_action( 'shutdown', array($this,'espresso_session_footer_dump') );
		}
		add_action( 'activated_plugin',array($this,'espresso_plugin_activation_errors') );
	}



	/**
	 * 	dump EE_Session object at bottom of page after everything else has happened
	 *
	 * 	@return void
	 */
	public function espresso_session_footer_dump() {
		if ( function_exists( 'wp_get_current_user' ) && current_user_can('update_core') && ( defined('WP_DEBUG') && WP_DEBUG ) &&  ! defined('DOING_AJAX') && class_exists( 'EE_Registry' )) {
			Kint::dump( EE_Registry::instance()->SSN );
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
	public function espresso_plugin_activation_errors() {
		if ( WP_DEBUG === TRUE ) {
			$errors = ob_get_contents();
			file_put_contents( EVENT_ESPRESSO_UPLOAD_DIR. 'logs/espresso_plugin_activation_errors.html', $errors );
			update_option( 'espresso_plugin_activation_errors', $errors );
		}	
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
	if ( is_object( $var )) { $var->dropEE(); }
	echo print_r($var);
	if ( is_object( $var )) { $var->getEE(); }
	echo '</pre>';
	

	if( $die ) {
		die();
	}
}
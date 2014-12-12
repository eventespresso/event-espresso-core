<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 *
 * Class EEH_Debug_Tools
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen, Michael Nelson
 * @since 				4.0
 *
 */
class EEH_Debug_Tools{

	/**
	 * 	instance of the EEH_Autoloader object
	 *	@var 	$_instance
	 * 	@access 	private
	 */
	private static $_instance = NULL;

	/**
	 * array containing the start time for the timers
	 */
	private $_start_times;
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
	 *    class constructor
	 *
	 * @access    private
	 * @return \EEH_Debug_Tools
	 */
	private function __construct() {
		// load Kint PHP debugging library
		if( ! class_exists('Kint')){
			require_once( EE_THIRD_PARTY . 'kint' . DS . 'Kint.class.php' );
		}
		if ( ! defined('DOING_AJAX') || ! isset( $_REQUEST['noheader'] ) || $_REQUEST['noheader'] != 'true' || ! isset( $_REQUEST['TB_iframe'] )) {
			//add_action( 'shutdown', array($this,'espresso_session_footer_dump') );
		}
		add_action( 'activated_plugin', array( $this,'ee_plugin_activation_errors' ));
		add_action( 'shutdown', array( $this,'show_db_name' ));
	}



	/**
	 * 	show_db_name
	 *
	 * 	@return void
	 */
	public function show_db_name() {
		if ( ! defined( 'DOING_AJAX' ) && ( defined( 'EE_ERROR_EMAILS' ) && EE_ERROR_EMAILS )) {
			echo '<p style="font-size:10px;font-weight:normal;color:#E76700;margin: 1em 2em; text-align: right;">DB_NAME: '. DB_NAME .'</p>';
		}
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
	 *    List All Hooked Functions
	 *    to list all functions for a specific hook, add ee_list_hooks={hook-name} to URL
	 *    http://wp.smashingmagazine.com/2009/08/18/10-useful-wordpress-hook-hacks/
	 *
	 * @param bool $tag
	 * @return void
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
		foreach( $hook as $tag => $priorities ) {
			echo "<br />&gt;&gt;&gt;&gt;&gt;\t<strong>$tag</strong><br />";
			ksort( $priorities );
			foreach( $priorities as $priority => $function ){
				echo $priority;
				foreach( $function as $name => $properties ) echo "\t$name<br />";
			}
		}
		return;
	}



	/**
	 * @param null $timer_name
	 */
	public function start_timer( $timer_name = NULL ){
		$this->_start_times[$timer_name] = microtime( TRUE );
	}



	/**
	 * @param string $timer_name
	 */
	public function stop_timer($timer_name = 'default'){
		if( isset( $this->_start_times[ $timer_name ] ) ){
			$start_time = $this->_start_times[ $timer_name ];
			unset( $this->_start_times[ $timer_name ] );
		}else{
			$start_time = array_pop( $this->_start_times );
		}
		$total_time = microtime( TRUE ) - $start_time;
		switch ( $total_time ) {
			case $total_time < 0.00001 :
				$color = '#8A549A';
				$bold = 'normal';
				break;
			case $total_time < 0.0001 :
				$color = '#00B1CA';
				$bold = 'normal';
				break;
			case $total_time < 0.001 :
				$color = '#70CC50';
				$bold = 'normal';
				break;
			case $total_time < 0.01 :
				$color = '#FCC600';
				$bold = 'bold';
				break;
			case $total_time < 0.1 :
				$color = '#E76700';
				$bold = 'bold';
				break;
			default :
				$color = '#E44064';
				$bold = 'bold';
				break;
		}
		$this->_times[] = '<hr /><div style="display: inline-block; min-width: 10px; margin:0em 1em; color:'.$color.'; font-weight:'.$bold.'; font-size:1.2em;">' . number_format( $total_time, 8 ) . '</div> ' . $timer_name;
	 }



	/**
	 * @param bool $output_now
	 * @return string
	 */
	public function show_times($output_now=true){
		 if($output_now){
			 echo implode("<br>",$this->_times);
			 return '';
		 }
		return implode("<br>",$this->_times);
	 }



	/**
	 * 	captures plugin activation errors for debugging
	 *
	 * 	@return void
	 */
	public function ee_plugin_activation_errors() {
		if ( WP_DEBUG === TRUE ) {
			$errors = ob_get_contents();
			if ( class_exists( 'EE_Registry' )) {
				EE_Registry::instance()->load_helper( 'File' );
			} else {
				include_once( EE_HELPERS . 'EEH_File.helper.php' );
			}
			if ( class_exists( 'EEH_File' )) {
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
	 * @uses trigger_error()
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
 *    @ print_r an array
 *    @ access public
 *    @ return void
 *
 * @param mixed  $var
 * @param bool   $var_name
 * @param string $file
 * @param int    $line
 * @param string $height
 * @param bool   $die
 */
function printr( $var, $var_name = FALSE, $file = __FILE__, $line = __LINE__, $height = 'auto', $die = FALSE ) {
	$print_r = FALSE;
	if ( is_object( $var )) {
		$var_name = ! $var_name ? 'object' : $var_name;
		$print_r = TRUE;
	} else if ( is_array( $var )) {
		$var_name = ! $var_name ? 'array' : $var_name;
		$print_r = TRUE;
	} else if ( is_numeric( $var )) {
		$var_name = ! $var_name ? 'numeric' : $var_name;
	} else if ( is_string( $var )) {
		$var_name = ! $var_name ? 'string' : $var_name;
	} else if ( is_null( $var )) {
		$var_name = ! $var_name ? 'null' : $var_name;
	}
	$var_name = ucwords(  str_replace( array( '$', '_' ), array( '', ' ' ), $var_name ));
	ob_start();
	echo '<pre style="display:block; width:100%; height:' . $height . '; border:2px solid light-blue;">';
	echo '<h5 style="color:#2EA2CC;"><b>' . $var_name . '</b></h5><span style="color:#E76700">';
	$print_r ? print_r($var) : var_dump($var);
	echo '</span><br /><span style="font-size:10px;font-weight:normal;">' . $file . '<br />line no: ' . $line . '</span></pre>';
	$result = ob_get_clean();

	if ( $die ) {
		die( $result );
	} else {
		echo $result;
	}
}
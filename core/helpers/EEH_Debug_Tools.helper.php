<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
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
	 *
	 * @var array
	 */
	protected $_memory_usage_points = array();



	/**
	 *	@singleton method used to instantiate class object
	 *	@access public
	 *	@return EEH_Debug_Tools
	 */
	public static function instance() {
		// check if class object is instantiated, and instantiated properly
		if ( ! self::$_instance instanceof EEH_Debug_Tools ) {
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
		if ( ! class_exists( 'Kint' ) &&  file_exists( EE_PLUGIN_DIR_PATH . 'tests' . DS . 'kint' . DS . 'Kint.class.php' )){
			// despite EE4 having a check for an existing copy of the Kint debugging class,
			// if another plugin was loaded AFTER EE4 and they did NOT perform a similar check,
			// then hilarity would ensue as PHP throws a "Cannot redeclare class Kint" error
			// so we've moved it to our test folder so that it is not included with production releases
			// plz use https://wordpress.org/plugins/kint-debugger/  if testing production versions of EE
			require_once( EE_PLUGIN_DIR_PATH . 'tests' . DS . 'kint' . DS . 'Kint.class.php' );
		}
		if ( ! defined('DOING_AJAX') || ! isset( $_REQUEST['noheader'] ) || $_REQUEST['noheader'] != 'true' || ! isset( $_REQUEST['TB_iframe'] )) {
			//add_action( 'shutdown', array($this,'espresso_session_footer_dump') );
		}
		add_action( 'activated_plugin', array( 'EEH_Debug_Tools', 'ee_plugin_activation_errors' ));
		add_action( 'shutdown', array( 'EEH_Debug_Tools', 'show_db_name' ));
	}



	/**
	 * 	show_db_name
	 *
	 * 	@return void
	 */
	public static function show_db_name() {
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
		if ( class_exists('Kint') && function_exists( 'wp_get_current_user' ) && current_user_can('update_core') && ( defined('WP_DEBUG') && WP_DEBUG ) &&  ! defined('DOING_AJAX') && class_exists( 'EE_Registry' )) {
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
				foreach( $function as $name => $properties ) {
					echo "\t$name<br />";
				}
			}
		}
		return;
	}



	/**
	 *    registered_filter_callbacks
	 *
	 * @param string $hook_name
	 * @return array
	 */
	public static function registered_filter_callbacks( $hook_name = '' ) {
		$filters = array();
		global $wp_filter;
		if ( isset( $wp_filter[ $hook_name ] ) ) {
			$filters[ $hook_name ] = array();
			foreach ( $wp_filter[ $hook_name ] as $priority => $callbacks ) {
				$filters[ $hook_name ][ $priority ] = array();
				foreach ( $callbacks as $callback ) {
					$filters[ $hook_name ][ $priority ][] = $callback['function'];
				}
			}
		}
		return $filters;
	}



	/**
	 * 	start_timer
	 * @param null $timer_name
	 */
	public function start_timer( $timer_name = NULL ){
		$this->_start_times[$timer_name] = microtime( TRUE );
	}



	/**
	 * stop_timer
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
	  * Measure the memory usage by PHP so far.
	  * @param string $label The label to show for this time eg "Start of calling Some_Class::some_function"
	  * @param boolean $output_now whether to echo now, or wait until EEH_Debug_Tools::show_times() is called
	  * @return void
	  */
	 public function measure_memory( $label, $output_now = false ) {
		 $memory_used = $this->convert( memory_get_peak_usage( true ) );
		 $this->_memory_usage_points[ $label ] = $memory_used;
		 if( $output_now ) {
			 echo "\r\n<br>$label : $memory_used";
		 }
	 }

	 /**
	  * Converts a measure of memory bytes into the most logical units (eg kb, mb, etc)
	  * @param int $size
	  * @return string
	  */
	 public function convert( $size ) {
		$unit=array('b','kb','mb','gb','tb','pb');
		return @round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[ absint( $i ) ];
	 }



	/**
	 * show_times
	 * @param bool $output_now
	 * @return string
	 */
	public function show_times($output_now=true){
		$output = '<h2>Times:</h2>' . implode("<br>",$this->_times) . '<h2>Memory</h2>' . implode('<br>', $this->_memory_usage_points );
		 if($output_now){
			 echo $output;
			 return '';
		 }
		return $output;
	 }



	/**
	 * 	captures plugin activation errors for debugging
	 *
	 * 	@return void
	 */
	public static function ee_plugin_activation_errors() {
		if ( defined('WP_DEBUG') && WP_DEBUG ) {
			$activation_errors = ob_get_contents();
			if ( class_exists( 'EE_Registry' )) {
				EE_Registry::instance()->load_helper( 'File' );
			} else {
				include_once( EE_HELPERS . 'EEH_File.helper.php' );
			}
			if ( class_exists( 'EEH_File' )) {
				try {
					EEH_File::ensure_folder_exists_and_is_writable( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS );
					EEH_File::ensure_file_exists_and_is_writable( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . 'espresso_plugin_activation_errors.html' );
					EEH_File::write_to_file( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . 'espresso_plugin_activation_errors.html', $activation_errors );
				} catch( EE_Error $e ){
					EE_Error::add_error( sprintf( __(  'The Event Espresso activation errors file could not be setup because: %s', 'event_espresso' ), $e->getMessage() ));
				}
			} else {
				// old school attempt
				file_put_contents( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . 'espresso_plugin_activation_errors.html', $activation_errors );
			}
			$activation_errors = get_option( 'ee_plugin_activation_errors', '' ) . $activation_errors;
			update_option( 'ee_plugin_activation_errors', $activation_errors );
		}
	}



	/**
	 * This basically mimics the WordPress _doing_it_wrong() function except adds our own messaging etc.  Very useful for providing helpful messages to developers when the method of doing something has been deprecated, or we want to make sure they use something the right way.
	 *
	 * @access public
	 * @param  string $function The function that was called
	 * @param  string $message A message explaining what has been done incorrectly
	 * @param  string $version The version of Event Espresso where the error was added
	 * @param int     $error_type
	 * @uses trigger_error()
	 */
	public function doing_it_wrong( $function, $message, $version, $error_type = E_USER_NOTICE ) {
		do_action( 'AHEE__EEH_Debug_Tools__doing_it_wrong_run', $function, $message, $version);
		$version = is_null( $version ) ? '' : sprintf( __('(This message was added in version %s of Event Espresso.', 'event_espresso' ), $version );
		trigger_error( sprintf( __('%1$s was called <strong>incorrectly</strong>. %2$s %3$s','event_espresso' ), $function, $message, $version ), $error_type );
	}




	/**
	 * Logger helpers
	 */

	/**
	 * debug
	 *
	 * @param string $class
	 * @param string $func
	 * @param string $line
	 * @param array $info
	 * @param bool $display_request
	 * @param string $debug_index
	 * @param string $debug_key
	 */
	public static function log( $class='', $func = '', $line = '', $info = array(), $display_request = false,  $debug_index = '', $debug_key = 'EE_DEBUG_SPCO' ) {
		if ( WP_DEBUG && false ) {
			$debug_key = $debug_key . '_' . EE_Session::instance()->id();
			$debug_data = get_option( $debug_key, array() );
			$default_data = array(
				$class => $func . '() : ' . $line,
				'REQ'  => $display_request ? $_REQUEST : '',
			);
			// don't serialize objects
			$info = self::strip_objects( $info );
			$index = ! empty( $debug_index ) ? $debug_index : 0;
			if ( ! isset( $debug_data[$index] ) ) {
				$debug_data[$index] = array();
			}
			$debug_data[$index][microtime()] = array_merge( $default_data, $info );
			update_option( $debug_key, $debug_data );
		}
	}



	/**
	 * strip_objects
	 *
	 * @param array $info
	 * @return array
	 */
	public static function strip_objects( $info = array() ) {
		foreach ( $info as $key => $value ) {
			if ( is_array( $value ) ) {
				$info[ $key ] = self::strip_objects( $value );
			} else if ( is_object( $value ) ) {
				$object_class = get_class( $value );
				$info[ $object_class ] = array();
				$info[ $object_class ][ 'ID' ] = method_exists( $value, 'ID' ) ? $value->ID() : spl_object_hash( $value );
				if ( method_exists( $value, 'ID' ) ) {
					$info[ $object_class ][ 'ID' ] = $value->ID();
				}
				if ( method_exists( $value, 'status' ) ) {
					$info[ $object_class ][ 'status' ] = $value->status();
				} else if ( method_exists( $value, 'status_ID' ) ) {
					$info[ $object_class ][ 'status' ] = $value->status_ID();
				}
				unset( $info[ $key ] );
			}
		}
		return (array)$info;
	}



	/**
	 *    @ print_r an array
	 *    @ access public
	 *    @ return void
	 *
	 * @param mixed $var
	 * @param bool $var_name
	 * @param string $file
	 * @param int $line
	 * @param string $height
	 * @param bool $die
	 */
	public static function printr( $var, $var_name = false, $file = __FILE__, $line = __LINE__, $height = 'auto', $die = false ) {
		//$print_r = false;
		if ( is_object( $var ) ) {
			$var_name = ! $var_name ? 'object' : $var_name;
			//$print_r = true;
		} else if ( is_array( $var ) ) {
			$var_name = ! $var_name ? 'array' : $var_name;
			//$print_r = true;
		} else if ( is_numeric( $var ) ) {
			$var_name = ! $var_name ? 'numeric' : $var_name;
		} else if ( is_string( $var ) ) {
			$var_name = ! $var_name ? 'string' : $var_name;
		} else if ( is_null( $var ) ) {
			$var_name = ! $var_name ? 'null' : $var_name;
		}
		$var_name = ucwords( str_replace( array( '$', '_' ), array( '', ' ' ), $var_name ) );
		ob_start();
		echo '<pre style="display:block; width:100%; height:' . $height . '; border:2px solid light-blue;">';
		echo '<h5 style="color:#2EA2CC;"><b>' . $var_name . '</b></h5><span style="color:#E76700">';
		//$print_r ? print_r( $var ) : var_dump( $var );
		var_dump( $var );
		echo '</span><br /><span style="font-size:10px;font-weight:normal;">' . $file . '<br />line no: ' . $line . '</span></pre>';
		$result = ob_get_clean();
		if ( $die ) {
			die( $result );
		} else {
			echo $result;
		}
	}




}



/**
 * borrowed from Kint Debugger
 * Plugin URI: http://upthemes.com/plugins/kint-debugger/
 */
if ( class_exists('Kint') && ! function_exists( 'dump_wp_query' ) ) {
	function dump_wp_query(){
		global $wp_query;
		d($wp_query);
	}
}

/**
 * borrowed from Kint Debugger
 * Plugin URI: http://upthemes.com/plugins/kint-debugger/
 */
if ( class_exists('Kint') && ! function_exists( 'dump_wp' ) ) {
	function dump_wp(){
		global $wp;
		d($wp);
	}
}

/**
 * borrowed from Kint Debugger
 * Plugin URI: http://upthemes.com/plugins/kint-debugger/
 */
if ( class_exists('Kint') && ! function_exists( 'dump_post' ) ) {
	function dump_post(){
		global $post;
		d($post);
	}
}


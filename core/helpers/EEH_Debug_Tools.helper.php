<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {exit('No direct script access allowed');}
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
	private static $_instance;

	/**
	 * array containing the start time for the timers
	 */
	private $_start_times;

	/**
	 * array containing all the timer'd times, which can be outputted via show_times()
	 */
	private $_times = array();

	/**
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
		// if ( ! defined('DOING_AJAX') || $_REQUEST['noheader'] !== 'true' || ! isset( $_REQUEST['noheader'], $_REQUEST['TB_iframe'] ) ) {
			//add_action( 'shutdown', array($this,'espresso_session_footer_dump') );
		// }
		$plugin = basename( EE_PLUGIN_DIR_PATH );
		add_action( "activate_{$plugin}", array( 'EEH_Debug_Tools', 'ee_plugin_activation_errors' ));
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
		if ( EE_DEBUG ) {
			EEH_Debug_Tools::instance()->show_times();
		}
	}



	/**
	 * 	dump EE_Session object at bottom of page after everything else has happened
	 *
	 * 	@return void
	 */
	public function espresso_session_footer_dump() {
		if (
			( defined( 'WP_DEBUG' ) && WP_DEBUG )
			&& ! defined( 'DOING_AJAX' )
			&& class_exists( 'Kint' )
			&& function_exists( 'wp_get_current_user' )
			&& current_user_can( 'update_core' )
			&& class_exists( 'EE_Registry' )
		) {
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
	 * @param string $tag
	 * @return void
	 */
	public function espresso_list_hooked_functions( $tag='' ){
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
		foreach( $hook as $tag_name => $priorities ) {
			echo "<br />&gt;&gt;&gt;&gt;&gt;\t<strong>$tag_name</strong><br />";
			ksort( $priorities );
			foreach( $priorities as $priority => $function ){
				echo $priority;
				foreach( $function as $name => $properties ) {
					echo "\t$name<br />";
				}
			}
		}
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
	 * reset_times
	 */
	public function reset_times(){
		$this->_times = array();
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
	public function stop_timer( $timer_name = '' ){
		$timer_name = $timer_name !== '' ? $timer_name : get_called_class();
		if( isset( $this->_start_times[ $timer_name ] ) ){
			$start_time = $this->_start_times[ $timer_name ];
			unset( $this->_start_times[ $timer_name ] );
		}else{
			$start_time = array_pop( $this->_start_times );
		}
		$this->_times[ $timer_name ] =  number_format( microtime( true ) - $start_time, 8 );
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
		return @round( $size / pow( 1024, $i = floor( log( $size, 1024 ) ) ), 2 ) . ' ' . $unit[ absint( $i ) ];
	}



	/**
	 * show_times
	 * @param bool $output_now
	 * @return string
	 */
	public function show_times($output_now=true){
		$output = '';
		if ( ! empty( $this->_times )) {
			$total = 0;
			$output .= '<h2 style="margin:1em .5em 0;">Times:</h2>';
			$output .= '<span style="color:#9999CC; font-size:.8em; margin:0 1.5em 0;">( in milliseconds )</span><br />';
			foreach( $this->_times as $timer_name => $total_time ) {
				$output .= $this->format_time( $timer_name, $total_time );
				$total += $total_time;
			}
			$output .= '<br />';
			$output .= '<h4 style="margin:1em .5em 0;">TOTAL TIME</h4>';
			$output .= $this->format_time( '', $total );
			$output .= '<br />';
		}
		if ( ! empty( $this->_memory_usage_points )) {
			$output .= '<h2 style="margin:1em .5em 0;">Memory</h2>' . implode( '<br />', $this->_memory_usage_points );
		}
		if( $output_now ){
			echo $output;
			return '';
		}
		return $output;
	}



	/**
	 * @param string $timer_name
	 * @param float $total_time
	 * @return string
	 */
	public function format_time( $timer_name, $total_time ) {
		$total_time = $total_time * 1000;
		switch ( $total_time ) {
			case $total_time < 0.01 :
				$color = '#8A549A';
				$bold = 'normal';
				break;
			case $total_time < 0.1 :
				$color = '#00B1CA';
				$bold = 'normal';
				break;
			case $total_time < 1 :
				$color = '#70CC50';
				$bold = 'normal';
				break;
			case $total_time < 10 :
				$color = '#FCC600';
				$bold = 'bold';
				break;
			case $total_time < 100 :
				$color = '#E76700';
				$bold = 'bold';
				break;
			default :
				$color = '#E44064';
				$bold = 'bold';
				break;
		}
		return '<span style="min-width: 10px; margin:0 1em; color:'
			. $color
			. '; font-weight:'
			. $bold
			. '; font-size:1.2em;">'
			. str_pad( number_format( $total_time, 5 ), 11, '0', STR_PAD_LEFT )
			. '</span> '
			. $timer_name
			. '<br />';
	}



	/**
	 * 	captures plugin activation errors for debugging
	 *
	 * 	@return void
	 */
	public static function ee_plugin_activation_errors() {
		if ( WP_DEBUG ) {
			$activation_errors = ob_get_contents();
			if ( ! empty( $activation_errors ) ) {
				$activation_errors = date( 'Y-m-d H:i:s' ) . "\n" . $activation_errors;
			}
			espresso_load_required( 'EEH_File', EE_HELPERS . 'EEH_File.helper.php' );
			if ( class_exists( 'EEH_File' )) {
				try {
					EEH_File::ensure_file_exists_and_is_writable( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . 'espresso_plugin_activation_errors.html' );
					EEH_File::write_to_file( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . 'espresso_plugin_activation_errors.html', $activation_errors );
				} catch( EE_Error $e ){
					EE_Error::add_error( sprintf( __(  'The Event Espresso activation errors file could not be setup because: %s', 'event_espresso' ), $e->getMessage() ), __FILE__, __FUNCTION__, __LINE__ );
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
	 * This basically mimics the WordPress _doing_it_wrong() function except adds our own messaging etc.
	 * Very useful for providing helpful messages to developers when the method of doing something has been deprecated,
	 * or we want to make sure they use something the right way.
	 *
	 * @access public
	 * @param string $function      The function that was called
	 * @param string $message       A message explaining what has been done incorrectly
	 * @param string $version       The version of Event Espresso where the error was added
	 * @param string  $applies_when a version string for when you want the doing_it_wrong notice to begin appearing
	 *                              for a deprecated function. This allows deprecation to occur during one version,
	 *                              but not have any notices appear until a later version. This allows developers
	 *                              extra time to update their code before notices appear.
	 * @param int     $error_type
	 * @uses   trigger_error()
	 */
	public function doing_it_wrong(
		$function,
		$message,
		$version,
		$applies_when = '',
		$error_type = null
	) {
		$applies_when = ! empty( $applies_when ) ? $applies_when : espresso_version();
		$error_type = $error_type !== null ? $error_type : E_USER_NOTICE;
		// because we swapped the parameter order around for the last two params,
		// let's verify that some third party isn't still passing an error type value for the third param
		if ( is_int( $applies_when ) ) {
			$error_type = $applies_when;
			$applies_when = espresso_version();
		}
		// if not displaying notices yet, then just leave
		if ( version_compare( espresso_version(), $applies_when, '<' ) ) {
			return;
		}
		do_action( 'AHEE__EEH_Debug_Tools__doing_it_wrong_run', $function, $message, $version);
		$version = $version === null ? '' : sprintf( __('(This message was added in version %s of Event Espresso)', 'event_espresso' ), $version );
		$error_message = sprintf( esc_html__('%1$s was called %2$sincorrectly%3$s. %4$s %5$s','event_espresso' ), $function, '<strong>', '</strong>', $message, $version );

		//don't trigger error if doing ajax, instead we'll add a transient EE_Error notice that in theory should show on the next request.
		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			$error_message .= ' ' . esc_html__( 'This is a doing_it_wrong message that was triggered during an ajax request.  The request params on this request were: ', 'event_espresso' );
			$error_message .= '<ul><li>';
			$error_message .= implode( '</li><li>', EE_Registry::instance()->REQ->params() );
			$error_message .= '</ul>';
			EE_Error::add_error( $error_message, 'debug::doing_it_wrong', $function, '42' );
			//now we set this on the transient so it shows up on the next request.
			EE_Error::get_notices( false, true );
		} else {
			trigger_error( $error_message, $error_type );
		}
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
	 * @param mixed  $var
	 * @param string $var_name
	 * @param string $file
	 * @param int    $line
	 * @param int $heading_tag
	 * @param bool   $die
	 */
	public static function printv( $var, $var_name = '', $file = __FILE__, $line = __LINE__, $heading_tag = 5, $die = false, $margin ) {
		$var_name = ! $var_name ? 'string' : $var_name;
		$var_name = ucwords( str_replace( '$', '', $var_name ) );
		$is_method = method_exists( $var_name, $var );
		$var_name = ucwords( str_replace( '_', ' ', $var_name ) );
        $heading_tag = is_int($heading_tag) ? "h{$heading_tag}" : "h5";
        $result = EEH_Debug_Tools::heading($var_name, $heading_tag, $margin);
        $result .= $is_method
			? \EEH_Debug_Tools::grey_span('::') . \EEH_Debug_Tools::orange_span($var . "()")
			: \EEH_Debug_Tools::grey_span(' : ') . \EEH_Debug_Tools::orange_span($var);
		$result .= \EEH_Debug_Tools::file_and_line($file, $line);
		$result .= \EEH_Debug_Tools::headingx($heading_tag);
		if ( $die ) {
			die( $result );
		} else {
			echo $result;
		}
	}



    /**
     * @param string $var_name
     * @param string $heading_tag
     * @param string $margin
     * @return string
     */
	protected static function heading( $var_name = '', $heading_tag = 'h5', $margin = '' ) {
        if (defined('EE_TESTS_DIR')) {
            return "\n\n{$var_name}";
        }
        return '<'.$heading_tag.' style="color:#2EA2CC; margin:25px 0 0'.$margin.';"><b>'.$var_name.'</b>';
    }



    /**
     * @param string $heading_tag
     * @return string
     */
	protected static function headingx( $heading_tag = 'h5' ) {
        if (defined('EE_TESTS_DIR')) {
            return "\n";
        }
        return '</' . $heading_tag . '>';
    }



    /**
     * @param string $content
     * @return string
     */
	protected static function grey_span( $content = '' ) {
        if (defined('EE_TESTS_DIR')) {
            return $content;
        }
        return '<span style="color:#999">' . $content . '</span>';
    }



    /**
     * @param string $file
     * @param int    $line
     * @return string
     */
	protected static function file_and_line($file, $line) {
        if (defined('EE_TESTS_DIR')) {
            return "\n (" . $file . ' line no: ' . $line . ' ) ';
        }
        return '<br /><span style="font-size:9px;font-weight:normal;color:#666;line-height: 12px;">' . $file . '<br />line no: ' . $line . '</span>';
    }



    /**
     * @param string $content
     * @return string
     */
    protected static function orange_span($content = '')
    {
        if (defined('EE_TESTS_DIR')) {
            return $content;
        }
        return '<span style="color:#E76700">' . $content . '</span>';
    }



    /**
     * @param mixed $var
     * @return string
     */
    protected static function pre_span($var)
    {
        ob_start();
        var_dump($var);
        $var = ob_get_clean();
        if (defined('EE_TESTS_DIR')) {
            return "\n" . $var;
        }
        return '<pre style="color:#999; padding:1em; background: #fff">' . $var . '</pre>';
    }



    /**
	 * @param mixed $var
	 * @param string $var_name
	 * @param string $file
	 * @param int $line
	 * @param int $heading_tag
	 * @param bool $die
	 */
	public static function printr( $var, $var_name = '', $file = __FILE__, $line = __LINE__, $heading_tag = 5, $die = false ) {
		// return;
		$file = str_replace( rtrim( ABSPATH, '\\/' ), '', $file );
        $margin = is_admin() ? ' 180px' : '0';
        //$print_r = false;
		if ( is_string( $var ) ) {
			EEH_Debug_Tools::printv( $var, $var_name, $file, $line, $heading_tag, $die, $margin );
			return;
		} else if ( is_object( $var ) ) {
			$var_name = ! $var_name ? 'object' : $var_name;
			//$print_r = true;
		} else if ( is_array( $var ) ) {
			$var_name = ! $var_name ? 'array' : $var_name;
			//$print_r = true;
		} else if ( is_numeric( $var ) ) {
			$var_name = ! $var_name ? 'numeric' : $var_name;
		} else if ( is_null( $var ) ) {
			$var_name = ! $var_name ? 'null' : $var_name;
		}
		$var_name = ucwords( str_replace( array( '$', '_' ), array( '', ' ' ), $var_name ) );
        $heading_tag = is_int($heading_tag) ? "h{$heading_tag}" : "h5";
        $result = EEH_Debug_Tools::heading($var_name, $heading_tag, $margin);
		$result .= \EEH_Debug_Tools::grey_span(' : ') . \EEH_Debug_Tools::orange_span(
		    \EEH_Debug_Tools::pre_span($var)
            );
		$result .= \EEH_Debug_Tools::file_and_line($file, $line);
		$result .= \EEH_Debug_Tools::headingx($heading_tag);
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


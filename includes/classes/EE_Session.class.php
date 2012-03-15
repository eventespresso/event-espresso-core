<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 *
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.2.P
 *
 * ------------------------------------------------------------------------
 * 
 * EE_Session class
 *
 * @package				Event Espresso
 * @subpackage			includes/classes
 * @author					Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
 class EE_Session {


  // instance of the EE_Session object
	private static $_instance = NULL;

	// the session id
	private $_sid = NULL;

	// and the session data
	private $_session_data = array();

	// default session expiration 2 hours
	private $_expiration = 7200;

	// current time with GMT offset
	private $_time;

	// whether to encrypt session data
	private $_use_encryption = TRUE;

	// EE_Encryption object stored by reference
	public $encryption = NULL;

	// well... according to the server...
	private $_user_agent = NULL;

	// well... according to the server...
	private $_ip_address = NULL;

	// array for defining default session vars
	private $_default_session_vars = array ( 'id', 'user_id', 'ip_address', 'user_agent', 'init_access', 'last_access', 'last_page' );

	// global error notices
	private $_notices;





	/**
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return class instance
	 */
	public static function instance ( ) {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
			self::$_instance = new self();
			//echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		}
		return self::$_instance;
	}





	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */
  private function __construct() {

		define( 'ESPRESSO_SESSION', TRUE );

		// remove the default espresso session init
		remove_action( 'plugins_loaded', 'espresso_init_session', 1 );

		global $EE_Session, $org_options, $notices;
		$this->_notices = $notices;

		$this->_user_agent = ( isset($_SERVER['HTTP_USER_AGENT'])) ? esc_attr( $_SERVER['HTTP_USER_AGENT'] ) : FALSE;

		// retreive session options from db
		if ( $session_settings = get_option( 'espresso_session_settings' ) !== FALSE ) {
			// cycle though existing session options
			foreach ( $session_settings as $var_name => $session_setting ) {
				// set values for class properties
				$this->_{$var_name} = $session_setting;
			}
		}

		// get the current time with GMT offset taken into consideration
		$this->_time = $this->_session_time();

		// are we using encryption?
		if ( $this->_use_encryption ) {
			require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/classes/EE_Encryption.class.php' );
			// instantiate the class object making all properties and methods accessible via $this->encryption ex: $this->encryption->encrypt();
			$this->encryption = EE_Encryption::instance();
		}

		$extra_default_session_vars = array();
		// filter hook allows outside functions/classes/plugins to change default empty cart
		$extra_default_session_vars = apply_filters( 'filter_hook_espresso_default_session_vars', $extra_default_session_vars );
		array_merge( $this->_default_session_vars, $extra_default_session_vars );

		// set some defaults
		foreach ( $this->_default_session_vars as $default_var ) {
			$this->_session_data[ $default_var ] = '';
		}

////		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';//		echo $this->pre_r($this->_session_data, TRUE);

		// check for existing session and retreive it from db
		if ( ! $this->_espresso_session() ) {
			// or just start a new one
			$this->_create_espresso_session();
		}

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		if ( isset( $_REQUEST['page_id'] ) ) {
			if (  $_REQUEST['page_id'] == $org_options['return_url'] or $_REQUEST['page_id'] == $org_options['notify_url'] ) {
				$this->reset_data( array() );
			}
		}

		// once everything is all said and done,
		add_action( 'shutdown', array( &$this, '_update_espresso_session' ), 100);

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

	}





	/**
	 * @retreive session data
	 * @access	public
	 * @return	array
	 */
	public function id() {
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		return $this->_sid;
	}





	/**
	 * @retreive session data
	 * @access	public
	 * @return	array
	 */
	public function get_session_data( $key = FALSE, $section = FALSE ) {

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

		if ( $section != FALSE && $key != FALSE ) {
			//echo  '1 key : ' . $key . '<br />section : ' . $section . '<br />';
			return $this->_session_data[ $section ][$key];
		} elseif ( $section != FALSE )  {
			//echo  '2 key : ' . $key . '<br />section : ' . $section . '<br />';
			return $this->_session_data[ $section ];
		}  else  {
			//echo  '3 key : ' . $key . '<br />section : ' . $section . '<br />';
			return $this->_session_data;
		}

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

	}





	/**
	 * @set session data
	 * @access	public
	 * @return	TRUE on success, FALSE on fail
	 */
	public function set_session_data( $data, $section = 'cart' ) {

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

		// nothing ??? go home!
		if ( empty( $data )) {
			$this->_notices['errors'][] = 'An error occured. No session data was provided.';
			return FALSE;
		}

		if ( $section == 'session_data' ) {
			foreach ( $data as $key =>$value ) {
				$this->_session_data[ $key ] = $value;
			}
		} else {
			foreach ( $data as $key =>$value ) {
				$this->_session_data[ $section ][ $key ] = $value;
			}
		}

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

		return TRUE;

	}





	/**
	 *			@initiate session
	 *		  @access private
	 *			@return TRUE on success, FALSE on fail
	 */
	private function _espresso_session() {

		// starts a new session if one doesn't already exist, or reinitiates an existing one
		if ( ! session_id() ) {
			session_start();
			$this->_session_data['init_access'] = $this->_time;
		}
		// grab the session ID
		$this->_sid = session_id();

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

		// now let's retreive what's in the db
		// we're using WP's Transient API to store session data using the PHP session ID as the option name
		if ( $session_data = get_transient( $this->_sid ) ) {

			// un-encrypt the data
			$session_data = $this->encryption->decrypt( $session_data );

			// unserialize
			$this->_session_data = unserialize( $session_data );

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

			// just a check to make sure the sesion array is indeed an array
			if ( ! is_array( $session_data ) ) {
				// no?!?! then something's wrong
				return FALSE;
			}

		} else {
			// no previous session = go back and create one
			return FALSE;
		}

		// have we met before???
		// let's compare our stored session details with the current visitor
		// first the ip address
		if ( $session_data['ip_address'] != $this->_visitor_ip() ) {
			return FALSE;
		}
		// now the user agent
		if ( $session_data['user_agent'] != $this->_user_agent ) {
			return FALSE;
		}

		// wait a minute... how old are you?
		// if the last access time for the session is less than the current time subtract the session expiration time...
		// ie: is 1pm less than 4pm minus (the default) 2 hours?
		if ( $session_data['last_access'] < ( $this->_time - $this->_expiration ) ) {
			// yer too old fer me!
			return FALSE;
		}

		// make event espresso session data available to plugin
		$this->_session_data = $session_data;

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

		return TRUE;

	}





	/**
	 *		@save session data to the db
	 *		@access public
	 *		@return TRUE on success, FALSE on fail
	 */
	public function _update_espresso_session( $new_session = FALSE ) {

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

		foreach ( $this->_session_data as $key => $value ) {

			switch( $key ) {

				case 'id' :
						// session ID
						$session_data['id'] = $this->_sid;
				break;

				case 'ip_address' :
						// visitor ip address
						$session_data['ip_address'] = $this->_visitor_ip();
				break;

				case 'user_agent' :
						// visitor user_agent
						$session_data['user_agent'] = $this->_user_agent;
				break;

				case 'init_access' :
							$session_data['init_access'] = absint( $value );
				break;

				case 'last_access' :
						// current access time
						$session_data['last_access'] = $this->_time;
				break;

//				case 'last_page' :
//						$session_data['last_page'] = $value;
//				break;

				default :
						// carry any other data over
						$session_data[$key] = $this->_session_data[$key];
				break;

			}

		}

		// creating a new session does not require saving to the db just yet
		if ( ! $new_session ) {

			// current user if logged in
			$session_data['user_id'] = $this->_wp_user_id();


			$this->_session_data = $session_data;

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

			// ready? let's save
			if ( $this->_save_session_to_db() ) {
				return TRUE;
			} else {
				return FALSE;
			}

		} else {
			$this->_session_data = $session_data;
		}

		// meh, why not?
		return TRUE;

	}





	/**
	 *			@create session data array
	 *		  @access public
	 *			@return void
	 */
	private function _create_espresso_session( ) {

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

		// use the update function for now with $new_session arg set to TRUE
		return  $this->_update_espresso_session( TRUE ) ? TRUE : FALSE;

	}





	/**
	 *			@attempt to get IP address of current visitor from server
	 *		  @access public
	 *			@return string
	 */
	private function _save_session_to_db() {

		$this->_set_last_page();

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		echo printr( $this->_session_data, 'session_data' );

		// are we are we using encryption?
		if ( $this->_use_encryption ) {
			// first serialize all of our session data
			$session_data = serialize( $this->_session_data );
			// now we'll encrypt it
			$session_data = $this->encryption->encrypt( $session_data );
		}

		// we're using the Transient API for storing session data, cuz it's so damn simple -> set_transient(  transient ID, data, expiry )
		return set_transient( $this->_sid, $session_data, $this->_expiration ) ? TRUE : FALSE;

	}





	/**
	 *		@attempt to get IP address of current visitor from server
	 *		@access public
	 *		@return string
	 */
	private function _visitor_ip() {

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

		if ( isset( $_SERVER['HTTP_CLIENT_IP'] )) {
			$visitor_ip = esc_attr( $_SERVER['HTTP_CLIENT_IP'] );
		} elseif ( isset( $_SERVER['REMOTE_ADDR'] )) {
			$visitor_ip = esc_attr( $_SERVER['REMOTE_ADDR'] );
		}

		// break it up!!!
		$ip_bits = explode( ':', $visitor_ip );

		// cycle through this four times
		for ( $i=0; $i<4; $i++ ) {

			if ( ! isset( $ip_bits[$i] )) {
				// nothing set ?
				$ip_bits[$i] = 0;

			} elseif ( ! absint( $ip_bits[$i] )) {
				// not an absolute integer?
				$ip_bits[$i] = 0;

			} elseif ( $ip_bits[$i] < 1 ) {
				// less than 1?
				$ip_bits[$i] = 0;
			}

		}

		// pull yourself together!!
		$ip_bits = implode( ':', $ip_bits );

		return $ip_bits;

	}





	/**
	 *			@the last page the visitor accessed
	 *		  	@access public
	 *			@return void
	 */
	public function _set_last_page() {

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		//$prev_page = $this->get_last_page();
		//echo '<h1>'.__LINE__ . ' - '.__FUNCTION__ .' - ' . $this->_session_data['last_page'] . '</h1>';

		// check for request url
		if ( isset( $_SERVER['REQUEST_URI'] )) {
			$request_uri = esc_url( $_SERVER['REQUEST_URI'] );

			$ru_bits = explode( '?', $request_uri );
			$request_uri = $ru_bits[0];
			//echo '<h1>$request_uri   ' . $request_uri . '</h1>';

			// check for and grab host as well
			if ( isset( $_SERVER['HTTP_HOST'] )) {
				$http_host = esc_url( $_SERVER['HTTP_HOST'] );
			} else {
				$http_host = '';
			}
			//echo '<h1>$http_host   ' . $http_host . '</h1>';

			// check for page_id in SERVER REQUEST
			if ( isset( $_REQUEST['page_id'] )) {
				// rebuild $regevent_action without any of the extra paramaters
				$page_id = '?page_id=' . esc_attr( $_REQUEST['page_id'] ) . '&amp;';
			} else {
				$page_id = '?';
			}
			//echo '<h1>$page_id   ' . $page_id . '</h1>';

			// check for $regevent_action in SERVER REQUEST
			if ( isset( $_REQUEST['regevent_action'] )) {
				// rebuild $regevent_action without any of the extra paramaters
				$regevent_action = 'regevent_action=' . esc_attr( $_REQUEST['regevent_action'] );
			} else {
				$regevent_action = '';
			}
			//echo '<h1>$regevent_action   ' . $regevent_action . '</h1>';


			$last_page = rtrim( $http_host . $request_uri . $page_id . $regevent_action, '?' );
			//$last_page = $http_host . $request_uri;
			//echo '<h1>$last_page   ' . $last_page . '</h1>';
			// if the page hasn't really changed (because of a refresh or something),
			// then we will keep the last page that was different than the current page
//			if ( $last_page != $prev_page ) {
				$this->_session_data[ 'last_page' ] = $last_page;
//			}

		}

		//echo '<h1>'.__LINE__ . ' - '.__FUNCTION__ .' - ' . $this->_session_data['last_page'] . '</h1>';

	}





	/**
	 *			@the last page the visitor accessed
	 *		  	@access public
	 *			@return void
	 */
	public function get_last_page() {

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';//		if ( isset( $this->_session_data[ 'last_page' ] )) {
//			$last_page = $this->_session_data[ 'last_page' ];
//		} else {
//			if ( isset( $_SERVER['HTTP_REFERER'] )) {
//				$last_page = esc_url( $_SERVER['HTTP_REFERER'] );
//			}
//		}
		//echo '<h1>'.__LINE__ . ' - '.__FUNCTION__ .' - ' . $this->_session_data['last_page'] . '</h1>';
		//return $last_page;
		return $this->_session_data[ 'last_page' ];

	}




	/**
	 *			@the current wp user id
	 *		  @access public
	 *			@return void
	 */
	public function _wp_user_id() {
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

		// if I need to explain the following lines of code, then you shouldn't be looking at this!
		$user = wp_get_current_user();
		$this->_wp_user_id = isset( $user->data->ID ) ? $user->data->ID : NULL;
		return $this->_wp_user_id;
	}





	/**
	 *			@resets all non-default session vars
	 *		  @access public
	 *			@return TRUE on success, FALSE on fail
	 */
	public function reset_data( $data_to_reset = FALSE ) {

//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

		// nothing ??? go home!
		if ( ! $data_to_reset ) {
			$this->_notices['errors'][] = 'An error occured. No session data could be reset, because no session var name was provided.';
			return FALSE;
		}

		// if $data_to_reset is not in an array, then put it in one
		if ( ! is_array( $data_to_reset ) ) {
			$data_to_reset = array ( $data_to_reset );
		}

		// since $data_to_reset is an array, cycle through the values
		foreach ( $data_to_reset as $reset ) {

			// first check to make sure it is a valid session var
			if ( isset( $this->_session_data[ $reset ] )) {

				// then check to make sure it is not a default var
				if ( ! in_array( $reset, $this->_default_session_vars )) {
					// set var to NULL
					$this->_session_data[ $reset ] = NULL;
					$this->_notices['updates'][] = 'The session variable '.$reset.' was reset.';
					return TRUE;

				} else {
					// yeeeeeeeeerrrrrrrrrrr OUT !!!!
					$this->_notices['errors'][] = 'Sorry! Default session data can not be reset.';
					return FALSE;
				}

			} else {
				// opps! that session var does not exist!
				$this->_notices['errors'][] = 'An error occured. The session item provided is invalid or does not exist.';
				return FALSE;
			}

		} // end of foreach

	}





	/**
	 *   get the real "now" time
	 *   @access private
	 *   @return	 string
	 */
	private function _session_time() {

////		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

		// what time is it Mr Wolf?
		$now = time();

		$date_format = get_option('date_format');
		$time_format = get_option('time_format');
		$time_format = $date_format . ', ' . $time_format;

		$offset = get_option('gmt_offset');
		$timezone_string = get_option('timezone_string');
		// if timezone string is empty
		if ( ! $timezone_string ) {
			// set it to EST
			$timezone_string = 'America/New_York';
		}
		date_default_timezone_set($timezone_string);

		// generate the user time, taking the gmt offset into consideration
		$time = mktime(gmdate("H", $now)+$offset, gmdate("i", $now), gmdate("s", $now), gmdate("m", $now), gmdate("d", $now), gmdate("Y", $now));

		return $time;
	}





//	/**
//	 *   remove the action that loads the default espresso session init
//	 *   @access public
//	 *   @return void
//	 */
//	public function remove_action_espresso_init_session() {
//		remove_action( 'plugins_loaded', 'espresso_init_session', 1 );
//	}





	/**
	 * print_r wrapper for html/cli output
	 *
	 * Wraps print_r() output in < pre > tags if the current sapi is not
	 * 'cli'.  Returns the output string instead of displaying it if $return is
	 * true.
	 *
	 * @param mixed $mixed variable or expression to display
	 * @param bool $return
	 *
	 */
	function pre_r($mixed, $return = false) {

	  if ($return)
		return '<pre style="height:auto;">' . print_r($mixed, true) . '</pre>';

	  if ( php_sapi_name() !== 'cli')
		echo ('<pre style="height:auto;">');
	  print_r($mixed);

	  if ( php_sapi_name() !== 'cli')
		echo('</pre>');
	  else
		echo ('\n');
	  flush();

	}






}

/* End of file EE_Session.class.php */
/* Location: /includes/classes/EE_Session.class.php */
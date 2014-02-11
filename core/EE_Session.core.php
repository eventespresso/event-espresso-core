<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );/**
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
 * @ version		 	4.0
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
	private $_expiration = 172800;

	// current time with GMT offset
	private $_time;

	// whether to encrypt session data
	private $_use_encryption = FALSE;

	// EE_Encryption object stored by reference
	public $encryption = NULL;

	// well... according to the server...
	private $_user_agent = NULL;

	// well... according to the server...
	private $_ip_address = NULL;

	// array for defining default session vars
	private $_default_session_vars = array ( 
		'id' => NULL,
		'user_id' => NULL,
		'ip_address' => NULL,
		'user_agent' => NULL,
		'init_access' => NULL,
		'last_access' => NULL,
		'pages_visited' => array()
	);







	/**
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return class instance
	 */
	public static function instance ( ) {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Session )) {
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

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		define( 'ESPRESSO_SESSION', TRUE );

		// remove the default espresso session init
		remove_action( 'plugins_loaded', 'espresso_init_session', 1 );

		// retreive session options from db
		if ( $session_settings = get_option( 'espresso_session_settings' ) !== FALSE ) {
			// cycle though existing session options
			foreach ( $session_settings as $var_name => $session_setting ) {
				// set values for class properties
				$this->_{$var_name} = $session_setting;
			}
		}

		// get the current time in UTC
		$this->_time = time();

		// are we using encryption?
		if ( $this->_use_encryption ) {
			// instantiate the class object making all properties and methods accessible via $this->encryption ex: $this->encryption->encrypt();
			$this->encryption = EE_Registry::instance()->load_core( 'Encryption' );
		}

		// filter hook allows outside functions/classes/plugins to change default empty cart
		$extra_default_session_vars = apply_filters( 'FHEE__EE_Session__construct__extra_default_session_vars', array() );
		array_merge( $this->_default_session_vars, $extra_default_session_vars );

		$this->_set_defaults();

		// check for existing session and retreive it from db
		if ( ! $this->_espresso_session() ) {
			// or just start a new one
			$this->_create_espresso_session();
		}
//		if ( ! isset( $_REQUEST['ee'] ) || $_REQUEST['ee'] != 'process_ticket_selections' ) {
//			d( $this->_session_data );
//		}
		// check request for 'clear_session' param
		add_action( 'wp_loaded', array( $this, 'wp_loaded' ), 10 );
		// once everything is all said and done,
		add_action( 'shutdown', array( $this, 'update' ), 100);

	}



	/**
	 * This just sets some defaults for the _session data property
	 *
	 * @access private
	 * @return void
	 */
	private function _set_defaults() {
		// set some defaults
		foreach ( $this->_default_session_vars as $key => $default_var ) {
			if ( is_array( $default_var )) {
				$this->_session_data[ $key ] = array();
			} else {
				$this->_session_data[ $key ] = '';
			}			
		}
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
	public function get_session_data( $key = NULL ) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		 if ( ! empty( $key ))  {
			return  isset( $this->_session_data[ $key ] ) ? $this->_session_data[ $key ] : NULL;
		}  else  {
			return $this->_session_data;
		}
	}






	/**
	 * @set session data
	 * @access	public
	 * @return	TRUE on success, FALSE on fail
	 */
	public function set_session_data( $data ) {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

		// nothing ??? bad data ??? go home!
		if ( empty( $data ) || ! is_array( $data )) {
			EE_Error::add_error( __( 'No session data or invalid session data was provided.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		foreach ( $data as $key =>$value ) {
			if ( isset( $this->_default_session_vars[ $key ] )) {
				EE_Error::add_error( sprintf( __( 'Sorry! %s is a default session datum and can not be reset.', 'event_espresso' ), $key ), __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
			} else {
				// are we saving a copy of the transaction ?
				if ( $key == 'transaction' && $value instanceof EE_Transaction ) {
					// then let's remove the session data from the transaction before we save the transaction in the session_data
					$value->set_txn_session_data( NULL );
				}
				$this->_session_data[ $key ] = $value;				
			}
		}

		return TRUE;

	}





	/**
	 *			@initiate session
	 *		  @access private
	 *			@return TRUE on success, FALSE on fail
	 */
	private function _espresso_session() {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		// first visit ?
		if ( session_id() === '' ) {
			//starts a new session if one doesn't already exist, or reinitiates an existing one
			session_start();
			// set initial site access time
			$this->_session_data['init_access'] = $this->_time;		
			// set referer	
			if ( isset( $_SERVER['HTTP_REFERER'] )) {
				$this->_session_data[ 'pages_visited' ][ $this->_session_data['init_access'] ] = esc_attr( $_SERVER['HTTP_REFERER'] );
			} else {
				$this->_session_data[ 'pages_visited' ][ $this->_session_data['init_access'] ] = '';
			}
		}
		// grab the session ID
		$this->_sid = session_id();
		//d( $this->_sid );
		// set the "user agent"
		$this->_user_agent = ( isset($_SERVER['HTTP_USER_AGENT'])) ? esc_attr( $_SERVER['HTTP_USER_AGENT'] ) : FALSE;
		// now let's retreive what's in the db
		// we're using WP's Transient API to store session data using the PHP session ID as the option name
		if ( $session_data = get_transient( 'ee_ssn_' . $this->_sid )) {
			// un-encrypt the data
			$session_data = $this->_use_encryption ? $this->encryption->decrypt( $session_data ) : $session_data;
			// unserialize
			$session_data = maybe_unserialize( $session_data );
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

		return TRUE;

	}





	/**
	 *		@update session data  prior to saving to the db
	 *		@access public
	 *		@return TRUE on success, FALSE on fail
	 */
	public function update( $new_session = FALSE ) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		$this->_session_data = isset( $this->_session_data ) && is_array( $this->_session_data ) && isset( $this->_session_data['id']) ? $this->_session_data : NULL;
		if ( empty( $this->_session_data )) {
			$this->_set_defaults();
		}			
		
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

				case 'pages_visited' :
					if ( $page_visit = $this->_get_page_visit() ) {
						// set pages visited where the first will be the http referrer
						$this->_session_data[ 'pages_visited' ][ $this->_time ] = $this->_get_page_visit();
						// we'll only save the last 10 page visits.
						$session_data[ 'pages_visited' ] = array_slice( $this->_session_data['pages_visited'], -10 );					
					}
				break;

				default :
					// carry any other data over
					$session_data[$key] = $this->_session_data[$key];
				break;

			}

		}

		// current user if logged in
		$session_data['user_id'] = $this->_wp_user_id();

		$this->_session_data = $session_data;

		// creating a new session does not require saving to the db just yet
		if ( ! $new_session ) {
			// ready? let's save
			if ( $this->_save_session_to_db() ) {
				return TRUE;
			} else {
				return FALSE;
			}
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

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

		// use the update function for now with $new_session arg set to TRUE
		return  $this->update( TRUE ) ? TRUE : FALSE;

	}





	/**
	 *			@attempt to get IP address of current visitor from server
	 *		  @access public
	 *			@return string
	 */
	private function _save_session_to_db() {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
//		echo printr( $this->_session_data, 'session_data' );
//		if ( EE_Registry::instance()->REQ->get( 'ee' ) != 'process_ticket_selections' ) {
//			echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
//		}
//				

		// first serialize all of our session data
		$session_data = serialize( $this->_session_data );
		// encrypt it if we are using encryption
		$session_data = $this->_use_encryption ? $this->encryption->encrypt( $session_data ) : $session_data;
		// we're using the Transient API for storing session data, cuz it's so damn simple -> set_transient(  transient ID, data, expiry )
		return set_transient( 'ee_ssn_' . $this->_sid, $session_data, $this->_expiration ) ? TRUE : FALSE;

	}
	
	

	
	/**
	 *	@attempt to get IP address of current visitor from server
	 *	@access public
	 *	@return string
	* 	TODO: can use this when PHP >+ 5.2 becomes required by WP
	 */
//	private function _visitor_ip() {
//		foreach ( array( 'REMOTE_ADDR', 'HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED' ) as $key ) {
//			if ( isset( $_SERVER[ $key ] )) {
//				foreach ( explode( ',', $_SERVER[ $key ] ) as $ip ) {
//					$ip = trim( $ip );
//					if ( filter_var( $ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE ) !== FALSE ){
//						return $ip;
//					}
//				}
//			}
//		}
//	}




	/**
	 *	@attempt to get IP address of current visitor from server
	 *	@access public
	 *	@return string
	 */
	private function _visitor_ip() {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		$visitor_ip = '0:0:0:0';

		if ( isset( $_SERVER['REMOTE_ADDR'] )) {
			if ( preg_match( '/^(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/', $_SERVER['REMOTE_ADDR'] )) {
				$visitor_ip = esc_attr( $_SERVER['REMOTE_ADDR'] );
			}			
		} else if ( isset( $_SERVER['HTTP_CLIENT_IP'] )) {
			if ( preg_match( '/^(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/', $_SERVER['HTTP_CLIENT_IP'] )) {
				$visitor_ip = esc_attr( $_SERVER['HTTP_CLIENT_IP'] );
			}
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
	 *			@get the full page request the visitor is accessing
	 *		  	@access public
	 *			@return void
	 */
	public function _get_page_visit() {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		$page_visit = home_url('/') . 'wp-admin/admin-ajax.php';
		
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
				// rebuild $e_reg without any of the extra paramaters
				$page_id = '?page_id=' . esc_attr( $_REQUEST['page_id'] ) . '&amp;';
			} else {
				$page_id = '?';
			}
			// check for $e_reg in SERVER REQUEST
			if ( isset( $_REQUEST['ee'] )) {
				// rebuild $e_reg without any of the extra paramaters
				$e_reg = 'ee=' . esc_attr( $_REQUEST['ee'] );
			} else {
				$e_reg = '';
			}

			$page_visit = rtrim( $http_host . $request_uri . $page_id . $e_reg, '?' );

		}
		
		if ( $page_visit != home_url('/') . 'wp-admin/admin-ajax.php' ) {
			return $page_visit;
		} else {
			return FALSE;
		}
		
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
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, ' wp_user_id = ' . $this->_wp_user_id );
		return $this->_wp_user_id;
	}





	/**
	 * 		Clear EE_Session data
	 *
	 * 		@access public
	 * 		@return void
	 */
	public function clear_session() {
		// wipe out everything that isn't a default session datum
		$this->reset_data( array_keys( $this->_session_data ));
	}





	/**
	 *			@resets all non-default session vars
	 *		  @access public
	 *			@return TRUE on success, FALSE on fail
	 */
	public function reset_data( $data_to_reset = FALSE, $show_all_notices = FALSE ) {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
//		echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';

		// nothing ??? go home!
		if ( ! $data_to_reset ) {
			EE_Error::add_error( __( 'No session data could be reset, because no session var name was provided.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// if $data_to_reset is not in an array, then put it in one
		if ( ! is_array( $data_to_reset ) ) {
			$data_to_reset = array ( $data_to_reset );
		}
		
		$return_value = TRUE;

		// since $data_to_reset is an array, cycle through the values
		foreach ( $data_to_reset as $reset ) {

			// first check to make sure it is a valid session var
			if ( isset( $this->_session_data[ $reset ] )) {
				// then check to make sure it is not a default var
				if ( ! array_key_exists( $reset, $this->_default_session_vars )) {
					// remove session var
					unset( $this->_session_data[ $reset ] );
					if ( $show_all_notices ) {
						EE_Error::add_success( sprintf( __( 'The session variable %s was removed.', 'event_espresso' ), $reset ), __FILE__, __FUNCTION__, __LINE__ );
					}
					$return_value = !isset($return_value) ? TRUE : $return_value;

				} else {
					// yeeeeeeeeerrrrrrrrrrr OUT !!!!
					if ( $show_all_notices ) {
						EE_Error::add_error( sprintf( __( 'Sorry! %s is a default session datum and can not be reset.', 'event_espresso' ), $reset ), __FILE__, __FUNCTION__, __LINE__ );
					}
					$return_value = FALSE;
				}

			} else if ( $show_all_notices ) {
				// opps! that session var does not exist!
				EE_Error::add_error( sprintf( __( 'The session item provided, %s, is invalid or does not exist.', 'event_espresso' ), $reset ), __FILE__, __FUNCTION__, __LINE__ );
				$return_value = FALSE;
			}

		} // end of foreach
		return $return_value;

	}






	/**
	 *   wp_loaded
	 *   @access public
	 *   @return	 string
	 */
	public function wp_loaded() {
		if ( isset(  EE_Registry::instance()->REQ ) && EE_Registry::instance()->REQ->is_set( 'clear_session' )) {
			$this->clear_session( __CLASS__, __FUNCTION__ );
		}
	}


	/**
	 * implementations from the Serializable PHP interface
	 */

	/**
	 * Clean up object before EE_Session is saved to the db
	 * @return string serialized object
	 */
//	public function serialize() {
//		//first reduce the 'pages_visited' count, we'll only save the last 10 page visits.
//		$this->_session_data['pages_visited'] = array_slice( $this->_session_data['pages_visited'], -10 );
//
//		//data to serialize
//		$serialized = array(
//			'sid' => $this->_sid,
//			'session_data' => $this->_session_data,
//			'expiration' => $this->_expiration,
//			'time' => $this->_time,
//			'use_encryption' => $this->_use_encryption,
//			'user_agent' => $this->_user_agent,
//			'ip_address' => $this->_ip_address 
//			);
//
//		return serialize( $serialized );
//		
//	}




	/**
	 * return unserialized object from the db
	 * @param  string $data serialized object
	 * @return EE_Session   this object
	 */
//	public function unserialize( $data ) {
//		$serialized = unserialize( $data );
//		foreach ( $serialized as $prop_name => $prop_value ) {
//			$prop_name = '_' . $prop_name;
//			$this->$prop_name = $prop_value;
//		}
//	}


}

/* End of file EE_Session.class.php */
/* Location: /includes/classes/EE_Session.class.php */
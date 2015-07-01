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

	 const session_id_prefix = 'ee_ssn_';
	 const hash_check_prefix = 'ee_shc_';

	 /**
	  * instance of the EE_Session object
	  * @var EE_Session
	  */
	 private static $_instance = NULL;

	 /**
	  * the session id
	  * @var string
	  */
	 private $_sid = NULL;

	 /**
	  * session id salt
	  * @var string
	  */
	 private $_sid_salt = NULL;

	 /**
	  * session data
	  * @var array
	  */
	 private $_session_data = array();

	 /**
	  * how long an EE session lasts
	  * default session lifespan of 2 hours (for not so instant IPNs)
	  * @var int
	  */
	 private $_lifespan;

	 /**
	  * session expiration time as Unix timestamp in GMT
	  * @var int
	  */
	 private $_expiration;

	 /**
	  * current time as Unix timestamp in GMT
	  * @var int
	  */
	 private $_time;

	 /**
	  * whether to encrypt session data
	  * @var bool
	  */
	 private $_use_encryption = FALSE;

	 /**
	  * EE_Encryption object
	  * @var EE_Encryption
	  */
	 private $encryption = NULL;

	 /**
	  * well... according to the server...
	  * @var null
	  */
	 private $_user_agent = NULL;

	 /**
	  * do you really trust the server ?
	  * @var null
	  */
	 private $_ip_address = NULL;

	 /**
	  * current WP user_id
	  * @var null
	  */
	 private $_wp_user_id = NULL;

	 /**
	  * array for defining default session vars
	  * @var array
	  */
	 private $_default_session_vars = array (
		'id' => NULL,
		'user_id' => NULL,
		'ip_address' => NULL,
		'user_agent' => NULL,
		'init_access' => NULL,
		'last_access' => NULL,
		'expiration' => NULL,
		'pages_visited' => array()
	);







	/**
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return EE_Session
	 */
	public static function instance ( ) {
		// check if class object is instantiated
		if ( ! self::$_instance instanceof EE_Session ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}



	/**
	* 	private constructor to prevent direct creation
	* 	@Constructor
	* 	@access private
	* 	@return EE_Session
	*/
	private function __construct() {

		// session loading is turned ON by default, but prior to the init hook, can be turned back OFF via: add_filter( 'FHEE_load_EE_Session', '__return_false' );
		if ( ! apply_filters( 'FHEE_load_EE_Session', TRUE ) ) {
			return NULL;
		}
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		define( 'ESPRESSO_SESSION', TRUE );
		// default session lifespan in seconds
		$this->_lifespan = apply_filters(
			'FHEE__EE_Session__construct___lifespan',
			60 * MINUTE_IN_SECONDS
		) + 1;
		/*
		 * do something like the following to adjust the session lifespan:
		 * 		public static function session_lifespan() {
		 * 			return 15 * MINUTE_IN_SECONDS;
		 * 		}
		 */
		// retrieve session options from db
		$session_settings = get_option( 'ee_session_settings' );
		if ( $session_settings !== FALSE ) {
			// cycle though existing session options
			foreach ( $session_settings as $var_name => $session_setting ) {
				// set values for class properties
				$var_name = '_' . $var_name;
				$this->{$var_name} = $session_setting;
			}
		}
		// are we using encryption?
		if ( $this->_use_encryption ) {
			// instantiate the class object making all properties and methods accessible via $this->encryption ex: $this->encryption->encrypt();
			$this->encryption = EE_Registry::instance()->load_core( 'Encryption' );
		}
		// filter hook allows outside functions/classes/plugins to change default empty cart
		$extra_default_session_vars = apply_filters( 'FHEE__EE_Session__construct__extra_default_session_vars', array() );
		array_merge( $this->_default_session_vars, $extra_default_session_vars );
		// apply default session vars
		$this->_set_defaults();
		// check for existing session and retrieve it from db
		if ( ! $this->_espresso_session() ) {
			// or just start a new one
			$this->_create_espresso_session();
		}
		// check request for 'clear_session' param
		add_action( 'AHEE__EE_Request_Handler__construct__complete', array( $this, 'wp_loaded' ));
		// once everything is all said and done,
		add_action( 'shutdown', array( $this, 'update' ), 100 );
		add_action( 'shutdown', array( $this, 'garbage_collection' ), 999 );

	}



	 /**
	  * @return int
	  */
	 public function expiration() {
		 return $this->_expiration;
	 }



	 /**
	  * @return int
	  */
	 public function lifespan() {
		 return $this->_lifespan;
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
	 * @retrieve session data
	 * @access	public
	 * @return	string
	 */
	public function id() {
		return $this->_sid;
	}



	 /**
	  * @param \EE_Cart $cart
	  * @return bool
	  */
	 public function set_cart( EE_Cart $cart ) {
		 $this->_session_data['cart'] = $cart;
		 return TRUE;
	 }



	 /**
	  * reset_cart
	  */
	 public function reset_cart() {
		 $this->_session_data['cart'] = NULL;
	 }



	 /**
	  * @return \EE_Cart
	  */
	 public function cart() {
		 return isset( $this->_session_data['cart'] ) ? $this->_session_data['cart'] : NULL;
	 }



	 /**
	  * @param \EE_Checkout $checkout
	  * @return bool
	  */
	 public function set_checkout( EE_Checkout $checkout ) {
		 $this->_session_data['checkout'] = $checkout;
		 return TRUE;
	 }



	 /**
	  * reset_checkout
	  */
	 public function reset_checkout() {
		 $this->_session_data['checkout'] = NULL;
	 }



	 /**
	  * @return \EE_Checkout
	  */
	 public function checkout() {
		 return isset( $this->_session_data['checkout'] ) ? $this->_session_data['checkout'] : NULL;
	 }



	 /**
	  * @param \EE_Transaction $transaction
	  * @return bool
	  */
	 public function set_transaction( EE_Transaction $transaction ) {
		 // first remove the session from the transaction before we save the transaction in the session
		 $transaction->set_txn_session_data( NULL );
		 $this->_session_data['transaction'] = $transaction;
		 return TRUE;
	 }



	 /**
	  * reset_transaction
	  */
	 public function reset_transaction() {
		 $this->_session_data['transaction'] = NULL;
	 }



	 /**
	  * @return \EE_Transaction
	  */
	 public function transaction() {
		 return isset( $this->_session_data['transaction'] ) ? $this->_session_data['transaction'] : NULL;
	 }



	 /**
	  * retrieve session data
	  * @access    public
	  * @param null $key
	  * @param bool $reset_cache
	  * @return    array
	  */
	public function get_session_data( $key = NULL, $reset_cache = FALSE ) {
		if ( $reset_cache ) {
			$this->reset_cart();
			$this->reset_checkout();
			$this->reset_transaction();
		}
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		 if ( ! empty( $key ))  {
			return  isset( $this->_session_data[ $key ] ) ? $this->_session_data[ $key ] : NULL;
		}  else  {
			return $this->_session_data;
		}
	}



	 /**
	  * set session data
	  * @access 	public
	  * @param 	array $data
	  * @return 	TRUE on success, FALSE on fail
	  */
	public function set_session_data( $data ) {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

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
				$this->_session_data[ $key ] = $value;
			}
		}

		return TRUE;

	}



	 /**
	  * @initiate session
	  * @access   private
	  * @return TRUE on success, FALSE on fail
	  * @throws \EE_Error
	  */
	private function _espresso_session() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		// check that session has started
		if ( session_id() === '' ) {
			//starts a new session if one doesn't already exist, or re-initiates an existing one
			session_start();
		}
		// get our modified session ID
		$this->_sid = $this->_generate_session_id();
		// and the visitors IP
		$this->_ip_address = $this->_visitor_ip();
		// set the "user agent"
		$this->_user_agent = ( isset($_SERVER['HTTP_USER_AGENT'])) ? esc_attr( $_SERVER['HTTP_USER_AGENT'] ) : FALSE;
		// now let's retrieve what's in the db
		// we're using WP's Transient API to store session data using the PHP session ID as the option name
		$session_data = get_transient( EE_Session::session_id_prefix . $this->_sid );
		if ( $session_data ) {
			if ( apply_filters( 'FHEE__EE_Session___perform_session_id_hash_check', WP_DEBUG ) ) {
				$hash_check = get_transient( EE_Session::hash_check_prefix . $this->_sid );
				if ( $hash_check && $hash_check !== md5( $session_data ) ) {
					EE_Error::add_error(
						sprintf(
							__( 'The stored data for session %1$s failed to pass a hash check and therefore appears to be invalid.', 'event_espresso' ),
							EE_Session::session_id_prefix . $this->_sid
						),
						__FILE__, __FUNCTION__, __LINE__
					);
				}
			}
			// un-encrypt the data
			$session_data = $this->_use_encryption ? $this->encryption->decrypt( $session_data ) : $session_data;
			// unserialize
			$session_data = maybe_unserialize( $session_data );
			// just a check to make sure the session array is indeed an array
			if ( ! is_array( $session_data ) ) {
				// no?!?! then something is wrong
				return FALSE;
			}
			// get the current time in UTC
			$this->_time = isset( $this->_time ) ? $this->_time : time();
			// and reset the session expiration
			$this->_expiration = isset( $session_data['expiration'] ) ? $session_data['expiration'] : $this->_time + $this->_lifespan;

		} else {
			// set initial site access time and the session expiration
			$this->_set_init_access_and_expiration();
			// set referer
			$this->_session_data[ 'pages_visited' ][ $this->_session_data['init_access'] ] = isset( $_SERVER['HTTP_REFERER'] ) ? esc_attr( $_SERVER['HTTP_REFERER'] ) : '';
			// no previous session = go back and create one (on top of the data above)
			return FALSE;
		}

		// have we met before???
		// let's compare our stored session details with the current visitor
		// first the ip address
		if ( $session_data['ip_address'] != $this->_ip_address ) {
			return FALSE;
		}
		// now the user agent
		if ( $session_data['user_agent'] != $this->_user_agent ) {
			return FALSE;
		}
		// wait a minute... how old are you?
		if ( $this->_time > $this->_expiration ) {
			// yer too old fer me!
			// wipe out everything that isn't a default session datum
			$this->clear_session( __CLASS__, __FUNCTION__ );
		}
		// make event espresso session data available to plugin
		$this->_session_data = array_merge( $this->_session_data, $session_data );
		return TRUE;

	}



	 /**
	  * _generate_session_id
	  * Retrieves the PHP session id either directly from the PHP session,
	  * or from the $_REQUEST array if it was passed in from an AJAX request.
	  * The session id is then salted and hashed (mmm sounds tasty)
	  * so that it can be safely used as a $_REQUEST param
	  *
	  * @return string
	  */
	protected function _generate_session_id() {
		// was session id salt already saved to db ?
		if ( empty( $this->_sid_salt ) ) {
			// no?  then maybe use WP defined constant
			if ( defined( 'AUTH_SALT' ) ) {
				$this->_sid_salt = AUTH_SALT;
			}
			// if salt doesn't exist or is too short
			if ( empty( $this->_sid_salt ) || strlen( $this->_sid_salt ) < 32 ) {
				// create a new one
				$this->_sid_salt = wp_generate_password( 64 );
			}
			// and save it as a permanent session setting
			$session_settings = get_option( 'ee_session_settings' );
			$session_settings['sid_salt'] = $this->_sid_salt;
			update_option( 'ee_session_settings', $session_settings );
		}
		// check if the SID was passed explicitly, otherwise get from session, then add salt and hash it to reduce length
		$session_id = isset( $_REQUEST[ 'EESID' ] ) ? sanitize_text_field( $_REQUEST[ 'EESID' ] ) : md5( session_id() . $this->_sid_salt );
		return apply_filters( 'FHEE__EE_Session___generate_session_id__session_id', $session_id );
	}



	 /**
	  * _set_init_access_and_expiration
	  * @return void
	  */
	protected function _set_init_access_and_expiration() {
		$this->_time = time();
		$this->_expiration = $this->_time + $this->_lifespan;
		// set initial site access time
		$this->_session_data['init_access'] = $this->_time;
		// and the session expiration
		$this->_session_data['expiration'] = $this->_expiration;
	}



	 /**
	  * @update session data  prior to saving to the db
	  * @access public
	  * @param bool $new_session
	  * @return TRUE on success, FALSE on fail
	  */
	public function update( $new_session = FALSE ) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_session_data = isset( $this->_session_data )
			&& is_array( $this->_session_data )
			&& isset( $this->_session_data['id'])
			? $this->_session_data
			: NULL;
		if ( empty( $this->_session_data )) {
			$this->_set_defaults();
		}
		$session_data = array();
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

				case 'expiration' :
					// when the session expires
					$session_data['expiration'] = ! empty( $this->_expiration )
						? $this->_expiration
						: $session_data['init_access'] + $this->_lifespan;
				break;

				case 'user_id' :
					// current user if logged in
					$session_data['user_id'] = $this->_wp_user_id();
				break;

				case 'pages_visited' :
					$page_visit = $this->_get_page_visit();
					if ( $page_visit ) {
						// set pages visited where the first will be the http referrer
						$this->_session_data[ 'pages_visited' ][ $this->_time ] = $page_visit;
						// we'll only save the last 10 page visits.
						$session_data[ 'pages_visited' ] = array_slice( $this->_session_data['pages_visited'], -10 );
					}
				break;

				default :
					// carry any other data over
					$session_data[$key] = $this->_session_data[$key];

			}

		}

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
	 * 	@create session data array
	 * 	@access public
	 * 	@return bool
	 */
	private function _create_espresso_session( ) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		// use the update function for now with $new_session arg set to TRUE
		return  $this->update( TRUE ) ? TRUE : FALSE;
	}





	/**
	 * _save_session_to_db
	 *
	 * 	@access public
	 * 	@return string
	 */
	private function _save_session_to_db() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		if (
			! EE_Registry::instance()->REQ instanceof EE_Request_Handler
			|| ! (
				EE_Registry::instance()->REQ->is_espresso_page()
				|| EE_Registry::instance()->REQ->front_ajax
			)
		) {
			return FALSE;
		}
		// first serialize all of our session data
		$session_data = serialize( $this->_session_data );
		// encrypt it if we are using encryption
		$session_data = $this->_use_encryption ? $this->encryption->encrypt( $session_data ) : $session_data;
		// maybe save hash check
		if ( apply_filters( 'FHEE__EE_Session___perform_session_id_hash_check', WP_DEBUG ) ) {
			set_transient( EE_Session::hash_check_prefix . $this->_sid, md5( $session_data ), $this->_lifespan );
		}
		// we're using the Transient API for storing session data, cuz it's so damn simple -> set_transient(  transient ID, data, expiry )
		return set_transient( EE_Session::session_id_prefix . $this->_sid, $session_data, $this->_lifespan );
	}





	/**
	 * _visitor_ip
	 *	attempt to get IP address of current visitor from server
	 * plz see: http://stackoverflow.com/a/2031935/1475279
	 *
	 *	@access public
	 *	@return string
	 */
	private function _visitor_ip() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$visitor_ip = '0.0.0.0';
		$server_keys = array(
			'HTTP_CLIENT_IP',
			'HTTP_X_FORWARDED_FOR',
			'HTTP_X_FORWARDED',
			'HTTP_X_CLUSTER_CLIENT_IP',
			'HTTP_FORWARDED_FOR',
			'HTTP_FORWARDED',
			'REMOTE_ADDR'
		);
		foreach ( $server_keys as $key ){
			if ( isset( $_SERVER[ $key ] )) {
				foreach ( array_map( 'trim', explode( ',', $_SERVER[ $key ] )) as $ip ) {
					if ( $ip === '127.0.0.1' || filter_var( $ip, FILTER_VALIDATE_IP ) !== FALSE ) {
						$visitor_ip = $ip;
					}
				}
			}
		}
		return $visitor_ip;
	}





	/**
	 *			@get the full page request the visitor is accessing
	 *		  	@access public
	 *			@return string
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
				// rebuild $e_reg without any of the extra parameters
				$page_id = '?page_id=' . esc_attr( $_REQUEST['page_id'] ) . '&amp;';
			} else {
				$page_id = '?';
			}
			// check for $e_reg in SERVER REQUEST
			if ( isset( $_REQUEST['ee'] )) {
				// rebuild $e_reg without any of the extra parameters
				$e_reg = 'ee=' . esc_attr( $_REQUEST['ee'] );
			} else {
				$e_reg = '';
			}

			$page_visit = rtrim( $http_host . $request_uri . $page_id . $e_reg, '?' );

		}

		return $page_visit != home_url( '/wp-admin/admin-ajax.php' ) ? $page_visit : '';

	}





	/**
	 * 	@the current wp user id
	 * 	@access public
	 * 	@return int
	 */
	public function _wp_user_id() {
		// if I need to explain the following lines of code, then you shouldn't be looking at this!
		$this->_wp_user_id = get_current_user_id();
		return $this->_wp_user_id;
	}



	 /**
	  * Clear EE_Session data
	  *
	  * @access public
	  * @param string $class
	  * @param string $function
	  * @return void
	  */
	public function clear_session( $class = '', $function = '' ) {
		//echo '<h3 style="color:#999;line-height:.9em;"><span style="color:#2EA2CC">' . __CLASS__ . '</span>::<span style="color:#E76700">' . __FUNCTION__ . '( ' . $class . '::' . $function . '() )</span><br/><span style="font-size:9px;font-weight:normal;">' . __FILE__ . '</span>    <b style="font-size:10px;">  ' . __LINE__ . ' </b></h3>';
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, 'session cleared by : ' . $class . '::' .  $function . '()' );
		$this->reset_cart();
		$this->reset_checkout();
		$this->reset_transaction();
		// wipe out everything that isn't a default session datum
		$this->reset_data( array_keys( $this->_session_data ));
		// reset initial site access time and the session expiration
		$this->_set_init_access_and_expiration();
		$this->_save_session_to_db();
	}



	 /**
	  * @resets all non-default session vars
	  * @access public
	  * @param array $data_to_reset
	  * @param bool  $show_all_notices
	  * @return TRUE on success, FALSE on fail
	  */
	public function reset_data( $data_to_reset = array(), $show_all_notices = FALSE ) {
		// if $data_to_reset is not in an array, then put it in one
		if ( ! is_array( $data_to_reset ) ) {
			$data_to_reset = array ( $data_to_reset );
		}
		// nothing ??? go home!
		if ( empty( $data_to_reset )) {
			EE_Error::add_error( __( 'No session data could be reset, because no session var name was provided.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
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
				// oops! that session var does not exist!
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
	 * Used to reset the entire object (for tests).
	 *
	 * @since 4.3.0
	 *
	 */
	public function reset_instance() {
		$this->clear_session();
		self::$_instance = NULL;
	}



	 /**
	  * garbage_collection
	  * @since 4.3.0
	  */
	 public function garbage_collection() {
		 // only perform during regular requests
		 if ( ! defined( 'DOING_AJAX') || ! DOING_AJAX ) {
			 /** @type WPDB $wpdb */
			 global $wpdb;
			 // since transient expiration timestamps are set in the future, we can compare against NOW
			 $expiration = time();
			 $too_far_in_the_the_future = $expiration + ( $this->_lifespan * 2 );
			 // filter the query limit. Set to 0 to turn off garbage collection
			 $expired_session_transient_delete_query_limit = absint( apply_filters( 'FHEE__EE_Session__garbage_collection___expired_session_transient_delete_query_limit', 50 ));
			 // non-zero LIMIT means take out the trash
			 if ( $expired_session_transient_delete_query_limit ) {
				 //array of transient keys that require garbage collection
				 $session_keys = array(
					 EE_Session::session_id_prefix,
					 EE_Session::hash_check_prefix,
				 );
				 foreach ( $session_keys as $session_key ) {
					 $session_key = str_replace( '_', '\_', $session_key );
					 $session_key = '\_transient\_timeout\_' . $session_key . '%';
					 $SQL = "
					SELECT option_name
					FROM {$wpdb->options}
					WHERE option_name
					LIKE '{$session_key}'
					AND ( option_value < {$expiration}
					OR option_value > {$too_far_in_the_the_future} )
					LIMIT {$expired_session_transient_delete_query_limit}
				";
					 $expired_sessions = $wpdb->get_col( $SQL );
					 // valid results?
					 if ( ! $expired_sessions instanceof WP_Error && ! empty( $expired_sessions ) ) {
						 // format array of results into something usable within the actual DELETE query's IN clause
						 $expired = array();
						 foreach ( $expired_sessions as $expired_session ) {
							 $expired[ ] = "'" . $expired_session . "'";
							 $expired[ ] = "'" . str_replace( 'timeout_', '', $expired_session ) . "'";
						 }
						 $expired = implode( ', ', $expired );
						 $SQL = "
						DELETE FROM {$wpdb->options}
						WHERE option_name
						IN ( $expired );
					 ";
						 $results = $wpdb->query( $SQL );
						 // if something went wrong, then notify the admin
						 if ( $results instanceof WP_Error && is_admin() ) {
							 EE_Error::add_error( $results->get_error_message(), __FILE__, __FUNCTION__, __LINE__ );
						 }
					 }
					 do_action( 'FHEE__EE_Session__garbage_collection___end', $expired_session_transient_delete_query_limit );
				 }
			 }
		 }

	 }



 }
/* End of file EE_Session.class.php */
/* Location: /includes/classes/EE_Session.class.php */

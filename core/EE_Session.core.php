<?php use EventEspresso\core\exceptions\InvalidSessionDataException;

if (!defined( 'EVENT_ESPRESSO_VERSION')) {exit('No direct script access allowed');}
/**
 *
 * EE_Session class
 *
 * @package    Event Espresso
 * @subpackage includes/classes
 * @author     Brent Christensen
 */
 class EE_Session {

	 const session_id_prefix = 'ee_ssn_';

	 const hash_check_prefix = 'ee_shc_';

	 /**
	  * instance of the EE_Session object
	  * @var EE_Session
	  */
	 private static $_instance;

	 /**
	  * the session id
	  * @var string
	  */
	 private $_sid;

	 /**
	  * session id salt
	  * @var string
	  */
	 private $_sid_salt;

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
     * whether or not session has expired at some point
     *
     * @var boolean
     */
    private $_expired = false;

	 /**
	  * current time as Unix timestamp in GMT
	  * @var int
	  */
	 private $_time;

	 /**
	  * whether to encrypt session data
	  * @var bool
	  */
	 private $_use_encryption = false;

	 /**
	  * EE_Encryption object
	  * @var EE_Encryption
	  */
	 protected $encryption;

	 /**
	  * well... according to the server...
	  * @var null
	  */
	 private $_user_agent;

	 /**
	  * do you really trust the server ?
	  * @var null
	  */
	 private $_ip_address;

	 /**
	  * current WP user_id
	  * @var null
	  */
	 private $_wp_user_id;

	 /**
	  * array for defining default session vars
	  * @var array
	  */
	 private $_default_session_vars = array (
        'id'            => null,
        'user_id'       => null,
        'ip_address'    => null,
        'user_agent'    => null,
        'init_access'   => null,
        'last_access'   => null,
        'expiration'    => null,
        'pages_visited' => array(),
	);



	 /**
	  * @singleton method used to instantiate class object
	  * @param \EE_Encryption $encryption
	  * @return EE_Session
	  * @throws InvalidSessionDataException
	  * @throws \EE_Error
	  */
	public static function instance( EE_Encryption $encryption = null ) {
		// check if class object is instantiated
		// session loading is turned ON by default, but prior to the init hook, can be turned back OFF via:
		// add_filter( 'FHEE_load_EE_Session', '__return_false' );
		if ( ! self::$_instance instanceof EE_Session && apply_filters( 'FHEE_load_EE_Session', true ) ) {
			self::$_instance = new self( $encryption );
		}
		return self::$_instance;
	}



	 /**
	  * protected constructor to prevent direct creation
	  *
	  * @Constructor
	  * @access protected
	  * @param \EE_Encryption $encryption
	  * @throws \EE_Error
	  * @throws \EventEspresso\core\exceptions\InvalidSessionDataException
	  */
	 protected function __construct( EE_Encryption $encryption = null ) {

		// session loading is turned ON by default, but prior to the init hook, can be turned back OFF via: add_filter( 'FHEE_load_EE_Session', '__return_false' );
		if ( ! apply_filters( 'FHEE_load_EE_Session', true ) ) {
			return;
		}
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		if ( ! defined( 'ESPRESSO_SESSION' ) ) {
			define( 'ESPRESSO_SESSION', true );
		}
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
		$session_settings = (array) get_option( 'ee_session_settings', array() );
		if ( ! empty( $session_settings )) {
			// cycle though existing session options
			foreach ( $session_settings as $var_name => $session_setting ) {
				// set values for class properties
				$var_name = '_' . $var_name;
				$this->{$var_name} = $session_setting;
			}
		}
         // are we using encryption?
         $this->_use_encryption = $encryption instanceof EE_Encryption && EE_Registry::instance()->CFG->admin->encode_session_data();
         // \EEH_Debug_Tools::printr($this->_use_encryption, '$this->_use_encryption', __FILE__, __LINE__);
        // encrypt data via: $this->encryption->encrypt();
        $this->encryption = $encryption;
		// filter hook allows outside functions/classes/plugins to change default empty cart
		$extra_default_session_vars = apply_filters( 'FHEE__EE_Session__construct__extra_default_session_vars', array() );
		array_merge( $this->_default_session_vars, $extra_default_session_vars );
		// apply default session vars
		$this->_set_defaults();
         add_action('AHEE__EE_System__initialize', array($this, 'open_session'));
         // check request for 'clear_session' param
		add_action( 'AHEE__EE_Request_Handler__construct__complete', array( $this, 'wp_loaded' ));
		// once everything is all said and done,
		add_action( 'shutdown', array( $this, 'update' ), 100 );
		add_action( 'shutdown', array( $this, 'garbage_collection' ), 999 );
	}



     /**
      * @return void
      * @throws \EventEspresso\core\exceptions\InvalidSessionDataException
      * @throws \EE_Error
      */
	 public function open_session() {
         // check for existing session and retrieve it from db
         if ( ! $this->_espresso_session()) {
             // or just start a new one
             $this->_create_espresso_session();
         }
     }



    /**
     * @return bool
     */
    public function expired()
    {
        return $this->_expired;
    }



    /**
     * @return void
     */
    public function reset_expired()
    {
        $this->_expired = false;
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
    public function extension()
    {
        return apply_filters('FHEE__EE_Session__extend_expiration__seconds_added', (10 * MINUTE_IN_SECONDS));
    }



    /**
     * @param int $time number of seconds to add to session expiration
     * @return int
     */
    public function extend_expiration($time = 0)
    {
        $time = $time ? $time : $this->extension();
        $this->_expiration += absint($time);
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
    public function set_cart(EE_Cart $cart)
    {
        $this->_session_data['cart'] = $cart;
        return true;
    }



	 /**
	  * reset_cart
	  */
	 public function reset_cart() {
        do_action('AHEE__EE_Session__reset_cart__before_reset', $this);
		 $this->_session_data['cart'] = NULL;
	 }



	 /**
	  * @return \EE_Cart
	  */
	 public function cart() {
        return isset($this->_session_data['cart']) && $this->_session_data['cart'] instanceof EE_Cart
            ? $this->_session_data['cart']
            : null;
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
        do_action('AHEE__EE_Session__reset_checkout__before_reset', $this);
		 $this->_session_data['checkout'] = NULL;
	 }



	 /**
	  * @return \EE_Checkout
	  */
	 public function checkout() {
        return isset($this->_session_data['checkout']) && $this->_session_data['checkout'] instanceof EE_Checkout
            ? $this->_session_data['checkout']
            : null;
	 }



	 /**
	  * @param \EE_Transaction $transaction
	  * @return bool
	  * @throws \EE_Error
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
        do_action('AHEE__EE_Session__reset_transaction__before_reset', $this);
		 $this->_session_data['transaction'] = NULL;
	 }



	 /**
	  * @return \EE_Transaction
	  */
	 public function transaction() {
        return isset($this->_session_data['transaction'])
               && $this->_session_data['transaction'] instanceof EE_Transaction
           ? $this->_session_data['transaction']
           : null;
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
	  * @throws \EventEspresso\core\exceptions\InvalidSessionDataException
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
		$this->_user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? esc_attr( $_SERVER['HTTP_USER_AGENT'] ) : FALSE;
		// now let's retrieve what's in the db
        $session_data = $this->_retrieve_session_data();
        if (! empty($session_data)) {
            // get the current time in UTC
			$this->_time = isset( $this->_time ) ? $this->_time : time();
			// and reset the session expiration
			$this->_expiration = isset( $session_data['expiration'] )
				? $session_data['expiration']
				: $this->_time + $this->_lifespan;
		} else {
            // set initial site access time and the session expiration
			$this->_set_init_access_and_expiration();
			// set referer
			$this->_session_data[ 'pages_visited' ][ $this->_session_data['init_access'] ] = isset( $_SERVER['HTTP_REFERER'] )
				? esc_attr( $_SERVER['HTTP_REFERER'] )
				: '';
			// no previous session = go back and create one (on top of the data above)
			return FALSE;
		}
        // now the user agent
		if ( $session_data['user_agent'] !== $this->_user_agent ) {
			return FALSE;
		}
		// wait a minute... how old are you?
		if ( $this->_time > $this->_expiration ) {
			// yer too old fer me!
            $this->_expired = true;
			// wipe out everything that isn't a default session datum
			$this->clear_session( __CLASS__, __FUNCTION__ );
		}
		// make event espresso session data available to plugin
		$this->_session_data = array_merge( $this->_session_data, $session_data );
		return TRUE;

	}



     /**
      * _get_session_data
      * Retrieves the session data, and attempts to correct any encoding issues that can occur due to improperly setup databases
      *
      * @return array
      * @throws \EventEspresso\core\exceptions\InvalidSessionDataException
      */
     protected function _retrieve_session_data()
     {
         $ssn_key = EE_Session::session_id_prefix . $this->_sid;
         try {
             // we're using WP's Transient API to store session data using the PHP session ID as the option name
             $session_data = get_transient($ssn_key);
	         if ($session_data === false) {
		         return array();
             }
             if (apply_filters('FHEE__EE_Session___perform_session_id_hash_check', WP_DEBUG)) {
                 $hash_check = get_transient(EE_Session::hash_check_prefix . $this->_sid);
                 if ($hash_check && $hash_check !== md5($session_data)) {
	                 EE_Error::add_error(
                         sprintf(
                             __('The stored data for session %1$s failed to pass a hash check and therefore appears to be invalid.', 'event_espresso'),
                             EE_Session::session_id_prefix . $this->_sid
                         ),
                         __FILE__, __FUNCTION__, __LINE__
                     );
                 }
             }
         } catch (Exception $e) {
             // let's just eat that error for now and attempt to correct any corrupted data
             global $wpdb;
             $row = $wpdb->get_row(
                 $wpdb->prepare(
                     "SELECT option_value FROM {$wpdb->options} WHERE option_name = %s LIMIT 1",
                     '_transient_' . $ssn_key
                 )
             );
             $session_data = is_object($row) ? $row->option_value : null;
             if ($session_data) {
                 $session_data = preg_replace_callback(
                     '!s:(d+):"(.*?)";!',
                     function ($match) {
                         return $match[1] === strlen($match[2])
                             ? $match[0]
                             : 's:' . strlen($match[2]) . ':"' . $match[2] . '";';
                     },
                     $session_data
                 );
             }
	         $session_data = maybe_unserialize($session_data);
         }
	     // in case the data is encoded... try to decode it
         $session_data = $this->encryption instanceof EE_Encryption
             ? $this->encryption->base64_string_decode($session_data)
             : $session_data;

         if ( ! is_array($session_data)) {
             try {
	             $session_data = maybe_unserialize($session_data);
             } catch (Exception $e) {
                 $msg = esc_html__(
                     'An error occurred while attempting to unserialize the session data.',
                     'event_espresso'
                 );
                 $msg .= WP_DEBUG
                     ? '<br><pre>' . print_r($session_data, true) . '</pre><br>' . $this->find_serialize_error($session_data)
                     : '';
                 throw new InvalidSessionDataException($msg, 0, $e);
             }
         }
         // just a check to make sure the session array is indeed an array
         if ( ! is_array($session_data)) {
             // no?!?! then something is wrong
             $msg = esc_html__(
                 'The session data is missing, invalid, or corrupted.',
                 'event_espresso'
             );
             $msg .= WP_DEBUG
                 ? '<br><pre>' . print_r($session_data, true) . '</pre><br>' . $this->find_serialize_error($session_data)
                 : '';
	         throw new InvalidSessionDataException($msg);
         }
	     if ( isset( $this->_session_data['transaction'] ) && absint( $this->_session_data['transaction'] ) !== 0 ) {
		     $this->_session_data['transaction'] = EEM_Transaction::instance()->get_one_by_ID(
			     $this->_session_data['transaction']
	         );
	     }
	     return $session_data;
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
		// check if the SID was passed explicitly, otherwise get from session, then add salt and hash it to reduce length
		if ( isset( $_REQUEST[ 'EESID' ] ) ) {
			$session_id = sanitize_text_field( $_REQUEST[ 'EESID' ] );
		} else {
			$session_id = md5( session_id() . get_current_blog_id() . $this->_get_sid_salt() );
		}
		return apply_filters( 'FHEE__EE_Session___generate_session_id__session_id', $session_id );
	}



	 /**
	  * _get_sid_salt
	  *
	  * @return string
	  */
	protected function _get_sid_salt() {
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
			$session_settings[ 'sid_salt' ] = $this->_sid_salt;
			update_option( 'ee_session_settings', $session_settings );
		}
		return $this->_sid_salt;
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
		$this->_session_data = isset( $this->_session_data )
			&& is_array( $this->_session_data )
			&& isset( $this->_session_data['id'])
			? $this->_session_data
			: array();
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
		do_action( 'AHEE_log', __CLASS__, __FUNCTION__, '' );
		// use the update function for now with $new_session arg set to TRUE
		return  $this->update( TRUE ) ? TRUE : FALSE;
	}



	 /**
	  * _save_session_to_db
	  *
	  * @access public
	  * @return string
	  * @throws \EE_Error
	  */
	private function _save_session_to_db() {
		if (
			// if the current request is NOT one of the following
			! (
				(
					// an espresso page
					EE_Registry::instance()->REQ instanceof EE_Request_Handler
					&& EE_Registry::instance()->REQ->is_espresso_page()
				)
				// OR an an AJAX request from the frontend
				|| EE_Registry::instance()->REQ->front_ajax
				// OR an admin request that is NOT AJAX
				|| (
					is_admin()
					&& ! ( defined( 'DOING_AJAX' ) && DOING_AJAX )
				)
			)
		) {
			return false;
		}
		$transaction = $this->transaction();
		if ( $transaction instanceof EE_Transaction ) {
			if ( ! $transaction->ID() ) {
				$transaction->save();
			}
			$this->_session_data['transaction'] = $transaction->ID();
		}
		// then serialize all of our session data
		$session_data = serialize($this->_session_data);
		// do we need to also encode it to avoid corrupted data when saved to the db?
		$session_data = $this->_use_encryption ? $this->encryption->base64_string_encode( $session_data ) : $session_data;
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
		$page_visit = home_url('/') . 'wp-admin/admin-ajax.php';
		// check for request url
		if ( isset( $_SERVER['REQUEST_URI'] )) {
			$http_host = '';
			$page_id = '?';
			$e_reg = '';
			$request_uri = esc_url( $_SERVER['REQUEST_URI'] );
			$ru_bits = explode( '?', $request_uri );
			$request_uri = $ru_bits[0];
			// check for and grab host as well
			if ( isset( $_SERVER['HTTP_HOST'] )) {
				$http_host = esc_url( $_SERVER['HTTP_HOST'] );
			}
			// check for page_id in SERVER REQUEST
			if ( isset( $_REQUEST['page_id'] )) {
				// rebuild $e_reg without any of the extra parameters
				$page_id = '?page_id=' . esc_attr( $_REQUEST['page_id'] ) . '&amp;';
			}
			// check for $e_reg in SERVER REQUEST
			if ( isset( $_REQUEST['ee'] )) {
				// rebuild $e_reg without any of the extra parameters
				$e_reg = 'ee=' . esc_attr( $_REQUEST['ee'] );
			}
			$page_visit = rtrim( $http_host . $request_uri . $page_id . $e_reg, '?' );
		}
		return $page_visit !== home_url( '/wp-admin/admin-ajax.php' ) ? $page_visit : '';

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
                    $expired_sessions = $wpdb->get_col($SQL);
                    // valid results?
                    if ( ! $expired_sessions instanceof WP_Error && ! empty($expired_sessions)) {
                        // format array of results into something usable within the actual DELETE query's IN clause
                        $expired = array();
                        foreach ($expired_sessions as $expired_session) {
                            $expired[] = "'" . $expired_session . "'";
                            $expired[] = "'" . str_replace('timeout_', '', $expired_session) . "'";
                        }
                        $expired = implode(', ', $expired);
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
				 }
				 do_action(
					 'FHEE__EE_Session__garbage_collection___end',
					 $expired_session_transient_delete_query_limit
				 );
			 }
		 }


	 }



	 /**
	  * @see http://stackoverflow.com/questions/10152904/unserialize-function-unserialize-error-at-offset/21389439#10152996
	  * @param $data1
	  * @return string
	  */
	 private function find_serialize_error( $data1 ) {
		$error = "<pre>";
		 $data2 = preg_replace_callback(
			 '!s:(\d+):"(.*?)";!',
			 function ( $match ) {
				 return ( $match[1] === strlen( $match[2] ) )
					 ? $match[0]
					 : 's:'
					   . strlen( $match[2] )
					   . ':"'
					   . $match[2]
					   . '";';
			 },
			 $data1
		 );
		$max = ( strlen( $data1 ) > strlen( $data2 ) ) ? strlen( $data1 ) : strlen( $data2 );
		$error .= $data1 . PHP_EOL;
		$error .= $data2 . PHP_EOL;
		for ( $i = 0; $i < $max; $i++ ) {
			if ( @$data1[ $i ] !== @$data2[ $i ] ) {
				$error .= "Difference " . @$data1[ $i ] . " != " . @$data2[ $i ] . PHP_EOL;
				$error .= "\t-> ORD number " . ord( @$data1[ $i ] ) . " != " . ord( @$data2[ $i ] ) . PHP_EOL;
				$error .= "\t-> Line Number = $i" . PHP_EOL;
				$start = ( $i - 20 );
				$start = ( $start < 0 ) ? 0 : $start;
				$length = 40;
				$point = $max - $i;
				if ( $point < 20 ) {
					$rlength = 1;
					$rpoint = -$point;
				} else {
					$rpoint = $length - 20;
					$rlength = 1;
				}
				$error .= "\t-> Section Data1  = ";
				$error .= substr_replace(
					substr( $data1, $start, $length ),
					"<b style=\"color:green\">{$data1[ $i ]}</b>",
					$rpoint,
					$rlength
				);
				$error .= PHP_EOL;
				$error .= "\t-> Section Data2  = ";
				$error .= substr_replace(
					substr( $data2, $start, $length ),
					"<b style=\"color:red\">{$data2[ $i ]}</b>",
					$rpoint,
					$rlength
				);
				$error .= PHP_EOL;
			}
		}
		$error .= "</pre>";
		return $error;
	}

 }
/* End of file EE_Session.class.php */
/* Location: /includes/classes/EE_Session.class.php */

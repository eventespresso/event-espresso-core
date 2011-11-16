<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/* 
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link						http://www.eventespresso.com
 * @ version		 	3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Session class
 *
 * @package				Event Espresso
 * @subpackage		includes/functions
 * @author					Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
 class EE_Session { 


  // instance of the EE_Session object
	private static $_instance = NULL;
	
	// the session id
	var $_sid = NULL;
	
	// and the session data
	var $data = array();
//															'REG' => array(),
//															'MER' => array(),
//															'CART' => array()
	
	
	// default session expiration 2 hours
	var $_expiration = 7200;
	
	// current time with GMT offset
	var $_time;
	
	// whether to encrypt session data
	var $_use_encrytion = TRUE; 
	
	// EE_Encryption object stored by reference
	var $encryption = NULL; 
	
	// well... according to the server...
	var $_user_agent = NULL; 
	
	// well... according to the server...
	var $_ip_address = NULL; 
	
	// array for defining default session vars
	var $_default_session_vars = array ( 'id', 'user_id', 'ip_address', 'user_agent', 'init_access', 'last_access', 'espresso' );
	
	// global error notices
	var $_notices;




 
	/**
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return class instance
	 */	
	public  function &instance ( ) {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
			self::$_instance = new self();
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
	
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
		define( 'ESPRESSO_SESSION', TRUE );
		
		global $notices;
		$this->_notices = $notices;
		
		global $org_options;

		$this->_user_agent = ( isset($_SERVER['HTTP_USER_AGENT'])) ? $_SERVER['HTTP_USER_AGENT'] : FALSE;

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
		if ( $this->_use_encrytion ) {
			require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/functions/EE_Encryption.class.php' );
			// instantiate the class object making all properties and methods accessible via $this->encryption ex: $this->encryption->encrypt();
			$this->encryption = EE_Encryption::instance();
		}
		
		// check for existing session and retreive it from db
		if ( ! $this->_retreive_espresso_session() ) { 
			// or just start a new one
			$this->_create_espresso_session();
		}
		
		if ( isset( $_REQUEST['page_id'] ) ) {
			if (  $_REQUEST['page_id'] == $org_options['return_url'] or $_REQUEST['page_id'] == $org_options['notify_url'] ) {
//				$this->reset_data( array( 'REG', 'MER', 'CART' ));
				$this->reset_data( array() );
			}
		}
		
		// create global var to hold event espresso session data
		global $EE_Session;
		$EE_Session = $this->data['espresso'];

		// once everything is all said and done, 
		add_action( 'shutdown', array( &$this, '_update_espresso_session' ), 100);

	}





	/**
	 *			@retreive session data
	 *		  @access public
	 *		  @param string - id
	 *			@return string 
	 */	
	private function _retreive_espresso_session() {
			
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
		// starts a new session if one doesn't already exist, or reinitiates an existing one
		session_start();
		// grab the session ID
		$this->_sid = session_id();
		
		// now let's retreive what's in the db
		// we're using WP's Transient API to store session data using the PHP session ID as the option name
		if ( $session_data = get_transient( $this->_sid ) ) {
		
			// are we using encryption?
			if ( $_use_encrytion ) {
				// un-encrypt the data
				$session_data = $this->encryption->decrypt( $session_data );
			}
			
			// unserialize
			$session_data = unserialize( $session_data );

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
		if ( $session_data['last_access'] < ( $this->_time - $this->$_expiration ) ) {
			// yer too old fer me!
			return FALSE;
		}
		
		// make event espresso session data available to plugin 
		$this->data = $session_data['espresso'];
		
		return TRUE;

	}		





	/**
	 *			@save session data to the db
	 *		  @access public
	 *			@return TRUE on success, FALSE on fail
	 */	
	public function _update_espresso_session( $new_session = FALSE ) {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';
		// session ID
		$session_data['id'] = $this->_sid;
		// visitor ip address
		$session_data['ip_address'] = $this->_visitor_ip();
		// visitor user_agent
		$session_data['user_agent'] = $this->_user_agent;
		
		// are we creating a new session?
		if ( $new_session ) {
			// initial access times
			$session_data['init_access'] = $this->_time;
		}
		
		// current access time
		$session_data['last_access'] = $this->_time;
		// event espresso session data
		$session_data['espresso'] = $this->data;
		
		// creating a new session does not require saving to the db just yet
		if ( ! $new_session ) {
			// current user if logged in
			$user = wp_get_current_user();
			$session_data['user_id'] = $user->id ? $user->id : NULL;
			// ready? let's save
			return $this->_save_session_to_db($session_data) ? TRUE : FALSE;
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
	
		//echo '<h3>'.__FUNCTION__.'</h3>';
		// use the update function for now with $new_session arg set to TRUE
		return  $this->_update_espresso_session( TRUE ) ? TRUE : FALSE;
		
	}		





	/**
	 *			@attempt to get IP address of current visitor from server
	 *		  @access public
	 *			@return string
	 */	
	private function _save_session_to_db( $session_data ) {
	
		//echo '<h3>'.__FUNCTION__.'</h3>';

		// are we are we using encryption?
		if ( $this->_use_encrytion ) {
			// first serialize all of our session data
			$session_data = serialize( $session_data );
			// now we'll encrypt it
			$session_data = $this->encryption->encrypt( $session_data );
		}

		// we're using the Transient API for storing session data, cuz it's so damn simple -> set_transient(  transient ID, data, expiry )
		return set_transient( $this->_sid, $session_data, $this->_expiration ) ? TRUE : FALSE;

	}





	/**
	 *			@attempt to get IP address of current visitor from server
	 *		  @access public
	 *			@return string
	 */	
	private function _visitor_ip() {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';

		if ( isset( $_SERVER['HTTP_CLIENT_IP'] )) {
			$visitor_ip = $_SERVER['HTTP_CLIENT_IP'];
		} elseif ( isset( $_SERVER['REMOTE_ADDR'] )) {
			$visitor_ip = $_SERVER['REMOTE_ADDR'];
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
	 *			@resets all non-default session vars
	 *		  @access public
	 *			@return TRUE on success, FALSE on fail
	 */	
	public function reset_data( $data_to_reset = FALSE ) {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';
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
			if ( isset( $this->data[ $reset ] )) {
			
				// then check to make sure it is not a default var
				if ( ! in_array( $reset, $this->_default_session_vars )) {
					// set var to NULL
					$this->data[ $reset ] = NULL;
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





	/*
	 * Get the real "now" time
	 * @access	private
	 * @return	string
	 */
	private function _session_time() {
		
		//echo '<h3>'.__FUNCTION__.'</h3>';
		
		// what time is it Mr Wolf?
		$now = time();
		
		$date_format = get_option('date_format');
		$time_format = get_option('time_format');
		$time_format = $date_format . ', ' . $time_format;

		$offset = get_option('gmt_offset');
		$timezone_string = get_option('timezone_string');
		date_default_timezone_set($timezone_string); 
		
		// generate the user time, taking the gmt offset into consideration
		$time = mktime(gmdate("H", $now)+$offset, gmdate("i", $now), gmdate("s", $now), gmdate("m", $now), gmdate("d", $now), gmdate("Y", $now));

		return $time;
	}




}

/* End of file EE_Session.class.php */
/* Location: /includes/functions/EE_Session.class.php */
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
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Validate_and_Sanitize class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Validate_and_Sanitize.class.php
 * @author				Brent Christensen 
 * @ version		 	0.1
 *
 * ------------------------------------------------------------------------
 */
 class EE_Validate_and_Sanitize {

  // instance of the EE_VnS object
	private static $_instance = NULL;




	/**
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return class instance
	 */
	public static function instance ( ) {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Validate_and_Sanitize )) {
			self::$_instance = new self();
			//echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		}
		return self::$_instance;
	}





	/**
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */
	private function __construct() {	
		// Sidney is watching me...  { : \
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		define( 'EE_Validate_and_Sanitize', TRUE );
	}





	/**
	*		compare  input vars against whitelist of acceptable vars and sanitize input values
	* 
	*		@access 		public
	*		@return 		array
	*/	
	public function validate_and_sanitize_post_inputs( $post_inputs = array(), $save_to = 'db' ) {
		// Sidney is watching me...  { : \
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
	
		// compare $_POST vars against whitelist of expected post vars above and sanitize input values
		if ( $clean_data = $this->_whitelist_and_sanitize( $post_inputs, 'post' ) ) {		
			// now verify that all required fields have been filled out and prepare data for db
			if ( $valid_data = $this->_validate_post_data( $clean_data )) { 		
					return $valid_data;
			} else {
				return FALSE;
			}
		}
		
	}





	/**
	*		compare  input vars against whitelist of acceptable vars
	* 
	*		@access 		private
	*		@return 		array
	*/	
	private function _whitelist_and_sanitize( $input_array = array(), $what = 'get' ) {
	
		// Sidney is watching me...  { : \
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		
		
		if ( ! isset( $input_array ) or empty( $input_array ) or ! is_array( $input_array )) {
			return FALSE;
		}

		// convert to lowercase so that cases match
		$what = strtolower( $what );
		
		switch ( $what ) {				
			case 'cookie' : 	$input_source = $_COOKIE; 		break;	
			case 'files' :			$input_source = $_FILES; 			break;				
			case 'get' : 			$input_source = $_GET;	 			break;				
			case 'post' :	 		$input_source = $_POST;	 		break;				
			case 'request' : 	$input_source = $_REQUEST; 	break;				
			case 'server' : 		$input_source = $_SERVER; 		break;				
			case 'session' : 	$input_source = $_SESSION;	 	break;				
		}		

		// check if any input vars exist
		if ( isset( $input_source ) && ! empty( $input_source )) {
		
//			printr( $_SESSION, '$_SESSION  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//			echo '<h4>$input_source : ' . $what . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//			printr( $input_source, $what .' array  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );						 
//			printr( $input_array, 'VSC $input_array  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );						 
			
			$gateway = isset( $input_source['selected_gateway'] ) ? $input_source['selected_gateway'] : FALSE;
			unset( $input_source['espresso_ajax'] );
			unset( $input_source['noheader'] );
			unset( $input_source['selected_gateway'] );
			unset( $input_source['selected_gateway_name'] );
													
			//cycle thru $_GET vars and check for parameters inside our $input_data array
			foreach ( $input_source as $key => $value ) {
				// for some reason WP isn't removing this
				$key = str_replace( 'amp;', '', $key );
				//check if processing a reg page by checking for gateway
				if ( $gateway ) {
					if ( strpos( $key, $gateway )) {
//						echo '<h4>'. $key . ': ' . $value . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
						// strip gateway name from key
						//$key = str_replace( '-' . $gateway, '', $key );
						// start by looking for input name in our array of accetable post inputs, but ONLY grab ones that have the gateway name in them
	 					if ( array_key_exists( $key, $input_array )) { 		
						// add it to $valid input array
							if ( $value = $this->_sanitize_this( $value, $input_array[$key] )) {
								$input_array[$key] = $value;		
							} 						
						} 							
					}
					
				} else if ( array_key_exists( $key, $input_array )) { // start by looking for input name in our array of accetable post inputs
					
					// add it to $valid input array
					if ( $value = $this->_sanitize_this( $value, $input_array[$key] )) {
						$input_array[$key] = $value;		
					} 						
				}
			}			
		}
		
		return $input_array;
		
	}




	/**
	*		sanitize vars
	* 
	*		@access 		private
	* 		@param 		mixed 		$value 			the value being passed
	* 		@param 		array 		$input_data	array of details pertaining to how var should be sanitized
	*		@return 		array
	*/	 
	private function _sanitize_this( $value = FALSE, $input_data = array() ) {
		
		// Sidney is watching me...  { : \
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		
		// you gimme nuttin - YOU GET NUTTIN !!
		if ( ! $value or empty( $input_data )) {
			return FALSE;
		}
		
		$no_html = array();
		$links_ok = array( 'a' => array( 'href' => array (), 'title' => array (), 'rel' => array (), 'id' => array(), 'class' => array () ));

		$valid = FALSE;
		
		switch ( $input_data['type']  ) {
			
			case 'int' :
			
					switch ( $input_data['sanitize']  ) {	
									
						case 'absint' :					
								$input_data['value'] = absint ( $value );
								break;					
													
						case 'intval' :					
								$input_data['value'] = intval ( $value );
								break;			
															
						case 'big int' :													
								$input_data['value'] = trim( preg_replace( '/^[0-9]+$/', '', $value ));
								break;			
															
						case 'ccard' :													
								if ( preg_match( '/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})$/', $value )) {
									$input_data['value'] = $value;
								}
								break;			
															
						case 'ccmm' :				
								if ( preg_match( '/([0-9]{2})/', $value, $matches )) {
									$input_data['value'] = $matches[1];
								}
								break;
								
						case 'ccyy' :				
								if ( preg_match( '/([0-9]{2})/', $value, $matches )) {
									$input_data['value'] = $matches[1];
								}
								break;
								
						case 'ccyyyy' :				
								if ( preg_match( '/([0-9]{4})/', $value, $matches )) {
									$input_data['value'] = $matches[1];
								}
								break;
								
						case 'ccv' :													
								if ( preg_match( '/^[0-9]{3,4}$/', $value )) {
									$input_data['value'] = $value;
								}
								break;										
					}						
						
					break;
			
			case 'float' :
			
					switch ( $input_data['sanitize']  ) {	
									
						case 'money' :	
								// allow only numbers and decimals			
								$valid_var = trim(preg_replace('/^[0-9]+$/', '', $value));
								$input_data['value'] = number_format( (float) $valid_var, 2, '.', '' );
								break;		
																
					}						
						
					break;
			
			case 'string' :
			
					switch ( $input_data['sanitize']  ) {	
									
						case 'no_html' :
								$input_data['value'] = wp_strip_all_tags( $value, $no_html );
								break;							
											
						case 'links_ok' :					
								$input_data['value'] = wp_kses( $value, $links_ok );
								break;						
												
						case 'some_html' :					
								$input_data['value'] = wp_kses_data( $value );
								break;					
													
						case 'url' :					
								$input_data['value'] = esc_url_raw( $value );
								break;
													
						case 'email' :					
								$input_data['value'] = sanitize_email( $value );
								break;		
								
						case 'phone_nmbr' :		
								if ( preg_match( '/^(?:\(\d{3}\) ?|\d{3}[-. ]?)\d{3}[-. ]?\d{4}$/', $value, $matches )) {
									$input_data['value'] = $matches[1];
								}
								break;		
								
						case 'mm-dd-yyyy' :												
								if ( preg_match( '/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)[0-9]{2}/', $value, $matches )) {
									if ( checkdate($matches[2], $matches[1], $matches[3])) {
										$input_data['value'] = $matches[1];
									}
								}
								break;
								
						case 'mm/yy' :
								//if ( preg_match( '/(0[1-9]|1[012])[- \/.]?([0-9]{2})/', $value, $matches )) {
								if ( preg_match( '/(0[1-9]|1[012][- \/.]?[0-9]{2})/', $value, $matches )) {
									if ( strpos( $matches[1], '/' )) {
										$mmyy = explode( '/', $matches[1] );
										if ( checkdate( $mmyy[0], 1, $mmyy[1] )) {										
											$input_data['value'] = $matches[1];
										} elseif ( checkdate( $mmyy[1], 1, $mmyy[0] )) {										
											$input_data['value'] = $matches[1];
										}
									} else {
										// split date in two and run checks
										$mm = substr( $matches[1], 0, 2 );
										$yy = substr( $matches[1], -2, 2 );
										if ( checkdate( $mm, 1, $yy )) {										
											$input_data['value'] = $matches[1];
										}
									}
								}
								break;
								
						case 'yyyy-mm-dd' :
								if ( preg_match( '(19|20)[0-9]{2}[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])', $value, $matches )) {
									if ( checkdate($matches[3], $matches[2], $matches[1])) {
										$input_data['value'] = $matches[1].'-'.$matches[2].'-'.$matches[3];
									}
								}
								break;
								
					}						
					
				break; 
			
		}
		
		return $input_data;
		
	}





	/**
	*		validate post data
	* 
	*		@access 		private
	* 		@param 		array 		$post_inputs		array describing post inputs
	*		@return 		mixed		array on success, FALSE on fail
	*/		
	private function _validate_post_data( $post_inputs = array() ) {
	
		// Sidney is watching me...  { : \
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
				
		if ( empty( $post_inputs )) {
			$msg = __( 'An error occurred! No post data was passed to the validator. Please click your browser\'s back button and try again. If the problem persists, contact customer support.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );			
			return FALSE;
		}
		
		//printr( $post_inputs, '$post_inputs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			
		// until proven guilty...
		$required_fields_filled_in = TRUE;				
		$missing_fields = 0; 
		$msg = '';

		// cycle through post inputs
		foreach ( $post_inputs as $input_name => $post_input ) {
			// was a post input actually submitted ?
			if ( empty( $post_input['value'] )) {
				// check if this field was required
				if ( $post_input['required'] ) {
					// survey says BRZURP!!! WRONG!!!
					$required_fields_filled_in = FALSE;
					// is this the first missing field ?
					if ( $missing_fields == 0 ) {
						$msg = '<strong>' . __( 'The following fields are either blank or contain invalid data:', 'event_espresso' ) . '</strong><br />';
					}
					$label = $post_input['label'] != FALSE ? $post_input['label'] : $input_name;
					$label = str_replace( ' ', '&nbsp;', $label  );
					// now add the name of the missing fields
					$msg .= $label . ',    ';
					$missing_fields++;
				}
			}
		}
		
		if ( $required_fields_filled_in ) {
			return $post_inputs;
		} else {
			$msg = rtrim( $msg, ', ' );		
			$msg .= '<br /><strong>' . __( 'Please answer them correctly in order to continue.', 'event_espresso' ) . '</strong><br />';
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );			
			return FALSE;
		}
	
	}





}

/* End of file EE_Validate_and_Sanitize.class.php */
/* Location: /includes/classes/EE_Validate_and_Sanitize.class.php */
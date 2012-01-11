<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/*
Plugin Name: 	Event Espresso 
Plugin URI: 		http://eventespresso.com/
Description: 	Out-of-the-box Events Registration integrated with PayPal IPN for your Wordpress blog/website. <a href="admin.php?page=support" >Support</a> 
Version: 			3.2.P
Author: 			Seth Shoultes
Author URI:		http://eventespresso.com
License: 			GPLv2

  Copyright (c) 2011 Event Espresso  All Rights Reserved.

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*/ 
/** 
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright			(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Encryption class
 *
 * @package				Event Espresso
 * @subpackage		includes/functions
 * @author					Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Encryption {

  // instance of the EE_Encryption object
	private static $_instance = NULL;
	
	private static $_encryption_key = NULL;
	
	private static $_use_mcrypt = TRUE;
	
	
	
	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */	
  private function __construct() {
	
		define( 'ESPRESSO_ENCRYPT', TRUE ); 
		
		if ( ! function_exists( 'mcrypt_encrypt' ) ) { 
			self::$_mcrypt = FALSE;
		}
		
	}



	/**
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return class instance
	 */	
	public  function &instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}



	/**
	 *		@get encryption key
	 *		@access public
	 *		@return string
	 */	
	public  function get_encryption_key() { 
	
		// if encryption key has not been set
		if ( self::$_encryption_key == NULL ) {

			// retreive encryption_key from db
			self::$_encryption_key = get_option( 'espresso_encryption_key' );
			
			// WHAT?? No encryption_key in the db ??
			if ( self::$_encryption_key == FALSE ) {
				// let's make one. And md5 it to make it just the right size for a key
				$new_key =  md5( self::generate_random_string() );
				// now save it to the db for later
				add_option( 'espresso_encryption_key', $new_key );
				// here's the key - FINALLY !
				self::$_encryption_key = $new_key;
			}
		}
	
		return self::$_encryption_key;
	}


 
	/**
	 *		@encrypts data 
	 *		@access public
	 *	  @param string - the text to be encrypted
	 *		@return string
	 */	
	public function encrypt ( $text_string = FALSE ) { 

		// you give me nothing??? GET OUT !
		if  ( ! $text_string )  {
			return FALSE;
		}
		
		if ( self::$_use_mcrypt ) {
			$encrypted_text = $this->m_encrypt( $text_string );
		} else {
			$encrypted_text = $this->acme_encrypt( $text_string );
		}
		
		return $encrypted_text;
		
	}
	
	
	
	/**
	 *		@decrypts data 
	 *		@access public
	 *	  @param string - the text to be decrypted
	 *		@return string
	 */	
	public function decrypt  ( $encrypted_text = FALSE )  {
 
		// you give me nothing??? GET OUT !
		if  ( ! $encrypted_text )  {
			return FALSE;
		}
		
		// if PHP's mcrypt fuctions are installed then we'll use them
		if ( self::$_use_mcrypt ) {
			$decrypted_text = $this->m_decrypt( $encrypted_text );
		} else {
			$decrypted_text = $this->acme_decrypt( $encrypted_text );
		}
		
		return $decrypted_text;
		
 	}



	/**
	 *		@encodes url string with PHP's base64 encoding
	 *		@source  http://php.net/manual/en/function.base64-encode.php
	 *		@access public
	 *	  @param string - the text to be encoded
	 *		@return string
	 */	
	public function base64_url_encode ( $text_string = FALSE ) {
		
		// you give me nothing??? GET OUT !
		if  ( ! $text_string )  {
			return FALSE;
		}
		
		// encode
		$encoded_string = base64_encode ( $text_string );
		// remove chars to make encoding more URL friendly
		$encoded_string = strtr ( $encoded_string, '+/=', '-_,' );
		
		return $encoded_string;  
		
	}



	/**
	 *		@decodes url string that has been encoded with PHP's base64 encoding
	 *		@source  http://php.net/manual/en/function.base64-encode.php
	 *		@access public
	 *	  @param string - the text to be decoded
	 *		@return string
	 */	
	public function base64_url_decode ( $encoded_string = FALSE ) {
		
		// you give me nothing??? GET OUT !
		if  ( ! $encoded_string )  {
			return FALSE;
		}
		
		// relace previously removed characters 
		$encoded_string = strtr ( $encoded_string, '-_,', '+/=' );
		// decode
		$decoded_string = base64_decode ( $encoded_string );
		
		return $decoded_string;  
		
	}



	/**
	 *		@encrypts data using PHP's mcrypt functions
	 *		@access private
	 *	  @param string - the text to be encrypted
	 *		@return string
	 */	
	private function m_encrypt  ( $text_string = FALSE ) { 
 
		// you give me nothing??? GET OUT !
		if  ( ! $text_string )  {
			return FALSE;
		}
		
		// get the initialization vector size
		$iv_size = mcrypt_get_iv_size ( MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB );
		// initialization vector
		$iv = mcrypt_create_iv ( $iv_size, MCRYPT_RAND );
		
		// encrypt it
		$encrypted_text = mcrypt_encrypt ( MCRYPT_RIJNDAEL_256, self::$_encryption_key, $text_string, MCRYPT_MODE_ECB, $iv );
		// trim and encode
		$encrypted_text = trim ( base64_encode( $encrypted_text ) ); 
		
		return $encrypted_text;
		
	}
 


	/**
	 *		@decrypts data that has been encrypted with PHP's mcrypt functions
	 *		@access private
	 *	  @param string - the text to be decrypted
	 *		@return string
	 */	
	private function m_decrypt  ( $encrypted_text = FALSE )  {
 
		// you give me nothing??? GET OUT !
		if  ( ! $encrypted_text )  {
			return FALSE;
		}
		
		// decode
		$encrypted_text = base64_decode ( $encrypted_text ); 
		
		// get the initialization vector size
		$iv_size = mcrypt_get_iv_size ( MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB );
		$iv = mcrypt_create_iv ( $iv_size, MCRYPT_RAND );
		
		// decrypt it
		$decrypted_text = mcrypt_decrypt ( MCRYPT_RIJNDAEL_256, self::$_encryption_key, $encrypted_text, MCRYPT_MODE_ECB, $iv );
		$decrypted_text = trim ( $decrypted_text );
		
		return $decrypted_text;
		
	}
	
	
	
	/**
	 *		@encrypts data for acme servers that didn't bother to install PHP mcrypt 
	 *		@source: http://stackoverflow.com/questions/800922/how-to-encrypt-string-without-mcrypt-library-in-php
	 *		@access private
	 *	  @param string - the text to be decrypted
	 *		@return string
	 */	
	private function acme_encrypt ( $text_string = FALSE ) {
	
		// you give me nothing??? GET OUT !
		if  ( ! $text_string )  {
			return FALSE;
		}
		
		$key_bits = str_split ( str_pad ( '', strlen( $text_string ), $this->get_encryption_key(), STR_PAD_RIGHT ));
		$string_bits = str_split( $text_string );
		
		foreach ( $string_bits as $k =>$v ) {
			$temp = ord( $v ) + ord ( $key_bits[$k] );
			$string_bits[$k] = chr ( $tmp > 255 ? ( $temp - 256 ) : $temp );
		}
		
		$encrypted = base64_encode( join( '', $string_bits ) );
		
		return $encrypted;
		
	}
	


	/**
	 *		@decrypts data for acme servers that didn't bother to install PHP mcrypt 
	 *		@source: http://stackoverflow.com/questions/800922/how-to-encrypt-string-without-mcrypt-library-in-php
	 *		@access private
	 *	  @param string - the text to be decrypted
	 *		@return string
	 */	
	private function acme_decrypt ( $encrypted_text = FALSE ) {
	
		// you give me nothing??? GET OUT !
		if  ( ! $encrypted_text )  {
			return FALSE;
		}
		
		$encrypted_text = base64_decode ( $encrypted_text );

		$key_bits = str_split ( str_pad ( '', strlen ( $encrypted_text ), $this->get_encryption_key(), STR_PAD_RIGHT ));
		$string_bits = str_split ( $encrypted_text );
		
		foreach ( $string_bits as $k => $v ) {
			$temp = ord ( $v ) - ord ( $key_bits[$k] );
			$string_bits[$k] = chr ( $tmp < 0 ? ( $temp + 256 ) : $temp );
		}
		
		$decrypted = join( '', $string_bits );
		
		return $decrypted;
		
	}
	


	/**
	 *		@generate random string
	 *		@source: http://stackoverflow.com/questions/637278/what-is-the-best-way-to-generate-a-random-key-within-php
	 *		@access public
	 *	  @param string - number of characters for random string
	 *		@return string
	 */	
	public function generate_random_string ( $length = 40 ) {
	
		$iterations = ceil ( $length / 40 );
		
		$random_string = '';
		
		for ($i = 0; $i < $iterations; $i ++) {
			$random_string .= sha1( microtime(TRUE) . mt_rand( 10000, 90000 ));
		}
		$random_string =  substr( $random_string, 0, $length );

		return $random_string;

	}	
	
	
	
}


// create global var
//global $EE_Encryption;
// instantiate !!!
//$EE_Encryption = EE_Encryption::instance();


/* End of file EE_Encryption.class.php */
/* Location: /includes/classes/EE_Encryption.class.php */
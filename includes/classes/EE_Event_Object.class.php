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
 * EE_Event_Object class - base class to be extended by other objects
 *
 * @package				Event Espresso
 * @subpackage			/includes/classes/
 * @author					Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Event_Object {






	/**
	* 	Event_object constructor
	*
	* 	@access 		protected		
	* 	@return 		void			
	*/
	protected function __construct() {
	}





	/**
	* 	Super Getter
	* 
	* 	gets properties dynamically, but only if they actually exist
	*
	* 	@access 		public		
    * 	@param 		string 		$property
	* 	@return 		mixed		returns mixed on success and an error message string on fail			
	*/
	public function __get( $property ) {	
		// check if property exists
		if( property_exists( get_class($this), $property )) {
			// return property value
			return $this->$property;
			
		} else {
			// property doesn't exist'
			throw new Exception( sprintf( 'The GET method does not exist in class %s for property %s', get_class($this), $property ));
		}	
	}
	
	
	
	
	
	/**
	* 	Super Setter
	* 
	* 	sets properties dynamically, but only if they actually exist
	*
	* 	@access 		public		
    * 	@param 		string 		$property
    * 	@param 		mixed 		$value
	* 	@return 		mixed		returns mixed on success and an error message string on fail			
	*/
	public function __set( $property, $value ) {	
		// check if property exists
		if ( property_exists( get_class($this), $property )) {
			// set property value
			$this->$property = $value;

		} else {
			// property doesn't exist'
			throw new Exception( sprintf( 'The SET method does not exist in class %s for property %s', get_class($this), $property ));
		}	
	}
	
	
	
	
	
//    /**
//    * 	Super Caller
//	* 
//	* call methods dynamically, but only if they actually exist
//    *
//	* 	@access 		public		
//    * 	@param 		string 		$method
//    * 	@param 		array 		$parameters
//	* 	@return 		mixed		returns mixed on success and an error message string on fail			
//	*/
//    public function __call( $method, $parameters ) {
// 		// check if method exists
//       if ( method_exists( $this, $method )) {
//			// set method value
//			return call_user_func_array( array( $this, $method ), $parameters );
//			
//		} else {
//			// method doesn't exist'
//			throw new Exception( sprintf( 'The method %s does not exist in class %s', $method, get_class($this) ));
//		}
//    } 
//	
//	
//	
//	
//	
//	/**
//	* 	Super Static Caller
//	* 
//	* call Static methods dynamically, but only if they actually exist
//	*
//	* 	@access 		public		
//    * 	@param 		string 		$method
//    * 	@param 		array 		$parameters
//	* 	@return 		mixed		returns mixed on success and an error message string on fail			
//	*/
//	public static function __callStatic( $method, $parameters ) {
// 		// check if method exists
//       if ( method_exists( $this, $method )) {
//			// set method value
//			return call_user_func_array( array( $this, $method ), $parameters );
//			
//		} else {
//			// method doesn't exist'
//			throw new Exception( sprintf( 'The method %s does not exist in class %s', $method, get_class($this) ));
//		}
//    }
	
	
	
	
	
	/**
	 * Event_object destructor
	 *
	 * @access 		public		
	 * @return 		void
	 */
	public function __destruct() {
   }	


	


}

/* End of file EE_Event_Object.class.php */
/* Location: /includes/classes/EE_Event_object.class.php */
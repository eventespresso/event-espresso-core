<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EEH_Formatter
 *
 * This is a helper utility class containging a variety for formatting helpers for Event Espresso.
 *
 * @package		Event Espresso
 * @subpackage	/helper/EEH_Formatter.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EEH_Formatter {

	/**
	 * _admin_format_content
	 * Text formatting function for wp_editor.
	 * This should fix all of the formatting issues of text output from the database.
	 *
	 * @static
	 * @access public
	 * @param  string $content content to format
	 * @return string          formatted content
	 */
	static public function admin_format_content($content='') {
		return wpautop(stripslashes_deep(html_entity_decode($content, ENT_QUOTES, "UTF-8")));
	}




	/**
	 * ee_tep_output_string
	 * todo: we need a description for this.
	 *
	 * @static
	 * @access public	
	 * @param  string  $string    string to handle
	 * @param  boolean $translate //todo what is this for?
	 * @param  boolean $protected true then we run htmlspecialchars and return
	 * @return string 
	 */
	static public function ee_tep_output_string($string, $translate = false, $protected = false) {
		if ($protected == true) {
			return htmlspecialchars($string);
		} else {
			if ($translate == false) {
				return self::ee_tep_parse_input_field_data($string, array('"' => '&quot;'));
			} else {
				return self::ee_tep_parse_input_field_data($string, $translate);
			}
		}
	}

	

	/**
	 * ee_tep_parse_input_field_data
	 * //todo this needs filled out.
	 * 
	 * @param  [type] $data  [description]
	 * @param  [type] $parse [description]
	 * @return [type]        [description]
	 */
	static public	function ee_tep_parse_input_field_data($data, $parse) {
		return strtr(trim($data), $parse);
	}




	/**
	 * [ee_tep_not_null description]
	 * @param  [type] $value [description]
	 * @return [type]        [description]
	 */
	static public function ee_tep_not_null($value) {
		if (is_array($value)) {
			if (sizeof($value) > 0) {
				return true;
			} else {
				return false;
			}
		} else {
			if (($value != '') && (strtolower($value) != 'null') && (strlen(trim($value)) > 0)) {
				return true;
			} else {
				return false;
			}
		}
	}



	/*
	 * Date formatting function
	 * Formats a date
	 * @params string $date
	 * @params string $format - format for the date
	 */	
	static public function event_date_display( $date, $format = '' ) {
		if ( empty( $date )) {
			return '';
		} else {
			$format = $format == '' ? get_option('date_format') : $format;
			return date_i18n( $format, strtotime( $date )); 
		}
	}



}//end class EEH_Form_Fields






interface EEI_Address_Formatter {
	public function format( $address, $address2, $city, $state, $country, $zip );
}





/**
 * ------------------------------------------------------------------------
 *
 * EE_MultiLine_Address_Formatter
 *
 * This class will format an address and add line breaks in appropriate places
 *
 * @package		Event Espresso
 * @subpackage	/helper/EEH_Formatter.helper.php
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_MultiLine_Address_Formatter implements EEI_Address_Formatter {	
	public function format( $address, $address2, $city, $state, $country, $zip ) {
		$formatted_address = $address;
		$formatted_address .= ! empty( $address2 ) ? '<br/>' . $address2 : '';
		$formatted_address .= ! empty( $city ) ? '<br/>' . $city : '';
		$formatted_address .=  ! empty( $city ) && ! empty( $state ) ? ', ' : '';
		$formatted_address .= ! empty( $state ) ? $state : '';
		$formatted_address .= ! empty( $zip ) ? '<br/>' . $zip : '';
		$formatted_address .= ! empty( $country ) ? '<br/>' . $country : '';
		return $formatted_address;
	}
}





/**
 * ------------------------------------------------------------------------
 *
 * EE_Inline_Address_Formatter
 *
 * This class will format an address and add commas in appropriate places
 *
 * @package		Event Espresso
 * @subpackage	/helper/EEH_Formatter.helper.php
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Inline_Address_Formatter implements EEI_Address_Formatter {	
	public function format( $address, $address2, $city, $state, $country, $zip ) {
		$formatted_address = $address;
		$formatted_address .=  ! empty( $address ) && ! empty( $address2 ) ? ', ' : '';
		$formatted_address .= ! empty( $address2 ) ? $address2 : '';
		$formatted_address .=  ( ! empty( $address2 ) && ! empty( $city )) || ( ! empty( $address ) && ! empty( $city )) ? ', ' : '';
		$formatted_address .= ! empty( $city ) ? $city : '';
		$formatted_address .=  ! empty( $city ) && ! empty( $state ) ? ', ' : '';
		$formatted_address .= ! empty( $state ) ? $state : '';
		$formatted_address .=  ! empty( $state ) && ! empty( $country ) ? ', ' : '';
		$formatted_address .= ! empty( $country ) ? $country : '';
		$formatted_address .=  ! empty( $country ) && ! empty( $zip ) ? ', ' : '';
		$formatted_address .= ! empty( $zip ) ? $zip : '';
		return $formatted_address;
	}
}






/**
 * ------------------------------------------------------------------------
 *
 * EE_Null_Address_Formatter
 *
 * This class will return NULL
 *
 * @package		Event Espresso
 * @subpackage	/helper/EEH_Formatter.helper.php
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Null_Address_Formatter implements EEI_Address_Formatter {
	public function format( $address, $address2, $city, $state, $country, $zip ) {
		return NULL;
	}
}







/**
 * ------------------------------------------------------------------------
 *
 * EEH_Address
 *
 * This class takes EE objects that possess address information and apply formatting to those address for display purposes
 *
 * @package		Event Espresso
 * @subpackage	/helper/EEH_Formatter.helper.php
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EEH_Address {

	
	/**
	* 	format - output formatted EE object address information
	* 
	* 	@access public
	* 	@param object EEI_Has_Address $obj_with_address
	* 	@param string $type how the address is formatted. for example: 'multiline' or 'inline'
	* 	@param boolean $use_schema whether to apply schema.org formatting to the address
	* 	@return string
	*/	
	public static function format ( $obj_with_address = NULL, $type = 'multiline', $use_schema = TRUE, $add_wrapper = TRUE ) {
		// check that incoming object implements the EEI_Has_Address interface
		if ( ! $obj_with_address instanceof EEI_Has_Address ) {
			$msg = __( 'The address could not be formatted.', 'event_espresso' );
			$dev_msg = __( 'The EE_Address_Formater requires passed objects to implement the EEI_Has_Address interface.', 'event_espresso' );
			EE_Error::add_error( $msg . '||' . $dev_msg, __FILE__, __FUNCTION__, __LINE__ );
			return NULL;
		}
		// obtain an address formatter
		$formatter = EEH_Address::_get_formatter( $type );
		// apply schema.org formatting ?
		$use_schema = ! is_admin() ? $use_schema : FALSE;
		$formatted_address = $use_schema ? EEH_Address::_schema_formatting( $formatter, $obj_with_address ) : EEH_Address::_regular_formatting( $formatter, $obj_with_address, $add_wrapper ) ;
		$formatted_address = $add_wrapper && ! $use_schema ? '<div class="espresso-address-dv">' . $formatted_address . '</div>' : $formatted_address;
		// return the formated address
		return $formatted_address;
	}



	/**
	* 	_get_formatter - obtain the requester formatter class
	* 
	* 	@access private
	* 	@param object EEI_Has_Address $obj_with_address
	* 	@param string $type how the address is formatted. for example: 'multiline' or 'inline'
	* 	@param boolean $use_schema whether to apply schema.org formatting to the address
	* 	@return string
	*/	
	private static function _get_formatter( $type ) {		
		switch( $type ) {
			case 'multiline' :
				$formatter = new EE_MultiLine_Address_Formatter();
				break;
			case 'inline' :
				$formatter = new EE_Inline_Address_Formatter();
				break;
			default :
				$formatter = new EE_Null_Address_Formatter();
		}		
		return $formatter;
	}



	/**
	* 	_regular_formatting
	* 	adds formatting to an address
	* 
	* 	@access private
	* 	@param object EEI_Address_Formatter $formatter
	* 	@param object EEI_Has_Address $obj_with_address
	* 	@return string
	*/	
	private static function _regular_formatting( $formatter, $obj_with_address, $add_wrapper = TRUE ){
		$formatted_address = $add_wrapper ? '<div>' : '';
		$state_obj = $obj_with_address->state_obj();
		$formatted_address .= $formatter->format(
			$obj_with_address->address(),
			$obj_with_address->address2(),
			$obj_with_address->city(),
			$state_obj ? $state_obj->abbrev() : '',
			$obj_with_address->country_ID(),
			$obj_with_address->zip()
		);
		$formatted_address .= $add_wrapper ? '</div>' : '';
		// return the formated address
		return $formatted_address;
	}	



	/**
	* 	_schema_formatting
	* 	adds schema.org formatting to an address
	* 
	* 	@access private
	* 	@param object EEI_Address_Formatter $formatter
	* 	@param object EEI_Has_Address $obj_with_address
	* 	@return string
	*/	
	private static function _schema_formatting( $formatter, $obj_with_address ){
		$formatted_address = '<div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">';
		$formatted_address .= $formatter->format(
			EEH_Schema::streetAddress( $obj_with_address ),
			EEH_Schema::postOfficeBoxNumber( $obj_with_address ),
			EEH_Schema::addressLocality( $obj_with_address ),
			EEH_Schema::addressRegion( $obj_with_address ),
			EEH_Schema::addressCountry( $obj_with_address ),
			EEH_Schema::postalCode( $obj_with_address )
		);
		$formatted_address .= '</div>';
		// return the formated address
		return $formatted_address;
	}	
	
}







/**
 * ------------------------------------------------------------------------
 *
 * EEH_Address
 *
 * This class is a collection of static methods for applying schema.org formatting to passed items
 *
 * @package		Event Espresso
 * @subpackage	/helper/EEH_Formatter.helper.php
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EEH_Schema {

	
	/**
	* 	location
	* 	The location of the event, organization or action.
	* 	Should include the Venue name AND schema formatted address info
	* 
	* 	@access public
	* 	@param string $location
	* 	@return string
	*/	
	public static function location ( $location = NULL ) {	
		return ! empty( $location ) ? '<div itemprop="location" itemscope itemtype="http://schema.org/Place">' . $location . '</div>' : '';
	}
	
	/**
	* 	name
	* 	The name of the Event or Venue.
	* 
	* 	@access public
	* 	@param string $name
	* 	@return string
	*/	
	public static function name ( $name = NULL ) {	
		return ! empty( $name ) ? '<span itemprop="name">' . $name . '</span>' : '';
	}
	
	/**
	* 	streetAddress
	* 	The street address. For example, 1600 Amphitheatre Pkwy.
	* 
	* 	@access public
	* 	@param object $obj_with_address
	* 	@return string
	*/	
	public static function streetAddress ( $obj_with_address = NULL ) {	
		return $obj_with_address->address() !== NULL && $obj_with_address->address() !== '' ? '<span itemprop="streetAddress">' . $obj_with_address->address() . '</span>' : '';
	}

	/**
	* 	postOfficeBoxNumber
	* 	The post offce box number for PO box addresses.
	* 
	* 	@access public
	* 	@param object $obj_with_address
	* 	@return string
	*/	
	public static function postOfficeBoxNumber ( $obj_with_address = NULL ) {
		// regex check for some form of PO Box or P.O. Box, etc, etc, etc
		if ( preg_match("/^\s*((P(OST)?.?\s*(O(FF(ICE)?)?)?.?\s+(B(IN|OX))?)|B(IN|OX))/i", $obj_with_address->address2() )) {
			return $obj_with_address->address2() !== NULL && $obj_with_address->address2() !== '' ? '<span itemprop="postOfficeBoxNumber">' . $obj_with_address->address2() . '</span>' : '';
		} else {
			return $obj_with_address->address2();
		}		
	}

	/**
	* 	addressLocality
	* 	The locality (city, town, etc). For example, Mountain View.
	* 
	* 	@access public
	* 	@param object $obj_with_address
	* 	@return string
	*/	
	public static function addressLocality ( $obj_with_address = NULL ) {	
		return $obj_with_address->city() !== NULL && $obj_with_address->city() !== '' ? '<span itemprop="addressLocality">' . $obj_with_address->city() . '</span>' : '';
	}

	/**
	* 	addressRegion
	* 	The region (state, province, etc). For example, CA.
	* 
	* 	@access public
	* 	@param object $obj_with_address
	* 	@return string
	*/	
	public static function addressRegion ( $obj_with_address = NULL ) {	
		return $obj_with_address->state_obj() instanceof EE_State ? '<span itemprop="addressRegion">' . $obj_with_address->state_obj()->abbrev() . '</span>' : '';
	}

	/**
	* 	addressCountry
	* 	The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.
	* 
	* 	@access public
	* 	@param object $obj_with_address
	* 	@return string
	*/	
	public static function addressCountry ( $obj_with_address = NULL ) {
		return $obj_with_address->country_ID() !== NULL && $obj_with_address->country_ID() !== '' ? '<span itemprop="addressCountry">' . $obj_with_address->country_ID() . '</span>' : '';
	}

	/**
	* 	postalCode
	* 	The postal code. For example, 94043.
	* 
	* 	@access public
	* 	@param object $obj_with_address
	* 	@return string
	*/	
	public static function postalCode ( $obj_with_address = NULL ) {
		return $obj_with_address->zip() !== NULL && $obj_with_address->zip() !== ''  ? '<span itemprop="postalCode">' . $obj_with_address->zip() . '</span>' : '';
	}

	/**
	* 	telephone
	* 	The telephone number.
	* 
	* 	@access public
	* 	@param string $phone_nmbr
	* 	@return string
	*/	
	public static function telephone ( $phone_nmbr = NULL ) {
		return $phone_nmbr !== NULL && $phone_nmbr !== ''  ? '<span itemprop="telephone">' . $phone_nmbr . '</span>' : '';
	}

	/**
	* 	URL
	* 	URL of the item as a clickable link
	* 
	* 	@access public
	* 	@param string $url - the URL that the link will resolve to
	* 	@param string $text - the text that will be used for the visable link
	* 	@param array $attributes - array of additional link attributes in  attribute_name => value pairs. ie: array( 'title' => 'click here', 'class' => 'link-class' )
	* 	@return string (link)
	*/	
	public static function url ( $url = NULL, $text = NULL, $attributes = array() ) {		
		$atts = '';
		foreach ( $attributes as $attribute => $value ) {
			$atts .= ' ' . $attribute . '="' . $value . '"';
		}
		$text = $text !== NULL && $text !== '' ? $text : $url;
		return $url !== NULL && $url !== '' ? '<a  itemprop="url" href="' . $url . '"' . $atts . '>' . $text . '</a>' : '';
	}




}



class EE_Generic_Address implements EEI_Has_Address {
	
	private $_address = NULL;
	private $_address2 = NULL;
	private $_city = NULL;
	private $_state_ID = NULL;
	private $_state_obj = NULL;
	private $_country_ID = NULL;
	private $_country_obj = NULL;
	private $_zip = NULL;
	
	public function __construct( $address, $address2, $city, $state, $country, $zip ) {
		$this->_address = $address;
		$this->_address2 = $address2;
		$this->_city = $city;
		if ( $state instanceof EE_State ) {
			$this->_state_obj = $state;
		} else {
			$this->_state_ID = $state;
		}
		if ( $country instanceof EE_Country ) {
			$this->_country_obj = $country;
		} else {
			$this->_country_ID = $country;
		}
		$this->_zip = $zip;
	}
	
	public function address() {
		return $this->_address;
	}
	
	public function address2() {
		return $this->_address2;
	}
	
	public function city() {
		return $this->_city;
	}
	
	private function _get_state_obj() {
		return $this->_state_ob !== NULL ? $this->_state_ob : EE_Registry::instance()->load_model( 'State' )->get_one_by_ID( $this->_state_ID );		
	}
	
	public function state_ID() {
		return $this->_state_ID;
	}
	
	public function state_obj() {
		return $this->_state_ob;
	}
	
	private function _get_country_obj() {
		return ! empty( $this->_country_obj ) ? $this->_country_obj : EE_Registry::instance()->load_model( 'State' )->get_one_by_ID( $this->_country_ID );		
	}
	
	public function country_ID() {
		return $this->_country_ID;
	}

	public function country_obj() {
		return $this->_country_obj;
	}

	public function zip() {
		return $this->_zip;
	}


	
}
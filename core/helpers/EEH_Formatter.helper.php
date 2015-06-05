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
 * This is a helper utility class containing a variety for formatting helpers for Event Espresso.
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
	 *
	 * @param  string $data  string to be "translated"
	 * @param  array] $parse array in the form array( 'from' => 'to', ... )
	 * @return string
	 */
	static public	function ee_tep_parse_input_field_data($data, $parse) {
		return strtr( trim($data), $parse);
	}




	/**
	 * [ee_tep_not_null description]
	 * @param  string | array $value [description]
	 * @return bool       [description]
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




	/**
	 * Formats a date
	 * @param string $date
	 * @param string $format - format for the date
	 * @return string
	 * @deprecated v4.6.21
	 */
	static public function event_date_display( $date, $format = '' ) {
		EE_Error::doing_it_wrong(
			'EEH_Formatter::event_date_display()',
			__( 'This method is deprecated. If you wish to display an Event date in a theme template, then there are better alternatives such as EEH_Event_View::the_event_date() which can be found in \core\helpers\EEH_Event_View.helper.php', 'event_espresso' ),
			'4.6.21'
		);
		if ( empty( $date )) {
			return '';
		} else {
			$format = $format == '' ? get_option('date_format') : $format;
			return date_i18n( $format, strtotime( $date ));
		}
	}



}
//end class EEH_Formatter





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

	/**
	 * @param string $address
	 * @param string $address2
	 * @param string $city
	 * @param string $state
	 * @param string $country
	 * @param string $zip
	 * @return string
	 */
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
	/**
	 * @param string $address
	 * @param string $address2
	 * @param string $city
	 * @param string $state
	 * @param string $country
	 * @param string $zip
	 * @return string
	 */
	public function format( $address, $address2, $city, $state, $country, $zip ) {
		$formatted_address = $address;
		$formatted_address .= substr( $formatted_address, -2 ) != ', ' ? ', ' : '';
		$formatted_address .= ! empty( $address2 ) ? $address2 : '';
		$formatted_address .= substr( $formatted_address, -2 ) != ', ' ? ', ' : '';
		$formatted_address .= ! empty( $city ) ? $city : '';
		$formatted_address .= substr( $formatted_address, -2 ) != ', ' ? ', ' : '';
		$formatted_address .= ! empty( $state ) ? $state : '';
		$formatted_address .= substr( $formatted_address, -2 ) != ', ' ? ', ' : '';
		$formatted_address .= ! empty( $country ) ? $country : '';
		$formatted_address .= substr( $formatted_address, -2 ) != ', ' ? ', ' : '';
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
	/**
	 * @param string $address
	 * @param string $address2
	 * @param string $city
	 * @param string $state
	 * @param string $country
	 * @param string $zip
	 * @return string
	 */
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
	 *    format - output formatted EE object address information
	 *
	 * @access public
	 * @param         object EEI_Address $obj_with_address
	 * @param string  $type how the address is formatted. for example: 'multiline' or 'inline'
	 * @param boolean $use_schema whether to apply schema.org formatting to the address
	 * @param bool    $add_wrapper
	 * @return string
	 */
	public static function format ( $obj_with_address = null, $type = 'multiline', $use_schema = true, $add_wrapper = true ) {
		// check that incoming object implements the EEI_Address interface
		if ( ! $obj_with_address instanceof EEI_Address ) {
			$msg = __( 'The address could not be formatted.', 'event_espresso' );
			$dev_msg = __( 'The EE_Address_Formatter requires passed objects to implement the EEI_Address interface.', 'event_espresso' );
			EE_Error::add_error( $msg . '||' . $dev_msg, __FILE__, __FUNCTION__, __LINE__ );
			return null;
		}
		// obtain an address formatter
		$formatter = EEH_Address::_get_formatter( $type );
		// apply schema.org formatting ?
		$use_schema = ! is_admin() ? $use_schema : false;
		$formatted_address = $use_schema ? EEH_Address::_schema_formatting( $formatter, $obj_with_address ) : EEH_Address::_regular_formatting( $formatter, $obj_with_address, $add_wrapper ) ;
		$formatted_address = $add_wrapper && ! $use_schema ? '<div class="espresso-address-dv">' . $formatted_address . '</div>' : $formatted_address;
		// return the formatted address
		return $formatted_address;
	}



	/**
	* 	_get_formatter - obtain the requester formatter class
	*
	* 	@access private
	* 	@param string $type how the address is formatted. for example: 'multiline' or 'inline'
	* 	@return EEI_Address_Formatter
	*/
	private static function _get_formatter( $type ) {
		switch( $type ) {

			case 'multiline' :
				return new EE_MultiLine_Address_Formatter();

			case 'inline' :
				return new EE_Inline_Address_Formatter();

			default :
				return new EE_Null_Address_Formatter();

		}
	}



	/**
	 *    _regular_formatting
	 *    adds formatting to an address
	 *
	 * @access private
	 * @param      object EEI_Address_Formatter $formatter
	 * @param      object EEI_Address $obj_with_address
	 * @param bool $add_wrapper
	 * @return string
	 */
	private static function _regular_formatting( EEI_Address_Formatter $formatter, EEI_Address $obj_with_address, $add_wrapper = TRUE ){
		$formatted_address = $add_wrapper ? '<div>' : '';
		$formatted_address .= $formatter->format(
			$obj_with_address->address(),
			$obj_with_address->address2(),
			$obj_with_address->city(),
			$obj_with_address->state(),
			$obj_with_address->country(),
			$obj_with_address->zip()
		);
		$formatted_address .= $add_wrapper ? '</div>' : '';
		// return the formatted address
		return $formatted_address;
	}



	/**
	* 	_schema_formatting
	* 	adds schema.org formatting to an address
	*
	* 	@access private
	* 	@param object EEI_Address_Formatter $formatter
	* 	@param object EEI_Address $obj_with_address
	* 	@return string
	*/
	private static function _schema_formatting( EEI_Address_Formatter $formatter, EEI_Address $obj_with_address ){
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
		// return the formatted address
		return $formatted_address;
	}

}







/**
 * ------------------------------------------------------------------------
 *
 * EEH_Schema
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
	* 	@param EEI_Address $obj_with_address
	* 	@return string
	*/
	public static function streetAddress ( EEI_Address $obj_with_address = NULL ) {
		return $obj_with_address->address() !== NULL && $obj_with_address->address() !== '' ? '<span itemprop="streetAddress">' . $obj_with_address->address() . '</span>' : '';
	}

	/**
	* 	postOfficeBoxNumber
	* 	The post office box number for PO box addresses.
	*
	* 	@access public
	* 	@param EEI_Address $obj_with_address
	* 	@return string
	*/
	public static function postOfficeBoxNumber ( EEI_Address $obj_with_address = NULL ) {
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
	* 	@param EEI_Address $obj_with_address
	* 	@return string
	*/
	public static function addressLocality ( EEI_Address $obj_with_address = NULL ) {
		return $obj_with_address->city() !== NULL && $obj_with_address->city() !== '' ? '<span itemprop="addressLocality">' . $obj_with_address->city() . '</span>' : '';
	}

	/**
	* 	addressRegion
	* 	The region (state, province, etc). For example, CA.
	*
	* 	@access public
	* 	@param EEI_Address $obj_with_address
	* 	@return string
	*/
	public static function addressRegion ( EEI_Address $obj_with_address = NULL ) {
		$state = $obj_with_address->state();
		if ( ! empty( $state ) ) {
			return '<span itemprop="addressRegion">' . $state . '</span>';
		} else {
			return '';
		}
	}

	/**
	* 	addressCountry
	* 	The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.
	*
	* 	@access public
	* 	@param EEI_Address $obj_with_address
	* 	@return string
	*/
	public static function addressCountry ( EEI_Address $obj_with_address = NULL ) {
		$country = $obj_with_address->country();
		if ( ! empty( $country ) ) {
			return '<span itemprop="addressCountry">' . $country . '</span>';
		} else {
			return '';
		}
	}

	/**
	* 	postalCode
	* 	The postal code. For example, 94043.
	*
	* 	@access public
	* 	@param EEI_Address $obj_with_address
	* 	@return string
	*/
	public static function postalCode ( EEI_Address $obj_with_address = NULL ) {
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
	* 	@param string $text - the text that will be used for the visible link
	* 	@param array $attributes - array of additional link attributes in  attribute_name => value pairs. ie: array( 'title' => 'click here', 'class' => 'link-class' )
	* 	@return string (link)
	*/
	public static function url ( $url = NULL, $text = NULL, $attributes = array() ) {
		$atts = '';
		foreach ( $attributes as $attribute => $value ) {
			$atts .= ' ' . $attribute . '="' . $value . '"';
		}
		$text = $text !== NULL && $text !== '' ? $text : $url;
		return $url !== NULL && $url !== '' ? '<a itemprop="url" href="' . $url . '"' . $atts . '>' . $text . '</a>' : '';
	}




}





/**
 * Class EE_Generic_Address
 *
 * @package            Event Espresso
 * @subpackage    core
 * @author                Brent Christensen
 *
 */
class EE_Generic_Address implements EEI_Address {

	private $_address = '';
	private $_address2 = '';
	private $_city = '';
	private $_state_ID = '';
	private $_state_obj = '';
	private $_country_ID = '';
	private $_country_obj = '';
	private $_zip = '';

	/**
	 * @param string $address
	 * @param string $address2
	 * @param string $city
	 * @param EE_State | string $state
	 * @param EE_Country | string $country
	 * @param string $zip
	 * @return EE_Generic_Address
	 */
	public function __construct( $address, $address2, $city, $state, $country, $zip ) {
		$this->_address = $address;
		$this->_address2 = $address2;
		$this->_city = $city;
		if ( $state instanceof EE_State ) {
			$this->_state_obj = $state;
		} else {
			$this->_state_ID = $state;
			$this->_state_obj = $this->_get_state_obj();
		}
		if ( $country instanceof EE_Country ) {
			$this->_country_obj = $country;
		} else {
			$this->_country_ID = $country;
			$this->_country_obj = $this->_get_country_obj();
		}
		$this->_zip = $zip;
	}



	/**
	 * @return string
	 */
	public function address() {
		return $this->_address;
	}



	/**
	 * @return string
	 */
	public function address2() {
		return $this->_address2;
	}



	/**
	 * @return string
	 */
	public function city() {
		return $this->_city;
	}



	/**
	 * @return \EE_State
	 */
	private function _get_state_obj() {
		return $this->_state_obj instanceof EE_State ? $this->_state_obj : EE_Registry::instance()->load_model( 'State' )->get_one_by_ID( $this->_state_ID );
	}



	/**
	 * @return string
	 */
	public function state_ID() {
		return $this->_state_ID;
	}



	/**
	 * @return string
	 */
	public function state_abbrev() {
		return $this->state_obj() instanceof EE_State ? $this->state_obj()->abbrev() : __( 'Unknown', 'event_espresso' );
	}



	/**
	 * @return string
	 */
	public function state_name() {
		return $this->state_obj() instanceof EE_State ? $this->state_obj()->name() :  __( 'Unknown', 'event_espresso' );
	}



	/**
	 * @return \EE_State
	 */
	public function state_obj() {
		return $this->_state_obj;
	}



	/**
	 * @return string
	 */
	public function state() {
		if ( apply_filters( 'FHEE__EEI_Address__state__use_abbreviation', true, $this->state_obj() ) ) {
			return $this->state_obj()->abbrev();
		} else {
			return $this->state_name();
		}
	}



	/**
	 * @return EE_Country
	 */
	private function _get_country_obj() {
		return $this->_country_obj instanceof EE_Country ? $this->_country_obj : EE_Registry::instance()->load_model( 'Country' )->get_one_by_ID( $this->_country_ID );
	}



	/**
	 * @return string
	 */
	public function country_ID() {
		return $this->_country_ID;
	}



	/**
	 * @return string
	 */
	public function country_name() {
		return $this->country_obj() instanceof EE_Country ? $this->country_obj()->name() :  __( 'Unknown', 'event_espresso' );
	}



	/**
	 * @return \EE_Country
	 */
	public function country_obj() {
		return $this->_country_obj;
	}



	/**
	 * @return string
	 */
	public function country() {
		if ( apply_filters( 'FHEE__EEI_Address__country__use_abbreviation', true, $this->country_obj() ) ) {
			return $this->country_ID();
		} else {
			return $this->country_name();
		}
	}



	/**
	 * @return string
	 */
	public function zip() {
		return $this->_zip;
	}



}
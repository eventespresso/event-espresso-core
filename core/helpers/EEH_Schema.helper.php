<?php

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EEH_Schema
 * This class is a collection of static methods for applying schema.org formatting to passed items
 *
 * @package       Event Espresso
 * @subpackage    /core/helpers/
 * @author        Brent Christensen
 */
class EEH_Schema {



	/**
	 *    location
	 *    The location of the event, organization or action.
	 *    Should include the Venue name AND schema formatted address info
	 *
	 * @access public
	 * @param string $location
	 * @return string
	 */
	public static function location( $location = null ) {
		return ! empty( $location ) ? '<div itemprop="location" itemscope itemtype="http://schema.org/Place">'
		                              . $location
		                              . '</div>' : '';
	}



	/**
	 *    name
	 *    The name of the Event or Venue.
	 *
	 * @access public
	 * @param string $name
	 * @return string
	 */
	public static function name( $name = null ) {
		return ! empty( $name ) ? '<span itemprop="name">' . $name . '</span>' : '';
	}



	/**
	 *    streetAddress
	 *    The street address. For example, 1600 Amphitheatre Pkwy.
	 *
	 * @access public
	 * @param EEI_Address $obj_with_address
	 * @return string
	 */
	public static function streetAddress( EEI_Address $obj_with_address = null ) {
		return $obj_with_address->address() !== null && $obj_with_address->address() !== ''
			? '<span itemprop="streetAddress">' . $obj_with_address->address() . '</span>' : '';
	}



	/**
	 *    postOfficeBoxNumber
	 *    The post office box number for PO box addresses.
	 *
	 * @access public
	 * @param EEI_Address $obj_with_address
	 * @return string
	 */
	public static function postOfficeBoxNumber( EEI_Address $obj_with_address = null ) {
		// regex check for some form of PO Box or P.O. Box, etc, etc, etc
		if ( preg_match(
			"/^\s*((P(OST)?.?\s*(O(FF(ICE)?)?)?.?\s+(B(IN|OX))?)|B(IN|OX))/i",
			$obj_with_address->address2()
		) ) {
			return $obj_with_address->address2() !== null && $obj_with_address->address2() !== ''
				? '<span itemprop="postOfficeBoxNumber">' . $obj_with_address->address2() . '</span>' : '';
		} else {
			return $obj_with_address->address2();
		}
	}



	/**
	 *    addressLocality
	 *    The locality (city, town, etc). For example, Mountain View.
	 *
	 * @access public
	 * @param EEI_Address $obj_with_address
	 * @return string
	 */
	public static function addressLocality( EEI_Address $obj_with_address = null ) {
		return $obj_with_address->city() !== null && $obj_with_address->city() !== ''
			? '<span itemprop="addressLocality">' . $obj_with_address->city() . '</span>' : '';
	}



	/**
	 *    addressRegion
	 *    The region (state, province, etc). For example, CA.
	 *
	 * @access public
	 * @param EEI_Address $obj_with_address
	 * @return string
	 */
	public static function addressRegion( EEI_Address $obj_with_address = null ) {
		$state = $obj_with_address->state_name();
		if ( ! empty( $state ) ) {
			return '<span itemprop="addressRegion">' . $state . '</span>';
		} else {
			return '';
		}
	}



	/**
	 *    addressCountry
	 *    The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.
	 *
	 * @access public
	 * @param EEI_Address $obj_with_address
	 * @return string
	 */
	public static function addressCountry( EEI_Address $obj_with_address = null ) {
		$country = $obj_with_address->country_name();
		if ( ! empty( $country ) ) {
			return '<span itemprop="addressCountry">' . $country . '</span>';
		} else {
			return '';
		}
	}



	/**
	 *    postalCode
	 *    The postal code. For example, 94043.
	 *
	 * @access public
	 * @param EEI_Address $obj_with_address
	 * @return string
	 */
	public static function postalCode( EEI_Address $obj_with_address = null ) {
		return $obj_with_address->zip() !== null && $obj_with_address->zip() !== '' ? '<span itemprop="postalCode">'
		                                                                              . $obj_with_address->zip()
		                                                                              . '</span>' : '';
	}



	/**
	 *    telephone
	 *    The telephone number.
	 *
	 * @access public
	 * @param string $phone_nmbr
	 * @return string
	 */
	public static function telephone( $phone_nmbr = null ) {
		return $phone_nmbr !== null && $phone_nmbr !== '' ? '<span itemprop="telephone">' . $phone_nmbr . '</span>'
			: '';
	}



	/**
	 *    URL
	 *    URL of the item as a clickable link
	 *
	 * @access public
	 * @param string $url        - the URL that the link will resolve to
	 * @param string $text       - the text that will be used for the visible link
	 * @param array  $attributes - array of additional link attributes in  attribute_name => value pairs. ie: array( 'title' => 'click here', 'class' => 'link-class' )
	 * @return string (link)
	 */
	public static function url( $url = null, $text = null, $attributes = array() ) {
		$atts = '';
		foreach ( $attributes as $attribute => $value ) {
			$atts .= ' ' . $attribute . '="' . $value . '"';
		}
		$text = $text !== null && $text !== '' ? $text : $url;
		return $url !== null && $url !== '' ? '<a itemprop="url" href="' . $url . '"' . $atts . '>' . $text . '</a>'
			: '';
	}



}
// End of file EEH_Schema.helper.php
// Location: /EEH_Schema.helper.php
<?php

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EEH_Address
 * This class takes EE objects that possess address information and apply formatting to those address for display purposes
 *
 * @package       Event Espresso
 * @subpackage    core/helpers/
 * @author        Brent Christensen
 */
class EEH_Address {



	/**
	 *    format - output formatted EE object address information
	 *
	 * @access public
	 * @param         object      EEI_Address $obj_with_address
	 * @param string  $type       how the address is formatted. for example: 'multiline' or 'inline'
	 * @param boolean $use_schema whether to apply schema.org formatting to the address
	 * @param bool    $add_wrapper
	 * @return string
	 */
	public static function format(
		$obj_with_address = null,
		$type = 'multiline',
		$use_schema = true,
		$add_wrapper = true
	) {
		// check that incoming object implements the EEI_Address interface
		if ( ! $obj_with_address instanceof EEI_Address ) {
			$msg = __( 'The address could not be formatted.', 'event_espresso' );
			$dev_msg = __(
				'The Address Formatter requires passed objects to implement the EEI_Address interface.',
				'event_espresso'
			);
			EE_Error::add_error( $msg . '||' . $dev_msg, __FILE__, __FUNCTION__, __LINE__ );
			return null;
		}
		// obtain an address formatter
		$formatter = EEH_Address::_get_formatter( $type );
		// apply schema.org formatting ?
		$use_schema = ! is_admin() ? $use_schema : false;
		$formatted_address = $use_schema
			? EEH_Address::_schema_formatting( $formatter, $obj_with_address )
			: EEH_Address::_regular_formatting( $formatter, $obj_with_address, $add_wrapper );
		$formatted_address = $add_wrapper && ! $use_schema
			? '<div class="espresso-address-dv">' . $formatted_address . '</div>'
			: $formatted_address;
		// return the formatted address
		return $formatted_address;
	}



	/**
	 *    _get_formatter - obtain the requester formatter class
	 *
	 * @access private
	 * @param string $type how the address is formatted. for example: 'multiline' or 'inline'
	 * @return EEI_Address_Formatter
	 */
	private static function _get_formatter( $type ) {
		switch ( $type ) {
			case 'multiline' :
				return new EventEspresso\core\services\address\formatters\MultiLineAddressFormatter();
			case 'inline' :
				return new EventEspresso\core\services\address\formatters\InlineAddressFormatter();
			default :
				return new EventEspresso\core\services\address\formatters\NullAddressFormatter();
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
	private static function _regular_formatting(
		EEI_Address_Formatter $formatter,
		EEI_Address $obj_with_address,
		$add_wrapper = true
	) {
		$formatted_address = $add_wrapper ? '<div>' : '';
		$formatted_address .= $formatter->format(
			$obj_with_address->address(),
			$obj_with_address->address2(),
			$obj_with_address->city(),
			$obj_with_address->state_name(),
			$obj_with_address->zip(),
			$obj_with_address->country_name(),
			$obj_with_address->country_ID()
		);
		$formatted_address .= $add_wrapper ? '</div>' : '';
		// return the formatted address
		return $formatted_address;
	}



	/**
	 *    _schema_formatting
	 *    adds schema.org formatting to an address
	 *
	 * @access private
	 * @param object EEI_Address_Formatter $formatter
	 * @param object EEI_Address $obj_with_address
	 * @return string
	 */
	private static function _schema_formatting( EEI_Address_Formatter $formatter, EEI_Address $obj_with_address ) {
		$formatted_address = '<div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">';
		$formatted_address .= $formatter->format(
			EEH_Schema::streetAddress( $obj_with_address ),
			EEH_Schema::postOfficeBoxNumber( $obj_with_address ),
			EEH_Schema::addressLocality( $obj_with_address ),
			EEH_Schema::addressRegion( $obj_with_address ),
			EEH_Schema::postalCode( $obj_with_address ),
			EEH_Schema::addressCountry( $obj_with_address ),
			$obj_with_address->country_ID()
		);
		$formatted_address .= '</div>';
		// return the formatted address
		return $formatted_address;
	}

}
// End of file EEH_Address.helper.php
// Location: /EEH_Address.helper.php
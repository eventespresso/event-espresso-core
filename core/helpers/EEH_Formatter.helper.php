<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'NO direct script access allowed' );
}



/**
 * EEH_Formatter
 * This is a helper utility class containing a variety for formatting helpers for Event Espresso.
 *
 * @package        Event Espresso
 * @subpackage     core/helpers/
 * @author         Darren Ethier
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
	static public function admin_format_content( $content = '' ) {
		return wpautop( stripslashes_deep( html_entity_decode( $content, ENT_QUOTES, "UTF-8" ) ) );
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
	static public function ee_tep_output_string( $string, $translate = false, $protected = false ) {
		if ( $protected === true ) {
			return htmlspecialchars( $string );
		} else {
			if ( $translate === false ) {
				return self::ee_tep_parse_input_field_data( $string, array( '"' => '&quot;' ) );
			} else {
				return self::ee_tep_parse_input_field_data( $string, $translate );
			}
		}
	}



	/**
	 * ee_tep_parse_input_field_data
	 *
	 * @param  string $data string to be "translated"
	 * @param         array ] $parse array in the form array( 'from' => 'to', ... )
	 * @return string
	 */
	static public function ee_tep_parse_input_field_data( $data, $parse ) {
		return strtr( trim( $data ), $parse );
	}



	/**
	 * [ee_tep_not_null description]
	 *
	 * @param  string | array $value [description]
	 * @return bool       [description]
	 */
	static public function ee_tep_not_null( $value ) {
		if ( is_array( $value ) ) {
			if ( count( $value ) > 0 ) {
				return true;
			} else {
				return false;
			}
		} else {
			if ( ( $value !== '' ) && ( strtolower( $value ) !== 'null' ) && ( strlen( trim( $value ) ) > 0 ) ) {
				return true;
			} else {
				return false;
			}
		}
	}



	/**
	 * Formats a date
	 *
	 * @param string $date
	 * @param string $format - format for the date
	 * @deprecated 4.6.12  Note, a search revealed this was not used anywhere in core or in our
	 *                       addons at time of writing this.  So just deprecated in case of third party use.
	 * @return string
	 * @deprecated v4.6.21
	 */
	static public function event_date_display( $date, $format = '' ) {
		EE_Error::doing_it_wrong(
			__METHOD__,
			__(
				'This method is deprecated as of EE 4.6.12.  Currently it does not reformat as with prior behaviour but just returns the incoming string.  Please use the EE_Datetime helpers for Datetime on the event to display as desired.',
				'event_espresso'
			),
			'4.6.21'
		);
		return $date;
	}



}
//end class EEH_Formatter
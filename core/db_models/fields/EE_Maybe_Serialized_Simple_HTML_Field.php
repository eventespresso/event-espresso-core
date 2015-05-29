<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 */
/**
 * EE_Maybe_Serialized_Simple_HTML_Field
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson

 * Model field for representing a column that CAN contain serialized text, or a regular string.
 * But either way, the string or the array's values can ONLY contain simple HTML tags.
 * If you want to allow Full HTML in the value, use EE_Maybe_Serialized_Text_Field
 */
class EE_Maybe_Serialized_Simple_HTML_Field extends EE_Maybe_Serialized_Text_Field{
	/**
	 * removes all non-basic tags when setting
	 * @param string $value_inputted_for_field_on_model_object
	 * @return string
	 */
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		return parent::prepare_for_set( $this->_remove_tags(  $value_inputted_for_field_on_model_object ) );
	}

	/**
	 * Remove any non-"simple" html tags. @see EE_Simple_HTML_Field
	 * @param array|string $value
	 * @return array|string
	 */
	protected function _remove_tags( $value ) {
		if( is_array( $value ) ) {
			foreach( $value as $key => $v ) {
				$value[ $key ] = $this->_remove_tags( $v );
			}
		}elseif( is_string( $value ) ) {
			$value = wp_kses("$value", $this->_get_allowed_tags() );
		}
		return $value;
	}

	/**
	 * In case unsafe data somehow got inserted into the database, we want to remove tags again
	 * @param array|string $value_found_in_db_for_model_object
	 * @return array|string
	 */
	function prepare_for_set_from_db($value_found_in_db_for_model_object) {
		return parent::prepare_for_set_from_db( $this->_remove_tags(  $value_found_in_db_for_model_object ) );
	}


	/**
	 * Determines what tags to allow in this model field
	 * @global array $allowedtags
	 * @return array
	 */
	function _get_allowed_tags(){
		global $allowedtags;
		$tags_we_allow = $allowedtags;
		$tags_we_allow['ol']=array();
		$tags_we_allow['ul']=array();
		$tags_we_allow['li']=array();
		return apply_filters( 'FHEE__EE_Maybe_Serialized_Simple_HTML_Field___get_allowed_tags', $tags_we_allow, $this );
	}
}

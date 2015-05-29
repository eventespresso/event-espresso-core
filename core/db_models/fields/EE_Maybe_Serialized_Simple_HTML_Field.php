<?php


/**
 * For a db text column, which can either be an array in PHP code or a string.
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

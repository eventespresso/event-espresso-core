<?php
/**
 * Field to only allow tags that are normally allowed on post_content
 */
class EE_Post_Content_Field extends EE_Text_Field_Base{
	/**
	 * removes all tags which a WP Post wouldn't allow in its content normally
	 * @param string $value_inputted_for_field_on_model_object
	 * @return string
	 */
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		$value_with_select_tags =  wp_kses("$value_inputted_for_field_on_model_object",wp_kses_allowed_html( 'post' ));
		return parent::prepare_for_set($value_with_select_tags);
	}
	
}
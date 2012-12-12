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
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Form_Fields
 *
 * This is a helper utility class for taking in an array of form field arguments and spitting out the relevant html formatted form fields.
 *
 * @package		EE_Form_Fields
 * @subpackage	/helper/EE_Form_Fields.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Form_Fields {

	static function get_form_fields( $input_vars = array(), $id = FALSE ) {

		if ( empty($input_vars) ) {
			return new WP_Error(__('form_field_generator_error', 'event_espresso'), __('missing required variables for the form field generator', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		}
		
		// if you don't behave - this is what you're gonna get !!!
		$close = true;
		$output = '<ul>'; //this is for using built-in wp styles... watch carefully...

		// cycle thru inputs
		foreach ($input_vars as $input_key => $input_value) {

			// required fields get a * 
			$required = isset($input_value['required']) && $input_value['required'] ? ' <span>*</span>: ' : ': ';
			// and the css class "required"
			$css_class = isset( $input_value['css_class'] ) ? $input_value['css_class'] : '';
			$styles = $input_value['required']? 'required ' . $css_class : $css_class;
			$field_id = ($id) ? $id . '-' . $input_key : $input_key;

			//rows or cols?
			$rows = isset($input_value['rows'] ) ? $input_value['rows'] : '10';
			$cols = isset($input_value['cols'] ) ? $input_value['cols'] : '80';

			$output .= (!$close) ? '<ul>' : '';
			$output .= '<li>';

			// what type of input are we dealing with ?
			switch ($input_value['input']) {

				// text inputs
				case 'text' :
					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required . '</label>';
					$output .= "\n\t\t\t" . '<input id="' . $field_id . '" class="' . $styles . '" type="text" value="' . $input_value['value'] . '" name="' . $input_value['name'] . '">';
					break;

				// dropdowns
				case 'select' :

					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required . '</label>';
					$output .= "\n\t\t\t" . '<select id="' . $field_id . '" class="' . $styles . '" name="' . $input_value['name'] . '">';

					if (is_array($input_value['options'])) {
						$options = $input_value['options'];
					} else {
						$options = explode(',', $input_value['options']);
					}

					foreach ($options as $key => $value) {
						//$key = str_replace( ' ', '_', sanitize_key( $value ));
						$output .= "\n\t\t\t\t" . '<option value="' . $key . '">' . $value . '</option>';
					}
					$output .= "\n\t\t\t" . '</select>';

					break;

				case 'textarea' :

					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required . '</label>';
					$output .= "\n\t\t\t" . '<textarea id="' . $field_id . '" class="' . $styles . '" rows="'.$rows.'" cols="'.$cols.'" name="' . $input_value['name'] . '">' . $input_value['value'] . '</textarea>';
					break;

				case 'hidden' :
					$close = false;
					$output .= "</li></ul>";
					$output .= "\n\t\t\t" . '<input id="' . $field_id . '" type="hidden" name="' . $input_value['name'] . '" value="' . $input_value['value'] . '">';
					break;

				case 'checkbox' : 
					$checked = ( $input_value['value'] == 1 ) ? 'checked="checked"' : '';
					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required . '</label>';
					$output .= "\n\t\t\t" . '<input id="' . $field_id. '" type="checkbox" name="' . $input_value['name'] . '" value="1"' . $checked . ' />';
					break; 

				case 'wp_editor' :
					$close = false;
					$editor_settings = array(
						'textarea_name' => $input_value['name'],
						'textarea_rows' => $rows
					);
					$output .= '</li>';
					$output .= '</ul>';
					$output .= '<h4>' . $input_value['label'] . '</h4>';
					ob_start();
					wp_editor( $input_value['value'], $field_id, $editor_settings);
					$editor = ob_get_contents();
					ob_end_clean();
					$output .= $editor;
					break;

				}
				$output .= ($close) ? '</li>' : '';
				
			
		} // end foreach( $input_vars as $input_key => $input_value ) 
		$output .= ($close) ? '</ul>' : '';

		return $output;
	}

}//end class EE_Form_Fields
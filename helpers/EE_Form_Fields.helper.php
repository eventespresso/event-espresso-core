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
 * @package		Event Espresso
 * @subpackage	/helper/EE_Form_Fields.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */




class EE_Form_Fields {

	/**
	 *  Generates HTML for the forms used on admin pages
	 *
	 * 
	 * 	@static
	 * 	@access public
	 * 	@param	array $input_vars - array of input field details
	 * 	format:
	 * 	$template_form_fields['field-id'] = array(
	 * 		'name' => 'name_attribute',
	 * 		'label' => __('Field Label', 'event_espresso'), //or false
	 * 		'input' => 'hidden', //field input type can be 'text', 'select', 'textarea', 'hidden', 'checkbox', 'wp_editor'
	 * 		'type' => 'int', //what "type" the value is (i.e. string, int etc)
	 * 		'required' => false, //boolean for whether the field is required
	 * 		'validation' => true, //boolean, whether to validate the field (todo)
	 * 		'value' => 'some_value_for_field', //what value is used for field
	 * 		'format' => '%d', //what format the value is (%d, %f, or %s)
	 * 		'db-col' => 'column_in_db' //used to indicate which column the field corresponds with in the db
	 * 		'options' => optiona, optionb || array('value' => 'label', '') //if the input type is "select", this allows you to set the args for the different <option> tags.
	 * 	)
	 * 	@param	array $id - used for defining unique identifiers for the form.
	 * 	@return string
	 * 	@todo: at some point we can break this down into other static methods to abstract it a bit better.
	 */	
	static public function get_form_fields( $input_vars = array(), $id = FALSE ) {

		if ( empty($input_vars) ) {
			return new WP_Error(__('form_field_generator_error', 'event_espresso'), __('missing required variables for the form field generator', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		}
		
		// if you don't behave - this is what you're gonna get !!!
		$close = true;
		$output = '<ul>'; //this is for using built-in wp styles... watch carefully...

		// cycle thru inputs
		foreach ($input_vars as $input_key => $input_value) {

			// required fields get a * 
			$required['label'] = isset($input_value['required']) && $input_value['required'] ? ' <span>*</span>: ' : ': ';
			// and the css class "required"
			$css_class = isset( $input_value['css_class'] ) ? $input_value['css_class'] : '';
			$required['class'] = $input_value['required']? 'required ' : '';
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
					self::text( $input_value['label'], $input_value['value'], $input_value['name'], $field_id, $styles, $required );
					break;

				// dropdowns
				case 'select' :

					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required['label'] . '</label>';
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

					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required['label'] . '</label>';
					$output .= "\n\t\t\t" . '<textarea id="' . $field_id . '" class="' . $styles . '" rows="'.$rows.'" cols="'.$cols.'" name="' . $input_value['name'] . '">' . $input_value['value'] . '</textarea>';
					break;

				case 'hidden' :
					$close = false;
					$output .= "</li></ul>";
					$output .= "\n\t\t\t" . '<input id="' . $field_id . '" type="hidden" name="' . $input_value['name'] . '" value="' . $input_value['value'] . '">';
					break;

				case 'checkbox' : 
					$checked = ( $input_value['value'] == 1 ) ? 'checked="checked"' : '';
					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required['label'] . '</label>';
					$output .= "\n\t\t\t" . '<input id="' . $field_id. '" type="checkbox" name="' . $input_value['name'] . '" value="1"' . $checked . ' />';
					break; 

				case 'wp_editor' :
					$close = false;
					$editor_settings = array(
						'textarea_name' => $input_value['name'],
						'textarea_rows' => $rows,
						'editor_class' => $styles
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

	/**
	 * form_fields_array
	 * This utility function assembles form fields from a given structured array with field information.
	 * //TODO: This is an alternate generator that we may want to use instead.
	 * 
	 * @param  array $fields structured array of fields to assemble in the following format:
	 * [field_name] => array(
	 * 		['label'] => 'label for field',
	 * 		['labels'] => array('label_1', 'label_2'); //optional - if the field type is a multi select type of field you can indicated the labels for each option via this index
	 * 		['extra_desc'] => 'extra description for the field', //optional
	 * 		['type'] => 'textarea'|'text'|'wp_editor'|'checkbox'|'radio'|'hidden'|'select', //defaults to text
	 * 		['value'] => 'value that goes in the field', //(if multi then this is an array of values and the 'default' paramater will be used for what is selected)
	 * 		['default'] => 'default if the field type is multi (i.e. select or radios or checkboxes)',
	 * 		['class'] => 'name-of-class(es)-for-input', 
	 * 		['classes'] => array('class_1', 'class_2'); //optional - if the field type is a multi select type of field you can indicate the css class for each option via this index.
	 * 		['id'] => 'css-id-for-input') //defaults to 'field_name'
	 * 		['unique_id'] => 1 //defaults to empty string.  This is useful for when the fields generated are going to be used in a loop and you want to make sure that the field identifiers are unique from each other.
	 * 		['dimensions'] => array(100,300) //defaults to empty array.  This is used by field types such as textarea to indicate cols/rows.
	 *   
	 * @return array         an array of inputs for form indexed by field name, and in the following structure:
	 *     [field_name] => array( 'label' => '{label_html}', 'field' => '{input_html}'
	 */
	static public function get_form_fields_array($fields) {
	
		$form_fields = array();
		$fields = (array) $fields;
		
		foreach ( $fields as $field_name => $field_atts ) {
			//defaults:
			$defaults = array(
				'label' => '',
				'labels' => '',
				'extra_desc' => '',
				'type' => 'text',
				'value' => '',
				'default' => '',
				'class' => '',
				'classes' => '',
				'id' => $field_name,
				'unique_id' => '',
				'dimensions' => array('10', '5'),
				);
			// merge defaults with passed arguments
			$_fields = wp_parse_args( $field_atts, $defaults);
			extract( $_fields );
			// generate label
			$label = empty($label) ? '' : '<label for="' . $id . '">' . $label . '</label>';
			// generate field name
			$f_name = !empty($unique_id) ? $field_name . '[' . $unique_id . ']' : $field_name;
			//we determine what we're building based on the type
			switch ( $type ) {
			
				case 'textarea' :
						$fld = '<textarea id="' . $id . '" class="' . $class . '" rows="' . $dimensions[1] . '" cols="' . $dimensions[0] . '" name="' . $f_name . '">' . $value . '</textarea>';
						$fld .= $extra_desc;
					break;
					
				case 'checkbox' :
						$c_input = '';
						if ( is_array($value) ) {
							foreach ( $value as $key => $val ) {
								$c_id = $field_name . '_' . $value;
								$c_class = isset($classes[$key]) ? ' class="' . $classes[$key] . '" ' : '';
								$c_label = isset($labels[$key]) ? '<label for="' . $c_id . '">' . $labels[$key] . '</label>' : '';
								$checked = !empty($default) && $default == $val ? ' checked="checked" ' : '';
								$c_input .= '<input name="' . $f_name . '[]" type="checkbox" id="' . $c_id . '"' . $c_class . 'value="' . $val . '"' . $checked . ' />' . "\n" . $c_label;
							}
							$fld = $c_input;
						} else {
							$checked = !empty($default) && $default == $val ? 'checked="checked" ' : '';
							$fld = '<input name="'. $f_name . '" type="checkbox" id="' . $id . '" class="' . $class . '" value="' . $value . '"' . $checked . ' />' . "\n";
						}
					break;
					
				case 'radio' :
						$c_input = '';
						if ( is_array($value) ) {
							foreach ( $value as $key => $val ) {
								$c_id = $field_name . '_' . $value;
								$c_class = isset($classes[$key]) ? 'class="' . $classes[$key] . '" ' : '';
								$c_label = isset($labels[$key]) ? '<label for="' . $c_id . '">' . $labels[$key] . '</label>' : '';
								$checked = !empty($default) && $default == $val ? ' checked="checked" ' : '';
								$c_input .= '<input name="' . $f_name . '" type="checkbox" id="' . $c_id . '"' . $c_class . 'value="' . $val . '"' . $checked . ' />' . "\n" . $c_label;
							}
							$fld = $c_input;
						} else {
							$checked = !empty($default) && $default == $val ? 'checked="checked" ' : '';
							$fld = '<input name="'. $f_name . '" type="checkbox" id="' . $id . '" class="' . $class . '" value="' . $value . '"' . $checked . ' />' . "\n";
						}
					break;
					
				case 'hidden' :
						$fld = '<input name="' . $f_name . '" type="hidden" id="' . $id . '" class="' . $class . '" value="' . $value . '" />' . "\n";
					break;
					
				case 'select' :
						$fld = '<select name="' . $f_name . '" class="' . $class . '" id="' . $id . '">' . "\n";
						foreach ( $value as $key => $val ) {
							$checked = !empty($default) && $default == $val ? ' selected="selected"' : '';
							$fld .= "\t" . '<option value="' . $val . '"' . $checked . '>' . $labels[$key] . '</option>' . "\n";
						}
						$fld .= '</select>';
					break;
					
				case 'wp_editor' :
						$editor_settings = array(
							'textarea_name' => $f_name,
							'textarea_rows' => $dimensions[1],
							'editor_class' => $class
							);
						ob_start();
						wp_editor( $value, $id, $editor_settings );
						$editor = ob_get_contents();
						ob_end_clean();
						$fld = $editor;
					break;
					
				default : //'text fields'
						$fld = '<input name="' . $f_name . '" type="text" id="' . $id . '" class="' . $class . '" value="' . $value . '" />' . "\n";
						$fld .= $extra_desc;
					
			}

			$form_fields[ $field_name ] = array( 'label' => $label, 'field' => $fld );	
		}

		return $form_fields;
	}






	/**
	 * espresso admin page select_input
	 * Turns an array into a select fields
	 *
	 * @static
	 * @access public
	 * @param  string  $name       field name
	 * @param  array  $values     option values, numbered array starting at 0, where each value is an array with a key 'text' (meaning text to display' and 'id' (meaning the internal value)
	 * eg: array(1=>array('text'=>'Monday','id'=>1),2=>array('text'=>'Tuesday','id'=>2)...)
	 * @param  string  $default    default value
	 * @param  string  $parameters extra paramaters
	 * @param  string  $class      css class
	 * @param  boolean $autosize   whether to autosize the select or not
	 * @return string              html string for the select input
	 */
	static public function select_input($name, $values, $default = '', $parameters = '', $class = '', $autosize = true) {

		//load formatter helper
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Formatter.helper.php';

		$field = '<select name="' . EE_Formatter::ee_tep_output_string($name) . '"';
		//Debug
		//printr( $values, '$values  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		if ( EE_Formatter::ee_tep_not_null($parameters))
			$field .= ' ' . $parameters;
		if ($autosize) {
			$size = 'med';
			for ($ii = 0, $ni = sizeof($values); $ii < $ni; $ii++) {
				if ($values[$ii]['text']) {
					if (strlen($values[$ii]['text']) > 5)
						$size = 'wide';
				}
			}
		} else
			$size = '';

		$field .= ' class="' . $class . ' ' . $size . '">';

		if (empty($default) && isset($GLOBALS[$name]))
			$default = stripslashes($GLOBALS[$name]);


		for ($i = 0, $n = sizeof($values); $i < $n; $i++) {
			$field .= '<option value="' . $values[$i]['id'] . '"';
			if ($default == $values[$i]['id']) {
				$field .= ' selected = "selected"';
			}

			$field .= '>' . $values[$i]['text'] . '</option>';
		}
		$field .= '</select>';

		return $field;
	}






	/**
	 * generates HTML for a form text input 
 	 * 
	 * @param string $question 		label content
	 * @param string $answer 		form input value attribute
	 * @param string $name 			form input name attribute
	 * @param string $id 				form input css id attribute
	 * @param string $class 			form input css class attribute
	 * @param array $required 		'label', 'class', and 'msg' - array of values for required "label" content, css required 'class', and required 'msg' attribute
	 * @param string $label_class 	css class attribute for the label
	 * @param string $disabled 		disabled="disabled" or null
	 * @return string HTML
	 */
	static function text( $question = FALSE, $answer = '', $name = FALSE, $id = '', $class = '', $required = FALSE, $label_class = '', $disabled = '' ) {
		// need these
		if ( ! $question || ! $name ) {
			return NULL;
		}
		// prep the answer
		$answer = is_array( $answer ) ? '' : self::prep_answer( $answer );
		// make sure required is an array
		$required = is_array( $required ) ? $required : array();
		// and set some defaults
		$required = array_merge( array( 'label' => '', 'class' => '', 'title' => '' ), $required );
		// set disabled tag
		$disabled = empty( $answer ) ? '' : $disabled;
		// ya gots ta have style man!!!
		$class = empty( $class ) ? 'espresso-text-inp' : $class;
		
		$html = "\n\t\t\t" . '<label for="' . $name . '" class="' . $label_class . '">' . self::prep_question( $question ) . $required['label'] . '</label> ';
		$html .= "\n\t\t\t" . '<input type="text" name="' . $name . '" id="' . $id . '" class="' . $class . ' ' . $required['class'] . '" value="' . $answer . '"  title="' . $required['msg'] . '" ' . $disabled . '/>';
		
		return $html;		
		
	}






	/**
	 * generates HTML for a form textarea 
 	 * 
	 * @param string $question 		label content
	 * @param string $answer 		form input value attribute
	 * @param string $name 			form input name attribute
	 * @param string $id 				form input css id attribute
	 * @param string $class 			form input css class attribute
	 * @param array $dimensions	array of form input rows and cols attributes : array( 'rows' => 50, 'cols' => 3 )
	 * @param array $required 		'label', 'class', and 'msg' - array of values for required "label" content, css required 'class', and required 'msg' attribute
	 * @param string $label_class 	css class attribute for the label
	 * @param string $disabled 		disabled="disabled" or null
	 * @return string HTML
	 */
	static function textarea( $question = FALSE, $answer = '', $name = FALSE, $id = '', $class = '', $dimensions = FALSE, $required = FALSE, $label_class = '', $disabled = '' ) {
		// need these
		if ( ! $question || ! $name ) {
			return NULL;
		}
		// prep the answer
		$answer = is_array( $answer ) ? '' : self::prep_answer( $answer );
		// make sure $required is an array
		$required = is_array( $required ) ? $required : array();
		// and set some defaults
		$required = array_merge( array( 'label' => '', 'class' => '', 'title' => '' ), $required );
		// make sure $dimensions is an array
		$dimensions = is_array( $dimensions ) ? $dimensions : array();
		// and set some defaults
		$dimensions = array_merge( array( 'rows' => 50, 'cols' => 3 ), $dimensions );
		// set disabled tag
		$disabled = empty( $answer ) ? '' : $disabled;
		// ya gots ta have style man!!!
		$class = empty( $class ) ? 'espresso-textarea-inp' : $class;
		
		$html = "\n\t\t\t" . '<label for="' . $name . '" class="' . $label_class . '">' . self::prep_question( $question ) . $required['label'] . '</label> ';
		$html .= "\n\t\t\t" . '<textarea name="' . $name . '" id="' . $id . '" class="' . $class . ' ' . $required['class'] . '" rows="' . $dimensions['rows'] . '" cols="' . $dimensions['cols'] . '"  title="' . $required['msg'] . '" ' . $disabled . '/>' . $answer . '</textarea>';

		return $html;		
		
	}






	/**
	 * generates HTML for a form select input 
 	 * 
	 * @param string $question 		label content
	 * @param string $answer 		form input value attribute
	 * @param array $values 			array of options where array key = option value and array value = option display text
	 * @param string $name 			form input name attribute
	 * @param string $id 				form input css id attribute
	 * @param string $class 			form input css class attribute
	 * @param array $required 		'label', 'class', and 'msg' - array of values for required "label" content, css required 'class', and required 'msg' attribute
	 * @param string $label_class 	css class attribute for the label
	 * @param string $disabled 		disabled="disabled" or null
	 * @return string HTML
	 */
	static function select( $question = FALSE, $answer = '', $values = FALSE, $name = FALSE, $id = '', $class = '', $required = FALSE, $label_class = '', $disabled = '' ) {
		// need these
		if ( ! $question || ! $name || ! $values || empty( $values ) || ! is_array( $values )) {
			return NULL;
		}
		// prep the answer
		$answer = is_array( $answer ) ? '' : self::prep_answer( $answer );
		// make sure $required is an array
		$required = is_array( $required ) ? $required : array();
		// and set some defaults
		$required = array_merge( array( 'label' => '', 'class' => '', 'title' => '' ), $required );
		// set disabled tag
		$disabled = empty( $answer ) ? '' : $disabled;
		// ya gots ta have style man!!!
		$class = empty( $class ) ? 'espresso-select-inp' : $class;
		
		$html = "\n\t\t\t" . '<label for="' . $name . '" class="' . $label_class . '">' . self::prep_question( $question ) . $required['label'] . '</label> ';
		$html .= "\n\t\t\t" . '<select name="' . $name . '" id="' . $id . '" class="' . $class . ' ' . $required['class'] . '" title="' . $required['msg'] . '" ' . $disabled . '/>';
		$html .= "\n\t\t\t\t" . '<option value="">' . __(' - please select - ', 'event_espresso') . '</option>';

		foreach ( $values as $key => $value ) {		
			$value = self::prep_answer( $value );
			$selected = ( $value == $answer ) ? ' selected="selected"' : "";
			$html .= "\n\t\t\t\t" . '<option value="' . self::prep_option_value( $key ) . '"' . $selected . '> ' . $value . '</option>';					
		}

		$html .= "\n\t\t\t" . '</select>';
			
		return $html;		
		
	}






	/**
	 * generates HTML for form radio button inputs 
 	 * 
	 * @param string $question 		label content
	 * @param string $answer 		form input value attribute
	 * @param array $values 			array of options where array key = option value and array value = option display text
	 * @param string $name 			form input name attribute
	 * @param string $id 				form input css id attribute
	 * @param string $class 			form input css class attribute
	 * @param array $required 		'label', 'class', and 'msg' - array of values for required "label" content, css required 'class', and required 'msg' attribute
	 * @param string $label_class 	css class attribute for the label
	 * @param string $disabled 		disabled="disabled" or null
	 * @return string HTML
	 */
	static function radio_button( $question = FALSE, $answer = '', $values = FALSE, $name = FALSE, $id = '', $class = '', $required = FALSE, $label_class = '', $disabled = '', $label_b4 = FALSE ) {
		// need these
		if ( ! $question || ! $name || ! $values || empty( $values ) || ! is_array( $values )) {
			return NULL;
		}
		// prep the answer
		$answer = is_array( $answer ) ? '' : self::prep_answer( $answer );
		// make sure $required is an array
		$required = is_array( $required ) ? $required : array();
		// and set some defaults
		$required = array_merge( array( 'label' => '', 'class' => '', 'title' => '' ), $required );
		// set disabled tag
		$disabled = empty( $answer ) ? '' : $disabled;
		// ya gots ta have style man!!!
		$class = empty( $class ) ? 'espresso-radio-btn-inp' : $class;
		
		$html = "\n\t\t\t" . '<label class="' . $label_class . '">' . self::prep_question( $question ) . $required['label'] . '</label> ';
		$html .= "\n\t\t\t" . '<ul class="espresso-radio-btn-options-ul ' . $label_class . '">';
		
		foreach ( $values as $key => $value ) {

			$checked = ( $value == $answer ) ? ' checked="checked"' : "";
			$key = self::prep_option_value( $key );
			$value = self::prep_answer( $value );

			$html .= "\n\t\t\t\t" . '<li>';
			$html .= "\n\t\t\t\t\t" . '<label for="' . $name . '_' . $key . '" class="' . $label_class . ' espresso-radio-btn-lbl">';
			$html .= $label_b4  ? "\n\t\t\t\t\t\t" . '<span>' . $value . '</span>' : '';
			$html .= "\n\t\t\t\t\t\t" . '<input type="radio" name="' . $name . '" id="' . $id . '_' . $key . '" class="' . $class . ' ' . $required['class'] . '" value="' . $key . '" title="' . $required['msg'] . '" ' . $disabled . $checked . ' />';
			$html .= ! $label_b4  ? "\n\t\t\t\t\t\t" . '<span>' . $value . '</span>' : '';
 			$html .= "\n\t\t\t\t\t" . '</label>';
			$html .= "\n\t\t\t\t" . '</li>';

		}

		$html .= "\n\t\t\t" . '</ul>';
		return $html;

	}






	/**
	 * generates HTML for form checkbox inputs 
 	 * 
	 * @param string $question 		label content
	 * @param string $answer 		form input value attribute
	 * @param array $values 			array of options where array key = option value and array value = option display text
	 * @param string $name 			form input name attribute
	 * @param string $id 				form input css id attribute
	 * @param string $class 			form input css class attribute
	 * @param array $required 		'label', 'class', and 'msg' - array of values for required "label" content, css required 'class', and required 'msg' attribute
	 * @param string $label_class 	css class attribute for the label
	 * @param string $disabled 		disabled="disabled" or null
	 * @return string HTML
	 */
	static function checkbox( $question = FALSE, $answer = '', $values = FALSE, $name = FALSE, $id = '', $class = '', $required = FALSE, $label_class = '', $disabled = '', $label_b4 = FALSE ) {
		// need these
		if ( ! $question || ! $name || ! $values || empty( $values ) || ! is_array( $values )) {
			return NULL;
		}
		// prep the answer
		$answer = is_array( $answer ) ? '' : self::prep_answer( $answer );
		// make sure $required is an array
		$required = is_array( $required ) ? $required : array();
		// and set some defaults
		$required = array_merge( array( 'label' => '', 'class' => '', 'title' => '' ), $required );
		// set disabled tag
		$disabled = empty( $answer ) ? '' : $disabled;
		// ya gots ta have style man!!!
		$class = empty( $class ) ? 'espresso-radio-btn-inp' : $class;
		
		$html = "\n\t\t\t" . '<label class="' . $label_class . '">' . self::prep_question( $question ) . $required['label'] . '</label> ';
		$html .= "\n\t\t\t" . '<ul class="espresso-radio-btn-options-ul ' . $label_class . '">';
		
		foreach ( $values as $key => $value ) {

			$checked = ( $value == $answer ) ? ' checked="checked"' : "";
			$key = self::prep_option_value( $key );
			$value = self::prep_answer( $value );

			$html .= "\n\t\t\t\t" . '<li>';
			$html .= "\n\t\t\t\t\t" . '<label for="' . $name . '_' . $key . '" class="' . $label_class . ' espresso-radio-btn-lbl">';
			$html .= $label_b4  ? "\n\t\t\t\t\t\t" . '<span>' . $value . '</span>' : '';
			$html .= "\n\t\t\t\t\t\t" . '<input type="radio" name="' . $name . '" id="' . $id . '_' . $key . '" class="' . $class . ' ' . $required['class'] . '" value="' . $key . '" title="' . $required['msg'] . '" ' . $disabled . $checked . ' />';
			$html .= ! $label_b4  ? "\n\t\t\t\t\t\t" . '<span>' . $value . '</span>' : '';
 			$html .= "\n\t\t\t\t\t" . '</label>';
			$html .= "\n\t\t\t\t" . '</li>';

		}

		$html .= "\n\t\t\t" . '</ul>';
		return $html;

	}






	/**
	 * Simply return sthe HTML for a hidden input of the given name and value.
	 * @param string $name
	 * @param string $value
	 * @return string HTML
	 */
	static function hidden_input( $name, $value ){
		return '<input type="hidden" name="'.$name.'" value="'.$value.'"/>';
	}





	/**
	 * prep_question
	 * @param string $question
	 * @return string 
	 */
	static function prep_question( $question ){
		return htmlspecialchars( trim( stripslashes( str_replace( '&#039;', "'", $question ))), ENT_QUOTES, 'UTF-8' );
	}




	/**
	 * prep_answer
	 * @param string $answer
	 * @return string 
	 */
	static function prep_answer( $answer ){
		return htmlspecialchars( trim( stripslashes( $answer )), ENT_QUOTES, 'UTF-8' );
	}



	/**
	 * prep_option_value
	 * @param string $option_value
	 * @return string 
	 */
	static function prep_option_value( $option_value ){
		return trim( stripslashes( str_replace( '&#039;', "'", $option_value )));
	}


}//end class EE_Form_Fields
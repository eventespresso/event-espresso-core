<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }

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
 * @deprecated usage of this helper is discouraged since 4.8.30.rc.009, instead
 * consider using the form system classes in core/libraries/form_sections. See
 * http://developer.eventespresso.com/docs/ee4-forms-system/.
 * The reason this is discouraged is because the forms system partially duplicates the
 * same behaviour (displaying HTML inputs), but also simplifies form validation
 * server-side and client-side and normalization (putting form data into the expected
 * datatypes in PHP). Also there have been a few bugs noticed (see https://events.codebasehq.com/projects/event-espresso/tickets/9165)
 * and maintaining this class AND the forms system is extra work.
 * Once we have removed all usage of this from EE core, it's expected that we will
 * start issuing deprecation notices
 * 
 *
 * ------------------------------------------------------------------------
 *
 * EEH_Form_Fields
 *
 * This is a helper utility class for taking in an array of form field arguments and spitting out the relevant html formatted form fields.
 *
 * @package		Event Espresso
 * @subpackage	/helper/EEH_Form_Fields.helper.php
 * @author		Darren Ethier, Brent Christensen
 *
 * ------------------------------------------------------------------------
 */




class EEH_Form_Fields {


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
	 * 		'tabindex' => 1 //this allows you to set the tabindex for the field.
	 *      'append_content' => '' //this allows you to send in html content to append to the field.
	 * 	)
	 * 	@param	array $id - used for defining unique identifiers for the form.
	 * 	@return string
	 * 	@todo: at some point we can break this down into other static methods to abstract it a bit better.
	 */
	static public function get_form_fields( $input_vars = array(), $id = FALSE ) {
		
		if ( empty($input_vars) ) {
			EE_Error::add_error( __('missing required variables for the form field generator', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}

		// if you don't behave - this is what you're gonna get !!!
		$close = true;
		$output = '<ul>'; //this is for using built-in wp styles... watch carefully...

		// cycle thru inputs
		foreach ($input_vars as $input_key => $input_value) {

			$defaults = array(
				'name' => $input_key,
				'label' => __('No label', 'event_espresso'),
				'input' => 'hidden',
				'type' => 'int',
				'required' => FALSE,
				'validation' => TRUE,
				'value' => 'some_value_for_field',
				'format' => '%d',
				'db-col' => 'column_in_db',
				'options' => array(),
				'tabindex' => '',
				'append_content' => ''
				);

			$input_value = wp_parse_args( $input_value, $defaults );

			// required fields get a *
			$required = isset($input_value['required']) && $input_value['required'] ? ' <span>*</span>: ' : ': ';
			// and the css class "required"
			$css_class = isset( $input_value['css_class'] ) ? $input_value['css_class'] : '';
			$styles = $input_value['required'] ? 'required ' . $css_class : $css_class;

			$field_id = ($id) ? $id . '-' . $input_key : $input_key;
			$tabindex = !empty($input_value['tabindex']) ? ' tabindex="' . $input_value['tabindex'] . '"' : '';

			//rows or cols?
			$rows = isset($input_value['rows'] ) ? $input_value['rows'] : '10';
			$cols = isset($input_value['cols'] ) ? $input_value['cols'] : '80';

			//any content?
			$append_content = $input_value['append_content'];

			$output .= (!$close) ? '<ul>' : '';
			$output .= '<li>';

			// what type of input are we dealing with ?
			switch ($input_value['input']) {

				// text inputs
				case 'text' :
					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required . '</label>';
					$output .= "\n\t\t\t" . '<input id="' . $field_id . '" class="' . $styles . '" type="text" value="' . $input_value['value'] . '" name="' . $input_value['name'] . '"' . $tabindex . '>';
					break;

				// dropdowns
				case 'select' :

					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required . '</label>';
					$output .= "\n\t\t\t" . '<select id="' . $field_id . '" class="' . $styles . '" name="' . $input_value['name'] . '"' . $tabindex . '>';

					if (is_array($input_value['options'])) {
						$options = $input_value['options'];
					} else {
						$options = explode(',', $input_value['options']);
					}

					foreach ($options as $key => $value) {
						$selected = isset( $input_value['value'] ) && $input_value['value'] == $key ? 'selected=selected' : '';
						//$key = str_replace( ' ', '_', sanitize_key( $value ));
						$output .= "\n\t\t\t\t" . '<option '. $selected . ' value="' . $key . '">' . $value . '</option>';
					}
					$output .= "\n\t\t\t" . '</select>';

					break;

				case 'textarea' :

					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required . '</label>';
					$output .= "\n\t\t\t" . '<textarea id="' . $field_id . '" class="' . $styles . '" rows="'.$rows.'" cols="'.$cols.'" name="' . $input_value['name'] . '"' . $tabindex . '>' . $input_value['value'] . '</textarea>';
					break;

				case 'hidden' :
					$close = false;
					$output .= "</li></ul>";
					$output .= "\n\t\t\t" . '<input id="' . $field_id . '" type="hidden" name="' . $input_value['name'] . '" value="' . $input_value['value'] . '">';
					break;

				case 'checkbox' :
					$checked = ( $input_value['value'] == 1 ) ? 'checked="checked"' : '';
					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required . '</label>';
					$output .= "\n\t\t\t" . '<input id="' . $field_id. '" type="checkbox" name="' . $input_value['name'] . '" value="1"' . $checked . $tabindex . ' />';
					break;

				case 'wp_editor' :
					$close = false;
					$editor_settings = array(
						'textarea_name' => $input_value['name'],
						'textarea_rows' => $rows,
						'editor_class' => $styles,
						'tabindex' => $input_value['tabindex']
					);
					$output .= '</li>';
					$output .= '</ul>';
					$output .= '<h4>' . $input_value['label'] . '</h4>';
					if ( $append_content ) {
						$output .= $append_content;
					}
					ob_start();
					wp_editor( $input_value['value'], $field_id, $editor_settings);
					$editor = ob_get_contents();
					ob_end_clean();
					$output .= $editor;
					break;

				}
				if ( $append_content && $input_value['input'] !== 'wp_editor' ) {
					$output .= $append_content;
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
	 * 		['dimensions'] => array(100,300), //defaults to empty array.  This is used by field types such as textarea to indicate cols/rows.
	 * 		['tabindex'] => '' //this allows you to set the tabindex for the field.
	 * 		['wpeditor_args'] => array() //if the type of field is wpeditor then this can optionally contain an array of arguments for the editor setup.
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
				'tabindex' => '',
				'wpeditor_args' => array()
				);
			// merge defaults with passed arguments
			$_fields = wp_parse_args( $field_atts, $defaults);
			extract( $_fields );
			// generate label
			$label = empty($label) ? '' : '<label for="' . $id . '">' . $label . '</label>';
			// generate field name
			$f_name = !empty($unique_id) ? $field_name . '[' . $unique_id . ']' : $field_name;

			//tabindex
			$tabindex_str = !empty( $tabindex ) ? ' tabindex="' . $tabindex . '"' : '';

			//we determine what we're building based on the type
			switch ( $type ) {

				case 'textarea' :
						$fld = '<textarea id="' . $id . '" class="' . $class . '" rows="' . $dimensions[1] . '" cols="' . $dimensions[0] . '" name="' . $f_name . '"' . $tabindex_str . '>' . $value . '</textarea>';
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
								$c_input .= '<input name="' . $f_name . '[]" type="checkbox" id="' . $c_id . '"' . $c_class . 'value="' . $val . '"' . $checked . $tabindex_str . ' />' . "\n" . $c_label;
							}
							$fld = $c_input;
						} else {
							$checked = !empty($default) && $default == $val ? 'checked="checked" ' : '';
							$fld = '<input name="'. $f_name . '" type="checkbox" id="' . $id . '" class="' . $class . '" value="' . $value . '"' . $checked . $tabindex_str . ' />' . "\n";
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
								$c_input .= '<input name="' . $f_name . '" type="checkbox" id="' . $c_id . '"' . $c_class . 'value="' . $val . '"' . $checked . $tabindex_str . ' />' . "\n" . $c_label;
							}
							$fld = $c_input;
						} else {
							$checked = !empty($default) && $default == $val ? 'checked="checked" ' : '';
							$fld = '<input name="'. $f_name . '" type="checkbox" id="' . $id . '" class="' . $class . '" value="' . $value . '"' . $checked . $tabindex_str . ' />' . "\n";
						}
					break;

				case 'hidden' :
						$fld = '<input name="' . $f_name . '" type="hidden" id="' . $id . '" class="' . $class . '" value="' . $value . '" />' . "\n";
					break;

				case 'select' :
						$fld = '<select name="' . $f_name . '" class="' . $class . '" id="' . $id . '"' . $tabindex_str . '>' . "\n";
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
							'editor_class' => $class,
							'tabindex' => $tabindex
							);
						$editor_settings = array_merge( $wpeditor_args, $editor_settings );
						ob_start();
						wp_editor( $value, $id, $editor_settings );
						$editor = ob_get_contents();
						ob_end_clean();
						$fld = $editor;
					break;

				default : //'text fields'
						$fld = '<input name="' . $f_name . '" type="text" id="' . $id . '" class="' . $class . '" value="' . $value . '"' . $tabindex_str . ' />' . "\n";
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
	 * eg: array(1=>array('text'=>'Monday','id'=>1),2=>array('text'=>'Tuesday','id'=>2)...). or as an array of key-value pairs, where the key is to be used for the
	 * select input's name, and the value will be the text shown to the user.  Optionally you can also include an additional key of "class" which will add a specific class to the option for that value.
	 * @param  string  $default    default value
	 * @param  string  $parameters extra paramaters
	 * @param  string  $class      css class
	 * @param  boolean $autosize   whether to autosize the select or not
	 * @return string              html string for the select input
	 */
	static public function select_input($name, $values, $default = '', $parameters = '', $class = '', $autosize = true) {
		//if $values was submitted in the wrong format, convert it over
		if(!empty($values) && (!array_key_exists(0,$values) || !is_array($values[0]))){
			$converted_values=array();
			foreach($values as $id=>$text){
				$converted_values[]=array('id'=>$id,'text'=>$text);
			}
			$values=$converted_values;
		}

		$field = '<select id="' . EEH_Formatter::ee_tep_output_string($name) . '" name="' . EEH_Formatter::ee_tep_output_string($name) . '"';
		//Debug
		//EEH_Debug_Tools::printr( $values, '$values  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		if ( EEH_Formatter::ee_tep_not_null($parameters))
			$field .= ' ' . $parameters;
		if ($autosize) {
			$size = 'med';
			for ($ii = 0, $ni = sizeof($values); $ii < $ni; $ii++) {
				if ($values[$ii]['text']) {
					if (strlen($values[$ii]['text']) > 5)
						$size = 'wide';
				}
			}
		} else {
			$size = '';
		}

		$field .= ' class="' . $class . ' ' . $size . '">';

		if (empty($default) && isset($GLOBALS[$name]))
			$default = stripslashes($GLOBALS[$name]);


		for ($i = 0, $n = sizeof($values); $i < $n; $i++) {
			$field .= '<option value="' . $values[$i]['id'] . '"';
			if ($default == $values[$i]['id']) {
				$field .= ' selected = "selected"';
			}
			if ( isset( $values[$i]['class'] ) ) {
				$field .= ' class="' . $values[$i]['class'] . '"';
			}
			$field .= '>' . $values[$i]['text'] . '</option>';
		}
		$field .= '</select>';

		return $field;
	}






	/**
	 * generate_question_groups_html
 	 *
	 * @param string $question_groups
	 * @return string HTML
	 */
	static function generate_question_groups_html( $question_groups = array(), $group_wrapper = 'fieldset' ) {

		$html = '';
		$before_question_group_questions = apply_filters( 'FHEE__EEH_Form_Fields__generate_question_groups_html__before_question_group_questions', '' );
		$after_question_group_questions = apply_filters( 'FHEE__EEH_Form_Fields__generate_question_groups_html__after_question_group_questions', '' );

		if ( ! empty( $question_groups )) {
			//EEH_Debug_Tools::printr( $question_groups, '$question_groups  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			// loop thru question groups
			foreach ( $question_groups as $QSG ) {
				// check that questions exist
				if ( ! empty( $QSG['QSG_questions'] )) {
					// use fieldsets
					$html .= "\n\t" . '<' . $group_wrapper . ' class="espresso-question-group-wrap" id="' . $QSG['QSG_identifier'] . '">';
					// group_name
					$html .= $QSG['QSG_show_group_name'] ? "\n\t\t" . '<h5 class="espresso-question-group-title-h5 section-title">' . self::prep_answer( $QSG['QSG_name'] ) . '</h5>' : '';
					// group_desc
					$html .= $QSG['QSG_show_group_desc'] && ! empty( $QSG['QSG_desc'] ) ? '<div class="espresso-question-group-desc-pg">' . self::prep_answer( $QSG['QSG_desc'] ) . '</div>' : '';

					$html .= $before_question_group_questions;
					// loop thru questions
					foreach ( $QSG['QSG_questions'] as $question ) {
//						EEH_Debug_Tools::printr( $question, '$question  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
						$QFI = new EE_Question_Form_Input(
							$question['qst_obj'],
							$question['ans_obj'],
							$question
						);
						$html .= self::generate_form_input( $QFI );
					}
					$html .= $after_question_group_questions;
					$html .= "\n\t" . '</' . $group_wrapper . '>';
				}
			}
		}

		return $html;

	}



	/**
	 * generate_question_groups_html
	 *
	 * @param array         $question_groups
	 * @param array        $q_meta
	 * @param bool         $from_admin
	 * @param string       $group_wrapper
	 * @return string HTML
	 */
	static function generate_question_groups_html2( $question_groups = array(), $q_meta = array(), 	$from_admin = FALSE, $group_wrapper = 'fieldset' ) {

		$html = '';
		$before_question_group_questions = apply_filters( 'FHEE__EEH_Form_Fields__generate_question_groups_html__before_question_group_questions', '' );
		$after_question_group_questions = apply_filters( 'FHEE__EEH_Form_Fields__generate_question_groups_html__after_question_group_questions', '' );

		$default_q_meta = array(
				'att_nmbr' => 1,
				'ticket_id' => '',
				'input_name' => '',
				'input_id' => '',
				'input_class' => ''
		);
		$q_meta = array_merge( $default_q_meta, $q_meta );
		//EEH_Debug_Tools::printr( $q_meta, '$q_meta  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		if ( ! empty( $question_groups )) {
//			EEH_Debug_Tools::printr( $question_groups, '$question_groups  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			// loop thru question groups
			foreach ( $question_groups as $QSG ) {
				if ( $QSG instanceof EE_Question_Group ) {
					// check that questions exist

					$where = array( 'QST_deleted' => 0 );
					if ( ! $from_admin ) {
						$where['QST_admin_only'] = 0;
					}
					$questions = $QSG->questions( array( $where, 'order_by' => array( 'Question_Group_Question.QGQ_order' => 'ASC' )));
					if ( ! empty( $questions )) {
						// use fieldsets
						$html .= "\n\t" . '<' . $group_wrapper . ' class="espresso-question-group-wrap" id="' . $QSG->get( 'QSG_identifier' ) . '">';
						// group_name
						if ( $QSG->show_group_name() ) {
							$html .=  "\n\t\t" . '<h5 class="espresso-question-group-title-h5 section-title">' . $QSG->get_pretty( 'QSG_name' ) . '</h5>';
						}
						// group_desc
						if ( $QSG->show_group_desc() ) {
							$html .=  '<div class="espresso-question-group-desc-pg">' . $QSG->get_pretty( 'QSG_desc'  ) . '</div>';
						}

						$html .= $before_question_group_questions;
						// loop thru questions
						foreach ( $questions as $QST ) {
							$qstn_id = $QST->is_system_question() ? $QST->system_ID() : $QST->ID();

							$answer = NULL;

							if (  isset( $_GET['qstn'] ) && isset( $q_meta['input_id'] ) && isset( $q_meta['att_nmbr'] )) {
								// check for answer in $_GET in case we are reprocessing a form after an error
								if ( isset( $_GET['qstn'][ $q_meta['input_id'] ][ $qstn_id ] )) {
									$answer = is_array( $_GET['qstn'][ $q_meta['input_id'] ][ $qstn_id ] ) ? $_GET['qstn'][ $q_meta['input_id'] ][ $qstn_id ] : sanitize_text_field( $_GET['qstn'][ $q_meta['input_id'] ][ $qstn_id ] );
								}
							} else if ( isset( $q_meta['attendee'] ) && $q_meta['attendee'] ) {
								//attendee data from the session
								$answer = isset( $q_meta['attendee'][ $qstn_id ] ) ? $q_meta['attendee'][ $qstn_id ] : NULL;
							}



							$QFI = new EE_Question_Form_Input(
									$QST,
									EE_Answer::new_instance ( array(
											'ANS_ID'=> 0,
											'QST_ID'=> 0,
											'REG_ID'=> 0,
											'ANS_value'=> $answer
									)),
									$q_meta
							);
							//EEH_Debug_Tools::printr( $QFI, '$QFI  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
							$html .= self::generate_form_input( $QFI );
						}
						$html .= $after_question_group_questions;
						$html .= "\n\t" . '</' . $group_wrapper . '>';
					}
				}
			}
		}
		return $html;

	}






	/**
	 * generate_form_input
 	 *
	 * @param EE_Question_Form_Input $QFI
	 * @return string HTML
	 */
	static function generate_form_input( EE_Question_Form_Input $QFI ) {
		if ( isset( $QFI->QST_admin_only) && $QFI->QST_admin_only && ! is_admin() ) {
			return '';
		}

		$QFI = self::_load_system_dropdowns( $QFI );
		$QFI = self::_load_specialized_dropdowns( $QFI );

		//we also need to verify

		$display_text = $QFI->get('QST_display_text');
		$input_name = $QFI->get('QST_input_name');
		$answer = EE_Registry::instance()->REQ->is_set( $input_name ) ? EE_Registry::instance()->REQ->get( $input_name ) : $QFI->get('ANS_value');
		$input_id = $QFI->get('QST_input_id');
		$input_class = $QFI->get('QST_input_class');
//		$disabled = $QFI->get('QST_disabled') ? ' disabled="disabled"' : '';
		$disabled = $QFI->get('QST_disabled') ? TRUE : FALSE;
		$required_label = apply_filters(' FHEE__EEH_Form_Fields__generate_form_input__required_label', '<em>*</em>' );
		$QST_required = $QFI->get('QST_required');
		$required = $QST_required ? array( 'label' => $required_label, 'class' => 'required needs-value', 'title' => $QST_required ) : array();
		$use_html_entities = $QFI->get_meta( 'htmlentities' );
		$required_text = $QFI->get('QST_required_text') != '' ? $QFI->get('QST_required_text') : __( 'This field is required', 'event_espresso' );
		$required_text = $QST_required ? "\n\t\t\t" . '<div class="required-text hidden">' . self::prep_answer( $required_text, $use_html_entities ) . '</div>' : '';
		$label_class = 'espresso-form-input-lbl';
		$QST_options = $QFI->options(true,$answer);
		$options = is_array( $QST_options ) ? self::prep_answer_options( $QST_options ) : array();
		$system_ID = $QFI->get('QST_system');
		$label_b4 = $QFI->get_meta( 'label_b4' );
		$use_desc_4_label = $QFI->get_meta( 'use_desc_4_label' );


		switch ( $QFI->get('QST_type') ){

			case 'TEXTAREA' :
					return EEH_Form_Fields::textarea( $display_text, $answer, $input_name, $input_id, $input_class, array(), $required, $required_text, $label_class, $disabled, $system_ID, $use_html_entities );
				break;

			case 'DROPDOWN' :
					return EEH_Form_Fields::select( $display_text, $answer, $options, $input_name, $input_id, $input_class, $required, $required_text, $label_class, $disabled, $system_ID, $use_html_entities, TRUE );
				break;


			case 'RADIO_BTN' :
					return EEH_Form_Fields::radio( $display_text, $answer, $options, $input_name, $input_id, $input_class, $required, $required_text, $label_class, $disabled, $system_ID, $use_html_entities, $label_b4, $use_desc_4_label );
				break;

			case 'CHECKBOX' :
					return EEH_Form_Fields::checkbox( $display_text, $answer, $options, $input_name, $input_id, $input_class, $required, $required_text, $label_class, $disabled, $label_b4, $system_ID, $use_html_entities );
				break;

			case 'DATE' :
					return EEH_Form_Fields::datepicker( $display_text, $answer, $input_name, $input_id, $input_class, $required, $required_text, $label_class, $disabled, $system_ID, $use_html_entities );
				break;

			case 'TEXT' :
			default:
					return EEH_Form_Fields::text( $display_text, $answer, $input_name, $input_id, $input_class, $required, $required_text, $label_class, $disabled, $system_ID, $use_html_entities );
				break;

		}


	}






	/**
	 * generates HTML for a form text input
 	 *
	 * @param string $question 	label content
	 * @param string $answer 		form input value attribute
	 * @param string $name 			form input name attribute
	 * @param string $id 				form input css id attribute
	 * @param string $class 			form input css class attribute
	 * @param array $required 		'label', 'class', and 'msg' - array of values for required "label" content, css required 'class', and required 'msg' attribute
	 * @param string $label_class 	css class attribute for the label
	 * @param string $disabled 		disabled="disabled" or null
	 * @return string HTML
	 */
	static function text( $question = FALSE, $answer = NULL, $name = FALSE, $id = '', $class = '', $required = FALSE, $required_text = '', $label_class = '', $disabled = FALSE, $system_ID = FALSE, $use_html_entities = TRUE ) {
		// need these
		if ( ! $question || ! $name ) {
			return NULL;
		}
		// prep the answer
		$answer = is_array( $answer ) ? '' : self::prep_answer( $answer, $use_html_entities );
		// prep the required array
		$required = self::prep_required( $required );
		// set disabled tag
		$disabled = $answer === NULL || ! $disabled  ? '' : ' disabled="disabled"';
		// ya gots ta have style man!!!
		$txt_class = is_admin() ? 'regular-text' : 'espresso-text-inp';
		$class = empty( $class ) ? $txt_class : $class;
		$class .= ! empty( $system_ID ) ? ' ' . $system_ID : '';
		$extra = apply_filters( 'FHEE__EEH_Form_Fields__additional_form_field_attributes', '' );

		$label_html = $required_text . "\n\t\t\t" . '<label for="' . $name . '" class="' . $label_class . '">' . self::prep_question( $question ) . $required['label'] . '</label><br/>';
		// filter label but ensure required text comes before it
		$label_html = apply_filters( 'FHEE__EEH_Form_Fields__label_html', $label_html, $required_text );

		$input_html = "\n\t\t\t" . '<input type="text" name="' . $name . '" id="' . $id . '" class="' . $class . ' ' . $required['class'] . '" value="' . esc_attr( $answer ) . '"  title="' . esc_attr( $required['msg'] ) . '" ' . $disabled .' ' . $extra . '/>';

		$input_html =  apply_filters( 'FHEE__EEH_Form_Fields__input_html', $input_html, $label_html, $id );
		return  $label_html . $input_html;

	}





	/**
	 * generates HTML for a form textarea
 	 *
	 * @param string $question 		label content
	 * @param string $answer 		form input value attribute
	 * @param string $name 			form input name attribute
	 * @param string $id 				form input css id attribute
	 * @param string $class 			form input css class attribute
	 * @param array $dimensions	array of form input rows and cols attributes : array( 'rows' => 3, 'cols' => 40 )
	 * @param array $required 		'label', 'class', and 'msg' - array of values for required "label" content, css required 'class', and required 'msg' attribute
	 * @param string $label_class 	css class attribute for the label
	 * @param string $disabled 		disabled="disabled" or null
	 * @return string HTML
	 */
	static function textarea( $question = FALSE, $answer = NULL, $name = FALSE, $id = '', $class = '', $dimensions = FALSE, $required = FALSE, $required_text = '', $label_class = '', $disabled = FALSE, $system_ID = FALSE, $use_html_entities = TRUE ) {
		// need these
		if ( ! $question || ! $name ) {
			return NULL;
		}
		// prep the answer
		$answer = is_array( $answer ) ? '' : self::prep_answer( $answer, $use_html_entities );
		// prep the required array
		$required = self::prep_required( $required );
		// make sure $dimensions is an array
		$dimensions = is_array( $dimensions ) ? $dimensions : array();
		// and set some defaults
		$dimensions = array_merge( array( 'rows' => 3, 'cols' => 40 ), $dimensions );
		// set disabled tag
		$disabled = $answer === NULL || ! $disabled  ? '' : ' disabled="disabled"';
		// ya gots ta have style man!!!
		$txt_class = is_admin() ? 'regular-text' : 'espresso-textarea-inp';
		$class = empty( $class ) ? $txt_class : $class;
		$class .= ! empty( $system_ID ) ? ' ' . $system_ID : '';
		$extra = apply_filters( 'FHEE__EEH_Form_Fields__additional_form_field_attributes', '' );

		$label_html = $required_text . "\n\t\t\t" . '<label for="' . $name . '" class="' . $label_class . '">' . self::prep_question( $question ) . $required['label'] . '</label><br/>';
		// filter label but ensure required text comes before it
		$label_html = apply_filters( 'FHEE__EEH_Form_Fields__label_html', $label_html, $required_text );

		$input_html = "\n\t\t\t" . '<textarea name="' . $name . '" id="' . $id . '" class="' . $class . ' ' . $required['class'] . '" rows="' . $dimensions['rows'] . '" cols="' . $dimensions['cols'] . '"  title="' . $required['msg'] . '" ' . $disabled . ' ' . $extra . '>' . $answer . '</textarea>';

		$input_html =  apply_filters( 'FHEE__EEH_Form_Fields__input_html', $input_html, $label_html, $id );
		return  $label_html . $input_html;

	}






	/**
	 * generates HTML for a form select input
 	 *
	 * @param string $question 		label content
	 * @param string $answer 		form input value attribute
	 * @param array $options			array of answer options where array key = option value and array value = option display text
	 * @param string $name 			form input name attribute
	 * @param string $id 				form input css id attribute
	 * @param string $class 			form input css class attribute
	 * @param array $required 		'label', 'class', and 'msg' - array of values for required "label" content, css required 'class', and required 'msg' attribute
	 * @param string $label_class 	css class attribute for the label
	 * @param string $disabled 		disabled="disabled" or null
	 * @return string HTML
	 */
	static function select( $question = FALSE, $answer = NULL, $options = FALSE, $name = FALSE, $id = '', $class = '', $required = FALSE, $required_text = '', $label_class = '', $disabled = FALSE, $system_ID = FALSE, $use_html_entities = TRUE, $add_please_select_option = FALSE ) {

		// need these
		if ( ! $question || ! $name || ! $options || empty( $options ) || ! is_array( $options )) {
			return NULL;
		}
		// prep the answer
		$answer = is_array( $answer ) ? self::prep_answer( array_shift( $answer ), $use_html_entities) : self::prep_answer( $answer, $use_html_entities );
		// prep the required array
		$required = self::prep_required( $required );
		// set disabled tag
		$disabled = $answer === NULL || ! $disabled  ? '' : ' disabled="disabled"';
		// ya gots ta have style man!!!
		$txt_class = is_admin() ? 'wide' : 'espresso-select-inp';
		$class = empty( $class ) ? $txt_class : $class;
		$class .= ! empty( $system_ID ) ? ' ' . $system_ID : '';
		$extra = apply_filters( 'FHEE__EEH_Form_Fields__additional_form_field_attributes', '' );

		$label_html = $required_text . "\n\t\t\t" . '<label for="' . $name . '" class="' . $label_class . '">' . self::prep_question( $question ) . $required['label'] . '</label><br/>';
		// filter label but ensure required text comes before it
		$label_html = apply_filters( 'FHEE__EEH_Form_Fields__label_html', $label_html, $required_text );

		$input_html = "\n\t\t\t" . '<select name="' . $name . '" id="' . $id . '" class="' . $class . ' ' . $required['class'] . '" title="' . esc_attr( $required['msg'] ) . '"' . $disabled . ' ' . $extra . '>';
		// recursively count array elements, to determine total number of options
		$only_option = count( $options, 1 ) == 1 ? TRUE : FALSE;
		if ( ! $only_option ) {
			// if there is NO answer set and there are multiple options to choose from, then set the "please select" message as selected
			$selected = $answer === NULL ? ' selected="selected"' : '';
			$input_html .= $add_please_select_option ? "\n\t\t\t\t" . '<option value=""' . $selected . '>' . __(' - please select - ', 'event_espresso') . '</option>' : '';
		}
		foreach ( $options as $key => $value ) {
			// if value is an array, then create option groups, else create regular ol' options
			$input_html .= is_array( $value ) ? self::_generate_select_option_group( $key, $value, $answer, $use_html_entities ) : self::_generate_select_option( $value->value(), $value->desc(), $answer, $only_option, $use_html_entities );
		}

		$input_html .= "\n\t\t\t" . '</select>';

		$input_html =  apply_filters( 'FHEE__EEH_Form_Fields__select__before_end_wrapper', $input_html, $question, $answer, $name, $id, $class, $system_ID );

		$input_html =  apply_filters( 'FHEE__EEH_Form_Fields__input_html', $input_html, $label_html, $id );
		return  $label_html . $input_html;

	}



	/**
	 * 	_generate_select_option_group
	 *
	 * 	if  $value for a select box is an array, then the key will be used as the optgroup label
	 * 	and the value array will be looped thru and the elements sent to _generate_select_option
	 *
	 * @param mixed $opt_group
	 * @param mixed $QSOs
	 * @param mixed $answer
	 * @param boolean $use_html_entities
	 * @return string
	 */
	private static function _generate_select_option_group( $opt_group, $QSOs, $answer, $use_html_entities = true ){
		$html = "\n\t\t\t\t" . '<optgroup label="' . self::prep_option_value( $opt_group ) . '">';
		foreach ( $QSOs as $QSO ) {
			$html .= self::_generate_select_option( $QSO->value(), $QSO->desc(), $answer, false, $use_html_entities );
		}
		$html .= "\n\t\t\t\t" . '</optgroup>';
		return $html;
	}



	/**
	 * 	_generate_select_option
	 * @param mixed $key
	 * @param mixed $value
	 * @param mixed $answer
	 * @param int $only_option
	 * @param boolean $use_html_entities
	 * @return string
	 */
	private static function _generate_select_option( $key, $value, $answer, $only_option = FALSE, $use_html_entities = true ){
		$key = self::prep_answer( $key, $use_html_entities );
		$value = self::prep_answer( $value, $use_html_entities );
		$value = ! empty( $value ) ? $value : $key;
		$selected = ( $answer == $key || $only_option ) ? ' selected="selected"' : '';
		return "\n\t\t\t\t" . '<option value="' . self::prep_option_value( $key ) . '"' . $selected . '> ' . $value . '&nbsp;&nbsp;&nbsp;</option>';
	}



	/**
	 * generates HTML for form radio button inputs
	 *
	 * @param bool|string $question    label content
	 * @param string      $answer      form input value attribute
	 * @param array|bool  $options     array of answer options where array key = option value and array value = option display text
	 * @param bool|string $name        form input name attribute
	 * @param string      $id          form input css id attribute
	 * @param string      $class       form input css class attribute
	 * @param array|bool  $required    'label', 'class', and 'msg' - array of values for required "label" content, css required 'class', and required 'msg' attribute
	 * @param string      $required_text
	 * @param string      $label_class css class attribute for the label
	 * @param bool|string $disabled    disabled="disabled" or null
	 * @param bool        $system_ID
	 * @param bool        $use_html_entities
	 * @param bool        $label_b4
	 * @param bool        $use_desc_4_label
	 * @return string HTML
	 */
	static function radio( $question = FALSE, $answer = NULL, $options = FALSE, $name = FALSE, $id = '', $class = '', $required = FALSE, $required_text = '', $label_class = '', $disabled = FALSE, $system_ID = FALSE, $use_html_entities = TRUE, $label_b4 = FALSE, $use_desc_4_label = FALSE ) {
		// need these
		if ( ! $question || ! $name || ! $options || empty( $options ) || ! is_array( $options )) {
			return NULL;
		}
		// prep the answer
		$answer = is_array( $answer ) ? '' : self::prep_answer( $answer, $use_html_entities );
		// prep the required array
		$required = self::prep_required( $required );
		// set disabled tag
		$disabled = $answer === NULL || ! $disabled  ? '' : ' disabled="disabled"';
		// ya gots ta have style man!!!
		$radio_class = is_admin() ? 'ee-admin-radio-lbl' : $label_class;
		$class = ! empty( $class ) ? $class : 'espresso-radio-btn-inp';
		$extra = apply_filters( 'FHEE__EEH_Form_Fields__additional_form_field_attributes', '' );

		$label_html = $required_text . "\n\t\t\t" . '<label class="' . $label_class . '">' . self::prep_question( $question ) . $required['label'] . '</label> ';
		// filter label but ensure required text comes before it
		$label_html = apply_filters( 'FHEE__EEH_Form_Fields__label_html', $label_html, $required_text );

		$input_html = "\n\t\t\t" . '<ul id="' . $id . '-ul" class="espresso-radio-btn-options-ul ' . $label_class . ' ' . $class . '-ul">';

		$class .= ! empty( $system_ID ) ? ' ' . $system_ID : '';
		$class .= ! empty( $required['class'] ) ? ' ' . $required['class'] : '';

		foreach ( $options as $OPT ) {
			if ( $OPT instanceof EE_Question_Option ) {
				$value = self::prep_option_value( $OPT->value() );
				$label = $use_desc_4_label ? $OPT->desc() : $OPT->value();
				$size = $use_desc_4_label ? self::get_label_size_class( $OPT->value() . ' ' . $OPT->desc() ) : self::get_label_size_class( $OPT->value() );
				$desc = $OPT->desc();//no self::prep_answer
				$answer = is_numeric( $value ) && empty( $answer ) ? 0 : $answer;
				$checked = (string)$value == (string)$answer ? ' checked="checked"' : '';
				$opt = '-' . sanitize_key( $value );

				$input_html .= "\n\t\t\t\t" . '<li' . $size . '>';
				$input_html .= "\n\t\t\t\t\t" . '<label class="' . $radio_class . ' espresso-radio-btn-lbl">';
				$input_html .= $label_b4  ? "\n\t\t\t\t\t\t" . '<span>' . $label . '</span>' : '';
				$input_html .= "\n\t\t\t\t\t\t" . '<input type="radio" name="' . $name . '" id="' . $id . $opt . '" class="' . $class . '" value="' . $value . '" title="' . esc_attr( $required['msg'] ) . '" ' . $disabled . $checked . ' ' . $extra . '/>';
				$input_html .= ! $label_b4  ? "\n\t\t\t\t\t\t" . '<span class="espresso-radio-btn-desc">' . $label . '</span>' : '';
				$input_html .= "\n\t\t\t\t\t" . '</label>';
				$input_html .= $use_desc_4_label ? '' : '<span class="espresso-radio-btn-option-desc small-text grey-text">' . $desc . '</span>';
				$input_html .= "\n\t\t\t\t" . '</li>';
			}
		}

		$input_html .= "\n\t\t\t" . '</ul>';

		$input_html =  apply_filters( 'FHEE__EEH_Form_Fields__input_html', $input_html, $label_html, $id );
		return  $label_html . $input_html;

	}






	/**
	 * generates HTML for form checkbox inputs
 	 *
	 * @param string $question 		label content
	 * @param string $answer 		form input value attribute
	 * @param array $options 			array of options where array key = option value and array value = option display text
	 * @param string $name 			form input name attribute
	 * @param string $id 				form input css id attribute
	 * @param string $class 			form input css class attribute
	 * @param array $required 		'label', 'class', and 'msg' - array of values for required "label" content, css required 'class', and required 'msg' attribute
	 * @param string $label_class 	css class attribute for the label
	 * @param string $disabled 		disabled="disabled" or null
	 * @return string HTML
	 */
	static function checkbox( $question = FALSE, $answer = NULL, $options = FALSE, $name = FALSE, $id = '', $class = '', $required = FALSE, $required_text = '', $label_class = '', $disabled = FALSE, $label_b4 = FALSE, $system_ID = FALSE, $use_html_entities = TRUE ) {
		// need these
		if ( ! $question || ! $name || ! $options || empty( $options ) || ! is_array( $options )) {
			return NULL;
		}
		$answer = maybe_unserialize( $answer );

		// prep the answer(s)
		$answer = is_array( $answer ) ? $answer : array( sanitize_key( $answer ) => $answer );

		foreach ( $answer as $key => $value ) {
			$key = self::prep_option_value( $key );
			$answer[$key] = self::prep_answer( $value, $use_html_entities );
		}

		// prep the required array
		$required = self::prep_required( $required );
		// set disabled tag
		$disabled = $answer === NULL || ! $disabled  ? '' : ' disabled="disabled"';
		// ya gots ta have style man!!!
		$radio_class = is_admin() ? 'ee-admin-radio-lbl' : $label_class;
		$class = empty( $class ) ? 'espresso-radio-btn-inp' : $class;
		$extra = apply_filters( 'FHEE__EEH_Form_Fields__additional_form_field_attributes', '' );

		$label_html = $required_text . "\n\t\t\t" . '<label class="' . $label_class . '">' . self::prep_question( $question ) . $required['label'] . '</label> ';
		// filter label but ensure required text comes before it
		$label_html = apply_filters( 'FHEE__EEH_Form_Fields__label_html', $label_html, $required_text );

		$input_html = "\n\t\t\t" . '<ul id="' . $id . '-ul" class="espresso-checkbox-options-ul ' . $label_class . ' ' . $class . '-ul">';

		$class .= ! empty( $system_ID ) ? ' ' . $system_ID : '';
		$class .= ! empty( $required['class'] ) ? ' ' . $required['class'] : '';

		foreach ( $options as $OPT ) {
			$value = $OPT->value();//self::prep_option_value( $OPT->value() );
			$size = self::get_label_size_class(  $OPT->value() . ' ' . $OPT->desc() );
			$text = self::prep_answer( $OPT->value() );
			$desc = $OPT->desc() ;
			$opt = '-' . sanitize_key( $value );

			$checked = is_array( $answer ) && in_array( $text, $answer ) ? ' checked="checked"' : '';

			$input_html .= "\n\t\t\t\t" . '<li' . $size . '>';
			$input_html .= "\n\t\t\t\t\t" . '<label class="' . $radio_class . ' espresso-checkbox-lbl">';
			$input_html .= $label_b4  ? "\n\t\t\t\t\t\t" . '<span>' . $text . '</span>' : '';
			$input_html .= "\n\t\t\t\t\t\t" . '<input type="checkbox" name="' . $name . '[' . $OPT->ID() . ']" id="' . $id . $opt . '" class="' . $class . '" value="' . $value . '" title="' . esc_attr( $required['msg'] ) . '" ' . $disabled . $checked . ' ' . $extra . '/>';
			$input_html .= ! $label_b4  ? "\n\t\t\t\t\t\t" . '<span>' . $text . '</span>' : '';
 			$input_html .= "\n\t\t\t\t\t" . '</label>';
			if ( ! empty( $desc ) && $desc != $text ) {
	 			$input_html .= "\n\t\t\t\t\t" . ' &nbsp; <br/><div class="espresso-checkbox-option-desc small-text grey-text">' . $desc . '</div>';
			}
			$input_html .= "\n\t\t\t\t" . '</li>';

		}

		$input_html .= "\n\t\t\t" . '</ul>';

		$input_html =  apply_filters( 'FHEE__EEH_Form_Fields__input_html', $input_html, $label_html, $id );
		return  $label_html . $input_html;

	}






	/**
	 * generates HTML for a form datepicker input
 	 *
	 * @param string $question 	label content
	 * @param string $answer 		form input value attribute
	 * @param string $name 			form input name attribute
	 * @param string $id 				form input css id attribute
	 * @param string $class 			form input css class attribute
	 * @param array $required 		'label', 'class', and 'msg' - array of values for required "label" content, css required 'class', and required 'msg' attribute
	 * @param string $label_class 	css class attribute for the label
	 * @param string $disabled 		disabled="disabled" or null
	 * @return string HTML
	 */
	static function datepicker( $question = FALSE, $answer = NULL, $name = FALSE, $id = '', $class = '', $required = FALSE, $required_text = '', $label_class = '', $disabled = FALSE, $system_ID = FALSE, $use_html_entities = TRUE ) {
		// need these
		if ( ! $question || ! $name ) {
			return NULL;
		}
		// prep the answer
		$answer = is_array( $answer ) ? '' : self::prep_answer( $answer, $use_html_entities );
		// prep the required array
		$required = self::prep_required( $required );
		// set disabled tag
		$disabled = $answer === NULL || ! $disabled  ? '' : ' disabled="disabled"';
		// ya gots ta have style man!!!
		$txt_class = is_admin() ? 'regular-text' : 'espresso-datepicker-inp';
		$class = empty( $class ) ? $txt_class : $class;
		$class .= ! empty( $system_ID ) ? ' ' . $system_ID : '';
		$extra = apply_filters( 'FHEE__EEH_Form_Fields__additional_form_field_attributes', '' );

		$label_html = $required_text . "\n\t\t\t" . '<label for="' . $name . '" class="' . $label_class . '">' . self::prep_question( $question ) . $required['label'] . '</label><br/>';
		// filter label but ensure required text comes before it
		$label_html = apply_filters( 'FHEE__EEH_Form_Fields__label_html', $label_html, $required_text );

		$input_html = "\n\t\t\t" . '<input type="text" name="' . $name . '" id="' . $id . '" class="' . $class . ' ' . $required['class'] . ' datepicker" value="' . $answer . '"  title="' . esc_attr( $required['msg'] ) . '" ' . $disabled . ' ' . $extra . '/>';

		// enqueue scripts
		wp_register_style( 'espresso-ui-theme', EE_GLOBAL_ASSETS_URL . 'css/espresso-ui-theme/jquery-ui-1.10.3.custom.min.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style( 'espresso-ui-theme');
		wp_enqueue_script( 'jquery-ui-datepicker' );

		$input_html =  apply_filters( 'FHEE__EEH_Form_Fields__input_html', $input_html, $label_html, $id );
		return  $label_html . $input_html;

	}



	/**
	 * 	remove_label_keep_required_msg
	 * 	this will strip out a form input's label HTML while keeping the required text HTML that MUST be before the label
	 * 	@access public
	 * 	@return 	string
	 */
	public static function remove_label_keep_required_msg( $label_html, $required_text ) {
		return $required_text;
	}





	/**
	 * Simply return sthe HTML for a hidden input of the given name and value.
	 * @param string $name
	 * @param string $value
	 * @return string HTML
	 */
	static function hidden_input( $name, $value, $id = '' ){
		$id = ! empty( $id ) ? $id : $name;
		return '<input id="' . $id . '" type="hidden" name="'.$name.'" value="' .  $value . '"/>';
	}





	/**
	 * prep_question
	 * @param string $question
	 * @return string
	 */
	static function prep_question( $question ){
		return $question;
//		$link = '';
//		// does this label have a help link attached ?
//		if ( strpos( $question, '<a ' ) !== FALSE ) {
//			$qbits = explode( '<a ', $question );
//			foreach ( $qbits as $qbit ) {
//				$link = strpos( $qbit, 'title="' ) !== FALSE ? $qbit : $link;
//				$question = strpos( $qbit, 'title="' ) === FALSE ? $qbit : $question;
//			}
//			$link = '<a ' . $link;
//		}
//		return htmlspecialchars( trim( stripslashes( str_replace( '&#039;', "'", $question ))), ENT_QUOTES, 'UTF-8' ) . ' ' . $link;
	}




	/**
	 * 	prep_answer
	 * @param mixed $answer
	 * @return string
	 */
	static function prep_answer( $answer, $use_html_entities = TRUE ){
		//make sure we convert bools first.  Otherwise (bool) false becomes an empty string which is NOT desired, we want "0".
		if ( is_bool( $answer ) ) {
			$answer = $answer ? 1 : 0;
		}
		$answer = trim( stripslashes( str_replace( '&#039;', "'", $answer )));
		return $use_html_entities ? htmlentities( $answer, ENT_QUOTES, 'UTF-8' ) : $answer;
	}



	/**
	 * 	prep_answer_options
	 * 	@param array $QSOs  array of EE_Question_Option objects
	 * 	@return array
	 */
	public static function prep_answer_options( $QSOs = array() ){
		$prepped_answer_options = array();
		if ( is_array( $QSOs ) && ! empty( $QSOs )) {
			foreach( $QSOs as $key => $QSO ) {
				if ( ! $QSO instanceof EE_Question_Option ) {
					$QSO = EE_Question_Option::new_instance( array(
						'QSO_value' => is_array( $QSO ) && isset( $QSO['id'] ) ? (string)$QSO['id'] : (string)$key,
						'QSO_desc' => is_array( $QSO ) && isset( $QSO['text'] ) ? (string)$QSO['text'] : (string)$QSO
					));
				}
				if ( $QSO->opt_group() ) {
					$prepped_answer_options[ $QSO->opt_group() ][] = $QSO;
				} else {
					$prepped_answer_options[] = $QSO;
				}
			}
		}
//		d( $prepped_answer_options );
		return $prepped_answer_options;
	}


	/**
	 * 	prep_option_value
	 * @param string $option_value
	 * @return string
	 */
	static function prep_option_value( $option_value ){
		return esc_attr( trim( stripslashes( $option_value ) ) );
	}




	/**
	 * 	prep_required
	 * @param string|array 	$required
	 * @return array
	 */
	static function prep_required( $required = array() ){
		// make sure required is an array
		$required = is_array( $required ) ? $required : array();
		// and set some defaults
		$required = array_merge( array( 'label' => '', 'class' => '', 'msg' => '' ), $required );
		return $required;
	}



	/**
	 * 	get_label_size_class
	 * @param string 	$value
	 * @return string
	 */
	static function get_label_size_class( $value = FALSE ){
			if ( $value === FALSE || $value == '' ) {
				return ' class="medium-lbl"';
			}
			// determine length of option value
			$val_size = strlen( $value );
			switch( $val_size ){
				case $val_size < 3 :
					$size =  ' class="nano-lbl"';
					break;
				case $val_size < 6 :
					$size =  ' class="micro-lbl"';
					break;
				case $val_size < 12 :
					$size =  ' class="tiny-lbl"';
					break;
				case $val_size < 25 :
					$size =  ' class="small-lbl"';
					break;
				case $val_size > 100 :
					$size =  ' class="big-lbl"';
					break;
				default:
					$size =  ' class="medium-lbl"';
					break;
			}
		return $size;
	}




	/**
	 * 	_load_system_dropdowns
	 * @param array 	$QFI
	 * @return array
	 */
	private static function _load_system_dropdowns( $QFI ){
		$QST_system = $QFI->get('QST_system');
		switch ( $QST_system ) {
			case 'state' :
				$QFI = self::generate_state_dropdown( $QFI );
				break;
			case 'country' :
				$QFI = self::generate_country_dropdown( $QFI );
				break;
			case 'admin-state' :
				$QFI = self::generate_state_dropdown( $QFI, TRUE );
				break;
			case 'admin-country' :
				$QFI = self::generate_country_dropdown( $QFI, TRUE );
				break;
		}
		return $QFI;
	}



	/**
	 * This preps dropdowns that are specialized.
	 *
	 * @since  4.6.0
	 *
	 * @param EE_Question_Form_Input $QFI
	 *
	 * @return EE_Question_Form_Input
	 */
	protected static function _load_specialized_dropdowns( $QFI ) {
		switch( $QFI->get( 'QST_type' ) ) {
			case 'STATE' :
				$QFI = self::generate_state_dropdown( $QFI );
				break;
			case 'COUNTRY' :
				$QFI = self::generate_country_dropdown( $QFI );
				break;
		}
		return $QFI;
	}



	/**
	 *    generate_state_dropdown
	 * @param array $QST
	 * @param bool  $get_all
	 * @return array
	 */
	public static function generate_state_dropdown( $QST, $get_all = FALSE ){
		$states = $get_all ? EEM_State::instance()->get_all_states() : EEM_State::instance()->get_all_states_of_active_countries();
		if ( $states && count( $states ) != count( $QST->options() )) {
			$QST->set( 'QST_type', 'DROPDOWN' );
			// if multiple countries, we'll create option groups within the dropdown
			foreach ( $states as $state ) {
				if ( $state instanceof EE_State ) {
					$QSO = EE_Question_Option::new_instance ( array (
						'QSO_value' => $state->ID(),
						'QSO_desc' => $state->name(),
						'QST_ID' => $QST->get( 'QST_ID' ),
						'QSO_deleted' => FALSE
					));
					// set option group
					$QSO->set_opt_group( $state->country()->name() );
					// add option to question
					$QST->add_temp_option( $QSO );
				}
			}
		}
		return $QST;
	}



	/**
	 *    generate_country_dropdown
	 * @param      $QST
	 * @param bool $get_all
	 * @internal param array $question
	 * @return array
	 */
	public static function generate_country_dropdown( $QST, $get_all = FALSE ){
		$countries = $get_all ? EEM_Country::instance()->get_all_countries() : EEM_Country::instance()->get_all_active_countries();
		if ( $countries && count( $countries ) != count( $QST->options() ) ) {
			$QST->set( 'QST_type', 'DROPDOWN' );
			// now add countries
			foreach ( $countries as $country ) {
				if ( $country instanceof EE_Country ) {
					$QSO = EE_Question_Option::new_instance ( array (
						'QSO_value' => $country->ID(),
						'QSO_desc' => $country->name(),
						'QST_ID' => $QST->get( 'QST_ID' ),
						'QSO_deleted' => FALSE
					));
					$QST->add_temp_option( $QSO );
				}
			}
		}
		return $QST;
	}





	/**
	 * 	generates options for a month dropdown selector with numbers from 01 to 12
	 * 	@return array()
	 */
	public static function two_digit_months_dropdown_options() {
		$options = array();
		for ( $x = 1; $x <= 12; $x++ ) {
			$mm = str_pad( $x, 2, '0', STR_PAD_LEFT );
			$options[ (string)$mm ] = (string)$mm;
		}
		return EEH_Form_Fields::prep_answer_options( $options );
	}





	/**
	 * 	generates a year dropdown selector with numbers for the next ten years
	 * 	@return object
	 */
	public static function next_decade_two_digit_year_dropdown_options() {
		$options = array();
		$current_year = date('y');
		$next_decade = $current_year + 10;
		for ( $x = $current_year; $x <= $next_decade; $x++ ) {
			$yy = str_pad( $x, 2, '0', STR_PAD_LEFT );
			$options[ (string)$yy ] = (string)$yy;
		}
		return EEH_Form_Fields::prep_answer_options( $options );
	}





	/**
	 * generates a month/year dropdown selector for all registrations matching the given criteria.  Typically used for list table filter.
	 * @param  string  $cur_date     any currently selected date can be entered here.
	 * @param  string  $status       Registration status
	 * @param  integer $evt_category Event Category ID if the Event Category filter is selected
	 * @return string                html
	 */
	public static function generate_registration_months_dropdown( $cur_date = '', $status = '', $evt_category = 0 ) {
		$_where = array();
		if ( !empty( $status ) ) {
			$_where['STS_ID'] = $status;
		}

		if ( $evt_category > 0 ) {
			$_where['Event.Term_Taxonomy.term_id'] = $evt_category;
		}

		$regdtts = EEM_Registration::instance()->get_reg_months_and_years( $_where );

		//setup vals for select input helper
		$options = array(
			0 => array(
				'text' => __('Select a Month/Year', 'event_espresso'),
				'id' => ''
				)
			);

		foreach ( $regdtts as $regdtt ) {
			$date = $regdtt->reg_month. ' ' . $regdtt->reg_year;
			$options[] = array(
				'text' => $date,
				'id' => $date
				);
		}

		return self::select_input('month_range', $options, $cur_date, '', 'wide' );
	}



	/**
	 * generates a month/year dropdown selector for all events matching the given criteria
	 * Typically used for list table filter
	 * @param  string $cur_date          any currently selected date can be entered here.
	 * @param  string $status            "view" (i.e. all, today, month, draft)
	 * @param  int    $evt_category      category event belongs to
	 * @param  string $evt_active_status "upcoming", "expired", "active", or "inactive"
	 * @return string                    html
	 */
	public static function generate_event_months_dropdown( $cur_date = '', $status = NULL, $evt_category = NULL, $evt_active_status = NULL ) {
		//determine what post_status our condition will have for the query.
		switch ( $status ) {
			case 'month' :
			case 'today' :
			case NULL :
			case 'all' :
				$where['Event.status'] = array( 'NOT IN', array('trash') );
				break;

			case 'draft' :
				$where['Event.status'] = array( 'IN', array('draft', 'auto-draft') );

			default :
				$where['Event.status'] = $status;
		}

		//categories?


		if ( !empty ( $evt_category ) ) {
			$where['Event.Term_Taxonomy.taxonomy'] = 'espresso_event_categories';
			$where['Event.Term_Taxonomy.term_id'] = $evt_category;
		}


//		$where['DTT_is_primary'] = 1;

		$DTTS = EE_Registry::instance()->load_model('Datetime')->get_dtt_months_and_years($where, $evt_active_status );

		//let's setup vals for select input helper
		$options = array(
			0 => array(
				'text' => __('Select a Month/Year', 'event_espresso'),
				'id' => ""
				)
			);



		//translate month and date
		global $wp_locale;

		foreach ( $DTTS as $DTT ) {
			$localized_date = $wp_locale->get_month( $DTT->dtt_month_num ) . ' ' . $DTT->dtt_year;
			$id = $DTT->dtt_month . ' ' . $DTT->dtt_year;
			$options[] = array(
				'text' => $localized_date,
				'id' => $id
				);
		}


		return self::select_input( 'month_range', $options, $cur_date, '', 'wide' );
	}



	/**
	 * generates the dropdown selector for event categories
	 * typically used as a filter on list tables.
	 * @param  integer $current_cat currently selected category
	 * @return string               html for dropdown
	 */
	public static function generate_event_category_dropdown( $current_cat = -1 ) {
		$categories = EEM_Term::instance()->get_all_ee_categories(TRUE);
		$options = array(
			'0' => array(
				'text' => __('All Categories', 'event_espresso'),
				'id' => -1
				)
			);

		//setup categories for dropdown
		foreach ( $categories as $category ) {
			$options[] = array(
				'text' => $category->get('name'),
				'id' => $category->ID()
				);
		}

		return self::select_input( 'EVT_CAT', $options, $current_cat );
	}



	/**
	 *    generate a submit button with or without it's own microform
	 *    this is the only way to create buttons that are compatible across all themes
	 *
	 * @access    public
	 * @param    string   $url              - the form action
	 * @param    string   $ID               - some kind of unique ID, appended with "-sbmt" for the input and "-frm" for the form
	 * @param    string   $class            - css classes (separated by spaces if more than one)
	 * @param    string   $text             - what appears on the button
	 * @param    string   $nonce_action     - if using nonces
	 * @param    bool|string $input_only       - whether to print form header and footer. TRUE returns the input without the form
	 * @param    string   $extra_attributes - any extra attributes that need to be attached to the form input
	 * @return    void
	 */
	public static function submit_button( $url = '', $ID = '', $class = '', $text = '', $nonce_action = '', $input_only = FALSE, $extra_attributes = '' ) {
		$btn = '';
		if ( empty( $url ) || empty( $ID )) {
			return $btn;
		}
		$text = ! empty( $text ) ? $text : __('Submit', 'event_espresso' );
		$btn .= '<input id="' . $ID . '-btn" class="' . $class . '" type="submit" value="' . $text . '" ' . $extra_attributes . '/>';
		if ( ! $input_only ) {
			$btn_frm = '<form id="' . $ID . '-frm" method="POST" action="' . $url . '">';
			$btn_frm .= ! empty( $nonce_action ) ? wp_nonce_field( $nonce_action, $nonce_action . '_nonce', TRUE, FALSE ) : '';
			$btn_frm .= $btn;
			$btn_frm .= '</form>';
			$btn = $btn_frm;
			unset ( $btn_frm );
		}
		return $btn;
	}



}//end class EEH_Form_Fields

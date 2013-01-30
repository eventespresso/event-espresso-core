<?php

if (!function_exists('event_form_build')) {

	function event_form_build( $question, $answer = "", $event_id = null, $multi_reg = 0, $extra = array(), $class='my_class') {
		if ($question->admin_only && empty($show_admin_only)) {
			return;
		}
		$html = '';
		$required = '';
		$attendee_number = isset($extra['attendee_number']) ? $extra['attendee_number'] : 0;
		$tckt_date = isset($extra['date']) ? $extra['date'] : 0;
		$tckt_time = isset($extra['time']) ? $extra['time'] : 0;
		$price_id = isset($extra['price_id']) ? $extra['price_id'] : 0;

		$multi_name = "[$event_id][$attendee_number][$tckt_date][$tckt_time][$price_id]";
		if (!empty($question->system_name)) {
			$field_name = $question->system_name;
		} else {
			$field_name = $question->question_type . '_' . $question->id;
			$html .= '<input type="hidden" name="qstn[custom_questions]['.$field_name.']" value="'.$question->question.'"/>';
		}
		$arrayed_field = '';

		if ($question->required) {
			$required = ' title="' . $question->required_text . '" class="required ' . $class . '"';
			$required_label = "<em>*</em>";
		}
		if (is_array($answer) && array_key_exists($event_id, $answer)) {

			$answer = empty($answer[$event_id]['event_attendees'][$price_id][$attendee_number][$field_name]) ? '' : $answer[$event_id]['event_attendees'][$price_id][$attendee_number][$field_name];
		}

		$required_label = isset($required_label) ? $required_label : '';

		$label = '<label for="' . $field_name . '">' . $question->question . $required_label . '</label> ';

		//If the members addon is installed, get the users information if available
		if( defined( 'EVENT_ESPRESSO_MEMBERS_DIR' )) {
			global $current_user;
			global $user_email;
			require_once(EVENT_ESPRESSO_MEMBERS_DIR . "user_vars.php"); //Load Members functions
			$userid = $current_user->ID;
			$member_options = get_option('events_member_settings');
		}


		switch ($question->question_type) {

			case "TEXT" :

				$disabled = isset($disabled) ? $disabled : '';
				if (defined( 'EVENT_ESPRESSO_MEMBERS_DIR' ) && (empty($_REQUEST['event_admin_reports']) || $_REQUEST['event_admin_reports'] != 'add_new_attendee')) {
					if (!empty($question->system_name)) {
						if ( $attendee_number == 1 ) {
							switch ($question->system_name) {
								case 'fname':
								case 'lname':
									$member_answer = $current_user->{$question->system_name};
									break;
								case 'email':
									$member_answer = $user_email;
									break;
								case 'address':
								case 'city':
								case 'state':
								case 'zip':
								case 'phone':
								case 'country':
									$member_answer = esc_attr(get_user_meta( $userid, 'event_espresso_' . $question->system_name, TRUE ));
								break;
							}
							$disabled = ($answer == '' || $member_options['autofilled_editable']) ? '' : 'disabled="disabled"';
							$answer = ( $member_answer == '' ) ? $answer : $member_answer;
						}
					}
				}

				$input_id = isset($extra['input_id']) ? $extra['input_id'].'-'.$field_name : 'qstn' . $multi_name.'-'.$field_name;
				$autofocused = $attendee_number == 1 && $field_name == 'fname' ? ' autofocus' : '';
				$html .= '<p class="event_form_field">' . $label;
				$html .= '<input type="text" ' . $required . ' id="' .$input_id. '"  name="qstn' . $multi_name.'['.$field_name.']'. $arrayed_field . '" class="' . $class . '" value="' . $answer . '" ' . $disabled . $autofocused . ' /></p>';
				$html .= '</p>';

				break;





			case "DATE" :
				//Load scripts and styles
				wp_register_style('jquery-ui-style-datepicker', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery.ui.datepicker.css');
				wp_print_styles( 'jquery-ui-style-datepicker' );
				wp_print_scripts('jquery-ui-datepicker');

				$html .= '<p class="event_form_field">' . $label;
				$disabled = isset($disabled) ? $disabled : '';
				$html .= '<input class="datepicker" type="text" ' . $required . ' id="' . $field_name . '-' . $event_id . '-' . $price_id . '-' . $attendee_number . '"  name="qstn' . $multi_name.'['.$field_name.']'. $arrayed_field . '" size="40" class="' . $class . '" value="' . $answer . '" ' . $disabled . ' /></p>';
				$html .= '<script type="text/javascript" charset="utf-8">jQuery(".datepicker" ).datepicker({yearRange: "c-100:c+10", changeMonth: true,changeYear: true,dateFormat: "yy-mm-dd",showButtonPanel: true});</script>';
				break;
			case "TEXTAREA" :
				$html .= '<p class="event_form_field event-quest-group-textarea">' . $label;
				$html .= '<textarea id=""' . $required . ' name="qstn' . $multi_name.'['.$field_name.']'. $arrayed_field . '"  cols="30" rows="5" class="' . $class . '">' . $answer . '</textarea></p>';
				break;
			case "SINGLE" :
				$values = explode(",", $question->response);
				$answers = explode(",", $answer);
				$html .= '<fieldset class="single-radio">';
				$html .= '<legend class="event_form_field">' . $question->question . '</legend>';

				$html .= '<ul class="event_form_field">';
				foreach ($values as $key => $value) {
					//old way $checked = in_array ( $value, $answers ) ? ' checked="checked"' : "";
					$value = trim($value);
					$checked = ( $value == $answer ) ? ' checked="checked"' : "";
					$html .= '<li><label for="SINGLE_' . $question->id . '_' . $key . '" class="' . $class . '"><input title="' . $question->required_text . '" id="SINGLE_' . $question->id . '_' . $key . '" ' . $required . ' name="qstn' . $multi_name.'['.$field_name.']'. $arrayed_field . '"  type="radio" value="' . $value . '" ' . $checked . ' /> ' . $value . '</label></li>';
					//echo $label;
				}
				$html .= '</ul>';
				$html .= '</fieldset>';
				break;
			case "MULTIPLE" :
				$values = explode(",", $question->response);
				$answers = explode(",", $answer);
				$html .= '<fieldset class="multi-checkbox">';
				$html .= '<legend class="event_form_field">' . $question->question . '</legend>';
				//$html .= '</p>';
				$html .= '<ul class="event_form_field">';
				foreach ($values as $key => $value) {
					$value = trim($value);
					$checked = (is_array($answer) && in_array($value, $answer)) ? ' checked="checked"' : "";
					//$checked = ( $value == $answer ) ? ' checked="checked"' : "";
					/* 	$html .= "<label><input type=\"checkbox\"$required id=\"MULTIPLE_$question->id_$key\" name=\"MULTIPLE_$question->id_$key\"  value=\"$value\"$checked /> $value</label><br/>\n"; */
					$html .= '<li><label for="' . str_replace(' ', '', $value) . '-' . $event_id . '" class="' . $class . '"><input id="' . str_replace(' ', '', $value) . '-' . $event_id . '" ' . $required . 'name="qstn' . $multi_name.'['.$field_name.']'. $arrayed_field . '[]"  type="checkbox" value="' . $value . '" ' . $checked . '/> ' . $value . '</label></li>';
				}
				$html .= '</ul>';
				$html .= '</fieldset>';
				break;
			case "DROPDOWN" :
				$dd_type = $question->system_name == 'state' ? 'name="state"' : 'name="qstn' . $multi_name.'['.$field_name.']'. $arrayed_field . '"';
				$values = explode(",", $question->response);
				$answers = explode(",", $answer);
				$html .= '<p class="event_form_field" class="' . $class . '">' . $label;
				$html .= '<select ' . $dd_type . ' ' . $required . ' id="DROPDOWN_' . $question->id . '-' . $event_id . '-' . $price_id . '-' . $attendee_number . '" class="' . $class . '">';
				$html .= "<option value=''>" . __('Select One', 'event_espresso') . "</option>";
				foreach ($values as $key => $value) {
					$value = trim($value);
					//$checked = in_array ( $value, $answers ) ? ' selected=" selected"' : "";
					$selected = ( $value == $answer ) ? ' selected="selected"' : "";
					$html .= '<option value="' . $value . '" ' . $selected . '> ' . $value . '</option>';
				}
				$html .= "</select>";
				$html .= '</p>';
				break;
			default :
				break;
		}
		$attendee_number++;
		return $html;
	}

}

function event_form_build_edit($question, $edits, $show_admin_only = false) {

	$required = '';
	/* if ($question->required) {
        $required = ' class="required"';
    }*/

	 /**
         * Temporary client side email validation solution by Abel, will be replaced
         * in the next version with a full validation suite.
         */
        $email_validate = $question->system_name == 'email' ? 'email' : '';

        if ($question->required) {
            $required = ' title="' . $question->required_text . '" class="required ' . $email_validate . '"';
            $required_label = "<em>*</em>";
        } else {
			$required = '';
		}
	$required_label = isset($required_label) ? $required_label : '';

	//echo '<p>id = '.$question->id.'</p>';
	//echo '<p>q_id = '.$question->q_id.'</p>';
	//Sometimes the answer id is passed as the question id, so we need to make sure that we get the right question id.

	$answer_id = $question->id;
	//echo $answer_id;

	if (isset($question->q_id)){
		$question->id = $question->q_id;
	}

	if ($question->admin_only && $show_admin_only == false) {
		return;
	}

	$field_name = ($question->system_name != '') ? $question->system_name : 'TEXT_' . $question->id;
	echo '<label for="' . $field_name . '">' . $question->question . $required_label .'</label><br>';

	//DEBUG:
	//echo '<p>$question->question_type = '.$question->question_type.'</p>';

	switch ($question->question_type) {
		case "TEXT" :
			echo '<input type="text" ' . $required . ' id="' . $field_name . '"  name="' . $field_name . '" size="40"  value="' . $edits . '" />';
			break;
		case "DATE" :
			//Load scripts and styles
			wp_register_style('jquery-ui-style-datepicker', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery.ui.datepicker.css');
			wp_print_styles( 'jquery-ui-style-datepicker' );
			wp_print_scripts('jquery-ui-datepicker');

			echo '<input class="datepicker" type="text" ' . $required . ' id="' . $field_name . '-' . $event_id . '-' . $price_id . '-' . $attendee_number . '"  name="' . $field_name . $multi_name_adjust . '" size="40" class="' . $class . '" value="' . $edits . '" ' . $disabled . ' />';
			echo '<script type="text/javascript" charset="utf-8">jQuery(".datepicker" ).datepicker({yearRange: "c-100:c+10",changeMonth: true,changeYear: true,dateFormat: "yy-mm-dd",showButtonPanel: true});</script>';
			break;

		case "TEXTAREA" :
			echo '<textarea id="TEXTAREA_' . $question->id . '" ' . $required . ' name="TEXTAREA_' . $question->id . '"  cols="30" rows="5">' . $edits . '</textarea>';
			break;
		case "SINGLE" :
			$values = explode(",", $question->response);
			$answers = explode(",", $edits);
			echo '<ul>';
			foreach ($values as $key => $value) {
				$checked = in_array(trim($value), $answers) ? ' checked="checked"' : "";
				echo '<li><input id="SINGLE_' . $question->id . '_' . $key . '" ' . $required . ' name="SINGLE_' . $question->id . '"  type="radio" value="' . trim($value) . '" ' . $checked . '/> ' . trim($value) . '</li>';
			}
			echo "</ul>";
			break;
		case "MULTIPLE" :
			$values = explode(",", $question->response);
			$answers = explode(",", $edits);
			//echo '<p>New True ID= '.$question->id.'</p>';
			echo '<ul>';
			foreach ($values as $key => $value) {
				$checked = in_array(trim($value), $answers) ? " checked=\"checked\"" : "";
				/* 	echo "<label><input type=\"checkbox\"$required id=\"MULTIPLE_$question->id_$key\" name=\"MULTIPLE_$question->id_$key\"  value=\"$value\"$checked /> $value</label><br/>\n"; */
				echo '<li><input id="' . trim($value) . '" ' . $required . ' name="MULTIPLE_' . $question->id . '[]"  type="checkbox" value="' . trim($value) . '" ' . $checked . '/> ' . trim($value) . '</li>';
			}
			echo "</ul>";
			//echo '<input name="'.$answer_id.'" type="hidden" value="'.$answer_id.'" />';
			break;
		case "DROPDOWN" :
			$dd_type = $question->system_name == 'state' ? 'name="state"' : 'name="DROPDOWN_' . $question->id . '"';
			$values = explode(",", $question->response);
			//$answers = explode ( ",", $edits );
			echo '<select ' . $dd_type . ' ' . $required . ' ' . $required . ' id="DROPDOWN_' . $question->id . '"  />';
			echo '<option value="' . $edits . '">' . $edits . '</option>';
			foreach ($values as $key => $value) {
				//$checked = in_array ( $value, $answers ) ? " selected =\" selected\"" : "";
				echo '<option value="' . trim($value) . '" /> ' . trim($value) . '</option>';
			}
			echo "</select>";
			break;
		default :
			break;
	}
}
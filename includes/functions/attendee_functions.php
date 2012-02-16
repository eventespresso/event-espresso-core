<?php

//Attendee functions

function add_attendee_questions($questions, $registration_id, $attendee_id=0, $extra=array()) {

	if (array_key_exists('session_vars', $extra)) {

		$response_source = $extra['session_vars'];
	} else
		$response_source = $_POST;

	/* echo 'Debug: <br />';
	  print_r( $questions );
	  echo '<br>';
	  echo $registration_id;
	  echo '<br>';
	  echo $attendee_id;
	  echo '<br>'; */
	$question_groups = $questions; //unserialize($questions->question_groups);
	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$wpdb->show_errors();
	//print_r($question_groups);
	//echo "<pre>".print_r($_POST,true)."</pre>";

	/**
	 * Added this check because in some cases question groups are being sent as serialized
	 */
	if ( !is_array($question_groups) && !empty($question_groups)) {
		$question_groups = unserialize($question_groups);
	}

	if (count($question_groups) > 0) {
		$questions_in = '';


		foreach ($question_groups as $k=>$g_id) {
			$questions_in .= $g_id . ',';
		}


		$questions_in = substr($questions_in, 0, -1);
		$group_name = '';
		$counter = 0;

		$questions = $wpdb->get_results("SELECT q.*, qg.group_name
														FROM " . EVENTS_QUESTION_TABLE . " q
														JOIN " . EVENTS_QST_GROUP_REL_TABLE . " qgr
														on q.id = qgr.question_id
														JOIN " . EVENTS_QST_GROUP_TABLE . " qg
														on qg.id = qgr.group_id
														WHERE qgr.group_id in (" . $questions_in
						. ") ORDER BY q.id ASC");
		//. ") AND q.system_name IS NULL ORDER BY id ASC");

				$num_rows = $wpdb->num_rows;

		if ($num_rows > 0) {
			$question_displayed = array();
			global $email_questions; //Make a global variable to hold the answers to the questions to be sent in the admin email.
			$email_questions = '<p>' . __('Form Questions:', 'event_espresso') . '<br />';
			foreach ($questions as $question) {
				if (!in_array($question->id, $question_displayed)) {
					$question_displayed[] = $question->id;
					switch ($question->question_type) {
						case "TEXT" :
						case "TEXTAREA" :
						case "DROPDOWN" :
						case "DATE" :
							$post_val = ($question->system_name != '') ? $response_source[$question->system_name] : $response_source[$question->question_type . '_' . $question->id];
							$wpdb->query("INSERT into " . EVENTS_ANSWER_TABLE . " (registration_id, attendee_id, question_id, answer)
															values ('" . $registration_id . "', '" . $attendee_id . "', '" . $question->id . "', '" . $post_val . "')");
							$email_questions .= $question->question . ': ' . $post_val . '<br />';
							break;
						case "SINGLE" :
							$post_val = ($question->system_name != '') ? $response_source[$question->system_name] : $response_source[$question->question_type . '_' . $question->id];
							$wpdb->query("INSERT into " . EVENTS_ANSWER_TABLE . " (registration_id, attendee_id, question_id, answer)
															values ('" . $registration_id . "', '" . $attendee_id . "', '" . $question->id . "', '" . $post_val . "')");
							$email_questions .= $question->question . ': ' . $post_val . '<br />';
							break;
						case "MULTIPLE" :
							$value_string = '';
							if(!empty($response_source[$question->question_type . '_' . $question->id])) {
															for ($i = 0; $i < count($response_source[$question->question_type . '_' . $question->id]); $i++) {

								$value_string .= trim($response_source[$question->question_type . '_' . $question->id][$i]) . ",";
															}
														}

							$wpdb->query("INSERT INTO " . EVENTS_ANSWER_TABLE . " (registration_id, attendee_id, question_id, answer)
															VALUES ('" . $registration_id . "', '" . $attendee_id . "', '" . $question->id . "', '" . $value_string . "')");
							$email_questions .= $question->question . ': ' . $value_string . '<br />';
							break;
					}
				}
			}
			$email_questions .= '</p>';
		}
	}
}






//function is_attendee_approved($event_id, $attendee_id) {
//
//	global $wpdb, $org_options;
//	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
//	$result = true;
//	if (isset($org_options["use_attendee_pre_approval"])&&$org_options["use_attendee_pre_approval"] == "Y") {
//		$result = false;
//		$require_pre_approval = 0;
//		$tmp_events = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id = " . $event_id);
//		foreach ($tmp_events as $tmp_event) {
//			$require_pre_approval = $tmp_event->require_pre_approval;
//		}
//		if ($require_pre_approval == 1) {
//			$tmp_attendees = $wpdb->get_results("SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id = " . $attendee_id);
//			foreach ($tmp_attendees as $tmp_attendee) {
//				$pre_approve = $tmp_attendee->pre_approve;
//			}
//			if ($pre_approve == 0) {
//				$result = true;
//			}
//		} else {
//			$result = true;
//		}
//	}
//	return $result;
//}
//
//



// rewrite by brent
// every function that called this function was already performing a query on the events details table,
// often returning the require_pre_approval field as part of the results,
// and yet this function performs another query on the events details table just to retreive the require_pre_approval field !!!?!?!?!?!
// i'm now passing the require_pre_approval value into this function and no longer performing a new query
// which allows me to use this for MER 2.0   : )
function is_attendee_approved( $require_pre_approval = FALSE, $attendee_id ) {

	global $wpdb, $org_options;

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	$result = TRUE;
	// does the global option requesting attendee pre-approval ?
	if ( isset( $org_options["use_attendee_pre_approval"] ) && $org_options["use_attendee_pre_approval"] == "Y" ) {

		$result = FALSE;
		if ( $require_pre_approval ) {
			$SQL = 'SELECT pre_approve FROM ' . EVENTS_ATTENDEE_TABLE . ' WHERE id = %d';
			$pre_approve = $wpdb->get_var( $wpdb->prepare( $SQL, $attendee_id ));
			if ( $pre_approve == 0 ) {
				$result = TRUE;
			}
		} else {
			$result = TRUE;
		}
	}
	return $result;
}

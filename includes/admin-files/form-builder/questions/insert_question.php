<?php
/*This page adds/edits the individual questions*/
//Function to add a question to the database
function event_espresso_form_builder_insert(){
	global $wpdb,$current_user, $notices;
	//$wpdb->show_errors();
	
	if( check_admin_referer('espresso_form_check', 'add_new_question') ) {
	$event_id = empty($_REQUEST['event_id']) ? 0 : $_REQUEST['event_id'];
	$event_name = empty($_REQUEST['event_name']) ? '' : $_REQUEST['event_name'];
	$question = $_POST['question'];
	$question_type = $_POST['question_type'];
	$question_values = $_POST['values'];
	$required = !empty($_POST['required']) ? 'Y':'N';
	$admin_only = !empty($_POST['admin_only']) ? 'Y':'N';
	$sequence = $_POST['sequence'] ?  $_POST['sequence']:'0';
	}
	
	if (!function_exists('espresso_member_data'))
			$current_user->ID = 1;

	if( $wpdb->query("INSERT INTO " . EVENTS_QUESTION_TABLE . " (question_type, question, response, required,admin_only, sequence,wp_user)"
				. " VALUES ('" . $question_type . "', '" . $question . "', '" . $question_values . "', '" . $required . "', '" . $admin_only . "', " . $sequence . ",'".$current_user->ID."')")) {
			$notices['updates'][] = __('The question', 'event_espresso') .  htmlentities2($_REQUEST['question']) . __(' has been added.', 'event_espresso');
	}else {
			$notices['errors'][] = __('The question ', 'event_espresso') .  htmlentities2($_REQUEST['question']) . __(' was not saved .', 'event_espresso');
	}
	
}

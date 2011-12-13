<?php

/* This page adds/edits the individual questions */

//Function to add a question to the database
function event_espresso_form_builder_insert() {
	global $wpdb, $espresso_wp_user, $notices;
	//$wpdb->show_errors();

	if (check_admin_referer('espresso_form_check', 'add_new_question')) {
		$question = $_POST['question'];
		$question_type = $_POST['question_type'];
		$question_values = empty($_POST['values']) ? '' : $_POST['values'];
		$required = !empty($_POST['required']) ? 'Y' : 'N';
		$admin_only = !empty($_POST['admin_only']) ? 'Y' : 'N';
		$sequence = $_POST['sequence'] ? $_POST['sequence'] : '0';
	}

	$sql = array(
			'question_type' => $question_type,
			'question' => $question,
			'response' => $question_values,
			'required' => $required,
			'admin_only' => $admin_only,
			'sequence' => $sequence,
			'wp_user' => $espresso_wp_user
	);

	$sql_data = array('%s', '%s', '%s', '%s', '%s', '%d', '%d');
	if ($wpdb->insert(EVENTS_QUESTION_TABLE, $sql, $sql_data)) {
		$notices['updates'][] = __('The question ', 'event_espresso') . $question . __(' has been added', 'event_espresso');
	} else {
		$notices['errors'][] = __('The question', 'event_espresso') . $question . __(' was not saved!', 'event_espresso');
	}
}

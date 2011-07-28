<?php
//Function to update questions in the database
function event_espresso_form_builder_update(){
	global $wpdb;
	$question_text = $_POST['question'];
	$question_id = $_POST['question_id'];	
	$question_type = $_POST['question_type'];
	$sequence = $_POST['sequence'];
	$values = $_POST['values'];
	$required = $_POST['required'];
	$required_text = $_POST['required_text'];
	$admin_only = $_POST['admin_only'];
		
	$wpdb->query("UPDATE " . EVENTS_QUESTION_TABLE . " SET question_type = '" . $question_type . "', question = '" . $question_text . "', response = '" . $values . "', required = '" . $required . "',admin_only = '" . $admin_only . "', required_text = '" . $required_text . "', sequence = '" . $sequence . "' WHERE id = '" . $question_id . "'");
}
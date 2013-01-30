<?php

/* This page adds/edits the individual questions */

//Function to add a question to the database
function event_espresso_form_builder_insert() {
	global $wpdb, $espresso_wp_user;
	//$wpdb->show_errors();

	if (check_admin_referer('espresso_form_check', 'add_new_question')) {
		$question = sanitize_text_field( $_POST['question'] );
		$question_type = sanitize_text_field( $_POST['question_type'] );
		$question_values = sanitize_text_field( $_POST['values'] );
		$required = ! empty($_POST['required']) ? absint( $_POST['required'] ) : FALSE;
		$admin_only = !empty($_POST['admin_only']) ? absint( $_POST['admin_only'] ) : FALSE;
		$sequence = $_POST['sequence'] ? absint( $_POST['sequence'] ) : 0;
	}

	$data = array(
			'question_type' => $question_type,
			'question' => $question,
			'response' => $question_values,
			'required' => $required,
			'admin_only' => $admin_only,
			'sequence' => $sequence,
			'wp_user' => $espresso_wp_user
	);
	$format = array('%s', '%s', '%s', '%s', '%s', '%d', '%d');
	
	if ($wpdb->insert(EVENTS_QUESTION_TABLE, $data, $format)) {
		$msg = sprintf( __( 'The question %s has been added.', 'event_espresso' ), $question );
		EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
	} else {
		$msg = sprintf( __( 'The question %s was not saved!', 'event_espresso' ), $question );
		EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
	}
}

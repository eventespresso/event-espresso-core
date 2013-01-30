<?php
//Function to update questions in the database
function event_espresso_form_builder_update(){
	global $wpdb;
	
	if( check_admin_referer('espresso_form_check', 'edit_question') ) {
		$question_text 	= sanitize_text_filed( $_POST['question'] );
		$question_id 		= absint( $_POST['question_id'] );	
		$question_type 	= sanitize_text_filed( $_POST['question_type'] );
		$sequence 			= absint( $_POST['sequence'] );
		$values 				= sanitize_text_filed( $_POST['values'] );
		$required 			= absint( $_POST['required'] );
		$required_text 	= sanitize_text_filed( $_POST['required_text'] );
		$admin_only 		= absint( $_POST['admin_only'] );
	}
	
	$em_table_name = EVENTS_QUESTION_TABLE;
	$em_updata = array(
		'question_type' => $question_type,
		'question' => $question_text,
		'response' => $values,
		'required' => $required,
		'admin_only' => $admin_only,
		'required_text' => $required_text,
		'sequence' => $sequence
	);
	$em_where = array( 'id' => $question_id	);
	$em_upformat = array( '%s', '%s', '%s', '%d', '%d', '%s', '%d' );
	$em_where_format = array( '%d' );
	
	$row_results = $wpdb->update( $em_table_name, $em_updata, $em_where, $em_upformat, $em_where_format );
	
	if( $row_results ) {
		$msg = sprintf( __( 'The question %s has been updated.', 'event_espresso' ), htmlentities2($_REQUEST['question'] ));
		EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
	} else {
		$msg = sprintf( __( 'The question %s was not updated.', 'event_espresso' ), htmlentities2($_REQUEST['question'] ));
		EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );			
	}
}
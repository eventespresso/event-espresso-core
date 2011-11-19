<?php
function espresso_system_check() {
	return true;
}

if ( !function_exists( 'event_espresso_custom_questions_output' ) ){
	function event_espresso_custom_questions_output( $atts ) {
	global $wpdb;

	 extract( $atts );
//Get the questions for the attendee

		$sql = "SELECT ea.answer, eq.question FROM " . EVENTS_ANSWER_TABLE . " ea ";
		$sql .= " LEFT JOIN " . EVENTS_QUESTION_TABLE . " eq ON eq.id = ea.question_id ";
		$sql .= " WHERE ea.attendee_id = '" . $attendee_id . "' ";
		$all_questions == TRUE ? '':$sql .= " AND system_name IS NULL ";
		!empty($show_admin) && $show_admin == TRUE ? '':$sql .= " AND eq.admin_only = 'N' ";
		$sql .= " ORDER BY eq.sequence asc ";

		$questions = $wpdb->get_results( $sql );
		//echo $wpdb->last_query . '<br />';

		$email_questions = '';
		$q_counter = 0;
		$q_num_rows = $wpdb->num_rows;
		if ( $q_num_rows > 0 )
		{

			foreach ( $questions as $question ) {
				$email_questions .= $question->answer != '' ? wpautop( '<strong>' . $question->question . ':</strong><br /> ' . str_replace( ',', '<br />', $question->answer ) ) : '';
				$q_counter++;
				if ( $q_counter == $q_num_rows )
				   return $email_questions;
			}
		}
		return $email_questions;
	}

}
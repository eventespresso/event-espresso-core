<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

function attendee_edit_record() {
	global $wpdb, $org_options;
	if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
		espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
	}
	$id = $_REQUEST['id'];
	$registration_id = $_REQUEST['registration_id'];
	if (isset($_REQUEST['r_id']))
		$registration_id = $_REQUEST['r_id'];

	if (!empty($_REQUEST['delete_attendee']) && $_REQUEST['delete_attendee'] == 'true') {
		$sql = " DELETE FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id ='$id'";
		$wpdb->query($sql);
//Added by Imon
#$sql = " UPDATE " . EVENTS_ATTENDEE_TABLE . " SET quantity = IF(IS NULL quantity,NULL,quantity-1 WHERE registration_id ='$registration_id'";
		#$wpdb->query( $sql );
		$sql = " UPDATE " . EVENTS_ATTENDEE_TABLE . " SET quantity = IF(quantity IS NULL ,NULL,IF(quantity > 0,IF(quantity-1>0,quantity-1,1),0)) WHERE registration_id ='$registration_id'";
		$wpdb->query($sql);
		$sql = " UPDATE " . EVENTS_ATTENDEE_COST_TABLE . " SET quantity = IF(quantity IS NULL ,NULL,IF(quantity > 0,IF(quantity-1>0,quantity-1,1),0)) WHERE attendee_id ='$id'";
		$wpdb->query($sql);
		event_espresso_cleanup_multi_event_registration_id_group_data();
		event_espresso_cleanup_attendee_cost_data();
		return events_payment_page($_REQUEST['primary'], $_REQUEST['p_id']);
	}
	$counter = 0;
	$additional_attendees = NULL;

	$results = $wpdb->get_results("SELECT  t1.*, t2.event_name, t2.question_groups, t2.event_meta FROM " . EVENTS_ATTENDEE_TABLE . " t1
				 JOIN " . EVENTS_DETAIL_TABLE . " t2
				 ON t1.event_id = t2.id
				 WHERE t1.id = '" . $id . "' AND t1.registration_id = '" . $registration_id . "'
				 ORDER BY t1.id");

	foreach ($results as $result) {
		if ($counter == 0) {
			$id = $result->id;
			$registration_id = $result->registration_id;
			$lname = $result->lname;
			$fname = $result->fname;
			$address = $result->address;
			$city = $result->city;
			$state = $result->state;
			$zip = $result->zip;
			$email = $result->email;
			$payment = $result->payment;
			$phone = $result->phone;
			$date = $result->date;
			$payment_status = $result->payment_status;
			$txn_type = $result->txn_type;
			$txn_id = $result->txn_id;
			$amount_pd = $result->amount_pd;
			$quantity = $result->quantity;
			$payment_date = $result->payment_date;
			$event_id = $result->event_id;
			$event_name = stripslashes_deep($result->event_name);
			$question_groups = unserialize($result->question_groups);
			$event_meta = unserialize($result->event_meta);
			$counter = 1;
		} else {
			$additional_attendees[$result->id] = array('full_name' => $result->fname . ' ' . $result->lname, 'email' => $result->email, 'phone' => $result->phone);
		}
	}

	$response_source = $_POST;
	$questions = $wpdb->get_row("SELECT question_groups, event_meta FROM " . EVENTS_DETAIL_TABLE . " WHERE id = " . $event_id . " ");
	$question_groups = unserialize($questions->question_groups);
	$event_meta = unserialize($questions->event_meta);

	if (isset($event_meta['add_attendee_question_groups']) && $event_meta['add_attendee_question_groups'] != NULL) {
		$question_groups = $event_meta['add_attendee_question_groups'];
	}

	$questions_in = '';

	foreach ($question_groups as $g_id)
		$questions_in .= $g_id . ',';

	$questions_in = substr($questions_in, 0, -1);
	$group_name = '';
	$counter = 0;

	//pull the list of questions that are relevant to this event
	$q_sql_1 = "SELECT q.*, q.id q_id, qg.group_name FROM " . EVENTS_QUESTION_TABLE . " q
						JOIN " . EVENTS_QST_GROUP_REL_TABLE . " qgr on q.id = qgr.question_id
						JOIN " . EVENTS_QST_GROUP_TABLE . " qg on qg.id = qgr.group_id
						WHERE qgr.group_id in (" . $questions_in . ")
						AND q.admin_only = 'N'
						ORDER BY qg.id, q.sequence ASC";
	$questions = $wpdb->get_results($q_sql_1);
	/* DEBUG */
//			echo "<pre>";
//			echo '<p>'.print_r($questions).'</p>';
//			echo '<p>'.$q_sql_1.'</p>';
	/* END DEBUG */

	$a_sql = "SELECT question_id, answer FROM " . EVENTS_ANSWER_TABLE . " ans WHERE ans.attendee_id = '" . $id . "' ";
	/* DEBUG */
//			echo '<p>'.$a_sql.'</p>';
	/* END DEBUG */

	$answers = $wpdb->get_results($a_sql);
	/* DEBUG */
//			echo "<pre>";
//			echo 'print_r($answers) = <br/>';
//			print_r($answers);
	/* END DEBUG */

	$answer_a = array();
	foreach ($answers as $answer) {
		/* DEBUG */
		//echo '<p>$answers[question_id] = '.$answer->question_id.'</p>';
		array_push($answer_a, $answer->question_id);
	}
	/*
	 * Update the attendee information
	 */
	if (!empty($_REQUEST['attendee_action']) && $_REQUEST['attendee_action'] == 'update_attendee') {
		if (!empty($_POST['fname']))
			$fname = $_POST['fname'];
		if (!empty($_POST['lname']))
			$lname = $_POST['lname'];
		if (!empty($_POST['address']))
			$address = $_POST['address'];
		if (!empty($_POST['city']))
			$city = $_POST['city'];
		if (!empty($_POST['state']))
			$state = $_POST['state'];
		if (!empty($_POST['zip']))
			$zip = $_POST['zip'];
		if (!empty($_POST['phone']))
			$phone = $_POST['phone'];
		if (!empty($_POST['email']))
			$email = $_POST['email'];
		$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET fname='$fname', lname='$lname', address='$address', city='$city', state='$state', zip='$zip', phone='$phone', email='$email' WHERE id ='$id'";
		$wpdb->query($sql);
		//echo $sql;


		/* DEBUG */
		//			echo "<pre>";
		//			echo 'print_r($answers) = <br />';
		//			print_r($answers);
		//			echo 'print_r($questions) = <br />';
		//			print_r($questions);
		//			echo 'print_r($answer_a) = <br/>';
		//			print_r($answer_a);
		//			exit();
		/* END DEBUG */

		if ($questions) {
			foreach ($questions as $question) {
				switch ($question->question_type) {
					case "TEXT" :
					case "TEXTAREA" :
					case "DROPDOWN" :
						//$post_val = $_POST [ $question->question_type . '_' . $question->question_id ];
						$post_val = ($question->system_name != '') ? $response_source[$question->system_name] : $response_source[$question->question_type . '_' . $question->q_id];
						if (in_array($question->q_id, $answer_a)) {
							$sql = "UPDATE " . EVENTS_ANSWER_TABLE . " SET answer='$post_val' WHERE attendee_id = '$id' AND question_id ='$question->q_id'";
						} else {
							$sql = "INSERT INTO " . EVENTS_ANSWER_TABLE . " (registration_id, answer,attendee_id,question_id) VALUES ('$registration_id','$post_val', $id,$question->q_id)";
						}
						$wpdb->query($sql);
						break;
					case "SINGLE" :
						//$post_val = $_POST [ $question->question_type . '_' . $question->question_id ];
						$post_val = ($question->system_name != '') ? $response_source[$question->system_name] : $response_source[$question->question_type . '_' . $question->q_id];
						if (in_array($question->q_id, $answer_a)) {
							$sql = "UPDATE " . EVENTS_ANSWER_TABLE . " SET answer='$post_val' WHERE attendee_id = '$id' AND question_id ='$question->q_id'";
						} else {
							$sql = "INSERT INTO " . EVENTS_ANSWER_TABLE . " (registration_id, answer,attendee_id,question_id) VALUES ('$registration_id','$post_val', $id,$question->q_id)";
						}
						$wpdb->query($sql);
						break;
					case "MULTIPLE" :
						$value_string = '';
						for ($i = 0; $i < count($response_source[$question->question_type . '_' . $question->id]); $i++) {
							$value_string .= trim($response_source[$question->question_type . '_' . $question->id][$i]) . ",";
						}
						if (in_array($question->q_id, $answer_a)) {
							$sql = "UPDATE " . EVENTS_ANSWER_TABLE . " SET answer='$value_string' WHERE attendee_id = '$id' AND question_id ='$question->q_id'";
						} else {
							$sql = "INSERT INTO " . EVENTS_ANSWER_TABLE . " (registration_id, answer,attendee_id,question_id) VALUES ('$registration_id','$value_string', $id, $question->q_id)";
						}

						$wpdb->query($sql);

						/* DEBUG */
						//This was a nightmare ot debug!! The questions were not saving and I suck at programming!!!
						//echo '<p>'.$sql.'</p>';
						//$sql = "UPDATE " . EVENTS_ANSWER_TABLE . " SET answer='$value_string' WHERE attendee_id = '$id' AND question_id ='$question->question_id'";
						//echo '<p>$question->q_id = '.$question->q_id.'</p>';

						/* echo '<p> in_array($question->q_id, $answers) = ';
						  echo in_array($question->q_id, $answers) ? 'true':'false';
						  echo '</p>'; */

						//echo '<p>'.print_r($answers).'</p>';
						//echo '<p>$answers[question_id]'.$answers['question_id'].'</p>';
						//print_r($answer_a);
						//print_r($answers);
						/* if (!array_key_exists($question->id , $answers)) {
						  echo 'test = '.$question->id.'<br />';
						  } */
						/* END DEBUG */

						break;
				}
			}
		}

		//If this is not an attendee returing to edit thier details, then we need to return to the payment page
		if (!isset($_REQUEST['single']))
			return events_payment_page($_REQUEST['primary'], $_REQUEST['p_id']);
	}
	?>
	<div class="event-display-boxes">
		<h3 class="section-heading"><?php
		if ($_REQUEST['registration_id'] = 'true') {
			echo __('Edit Your', 'event_espresso') . ' ';
		}_e('Registration', 'event_espresso');
	?></h3>
		<p><strong><?php _e('Event:', 'event_espresso'); ?> <?php echo $event_name; ?></strong></p>
		<form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>" class="espresso_form">
			<?php
			if (count($question_groups) > 0) {
				$questions_in = '';

				foreach ($question_groups as $g_id)
					$questions_in .= $g_id . ',';

				$questions_in = substr($questions_in, 0, -1);
				$group_name = '';
				$counter = 0;
				$FILTER = '';
				if (isset($event_meta['additional_attendee_reg_info']) && $event_meta['additional_attendee_reg_info'] == '2' && isset($_REQUEST['attendee_num']) && $_REQUEST['attendee_num'] > 1) {
					$FILTER .= " AND qg.system_group = 1 ";
				}

				//pull the list of questions that are relevant to this event
				$q_sql_2 = "SELECT q.*, q.id q_id, at.*, qg.group_name, qg.show_group_description, qg.show_group_name FROM " . EVENTS_QUESTION_TABLE . " q
					LEFT JOIN " . EVENTS_ANSWER_TABLE . " at on q.id = at.question_id
					JOIN " . EVENTS_QST_GROUP_REL_TABLE . " qgr on q.id = qgr.question_id
					JOIN " . EVENTS_QST_GROUP_TABLE . " qg on qg.id = qgr.group_id
					WHERE qgr.group_id in (" . $questions_in . ")
					AND (at.attendee_id IS NULL OR at.attendee_id = '" . $id . "')
					AND q.admin_only = 'N'
					" . $FILTER . "
					ORDER BY qg.id, q.id ASC";

				/* DEBUG */
				//echo $q_sql_2;
				/* END DEBUG */

				$questions = $wpdb->get_results($q_sql_2);
				$num_rows = $wpdb->num_rows;

				if ($num_rows > 0) {

					$q_ids = '';
					foreach ($questions as $question_ids) {
						$q_ids .= $question_ids->question_id . ',';
					}

					/* DEBUG */
					//echo rtrim($q_ids, ",");
					/* END DEBUG */

					$existing_questions = rtrim($q_ids, ",");

					$q_sql_3 = "SELECT q.* FROM " . EVENTS_QUESTION_TABLE . " q  JOIN " . EVENTS_QST_GROUP_REL_TABLE . " qgr ON q.id = qgr.question_id JOIN " . EVENTS_QST_GROUP_TABLE . " qg ON qg.id = qgr.group_id WHERE qgr.group_id IN (" . $questions_in . ") AND q.id NOT IN (" . $existing_questions . ") GROUP BY q.question ORDER BY qg.id, q.id ASC";

					/* DEBUG */
					//echo $q_sql_3;
					/* END DEBUG */

					$questions_2 = $wpdb->get_results($q_sql_3);
					$num_rows_2 = $wpdb->num_rows;

					//Merge the existing questions with any missing questions
					if ($num_rows_2 > 0) {
						$questions = array_merge($questions, $questions_2);
					}

					//Output the questions
					$question_displayed = array();
					foreach ($questions as $question) {
						if (!in_array($question->id, $question_displayed)) {
							$question_displayed[] = $question->id;
							//if new group, close fieldset
							echo ($group_name != '' && $group_name != $question->group_name) ? '</fieldset>' : '';

							/* DEBUG */
							//echo '<p>'.print_r($question).'</p>';
							/* END DEBUG */

							echo ($group_name != '' && $group_name != $question->group_name) ? '</div>' : '';

							if ($group_name != $question->group_name) {
								$group_id = (!empty($question->group_identifier)) ? 'id="' . $question->group_identifier . '"' : '';
								if (empty($question->group_description))
									$question->group_description = '';
								echo '<div class="event_questions" ' . $group_id . '>';
								echo $question->show_group_name != 0 ? '<h4 class="section-title">' . $question->group_name . '</h4>' : '';
								echo $question->show_group_description != 0 ? '<p>' . $question->group_description . '</p>' : '';
								$group_name = $question->group_name;
							}

							echo '<p>';
							event_form_build_edit($question, ($question->system_name != '') ? ${$question->system_name} : $question->answer);
							echo "</p>";

							$counter++;
							echo $counter == $num_rows ? '</div>' : '';
						}
					}
				}//end questions display
			}
			?>
			<input type="hidden" name="id" value="<?php echo $id ?>" />
			<input type="hidden" name="event_id" value="<?php echo $event_id ?>" />
			<input type="hidden" name="form_action" value="edit_attendee" />
			<input type="hidden" name="attendee_action" value="update_attendee" />
			<input type="hidden" name="regevent_action" value="register" />
			<input type="hidden" name="primary" value="<?php echo $_REQUEST['primary'] ?>" />
			<p class="espresso_confirm_registration"><input class="btn_event_form_submit" type="submit" name="submit" value="<?php _e('Update Record', 'event_espresso'); ?>" /></p>
		</form>
	</div><!-- / .event-display-boxes -->
	<?php
}
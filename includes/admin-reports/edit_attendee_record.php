<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed'); 
function edit_attendee_record() {
    global $wpdb, $org_options;
	//$wpdb->show_errors();
	$attendee_num = 1;
    if ($_REQUEST['form_action'] == 'edit_attendee') {
        
        $id = isset($_REQUEST['id']) ? $_REQUEST['id']:'';

        $registration_id = isset($_REQUEST['registration_id']) ? $_REQUEST['registration_id']:'';
		
		$multi_reg = false;
		$check = $wpdb->get_row("select * from ".EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE." where registration_id = '$registration_id' ");
		if ( $check !== NULL ){
			$registration_id = $check->primary_registration_id;
			$registration_ids = $wpdb->get_results("select distinct primary_registration_id, registration_id from ".EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE." where primary_registration_id = '$registration_id' ", ARRAY_A);
			$multi_reg = true;
		}

        /*
         * find the primary attendee so we know which form to present
         * since the additional attendees will have a different form
         */
		
		//Update the payment amount for the attendee
		if (!empty($_REQUEST['attendee_payment']) && $_REQUEST['attendee_payment'] == 'update_payment') {
			$attendee_cost_data = array("attendee_id"=>$ext_attendee_id,"quantity"=>$attendee_quantity,"cost"=>$attendee_cost);
			$wpdb->insert(EVENTS_ATTENDEE_COST_TABLE,$attendee_cost_data);
			$c_sql = "UPDATE " . EVENTS_ATTENDEE_COST_TABLE . " SET cost = '".$_REQUEST['amount_pd']."', quantity = '".$_REQUEST['quantity']."' WHERE attendee_id = '".$_REQUEST['id']."' ";
			$wpdb->query( $c_sql );
			/*
             * Calculate total cost from attendee cost table
             */
            $event_cost = 0;
            if ( $multi_reg)
            {
                foreach($registration_ids as $reg_ids )
                {
                    $event_cost += $wpdb->get_var($wpdb->prepare("select ea.registration_id, sum(eac.cost * eac.quantity) from ".EVENTS_ATTENDEE_COST_TABLE." eac inner join ".EVENTS_ATTENDEE_TABLE." ea on eac.attendee_id = ea.id where ea.registration_id = '%s' group by ea.registration_id ",$reg_ids['registration_id']),1,0);                    
                }
            }
            else
            {
                $event_cost = $wpdb->get_var($wpdb->prepare("select ea.registration_id, sum(eac.cost * eac.quantity) from ".EVENTS_ATTENDEE_COST_TABLE." eac inner join ".EVENTS_ATTENDEE_TABLE." ea on eac.attendee_id = ea.id where ea.registration_id = '%s' group by ea.registration_id ",$registration_id),1,0);
            }
            #$a_sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET amount_pd = '".$_REQUEST['amount_pd']."', quantity = '".$_REQUEST['quantity']."' WHERE id = '".$_REQUEST['id']."' ";
            $a_sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET quantity = '%d' WHERE id = '%d' " ;
			$wpdb->query( $wpdb->prepare($a_sql,$_REQUEST['quantity'],$_REQUEST['id']) );
			/*
             * Get primary attendee id to update the amount_pd
             */
            $primary_attendee_id = $wpdb->get_var($wpdb->prepare("select id from ".EVENTS_ATTENDEE_TABLE." where registration_id = '%s' order by id limit 1 ",$registration_id));
            $a_sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET amount_pd = '%f' WHERE id = '%d' " ;
			$wpdb->query( $wpdb->prepare($a_sql,$event_cost,$primary_attendee_id) );
		}


        $r = $wpdb->get_row("SELECT id from " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id ='$registration_id' ORDER BY id ");

        $primary_attendee = !empty($r->id) ? $r->id:$id;

        $is_additional_attendee = ($primary_attendee != $id) ? true : false;

        if (!empty($_REQUEST['attendee_action']) && $_REQUEST['attendee_action'] == 'delete_attendee') {

            $sql = " DELETE FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id ='$id'";
            $wpdb->query($sql);
			
			/**
			 * Added for seating chart addon
			 * */
			if ( defined('ESPRESSO_SEATING_CHART') )
			{
				$wpdb->query("DELETE FROM ".EVENTS_SEATING_CHART_EVENT_SEAT_TABLE." where attendee_id = $id");
			}
			/**
			 * End
			 * */
            $sql = " UPDATE " . EVENTS_ATTENDEE_TABLE . " SET quantity = IF(quantity IS NULL ,NULL,IF(quantity > 0,IF(quantity-1>0,quantity-1,1),0)) WHERE registration_id ='$registration_id'";
            $wpdb->query($sql);
            /**
             * Added by Imon
             * */
			$sql = " UPDATE " . EVENTS_ATTENDEE_COST_TABLE . " SET quantity = IF(quantity IS NULL ,NULL,IF(quantity > 0,IF(quantity-1>0,quantity-1,1),0)) WHERE attendee_id ='$id'";
            $wpdb->query($sql);
			event_espresso_cleanup_multi_event_registration_id_group_data();
			event_espresso_cleanup_attendee_cost_data();
            
        }else if (!empty($_REQUEST['attendee_action']) && $_REQUEST['attendee_action'] == 'update_attendee') {
		/*
         * Update the attendee information
         */
		 	$update_time = false;
			if (isset($_POST['start_time_id'])){
				$times_sql = "SELECT ese.start_time, ese.end_time ";
				$times_sql .= "FROM " . EVENTS_START_END_TABLE . " ese ";
				$times_sql .= " WHERE ";
				$times_sql .= "ese.id='" . $_POST['start_time_id'] . "' ";
				//echo $times_sql;
				$times = $wpdb->get_results($times_sql);
				if ($wpdb->num_rows > 0) {
					foreach ($times as $time) {
						$start_time = $time->start_time;
						$end_time = $time->end_time;
					}
					$update_time = true;
				}
			}
            $fname = isset($_POST['fname']) ? $_POST['fname']:'';
            $lname = isset($_POST['lname']) ? $_POST['lname']:'';
            $address = isset($_POST['address']) ? $_POST['address']:'';
            $address2 = isset($_POST['address2']) ? $_POST['address2']:'';
            $city = isset($_POST['city']) ? $_POST['city']:'';
            $state = isset($_POST['state']) ? $_POST['state']:'';
            $zip = isset($_POST['zip']) ? $_POST['zip']:'';
            $phone = isset($_POST['phone']) ? $_POST['phone']:'';
            $email = isset($_POST['email']) ? $_POST['email']:'';
            $event_id = isset($_POST['event_id']) ? $_POST['event_id']:'';
            $txn_type = isset($_POST['txn_type']) ? $_POST['txn_type']:'';

            $sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET fname='$fname', lname='$lname', address='$address',address2='$address2', city='$city', state='$state', zip='$zip', phone='$phone', email='$email', txn_type='$txn_type' ";
			if ($update_time == true)
				$sql .= ", event_time='$start_time', end_time='$end_time' ";
			$sql .= " WHERE id ='$id' ";
			//echo $sql;
            $wpdb->query($sql);

            //print_r($_POST);
            // Insert Additional Questions From Post Here
            $reg_id = $id;

            $response_source = $_POST;
			//echo '<p>'.print_r($response_source).'</p>';

           /* $questions = $wpdb->get_results( "SELECT t2.*, t1.* FROM " . EVENTS_ANSWER_TABLE . " t1
                        JOIN " . EVENTS_QUESTION_TABLE . " t2
                            ON t1.question_id=t2.id
                            WHERE attendee_id = '" . $id . "' " );*/
			
			$questions = $wpdb->get_row("SELECT question_groups, event_meta FROM " . EVENTS_DETAIL_TABLE . " WHERE id = " . $event_id . " ");

            $question_groups = unserialize($questions->question_groups);
            $event_meta = unserialize($questions->event_meta);

            if ($is_additional_attendee && isset($event_meta['add_attendee_question_groups']) && $event_meta['add_attendee_question_groups']!=NULL) {

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
						WHERE qgr.group_id in (" . $questions_in. ") 
						ORDER BY qg.id, q.sequence ASC";
            $questions = $wpdb->get_results($q_sql_1);
			/* DEBUG */
			//echo '<p>'.print_r($questions).'</p>';
			//echo '<p>'.$q_sql_1.'</p>';
			/* END DEBUG */
			
			$a_sql ="SELECT id, question_id, answer FROM " . EVENTS_ANSWER_TABLE . " at WHERE at.attendee_id = '" . $id . "' ";
			/* DEBUG */	
			//echo '<p>'.$a_sql.'</p>';
           /* END DEBUG */
		   
		    $answers = $wpdb->get_results($a_sql, OBJECT_K);
			
			foreach ( $answers as $answer ) {
				/* DEBUG */	
				//echo '<p>$answers[question_id] = '.$answer->question_id.'</p>';
				$answer_a[]=$answer->question_id;
			}
			
			/* DEBUG */	
			//echo '<p> print_r($answers) = <br />'.var_dump($answers).'</p>';
			//echo '<p> print_r($questions) = <br />'.print_r($questions).'</p>';
            /* END DEBUG */
			
			if ( $questions ){
                foreach ( $questions as $question ) {
                    switch ( $question->question_type ){
                       case "TEXT" :
                        case "TEXTAREA" :
                        case "DROPDOWN" :
                            //$post_val = $_POST [ $question->question_type . '_' . $question->question_id ];
							$post_val = ($question->system_name != '')?$response_source[$question->system_name]:$response_source[$question->question_type . '_' . $question->q_id];
							if (in_array($question->q_id, $answer_a)) {
                            	$sql = "UPDATE " . EVENTS_ANSWER_TABLE . " SET answer='$post_val' WHERE attendee_id = '$id' AND question_id ='$question->q_id'";
							}else{
								$sql = "INSERT INTO " . EVENTS_ANSWER_TABLE . " (registration_id, answer,attendee_id,question_id) VALUES ('$registration_id','$post_val', $id,$question->q_id)";
							}
                            $wpdb->query( $sql );
                            break;
                        case "SINGLE" :
                           	//$post_val = $_POST [ $question->question_type . '_' . $question->question_id ];
						    $post_val = ($question->system_name != '')?$response_source[$question->system_name]:$response_source[$question->question_type . '_' . $question->q_id];
							if (in_array($question->q_id, $answer_a)) {
                            	$sql = "UPDATE " . EVENTS_ANSWER_TABLE . " SET answer='$post_val' WHERE attendee_id = '$id' AND question_id ='$question->q_id'";
							}else{
								$sql = "INSERT INTO " . EVENTS_ANSWER_TABLE . " (registration_id, answer,attendee_id,question_id) VALUES ('$registration_id','$post_val', $id,$question->q_id)";
							}
                            $wpdb->query( $sql );
                            break;
                        case "MULTIPLE" :
							$value_string = '';
							for ($i=0; $i<count($response_source[$question->question_type.'_'.$question->id]); $i++){
								$value_string .= trim($response_source[$question->question_type.'_'.$question->id][$i]).",";
							}
							if (in_array($question->q_id, $answer_a)) {
                                $sql = "UPDATE " . EVENTS_ANSWER_TABLE . " SET answer='$value_string' WHERE attendee_id = '$id' AND question_id ='$question->q_id'";
                            } else {
                                $sql = "INSERT INTO " . EVENTS_ANSWER_TABLE . " (registration_id, answer,attendee_id,question_id) VALUES ('$registration_id','$value_string', $id, $question->q_id)";
                            }
							
                            $wpdb->query( $sql );
							
							/* DEBUG */
							//This was a nightmare ot debug!! The questions were not saving and I suck at programming!!!
							
							//echo '<p>'.$sql.'</p>';	
                            
							//$sql = "UPDATE " . EVENTS_ANSWER_TABLE . " SET answer='$value_string' WHERE attendee_id = '$id' AND question_id ='$question->question_id'";
							//echo '<p>$question->q_id = '.$question->q_id.'</p>';
							
							/*echo '<p> in_array($question->q_id, $answers) = ';
							echo in_array($question->q_id, $answers) ? 'true':'false';
							echo '</p>';*/
							
							//echo '<p>'.print_r($answers).'</p>';
							//echo '<p>$answers[question_id]'.$answers['question_id'].'</p>';
							
							//print_r($answer_a);
							
							//print_r($answers);
							/*if (!array_key_exists($question->id , $answers)) {
								echo 'test = '.$question->id.'<br />';
							}*/
                           /* END DEBUG */
						   
						   break;
                    }
                }
            }
			
			
			/* OLD VERSION OF SAVING QUESTIONS */
			/* August 18, 2011 SETH: Removing this code because it is not saving the  questions on save. Created new code above */
						
			/*$questions = $wpdb->get_row("SELECT question_groups, event_meta FROM " . EVENTS_DETAIL_TABLE . " WHERE id = " . $event_id . " ");

            $question_groups = unserialize($questions->question_groups);
            $event_meta = unserialize($questions->event_meta);

            if ($is_additional_attendee && isset($event_meta['add_attendee_question_groups']) && $event_meta['add_attendee_question_groups']!=NULL) {

                $question_groups = $event_meta['add_attendee_question_groups'];
            }

            $questions_in = '';

            foreach ($question_groups as $g_id)
                $questions_in .= $g_id . ',';

            $questions_in = substr($questions_in, 0, -1);
            $group_name = '';
            $counter = 0;

            //pull the list of questions that are relevant to this event
			$q_sql_1 = "SELECT q.*, qg.group_name FROM " . EVENTS_QUESTION_TABLE . " q
						JOIN " . EVENTS_QST_GROUP_REL_TABLE . " qgr on q.id = qgr.question_id
						JOIN " . EVENTS_QST_GROUP_TABLE . " qg on qg.id = qgr.group_id
						WHERE qgr.group_id in (" . $questions_in. ") 
						ORDER BY qg.id, q.sequence ASC";
            $questions = $wpdb->get_results($q_sql_1);


            if ($questions) {


                $answers = $wpdb->get_results("SELECT question_id, answer FROM " . EVENTS_ANSWER_TABLE . " at WHERE at.attendee_id = '" . $id . "' ", OBJECT_K);

                foreach ($questions as $question) {
                    $sql = '';
                    switch ($question->question_type) {
                        case "TEXT" :
                        case "TEXTAREA" :
                        case "DROPDOWN" :
                            //$post_val = $_POST [ $question->question_type . '_' . $question->question_id ];
                            $post_val = ( $question->system_name != '') ? $response_source[$question->system_name] : $response_source[$question->question_type . '_' . $question->id];
                            //echo '<p> SOMETHING HERE ' . $post_val . '</p>';

                            if (array_key_exists($question->id, $answers)) {
                                $sql = "UPDATE " . EVENTS_ANSWER_TABLE . " SET answer='$post_val' WHERE attendee_id = '$id' AND question_id ='$question->id'";
                            } else {

                                $sql = "INSERT INTO " . EVENTS_ANSWER_TABLE . " (registration_id, answer,attendee_id,question_id) VALUES ('$registration_id','$post_val', $id,$question->id)";
                            }

                            break;
                        case "SINGLE" :
                            //$post_val = $_POST [ $question->question_type . '_' . $question->question_id ];
                            $post_val = ($question->system_name != '') ? $response_source[$question->system_name] : $response_source[$question->question_type . '_' . $question->id];
                            if (array_key_exists($question->id, $answers)) {
                                $sql = "UPDATE " . EVENTS_ANSWER_TABLE . " SET answer='$post_val' WHERE attendee_id = '$id' AND question_id ='$question->id'";
                            } else {

                                $sql = "INSERT INTO " . EVENTS_ANSWER_TABLE . " (registration_id, answer,attendee_id,question_id) VALUES ('$registration_id','$post_val', $id,$question->id)";
                            }
                            break;
                        case "MULTIPLE" :
                            $value_string = '';
							if($question->question_type . '_' . $question->id !=''){
								break;
							}
								
                            for ($i = 0; $i < count($response_source[$question->question_type . '_' . $question->id]); $i++) {

                                $value_string .= trim($response_source[$question->question_type . '_' . $question->id][$i]) . ",";
                            }

                            if (array_key_exists($question->id, $answers)) {
                                $sql = "UPDATE " . EVENTS_ANSWER_TABLE . " SET answer='$value_string' WHERE attendee_id = '$id' AND question_id ='$question->id'";
                            } else {

                                $sql = "INSERT INTO " . EVENTS_ANSWER_TABLE . " (registration_id, answer,attendee_id,question_id) VALUES ('$registration_id','$value_string', $id,$question->id)";
                            }

                            break;
                    }

                    if ($sql != '')
                        $wpdb->query($sql);
                }
            }*/
			
			/* END OLD VERSION OF SAVING QUESTIONS */
        }
		
        $counter = 0;
        $additional_attendees = NULL;

        $WHERE = (isset($_REQUEST['registration_id'])) ? "registration_id ='" . $_REQUEST['registration_id'] . "'" : "id = " . $_REQUEST['id'];
		
		if (isset($_REQUEST['attendee_num']) && $_REQUEST['attendee_num'] > 1 && isset($_REQUEST['registration_id']) && isset($_REQUEST['id'])){
			$WHERE = " t1.registration_id ='" . $_REQUEST['registration_id'] . "' AND t1.id = " . $_REQUEST['id'];
		}

        $results = $wpdb->get_results("SELECT t1.*, t2.event_name, t2.question_groups, t2.event_meta FROM " . EVENTS_ATTENDEE_TABLE . " t1
                 JOIN " . EVENTS_DETAIL_TABLE . " t2
                 ON t1.event_id = t2.id
                 WHERE $WHERE
                 ORDER BY t1.id");

        foreach ($results as $result) {
            if ($counter == 0) {
                $id = $result->id;
                $registration_id = $result->registration_id;
                $lname = $result->lname;
                $fname = $result->fname;
                $address = $result->address;
                $address2 = $result->address2;
                $city = $result->city;
                $state = $result->state;
                $zip = $result->zip;
                $email = $result->email;
                $hear = isset($result->hear) ? $result->hear : '';
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
                $event_name = $result->event_name;
                $question_groups = unserialize($result->question_groups);
                $question_groups = unserialize($result->question_groups);
                $event_meta = unserialize($result->event_meta);
				$coupon_code = $result->coupon_code;
				$quantity = $result->quantity;
                $is_additional_attendee = ($primary_attendee != $id) ? true : false;
				
				$start_date = $result->start_date;
				$event_time = $result->event_time;
		
				$event_date = event_date_display($start_date .' '.$event_time, get_option('date_format') . ' g:i a');

                if ($is_additional_attendee && isset($event_meta['add_attendee_question_groups']) && $event_meta['add_attendee_question_groups']!=NULL) {
                    $question_groups = $event_meta['add_attendee_question_groups'];
                }

                $counter = 1;
            } else {
                $additional_attendees[$result->id] = array('full_name' => $result->fname . ' ' . $result->lname, 'email' => $result->email, 'phone' => $result->phone);
            }
        }

        if (!empty($_REQUEST['status']) && $_REQUEST['status'] == 'saved') {
?>

<div id="message" class="updated fade">
  <p><strong>
    <?php _e('Attendee details saved for ' . $fname . ' ' . $lname . '.', 'event_espresso'); ?>
    </strong></p>
</div>
<?php
		}
?>
<div class="metabox-holder">
  <div class="postbox">
    <h3>
      <?php _e('Registration Id <a href="admin.php?page=events&event_admin_reports=edit_attendee_record&event_id=' . $event_id . '&registration_id=' . $registration_id . '&form_action=edit_attendee">#' . $registration_id . '</a> | ID #' . $id . ' | Name: ' . $fname . ' ' . $lname . ' | Registered For:', 'event_espresso'); ?>
      <a href="admin.php?page=events&event_admin_reports=list_attendee_payments&event_id=<?php echo $event_id ?>"><?php echo stripslashes_deep($event_name) ?></a> - <?php echo $event_date; ?></h3>
    <div class="inside">
      <table width="100%">
        <tr>
          <td width="50%"><form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>" class="espresso_form">
              <h4>
                <?php _e('Registration Information', 'event_espresso'); ?>
                <?php echo $is_additional_attendee == false ? '[ <span class="green_text">'.__('Primary Attendee Record', 'event_espresso').'</span> ]': '[ <a href="admin.php?page=events&event_admin_reports=edit_attendee_record&event_id=' . $event_id . '&registration_id=' . $registration_id . '&form_action=edit_attendee">View/Edit Primary Attendee</a> ]'; ?> </h4>
              <fieldset>
                <ul>
                  <li>
            <?php
			$time_id =0;
			$sql = "SELECT id FROM " . EVENTS_START_END_TABLE . " WHERE event_id='" . $event_id . "' AND start_time = '".$event_time."' ";
			//echo $sql;
			$event_times = $wpdb->get_results($sql);
			if ($wpdb->num_rows > 0) {
				$time_id = $wpdb->last_result[0]->id;
			}
			//echo $time_id;
			echo event_espresso_time_dropdown($event_id, $label = 1, $multi_reg = 0, $time_id);	
?>
                  </li>
                  <li>
                    <?php
        if (count($question_groups) > 0) 
        {
            $questions_in = '';

            foreach ($question_groups as $g_id)
            {
                $questions_in .= $g_id . ',';
            }

            $questions_in = substr($questions_in, 0, -1);
            $group_name = '';
            $counter = 0;
			$FILTER ='';
			if (isset($event_meta['additional_attendee_reg_info']) && $event_meta['additional_attendee_reg_info'] == '2' && isset($_REQUEST['attendee_num']) && $_REQUEST['attendee_num'] > 1)
            {
                $FILTER .= " AND qg.system_group = 1 ";
			}

			//pull the list of questions that are relevant to this event
			$q_sql_2 = "SELECT q.*, q.id q_id, at.*, qg.group_name, qg.show_group_description, qg.show_group_name FROM " . EVENTS_QUESTION_TABLE . " q
					LEFT JOIN " .  EVENTS_ANSWER_TABLE . " at on q.id = at.question_id
					JOIN " .  EVENTS_QST_GROUP_REL_TABLE . " qgr on q.id = qgr.question_id
					JOIN " . EVENTS_QST_GROUP_TABLE . " qg on qg.id = qgr.group_id
					WHERE qgr.group_id in (" .$questions_in. ") 
					AND (at.attendee_id IS NULL OR at.attendee_id = '" . $id . "') 
					".$FILTER." 
					ORDER BY qg.id, q.id ASC";
			
			/* DEBUG */
			//echo $q_sql_2;		
			/* END DEBUG */
			
            $questions = $wpdb->get_results($q_sql_2);
            $num_rows = $wpdb->num_rows;
           
            if ($num_rows > 0) {
				
				$q_ids = '';
				foreach ($questions as $question_ids) {
					$q_ids .= $question_ids->question_id.',';
				}
				
				/* DEBUG */
				//echo rtrim($q_ids, ",");
				/* END DEBUG */
				
				$existing_questions = rtrim($q_ids, ",");
				
				$q_sql_3 = "SELECT q.* FROM " . EVENTS_QUESTION_TABLE . " q  JOIN " .  EVENTS_QST_GROUP_REL_TABLE . " qgr ON q.id = qgr.question_id JOIN " . EVENTS_QST_GROUP_TABLE . " qg ON qg.id = qgr.group_id WHERE qgr.group_id IN (" .$questions_in. ") AND q.id NOT IN (".$existing_questions.") GROUP BY q.question ORDER BY qg.id, q.id ASC";
				
				/* DEBUG */
				//echo $q_sql_3;
				/* END DEBUG */
					
				$questions_2 = $wpdb->get_results($q_sql_3);
				$num_rows_2 = $wpdb->num_rows;
				
				//Merge the existing questions with any missing questions
				if ($num_rows_2 > 0) {
					$questions = array_merge($questions,$questions_2);
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
						
                        if ($group_name != $question->group_name) {
                            echo "<fieldset><legend>$question->group_name<legend>";
                            $group_name = $question->group_name;
                        }

                        echo '<p>';
                        echo event_form_build_edit($question, ($question->system_name != '') ? ${$question->system_name} : $question->answer, $show_admin_only = true);
                        echo "</p>";

                        $counter++;
                        echo $counter == $num_rows ? '</fieldset>' : '';
                    }
                }
            }//end questions display
        }
?>
                  </li>
                  <input type="hidden" name="id" value="<?php echo $id ?>" />
                  <input type="hidden" name="registration_id" value="<?php echo $registration_id ?>" />
                  <input type="hidden" name="event_id" value="<?php echo $event_id ?>" />
                  <input type="hidden" name="display_action" value="view_list" />
                  <input type="hidden" name="view_event" value="<?php echo $view_event ?>" />
                  <input type="hidden" name="form_action" value="edit_attendee" />
                  <input type="hidden" name="attendee_action" value="update_attendee" />
                  <li>
                    <input type="submit" name="Submit" value="<?php _e('Update Record', 'event_espresso'); ?>" />
                  </li>
                </ul>
              </fieldset>
            </form></td>
          <td  width="50%" valign="top"><?php if (count($additional_attendees) > 0){ ?>
            <h4>
              <?php _e('Additional Attendees', 'event_espresso'); ?>
            </h4>
            <ol>
              <?php	
                foreach ($additional_attendees as $att => $row)
                { 
                    $attendee_num++;
            ?>
              <li><a href="admin.php?page=events&amp;event_admin_reports=edit_attendee_record&amp;event_id=<?php echo $event_id; ?>&amp;id=<?php echo $att; ?>&amp;registration_id=<?php echo $registration_id; ?>&amp;form_action=edit_attendee&amp;attendee_num=<?php echo $attendee_num; ?>" title="<?php _e('Edit Attendee', 'event_espresso'); ?>"><strong><?php echo $row['full_name']; ?></strong> (<?php echo $row['email']; ?>)</a> | <a href="admin.php?page=events&amp;event_admin_reports=edit_attendee_record&amp;event_id=<?php echo $event_id; ?>&amp;registration_id=<?php echo $registration_id; ?>&amp;attendee_id=<?php echo $att; ?>&amp;form_action=edit_attendee&amp;attendee_action=delete_attendee&amp;id=<?php echo $id ?>" title="<?php _e('Delete Attendee', 'event_espresso'); ?>" onclick="return confirmDelete();">
                <?php _e('Delete', 'event_espresso'); ?>
                </a></li>
              <?php 	
                } 
            ?>
            </ol>
            <?php	} ?>
            <?php
        
        /**
         * Begin Attendee Payment Information 
         * */
        
        
        /**
         * IF seating chart add-on is available and the event has a seating chart. Then this ticket option can not be used.
         * */
        $has_seating_chart = false;
        if ( defined('ESPRESSO_SEATING_CHART') )
		{
			$has_seating_chart = seating_chart::check_event_has_seating_chart($event_id);
        }
        /**
         * If attendee was added in old system i.e. before version 3.1.10 and attendee_cost table got introduced then this option can not be used
         * */
        $ice_age = true; 
        $ice_row = $wpdb->get_row($wpdb->prepare("select * from ".EVENTS_ATTENDEE_COST_TABLE." where attendee_id = '%d'",$id));
        if ( $ice_row !== NULL )
        {
            $ice_age = false;
        }
        if ( !$has_seating_chart && !$ice_age)
        {
        ?>
            <h4>
              <?php _e('Payment Information', 'event_espresso'); ?>
            </h4>
            <form method="POST" action="<?php echo $_SERVER[ 'REQUEST_URI' ] ?>&status=saved" class="espresso_form">
              <fieldset>
                <ul>
                  <li>
                    <p><strong>
                      <?php _e( 'Payment Status:', 'event_espresso' ); ?>
                      </strong> <?php echo $payment_status; ?> <?php echo event_espresso_paid_status_icon($payment_status);?> [ <a href="admin.php?page=events&amp;attendee_pay=paynow&amp;form_action=payment&amp;registration_id=<?php echo $registration_id ?>&amp;event_admin_reports=enter_attendee_payments&amp;event_id=<?php echo $event_id ?>" title="<?php _e('Edit Payment', 'event_espresso'); ?>">
                      <?php _e('View/Edit Payment', 'event_espresso'); ?>
                      </a> ]</p>
                  </li>
                  <li>
                    <p><strong>
                      <?php _e( 'Transaction ID:', 'event_espresso' ); ?>
                      </strong> <?php echo !empty($txn_id) ? $txn_id :'N/A'; ?></p>
                  </li>
                  <li>
                    <p><strong>
                      <?php _e( 'Date Paid:', 'event_espresso' ); ?>
                      </strong> <?php echo !empty($payment_date) ? event_date_display($payment_date): 'N/A' ?></p>
                  </li>
                  <?php if ($multi_reg ==true){ ?>
                  <li>
                    <p><strong>
                      <?php _e('Multiple Event Total:', 'event_espresso'); ?>
                      </strong> <?php echo $org_options[ 'currency_symbol' ] ?><?php echo espresso_attendee_price(array('attendee_id'=>$id, 'session_total'=>true)); ?></p>
                  </li>
                  <?php }?>
                  <li>
                    <p><strong>
                      <?php _e('This Registration Total:', 'event_espresso'); ?>
                      </strong> <?php echo $org_options[ 'currency_symbol' ] ?><?php echo espresso_attendee_price(array('attendee_id'=>$id, 'reg_total'=>true)); ?></p>
                  </li>
                  <li> <div  <?php if (isset($_REQUEST['show_payment']) && $_REQUEST['show_payment'] =='true') echo ' class="yellow_inform"'; ?>><strong>
                    <?php _e( 'This Attendee:', 'event_espresso' ); ?>
                    </strong>
                    <table width="100%" border="0">
                      <tr>
                        <td width="25%" align="left" valign="top"><label>
                            <?php _e( 'Amount:', 'event_espresso' ); ?>
                          </label></td>
                        <td width="25%" align="left" valign="top"><label>
                            <?php _e( '# Tickets:', 'event_espresso' ); ?>
                          </label></td>
                        <td width="50%" align="left" valign="top"><label>
                            <?php _e( 'Total:', 'event_espresso' ); ?>
                          </label></td>
                      </tr>
                      <tr>
                        <td align="left" valign="top"><?php echo $org_options[ 'currency_symbol' ] ?>
                          <input name="amount_pd" type="text" value ="<?php echo espresso_attendee_price(array('attendee_id'=>$id, 'single_price'=>true)); ?>" /></td>
                        <td align="left" valign="top"> X
                          <input name="quantity" type="text" value ="<?php echo !empty($quantity) ? $quantity:1 ; ?>"  /></td>
                        <td align="left" valign="top"><?php echo $org_options[ 'currency_symbol' ] ?><?php echo espresso_attendee_price(array('attendee_id'=>$id)); ?></td>
                      </tr>
                    </table></div>
                  </li>
                  <li>
                    <input type="submit" name="Submit" value="Update Payment" />
                  </li>
                </ul>
              </fieldset>
              <input type="hidden" name="id" value="<?php echo $id ?>" />
              <input type="hidden" name="registration_id" value="<?php echo $registration_id ?>" />
              <input type="hidden" name="form_action" value="edit_attendee" />
              <input type="hidden" name="event_id" value="<?php echo $event_id ?>" />
              <input type="hidden" name="attendee_payment" value="update_payment" />
            </form>
            <?php
        } // !$has_seating_chart
        ?></td>
        </tr>
      </table>
      <p> <strong> <a href="admin.php?page=events&event_id=<?php echo $event_id; ?>&event_admin_reports=list_attendee_payments"> &lt;&lt;
        <?php _e('Back to List', 'event_espresso'); ?>
        </a> </strong> </p>
    </div>
  </div>
</div>
<?php
        //event_list_attendees();
	}
}


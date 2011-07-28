<?php
function attendee_edit_record() {
    global $wpdb, $org_options;
   

        if ( $_REQUEST[ 'delete_attendee' ] == 'true' )
        {
            $id = $_REQUEST[ 'id' ];
            $registration_id = $_REQUEST[ 'registration_id' ];
            $sql = " DELETE FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id ='$id'";
            $wpdb->query( $sql );
            $sql = " UPDATE " . EVENTS_ATTENDEE_TABLE . " SET quantity = IF(IS NULL quantity,NULL,quantity-1 WHERE registration_id ='$registration_id'";
            $wpdb->query( $sql );
			return events_payment_page($_REQUEST[ 'primary' ], $_REQUEST[ 'p_id' ]);
        }

        /*
         * Update the attendee information
         */
         if ( $_REQUEST[ 'attendee_action' ] == 'update_attendee' )
        {
            $id = $_REQUEST[ 'id' ];
			$registration_id = $_REQUEST[ 'registration_id' ];
            $fname = $_POST[ 'fname' ];
            $lname = $_POST[ 'lname' ];
            $address = $_POST[ 'address' ];
            $city = $_POST[ 'city' ];
            $state = $_POST[ 'state' ];
            $zip = $_POST[ 'zip' ];
            $phone = $_POST[ 'phone' ];
            $email = $_POST[ 'email' ];
            $event_id = $_POST[ 'event_id' ];

            $sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET fname='$fname', lname='$lname', address='$address', city='$city', state='$state', zip='$zip', phone='$phone', email='$email' WHERE id ='$id'";
            $wpdb->query( $sql );
			//echo $sql;
			
// Insert Extra From Post Here
            $reg_id = $id;

            $response_source = $_POST;

            $questions = $wpdb->get_results( "SELECT t2.*, t1.* FROM " . EVENTS_ANSWER_TABLE . " t1
                        JOIN " . EVENTS_QUESTION_TABLE . " t2
                            ON t1.question_id=t2.id
                            WHERE attendee_id = '" . $id . "' " );
            
            if ( $questions )
            {
                foreach ( $questions as $question ) {
                    switch ( $question->question_type )
                    {
                       case "TEXT" :
                        case "TEXTAREA" :
                        case "DROPDOWN" :
                            //$post_val = $_POST [ $question->question_type . '_' . $question->question_id ];
							$post_val = ($question->system_name != '')?$response_source[$question->system_name]:$response_source[$question->question_type . '_' . $question->id];
                            $sql = "UPDATE " . EVENTS_ANSWER_TABLE . " SET answer='$post_val' WHERE attendee_id = '$id' AND question_id ='$question->question_id'";
                            $wpdb->query( $sql );
                            break;
                        case "SINGLE" :
                           	//$post_val = $_POST [ $question->question_type . '_' . $question->question_id ];
						    $post_val = ($question->system_name != '')?$response_source[$question->system_name]:$response_source[$question->question_type . '_' . $question->id];
                            $sql = "UPDATE " . EVENTS_ANSWER_TABLE . " SET answer='$post_val' WHERE attendee_id = '$id' AND question_id ='$question->question_id'";
                            $wpdb->query( $sql );
                            break;
                        case "MULTIPLE" :
							$value_string = '';
										for ($i=0; $i<count($response_source[$question->question_type.'_'.$question->id]); $i++){
                                                                                    
											$value_string .= trim($response_source[$question->question_type.'_'.$question->id][$i]).",";
										}
										
                            $sql = "UPDATE " . EVENTS_ANSWER_TABLE . " SET answer='$value_string' WHERE attendee_id = '$id' AND question_id ='$question->question_id'";
                            $wpdb->query( $sql );
                            break;
                    }
                }
            }
			return events_payment_page($_REQUEST[ 'primary' ], $_REQUEST[ 'p_id' ]);
        }


        $counter = 0;
        $additional_attendees = NULL;

        $results = $wpdb->get_results( "SELECT  t1.*, t2.event_name, t2.question_groups FROM " . EVENTS_ATTENDEE_TABLE  . " t1
                 JOIN " . EVENTS_DETAIL_TABLE  . " t2
                 ON t1.event_id = t2.id
                 WHERE t1.id = " . $_REQUEST[ 'id' ] . "
                 ORDER BY t1.id" );

        foreach ( $results as $result ) {
            if ( $counter == 0 ){
           
           	$id = $result->id;
                $registration_id=$result->registration_id;
                $lname = $result->lname;
                $fname = $result->fname;
                $address = $result->address;
                $city = $result->city;
                $state = $result->state;
                $zip = $result->zip;
                $email = $result->email;
                $hear = $result->hear;
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

            $counter = 1;
            } else {
                $additional_attendees[$result->id] = array('full_name' => $result->fname . ' ' . $result->lname, 'email' => $result->email, 'phone' => $result->phone);
            }
        }
?>       
<h3><?php _e('Registration For:', 'event_espresso' ); ?> <?php echo $event_name ?></h3>
   
  
	<form method="post" action="<?php echo $_SERVER[ 'REQUEST_URI' ] ?>" class="espresso_form">
	<?php
	if (count($question_groups) > 0){
                                        $questions_in = '';

                                        foreach ($question_groups as $g_id) $questions_in .= $g_id . ',';

                                        $questions_in = substr($questions_in,0,-1);
                                        $group_name = '';
                                        $counter = 0;

                                        $questions = $wpdb->get_results("SELECT q.*,at.*, qg.group_name
                                                            FROM " . EVENTS_QUESTION_TABLE . " q
                                                            LEFT JOIN " .  EVENTS_ANSWER_TABLE . " at
                                                                on q.id = at.question_id
                                                            JOIN " .  EVENTS_QST_GROUP_REL_TABLE . " qgr
                                                                on q.id = qgr.question_id
                                                            JOIN " . EVENTS_QST_GROUP_TABLE . " qg
                                                                on qg.id = qgr.group_id
                                                                WHERE qgr.group_id in ( " .   $questions_in
                                                        . ") AND (at.attendee_id IS NULL OR at.attendee_id = '" . $id . "') AND q.admin_only = 'N' ORDER BY qg.id, q.id ASC");

                                         $num_rows = $wpdb->num_rows;

                                         if ($num_rows > 0 ){
										 		$question_displayed = array();
												foreach($questions as $question)
												{
													if ( !in_array($question->question_id,$question_displayed) ) {
														$question_displayed[] = $question->question_id;
														
                                                    //if new group, close fieldset
													echo ($group_name != '' &&  $group_name != $question->group_name) ?'</div>':'';

                                                    if ($group_name != $question->group_name){
                                                        echo '<div class="event_questions" id="' . $question->group_identifier . '">';
														echo $question->show_group_name != 0?"<h3 style='clear:both;'>$question->group_name</h3>":'';
														echo $question->show_group_description != 0?"<p>$question->group_description</p>":'';
                                                        $group_name = $question->group_name;

                                                    }

							echo '<p>';
							event_form_build_edit($question, ($question->system_name != '')?${$question->system_name}:$question->answer);
							echo "</p>";


                                                    $counter++;
                                                   echo $counter == $num_rows?'</div>':'';

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
    <input type="hidden" name="primary" value="<?php echo $_REQUEST[ 'primary' ] ?>" />
                <p class="espresso_confirm_registration"><input type="submit" name="submit" value="<?php _e( 'Update Record', 'event_espresso' ); ?>" /></p>

</form>
<?php
}
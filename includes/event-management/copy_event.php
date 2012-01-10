<?php
function copy_event($recurrence_arr = array()){
	global $wpdb, $espresso_wp_user;
	$event_id = array_key_exists('event_id', $recurrence_arr) ? $recurrence_arr['event_id'] : $_REQUEST ['event_id'];

	$results = $wpdb->get_results("SELECT * FROM ". EVENTS_DETAIL_TABLE ." WHERE id ='" . $event_id . "'");

	foreach ($results as $result){
		$event_id= $result->id;
		$display_reg_form=$result->display_reg_form;
		$event_name=$result->event_name;
		$event_desc=$result->event_desc;
		$display_desc=$result->display_desc;
		$event_identifier=$result->event_identifier.'-'.time();
		$reg_limit = $result->reg_limit;
		$allow_multiple = $result->allow_multiple;
		$additional_limit = $result->additional_limit;

		$registration_start = array_key_exists('registration_start', $recurrence_arr)?$recurrence_arr['registration_start']:$result->registration_start;;
		$registration_end = array_key_exists('registration_end', $recurrence_arr)?$recurrence_arr['registration_end']:$result->registration_end;
		$start_date = array_key_exists('start_date', $recurrence_arr)?$recurrence_arr['start_date']:$result->start_date;
		$end_date = array_key_exists('end_date', $recurrence_arr)?$recurrence_arr['end_date']:$result->end_date;

		$start_time = $result->start_time;
		$end_time = $result->end_time;

		$is_active=$result->is_active;

		$address=stripslashes_deep($result->address);
		$address2=stripslashes_deep($result->address2);
		$city=stripslashes_deep($result->city);
		$state=stripslashes_deep($result->state);
		$zip=stripslashes_deep($result->zip);
		$country=stripslashes_deep($result->country);

		$phone=$result->phone;

		$send_mail= $result->send_mail;
		$conf_mail= $result->conf_mail;
		$email_id = $result->email_id;
		$use_coupon_code= $result->use_coupon_code;
				
		$question_groups = $result->question_groups;
		$allow_overflow = $result->allow_overflow;
		$overflow_event_id = $result->overflow_event_id;
	
		$event_code=uniqid($espresso_wp_user.'-');
				
		$registration_startT =  $result->registration_startT;
		$registration_endT =  $result->registration_endT;
				
		$event_status = $result->event_status;
				
		$virtual_url = $result->virtual_url;
		$virtual_phone = $result->virtual_phone;
				
		$member_only = $result->member_only;
		$post_id = $result->post_id;
		$post_type = $result->post_type;
		$post_type = $result->post_type;
		$externalURL = $result->externalURL;
		$early_disc = $result->early_disc;
		$early_disc_date = $result->early_disc_date;
		$early_disc_percentage = $result->early_disc_percentage;
				
		$venue_title = $result->venue_title;
		$venue_url = $result->venue_url;
		$venue_phone = $result->venue_phone;
		$venue_image = $result->venue_image;
		$event_meta = $result->event_meta;
		$require_pre_approval = $result->require_pre_approval;
		$timezone_string = $result->timezone_string;
				
				
		$sql=array(
			'event_code' => $event_code,
			'event_name'=>$event_name, 
			'event_desc'=>$event_desc, 
			'display_desc'=>$display_desc, 
			'display_reg_form'=>$display_reg_form, 
			'event_identifier'=>$event_identifier, 
			'address'=>$address, 
			'address2'=>$address2, 
			'city' => $city, 
			'state' => $state, 
			'zip' => $zip, 
			'country' => $country, 
			'phone'=>$phone, 
			'virtual_url'=>$virtual_url, 
			'virtual_phone'=>$virtual_phone, 
			'registration_start'=>$registration_start, 
			'registration_end'=>$registration_end, 
			'start_date'=>$start_date, 
			'end_date'=>$end_date, 
			'allow_multiple'=>$allow_multiple, 
			'send_mail'=>$send_mail, 
			'is_active'=>$is_active, 
			'event_status'=>$event_status, 
			'conf_mail'=>$conf_mail, 
			'use_coupon_code'=>$use_coupon_code, 
			'member_only'=>$member_only,
			'externalURL' => $externalURL, 
			'early_disc' => $early_disc, 
			'early_disc_date' => $early_disc_date, 
			'early_disc_percentage' => $early_disc_percentage, 
			'alt_email' => $alt_email, 
			'question_groups' => $question_groups, 
			'post_type' => $post_type, 
			'registration_startT' => $registration_startT, 
			'registration_endT' => $registration_endT, 
			'venue_title' => $venue_title, 
			'venue_url' => $venue_url, 
			'venue_phone' => $venue_phone, 
			'venue_image' => $venue_image,
			'event_meta' => $event_meta, 
			'require_pre_approval' => $require_pre_approval, 
			'timezone_string' => $timezone_string, 
			'submitted' => date('Y-m-d H:i:s', time()), 
			'reg_limit'=>$reg_limit, 
			'additional_limit'=>$additional_limit, 
			'recurrence_id'=>$recurrence_id, 
			'email_id' => $email_id, 
			'wp_user' => $espresso_wp_user,
			'post_id' => $post_id);
		}
		
		$sql_data = array(
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%s',
			'%s','%s','%s','%d',
			'%d','%d','%d','%d',
			'%d'
		);
		
		/*//check the counts to make sure the data is matched up correctly
		echo 'SQL Count ';		
		print count ($sql);
		echo '<br />SQL Data Count ';	
		print count($sql_data);
		
		//Output the data
		echo '<br />SQL Values: ';	
		print_r($sql);*/
	
		//Add groupon reference if installed
		if (function_exists('event_espresso_add_event_to_db_groupon')) {
			$sql = event_espresso_add_event_to_db_groupon($sql, $_REQUEST['use_groupon_code']);
			//print count ($sql);
			$sql_data = array_merge((array)$sql_data, (array)'%s');
			//print count($sql_data);
			if (!$wpdb->insert( EVENTS_DETAIL_TABLE, $sql, $sql_data)){
				$error = true;
			}
		}else{
			if (!$wpdb->insert( EVENTS_DETAIL_TABLE, $sql, $sql_data)){
				$error = true;
			}
		}

	$new_id = $wpdb->insert_id;

	$event_categories = $wpdb->get_results("SELECT * FROM ". EVENTS_CATEGORY_REL_TABLE ." WHERE event_id = '".$event_id."' ORDER BY id");
		foreach ($event_categories as $category){
					if ($category->event_id != ''){

						foreach (array($category->event_id) as $k=>$v){
							if($v != '') {
								$insert_cat = "INSERT INTO ".EVENTS_CATEGORY_REL_TABLE." (event_id, cat_id) VALUES ('".$new_id."', '".$category->cat_id."')";
								if (!$wpdb->query($insert_cat)){
									$error = true;
								}
							}
						}
					}
				}
	
	$event_venues = $wpdb->get_results("SELECT * FROM ". EVENTS_VENUE_REL_TABLE ." WHERE event_id = '".$event_id."' ORDER BY id");
		foreach ($event_venues as $venue){
					if ($venue->event_id != ''){

						foreach (array($venue->event_id) as $k=>$v){
							if($v != '') {
								$insert_venue = "INSERT INTO ".EVENTS_VENUE_REL_TABLE." (event_id, venue_id) VALUES ('".$new_id."', '".$venue->venue_id."')";
								if (!$wpdb->query($insert_venue)){
									$error = true;
								}
							}
						}
					}
				}
				
	$event_persons = $wpdb->get_results("SELECT * FROM ". EVENTS_PERSONNEL_REL_TABLE ." WHERE event_id = '".$event_id."' ORDER BY id");
		foreach ($event_persons as $person){
					if ($person->event_id != ''){

						foreach (array($person->event_id) as $k=>$v){
							if($v != '') {
								$insert_person = "INSERT INTO ".EVENTS_PERSONNEL_REL_TABLE." (event_id, person_id) VALUES ('".$new_id."', '".$person->person_id."')";
								if (!$wpdb->query($insert_person)){
									$error = true;
								}
							}
						}
					}
				}		

		
	$event_discounts = $wpdb->get_results("SELECT * FROM ". EVENTS_DISCOUNT_REL_TABLE ." WHERE event_id = '".$event_id."' ORDER BY id");
		foreach ($event_discounts as $discount){
					if ($discount->event_id != ''){

						foreach (array($discount->event_id) as $k=>$v){
							if($v != '') {
								$insert_discount = "INSERT INTO ".EVENTS_DISCOUNT_REL_TABLE." (event_id, discount_id) VALUES ('".$new_id."', '".$discount->discount_id."')";
								if (!$wpdb->query($insert_discount)){
									$error = true;
								}
							}
						}
					}
				}

	$event_times = $wpdb->get_results("SELECT * FROM ". EVENTS_START_END_TABLE ." WHERE event_id = '".$event_id."' ORDER BY id");
		foreach ($event_times as $event_time){
					if ($event_time->start_time != ''){

						foreach (array($event_time->start_time) as $k=>$v){
							if($v != '') {
								$sql3="INSERT INTO ".EVENTS_START_END_TABLE." (event_id, start_time, end_time) VALUES ('".$new_id."', '".$v."', '".$event_time->end_time."')";
								//echo "$sql3 <br>";
								if (!$wpdb->query($sql3)){
									$error = true;
								}
							}
						}
					}
				}
	$event_prices = $wpdb->get_results("SELECT * FROM ". EVENTS_PRICES_TABLE ." WHERE event_id = '".$event_id."' ORDER BY id");
		foreach ($event_prices as $event_price){
					if ($event_price->event_cost != ''){
						foreach (array($event_price->event_cost) as $k=>$v){
							if($v != '') {
								$prices_sql="INSERT INTO ".EVENTS_PRICES_TABLE." (event_id, event_cost, surcharge, price_type, member_price, member_price_type) VALUES ('".$new_id."', '".$v."', $event_price->surcharge, '".$event_price->price_type."', '".$event_price->member_price."', '".$event_price->member_price_type."')";
								//echo "$sql6 <br>";
								if (!$wpdb->query($prices_sql)){
									$error = true;
								}
							}
						}
					}
				}

	if ($error != true){?>
		<div id="message" class="updated fade"><p><strong><?php _e('The event','event_espresso'); ?> <a href="<?php echo $_SERVER["REQUEST_URI"]?>#event-id-<?php echo $wpdb->insert_id;?>"><?php echo stripslashes($event_name)?></a> <?php _e('has been added.','event_espresso'); ?></strong></p></div>
<?php }else { ?>
		<div id="message" class="error"><p><strong><?php _e('There was an error in your submission, please try again. The event was not saved!','event_espresso'); ?><?php  print $wpdb->print_error(); ?>.</strong></p></div>
<?php }

/*
 * With the recursion of this function, additional recurring events will be added
 */
static $counter = 1;
		 if ( count( $recurrence_arr) > 0 ) {
			 
			//$recurrence_dates = array_shift($recurrence_dates); //Remove the first item from the array since it will be added after this recursion
			foreach ($recurrence_arr as $r_a){

				echo_f($event_id, $r_a['start_date'] );

				copy_event(
						array(
							'event_id'	 => $event_id,
							'recurrence_id'	 => $recurrence_id,
							'start_date'		=>$r_a['start_date'],
							'registration_start'=>$r_a['registration_start'],
							'registration_end'  =>$r_a['registration_end']
						));

				$counter ++;
				if ($counter >20) exit();
			}
		}
/*
 * End recursion, as part of recurring events.
 */
		
}

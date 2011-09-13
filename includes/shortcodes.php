<?php
//These are the core shortcodes used by the plugin.
//If you would like to add your own shortcodes, please puchasse the custom shortcodes addon from http://eventespresso.com/download/plugins-and-addons/custom-files-addon/
//For a list and description of available shortcodes, please refer to http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/

/*
*
* Single Event
* Displays a single event
*
*/
//[SINGLEEVENT single_event_id="your_event_identifier"]
if (!function_exists('show_single_event')) {
	function show_single_event($atts) {
		extract(shortcode_atts(array('single_event_id' => __('No ID Supplied','event_espresso')), $atts));
		$single_event_id = "{$single_event_id}";
		global $load_espresso_scripts;
		$load_espresso_scripts = true;//This tells the plugin to load the required scripts
		//echo $single_event_id;
		ob_start();
		register_attendees($single_event_id);
		$buffer = ob_get_contents();
		ob_end_clean();
		return $buffer;
	}
}
add_shortcode('SINGLEEVENT', 'show_single_event');

/*
*
* Event Category
* Displays a list of events by category
* [EVENT_ESPRESSO_CATEGORY event_category_id="your_category_identifier"]
*
*/

if (!function_exists('show_event_category')) {
	function show_event_category($atts) {
		extract(shortcode_atts(array('event_category_id' => __('No Category ID Supplied','event_espresso'),'css_class' => ''), $atts));
		$event_category_id = "{$event_category_id}";
		$css_class = "{$css_class}";
		global $load_espresso_scripts;
		$load_espresso_scripts = true;//This tells the plugin to load the required scripts
		ob_start();
		display_event_espresso_categories($event_category_id, $css_class);//This function is called from the "/templates/event_list.php" file.
		$buffer = ob_get_contents();
		ob_end_clean();
		return $buffer;
	}
}
add_shortcode('EVENT_ESPRESSO_CATEGORY', 'show_event_category');

/*
*
* List of Attendees
* Displays a lsit of attendees
* [LISTATTENDEES]
* [LISTATTENDEES limit="30"]
* [LISTATTENDEES show_expired="false"]
* [LISTATTENDEES show_deleted="false"]
* [LISTATTENDEES show_secondary="false"]
* [LISTATTENDEES show_gravatar="true"]
//[LISTATTENDEES paid_only="true"]
* [LISTATTENDEES show_recurrence="false"]
* [LISTATTENDEES event_identifier="your_event_identifier"]
* [LISTATTENDEES category_identifier="your_category_identifier"]
*/
if (!function_exists('event_espresso_attendee_list')) {
	function event_espresso_attendee_list($event_identifier='NULL', $category_identifier='NULL',$show_gravatar='false',$show_expired='false',$show_secondary='false',$show_deleted='false',$show_recurrence='true',$limit='0', $paid_only='false', $sort_by='last name'){
		$show_expired = $show_expired == 'false' ? " AND e.start_date >= '".date ( 'Y-m-d' )."' " : '';
		$show_secondary = $show_secondary == 'false' ? " AND e.event_status != 'S' " : '';
		$show_deleted = $show_deleted == 'false' ? " AND e.event_status != 'D' " : '';
		$show_recurrence = $show_recurrence == 'false' ? " AND e.recurrence_id = '0' " : '';
                $sort= $sort_by=='last name' ? " ORDER BY lname " : '';
		$limit = $limit > 0 ? " LIMIT 0," . $limit . " " : '';
		if ($event_identifier != 'NULL'){
			$type = 'event';

		}else if ($category_identifier != 'NULL'){
			$type = 'category';
		}

		if (!empty($type) && $type == 'event'){
			$sql = "SELECT e.* FROM " . EVENTS_DETAIL_TABLE . " e ";
			$sql .= " WHERE e.is_active = 'Y' ";
			$sql .= " AND e.event_identifier = '" . $event_identifier . "' ";
			$sql .= $show_secondary;
			$sql .= $show_expired;
			$sql .= $show_deleted;
			$sql .= $show_recurrence;
			$sql .= $limit;
			event_espresso_show_attendess($sql,$show_gravatar,$paid_only, $sort);
		}else if (!empty($type) && $type == 'category'){
			$sql = "SELECT e.* FROM " . EVENTS_CATEGORY_TABLE . " c ";
			$sql .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.cat_id = c.id ";
			$sql .= " JOIN " . EVENTS_DETAIL_TABLE . " e ON e.id = r.event_id ";
			$sql .= " WHERE c.category_identifier = '" . $category_identifier . "' ";
			$sql .= " AND e.is_active = 'Y' ";
			$sql .= $show_secondary;
			$sql .= $show_expired;
			$sql .= $show_deleted;
			$sql .= $show_recurrence;
			$sql .= $limit;
			event_espresso_show_attendess($sql,$show_gravatar,$paid_only, $sort);
		}else{
			$sql = "SELECT e.* FROM " . EVENTS_DETAIL_TABLE . " e ";
			$sql .= " WHERE e.is_active='Y' ";
			$sql .= $show_secondary;
			$sql .= $show_expired;
			$sql .= $show_deleted;
			$sql .= $show_recurrence;
			$sql .= $limit;
			event_espresso_show_attendess($sql,$show_gravatar,$paid_only, $sort);
		}
	}
}

if (!function_exists('event_espresso_list_attendees')) {
	function event_espresso_list_attendees($atts) {
		//echo $atts;
		extract(shortcode_atts(array('event_identifier' => 'NULL', 'single_event_id' => 'NULL', 'category_identifier' => 'NULL', 'event_category_id' => 'NULL', 'show_gravatar' => 'NULL', 'show_expired' => 'NULL','show_secondary'=>'NULL','show_deleted'=>'NULL','show_recurrence'=>'NULL', 'limit' => 'NULL', 'paid_only'=>'NULL'),$atts));
		global $load_espresso_scripts;
		$load_espresso_scripts = true;//This tells the plugin to load the required scripts
		//get the event identifiers
		$event_identifier = "{$event_identifier}";
		$single_event_id = "{$single_event_id}";
		$event_identifier = ($single_event_id != 'NULL') ? $single_event_id : $event_identifier;
		$show_gravatar = "{$show_gravatar}";

		//get the category identifiers
		$category_identifier = "{$category_identifier}";
		$event_category_id = "{$event_category_id}";
		$category_identifier = ($event_category_id != 'NULL') ? $event_category_id : $category_identifier;

		//Get the extra parameters
		$show_expired="{$show_expired}";
		$show_secondary="{$show_secondary}";
		$show_deleted="{$show_deleted}";
		$show_recurrence="{$show_recurrence}";
		$paid_only="{$paid_only}";

		ob_start();
		event_espresso_attendee_list($event_identifier, $category_identifier, $show_gravatar, $show_expired, $show_secondary, $show_deleted, $show_recurrence, $limit, $paid_only);
		$buffer = ob_get_contents();
		ob_end_clean();
		return $buffer;
	}
}
add_shortcode('LISTATTENDEES', 'event_espresso_list_attendees');

/*
*
* Event Times
* Returs the times for an event. Sucha s start and end times, registration start and end times, etc.
* Please refer to http://php.net/manual/en/function.date.php for date formats
*
*/
if (!function_exists('espresso_event_time_sc')) {
	function espresso_event_time_sc($atts){
		extract(shortcode_atts(array('event_id' =>'0','type' =>'','format' =>''), $atts));
		$event_id = "{$event_id}";
		$type = "{$type}";
		$format = "{$format}";
		return espresso_event_time($event_id, $type, $format);
	}
}
add_shortcode('EVENT_TIME', 'espresso_event_time_sc');

/*
*
* Registration Page
* Returns the registration page for an event
*
*/
if (!function_exists('espresso_reg_page_sc')) {
	function espresso_reg_page_sc($atts){
		global $wpdb, $org_options;
		global $load_espresso_scripts;
		$load_espresso_scripts = true;//This tells the plugin to load the required scripts
		extract(shortcode_atts(array('event_id' =>'0'), $atts));
		$event_id = "{$event_id}";
		return register_attendees(NULL, $event_id);
	}
}
add_shortcode('ESPRESSO_REG_PAGE', 'espresso_reg_page_sc');

if (!function_exists('espresso_reg_form_sc')) {
	function espresso_reg_form_sc($atts){
		global $wpdb, $org_options;
		global $load_espresso_scripts;
		$load_espresso_scripts = true;//This tells the plugin to load the required scripts
		extract(shortcode_atts(array('event_id' =>'0'), $atts));
		$event_id = "{$event_id}";

		//The following variables are used to get information about your organization
		$event_page_id =$org_options['event_page_id'];
		$Organization =stripslashes_deep($org_options['organization']);
		$Organization_street1 =$org_options['organization_street1'];
		$Organization_street2=$org_options['organization_street2'];
		$Organization_city =$org_options['organization_city'];
		$Organization_state=$org_options['organization_state'];
		$Organization_zip =$org_options['organization_zip'];
		$contact =$org_options['contact_email'];
		$registrar = $org_options['contact_email'];
		$currency_format =$org_options['currency_format'];

		$message =$org_options['message'];
		$use_captcha =$org_options['use_captcha'];
		$paypal_id =$org_options['paypal_id'];

		$sql  = "SELECT * FROM " . EVENTS_DETAIL_TABLE;
		$sql.= " WHERE is_active='Y' ";
		$sql.= " AND event_status != 'D' ";
		$sql.= " AND id = '" . $event_id . "' LIMIT 0,1";

		if ($wpdb->get_results($sql)){
			$events = $wpdb->get_results($sql);
			//These are the variables that can be used throughout the regsitration page
			foreach ($events as $event){
					$event_id = $event->id;
					$event_name = stripslashes_deep($event->event_name);
					$event_desc = stripslashes_deep($event->event_desc);
					$display_desc = $event->display_desc;
					$display_reg_form = $event->display_reg_form;
					$event_address = $event->address;
					$event_address2 = $event->address2;
					$event_city = $event->city;
					$event_state = $event->state;
					$event_zip = $event->zip;
					$event_country = $event->country;
					$event_description = stripslashes_deep($event->event_desc);
					$event_identifier = $event->event_identifier;
					$event_cost = $event->event_cost;
					$member_only = $event->member_only;
					$reg_limit = $event->reg_limit;
					$allow_multiple = $event->allow_multiple;
					$start_date =  $event->start_date;
					$end_date =  $event->end_date;
					$allow_overflow = $event->allow_overflow;
					$overflow_event_id = $event->overflow_event_id;

					$virtual_url=stripslashes_deep($event->virtual_url);
					$virtual_phone=stripslashes_deep($event->virtual_phone);

					//Address formatting
					$location = ($event_address != '' ? $event_address :'') . ($event_address2 != '' ? '<br />' . $event_address2 :'') . ($event_city != '' ? '<br />' . $event_city :'') . ($event_state != '' ? ', ' . $event_state :'') . ($event_zip != '' ? '<br />' . $event_zip :'') . ($event_country != '' ? '<br />' . $event_country :'');

					//Google map link creation
					$google_map_link = espresso_google_map_link(array( 'address'=>$event_address, 'city'=>$event_city, 'state'=>$event_state, 'zip'=>$event_zip, 'country'=>$event_country, 'text'=> 'Map and Directions', 'type'=> 'text') );

					$reg_start_date = $event->registration_start;
					$reg_end_date = $event->registration_end;
					$today = date("Y-m-d");

					$reg_limit=$event->reg_limit;
					$additional_limit = $event->additional_limit;


					$question_groups = unserialize($event->question_groups);

					 global $all_meta;
					$all_meta = array(
						'event_name' => stripslashes_deep($event_name),
						'event_desc' => stripslashes_deep($event_desc),
						'event_address' => $event_address,
						'event_address2' => $event_address2,
						'event_city' => $event_city,
						'event_state' => $event_state,
						'event_zip' => $event_zip,

						'is_active' => $event->is_active,
						'event_status' => $event->event_status,
						'start_time' => $event->start_time,

						'registration_startT' => $event->registration_startT,
						'registration_start' => $event->registration_start,

						'registration_endT' => $event->registration_endT,
						'registration_end' => $event->registration_end,

						'is_active' => $is_active,

						'event_country' => $event_country,
						'start_date' => event_date_display($start_date, get_option('date_format')),
						'end_date' => event_date_display($end_date, get_option('date_format')),
						'time' => $event->start_time,
						'google_map_link' => $google_map_link,
						'price' =>  $event->event_cost,
						'event_cost' =>  $event->event_cost,
					);

					//This function gets the status of the event.
					$is_active = array();
					$is_active = event_espresso_get_is_active(0,$all_meta);

					//If the coupon code system is intalled then use it
					if (function_exists('event_espresso_coupon_registration_page')) {
						$use_coupon_code = $event->use_coupon_code;
					}

					//If the groupon code addon is installed, then use it
					if (function_exists('event_espresso_groupon_payment_page')) {
						$use_groupon_code=$event->use_groupon_code;
					}

					//Set a default value for additional limit
					if ($additional_limit == ''){
						$additional_limit = '5';
					}
			}//End foreach ($events as $event)
		}

//This is the registration form.
//This is a template file for displaying a registration form for an event on a page.
//There should be a copy of this file in your wp-content/uploads/espresso/ folder.
?>
				<div id="event_espresso_registration_form">
                    <form method="post" action="<?php echo home_url()?>/?page_id=<?php echo $event_page_id?>" id="registration_form">
                    <?php
					//print_r( event_espresso_get_is_active($event_id));

                    switch ($is_active['status']){
						case 'EXPIRED': //only show the event description.
							_e('<h3 class="expired_event">This event has passed.</h3>', 'event_espresso');
						break;

						case 'REGISTRATION_CLOSED': //only show the event description.
							// if todays date is after $reg_end_date
						?>
							<p class="event_full"><strong><?php _e('We are sorry but registration for this event is now closed.','event_espresso'); ?></strong></p>
							<p class="event_full"><strong><?php _e('Please <a href="contact" title="contact us">contact us</a> if you would like to know if spaces are still available.','event_espresso'); ?></strong></p>
						<?php
						break;

						case 'REGISTRATION_NOT_OPEN': //only show the event description.
						// if todays date is after $reg_end_date
						// if todays date is prior to $reg_start_date
						?>
							<p class="event_full"><strong><?php _e('We are sorry but this event is not yet open for registration.','event_espresso'); ?></strong></p>
							<p class="event_full"><strong><?php _e('You will be able to register starting ' . event_espresso_no_format_date($reg_start_date, 'F d, Y'),'event_espresso'); ?></strong></p>
						<?php
						break;

						default:
							//If the event is in an active or ongoing status, then show the registration form.
							//echo $is_active['status'];//Show event status
							if ($display_reg_form == 'Y') {
							?>
							<p class="event_time">
								<?php
								//This block of code is used to display the times of an event in either a dropdown or text format.
								if ($time_selected == true){//If the customer is coming from a page where the time was preselected.
									echo event_espresso_display_selected_time($time_id);//Optional parameters start, end, default
								}else if ($time_selected == false){
									echo event_espresso_time_dropdown($event_id);
								}//End time selected
								?>
							</p>

								<p class="event_prices"><?php echo event_espresso_price_dropdown($event_id);//Show pricing in a dropdown or text ?></p>
							<?php
								//Outputs the custom form questions. This function can be overridden using the custom files addon
								echo event_espresso_add_question_groups($question_groups);


								//Coupons
								if (function_exists('event_espresso_coupon_registration_page')) {
									echo event_espresso_coupon_registration_page($use_coupon_code, $event_id);
								}//End coupons display

								//Groupons
								if (function_exists('event_espresso_groupon_registration_page')) {
									echo event_espresso_groupon_registration_page($use_groupon_code, $event_id);
								}//End groupons display

								?>
									  <input type="hidden" name="num_people" id="num_people-<?php echo $event_id;?>" value="1">


								<input type="hidden" name="regevent_action" id="regevent_action-<?php echo $event_id;?>" value="post_attendee">
								<input type="hidden" name="event_id" id="event_id-<?php echo $event_id;?>" value="<?php echo $event_id;?>">
								<?php
								//Recaptcha portion
								if ($use_captcha == 'Y'){
									if (!function_exists('recaptcha_get_html')) {
										require_once(EVENT_ESPRESSO_PLUGINFULLPATH. 'includes/recaptchalib.php');
									}//End require captcha library

									# the response from reCAPTCHA
									$resp = null;
									# the error code from reCAPTCHA, if any
									$error = null;
									?>
									<p class="event_form_field" id="captcha-<?php echo $event_id;?>"><?php _e('Anti-Spam Measure: Please enter the following phrase','event_espresso'); ?>
									<?php echo recaptcha_get_html($org_options['recaptcha_publickey'], $error); ?>
									</p>
						<?php 	} //End use captcha ?>
								<p class="event_form_submit" id="event_form_submit-<?php echo $event_id;?>">

								<input class="btn_event_form_submit" id="event_form_field-<?php echo $event_id;?>" type="submit" name="Submit" value="<?php _e('Submit','event_espresso');?>">
								</p>
						<?php
							}
						break;
				    }//End Switch statement to check the status of the event?>
					</form>
                    </div><?php
	}
	}

add_shortcode('ESPRESSO_REG_FORM', 'espresso_reg_form_sc');

/*
*
* Category Name
* Returns an array of category data based on an event id
*
*/
if (!function_exists('espresso_category_name_sc')) {
	function espresso_category_name_sc($atts){
		global $wpdb, $org_options;
		extract(shortcode_atts(array('event_id' =>'0'), $atts));
		$event_id = "{$event_id}";
		$category_name = espresso_event_category_data($event_id);
		return $category_name['category_name'];
	}
}
add_shortcode('CATEGORY_NAME', 'espresso_category_name_sc');

/*
*
* Price Dropdown
* Returns a price dropdown if multiple prices are associated with an event, based on an event id
*
*/
if (!function_exists('espresso_price_dd_sc')) {
	function espresso_price_dd_sc($atts){
		global $wpdb, $org_options;
		extract(shortcode_atts(array('event_id' =>'0'), $atts));
		$event_id = "{$event_id}";
		$data = event_espresso_price_dropdown($event_id);
		return $data['category_name'];
	}
}
add_shortcode('EVENT_PRICE_DROPDOWN', 'espresso_price_dd_sc');

/*
*
* Event Price
* Returns a price for a single event, based on an event id
*
*/
if (!function_exists('get_espresso_price_sc')) {
	function get_espresso_price_sc($atts) {
		extract(shortcode_atts(array('event_id' =>'0','number' =>'0'), $atts));
		$event_id = "{$event_id}";
		$number = "{$number}";

		return espresso_return_single_price($event_id,$number);
	}
}
add_shortcode('EVENT_PRICE', 'get_espresso_price_sc');


/*
*
* Returns the number of attendees, registration limits, etc based on an event id
*
*/
if (!function_exists('espresso_attendees_data_sc')) {
	function espresso_attendees_data_sc($atts){
		global $wpdb, $org_options;
		extract(shortcode_atts(array('event_id' =>'0','type' =>''), $atts));
		$event_id = "{$event_id}";
		$type = "{$type}";
		$data = get_number_of_attendees_reg_limit($event_id, $type);
		return $data;
	}
}
add_shortcode('ATTENDEE_NUMBERS', 'espresso_attendees_data_sc');

/*
*
* Event List
* Returns a list of events
* [EVENT_LIST]
* [EVENT_LIST limit=1]
* [EVENT_LIST css_class=my-custom-class]
* [EVENT_LIST show_expired=true]
* [EVENT_LIST show_deleted=true]
* [EVENT_LIST show_secondary=true]
* [EVENT_LIST show_recurrence=true]
* [EVENT_LIST category_identifier=your_category_identifier]
*
*/
if (!function_exists('display_event_list_sc')) {
	function display_event_list_sc($atts){
		global $wpdb,$org_options;
		global $load_espresso_scripts;
		$load_espresso_scripts = true;//This tells the plugin to load the required scripts
		extract(shortcode_atts(array('category_identifier' => 'NULL','show_expired' => 'false', 'show_secondary'=>'false','show_deleted'=>'false','show_recurrence'=>'false', 'limit' => '0', 'order_by' => 'NULL', 'css_class' => 'NULL'),$atts));

		if ($category_identifier != 'NULL'){
			$type = 'category';
		}

		$show_expired = $show_expired == 'false' ? " AND (e.start_date >= '".date ( 'Y-m-d' )."' OR e.event_status = 'O' OR e.registration_end >= '".date ( 'Y-m-d' )."') " : '';
		$show_secondary = $show_secondary == 'false' ? " AND e.event_status != 'S' " : '';
		$show_deleted = $show_deleted == 'false' ? " AND e.event_status != 'D' " : '';
		$show_recurrence = $show_recurrence == 'false' ? " AND e.recurrence_id = '0' " : '';
		$limit = $limit > 0 ? " LIMIT 0," . $limit . " " : '';
		$order_by = $order_by != 'NULL'? " ORDER BY ". $order_by ." ASC " : " ORDER BY date(start_date), id ASC ";

		if (!empty($type) && $type == 'category'){
			$sql = "SELECT e.*, ese.start_time, ese.end_time, p.event_cost ";
			isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= ", v.name venue_name, v.address venue_address, v.city venue_city, v.state venue_state, v.zip venue_zip, v.country venue_country, v.meta venue_meta " : '';
			$sql .= " FROM " . EVENTS_CATEGORY_TABLE . " c ";
			$sql .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.cat_id = c.id ";
			$sql .= " JOIN " . EVENTS_DETAIL_TABLE . " e ON e.id = r.event_id ";
			isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= " LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " vr ON vr.event_id = e.id LEFT JOIN " . EVENTS_VENUE_TABLE . " v ON v.id = vr.venue_id " : '';
			$sql .= " LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id= e.id ";
            $sql .= " JOIN " . EVENTS_PRICES_TABLE . " p ON p.event_id=e.id ";
			$sql .= " WHERE c.category_identifier = '" . $category_identifier . "' ";
			$sql .= " AND e.is_active = 'Y' ";
		}else{
			 $sql = "SELECT e.*, ese.start_time, ese.end_time, p.event_cost ";
			isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= ", v.name venue_name, v.address venue_address, v.city venue_city, v.state venue_state, v.zip venue_zip, v.country venue_country, v.meta venue_meta " : '';
			$sql .= " FROM " . EVENTS_DETAIL_TABLE . " e ";
        	isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= " LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id LEFT JOIN " . EVENTS_VENUE_TABLE . " v ON v.id = r.venue_id " : '';
			$sql .= " LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id= e.id ";
            $sql .= " JOIN " . EVENTS_PRICES_TABLE . " p ON p.event_id=e.id ";
			$sql .= " WHERE e.is_active = 'Y' ";

		}

		$sql .= $show_expired;
		$sql .= $show_secondary;
		$sql .= $show_deleted;
		$sql .= $show_recurrence;
		$sql .= " GROUP BY e.id ";
		$sql .= $order_by;
		$sql .= $limit;
		//template located in event_list_dsiplay.php
		ob_start();
		//echo $sql;
		event_espresso_get_event_details($sql, $css_class,$allow_override=1);
		$buffer = ob_get_contents();
		ob_end_clean();
		return $buffer;
	}
}
add_shortcode('EVENT_LIST', 'display_event_list_sc');

//Returns the price
/*function espresso_get_price_sc($atts){
	global $wpdb, $org_options;
	extract(shortcode_atts(array('event_id' =>'0'), $atts));
	$event_id = "{$event_id}";
	return event_espresso_get_price($event_id);
}
add_shortcode('EVENT_PRICE', 'espresso_get_price_sc');*/

function espresso_session_id_sc(){
	return event_espresso_session_id();
}
add_shortcode('SESSION_ID', 'espresso_session_id_sc');

/**
Staff Details shortcode
http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/#staff_shortcode

Example:
[ESPRESSO_STAFF outside_wrapper="div" outside_wrapper_class="event_staff" inside_wrapper="p" inside_wrapper_class="event_person"]

Parameters:
id (The id of the staff member. The daefault is auto loaded of from the event.)
outside_wrapper_class
outside_wrapper
inside_wrapper_class
inside_wrapper
name_class
name_wrapper
image_class
show_image (true|false default true)
show_staff_titles (true|false default true)
show_staff_details (true|false default true)
show_image (true|false default true)
show_description (true|false default true)
**/
if (!function_exists('espresso_staff_sc')) {
	function espresso_staff_sc($atts){

		global $wpdb, $espresso_premium, $this_event_id;
        if ($espresso_premium != true)
            return;

		empty($atts) ? '': extract($atts);

		//Outside wrapper
		$outside_wrapper_class = isset($outside_wrapper_class) ? 'class="'.$outside_wrapper_class.'"' : 'class="event_staff"';
		$wrapper_start  = isset($outside_wrapper) ? '<'.$outside_wrapper.' '.$outside_wrapper_class: '<div '.$outside_wrapper_class;
		$wrapper_end = isset($outside_wrapper) ? '</'.$outside_wrapper.'>' : '</div>';

		//Persons title
		$name_class = isset($name_class) ? 'class="'.$name_class.'"' : 'class="person_name"';
		$name_wrapper_start = isset($name_wrapper) ? '<'.$name_wrapper.' '.$name_class.'>': '<strong '.$name_class.'>';
		$name_wrapper_end = isset($name_wrapper) ? '</'.$name_wrapper.'>' : '</strong>';

		//Image class
		$image_class = isset($image_class) ? 'class="'.$image_class.'"' : 'class="staff_image"';
		$image_wrapper_class = isset($image_wrapper_class) ? 'class="'.$image_wrapper_class.'"' : 'class="image_wrapper"';
		$image_wrapper_start  = isset($image_wrapper) ? '<'.$image_wrapper.' '.$image_wrapper_class: '<p '.$image_wrapper_class . '>';
		$image_wrapper_end = isset($image_wrapper) ? '</'.$image_wrapper.'>' : '</p>';

		//Inside wrappers
		$inside_wrapper_class = isset($inside_wrapper_class) ? 'class="'.$inside_wrapper_class.'"' : 'class="event_person"';
		$inside_wrapper_before  = isset($inside_wrapper) ? '<'.$inside_wrapper.' '.$inside_wrapper_class.'>': '<p '.$inside_wrapper_class.'>';
		$inside_wrapper_after  = isset($inside_wrapper) ? '</'.$inside_wrapper.'>': '</p>';

		//Show the persons title?
		$show_staff_titles  = (isset($show_persons_title) && $show_persons_title == 'false') ? false: true;

		//Show the persons details?
		$show_staff_details  = (isset($show_details) && $show_details == 'false') ? false: true;

		//Show image?
		$show_image = (isset($show_image) && $show_image == 'false')? false:true;

		//Show the description?
		$show_description = (isset($show_description) && $show_description == 'false')? false:true;

		//Find the event id
		if (isset($event_id)){
			$event_id = $event_id;//Check to see if the event is used in the shortcode parameter
		}elseif (isset($this_event_id)){
			$event_id = $this_event_id;//Check to see if the global event id is being used
		}elseif (isset($_REQUEST['event_id'])){
			$event_id = $_REQUEST['event_id'];//If the first two are not being used, then get the event id from the url
		}elseif (!isset($event_id) && !isset($id)){
			//_e('No event or staff id supplied!', 'event_espresso') ;
            return;
		}
        $limit = (isset($limit) && $limit > 0) ? " LIMIT 0," . $limit . " " : '';
        $sql = "SELECT s.id, s.name, s.role, s.meta ";
        $sql .= " FROM " . EVENTS_PERSONNEL_TABLE . ' s ';
        if (isset($id) && $id > 0) {
            $sql .= " WHERE s.id ='" . $id . "' ";
        } else {
            $sql .= " JOIN " . EVENTS_PERSONNEL_REL_TABLE . " r ON r.person_id = s.id ";
            $sql .= " WHERE r.event_id ='" . $event_id . "' ";
        }
        $sql .= $limit;
        //echo $sql;
        $event_personnel = $wpdb->get_results($sql);
        $num_rows = $wpdb->num_rows;
        if ($num_rows > 0) {
            $html = '';
            foreach ($event_personnel as $person) {
                $person_id = $person->id;
                $person_name = $person->name;
                $person_role = $person->role;

                $meta = unserialize($person->meta);

				$html .= $wrapper_start .' id="person_id_'.$person_id.'">';

				//Build the persons name/title
				$html .= $inside_wrapper_before;
				if ($show_staff_titles != false){
                    $person_title = $person_role != '' ? ' - ' . stripslashes_deep($person_role) : '';
				}
				$html .= $name_wrapper_start.stripslashes_deep($person_name) . $name_wrapper_end . $person_title;
				$html .= $inside_wrapper_after ;

				//Build the image
				if ($show_image != false){
					$html .= $meta['image'] != ''? $image_wrapper_start.'<image id="staff_image_'.$person_id.'" '.$image_class.' src="'.stripslashes_deep($meta['image']).'" />'.$image_wrapper_end:'';
				}

				//Build the description
				if ($show_description != false){
					$html .= $meta['description'] != ''? html_entity_decode(stripslashes_deep($meta['description'])):'';
				}

				//Build the additional details
				if ($show_staff_details != false){
					$html .= $inside_wrapper_before;
					$html .= isset($meta['organization']) ? __('Company:', 'event_espresso').' '.stripslashes_deep($meta['organization']).'<br />':'';
					$html .= isset($meta['title']) ? __('Title:', 'event_espresso').' '.stripslashes_deep($meta['title']).'<br />':'';
					$html .= isset($meta['industry']) ? __('Industry:', 'event_espresso').' '.stripslashes_deep($meta['industry']).'<br />':'';
					$html .= isset($meta['city']) ? __('City:', 'event_espresso').' '.stripslashes_deep($meta['city']).'<br />':'';
					$html .= isset($meta['country']) ? __('Country:', 'event_espresso').' '.stripslashes_deep($meta['country']).'<br />':'';
					$html .= isset($meta['website']) ? __('Website:', 'event_espresso').' <a href="'.stripslashes_deep($meta['website']).'" target="_blank">'.stripslashes_deep($meta['website']).'</a><br />':'';
					$html .= isset($meta['twitter']) ? __('Twitter:', 'event_espresso').' <a href="http://twitter.com/#!/'.stripslashes_deep($meta['twitter']).'" target="_blank">@'.stripslashes_deep($meta['twitter']).'</a><br />':'';
					$html .= isset($meta['phone']) ? __('Phone:', 'event_espresso').' '.stripslashes_deep($meta['phone']).'<br />':'';
					$html .= $inside_wrapper_after ;
				}


				$html .= $wrapper_end;
            }
        }

		ob_start();
		echo wpautop($html);
		$buffer = ob_get_contents();
		ob_end_clean();
		return $buffer;
	}
}
add_shortcode('ESPRESSO_STAFF', 'espresso_staff_sc');

/**
Venue Details Shortcode
http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/#venue_shortcode

Example:
[ESPRESSO_VENUE outside_wrapper="div" outside_wrapper_class="event_venue"]

Parameters:
outside_wrapper
outside_wrapper_class
title_wrapper
title_class
inside_wrapper
inside_wrapper_class
image_class
show_google_map_link (true|false default true)
map_link_text
show_map_image (true|false default true)
map_image_wrapper
map_image_class
map_w (map image width default 400)
map_h (map image height default 400)
show_title (true|false default true)
show_image (true|false default true)
show_description (true|false default true)
show_address (true|false default true)
show_additional_details (true|false default true)
**/
if (!function_exists('espresso_venue_details_sc')) {
	function espresso_venue_details_sc($atts){

		global $wpdb,$this_event_id;

		empty($atts) ? '': extract($atts);

		//Outside wrapper
		$outside_wrapper_class = isset($outside_wrapper_class) ? 'class="'.$outside_wrapper_class.'"' : 'class="event_venue"';
		$wrapper_start  = isset($outside_wrapper) ? '<'.$outside_wrapper.' '.$outside_wrapper_class: '<div '.$outside_wrapper_class;
		$wrapper_end = isset($outside_wrapper) ? '</'.$outside_wrapper.'>' : '</div>';

		//Image class
		$image_class = isset($image_class) ? 'class="'.$image_class.'"' : 'class="venue_image"';
		$image_wrapper_class = isset($image_wrapper_class) ? 'class="'.$image_wrapper_class.'"' : 'class="image_wrapper"';
		$image_wrapper_start  = isset($image_wrapper) ? '<'.$image_wrapper.' '.$image_wrapper_class: '<p '.$image_wrapper_class;
		$image_wrapper_end = isset($image_wrapper) ? '</'.$image_wrapper.'>' : '</p>';

		//Venue title
		$title_class = isset($title_class) ? 'class="'.$title_class.'"' : 'class="venue_name"';
		$title_wrapper_start = isset($title_wrapper) ? '<'.$title_wrapper.' '.$title_class: '<h3 '.$title_class;
		$title_wrapper_end = isset($title_wrapper) ? '</'.$title_wrapper.'>' : '</h3>';

		//Inside wrappers
		$inside_wrapper_class = isset($inside_wrapper_class) ? 'class="'.$inside_wrapper_class.'"' : 'class="venue_details"';
		$inside_wrapper_before  = isset($inside_wrapper) ? '<'.$inside_wrapper.' '.$inside_wrapper_class.'>': '<p '.$inside_wrapper_class.'>';
		$inside_wrapper_after  = isset($inside_wrapper) ? '</'.$inside_wrapper.'>': '</p>';

		//Map image class
		$map_image_class = isset($map_image_class) ? 'class="'.$map_image_class.'"' : 'class="venue_map_image"';
		$map_image_wrapper_class = isset($map_image_wrapper_class) ? 'class="'.$map_image_wrapper_class.'"' : 'class="map_image_wrapper"';
		$map_image_wrapper_start  = isset($map_image_wrapper) ? '<'.$map_image_wrapper.' '.$map_image_wrapper_class: '<p '.$map_image_wrapper_class;
		$map_image_wrapper_end = isset($map_image_wrapper) ? '</'.$map_image_wrapper.'>' : '</p>';

		//Google Map link text
		$show_google_map_link = (isset($show_google_map_link) && $show_google_map_link == 'false')? false:true;
		$map_link_text = isset($map_link_text) ? $map_link_text:__('Map and Directions', 'event_espresso');

		//Show Google map image?
		$show_map_image = (isset($show_map_image) && $show_map_image == 'false')? false:true;

		//Show title?
		$show_title = (isset($show_title) && $show_title == 'false')? false:true;

		//Show image?
		$show_image = (isset($show_image) && $show_image == 'false')? false:true;

		//Show the description?
		$show_description = (isset($show_description) && $show_description == 'false')? false:true;

		//Show address details?
		$show_address = (isset($show_address) && $show_address == 'false')? false:true;

		//Show additional details
		$show_additional_details = (isset($show_additional_details) && $show_additional_details == 'false')? false:true;

		//Find the event id
		if (isset($id) && $id > 0){
		}elseif (isset($event_id)){
			$event_id = $event_id;//Check to see if the event is used in the shortcode parameter
		}elseif (isset($this_event_id)){
			$event_id = $this_event_id;//Check to see if the global event id is being used
		}elseif (isset($_REQUEST['event_id'])){
			$event_id = $_REQUEST['event_id'];//If the first two are not being used, then get the event id from the url
		}else{
			//_e('No event id supplied!', 'event_espresso') ;
			return;
		}
		$sql = "SELECT ev.*
			FROM ".EVENTS_DETAIL_TABLE." e
			LEFT JOIN ".EVENTS_VENUE_REL_TABLE." vr ON e.id = vr.event_id
			LEFT JOIN ".EVENTS_VENUE_TABLE." ev ON vr.venue_id = ev.id ";
		if (isset($id) && $id > 0) {
            $sql .= " WHERE ev.id = '". $id ."' LIMIT 0,1";
        } else {
            $sql .= " WHERE e.id ='" . $event_id . "' ";
        }
		//echo $sql ;

		$venues = $wpdb->get_results( $sql );

		$num_rows = $wpdb->num_rows;
			if ($num_rows > 0) {
				$html = '';
				foreach ($venues as $venue) {
					$venue_id = $venue->id;
					$meta = unserialize($venue->meta);

					//Google map link creation
               		$google_map_link = espresso_google_map_link(array('address' => $venue->address, 'city' => $venue->city, 'state' => $venue->state, 'zip' => $venue->zip, 'country' => $venue->country, 'text' => $map_link_text, 'type' => 'text'));

					//Google map image creation
					$map_w = isset($map_w) ? $map_w : 400;
					$map_h = isset($map_h) ? $map_h : 400;
					$google_map_image = espresso_google_map_link(array('id'=>$venue_id, 'map_image_class'=>$map_image_class, 'address' => $venue->address, 'city' => $venue->city, 'state' => $venue->state, 'zip' => $venue->zip, 'country' => $venue->country, 'text' => $map_link_text, 'type' => 'map', 'map_h'=>$map_h, 'map_w'=>$map_w));

					//Build the venue title
					if ($show_title != false){
						$html .= $venue->name !=''? $title_wrapper_start.'>'.stripslashes_deep($venue->name).$title_wrapper_end:'';
					}

					//Build the venue image
					if ($show_image != false){
						$html .= $meta['image'] != ''? $image_wrapper_start.'<image id="venue_image_'.$venue_id.'" '.$image_class.' src="'.stripslashes_deep($meta['image']).'" />'.$image_wrapper_end:'';
					}

					//Build the description
					if ($show_description != false){
						$html .= $meta['description'] != ''? $meta['description']:'';
					}

					//Build the address details
					if ($show_address != false){
						$html .= $inside_wrapper_before;
						$html .= $venue->address !=''? stripslashes_deep($venue->address).'<br />':'';
						$html .= $venue->address2 != ''? stripslashes_deep($venue->address2).'<br />':'';
						$html .= $venue->city != ''? stripslashes_deep($venue->city).'<br />':'';
						$html .= $venue->state != ''? stripslashes_deep($venue->state).'<br />':'';
						$html .= $venue->zip != ''? stripslashes_deep($venue->zip).'<br />':'';
						$html .= $venue->country != ''? stripslashes_deep($venue->country).'<br />':'';
						$html .= $show_google_map_link != false? $google_map_link:'';
						$html .= $inside_wrapper_after;
					}

					//Build the additional details
					if ($show_additional_details != false){
						$html .= $inside_wrapper_before;
						$html .= $meta['website'] != ''? __('Website:', 'event_espresso').' <a href="'.stripslashes_deep($meta['website']).'" target="_blank">'.stripslashes_deep($meta['website']).'</a><br />':'';
						$html .= $meta['contact'] != ''? __('Contact:', 'event_espresso').' '.stripslashes_deep($meta['contact']).'<br />':'';
						$html .= $meta['phone'] != ''? __('Phone:', 'event_espresso').' '.stripslashes_deep($meta['phone']).'<br />':'';
						$html .= $meta['twitter'] != ''? __('Twitter:', 'event_espresso').' <a href="http://twitter.com/#!/'.stripslashes_deep($meta['twitter']).'" target="_blank">@'.stripslashes_deep($meta['twitter']).'</a><br />':'';
						$html .= $inside_wrapper_after;
					}

					//Build the venue image
					if ($show_map_image != false){
						$html .= $map_image_wrapper_start.$google_map_image.$map_image_wrapper_end;
					}
				}
			}
			ob_start();
			echo $wrapper_start .' id="venue_id_'.$venue_id.'">' . $html . $wrapper_end;
			$buffer = ob_get_contents();
			ob_end_clean();
			return $buffer;
	}
}
add_shortcode('ESPRESSO_VENUE', 'espresso_venue_details_sc');

if (!function_exists('espresso_venue_event_list_sc')) {
	function espresso_venue_event_list_sc($atts){
		global $wpdb;
		global $load_espresso_scripts;
		$load_espresso_scripts = true;//This tells the plugin to load the required scripts
		extract($atts);

		$sql = "SELECT e.*, ev.name venue_name
			FROM ".EVENTS_DETAIL_TABLE." e
			LEFT JOIN ".EVENTS_VENUE_REL_TABLE." vr ON e.id = vr.event_id
			LEFT JOIN ".EVENTS_VENUE_TABLE." ev ON vr.venue_id = ev.id WHERE ev.id = '".$id."' ";

		$wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;
		if ($num_rows > 0) {

			$name_before = isset($name_before) ? $name_before: '<p class="venue_name">';
			$name_after = isset($name_after) ? $name_after: '</p>';

			$venue_name = $wpdb->last_result[0]->venue_name;

			//template located in event_list_dsiplay.php
			ob_start();
			//echo $sql;
			echo $name_before.$venue_name.$name_after;
			event_espresso_get_event_details($sql, $css_class);
			$buffer = ob_get_contents();
			ob_end_clean();
			return $buffer;
		}else{
			return 'No events in this venue';
		}
	}
}
add_shortcode('ESPRESSO_VENUE_EVENTS', 'espresso_venue_event_list_sc');

function ee_show_meta_sc($atts){
	global $event_meta, $venue_meta, $all_meta;
		//echo '<p>event_meta = '.print_r($event_meta).'</p>';
	if (empty($atts))
		return;

	extract($atts);

	if (!isset($name))
		return;

	switch ($type){

		case 'venue':
		case 'venue_meta':
		default:
			return ee_show_meta($venue_meta, $name);

		case 'event':
		case 'event_meta':
			return ee_show_meta($event_meta, $name);

		case 'all':
		case 'all_meta':
		default:
			return ee_show_meta($all_meta, $name);
	}

}
add_shortcode('EE_META', 'ee_show_meta_Sc');

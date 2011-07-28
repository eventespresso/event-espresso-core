<?php 
function add_to_calendar(){
	global $wpdb, $current_user, $org_options;
	$event_id = $_REQUEST ['id'];
	
	 $results = $wpdb->get_results("SELECT * FROM " . get_option('events_detail_tbl') . " WHERE id =" . $event_id);

		foreach ($results as $result){
				$event_id = $result->id;
				$event_name = $result->event_name;
				$event_desc = $result->event_desc;
				$start_date = $result->start_date;
				$end_date = $result->end_date;
				$start_time = $result->start_time;
				$end_time = $result->end_time;
				$calendar_category = $_REQUEST['calendar_category'];
		$linky = home_url().'/?page_id=' . $org_options['event_page_id'] . '&regevent_action=register&event_id=' . $event_id . '&name_of_event=' . $event_name;
		
		$sql = "INSERT INTO " . WP_CALENDAR_TABLE . " SET event_title='" . mysql_escape_string($event_name)
	     . "', event_desc='" . mysql_escape_string($event_desc) . "', event_begin='" . mysql_escape_string($start_date) 
             . "', event_recur='S', event_repeats='0', event_end='" . mysql_escape_string($end_date) . "', event_time='" . mysql_escape_string($start_time) . "', event_author=".$current_user->ID.", event_category=".mysql_escape_string($calendar_category).", event_link='".mysql_escape_string($linky)."'";
	     }

	if ($wpdb->query($sql)){?>
		<div id="message" class="updated fade"><p><strong><?php _e('The event','event_espresso'); ?> <a href="<?php echo $_SERVER["REQUEST_URI"]?>#event-id-<?php echo $wpdb->insert_id;?>"><?php echo htmlentities2($event_name)?></a> <?php _e('has been added.','event_espresso'); ?></strong></p></div>
<?php }else { ?>
		<div id="message" class="error"><p><strong><?php _e('There was an error in your submission, please try again. The event was not saved!','event_espresso'); ?><?php print mysql_error() ?>.</strong></p></div>
<?php }
	}

	?>
<?php
//List Attendees Template
//Show a list of attendees using a shortcode
//[LISTATTENDEES]
//[LISTATTENDEES limit="30"]
//[LISTATTENDEES show_expired="false"]
//[LISTATTENDEES show_deleted="false"]
//[LISTATTENDEES show_secondary="false"]
//[LISTATTENDEES show_gravatar="true"]
//[LISTATTENDEES paid_only="true"]
//[LISTATTENDEES show_recurrence="false"]
//[LISTATTENDEES event_identifier="your_event_identifier"]
//[LISTATTENDEES category_identifier="your_category_identifier"]

//Please refer to this page for an updated lsit of shortcodes: http://eventespresso.com/forums/?p=592


/*Example CSS for your themes style sheet:

li.attendee_details{
	display:block;
	margin-bottom:20px;
	background: #ECECEC;
	border:#CCC 1px solid;
}
.espresso_attendee{
	width:400px;
	padding:5px;
}
.espresso_attendee img.avatar{
	float:left;
	padding:5px;
}
.clear{
	clear:both;
}
*/

//The following code displays your list of attendees.
//The processing for this function is managed in the shortcodes.php file.
if (!function_exists('event_espresso_show_attendess')) {
	function event_espresso_show_attendess($sql,$show_gravatar,$paid_only, $sort=''){
		//echo $sql;
		global $wpdb,$this_is_a_reg_page;
		$events = $wpdb->get_results($sql);
		foreach ($events as $event){
			$event_id = $event->id;
			$event_name = stripslashes_deep($event->event_name);
			if ($this_is_a_reg_page != TRUE){
				$event_desc = do_shortcode(stripslashes_deep($event->event_desc));
			}

			//This variable is only available using the espresso_event_status function which is loacted in the Custom Files Addon (http://eventespresso.com/download/plugins-and-addons/custom-files-addon/)
			$event_status = function_exists('espresso_event_status') ? ' - ' . espresso_event_status($event_id) : '';
			//Example usage in the event title:
			/*<h2><?php _e('Attendee Listing For: ','event_espresso'); ?><?php echo $event_name . ' - ' . $event_status?> </h2>*/
?>

<div class="event-display-boxes ui-widget">
 
		<h2 class="event_title ui-widget-header ui-corner-top">
	<?php _e('Attendee Listing For: ','event_espresso'); ?>
	<?php echo $event_name . $event_status?></h2>
	
		<div class="event-data-display ui-widget-content ui-corner-bottom">

	<!--<?php echo wpautop($event_desc); ?>-->
			<ol class="attendee_list">
<?php
	$a_sql = "SELECT * FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id='" . $event_id . "'";
	$a_sql .= $paid_only == 'true'? " AND (payment_status='Completed' OR payment_status='Pending') ":'';
	$a_sql .= $sort;
	//echo $a_sql;
	$attendees = $wpdb->get_results($a_sql);
	foreach ($attendees as $attendee){
		$id = $attendee->id;
		$lname = $attendee->lname;
		$fname = $attendee->fname;
		$city = $attendee->city;
		$state = $attendee->state;
		$country = $attendee->state;
		$email = $attendee->email;
		$gravatar = $show_gravatar == 'true'? get_avatar( $email, $size = '100', $default = 'http://www.gravatar.com/avatar/' ) : '';
		$city_state = $city != '' || $state != '' ? '<br />' . ($city != '' ? $city :'') . ($state != '' ? ', ' . $state :' ') :'';
		
		//These are examplel variables to show answers to questions
		//$custom_question_1 = '<br />'.do_shortcode('[EE_ANSWER q="12" a="'.$id.'"]');
		//$custom_question_2 = '<br />'.do_shortcode('[EE_ANSWER q="13" a="'.$id.'"]');

?>
				<li class="attendee_details"> <span class="espresso_attendee"><?php echo $gravatar ?><?php echo stripslashes_deep($fname . ' ' . $lname) . $city_state .'</p>'; ?> </span>
					<div class="clear"></div>
				</li>
<?php	
	} 
?>
			</ol>
	</div>
</div>
<?php
		}
	}
}



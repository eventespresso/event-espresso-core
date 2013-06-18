<?php
//List Attendees Template
//Show a list of attendees using a shortcode
//[LISTATTENDEES]
//[LISTATTENDEES limit="30"]
//[LISTATTENDEES paid_only="true"] //Show approved and fully paid registrations only
//[LISTATTENDEES show_expired="false"]
//[LISTATTENDEES show_deleted="false"]
//[LISTATTENDEES show_secondary="false"]
//[LISTATTENDEES show_gravatar="true"]
//[LISTATTENDEES paid_only="true"]
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
if ( ! function_exists( 'event_espresso_show_attendess' )) {
	function event_espresso_show_attendess( $SQL, $show_gravatar, $paid_only, $sort='' ){

		global $wpdb,$espresso_reg_page;
		// retrieve events
		$events = $wpdb->get_results( $SQL, OBJECT_K );
		// grab list of event IDs
		$EVT_IDs = array_keys( $events );
		// filter registrants based on REG status
		$where_cols_n_values = $paid_only == 'true' ? array( 'STS_ID' => EEM_Registration::status_id_approved ) : array();
		/// get all registrations for the above events
		$registrations = EEM_Registration::instance()->get_all_registrations_for_events( $EVT_IDs, $where_cols_n_values );		
		// couple of arrays for holding data
		$ATT_IDs = array();
		$event_attendees = array();
		// now loop thru all of our registrations
		foreach ( $registrations as $registration ) {
			// grab the attendee ID
			$ATT_ID = $registration->get( 'ATT_ID' );
			// save that to a list
			$ATT_IDs[] = $ATT_ID;
			// also save to a list organized by event
			$event_attendees[ $registration->get( 'EVT_ID' ) ][] = $ATT_ID;
		}
		// grab all of the attendee data for ALL of our registrations
		$all_attendees = EEM_Attendee::instance()->get_attendees_in_list( $ATT_IDs );
		// we're gonna need this
		$states = EEM_State::get_all_states();
		// now loop thru our events
		foreach ($events as $event){
			// grab sub-array of attendees for this event
			$attendees = isset( $event_attendees[ $event->id ] ) ? $event_attendees[ $event->id ] : array() ;
			// is there anybody out there ?
			if ( ! empty( $attendees )) {
				// we have attendees for this event so let's proceed
				$event_name = stripslashes( $event->event_name );
				$event_desc = ! $espresso_reg_page ? do_shortcode( stripslashes( $event->event_desc )) : '';
				//This variable is only available using the espresso_event_status function which is loacted in the Custom Files Addon (http://eventespresso.com/download/plugins-and-addons/custom-files-addon/)
				$event_status = function_exists('espresso_event_status') ? ' - ' . espresso_event_status( $event->id ) : '';
	?>

	<div class="event-display-boxes ui-widget">
		<h2 class="event_title ui-widget-header ui-corner-top"><?php echo __('Attendee Listing For: ','event_espresso') . $event_name . $event_status; ?></h2>
		<div class="event-data-display ui-widget-content ui-corner-bottom">
			<ol class="attendee_list">
			<?php
				foreach ( $attendees as $ATT_ID  ){
					$attendee = $all_attendees[ $ATT_ID ];
					$id = $attendee->ID();
					$attendee_name = $attendee->full_name();
					$city = $attendee->city();
					$state = $attendee->state();
					$country = $attendee->country_ISO();
					$email = $attendee->email();
					$gravatar = $show_gravatar == 'true'? get_avatar( $email, $size = '100', $default = 'http://www.gravatar.com/avatar/' ) : '';
					$city_state = ! empty( $city ) || ! empty( $state ) ? ' &nbsp;<span class="small-text lt-grey-text">of</span>&nbsp; ' . $city : '';
					$city_state .=   ! empty( $state ) ? ', ' . $state : '';
					//These are example variables to show answers to questions
					//$custom_question_1 = '<br />'.do_shortcode('[EE_ANSWER q="12" a="'.$id.'"]');
					//$custom_question_2 = '<br />'.do_shortcode('[EE_ANSWER q="13" a="'.$id.'"]');

	?>
				<li class="attendee_details">
					<span class="espresso_attendee"><?php echo $gravatar ?><?php echo '<b>' . $attendee_name . '</b>' . $city_state; ?> </span>
					<div class="clear"></div>
				</li>
	<?php } ?>
			</ol>
		</div>
	</div>
	<?php				
			}
		}
	}
}



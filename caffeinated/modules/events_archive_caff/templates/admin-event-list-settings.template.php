<?php
$values = EEH_Form_Fields::prep_answer_options( array(
	array( 'id' => 1, 'text' => __('Yes', 'event_espresso')),
	array( 'id' => 0, 'text' => __('No', 'event_espresso'))
));

$description = EEH_Form_Fields::prep_answer_options( array(
	array( 'id' => 0, 'text' => __('none', 'event_espresso')),
	array( 'id' => 1, 'text' => __('excerpt (short desc)', 'event_espresso')),
	array( 'id' => 2, 'text' => __('full description', 'event_espresso'))
));

add_filter( 'FHEE__EEH_Form_Fields__label_html', '__return_empty_string' ); 
?>


	<!--*************************   Event Listings  ****************************-->
	<h4 class="ee-admin-settings-hdr">
		<?php _e('Event List Pages', 'event_espresso'); ?>  <?php //echo EEH_Template::get_help_tab_link('event_list_settings_info');?>
	</h4>
	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label for="event_listings_url">
						<?php _e('Event Listings URL', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('event_listings_url_info');?>
					</label>
				</th>
				<td>
					<a id="event_listings_url" class="ee-admin-settings-hdr-lnk small-text" href="<?php echo home_url('/') . __('events', 'event_espresso'); ?>"><?php  echo home_url('/') . __('events', 'event_espresso'); ?></a>
				</td>
			</tr>

			<tr>
				<th>
					<label for="EED_Events_Archive_display_status_banner">
						<?php _e('Display Status Banner', 'event_espresso'); ?>
					</label>
				</th>
				<td>
				<?php echo EEH_Form_Fields::select( 'display_status_banner', $display_status_banner, $values, 'EED_Events_Archive_display_status_banner', 'EED_Events_Archive_display_status_banner' );?>
					<p class="description"><?php _e('Selecting "Yes" will inject an Event Status banner with the title whenever Events are displaying on the events archive page.', 'event_espresso'); ?></p>
				</td>
			</tr>

			<tr>
				<th>
					<label for="EED_Events_Archive_display_description">
						<?php _e('Display Description', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_description_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select( 'description', $display_description, $description, 'EED_Events_Archive_display_description', 'EED_Events_Archive_display_description' );?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="EED_Events_Archive_display_ticket_selector">
						<?php _e('Display Ticket Selector', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_ticket_selector_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select( 'ticket_selector', $display_ticket_selector, $values, 'EED_Events_Archive_display_ticket_selector', 'EED_Events_Archive_display_ticket_selector' );?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="EED_Events_Archive_display_datetimes">
						<?php _e('Display Datetimes', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_datetimes_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select( 'venue_details', $display_datetimes, $values, 'EED_Events_Archive_display_datetimes', 'EED_Events_Archive_display_datetimes' );?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="EED_Events_Archive_display_venue">
						<?php _e('Display Venue Details', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_venue_details_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select( 'display_venue', $display_venue, $values, 'EED_Events_Archive_display_venue', 'EED_Events_Archive_display_venue' );?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="EED_Events_Archive_display_expired_events">
						<?php _e('Display Expired Events', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_expired_events_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select( 'expired_events', $display_expired_events, $values, 'EED_Events_Archive_display_expired_events', 'EED_Events_Archive_display_expired_events' );?>
				</td>
			</tr>
			
		<tr>
			<th>
				<label for="EED_Events_Archive_reset_event_list_settings">
					<?php _e('Reset Event List Settings', 'event_espresso'); ?>
				</label>
			</th>
			<td>
				<?php echo EEH_Form_Fields::select( 'reset_event_list_settings', 0, $values, 'EED_Events_Archive_reset_event_list_settings', 'EED_Events_Archive_reset_event_list_settings' );?>
			</td>
		</tr>

	</tbody>
</table>

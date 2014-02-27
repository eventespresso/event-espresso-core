<?php
$values = array(
	array('id' => TRUE, 'text' => __('Yes', 'event_espresso')),
	array('id' => FALSE, 'text' => __('No', 'event_espresso'))
);
$description = array(
	array('id' => 0, 'text' => __('none', 'event_espresso')),
	array('id' => 1, 'text' => __('excerpt (short desc)', 'event_espresso')),
	array('id' => 2, 'text' => __('full description', 'event_espresso'))
);

?>

<!--*************************   Event Listings  ****************************-->
<h4 class="ee-admin-settings-hdr">
	<?php _e('Event List Pages', 'event_espresso'); ?>  <?php //echo EEH_Template::get_help_tab_link('event_list_settings_info');?>
</h4>
<table class="form-table">
	<tbody>

		<tr>
			<th>
				<label for="EED_Events_Archive_display_status_banner">
					<?php _e('Display Status Banner', 'event_espresso'); ?><?php echo EEH_Template::get_help_tab_link('display_status_banner');?>
				</label>
			</th>
			<td>
				<?php echo EEH_Form_Fields::select_input( 'EED_Events_Archive_display_status_banner', $values, $display_status_banner, 'id="EED_Events_Archive_display_status_banner"' ); ?>
				<p class="description"><?php _e('Selecting "Yes" will instruct Event Espresso to inject an Event Status banner with the title whenever Events are displaying on the event list page.', 'event_espresso'); ?></p>
			</td>
		</tr>

		<tr>
			<th>
				<label for="EED_Events_Archive_display_description">
				<?php _e('Display Descriptions', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_description_info');?>
				</label>
			</th>
			<td>
			<?php echo EEH_Form_Fields::select_input('EED_Events_Archive_display_description', $description, $display_description, 'id="EED_Events_Archive_display_description"'); ?>
			</td>
		</tr>

		<tr>
			<th>
				<label for="EED_Events_Archive_display_ticket_selector">
				<?php _e('Display Ticket Selector', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_ticket_selector_in_event_list');?>
				</label>
			</th> 
			<td>
				<?php echo EEH_Form_Fields::select_input('EED_Events_Archive_display_ticket_selector', $values, $display_ticket_selector, 'id="EED_Events_Archive_display_ticket_selector"'); ?>
			</td>
		</tr>

		<tr>
			<th>
				<label for="EED_Events_Archive_display_datetimes">
					<?php _e('Display Dates & Times', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_datetimes_in_event_list');?>
				</label>
			</th>
			<td>
				<?php echo EEH_Form_Fields::select_input('EED_Events_Archive_display_datetimes', $values, $display_datetimes, 'id="EED_Events_Archive_display_datetimes"'); ?>
			</td>
		</tr>

		<tr>
			<th>
				<label for="EED_Events_Archive_display_venue">
					<?php _e('Display Venue Details', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_venue_details_info');?>
				</label>
			</th>
			<td>
				<?php echo EEH_Form_Fields::select_input('EED_Events_Archive_display_venue', $values, $display_venue, 'id="EED_Events_Archive_display_venue"'); ?>
			</td>
		</tr>

		<tr>
			<th>
				<label for="EED_Events_Archive_display_expired_events">
					<?php _e('Display Expired Events', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_expired_events_info');?>
				</label>
			</th>
			<td>
				<?php echo EEH_Form_Fields::select_input('EED_Events_Archive_display_expired_events', $values, $display_expired_events, 'id="EED_Events_Archive_display_expired_events"'); ?>
			</td>
		</tr>
		
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
				<label for="reset_event_list_settings">
					<?php _e('Reset Event List Settings', 'event_espresso'); ?>
				</label>
			</th>
			<td>
				<?php echo EEH_Form_Fields::select_input( 'reset_event_list_settings', $values, FALSE, 'id="reset_event_list_settings"' ); ?>
			</td>
		</tr>

	</tbody>
</table>
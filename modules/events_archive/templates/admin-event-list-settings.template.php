<?php
$values = EEH_Form_Fields::prep_answer_options( array(
	array( 'id' => TRUE, 'text' => __('Yes', 'event_espresso')),
	array( 'id' => FALSE, 'text' => __('No', 'event_espresso'))
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
					<label for="display_description_in_event_list">
						<?php _e('Display Descriptions', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_description_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select( 'description', $display_description, $description, 'display_description_in_event_list', 'display_description_in_event_list', '', FALSE, '', '', TRUE );?>
					<p class="description"><?php _e('This option has been tempoarily disabled, but is fixed in the upcoming EE 4.2 release', 'event_espresso'); ?></p>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_address_in_event_list">
						<?php _e('Display Address', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_address_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select( 'address', $display_address, $values, 'display_address_in_event_list', 'display_address_in_event_list', '', FALSE, '', '', TRUE );?>
					<p class="description"><?php _e('This option has been tempoarily disabled, but is fixed in the upcoming EE 4.2 release', 'event_espresso'); ?></p>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_venue_details_in_event_list">
						<?php _e('Display Venue Details', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_venue_details_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select( 'venue_details', $display_venue_details, $values, 'display_venue_details_in_event_list', 'display_venue_details_in_event_list', '', FALSE, '', '', TRUE );?>
					<p class="description"><?php _e('This option has been tempoarily disabled, but is fixed in the upcoming EE 4.2 release', 'event_espresso'); ?></p>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_expired_events">
						<?php _e('Display Expired Events', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_expired_events_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select( 'expired_events', $display_expired_events, $values, 'display_expired_events', 'display_expired_events', '', FALSE, '', '', TRUE );?>
					<p class="description"><?php _e('This option has been tempoarily disabled, but is fixed in the upcoming EE 4.2 release', 'event_espresso'); ?></p>
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
					<label for="display_status_banner">
						<?php _e('Display Status Banner', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select( 'status_banner', $display_status_banner, $values, 'display_status_banner', 'display_status_banner', '', FALSE, '', '', FALSE );?>
					<p class="description"><?php _e('Selecting "Yes" will instruct Event Espresso to inject an Event Status banner with the title whenever Events are displaying on the event list page.', 'event_espresso'); ?></p>
				</td>
			</tr>

			<tr>
				<th>
					<label for="reset_event_list_settings">
						<?php _e('Reset Event List Settings', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select( 'reset_event_list_settings', FALSE, $values, 'reset_event_list_settings', 'reset_event_list_settings' );?>
				</td>
			</tr>

		</tbody>
	</table>
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
$event_list_types = array(
	array('id' => 'grid', 'text' => __('Grid View', 'event_espresso')),
	array('id' => 'text', 'text' => __('Text List', 'event_espresso')),
	array('id' => 'dates', 'text' => __('Dates List', 'event_espresso'))
);
$grid_sizes = array(
	array('id' => 'tiny', 'text' => __('tiny (up to 7 per row)', 'event_espresso')),
	array('id' => 'small', 'text' => __('small (up to 6 per row)', 'event_espresso')),
	array('id' => 'medium', 'text' => __('medium (up to 5 per row)', 'event_espresso')),
	array('id' => 'large', 'text' => __('large (up to 4 per row)', 'event_espresso')),
	array('id' => 'huge', 'text' => __('huge (up to 3 per row)', 'event_espresso'))
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
					<label for="default_type">
						<?php _e('Default Event List Type', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('template_settings_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('default_type', $event_list_types, $default_type, 'id="default_type"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="event_list_grid_size">
						<?php _e('Grid Size', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('grid_size_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('event_list_grid_size', $grid_sizes, $event_list_grid_size, 'id="event_list_grid_size"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_description_in_event_list">
						<?php _e('Display Descriptions', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_description_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('display_description_in_event_list', $description, $display_description, 'id="display_description_in_event_list"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_address_in_event_list">
						<?php _e('Display Address', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_address_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('display_address_in_event_list', $values, $display_address, 'id="display_address_in_event_list"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_venue_details_in_event_list">
						<?php _e('Display Venue Details', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_venue_details_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('display_venue_details_in_event_list', $values, $display_venue_details, 'id="display_venue_details_in_event_list"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_expired_events">
						<?php _e('Display Expired Events', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_expired_events_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('display_expired_events', $values, $display_expired_events, 'id="display_expired_events"'); ?>
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
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
	array('id' => 'tiny', 'text' => __('tiny (up to 6 per row)', 'event_espresso')),
	array('id' => 'small', 'text' => __('small (up to 5 per row)', 'event_espresso')),
	array('id' => 'med', 'text' => __('medium (up to 4 per row)', 'event_espresso')),
	array('id' => 'large', 'text' => __('large (up to 3 per row)', 'event_espresso'))
);
?>

	<!--*************************   Event Listings  ****************************-->

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Event Listings', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label for="default_type">
						<?php _e('Default Event List Type', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('default_type', $event_list_types, $default_type, 'id="default_type"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="event_list_grid_size">
						<?php _e('Grid Size', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('event_list_grid_size', $grid_sizes, $event_list_grid_size, 'id="event_list_grid_size"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_description_in_event_list">
						<?php _e('Display Descriptions', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('display_description_in_event_list', $description, $display_description, 'id="display_description_in_event_list"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_address_in_event_list">
						<?php _e('Display Address', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('display_address_in_event_list', $values, $display_address, 'id="display_address_in_event_list"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_venue_in_event_list">
						<?php _e('Display Venue Details', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('display_venue_in_event_list', $values, $display_venue, 'id="display_venue_in_event_list"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_expired_events">
						<?php _e('Display Expired Events', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('display_expired_events', $values, $display_expired_events, 'id="display_expired_events"'); ?>
				</td>
			</tr>

		</tbody>
	</table>
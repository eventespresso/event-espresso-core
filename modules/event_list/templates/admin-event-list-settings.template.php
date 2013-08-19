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
		<?php _e('Event Listings', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label for="display_description_in_event_list">
						<?php _e('Display Descriptions', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('display_description_in_event_list', $description, $display_description, 'id="display_description_in_event_list"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_address_in_event_list">
						<?php _e('Display Address', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('display_address_in_event_list', $values, $display_address, 'id="display_address_in_event_list"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_venue_in_event_list">
						<?php _e('Display Venue Details', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('display_venue_in_event_list', $values, $display_venue, 'id="display_venue_in_event_list"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_expired_events">
						<?php _e('Display Expired Events', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('display_expired_events', $values, $display_expired_events, 'id="display_expired_events"'); ?>
				</td>
			</tr>

		</tbody>
	</table>
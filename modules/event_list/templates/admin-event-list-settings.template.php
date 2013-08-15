<?php
$values = array(
	array('id' => TRUE, 'text' => __('Yes', 'event_espresso')),
	array('id' => FALSE, 'text' => __('No', 'event_espresso'))
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
					<?php echo EE_Form_Fields::select_input('display_description_in_event_list', $values, $display_description, 'id="display_description_in_event_list"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_short_description_in_event_list">
						<?php _e('Use SHORT Descriptions', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('display_short_description_in_event_list', $values, $display_exceprt, 'id="display_short_description_in_event_list"'); ?>
					<p class="description">
						<?php _e('Be sure to use the more... tag in your event description', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_address_in_event_list">
						<?php _e('Display Addresses', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('display_address_in_event_list', $values, $display_address, 'id="display_address_in_event_list"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_venue_in_event_list">
						<?php _e('Display Venue', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('display_venue_in_event_list', $values, $display_venue, 'id="display_venue_in_event_list"'); ?>
				</td>
			</tr>

		</tbody>
	</table>
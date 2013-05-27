<div class="padding">

	<!--*************************   Event Listings  ****************************-->

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Event Listings', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<td colspan="2">
					<strong>
						<?php _e('Event Listings', 'event_espresso'); ?>
					</strong>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_description_in_event_list">
						<?php _e('Display Descriptions', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('display_description_in_event_list', $values, $template_settings['display_description_in_event_list'], 'id="display_description_in_event_list"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_short_description_in_event_list">
						<?php _e('Use SHORT Descriptions', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('display_short_description_in_event_list', $values, $template_settings['display_short_description_in_event_list'], 'id="display_short_description_in_event_list"'); ?>
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
					<?php echo EE_Form_Fields::select_input('display_address_in_event_list', $values, $template_settings['display_address_in_event_list'], 'id="display_address_in_event_list"'); ?>
				</td>
			</tr>

		</tbody>
	</table>

	<!--*************************   Registration Pages   ****************************-->

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Registration Pages', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label for="display_address_in_regform">
						<?php _e('Display Addresses', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('display_address_in_regform', $values, $template_settings['display_address_in_regform'], 'id="display_address_in_regform"'); ?>
					<p class="description">
						<?php _e('Do not use this if you are using the venue shortcodes in your event description.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

		</tbody>
	</table>

</div>
<?php
$values = array(
	array('id' => TRUE, 'text' => __('Yes', 'event_espresso')),
	array('id' => FALSE, 'text' => __('No', 'event_espresso'))
);
$display_order_values = array(
	array('id' => 0, 'text' => 1),
	array('id' => 1, 'text' => 2),
	array('id' => 2, 'text' => 3),

);
?>

	<!--*************************   Event Single  ****************************-->
	
	<h4 class="ee-admin-settings-hdr">
		<?php _e('Single Event Pages', 'event_espresso'); ?>  <?php //echo EEH_Template::get_help_tab_link('event_single_settings_info');?>
	</h4>
	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="display_status_banner_single">
						<?php _e('Display Status Banner', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input( 'display_status_banner_single', $values, $display_status_banner_single, 'id="display_status_banner_single"' ); ?>
					<p class="description"><?php _e('Selecting "Yes" will inject an Event Status banner with the title whenever Events are displaying on the single event page.', 'event_espresso'); ?></p>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_venue">
						<?php _e('Display Venue Details', 'event_espresso'); ?><?php echo EEH_Template::get_help_tab_link('display_addresses_in_reg_form_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input( 'display_venue', $values, $display_venue, 'id="display_venue"' ); ?>
					<p class="description"><?php _e('Do not use this if you are using the venue shortcodes in your event description.', 'event_espresso'); ?></p>
				</td>
			</tr>
			<tr>
				<th>		
					<?php _e('Display Order', 'event_espresso'); ?><?php echo EEH_Template::get_help_tab_link('display_addresses_in_reg_form_info');?>
				</th>
				<td>
					<p>
						<?php echo EEH_Form_Fields::select_input( 'display_order_tickets', $display_order_values, $display_order_tickets, 'id="display_order_tickets"' ); ?>
						<label for="display_order_tickets">
						<?php _e('Tickets Display Order', 'event_espresso'); ?>
						</label>
						
					</p>
					<p>
						<?php echo EEH_Form_Fields::select_input( 'display_order_datetimes', $display_order_values, $display_order_datetimes, 'id="display_order_datetimes"' ); ?>
						<label for="display_order_datetimes">
						<?php _e('Datetime Display Order', 'event_espresso'); ?>
						</label>
						
					</p>
					<p>
						<?php echo EEH_Form_Fields::select_input( 'display_order_venue', $display_order_values, $display_order_venue, 'id="display_order_venue"' ); ?>
						<label for="display_order_venue">
						<?php _e('Venue Display Order', 'event_espresso'); ?>
						</label>
						
					</p>
					<p class="description"><?php _e('Use these settings to determine the display order of the ticket selector, datetime(s), and venue on the single event page.', 'event_espresso'); ?></p>

				</td>
			</tr>

		</tbody>
	</table>
<?php
$values = array(
	array('id' => TRUE, 'text' => __('Yes', 'event_espresso')),
	array('id' => FALSE, 'text' => __('No', 'event_espresso'))
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
					<p class="description"><?php _e('Selecting "Yes" will instruct Event Espresso to inject an Event Status banner with the title whenever Events are displaying on the single event page.', 'event_espresso'); ?></p>
				</td>
			</tr>

		</tbody>
	</table>
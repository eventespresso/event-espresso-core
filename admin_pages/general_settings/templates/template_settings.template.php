<div class="padding">

	<?php do_action( 'AHEE__template_settings__template__before_settings_form' ); ?>

	<!--*************************   Registration Pages   ****************************-->

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Registration Pages', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label for="display_address_in_regform">
						<?php _e('Display Addresses', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('display_addresses_in_reg_form_info');?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('display_address_in_regform', $values, $display_address_in_regform, 'id="display_address_in_regform"'); ?>
					<p class="description">
						<?php _e('Do not use this if you are using the venue shortcodes in your event description.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

		</tbody>
	</table>

</div>
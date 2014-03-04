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
					<?php $values = EEH_Form_Fields::prep_answer_options( $values );?>
					<?php echo EEH_Form_Fields::select( 'display_address', $display_address_in_regform, $values, 'display_address_in_regform', 'display_address_in_regform', '', FALSE, '', '', TRUE );?>
					<p class="description"><?php _e('This option has been tempoarily disabled, but is fixed in the upcoming EE 4.2 release', 'event_espresso'); ?></p>
				</td>
			</tr>

		</tbody>
	</table>

</div>
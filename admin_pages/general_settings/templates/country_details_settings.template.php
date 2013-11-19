	<table id="general-setting-country-details-tbl" class="form-table">
		<tbody>
		<?php 
		foreach ( $inputs as $ID => $input ) { 
			echo EEH_Form_Fields::generate_form_input( $input ); 
		 }
		?>
			<tr>
				<th></th>
				<td><br/><input id="country_settings_save_2" class="button-primary save" type="submit" name="save" value="<?php _e('Save Country Details', 'event_espresso'); ?>"></td>
			</tr>
		</tbody>
	</table>

	<table id="general-setting-country-states-tbl" class="form-table">
		<thead>
			<tr>
				<th><?php _e( 'Code', 'event_espresso' );?></th>
				<th><?php _e( 'Name', 'event_espresso' );?></th>
				<th colspan="2"><span class="small-text"><?php _e( 'State Appears in<br/>Dropdown Select Lists ', 'event_espresso' );?></span></th>
			</tr>
		</thead>
		<tbody>
		<?php
		//EEH_Debug_Tools::printr( $states, '$states  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		if ( $states ) {
			foreach ( $states as $STA_ID => $state ) {
		?>
			<tr id="state-<?php echo $STA_ID; ?>-tr" class="country-state-columns">
			<?php
				foreach ( $state['inputs'] as $ID => $input ) {
					if ( $ID != 'STA_ID' && $ID != 'CNT_ISO' ) {
						echo EEH_Form_Fields::generate_form_input( $input );
					}
				 }
			 ?>
				<td class="delete-state-td">
					<a id="delete-state-<?php echo $STA_ID; ?>-lnk" class="dashicons dashicons-post-trash ee-icon-size-20 delete-state-lnk" rel="<?php echo $STA_ID; ?>" title="<?php esc_attr_e( 'Delete State #', 'event_espresso' ); ?><?php echo $STA_ID; ?>?" href="<?php echo $state['delete_state_url']; ?>"></a>
				</td>
			</tr>
		<?php
			}
		?>
		</tbody>
	</table>
		<br />
		<input id="country_settings_save3" class="button-primary save right" type="submit" name="save" value="<?php _e('Save States/Provinces', 'event_espresso'); ?>"/><br />

	<?php
		}
	?>
	<table class="form-table add-new-state-tbl">
		<tbody>
			<tr>
				<td colspan="2"><h4><?php _e( 'Add New State/Province', 'event_espresso' );?></h4></td>
			</tr>

			<tr>
				<td class="general-settings-country-state-input-td">
					<label for="STA_abbrev_XXX"><?php _e( 'Code', 'event_espresso' );?></label><br />
					<input id="STA_abbrev-XXX" class="STA_abbrev mid-text " type="text" title="" value=""
						   name="STA_abbrev_XXX">
				</td>
				<td class="general-settings-country-state-input-td">
					<label for="STA_name_XXX"><?php _e( 'Name', 'event_espresso' );?></label><br/>
					<input id="STA_name-XXX" class="STA_name regular-text " type="text" title="" value="" name="STA_name_XXX">
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<input  type="submit" id="add-new-state-btn" class="secondary-button button right" value="<?php _e( 'Add New State/Province', 'event_espresso' );?>" />

				</td>
			</tr>

		</tbody>
	</table>

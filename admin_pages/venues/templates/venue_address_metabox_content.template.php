<table class="form-table">
	<tr>
		<td valign="top">
			<fieldset>
				<p>
					<label for="phys-addr"><?php _e('Address:', 'event_espresso'); ?></label><br/>
					<input class="all-options" id="phys-addr" type="text"  value="<?php echo $_venue->address(); ?>" name="vnu_address" />
				</p>
				<p>
					<label for="phys-addr-2"><?php _e('Address 2:', 'event_espresso'); ?></label><br/>
					<input class="all-options" id="phys-addr-2" type="text"  value="<?php echo $_venue->address2(); ?>" name="vnu_address2" />
				</p>
				<p>
					<label for="phys-city"><?php _e('City:', 'event_espresso'); ?></label><br/>
					<input class="all-options" id="phys-city" type="text"  value="<?php echo $_venue->city(); ?>" name="vnu_city" />
				</p>
				<p>
					<?php echo $states_dropdown; ?>
				</p>
				<p>
					<label for="zip-postal"><?php _e('Zip/Postal Code:', 'event_espresso'); ?></label><br/>
					<input class="all-options" id="zip-postal" type="text"  value="<?php echo $_venue->zip(); ?>" name="vnu_zip" />
				</p>
				<p>
					<?php echo $countries_dropdown; ?>
				</p>
			</fieldset>
		</td>
	</tr>
</table>
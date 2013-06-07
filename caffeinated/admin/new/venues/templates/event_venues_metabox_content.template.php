<table class="form-table">
	<tr>

		<td valign="top" class="manual-venue">
				<h4>
					<?php _e('Venue Information', 'event_espresso'); ?>
				</h4>
				<p>
					<label for="ven-title"><?php _e('Title:', 'event_espresso'); ?></label><br/>
					<input size="20"id="ven-title" tabindex="106"  type="text"  value="<?php echo $_venue->name() ?>" name="venue_title" />
				</p>
				<p>
					<label for="ven-website"><?php _e('Website:', 'event_espresso'); ?></label><br/>
					<input size="20" id="ven-website" tabindex="107"  type="text"  value="<?php echo stripslashes_deep($_venue->venue_url()) ?>" name="venue_url" />
				</p>
				<p>
					<label for="ven-phone"><?php _e('Phone:', 'event_espresso'); ?></label><br/>
					<input size="20" id="ven-phone" tabindex="108"  type="text"  value="<?php echo stripslashes_deep($_venue->phone()) ?>" name="venue_phone" />
				</p>
				<p>
					<label for="ven-image"><?php _e('Image:', 'event_espresso'); ?></label><br/>
					<input size="20" id="ven-image" tabindex="110"  type="text"  value="<?php echo stripslashes_deep($_venue->feature_image()) ?>" name="venue_image" />
				</p>
		</td>
		
		<td valign="top" class="manual-venue">
			<fieldset>
				<h4><?php _e('Physical Location', 'event_espresso'); ?></h4>
				<p>
					<label for="phys-addr"><?php _e('Address:', 'event_espresso'); ?></label><br/>
					<input size="20" id="phys-addr" tabindex="100"  type="text"  value="<?php echo $_venue->address(); ?>" name="address" />
				</p>
				<p>
					<label for="phys-addr-2"><?php _e('Address 2:', 'event_espresso'); ?></label><br/>
					<input size="20" id="phys-addr-2" tabindex="101"  type="text"  value="<?php echo $_venue->address2(); ?>" name="address2" />
				</p>
				<p>
					<label for="phys-city"><?php _e('City:', 'event_espresso'); ?></label><br/>
					<input size="20" id="phys-city" tabindex="102"  type="text"  value="<?php echo $_venue->city(); ?>" name="city" />
				</p>
				<p>
					<label for="phys-state"><?php _e('State:', 'event_espresso'); ?></label><br/>
					<input size="20" id="phys-state" tabindex="103"  type="text"  value="<?php echo $_venue->state_obj()->name(); ?>" name="state" />
				</p>
				<p>
					<label for="phys-country"><?php _e('Country:', 'event_espresso'); ?></label><br/>
					<input size="20" id="phys-country" tabindex="105"  type="text"  value="<?php echo $_venue->country_obj()->name(); ?>" name="country" />
				</p>
				<p>
					<label for="zip-postal"><?php _e('Zip/Postal Code:', 'event_espresso'); ?></label><br/>
					<input size="20" id="zip-postal"  tabindex="104"  type="text"  value="<?php echo $_venue->zip(); ?>" name="zip" />
				</p>
				
				<p>
					<?php _e('Google Map Link (for email):', 'event_espresso'); ?>
					<?php echo $_venue->google_map_link(); ?> 
				</p>

				<?php if( isset( $org_options['map_settings'] ) && isset( $org_options['map_settings']['use_google_maps'] ) && $org_options['map_settings']['use_google_maps'] ) { ?>
				<p>
					<label for="enable_for_gmap">
						<?php _e('Display Google Map for this venue? ', 'event_espresso') ?>
					</label>
					<?php echo $enable_for_gmap; ?> 
				</p>
				<?php } ?>
			</fieldset>
		</td>
			
		<td valign="top" class="manual-venue">
			<fieldset id="virt-location">
				<h4>
					<?php _e('Virtual Location', 'event_espresso'); ?>
				</h4>
				<p>
					<label for="virt-phone" style="display:inline-block; width:100px;">
						<?php _e('Phone:', 'event_espresso'); ?>
					</label>
					<input size="20" id="virt-phone" type="text" tabindex="111" value="<?php echo $_venue->phone(); ?>" name="venue_phone" />
				</p>
				<p>
					<label for="url-event" style="display:inline-block; width:100px; vertical-align:top;">
						<?php _e('URL of Event:', 'event_espresso'); ?>
					</label>
					<textarea id="url-event" cols="30" rows="4" tabindex="112"  name="virtual_url"><?php echo $_venue->virtual_url(); ?></textarea>
				</p>
				<p>
					<label for="call-in-num" style="display:inline-block; width:100px;">
						<?php _e('Call in Number:', 'event_espresso'); ?>
					</label>
					<input id="call-in-num" size="20" tabindex="113"  type="text"  value="<?php echo $_venue->virtual_phone(); ?>" name="virtual_phone" />
				</p>
			</fieldset>
		</td>
		
	</tr>
</table>

<?php if( ! isset( $org_options['map_settings'] ) || ! isset( $org_options['map_settings']['use_google_maps'] ) || ! $org_options['map_settings']['use_google_maps'] ) { ?>
<p class="ee-notice">
	<?php
		echo sprintf( 
			__('To display a Google Map for event venues, go to %sEvent Espresso General Settings%sGoogle Maps%s, and set "Activate Google Maps" to "Yes"', 'event_espresso' ),
			'<b>',
			'</b> &raquo; <b>',
			'</b>'
		); 
	?>
</p>						
<?php } ?>
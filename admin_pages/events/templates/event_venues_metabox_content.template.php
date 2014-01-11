<table class="form-table">
	<tr>

		<td valign="top" class="manual-venue">
				<h4>
					<?php _e('Venue Information', 'event_espresso'); ?>
				</h4>
				<input type="hidden" id="venue-id" name="venue_id" value="<?php echo $_venue->ID(); ?>" />
				<p>
					<label for="ven-title"><?php _e('Title:', 'event_espresso'); ?></label><br/>
					<input size="20"id="ven-title" type="text"  value="<?php echo $_venue->name() ?>" name="venue_title" />
				</p>
				<p>
					<label for="ven-website"><?php _e('Website:', 'event_espresso'); ?></label><br/>
					<input size="20" id="ven-website" type="text"  value="<?php echo stripslashes_deep($_venue->venue_url()) ?>" name="venue_url" />
				</p>
				<p>
					<label for="ven-phone"><?php _e('Phone:', 'event_espresso'); ?></label><br/>
					<input size="20" id="ven-phone" type="text" name="venue_phone" value="<?php echo $_venue->phone(); ?>" />
				</p>
				<hr />
				<p><?php _e('Venues are only saved with events if there is a Venue title present.', 'event_espresso'); ?></p>
		</td>
		
		<td valign="top" class="manual-venue">
			<fieldset>
				<h4><?php _e('Physical Location', 'event_espresso'); ?></h4>
				<p>
					<label for="phys-addr"><?php _e('Address:', 'event_espresso'); ?></label><br/>
					<input size="20" id="phys-addr" type="text"  value="<?php echo $_venue->address(); ?>" name="address" />
				</p>
				<p>
					<label for="phys-addr-2"><?php _e('Address 2:', 'event_espresso'); ?></label><br/>
					<input size="20" id="phys-addr-2" type="text"  value="<?php echo $_venue->address2(); ?>" name="address2" />
				</p>
				<p>
					<label for="phys-city"><?php _e('City:', 'event_espresso'); ?></label><br/>
					<input size="20" id="phys-city" type="text"  value="<?php echo $_venue->city(); ?>" name="city" />
				</p>
				<p>
					<?php echo $states_dropdown; ?>
				</p>
				<p>
					<?php echo $countries_dropdown; ?>
				</p>
				<p>
					<label for="zip-postal"><?php _e('Zip/Postal Code:', 'event_espresso'); ?></label><br/>
					<input size="20" id="zip-postal" type="text"  value="<?php echo $_venue->zip(); ?>" name="zip" />
				</p>
			</fieldset>
		</td>
			
		<td valign="top" class="manual-venue">
			<fieldset id="virt-location">
				<h4>
					<?php _e('Virtual Location', 'event_espresso'); ?>
				</h4>
				<p>
					<label for="url-event" style="display:inline-block; width:100px; vertical-align:top;">
						<?php _e('URL of Event:', 'event_espresso'); ?>
					</label>
					<textarea id="url-event" cols="30" rows="4" name="virtual_url"><?php echo $_venue->virtual_url(); ?></textarea>
				</p>
				<p>
					<label for="call-in-num" style="display:inline-block; width:100px;">
						<?php _e('Call in Number:', 'event_espresso'); ?>
					</label>
					<input id="call-in-num" size="20" type="text"  value="<?php echo $_venue->virtual_phone(); ?>" name="virtual_phone" />
				</p>
			</fieldset>
		</td>
		
	</tr>
</table>
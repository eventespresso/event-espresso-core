<table class="form-table">
	<tr>
		<td valign="top">
			<fieldset>
				<p>
					<label for="url-event" style="display:inline-block; width:100px; vertical-align:top;">
						<?php _e('URL of Event:', 'event_espresso'); ?>
					</label>
					<textarea id="url-event" cols="30" rows="4" tabindex="112"  name="vnu_virtual_url"><?php echo $_venue->virtual_url(); ?></textarea>
				</p>
				<p>
					<label for="call-in-num" style="display:inline-block; width:100px;">
						<?php _e('Call in Number:', 'event_espresso'); ?>
					</label>
					<input id="call-in-num" class="all-options" tabindex="113"  type="text"  value="<?php echo $_venue->virtual_phone(); ?>" name="vnu_virtual_phone" />
				</p>
			</fieldset>
		</td>
	</tr>
</table>
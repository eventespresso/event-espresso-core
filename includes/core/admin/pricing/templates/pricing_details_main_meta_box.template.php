<div style="padding:1em;">	
	<form id="price-form" method="post" action="<?php echo $edit_event_price_form_url; ?>">
		<?php wp_nonce_field( $action . '_nonce' ); ?>
		<?php if ( $action == 'update_event_price' ) : ?>
		<input type="hidden" name="PRC_ID" value="<?php echo $PRC_ID; ?>">
		<?php endif; ?>
		<input type="hidden" name="PRC_disc_code" value="<?php echo $price->disc_code(); ?>">
		<input type="hidden" name="PRC_disc_limit_qty" value="<?php echo $price->disc_limit_qty(); ?>">
		<input type="hidden" name="PRC_disc_qty" value="<?php echo $price->disc_qty(); ?>">
		<input type="hidden" name="PRC_disc_apply_all" value="<?php echo $price->disc_apply_all(); ?>">
		<input type="hidden" name="PRC_disc_wp_user" value="<?php echo $price->disc_wp_user(); ?>">
	
		<table class="form-table">
			<tbody>
				<tr valign="top">
					<th><label for="PRT_ID"><?php _e('Type', 'event_espresso'); ?></label></th>
					<td>
						<?php echo select_input('PRT_ID', $price_types, $price->type(), 'id="PRT_ID"'); ?>
						<span class="description"><?php _e('Whether this is an Event Price, Discount, Surcharge, or Tax. Default items will apply to ALL new events you create.', 'event_espresso'); ?></span>
					</td>
				</tr>
				<tr valign="top">
					<th><label for="PRC_name"><?php _e('Name', 'event_espresso'); ?></label></th>
					<td>
						<input class="regular-text" type="text" id="PRC_name" name="PRC_name" value="<?php echo html_entity_decode( stripslashes( $price->name() ), ENT_QUOTES, 'UTF-8' ); ?>"/>
						<span class="description"><?php _e('The name that site visitors will see for this Price.', 'event_espresso'); ?></span>
					</td>
				</tr>
				<tr valign="top">
					<th><label for="PRC_desc"><?php _e('Description', 'event_espresso'); ?></label></th>
					<td>
						<textarea class="regular-text" type="text" id="PRC_desc" name="PRC_desc" cols="70" rows="1" ><?php
						 echo html_entity_decode( stripslashes( $price->desc() ), ENT_QUOTES, 'UTF-8' ); 
						?></textarea><br/>
						<span class="description"><?php _e('A brief description for this Price. More for your benefit, as it is currently not displayed to site visitors.', 'event_espresso'); ?></span>
					</td>							
				</tr>
				<tr valign="top">
					<th><label for="PRC_amount"><?php _e('Amount', 'event_espresso'); ?></label></th>
					<td>
						<input class="small-text" type="text" id="PRC_amount" name="PRC_amount" value="<?php echo $price->amount(); ?>"/>
						<span class="description"><?php _e('The dollar or percentage amount for this Price.', 'event_espresso'); ?></span>
					</td>
				</tr>
				<tr valign="top">
					<th><label for="PRC_disc_code"><?php _e('Discount Code', 'event_espresso'); ?></label></th>
					<td>
						<input class="regular-text" type="text" id="PRC_disc_code" name="PRC_disc_code"  value="<?php echo $price->disc_code(); ?>"/>
						<span class="description"><?php _e('If this is a global discount code, enter the code here. For discount codes applicable to single events, see the Promotional Codes Event Espresso admin screen.','event_espresso'); ?></span>
					</td>
				</tr>
				<tr valign="top">
					<th><label><?php _e('Triggered by Date', 'event_espresso'); ?></label></th>
					<td>
						<?php $yes_checked = $price->use_dates() ? ' checked="checked"' : ''; ?>
						<label style="margin-right:15px;">
							<input type="radio" name="PRC_use_dates" value="1"<?php echo $yes_checked;?> style="margin-right:5px;">
							<?php _e('Yes', 'event_espresso');?>
						</label>
						<?php $no_checked = $price->use_dates() ? '' : ' checked="checked"'; ?>
						<label style="margin-right:15px;">
						<input type="radio" name="PRC_use_dates" value="0"<?php echo $no_checked;?> style="margin-right:5px;">
						<?php _e('No', 'event_espresso');?>
						</label>
						<span class="description"><?php _e( sprintf( 'If set to "Yes", then when editing an Event in the %sEvent Editor%s you will be able to set the dates for when this price will become active / inactive.', '<a href="' .  admin_url( 'admin.php?page=events' ) . '" title="Go to the Events Overview List to choose an Event to edit">', '</a>' ), 'event_espresso'); ?></span>
					</td>
				</tr>
				<tr valign="top">
					<th><label><?php _e('Active', 'event_espresso'); ?></label></th>
					<td>
						<?php $yes_checked = $price->is_active() ? ' checked="checked"' : ''; ?>
						<label style="margin-right:15px;"><input type="radio" name="PRC_is_active" value="1"<?php echo $yes_checked;?> style="margin-right:5px;"><?php _e('Yes', 'event_espresso');?></label>
						<?php $no_checked = $price->is_active() ? '' : ' checked="checked"'; ?>
						<label style="margin-right:15px;"><input type="radio" name="PRC_is_active" value="0"<?php echo $no_checked;?> style="margin-right:5px;"><?php _e('No', 'event_espresso');?></label>
						<span class="description"><?php _e('Whether this Price is currently being used and displayed on the site.', 'event_espresso'); ?></span>
					</td>
				</tr>
			</tbody>
		</table>
	
		<div id="publishing-action">
			<?php echo $learn_more_about_pricing_link; ?>
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Changes'); ?>" id="add_new_price" />
		</div>
		<div class="clear"></div>
	
	</form>
</div>
<div style="padding:1em;">	
	<form id="price-type-form" method="post" action="<?php echo $edit_event_price_type_form_url; ?>">
		<?php wp_nonce_field( $action . '_nonce' ); ?>
		<?php if ($action == 'update_event_price_type') : ?>
		<input type="hidden" name="PRT_ID" value="<?php echo $PRT_ID; ?>">
		<?php endif; ?>
		<table class="form-table">
			<tbody>
				<tr>
					<th>
						<label for="basic_type"><?php _e('Basic Type', 'event_espresso'); ?></label>
					</th>
					<td>
						<?php echo $base_type_select; ?><br/>
						<span class="description"><?php _e('Choosing a basic type allows us to quickly configure a bunch of other options for you.<br/>All events need to have at least one Base Price type option.<br/>Discounts reduce the price of an event, Surcharges increase the price.<br/>Taxes are applied to the final total.', 'event_espresso'); ?></span>
					</td>
				</tr>
				<tr>
					<th>
						<label for="PRT_name"><?php _e('Price Type Name', 'event_espresso'); ?></label>
					</th>
					<td>
						<input class="regular-text" type="text" id="PRT_name" name="PRT_name" value="<?php echo html_entity_decode( stripslashes( $price_type->name() ), ENT_QUOTES, 'UTF-8' ); ?>"/>
						<span class="description"><?php _e('A name for this Price Type.', 'event_espresso'); ?></span>
					</td>
				</tr>
				<tr>
					<th>
						<label><?php _e('Apply to Members Only', 'event_espresso'); ?></label>
					</th>
					<td>
						<?php $yes_checked = $price_type->is_member() ? ' checked="checked"' : ''; ?>
						<label style="margin-right:15px;"><input type="radio" name="PRT_is_member" value="1"<?php echo $yes_checked;?> style="margin-right:5px;">
							<?php _e('Yes', 'event_espresso');?>
						</label>
						<?php $no_checked = $price_type->is_member() ? '' : ' checked="checked"'; ?>
						<label style="margin-right:15px;"><input type="radio" name="PRT_is_member" value="0"<?php echo $no_checked;?> style="margin-right:5px;">
							<?php _e('No', 'event_espresso');?>
						</label>
						<span class="description"><?php _e('Whether this Price Type will <b>only</b> be available to members that are logged into the site.', 'event_espresso'); ?></span>
					</td>
				</tr>
<?php
/*				<tr>
					<th>
						<label><?php _e('Raise or Lower Price?', 'event_espresso'); ?></label>
					</th>
					<td>
						<?php $raise_checked = $price_type->is_discount() ? '' : ' checked="checked"'; ?>
						<label style="margin-right:15px;"><input type="radio" name="PRT_is_discount" value="0"<?php echo $raise_checked;?> style="margin-right:5px;">
							<?php _e('Raise', 'event_espresso');?>
						</label>
						<?php $lower_checked = $price_type->is_discount() ? ' checked="checked"' : ''; ?>
						<label style="margin-right:15px;"><input type="radio" name="PRT_is_discount" value="0"<?php echo $lower_checked;?> style="margin-right:5px;">
							<?php _e('Lower', 'event_espresso');?>
						</label>
						<span class="description">
							<?php _e('Whether this Price Type applies a discount that will lower the final price or a surcharge that will raise the final price.', 'event_espresso'); ?>
						</span>
					</td>
				</tr>

				<tr>
					<th>
						<label><?php _e('Is this a Tax?', 'event_espresso'); ?></label>
					</th>
					<td>
						<?php $tax_checked = $price_type->is_tax() ? ' checked="checked"' : ''; ?>
						<label style="margin-right:15px;"><input type="radio" name="PRT_is_tax" value="0"<?php echo $tax_checked;?> style="margin-right:5px;">
							<?php _e('Tax', 'event_espresso');?>
						</label>
						<?php $not_tax_checked = $price_type->is_tax() ? '' : ' checked="checked"'; ?>
						<label style="margin-right:15px;"><input type="radio" name="PRT_is_tax" value="0"<?php echo $not_tax_checked;?> style="margin-right:5px;">
							<?php _e('Not Tax', 'event_espresso');?>
						</label>
						<span class="description"><?php _e('Taxes are different from other prices that raise the final price in that they will be applied at the final stage of the registration process.', 'event_espresso'); ?></span>
					</td>
				</tr>
*/?>
				<tr>
					<th>
						<label><?php _e('Percentage or Dollar Amount?', 'event_espresso'); ?></label>
					</th>
					<td>
						<?php $yes_checked = $price_type->is_percent() ? ' checked="checked"' : ''; ?>
						<label style="margin-right:15px;"><input type="radio" name="PRT_is_percent" value="1"<?php echo $yes_checked;?> style="margin-right:5px;">
							<?php _e('Percentage', 'event_espresso');?>
						</label>
						<?php $no_checked = $price_type->is_percent() ? '' : ' checked="checked"'; ?>
						<label style="margin-right:15px;"><input type="radio" name="PRT_is_percent" value="0"<?php echo $no_checked;?> style="margin-right:5px;">
							<?php _e('Dollar', 'event_espresso');?>
						</label>
						<span class="description"><?php _e('Whether this Price Type will be applied as a percentage or applied as a set dollar amount.', 'event_espresso'); ?></span>
					</td>
				</tr>
				<tr>
					<th>
						<label><?php _e('Apply to ALL New Events? ', 'event_espresso'); ?></label>
					</th>
					<td>
						<?php $yes_checked = $price_type->is_global() ? ' checked="checked"' : ''; ?>
						<label style="margin-right:15px;"><input type="radio" name="PRT_is_global" value="1"<?php echo $yes_checked;?> style="margin-right:5px;">
							<?php _e('Yes', 'event_espresso');?>
						</label>
						<?php $no_checked = $price_type->is_global() ? '' : ' checked="checked"'; ?>
						<label style="margin-right:15px;"><input type="radio" name="PRT_is_global" value="0"<?php echo $no_checked;?> style="margin-right:5px;">
							<?php _e('No', 'event_espresso');?>
						</label>
						<span class="description"><?php _e('Setting this to "Yes" will make this a <b>Default</b> Price Type that will then be applied to <b>ALL</b> new events.', 'event_espresso'); ?></span>
					</td>
				</tr>
				<tr>
					<th>
						<label for="PRT_order"><?php _e('Order of Application ', 'event_espresso'); ?></label>
					</th>
					<td>
						<input class="small-text" type="text" id="PRT_order" name="PRT_order" value="<?php echo $price_type->order(); ?>"/><span class="description">
						<?php _e('The order that Price Types are applied. .', 'event_espresso'); ?></span><br/>
						<span class="description"><?php _e('Price types are applied sequentially according to their Order, where higher ordered Price Types will affect lower ordered Price Types.<br/>Price types with equal Orders will be applied in parrallel to whatever total preceeds them and will not affect each other. Actual Prices will be set to "0" so that they are processed first. Taxes will be always be applied last but their order will still determine if they are applied in parralel or as compound taxes (one tax on top of the other).', 'event_espresso'); ?></span>
					</td>
				</tr>
			</tbody>
		</table>
		
		<p>
			<?php echo $learn_more_about_pricing_link; ?>
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Changes'); ?>" id="add_new_price_type" />
		</p>
		
	</form>
</div>




<div style="padding:1em;">	

	<table class="form-table">
		<tbody>
		
			<tr>
				<th>
					<label for="basic_type"><?php _e('Basic Type', 'event_espresso'); ?></label>
				</th>
				<td>
					<?php echo $base_type_select; ?><br/>
					<p class="description"><?php _e('Choosing a basic type allows us to quickly configure a bunch of other options for you.<br/>All events need to have at least one Base Price type option.<br/>Discounts reduce the price of an event, Surcharges increase the price.<br/>Taxes are applied to the final total.', 'event_espresso'); ?></p>
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="PRT_name"><?php _e('Price Type Name', 'event_espresso'); ?></label>
				</th>
				<td>
					<input class="regular-text" type="text" id="PRT_name" name="PRT_name" value="<?php echo html_entity_decode( stripslashes( $price_type->name() ), ENT_QUOTES, 'UTF-8' ); ?>"/>
					<p class="description"><?php _e('A name for this Price Type.', 'event_espresso'); ?></p>
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
					<p class="description"><?php _e('Whether this Price Type will <b>only</b> be available to members that are logged into the site.', 'event_espresso'); ?></p>
				</td>
			</tr>

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
					<p class="description"><?php _e('Whether this Price Type will be applied as a percentage or applied as a set dollar amount.', 'event_espresso'); ?></p>
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
					<p class="description"><?php _e('Setting this to "Yes" will make this a <b>Default</b> Price Type that will then be applied to <b>ALL</b> new events.', 'event_espresso'); ?></p>
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="PRT_order"><?php _e('Order of Application ', 'event_espresso'); ?></label>
				</th>
				<td>
					<input class="small-text" type="text" id="PRT_order" name="PRT_order" value="<?php echo $price_type->order(); ?>"/><p class="description">
					<?php _e('The order that Price Types are applied. .', 'event_espresso'); ?></p>
					<p class="description"><?php _e('Price types are applied sequentially according to their Order, where higher ordered Price Types will affect lower ordered Price Types.<br/>Price types with equal Orders will be applied in parrallel to whatever total preceeds them and will not affect each other. Actual Prices will be set to "0" so that they are processed first. Taxes will be always be applied last but their order will still determine if they are applied in parralel or as compound taxes (one tax on top of the other).', 'event_espresso'); ?></p>
				</td>
			</tr>
			
		</tbody>
	</table>
		
</div>




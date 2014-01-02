<div style="padding:1em;">	

	<table class="form-table">
		<tbody>
			<tr valign="top">
				<th><label for="PRT_ID"><?php _e('Type', 'event_espresso'); ?></label> <?php echo EEH_Template::get_help_tab_link('type_field_info');?></th>
				<td>
					<?php if ( $price->type_obj() && $price->type_obj()->base_type() === 1 ) : ?>
						<input type="hidden" name="PRT_ID" id="PRT_ID" value="<?php echo $price->type(); ?>" />
						<p><strong><?php _e('Price', 'event_espresso'); ?></strong></p>
						<p class="description"><?php _e('This is the default base price. Every new ticket created will start off with this base price.', 'event_espresso'); ?></p>
					<?php else : ?>
						<?php echo EEH_Form_Fields::select_input('PRT_ID', $price_types, $price->type(), 'id="PRT_ID"'); ?>
						<p class="description"><?php _e('Price Modifier. Default items will apply to ALL new events you create.', 'event_espresso'); ?></p>
					<?php endif; ?>
				</td>
			</tr>
			<tr valign="top">
				<th><label for="PRC_name"><?php _e('Name', 'event_espresso'); ?></label> <?php echo EEH_Template::get_help_tab_link('name_field_info');?></th>
				<td>
					<input class="regular-text" type="text" id="PRC_name" name="PRC_name" value="<?php echo htmlentities($price->name()); ?>"/>
				</td>
			</tr>
			<tr valign="top">
				<th><label for="PRC_desc"><?php _e('Description', 'event_espresso'); ?></label> <?php echo EEH_Template::get_help_tab_link('description_field_info');?></th>
				<td>
					<textarea class="regular-text" id="PRC_desc" name="PRC_desc" rows="5" ><?php
					 echo $price->desc(); 
					?></textarea><br/>
				</td>							
			</tr>
			<tr valign="top">
				<th><label for="PRC_amount"><?php _e('Amount', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('amount_field_info');?></label></th>
				<td>
					<input class="small-text ee-numeric" type="text" id="PRC_amount" name="PRC_amount" value="<?php echo $price->amount(); ?>"/>
				</td>
			</tr>
		</tbody>
	</table>

	<div class="clear"></div>
	
</div>
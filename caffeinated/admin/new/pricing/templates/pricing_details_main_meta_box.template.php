<div style="padding:1em;">	

	<table class="form-table">
		<tbody>
			<tr valign="top">
				<th><label for="PRT_ID"><?php _e('Type', 'event_espresso'); ?></label></th>
				<td>
					<?php if ( $price->type_obj()->base_type() === 1 ) : ?>
						<input type="hidden" name="PRT_ID" id="PRT_ID" value="<?php echo $price->type(); ?>" />
						<p><strong><?php _e('Base Price', 'event_espresso'); ?></strong></p>
						<p class="description"><?php _e('This is the default base price. Every new ticket created will start off with this base price.', 'event_espresso'); ?></p>
					<?php else : ?>
						<?php echo EEH_Form_Fields::select_input('PRT_ID', $price_types, $price->type(), 'id="PRT_ID"'); ?>
						<p class="description"><?php _e('Whether this is an Event Price, Discount, Surcharge, or Tax. Default items will apply to ALL new events you create.', 'event_espresso'); ?></p>
					<?php endif; ?>
				</td>
			</tr>
			<tr valign="top">
				<th><label for="PRC_name"><?php _e('Name', 'event_espresso'); ?></label></th>
				<td>
					<input class="regular-text" type="text" id="PRC_name" name="PRC_name" value="<?php echo html_entity_decode( stripslashes( $price->name() ), ENT_QUOTES, 'UTF-8' ); ?>"/>
					<p class="description"><?php _e('The name that site visitors will see for this Price.', 'event_espresso'); ?></p>
				</td>
			</tr>
			<tr valign="top">
				<th><label for="PRC_desc"><?php _e('Description', 'event_espresso'); ?></label></th>
				<td>
					<textarea class="regular-text" id="PRC_desc" name="PRC_desc" cols="70" rows="1" ><?php
					 echo html_entity_decode( stripslashes( $price->desc() ), ENT_QUOTES, 'UTF-8' ); 
					?></textarea><br/>
					<p class="description"><?php _e('A brief description for this Price. More for your benefit, as it is currently not displayed to site visitors.', 'event_espresso'); ?></p>
				</td>							
			</tr>
			<tr valign="top">
				<th><label for="PRC_amount"><?php _e('Amount', 'event_espresso'); ?></label></th>
				<td>
					<input class="small-text" type="text" id="PRC_amount" name="PRC_amount" value="<?php echo $price->amount(); ?>"/>
					<p class="description"><?php _e('The dollar or percentage amount for this Price.', 'event_espresso'); ?></p>
				</td>
			</tr>
		</tbody>
	</table>

	<div class="clear"></div>
	
</div>
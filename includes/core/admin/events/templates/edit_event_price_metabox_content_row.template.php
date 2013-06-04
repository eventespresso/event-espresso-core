<tr>
	<td colspan="6">
		<div id="event-price-<?php echo $price->ID(); ?>" class="event-price-dv">
			<table class="ticket-price-quick-edit-tbl" width="100%">
				<tr>
				
					<td class="type-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Type', 'event_espresso') ?></div>
						<span><?php echo $type_label; ?></span>
					</td> 

					<td class="name-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Name', 'event_espresso') ?></div>
						<input class="edit-ticket-price-input quick-edit regular-text required<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_name-<?php echo $price->ID(); ?>" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_name]" value="<?php echo $price->name(); ?>" <?php echo $disabled; ?>/>
					</td> 
					
					<td class="amount-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Amount', 'event_espresso') ?></div>
						<span class="cur-sign jst-rght"><?php echo  $price->type_obj()->is_percent() ?  '' : $org_options['currency_symbol']; ?></span>
						<input class="edit-ticket-price-input quick-edit small-text jst-rght required<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_amount-<?php echo $price->ID(); ?>" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_amount]" value="<?php echo $price_amount; ?>"<?php echo $disabled; ?>/>
						<span class="percent-sign jst-left"><?php echo $price->type_obj()->is_percent() ? '%' : ''; ?></span>
					</td> 
													
					<td class="desc-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Description', 'event_espresso') ?></div>		
						<p class="description"><?php echo $inactive ? $inactive : implode( ' ', array_slice( explode( ' ', stripslashes( $price->desc() )), 0, 20 )); ?></p>
					</td> 
					

				</tr>
			</table>
		</div>
	</td>				
</tr>
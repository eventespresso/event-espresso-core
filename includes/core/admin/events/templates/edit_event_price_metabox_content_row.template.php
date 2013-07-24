<tr>
	<td colspan="6">
		<div id="event-price-<?php echo $price->display_order(); ?>" class="event-price-dv">
			<table class="ticket-price-quick-edit-tbl" width="100%">
				<tr>
				
					<td class="type-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Type', 'event_espresso') ?></div>
						<span><?php echo $type_label; ?></span>
					</td> 

					<td class="name-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Name', 'event_espresso') ?></div>
						<input class="edit-ticket-price-input quick-edit regular-text required<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_name-<?php echo $price->display_order(); ?>" name="quick_edit_ticket_price[<?php echo $price->display_order(); ?>][PRC_name]" value="<?php echo $price->name(); ?>" <?php echo $disabled; ?>/>
						<input type="hidden" id="ticket-price-id-<?php echo $price->display_order(); ?>" name="ticket_price_id_<?php echo $price->display_order(); ?>" value="<?php echo $price->ID(); ?>" />
					</td> 
					
					<td class="amount-column ticket-price-quick-edit-column"> 
						<div class="small-screen-table-label"><?php echo __('Amount', 'event_espresso') ?></div>
						<span class="cur-sign jst-rght"><?php echo  $is_percent ?  '' : $org_options['currency_symbol']; ?></span>
						<input class="edit-ticket-price-input quick-edit small-text jst-rght required<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_amount-<?php echo $price->display_order(); ?>" name="quick_edit_ticket_price[<?php echo $price->display_order(); ?>][PRC_amount]" value="<?php echo $price_amount; ?>"<?php echo $disabled; ?>/>
						<span class="percent-sign jst-left"><?php echo $is_percent ? '%' : ''; ?></span>
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
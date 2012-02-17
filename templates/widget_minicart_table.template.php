<?php echo $before_widget;?>

	<?php echo $title; ?>
	
	<?php foreach ( $mini_cart as $cart ) { ?>
			
<h4 class="ui-widget-header ui-corner-top"><?php echo $cart['title'];?></h4>
		
<div class="mini-cart-widget-dv ui-widget-content ui-corner-bottom">
	<table class="mini-cart-widget-tbl" border="0" cellspacing="0" cellpadding="0" style="width:100%;">
	<?php
		if ( $cart['has_items'] ) {
			foreach ( $cart['items'] as $line_item => $item ) {
	?>
		<tr class="mini-cart-widget-tbl-row-1">
			<td colspan="3"><h6 class="mini-cart-widget-event-title-hdr"><?php echo $item['name'];?></h6></td>
		</tr>
		<tr class="mini-cart-widget-tbl-row-2">
			<td><?php echo __('Price', 'events');?></td>
			<td><?php echo __('Qty', 'events');?></td>
			<td><?php echo __('Total', 'events');?></td>
		</tr>
		<tr class="mini-cart-widget-tbl-row-3">
			<td><?php echo $currency_symbol . $item['price'];?></td>
			<td><?php echo $item['qty'];?></td>
			<td><?php echo $currency_symbol . $item['line_total'];?></td>
		</tr>
		<tr class="mini-cart-widget-tbl-row-4">
			<td colspan="3">&nbsp;</td>
		</tr>
	<?php } ?>
		<?php if ( $nmbr_of_carts > 1 ) : // add subtotals for individual carts if there are more than one ?>
		<tr id="mini-cart-widget-tbl-row-totals>
			<td colspan="3">
			<h5><?php echo __('Total', 'events') . ' ' . $cart['title'];?></h5>
				<?php
					printf(  _n( '%s item,  ', '%s items, ', $cart['total_items'], 'events' ), $cart['total_items'] );
					echo $currency_symbol . $cart['sub_total'];
				?>
			</td>
		</tr>
	<?php endif; ?>
	<?php }  ?>
	
		<tr id="mini-cart-widget-tbl-row-empty-msg" <?php if ( $cart['has_items'] ) { ?> style="display:none;" <?php } ?>>
			<td colspan="3"><?php echo __($cart['empty_msg'], 'events');?></td>
		</tr>

	</table>
</div>
	
	<?php } 
	
	if ( $cart['has_items'] ) { ?>
	<span class="alignright">
		<a class="minicart-empty-cart-lnk empty-cart-lnk" href="<?php echo $empty_event_queue_url;?>" >
			<?php echo __('empty event queue', 'events'); ?>
		</a>
	</span>
	<?php } ?>
	
	<h6 class="event-queue-grand-total right clearfix">
		<span class="event-queue-grand-total-spn small"><?php echo __('Grand Total: ', 'events'); ?></span><br/>
		<span class="event-queue-grand-total-items-spn"><b><?php printf(  _n( '%s attendee  ', '%s attendees ', $total_items, 'events' ), $total_items ); ?></b></span>
		<span class="event-queue-grand-total-price-spn"><b><?php echo $currency_symbol . $grand_total; ?></b></span>
	</h6>
	
	<p>
		<a class="minicart-view-event-queue-btn ui-button ui-priority-primary ui-state-default ui-corner-all add-hover-fx" href="<?php echo $view_event_queue_url;?>">
			<span class="ui-icon ui-icon-cart"></span>&nbsp;<?php echo __('View Event Queue', 'events');?> 
		</a>
		<br/>
	</p>

<?php echo $after_widget;?>

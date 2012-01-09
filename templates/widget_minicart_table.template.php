<?php echo $before_widget;?>

	<?php echo $title; ?>
	
	<?php foreach ( $mini_cart as $cart ) { ?>
			
	<h4><?php echo $cart['title'];?></h4>
			
<div class="ui-widget-content  ui-corner-all">
	<table border="0" cellspacing="0" cellpadding="0" style="width:100%;">
	<?php
		if ( $cart['has_items'] ) {
			foreach ( $cart['items'] as $item ) {
	?>
		<tr>
			<td colspan="3"><h6><?php echo $item['name'];?></h6></td>
		</tr>
		<tr>
			<td><?php echo __('Price', 'events');?></td>
			<td><?php echo __('Qty', 'events');?></td>
			<td><?php echo __('Total', 'events');?></td>
		</tr>
		<tr>
			<td><?php echo $currency_symbol . $item['price'];?></td>
			<td><?php echo $item['qty'];?></td>
			<td><?php echo $currency_symbol . $item['line_total'];?></td>
		</tr>
	<?php } ?>
		<?php if ( $nmbr_of_carts > 1 ) : ?>
		<tr>
			<td colspan="3">
			<h5><?php echo __('Total', 'events') . ' ' . $cart['title'];?></h5>
				<?php
					printf(  _n( '%s item,  ', '%s items, ', $cart['total_items'], 'events' ), $cart['total_items'] );
					echo $currency_symbol . $cart['sub_total'];
				?>
			</td>
		</tr>
	<?php endif; ?>
	<?php } else { ?>
		<tr>
			<td colspan="3"><?php echo __($cart['empty_msg'], 'events');?></td>
		</tr>
	<?php } ?>
	</table>
</div>
	
	<?php } ?>

	<h6 class="event-queue-grand-total right clearfix">
		<span class="event-queue-grand-total-spn"><?php echo __('Grand Total: ', 'events'); ?></span>
		<span class="event-queue-grand-total-items-spn"><?php printf(  _n( '%s attendee  ', '%s attendees ', $total_items, 'events' ), $total_items ); ?></span>
		<span class="event-queue-grand-total-price-spn"><?php echo $currency_symbol . $grand_total; ?></span>
	</h6>
	
	<p><a class="minicart-view-event-queue-btn alt-mer-btn button ui-priority-primary ui-state-default ui-corner-all add-hover-fx" href="<?php echo $view_event_queue_url;?>">
		<span class="ui-icon ui-icon-cart"></span>&nbsp;<?php echo $view_event_queue_text;?>
	</a></p>

<?php echo $after_widget;?>

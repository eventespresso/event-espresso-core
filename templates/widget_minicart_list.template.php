
<?php echo $before_widget;?>

	<?php echo $title; ?>
	
	<?php foreach ( $mini_cart as $cart_type => $cart ) { ?>
			
	<h4><?php echo $cart['title'];?></h4>
	
<div class="ui-widget-content  ui-corner-all">
	<ul id="mini-cart-<?php echo $cart_type;?>-ul" class="mini-cart-ul">
	<?php if ( $cart['has_items'] ) { ?>
	<?php foreach ( $cart['items'] as $item ) { ?>
		<li>
			<h6><?php echo $item['name'];?></h6>
			<ul class="mini-cart-line-item-ul">
				<li><?php echo __('Price', 'events');?> : <?php echo $currency_symbol . $item['price'];?></li>
				<li><?php echo __('Qty', 'events');?> : <?php echo $item['qty'];?></li>
				<li><?php echo __('Total', 'events');?> : <?php echo $currency_symbol . $item['line_total'];?></li>
			</ul>
		</li>
	<?php } ?>
		<?php if ( $nmbr_of_carts > 1 ) : ?>
			<li>
				<h5><?php echo __('Total', 'events') . ' ' . $cart['title'];?></h5>
				<?php
				printf(  _n( '%s item,  ', '%s items, ', $cart['total_items'], 'events' ), $cart['total_items'] );
				echo $currency_symbol . $cart['sub_total'];
				?>
			</li>
		<?php endif; ?>
	<?php } else { ?>	
		<li><?php echo __( $cart['empty_msg'], 'events');?></li>
	<?php } ?>
	</ul>
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


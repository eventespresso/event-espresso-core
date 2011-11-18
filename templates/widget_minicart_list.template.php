
<?php echo $before_widget;?>
<?php echo $title; ?>

<?php foreach ( $mini_cart as $cart_type => $cart ) { ?>
		
<h3><strong><?php echo $cart['title'];?></strong></h3>

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
	<li>
	<h4><strong><?php echo __('Total', 'events') . ' ' . $cart['title'];?></strong></h4>
	<?php
	printf(  _n( '%s item,  ', '%s items, ', $cart['total_items'], 'events' ), $cart['total_items'] );
	echo $currency_symbol . $cart['sub_total'];
	?></li>
<?php } else { ?>	
	<li><?php echo __( $cart['empty_msg'], 'events');?></li>
<?php } ?>
</ul>
<br />

<?php } ?>

<h3><strong><?php echo __('Grand Total: ', 'events');?></strong></h3>
<h4><?php printf(  _n( '%s item, ', '%s items, ', $total_items, 'events' ), $total_items );
echo $currency_symbol . $grand_total;
?></h4>

<?php echo $after_widget;?>

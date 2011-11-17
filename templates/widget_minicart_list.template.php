
<?php echo $before_widget;?>
<?php echo $title; ?>

<?php foreach ( $mini_cart as $cart_type => $cart ) { ?>
		
<h2><?php echo $cart['title'];?></h2>

<ul id="mini-cart-<?php echo $cart_type;?>-ul" class="mini-cart-ul">
<?php if ( $cart['has_items'] ) { ?>
	<li>
<?php foreach ( $cart['items'] as $item ) { ?>

		<h6><?php echo $item['name'];?></h6>
		<ul class="mini-cart-line-item-ul">
			<li><?php echo __('Price', 'events');?> : <?php echo $currency_symbol . $item['price'];?></li>
			<li><?php echo __('Qty', 'events');?> : <?php echo $item['qty'];?></li>
			<li><?php echo __('Total', 'events');?> : <?php echo $currency_symbol . $item['line_total'];?></li>
		</ul>
		
<?php } ?>
	</li>
	<li><?php
	printf(  _n( '%s item for ', '%s items for ', $cart['total_items'], 'events' ), $cart['total_items'] );
	echo $currency_symbol . $cart['sub_total'];
	?></li>
<?php } else { ?>	
	<li><?php echo __( $cart['empty_msg'], 'events');?></li>
<?php } ?>
</ul>
<br />

<?php } ?>

<h5><?php echo __('Grand Total: ', 'events') . $currency_symbol . $grand_total;?></h5>

<?php echo $after_widget;?>

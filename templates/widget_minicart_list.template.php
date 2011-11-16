
<?php echo $before_widget;?>
<?php echo $title; ?>

<?php foreach ( $mini_cart as $cart_type => $cart ) { ?>
		
<h5><?php echo $cart['title'];?></h5>

<ul id="mini-cart-<?php echo $cart_type;?>-ul" class="mini-cart-ul">
<?php
	if ( $cart['has_items'] ) {
		foreach ( $cart['items'] as $item ) {
?>
	<ul class="mini-cart-line-item-ul">
		<li><h6><?php echo $item['item_hdr'];?></h6></li>
		<li><?php echo $item['name'];?></li>
		<li><?php echo $item['price_hdr'];?> : <?php echo $item['price'];?></li>
		<li><?php echo $item['qty_hdr'];?> : <?php echo $item['qty'];?></li>
		<li><?php echo $item['total_hdr'];?> : <?php echo $item['line_total'];?></li>
	</ul>
<?php } ?>
	
	<li><strong><?php echo $cart['total'];?></strong></li>
	<li><?php echo $cart['total_items'];?> | <?php echo $cart['sub_total'];?></li>
	
<?php } else { ?>
	
	<li><?php echo $cart['empty_msg'];?></li>
	
<?php } ?>
</ul>
<br />

<?php } ?>

<h5><?php echo $grand_total;?></h5>

<?php echo $after_widget;?>

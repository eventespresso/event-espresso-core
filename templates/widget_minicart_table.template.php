<?php echo $before_widget;?>
<?php echo $title; ?>

<?php foreach ( $mini_cart as $cart ) { ?>
		
<h4><?php echo $cart['title'];?></h4>
		
<table border="0" cellspacing="0" cellpadding="0" style="width:100%;">
<?php
	if ( $cart['has_items'] ) {
		foreach ( $cart['items'] as $item ) {
?>
	<tr>
		<td colspan="3"><?php echo $item['item_hdr'];?></td>
	</tr>
	<tr>
		<td colspan="3"><?php echo $item['name'];?></td>
	</tr>
	<tr>
		<td><?php echo $item['price_hdr'];?></td>
		<td><?php echo $item['qty_hdr'];?></td>
		<td><?php echo $item['total_hdr'];?></td>
	</tr>
		<td><?php echo $item['price'];?></td>
		<td><?php echo $item['qty'];?></td>
		<td><?php echo $item['line_total'];?></td>
	</tr>
<?php } ?>
	<tr>
		<td colspan="3"><strong><?php echo $cart['total'];?></strong></td>
	</tr>
	<tr>
		<td><?php echo $cart['total_items'];?></td>
		<td colspan="2"><?php echo $cart['sub_total'];?></td>
	</tr>

<?php } else { ?>
	<tr>
		<td colspan="3"><?php echo $cart['empty_msg'];?></td>
	</tr>
<?php } ?>
</table>
<br />

<?php } ?>

<h4><?php echo $grand_total;?></h4>

<?php echo $after_widget;?>

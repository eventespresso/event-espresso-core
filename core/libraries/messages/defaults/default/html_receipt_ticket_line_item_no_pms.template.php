<?php
/**
 * This is the template for the html messenger and receipt message type ticket_line_item_no_pms field.
 */
?>
<tr class="item">
	<td>[LINE_ITEM_NAME][LINE_ITEM_TAXABLE_*]</td>
	<td colspan="2">[LINE_ITEM_DESCRIPTION]
		<p class="ticket-note"><?php echo sprintf( __( 'This ticket can be used once at %s of the dates/times below.', 'event_espresso' ), '[TKT_USES_* schema=' . __( 'any', 'event_espresso' ) . ']' ); ?></p>
	</td>
	<td class="item_c">[LINE_ITEM_QUANTITY]</td>
	<td class="item_c">[LINE_ITEM_AMOUNT]</td>
	<td class="item_r">[LINE_ITEM_TOTAL]</td>
</tr>
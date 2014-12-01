<?php
/**
 * This is the template for the html messenger and invoice message type ticket_line_item_pms field
 */
?>
<tr class="item">
	<td class="item_I">[LINE_ITEM_NAME][LINE_ITEM_TAXABLE_*]</td>
	<td colspan="4" class="item_I">[LINE_ITEM_DESCRIPTION]   <span class="ticket-note small-text"><?php echo sprintf(__('This ticket can be used once at %s of the dates/times below.', 'event_espresso'), '[TKT_USES_* schema=' . __('any', 'event_espresso' ) . ']' ); ?></span></td>
</tr>
[PRICE_MODIFIER_LINE_ITEM_LIST]
<tr class="item">
	<td colspan="2" class="item_r"><span class="small-text"><?php echo __('Ticket Total.', 'event_espresso'); ?></span></td>
	<td class="item_r">[LINE_ITEM_QUANTITY]</td>
	<td class="item_r">[LINE_ITEM_AMOUNT]</td>
	<td class="item_r">[LINE_ITEM_TOTAL]</td>
</tr>

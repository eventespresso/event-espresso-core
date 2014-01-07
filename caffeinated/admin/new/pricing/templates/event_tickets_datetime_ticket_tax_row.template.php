<tr class="ticket-tax-row TKT-taxes-display"<?php echo $display_tax; ?>>
	<td colspan="4" class="ee-numeric">
		<span class="TKT-tax-label"><?php echo $tax_label; ?></span>
	</td>
	<td class="ee-numeric">
		<span id="TKT-tax-amount-display-<?php echo $tax_id; ?>-<?php echo $tkt_row; ?>" class="TKT-tax-amount-display"><?php echo $tax_added_display; ?></span>
		<input type="hidden" name="TKT-tax_amount[]" id="TKT-tax-amount-<?php echo $tax_id; ?>-<?php echo $tkt_row; ?>" class="TKT-tax-amount" value="<?php echo $tax_added; ?>">
		<input type="hidden" name="TKT-tax_percentage[]" id="TKT-tax-percentage-<?php echo $tax_id; ?>-<?php echo $tkt_row; ?>" class="TKT-tax-percentage" value="<?php echo $tax_amount; ?>">
	</td>
	<td></td>
</tr>
<?php
/**
 * template vars in use:
 *
 * $tkt_row
 * $display_tax
 * $tax_label
 * $tax_added
 * $tax_amount
 */
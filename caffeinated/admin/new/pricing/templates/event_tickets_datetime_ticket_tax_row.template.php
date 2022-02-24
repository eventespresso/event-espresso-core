<?php

/**
 * template vars in use:
 *
 * @var int $tax_id
 * @var int $tkt_row
 * @var string $display_tax
 * @var string $tax_added_display
 * @var string $tax_label
 * @var string $tax_added
 * @var string $tax_amount
 */
?>

<tr class="ticket-tax-row TKT-taxes-display"<?php echo $display_tax; ?>>
    <td colspan="4" class="ee-numeric">
        <span class="TKT-tax-label"><?php echo $tax_label; ?></span>
    </td>
    <td class="ee-numeric">
        <span id="TKT-tax-amount-display-<?php echo esc_attr($tax_id); ?>-<?php echo esc_attr($tkt_row); ?>"
              class="TKT-tax-amount-display"><?php echo $tax_added_display; ?></span>
        <input type="hidden" name="TKT-tax_amount[]" id="TKT-tax-amount-<?php echo esc_attr($tax_id); ?>-<?php echo esc_attr($tkt_row); ?>"
               class="TKT-tax-amount" value="<?php echo esc_attr($tax_added); ?>">
        <input type="hidden" name="TKT-tax_percentage[]"
               id="TKT-tax-percentage-<?php echo esc_attr($tax_id); ?>-<?php echo esc_attr($tkt_row); ?>" class="TKT-tax-percentage"
               value="<?php echo esc_attr($tax_amount); ?>">
    </td>
    <td></td>
</tr>

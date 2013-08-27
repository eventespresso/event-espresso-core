<?php echo $price_modifier_selector; ?>
<div class="ee-price-type-option-info hidden">
	<?php echo $price_option_spans; ?>
</div>
<input type="hidden" name="ee_price_selected[<?php echo $tkt_row; ?>][<?php echo $prc_row; ?>]" class="ee-price-selected-operator" value="<?php echo $price_selected_operator; ?>">
<input type="hidden" name="ee_price_selected[<?php echo $tkt_row; ?>][<?php echo $prc_row; ?>]" class="ee-price-selected-is-percent" value="<?php echo $price_selected_is_percent; ?>">

<?php
/**
 * template args in use
 *
 * $tkt_row
 * $prc_row
 * $price_modifier_selector
 * $price_option_spans;
 * $price_selected_operator
 * $price_selected_is_percent
 */
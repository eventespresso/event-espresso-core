<?php

/**
 * template args in use
 *
 * @var int $tkt_row
 * @var int $PRC_order
 * @var string $price_modifier_selector
 * @var string $price_option_spans;
 * @var string $price_selected_operator
 * @var string $price_selected_is_percent
 * @var string $main_name
 * @var string $selected_price_type_id
 * @var string $disabled
 */
?>

<?php echo $price_modifier_selector; ?>

<?php if ($disabled) : ?>
    <input type="hidden"
           name="<?php echo $main_name; ?>"
           value="<?php echo $selected_price_type_id; ?>">
<?php endif; ?>

<div class="ee-price-type-option-info hidden">
    <?php echo $price_option_spans; ?>
</div>
<input type="hidden"
       name="ee_price_selected[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>]"
       class="ee-price-selected-operator"
       value="<?php echo $price_selected_operator; ?>">
<input type="hidden"
       name="ee_price_selected[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>]"
       class="ee-price-selected-is-percent"
       value="<?php echo $price_selected_is_percent; ?>">

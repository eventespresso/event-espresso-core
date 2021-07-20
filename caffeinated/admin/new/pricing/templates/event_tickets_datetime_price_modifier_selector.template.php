<?php

/**
 * template args in use
 *
 * @var $tkt_row int
 * @var $PRC_order int
 * @var $price_modifier_selector string
 * @var $price_option_spans string
 * @var $price_selected_operator string
 * @var $price_selected_is_percent bool
 * @var $main_name string
 * @var $selected_price_type_id int
 * @var $disabled bool
 */
?>
<?php echo $price_modifier_selector; ?>
<?php if ($disabled) : ?>
    <input type="hidden" name="<?php echo $main_name; ?>" value="<?php echo $selected_price_type_id; ?>">
<?php endif; ?>

    <div class="ee-price-type-option-info hidden">
        <?php echo $price_option_spans; ?>
    </div>
    <input type="hidden" name="ee_price_selected[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>]"
           class="ee-price-selected-operator" value="<?php echo $price_selected_operator; ?>">
    <input type="hidden" name="ee_price_selected[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>]"
           class="ee-price-selected-is-percent" value="<?php echo $price_selected_is_percent; ?>">


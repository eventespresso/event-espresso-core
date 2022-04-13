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

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>
<?php echo wp_kses($price_modifier_selector, AllowedTags::getWithFormTags()); ?>
<?php if ($disabled) : ?>
    <input type="hidden" name="<?php echo esc_attr($main_name); ?>" value="<?php echo absint($selected_price_type_id); ?>">
<?php endif; ?>

    <div class="ee-price-type-option-info hidden">
        <?php echo wp_kses($price_option_spans, AllowedTags::getWithFormTags()); ?>
    </div>
    <input type="hidden" name="ee_price_selected[<?php echo esc_attr($tkt_row); ?>][<?php echo esc_attr($PRC_order); ?>]"
           class="ee-price-selected-operator" value="<?php echo esc_attr($price_selected_operator); ?>">
    <input type="hidden" name="ee_price_selected[<?php echo esc_attr($tkt_row); ?>][<?php echo esc_attr($PRC_order); ?>]"
           class="ee-price-selected-is-percent" value="<?php echo esc_attr($price_selected_is_percent); ?>">


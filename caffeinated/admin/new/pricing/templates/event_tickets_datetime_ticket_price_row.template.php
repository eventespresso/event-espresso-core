<?php

/**
 * template args in use
 *
 * @var int $tkt_row
 * @var int $PRC_order
 * @var int $PRC_ID
 * @var float $PRC_amount
 * @var bool $PRC_is_default
 * @var string $show_plus
 * @var string $show_minus
 * @var string $show_currency_symbol
 * @var string $show_percentage
 * @var bool $show_trash_icon
 * @var bool $show_lock_icon
 * @var bool $show_create_button
 * @var bool $disabled
 * @var string $show_plus_or_minus
 * @var string $edit_prices_name
 * @var string $PRC_desc
 * @var string $price_type_selector;
 * @var string $PRC_name
 * @var string $price_currency_symbol
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<tr id="price-row-<?php echo esc_attr($tkt_row); ?>-<?php echo esc_attr($PRC_order); ?>" class="ee-active-price" valign="top">
    <td>
        <?php echo wp_kses($price_type_selector, AllowedTags::getWithFormTags()); ?>
    </td>
    <td>
        <input type="hidden"
               name="<?php echo esc_attr($edit_prices_name); ?>[<?php echo esc_attr($tkt_row); ?>][<?php echo esc_attr($PRC_order); ?>][PRC_ID]"
               class="edit-price-PRC_ID" value="<?php echo absint($PRC_ID); ?>">
        <input type="hidden"
               name="<?php echo esc_attr($edit_prices_name); ?>[<?php echo esc_attr($tkt_row); ?>][<?php echo esc_attr($PRC_order); ?>][PRC_is_default]"
               class="edit-price-PRC_is_default" value="<?php echo esc_attr($PRC_is_default); ?>">
        <input type="text" class="edit-price-PRC_name ee-text-inp"
               name="<?php echo esc_attr($edit_prices_name); ?>[<?php echo esc_attr($tkt_row); ?>][<?php echo esc_attr($PRC_order); ?>][PRC_name]"
               value="<?php echo esc_attr($PRC_name); ?>">
    </td>
    <td>
        <textarea name="<?php echo esc_attr($edit_prices_name); ?>[<?php echo esc_attr($tkt_row); ?>][<?php echo esc_attr($PRC_order); ?>][PRC_desc]"
                  class="edit-price-PRC_desc ee-full-textarea-inp"
                  placeholder="Edit the description for the price here"><?php echo esc_textarea($PRC_desc); ?></textarea>
    </td>
    <td>
        <span class="ticket-price-info-display ticket-price-plus-minus" style="<?php echo esc_attr($show_plus_or_minus); ?>">+/-</span>
        <span class="ticket-price-info-display ticket-price-plus" style="<?php echo esc_attr($show_plus); ?>">+</span>
        <span class="ticket-price-info-display ticket-price-minus" style="<?php echo esc_attr($show_minus); ?>">-</span>
        <span class="ticket-price-info-display ticket-price-dollar-sign-display" style="<?php echo esc_attr($show_currency_symbol); ?>">
            <?php echo esc_html($price_currency_symbol); ?>
        </span>
    </td>
    <td>
        <?php if ($disabled) : ?>
            <input type="hidden" size="1" class="edit-price-PRC_amount ee-numeric"
                   name="<?php echo esc_attr($edit_prices_name); ?>[<?php echo esc_attr($tkt_row); ?>][<?php echo esc_attr($PRC_order); ?>][PRC_amount]"
                   value="<?php echo esc_attr($PRC_amount); ?>">
            <input type="text" size="1" class="edit-price-PRC_amount ee-numeric"
                   name="prices_archive[<?php echo esc_attr($tkt_row); ?>][<?php echo esc_attr($PRC_order); ?>][PRC_amount]"
                   value="<?php echo esc_attr($PRC_amount); ?>" disabled>
        <?php else : ?>
            <input type="text" size="1" class="edit-price-PRC_amount ee-numeric"
                   name="<?php echo esc_attr($edit_prices_name); ?>[<?php echo esc_attr($tkt_row); ?>][<?php echo esc_attr($PRC_order); ?>][PRC_amount]"
                   value="<?php echo esc_attr($PRC_amount); ?>">
        <?php endif; ?>
    </td>
    <td>
        <span
            class="ticket-price-info-display ticket-price-percentage-char-display" style="<?php echo esc_attr($show_percentage); ?>">%</span>
    </td>
    <td>
        <?php if ($disabled) : ?>
            <span class="ee-lock-icon"></span>
        <?php else : ?>
            <span class="trash-icon dashicons dashicons-post-trash clickable" data-ticket-row="<?php echo esc_attr($tkt_row); ?>"
                  data-context="price" data-price-row="<?php echo esc_attr($PRC_order); ?>"<?php echo wp_kses($show_trash_icon, AllowedTags::getWithFormTags()); ?>></span>
            <button data-ticket-row="<?php echo esc_attr($tkt_row); ?>" data-price-row="<?php echo esc_attr($PRC_order); ?>"
                    data-context="price" class="ee-create-button"<?php echo wp_kses($show_create_button, AllowedTags::getWithFormTags()); ?>><strong>+</strong>
            </button>
        <?php endif; ?>
    </td>
</tr>

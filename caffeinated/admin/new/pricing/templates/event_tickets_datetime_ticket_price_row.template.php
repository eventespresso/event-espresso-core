<?php

/**
 * template args in use
 *
 * @var int $tkt_row
 * @var int $PRC_order
 * @var int $PRC_ID
 * @var int $current_price_type_id
 * @var float $PRC_amount
 * @var bool $PRC_is_default
 * @var bool $show_plus
 * @var bool $show_minus
 * @var bool $show_currency_symbol
 * @var bool $show_percentage
 * @var bool $show_trash_icon
 * @var bool $show_lock_icon
 * @var bool $show_create_button
 * @var bool $disabled
 * @var bool $show_plus_or_minus
 * @var string $edit_prices_name
 * @var string $PRC_desc
 * @var string $price_type_selector;
 * @var string $PRC_name
 * @var string $price_currency_symbol
 */
?>

<tr id="price-row-<?php echo $tkt_row; ?>-<?php echo $PRC_order; ?>" class="ee-active-price">
    <td class='ticket-price-col-small'>
        <?php echo $price_type_selector; ?>
    </td>
    <td class='ticket-price-col-big'>
        <input type="hidden"
               name="<?php echo $edit_prices_name; ?>[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_ID]"
               class="edit-price-PRC_ID" value="<?php echo $PRC_ID; ?>">
        <input type="hidden"
               name="<?php echo $edit_prices_name; ?>[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_is_default]"
               class="edit-price-PRC_is_default" value="<?php echo $PRC_is_default; ?>">
        <input type="text" class="edit-price-PRC_name ee-text-inp"
               name="<?php echo $edit_prices_name; ?>[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_name]"
               value="<?php echo $PRC_name; ?>">
    </td>
    <td class='ticket-price-col-big'>
        <textarea name="<?php echo $edit_prices_name; ?>[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_desc]"
                  class="edit-price-PRC_desc ee-large-text-inp"
                  rows="1"
                  placeholder="Edit the description for the price here"
        >
            <?php echo $PRC_desc; ?>
        </textarea>
    </td>
    <td class='ticket-price-col-micro'>
        <div class="ticket-price-amount-decorators">
            <span class='ticket-price-info-display ticket-price-plus-minus'<?php echo $show_plus_or_minus; ?>>+/-</span>
            <span class="ticket-price-info-display ticket-price-plus"<?php echo $show_plus; ?>>+</span>
            <span class="ticket-price-info-display ticket-price-minus"<?php echo $show_minus; ?>>-</span>
            <span class="ticket-price-info-display ticket-price-dollar-sign-display"<?php echo $show_currency_symbol; ?>>
                <?php echo $price_currency_symbol; ?>
            </span>
        </div>
    </td>
    <td class='ticket-price-col-tiny'>
        <?php if ($disabled) : ?>
            <input type="hidden" size="1" class="edit-price-PRC_amount ee-numeric"
                   name="<?php echo $edit_prices_name; ?>[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_amount]"
                   value="<?php echo $PRC_amount; ?>">
            <input type="text" size="1" class="edit-price-PRC_amount ee-numeric"
                   name="prices_archive[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_amount]"
                   value="<?php echo $PRC_amount; ?>" disabled>
        <?php else : ?>
            <input type="text" size="1" class="edit-price-PRC_amount ee-numeric"
                   name="<?php echo $edit_prices_name; ?>[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_amount]"
                   value="<?php echo $PRC_amount; ?>">
        <?php endif; ?>
    </td>
    <td class='ticket-price-col-micro'>
        <span class="ticket-price-info-display ticket-price-percentage-char-display"<?php echo $show_percentage; ?>>
            %
        </span>
    </td>
    <td class='ticket-price-col-micro'>
        <?php if ($disabled) : ?>
            <span class="ee-lock-icon"></span>
        <?php else : ?>
        <div class="ticket-price-actions">
            <button class="trash-icon ee-trash-button button-secondary clickable"
                    data-ticket-row="<?php echo $tkt_row; ?>"
                    data-context="price"
                    data-price-row="<?php echo $PRC_order; ?>"
                <?php echo $show_trash_icon; ?>
            >
                <span class='dashicons dashicons-trash'></span>
            </button>
            <button class='ee-create-button button-secondary clickable'
                    data-ticket-row="<?php echo $tkt_row; ?>"
                    data-price-row="<?php echo $PRC_order; ?>"
                    data-context='price'
                <?php echo $show_create_button; ?>
            >
                <span class='dashicons dashicons-plus'></span>
            </button>
        </div>
        <?php endif; ?>
    </td>
</tr>
<!-- <tr id="extra-price-row-<?php echo $tkt_row; ?>-<?php echo $PRC_order; ?>"> -->
<!-- <td colspan="5"> -->
<!-- <section class="extra-price-row" style="display:none"> -->
<!-- <textarea name="<?php echo $edit_prices_name; ?>[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_desc]" class="edit-price-PRC_desc ee-large-textarea-inp" rows='1' placeholder="Edit the description for the price here"><?php echo $PRC_desc; ?></textarea> -->
<!-- </section> -->
<!-- </td> -->
<!-- </tr> -->

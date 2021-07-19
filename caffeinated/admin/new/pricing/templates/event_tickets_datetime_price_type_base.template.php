<?php

/**
 * template args in use
 *
 * @var int $tkt_row
 * @var int $PRC_order
 * @var int $PRT_ID
 * @var string $PRT_name
 * @var string $price_selected_operator
 * @var string $price_selected_is_percent
 */
?>

<input type="hidden"
       name="edit_prices[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRT_ID]"
       class="edit-price-PRT_ID"
       value="<?php echo $PRT_ID; ?>"
/>
<span class="price-type-text"><?php echo $PRT_name; ?></span>
<input type="hidden"
       name="ee_price_selected_operator[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>]"
       class="ee-price-selected-operator"
       value="<?php echo $price_selected_operator; ?>"
/>
<input type="hidden"
       name="ee_price_selected_operator[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>]"
       class="ee-price-selected-is-percent"
       value="<?php echo $price_selected_is_percent; ?>"
/>

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

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<input type="hidden"
       name="edit_prices[<?php echo esc_attr($tkt_row); ?>][<?php echo esc_attr($PRC_order); ?>][PRT_ID]"
       class="edit-price-PRT_ID"
       value="<?php echo absint($PRT_ID); ?>"
/>
<span class="price-type-text"><?php echo wp_kses($PRT_name, AllowedTags::getAllowedTags()); ?></span>
<input type="hidden"
       name="ee_price_selected_operator[<?php echo esc_attr($tkt_row); ?>][<?php echo esc_attr($PRC_order); ?>]"
       class="ee-price-selected-operator"
       value="<?php echo esc_attr($price_selected_operator); ?>"
/>
<input type="hidden"
       name="ee_price_selected_operator[<?php echo esc_attr($tkt_row); ?>][<?php echo esc_attr($PRC_order); ?>]"
       class="ee-price-selected-is-percent"
       value="<?php echo esc_attr($price_selected_is_percent); ?>"
/>

<?php

/**
 * template args in use
 *
 * @var int $PRT_ID
 * @var string $PRT_operator
 * @var string $PRT_is_percent
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>
<section id="price-option-<?php echo absint($PRT_ID); ?>">
    <span class="ee-price-operator hidden"><?php echo wp_kses($PRT_operator, AllowedTags::getAllowedTags()); ?></span>
    <span class="ee-PRT_is_percent hidden"><?php echo wp_kses($PRT_is_percent, AllowedTags::getAllowedTags()); ?></span>
</section>

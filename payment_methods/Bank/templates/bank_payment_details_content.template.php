<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * bank_payment_overview_content
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @var string $page_title
 * @var string $payment_instructions
 */
$allowedtags = AllowedTags::getAllowedTags();
?>
<div class="event-display-boxes">
    <h4 id="page_title" class="payment_type_title section-heading"><?php echo esc_html($page_title) ?></h4>
    <p class="instruct"><?php echo wpautop(wp_kses($payment_instructions, $allowedtags)) ?></p>
</div>

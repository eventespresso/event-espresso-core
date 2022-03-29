<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * check_payment_details_content
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @var string $address_to_send_payment
 * @var string $check_title
 * @var string $payable_to
 * @var string $payment_instructions
 */
$allowedtags = AllowedTags::getAllowedTags();
?>
<div class="event-display-boxes">
    <h4 id="check_title" class="payment_type_title section-heading"><?php echo esc_html($check_title) ?></h4>
    <p class="instruct"><?php echo wpautop(wp_kses($payment_instructions, $allowedtags)); ?></p>
    <p>
        <span class="section-title"><?php esc_html_e('Payable to:', 'event_espresso'); ?></span>
        <span class="highlight"><?php echo wp_kses($payable_to, $allowedtags); ?></span>
    </p>
    <p class="section-title"><?php esc_html_e('Payment Address: ', 'event_espresso'); ?></p>
    <div class="address-block">
        <?php echo wpautop(wp_kses($address_to_send_payment, $allowedtags)); ?>
    </div>
</div>

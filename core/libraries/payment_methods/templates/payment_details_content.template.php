<?php

/**
 * payment_details_content
 *
 * @var EE_Payment        $payment
 * @var EE_Payment_Method $payment_method
 */
$gateway_response = $payment->gateway_response();
if (! empty($gateway_response)) {
    echo '<span class="error payment-problem">' . esc_html($gateway_response) . '</span>';
}

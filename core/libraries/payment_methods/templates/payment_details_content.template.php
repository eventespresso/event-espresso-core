<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');
/**
 * payment_details_content
 * @var EE_Payment $payment
 * @var EE_Payment_Method $payment_method
 */
$gateway_response = $payment->gateway_response();
if ( ! empty( $gateway_response )) {
	echo '<span class="error payment-problem">' . $gateway_response . '</span>';
}
// End of file payment_details_content.template.php
<p><strong><?php esc_html_e('PayPal Standard', 'event_espresso'); ?></strong></p>
<p><span class="required"><?php esc_html_e('Please Note! This gateway has been deprecated and replaced with the PayPal Express payment method. ', 'event_espresso'); ?> <?php printf(esc_html__('If you still want to use this gateway, please follow the directions to %1$sactivate it here%2$s.', 'event_espresso'), "<a href='https://eventespresso.com/wiki/paypal-standard-payment-gateway/#deprecated' target='_blank'>", '</a>'); ?></span></p>
<p>
<?php esc_html_e('Adjust the settings for the PayPal Standard payment gateway.', 'event_espresso'); ?>
</p>
<p>
<?php printf(esc_html__('See %1$shere%2$s for list of currencies supported by Paypal Standard.', 'event_espresso'), "<a href='https://www.paypal.com/multicurrency' target='_blank'>", "</a>"); ?>
</p>
<p><strong><?php esc_html_e('PayPal Standard Settings', 'event_espresso'); ?></strong></p>
<ul>
    <li>
<strong><?php esc_html_e('Use the PayPal Sandbox', 'event_espresso'); ?></strong><br />
<?php esc_html_e('If this option is enabled, be sure to enter your PayPal sandbox credentials in the fields above. Be sure to turn this setting off when you are done testing.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('PayPal Email', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Enter the email that you use to login to your PayPal account.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Image URL', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Select an image/logo that should be shown on the payment page for PayPal.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('PayPal Calculates Taxes', 'event_espresso'); ?></strong><br />
<?php printf(esc_html__('If set to "Yes", we will indicate to PayPal that it should calculate the taxes on the order and add it. This means PayPal\'s tax calculations will be used on the order instead of Event Espresso\'s. %1$sRead here for more information.%2$s', 'event_espresso'), "<a href='https://www.paypal.com/ca/cgi-bin/webscr?cmd=xpt/Marketing/shipping/EasyCalculateShipAndTax-outside' target='_blank'>", '</a>'); ?><br/>
<?php esc_html_e('Note: It may confuse users if Event Espresso initially calculates taxes on the order, and then they go to PayPal and it calculates taxes differently. So it is recommended that if PayPal is calculating taxes, that you do not set any taxes in Event Espresso.', 'event_espresso');?>
</li>
<li>
<strong><?php esc_html_e('PayPal Calculates Shipping', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Similar to the "PayPal Calculates Taxes" setting, if this is set to "Yes", we will indicate to PayPal that it should calculate the shipping on each payment (if there are multiple payments for a single transaction, PayPal is permitted to add shipping charges to each payment.)', 'event_espresso'); ?><br/>
<?php esc_html_e('Important Note: PayPal will ONLY calculate shipping on an order if "Shipping Address Options" is set to "Prompt for an Address" (otherwise how will PayPal know how much to charge for shipping if it doesn\'t know where it\'s shipping to?)', 'event_espresso');?>
<li>
<strong><?php esc_html_e('Notes Regarding Paypal Taxes and Shipping', 'event_espresso');?></strong><br/>
<?php esc_html_e('If you want PayPal to calculate taxes and shipping on an order, those changes will NOT appear during the initial registration process until the user is redirected to PayPal for payment.', 'event_espresso');?><br/>
<?php esc_html_e('However, after the user has returned from PayPal, their order in Event Espresso will be updated with the new taxes and added shipping charges (e.g. it will appear on their receipt.)', 'event_espresso');?><br/>
<?php esc_html_e('Also Note: In order for PayPal to properly calculate taxes and shipping, they need to receive the entire order at the same time. So if a user goes to make a payment using PayPal, and their order somehow already has a payment on it, PayPal CANNOT calculate taxes or shipping on that order.', 'event_espresso');?>
</li>
<li>
<strong><?php esc_html_e('Shipping Address Options', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Specify whether an address should be requested on the payments page.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Button Image URL', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Change the image that is used for this payment gateway.', 'event_espresso'); ?>
</li>
</ul>
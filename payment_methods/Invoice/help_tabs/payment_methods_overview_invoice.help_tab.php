<p><strong><?php _e('Invoice', 'event_espresso'); ?></strong></p>
<p>
<?php _e('Adjust the settings for the invoice payment gateway.', 'event_espresso'); ?>
</p>
<p><strong><?php _e('Invoice Display Settings', 'event_espresso'); ?></strong></p>
<ul>
<li>
<strong><?php _e('Payee Name', 'event_espresso'); ?></strong><br />
<?php _e('The [INVOICE_PAYEE_NAME] shortcode is parsed to the value of this field if present, if this field is blank then it\'s parsed to the payee name set in the organization settings page, if that page is blank then it parses to an empty string.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Payee Email', 'event_espresso'); ?></strong><br />
<?php _e('The [INVOICE_PAYEE_EMAIL] shortcode is parsed to the value of this field if present, if this field is blank then it\'s parsed to the payee email set in the organization settings page, if that page is blank then it parses to an empty string.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Payee Tax Number', 'event_espresso'); ?></strong><br />
<?php _e('The [INVOICE_PAYEE_TAX_NUMBER_*] shortcode is parsed to the value of this field if present, if this field is blank then it\'s parsed to the payee tax number set in the organization settings page, if that page is blank then it parses to an empty string.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Payee Address', 'event_espresso'); ?></strong><br />
<?php _e('The shortcode [INVOICE_PAYEE_ADDRESS] is parsed to the value of this field if present. If this field is empty, then the shortcode will use the value of the company address set in the organization settings page. If that value is empty, then an empty string is used.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Instructions', 'event_espresso'); ?></strong><br />
<?php _e('Provide instructions for how the invoice should be paid.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Logo Image', 'event_espresso'); ?></strong><br />
<?php _e('Upload a logo for your invoice. This will appear in the top left area of the invoice.', 'event_espresso'); ?>
</li>
</ul>
<p><strong><?php _e('Invoice Gateway Settings', 'event_espresso'); ?></strong></p>
<ul>
<li>
<strong><?php _e('Confirmation Text', 'event_espresso'); ?></strong><br />
<?php _e('This text appears on the thank you page after a registration using Invoice as the payment method.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Extra Info', 'event_espresso'); ?></strong><br />
<?php _e('Any extra HTML you may like to include after the confirmation text.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Button Image URL', 'event_espresso'); ?></strong><br />
<?php _e('Change the image that is used for the invoice. This is optional.', 'event_espresso'); ?>
</li>
</ul>
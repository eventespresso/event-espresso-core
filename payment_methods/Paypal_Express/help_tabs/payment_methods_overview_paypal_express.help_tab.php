<p>
    <strong><?php esc_html_e('PayPal Express Checkout', 'event_espresso'); ?></strong>
</p>
<p>
    <?php esc_html_e('Please be sure to update the settings for the PayPal Express Checkout payment method.', 'event_espresso'); ?>
</p>
<p>
    <?php printf(esc_html__('For more information on how to get your API credentials, please view the %1$sPayPal Documentation%2$s.', 'event_espresso'), '<a target="_blank" rel="noopener noreferrer" href="https://developer.paypal.com/docs/classic/api/apiCredentials/#create-an-api-signature">', '</a>'); ?>
</p>


<p>
    <strong><?php esc_html_e('PayPal Express Checkout Settings', 'event_espresso'); ?></strong>
</p>
<ul>
    <li>
        <strong><?php esc_html_e('API Username', 'event_espresso'); ?></strong><br/>
        <?php esc_html_e('Your PayPal API Username.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('API Password', 'event_espresso'); ?></strong><br/>
        <?php esc_html_e('Your PayPal API Password.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('API Signature', 'event_espresso'); ?></strong><br/>
        <?php esc_html_e('Your PayPal Account Signature.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Request Shipping Address', 'event_espresso'); ?></strong><br/>
        <?php esc_html_e('Indicates whether or not you require the buyer\'s shipping address on file with PayPal be a confirmed address.', 'event_espresso'); ?>
    </li>
</ul>
<p>
    <?php printf(esc_html__('For testing please use a %1$s PayPal Sandbox account%2$s.', 'event_espresso'), '<a target="_blank" rel="noopener noreferrer" href="https://developer.paypal.com">', '</a>'); ?>
</p>
<p>
    <?php printf(esc_html__('Don\'t have PayPal? %1$sSign up for an account%2$s to get start right away.', 'event_espresso'), '<a target="_blank" rel="noopener noreferrer" href="https://eventespresso.com/go/paypalstandard/">', '</a>'); ?>
</p>
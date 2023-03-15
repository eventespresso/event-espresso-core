<p><strong>
        <?php esc_html_e('PayPal Commerce', 'event_espresso'); ?>
    </strong></p>
<p>
    <?php printf(
        esc_html__(
            'Adjust the settings for PayPal Commerce payment gateway. More information can be found on %1$seventespresso.com%2$s.',
            'event_espresso'
        ),
        '<a href="https://eventespresso.com/wiki/eea-paypal-commerce/?utm_source=github&utm_medium=link&utm_campaign=ee_addon_description_readme&utm_content=view+addon+documentation" target="_blank">',
        '</a>'
    ); ?>
</p>
<p><strong><?php esc_html_e('PayPal Commerce Settings', 'event_espresso'); ?></strong></p>
<ul>
    <li>
        <strong><?php esc_html_e('Connect with PayPal', 'event_espresso'); ?></strong><br/>
        <?php printf(
            esc_html__(
                '%1$sThe Connect (onboarding) flow%2$s is a secure way to connect your PayPal account to our app and start receiving payments.',
                'event_espresso'
            ),
            '<a href="https://developer.paypal.com/docs/multiparty/seller-onboarding" target="_blank">',
            '</a>'
        ); ?><br/>
        <?php esc_html_e(
            'These are the the permissions that will be requested by our app:',
            'event_espresso'
        ); ?>
        <ul>
            <li>
                <?php esc_html_e('Create payments', 'event_espresso'); ?>
            </li>
            <li>
                <?php esc_html_e('Create refunds', 'event_espresso'); ?>
            </li>
            <li>
                <?php esc_html_e('Include Partner fee', 'event_espresso'); ?>
            </li>
        </ul>
    </li>
     <li>
        <strong><?php esc_html_e('Sandbox Mode On', 'event_espresso'); ?></strong><br/>
         <?php esc_html_e(
             'With Debug Mode on the connection with PayPal is done through the sandbox PayPal API, which provides sandbox credentials.',
             'event_espresso'
         ); ?><br/>
        <?php printf(
            esc_html__(
                'When this mode is on, please use sandbox PayPal account or test credit card for checkout. You can create a test card with the %1$sCredit Card Generator%2$s.',
                'event_espresso'
            ),
            '<a href="https://developer.paypal.com/developer/creditCardGenerator" target="_blank">',
            '</a>'
        ); ?>
     </li>
</ul>

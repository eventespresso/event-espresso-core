<p><strong><?php esc_html_e('Authorize.net AIM', 'event_espresso'); ?></strong></p>
<p>
    <?php esc_html_e('Adjust the settings for the Authorize.net AIM payment gateway.', 'event_espresso'); ?>
</p>
<p>
    <?php printf(
        esc_html__(
            'See %1$shere%2$s for list of currencies supported by Authorize.net AIM.',
            'event_espresso'
        ),
        "<a href='https://support.authorize.net/s/article/Which-Currencies-Does-Authorize-Net-Support/' target='_blank' rel='noopener noreferrer'>",
        "</a>"
    ); ?>
</p>
<p><strong><?php esc_html_e('Authorize.net AIM Settings', 'event_espresso'); ?></strong></p>
<ul>
    <li>
        <strong><?php esc_html_e('Authorize.net API Login ID', 'event_espresso'); ?></strong><br/>
        <?php printf(
            esc_html__(
                'Enter your API Login ID for Authorize.net. Learn how to find your %1$sAPI Login%2$s ID.',
                'event_espresso'
            ),
            '<a href="https://support.authorize.net/authkb/index?page=content&id=A405" target="_blank" rel="noopener noreferrer">',
            '</a>'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Authorize.net Transaction Key', 'event_espresso'); ?></strong><br/>
        <?php printf(
            esc_html__(
                'Enter your Transaction Key for Authorize.net. Learn how to find your %1$sTransaction Key%2$s.',
                'event_espresso'
            ),
            '<a href="https://support.authorize.net/authkb/index?page=content&id=A405" target="_blank" rel="noopener noreferrer">',
            '</a>'
        ); ?>
    </li>
    <li>
        <strong>
            <?php esc_html_e(
                'Is this an account on the Authorize.net development server?',
                'event_espresso'
            ); ?></strong><br/>
        <?php esc_html_e(
            'Specify whether this is a live/production account or a test account on the Authorize.net development server.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Do you want to submit a test transaction?', 'event_espresso'); ?></strong><br/>
        <?php esc_html_e(
            'Specify if you want to test the Authorize.net AIM payment gateway by submitting a test transaction. Be sure to turn this setting off when you are done testing.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Excluded and Required Payment Form Fields', 'event_espresso'); ?></strong><br/>
        <?php esc_html_e(
            'By logging into Authorize.net, you can change which payment fields are required by Authorize.net when processing payments. These settings affect both the Advanced Integration Method (AIM, this) and the Simple Integration Method (SIM, different). The payment method settings "Excluded Payment Form Fields" and "Required Payment Form Fields" allow you to change the billing form in Event Espresso to reflect your payment form settings in Authorize.net.',
            'event_espresso'
        ); ?>
        <br>
        <?php
        printf(
            esc_html__(
                'To change your payment form settings in Authorize.net, %1$slog in to authorize.net%2$s, go to %3$sAccount then Payment Form%2$s, then %4$sForm Fields%2$s. It will look similar to %5$sthis%2$s. If you make a field required in Authorize.net, you should also make it required in Event Espresso. If it isn\'t required in Authorize.net, and you want to simplify the billing form in Event Espresso, you can exclude it from the Event Espresso Form too.',
                'event_espresso'
            ),
            '<a href="http://authorize.net" target="_blank" rel="noopener noreferrer">',
            '</a>',
            '<a href="https://monosnap.com/file/nebVteOkEXcdDIos88SojStWOifP23" target="_blank" rel="noopener noreferrer">',
            '<a href="https://monosnap.com/file/WyxGJtev87TcDmdGBEZ2oi1xaBIQAm" target="_blank" rel="noopener noreferrer">',
            '<a href="https://monosnap.com/image/DbCJNfEesWXeSNUs1wLIpGYODFw52m" target="_blank" rel="noopener noreferrer">'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Server', 'event_espresso'); ?></strong>
        <?php esc_html_e(
            'Use this setting to change the server where Authorize.net AIM requests are sent. Change this to "Authorize.net/Akamai" before June 30th 2016 to verify your server will work with Authorize.net\'s servers which will be in use after that date.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Button Image URL', 'event_espresso'); ?></strong><br/>
        <?php esc_html_e('Change the image that is used for this payment gateway.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Note About Special Characters', 'event_espresso');?></strong>
        <?php esc_html_e('If your event name, ticket name or ticket description contain special characters (eg emojis, foreign language characters, or curly quotes) they will be removed when sent to Authorize.net. This is because Authorize.net doesn\'t support them.', 'event_espresso');?></li>
    </li>
</ul>
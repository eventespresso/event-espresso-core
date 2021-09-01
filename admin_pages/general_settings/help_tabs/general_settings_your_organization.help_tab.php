<p>
    <strong><?php esc_html_e('Your Organization', 'event_espresso'); ?></strong>
</p>
<p>
    <?php esc_html_e('This page shows various options for your organization.', 'event_espresso'); ?>
</p>
<p>
    <strong><?php esc_html_e('Support License Key', 'event_espresso'); ?></strong>
</p>
<p>
    <?php printf(
        esc_html__(
            'Enter your support license key in this field to benefit from one-click updates. To manage your support license key, please %1$slogin to your Event Espresso account%2$s. Then click on Edit Account Details which appears in the left sidebar menu.',
            'event_espresso'
        ),
        '<a href="https://eventespresso.com/wp-login.php">',
        '</a>'
    );?>
</p>
<p class="ee-attention">
    <?php printf(
        esc_html__(
            'Site license keys are now called support license keys. Your support license key should only be entered on live/production sites. If this is a development or test site,  %sdo not%s enter your support license key.',
            'event_espresso'
        ),
        '<strong>',
        '</strong>'
    ); ?>
</p>
<p>
    <strong><?php esc_html_e('Contact Information', 'event_espresso'); ?></strong>
</p>
<p>
    <?php esc_html_e(
        'Enter information about your organization here. Be sure to keep your information up-to-date.',
        'event_espresso'
    ); ?><br />
    <?php esc_html_e(
        'Changing your country on this page will also change your country on the Countries page. This will affect your currency options which are used through Event Espresso. For example, if your country is currently set to United States, then your currency is USD. If you were to switch your country to United Kingdom, then your currency would change to GBP.',
        'event_espresso'
    ); ?>
</p>
<p>
    <strong><?php esc_html_e('Company Logo', 'event_espresso'); ?></strong>
</p>
<p>
    <?php esc_html_e(
        'You can upload a new logo here. We recommend an image that is 400 pixels wide or smaller. Your logo will be used on custom invoices, tickets, certificates, and payment templates.',
        'event_espresso'
    ); ?>
</p>
<p>
    <strong><?php esc_html_e('Social Links', 'event_espresso'); ?></strong>
</p>
<p>
    <?php esc_html_e(
        'These URLs can be displayed automatically within your emails (using shortcodes) and front-end templates (using template tags).',
        'event_espresso'
    ); ?>
</p>
<p>
    <strong><?php esc_html_e('User eXperience Improvement Program (UXIP)', 'event_espresso'); ?></strong>
</p>
<p>
    <?php esc_html_e(
        'You can take part in making Event Espresso better! Your information will never be sold, traded, or misused in any way. This programs is voluntary and you can opt out at any time.',
        'event_espresso'
    ); ?>
</p>
<p>
    <strong><?php esc_html_e('Recommendations', 'event_espresso'); ?></strong>
    <br />
    <?php printf(
        esc_html__(
            'Want to see a tour of this screen? Click on the Your Organization Tour button which appears on the right side of the page. %1$sTo learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.',
            'event_espresso'
        ),
        '<br />'
    ); ?>
</p>
<p>
    <strong><?php esc_html_e('Screen Options', 'event_espresso'); ?></strong>
    <br />
    <?php esc_html_e(
        'You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.',
        'event_espresso'
    ); ?>
</p>
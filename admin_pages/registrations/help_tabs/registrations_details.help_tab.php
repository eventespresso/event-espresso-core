<p>
    <strong><?php esc_html_e('Registration Details', 'event_espresso'); ?></strong>
</p>
<p>
    <?php esc_html_e('This page shows information for a specific registration.', 'event_espresso'); ?>
</p>
<p>
    <?php esc_html_e(
        'The number for the registration is shown along with the date of the registration. Next the status of the registration is shown. A registration may have one of the following statuses: Approved, Pending Payment, Not Approved, Declined, or Cancelled.',
        'event_espresso'
    ); ?>
<ul>
    <li style="list-style-type: none;">
        <strong><?php esc_html_e('Approved', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'An approved registration allows payments and may have a transaction status of incomplete or complete. The registration is marked as active and a space is reserved for the registrant.',
            'event_espresso'
        ); ?>
    </li>
    <li style="list-style-type: none;">
        <strong><?php esc_html_e('Cancelled', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'A cancelled registration is performed by the registrant. Payments are not allowed, the registration is inactive, and no space is reserved.',
            'event_espresso'
        ); ?>
    </li>
    <li style="list-style-type: none;">
        <strong><?php esc_html_e('Declined', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'A declined registration is performed by the event admin. Payments are not allowed, the registration is inactive, and not space is reserved.',
            'event_espresso'
        ); ?>
    </li>
    <li style="list-style-type: none;">
        <strong><?php esc_html_e('Not Approved', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'A not approved registration is performed by the event admin. Payments are not allowed, the registration is active, and no space is reserved.',
            'event_espresso'
        ); ?>
    </li>
    <li style="list-style-type: none;">
        <strong><?php esc_html_e('Pending Payment', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'A pending registration allows payments. The status will be automatically toggled to approved if the payment is made in full by registrant.',
            'event_espresso'
        ); ?>
    </li>
</ul>
<p>
    <strong><?php esc_html_e('Recommendations', 'event_espresso'); ?></strong>
    <br />
    <?php esc_html_e(
        'To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.',
        'event_espresso'
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
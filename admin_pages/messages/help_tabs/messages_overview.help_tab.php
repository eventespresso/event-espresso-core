<p>
    <strong><?php esc_html_e('Messages Overview', 'event_espresso'); ?></strong>
</p>
<p>
    <?php printf(
        esc_html__(
            'The Messages system is used by Event Espresso to prepare messages for different uses (Message Types) and these messages are delivered by different Messengers. %1$sThis framework offers a large amount of flexibility. This page shows message templates that have been created with Event Espresso and are currently enable for at least one event.',
            'event_espresso'
        ),
        '<br />'
    ); ?>
</p>
<p>
    <strong><?php esc_html_e('Recommendations', 'event_espresso'); ?></strong>
    <br />
    <?php printf(
        esc_html__(
            'Want to see a tour of this screen? Click on the Messages Overview Tour button which appears on the right side of the page. %1$sTo learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.',
            'event_espresso'
        ),
        '<br />'
    ); ?>
</p>
<p>
    <strong><?php esc_html_e('Screen Options', 'event_espresso'); ?></strong>
    <br />
    <?php esc_html_e(
        'You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content and even adjust the pagination for message templates.',
        'event_espresso'
    ); ?>
</p>
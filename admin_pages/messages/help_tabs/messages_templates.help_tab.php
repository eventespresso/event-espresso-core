<p>
    <strong><?php esc_html_e('Message Templates', 'event_espresso'); ?></strong>
</p>
<p>
    <?php
    printf(
        esc_html__(
            'Message Templates are the %1$sformat%2$s of the messages going out. Think of them as a “form letter”. Templates tell the Messages system how to style your messages and the content (information) they will have when they are delivered.',
            'event_espresso'
        ),
        '<em>',
        '</em>'
    );
    ?>
</p>
<p>
    <?php esc_html_e(
        'There is a template created for each Messenger / Message Type and context combination. For example, messages that are sent for Payment Confirmation have a template for Event Administrator and a different one for Primary Registrant.  Whereas, messages that are sent for the Registration confirmation have 3 templates: one for Event Administrator, one for the Primary Registrant, and another for each additional Registrant(s).',
        'event_espresso'
    ); ?>
</p>
<p>
    <?php esc_html_e(
        'With the Event Espresso Messages system, every Messenger, Message Type, and context will have a global template created with some default content on creation. You have the ability to edit the global template that will be used for all events you create. Additionally, you have the ability to create custom templates for each event on the edit event page for the event (in a metabox labelled "Notifications").',
        'event_espresso'
    ); ?>
</p>
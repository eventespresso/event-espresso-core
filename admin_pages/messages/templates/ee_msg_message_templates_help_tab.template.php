<h2><?php esc_html_e('What are Message Templates', 'event_espresso'); ?></h2>
<p>
    <?php printf(
        esc_html__(
            'Message Templates are the %1$sformat%2$s of the messages going out. Think of them like a “Form letter”. Templates are used to tell the system what you want your messages to look like and the content they will have when they are delivered.',
            'event_espresso'
        ),
        '<em>',
        '</em>'
    ); ?>
</p>
<p>
    <?php esc_html_e(
        'There is a template created for each messenger/message type AND context combination. So example, Emails that are sent for the Payment confirmation have a template for Event Administrator and a different one for Primary Registrant.  Whereas, emails that are sent for the Registration confirmation have 3 templates, one for Event Administrator, Primary Registrant, and Registrant.',
        'event_espresso'
    ); ?>
</p>
<p>
    <?php esc_html_e(
        'With the Event Espresso Messages system, every Messenger, Message Type and Context will have a global template created with some default content on creation.  You have the ability to edit this global template that will be used for all events you create.  However, you also have the ability to create custom templates for each event on the edit event page for the event (in a metabox labelled "Notifications").',
        'event_espresso'
    ); ?>
</p>
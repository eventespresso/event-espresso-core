<h2><?php esc_html_e('What are Message Types?', 'event_espresso'); ?></h2>
<p>
    <?php printf(
        esc_html__(
            'Message Types are the %1$skinds%2$s of messages that get delivered.  Think of them as the "type" of package that is being delivered by the messenger.  For example, Event Espresso comes with two Message Types attached to the Email messenger:  Registration Confirmation (which is triggered by frontend event registrations), and Payment Confirmation (which is triggered by frontend payments).',
            'event_espresso'
        ),
        '<em>',
        '</em>'
    ); ?>
</p>
<p>
    <?php esc_html_e(
        'Future iterations of Event Espresso 4.0 (premium versions), will include more and more different message types that can be attached to the various messengers that are available',
        'event_espresso'
    ); ?>
</p>

<h3><?php esc_html_e('Contexts', 'event_espresso'); ?></h3>
<p>
    <?php printf(
        esc_html__(
            'Each message type (or %1$skind%1$s of message remember!) has different contexts for messages created for that message type. Contexts are dynamic but generally speaking they tend to represent recipients. So for example, Registration Confirmation message type has three types of recipients for every time a registration confirmation is triggered: Event Administrator, Primary Registrant, and Registrant (which may be multiple messages if there are more than one attendee per event). Whereas the Payment Message Type only has two recipients (Event Administrator, Primary Registrant [the one making the payment]).',
            'event_espresso'
        ),
        '<em>',
        '</em>'
    ); ?>
</p>
<p>
    <?php esc_html_e(
        'You will most likely never see the word "context" in any of the Messages system labelling because they are dynamic per message type.  Usually, contexts will be labelled "Recipients" but there may be cases down the road where a message type might use contexts to represent something totally different',
        'event_espresso'
    ); ?>
</p>

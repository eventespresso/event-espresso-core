<h3><?php _e('Message Types', 'event_espresso'); ?></h3>
<p><?php _e('Messages are email notifications that are sent out by Event Espresso. Message Types are the <em>kinds</em> of messages that get delivered.  They can be thought of as the "type" of package that is being delivered by the messenger.  For example, Event Espresso comes with two Message Types attached to the Email Messenger:', 'event_espresso'); ?></p>
<p>
<ul>
<li>
<?php _e('Registration Confirmation: triggered by frontend event registrations', 'event_espresso'); ?>
</li>
<li>
<?php _e('Payment Confirmation: triggered by frontend payments', 'event_espresso'); ?>
</li>
</ul>
</p>
<h3><?php _e('Contexts', 'event_espresso'); ?></h3>
<p><?php _e('Each Message Type (kind of message) has different contexts. Contexts are dynamic and typically represent recipients (individuals receiving email notifications). For example, when the Registration Confirmation message type is triggered, it will send out a message to the following recipients: Event Administrator, Primary Registrant, and Additional Registrants. On the other hand, the Payment Message Type has only two recipients: Event Administrator and Primary Registrant.', 'event_espresso'); ?></p>
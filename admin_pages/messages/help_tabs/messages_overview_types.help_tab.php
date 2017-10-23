<p><strong><?php esc_html_e('Message Types', 'event_espresso'); ?></strong></p>
<p><?php printf( esc_html__('Messages are email notifications that are sent out by Event Espresso. Message Types are the %1$skinds%2$s of messages that get delivered.  They can be thought of as the "type" of package that is being delivered by the messenger. For example, Event Espresso comes with two Message Types attached to the Email Messenger:', 'event_espresso'), '<em>', '</em>'); ?></p>
<p>
<ul>
<li>
<strong><?php esc_html_e('Registration Confirmation', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Triggered by frontend event registrations', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Payment Confirmation', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Triggered by frontend payments', 'event_espresso'); ?>
</li>
</ul>
</p>
<p><strong><?php esc_html_e('Contexts', 'event_espresso'); ?></strong></p>
<p><?php esc_html_e('Each Message Type (kind of message) has different contexts. Contexts are dynamic and typically represent recipients (individuals receiving email notifications). For example, when the Registration Confirmation message type is triggered, it will send out a message to the following recipients: Event Administrator, Primary Registrant, and Additional Registrants. On the other hand, the Payment Message Type has only two recipients: Event Administrator and Primary Registrant.', 'event_espresso'); ?></p>
<p><?php esc_html_e('A message context can be deactivated by removing a recipient from the "TO" field. This will set the field to blank and you can save changes. Deactivated message contexts will appear in grey when viewed in the Messages Overview tab. To re-activate a message context, go to that message context and setup a recipient (using one of the available shortcodes) and save changes. This will reactivate the message context and it will appear as blue in the Messages Overview tab.', 'event_espresso'); ?></p>
<p><strong><?php esc_html_e('Activation / Deactivation of Message Types', 'event_espresso'); ?></strong></p>
<p><?php esc_html_e('When a new install of Event Espresso is activated, all message types will be activated except for those for Cancelled and Declined registrations. The message types for Cancelled and Declined registrations can be easily activated through the Settings tab for Messages. Deactivating and re-activating Event Espresso will keep the current settings saved.', 'event_espresso'); ?></p>

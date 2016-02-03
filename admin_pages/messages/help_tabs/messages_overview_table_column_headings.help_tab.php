<p><strong><?php _e('Messages Table Column Headings', 'event_espresso'); ?></strong></p>
<p>
<ul>
<li>
<strong><?php _e('Event', 'event_espresso'); ?></strong><br />
<?php _e('Shows if a message template is in use for all events or a specific events.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Message Type', 'event_espresso'); ?></strong><br />
<?php _e('The following message types are available: Resend Registration, Registration, Pending Approval, Payment, Payment Reminder, and Declined Payment. ', 'event_espresso'); ?>
<ul>
<li style="list-style-type: none;">
<strong><?php _e('Resend Registration', 'event_espresso'); ?></strong><br />
<?php _e('This message type is for registration confirmations that are resent later. When activated, this message type uses the same templates as the Registration message type so you may want to differentiate the templates for this one.', 'event_espresso'); ?></li>
<li style="list-style-type: none;">
<strong><?php _e('Registration', 'event_espresso'); ?></strong><br />
<?php _e('This message type is for registration confirmation messages that include information about the event someone has registered for. This message type does have one setting that you can use to indicate if registration confirmations are delayed until full payments are made for an event (default setting).', 'event_espresso'); ?></li>
<li style="list-style-type: none;">
<strong><?php _e('Pending Approval', 'event_espresso'); ?></strong><br />
<?php _e('This message type may be used when all registrations require approval (regardless of payment (registration messages only get sent when they are "approved"). It may also be used if full payment is required before registrations get sent and a full payment hasn\'t been made, then pending approval messages would go out along with the payment reminder.', 'event_espresso'); ?></li>
<li style="list-style-type: none;">
<strong><?php _e('Payment', 'event_espresso'); ?></strong><br />
<?php _e('This message type is used for all payment notification messages that go out including any manual payments entered by an event administrator.', 'event_espresso'); ?></li>
<li style="list-style-type: none;">
<strong><?php _e('Payment Reminder', 'event_espresso'); ?></strong><br />
<?php _e('This message type is used for all payment reminder messages. These are triggered when an offline gateway registration is completed or when manually triggered via event administrators via the transaction admin page(s).', 'event_espresso'); ?></li>
<li style="list-style-type: none;">
<strong><?php _e('Declined Payment', 'event_espresso'); ?></strong><br />
<?php _e('This message type is used for all declined payment notification messages that go out including any manual payments entered by an event administrator.', 'event_espresso'); ?></li>                                                                                                            
</ul>
</li>
<li>
<strong><?php _e('Messenger', 'event_espresso'); ?></strong><br />
<?php _e('Shows the Messenger that will handle the delivery of messages. Hovering over the Messenger will provide you with an additional option to Edit the current message template. Clicking on Email will take you to the Message Templates Editor so you can edit the message template for an Event Admin. Clicking on Event Admin will also take you to the Message Templates Editor. Clicking on Primary Registrant will take you to the Message Templates Editor so that you can edit the message template that is sent to the Primary Registrant. Clicking on the Edit link will also take you to the Message Templates Editor so that you can edit the message template that is sent to the Event Admin.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Description', 'event_espresso'); ?></strong><br />
<?php _e('The description for the Message Type.', 'event_espresso'); ?>
</li>
</ul>
</p>
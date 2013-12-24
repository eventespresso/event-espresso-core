<p>
<?php _e('This table represents all the ticket purchases made for your events.', 'event_espresso'); ?>
</p>
<h3>
<?php _e('Filters', 'event_espresso'); ?>
</h3>
<p>
<?php _e('The date filters allow you to display only purchases made within a specific period. Leaving the both blank will display all results, and leaving only one blank will display all result up to that date or after that date, depending on which you leave blank.', 'event_espresso'); ?>
</p>
<h3>
<?php _e('Table Columns', 'event_espresso'); ?>
</h3>
<ul>
<li>
<p> <strong>
<?php _e('ID', 'event_espresso'); ?>
</strong> <br />
<?php _e(' The transaction ID is used through the payment process.	', 'event_espresso'); ?>
</p>
</li>
<li> <strong>
<?php _e('Transaction Date	', 'event_espresso'); ?>
</strong> <br />
<?php _e('The data when the transaction took place. Clicking the date will take you through to the individual transaction page where you can see the transaction in detail.	', 'event_espresso'); ?>
</li>
<li> <strong>
<?php _e('Status', 'event_espresso'); ?>
</strong> <br />
<?php _e('The status helps you know if the transaction was successful or not. It could be one of three: ', 'event_espresso'); ?>
<ol>
<li>
<?php _e('Complete, the payment was successful; ', 'event_espresso'); ?>
</li>
<li>
<?php _e('Open, the payment has not yet been attempted. This is the status for incomplete offline payments such as invoices; ', 'event_espresso'); ?>
</li>
<li>
<?php _e('Incomplete, the payment has not yet been completed. This is the status for online payments that have yet to be processed.		', 'event_espresso'); ?>
</li>
</ol>
</li>
<li> <strong>
<?php _e('Total', 'event_espresso'); ?>
</strong> <br />
<?php _e('This column will show you the total amount for that transaction. It will include the total of every ticket purchased even if from separate events.	', 'event_espresso'); ?>
</li>
<li> <strong>
<?php _e('Paid', 'event_espresso'); ?>
</strong> <br />
<?php _e('Here you can see how much has been paid. If this column matches the figure in the total column, then the transaction has been paid in full.	', 'event_espresso'); ?>
</li>
<li> <strong>
<?php _e('Primary Registrant	', 'event_espresso'); ?>
</strong> <br />
<?php _e('The name of the primary attendee is shown here. Clicking the name will allow you to edit the attendees.	', 'event_espresso'); ?>
</li>
<li> <strong>
<?php _e('Email Address	', 'event_espresso'); ?>
</strong> <br />
<?php _e('The primary attendees email address is shown here. Clicking the email will open up your email client.	', 'event_espresso'); ?>
</li>
<li> <strong>
<?php _e('Event', 'event_espresso'); ?>
</strong> <br />
<?php _e('The name of the event/s are shown here. Clicking the name will take you the edit event screen.	', 'event_espresso'); ?>
</li>
<li> <strong>
<?php _e('Actions', 'event_espresso'); ?>
</strong> <br />
<?php _e('There are 4 main actions that can be done by clicking the icons here:', 'event_espresso'); ?>
<ol>
<li>
<?php _e('View Transaction Details: Takes you to the individual transaction page. Clicking the date also takes you to the individual transaction page.', 'event_espresso'); ?>
</li>
<li>
<?php _e('Download Invoice for Transaction: downloads the invoice PDF.', 'event_espresso'); ?>
</li>
<li> <?php echo sprintf(__('Send Payment Reminder: Emails the primary attendee the Payment Reminder message. This is set up in the %sMessages page%s.', 'event_espresso'),'<a href="admin.php?page=espresso_messages">','</a>'); ?> </li>
<li> <?php echo sprintf(__('View Registration Details: Clicking this icon will take you to the registration page for this transaction. You can also get there via the %sRegistrations page%s.', 'event_espresso'), '<a href="admin.php?page=espresso_registrations">','</a>'); ?> </li>
</ol>
</li>
</ul>
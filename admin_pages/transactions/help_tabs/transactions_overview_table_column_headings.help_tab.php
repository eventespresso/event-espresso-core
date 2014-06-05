<h3><?php _e('Transactions Table Column Headings', 'event_espresso'); ?></h3>
<ul>
<li>
<p><strong><?php _e('ID', 'event_espresso'); ?></strong><br />
<?php _e('This is the transaction ID is that is used throughout the payment process.', 'event_espresso'); ?>
</p>
</li>
<li><strong><?php _e('Transaction Date', 'event_espresso'); ?></strong><br />
<?php _e('This is the date that the transaction occurred on. Clicking the date will take you to another page where you can view the transaction details.', 'event_espresso'); ?>
</li>
<li><strong><?php _e('Status', 'event_espresso'); ?></strong> <br />
<?php _e('The status helps you understand if the transaction was successful or not. Below are available statuses for transactions.', 'event_espresso'); ?>
<ul>
<li style="list-style-type: none;">
<strong><?php _e('Overpaid', 'event_espresso'); ?></strong><br />
<?php _e('A payment was made for more than the transaction total.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Complete', 'event_espresso'); ?></strong><br />
<?php _e('The payment was successful.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Incomplete', 'event_espresso'); ?></strong><br />
<?php _e('The payment has not yet been completed. This is the status for online payments that have yet to be processed.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Failed', 'event_espresso'); ?></strong><br />
<?php _e('The payment did not process correctly.', 'event_espresso'); ?>
</li>
</ul>
</li>
<li>
<strong><?php _e('Total', 'event_espresso'); ?></strong><br />
<?php _e('This is the total amount for that transaction. It will include the total of every ticket purchased even if from separate events.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Paid', 'event_espresso'); ?></strong><br />
<?php _e('This shows much has been paid. If this column matches the amount in the total column, then the transaction has been paid in full.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Primary Registrant', 'event_espresso'); ?></strong><br />
<?php _e('The name of the primary registrant. Clicking the name will take you to the registration details page.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Email Address', 'event_espresso'); ?></strong><br />
<?php _e('This is the email address for the primary registrant. Clicking the email address will open your default email client.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Event', 'event_espresso'); ?></strong><br />
<?php _e('The name of the events are shown here. Clicking the name will take you the edit event page.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Actions', 'event_espresso'); ?></strong><br />
<?php _e('There are several actions that can be done by clicking the icons. These are explained below.', 'event_espresso'); ?>
<ul>
<li style="list-style-type: none;">
<strong><?php _e('View Transaction Details <span class="dashicons dashicons-search"></span>', 'event_espresso'); ?></strong><br />
<?php _e('Takes you to the individual transaction page. Clicking the date also takes you to the individual transaction page.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Download Invoice for Transaction <span class="ee-icon ee-icon-PDF-file-type"></span>', 'event_espresso'); ?></strong><br />
<?php _e('Downloads the invoice PDF.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Send Payment Reminder <span class="ee-icon ee-icon-payment-reminder"></span>', 'event_espresso'); ?></strong><br />
<?php echo sprintf(__('Emails the primary registrant the Payment Reminder message. This is set up in the %sMessages page%s.', 'event_espresso'),'<a href="admin.php?page=espresso_messages">','</a>'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('View Registration Details <span class="ee-icon ee-icon-user-edit"></span>', 'event_espresso'); ?></strong><br />
<?php echo sprintf(__('Clicking this icon will take you to the registration page for this transaction. You can also get there via the %sRegistrations page%s.', 'event_espresso'), '<a href="admin.php?page=espresso_registrations">','</a>'); ?>
</li>
</ul>
</li>
</ul>
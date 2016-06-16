<p><strong><?php _e('Transaction Views', 'event_espresso'); ?></strong></p>
<p>
<?php _e('Views allow you to restrict what you see in the Transactions Overview table. The following views are available: View All. The number in parentheses next to each view represents the number of transactions that will be displayed with that view.', 'event_espresso'); ?><br />
</p>
<p>
<ul>
<li>
<strong><?php _e('View All Transactions', 'event_espresso'); ?></strong><br />
<?php
	printf(
		__('Shows transactions where the registrant has completed the full registration process. Transactions in this view will either have a status of: %1$s%2$s"Incomplete" meaning there are monies owing%3$s%2$s"Complete" meaning there are NO monies owing%3$s%2$s"Overpaid" meaning that monies should be refunded to the registrant.%3$s%4$s', 'event_espresso'),
		'<ul>',
		'<li>',
		'</li>',
		'</ul>'
	);
?>
</li>
<li>
<strong><?php _e('Abandoned Transactions', 'event_espresso'); ?></strong><br />
<?php _e('Shows transactions that have been abandoned, either due to a technical reason (server or computer crash during registration), or due to an abandoned cart where the registrant chose not to complete the registration process. Please note that Abandoned Transactions were able to capture contact information for at least one registrant. This can be helpful for following up with the contact to determine if they still wish to attend the event or not.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Failed Transactions', 'event_espresso'); ?></strong><br />
<?php _e('Shows transactions that have failed, either due to a technical reason (server or computer crash during registration), or some other reason that prevented the collection of any useful contact information from any of the registrants. This could mean the registrant abandoned the registration process before submitting any data whatsoever or may even indicate attempts by spam bots to submit the registration form.', 'event_espresso'); ?>
</li>
</ul>
</p>
<p><strong><?php _e('Transaction Filters', 'event_espresso'); ?></strong></p>
<p>
<?php _e('Filters are a way to show transactions that fall into certain criteria.', 'event_espresso'); ?>
</p>
<p>
<ul>
<li>
<strong><?php _e('Filter by Time Period', 'event_espresso'); ?></strong><br />
<?php _e('Show registrations that fall between a certain date range.', 'event_espresso'); ?>
</li>
</ul>
</p>
<p><strong><?php _e('Transaction Search', 'event_espresso'); ?></strong></p>
<p>
<?php _e('You can perform a search to find specific transactions. The following sources will be searched: Event Name (title), Event Description, First Name, Last Name, Bio, Email, Address, Comments, Notes, Registration Final Price, Registration Code, Registration Group Size, Ticket Name, Ticket Description, Payment Method, Payment Gateway, Transaction Details, and Transaction Session Data. To use the search feature, enter a value into the search box and click on the Search Transactions button.', 'event_espresso'); ?>
</p>
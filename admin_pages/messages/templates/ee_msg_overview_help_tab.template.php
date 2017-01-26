<h2><?php esc_html_e('More about the Messages Overview Table', 'event_espresso'); ?></h2>
<p><?php esc_html_e('This table represents all the various message templates that have been created.', 'event_espresso'); ?></p>
<h3><?php esc_html_e('Views', 'event_espresso'); ?></h3>
<p><?php esc_html_e('Views are a type of filter that allow you to restrict what you see in the table. The little number in brackets next to each view represents the number of templates that will be displayed with that view. There are five different views available for you to select from:', 'event_espresso'); ?>
	<ul>
		<li>
			<?php esc_html_e('In Use', 'event_espresso'); ?><br />
			<?php esc_html_e('This shows the all the message templates that are currently active and being used by the system', 'event_espresso'); ?>
		</li>
		<li>
			<?php esc_html_e('All', 'event_espresso'); ?><br />
			<?php esc_html_e('This shows EVERY message template that has been created and is in the database', 'event_espresso'); ?>
		</li>
		<li>
			<?php esc_html_e('Global', 'event_espresso'); ?><br />
			<?php esc_html_e('This will restrict the view to ONLY show templates that are global templates.  Global templates are used by all events (that don\'t have a custom template created)', 'event_espresso'); ?>
		</li>
		<li>
			<?php esc_html_e('Events', 'event_espresso'); ?><br />
			<?php esc_html_e('This restricts the view to only show custom event message templates', 'event_espresso'); ?>
		</li>
		<li>
			<?php esc_html_e('Trash', 'event_espresso'); ?><br />
			<?php esc_html_e('This displays all message templates that are currently not active because they are in the trash', 'event_espresso'); ?>
		</li>
</p>

<h3><?php esc_html_e('Filters', 'event_espresso'); ?></h3>
<p><?php esc_html_e('Filters are the two dropdowns that you see below the Views and to the right of the "Apply" button.  The first dropdown contains a list of active messengers that you can filter your message template list by.  The second dropdown contains a list of installed message types that you can filter your message template list by.  When you select from the lists and then click the "Filter" button, the table will only display the Message Templates that match both the selected messenger and message type. You can reset the filters by clicking the (you guessed it!) "Reset Filters" button', 'event_espresso'); ?></p>

<h3><?php esc_html_e('Table Columns', 'event_espresso'); ?></h3>
<p>
	<ul>
		<li>
			<?php esc_html_e('Event', 'event_espresso'); ?><br />
			<?php esc_html_e('The event column is used to indicate whether the template is a global template or a custom event template.  Event titles are listed here for custom event templates and they are be linked to the editor for the event', 'event_espresso'); ?>
		</li>
		<li>
			<?php esc_html_e('Message Type', 'event_espresso'); ?><br />
			<?php esc_html_e('This column lists what message type this template is for.', 'event_espresso'); ?>
		</li>
		<li>
			<?php esc_html_e('Messenger', 'event_espresso'); ?><br />
			<?php printf( esc_html__('This column displays a number of different elements for the listed template.  First is the messenger that this template is delivered by.  The messenger title is linked to the editor for the first %1$scontext%2$s listed (context is labelled "recipients" for payment message types)', 'event_espresso'), '<em>', '</em>'); ?><br />
			<?php esc_html_e('Below the Messenger title, is a list of different contexts.  The context label varies for each message type but it is usually labelled "Recipients".  You can click on each context title to go to the specific template for that context and edit it as desired.', 'event_espresso'); ?>
		</li>
	</ul>
</p>
<p><strong><?php esc_html_e('Venues Overview Table Column Headings', 'event_espresso'); ?></strong></p>
<ul>
<li>
<strong><?php esc_html_e('ID', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the numerical ID for a venue. This value is used internally for Event Espresso.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Name', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the name for the venue.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Address', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the address for the venue.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('City', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the city for the venue.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Capacity', 'event_espresso'); ?></strong><br />
<?php printf(
	esc_html__('This is the capacity of the venue. If no limit is set, then the capacity will be set to infinity (%s).', 'event_espresso'),
	'&#8734'
); ?>
</li>
</ul>

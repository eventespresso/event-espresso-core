<p><strong><?php _e('Physical Location', 'event_espresso'); ?></strong></p>
<p>
<?php _e('Enter the physical address for this venue. This field is optional.', 'event_espresso'); ?><br />
<?php echo sprintf(__('The countries that are shown in the dropdown are controlled through the "Country Appears in Dropdown Select Lists" setting which is in the %sCountries tab%s on the General Settings page. Once on this page, you can specify whether to show a country in this dropdown by selecting yes or no and saving changes.', 'event_espresso'),'<a href="admin.php?page=espresso_general_settings&action=country_settings">','</a>'); ?>
</p>
</p>
<p><strong><?php _e('Google Map', 'event_espresso'); ?></strong></p>
<p>
<?php _e('Specify whether to show a Google Map for this venue. You can also provide a link which is used in Event Espresso emails.', 'event_espresso'); ?>
</p>
<p><strong><?php _e('Virtual Location', 'event_espresso'); ?></strong></p>
<p>
<?php _e('Enter the URL (website address) for the venue and a provide a call-in number. This field is optional and is typically uses for virtual events such as webinars.', 'event_espresso'); ?>
</p>
<p>
    <strong><?php esc_html_e('Physical Location', 'event_espresso'); ?></strong>
</p>
<p>
    <?php esc_html_e('Enter the physical address for this venue. This field is optional.', 'event_espresso'); ?>
    <br />
    <?php printf(
        esc_html__(
            'The countries that are shown in the dropdown are controlled through the "Country Appears in Dropdown Select Lists" setting which is in the %sCountries tab%s on the General Settings page. Once on this page, you can specify whether to show a country in this dropdown by selecting yes or no and saving changes.',
            'event_espresso'
        ),
        '<a href="admin.php?page=espresso_general_settings&action=country_settings">',
        '</a>'
    ); ?>
</p>
<p>
    <strong><?php esc_html_e('Google Map', 'event_espresso'); ?></strong>
</p>
<p>
    <?php esc_html_e(
        'Specify whether to show a Google Map for this venue. You can also provide a link which is used in Event Espresso emails.',
        'event_espresso'
    ); ?>
</p>
<p>
    <strong><?php esc_html_e('Virtual Location', 'event_espresso'); ?></strong>
</p>
<p>
    <?php esc_html_e(
        'Enter the URL (website address) for the venue and a provide a call-in number. This field is optional and is typically uses for virtual events such as webinars.',
        'event_espresso'
    ); ?>
</p>
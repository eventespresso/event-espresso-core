<?php
/**
 * @var EE_Event $_event
 * @var string   $active_status
 * @var string   $additional_limit
 * @var string   $additional_registration_options
 * @var string   $display_ticket_selector
 * @var string   $EVT_default_registration_status
 */
?>
    <p>
        <label><?php esc_html_e('Active Status: ', 'event_espresso'); ?></label>
        <?php echo $active_status; // already escaped ?>
    </p>

<?php
$settings_array                = [
    'max_registrants'                 => '<p>
        <label for="max-registrants">
        ' . esc_html__(
        'Maximum number of tickets allowed per order for this event: ',
        'event_espresso'
    ) . '
        </label>
        <input class="ee-numeric"
                type="text" 
                id="max-registrants" 
                name="additional_limit" 
                value="' . esc_attr($additional_limit) . '"
                size="4" 
                />
        </p>',
    'additional_registration_options' => $additional_registration_options,
    'display_ticket_selector'         => '<p>
            <label>' . esc_html__('Display Ticket Selector', 'event_espresso') . '</label>'
            . $display_ticket_selector // already escaped
            . '</p>',
    'alternative_registration_page'   => '<p>
            <label>' . esc_html__('Alternative Registration Page', 'event_espresso') . '</label>
            <input name="externalURL" size="20" type="text" value="' . esc_url_raw($_event->external_url()) . '"> 
            </p>',
    'event_phone_number'              => '<p>
            <label>' . esc_html__('Event Phone Number', 'event_espresso') . '</label>
            <input name="event_phone" size="20" type="text" value="' . esc_attr($_event->phone()) . '">
            </p>',
    'default_registration_status'     => '<p>
            <label>' . esc_html__('Default Registration Status', 'event_espresso') . '</label>'
             . EEH_Template::get_help_tab_link('event_editor_event_registration_options_help_tab')
             . $EVT_default_registration_status // already escaped
             . '</p>',
];
// filter
$settings_array = apply_filters('FHEE__caffeinated_event_registration_options__template__settings', $settings_array);

// echo
foreach ($settings_array as $item) {
    echo $item; // already escaped
}

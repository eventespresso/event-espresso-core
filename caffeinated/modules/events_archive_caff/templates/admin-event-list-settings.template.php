<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * Admin Event List Settings Template
 *
 * @package    Event Espresso
 * @subpackage modules/events_archive_caff/templates/admin-event-list-settings.template.php
 * @since      4.9.0
 *
 * @var bool $display_status_banner
 * @var bool $display_description
 * @var bool $display_ticket_selector
 * @var bool $display_datetimes
 * @var bool $display_venue
 * @var bool $display_expired_events
 * @var bool $display_events_with_expired_tickets
 * @var bool $use_sortable_display_order
 * @var bool $event_archive_display_order
 */

add_filter('FHEE__EEH_Form_Fields__label_html', '__return_empty_string');

$values = EEH_Form_Fields::prep_answer_options(
    array(
        array('id' => 1, 'text' => esc_html__('Yes', 'event_espresso')),
        array('id' => 0, 'text' => esc_html__('No', 'event_espresso')),
    )
);

$description = EEH_Form_Fields::prep_answer_options(
    array(
        array('id' => 0, 'text' => esc_html__('none', 'event_espresso')),
        array('id' => 1, 'text' => esc_html__('excerpt (short desc)', 'event_espresso')),
        array('id' => 2, 'text' => esc_html__('full description', 'event_espresso')),
    )
);

?>


<!--*************************   Event Listings  ****************************-->
<br/>
<br/>
<h2 class="ee-admin-settings-hdr">
    <?php esc_html_e('Events List Pages', 'event_espresso'); ?>
</h2>
<table class="ee-admin-two-column-layout form-table">
    <tbody>

    <tr>
        <th>
            <label for="event_listings_url">
                <?php esc_html_e('Events List URL', 'event_espresso'); ?><?php echo EEH_Template::get_help_tab_link(
                    'event_listings_url_info'
                ); ?>
            </label>
        </th>
        <td>
            <a id="event_listings_url" href="<?php echo esc_url_raw(EEH_Event_View::event_archive_url()); ?>" target="_blank">
                <?php echo esc_url(EEH_Event_View::event_archive_url()); ?>
                <span class="dashicons dashicons-external"></span>
            </a>
            <p class="description"><?php
                esc_html_e(
                    'This is the URL where all events will be displayed.  You can change the slug below.',
                    'event_espresso'
                ); ?></p>
        </td>
    </tr>

    <tr>
        <th>
            <label for="event_cpt_slug">
                <?php esc_html_e('Event Slug', 'event_espresso'); ?>
            </label>
        </th>
        <td>
            <span class="base-url"><?php echo site_url() . '/ ';?></span>
            <?php echo EEH_Form_Fields::text(
                'not_used',
                EE_Registry::instance()->CFG->core->event_cpt_slug,
                'event_cpt_slug',
                'event_cpt_slug',
                'regular'
            ); ?>
            <p class="description"><?php
                esc_html_e(
                    'This allows you to configure what slug is used for the url of all event pages.',
                    'event_espresso'
                ); ?></p>
            <?php if (has_filter('FHEE__EE_Register_CPTs__register_CPT__rewrite')) : ?>
                <p class="important-notice">
                    <?php
                    sprintf(
                        esc_html__(
                            'Usage of the %1$s FHEE__EE_Register_CPTs__register_CPT__rewrite %2$s filter has been detected.  Please be aware that while this filter is being used, this setting has no affect.',
                            'event_espresso'
                        ),
                        '<code>',
                        '</code>'
                    );
                    ?>
                </p>
            <?php endif; ?>
        </td>
    </tr>

    <tr>
        <th>
            <label for="EED_Events_Archive_display_status_banner">
                <?php esc_html_e('Display Status Banner', 'event_espresso'); ?>
            </label>
        </th>
        <td>
            <?php echo wp_kses(
                EEH_Form_Fields::select(
                    'display_status_banner',
                    (int) $display_status_banner,
                    $values,
                    'EED_Events_Archive_display_status_banner',
                    'EED_Events_Archive_display_status_banner'
                ),
                AllowedTags::getWithFormTags()
            ); ?>
            <p class="description"><?php
                esc_html_e(
                    'Whether the status banner should be shown on the events list page next to the Event title.  The status banner is the banner that shows the status of the event (e.g. "Upcoming", "Expired", etc.).',
                    'event_espresso'
                ); ?></p>
        </td>
    </tr>

    <tr>
        <th>
            <label for="EED_Events_Archive_display_description">
                <?php esc_html_e('Display Description', 'event_espresso'); ?><?php echo EEH_Template::get_help_tab_link(
                    'display_description_info'
                ); ?>
            </label>
        </th>
        <td>
            <?php echo wp_kses(
                EEH_Form_Fields::select(
                    'description',
                    (int) $display_description,
                    $description,
                    'EED_Events_Archive_display_description',
                    'EED_Events_Archive_display_description'
                ),
                AllowedTags::getWithFormTags()
            ); ?>
            <p class="description"><?php
                esc_html_e(
                    'Whether the event description should be shown on the events list page.  If you choose "none" then the description will not be shown.  If you choose "excerpt" then the short description will be shown.  If you choose "full description" then the full description will be shown.',
                    'event_espresso'
                ); ?></p>
        </td>
    </tr>

    <tr>
        <th>
            <label for="EED_Events_Archive_display_ticket_selector">
                <?php esc_html_e('Display Ticket Selector', 'event_espresso'); ?><?php echo EEH_Template::get_help_tab_link(
                    'display_ticket_selector_info'
                ); ?>
            </label>
        </th>
        <td>
            <?php echo wp_kses(
                EEH_Form_Fields::select(
                    'ticket_selector',
                    (int) $display_ticket_selector,
                    $values,
                    'EED_Events_Archive_display_ticket_selector',
                    'EED_Events_Archive_display_ticket_selector'
                ),
                AllowedTags::getWithFormTags()
            ); ?>
            <p class="description"><?php
                esc_html_e(
                    'Whether the ticket selector should be shown on the events list page.',
                    'event_espresso'
                ); ?></p>
        </td>
    </tr>

    <tr>
        <th>
            <label for="EED_Events_Archive_display_datetimes">
                <?php esc_html_e('Display Datetimes', 'event_espresso'); ?><?php echo EEH_Template::get_help_tab_link(
                    'display_datetimes_info'
                ); ?>
            </label>
        </th>
        <td>
            <?php echo wp_kses(
                EEH_Form_Fields::select(
                    'venue_details',
                    (int) $display_datetimes,
                    $values,
                    'EED_Events_Archive_display_datetimes',
                    'EED_Events_Archive_display_datetimes'
                ),
                AllowedTags::getWithFormTags()
            ); ?>
            <p class="description"><?php
                esc_html_e(
                    'Whether the date and time details should be shown on the events list page.',
                    'event_espresso'
                ); ?></p>
        </td>
    </tr>

    <tr>
        <th>
            <label for="EED_Events_Archive_display_venue">
                <?php esc_html_e('Display Venue Details', 'event_espresso'); ?><?php echo EEH_Template::get_help_tab_link(
                    'display_venue_details_info'
                ); ?>
            </label>
        </th>
        <td>
            <?php echo wp_kses(
                EEH_Form_Fields::select(
                    'display_venue',
                    (int) $display_venue,
                    $values,
                    'EED_Events_Archive_display_venue',
                    'EED_Events_Archive_display_venue'
                ),
                AllowedTags::getWithFormTags()
            ); ?>
            <p class="description"><?php
                esc_html_e(
                    'Whether the venue details should be shown on the events list page.',
                    'event_espresso'
                ); ?></p>
        </td>
    </tr>

    <tr>
        <th>
            <label for="EED_Events_Archive_display_expired_events">
                <?php esc_html_e('Display Expired Events', 'event_espresso'); ?><?php echo EEH_Template::get_help_tab_link(
                    'display_expired_events_info'
                ); ?>
            </label>
        </th>
        <td>
            <?php echo wp_kses(
                EEH_Form_Fields::select(
                    'expired_events',
                    (int) $display_expired_events,
                    $values,
                    'EED_Events_Archive_display_expired_events',
                    'EED_Events_Archive_display_expired_events'
                ),
                AllowedTags::getWithFormTags()
            ); ?>
            <p class="description"><?php
                esc_html_e(
                    'Whether expired events should be shown on the events list page.',
                    'event_espresso'
                ); ?></p>
        </td>
    </tr>

    <tr class="ee-feature-highlight-2024">
        <th>
            <label for="EED_Events_Archive_display_events_with_expired_tickets">
                <?php esc_html_e('Display Events With Expired Tickets', 'event_espresso'); ?>
            </label>
        </th>
        <td>
            <?php echo wp_kses(
                EEH_Form_Fields::select(
                    'expired_tickets',
                    (int) $display_events_with_expired_tickets,
                    $values,
                    'EED_Events_Archive_display_events_with_expired_tickets',
                    'EED_Events_Archive_display_events_with_expired_tickets'
                ),
                AllowedTags::getWithFormTags()
            ); ?>
            <p class="description">
                <?php esc_html_e(
                    'Whether events where ALL tickets are expired should be shown on the events list page.',
                    'event_espresso'
                ); ?>
            </p>
            <span class="ee-feature-highlight-2024-notice">
                ✨ <?php esc_html_e('NEW','event_espresso'); ?>
            </span>
        </td>
    </tr>

    <tr>
        <th>
            <label for="EED_Events_Archive_use_sortable_display_order">
                <?php esc_html_e(
                    'Use Custom Display Order?',
                    'event_espresso'
                ); ?><?php // echo EEH_Template::get_help_tab_link('use_sortable_display_order_info');?>
            </label>
        </th>
        <td>
            <?php echo wp_kses(
                EEH_Form_Fields::select(
                    'use_sortable_display_order',
                    (int) $use_sortable_display_order,
                    $values,
                    'EED_Events_Archive_use_sortable_display_order',
                    'EED_Events_Archive_use_sortable_display_order'
                ),
                AllowedTags::getWithFormTags()
            ); ?>
            <p class="description"><?php
                esc_html_e(
                    'Selecting "Yes" will allow you to drag and drop the order of the Event Description, Date and Times, Ticket Selector, and Venue Information on the event archive page.',
                    'event_espresso'
                ); ?></p>
        </td>
    </tr>

    <tr>
        <th>
            <?php esc_html_e(
                'Display Order',
                'event_espresso'
            ); ?><?php // echo EEH_Template::get_help_tab_link( 'event_archive_order_info' ); ?>
        </th>
        <td>

            <?php wp_nonce_field(
                'espresso_update_event_archive_order',
                'espresso_update_event_archive_order_nonce',
                false
            ); ?>
            <?php echo wp_kses($event_archive_display_order, AllowedTags::getWithFormTags()); ?>

            <p class="description"><?php
                esc_html_e(
                    'Drag and Drop the above to determine the display order of the Event Description, Date and Times, Ticket Selector, and Venue Information on the event archive page.',
                    'event_espresso'
                ); ?></p>

        </td>
    </tr>

    <tr>
        <th>
            <label for="EED_Events_Archive_reset_event_list_settings">
                <?php esc_html_e('Reset Event List Settings', 'event_espresso'); ?>
            </label>
        </th>
        <td>
            <?php echo wp_kses(
                EEH_Form_Fields::select(
                    'reset_event_list_settings',
                    0,
                    $values,
                    'EED_Events_Archive_reset_event_list_settings',
                    'EED_Events_Archive_reset_event_list_settings'
                ),
                AllowedTags::getWithFormTags()
            ); ?>
            <p class="description"><?php
                esc_html_e(
                    'Selecting "Yes" will reset the Event List Settings to their default values.',
                    'event_espresso'
                ); ?></p>
        </td>
    </tr>

    </tbody>
</table>

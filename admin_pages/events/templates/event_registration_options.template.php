<?php

/**
 * @var EE_Event $event
 * @var int      $additional_limit
 * @var string   $active_status
 * @var string   $additional_registration_options
 * @var string   $display_ticket_selector
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>
<p>
    <label><?php esc_html_e('Active Status: ', 'event_espresso'); ?></label>
    <?php echo wp_kses($active_status, AllowedTags::getAllowedTags()); ?>
</p>

<p>
    <label for="max-registrants">
        <?php esc_html_e(
            'Maximum number of tickets allowed per order for this event: ',
            'event_espresso'
        ); ?>
    </label>
    <input class="ee-numeric"
           id="max-registrants"
           name="additional_limit"
           size="4"
           type="text"
           value="<?php echo esc_attr($additional_limit); ?>"
    />
</p>

<?php echo esc_html($additional_registration_options); ?>

<p>
    <label><?php esc_html_e('Display Ticket Selector', 'event_espresso'); ?></label>
    <?php echo wp_kses($display_ticket_selector, AllowedTags::getWithFormTags()); ?>
</p>

<p>
    <label for='event_phone'><?php esc_html_e('Event Phone Number', 'event_espresso'); ?></label>
    <input id="event_phone" name="event_phone" size="20" type="text" value="<?php echo esc_attr($event->phone()); ?>" />
</p>

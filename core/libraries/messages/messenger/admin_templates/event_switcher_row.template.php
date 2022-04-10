<?php

/**
 * This file is the wrapper template for the messages-custom-template-switcher rows
 * This template is content for event_switcher_wrapper.template.php
 *
 * @package Event Espresso
 * @subpackage Admin
 * @since 4.3.0
 *
 * Template args in this template
 *
 * @var string $mtpgID          Message Template Group ID
 * @var string $mt_name         Message Type Name
 * @var string $mt_slug         Message Type Slug
 * @var string $messenger_slug  Messenger Name
 * @var string $selector        Selector for choosing what template gets used for this message type
 * @var string $create_button   To create a new custom template based off the selected template
 * @var string $edit_button     To edit the selected template.
 * @var string $status_code
 */
?>
<tr id="<?php echo esc_attr($messenger_slug); ?>-message-selector-row-<?php echo esc_attr($mt_slug); ?>">
    <td>
        <label class='screen-reader-text for-event-message-type'>
            <?php esc_html_e('Message Type', 'event_espresso'); ?>
        </label>
        <div class='event-message-type'>
            <span class='ee-status-dot ee-status-bg--<?php echo esc_attr($status_code); ?>'></span>
            <?php echo esc_html($mt_name); ?>
        </div>
    </td>
    <td>
        <label class='screen-reader-text for-event-message-template' for="event_message_templates_relation[<?php echo esc_attr($mtpgID); ?>]">
            <?php esc_html_e('Template In Use', 'event_espresso'); ?>
        </label>
        <div class='event-message-template'><?php echo $selector; ?></div>
    </td>
    <td class="message-selector-action-column">

        <label class='screen-reader-text for-event-message-actions'>
            <?php esc_html_e('Actions', 'event_espresso'); ?>
        </label>
        <div class='event-message-actions'><?php echo $create_button . $edit_button; ?></div>
    </td>
</tr>

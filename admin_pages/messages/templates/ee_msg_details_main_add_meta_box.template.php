<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * @var EE_Event[] $active_events
 * @var array      $active_messengers
 * @var array      $active_message_types
 * @var int        $EVT_ID
 * @var string     $event_name
 * @var string     $action_message
 * @var string     $edit_message_template_form_url
 */

 $header = $event_name
            ? sprintf(
                /* translators: %s: event name */
                esc_html__('%1$s Custom Template', 'event_espresso'),
                $event_name
            )
            : '';
?>

<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
    <?php if ($header) : ?>
        <h3 class="admin-primary-mbox-h4">
            <?php echo $header; ?>
        </h3>
    <?php endif; ?>
    <p><?php echo wp_kses($action_message, AllowedTags::getWithFormTags()); ?></p>

    <form action="<?php echo esc_url_raw($edit_message_template_form_url); ?>"
          id='ee-msg-add-message-template-frm'
          method="post"
    >
        <input type="hidden" id="evt_id" name="EVT_ID" value="<?php echo absint($EVT_ID) ?: ''; ?>" />
        <?php
        if (isset($hidden_fields)) {
            echo wp_kses($hidden_fields, AllowedTags::getWithFormTags());
        } ?>
        <!--active_messengers -->
        <label for="MTP-messenger"><?php esc_html_e('Select Messenger', 'event_espresso'); ?></label>
        <select name="MTP_messenger" id="MTP-messenger">
            <?php foreach (array_keys($active_messengers) as $messenger) : ?>
                <option value="<?php echo esc_attr($messenger); ?>">
                    <?php echo esc_html(ucwords(str_replace('_', ' ', $messenger))); ?>
                </option>
            <?php endforeach; ?>
        </select>

        <label for="MTP-message-type"><?php esc_html_e('Select Message Type', 'event_espresso'); ?></label>
        <select name="MTP_message_type" id="MTP-message-type">
            <?php foreach (array_keys($active_message_types) as $message_type) : ?>
                <option value="<?php echo esc_attr($message_type); ?>">
                    <?php echo esc_html(ucwords(str_replace('_', ' ', $message_type))); ?>
                </option>
            <?php endforeach; ?>
        </select>

        <!-- events if we don't have an EVENT_ID -->
        <?php if (! empty($active_events)) : ?>
            <label for="EVT_ID_select"><?php esc_html_e('Select Event', 'event_espresso'); ?></label>
            <select name="EVT_ID" id="EVT_ID_select">
                <?php foreach ($active_events as $event) : ?>
                    <option value="<?php echo absint($event->event_id); ?>">
                        <?php echo esc_html($event->event_name); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        <?php endif; ?>

        <input id="submit-msg-add-sbmt" class="button--secondary" type="submit" value="Generate Templates">
    </form>
</div> <!-- end #admin-primary-mbox-dv -->

<?php

/**
 * @var bool   $show_notification_toggle
 * @var string $content
 * @var string $step_button_text
 * @var string $title
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div class="ee-new-registration-step-content clearfix">
    <h2 class="ee-new-registration-step-header"><?php echo esc_html($title) ?></h2>
    <div class="ee-new-registration-step-content">
        <?php echo wp_kses($content, AllowedTags::getWithFormTags()); ?>
        <?php
        if (
            $show_notification_toggle
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_send_message',
                'registration_message_type'
            )
        ) : ?>
            <div class="ee-attention">
                <label for="txn_reg_status_change" class="last">
                    <?php esc_html_e('Send Related Messages?', 'event_espresso'); ?>
                </label>
                <input checked=checked
                       id="txn_reg_status_change"
                       name="txn_reg_status_change[send_notifications]"
                       type="checkbox"
                       value="1"
                />
                <br />
                <br />
                <p class="description">
                    <?php esc_html_e('Send a notification to registrants after processing?', 'event_espresso'); ?>
                </p>
                <br />
            </div>
        <?php endif; ?>
        <input class='right button button--primary button--big'
               id="ee-new-registration-step-button"
               type="submit"
               value="<?php echo esc_attr($step_button_text); ?>"
        />
    </div>
</div>

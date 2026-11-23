<?php

defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * @var string $dashicon
 * @var string $dismiss_button
 * @var string $notice_class
 * @var string $persistent_admin_notice_message
 * @var string $persistent_admin_notice_name
 * @var array  $allowed_tags
 */

?>
<div id="<?php echo esc_attr($persistent_admin_notice_name); ?>" class="<?php esc_attr_e($notice_class);?>">
    <?php echo wp_kses($dismiss_button, $allowed_tags); ?>
    <div class="ee-nag-notice__body">
        <div class="ee-nag-notice__icons">
            <span class="<?php echo esc_attr($dashicon); ?>"></span>
        </div>
        <div class="ee-nag-notice__message">
            <?php echo wp_kses($persistent_admin_notice_message, $allowed_tags); ?>
        </div>
    </div>
</div>

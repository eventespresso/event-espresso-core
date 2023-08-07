<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

defined('EVENT_ESPRESSO_VERSION') || exit;
/** @var string $persistent_admin_notice_name */
/** @var string $persistent_admin_notice_message */
?>
<div id="<?php echo esc_attr($persistent_admin_notice_name); ?>" class="espresso-notices notice ee-nag-notice
ee-status-outline ee-status-outline--info ee-status-bg--info">
    <button class="button button--caution button--outline button--small dismiss-ee-nag-notice-btn dismiss-ee-nag-notice hide-if-no-js"
            data-target="<?php echo esc_attr($persistent_admin_notice_name); ?>"
    >
        <span class="dashicons dashicons-dismiss"></span><?php esc_html_e('Dismiss', 'event_espresso'); ?>
    </button>
    <p><?php echo wp_kses($persistent_admin_notice_message, AllowedTags::getWithFormTags()); ?></p>
    <div style="clear:both;"></div>
</div>

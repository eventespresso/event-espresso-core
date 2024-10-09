<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

defined('EVENT_ESPRESSO_VERSION') || exit;
/**
 * @var string $persistent_admin_notice_name
 * @var string $persistent_admin_notice_message
 * @var string $persistent_admin_notice_type
 * @var string $persistent_admin_notice_css
 * @var bool   $is_dismissible
 */

if (strpos($persistent_admin_notice_message, '<p>') === false) {
    $persistent_admin_notice_message = '<p>' . $persistent_admin_notice_message . '</p>';
}

$notice_class = "espresso-notices notice ee-nag-notice ee-status-outline";
$notice_class .= " ee-status-outline--$persistent_admin_notice_type";
$notice_class .= " ee-status-bg--$persistent_admin_notice_type";
$notice_class .= " $persistent_admin_notice_css";

switch($persistent_admin_notice_type) {
    case 'success':
        $dashicon = 'dashicons dashicons-yes-alt dashicons--bigger';
        break;
    case 'attention':
    case 'warning':
        $dashicon = 'dashicons dashicons-warning dashicons--bigger';
        break;
    case 'error':
        $dashicon = 'dashicons dashicons-dismiss dashicons--bigger';
        break;
    case 'info':
    default:
        $dashicon = 'dashicons dashicons-info dashicons--bigger';
        break;
}

$button_class = 'button button--caution button--outline button--small';
$button_class .= ' dismiss-ee-nag-notice-btn dismiss-ee-nag-notice hide-if-no-js';

$dismiss_button = $is_dismissible
    ? '
    <button class="' . esc_attr($button_class) . '" data-target="' . esc_attr($persistent_admin_notice_name) . '">
        <span class="dashicons dashicons-dismiss"></span>' . esc_html__('Dismiss', 'event_espresso') . '
    </button>'
    : '';

?>
<div id="<?php echo esc_attr($persistent_admin_notice_name); ?>" class="<?php esc_attr_e($notice_class);?>">
    <?php echo wp_kses($dismiss_button, AllowedTags::getWithFullTags()); ?>
    <div class="ee-nag-notice__body">
        <div class="ee-nag-notice__icons">
            <span class="<?php echo esc_attr($dashicon); ?>"></span>
        </div>
        <div class="ee-nag-notice__message">
            <?php echo wp_kses($persistent_admin_notice_message, AllowedTags::getWithFullTags()); ?>
        </div>
    </div>
</div>

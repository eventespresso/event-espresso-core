<?php

use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\services\request\sanitizers\AllowedTags;

defined('EVENT_ESPRESSO_VERSION') || exit;
/**
 * @var string $persistent_admin_notice_name
 * @var string $persistent_admin_notice_message
 * @var string $persistent_admin_notice_type
 * @var string $persistent_admin_notice_css
 * @var bool   $is_dismissible
 * @var bool   $espresso_page
 */

if (strpos($persistent_admin_notice_message, '<p>') === false) {
    $persistent_admin_notice_message = '<p>' . $persistent_admin_notice_message . '</p>';
}

$notice_class = "espresso-notices ee-nag-notice ee-status-outline";
$notice_class .= " ee-status-outline--$persistent_admin_notice_type";
$notice_class .= " ee-status-bg--$persistent_admin_notice_type notice";

switch($persistent_admin_notice_type) {
    case PersistentAdminNotice::TYPE_SUCCESS:
        $dashicon = 'dashicons dashicons-yes-alt dashicons--bigger';
        $notice_class .= ! $espresso_page ? " notice-success" : '';
        break;
    case PersistentAdminNotice::TYPE_ATTENTION:
    case PersistentAdminNotice::TYPE_WARNING:
        $dashicon = 'dashicons dashicons-warning dashicons--bigger';
        $notice_class .= ! $espresso_page ? " notice-warning" : '';
        break;
    case PersistentAdminNotice::TYPE_ERROR:
        $dashicon = 'dashicons dashicons-dismiss dashicons--bigger';
        $notice_class .= ! $espresso_page ? " notice-error" : '';
        break;
    case PersistentAdminNotice::TYPE_INFO:
    default:
        $dashicon = 'dashicons dashicons-info dashicons--bigger';
        $notice_class .= ! $espresso_page ? " notice-info" : '';
        break;
}

$notice_class .= $persistent_admin_notice_css ? " $persistent_admin_notice_css" : '';

$button_class = 'button button--caution button--ghost button--small';
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

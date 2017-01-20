<?php
defined('EVENT_ESPRESSO_VERSION') || exit;
/** @var bool $print_styles */
/** @var string $persistent_admin_notice_name */
/** @var string $persistent_admin_notice_message */
?>
<?php if ($print_styles): ?>
<style type="text/css" media="screen">
    /* espresso persistent admin notices */
    .espresso-notices.ee-nag-notice {
        border-left: 4px solid #fcb93c;
    }

    .dismiss-ee-nag-notice-btn {
        cursor: pointer;
        float: right;
        margin: .5em 0 0;
    }

    .dismiss-ee-nag-notice-btn a {
        color: #787878;
        text-decoration: none;
    }

    .dismiss-ee-nag-notice-btn a .dashicons {
        position: relative;
        top: -1px;
        margin-right: .25em;
    }
</style>
<?php endif;?>
<div id="<?php echo $persistent_admin_notice_name; ?>" class="espresso-notices updated ee-nag-notice clearfix">
    <button class="dismiss-ee-nag-notice-btn dismiss-ee-nag-notice hide-if-no-js" data-target="<?php echo $persistent_admin_notice_name; ?>">
        <a><span class="dashicons dashicons-dismiss"></span><?php esc_html_e('Dismiss', 'event_espresso'); ?></a>
    </button>
    <p><?php echo $persistent_admin_notice_message; ?></p>
    <div style="clear:both;"></div>
</div>
<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * invoice_payment_details_content
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @var string $invoice_url
 * @var string $page_confirmation_text
 * @var string $page_extra_info
 * @var string $page_title
 */
$allowedtags = AllowedTags::getAllowedTags();
?>
<div class="event-display-boxes">
    <?php if (! empty($page_title)) { ?>
        <h4 id="invoice_title" class="payment_type_title section-heading">
            <?php echo esc_html($page_title); ?>
        </h4>
    <?php }
    if (! empty($invoice_url)) { ?>
        <p>
            <a href="<?php echo esc_url_raw($invoice_url); ?>"
               class="ee-button-lnk inline-button ee-invoice-lnk"
               target="_blank"
            >
                <?php esc_html_e('View Invoice', 'event_espresso'); ?>
            </a>
        </p>
        <?php if (isset($page_confirmation_text)) { ?>
            <div class="event-messages ui-state-highlight">
                <span class="ui-icon ui-icon-alert"></span>
                <p class="instruct"><?php echo wpautop(wp_kses($page_confirmation_text, $allowedtags)); ?></p>
            </div>
        <?php }
        if (! empty($page_extra_info)) { ?>
            <div class="address-block">
                <?php echo wpautop(wp_kses($page_extra_info, $allowedtags)); ?>
            </div>
        <?php }
    } ?>
</div>

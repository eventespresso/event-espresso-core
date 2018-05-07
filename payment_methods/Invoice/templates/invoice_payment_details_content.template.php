<?php

/**
 * invoice_payment_details_content
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
?>
    <div class="event-display-boxes">
<?php
if (! empty($page_title)) {
    echo '<h4 id="invoice_title" class="payment_type_title section-heading">'
         . stripslashes_deep(
             $page_title
         ) . '</h4>';
}
if (! empty($invoice_url)) {
    ?>
    <p>
        <a href="<?php echo $invoice_url; ?>" class="ee-button-lnk inline-button ee-invoice-lnk" target="_blank">
            <?php _e('View Invoice', 'event_espresso'); ?>
        </a>
    </p>
    <?php

    if (isset($page_confirmation_text)) {
        echo '<div class="event-messages ui-state-highlight"><span class="ui-icon ui-icon-alert"></span><p class="instruct">'
             . stripslashes_deep(
                 $page_confirmation_text
             ) . '</p></div>';
    }

    if (! empty($page_extra_info)) {
        ?>
        <div class="address-block">
            <?php echo wpautop(stripslashes_deep($page_extra_info)); ?>
        </div>
        <?php
    }
    ?>
    </div>
    <?php
}

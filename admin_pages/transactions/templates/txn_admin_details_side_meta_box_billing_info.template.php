<?php

use EventEspresso\core\libraries\form_sections\payment_methods\BillingInfoSanitizer;

/**
 * @var EE_Form_Section_Proper|null $billing_form
 */
?>
<div id="admin-side-mbox-billing-info-dv" class="admin-side-mbox-dv">
    <?php if ($billing_form instanceof EE_Form_Section_Proper) :
        $found_cc_data = BillingInfoSanitizer::displaySanitizedBillingInfo($billing_form);
        if (
            apply_filters(
                'FHEE__txn_admin_details_side_meta_box_billing_info__show_default_note',
                $found_cc_data,
                $billing_form
            )
        ) { ?>
            <p class="help">
                <?php esc_html_e(
                    'Note: Card expiry dates and CCV are not stored. Only the last 4 digits of card numbers are stored.',
                    'event_espresso'
                ); ?>
            </p>
            <?php
        }
        do_action('AHEE__txn_admin_details_side_meta_box_billing_info__billing_form_footer', $billing_form);
    else : // invalid billing form ?>
        <div class="clearfix">
            <?php esc_html_e('There is no billing info for this transaction.', 'event_espresso'); ?><br/>
        </div>
    <?php endif; ?>
</div>

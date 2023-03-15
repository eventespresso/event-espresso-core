<?php

/**
 * @type EE_Transaction $transaction
 * @type boolean        $is_primary
 * @type string         $reg_url_link
 * @type string         $SPCO_attendee_information_url
 */

?>

<h3 class="ee-registration-details-h3"><?php esc_html_e('Registration Details', 'event_espresso'); ?></h3>
<?php do_action('AHEE__thank_you_page_registration_details_template__after_heading'); ?>

<div class="ee-registration-details-dv">
    <?php
    $registrations = $transaction->registrations();
    $registrations = is_array($registrations) ? $registrations : [];
    $reg_count     = count($registrations);
    $reg_cntr      = 0;
    $event_name    = '';
    $wait_list     = false;
    foreach ($registrations as $registration) {
        if (! $registration instanceof EE_Registration) {
            continue;
        }
        if ($event_name != $registration->event_name() && ! empty($event_name)) { ?>
            </tbody>
            </table>
            <?php
        }
        $reg_cntr++;
        if ($event_name != $registration->event_name()) {
            ?>
            <h5>
                <span class="smaller-text grey-text">
                    <?php esc_html_e('for', 'event_espresso'); ?> :
                </span>
                <?php echo esc_html($registration->event_name()); ?>
            </h5>
            <table class='ee-table ee-registrations-list'>
            <thead>
                <tr>
                    <th width="40%">
                        <?php esc_html_e("Registrant Name", 'event_espresso') ?>
                    </th>
                    <th width="25%" class="jst-left">
                        <?php esc_html_e("REG Code", 'event_espresso'); ?>
                    </th>
                    <th width="35%" class="jst-left">
                        <?php esc_html_e("REG Status", 'event_espresso'); ?>
                    </th>
                </tr>
            </thead>
            <tbody>
            <?php
        }
        if ($is_primary || (! $is_primary && $reg_url_link == $registration->reg_url_link())) { ?>
            <tr>
                <td width="40%">
                    <?php
                    if ($registration->attendee() instanceof EE_Attendee) {
                        echo esc_html($registration->attendee()->full_name(true));
                    }
                    ?>
                    <p class="tiny-text" style="margin: .75em 0 0;">
                        <?php if ($registration->count_question_groups()) { ?>
                            <a class="ee-icon-only-lnk"
                               href="<?php echo esc_url_raw($registration->edit_attendee_information_url()); ?>"
                               title="<?php esc_attr_e(
                                   'Click here to edit Attendee Information',
                                   'event_espresso'
                               ); ?>"
                            >
                                <span class="dashicons dashicons-groups"></span>
                                <?php esc_html_e('edit info', 'event_espresso'); ?>
                            </a>
                        <?php } ?>
                        <a class="ee-resend-reg-confirmation-email ee-icon-only-lnk"
                           href="<?php echo esc_url_raw(
                               add_query_arg(
                                   ['token' => $registration->reg_url_link(), 'resend_reg_confirmation' => 'true'],
                                   EE_Registry::instance()->CFG->core->thank_you_page_url()
                               )
                           ); ?>"
                           title="<?php esc_attr_e(
                               'Click here to resend the Registration Confirmation email',
                               'event_espresso'
                           ); ?>"
                           rel="<?php echo esc_attr($registration->reg_url_link()); ?>"
                        >
                            <span class="dashicons dashicons-email-alt"></span>
                            <?php esc_html_e('resend email', 'event_espresso'); ?>
                        </a>
                    </p>
                </td>
                <td width="25%" class="jst-left">
                    <?php $registration->e('REG_code') ?>
                </td>
                <td width="35%" class="jst-left">
                    <?php $registration->e_pretty_status(true) ?>
                    <?php
                    if ($registration->status_ID() === EEM_Registration::status_id_wait_list) {
                        $wait_list = true;
                    }
                    ?>
                </td>
            </tr>
            <?php do_action(
                'AHEE__thank_you_page_registration_details_template__after_registration_table_row',
                $registration
            ); ?>
            <?php
            $event_name = $registration->event_name();
        }
        if ($reg_cntr >= $reg_count) {
            ?>
            </tbody>
            </table>
            <?php
        }
    }
    ?>
    <?php if ($is_primary && $SPCO_attendee_information_url) { ?>
        <p class="small-text jst-rght">
            <a href='<?php echo esc_url_raw($SPCO_attendee_information_url) ?>'>
                <?php esc_html_e("Click here to edit All Attendee Information", 'event_espresso'); ?>
            </a>
        </p>
    <?php } ?>
    <?php
    if ($wait_list) {
        echo apply_filters(
            'AFEE__thank_you_page_registration_details_template__wait_list_notice',
            sprintf(
                esc_html__(
                    '%1$sre: Wait List Registrations%2$sPlease note that the total cost listed below in the Transaction Details is for ALL registrations, including those that are on the wait list, even though they can not be currently paid for. If any spaces become available however, you may be notified by the Event admin and have the opportunity to secure the remaining tickets by making a payment for them.%3$s',
                    'event_espresso'
                ),
                '<h6 class="" style="margin-bottom:.25em;"><span class="dashicons dashicons-clipboard ee-icon-size-16 purple-text"></span>',
                '</h6 ><p class="ee-wait-list-notice">',
                '</p ><br />'
            )
        );
    }
    do_action('AHEE__thank_you_page_registration_details_template__after_registration_details');
    ?>

</div>
<!-- end of .registration-details -->

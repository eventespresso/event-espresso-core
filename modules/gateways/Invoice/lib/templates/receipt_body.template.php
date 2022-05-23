<?php

/**
 * @deprecated 4.9.13
 * @var EE_Event[]        $events_for_txn
 * @var EE_Line_Item      $tax_total_line_item
 * @var EE_Line_Item[]    $ticket_line_items_per_event
 * @var EE_Registration[] $registrations_per_line_item
 * @var EE_Transaction    $transaction
 * @var EE_Venue[]        $venues_for_events
 * @var float             $amount_owed
 * @var float             $amount_pd
 * @var float             $total_cost
 * @var string            $edit_reg_info_url
 * @var string            $questions_to_skip
 * @var string            $retry_payment_url
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<div id="invoice">
    <table id="invoice-header" class="not-really-a-table">
        <tr>
            <td id="logo-dv">
                [invoice_logo_image]
                <div class="vcard" id="company-address">
                    <div class="fn org"><strong>[organization]</strong></div>
                    <div class="adr">
                        <div class="street-address">[street]</div>
                        <!-- street-address -->
                        <div class="locality">[city], [state]</div>
                        <div id="company-postcode"><span class="postal-code">[zip]</span></div>
                    </div>
                    <!-- adr -->
                    <div class="email">[email]</div>
                    <div class="vat"><?php esc_html_e('VAT/Tax Number:', 'event_espresso') ?>[vat]</div>
                </div>
            </td>
            <td>
                <div id="invoice-info">
                    <h2 id="invoice-hdr"><?php esc_html_e('Order Confirmation', 'event_espresso') ?></h2>
                    <h3 id="invoice-date">
                        <?php esc_html_e('Date:', 'event_espresso') ?>
                        <span class="plain-text">[registration_date]</span>
                    </h3>
                    <h3 id="invoice-txn-id">
                        <?php esc_html_e('Transaction ID:', 'event_espresso') ?>
                        <span class="plain-text">[transaction_id]</span>
                    </h3>
                    <h3 id="invoice-txn-status">
                        <?php esc_html_e('Status:', 'event_espresso') ?>
                        <span class="<?php echo esc_attr($transaction->status_ID()); ?> plain-text">
                            <?php echo wp_kses($transaction->pretty_status(), AllowedTags::getAllowedTags()); ?>
                        </span>
                    </h3>
                </div>
            </td>
        </tr>
    </table>
    <div class="events">
        <?php foreach ($events_for_txn as $event_id => $event) { ?>
            <h3 class="section-title event-name">
                <img class="icon" src="<?php echo EE_IMAGES_URL . 'calendar_year-24x24.png'; ?>">
                <?php
                esc_html_e(
                    "Event Name:",
                    "event_espresso"
                ) ?>
                <span class="plain-text"><?php echo wp_kses($event->name(), AllowedTags::getAllowedTags()); ?></span>
                <span class="small-text link">
                [ <a href='<?php echo esc_url_raw($event->get_permalink()) ?>'><?php esc_html_e('view', 'event_espresso'); ?></a> ]
            </span>
            </h3>
            <?php if (strlen($event->description() > 1)) { ?>
                <p class="event-description"><?php $event->description(); // already escaped ?></p>
            <?php } ?>
            <ul class="tickets-per-event">
                <?php
                foreach ($ticket_line_items_per_event[ $event_id ] as $line_item_id => $line_item) {
                    $ticket       = $line_item->ticket();
                    $taxable_html = $ticket->taxable()
                            ? '*'
                            : '';
                    $subitems     = $line_item->children();
                    $ticket_uses  = $ticket->get_pretty('TKT_uses', esc_html__("any", "event_espresso"));
                    ?>
                    <li class="event-ticket">
                        <div class="ticket-details">
                            <table class="invoice-amount">
                                <thead>
                                <tr class="header_row">
                                    <th class="name-column"><?php esc_html_e("Ticket", "event_espresso"); ?></th>
                                    <th colspan="2" class="desc-column">
                                        <?php
                                        esc_html_e(
                                            "Description",
                                            "event_espresso"
                                        ); ?></th>
                                    <th class="number-column item_c"><?php esc_html_e("Quantity", "event_espresso"); ?></th>
                                    <th class="number-column item_c"><?php esc_html_e("Price", "event_espresso"); ?></th>
                                    <th class="number-column item_r"><?php esc_html_e("Total", "event_espresso"); ?></th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php
                                if (count($subitems) < 2) { ?>
                                    <tr class="item">
                                        <td><?php echo esc_html($line_item->name() . $taxable_html); ?></td>
                                        <td colspan="2">
                                            <?php echo esc_html($line_item->desc()); ?>
                                            <p class="ticket-note">
                                                <?php
                                                echo sprintf(
                                                    esc_html__(
                                                        'This ticket can be used once at %s of the dates/times below.',
                                                        'event_espresso'
                                                    ),
                                                    $ticket_uses
                                                ); ?>
                                            </p>
                                        </td>
                                        <td class="item_c"><?php echo esc_html($line_item->quantity()); ?></td>
                                        <td class="item_c"><?php echo wp_kses($line_item->unit_price_no_code(), AllowedTags::getAllowedTags()); ?></td>
                                        <td class="item_r"><?php echo wp_kses($line_item->total_no_code(), AllowedTags::getAllowedTags());  ?></td>
                                    </tr>
                                    <?php
                                } else { ?>
                                    <tr class="item">
                                        <td class="aln-left">
                                            <?php echo esc_html($line_item->name() . $taxable_html); ?>
                                        </td>
                                        <td colspan="2"><?php echo esc_html($line_item->desc()); ?>
                                            <p class="ticket-note">
                                                <?php
                                                echo sprintf(
                                                    esc_html__(
                                                        'This ticket can be used once at %s of the dates/times below.',
                                                        'event_espresso'
                                                    ),
                                                    $ticket_uses
                                                ); ?>
                                            </p>
                                        </td>
                                        <td class="item_c">
                                            <?php echo esc_html($line_item->quantity()); ?>
                                        </td>
                                        <td class="item_c">
                                            <?php echo wp_kses($line_item->unit_price_no_code(), AllowedTags::getAllowedTags()); ?>
                                        </td>
                                        <td class="item_r">
                                            <?php echo wp_kses($line_item->total_no_code(), AllowedTags::getAllowedTags()); ?>
                                        </td>
                                    </tr>
                                    <?php
                                    foreach ($subitems as $sub_line_item) {
                                        $is_percent = $sub_line_item->is_percent(); ?>
                                        <tr class="subitem-row">
                                            <td class="subitem">
                                                <?php echo esc_html($sub_line_item->name()); ?>
                                            </td>
                                            <td colspan="2">
                                                <?php echo esc_html($sub_line_item->desc()) ?>
                                            </td>
                                            <td class="item_c">
                                            </td>
                                            <td class="item_c"><?php
                                                echo ($is_percent
                                                    ? $sub_line_item->percent() . "%"
                                                    : $sub_line_item->unit_price_no_code()); ?>
                                            </td>
                                            <td class="item_r"><?php echo wp_kses($sub_line_item->total_no_code(), AllowedTags::getAllowedTags()); ?></td>
                                        </tr>
                                        <?php
                                    } ?>
                                    <tr class="total_tr odd">
                                        <td colspan="4"></td>
                                        <td class="total" nowrap="nowrap">
                                            <?php esc_html_e("Ticket Total:", "event_espresso"); ?>
                                        </td>
                                        <td class="item_r">
                                            <?php echo wp_kses($line_item->total_no_code(), AllowedTags::getAllowedTags()); ?>
                                        </td>
                                    </tr>
                                    <?php
                                } ?>
                                </tbody>
                            </table>

                        </div>
                        <div class="reg-details-for-ticket">
                            <div class="ticket-time-and-place-details">
                                <div class="ticket-time-details">
                                    <h4 class="sub-section-title no-bottom-margin">
                                        <img class="icon" src="<?php echo esc_url_raw(EE_IMAGES_URL . 'clock-16x16.png'); ?>">
                                        <?php
                                        echo _n(
                                            "Date/Time:",
                                            "Dates/Times:",
                                            count($ticket->datetimes()),
                                            "event_espresso"
                                        ); ?></h4>
                                    <ul class="event-dates">
                                        <?php
                                        foreach ($ticket->datetimes_ordered() as $datetime) {
                                            /* @var $datetime EE_Datetime */ ?>
                                            <li><?php
                                                echo ($datetime->name()
                                                    ? '<b>' . esc_html($datetime->name()) . ' </b>'
                                                    : '');
                                                echo sprintf(
                                                    esc_html__("%s - %s (%s)", "event_espresso"),
                                                    $datetime->start_date_and_time(),
                                                    $datetime->end_date_and_time(),
                                                    $datetime->get_timezone()
                                                );
                                                echo ($datetime->description()
                                                    ? '<p class="ticket-note">' . wp_kses($datetime->description(), AllowedTags::getAllowedTags()) . '</p>'
                                                    : ''); ?></li>
                                            <?php
                                        } ?>
                                    </ul>
                                </div>
                                <?php
                                if ($event->venues()) { ?>
                                    <div class="ticket-place-details">
                                        <h4 class="sub-section-title no-bottom-margin">
                                            <img class="icon" src="<?php
                                            echo esc_url_raw(EE_IMAGES_URL . 'location-pin-16x16.png'); ?>">
                                            <?php
                                            echo _n(
                                                "Venue:",
                                                "Venues:",
                                                count($event->venues()),
                                                "event_espresso"
                                            ); ?></h4>
                                        <ul class="event-venues">
                                            <?php
                                            foreach ($event->venues() as $venue) { ?>
                                                <li><?php echo esc_html($venue->name()) ?>
                                                    <span class="small-text">
                                                [
                                                <a href='<?php echo esc_url_raw($venue->get_permalink()) ?>'>
                                                    <?php esc_html_e('view', 'event_espresso'); ?>
                                                </a>
                                                ]
                                            </span>
                                                </li>
                                                <?php
                                            } ?>
                                        </ul>
                                    </div>
                                    <?php
                                } ?>
                            </div>
                            <div class="ticket-registrations-area">
                                <h4 class="sub-section-title">
                                    <img class="icon" src="<?php
                                    echo esc_url_raw(EE_IMAGES_URL . 'users-16x16.png'); ?>">
                                    <?php
                                    echo esc_html__("Registration Details", "event_espresso"); ?>
                                    <span class="small-text link">[
                                <a class="print_button noPrint" href="<?php echo esc_url_raw($edit_reg_info_url); ?>">
                                    <?php esc_html_e('edit', 'event_espresso'); ?>
                                </a>
                                ]
                            </span>
                                </h4>
                                <ul class="ticket-registrations-list">
                                    <?php
                                    foreach ($registrations_per_line_item[ $line_item_id ] as $registration) {
                                        /* @var $registration EE_Registration */
                                        $attendee = $registration->attendee();
                                        $answers  = $registration->answers(
                                            ['order_by' => ['Question.Question_Group_Question.QGQ_order' => 'ASC']]
                                        ); ?>
                                        <li class="ticket-registration">
                                            <table class="registration-details">
                                                <tr class="odd">
                                                    <th>
                                                        <?php esc_html_e("Registration Code:", "event_espresso"); ?>
                                                    </th>
                                                    <td>
                                                        <?php echo wp_kses($registration->reg_code(), AllowedTags::getAllowedTags()); ?> -
                                                        <span class="<?php echo sanitize_html_class($registration->status_ID()); ?>">
                                                            <?php echo wp_kses($registration->pretty_status(), AllowedTags::getAllowedTags()); ?>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <?php
                                                foreach ($event->question_groups() as $question_group) { ?>
                                                    <tr>
                                                        <th>
                                                            <?php $question_group->e('QSG_name'); ?>
                                                        </th>
                                                        <td></td>
                                                    </tr>
                                                    <?php $has_personal_info = false;
                                                    foreach ($question_group->questions() as $question) {
                                                        if (in_array($question->system_ID(), $questions_to_skip)) {
                                                            $has_personal_info = true;
                                                            continue;
                                                        }
                                                        ?>
                                                        <tr>
                                                            <th>
                                                                <?php echo wp_kses($question->display_text(), AllowedTags::getAllowedTags()); ?>
                                                            </th>
                                                            <td>
                                                                <?php echo wp_kses($registration->answer_value_to_question($question), AllowedTags::getAllowedTags()); ?>
                                                            </td>
                                                        </tr>
                                                    <?php }
                                                    if ($has_personal_info) { ?>
                                                        <tr>
                                                            <th><?php esc_html_e('Attendee', 'event_espresso'); ?></th>
                                                            <td>
                                                                <?php
                                                                echo sprintf(
                                                                    esc_html__('%s (%s)', "event_espresso"),
                                                                    esc_html($attendee->full_name()),
                                                                    sanitize_email($attendee->email())
                                                                ) ?>
                                                            </td>
                                                        </tr>
                                                        <?php
                                                    }
                                                }
                                                ?>
                                            </table>
                                        </li>
                                        <?php
                                    } ?>
                                </ul>
                            </div>
                        </div>
                    </li>
                <?php } ?>
            </ul>
        <?php } ?>
    </div>
    <div class="taxes">
        <?php if ($tax_total_line_item && $tax_total_line_item->children()) { ?>
            <h3 class="section-title"><?php esc_html_e("Taxes", 'event_espresso') ?></h3>
            <table class="invoice-amount">
                <thead>
                <tr class="header_row">
                    <th class="left ticket_th"><?php esc_html_e("Tax Name", "event_espresso"); ?></th>
                    <th class="left"><?php esc_html_e('Description', 'event_espresso'); ?></th>
                    <th class="event_th item_c"><?php esc_html_e('Rate', 'event_espresso'); ?></th>
                    <th class="subtotal_th"><?php esc_html_e('Tax Amount', 'event_espresso'); ?></th>
                </tr>
                </thead>
                <tbody>
                <?php foreach ($tax_total_line_item->children() as $child_tax) { ?>
                    <tr>
                        <td><?php echo esc_html($child_tax->name()); ?></td>
                        <td><?php echo esc_html($child_tax->desc()); ?></td>
                        <td class="item_c"><?php echo esc_html($child_tax->percent()); ?>%
                        </td>
                        <td class="item_r"><?php echo wp_kses($child_tax->total_no_code(), AllowedTags::getAllowedTags()); ?></td>
                    </tr>
                <?php } ?>
                <tr class="total_tr odd">
                    <td class="total_tr" colspan="2"></td>
                    <td class="total"><?php esc_html_e("Tax Total:", "event_espresso"); ?></td>
                    <td class="item_r"><?php echo wp_kses($tax_total_line_item->total_no_code(), AllowedTags::getAllowedTags()); ?></td>
                </tr>
                </tbody>
            </table>
        <?php } ?>
        <p><?php esc_html_e("* taxable items", "event_espresso"); ?></p>
    </div>
    <div class="grand-total-dv">
        <h2 class="grand-total">
            <?php
            printf(
                esc_html__("Grand Total: %s", "event_espresso"),
                EEH_Template::format_currency($total_cost)
            ); ?>
        </h2>
    </div>
    <div class="payment-dv">
        <h3 class="section-title"><?php esc_html_e("Payments", 'event_espresso') ?></h3>
        <p>[instructions]</p>
        <table class="invoice-amount">
            <thead>
            <tr class="header_row">
                <th><span class=""><?php esc_html_e('Payment Method', 'event_espresso'); ?></span></th>
                <th class='left datetime_th'><?php esc_html_e("Date", 'event_espresso') ?></th>
                <th><span class=""><?php esc_html_e('Transaction Id / Cheque #', 'event_espresso'); ?></span></th>
                <th><span class=""><?php esc_html_e('P.O. / S.O.#', 'event_espresso'); ?></span></th>
                <th><span class=""><?php esc_html_e('Status', 'event_espresso'); ?></span></th>
                <th><?php esc_html_e('Amount', 'event_espresso'); ?></th>
            </tr>
            </thead>
            <tbody>
            <?php
            $c = false;
            if (! empty($payments)) {
                foreach ($payments as $payment) {
                    /* @var $payment EE_Payment */ ?>
                    <tr class='item <?php echo(($c = ! $c)
                        ? ' odd'
                        : '') ?>'>
                        <td><?php $payment->e('PAY_gateway') ?></td>
                        <td><?php echo esc_html($payment->timestamp()); ?></td>
                        <td><?php $payment->e('PAY_txn_id_chq_nmbr') ?></td>
                        <td><?php $payment->e('PAY_po_number') ?></td>
                        <td><?php $payment->e_pretty_status() ?></td>
                        <td class='item_r'><?php echo wp_kses($payment->amount_no_code(), AllowedTags::getAllowedTags()); ?></td>
                    </tr>
                <?php }
            } else { ?>
                <tr class='item'>
                    <td class='aln-cntr' colspan="6">
                        <?php
                        esc_html_e(
                            "No approved payments have been received.",
                            'event_espresso'
                        ) ?>
                    </td>
                </tr>
            <?php } ?>
            <tr class="item">
                <td class='aln-cntr' colspan="6">
                    <?php if ($amount_owed) { ?>
                        <a class="noPrint" href='<?php echo esc_url_raw($retry_payment_url); ?>'>
                            <?php esc_html_e("Please make a payment.", "event_espresso"); ?>
                        </a>
                    <?php } ?>
                </td>
            </tr>
            </tbody>
            <tfoot>
            <tr class='total_tr'>
                <td colspan="4">&nbsp;</td>
                <td class="item_r"><?php esc_html_e('Total Paid', 'event_espresso') ?></td>
                <td class="item_r">
                    <?php echo EEH_Template::format_currency($amount_pd, false, false) ?>
                </td>
            </tr>
            <tr class="total_tr odd">
                <td colspan="4">&nbsp;</td>
                <td class="total" id="total_currency"><?php esc_html_e('Amount Owed:', 'event_espresso'); ?></td>
                <td class="total"><?php echo EEH_Template::format_currency($amount_owed) ?></td>
            </tr>
            </tfoot>
        </table>
    </div>
    <div class="additional-info-dv">
        <h3 class="section-title"><?php esc_html_e("Additional Information:", "event_espresso"); ?></h3>
        <div class="additional-info">
            <?php if ($venues_for_events) { ?>
            <h2>
                <?php
                echo _n("Venue Details:", "Venues Details:", count($venues_for_events), "event_espresso"); ?>
            </h2>
            <table class="venue-list">
                <?php foreach ($venues_for_events as $venue) { ?>
                <tr class="venue-details">
                    <td class="venue-details-part venue-address-dv">
                        <h3>
                            <a href='<?php echo esc_url_raw($venue->get_permalink()) ?>'>
                                <?php echo esc_html($venue->name()); ?>
                            </a>
                        </h3>
                        <p><?php echo wp_kses($venue->description(), AllowedTags::getAllowedTags()); ?></p>
                        <?php echo EEH_Address::format($venue); ?>
                    </td>
                    <?php if ($venue->enable_for_gmap()) { ?>
                    <td class="venue-details-part venue-image-dv">
                        <?php echo EEH_Venue_View::espresso_google_static_map($venue); ?>
                    </td>
                    <?php } ?>
                </tr>
                <?php } ?>
            </table>
            <?php } ?>
        </div>
    </div>
</div>

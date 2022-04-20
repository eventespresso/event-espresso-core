<?php

/**
 * @var boolean       $show_ticket_details
 * @var boolean       $display_ticket_price
 * @var boolean       $event_is_expired
 * @var boolean       $show_ticket_sale_columns
 * @var int           $cols
 * @var int           $remaining
 * @var float         $ticket_price
 * @var string        $date_format
 * @var string        $time_format
 * @var string        $ticket_details_row_class
 * @var string        $ticket_details_css_id
 * @var string        $price_breakdown_heading
 * @var EE_Ticket     $ticket
 * @var TicketDetails $ticket_details
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;
use EventEspresso\modules\ticket_selector\TicketDetails;

$event_date_label = apply_filters(
    'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_event_date',
    esc_html__('Event Date ', 'event_espresso')
);

$sold_label = apply_filters(
    'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_this_ticket_sold',
    esc_html__('Sold', 'event_espresso')
);

$remaining_label = apply_filters(
    'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_this_ticket_left',
    esc_html__('Remaining', 'event_espresso')
);

$total_sold_label = apply_filters(
    'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_total_ticket_sold',
    esc_html__('Total Sold', 'event_espresso')
);

$spaces_left_label = apply_filters(
    'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_total_ticket_left',
    esc_html__('Total Spaces Left', 'event_espresso')
);

?>
<?php if ($show_ticket_details) : ?>
    <tr class="tckt-slctr-tkt-details-tr <?php echo esc_attr($ticket_details_row_class); ?>">
        <td class="tckt-slctr-tkt-details-td" colspan="<?php echo esc_attr($cols); ?>">
            <div id="<?php echo esc_attr($ticket_details_css_id); ?>-dv" class="tckt-slctr-tkt-details-dv" style="display: none;">

                <section class="tckt-slctr-tkt-details-sctn">
                    <h4><?php echo esc_html__('Details', 'event_espresso'); ?></h4>
                    <p><?php echo wp_kses($ticket->description(), AllowedTags::getAllowedTags()); ?></p>

                    <?php
                    do_action(
                        'AHEE__ticket_selector_chart_template__ticket_details__after_description',
                        $ticket,
                        $ticket_price,
                        $display_ticket_price
                    );
                    ?>
                    <section class="tckt-slctr-tkt-sale-dates-sctn">
                        <h5>
                            <?php echo apply_filters(
                                'FHEE__ticket_selector_chart_template__ticket_details_sales_date_heading',
                                esc_html__('Sale Dates', 'event_espresso')
                            ); ?>
                        </h5>
                        <span class="drk-grey-text small-text no-bold"> -
                            <?php echo apply_filters(
                                'FHEE__ticket_selector_chart_template__ticket_details_dates_available_message',
                                esc_html__('The dates when this option is available for purchase.', 'event_espresso')
                            ); ?>
                        </span>
                        <br />
                        <span class="ticket-details-label-spn drk-grey-text">
                            <?php echo apply_filters(
                                'FHEE__ticket_selector_chart_template__ticket_details_goes_on_sale',
                                esc_html__('Goes On Sale:', 'event_espresso')
                            ); ?>
                        </span>
                        <span class="dashicons dashicons-calendar"></span>
                        <?php echo esc_html($ticket->get_i18n_datetime('TKT_start_date', $date_format)) . ' &nbsp; '; ?>
                        <span class="dashicons dashicons-clock"></span>
                        <?php echo esc_html($ticket->get_i18n_datetime('TKT_start_date', $time_format)); ?>
                        <br />
                        <span class="ticket-details-label-spn drk-grey-text">
                            <?php echo apply_filters(
                                'FHEE__ticket_selector_chart_template__ticket_details_sales_end',
                                esc_html__('Sales End:', 'event_espresso')
                            ); ?>
                        </span>
                        <span class="dashicons dashicons-calendar"></span>
                        <?php echo esc_html($ticket->get_i18n_datetime('TKT_end_date', $date_format)) . ' &nbsp; '; ?>
                        <span class="dashicons dashicons-clock"></span>
                        <?php echo esc_html($ticket->get_i18n_datetime('TKT_end_date', $time_format)); ?>
                        <br />
                    </section>
                    <br />

                    <?php do_action('AHEE__ticket_selector_chart_template__after_ticket_date', $ticket); ?>

                    <?php if ($ticket->min() && $ticket->max()) { ?>
                        <section class="tckt-slctr-tkt-quantities-sctn">
                            <h5>
                                <?php echo apply_filters(
                                    'FHEE__ticket_selector_chart_template__ticket_details_purchasable_quantities_heading',
                                    esc_html__('Purchasable Quantities', 'event_espresso')
                                ); ?>
                            </h5>
                            <span class="drk-grey-text small-text no-bold"> -
                                <?php echo apply_filters(
                                    'FHEE__ticket_selector_chart_template__ticket_details_purchasable_quantities_message',
                                    esc_html__(
                                        'The number of tickets that can be purchased per transaction (if available).',
                                        'event_espresso'
                                    )
                                ); ?>
                            </span>
                            <br />
                            <span class="ticket-details-label-spn drk-grey-text">
                                <?php echo apply_filters(
                                    'FHEE__ticket_selector_chart_template__ticket_details_purchasable_quantities_min_qty',
                                    esc_html__('Minimum Qty:', 'event_espresso')
                                ); ?>
                            </span>
                            <?php
                            echo ($ticket->min() > 0 ? $ticket->min() : 0);

                            if ($ticket->min() > $remaining) {
                                ?> &nbsp;
                                <span class="important-notice small-text">
                                <?php echo apply_filters(
                                    'FHEE__ticket_selector_chart_template__ticket_details_purchasable_quantities_min_qty_message',
                                    esc_html__(
                                        'The Minimum Quantity purchasable for this ticket exceeds the number of spaces remaining',
                                        'event_espresso'
                                    )
                                ); ?>
                                </span>
                            <?php } ?>
                            <br />
                            <?php // $max = min( $max, $max_atndz );?>
                            <span class="ticket-details-label-spn drk-grey-text">
                                <?php echo apply_filters(
                                    'FHEE__ticket_selector_chart_template__ticket_details_purchasable_quantities_max_qty',
                                    esc_html__('Maximum Qty:', 'event_espresso')
                                ); ?>
                            </span>
                            <?php echo ($ticket->max() === EE_INF
                                ? esc_html__('no limit', 'event_espresso')
                                : max($ticket->max(), 1));
                            ?>
                            <br />
                        </section>
                        <br />
                    <?php } ?>

                    <?php if ((! defined('EE_DECAF') || EE_DECAF !== true) && $ticket->uses() !== EE_INF) { ?>
                        <section class="tckt-slctr-tkt-uses-sctn">
                            <h5>
                                <?php echo apply_filters(
                                    'FHEE__ticket_selector_chart_template__ticket_details_event_date_ticket_uses_heading',
                                    esc_html__('Event Date Ticket Uses', 'event_espresso')
                                ); ?>
                            </h5>
                            <span class="drk-grey-text small-text no-bold"> -
                                <?php echo apply_filters(
                                    'FHEE__ticket_selector_chart_template__ticket_details_event_date_ticket_uses_message',
                                    sprintf(
                                        esc_html__(
                                            'The number of separate event datetimes (see table below) that this ticket can be used to gain admittance to.%1$s%2$sAdmission is always one person per ticket.%3$s',
                                            'event_espresso'
                                        ),
                                        '<br/>',
                                        '<strong>',
                                        '</strong>'
                                    )
                                );
                                ?>
                            </span>
                            <br />
                            <span class="ticket-details-label-spn drk-grey-text">
                                <?php echo apply_filters(
                                    'FHEE__ticket_selector_chart_template__ticket_details_event_date_number_datetimes',
                                    esc_html__('# Datetimes:', 'event_espresso')
                                ); ?>
                            </span>
                            <?php echo wp_kses($ticket->uses(), AllowedTags::getAllowedTags()); ?>
                            <br />
                        </section>
                    <?php } ?>

                    <?php
                    $datetimes          = $ticket->datetimes_ordered($event_is_expired, false);
                    $chart_column_width = $show_ticket_sale_columns ? ' ee-fourth-width' : ' ee-half-width';
                    if (! empty($datetimes)) { ?>
                        <section class="tckt-slctr-tkt-datetimes-sctn">
                            <h5>
                                <?php echo apply_filters(
                                    'FHEE__ticket_selector_chart_template__ticket_details_event_access_heading',
                                    esc_html__('Access', 'event_espresso')
                                ); ?>
                            </h5>
                            <span class="drk-grey-text small-text no-bold"> -
                                <?php echo apply_filters(
                                    'FHEE__ticket_selector_chart_template__ticket_details_event_access_message',
                                    esc_html__(
                                        'This option allows access to the following dates and times.',
                                        'event_espresso'
                                    )
                                ); ?>
                            </span>
                        <div class="tckt-slctr-tkt-details-tbl-wrap-dv">
                            <table class="tckt-slctr-tkt-details-tbl">
                                <thead>
                                    <tr>
                                        <th class="tckt-slctr-tkt-details-date-th">
                                            <span class="dashicons dashicons-calendar"></span>
                                            <span class="small-text">
                                            <?php echo apply_filters(
                                                'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_event_date',
                                                esc_html__('Date ', 'event_espresso')
                                            ); ?>
                                        </span>
                                        </th>
                                        <th class="tckt-slctr-tkt-details-time-th <?php echo esc_attr($chart_column_width); ?>">
                                            <span class="dashicons dashicons-clock"></span>
                                            <span class="small-text">
                                                <?php esc_html_e('Time ', 'event_espresso'); ?>
                                            </span>
                                        </th>
                                        <?php if ($show_ticket_sale_columns) : ?>
                                        <th class="tckt-slctr-tkt-details-this-ticket-sold-th ee-fourth-width cntr">
                                            <span class="smaller-text">
                                                <?php echo apply_filters(
                                                    'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_this_ticket_sold',
                                                    sprintf(esc_html__('Sold', 'event_espresso'), '<br/>')
                                                ); ?>
                                            </span>
                                        </th>
                                        <th class="tckt-slctr-tkt-details-this-ticket-left-th ee-fourth-width cntr">
                                            <span class="smaller-text">
                                                <?php echo apply_filters(
                                                    'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_this_ticket_left',
                                                    sprintf(esc_html__('Remaining', 'event_espresso'), '<br/>')
                                                ); ?>
                                            </span>
                                        </th>
                                        <th class="tckt-slctr-tkt-details-total-tickets-sold-th ee-fourth-width cntr">
                                            <span class="smaller-text">
                                                <?php echo apply_filters(
                                                    'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_total_ticket_sold',
                                                    sprintf(esc_html__('Total%sSold', 'event_espresso'), '<br/>')
                                                ); ?>
                                            </span>
                                        </th>
                                        <th class="tckt-slctr-tkt-details-total-tickets-left-th ee-fourth-width cntr">
                                            <span class="smaller-text">
                                                <?php echo apply_filters(
                                                    'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_total_ticket_left',
                                                    sprintf(esc_html__('Total Spaces%sLeft', 'event_espresso'), '<br/>')
                                                ); ?>
                                            </span>
                                        </th>
                                        <?php endif; // end $show_ticket_sale_columns conditional ?>
                                    </tr>
                                </thead>
                                <tbody>
                                <?php foreach ($datetimes as $datetime) {
                                    if ($datetime instanceof EE_Datetime) { ?>
                                    <tr>
                                        <td data-th="<?php echo esc_attr($event_date_label); ?>" class="small-text">
                                            <?php $datetime_name = $datetime->name(); ?>
                                            <?php echo ! empty($datetime_name)
                                            ? '<b>' . esc_html($datetime_name) . '</b><br/>'
                                            : ''; ?>
                                            <?php echo esc_html($datetime->date_range(
                                                $date_format,
                                                esc_html__(' to  ', 'event_espresso')
                                            )); ?>
                                        </td>
                                        <td data-th="<?php esc_html_e('Time ', 'event_espresso'); ?>"
                                            class="cntr small-text"
                                        >
                                            <?php echo esc_html($datetime->time_range(
                                                $time_format,
                                                esc_html__(' to  ', 'event_espresso')
                                            )); ?>
                                        </td>
                                        <?php if ($show_ticket_sale_columns) : ?>
                                        <td data-th="<?php echo esc_attr($sold_label); ?>" class="cntr small-text">
                                            <?php echo esc_html($ticket->sold()); ?>
                                        </td>
                                        <td data-th="<?php echo esc_attr($remaining_label); ?>" class="cntr small-text">
                                            <?php echo ($remaining === EE_INF
                                                ? '<span class="smaller-text">'
                                                  . esc_html__('unlimited ', 'event_espresso')
                                                  . '</span>'
                                                : $remaining); ?>
                                        </td>
                                        <td data-th="<?php echo esc_attr($total_sold_label); ?>" class="cntr small-text">
                                            <?php echo esc_html($datetime->sold()); ?>
                                        </td>
                                            <?php $tkts_left = $datetime->sold_out()
                                                ? '<span class="sold-out smaller-text">'
                                                  . esc_html__('Sold&nbsp;Out', 'event_espresso')
                                                  . '</span>'
                                                : $datetime->spaces_remaining(); ?>
                                        <td data-th="<?php echo esc_attr($spaces_left_label); ?>" class="cntr small-text">
                                            <?php echo ($tkts_left === EE_INF
                                                ? '<span class="smaller-text">'
                                                  . esc_html__('unlimited ', 'event_espresso')
                                                  . '</span>'
                                                : $tkts_left); ?>
                                        </td>
                                        <?php endif; // end $show_ticket_sale_columns conditional ?>
                                    </tr>
                                    <?php } ?>
                                <?php } ?>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <br />
                    <?php } ?>

                </section>

            </div>
        </td>
    </tr>
<?php endif;  // end template_settings->show_ticket_details check

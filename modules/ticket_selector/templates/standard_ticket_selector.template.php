<?php

use EventEspresso\modules\ticket_selector\TicketDetails;

/**
 * @var EE_Event                  $event
 * @var EE_Tax_Config             $tax_settings
 * @var EE_Ticket[]               $tickets
 * @var EE_Ticket_Selector_Config $template_settings
 * @var TicketDetails             $ticket_details
 * @var boolean                   $prices_displayed_including_taxes
 * @var boolean                   $taxable_tickets
 * @var int                       $EVT_ID
 * @var int                       $max_atndz
 * @var string                    $datetime_selector
 * @var string                    $hidden_inputs
 * @var string                    $table_header_price
 * @var string                    $table_header_qty
 * @var string                    $ticket_row_html
 */
?>
<div id="tkt-slctr-tbl-wrap-dv-<?php echo esc_attr($EVT_ID); ?>" class="tkt-slctr-tbl-wrap-dv">

<?php do_action('AHEE__ticket_selector_chart__template__before_ticket_selector', $event); ?>
<?php echo $datetime_selector; // already escaped ?>

    <table id="tkt-slctr-tbl-<?php echo esc_attr($EVT_ID); ?>" class="tkt-slctr-tbl">
        <thead>
        <tr>
            <th id="details-<?php echo esc_attr($EVT_ID); ?>" scope="col" class="ee-ticket-selector-ticket-details-th">
                <?php
                echo apply_filters(
                    'FHEE__ticket_selector_chart_template__table_header_available_tickets',
                    esc_html__('Details', 'event_espresso'),
                    $EVT_ID
                );
                ?>
            </th>
            <?php if (apply_filters('FHEE__ticket_selector_chart_template__display_ticket_price_details', true)) { ?>
                <th id="price-<?php echo $esc_attr($EVT_ID); ?>" scope="col" class="ee-ticket-selector-ticket-price-th cntr">
                    <?php echo $table_header_price; ?>
                </th>
            <?php } ?>
            <th id="quantity-<?php echo esc_attr($EVT_ID); ?>" scope="col" class="ee-ticket-selector-ticket-qty-th cntr">
                <?php echo $table_header_qty; ?>
            </th>
        </tr>
        </thead>
        <tbody>
        <?php echo $ticket_row_html; // already escaped ?>
        </tbody>
    </table>
<?php
if ($taxable_tickets && apply_filters('FHEE__ticket_selector_chart_template__display_ticket_price_details', true)) {
    if ($prices_displayed_including_taxes) {
        $ticket_price_includes_taxes = esc_html__('* price includes taxes', 'event_espresso');
    } else {
        $ticket_price_includes_taxes = esc_html__('* price does not include taxes', 'event_espresso');
    }
    echo '<p class="small-text lt-grey-text" style="text-align:right; margin: -1em 0 1em;">
        ' . $ticket_price_includes_taxes . '
        </p>';
}
?>

<?php echo $hidden_inputs; // already escaped ?>

<?php
if ($max_atndz > 0) {
    echo apply_filters(
        'FHEE__ticket_selector_chart_template__maximum_tickets_purchased_footnote',
        esc_html('')
    );
}
if (! apply_filters('FHEE__EE_Ticket_Selector__display_ticket_selector_submit', false)) {
    add_filter('FHEE__EE_Ticket_Selector__no_ticket_selector_submit', '__return_true');
}
do_action('AHEE__ticket_selector_chart__template__after_ticket_selector', $EVT_ID, $event);

<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;
use EventEspresso\modules\ticket_selector\TicketDetails;

/**
 * @var EE_Event                  $event
 * @var EE_Tax_Config             $tax_settings
 * @var EE_Ticket[]               $tickets
 * @var EE_Ticket_Selector_Config $template_settings
 * @var TicketDetails             $ticket_details
 * @var boolean                   $event_is_expired
 * @var boolean                   $prices_displayed_including_taxes
 * @var boolean                   $taxable_tickets
 * @var int                       $EVT_ID
 * @var int                       $max_atndz
 * @var int                       $row
 * @var int                       $ticket_count
 * @var string                    $anchor_id
 * @var string                    $date_format
 * @var string                    $datetime_selector
 * @var string                    $event_status
 * @var string                    $hidden_inputs
 * @var string                    $ticket_row_html
 * @var string                    $time_format
 */
?>
<div id="tkt-slctr-tbl-wrap-dv-<?php echo esc_attr($EVT_ID); ?>" class="tkt-slctr-tbl-wrap-dv">

<?php do_action('AHEE__ticket_selector_chart__template__before_ticket_selector', $event); ?>
<?php echo wp_kses($datetime_selector, AllowedTags::getWithFormTags()); ?>

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
                <th id="price-<?php echo esc_attr($EVT_ID); ?>" scope="col" class="ee-ticket-selector-ticket-price-th cntr">
                    <?php
                    /**
                     * Filters the text printed for the header of the price column in the ticket selector table
                     *
                     * @since 4.7.2
                     *
                     * @param string 'Price' The translatable text to display in the table header for price
                     * @param int $EVT_ID The Event ID
                     */
                    echo apply_filters(
                        'FHEE__ticket_selector_chart_template__table_header_price',
                        esc_html__('Price', 'event_espresso'),
                        $EVT_ID
                    );
                    ?>
                </th>
            <?php } ?>
            <th id="quantity-<?php echo esc_attr($EVT_ID); ?>" scope="col" class="ee-ticket-selector-ticket-qty-th cntr">
                <?php
                /**
                 * Filters the text printed for the header of the quantity column in the ticket selector table
                 *
                 * @since 4.7.2
                 *
                 * @param string 'Qty' The translatable text to display in the table header for the Quantity of tickets
                 * @param int $EVT_ID The Event ID
                 */
                echo apply_filters(
                    'FHEE__ticket_selector_chart_template__table_header_qty',
                    esc_html__('Qty', 'event_espresso'),
                    $EVT_ID
                );
                ?>
            </th>
        </tr>
        </thead>
        <tbody>
        <?php echo wp_kses($ticket_row_html, AllowedTags::getWithFormTags()); ?>
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

<?php echo wp_kses($hidden_inputs, AllowedTags::getWithFormTags()); ?>

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

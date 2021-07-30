<?php

/**
 * This is the template for the html messenger and receipt message type ticket_list field.
 */

?>
<li class="event-ticket">
    <div class="ticket-details">
        <table class="invoice-amount">
            <thead>
                <tr class="header_row">
                    <th class="name-column"><?php esc_html_e("Ticket", "event_espresso"); ?></th>
                    <th colspan="2" class="desc-column"><?php esc_html_e("Description", "event_espresso"); ?></th>
                    <th class="number-column item_c"><?php esc_html_e("Quantity", "event_espresso"); ?></th>
                    <th class="number-column item_c"><?php esc_html_e("Price", "event_espresso"); ?></th>
                    <th class="number-column item_r"><?php esc_html_e("Total", "event_espresso"); ?></th>
                </tr>
            </thead>
            <tbody>[TICKET_LINE_ITEM_LIST]</tbody>
        </table>
    </div>
    <div class="reg-details-for-ticket">
        <div class="ticket-time-and-place-details">
            <div class="ticket-time-details">
                <h4 class="sub-section-title no-bottom-margin">
                    <img class="icon" src="<?php echo EE_IMAGES_URL . 'clock-16x16.png'; ?>"><?php esc_html_e('Date/Time:', 'event_espresso'); ?>
                </h4>
                <ul class="event-dates">[DATETIME_LIST]</ul>
            </div>
            <div class="ticket-place-details">
                <h4 class="sub-section-title no-bottom-margin">
                    <img class="icon" src="<?php echo EE_IMAGES_URL . 'location-pin-16x16.png'; ?>"><?php esc_html_e('Venue', 'event_espresso'); ?>
                </h4>
                <ul class="event-venues">
                    <li>[VENUE_TITLE]
                        <span class="small-text">( <a href="[VENUE_URL]"><?php esc_html_e('view', 'event_espresso'); ?></a> )</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="ticket-registrations-area">
            <h4 class="sub-section-title">
                <img class="icon" src="<?php echo EE_IMAGES_URL . 'users-16x16.png'; ?>"><?php esc_html_e("Registration Details", "event_espresso"); ?>
                <span class="small-text link">( <a class="print_button noPrint" href="[PRIMARY_REGISTRANT_FRONTEND_EDIT_REG_LINK]"><?php esc_html_e('edit', 'event_espresso'); ?></a> )</span>
            </h4>
            <ul class="ticket-registrations-list">[ATTENDEE_LIST]</ul>
        </div>
    </div>
</li>

<?php

/**
 * template vars in use
 *
 * @var EE_Datetime $time
 * @var int         $total_ticket_rows
 * @var string      $event_datetime_help_link
 * @var string      $existing_datetime_ids
 * @var string      $existing_ticket_ids
 * @var string      $ticket_js_structure
 * @var string      $ticket_options_help_link
 * @var string      $ticket_rows
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<?php do_action('AHEE__event_tickets_metabox_main__before_content'); ?>
<div id="event-and-ticket-form-content">
    <h4 class="event-tickets-datetimes-title">
        <?php esc_html_e('Event Datetime', 'event_espresso'); ?>
    </h4>
    <?php echo wp_kses($event_datetime_help_link, AllowedTags::getAllowedTags()); ?>
    <div class="event-datetimes-container">
        <!-- these are the ids for the current displayed datetimes (on create new this is blank -->
        <input id='datetime-IDs'
               name="datetime_IDs"
               type="hidden"
               value="<?php echo esc_attr($existing_datetime_ids); ?>"
        />

        <!-- this is used by js to calculate what the next datetime row will be and is incremented when a new datetime is "saved". -->
        <input type="hidden" name="datetime_total_rows" id="datetime-total-rows" value="1" />

        <section id="edit-event-datetime-1" class="datetime-edit">
            <input class='event-datetime-DTT_ID'
                   id="event-datetime-DTT_ID-1"
                   name="edit_event_datetimes[1][DTT_ID]"
                   type="hidden"
                   value="<?php echo esc_attr($time->get('DTT_ID')); ?>"
            />
            <table class="datetime-edit-table">
                <thead>
                    <tr valign="top">
                        <td><?php esc_html_e('Event Start', 'event_espresso'); ?></td>
                        <td><?php esc_html_e('Event End', 'event_espresso'); ?></td>
                        <td><?php esc_html_e('Reg Limit', 'event_espresso'); ?></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr valign="top">
                        <td class="event-datetime-column date-column">
                            <input class='ee-text-inp event-datetime-DTT_EVT_start ee-datepicker'
                                   data-context="start-dtt"
                                   data-date-field-context="#edit-event-datetime-1"
                                   data-related-field=".event-datetime-DTT_EVT_end"
                                   data-next-field=".event-datetime-DTT_EVT_end"
                                   id="event-datetime-DTT_EVT_start-1"
                                   name="edit_event_datetimes[1][DTT_EVT_start]"
                                   type="text"
                                   value="<?php echo esc_attr($time->get_date('DTT_EVT_start', 'Y-m-d h:i a')); ?>"
                            />
                        </td>
                        <td class="event-datetime-column date-column">
                            <input class='ee-text-inp event-datetime-DTT_EVT_end ee-datepicker'
                                   data-context="end-dtt"
                                   data-date-field-context="#edit-event-datetime-1"
                                   data-related-field=".event-datetime-DTT_EVT_start"
                                   data-next-field=".event-datetime-DTT_reg_limit"
                                   id="event-datetime-DTT_EVT_end-1"
                                   name="edit_event_datetimes[1][DTT_EVT_end]"
                                   type="text"
                                   value="<?php echo esc_attr($time->get_date('DTT_EVT_end', 'Y-m-d h:i a')); ?>"
                            />
                        </td>
                        <td class="event-datetime-column reg-limit-column">
                            <input class='ee-small-text-inp ee-inp-right event-datetime-DTT_reg_limit'
                                   id="event-datetime-DTT_reg_limit-1"
                                   name="edit_event_datetimes[1][DTT_reg_limit]"
                                   type="text"
                                   value="<?php echo esc_attr($time->get_pretty('DTT_reg_limit', 'input')); ?>"
                            />
                        </td>
                        <td class="datetime-tickets-sold">
                            <?php printf(
                                esc_html__('Tickets Sold: %s', 'event_espresso'),
                                $time->get('DTT_sold')
                            ); ?>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

    </div> <!-- end .event-datetimes-container -->
    <?php do_action('AHEE__event_tickets_metabox_main__after_datetime_fields'); ?>

    <div class="event-tickets-container">
        <h4 class="event-tickets-datetimes-title">
            <?php esc_html_e('Ticket Options', 'event_espresso'); ?>
        </h4>
        <?php echo wp_kses($ticket_options_help_link, AllowedTags::getAllowedTags()); ?>
        <br />
        <table class="add-new-ticket-table">
            <thead>
                <tr valign="top">
                    <td><!-- status --></td>
                    <td><?php esc_html_e('Ticket Name', 'event_espresso'); ?></td>
                    <td><?php esc_html_e('Sale Starts', 'event_espresso'); ?></td>
                    <td><?php esc_html_e('Sell Until', 'event_espresso'); ?></td>
                    <td><span class="hidden">currency symbol</span></td>
                    <td><?php esc_html_e('Price', 'event_espresso'); ?></td>
                    <td><?php esc_html_e('Qty', 'event_espresso'); ?></td>
                    <td><?php esc_html_e('Sold', 'event_espresso'); ?></td>
                    <td></td>
                </tr>
            </thead>
            <tbody id="all-ticket-rows">
                <?php echo wp_kses($ticket_rows, AllowedTags::getWithFormTags()); ?>
            </tbody>
        </table> <!-- end .add-new-ticket-table -->

        <input type="hidden" name="ticket_IDs" id="ticket-IDs" value="<?php echo esc_attr($existing_ticket_ids); ?>" />
        <input id='ticket-total-rows'
               name="ticket_total_rows"
               type="hidden"
               value="<?php echo esc_attr($total_ticket_rows); ?>"
        />
        <div class="save-cancel-button-container">
            <button class="button--secondary ee-create-button" data-context="ticket">
                <?php esc_html_e('Create New Ticket', 'event_espresso'); ?>
            </button>
        </div>
    </div> <!-- end .event-tickets-container -->
    <div style="clear:both"></div>
</div> <!-- end #event-and-ticket-form-content -->

<?php do_action('AHEE__event_tickets_metabox_main__after_content'); ?>

<table id="new-ticket-row-form" class="hidden">
    <tbody><?php echo wp_kses($ticket_js_structure, AllowedTags::getWithFormTags()); ?></tbody>
</table>

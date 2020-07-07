<div id="event-and-ticket-form-content">
    <h3 class="event-tickets-datetimes-title"><span data-target=".event-datetimes-container"
                                                    class="clickable ee-collapsible<?php echo $ee_collapsible_status; ?>"><span
                class="dashicons dashicons-clock ee-icon-size-20"></span><?php
                _e(
                    'Event Datetimes',
                    'event_espresso'
                ); ?></span></h3><?php echo $event_datetime_help_link; ?>
    <div class="event-datetimes-container">
        <div class="save-cancel-button-container">
            <button class="button-secondary ee-create-button datetime-create-button" data-context="datetime">
                <?php _e('Add Datetime', 'event_espresso'); ?>
            </button>
        </div>
        <!-- these are the ids for the current displayed datetimes (on create new this is blank -->
        <input type="hidden" name="datetime_IDs" id="datetime-IDs" value="<?php echo $existing_datetime_ids; ?>">

        <!-- this is used by js to calculate what the next datetime row will be and is incremented when a new datetime is "saved". -->
        <input type="hidden" name="datetime_total_rows" id="datetime-total-rows" value="<?php echo $total_dtt_rows; ?>">
        <table id="datetime-editing-dtts-table" class="datetime-edit-table">
            <thead>
            <tr valign="top">
                <td><span class="DTT_name_label"><?php _e('Name', 'event_espresso'); ?></span></td>
                <td><span class="DTT_EVT_start_label"><?php _e('Event Start', 'event_espresso'); ?></span></td>
                <td><span class="DTT_EVT_end_label"><?php _e('Event End', 'event_espresso'); ?></span></td>
                <td><span class="DTT_reg_limit_label"><?php _e('Limit', 'event_espresso'); ?></span></td>
                <td><span class="DTT_sold_label"><?php _e('Sold', 'event_espresso'); ?></span></td>
                <?php if (apply_filters('FHEE__event_tickets_metabox__dtt_reserved', true)) : ?>
                    <td><span class="DTT_reserved_label"><?php _e('Rsrvd', 'event_espresso'); ?></span></td>
                <?php endif; ?>
                <td></td>
            </tr>
            </thead>
            <tbody class="datetime-editing-dtts-tbody">
            <?php echo $datetime_rows; ?>
            </tbody>
        </table>
        <div style="clear:both"></div>
    </div> <!-- end .event-datetimes-container -->
    <div id="add-event-datetime" class="event-datetime-row add-dtt-row" style="display:none;">
        <h4 class="datetime-tickets-heading"><?php
            _e(
                'Add New Datetime',
                'event_espresso'
            ); ?></h4><?php echo $add_new_dtt_help_link; ?>
        <div>
            <table id="add-new-event-datetime-table" class="datetime-edit-table">
                <tr>
                    <td class="event-datetime-column date-name-column">
                        <label class="add-new-event-datetime-DTT_name_label"
                               for="add-new-event-datetime-DTT_name"><?php _e('Name', 'event_espresso'); ?></label>
                        <input type="text" name="add_new_datetime[DTT_name]" id="add-new-event-datetime-DTT_name"
                               class="ee-large-text-inp"
                               placeholder="<?php _e('Add Title (optional)', 'event_espresso'); ?>">
                    </td>
                    <td class="event-datetime-column date-column">
                        <label class="add-new-event-datetime-DTT_EVT_start_label"
                               for="add-new-event-datetime-DTT_EVT_start"><?php
                                _e(
                                    'Event Start',
                                    'event_espresso'
                                ); ?></label>
                        <input type="text" name="add_new_datetime[DTT_EVT_start]"
                               id="add-new-event-datetime-DTT_EVT_start" class="ee-text-inp ee-datepicker"
                               data-context="start-dtt" data-date-field-context="#add-event-datetime"
                               data-related-field="#add-new-event-datetime-DTT_EVT_end"
                               data-next-field="#add-new-event-datetime-DTT_EVT_start">
                    </td>
                    <td class="event-datetime-column date-column">
                        <label class="add-new-event-datetime-DTT_EVT_end_label"
                               for="add-new-event-datetime-DTT_EVT_end"><?php
                                _e(
                                    'Event End',
                                    'event_espresso'
                                ); ?></label>
                        <input type="text" name="add_new_datetime[DTT_EVT_end]" id="add-new-event-datetime-DTT_EVT_end"
                               class="ee-text-inp ee-datepicker" data-context="end-dtt"
                               data-date-field-context="#add-event-datetime"
                               data-related-field="#add-new-event-datetime-DTT_EVT_start"
                               data-next-field="#add-new-event-datetime-DTT_reg_limit">
                    </td>
                    <td class="event-datetime-column reg-limit-column">
                        <label class="add-new-event-datetime-DTT_EVT_end_label"
                               for="add-new-event-datetime-DTT_reg_limit"><?php
                                _e(
                                    'Limit',
                                    'event_espresso'
                                ); ?></label>
                        <input type="text" name="add_new_datetime[DTT_reg_limit]"
                               id="add-new-event-datetime-DTT_reg_limit" class="ee-numeric ee-small-text-inp">
                    </td>
                </tr>
            </table>
            <div class="save-cancel-button-container th-adjust">
                <button data-context="datetime-create" class="button-primary ee-create-button">
                    <?php _e('Create Datetime', 'event_espresso'); ?>
                </button>
                <button data-context="datetime-create" class="button-secondary ee-cancel-button">
                    <?php _e('Cancel', 'event_espresso'); ?>
                </button>
            </div>
            <div style="clear:both"></div>
        </div>
    </div> <!-- end #add-event-datetime -->
    <div style="clear:both"></div>


    <div style="clear: both; padding: 2rem 0 1rem; margin: 0 0 -2rem;">

        <script type="text/javascript">
            function openStatusNotice() {
                let link = document.getElementById( 'ee-open-notice-link' );
                link.classList.remove( 'ee-show-link' );
                let statusNotice = document.getElementById( 'ee-status-change-notice' );
                statusNotice.classList.add( 'ee-open-notice' );
            }

            function closeStatusNotice() {
                let link = document.getElementById( 'ee-open-notice-link' );
                link.classList.add( 'ee-show-link' );
                let statusNotice = document.getElementById( 'ee-status-change-notice' );
                statusNotice.classList.remove( 'ee-open-notice' );
            }
        </script>

        <style type="text/css">

            #ee-open-notice-link {
                box-shadow: none !important;
                color: #e34052;
                display: block;
                font-weight: 700;
                margin: .5rem 0;
                outline: none !important;
                text-decoration: none;
            }

            .ee-close-notice-btn {
                position: absolute;
                right: 20px;
                top: 16px;
                width: 20px;
                height: 20px;
                opacity: 0.4;
            }

            .ee-close-notice-btn:hover {
                opacity: .8;
            }

            .ee-close-notice-btn:after,
            .ee-close-notice-btn:before {
                position: absolute;
                left: 10px;
                content: ' ';
                height: 21px;
                width: 4px;
                background-color: #182e46;
            }

            .ee-close-notice-btn:after {
                transform: rotate(-45deg);
            }

            .ee-close-notice-btn:before {
                transform: rotate(45deg);
            }

            .ee-hide-container {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.4s ease;
            }

            .ee-open-notice {
                max-height: 16rem !important;
            }

            .ee-show-link {
                max-height: 1rem !important;
            }

            .ee-status-change-notice-div {
                background: #f1f1f1;
                font-size: 1rem;
                margin: 0 .25rem 1rem;
                padding: 1rem 2rem;
                position: relative;
                transition: max-height 0.4s ease;
            }

            .ee-status-change-notice-div h3 {
                color: #e34052;
                font-weight: 700;
                margin: .5rem 0 0;
            }

            .ee-status-change-notice-div p {
                font-size: .9rem;
            }

            .ee-status-change-notice-div ul {
                line-height: 2.5rem;
                list-style: inside;
            }

            .ee-status-change-notice-div span.pill {
                border-radius: 3px;
                color: white;
                padding: .2rem .6rem;
            }

            .ee-status-change-notice-div span.pill.yellow {
                background: #fcb93c;
            }

            .ee-status-change-notice-div span.pill.purple {
                background: #8a549a;
            }

            .ee-status-change-notice-div span.pill.charcoal {
                background: #403a3a;
            }
        </style>
        <a href="javascript:void();" onclick="openStatusNotice();" id="ee-open-notice-link" class="ee-hide-container
        ee-show-link">
            Click for an Important Notice regarding Status Color Codes
        </a>
        <div id="ee-status-change-notice" class="ee-hide-container ee-close-notice">
            <div class="ee-status-change-notice-div">

                <a href="javascript:void();" onclick="closeStatusNotice();" class="ee-close-notice-btn"></a>
                <h3>Important Notice Regarding Status Color Codes</h3>
                <p>In order to correct some inconsistencies in our ticket and datetime status color codes we have made
                    the
                    following changes:</p>
                <ul>
                    <li>
                        The Datetime and Ticket "Sold Out" status color has changed from
                        <span class="yellow pill">Yellow</span> to <span class="purple pill">Purple</span>
                    </li>
                    <li>
                        The Datetime "Postponed" status color has changed from
                        <span class="purple pill">Purple</span> to <span class="yellow pill">Yellow</span>
                    </li>
                    <li>
                        The Ticket "Archived" status color has changed from
                        <span class="purple pill">Purple</span> to <span class="charcoal pill">Charcoal</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="available-tickets-container">
        <h3 class="event-tickets-datetimes-title"><span data-target=".event-tickets-container"
                                                        class="clickable ee-collapsible<?php echo $ee_collapsible_status; ?>"><span
                    class="ee-icon ee-icon-tickets ee-icon-size-20"></span><?php
                    _e(
                        'Available Tickets',
                        'event_espresso'
                    ); ?></span></h3>
        <div class="event-tickets-container ee-create-ticket-button"<?php echo $show_tickets_container; ?>>
            <button class="ee-create-ticket-button button-secondary ee-create-button" data-context="ticket"><?php
                _e(
                    'Create Ticket',
                    'event_espresso'
                ); ?></button>
        </div>
        <div style="clear:both"></div>
        <div class="event-tickets-container"<?php echo $show_tickets_container; ?>>
            <table class="ticket-table">
                <thead>
                <tr valign="top">
                    <td colspan="2"><span class="TKT_name_label"><?php _e('Ticket', 'event_espresso'); ?></span></td>
                    <td><span class="TKT_goes_on_sale_label"><?php _e('Sale Starts', 'event_espresso'); ?></span></td>
                    <td><span class="TKT_sell_until_label"><?php _e('Sell Until', 'event_espresso'); ?></span></td>
                    <td><span class="TKT_price_label"><?php _e('Price', 'event_espresso'); ?></span></td>
                    <td><span class="TKT_qty_label"><?php _e('Qty', 'event_espresso'); ?></span></td>
                    <td><span class="TKT_sold_label"><?php _e('Sold', 'event_espresso'); ?></span></td>
                    <?php if (apply_filters('FHEE__event_tickets_metabox__tkt_reserved', true)) : ?>
                        <td><span class="TKT_reserved_label"><?php _e('Rsrvd', 'event_espresso'); ?></span></td>
                    <?php endif; ?>
                    <td colspan="2"><span class="TKT_regs_label"><?php _e('Regs', 'event_espresso'); ?></span></td>
                </tr>
                </thead>
                <tbody>
                <?php echo $ticket_rows; ?>
                </tbody>
            </table> <!-- end .ticket-table -->

            <input type="hidden" name="ticket_IDs" id="ticket-IDs" value="<?php echo $existing_ticket_ids; ?>">
            <input type="hidden" name="ticket_total_rows" id="ticket-total-rows"
                   value="<?php echo $total_ticket_rows; ?>">
        </div> <!-- end .event-tickets-container -->
        <div style="clear:both"></div>
    </div>
</div> <!-- end #event-and-ticket-form-content -->

<?php echo $ticket_js_structure; ?>
<?php
/**
 * template vars in use
 *
 * $event_datetime_help_link
 * $existing_datetime_ids
 * $total_dtt_rows
 * $add_new_dtt_help_link
 * $datetime_rows
 * $show_tickets_container
 * $ticket_rows
 * $existing_ticket_ids
 * $total_ticket_rows
 * $ticket_js_structure
 * $ee_collapsible_status
 */
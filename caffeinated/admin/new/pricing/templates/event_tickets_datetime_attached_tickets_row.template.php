<?php

/**
 * template args used
 *
 * @var int    $DTT_ID
 * @var int    $dtt_row
 * @var string $DTT_description
 * @var string $show_tickets_row
 * @var string $datetime_tickets_list
 * @var string $event_datetimes_name
 * @var string $add_new_datetime_ticket_help_link
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>
<tr id="advanced-dtt-edit-row-<?php echo esc_attr($dtt_row); ?>" class="advanced-dtt-edit-row">
    <td colspan="7">
        <section id="edit-event-datetime-tickets-<?php echo esc_attr($dtt_row); ?>"
                 class="datetime-tickets-edit" style="<?php echo esc_attr($show_tickets_row); ?>"
        >
            <div class="ee-editor-id-container">
                <h3 class="ee-item-id">
                    <?php echo esc_html(
                        $DTT_ID
                            ? sprintf(__('Datetime ID: %d', 'event_espresso'), $DTT_ID)
                            : ''
                    ); ?>
                </h3>
            </div>
            <div class="datetime-description-container">
                <label for="<?php echo esc_attr($event_datetimes_name . '-' . $dtt_row); ?>-DTT_description">
                    <?php esc_html_e('Datetime Description', 'event_espresso') ?>
                </label>
                <textarea name="<?php echo esc_attr($event_datetimes_name); ?>[<?php echo esc_attr($dtt_row); ?>][DTT_description]"
                          id="<?php echo esc_attr($event_datetimes_name . '-' . $dtt_row); ?>-DTT_description"
                          class="event-datetime-DTT_description ee-full-textarea-inp"
                ><?php echo esc_textarea($DTT_description); ?></textarea>
            </div>
            <?php do_action(
                'AHEE__event_tickets_datetime_attached_tickets_row_template__advanced_details_after_dtt_description',
                $dtt_row,
                $DTT_ID
            ); ?>
            <h4 class="datetime-tickets-heading"><?php esc_html_e('Assigned Tickets', 'event_espresso'); ?></h4>

            <ul class="datetime-tickets-list">
                <?php echo wp_kses($datetime_tickets_list, AllowedTags::getWithFormTags()); ?>
            </ul>


            <div class="add-datetime-ticket-container">
                <div class="ee-layout-row ee-layout-row--fixed">
                    <h4 class="datetime-tickets-heading">
                        <?php esc_html_e('Add New Ticket', 'event_espresso'); ?>
                    </h4>
                    <?php echo wp_kses($add_new_datetime_ticket_help_link, AllowedTags::getAllowedTags()); ?>
                </div>

                <table class="add-new-ticket-table">
                    <thead>
                        <tr valign="top">
                            <td>
                                <span class="ANT_TKT_name_label">
                                    <?php esc_html_e('Ticket Name', 'event_espresso'); ?>
                                </span>
                            </td>
                            <td>
                                <span class="ANT_TKT_goes_on_sale_label">
                                    <?php esc_html_e('Sale Starts', 'event_espresso'); ?>
                                </span>
                            </td>
                            <td>
                                <span class="ANT_TKT_sell_until_label">
                                    <?php esc_html_e('Sell Until', 'event_espresso'); ?>
                                </span>
                            </td>
                            <td>
                                <span class="ANT_TKT_price_label"><?php esc_html_e('Price', 'event_espresso'); ?></span>
                            </td>
                            <td>
                                <span class="ANT_TKT_qty_label"><?php esc_html_e('Qty', 'event_espresso'); ?></span>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr valign="top" class="add-new-ticket-shortcut-row">
                            <td>
                                <input maxlength="245" type="text" name="add_new_ticket[TKT_name]"
                                       class="add-new-ticket-TKT_name ee-large-text-inp"
                                >
                            </td>
                            <td>
                                <input type="text" name="add_new_ticket[TKT_start_date]"
                                       class="add-new-ticket-TKT_start_date ee-text-inp ee-datepicker"
                                       data-context="start-ticket"
                                       data-date-field-context="#edit-event-datetime-tickets-<?php echo esc_attr($dtt_row); ?>"
                                       data-related-field=".add-new-ticket-TKT_end_date"
                                       data-next-field=".add-new-ticket-TKT_end_date"
                                >
                            </td>
                            <td>
                                <input type="text" name="add_new_ticket[TKT_end_date]"
                                       class="add-new-ticket-TKT_end_date ee-text-inp ee-datepicker"
                                       data-context="end-ticket"
                                       data-date-field-context="#edit-event-datetime-tickets-<?php echo esc_attr($dtt_row); ?>"
                                       data-related-field=".add-new-ticket-TKT_start_date"
                                       data-next-field=".add-new-ticket-PRC_amount"
                                >
                            </td>
                            <td>
                                <input type="text" name="add_new_ticket[PRC_amount]"
                                       class="ee-text-inp add-new-ticket-PRC_amount ee-numeric" size="1"
                                >
                            </td>
                            <td>
                                <input type="text" name="add_new_ticket[TKT_qty]"
                                       class="ee-small-text-inp add-new-ticket-TKT_qty ee-numeric" size="1"
                                >
                            </td>
                            <td>
                            <span class="clickable gear-icon dashicons dashicons-admin-generic add-edit"
                                  data-context="short-ticket" data-datetime-row="<?php echo esc_attr($dtt_row); ?>"
                                  style="display:none"
                            ></span>
                                <!--
                                the "add-edit" class is used by jQuery to indicate we need to retrieve
                                an edit form using the value from the #next-ticket-row hidden input
                                (which in turn is incremented if the new created item is saved).
                                Also: when the Add New Ticket form is recalled, jQuery will automatically populate
                                the data-context and data-datetime-row properties on the edit icon and save buttons
                                from the event handler for the datetime being edited.
                                -->
                            </td>
                            <td colspan="2">
                                <div class="ee-layout-row">
                                    <button class="button button--primary button--small ee-create-button"
                                            data-context="short-ticket"
                                            data-datetime-row="<?php echo esc_attr($dtt_row); ?>"
                                    >
                                        <?php esc_html_e('Create', 'event_espresso'); ?>
                                    </button>
                                    <button class="button button--secondary button--small ee-cancel-button add-edit"
                                            data-context="short-ticket"
                                            data-datetime-row="<?php echo esc_attr($dtt_row); ?>"
                                    >
                                        <?php esc_html_e('Cancel', 'event_espresso'); ?>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="ee-editor-footer-container">
                </div>
                <div style="clear:both"></div>
            </div>
        </section> <!-- /.datetime-tickets-edit-->
    </td>
</tr>

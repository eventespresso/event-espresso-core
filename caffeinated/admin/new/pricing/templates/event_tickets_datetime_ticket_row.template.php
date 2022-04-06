<?php

/**
 * template args in use
 *
 * @var $tkt_row
 * @var $tkt_status_class
 * @var $TKT_name
 * @var $TKT_start_date
 * @var $TKT_end_date
 * @var $TKT_status
 * @var $TKT_price
 * @var $TKT_qty
 * @var $TKT_uses
 * @var $TKT_min
 * @var $TKT_max
 * @var $TKT_sold
 * @var $TKT_registrations
 * @var $TKT_ID
 * @var $ticket_datetime_rows
 * @var $TKT_description
 * @var $TKT_is_default
 * @var $TKT_price_amount
 * @var $TKT_price_code
 * @var $TKT_price_rows
 * @var $TKT_base_price
 * @var $TKT_base_price_ID
 * @var $TKT_order
 * @var $ticket_price_rows
 * @var $TKT_required
 * @var $TKT_reserved
 * @var $TKT_qty_for_input
 * @var $TKT_subtotal_amount_display
 * @var $disabled
 * @var $ticket_archive_class
 * @var $trash_icon
 * @var $trash_hidden
 * @var $clone_icon
 * @var $display_edit_tkt_row
 * @var $edit_tickets_name
 * @var $edit_tkt_expanded
 *
 * @var $TKT_taxable
 * @var $display_subtotal
 * @var $TKT_subtotal_amount
 * @var $tax_rows
 *
 * @var $show_price_modifier;
 * @var $total_price_rows
 * @var $ticket_datetimes_list
 * @var $starting_ticket_datetime_rows (datetimes attached to ticket on page load)
 * @var $existing_ticket_price_ids;
 * @var $ticket_template_id;
 * @var $show_price_modifier
 * @var $show_price_mod_button
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

$ticket_archive_class .= WP_DEBUG ? ' ee-wp-debug' : '';
?>
<tr class="ee-ticket-sortable ticket-row <?php echo sanitize_html_class($ticket_archive_class);?>"
    id="display-ticketrow-<?php echo esc_attr($tkt_row); ?>">
    <!-- TKT_order -->
    <td class="ee-tkt-order-field">
        <span class="ee-status-strip-td ee-status-strip <?php echo sanitize_html_class($tkt_status_class); ?>"></span>
        <input type="hidden"
               name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_order]"
               class="edit-ticket-TKT_order"
               value="<?php echo absint($TKT_order); ?>"
        >
    </td>
    <!-- TKT_name -->
    <td>
        <label class='screen-reader-text' for="edit-ticket-TKT_name-<?php echo esc_attr($tkt_row); ?>">
            <?php esc_html_e('Ticket Title', 'event_espresso') ?>
        </label>
        <input type="text"
               class="edit-ticket-TKT_name ee-large-text-inp"
               id="edit-ticket-TKT_name-<?php echo esc_attr($tkt_row); ?>"
               maxlength='245'
               name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_name]"
               placeholder="<?php
               esc_html_e('Ticket Title', 'event_espresso') ?>"
               value="<?php echo esc_attr($TKT_name); ?>"
        />
    </td>
    <!-- TKT_start_date -->
    <td>
        <?php if ($disabled) : ?>
            <input type="hidden"
                   class="edit-ticket-TKT_start_date ee-text-inp"
                   id="edit-ticket-TKT_start_date-<?php echo esc_attr($tkt_row); ?>"
                   name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_start_date]"
                   value="<?php echo esc_attr($TKT_start_date); ?>"
            />
            <label class='screen-reader-text' for="disabled-ticket-TKT_start_date-<?php echo esc_attr($tkt_row); ?>">
                <?php esc_html_e('Sale Starts', 'event_espresso') ?>
            </label>
            <input type="text" disabled
                   class="edit-ticket-TKT_start_date ee-text-inp"
                   id="disabled-ticket-TKT_start_date-<?php echo esc_attr($tkt_row); ?>"
                   name="archived_ticket[TKT_start_date]"
                   value="<?php echo esc_attr($TKT_start_date); ?>"
            />
        <?php else : ?>
            <label class='screen-reader-text' for="edit-ticket-TKT_start_date-<?php echo esc_attr($tkt_row); ?>">
                <?php esc_html_e('Sale Starts', 'event_espresso') ?>
            </label>
            <input type='text'
                   class="edit-ticket-TKT_start_date ee-text-inp ee-datepicker"
                   data-context="start-ticket"
                   data-date-field-context="#display-ticketrow-<?php echo esc_attr($tkt_row); ?>"
                   data-next-field=".edit-ticket-TKT_end_date"
                   data-related-field=".edit-ticket-TKT_end_date"
                   id="edit-ticket-TKT_start_date-<?php echo esc_attr($tkt_row); ?>"
                   name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_start_date]"
                   value="<?php echo esc_attr($TKT_start_date); ?>"
            />
        <?php endif; ?>
    </td>
    <!-- TKT_end_date -->
    <td>
        <?php if ($disabled) : ?>
            <input type="hidden"
                   id="edit-ticket-TKT_end_date-<?php echo esc_attr($tkt_row); ?>"
                   name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_end_date]"
                   class="edit-ticket-TKT_end_date ee-text-inp"
                   value="<?php echo esc_attr($TKT_end_date); ?>"
            />
            <label class='screen-reader-text' for='disabled-ticket-TKT_end_date-<?php echo esc_attr($tkt_row); ?>'>
                <?php esc_html_e('Sell Until', 'event_espresso') ?>
            </label>
            <input type="text" disabled
                   class="edit-ticket-TKT_end_date ee-text-inp"
                   id="disabled-ticket-TKT_end_date-<?php echo esc_attr($tkt_row); ?>"
                   name="archived_ticket[<?php echo esc_attr($tkt_row); ?>][TKT_end_date]"
                   value="<?php echo esc_attr($TKT_end_date); ?>"
            />
        <?php else : ?>
            <label class='screen-reader-text' for='edit-ticket-TKT_end_date-<?php echo esc_attr($tkt_row); ?>'>
                <?php esc_html_e('Sell Until', 'event_espresso') ?>
            </label>
            <input type='text'
                   class="edit-ticket-TKT_end_date ee-text-inp ee-datepicker"
                   data-context="end-ticket"
                   data-date-field-context="#display-ticketrow-<?php echo esc_attr($tkt_row); ?>"
                   data-next-field=".edit-ticket-TKT_qty"
                   data-related-field=".edit-ticket-TKT_start_date"
                   id="edit-ticket-TKT_end_date-<?php echo esc_attr($tkt_row); ?>"
                   name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_end_date]"
                   value="<?php echo esc_attr($TKT_end_date); ?>"
            />
        <?php endif; ?>
    </td>
    <!-- TKT_base_price -->
    <td>
        <?php if ($disabled) : ?>
            <input id="edit-ticket-TKT_base_price-<?php echo esc_attr($tkt_row); ?>" type="hidden"
                   name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_base_price]"
                   class="edit-ticket-TKT_base_price ee-small-text-inp edit-price-PRC_amount ee-numeric"
                   value="<?php echo esc_attr($TKT_base_price); ?>"
            />
            <label class='screen-reader-text' for='disabled-ticket-TKT_base_price-<?php echo esc_attr($tkt_row); ?>'>
                <?php esc_html_e('Price', 'event_espresso') ?>
            </label>
            <input type="text" disabled
                   class="edit-ticket-TKT_base_price ee-small-text-inp edit-price-PRC_amount ee-numeric"
                   id="disabled-ticket-TKT_base_price-<?php echo esc_attr($tkt_row); ?>"
                   name="archived_ticket[<?php echo esc_attr($tkt_row); ?>][TKT_base_price]"
                   value="<?php echo esc_attr($TKT_base_price); ?>"
            />
        <?php else : ?>
            <label class='screen-reader-text' for='edit-ticket-TKT_base_price-<?php echo esc_attr($tkt_row); ?>'>
                <?php esc_html_e('Price', 'event_espresso') ?>
            </label>
            <input id="edit-ticket-TKT_base_price-<?php echo esc_attr($tkt_row); ?>" type="text"
                   name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_base_price]"
                   class="edit-ticket-TKT_base_price ee-small-text-inp edit-price-PRC_amount ee-numeric"
                   value="<?php echo esc_attr($TKT_base_price); ?>"
            />
        <?php endif; ?>
        <input type="hidden" id="edit-ticket-TKT_base_price_ID-<?php echo esc_attr($tkt_row); ?>"
               name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_base_price_ID]"
               value="<?php echo esc_attr($TKT_base_price_ID); ?>"
        />
    </td>
    <!-- TKT_qty -->
    <td>
        <?php if ($disabled) : ?>
            <input type="hidden" class="edit-ticket-TKT_qty ee-small-text-inp ee-numeric"
                   name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_qty]"
                   value="<?php echo esc_attr($TKT_qty_for_input); ?>"
            />
            <label class='screen-reader-text' for='disabled-ticket-TKT_qty-<?php echo esc_attr($tkt_row); ?>'>
                <?php esc_html_e('Qty', 'event_espresso') ?>
            </label>
            <input type="text" disabled
                   class="edit-ticket-TKT_qty ee-small-text-inp ee-numeric"
                   id="disabled-ticket-TKT_qty-<?php echo esc_attr($tkt_row); ?>"
                   name="archived_ticket[<?php echo esc_attr($tkt_row); ?>][TKT_qty]"
                   value="<?php echo esc_attr($TKT_qty_for_input); ?>"
            />
        <?php else : ?>
            <label class='screen-reader-text' for='edit-ticket-TKT_qty-<?php echo esc_attr($tkt_row); ?>'>
                <?php esc_html_e('Qty', 'event_espresso') ?>
            </label>
            <input type="text"
                   id="edit-ticket-TKT_qty-<?php echo esc_attr($tkt_row); ?>"
                   class="edit-ticket-TKT_qty ee-small-text-inp ee-numeric"
                   name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_qty]"
                   value="<?php echo esc_attr($TKT_qty_for_input); ?>"
            />
        <?php endif; ?>
    </td>
    <!-- TKT_sold -->
    <td>
        <span class="ticket-display-row-TKT_sold"><?php echo esc_html($TKT_sold); ?></span>
    </td>
    <?php if (apply_filters('FHEE__event_tickets_metabox__tkt_reserved', true)) : ?>
    <!-- TKT_reserved -->
    <td>
        <span class="ticket-display-row-TKT_reserved"><?php echo esc_html($TKT_reserved); ?></span>
    </td>
    <?php endif; ?>
    <!-- TKT_registrations -->
    <td>
        <span class="ticket-display-row-TKT_registrations"><?php echo esc_html($TKT_registrations); ?></span>
    </td>
    <!-- actions -->
    <td>
        <div class="ee-editing-container <?php echo esc_attr($edit_tkt_expanded); ?>">
            <span class="gear-icon dashicons dashicons-admin-generic clickable"
                  data-ticket-row="<?php echo esc_attr($tkt_row); ?>"
                  data-context="ticket"
            ></span>
        </div>
        <span class="<?php echo esc_attr($clone_icon); ?>"
              data-ticket-row="<?php echo esc_attr($tkt_row); ?>"
              data-context="ticket"
        ></span>
        <span class="<?php echo esc_attr($trash_icon); ?>"
              data-ticket-row="<?php echo esc_attr($tkt_row); ?>"
              data-context="ticket"<?php echo $trash_hidden; ?>
        ></span>
        <span class="dashicons dashicons-image-flip-vertical sortable-drag-handle"></span>
    </td>
</tr>
<tr id="edit-ticketrow-<?php echo esc_attr($tkt_row); ?>" class="edit-ticket-row">
    <?php if (apply_filters('FHEE__event_tickets_metabox__tkt_reserved', true)) { ?>
    <td colspan="10">
    <?php } else { ?>
    <td colspan="9">
    <?php } ?>
        <fieldset id="fieldset-edit-ticketrow-<?php echo esc_attr($tkt_row); ?>"
                  class="ticket-fieldset"<?php echo $display_edit_tkt_row; ?>
        >
            <legend></legend>
            <input type="hidden"
                   class="edit-ticket-TKT_ID"
                   name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_ID]"
                   value="<?php echo absint($TKT_ID); ?>"
            />
            <input type="hidden"
                   class="edit-ticket-TKT_row"
                   name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_row]"
                   value="<?php echo esc_attr($tkt_row); ?>"
            />

            <label class='screen-reader-text' for='edit-ticket-TKT_description-<?php echo esc_attr($tkt_row); ?>'>
                <?php esc_html_e('Ticket Description', 'event_espresso') ?>
            </label>
            <textarea class='edit-ticket-TKT_description ee-full-textarea-inp'
                      id='edit-ticket-TKT_description-<?php echo esc_attr($tkt_row); ?>'
                      name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_description]"
                      placeholder="<?php esc_html_e('Ticket Description', 'event_espresso') ?>"
            ><?php echo esc_textarea($TKT_description); ?></textarea>

            <?php do_action('AHEE__event_tickets_datetime_ticket_row_template_after_desc', $tkt_row, $TKT_ID); ?>

            <div class="basic-ticket-container">
                <h4 class="tickets-heading"><?php esc_html_e('Ticket Details', 'event_espresso'); ?></h4>
                <div style="clear:both"></div>

                <table class="basic-ticket-info">
                    <thead>
                    <tr>
                        <td>
                            <span class="TD_TKT_number_datetimes_label">
                                <?php esc_html_e('# Datetimes', 'event_espresso'); ?>
                            </span>
                        </td>
                        <td>
                            <span class="TD_TKT_min_qty_label">
                                <?php esc_html_e('Minimum Quantity', 'event_espresso'); ?>
                            </span>
                        </td>
                        <td>
                            <span class="TD_TKT_max_qty_label">
                                <?php esc_html_e('Maximum Quantity', 'event_espresso'); ?>
                            </span>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <?php if ($disabled) : ?>
                                <input type="hidden"
                                       class="edit-ticket-TKT_uses ee-small-text-inp ee-numeric"
                                       name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_uses]"
                                       value="<?php echo esc_attr($TKT_uses); ?>"
                                />
                                <label class='screen-reader-text'
                                       for='disabled-ticket-TKT_uses-<?php echo esc_attr($tkt_row); ?>'
                                >
                                    <?php esc_html_e('Ticket Uses', 'event_espresso') ?>
                                </label>
                                <input type="text" disabled
                                       class="edit-ticket-TKT_uses ee-small-text-inp ee-numeric"
                                       id="disabled-ticket-TKT_uses-<?php echo esc_attr($tkt_row); ?>"
                                       name="archived_ticket[<?php echo esc_attr($tkt_row); ?>][TKT_uses]"
                                       value="<?php echo esc_attr($TKT_uses); ?>"
                                />
                            <?php else : ?>
                                <label class='screen-reader-text'
                                       for='edit-ticket-TKT_uses-<?php echo esc_attr($tkt_row); ?>'
                                >
                                    <?php
                                    esc_html_e('Ticket Uses', 'event_espresso') ?>
                                </label>
                                <input type="text"
                                       class="edit-ticket-TKT_uses ee-small-text-inp ee-numeric"
                                       id="edit-ticket-TKT_uses-<?php echo esc_attr($tkt_row); ?>"
                                       name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_uses]"
                                       value="<?php echo esc_attr($TKT_uses); ?>"
                                />
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php if ($disabled) : ?>
                                <input type="hidden"
                                       class="edit-ticket-TKT_min ee-small-text-inp ee-numeric"
                                       name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_min]"
                                       value="<?php echo esc_attr($TKT_min); ?>"
                                />
                                <label class='screen-reader-text' for='disabled-ticket-TKT_min-<?php echo esc_attr($tkt_row);?>'>
                                    <?php
                                    esc_html_e('Minimum Quantity', 'event_espresso') ?>
                                </label>
                                <input type="text" disabled
                                       class="edit-ticket-TKT_min ee-small-text-inp ee-numeric"
                                       id='disabled-ticket-TKT_min-<?php echo esc_attr($tkt_row);?>'
                                       name="archived_ticket[<?php echo esc_attr($tkt_row); ?>][TKT_min]"
                                       value="<?php echo esc_attr($TKT_min); ?>"
                                />
                            <?php else : ?>
                                <label class='screen-reader-text' for='edit-ticket-TKT_min-<?php echo esc_attr($tkt_row);?>'>
                                    <?php esc_html_e('Minimum Quantity', 'event_espresso') ?>
                                </label>
                                <input type="text"
                                       class="edit-ticket-TKT_min ee-small-text-inp ee-numeric"
                                       id='edit-ticket-TKT_min-<?php echo esc_attr($tkt_row);?>'
                                       name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_min]"
                                       value="<?php echo esc_attr($TKT_min); ?>"
                                />
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php if ($disabled) : ?>
                                <input type="hidden" class="edit-ticket-TKT_max ee-small-text-inp ee-numeric"
                                       name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_max]"
                                       value="<?php echo esc_attr($TKT_max); ?>"
                                />
                                <label class='screen-reader-text' for='disabled-ticket-TKT_max-<?php echo esc_attr($tkt_row);?>'>
                                    <?php esc_html_e('Maximum Quantity', 'event_espresso') ?>
                                </label>
                                <input type="text" disabled
                                       class="edit-ticket-TKT_max ee-small-text-inp ee-numeric"
                                       id='disabled-ticket-TKT_max-<?php echo esc_attr($tkt_row);?>'
                                       name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_max]"
                                       value="<?php echo esc_attr($TKT_max); ?>"
                                />
                            <?php else : ?>
                                <label class='screen-reader-text' for='edit-ticket-TKT_max-<?php echo esc_attr($tkt_row);?>'>
                                    <?php esc_html_e('Maximum Quantity', 'event_espresso') ?>
                                </label>
                                <input type="text"
                                       class="edit-ticket-TKT_max ee-small-text-inp ee-numeric"
                                       id='edit-ticket-TKT_max-<?php echo esc_attr($tkt_row);?>'
                                       name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_max]"
                                       value="<?php echo esc_attr($TKT_max); ?>"
                                />
                            <?php endif; ?>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button data-context="price-create" class="button-secondary ee-create-button ee-price-create-button"
                        data-ticket-row="<?php echo esc_attr($tkt_row); ?>"<?php echo $show_price_mod_button; ?>>
                    <?php esc_html_e('Add Price Modifier', 'event_espresso'); ?>
                </button>
                <div class="ticket-is-required-container">
                    <label for="edit-ticket-TKT_required-<?php echo esc_attr($tkt_row); ?>">
                        <input type="checkbox"
                               name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_required]"
                               class="edit-ticket-TKT_required"
                               id="edit-ticket-TKT_required-<?php echo esc_attr($tkt_row); ?>"
                               value="1"
                            <?php
                                echo ($TKT_required ? ' checked' : '');
                                echo ($disabled ? ' disabled' : '');
                            ?>
                        />
                        <?php esc_html_e(
                            'This ticket is required (will appear first in frontend ticket lists).',
                            'event_espresso'
                        ); ?>
                    </label>
                </div>
                <div class="ticket-is-taxable-container">
                    <?php if (! empty($tax_rows)) { ?>
                        <label for="edit-ticket-TKT_taxable-<?php echo esc_attr($tkt_row); ?>">
                        <?php if ($disabled) : ?>
                            <?php $tax_value = ! empty($TKT_taxable) ? 1 : 0; ?>
                        <input type='hidden'
                               class="TKT-taxable-checkbox"
                               name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_taxable]"
                               value="<?php echo esc_attr($tax_value); ?>"
                        />
                        <input type='checkbox' disabled
                               class="TKT-taxable-checkbox"
                               id="edit-ticket-TKT_taxable-<?php echo esc_attr($tkt_row); ?>"
                               name="archived_ticket[<?php echo esc_attr($tkt_row); ?>][TKT_taxable]"
                               value="1"<?php echo $TKT_taxable; ?>
                        />
                        <?php else : ?>
                        <input type='checkbox'
                               class="TKT-taxable-checkbox"
                               id="edit-ticket-TKT_taxable-<?php echo esc_attr($tkt_row); ?>"
                               name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_taxable]"
                               value="1"
                               <?php echo $TKT_taxable; ?>
                        />
                        <?php endif; ?>
                        <?php esc_html_e('This ticket is taxable.', 'event_espresso'); ?>
                    </label>
                    <?php } //end tax_rows check ?>
                </div>
            </div>

            <div class="price-table-container">
                <h4 class="tickets-heading price-table-info"<?php echo $show_price_modifier; ?>>
                    <?php esc_html_e('Price Modifiers', 'event_espresso'); ?>
                </h4>
                <table class="price-table">
                    <thead class="price-table-info"<?php echo $show_price_modifier; ?>>
                    <tr>
                        <td><?php esc_html_e('Price Type', 'event_espresso'); ?></td>
                        <td><?php esc_html_e('Name', 'event_espresso'); ?></td>
                        <td><?php esc_html_e('Description', 'event_espresso'); ?></td>
                        <td></td>
                        <td><?php esc_html_e('Amount', 'event_espresso'); ?></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody class="ticket-price-rows price-table-info"<?php echo $show_price_modifier; ?>>
                    <?php echo wp_kses($ticket_price_rows, AllowedTags::getWithFormTags()); ?>
                    </tbody>
                    <tfoot>
                    <tr class="price-subtotal-row TKT-taxes-display"<?php echo $display_subtotal; ?>>
                        <td colspan="4" class="ee-numeric">
                            <span class="TKT-taxable-subtotal-label">
                                <strong><?php esc_html_e('Subtotal', 'event_espresso'); ?></strong>
                            </span>
                        </td>
                        <td class="ee-numeric">
                            <span class="TKT-taxable-subtotal-amount-display">
                                <?php echo wp_kses($TKT_subtotal_amount_display, AllowedTags::getWithFormTags()); ?>
                            </span>
                            <input type="hidden"
                                   value="<?php echo esc_attr($TKT_subtotal_amount); ?>"
                                   name="subtotal_amount_<?php echo esc_attr($tkt_row); ?>"
                                   class="TKT-taxable-subtotal-amount"
                            />
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <?php echo wp_kses($tax_rows, AllowedTags::getWithFormTags()); ?>
                    <tr class="price-total-row">
                        <td colspan="4" class="ee-numeric">
                            <strong><?php esc_html_e('Total', 'event_espresso'); ?></strong>
                        </td>
                        <td class="ee-numeric">
                            <span id="price-total-amount-<?php echo esc_attr($tkt_row); ?>"><?php echo wp_kses($TKT_price, AllowedTags::getAllowedTags()); ?></span>
                            <input type="hidden"
                                   name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_price]"
                                   class="edit-ticket-TKT_price"
                                   value="<?php echo esc_attr($TKT_price_amount); ?>"
                            />
                        </td>
                        <td><?php echo wp_kses($TKT_price_code, AllowedTags::getWithFormTags()); ?></td>
                        <td>
                            <input type="hidden"
                                   name="price_total_rows_ticket[<?php echo esc_attr($tkt_row); ?>]"
                                   id="price-total-rows-<?php echo esc_attr($tkt_row); ?>"
                                   value="<?php echo esc_attr($total_price_rows); ?>"
                            />
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <div style="clear:both"></div>
            <h4 class="tickets-heading"><?php esc_html_e('Event Datetimes', 'event_espresso'); ?></h4>
            <p>
            <?php  esc_html_e(
                'This ticket will be usable (allow entrance) for the following selected event datetimes (click to select).  The "# Datetimes" amount (above) indicates how many of the assigned datetimes the ticket holder can gain access to:',
                'event_espresso'
            ); ?>
            </p>
            <ul class="datetime-tickets-list">
                <?php echo wp_kses($ticket_datetimes_list, AllowedTags::getWithFormTags()); ?>
            </ul>

            <?php do_action(
                'AHEE__event_tickets_datetime_ticket_row_template__advanced_details_end',
                $tkt_row,
                $TKT_ID
            ); ?>
            <div class="ee-editor-footer-container">
                <div class="ee-editor-id-container">
                    <span class="ee-item-id"><?php
                        echo ($TKT_ID
                            ? sprintf(esc_html__('Ticket ID: %d', 'event_espresso'), $TKT_ID)
                            : ''); ?></span>
                </div>
                <div class="save-cancel-button-container">
                    <label for="edit-ticket-TKT_is_default_selector-<?php echo esc_attr($tkt_row); ?>">
                        <?php esc_html_e(
                            'use this new ticket as a default ticket for any new events',
                            'event_espresso'
                        ); ?>
                        <input type="checkbox"
                               name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_is_default_selector]"
                               class="edit-ticket-TKT_is_default_selector"
                               id="edit-ticket-TKT_is_default_selector-<?php echo esc_attr($tkt_row); ?>"
                               value="1"
                               <?php echo ($disabled ? ' disabled' : ''); ?>
                        />
                    </label>
                    <input type="hidden"
                           name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_is_default]"
                           class="edit-ticket-TKT_is_default"
                           value="<?php echo esc_attr($TKT_is_default); ?>"
                    />
                    <button class="button button-secondary ee-cancel-button"
                            data-context="ticket"
                            data-ticket-row="<?php echo esc_attr($tkt_row); ?>">
                        <?php esc_html_e('Close', 'event_espresso'); ?>
                    </button>
                </div>
            </div>
            <!-- these hidden inputs are for tracking changes in dtts attached to tickets during a js session -->
            <input type="hidden"
                   class="starting-ticket-datetime-rows"
                   id="starting-ticket-datetime-rows-<?php echo esc_attr($tkt_row); ?>"
                   name="starting_ticket_datetime_rows[<?php echo esc_attr($tkt_row); ?>]"
                   value="<?php echo esc_attr($starting_ticket_datetime_rows); ?>"
            />
            <input type="hidden"
                   class="ticket-datetime-rows"
                   id="ticket-datetime-rows-<?php echo esc_attr($tkt_row); ?>"
                   name="ticket_datetime_rows[<?php echo esc_attr($tkt_row); ?>]"
                   value="<?php echo esc_attr($ticket_datetime_rows); ?>"
            />

            <!-- these hidden inputs are for tracking changes in prices attached to tickets during a js session -->
            <input type="hidden"
                   class="ticket-price-ids"
                   id="ticket-price-ids-<?php echo esc_attr($tkt_row); ?>"
                   name="ticket_price_ids[<?php echo esc_attr($tkt_row); ?>][]"
                   value="<?php echo esc_attr($existing_ticket_price_ids); ?>"
            />
            <input type="hidden"
                   class="ticket-template-id"
                   name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TTM_ID]"
                   value="<?php echo esc_attr($ticket_template_id); ?>"
            />
            <div style="clear:both"></div>
        </fieldset>
    </td>
</tr>

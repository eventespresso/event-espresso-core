<?php

/**
 * template args in use
 *
 * @var int $tkt_row
 * @var int $TKT_qty_for_input
 * @var string $tkt_status_class
 * @var string $TKT_name
 * @var string $ticket_datetime_rows
 * @var string $TKT_start_date
 * @var string $TKT_end_date
 * @var string $TKT_status
 * @var string $TKT_price
 * @var string $TKT_qty
 * @var string $TKT_uses
 * @var string $TKT_min
 * @var string $TKT_max
 * @var string $TKT_required
 * @var string $TKT_reserved
 * @var string $TKT_sold
 * @var string $TKT_registrations
 * @var string $TKT_ID
 * @var string $TKT_description
 * @var string $TKT_is_default
 * @var string $TKT_price_amount
 * @var string $TKT_price_code
 * @var string $TKT_price_rows
 * @var string $TKT_base_price
 * @var string $TKT_subtotal_amount_display
 * @var string $TKT_base_price_ID
 * @var string $TKT_order
 * @var string $disabled
 * @var string $ticket_archive_class
 * @var string $trash_icon
 * @var string $trash_hidden
 * @var string $display_edit_tkt_row
 * @var string $edit_tkt_expanded
 * @var string $edit_tickets_name
 * @var boolean $can_clone
 *
 * @var string $TKT_taxable
 * @var string $display_subtotal
 * @var string $TKT_subtotal_amount
 * @var string $tax_rows
 *
 * @var string $show_price_modifier;
 * @var string $ticket_price_rows
 * @var string $total_price_rows
 * @var string $ticket_datetimes_list
 * @var string $starting_ticket_datetime_rows (datetimes attached to ticket on page load)
 * @var string $existing_ticket_price_ids;
 * @var string $ticket_template_id;
 * @var string $show_price_modifier
 * @var string $show_price_mod_button
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
            <button aria-label="<?php esc_attr_e('edit ticket details', 'event_espresso'); ?>"
                    class="gear-icon dashicons dashicons-admin-generic ee-aria-tooltip button button--icon-only button--tiny clickable"
                    data-ticket-row="<?php echo esc_attr($tkt_row); ?>"
                    data-context="ticket"
            ></button>
        </div>
        <?php if ($can_clone) : ?>
        <button aria-label="<?php esc_attr_e('duplicate ticket', 'event_espresso'); ?>"
                class="button button--icon-only button--tiny clone-entity ee-aria-tooltip dashicons dashicons-admin-page clickable"
                data-ticket-row="<?php echo esc_attr($tkt_row); ?>"
                data-context="ticket"
        ></button>
        <?php endif; ?>
        <button aria-label="<?php esc_attr_e('trash ticket', 'event_espresso'); ?>"
                class="button button--icon-only button--tiny ee-aria-tooltip <?php echo esc_attr($trash_icon); ?>"
                data-ticket-row="<?php echo esc_attr($tkt_row); ?>"
                data-context="ticket"
                style="<?php echo esc_attr($trash_hidden); ?>"
        ></button>
        <span aria-label="<?php esc_html_e('Click and drag-n-drop to reorder tickets.', 'event_espresso') ?>"
                class="button button--icon-only button--tiny ee-aria-tooltip dashicons dashicons-move
                sortable-drag-handle"
        ></span>
    </td>
</tr>
<tr id="edit-ticketrow-<?php echo esc_attr($tkt_row); ?>" class="edit-ticket-row">
    <?php if (apply_filters('FHEE__event_tickets_metabox__tkt_reserved', true)) { ?>
    <td colspan="10">
    <?php } else { ?>
    <td colspan="9">
    <?php } ?>
        <fieldset id="fieldset-edit-ticketrow-<?php echo esc_attr($tkt_row); ?>"
                  class="ticket-fieldset" style="<?php echo esc_attr($display_edit_tkt_row); ?>"
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

            <div class="ee-editor-id-container">
                    <h3 class="ee-item-id">
                        <?php
                        echo esc_html(
                            $TKT_ID
                                ? sprintf(__('Ticket ID: %d', 'event_espresso'), $TKT_ID)
                                : ''
                        ); ?>
                    </h3>
            </div>
            <div class="basic-ticket-container">

                <label for='edit-ticket-TKT_description-<?php echo esc_attr($tkt_row); ?>'>
                    <?php esc_html_e('Ticket Description', 'event_espresso') ?>
                </label>
                <textarea class='edit-ticket-TKT_description ee-full-textarea-inp'
                          id='edit-ticket-TKT_description-<?php echo esc_attr($tkt_row); ?>'
                          name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_description]"
                ><?php echo esc_textarea($TKT_description); ?></textarea>

                <?php do_action('AHEE__event_tickets_datetime_ticket_row_template_after_desc', $tkt_row, $TKT_ID); ?>

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
                <button class="button button--accent button--small ee-create-button ee-price-create-button"
                        data-context="price-create"
                        data-ticket-row="<?php echo esc_attr($tkt_row); ?>"
                        style="<?php echo esc_attr($show_price_mod_button); ?>"
                >
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
                                echo esc_attr($TKT_required ? ' checked' : '');
                                echo esc_attr($disabled ? ' disabled' : '');
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
                               value="1"
                               <?php echo esc_attr($TKT_taxable); ?>
                        />
                        <?php else : ?>
                        <input type='checkbox'
                               class="TKT-taxable-checkbox"
                               id="edit-ticket-TKT_taxable-<?php echo esc_attr($tkt_row); ?>"
                               name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_taxable]"
                               value="1"
                               <?php echo esc_attr($TKT_taxable); ?>
                        />
                        <?php endif; ?>
                        <?php esc_html_e('This ticket is taxable.', 'event_espresso'); ?>
                    </label>
                    <?php } //end tax_rows check ?>
                </div>
            </div>

            <div class="price-table-container">
                <h4 class="tickets-heading price-table-info" style="<?php echo esc_attr($show_price_modifier); ?>">
                    <?php esc_html_e('Price Modifiers', 'event_espresso'); ?>
                </h4>
                <table class="price-table">
                    <thead class="price-table-info" style="<?php echo esc_attr($show_price_modifier); ?>">
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
                    <tbody class="ticket-price-rows price-table-info" style="<?php echo esc_attr($show_price_modifier); ?>">
                    <?php echo wp_kses($ticket_price_rows, AllowedTags::getWithFormTags()); ?>
                    </tbody>
                    <tfoot>
                    <tr class="price-subtotal-row TKT-taxes-display" style="<?php echo esc_attr($display_subtotal); ?>">
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
                <div class="ee-layout-row ee-layout-row--spaced">
                    <label for="edit-ticket-TKT_is_default_selector-<?php echo esc_attr($tkt_row); ?>">
                        <input type="checkbox"
                               name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_is_default_selector]"
                               class="edit-ticket-TKT_is_default_selector"
                               id="edit-ticket-TKT_is_default_selector-<?php echo esc_attr($tkt_row); ?>"
                               value="1"
                               <?php echo esc_attr($disabled ? ' disabled' : ''); ?>
                        />
                        <?php esc_html_e(
                            'use this new ticket as a default ticket for any new events',
                            'event_espresso'
                        ); ?>
                    </label>
                    <input type="hidden"
                           name="<?php echo esc_attr($edit_tickets_name); ?>[<?php echo esc_attr($tkt_row); ?>][TKT_is_default]"
                           class="edit-ticket-TKT_is_default"
                           value="<?php echo esc_attr($TKT_is_default); ?>"
                    />
                </div>
                <div class="ee-layout-row ee-layout-row--justify-end">
                    <button class="button button--secondary ee-cancel-button"
                            data-context="ticket"
                            data-ticket-row="<?php echo esc_attr($tkt_row); ?>"
                    >
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

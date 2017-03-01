    <tr valign="top" class="ee-ticket-sortable ticket-row<?php echo $ticket_archive_class; if(WP_DEBUG){ echo ' ee-wp-debug'; } ?>" id="display-ticketrow-<?php echo $tkt_row; ?>">
	<!--<td class="ee-tkt-order-field"><span class="dashicons dashicons-sort<?php echo $tkt_status_class; ?>"><input type="hidden" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_order]" class="edit-ticket-TKT_order" value ="<?php echo $TKT_order; ?>" ></span></td>-->
	<td class="ee-tkt-order-field"><span class="ee-status-strip-td ee-status-strip<?php echo $tkt_status_class; ?>"></span><input type="hidden" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_order]" class="edit-ticket-TKT_order" value ="<?php echo $TKT_order; ?>"></td>
	<td><input maxlength="245" type="text" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_name]" class="edit-ticket-TKT_name ee-large-text-inp" placeholder="Ticket Title" value="<?php echo $TKT_name; ?>"></td>
	<td>
		<?php if ( $disabled ) : ?>
			<input type="hidden" id="edit-ticket-TKT_start_date-<?php echo $tkt_row; ?>"  name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_start_date]" class="edit-ticket-TKT_start_date ee-text-inp" value="<?php echo $TKT_start_date; ?>" >
			<input type="text" name="archived_ticket[TKT_start_date]" class="edit-ticket-TKT_start_date ee-text-inp" value="<?php echo $TKT_start_date; ?>" disabled>
		<?php else : ?>
			<input id="edit-ticket-TKT_start_date-<?php echo $tkt_row; ?>" type="text" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_start_date]" class="edit-ticket-TKT_start_date ee-text-inp ee-datepicker" value="<?php echo $TKT_start_date; ?>" data-context="start-ticket" data-date-field-context="#display-ticketrow-<?php echo $tkt_row; ?>" data-related-field=".edit-ticket-TKT_end_date" data-next-field=".edit-ticket-TKT_end_date">
		<?php endif; ?>
	</td>
	<td>
		<?php if ( $disabled ) : ?>
			<input type="hidden" id="edit-ticket-TKT_end_date-<?php echo $tkt_row; ?>"  name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_end_date]" class="edit-ticket-TKT_end_date ee-text-inp" value="<?php echo $TKT_end_date; ?>" >
			<input type="text" name="archived_ticket[TKT_end_date]" class="edit-ticket-TKT_end_date ee-text-inp" value="<?php echo $TKT_end_date; ?>" disabled>
		<?php else : ?>
			<input id="edit-ticket-TKT_end_date-<?php echo $tkt_row; ?>" type="text" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_end_date]" class="edit-ticket-TKT_end_date ee-text-inp ee-datepicker" value="<?php echo $TKT_end_date; ?>" data-context="end-ticket" data-date-field-context="#display-ticketrow-<?php echo $tkt_row; ?>" data-related-field=".edit-ticket-TKT_start_date" data-next-field=".edit-ticket-TKT_qty">
		<?php endif; ?>
	</td>
	<td>
		<?php if ( $disabled ) : ?>
			<input id="edit-ticket-TKT_base_price-<?php echo $tkt_row; ?>" type="hidden" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_base_price]" class="edit-ticket-TKT_base_price ee-small-text-inp edit-price-PRC_amount ee-numeric" value="<?php echo $TKT_base_price; ?>">
			<input type="text" name="archived_ticket[<?php echo $tkt_row; ?>][TKT_base_price]" class="edit-ticket-TKT_base_price ee-small-text-inp edit-price-PRC_amount ee-numeric" value="<?php echo $TKT_base_price; ?>" disabled>
		<?php else : ?>
			<input id="edit-ticket-TKT_base_price-<?php echo $tkt_row; ?>" type="text" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_base_price]" class="edit-ticket-TKT_base_price ee-small-text-inp edit-price-PRC_amount ee-numeric" value="<?php echo $TKT_base_price; ?>">
		<?php endif; ?>
		<input type="hidden" id="edit-ticket-TKT_base_price_ID-<?php echo $tkt_row; ?>" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_base_price_ID]" value="<?php echo $TKT_base_price_ID; ?>">
	</td>
	<td>
		<?php if ( $disabled ) : ?>
			<input type="hidden" class="edit-ticket-TKT_qty ee-small-text-inp ee-numeric" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_qty]" value="<?php echo $TKT_qty_for_input; ?>">
			<input type="text" class="edit-ticket-TKT_qty ee-small-text-inp ee-numeric" name="archived_ticket[<?php echo $tkt_row; ?>][TKT_qty]" value="<?php echo $TKT_qty_for_input; ?>" disabled>
		<?php else : ?>
			<input type="text" id="edit-ticket-TKT_qty-<?php echo $tkt_row; ?>"class="edit-ticket-TKT_qty ee-small-text-inp ee-numeric" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_qty]" value="<?php echo $TKT_qty_for_input; ?>">
		<?php endif; ?>
	</td>
	<!--<td><span class="ticket-display-row-TKT_price"><?php //echo $TKT_price; ?></span></td>-->
	<td><span class="ticket-display-row-TKT_sold"><?php echo $TKT_sold; ?></span></td>
    <?php if(WP_DEBUG):  // for now we are only showing reserved counts if WP_DEBUG is on?>
	<td><span class="ticket-display-row-TKT_reserved"><?php echo $TKT_reserved; ?></span></td>
    <?php endif; ?>
    <td><span class="ticket-display-row-TKT_registrations"><?php echo $TKT_registrations; ?></span></td>
	<td><div class="ee-editing-container <?php echo $edit_tkt_expanded; ?>"><span class="gear-icon dashicons dashicons-admin-generic clickable" data-ticket-row="<?php echo $tkt_row; ?>" data-context="ticket"></span></div><span class="<?php echo $clone_icon; ?>" data-ticket-row="<?php echo $tkt_row; ?>" data-context="ticket"></span><span class="<?php echo $trash_icon; ?>" data-ticket-row="<?php echo $tkt_row; ?>" data-context="ticket"<?php echo $trash_hidden; ?>></span>
		<span class="dashicons dashicons-image-flip-vertical sortable-drag-handle"></span>
	</td>
</tr>
<tr id="edit-ticketrow-<?php echo $tkt_row; ?>" class="edit-ticket-row">
    <?php if (WP_DEBUG) {  // for now we are only showing reserved counts if WP_DEBUG is on ?>
    <td colspan="10">
    <?php } else {?>
    <td colspan="9">
    <?php } ?>
		<fieldset id="fieldset-edit-ticketrow-<?php echo $tkt_row; ?>" class="ticket-fieldset"<?php echo $display_edit_tkt_row; ?>>
			<legend></legend>
			<input type="hidden" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_ID]" class="edit-ticket-TKT_ID" value="<?php echo $TKT_ID; ?>">
			<input type="hidden" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_row]" class="edit-ticket-TKT_row" value="<?php echo $tkt_row; ?>">

			<!--<div class="total-price-container"><?php printf( esc_html__('Total Final Price: %s', 'event_espresso'), '<span class="ticket-price-amount">' . $TKT_price . '</span>'); ?> </div>-->
			<textarea name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_description]" class="edit-ticket-TKT_description ee-full-textarea-inp" placeholder="Ticket Description"><?php echo $TKT_description; ?></textarea>

			<?php do_action( 'AHEE__event_tickets_datetime_ticket_row_template_after_desc', $tkt_row, $TKT_ID ); ?>

			<div class="basic-ticket-container">
				<h4 class="tickets-heading"><?php esc_html_e('Ticket Details', 'event_espresso'); ?></h4>
				<div style="clear:both"></div>
				<table class="basic-ticket-info">
					<thead>
						<tr valign="bottom">
							<td><span class="TD_TKT_number_datetimes_label"><?php esc_html_e('# Datetimes', 'event_espresso'); ?></span></td>
							<td><span class="TD_TKT_min_qty_label"><?php esc_html_e('Minimum Quantity', 'event_espresso'); ?></span></td>
							<td><span class="TD_TKT_max_qty_label"><?php esc_html_e('Maximum Quantity', 'event_espresso'); ?></span></td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<?php if ( $disabled ) : ?>
									<input type="hidden" class="edit-ticket-TKT_uses ee-small-text-inp ee-numeric" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_uses]" value="<?php echo $TKT_uses; ?>">
									<input type="text" class="edit-ticket-TKT_uses ee-small-text-inp ee-numeric" name="archived_ticket[<?php echo $tkt_row; ?>][TKT_uses]" value="<?php echo $TKT_uses; ?>" disabled>
								<?php else : ?>
									<input type="text" class="edit-ticket-TKT_uses ee-small-text-inp ee-numeric" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_uses]" value="<?php echo $TKT_uses; ?>">
								<?php endif; ?>
							</td>
							<td>
								<?php if ( $disabled ) : ?>
									<input type="hidden" class="edit-ticket-TKT_min ee-small-text-inp ee-numeric" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_min]" value="<?php echo $TKT_min; ?>">
									<input type="text" class="edit-ticket-TKT_min ee-small-text-inp ee-numeric" name="archived_ticket[<?php echo $tkt_row; ?>][TKT_min]" value="<?php echo $TKT_min; ?>" disabled>
								<?php else: ?>
									<input type="text" class="edit-ticket-TKT_min ee-small-text-inp ee-numeric" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_min]" value="<?php echo $TKT_min; ?>">
								<?php endif; ?>
							</td>
							<td>
								<?php if ( $disabled ) : ?>
									<input type="hidden" class="edit-ticket-TKT_max ee-small-text-inp ee-numeric" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_max]" value="<?php echo $TKT_max; ?>">
									<input type="text" class="edit-ticket-TKT_max ee-small-text-inp ee-numeric" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_max]" value="<?php echo $TKT_max; ?>" disabled>
								<?php else : ?>
									<input type="text" class="edit-ticket-TKT_max ee-small-text-inp ee-numeric" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_max]" value="<?php echo $TKT_max; ?>">
								<?php endif; ?>
							</td>
						</tr>
					</tbody>
				</table>
				<button data-context="price-create" class="button-secondary ee-create-button ee-price-create-button" data-ticket-row="<?php echo $tkt_row; ?>"<?php echo $show_price_mod_button; ?>>
					<?php esc_html_e('Add Price Modifier', 'event_espresso'); ?>
				</button>
				<div class="ticket-is-required-container">
					<input type="checkbox" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_required]" class="edit-ticket-TKT_required" value="1"<?php echo $TKT_required ? ' checked="checked"' : ''; ?><?php echo $disabled ? ' disabled' : ''; ?>>
					<label for="edit-ticket-TKT_required"><?php esc_html_e('This ticket is required (will appear first in frontend ticket lists).', 'event_espresso'); ?></label>
				</div>
				<div class="ticket-is-taxable-container">
					<?php if ( !empty($tax_rows) ) { ?>
						<?php if ( $disabled ) : ?>
							<?php
								$tax_value = !empty( $TKT_taxable ) ? 1 : 0;
							?>
							<input class="TKT-taxable-checkbox" type="hidden" name="<?php echo $edit_tickets_name;?>[<?php echo $tkt_row; ?>][TKT_taxable]" value="<?php echo $tax_value; ?>">
							<input class="TKT-taxable-checkbox" id="edit-ticket-TKT_taxable-<?php echo $tkt_row; ?>" type="checkbox" name="archived_ticket[<?php echo $tkt_row; ?>][TKT_taxable]" value="1"<?php echo $TKT_taxable; ?> disabled>
						<?php else : ?>
							<input class="TKT-taxable-checkbox" id="edit-ticket-TKT_taxable-<?php echo $tkt_row; ?>" type="checkbox" name="<?php echo $edit_tickets_name;?>[<?php echo $tkt_row; ?>][TKT_taxable]" value="1"<?php echo $TKT_taxable; ?>>
						<?php endif; ?>
						<label for="edit-ticket-TKT_taxable-<?php echo $tkt_row; ?>"> <?php esc_html_e('This ticket is taxable.', 'event_espresso'); ?>
					<?php } //end tax_rows check ?>
				</div>
			</div>
			<div class="price-table-container">
				<h4 class="tickets-heading price-table-info"<?php echo $show_price_modifier; ?>><?php esc_html_e('Price Modifiers', 'event_espresso'); ?></h4>
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
						<?php echo $ticket_price_rows; ?>
					</tbody>
					<tfoot>
						<tr class="price-subtotal-row TKT-taxes-display"<?php echo $display_subtotal; ?>>
							<td colspan="4" class="ee-numeric">
								<span class="TKT-taxable-subtotal-label"><strong><?php esc_html_e('Subtotal', 'event_espresso'); ?></strong></span>
							</td>
							<td class="ee-numeric">
								<span class="TKT-taxable-subtotal-amount-display"><?php echo $TKT_subtotal_amount_display; ?></span>
								<input type="hidden" value="<?php echo $TKT_subtotal_amount; ?>" name="subtotal_amount_<?php echo $tkt_row; ?>" class="TKT-taxable-subtotal-amount">
							</td>
							<td></td>
							<td></td>
						</tr>
						<?php echo $tax_rows; ?>
						<tr class="price-total-row">
							<td colspan="4" class="ee-numeric">
								<strong><?php esc_html_e('Total', 'event_espresso'); ?></strong>
							</td>
							<td class="ee-numeric" >
								<span id="price-total-amount-<?php echo $tkt_row; ?>"><?php echo $TKT_price; ?></span>
								<input type="hidden" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_price]" class="edit-ticket-TKT_price" value="<?php echo $TKT_price_amount; ?>">
							</td>
							<td><?php echo $TKT_price_code; ?></td>
							<td><input type="hidden" name="price_total_rows_ticket[<?php echo $tkt_row; ?>]" id="price-total-rows-<?php echo $tkt_row; ?>" value="<?php echo $total_price_rows; ?>"></td>
						</tr>
					</tfoot>
				</table>
			</div>
			<div style="clear:both"></div>
			<h4 class="tickets-heading"><?php esc_html_e('Event Datetimes', 'event_espresso'); ?></h4>
			<p><?php esc_html_e('This ticket will be usable (allow entrance) for the following selected event datetimes (click to select).  The "# Datetimes" amount (above) indicates how many of the assigned datetimes the ticket holder can gain access to:', 'event_espresso'); ?></p>
			<ul class="datetime-tickets-list">
				<?php echo $ticket_datetimes_list; ?>
			</ul>

			<?php do_action( 'AHEE__event_tickets_datetime_ticket_row_template__advanced_details_end', $tkt_row, $TKT_ID ); ?>
			<div class="ee-editor-footer-container">
				<div class="ee-editor-id-container">
					<span class="ee-item-id"><?php echo $TKT_ID ? sprintf( esc_html__( 'Ticket ID: %d', 'event_espresso' ), $TKT_ID ) : ''; ?></span>
				</div>
				<div class="save-cancel-button-container">
					<label for="edit-ticket-TKT_is_default_selector"><?php esc_html_e('use this new ticket as a default ticket for any new events', 'event_espresso'); ?></label>
					<input type="checkbox" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_is_default_selector]" class="edit-ticket-TKT_is_default_selector" value="1"<?php echo $disabled ? ' disabled' : ''; ?>>
					<input type="hidden" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TKT_is_default]" class="edit-ticket-TKT_is_default" value="<?php echo $TKT_is_default; ?>">
					<!--<button class="button-primary ee-save-button" data-context="ticket" data-ticket-row="<?php echo $tkt_row; ?>"><?php esc_html_e('Update Ticket', 'event_espresso'); ?></button>--><button class="button-secondary ee-cancel-button" data-context="ticket" data-ticket-row="<?php echo $tkt_row; ?>"><?php esc_html_e('Close', 'event_espresso'); ?></button>
				</div>
			</div>
			<!-- these hidden inputs are for tracking changes in dtts attached to tickets during a js session -->
			<input type="hidden" name="starting_ticket_datetime_rows[<?php echo $tkt_row; ?>]" id="starting-ticket-datetime-rows-<?php echo $tkt_row; ?>" value="<?php echo $starting_ticket_datetime_rows; ?>" class="starting-ticket-datetime-rows">
			<input type="hidden" name="ticket_datetime_rows[<?php echo $tkt_row; ?>]" class="ticket-datetime-rows" id="ticket-datetime-rows-<?php echo $tkt_row; ?>" value="<?php echo $ticket_datetime_rows; ?>">

			<!-- these hidden inputs are for tracking changes in prices attached to tickets during a js session -->
			<input type="hidden" name="ticket_price_ids[<?php echo $tkt_row; ?>][]" id="ticket-price-ids-<?php echo $tkt_row; ?>" class="ticket-price-ids" value="<?php echo $existing_ticket_price_ids; ?>">
			<input type="hidden" name="<?php echo $edit_tickets_name; ?>[<?php echo $tkt_row; ?>][TTM_ID]" class="ticket-template-id" value="<?php echo $ticket_template_id; ?>">
			<div style="clear:both"></div>
		</fieldset>
	</td>
</tr>
<?php
/**
 * template args in use
 *
 * $tkt_row
 * $tkt_status_class
 * $TKT_name
 * $TKT_start_date
 * $TKT_end_date
 * $TKT_status
 * $TKT_price
 * $TKT_qty
 * $TKT_uses
 * $TKT_min
 * $TKT_max
 * $TKT_sold
 * $TKT_registrations
 * $TKT_ID
 * $TKT_description
 * $TKT_is_default
 * $TKT_price_rows
 * $TKT_base_price
 * $TKT_base_price_ID
 * $TKT_order
 * $disabled
 * $ticket_archive_class
 * $trash_icon
 * $trash_hidden
 * $clone_icon
 * $display_edit_tkt_row
 * $edit_tkt_expanded
 *
 * $TKT_taxable
 * $display_subtotal
 * $TKT_subtotal_amount
 * $tax_rows
 *
 * $show_price_modifier;
 * $total_price_rows
 * $ticket_datetimes_list
 * $starting_ticket_datetime_rows (datetimes attached to ticket on page load)
 * $existing_ticket_price_ids;
 * $ticket_template_id;
 * $show_price_modifier
 * $show_price_mod_button
 */

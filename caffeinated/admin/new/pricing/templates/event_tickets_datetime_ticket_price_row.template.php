<tr id="price-row-<?php echo $tkt_row; ?>-<?php echo $PRC_order; ?>" class="ee-active-price" valign="top">
	<td>
		<?php echo $price_type_selector; ?>
	</td>
	<td>
		<input type="hidden" name="<?php echo $edit_prices_name; ?>[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_ID]" class="edit-price-PRC_ID" value="<?php echo $PRC_ID; ?>">
		<input type="hidden" name="<?php echo $edit_prices_name; ?>[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_is_default]" class="edit-price-PRC_is_default" value="<?php echo $PRC_is_default; ?>">
		<input type="text" class="edit-price-PRC_name ee-text-inp" name="<?php echo $edit_prices_name; ?>[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_name]" value="<?php echo $PRC_name; ?>">
	</td>
	<td>
		<textarea name="<?php echo $edit_prices_name; ?>[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_desc]" class="edit-price-PRC_desc ee-full-textarea-inp" placeholder="Edit the description for the price here"><?php echo $PRC_desc; ?></textarea>
	</td>
	<td>
		<span class="ticket-price-info-display ticket-price-plus-minus"<?php echo $show_plus_or_minus; ?>>+/-</span>
		<span class="ticket-price-info-display ticket-price-plus"<?php echo $show_plus; ?>>+</span>
		<span class="ticket-price-info-display ticket-price-minus"<?php echo $show_minus; ?>>-</span>
		<span class="ticket-price-info-display ticket-price-dollar-sign-display"<?php echo $show_currency_symbol; ?>><?php echo $price_currency_symbol; ?></span>
	</td>
	<td>
		<?php if ( $disabled ) : ?>
			<input type="hidden" size="1" class="edit-price-PRC_amount ee-numeric" name="<?php echo $edit_prices_name; ?>[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_amount]" value="<?php echo $PRC_amount; ?>">
			<input type="text" size="1" class="edit-price-PRC_amount ee-numeric" name="prices_archive[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_amount]" value="<?php echo $PRC_amount; ?>" disabled>
		<?php else : ?>
			<input type="text" size="1" class="edit-price-PRC_amount ee-numeric" name="<?php echo $edit_prices_name; ?>[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_amount]" value="<?php echo $PRC_amount; ?>">
		<?php endif; ?>
	</td>
	<td>
		<span class="ticket-price-info-display ticket-price-percentage-char-display"<?php echo $show_percentage; ?>>%</span>
	</td>
	<td>
		<?php if ( $disabled ) : ?>
			<span class="ee-lock-icon"></span>
		<?php else : ?>
			<!-- <span class="gear-icon dashicons dashicons-admin-generic clickable" data-ticket-row="<?php echo $tkt_row; ?>" data-context="price" data-price-row="<?php echo $PRC_order; ?>"></span> -->
			<span class="trash-icon dashicons dashicons-post-trash clickable" data-ticket-row="<?php echo $tkt_row; ?>" data-context="price" data-price-row="<?php echo $PRC_order; ?>"<?php echo $show_trash_icon; ?>></span>
			<button data-ticket-row="<?php echo $tkt_row; ?>" data-price-row="<?php echo $PRC_order; ?>" data-context="price" class="ee-create-button"<?php echo $show_create_button; ?>><strong>+</strong></button>
		<?php endif; ?>
	</td>
</tr>
<!-- <tr id="extra-price-row-<?php echo $tkt_row; ?>-<?php echo $PRC_order; ?>"> -->
	<!-- <td colspan="5"> -->
		<!-- <section class="extra-price-row" style="display:none"> -->
			<!-- <textarea name="<?php echo $edit_prices_name; ?>[<?php echo $tkt_row; ?>][<?php echo $PRC_order; ?>][PRC_desc]" class="edit-price-PRC_desc ee-full-textarea-inp" placeholder="Edit the description for the price here"><?php echo $PRC_desc; ?></textarea> -->
		<!-- </section> -->
	<!-- </td> -->
<!-- </tr> -->
<?php
/**
 * template args in use
 *
 * $tkt_row
 * $PRC_order
 * $price_type_selector;
 * $PRC_ID
 * $PRC_is_default
 * $PRC_name
 * $price_currency_symbol
 * $show_plus_or_minus
 * $show_plus
 * $show_minus
 * $show_currency_symbol
 * $PRC_amount
 * $show_percentage
 * $show_trash_icon
 * $show_lock_icon
 * $show_create_button
 * $PRC_desc
 * $disabled
 */
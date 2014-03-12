<li data-datetime-row="<?php echo $dtt_row; ?>" data-context="datetime-ticket" data-ticket-row="<?php echo $tkt_row; ?>" class="datetime-ticket clickable<?php echo $ticket_selected; echo $tkt_status_class; ?>">
	<input type="checkbox" name="datetime_ticket[<?php echo $dtt_row; ?>][<?php echo $tkt_row; ?>]" class="datetime-ticket-checkbox" value="1"<?php echo $datetime_ticket_checked; ?>>
	<span class="ee-icon ee-icon-tickets ticket-list-ticket-name"><?php echo $TKT_name; ?></span>
	<span class="clickable gear-icon dashicons dashicons-admin-generic" data-datetime-row="<?php echo $dtt_row; ?>" data-context="datetime-ticket" data-ticket-row="<?php echo $tkt_row; ?>"></span>
</li>

<?php
/**
 * template args in use
 *
 * $dtt_row
 * $tkt_row
 * $datetime_ticket_checked
 * $ticket_selected
 * $TKT_name
 * $tkt_status_class
 */
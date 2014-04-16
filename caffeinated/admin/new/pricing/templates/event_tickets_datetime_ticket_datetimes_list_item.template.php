<li class="datetime-ticket clickable<?php echo $ticket_datetime_selected; ?><?php echo $tkt_status_class; ?>" data-datetime-row="<?php echo $dtt_row; ?>" data-context="ticket-datetime" data-ticket-row="<?php echo $tkt_row; ?>">
	<input type="checkbox" name="ticket_datetime[<?php echo $dtt_row; ?>][<?php echo $tkt_row; ?>]" class="datetime-ticket-checkbox" value="1"<?php echo $ticket_datetime_checked; ?>>
	<span class="dashicons dashicons-clock ee-icon-size-20"></span><span class="ticket-list-ticket-name"><?php echo $DTT_name; ?></span>
	<span class="clickable gear-icon dashicons dashicons-admin-generic" data-datetime-row="<?php echo $dtt_row; ?>" data-context="ticket-datetime" data-ticket-row="<?php echo $tkt_row; ?>"></span>
</li>
<?php
/**
 * template args in use
 *
 * $dtt_row
 * $tkt_row
 * $ticket_datetime_checked
 * $ticket_datetime_selected
 * $DTT_name;
 * $tkt_status_class;
 */
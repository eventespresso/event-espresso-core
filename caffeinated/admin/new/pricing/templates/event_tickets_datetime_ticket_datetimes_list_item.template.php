<?php

/**
 * template args in use
 *
 * @var int $dtt_row
 * @var int $tkt_row
 * @var string $ticket_datetime_checked
 * @var string $ticket_datetime_selected
 * @var string $DTT_name;
 * @var string $tkt_status_class;
 */
?>

<li class="datetime-ticket clickable<?php echo $ticket_datetime_selected; ?><?php echo $tkt_status_class; ?>"
    data-datetime-row="<?php echo absint($dtt_row); ?>" data-context="ticket-datetime"
    data-ticket-row="<?php echo absint($tkt_row); ?>">
    <input type="checkbox" name="ticket_datetime[<?php echo absint($dtt_row); ?>][<?php echo absint($tkt_row); ?>]"
           class="datetime-ticket-checkbox" value="1"<?php echo $ticket_datetime_checked; ?>>
    <span class="dashicons dashicons-clock ee-icon-size-20"></span><span
        class="ticket-list-ticket-name"><?php echo $DTT_name; ?></span>
    <span class="clickable gear-icon dashicons dashicons-admin-generic" data-datetime-row="<?php echo absint($dtt_row); ?>"
          data-context="ticket-datetime" data-ticket-row="<?php echo absint($tkt_row); ?>"></span>
</li>

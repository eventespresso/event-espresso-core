<?php

/**
 * template args in use
 *
 * @var int $dtt_row
 * @var int $tkt_row
 * @var string $datetime_ticket_checked
 * @var string $ticket_selected
 * @var string $TKT_name
 * @var string $tkt_status_class
 */
?>

<li data-datetime-row="<?php echo absint($dtt_row); ?>" data-context="datetime-ticket" data-ticket-row="<?php echo absint($tkt_row); ?>"
    class="datetime-ticket clickable<?php echo $ticket_selected;
    echo $tkt_status_class; ?>">
    <input type="checkbox" name="datetime_ticket[<?php echo absint($dtt_row); ?>][<?php echo absint($tkt_row); ?>]"
           class="datetime-ticket-checkbox" value="1"<?php echo $datetime_ticket_checked; ?>>
    <span class="ee-icon ee-icon-tickets ticket-list-ticket-name"><?php echo $TKT_name; ?></span>
    <span class="clickable gear-icon dashicons dashicons-admin-generic" data-datetime-row="<?php echo absint($dtt_row); ?>"
          data-context="datetime-ticket" data-ticket-row="<?php echo absint($tkt_row); ?>"></span>
</li>

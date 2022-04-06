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

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<li data-datetime-row="<?php echo esc_attr($dtt_row); ?>" data-context="datetime-ticket" data-ticket-row="<?php echo esc_attr($tkt_row); ?>"
    class="datetime-ticket clickable <?php echo sanitize_html_class($ticket_selected); ?> <?php echo sanitize_html_class($tkt_status_class); ?>">
    <input type="checkbox" name="datetime_ticket[<?php echo esc_attr($dtt_row); ?>][<?php echo esc_attr($tkt_row); ?>]"
           class="datetime-ticket-checkbox" value="1" <?php echo esc_attr($datetime_ticket_checked); ?>>
    <span class="ee-icon ee-icon-tickets ticket-list-ticket-name"><?php echo wp_kses($TKT_name, AllowedTags::getAllowedTags()); ?></span>
    <span class="clickable gear-icon dashicons dashicons-admin-generic" data-datetime-row="<?php echo esc_attr($dtt_row); ?>"
          data-context="datetime-ticket" data-ticket-row="<?php echo esc_attr($tkt_row); ?>"></span>
</li>

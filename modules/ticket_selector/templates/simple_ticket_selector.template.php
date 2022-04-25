<?php

/**
 * @var int       $EVT_ID
 * @var int       $TKT_ID
 * @var string    $hidden_inputs
 * @var string    $ticket_description
 * @var string    $ticket_status_display
 * @var EE_Event  $event
 * @var EE_Ticket $ticket
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<?php echo wp_kses($hidden_inputs, AllowedTags::getWithFormTags()); ?>
    <input type="hidden"
           name="tkt-slctr-qty-<?php echo esc_attr($EVT_ID); ?>[<?php echo absint($TKT_ID); ?>]"
           value="1"
    />
    <input type="hidden"
           name="tkt-slctr-ticket-id-<?php echo esc_attr($EVT_ID); ?>[]"
           value="<?php echo absint($TKT_ID); ?>"
    />
<?php
if ($ticket instanceof EE_Ticket) {
    do_action('AHEE__ticket_selector_chart__template__before_ticket_selector', $event);
    $ticket_description .= ! empty($ticket_description)
        ? '<br />' . $ticket_status_display
        : $ticket_status_display;
    if (strpos($ticket_description, '<div') === false) {
        $ticket_description = "<p>{$ticket_description}</p>";
    }
    ?>
<div id="no-tkt-slctr-ticket-dv-<?php echo esc_attr($EVT_ID); ?>" class="no-tkt-slctr-ticket-dv">
    <div class="no-tkt-slctr-ticket-content-dv">
        <h5><?php echo esc_html($ticket->name()); ?></h5>
        <?php if (! empty($ticket_description)) { ?>
            <?php echo wp_kses($ticket_description, AllowedTags::getAllowedTags()); ?>
        <?php } ?>
    </div><!-- .no-tkt-slctr-ticket-content-dv -->
    <?php
    do_action('AHEE__ticket_selector_chart__template__after_ticket_selector', $EVT_ID, $event);
}

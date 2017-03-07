<?php
/** @var int $EVT_ID */
/** @var int $TKT_ID */
/** @var string $hidden_inputs */
/** @var string $ticket_status_display */
/** @var \EE_Event $event */
?>
<?php echo $hidden_inputs; ?>
<input type="hidden" name="tkt-slctr-qty-<?php echo $EVT_ID; ?>[]" value="1"/>
<input type="hidden" name="tkt-slctr-ticket-id-<?php echo $EVT_ID; ?>[]" value="<?php echo $TKT_ID; ?>"/>
<?php
if ( $ticket instanceof EE_Ticket ) {
    do_action( 'AHEE__ticket_selector_chart__template__before_ticket_selector', $event );
    $ticket_description = $ticket->description();
    $ticket_description .= ! empty( $ticket_description )
        ? '<br />' . $ticket_status_display
        : $ticket_status_display;
    if ( ! strpos( $ticket_description, '<div' ) ) {
        $ticket_description = "<p>{$ticket_description}</p>";
    }
?>
<div id="no-tkt-slctr-ticket-dv-<?php echo $EVT_ID; ?>" class="no-tkt-slctr-ticket-dv">
<div class="no-tkt-slctr-ticket-content-dv">
    <h5><?php echo $ticket->name(); ?></h5>
    <?php if ( ! empty( $ticket_description ) ) { ?>
    <?php echo $ticket_description; ?>
    <?php } ?>
</div>
<?php
    do_action( 'AHEE__ticket_selector_chart__template__after_ticket_selector', $EVT_ID, $event );
}
?>

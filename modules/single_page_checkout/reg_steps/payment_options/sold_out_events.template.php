<?php

/**
 * @type string $sold_out_events
 * @type string $sold_out_events_msg
 */

?>

<h4 class="ee-status-banner sold-out"><b><?php esc_html_e('Sold Out', 'event_espresso'); ?></b></h4>
<ul id="spco-sold-out-events-ul"><?php echo $sold_out_events; // already escaped ?></ul>
<h6 class="pink-text"><?php esc_html_e("We're Sorry", 'event_espresso'); ?></h6>
<p id="events-requiring-pre-approval-pg" class="small-text drk-grey-text">
    <?php echo $sold_out_events_msg; // already escaped ?>
</p>

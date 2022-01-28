<?php

/**
 * @type string $sold_out_tickets
 * @type string $sold_out_tickets_msg
 */

?>

<h4><b><?php esc_html_e('Sold Out', 'event_espresso'); ?></b></h4>
<h6 class="pink-text"><?php esc_html_e("We're Sorry", 'event_espresso'); ?></h6>
<p id="tickets-requiring-pre-approval-pg" class="small-text drk-grey-text">
    <?php echo $sold_out_tickets_msg; // already escaped ?>
</p>
<ul id="spco-sold-out-tickets-ul">
    <?php echo $sold_out_tickets; // already escaped ?>
</ul>

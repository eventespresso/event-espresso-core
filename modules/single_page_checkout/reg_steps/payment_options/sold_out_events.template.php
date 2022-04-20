<?php

/**
 * @type string $sold_out_events
 * @type string $sold_out_events_msg
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<h4 class="ee-status sold-out"><b><?php esc_html_e('Sold Out', 'event_espresso'); ?></b></h4>
<ul id="spco-sold-out-events-ul"><?php echo wp_kses($sold_out_events, AllowedTags::getWithFormTags()); ?></ul>
<h6 class="pink-text"><?php esc_html_e("We're Sorry", 'event_espresso'); ?></h6>
<p id="events-requiring-pre-approval-pg" class="small-text drk-grey-text">
    <?php echo wp_kses($sold_out_events_msg, AllowedTags::getWithFormTags()); ?>
</p>

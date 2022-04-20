<?php

/**
 * @type string $events_requiring_pre_approval
 * @type string $events_requiring_pre_approval_msg
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<h4>
    <span class="orange-text">
        <?php esc_html_e('Important Notice: Events Requiring Pre-Approval', 'event_espresso'); ?>
    </span>
</h4>
<p id="events-requiring-pre-approval-pg" class="small-text drk-grey-text">
    <?php echo wp_kses($events_requiring_pre_approval_msg, AllowedTags::getAllowedTags()); ?>
</p>
<ul id="spco-pre-approval-events-ul">
    <?php echo wp_kses($events_requiring_pre_approval, AllowedTags::getAllowedTags()); ?>
</ul>

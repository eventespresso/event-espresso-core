<?php

/**
 * This is the template for the html messenger and receipt message type event_list field.
 */

?>
<h3 class="section-title event-name">
    <img class="icon" src="<?php echo esc_url_raw(EE_IMAGES_URL . 'calendar_year-24x24.png'); ?>">
    <?php esc_html_e("Event Name:", "event_espresso") ?>
    <span class="plain-text">[EVENT_NAME]</span>
    <span class="small-text link">
        ( <a href="[EVENT_URL]"><?php esc_html_e('view', 'event_espresso'); ?></a> )
    </span>
</h3>
<p class="event-description">
    [EVENT_EXCERPT]
</p>
<ul class="tickets-per-event">
    [TICKET_LIST]
</ul>
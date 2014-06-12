<?php
//echo '<br/><h6 style="color:#2EA2CC;">'. __FILE__ . ' &nbsp; <span style="font-weight:normal;color:#E76700"> Line #: ' . __LINE__ . '</span></h6>';
global $post;
if ( espresso_display_ticket_selector( $post->ID ) && ( is_single() || ( is_archive() && espresso_display_ticket_selector_in_event_list() ))) :
?>
<div class="event-tickets" style="clear: both;">
	<?php espresso_ticket_selector( $post ); ?>
</div>
<!-- .event-tickets -->
<?php elseif ( ! is_single() ) : ?>
<?php espresso_view_details_btn( $post ); ?>
<?php endif; ?>
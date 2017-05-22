<?php
/** @type string $sold_out_events */
/** @type string $sold_out_events_msg */
?>

<h4 class="ee-status sold-out"><b><?php _e('Sold Out', 'event_espresso');?></b></h4>
	<ul id="spco-sold-out-events-ul"><?php echo $sold_out_events; ?></ul>
	<h6 class="pink-text"><?php _e("We're Sorry", 'event_espresso');?></h6>
	<p id="events-requiring-pre-approval-pg" class="small-text drk-grey-text">
		<?php echo $sold_out_events_msg; ?>
	</p>

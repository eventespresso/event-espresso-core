<?php
function espresso_charts() {
    global $wpdb, $org_options,$espresso_premium;
	$event_id = $_REQUEST['event_id'];
?>
<div class="metabox-holder">
  <div class="postbox">
    <h3>
      <?php echo espresso_event_list_attendee_title($_REQUEST['event_id']); ?>
    </h3>
    <div class="inside">
<?php 
	if ($espresso_premium != true){
		echo '<p><strong>' . __('Graphical reporting charts are now available in the premium versions.', 'event_espresso') . '</strong> <a href="http://eventespresso.com/download/" target="_blank">' . __('Upgrade Now!', 'event_espresso') . '</a></p>';
	}else{
		echo espresso_chart_display($event_id, 'total_reg');
		echo espresso_chart_display($event_id, 'total_completed');
		echo espresso_chart_display($event_id, 'total_pending');
		echo espresso_chart_display($event_id, 'total_incomplete');
	}
?>
      <div style="clear:both"></div>
    </div>
  </div>
</div>
<?php
	event_list_attendees();
}
<?php
function delete_event_discount(){
	global $wpdb;
	if($_REQUEST['delete_discount']){
		if (is_array($_POST['checkbox'])){
			while(list($key,$value)=each($_POST['checkbox'])):
				$del_id=$key;
				//Delete discount data
				$sql = "DELETE FROM ".EVENTS_DISCOUNT_CODES_TABLE." WHERE id='" . $del_id . "'";
				$wpdb->query($sql);
					
				$sql = "DELETE FROM ".EVENTS_DISCOUNT_REL_TABLE." WHERE discount_id='" . $del_id . "'";
				$wpdb->query($sql);
			endwhile;	
		}
	}
	if($_REQUEST['action']== 'delete_discount'){
		//Delete discount data
		$sql = "DELETE FROM ".EVENTS_DISCOUNT_CODES_TABLE." WHERE id='" . $_REQUEST['discount_id'] . "'";
		$wpdb->query($sql);
					
		$sql = "DELETE FROM ".EVENTS_DISCOUNT_REL_TABLE." WHERE discount_id='" . $_REQUEST['discount_id'] . "'";
		$wpdb->query($sql);
	}
	?>
	<div id="message" class="updated fade">
	  <p><strong>
		<?php _e('Promotional Codes have been successfully deleted from the database.','event_espresso'); ?>
		</strong></p>
	</div>
	<?php
}
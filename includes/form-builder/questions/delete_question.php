<?php
function event_espresso_form_builder_delete(){
	global $wpdb;
	if($_REQUEST['delete_question']){
			if (is_array($_POST['checkbox'])){
				while(list($key,$value)=each($_POST['checkbox'])){
					$del_id=$key;
					//Delete question data
					$sql = "DELETE FROM " . EVENTS_QUESTION_TABLE . " WHERE id='" . $del_id . "'";
					$wpdb->query($sql);

					//Delete question group rel data
					$sql = "DELETE FROM " . EVENTS_QST_GROUP_REL_TABLE . " WHERE question_id='" . $del_id . "'";
					$wpdb->query($sql);
				}
			}
	}

	if(!empty($_REQUEST['question_id']) && $_REQUEST['action']== 'delete_question'){
		//Delete question group data
		$sql = "DELETE FROM " . EVENTS_QUESTION_TABLE . " WHERE id='" . $_REQUEST['question_id'] . "'";
		$wpdb->query($sql);

		//Delete question group rel data
		$sql = "DELETE FROM " . EVENTS_QST_GROUP_REL_TABLE . " WHERE question_id='" . $_REQUEST['question_id'] . "'";
		$wpdb->query($sql);
	}
	?>
	<div id="message" class="updated fade">
	  <p><strong>
		<?php _e('Questions have been successfully deleted.','event_espresso');?>
		</strong></p>
	</div>
	<?php
}
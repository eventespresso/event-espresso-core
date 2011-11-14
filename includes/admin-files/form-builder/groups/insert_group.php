<?php
function event_espresso_insert_group(){
	global $wpdb,$current_user, $notices;
	
	if( check_admin_referer('espresso_form_check', 'add_new_group') ) {
	$wpdb->show_errors();
	$group_name= $_REQUEST['group_name'];
	$group_order = $_POST['group_order'];
	$group_identifier = sanitize_title_with_dashes($group_name.'-'.time());
	$group_description= $_REQUEST['group_description'];
	$show_group_name = isset($_POST['show_group_name']) && $_POST['show_group_name'] !=''?1:0;
	$show_group_description = isset($_POST['show_group_description']) && $_POST['show_group_description'] != ''?1:0;
	}
	
	if (!function_exists('espresso_member_data'))
			$current_user->ID = 1;

	$sql=array(
		'group_name'=>$group_name,
		'group_identifier'=>$group_identifier,
		'group_description'=>$group_description,
		'group_order'=>$group_order,
		'show_group_name' => $show_group_name,
		'show_group_description' => $show_group_description,
		'wp_user'=>$current_user->ID);
	$sql_data = array('%s','%s','%s','%d','%d','%d','%d');
	if (!$wpdb->insert( EVENTS_QST_GROUP_TABLE, $sql, $sql_data)){
		$error = true;
	}

		$last_group_id = $wpdb->insert_id;

		if (!empty($_REQUEST['question_id'])){
			foreach ($_REQUEST['question_id'] as $k=>$v){
				if($v != '') {
					$sql_qst_grp="INSERT INTO " . EVENTS_QST_GROUP_REL_TABLE . " (group_id, question_id) VALUES ('".$last_group_id."', '".$v."')";
					//echo "$sql3 <br>";
					if (!$wpdb->query($sql_qst_grp)){
						$error = true;
					}
				}
			}
		}

	if( $error ) {
			$notices['errors'][] = __('There was an error in your submission for group ', 'event_espresso') . $group_name .  __(' The group was not added!', 'event_espresso');
	}else {
			$notices['updates'][] = __('The group ', 'event_esptresso') . $group_name . __(' has been added.', 'event_espresso');
			}
}

<?php 
function update_event_category(){
	global $wpdb, $notices;

	if( check_admin_referer('espresso_form_check', 'ee_update_cat') ) {
		$category_id= $_REQUEST['category_id'];
		$category_name= esc_html($_REQUEST['category_name']);
		$category_identifier = ($_REQUEST['category_identifier'] == '') ? $category_identifier = sanitize_title_with_dashes($category_name.'-'.time()) : $category_identifier = sanitize_title_with_dashes($_REQUEST['category_identifier']);
		$category_desc= esc_html($_REQUEST['category_desc']); 
		$display_category_desc=$_REQUEST['display_desc'];
			
		$sql=array(
			'category_name'=>$category_name,
			'category_identifier'=>$category_identifier,
			'category_desc'=>$category_desc,
			'display_desc'=>$display_category_desc
		); 
			
		$update_id = array('id'=> $category_id);
			
		$sql_data = array('%s','%s','%s','%s');
		
		if ($wpdb->update( get_option('events_category_detail_tbl'), $sql, $update_id, $sql_data, array( '%d' ) )){
			$notices['updates'][] = __('The category ', 'event_espresso') . $category_name . __(' has been updated.', 'event_espresso');
		}else { 
			$notices['errors'][] = __('The category ', 'event_espresso') . $category_name . __(' has not been updated', 'event_espresso');
		}
	}// end nonce check
}
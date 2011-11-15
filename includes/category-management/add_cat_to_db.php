<?php
function add_cat_to_db(){
	global $wpdb, $espresso_wp_user, $notices;

	if( check_admin_referer('espresso_form_check', 'ee_add_new_cat') ){
		if ( $_REQUEST['action'] == 'add' ){
			$category_name= esc_html($_REQUEST['category_name']);
			$category_identifier = ($_REQUEST['category_identifier'] == '') ? $category_identifier = sanitize_title_with_dashes($category_name.'-'.time()) : $category_identifier = sanitize_title_with_dashes($_REQUEST['category_identifier']);
			$category_desc= esc_html($_REQUEST['category_desc']); 
			$display_category_desc=$_REQUEST['display_desc'];
		
			$sql=array(
				'category_name'=>$category_name, 
				'category_identifier'=>$category_identifier, 
				'category_desc'=>$category_desc, 
				'display_desc'=>$display_category_desc, 
				'wp_user'=>$espresso_wp_user
			);
			
			$sql_data = array('%s','%s','%s','%s','%d');
		
			if ($wpdb->insert( EVENTS_CATEGORY_TABLE, $sql, $sql_data )){
				$notices['updates'][] = __('The category ', 'event_espresso') . $category_name .  __(' has been added', 'event_espresso');
			}else { 
				$notices['errors'][] = __('The category', 'event_espresso') . $category_name .  __(' was not saved!', 'event_espresso');		
			}
		}
	}// end nonce check
}
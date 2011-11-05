<?php 
function update_event_category(){
	global $wpdb;

if( check_admin_referer('espresso_form_check', 'ee_update_cat') ) {
$category_id= $_REQUEST['category_id'];
		$category_name= esc_html($_REQUEST['category_name']);
		$category_identifier = ($_REQUEST['category_identifier'] == '') ? $category_identifier = sanitize_title_with_dashes($category_name.'-'.time()) : $category_identifier = sanitize_title_with_dashes($_REQUEST['category_identifier']);
		$category_desc= esc_html($_REQUEST['category_desc']); 
		$display_category_desc=$_REQUEST['display_desc'];
	
		
	
	$sql=array('category_name'=>$category_name, 'category_identifier'=>$category_identifier, 'category_desc'=>$category_desc, 'display_desc'=>$display_category_desc); 
		
		$update_id = array('id'=> $category_id);
		
		$sql_data = array('%s','%s','%s','%s');
	
	if ($wpdb->update( get_option('events_category_detail_tbl'), $sql, $update_id, $sql_data, array( '%d' ) )){?>
	<div id="message" class="updated fade"><p><strong><?php _e('The category has been updated.', 'event_espresso'); ?> </strong></p></div>
<?php }else { ?>
	<div id="message" class="error"><p><strong><?php _e('The category was not updated.', 'event_espresso'); ?></strong></p></div>

<?php
	}
}
}// end nonce check
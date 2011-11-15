<?php 
function update_event_venue(){
	global $wpdb;
	$wpdb->show_errors();
	//print_r($_REQUEST);
	$venue_meta['contact'] = $_REQUEST['contact'];
	$venue_meta['phone'] = $_REQUEST['phone'];
	$venue_meta['twitter'] = $_REQUEST['twitter'];
	$venue_meta['image'] = $_REQUEST['image'];
	$venue_meta['website'] = $_REQUEST['website'];
	$venue_meta['description'] = esc_html($_REQUEST['description']);
	$venue_meta['enable_for_maps'] = esc_html($_REQUEST['enable_for_maps']);
	$venue_meta['gmap_static'] = esc_url($_REQUEST['gmap_static']);
	$locale = $_REQUEST['locale'];
	$meta = serialize($venue_meta);
		
	
	$sql=array('name'=>$_REQUEST['name'],'address'=>$_REQUEST['address'], 'address2'=>$_REQUEST['address2'], 'city'=>$_REQUEST['city'], 'state'=>$_REQUEST['state'], 'zip'=>$_REQUEST['zip'], 'country'=>$_REQUEST['country'], 'meta'=>$meta); 
		
	$update_id = array('id'=> $_REQUEST['venue_id']);
	/*echo 'Debug: <br />';
	print_r($sql);
	print 'Number of vars: ' . count ($sql);
	echo '<br />';
	print 'Number of cols: ' . count($sql_data);*/
		
	$sql_data = array('%s','%s','%s','%s','%s','%s','%s','%s');
	$wpdb->update( EVENTS_VENUE_TABLE, $sql, $update_id, $sql_data, array( '%d' ) );
	
			if( !empty($locale) ){
				$last_venue_id = $_REQUEST['venue_id'];
				$wpdb->query("DELETE FROM ".EVENTS_LOCALE_REL_TABLE." WHERE venue_id='".$last_venue_id."'");
				$sql_locale="INSERT INTO ".EVENTS_LOCALE_REL_TABLE." (venue_id, locale_id) VALUES ('".$last_venue_id."', '".$locale."')";
				if (!$wpdb->query($sql_locale)){
					$error = true;
				}
			}
?>	
	<div id="message" class="updated fade">
			<p><strong><?php _e('The venue  has been updated.','event_espresso'); ?></strong></p>
		 </div>	
		 
<?php
}
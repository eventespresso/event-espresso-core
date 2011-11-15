<?php 
function update_event_venue(){
	global $wpdb, $notices;
	if( check_admin_referer('espresso_form_check', 'update_venue' )) {
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
		
	
	$sql=array(
		'name'=>$_REQUEST['name'],
		'address'=>$_REQUEST['address'],
		'address2'=>$_REQUEST['address2'],
		'city'=>$_REQUEST['city'],
		'state'=>$_REQUEST['state'],
		'zip'=>$_REQUEST['zip'],
		'country'=>$_REQUEST['country'],
		'meta'=>$meta); 
		
	$update_id = array('id'=> $_REQUEST['venue_id']);
	$sql_data = array('%s','%s','%s','%s','%s','%s','%s','%s');
	}
	
	if ($wpdb->update( EVENTS_VENUE_TABLE, $sql, $update_id, $sql_data, array( '%d' )) ){
		/*echo 'Debug: <br />';
		print_r($sql);
		print 'Number of vars: ' . count ($sql);
		echo '<br />';
		print 'Number of cols: ' . count($sql_data);*/
		
		if( !empty($locale) ){
			$last_venue_id = $_REQUEST['venue_id'];
			$wpdb->query("DELETE FROM ".EVENTS_LOCALE_REL_TABLE." WHERE venue_id='".$last_venue_id."'");
			$sql_locale="INSERT INTO ".EVENTS_LOCALE_REL_TABLE." (venue_id, locale_id) VALUES ('".$last_venue_id."', '".$locale."')";
			if (!$wpdb->query($sql_locale)){
				$notices['errors'][] = __('The locale was not saved!', 'event_espresso');
			}
		}
		$notices['updates'][] = __('The venue ', 'event_espresso') . $_REQUEST['name'] .  __(' has been updated', 'event_espresso');
	}else{ 
		$notices['errors'][] = __('The venue', 'event_espresso') . $_REQUEST['name'] .  __(' was not updated!', 'event_espresso');		
	}
}
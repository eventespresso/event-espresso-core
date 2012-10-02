<?php
function add_venue_to_db(){
	global $wpdb, $espresso_wp_user, $notices;
	$wpdb->show_errors();
	if ( $_REQUEST['action'] == 'add' && check_admin_referer('espresso_form_check', 'add_new_venue')){
		//print_r($_REQUEST);
		$venue_meta['contact'] = $_REQUEST['contact'];
		$venue_meta['phone'] = $_REQUEST['phone'];
		$venue_meta['twitter'] = $_REQUEST['twitter'];
		$venue_meta['image'] = $_REQUEST['image'];
		$venue_meta['website'] = $_REQUEST['website'];
		$venue_meta['description'] = esc_html($_REQUEST['description']);
		$venue_meta['enable_for_maps'] = $_REQUEST['enable_for_maps'];
		$venue_meta['gmap_static'] = esc_url($_REQUEST['gmap_static']);
		$locale = isset( $_REQUEST['locale'] ) ? $_REQUEST['locale'] : '';
		$meta = serialize($venue_meta);	
		
		$identifier=uniqid($espresso_wp_user.'-');
	
		$sql=array(
			'identifier'=>$identifier, 
			'name'=>$_REQUEST['name'],
			'address'=>$_REQUEST['address'], 
			'address2'=>$_REQUEST['address2'], 
			'city'=>$_REQUEST['city'], 
			'state'=>$_REQUEST['state'], 
			'zip'=>$_REQUEST['zip'], 
			'country'=>$_REQUEST['country'],
			'wp_user'=>$espresso_wp_user, 
			'meta'=>$meta,
		); 
		
		$sql_data = array('%s','%s','%s','%s','%s','%s','%s','%s','%d','%s');
		  
		if ($wpdb->insert( EVENTS_VENUE_TABLE, $sql, $sql_data )){
			$succes = true;
		}else{ 
			$succes = false;
		}
		if( defined('ESPRESSO_MANAGER_PRO_VERSION' )){		
			if( !empty($locale) ){
					$last_venue_id = $wpdb->insert_id;
					$sql_locale="INSERT INTO ".EVENTS_LOCALE_REL_TABLE." (venue_id, locale_id) VALUES ('".$last_venue_id."', '".$locale."')";
					if ($wpdb->query($sql_locale)){
						$succes = true;
					}
			}else{ 
				$succes = false;
			}
		}
		
		if ($succes == true){
			$notices['updates'][] = __('The venue', 'event_espresso') .' '. $_REQUEST['name'] .  __(' has been saved', 'event_espresso');
		}else{ 
			$notices['errors'][] = __('The venue', 'event_espresso') .' '. $_REQUEST['name'] .  __(' was not saved!', 'event_espresso');		
		}
	}
}

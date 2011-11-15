<?php
function add_staff_to_db(){
	global $wpdb, $current_user;
	$wpdb->show_errors();
	if ( $_REQUEST['action'] == 'add' ){
		//print_r($_REQUEST);
		$staff_meta['phone'] = $_REQUEST['phone'];
		$staff_meta['twitter'] = $_REQUEST['twitter'];
		$staff_meta['image'] = $_REQUEST['image'];
		$staff_meta['website'] = $_REQUEST['website'];
		$staff_meta['description'] = esc_html($_REQUEST['description']);
	
		$staff_meta['organization'] = esc_html($_REQUEST['organization']);
		$staff_meta['title'] = esc_html($_REQUEST['title']);
		$staff_meta['industry'] = esc_html($_REQUEST['industry']);
		$staff_meta['city'] = esc_html($_REQUEST['city']);
		$staff_meta['country'] = esc_html($_REQUEST['country']);

		$meta = serialize($staff_meta);
		
		$identifier=uniqid($current_user->ID.'-');
		
		if (!function_exists('espresso_member_data'))
			$current_user->ID = 1;
	
		$sql=array('identifier'=>$identifier, 'role'=>$_REQUEST['role'], 'name'=>$_REQUEST['name'],'email'=>$_REQUEST['email'],'wp_user'=>$current_user->ID,'meta'=>$meta); 
		
		$sql_data = array('%s', '%s', '%s','%s','%d','%s');
			
		if ($wpdb->insert( EVENTS_PERSONNEL_TABLE, $sql, $sql_data )){?>
				<div id="message" class="updated fade">
				  <p><strong>
					<?php _e('The person  has been added.','event_espresso'); ?>
					</strong></p>
				</div>
	<?php 
			}else{ ?>
				<div id="message" class="error">
				  <p><strong>
					<?php _e('The person  was not saved.','event_espresso'); ?>
					</strong></p>
					<?php echo 'Debug: <br />';
					  print_r($sql);
					  print 'Number of vars: ' . count ($sql);
					  echo '<br />';
					  print 'Number of cols: ' . count($sql_data);?>
				</div>
		<?php
			}
	}
}
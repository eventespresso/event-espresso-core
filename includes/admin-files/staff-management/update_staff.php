<?php 
function update_event_staff(){
	global $wpdb;
	$wpdb->show_errors();
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
		
	
	$sql=array('name'=>$_REQUEST['name'],'role'=>$_REQUEST['role'],'email'=>$_REQUEST['email'], 'meta'=>$meta); 
		
		$update_id = array('id'=> $_REQUEST['staff_id']);
		
		$sql_data = array('%s','%s','%s','%s');
		$wpdb->update( EVENTS_PERSONNEL_TABLE, $sql, $update_id, $sql_data, array( '%d' ) );
		/*echo 'Debug: <br />';
                    print_r($sql);
                    print 'Number of vars: ' . count ($sql);
                    echo '<br />';
                    print 'Number of cols: ' . count($sql_data)*/;
		?>
		<div id="message" class="updated fade">
			<p><strong><?php _e('The person  has been updated.','event_espresso'); ?></strong></p>
         </div>
<?php
}
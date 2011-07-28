<?php 
function update_event_locale(){
	global $wpdb;
	$wpdb->show_errors();
	//print_r($_REQUEST);
	$sql=array('name'=>$_REQUEST['name']); 
	$update_id = array('id'=> $_REQUEST['locale_id']);
	$sql_data = array('%s','%s','%s','%s','%s','%s','%s','%s','%s');
	$wpdb->update( EVENTS_LOCALE_TABLE, $sql, $update_id, $sql_data, array( '%d' ) );
	/*echo 'Debug: <br />';
                    print_r($sql);
                    print 'Number of vars: ' . count ($sql);
                    echo '<br />';
                    print 'Number of cols: ' . count($sql_data);*/
?>
		<div id="message" class="updated fade">
			<p><strong><?php _e('The locale  has been updated.','event_espresso'); ?></strong></p>
         </div>
<?php
}
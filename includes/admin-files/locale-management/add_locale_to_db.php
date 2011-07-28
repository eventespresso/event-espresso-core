<?php
function add_locale_to_db(){
	global $wpdb, $current_user;
	$wpdb->show_errors();
	if ( $_REQUEST['action'] == 'add' ){
		//print_r($_REQUEST);
		$identifier=uniqid($current_user->ID.'-');
		if (!function_exists('espresso_member_data'))
			$current_user->ID = 1;
		$sql=array('identifier'=>$identifier, 'name'=>$_REQUEST['name'], 'wp_user'=>$current_user->ID); 
		$sql_data = array('%s','%s','%d');		
		  
		 if ($wpdb->insert( EVENTS_LOCALE_TABLE, $sql, $sql_data )){?>
				<div id="message" class="updated fade">
				  <p><strong>
					<?php _e('The locale  has been added.','event_espresso'); ?>
					</strong></p>
				</div>
	<?php 
			}else{ ?>
				<div id="message" class="error">
				  <p><strong>
					<?php _e('The locale  was not saved.','event_espresso'); ?>
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
<?php
function add_discount_to_db(){
	global $wpdb, $current_user;
	$wpdb->show_errors();
	if (isset($_POST['add_new_discount'])){
		if ( $_REQUEST['action'] == 'add' ){
	
			if (!function_exists('espresso_member_data'))
				$current_user->ID = 1;
			
			$sql=array('coupon_code'=>$_REQUEST['coupon_code'], 'coupon_code_price'=>$_REQUEST['coupon_code_price'],'coupon_code_description'=>$_REQUEST['coupon_code_description'], 'use_percentage'=>$_REQUEST['use_percentage'],'wp_user'=>$current_user->ID); 
		
			$sql_data = array('%s','%s','%s','%s','%d');
	
			if ($wpdb->insert( EVENTS_DISCOUNT_CODES_TABLE, $sql, $sql_data )){?>
				<div id="message" class="updated fade">
				  <p><strong>
					<?php _e('The discount code  has been added.','event_espresso'); ?>
					</strong></p>
				</div>
	<?php 
			}else{ ?>
				<div id="message" class="error">
				  <p><strong>
					<?php _e('The discount code  was not saved.','event_espresso'); ?>
					<?php print mysql_error() ?>.</strong></p>
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
}
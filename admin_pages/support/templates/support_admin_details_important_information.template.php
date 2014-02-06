<div class="padding">
	<?php
	global $wpdb, $wp_version;
	$wp_req_version = '3.1';
	$php_req_version = '5.2';
	$mysql_req_version = '5.0';
	$is_php_valid = version_compare(phpversion(), $php_req_version, '>');
	$is_mysql_valid = version_compare($wpdb->db_version(), $mysql_req_version, '>');

	if (!version_compare($wp_version, $wp_req_version, '>=')) {
		echo '<p class="red_alert">' . __('This version of Event Espresso requires WordPress version', 'event_espresso') . ' ' . $wp_req_version . '+. ' . __('Please upgrade to the latest version of WordPress.', 'event_espresso') . '</p>';
	}
	if (!$is_php_valid) {
		echo '<p class="red_alert">' . __('Your version of PHP is out of date, please update to the latest version of PHP. <br>Required version of PHP:', 'event_espresso') . ' ' . $php_req_version . '</p>';
	}
	if (!$is_mysql_valid) {
		echo '<p class="red_alert">' . __('Your version of MySQL is out of date, please update to the latest version of MySQL. <br>Required version of MySQL:', 'event_espresso') . ' ' . $mysql_req_version . '</p>';
	}
	
	$query_args = array(
		'page' => 'espresso_maintenance_settings',
		'action' => 'system_status'
		);
	$system_status_link = EE_Admin_Page::add_query_args_and_nonce($query_args, admin_url('admin.php'));

  ?>
  <a href="<?php echo $system_status_link; ?>" class="button-secondary right"><?php _e('System Information', 'event_espresso'); ?></a>
	<div class="localhost-information">
		<dl>
			<dt>
<?php _e('WordPress Version:', 'event_espresso'); ?>
			</dt>
			<dd><?php echo $wp_version; ?></dd>
			<dt>
<?php _e('PHP Version:', 'event_espresso'); ?>
			</dt>
			<dd><?php echo phpversion(); ?></dd>
			<dt>
<?php _e('MySQL Version:', 'event_espresso'); ?>
			</dt>
			<dd><?php echo $wpdb->db_version(); ?></dd>
			<dt>Event Espresso Version:</dt>
			<dd><?php echo EVENT_ESPRESSO_VERSION ?></dd>
			<dt>
<?php _e('WordPress Address (URL):', 'event_espresso'); ?>
			</dt>
			<dd><?php echo site_url(); ?></dd>
			<dt>
<?php _e('Site address (URL):', 'event_espresso'); ?>
			</dt>
			<dd><?php echo home_url(); ?></dd>
		</dl>
	</div>
</div>
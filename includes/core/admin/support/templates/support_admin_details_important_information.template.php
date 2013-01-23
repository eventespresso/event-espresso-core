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
	
	
	if ($verify_attendee) {
						?>
	  <a name="attendee_data" id="attendee_data"></a>
	  <p class="red_text"><strong>
		<?php _e('Attendee information is outdated', 'event_espresso'); ?>
		</strong></p>
	  <p>
		<?php _e('Due to recent changes in the way attendee information is handled, attendee data may appear to be missing from some events. In order to reassign attendees to events, please run the attendee update script by pressing the button below.', 'event_espresso'); ?>
	  </p>
	  <form action="<?php echo $_SERVER["REQUEST_URI"] ?>" method="post" name="form" id="form">
		<p>
		  <input type="hidden" name="action" value="event_espresso_update_attendee_data" />
		  <input class="button-primary" type="submit" name="event_espresso_update_attendee_data_button" value="<?php _e('Run Attendee Update Script', 'event_espresso'); ?>" id="event_espresso_update_attendee_data_button"/>
		</p>
	  </form>
  <?php
	}
  ?>
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
<?php _e('WordPress Content Directory:', 'event_espresso'); ?>
			</dt>
			<dd><?php echo WP_CONTENT_DIR; ?></dd>
			<dt>
<?php _e('Site address (URL):', 'event_espresso'); ?>
			</dt>
			<dd><?php echo home_url(); ?></dd>
			<dt>
<?php _e('Event Espresso Plugin URL:', 'event_espresso'); ?>
			</dt>
			<dd><?php echo EVENT_ESPRESSO_PLUGINFULLURL ?></dd>
			<dt>
<?php _e('Event Espresso Plugin Path:', 'event_espresso'); ?>
			</dt>
			<dd><?php echo EVENT_ESPRESSO_PLUGINFULLPATH; ?></dd>
			<dt>
<?php _e('Event Espresso Upload URL:', 'event_espresso'); ?>
			</dt>
			<dd><?php echo EVENT_ESPRESSO_UPLOAD_URL; ?></dd>
			<dt>
<?php _e('Event Espresso Upload Path:', 'event_espresso'); ?>
			</dt>
			<dd><?php echo EVENT_ESPRESSO_UPLOAD_DIR; ?></dd>
			<dt>
<?php _e('Event Espresso Template Path:', 'event_espresso'); ?>
			</dt>
			<dd><?php echo EVENT_ESPRESSO_TEMPLATE_DIR; ?></dd>
			<dt>
<?php _e('Event Espresso Gateway Path:', 'event_espresso'); ?>
			</dt>
			<dd><?php echo EVENT_ESPRESSO_GATEWAY_DIR; ?></dd>
		</dl>
	</div>
</div>